# angular-url-params

Angular service to retrieve url query parameters whether they are
passed in traditionnally of viw the hash part of the url.

# API:

- `urlParams.getQueryParams`: get query params for the url currently opened in browser. e.g. for this url: http://invalid.com?foo=bar&q=#more-path?foo=baz the function will return `{foo: bar, q: ''}`
- urlParams.getHashParams: get params passed after the hashbang, for the url currently opened in browser. e.g. for this url: http://invalid.com?foo=bar&q=#more-path?foo=baz the function will return `{foo: baz}`
