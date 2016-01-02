# simple-bootstrap-paginator
  A simple way to do pagination with bootstrap's style.

## Pre-requisites
- Bootstrap.css
- jQuery

## Usage
  Set the paginator in a element.
  ```html
  <div id="paginator"></div>
  ```
  ```javascript
  $('#paginator').simplePaginator({
    totalPages: 10,
    pageChange: function(page) {
      alert(page);
    }
  })
  ```
  Only `totalPages` and `pageChange` function are necessary to the paginator works.

## Paginator options
This is all the options avaiable in the paginator:
- `totalPages`: total pages avaiable in the paginator.
- `maxButtonsVisible`: total of numeric buttons visible in the paginator. Default is 5.
- `currentPage`: page selected. Default is 1.
- `nextLabel`: text shown in the 'next' button.
- `prevLabel`: text shown in the 'prev' button.
- `pageChange`: function called when a page is Changed.

### Change options after init paginator

The `simple-bootstrap-paginator` accepts the user change the options after paginator's initialization.

```html
  <div id="paginator"></div>
```
```javascript
  var pag = $('#paginator').simplePaginator({
    totalPages: 10,
    pageChange: function(page) {
      console.log(page);
    }
  })

  pag.simplePaginator('options', 'totalPages', 20); // Setter totalPages.

  pag.simplePaginator('options', 'totalPages'); // Get value. return 20.
```
