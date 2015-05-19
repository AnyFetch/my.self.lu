var ResultModel = function(data) {
  var self = this;

  Object.keys(data).forEach(function(key) {
    self[key] = ko.observable(data[key]);
  });
};

var ViewModel = function(token) {
  var self = this;

  // Current token, used to communicate with Anyfetch
  self.token = ko.observable(token.toString());

  // Current search query (simple string)
  // binded to text inputs
  self.searchQuery = ko.observable('tariq krim');

  // Raw results from the API (not an observable, not on self)
  var rawResults = null;

  // Real results
  self.results = ko.observableArray([]);

  // Search for results
  self.doSearch = function doSearch() {
    console.log("Searching", self.searchQuery());
    $.ajax("https://api.anyfetch.com/documents",
    {
      data: {
        search: self.searchQuery(),
        render_templates: true,
      },
      headers: {
        authorization: 'Bearer ' + self.token()
      },
      success: function(data, status) {
        rawResults = data;

        var results = data.data.map(function(rawResult) {
          return new ResultModel(rawResult);
        });

        console.log(results);
        self.results(results);
      },
      error: function(xhr, status, error) {
        console.error(status, error);
        // TODO: handle error.
      }
    });
  };
};

var currentToken = Cookies.get("token");
ko.applyBindings(new ViewModel(currentToken));
