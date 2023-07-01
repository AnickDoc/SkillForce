<?php
function sendLeadData($z, $arr){
    if(!empty($arr['email']) || !empty($arr['phone'])){
        $data = [
            'source' => 'спишемкредит.рф', // свой адресс сайта
            'area' => 'долги', // общий долги или чарджбэк
            'verify_token_femidaforce' => md5('femidaforce'),
            'sending' => 'yes',
            'method' => 'new',
            'passing' => 'false',
            'client_id' => null,
            'commentary' => $z,
            'remote_ip' => $_SERVER['REMOTE_ADDR'],
            'make_utm_table_alias' => 'femidaforce'
        ];

        if(!empty($arr['params'])){
            $get = base64_decode($arr['params']);
            $get = json_decode($get);
            $data['UTM'] = !empty($get->utm_source) ? $get->utm_source : null;
            $data['UTM2'] = !empty($get->utm_campaign) ? $get->utm_campaign : null;
        }

        $data += $arr;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.femidafors.ru/site/lead');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $out = curl_exec($ch);
        curl_close($ch);
    }
}

if(!empty($_POST)){
    foreach ($_POST as $key => $item)
        $post[$key] = htmlspecialchars($item);
    $com = ""; //Это если есть не стандартные инпуты
    $com.= !empty($post['debt']) ? "Перед кем у вас задолженность?: {$post['debt']} <br>" : '';
    sendLeadData($com, $post);

}else die('Bad request #400');


?>