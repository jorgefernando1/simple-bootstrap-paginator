;(function($, window, document, undefined) {

  /**
  * Simple boostrap pagination v 0.1
  */

  var pluginName = 'simplePaginator';
  var defaults = {
      maxButtonsVisible: 5,
      totalPages: 1,
      currentPage: 1,
      pageChange: function(page) { console.log(page) }
    };

    /*
    * Function that define the plugin
    * element - the DOM element
    * options - object with the plugin options
    */
    function Plugin(element, options) {
      this.element = element;

      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;

      this.changeTotalPages = function(total) {
        this.options.totalPages = total;
        createPaginator(this);
      }

      this.changePage = function(page) {
        this.options.pageChange(page);
      }

      this.init();
    }
    Plugin.prototype.init = function() {
        //$(this.element).text(this.options.propertyName);
        // For now, only call createPaginator()
        createPaginator(this);
    };
    createPaginator = function(obj) {
        var self = obj;
        //Clear the this.element
        $(self.element).empty();
        str = '<ul class="pagination">';
        for (var i = 0; i < self.options.totalPages; i++) {
          str = str.concat('<li><a>' + (i + 1) + '</a></li>')
        }
        str = str.concat('</ul>');
        $(self.element).append(str);
        $(self.element).find('ul li').click(function() {
          self.changePage($(this).find('a').text());
        })
    }

    $.fn[pluginName] = function(options) {
      /*
       * Get the arguments
       */
      var args = $.makeArray(arguments);
      var after = args.slice(1);

      return this.each(function() {
        // Verify if already exists a plugin instance.
        var instance = $.data(this, 'plugin_' + pluginName);

        /*
         * If exists, execute the method described in options param.
         */
        if (instance) {
          if (instance[options]) {
            instance[options].apply(instance, after);
          } else {
            $.error('Method ' + options + 'doesn\'t exists');
          }
        } else {
          // Create and register the Plugin.
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
