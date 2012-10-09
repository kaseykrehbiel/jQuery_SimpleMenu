if(jQuery) {
(function($) {
   var SimpleMenu = function(e, o) {
      if(!o) {
         alert('Simple Menu must at least have a source specified.');
         return false;
      }
      else if(o.source == undefined) {
         alert('Simple Menu must have a source specified.');
         return false;
      }
      $(e).data('source', o.source);
      $(e).data('clickToOpen', typeof(o.clickToOpen) == 'undefined' ? 'true' : o.clickToOpen);
      $(e).data('type', typeof(o.type) == 'undefined' ? 'horizontal' : (o.type == 'horizontal' || o.type == 'vertical') ? o.type : 'horizontal');
      $(e).data('closeTimeout', typeof(o.closeTimeout == 'number') ? o.closeTimeout : 0);
      $(e).data('slideDuration', typeof(o.slideDuration == 'undefined') ? 500 : o.slideDuration);
      
      var showMenu = function(element) {
         $.ajax({
            type: "GET",
            url: $(e).data('source'),
            success: function(response) {
               if(response) {
                  element.append(response);
                  styleMenu(element.children('ul'));
               } else {
                  alert('page empty');
               }
            },
            error: function(a, b, c) {
               alert(a.responseText);
            }
         });
      };
      
      var styleMenu = function(m) {
         m.addClass('simpleMenu');
         $(m).children('li').addClass('sm' + $(e).data('type'));
         $(m).children('li').children('ul').addClass('sm' + $(e).data('type') + 'ul');
         $(m).children('li').find('li').addClass('smitem');
         $(m).children('li').find('ul').addClass('smmenu');
         $(m).find('li').hover(function(event){
                                  selectItem($(this))
                               }, 
                               function(event) {
                                  startTimer($(this))
                               });
      };
      
      var startTimer = function(element) {
         if($(element).data('closeTimer') == null) {
            $(element).data('closeTimer', window.setTimeout(function() {$(element).find('.simpleMenuVisible').removeClass('simpleMenuVisible');}, $(e).data('closeTimeout')));
         }
      }
      
      var selectItem = function(element) {
         $(e).find('.simpleMenuVisible').not(element.find('*')).not(element.parents()).removeClass('simpleMenuVisible');
         window.clearTimeout($(element).data('closeTimer'));
         var parentElement = element;
         while(!$(parentElement).data('simpleMenu')) {
           if(parentElement.data('closeTimer')) {
               window.clearTimeout($(parentElement).data('closeTimer'));
               $(parentElement).data('closeTimer', null);
            }
            parentElement = $(parentElement).parent();
         }
         if($(element).has('ul')) {
            $(element).children('ul').addClass('simpleMenuVisible');
         }
         if($(element).parent().hasClass('simpleMenu')) {
            shiftSubmenus(element);
         }
      }
      
      var shiftSubmenus = function(element) {
         $(element).find('.simpleMenuArrow').remove();
         var simpleMenuArrowLeft = $('<span class="simpleMenuArrow simpleMenuArrowLeft"> &laquo;</span>');
         var simpleMenuArrowRight = $();
         var submenuElements = $(element).find('ul').find('ul');
         $(submenuElements).each(function() {
            $(this).parent().children('a').append('<span class="simpleMenuArrow simpleMenuArrowRight"> &raquo;</span>');
            //$(this).width($(this).children('a').first().width() + 'px');
            var submenuWidth = $(this).width();
            $(this).css('right', '').css('left', $(this).parent().parent().width() + 'px');
            $(this).css('top', '-' + $(this).parent().height() + 'px');
            if($(this).offset().left + submenuWidth > $(window).width()) {
               $(this).parent().children('a').children('.simpleMenuArrow').remove();
               $(this).parent().children('a').prepend('<span class="simpleMenuArrow simpleMenuArrowLeft"> &laquo;</span>');
               $(this).css('left', '').css('right', '-100%');
            }
            $(this).css('z-index', '1');
            $(this).css('margin', '0');
            $(this).css('padding', '0');
         });
         $('ul').children('li').has('ul').css('position', 'relative');
      }
      
      showMenu($(e));
   };
     

   $.fn.simpleMenu = function(o) {
      return this.each(function() {
         var e = $(this);
         if($(e).data('simpleMenu')) {
            'The simpleMenu plugin cannot be executed twice on the same element.';
            return false;
         }
         var simpleMenu = new SimpleMenu(this, o);
         $(e).data('simpleMenu', simpleMenu);
      });
   };
})(jQuery);
}