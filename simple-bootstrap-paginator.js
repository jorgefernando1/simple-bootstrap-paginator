;(function($, window, document, undefined) {

  /**
  * Simple boostrap pagination v 0.1
  */

  var pluginName = 'simplePaginator';
  var defaults = {
      propertyName: 'value'
    };

    function Plugin(element, options) {
      this.element = element;

      this.options = $.extend({}, defaults, options);

      this._defaults = defaults;
      this._name = pluginName;

      this.changeValue = function(val) {
        this.options.propertyName = val;
        this.init();
      }

      this.init();
    }
    Plugin.prototype.init = function() {
        $(this.element).text(this.options.propertyName);
    };

    $.fn[pluginName] = function(options) {
      var args = $.makeArray(arguments);
      var after = args.slice(1);

      return this.each(function() {

        // Verifico se existe instancia
        var instance = $.data(this, 'plugin_' + pluginName);

        if (instance) {
          if (instance[options]) {
            instance[options].apply(instance, after);
          } else {
            $.error('Method ' + options + 'doesn\' exists');
          }
        } else {
          var plugin = new Plugin(this, options);
          $.data(this, 'plugin_' + pluginName, plugin);
          return plugin;
        }
      });
    }

  // var self = this;
  //
  // self.defaults = {
  //   message: 'This is a default Message'
  // };
  //
  // self.options = {};
  //
  // var methods = {
  //   init: function(options) {
  //     options = $.extend(self.options, self.defaults, options);
  //     return this.each(function() {
  //       $(this).text(options.message);
  //     });
  //   },
  //   setOption: function(key, value) {
  //     if (value) {
  //       self.options[key] = value;
  //     } else {
  //       return self.options[key];
  //     }
  //   }
  // };
  //
  // $.fn.simplePagination = function(method) {
  //   if (methods[method]) {
  //     return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  //   } else if (typeof method === 'object' || !method) {
  //     return methods.init.apply(this, arguments);
  //   } else {
  //     console.log('Method doesn\'t exists');
  //   }
  // }

  // $.fn.simplePagination = function(options) {
  //   var $target = this;
  //
  //   var opts = {
  //     maxBtnsVisible: (options.maxButtonsVisible ? options.maxButtonsVisible : '5'),
  //     initialPage: (options.initialPage ? options.initialPage: 1),
  //     totalPages: options.totalPages,
  //   }
  //   if (options.te) {
  //     $target('TE: ' + options.te)
  //   } else {
  //     // Clear the target
  //     $target.empty();
  //     // Create the paginator
  //     var str = '<ul class="pagination"> oi </ul>'
  //     $target.html(str);
  //   }
  // }


})(jQuery, window, document);
