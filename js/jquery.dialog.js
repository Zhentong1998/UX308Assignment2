/**
 * @file        jQuery-based popup component
 * @author      龙泉
 * @version     1.0.0
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD module
    define(['jquery'], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    // Node/CommonJS
    // Sea.js build
    factory(require('jquery'));
  } else {
    // Browser Global Mode
    factory(jQuery);
  }
})(function($) {
  var closeClass = '.j_dialogClose';

  // Default parameter configuration
  var dialogDef = {
    id: '', // If there are multiple styles of pop-up windows in the page, you can use ID to distinguish the styles
    title: 'Title',
    isFixed: true,
    hideHeader: false,
    hideClose: false,
    content: null,
    callback: null,
    withNoPadding: false, // Whether to set padding
    withNoMinWidth: false, // Whether to set minimum width
    bgHide: true, // Click to hide the background
    escHide: true // Whether to hide by pressing the ESC button
  };

  // Global variable
  var dialogConfig = {
    windows: $(window),
    lightbox: '.dialog-background',
    section: '.dialog-section',
    imageTag: '.dialog-imageItem',
    imageData: {},
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    paddingWidth: 0,
    paddingHeight: 0,
    resizeParams: ['.dialog-section']
  };

  // The set of parameters passed by the user
  var dialogOpts = {};

  // Basic implementation
  var Dialog = {
    /**
     * Show dialog popup
     * @param  {Object} opts configuration options
     * @return {undefined}
     */
    show: function(opts) {
      dialogOpts = $.extend({}, dialogDef, opts || {});

      if (opts.content) {
        Dialog.dialog(opts);
      } else {
        Dialog.lightbox(opts);
      }

      // Callback function to be executed during initialization
      typeof dialogOpts.onInit === 'function' && dialogOpts.onInit();

      // Dynamically change the position of the content display box when resizing the browser
      dialogConfig.windows.on('resize', function() {
        Dialog.settings.apply(window, dialogConfig.resizeParams);
      });
    },

    /**
     * Close the dialog popup
     * @param  {Function} callback Callback
     * @return {undefined}
     */
    hide: function(callback) {
      var oLightBox = $(dialogConfig.lightbox);
      var oSection = $(dialogConfig.section);

      if (dialogOpts.isFixed) {
        oSection.animate({
          marginTop: -(dialogConfig.top - 150),
          opacity: 0
        });
      } else {
        oSection.animate({
          top: (dialogConfig.top + 150),
          opacity: 0
        });
      }

      oLightBox.fadeOut(function() {
        oLightBox.remove();
        oSection.remove();
        callback && callback();
      });
    },

    dialog: function(opts) {
      Dialog.install(opts);
      dialogConfig.resizeParams = [dialogConfig.section, true, true];
      Dialog.settings.apply(window, dialogConfig.resizeParams);
    },

    lightbox: function(opts) {
      var clickObj_src = opts.clickObj.attr('data-src') || opts.clickObj.attr('data-image');
      dialogConfig.now = 0;
      Dialog.getImages_src(dialogOpts.imageList);
      Dialog.loadImage(clickObj_src, true, Dialog.settings);
      Dialog.getNow(clickObj_src);
    },

    install: function(opts) {
      var oBody = $('body');
      var headerHtml = '<div class="dialog-header">' + dialogOpts.title + '</div>';
      var closeHtml = '<div class="dialog-close j_dialogClose"></div>';
      var markId = '';
      var addClass = '';
      var $background = oBody.find(dialogConfig.lightbox);

      if (!dialogOpts.content) {
        var content = '<div class="dialog-imageList">' + '  <img src="" class="dialog-imageItem" />' + '</div>' + '  ' + '<span class="dialog-btnPrev">&lt;</span>' + '<span class="dialog-btnNext">&gt;</span>';
      } else {
        var content = dialogOpts.content;
      }

      if (dialogOpts.hideHeader) {
        headerHtml = '';
      }

      if (dialogOpts.hideClose) {
        closeHtml = '<div class="dialog-close j_dialogClose" style="display: none;"></div>';
      }

      if (dialogOpts.id) {
        markId = ' id="' + dialogOpts.id + '"';
      }

      var plugs_lightbox = '<div class="dialog-background' + (dialogOpts.bgHide ? ' j_bgHide' : '') + '"></div>';
      var plugs_lightbox_section = '<div class="dialog-section' + (dialogOpts.escHide ? ' j_escHide' : '') + '" ' + markId + '>' + headerHtml + '<div class="dialog-body' + (dialogOpts.withNoPadding ? ' withNoPadding' : '') + (dialogOpts.withNoMinWidth ? ' withNoMinWidth' : '') + '">' + content + '</div>' + closeHtml + '</div>';

      // If you have opened a popup before, close it first
      if ($background.length) {
        $background.stop().fadeIn();
        oBody.find(dialogConfig.section).remove();
      } else {
        oBody.append(plugs_lightbox)
      }

      oBody.append(plugs_lightbox_section);
      $(dialogConfig.lightbox).fadeIn();
      $(dialogConfig.section).show();

      var iPaddingWidth = $(dialogConfig.section).outerWidth() - $(dialogConfig.section).width();
      var iPaddingHeight = $(dialogConfig.section).outerHeight() - $(dialogConfig.section).height();

      dialogConfig.paddingWidth = iPaddingWidth;
      dialogConfig.paddingHeight = iPaddingHeight;
      dialogOpts.callback && dialogOpts.callback();
    },

    getNow: function(loadImage_src) {
      for (var i = 0, len = dialogConfig.images.length; i < len; i++) {
        if (loadImage_src === dialogConfig.images[i]) {
          dialogConfig.now = i;
        }
      }
    },

    getImages_src: function(images) {
      var images = (typeof images == 'string') ? $(images) : images;
      dialogConfig.images = [];

      for (var i = 0, len = images.length; i < len; i++) {
        var currentImage = images.eq(i);
        var currentImage_src = currentImage.attr('data-src') || currentImage.attr('data-image');
        var currentImage_src = $.trim(currentImage_src);
        if (currentImage_src !== '') {
          dialogConfig.images.push(currentImage_src);
        }
      }
    },

    loadImage: function(loadImage_src, isMove, callback) {
      var image = new Image();
      image.onload = function() {
        if ($('.dialog-section').length === 0) {
          Dialog.install(dialogOpts);
          $('.dialog-btnPrev').on('click', function() {
            Dialog.switchImage(false, false);
          });
          $('.dialog-btnNext').on('click', function() {
            Dialog.switchImage(true, false);
          });
        }

        Dialog.setBtnSate();

        var section = $(dialogConfig.section);
        var imageTag = $(dialogConfig.imageTag);

        dialogConfig.imageData = {
          width: this.width,
          height: this.height,
          src: loadImage_src
        };

        dialogConfig.resizeParams = [section, imageTag, isMove];
        callback && callback.apply(window, dialogConfig.resizeParams);
      }
      image.src = loadImage_src;
    },

    switchImage: function(d, isMove) {
      if (d) {
        dialogConfig.now++;
      } else {
        dialogConfig.now--;
      }

      if (dialogConfig.now < 0) {
        dialogConfig.now = dialogConfig.images.length - 1;
      }

      if (dialogConfig.now > dialogConfig.images.length - 1) {
        dialogConfig.now = 0;
      }

      var loadImage_src = dialogConfig.images[dialogConfig.now];
      Dialog.loadImage(loadImage_src, isMove, Dialog.settings);
    },

    setBtnSate: function() {
      if (dialogConfig.images.length < 2) {
        $('.dialog-btnPrev, .dialog-btnNext').hide();
      }
    },

    // Set the size and position of the content display box
    settings: function(section, imageTag, isMove) {
      var section = (typeof section == 'string') ? $(section) : section;
      var winHeight = $(window).height();

      if (!dialogOpts.content) {
        var sectionHeight = 116, // The default height of the peripheral container. For convenience, a fixed value is temporarily used here, and it will be adjusted later in the revision.
          configWidth = dialogConfig.imageData.width,
          configHeight = dialogConfig.imageData.height;
        dialogConfig.width = configWidth;
        dialogConfig.height = configHeight;
        if (sectionHeight + dialogConfig.height > winHeight) {
          dialogConfig.height = winHeight - sectionHeight - 50;
          dialogConfig.height = dialogConfig.height < 500 ? 500 : dialogConfig.height;
          dialogConfig.width = Math.round(dialogConfig.width * (dialogConfig.height / configHeight));
        }
      } else {
        section.css({
          left: '0px'
        }); // When the layout is fixed, the left of the container should be 0, and the style file is not easy to modify. It is temporarily adjusted here.
        dialogConfig.width = section.width();
        dialogConfig.height = section.height();
      }

      var outerWidth = dialogConfig.width + dialogConfig.paddingWidth;
      var outerHeight = dialogConfig.height + dialogConfig.paddingHeight + $('.dialog-header').outerHeight();

      if (typeof imageTag === 'object') {
        imageTag.hide().attr('src', dialogConfig.imageData.src).css({
          width: dialogConfig.width,
          height: dialogConfig.height
        }).fadeIn();
      }

      if (dialogOpts.isFixed) {
        dialogConfig.left = Math.floor(outerWidth / 2);
        dialogConfig.top = Math.floor(outerHeight / 2);
        section.css({
          position: 'fixed',
          left: '50%'
        });

        if (isMove) {
          section.css({
            marginLeft: -dialogConfig.left,
            marginTop: -dialogConfig.top
          });
        } else {
          section.animate({
            marginLeft: -dialogConfig.left,
            marginTop: -dialogConfig.top
          }, {
            queue: false
          });
        }
      } else {
        var scrollLeft = dialogConfig.windows.scrollLeft();
        var scrollTop = dialogConfig.windows.scrollTop();
        var windowWidth = $(dialogConfig.lightbox).width();

        dialogConfig.left = Math.floor((windowWidth - outerWidth) / 2) + scrollLeft;
        dialogConfig.top = Math.floor((winHeight - outerHeight) / 2) + scrollTop;
        section.css({
          position: 'absolute',
          marginLeft: 0,
          marginTop: 0
        });

        if (isMove) {
          section.css({
            left: dialogConfig.left,
            top: dialogConfig.top
          });
        } else {
          section.animate({
            left: dialogConfig.left,
            top: dialogConfig.top
          }, {
            queue: false
          });
        }
      }

      if (imageTag) {
        Dialog.move(section, isMove);
      }
    },

    // Animation effect when displayed
    move: function(section, isMove) {
      if (dialogOpts.isFixed && isMove) {
        section.css({
          marginTop: -(dialogConfig.top - 150)
        }).animate({
          marginTop: -dialogConfig.top,
          opacity: 1
        }, function() {
          section.css('overflow', 'visible');
        });
      } else if (isMove) {
        section.css({
          top: (dialogConfig.top + 150)
        }).animate({
          top: dialogConfig.top,
          opacity: 1
        }, function() {
          section.css('overflow', 'visible');
        });
      }

      section.animate({
        width: dialogConfig.width
      }, {
        queue: false
      });
    },

    // Cancel default event
    cancelDefault: function(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Pop-up window class public processing function encapsulation
  $.extend({
    /**
     * Send a successful prompt box (top)
     * @param  {String}   msg      Hint
     * @param  {Number}   duration How long to close after
     * @param  {Function} callback Callback
     * @return {undefined}
     */
    sendSuccessToTop: function(msg, duration, callback) {
      var content = '<div class="dialog-success-top">' + '    <i class="i-icon"></i>' + msg + '</div>';

      $('body').append(content);

      var $tipBox = $('.dialog-success-top'),
          width = $tipBox.width();

      $tipBox.css({
        'margin-left': -(width / 2),
        'margin-top': 20,
        'opacity': 0
      });

      $tipBox.animate({
        'opacity': 1,
        'margin-top': 0
      }, 400, function() {
        // Auto hide
        clearTimeout(window.cc_timerSendSuccessToTop);
        window.cc_timerSendSuccessToTop = setTimeout(function() {
          $tipBox.fadeOut(function() {
            $tipBox.remove();
            typeof callback === 'function' && callback();
          })
        }, duration || 3000);
      });
    },

    /**
     * Alert box to send warnings (top)
     * @param  {String}   msg      Hint
     * @param  {Number}   duration How long to close after
     * @param  {Function} callback Callback
     * @return {undefined}
     */
    sendWarningToTop: function(msg, duration, callback) {
      var content = '<div class="dialog-warning-top">' + '    <i class="i-icon"></i>' + msg + '</div>';

      $('body').append(content);

      var $tipBox = $('.dialog-warning-top'),
          width = $tipBox.width();

      $tipBox.css({
        'margin-left': -(width / 2),
        'margin-top': 20,
        'opacity': 0
      });

      $tipBox.animate({
        'opacity': 1,
        'margin-top': 0
      }, 400, function() {
        // Auto hide
        clearTimeout(window.cc_timerSendWarningToTop);
        window.cc_timerSendWarningToTop = setTimeout(function() {
          $tipBox.fadeOut(function() {
            $tipBox.remove();
            typeof callback === 'function' && callback();
          });
        }, duration || 3000);
      });
    },

    /**
     * Send reminder message
     * @param  {String}   msg      Hint
     * @param  {Number}   duration How long to close after
     * @param  {Function} callback Callback
     * @param  {string}   iconStr  Icon content
     * @return {undefined}
     */
    sendMsg: function(msg, duration, callback, iconStr) {
      // Default duration parameter
      if ($.isFunction(duration)) {
        callback = duration;
        duration = undefined;
      }

      var content = '<div class="dialog-msg">' + '    <div class="dialog-msg-text">' + (iconStr || '') + msg + '</div>' + '</div>';

      var _options = {
        id: 'dialogTipBox',
        title: ' ',
        hideHeader: true,
        hideClose: false,
        content: content,
        callback: duration === false ? null : function() {
          // Auto hide
          clearTimeout(window.timerDialogHide);
          window.timerDialogHide = setTimeout(function() {
            $(closeClass).trigger('click');
          }, duration || 3000);
        },
        onClose: function() {
          typeof callback === 'function' && callback();
        }
      };

      Dialog.show(_options);
    },

    /**
     * Send successfully (pop-up window)
     * @param  {String}   msg      Hint
     * @param  {Number}   duration How long to close after
     * @param  {Function} callback Callback
     * @return {undefined}
     */
    sendSuccess: function(msg, duration, callback) {
      $.sendMsg(msg, duration, callback, '<i class="i-success"></i>');
    },

    /**
     * Send warning (popup)
     * @param  {String}   msg      Hint
     * @param  {Number}   duration How long to close after
     * @param  {Function} callback Callback
     * @return {undefined}
     */
    sendWarning: function(msg, duration, callback) {
      $.sendMsg(msg, duration, callback, '<i class="i-warning"></i>');
    },

    /**
     * Send error (popup)
     * @param  {String}   msg      Hint
     * @param  {Number}   duration How long to close after
     * @param  {Function} callback Callback
     * @return {undefined}
     */
    sendError: function(msg, duration, callback) {
      $.sendMsg(msg, duration, callback, '<i class="i-error"></i>');
    },

    /**
     * Send confirmation prompt
     * @param  {Object} options configuration options
     * @return {undefined}
     */
    sendConfirm: function(options) {
      // Configuration options merged
      options = $.extend(true, {
        id: 'dialogConfirmBox',
        title: '提示框',
        hideHeader: false,
        hideClose: false,
        withCenter: false, // Is it horizontally centered
        withIcon: false, // Whether to display the icon, you can pass the alternative class name of withIcon
        autoClose: false, // Whether to close automatically
        timeout: 3000, // How many milliseconds after which to automatically close
        width: null, // Custom width
        noConfirm: false, // Whether to add the noConfirm attribute to the submit button
        msg: '', // Hint
        desc: '', // Descriptive text
        content: '', // Custom content
        button: {
          confirm: 'Confirm', // Confirm button - title, null means not displayed, it can be customized by {text:'button text', href:'button link', target:'link opening method',behavior:'whether to execute behavior'}
          cancel: 'Cancel', // Cancel button - title, null means not displayed, can be customized by {text:'button text', href:'button link', target:'link opening method',behavior:'whether to execute behavior'}
          cancelFirst: false // Whether cancel is in front
        }
      }, options);

      // whether to show the button
      var confirmValue = options.button.confirm,
        cancelValue = options.button.cancel,
        isShowButton = options.button && (confirmValue || cancelValue),
        buttonConfirm = '',
        buttonCancel = '',
        buttonContent = '',
        appendClass = '',
        appendStyle = '';

      if (isShowButton) {
        buttonConfirm = (confirmValue ? '<a href="' + (confirmValue.href || 'javascript:void(0);') + '" target="' + (confirmValue.target || '_self') + '" class="dialog-submit' + (confirmValue.behavior === false ? '' : ' j_dialogConfirm') + '"' + (options.noConfirm ? ' noConfirm="noConfirm"' : '') + '>' + (confirmValue.text || confirmValue) + '</a>' : '');
        buttonCancel = (cancelValue ? '<a href="' + (cancelValue.href || 'javascript:void(0);') + '" target="' + (cancelValue.target || '_self') + '" class="dialog-cancel' + (cancelValue.behavior === false ? '' : ' j_dialogCancel') + '">' + (cancelValue.text || cancelValue) + '</a>' : '');
        buttonContent = '<div class="dialog-buttonBox">' + (options.button.cancelFirst ? buttonCancel + buttonConfirm : buttonConfirm + buttonCancel) + '</div>'
      }

      if (options.withCenter) {
        appendClass += ' withCenter';
      }

      if (options.withIcon) {
        appendClass += ' ' + (typeof options.withIcon === 'string' ? options.withIcon : 'withIcon');
      }

      if (options.width !== null) {
        appendStyle = ' style="width:' + options.width + (typeof options.width === 'string' ? '' : 'px') + ';"';
      }

      // Popup content
      var content = '<div class="dialog-confirm' + appendClass + '"' + appendStyle + '>' + (options.msg === '' ? '' : '<div class="dialog-msg">' + options.msg + '</div>') + (options.desc === '' ? '' : '<div class="dialog-desc">' + options.desc + '</div>') + (options.content === '' ? '' : '<div class="dialog-content">' + options.content + '</div>') + (buttonContent) + '</div>';
      options.content = content;

      // Auto hide option
      if (options.autoClose) {
        var _callbackCopy = options.callback || $.noop;
        options.callback = function() {
          _callbackCopy();
          // Auto hide
          clearTimeout(window.timerDialogHide);
          window.timerDialogHide = setTimeout(function() {
            $(closeClass).trigger('click');
          }, options.timeout);
        };
      }

      Dialog.show(options);
    }
  });

  // Related event binding
  (function() {
    var $doc = $(document);

    // Binding: used to close the dialog popup
    $doc.on('click', closeClass, function() {
      var $that = $(this), beforeReturn;

      // If it returns false, it means interrupt closing the popup
      typeof dialogOpts.onBeforeClose === 'function' && (beforeReturn = dialogOpts.onBeforeClose($that));
      if (beforeReturn === false) return;

      clearTimeout(window.timerDialogHide);
      Dialog.hide(function() {
        if (typeof dialogOpts.onClose === 'function') {
          dialogOpts.onClose($that, beforeReturn);
        }
      });
    });

    // Binding: used to execute the confirmation operation of the pop-up window
    $doc.on('click', '.j_dialogConfirm', function() {
        var $that = $(this), beforeReturn;

      // If the submit button has the noConfirm attribute, the response will not be executed
      if ($that.attr('noConfirm') !== undefined) return;

      // If it returns false, it means interrupt closing the popup
      typeof dialogOpts.onBeforeConfirm === 'function' && (beforeReturn = dialogOpts.onBeforeConfirm($that));
      if (beforeReturn === false) return;

      clearTimeout(window.timerDialogHide);
      Dialog.hide(function() {
        if (typeof dialogOpts.onConfirm === 'function') {
          dialogOpts.onConfirm($that, beforeReturn);
        }
      });
    });

    // Binding: used to cancel the popup
    $doc.on('click', '.j_dialogCancel', function() {
      var $that = $(this), beforeReturn;

      // If it returns false, it means interrupt closing the popup
      typeof dialogOpts.onBeforeCancel === 'function' && (beforeReturn = dialogOpts.onBeforeCancel($that));
      if (beforeReturn === false) return;

      clearTimeout(window.timerDialogHide);
      Dialog.hide(function() {
        if (typeof dialogOpts.onCancel === 'function') {
          dialogOpts.onCancel($that, beforeReturn);
        }
      });
    });

    // Binding: Click the popup mask layer to close the popup
    $doc.on('click', '.j_bgHide', function() {
      $(closeClass).trigger('click');
    });

    // Binding: Press the ESC key to close the popup
    $doc.on('keyup', function(ev) {
      if (ev.keyCode == 27 && $('.j_escHide').length) {
        $(closeClass).trigger('click').removeClass('j_dialogClose');
      }
    });
  })();

  // Access using $.dialog()
  $.dialog = Dialog.show;
  $.dialogClose = Dialog.hide;
});