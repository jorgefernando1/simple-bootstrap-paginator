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
      console.log(page);
    }
  })
  ```
  Only `totalPages` and `pageChange` function are necessary to the paginator works.

## Paginator options
This is all the options available in the paginator:
- `totalPages`: total pages available in the paginator.
- `maxButtonsVisible`: total of numeric buttons visible in the paginator. Default is 5.
- `currentPage`: page selected. Default is 1.
- `nextLabel`: text shown in the `next` button.
- `prevLabel`: text shown in the `prev` button.
- `firstLabel`: text shown in the `first` button.
- `lastLabel`: text shown in the `last` button.
- `clickCurrentPage`: Specify if the paginator click in the currentButton. Default is `true`
- `pageChange`: function called when a page is Changed.

### Change total pages after init paginator

The `simple-bootstrap-paginator` accepts the user change the total pages:

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

  pag.simplePaginator('setTotalPages', 20);
```
