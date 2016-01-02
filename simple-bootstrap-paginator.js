;(function($, window, document, undefined) {

  /**
  * Simple boostrap pagination v 0.1
  */

  var pluginName = 'simplePaginator';
  var defaults = {
      maxButtonsVisible: 5,
      totalPages: 7,
      currentPage: 1,
      pageChange: function(page) { console.log(page) }
    };

    /*
    * Function that define the plugin
    * element - the DOM element
    * options - object with the plugin options
    */
    function Plugin(element, options) {
      //TODO:  Verify the other options.

      if (!options.pageChange) {
        $.error('function pageChange() its not defined');
      } else {
        if (typeof options.pageChange !== 'function') {
          $.error('pageChange is not a function');
        }
      }

      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;

      changeTotalButtons(this);             // Change total buttons created by the Paginator

      this.setTotalPages = function(total) {
        this.options.totalPages = total;
        changeTotalButtons(this);
        createPaginator(this);
      }

      this.changePage = function(page) {
        this.options.pageChange(page);
        createPaginator(this);
      }

      this.init();
    }
    Plugin.prototype.init = function() {
        //$(this.element).text(this.options.propertyName);
        // For now, only call createPaginator()
        createPaginator(this);
    };

    changeTotalButtons = function(self) {
      self.options.totalButtons = Math.min(self.options.totalPages, self.options.maxButtonsVisible);
    };

    createPaginator = function(self) {
        var opt = self.options;
        //Clear the this.element
        $(self.element).empty();

        var str = '<ul class="pagination">';
        // Create the prev button
        if (opt.currentPage == 1) {
          str = str.concat('<li class="disabled"><a>prev</a></li>')
        } else {
          str = str.concat('<li><a>prev</a></li>');
        }

        // Create the numeric buttons.
        // Variable of number control in the buttons.
        var begin = 1;
        var end = begin + opt.totalButtons - 1;

        /*
         * TODO: Align the values in the begin and end variables if the user has the
         * possibility that select a page that doens't appear in the paginador.
         * e.g currentPage = 1, and user go to the 20 page.
         */
        while ((opt.currentPage < begin) || (opt.currentPage > end)) {
          if (opt.currentPage > end) {
             begin += opt.totalButtons;
             end += opt.totalButtons;

             if (end > opt.totalPages) {
               begin = begin - (end - opt.totalPages);
               end = opt.totalPages;
             }
           } else {
             begin -= opt.totalButtons;
             end -= opt.totalButtons;

             if (begin < 0) {
               end = end + (begin + opt.totalButtons);
               begin = 1;
             }
           }
       }
       /*
        * Verify if the user clicks in the last page show by paginator.
        * If yes, the paginator advances.
        */
        if ((opt.currentPage === end) && (opt.totalPages != 1)) {
          begin = opt.currentPage - 1;
          end = begin + opt.totalButtons - 1;

          if (end >= opt.totalPages) {
            begin = begin - (end - (opt.totalPages));
            end = opt.totalPages;
          }
        }

        /*
         * Verify it the user clicks in the first page show by paginator.
         * If yes, the paginator retrogress
         */
         if ((begin === opt.currentPage) && (opt.totalPages != 1)) {
           if (opt.currentPage != 1) {
             end = opt.currentPage + 1;
             begin = end - (self.totalButtons - 1);
           }
         }

        // Create the numeric buttons.
        for (var i = begin; i <= end; i++) {
          if (i === opt.currentPage) {
            str = str.concat('<li class="active"><a>' + i + '</a></li>');
          } else {
            str = str.concat('<li><a>' + i + '</a></li>')
          }
        }


        // Create the next button.
        if (opt.currentPage == opt.totalPages) {
          str = str.concat('<li class="disabled"><a>next</a></li>')
        } else {
          str = str.concat('<li><a>next</a></li>');
        }

        str = str.concat('</ul>');

        $(self.element).append(str);
        $(self.element).find('ul li').click(function() {
          var page = parseInt($(this).find('a').text());
          opt.currentPage = page;
          self.changePage(page);
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


})(jQuery, window, document);
