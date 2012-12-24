	
	var autoanchor = {};
	var menu_element = '.main-navigation';
 	
	window.autoanchor = autoanchor;
	autoanchor.anc = [];
	autoanchor.cur = ''; 

jQuery(window).scroll(function (event) {
  if (autoanchor.anc.length == 0) return;
  
  var scrollY = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
  //alert(scrollY);
  var d = 0;
  
  autoanchor.d = autoanchor.anc[0].offsetTop-scrollY;
  autoanchor.e = 0;
  //alert(autoanchor.d);
  for (anc in autoanchor.anc) {
    d = autoanchor.anc[anc].offsetTop-scrollY;
    if ((d <= 0) && (autoanchor.d < d)) {
      autoanchor.d = d;
      autoanchor.e = anc;
    };
  };
  
  if (autoanchor.cur != autoanchor.anc[autoanchor.e].name) {
    autoanchor.cur = autoanchor.anc[autoanchor.e].name;
   // location.hash = '#'+autoanchor.cur;
   //alert(window.history.pushState);
     /*    if (typeof history.pushState != 'undefined') { 
			history.pushState(null, null, autoanchor.cur); 
		}   */
		changeHash(autoanchor.cur)
	//document.location.hash = '#'+autoanchor.cur;
		event.preventDefault();

		var current_item = jQuery('#'+autoanchor.cur);
		var index = jQuery(".100-height").index(current_item);
		
	//	alert(index);
		
		jQuery(menu_element + " li").removeClass("active");
	//	jQuery(menu_element + " li a").removeClass("active");			
		jQuery(menu_element + " li:eq(" + index + ")").addClass("active");
	//	jQuery(menu_element + " li:eq(" + index + ") a").addClass("active");			
  		//var target_offset = jQuery(location.hash).offset();
		//var target_top = target_offset.top;
  } 
});
	
	
	
$(document).ready(function() {

	 $("a[name]").addanchors();
	 var winHeight = $(window).height();
	 var minHeight = Math.ceil(0.9*winHeight);
	 var padTop = winHeight-minHeight;
	 $(".100-height").css({"min-height": minHeight, 'padding-top': padTop});
	 
	$('.accordeon-item').on('click', function(){
		if($(this).hasClass('show')){
			$(this).removeClass('show');
			$(this).find('.hidden-content').slideUp();
		}else{
			$(this).addClass('show');
			$(this).find('.hidden-content').slideDown();
		}
	});
	
	$('.slider').Slider({
		leftBtn: 'sl-left',
		rightBtn: 'sl-right',
		quantity: 1,
		autoPlay: false,
		autoPlayDelay: 5
	});
	
    $('.slider-arrow').hover(
	   function(){
			$(this).children().attr('src', 'img/hover.png'); 
		},
		function(){
			if ($(this).hasClass('sl-left')){
				$(this).children().attr('src', 'img/left.png'); 
			}else{
				$(this).children().attr('src', 'img/right.png'); 
			}
		}
   ); 
   
   	$('.slider-item').hover(
		function(){
			$(this).find('.slider-item-link').animate({'bottom':'0'}, 400);
		},
		function(){
			$(this).find('.slider-item-link').animate({'bottom':'-30px'}, 400);
		}
	);
   
   $('.sl-left, .sl-right').bind('click', function() {
		$(this).find('img').attr('src', 'img/click.png');
	});
});

(function($){
    $.fn.Slider = function(options) {
        var options = $.extend({
            leftBtn: 'leftBtn',
            rightBtn: 'rightBtn',
            quantity: 3,
            autoPlay: false,  // true or false
            autoPlayDelay: 10  // delay in seconds
        }, options);
        var make = function() {
            $(this).css('overflow', 'hidden');
            var el = $(this).children('ul');
            el.css({
                position: 'relative',
                left: '0'
            });

            var sliderFirst = el.children('li').slice(0, options.quantity);
            var tmp = '';
            sliderFirst.each(function(){
                tmp = tmp + '<li>' + $(this).html() + '</li>';
            });
            sliderFirst = tmp;
            var sliderLast = el.children('li').slice(-options.quantity);
            tmp = '';
            sliderLast.each(function(){
                tmp = tmp + '<li>' + $(this).html() + '</li>';
            });
            sliderLast = tmp;

            var elRealQuant = el.children('li').length;
            el.append(sliderFirst);
            el.prepend(sliderLast);
            var elWidth = el.width()/options.quantity;
            el.children('li').css({
                float: 'left',
                width: elWidth
            });
            var elQuant = el.children('li').length;
            el.width(elWidth * elQuant);
            el.css('left', '-' + elWidth * options.quantity + 'px');

            function disableButtons() {$('.' + options.leftBtn + ', .' + options.rightBtn).addClass('inactive');}
            function enableButtons() {$('.' + options.leftBtn + ', .' + options.rightBtn).removeClass('inactive');}

            $('.' + options.leftBtn).click(function(event){
                event.preventDefault();
                if (!$(this).hasClass('inactive')) {
                    disableButtons();
                    el.animate({left: '+=' + elWidth + 'px'}, 300,
                        function(){
                            if ($(this).css('left') == '0px') {$(this).css('left', '-' + elWidth * elRealQuant + 'px');}
                            enableButtons();
                        }
                    );
                }
                return false;
            });

            $('.' + options.rightBtn).click(function(event){
                event.preventDefault();
                if (!$(this).hasClass('inactive')) {
                    disableButtons();
                    el.animate({left: '-=' + elWidth + 'px'}, 300,
                        function(){
                            if ($(this).css('left') == '-' + (elWidth * (options.quantity + elRealQuant)) + 'px') {$(this).css('left', '-' + elWidth * options.quantity + 'px');}
                            enableButtons();
                        }
                    );
                }
                return false;
            });

            if (options.autoPlay) {
                function aPlay() {
                    $('.' + options.rightBtn).click();
                    delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
                }
                var delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
                el.hover(
                    function() {
                        clearTimeout(delId);
                    },
                    function() {
                        delId = setTimeout(aPlay, options.autoPlayDelay * 1000);
                    }
                );
            }
        };
        return this.each(make);
    };
	
	$.fn.addanchors = function() {
		return this.each(function(){
		autoanchor.anc.push(this);
		});
	};
})(jQuery);




function changeHash(id) {
	try {
		history.replaceState(null,null,'#'+ id);
	}
	catch(e) {
		location.hash = '#'+id;
	}
	return false;
}
