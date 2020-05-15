$(function() {
    //スクロールストップ関数
    var scrollStopEvent = new $.Event("scrollstop");
    var delay = 500;
    var timer;

    function scrollStopEventTrigger() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() { $(window).trigger(scrollStopEvent) }, delay);
    }
    $(window).on("scroll", scrollStopEventTrigger);
    $("body").on("touchmove", scrollStopEventTrigger);


    $(".top-nav").click(function() {
        topcolor($(this));
        //$("#navbar").find(".top-click-color").removeClass("top-click-color");
        //$("#navbar").find(".top-click").removeClass("top-click");
        //$(this).addClass("top-click");
        //$(this).find(".nav-link").addClass("top-click-color");
    });
    var scrollPoint;
    $(window).scroll(function() {
        var overview = $('#overview').offset().top;
        var lessonpropaty = $('#lesson-propaty').offset().top;
        var qanda = $('#q-and-a').offset().top;
        scrollPoint = $(this).scrollTop();
        $('#scroll-amount').text(scrollPoint + 'px');
        if (scrollPoint >= overview && scrollPoint < lessonpropaty - 100) {
            topcolor($('.top-one'));
        } else if (scrollPoint >= lessonpropaty - 100 && scrollPoint < qanda - 100) {
            topcolor($('.top-two'));
        } else if (scrollPoint >= qanda - 100 && scrollPoint < qanda + $('#q-and-a').height()) {
            topcolor($('.top-three'));
        } else {
            $("#navbar").find(".top-click-color").removeClass("top-click-color");
            $("#navbar").find(".top-click").removeClass("top-click");
        }

    });

    $('#button1').on('click', function() {
        //topcolor($('#button1'));
    });

    function topcolor(obj) {
        $("#navbar").find(".top-click-color").removeClass("top-click-color");
        $("#navbar").find(".top-click").removeClass("top-click");
        obj.addClass("top-click");
        obj.find(".nav-link").addClass("top-click-color");
        //obj.text("オブジェクト");
    };



    $(".sign-up").click(function() {
        var ans = $("#domain").offset();
        var myLeft = ans.left;
        var myTop = ans.top;
        //alert("left:" + lessonpropaty + "  top:" + myTop);
    });

    $(".q-list").on("click", function() {
        var $answerObject = $(this).find(".answer");
        var $downImage = $(this).find(".down-image");
        if ($answerObject.hasClass("active")) {
            $answerObject.slideUp(300);
            $answerObject.removeClass("active");
            $downImage.attr("src", "https://github.com/penta-serv/penta-serv.github.io/blob/master/up.png?raw=true");
            $downImage.css("width", "2%");
            //alert("remove");
        } else {
            $answerObject.slideDown(300);
            $answerObject.addClass("active");
            $downImage.attr("src", "https://github.com/penta-serv/penta-serv.github.io/blob/master/up.png?raw=true");
            $downImage.css("width", "5%");
            //alert("add");
        }
    });
    var lessonLevel = 0;
    var lessonTime = 0;
    var lessonFee = new Array(
        5000, 8000, 11000, 14000, 16000, 18000, 20000,
        8000, 12000, 16000, 20000, 24000, 26000, 28000,
        15000, 18000, 21000, 24000, 27000, 30000, 32000);
    $('[name=lesson]').change(function() {
        lessonLevel = $("[name=lesson]").val();
        displayLessonFee();
    });
    $("[name=lesson-time]").change(function() {
        lessonTime = $("[name=lesson-time]").val();
        displayLessonFee();
    });

    var displayLessonFee = function() {
        var displayNumber = lessonLevel * lessonTime;
        if (displayNumber !== 0) {
            $("#lesson-fee").html("<p>選んだコースの料金は</p><p> &yen;" + lessonFee[displayNumber - 1] + "です。</p>");
        }
    };

    $(window).on("load resize", function() {
        var windowWidth = window.innerWidth;
        if (windowWidth <= 576) {
            $(window).on("scroll", function() {
                $(".start-button").fadeIn();
            });
            $(window).on("scrollstop", function() {
                $(".start-button").fadeOut();
            });
        }
    });

});
