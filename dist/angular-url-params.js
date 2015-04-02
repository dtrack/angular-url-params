(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularUrlParams.config', [])
      .value('angularUrlParams.config', {
          debug: true
      });

  // Modules
  angular.module('angularUrlParams.services', []);
  angular.module('angularUrlParams',
      [
          'angularUrlParams.config',
          'angularUrlParams.services'
      ]);

})(angular);

/**
 *
 * @ngdoc service
 * @name service:urlParams
 * @description
 * Service for fetching url query params whether they are regular params or
 * hash params.
 *
 */
(function () {


  function extractParams (str) {
    var
      split,
      rv = {},
      queryParams,
      pathSplit = (str || '').split(/[#?]/);

    // get last part after the param separator (? or #)
    queryParams = (pathSplit.length > 1 ?
      pathSplit[pathSplit.length-1]: '').split('&');

    for (var i = 0 ; i < queryParams.length ; i++) {
      split = queryParams[i].split('=');
      if (split.length > 1) {
        rv[split[0]] = split[1];
      }
    }
    return rv;
  }

  // Service Code
  function UrlParamsSvc () {}

  UrlParamsSvc.prototype = {
    /**
     * @doc method
     * @methodOf angularUrlParams.services:urlParams
     * @name angularUrlParams.services:urlParams#__getLocation
     * @description
     * Wraps the window.location object to make it easier to mock during
     * unit tests.
     */
    __getLocation: function () {return window.location; },

    /**
     * @doc method
     * @methodOf angularUrlParams.services:urlParams
     * @name angularUrlParams.services:urlParams#getQueryParams
     * @description
     * Returns a dict of the traditional query params contained in the url
     * e.g. (?a=1&b=&c=2 returns a dict {a: 1, b: 2, c: 3})
     */
    getQueryParams: function () {
      return extractParams(this.__getLocation().search);
    },

    /**
     * @doc method
     * @methodOf angularUrlParams.services:urlParams
     * @name angularUrlParams.services:urlParams#getHashParams
     * @description
     * Returns a dict of the query params contained after the hash in the url
     * e.g. (#a=1&b=&c=2 returns a dict {a: 1, b: 2, c: 3})
     */
    getHashParams: function () {
      return extractParams(this.__getLocation().hash);
    }
  };

  // Export
  angular
    .module('angularUrlParams.services')
    .service('urlParams', function () {return new UrlParamsSvc();});

})();
