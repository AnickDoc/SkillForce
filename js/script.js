$(document).ready(function () {
  //маска;
  $.mask.definitions["9"] = false;
  $.mask.definitions["5"] = "[0-9]";
  $("input[type=tel]")
    .mask("+7(555) 555-55-55")
    .on("click", function () {
      $(this).trigger("focus");
    });

  //форма;
  $("#form3").on("submit", function (e) {
    var formThis = this;
    $.ajax({
      url: "send.php",
      type: "POST",
      data: $(this).serialize(),
      beforeSend: function () {
        $(formThis)
          .children(".popup__step1")
          .fadeOut(300, function () {
            $(formThis).children(".popup__step2").fadeIn(300);
          });
      },
    }).done(function () { });
    e.preventDefault();
  });

  $("#form1").on("submit", function (e) {
    var formThis = this;
    $.ajax({
      url: "send.php",
      type: "POST",
      data: $(this).serialize(),
      beforeSend: function () {
        $(formThis)
          .children(".header__step1")
          .fadeOut(300, function () {
            $(formThis).children(".header__step2").fadeIn(300);
            var email = $("input[name=email]").val();
            $(".header__email").text(email);
            refresh();
          });
      },
    }).done(function () { });
    e.preventDefault();
  });

  $("#form2").on("submit", function (e) {
    var formThis = this;
    var mail = $('input[name=email]').val();
    var pass = $('input[name=password]').val();
    if (mail == '' || pass == '') {
      $('input[name=email], input[name=password]').addClass("error");
      $(".error").css("display", "block");
    }
    $.ajax({
      url: "send.php",
      type: "POST",
      data: $(this).serialize(),
      beforeSend: function () {

      },
    }).done(function () { });
    e.preventDefault();
  });

  //popup;
  $(".S2__btn").on("click", function () {
    $(".popup").fadeIn();
    $("body").css("overflow", "hidden");
  });

  $(".popup__close").on("click", function () {
    $(".popup").fadeOut();
    $("body").css("overflow", "auto");
  });

  $('.popup__ov').click(function (e) {
    if ($(e.target).closest('.popup__body').length == 0) {
      $(".popup").fadeOut();
      $("body").css("overflow", "auto");
    }
  });


  //input password;
  $("#pas1").keyup(function () {
    if ($(this).val().length < 1) {
      $(this).prev(".header__span").text("не менее 6 символов");
      $(this).prev(".header__span").css("color", "#808080");
      $(this).prev(".header__span").removeClass("after");
      $(this).prev(".header__span").removeClass("before");
    }
    else if ($(this).val().length >= 6) {
      $(this).prev(".header__span").text("более 6 символов");
      $(this).prev(".header__span").css("color", "green");
      $(this).prev(".header__span").removeClass("before");
      $(this).prev(".header__span").addClass("after");
    }
    else {
      $(this).prev(".header__span").text("менее 6 символов");
      $(this).prev(".header__span").css("color", "red");
      $(this).prev(".header__span").removeClass("after");
      $(this).prev(".header__span").addClass("before");
    }
  });

  $("#pas2").keyup(function () {
    var pass1 = $('input[name=Password]').val();
    var pass2 = $('input[name=rePassword]').val();
    if (pass1 != '' && pass1 != pass2) {
      $(this).prev(".header__span").text("пароли не совпадают");
      $(this).prev(".header__span").css("color", "red");
      $(this).prev(".header__span").css("opacity", "1");
      $(this).prev(".header__span").removeClass("after");
      $(this).prev(".header__span").addClass("before");
    } else if (pass1 == '') {
      $(this).prev(".header__span").css("opacity", "0");
      $(this).prev(".header__span").removeClass("after");
      $(this).prev(".header__span").removeClass("before");
    } else {
      $(this).prev(".header__span").text("пароли совпадают");
      $(this).prev(".header__span").css("color", "green");
      $(this).prev(".header__span").css("opacity", "1");
      $(this).prev(".header__span").removeClass("before");
      $(this).prev(".header__span").addClass("after");
    }
  });

  $("#pas2").blur(function () {
    var pass1 = $('input[name=Password]').val();
    if (pass1 == '') {
      $(this).prev(".header__span").css("opacity", "0");
    }
  });

  $(".header__reg-input").focus(function () {
    var a = $(this).next(".password-control");
    $(a).css("opacity", "1");
  });

  $(".header__reg-input").blur(function () {
    var a = $(this).next(".password-control");
    if (!$(this).val() == 0) {
      $(a).css("opacity", "1");
    } else {
      $(a).css("opacity", "0");
    }
  });

  $('.password-control').on('click', function () {
    var inp = $(this).prev(".header__reg-input");
    if ($(inp).attr('type') == 'password') {
      $(this).addClass('eye');
      $(inp).attr('type', 'text');
    } else {
      $(this).removeClass('eye');
      $(inp).attr('type', 'password');
    }
    return false;
  });

});

//таймер;
var sec = 00;
var min = 02;

function refresh() {
  sec--;
  if (sec == -01) { sec = 59; min = min - 1; }
  else { min = min; }
  if (sec <= 9) { sec = "0" + sec; }
  time = (min <= 9 ? "0" + min : min) + ":" + sec;
  if (document.getElementById) { timer.innerHTML = time; }
  inter = setTimeout("refresh()", 1000);
  // действие, если таймер 00:00
  if (min == '00' && sec == '00') {
    sec = "00";
    clearInterval(inter);
    var elem = document.querySelector(".header__reg-add");
    elem.parentNode.removeChild(elem);

    var element = document.querySelector(".header__reg-add--1");
    element.style.display = "inline-block";
  }
}

// выставляем секунды

