/* global angular, sinon, inject, describe, beforeEach, it, expect */
/* jshint camelcase: false */
'use strict';

describe('', function() {
  var urlParams;

  beforeEach(module('angularUrlParams'));
  beforeEach(inject(function (_urlParams_) {
    urlParams = _urlParams_;
  }));

  it('should be defined', function () {
    expect(urlParams).to.not.be.undefined;
  });

  it('should properly get urlParams', function() {
    var params;
    sinon.stub(urlParams, '__getLocation');

    // location.search is undef
    urlParams.__getLocation.returns({});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);

    // location.search is an empty string
    urlParams.__getLocation.returns({search: ''});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);

    // location.search contains one param
    urlParams.__getLocation.returns({'search': '?hello=world'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(1);
    expect(params.hello).to.equal('world');

    // location.search contains 3 params
    urlParams.__getLocation.returns({'search': '?hello=world&foo=bar&baz=1'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(3);
    expect(params.hello).to.equal('world');
    expect(params.foo).to.equal('bar');
    expect(params.baz).to.equal('1');

    // location.search contains param with empty val
    urlParams.__getLocation.returns({'search': '?hello=&foo=bar&baz='});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(3);
    expect(params.hello).to.equal('');
    expect(params.foo).to.equal('bar');
    expect(params.baz).to.equal('');

    // location.search contains an invalid param with no `=` sign
    urlParams.__getLocation.returns({'search': '?hello'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);

    // location.search contains a `?` only
    urlParams.__getLocation.returns({'search': '?hello'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);

  });

  it('should properly get hashParams', function() {
    var params;
    sinon.stub(urlParams, '__getLocation');

    // location.hash is undef
    urlParams.__getLocation.returns({});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);

    // location.hash is an empty string
    urlParams.__getLocation.returns({search: ''});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);

    // location.hash contains one param
    urlParams.__getLocation.returns({'search': '#hello=world'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(1);
    expect(params.hello).to.equal('world');

    // location.hash contains 3 params
    urlParams.__getLocation.returns({'search': '#hello=world&foo=bar&baz=1'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(3);
    expect(params.hello).to.equal('world');
    expect(params.foo).to.equal('bar');
    expect(params.baz).to.equal('1');

    // location.hash contains param with empty val
    urlParams.__getLocation.returns({'search': '#hello=&foo=bar&baz='});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(3);
    expect(params.hello).to.equal('');
    expect(params.foo).to.equal('bar');
    expect(params.baz).to.equal('');

    // location.hash contains a path followed by a `?` with the params
    urlParams.__getLocation.returns({'search': '#my-path?hello=&foo=bar&baz='});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(3);
    expect(params.hello).to.equal('');
    expect(params.foo).to.equal('bar');
    expect(params.baz).to.equal('');

    // location.hash contains a path followed by a `?` with the params
    urlParams.__getLocation.returns({'search': '#my-path?'});
    params = urlParams.getQueryParams();
    expect(Object.keys(params).length).to.equal(0);
  });

});