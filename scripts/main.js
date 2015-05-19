// Model to store search results
var ResultModel = function(data) {
  var self = this;

  Object.keys(data).forEach(function(key) {
    self[key] = ko.observable(data[key]);
  });

  self.onClick = function() {
    window.open(this.actions().show);
  };
};

// Main holder for all data
var ViewModel = function(token) {
  var self = this;

  // Current token, used to communicate with Anyfetch
  self.token = ko.observable((token || '').toString());

  // Have we done our first search yet?
  self.hasDoneFirstSearch = ko.observable(false);

  // Current search query (simple string)
  // binded to text inputs
  self.searchQuery = ko.observable('tariq krim');

  // Are we loading right now?
  self.isLoading = ko.observable(true);

  // Raw results from the API (not an observable, not on self)
  var rawResults = null;

  // Real results
  self.results = ko.observableArray([]);

  // Search for results
  self.doSearch = function doSearch() {
    self.isLoading(true);
    self.hasDoneFirstSearch(true);
    console.log("Searching for query:", self.searchQuery());
    $.ajax(apiUrl + "/documents",
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
        self.isLoading(false);
      },
      error: function(xhr, status, error) {
        console.error(status, error);
        self.isLoading(false);

        // TODO: handle error.
      }
    });
  };

  self.doLogin = function doLogin() {
    var returnUri = encodeURIComponent(document.location + "oauth.html");
    document.location = managerUrl + "/oauth/authorize?client_id=555b34abaf91a41473bc25e7&redirect_uri=" + returnUri;
  };

  if(environment !== 'production') {
    self.doSearch();
  }
};

var currentToken = Cookies.get("token");
ko.applyBindings(new ViewModel(currentToken));
