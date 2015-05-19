var ViewModel = function(token) {
  this.token = ko.observable(token);

  this.searchQuery = ko.observable('');
};

var currentToken = Cookies.get("token");
ko.applyBindings(new ViewModel(currentToken));
