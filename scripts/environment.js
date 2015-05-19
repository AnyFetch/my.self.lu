var environment = document.location.toString().indexOf('github.io') === -1 ? 'staging' : 'production';


var links = {
  production: {
    manager: 'https://manager.anyfetch.com',
    api: 'https://api.anyfetch.com'
  },
  staging: {
    manager: 'https://manager-staging.anyfetch.com',
    api: 'https://api-staging.anyfetch.com'
  }
};

var managerUrl = links[environment].manager;
var apiUrl = links[environment].api;
