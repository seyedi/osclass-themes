var bender = {
    extend: function(el, opt){
        for (var name in opt) el[name] = opt[name];
        return el;
    },
    responsive: function(options){
        defaults = {'selector':'#responsive-trigger'};
        options = $.extend(defaults, options);
        if($(options.selector).is(':visible')){
            return true;
        }
            return false;
    },
    toggleClass: function(element,destination,isObject){
        var $selector = $('['+element+']');
        $selector.click(function (event) {
            var thatClass  = $(this).attr(element);
            var thatDestination;
            if (typeof(isObject) != "undefined"){
                var thatDestination  = $(destination);
            } else {
                var thatDestination  = $($(this).attr(destination));
            }
            thatDestination.toggleClass(thatClass);
            event.preventDefault();
            return;
        });
    },
    photoUploader: function(selector,options){
        defaults = {'max':4};
        options = $.extend(defaults, options);
        bender.photoUploaderActions($(selector),options);
    },
    addPhotoUploader: function(){

    },
    photoUploaderActions: function($element,options){
        $element.on('change',function(){
            ///
            var input  = $(this)[0];

            $(this).next('img').remove();
            $image = $('<img />');
            $image.insertAfter($element);

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $image.attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
                console.log('input[name="'+$(this).attr('name')+'"]');
                if(options.max < $('input[name="'+$(this).attr('name')+'"]').length){
                    //bender.addPhotoUploader();
                    console.log('add');
                }
            } else {
                console.log('borrado');
              /*var img = input.value;
                $('#img_prev').attr('src',img).height(200);*/
            }



        });
    }
};

function createPlaceHolder($element){
  var $wrapper = $('<div class="has-placeholder '+$element.attr('class')+'" />');
  $element.wrap($wrapper);
  var $label = $('<label/>');
      $label.append($element.attr('placeholder'));
      $element.removeAttr('placeholder');

  $element.before($label);
  $element.bind('remove', function() {
        $wrapper.remove();
    });
}

function selectUi(thatSelect){
    var uiSelect = $('<a href="#" class="select-box-trigger"></a>');
    var uiSelectIcon = $('<span class="select-box-icon">0</span>');
    var uiSelected = $('<span class="select-box-label">'+thatSelect.find("option:selected").text()+'</span>');
    var uiWrap = $('<div class="select-box '+thatSelect.attr('class')+'" />');

    thatSelect.css('filter', 'alpha(opacity=40)').css('opacity', '0');
    thatSelect.wrap(uiWrap);


    uiSelect.append(uiSelected).append(uiSelectIcon);
    thatSelect.parent().append(uiSelect);
    uiSelect.click(function(){
        return false;
    });
    thatSelect.change(function(){
        uiSelected.text(thatSelect.find('option:selected').text());
    });
    thatSelect.bind('removed', function() {
        thatSelect.parent().remove();
    });
}
$(document).ready(function(event){
    //OK
    $('.r-list h1 a').click(function(){
        if(bender.responsive()){
            var $parent = $(this).parent().parent();
            if($parent.hasClass('active')){
                $parent.removeClass('active');
            } else {
                $parent.addClass('active');
            }
            return false;
        }
    });
    //OK
    bender.toggleClass('data-bclass-toggle','body',true);
    //OK
    $('.doublebutton a').click(function (event) {
        var thisParent = $(this).parent();
        if($(this).hasClass('grid-button')){
            thisParent.addClass('active');
            $('#listing-card-list').addClass('listing-grid');
        } else {
        thisParent.removeClass('active');
            $('#listing-card-list').removeClass('listing-grid');
        }
        event.preventDefault();
        return;
    });


    /////// STARTS PLACE HOLDER
    $('body').on('focus','.has-placeholder input, .has-placeholder textarea',function(){
        var placeholder = $(this).prev();
        var thatInput  = $(this);

        if(thatInput.parents('.has-placeholder').not('.input-file')){
            placeholder.hide();
        }
    });
    $('body').on('blur','.has-placeholder input, .has-placeholder textarea',function(){
        var placeholder = $(this).prev();
        var thatInput  = $(this);

        if(thatInput.parents('.has-placeholder').not('.input-file')){
            if(thatInput.val() == '') {
                placeholder.show();
            }
        }
    });

    $('body').on('click touchstart','.has-placeholder label',function(){
        var placeholder = $(this)
        var thatInput  = $(this).parents('.has-placeholder').find('input, textarea');
        if(thatInput.attr('disabled') != 'disabled'){
            placeholder.hide();
            thatInput.focus();
        }
    });

    $('input[placeholder]').each(function(){
      createPlaceHolder($(this));
    });

    $('body').on("created", '[name^="select_"]',function(evt) {
      console.log('fuuuu');
      selectUi($(this));
    });

    $('select').each(function(){
        selectUi($(this));
    });

    $('.flashmessage .ico-close').click(function(){
        $(this).parents('.flashmessage').remove();
    });
    $('#mask_as_form select').on('change',function(){
        $('#mask_as_form').submit();
        $('#mask_as_form').submit();
    });

    if(typeof $.fancybox == 'function') {
      $("a[rel=image_group]").fancybox({
          openEffect : 'none',
          closeEffect : 'none',
          nextEffect : 'fade',
          prevEffect : 'fade',
          loop : false,
          helpers : {
                  title : {
                          type : 'inside'
                  }
          }
      });
    }
});
