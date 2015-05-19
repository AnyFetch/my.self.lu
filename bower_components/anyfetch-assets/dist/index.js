/** @module anyfetchAssets */
window.anyfetchAssets = {
  /** Format all anyfetch-date classes in document
   * @param options {Object} {
   *   fromNow  {boolean} Defines if the dates should be shown relative to now, defaults to false
   *   format   {String}  A moment format string, defaults to lll
   *   locale   {String}  Sets the locale, defaults to en
   *   document {Object}  DOM Document to use for searching, default to document
   * }
   */
  formatDates: function formatDates(options) {
    options = options || {};
    moment.locale(options.locale || 'en');
    var doc = options.document || document;

    // Format .anyfetch-date item
    var dateNodes = doc.getElementsByClassName('anyfetch-date');
    Array.prototype.forEach.call(dateNodes, function(node) {
      var iso8601 = node.getAttribute("data-iso8601");
      var format = node.getAttribute("data-moment-format");

      if(!iso8601) {
        iso8601 = node.textContent;
        node.setAttribute("data-iso8601", iso8601);
      }
      var mDate = moment(iso8601);
      var formatted;

      if(options.fromNow) {
        formatted = mDate.fromNow();
      }
      else {
        formatted = mDate.format(options.format || format || 'lll');
      }
      node.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    });

    // Format .anyfetch-date in .anyfetch-date-span
    var dateSpanNodes = doc.getElementsByClassName('anyfetch-date-span');
    Array.prototype.forEach.call(dateSpanNodes, function(node) {
      var dates = node.getElementsByClassName('anyfetch-date');
      var firstTime = dates[0];
      var secondTime = dates[1];
      if(firstTime && secondTime) {
        var firstDate = moment(firstTime.getAttribute('data-iso8601'));
        var secondDate = moment(secondTime.getAttribute('data-iso8601'));

        if(firstDate.format('L') === secondDate.format('L')) {
          // Same date, let's keep only the hour
          secondTime.textContent = secondDate.format('LT');
        }
      }
    });
  }
};


