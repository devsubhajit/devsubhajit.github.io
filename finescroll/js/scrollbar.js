(function ($) {
    $.fn.finescroll = function (options) {
        var defaults = {
            alignment: "right",
            value:'0px',
            width:'10px',
            bgColor:'rgba(0,0,0,0.4)',
            fgColor:'rgba(0,0,0,0.7)'

        };
        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            var isdrag = false;
            var $obj = $(this);

            $($obj).css({
                width: 'calc(100% + 20px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                position: 'relative',
                height: '100%'
            });

            var $objHeight = $($obj).innerHeight();
            var $objMargins = parseInt($($obj).find('ul').css('margin-top')) + parseInt($($obj).find('ul').css('margin-bottom'));
            var $objInnerHeight = $($obj).children().innerHeight();
            $($obj).wrap("<div class='scrollCont' style='height:" + $objHeight + "px; position:relative;'></div>");
            $($obj).parent(".scrollCont").append("<div class='scroll-line'><div class='scroll-backbar'></div><div class='scroll-bar'></div><div class='scrollup'></div><div class='scrolldown'></div></div>");


            $($obj).parent(".scrollCont").find(".scroll-line").css({
                position:'absolute',
                top:'0',
                width:settings.width,
                backgroundColor:settings.bgColor,
                height: $objHeight - ($objMargins / 2) + 'px'
            });
            if(settings.alignment === 'right'){
                $($obj).parent(".scrollCont").find(".scroll-line").css({
                    right:settings.value,
                    left:'auto'
                })
            }else if(settings.alignment === 'left'){
                $($obj).parent(".scrollCont").find(".scroll-line").css({
                    left:settings.value,
                    right:'auto'
                })
            }else{
                return false;
            }
            $($obj).parent(".scrollCont").find(".scroll-bar").css({
                position:'absolute',
                top:'0',
                left:'0',
                width:settings.width,
                backgroundColor:settings.fgColor,
                height: $objInnerHeight - ($objHeight - ($objMargins / 2)) + 'px'
            });
            $($obj).parent(".scrollCont").find(".scroll-backbar").css({
                position:'absolute',
                top:'0',
                left:'0',
                width:'100%',
                backgroundColor:'transparent',
                height: '100%'
            });

            var lst = $objInnerHeight - $objHeight;
            var visibleDiff = ($objHeight - ($objMargins / 2)) - ($objInnerHeight - ($objHeight - ($objMargins / 2)));
            console.log(visibleDiff);
            /* The Math for custom scrollBar
             *  latestscrollTop => lst  = (height of scroll element) - (height of container)
             *  visible scrolling area on bar => vsab => visibleDiff = (height of scroll line) - (height of scroll bar);
             *  
             *  suppose currnet scrollTop = x;
             *  ans : (x * vsab)/ latestscrollTop => ((st * visibleDiff)/lst)
             */
            $($obj).scroll(function () {
                if (isdrag === false) {
                    var st = $(this).scrollTop();
                    $($obj).parent(".scrollCont").find(".scroll-bar").css({
                        top: ((st * visibleDiff) / lst) + 'px'
                    });
                } else {
                    return false;
                }
            });
            $($obj).parent(".scrollCont").find(".scroll-bar ").draggable({
                containment: "parent",
                axis: "y",
                drag: function () {
                    isdrag = true;
                    var $thistop = $(this).css('top');
                    var newScrollTop = (parseInt($thistop) * lst) / visibleDiff;
                    $($obj).scrollTop(newScrollTop);
                },
                stop: function () {
                    isdrag = false;
                }
            });

            $($obj).parent(".scrollCont").find(".scroll-backbar").click(function(e){
                var scrollBar = $($obj).parent(".scrollCont").find(".scroll-bar "); // scroll bar
                var offTop = $(scrollBar).offset().top - $($obj).offset().top; // scroll bars offset top
                var posY = $(this).offset().top;
                var actualClickValue = e.pageY - posY; // position of clicked point
                var cst = $($obj).scrollTop();
                if(actualClickValue > offTop){
                    var scrollYvalue = actualClickValue - (offTop + $(scrollBar).height());
                    var moreScroll = ((offTop +scrollYvalue) * lst) / visibleDiff;
                    $($obj).scrollTop(moreScroll);
                }else{
                    var scrollYvalueless = offTop - actualClickValue;
                    var lessScroll = ((offTop - scrollYvalueless) * lst) / visibleDiff;
                    $($obj).scrollTop(lessScroll);
                }
            });

        });
    };
}(jQuery));