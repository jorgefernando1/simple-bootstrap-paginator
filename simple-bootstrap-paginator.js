;(function($, window, document, undefined) {
  'use strict';
  /**
  * Simple boostrap pagination v 0.1
  */
  var pluginName = 'simplePaginator';
  var defaults = {
      totalPages: 7,
      maxButtonsVisible: 5,
      currentPage: 1,
      nextLabel: 'next',
      prevLabel: 'prev',
      firstLabel: 'first',
      lastLabel: 'last',
      clickCurrentPage: true,
      pageChange: function(page) { console.log(page) }
    };

    /*
    * Function that define the plugin
    * element - the DOM element
    * options - object with the plugin options
    */
    function Plugin(element, options) {
      verifyOptions(options)

      this.element = element;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;

      changeTotalButtons(this);             // Change total buttons created by the Paginator

      this.setTotalPages = function(total) {
        if (total < 1) {
          $.error('Total Pages can\'t be less than 1');
        }
        this.options.totalPages = total;
        changeTotalButtons(this);
        createPaginator(this);
      }

      this.changePage = function(page) {
        if (page < 1) {
          $.error('Page can\'t be less than 1');
        } else if (page > this.options.totalPages) {
          $.error('Page is bigger than total pages');
        }

        this.options.currentPage = page;
        this.options.pageChange(page);
        createPaginator(this);
      }

      this.init();
    }
    Plugin.prototype.init = function() {
      if (this.options.clickCurrentPage) {
        this.changePage(this.options.currentPage);
      } else {
        createPaginator(this);
      }
    };

    var verifyOptions = function(opts) {
      //TODO:  Verify the other options.
      if (!opts.pageChange) {
        $.error('function pageChange() its not defined');
      } else {
        if (typeof opts.pageChange !== 'function') {
          $.error('pageChange is not a function');
        }
      }
    };

    var changeTotalButtons = function(self) {
      // options.totalButtons - Its necessary to create the numeric buttons.
      self.options.totalButtons = Math.min(self.options.totalPages, self.options.maxButtonsVisible);
    };

    var createPaginator = function(self) {
        var opt = self.options;
        //Clear the this.element
        $(self.element).empty();

        var str = '<ul class="pagination">';

        // Create the prev and first button
        if (opt.currentPage === 1) {
          str = str.concat('<li class="disabled"><a>', opt.firstLabel, '</a></li>');
          str = str.concat('<li class="disabled"><a>', opt.prevLabel, '</a></li>');
        } else {
          str = str.concat('<li><a style="cursor:pointer;">', opt.firstLabel, '</a></li>');
          str = str.concat('<li><a style="cursor:pointer;">', opt.prevLabel, '</a></li>');
        }

        // Create the numeric buttons.
        // Variable of number control in the buttons.
        var begin = 1;
        var end = begin + opt.totalButtons - 1;

        /*
         * Align the values in the begin and end variables if the user has the
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
            str = str.concat('<li class="active"><a style="cursor:pointer;">' + i + '</a></li>');
          } else {
            str = str.concat('<li><a style="cursor:pointer;">' + i + '</a></li>')
          }
        }

        // Create the 'next' and 'last' button.
        if (opt.currentPage == opt.totalPages) {
          str = str.concat('<li class="disabled"><a>', opt.nextLabel, '</a></li>');
          str = str.concat('<li class="disabled"><a>', opt.lastLabel, '</a></li>')
        } else {
          str = str.concat('<li><a style="cursor:pointer;">', opt.nextLabel, '</a></li>');
          str = str.concat('<li><a style="cursor:pointer;">', opt.lastLabel, '</a></li>');
        }
        str = str.concat('</ul>');

        $(self.element).append(str);
        $(self.element).find('ul li').not('.disabled').not('.active').click(function() {
          var btn = $(this).find('a').text();
          var page;

          switch (btn) {
            case opt.firstLabel:
              page = 1;
              break;
            case  opt.prevLabel:
              page = opt.currentPage - 1;
              break;
            case opt.nextLabel:
              page = opt.currentPage + 1;
              break;
            case opt.lastLabel:
              page = opt.totalPages;
              break;
            default:
              page = parseInt(btn);
          }
          //var page = parseInt($(this).find('a').text());
          //opt.currentPage = page;
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
