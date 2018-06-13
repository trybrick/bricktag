/*!
 *  bricktag.js - v0.3.1
 *  build: Wed Jun 13 2018 12:22:32 GMT-0500 (CDT)
 *  Brick Tag Plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Wu", [], factory);
	else if(typeof exports === 'object')
		exports["Wu"] = factory();
	else
		root["Wu"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _debug = __webpack_require__(4);
var _log = _debug('bricktag');
var trakless2 = __webpack_require__(7);
var Wu = __webpack_require__(10);
var gmodal = __webpack_require__(11);

var dom = Wu.domify;

if (typeof console !== 'undefined' && console !== null) {
  if (console.log.bind != null) {
    _log.log = console.log.bind(console);
  }
}

var win = window;
var doc = win.document;
var gsnContext = win.GSNContext;
var _tk = win._tk;

var myBrick = win.Gsn || {};
var oldGsnAdvertising = myBrick.Advertising;
var lastRefreshTime = 0;

var formatDate = function formatDate(date) {
  var d = new Date();

  if (date) {
    d = new Date(date);
  }

  var month = '' + d.getMonth() + 1;
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('');
};

var config = {
  pixelUrl: '//cdn.brickinc.net/pi.gif',
  xstoreUrl: '//cdn.brickinc.net/script/xstore.html'
};

var Plugin = function () {
  function Plugin() {
    _classCallCheck(this, Plugin);
  }

  _createClass(Plugin, [{
    key: 'getNetworkId',


    /**
     * get network id
     *
     * @return {Object}
     */
    value: function getNetworkId() {
      var networkId = trakless2.util.session('anxTagId');

      return networkId;
    }

    /**
     * emit a brickevent
     *
     * @param {String} en - event name
     * @param {Object} ed - event data
     * @return {Object}
     */

  }, {
    key: 'emit',
    value: function emit(en, ed) {
      if (en.indexOf('brickevent') < 0) {
        en = 'brickevent:' + en;
      }

      // a little timeout to make sure click tracking stick
      win.setTimeout(function () {
        _tk.emitTop(en, {
          type: en,
          en: en.replace('brickevent:', ''),
          detail: ed
        });

        if (typeof this.onAllEvents === 'function') {
          this.onAllEvents({
            type: en,
            en: en.replace('brickevent:', ''),
            detail: ed
          });
        }
      }, 100);
      return this;
    }

    /**
     * listen to a brickevent
     *
     * @param {String} en - event name
     * @param {Function} cb - callback
     * @return {Object}
     */

  }, {
    key: 'on',
    value: function on(en, cb) {
      if (en.indexOf('brickevent') < 0) {
        en = 'brickevent:' + en;
      }

      trakless2.on(en, cb);
      return this;
    }

    /**
     * detach from event
     *
     * @param {String} en - event name
     * @param {Function} cb - cb
     * @return {Object}
     */

  }, {
    key: 'off',
    value: function off(en, cb) {
      if (en.indexOf('brickevent') < 0) {
        en = 'brickevent:' + en;
      }

      trakless2.off(en, cb);
      return this;
    }

    /**
     * logging data
     *
     * @param {String} message - log message
     * @return {Object}
     */

  }, {
    key: 'log',
    value: function log(message) {
      var self = myBrick.Advertising;

      if (self.isDebug || _debug.enabled('bricktag')) {
        self.isDebug = true;
        if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
          try {
            message = JSON.stringify(message);
          } catch (error) {}
        }
        _log(message);
      }
      return this;
    }

    /**
     * trigger action tracking
     *
     * @param {String} actionParam
     * @return {Object}
     */

  }, {
    key: 'trackAction',
    value: function trackAction(actionParam) {
      var self = myBrick.Advertising;
      var tsP = {};

      if ((typeof actionParam === 'undefined' ? 'undefined' : _typeof(actionParam)) === 'object') {
        for (var k in actionParam) {
          var v = actionParam[k];

          if (v != null) {
            var k2 = self.translator[k];

            if (k2) {
              tsP[k2] = v;
            }
          }
        }
      }

      _tk.track('brick', tsP);

      self.log(actionParam);

      return this;
    }

    /**
     * utility method to normalize category
     *
     * @param {String} keyword
     * @return {String}
     */

  }, {
    key: 'cleanKeyword',
    value: function cleanKeyword(keyword) {
      var result = keyword.replace(/\W+/gi, '_');

      if (result.toLowerCase != null) {
        result = result.toLowerCase();
      }

      return result;
    }

    /**
     * add a dept
     *
     * @param {String} dept
     * @return {Object}
     */

  }, {
    key: 'addDept',
    value: function addDept(dept) {
      var self = myBrick.Advertising;

      if (dept != null) {
        var goodDept = self.cleanKeyword(dept);

        goodDept = ',' + goodDept;
        if (self.depts.indexOf(goodDept) < 0) {
          self.depts = '' + goodDept + self.depts;
        }
      }
      return this;
    }

    /**
     * fire a tracking url
     *
     * @param {String} url
     * @returns {Object}
     */

  }, {
    key: 'ajaxFireUrl',
    value: function ajaxFireUrl(url) {
      if (typeof url === 'string') {
        // bad or empty url
        if (url.length < 10) {
          return this;
        }

        // this is to cover the cache buster situation
        url = url.replace('%%CACHEBUSTER%%', new Date().getTime());
        var img = new Image(1, 1);

        img.src = url;
      }
      return this;
    }

    /**
     * Trigger when a product is clicked.  AKA: clickThru
     *
     */

  }, {
    key: 'clickProduct',
    value: function clickProduct(click, categoryId, brandName, productDescription, productCode, quantity, displaySize, regularPrice, currentPrice, savingsAmount, savingsStatement, adCode, creativeId) {
      this.ajaxFireUrl(click);
      this.emit('clickProduct', {
        myPlugin: this,
        CategoryId: categoryId,
        BrandName: brandName,
        Description: productDescription,
        ProductCode: productCode,
        DisplaySize: displaySize,
        RegularPrice: regularPrice,
        CurrentPrice: currentPrice,
        SavingsAmount: savingsAmount,
        SavingsStatement: savingsStatement,
        AdCode: adCode,
        CreativeId: creativeId,
        Quantity: quantity || 1
      });
    }

    /**
     * Trigger when a brick offer is clicked.  AKA: brickRedirect
     *
     */

  }, {
    key: 'clickBrickOffer',
    value: function clickBrickOffer(click, offerCode, checkCode) {
      this.ajaxFireUrl(click);
      this.emit('clickBrickOffer', {
        myPlugin: this,
        OfferCode: offerCode || 0
      });
    }

    /**
     * Trigger when a brand offer or shopper welcome is clicked.
     *
     */

  }, {
    key: 'clickBrand',
    value: function clickBrand(click, brandName) {
      this.ajaxFireUrl(click);
      this.setBrand(brandName);
      this.emit('clickBrand', {
        myPlugin: this,
        BrandName: brandName
      });
    }

    /**
     * Trigger when a promotion is clicked.  AKA: promotionRedirect
     *
     */

  }, {
    key: 'clickPromotion',
    value: function clickPromotion(click, adCode) {
      this.ajaxFireUrl(click);
      this.emit('clickPromotion', {
        myPlugin: this,
        AdCode: adCode
      });
    }

    /**
     * Trigger when a recipe is clicked.  AKA: recipeRedirect
     *
     */

  }, {
    key: 'clickRecipe',
    value: function clickRecipe(click, recipeId) {
      this.ajaxFireUrl(click);
      this.emit('clickRecipe', { RecipeId: recipeId });
    }

    /**
     * Trigger when a generic link is clicked.  AKA: verifyClickThru
     *
     */

  }, {
    key: 'clickLink',
    value: function clickLink(click, url, target) {
      if (target === undefined || target === '') {
        target = '_top';
      }

      this.ajaxFireUrl(click);
      this.emit('clickLink', {
        myPlugin: this,
        Url: url,
        Target: target
      });
    }

    /**
     * Trigger custom event.
     *
     */

  }, {
    key: 'clickCustom',
    value: function clickCustom(click, name, value) {
      this.ajaxFireUrl(click);
      this.emit('clickCustom', {
        myPlugin: this,
        Name: name,
        Value: value
      });
    }

    /**
     * handle a dom event
     *
     */

  }, {
    key: 'actionHandler',
    value: function actionHandler(evt, target) {
      var self = myBrick.Advertising;
      var elem = target;
      var payLoad = {};

      if (elem != null) {
        // extract data tag
        var allData = trakless2.util.allData(elem);

        for (var v = 0; v < allData.length; v++) {
          var k = allData[v];

          if (/^brick/gi.test(k)) {
            var realk = /^brick/i.replace(k, '').toLowerCase();

            payLoad[realk] = v;
          }
        }
      }

      self.refresh(payLoad);
      return self;
    }

    /**
     * get the dimension
     * @param  {Object} allData element attribute
     * @return {Array}         array of dimensions
    */

  }, {
    key: 'getDimensions',
    value: function getDimensions(allData) {
      var dimensions = [];
      var dimensionsData = allData['dimensions'];

      // Check if data-dimensions are specified. If they aren't, use the dimensions of the ad unit div.
      if (dimensionsData) {
        var dimensionGroups = dimensionsData.split(',');

        for (var k = 0; k < dimensionGroups.length; k++) {
          var v = dimensionGroups[k];
          var dimensionSet = v.split('x');

          dimensions.push([parseInt(dimensionSet[0], 10), parseInt(dimensionSet[1], 10)]);
        }
      } else {
        dimensions = [[0, 0]];
      }

      return dimensions;
    }

    /**
     * internal method for refreshing adpods
     *
     */

  }, {
    key: 'refreshAdPodsInternal',
    value: function refreshAdPodsInternal(actionParam, forceRefresh) {
      var self = myBrick.Advertising;
      var payLoad = actionParam || self.actionParam || {};
      var k = null;

      for (k in self.defP) {
        var v = self.defP[k];

        if (v != null) {
          if (!payLoad[k]) {
            payLoad[k] = v;
          }
        }
      }

      // track payLoad
      payLoad.siteid = self.brickid;
      // self.trackAction payLoad
      var canRefresh = new Date().getTime() / 1000 - lastRefreshTime >= self.minSecondBetweenRefresh;

      if (forceRefresh || canRefresh) {
        lastRefreshTime = new Date().getTime() / 1000;

        // refreshing adpods
        var adpods = dom('.brickunit');

        for (k = 0; k < adpods.length; k++) {
          var adUnit = adpods[k];

          self.createIframe(adUnit);
        }
      }
      return this;
    }

    /**
     * callback success method
     * @param  {Object} svrRsp server response
     * @return {Object}
    */

  }, {
    key: 'configSuccess',
    value: function configSuccess(svrRsp) {
      // remove handler for security reason
      win.brickConfigCallback = null;

      var rsp = svrRsp;

      if (typeof svrRsp === 'string') {
        rsp = JSON.parse(svrRsp);
      }

      var self = myBrick.Advertising;

      self.configLoaded = true;

      if (rsp) {
        _tk.util.session('anxTagId', rsp[0] != null ? rsp[0].appNexusPlacementTagId : undefined);
        return self.refreshAdPodsInternal(self.actionParam, true);
      }

      return self;
    }

    /**
     * config request method
     * @return {Object}
    */

  }, {
    key: 'loadConfig',
    value: function loadConfig(cb) {
      var self = this;

      if (self.getNetworkId() || self.configLoaded) {
        cb();
        return self;
      }

      var url = '//upload.brickinc.net/feed/clientconfig?cb=' + formatDate() + '&sid=' + self.brickid + '&callback=brickConfigCallback';

      // fallback to jsonp for IE lt 10
      // this allow for better caching on non-IE browser
      // if I am opera I need to not enter this function
      win.brickConfigCallback = function (rsp) {
        return self.configSuccess(rsp);
      };

      Wu.loadScript(url);
      return self;
    }

    /**
     * adpods refresh
     *
     */

  }, {
    key: 'refresh',
    value: function refresh(actionParam, forceRefresh) {
      var self = myBrick.Advertising;

      // no need to refresh if brickid does not exists
      if (self.brickid) {
        self.actionParam = actionParam;
        self.loadConfig(function () {
          // need to be in it's own function here to use local var
          return self.refreshAdPodsInternal(actionParam, forceRefresh);
        });
      }
      return this;
    }

    /**
     * set global defaults
     *
     */

  }, {
    key: 'setDefault',
    value: function setDefault(defParam) {
      var self = myBrick.Advertising;

      if ((typeof defParam === 'undefined' ? 'undefined' : _typeof(defParam)) === 'object') {
        for (var k in defParam) {
          var v = defParam[k];

          if (v != null) {
            self.defP[k] = v;
          }
        }
      }
      return this;
    }
  }, {
    key: 'getAnxUrl',
    value: function getAnxUrl(width, height) {
      var url = void 0;
      var self = this;
      var networkId = self.getNetworkId();
      var cb = new Date().getTime();

      url = '<script src="https://secure.adnxs.com/ttj?id=' + networkId + '&size=' + width + 'x' + height + '&cb=' + cb + '"></script>';
      return url;
    }
  }, {
    key: 'createIframe',
    value: function createIframe(parentEl) {
      var self = this;

      if (!self.getNetworkId()) {
        return self;
      }

      var $adUnit = dom(parentEl);

      $adUnit.html('');
      var allData = trakless2.util.allData(parentEl);
      var dimensions = self.getDimensions(allData);

      var iframe = doc.createElement('iframe');

      iframe.className = 'brickframe';
      // iframe.id = tagId;
      // iframe.name = tagId;
      iframe.frameBorder = '0';
      iframe.marginWidth = '0';
      iframe.marginHeight = '0';
      iframe.scrolling = 'no';
      iframe.setAttribute('border', '0');
      iframe.setAttribute('allowtransparency', 'true');

      iframe.height = dimensions[0][1];
      iframe.width = dimensions[0][0];

      parentEl.appendChild(iframe);

      if (iframe.contentWindow) {
        iframe.contentWindow.contents = self.iframeContent;
        iframe.src = 'javascript:window["contents"]';
        return self;
      }

      doc = iframe.document;
      if (iframe.contentDocument) {
        doc = iframe.contentDocument;
      }

      doc.open();
      doc.write(self.iframeContent);
      doc.close();
      return self;
    }

    /**
     * method for support refreshing with timer
     *
     */

  }, {
    key: 'refreshWithTimer',
    value: function refreshWithTimer(actionParam) {
      var self = myBrick.Advertising;

      if (actionParam == null) {
        actionParam = { evtname: 'refresh-timer' };
      }

      self.refresh(actionParam, true);
      var timer = (self.timer || 0) * 1000;

      if (timer > 0) {
        setTimeout(self.refreshWithTimer, timer);
      }

      return this;
    }

    /**
     * the onload method, document ready friendly
     *
     */

  }, {
    key: 'load',
    value: function load(brickid, isDebug) {
      var self = myBrick.Advertising;

      if (brickid) {
        self.brickid = brickid;
      }

      if (isDebug) {
        self.isDebug = true;
        _debug.enable('bricktag');
      }

      if (self.hasLoad) {
        return self;
      }
      self.hasLoad = true;

      return self.refreshWithTimer({ evtname: 'loading' });
    }
  }], [{
    key: 'initClass',
    value: function initClass() {
      this.prototype.pluginLoaded = true;
      /* eslint-disable */
      this.prototype.iframeContent = '<!DOCTYPE html><html> <head> <title></title> <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/1.2.1/jquery-migrate.min.js"></script> </head> <body> <script>var pwin=window.parent; try{var testwin=window.top.bricktag; pwin=window.top;}catch (e){}; try{var bt=window.bricktag=document.bricktag=pwin.bricktag; var url=bt.getAnxUrl($(document).width(), $(document).height()); document.write(url);}catch (e){}; </script> <!--REPLACEME--></body></html>';
      /* eslint-enable */
      this.prototype.defP = {
        // default action parameters *optional* means it will not break but we would want it if possible
        // required - example: registration, coupon, circular
        page: undefined,
        // required - specific action/event/behavior name (prev circular, next circular)
        evtname: undefined,
        // optional* - string identifying the department
        dept: undefined,
        // -- Device Data --
        // optional* - kios, terminal, or device Id
        // if deviceid is not unique, then the combination of storeid and deviceid should be unique
        deviceid: undefined,
        // optional* - the storeId
        storeid: undefined,
        // these are consumer data
        // optional* - the id you use to uniquely identify your consumer
        consumerid: undefined,
        // optional* - determine if consumer is anonymous or registered with your site
        isanon: true,
        // optional * - string identify consumer loyalty card id
        loyaltyid: undefined,
        // -- Consumer Interest --
        aisle: undefined, // optional - ailse
        category: undefined, // optional - category
        shelf: undefined, // optional - shelf
        brand: undefined, // optional - default brand
        pcode: undefined, // string contain product code or upc
        pdesc: undefined, // string containing product description
        latlng: undefined, // latitude, longitude if possible
        // optional - describe how you want to categorize this event/action.
        // ie. this action is part of (checkout process, circular, coupon, etc...)
        evtcategory: undefined,
        // option - event property
        // example: item id
        evtproperty: undefined,
        // option - event action
        // example: click
        evtaction: undefined,
        // example: page (order summary), evtcategory (checkout), evtname (transaction total), evtvalue (100) for $100
        evtvalue: undefined
      };
      // additional parameters TBD
      this.prototype.translator = {
        page: 'dt',
        evtname: 'en',
        dept: 'dpt',
        deviceid: 'dvceid',
        storeid: 'stid',
        consumerid: 'uid',
        isanon: 'anon',
        loyaltyid: 'loyid',
        aisle: 'aisle',
        category: 'cat',
        shelf: 'shf',
        brand: 'bn',
        pcode: 'ic',
        pdesc: 'in',
        latlng: 'lln',
        evtcategory: 'ec',
        evtproperty: 'ep',
        evtlabel: 'el',
        evtaction: 'ea',
        evtvalue: 'ev'
      };
      this.prototype.isDebug = false;
      this.prototype.hasLoad = false;
      this.prototype.brickid = 0;
      this.prototype.anxTagId = undefined;
      this.prototype.onAllEvents = undefined;
      this.prototype.oldGsnAdvertising = oldGsnAdvertising;
      this.prototype.minSecondBetweenRefresh = 2;
      this.prototype.timer = undefined;
      this.prototype.depts = '';
      this.prototype.configLoaded = false;
      this.prototype.scriptLoaded = false;
      this.prototype.gmodal = gmodal;
    }
  }]);

  return Plugin;
}();

Plugin.initClass();

var myPlugin = new Plugin();

myBrick.Advertising = myPlugin;
myBrick.Advertising.brickRedirect = myPlugin.clickBrickOffer;
myBrick.Advertising.clickBrand = myPlugin.clickBrand;
myBrick.Advertising.clickThru = myPlugin.clickProduct;
myBrick.Advertising.refreshAdPods = myPlugin.refresh;

myBrick.Advertising.logAdImpression = function () {};
// empty function, does nothing

myBrick.Advertising.logAdRequest = function () {};
// empty function, does nothing

myBrick.Advertising.promotionRedirect = myPlugin.clickPromotion;
myBrick.Advertising.verifyClickThru = myPlugin.clickLink;
myBrick.Advertising.recipeRedirect = myPlugin.clickRecipe;

// put GSN back online
win.Gsn = myBrick;
win.bricktag = myBrick.Advertising;

if (gsnContext != null) {
  myBrick.Advertising.on('clickRecipe', function (data) {
    if (data.type !== 'brickevent:clickRecipe') {
      return;
    }
    win.location.replace('/Recipes/RecipeFull.aspx?RecipeID=' + data.detail.RecipeId);
  });

  myBrick.Advertising.on('clickLink', function (data) {
    if (data.type !== 'brickevent:clickLink') {
      return;
    }

    var linkData = data.detail;

    if (linkData) {
      if (!(typeof linkData.Target === 'string')) {
        linkData.Target = '_top';
      }

      if (linkData.Target === '_blank') {
        // myBrick.Advertising.refresh()
      } else {
        var url = _tk.util.trim(linkData.Url);

        if (url === 'circular') {
          url = '/Shop/WeeklyAd.aspx';
        } else if (url === 'coupons') {
          url = '/Shop/Coupons.aspx';
        } else if (url === 'recipecenter') {
          url = '/Recipes/RecipeCenter.aspx';
        } else if (url === 'registration') {
          url = '/Profile/SignUp.aspx';
        }

        // assume this is an internal redirect
        win.location.replace(url);
      }
    }
  });
}

// auto init with attributes
// at this point, we expect Gsn.Advertising to be available from above

var aPlugin = myBrick.Advertising;

if (aPlugin) {
  var attrs = {
    debug: function debug(value) {
      if (typeof value !== 'string') {
        return;
      }
      aPlugin.isDebug = value !== 'false';
      if (value) {
        _debug.enable('bricktag');
      }
    },
    source: function source(value) {
      if (typeof value !== 'string') {
        return;
      }
      aPlugin.source = value;
    },
    brickid: function brickid(value) {
      if (!value) {
        return;
      }
      aPlugin.brickid = value;
      trakless2.setSiteId(value);
    },
    timer: function timer(value) {
      if (!value) {
        return;
      }
      aPlugin.timer = value;
    },
    cleanrefresh: function cleanrefresh(value) {
      if (!value) {
        return;
      }
      aPlugin.cleanRefresh = value;
    }
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Array.from(doc.getElementsByTagName('script'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var script = _step.value;

      if (/bricktag/i.test(script.src)) {
        var _arr = ['', 'data-'];

        for (var _i = 0; _i < _arr.length; _i++) {
          var prefix = _arr[_i];
          for (var k in attrs) {
            var fn = attrs[k];

            fn(script.getAttribute(prefix + k));
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  trakless2.setPixel(config.pixelUrl);
  trakless2.store.init({ url: config.xstoreUrl, dntIgnore: true });

  trakless2.util.ready(function () {
    return aPlugin.load();
  });
}

module.exports = aPlugin;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + module.exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

module.exports = __webpack_require__(5)(exports);

var formatters = module.exports.formatters;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

module.exports = function setup(env) {
  createDebug.debug = createDebug['default'] = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(6);

  Object.keys(env).forEach(function(key) {
    createDebug[key] = env[key];
  });

  /**
   * Active `debug` instances.
   */
  createDebug.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  createDebug.names = [];
  createDebug.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  createDebug.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = createDebug.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = createDebug.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      createDebug.formatArgs.call(self, args);

      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    //debug.formatArgs = formatArgs;
    //debug.rawLog = rawLog;

    // env-specific initialization logic for debug instances
    if ('function' === typeof createDebug.init) {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = createDebug.instances.indexOf(this);
    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    createDebug.save(namespaces);

    createDebug.names = [];
    createDebug.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    createDebug.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }

  createDebug.enable(createDebug.load());

  return createDebug;
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @api public
   */

  function require(name){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];
    var threw = true;

    try {
      fn.call(m.exports, function(req){
        var dep = modules[id][1][req];
        return require(dep || req);
      }, m, m.exports, outer, modules, cache, entries);
      threw = false;
    } finally {
      if (threw) {
        delete cache[id];
      } else if (name) {
        // expose as 'name'.
        cache[name] = cache[id];
      }
    }

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
(function() {
  var $defaults, $pixel, $sessionid, $siteid, $st, $trakless2, $userid, $uuid, Emitter, attrs, cookie, debounce, defaults, doc, docReady, domdelegate, getImage, hasNOL, isDom, lsqueue, mystore, mytrakless, myutil, query, queue, session, tracker, trakless, traklessParent, util, uuid, webanalyser, win, xstore,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  mystore = require('xstore');

  xstore = new mystore();

  Emitter = require('emitter');

  cookie = require('cookie');

  defaults = require('defaults');

  query = require('querystring');

  uuid = require('uuid');

  webanalyser = require('webanalyser');

  docReady = require('domready');

  debounce = require('debounce');

  lsqueue = require('lsqueue');

  domdelegate = require('delegate');

  queue = new lsqueue('tksq');

  win = window;

  doc = win.document;

  hasNOL = win.navigator.onLine;

  session = win.sessionStorage;

  $siteid = 0;

  $pixel = '//niiknow.github.io/pixel.gif';

  $uuid = null;

  $userid = null;

  $st = (new Date(new Date().getFullYear(), 0, 1)).getTime();

  $sessionid = new Date().getTime() - $st;

  $defaults = null;

  if (typeof session === 'undefined') {
    session = {
      getItem: function(k) {
        return cookie(k);
      },
      setItem: function(k, v) {
        return cookie(k, v, {
          path: '/'
        });
      }
    };
  }

  try {
    $sessionid = session.getItem('tklsid');
    if ($sessionid == null) {
      $sessionid = new Date().getTime() - $st;
      session.setItem('tklsid', $sessionid);
    }
  } catch (error) {

  }


  /**
   * Send image request to server using GET.
   * The infamous web bug (or beacon) is a transparent, single pixel (1x1) image
   *
   */

  getImage = function(cfgUrl, tks, qs, callback) {
    var image, url;
    image = new Image(1, 1);
    if (cfgUrl.indexOf('//') === 0) {
      cfgUrl = win.location.protocol === 'https:' ? "https:" + cfgUrl : "http:" + cfgUrl;
    }
    image.onload = function() {
      var iterator;
      iterator = 0;
      if (typeof callback === 'function') {
        callback();
      }
    };
    url = cfgUrl + (cfgUrl.indexOf('?') < 0 ? '?' : '&') + (tks + "&" + qs);
    image.src = url;
    return image;
  };


  /**
   * determine if a object is dom
   * @param  {Object}  obj the object
   * @return {Boolean}     true or false
   */

  isDom = function(obj) {
    if ((obj != null)) {
      if (obj.nodeName) {
        switch (obj.nodeType) {
          case 1:
            return true;
          case 3:
            return object.nodeValue != null;
        }
      }
    }
    return false;
  };


  /**
   *  util
   */

  util = (function() {
    function util() {
      this.lsqueue = bind(this.lsqueue, this);
    }


    /**
     * allow for getting all attributes
     *
     * @param {HTMLElement} el - element
     * @return {Object}
     */

    util.prototype.allData = function(el) {
      var attr, camelCaseName, data, i, k, len, name, ref;
      data = {};
      if ((el != null)) {
        ref = el.attributes;
        for (k = i = 0, len = ref.length; i < len; k = ++i) {
          attr = ref[k];
          name = attr.name.replace(/^data-/g, '');
          camelCaseName = name.replace(/-(.)/g, function($0, $1) {
            return $1.toUpperCase();
          });
          data[camelCaseName] = attr.value;
        }
      }
      return data;
    };


    /**
     * parse a string to JSON, return string if fail
     *
     * @param {String} v - string value
     * @return {Object}
     */

    util.prototype.parseJSON = function(v) {
      var v2;
      if (typeof v === "string") {
        if (v.indexOf('{') >= 0 || v.indexOf('[') >= 0) {
          v2 = JSON.parse(v);
          if (!(v2 == null)) {
            return v2;
          }
        }
      }
      return v;
    };


    /**
     * parse a JSON to string, return string if fail
     *
     * @param {String} v - string value
     * @return {Object}
     */

    util.prototype.stringify = function(v) {
      if (typeof v === "string") {
        return v;
      }
      return JSON.stringify(v);
    };


    /**
     * get or set session data - store in cookie
     * if no value is provided, then it is a get
     *
     * @param {String} k - key
     * @param {Object} v - value
     * @return {Object}
     */

    util.prototype.session = function(k, v) {
      if ((v != null)) {
        if (!(typeof v === "string")) {
          v = this.stringify(v);
        }
        cookie('tls_' + k, v, {
          path: '/'
        });
        return v;
      }
      v = cookie('tls_' + k);
      if (typeof v === 'undefined') {
        return v;
      }
      return this.parseJSON(v);
    };


    /**
     * cookie
     *
     */

    util.prototype.cookie = cookie;


    /**
     * document ready
     *
     */

    util.prototype.ready = docReady;


    /**
     * Emitter
     *
     */

    util.prototype.Emitter = Emitter;


    /**
     * trim
     *
     */

    util.prototype.trim = function(v) {
      return v.replace(/^\s+|\s+$/gm, '');
    };


    /**
     * event handling
     *
     */

    util.prototype.listen = domdelegate;


    /**
     * debounce
     *
     */

    util.prototype.debounce = debounce;


    /**
     * local storage queue
     *
     */

    util.prototype.lsqueue = function(name) {
      return new lsqueue(name || 'tkdefault');
    };

    return util;

  })();

  myutil = new util();


  /**
   * tracker class
   *
   */

  tracker = (function() {
    function tracker() {}

    tracker.prototype.pixel = '//niiknow.github.io/pixel.gif';

    tracker.prototype.siteid = 0;

    tracker.prototype.store = null;

    tracker.prototype.uuid = null;

    tracker.prototype.getId = function() {
      var self;
      self = this;
      return (self.siteid + "-" + self.pixel).replace(/[^a-zA-z]/gi, '$');
    };

    tracker.prototype._tk = function(data, ht, pixel) {
      var k, myData, self, tkd, v;
      self = this;
      tkd = {
        uuid: self.uuid,
        siteid: self.siteid,
        usid: $sessionid,
        ht: ht,
        z: data.z
      };
      if ($userid) {
        tkd.uid = $userid;
      }
      myData = {};
      for (k in data) {
        v = data[k];
        if (v != null) {
          if (!(typeof v === "string") || (myutil.trim(v).length > 0)) {
            if ((k + '') !== 'undefined' && k !== 'uuid' && k !== 'z' && !isDom(v)) {
              if (typeof v === 'boollean') {
                v = v ? 1 : 0;
              }
              myData[k] = v;
            }
          }
        }
      }
      self.emit('track', {
        ht: ht,
        pixel: pixel,
        qs: [tkd, myData]
      });
      getImage(pixel, query.stringify(tkd), query.stringify(myData));
      self.emit('tracked', {
        ht: ht,
        pixel: pixel,
        qs: [tkd, myData]
      });
      return self;
    };

    tracker.prototype._track = function(ht, ctx) {
      var pixel, self;
      self = this;
      if (ctx == null) {
        ctx = {};
      }
      if (self.siteid > 0) {
        pixel = myutil.trim(this.pixel);
        if (!self.uuid) {
          self.uuid = uuid();
          $uuid = self.uuid;
          if (self.store != null) {
            self.store.get('tklsuid').then(function(id) {
              if (!id) {
                self.store.set('tklsuid', self.uuid);
              }
              self.uuid = id || self.uuid;
              $uuid = self.uuid;
              return self._tk(ctx, ht, pixel);
            });
          }
          session.setItem('tklsuid', $uuid);
        } else {
          self._tk(ctx, ht, pixel);
        }
      }
      return this;
    };


    /**
     * track generic method
     *
     * @param {String} ht - hit types with possible values of 'pageview', 'event', 'transaction', 'item', 'social', 'exception', 'timing', 'app', 'custom'
     * @param {Object} ctx - extended data
     * @return {Object}
     */

    tracker.prototype.track = function(ht, ctx) {
      var self;
      self = this;
      myutil.ready(function() {
        ctx = ctx || {};
        if (!ctx.z) {
          ctx.z = new Date().getTime() - $st;
        }
        return self._track(ht || 'custom', ctx);
      });
      return this;
    };

    return tracker;

  })();

  Emitter(tracker.prototype);


  /**
   * tracker factory
   *
   */

  mytrakless = (function() {

    /**
     * create an instance of trakless
     * @return {object}
     */
    function mytrakless() {
      var self;
      self = this;
      self._track = debounce(function() {
        var item, k, ref, v;
        self = this;
        if (!hasNOL || win.navigator.onLine) {
          item = queue.pop();
          if ((item != null)) {
            self.emit('track', item);
            ref = self.trackers;
            for (k in ref) {
              v = ref[k];
              v.track(item.ht, item.ctx);
            }
            return self.emit('tracked', item);
          }
        }
      }, 222);
      return self;
    }


    /**
     * store all trackers
     * @type {Object}
     */

    mytrakless.prototype.trackers = {};


    /**
     * set default siteid
     *
     * @param {Number} siteid - the site id
     * @return {Object}
     */

    mytrakless.prototype.setSiteId = function(siteid) {
      var mysid;
      mysid = siteid + '';
      $siteid = (mysid !== 'undefined' && mysid.length > 0) ? mysid : $siteid;
    };


    /**
     * set default pixel
     *
     * @param {String} pixel - the default pixel url
     * @return {Object}
     */

    mytrakless.prototype.setPixel = function(pixelUrl) {
      if (pixelUrl) {
        $pixel = pixelUrl || $pixel;
      }
    };


    /**
     * The domain user id.
     * @param {string} id the domain user id
     */

    mytrakless.prototype.setUserId = function(id) {
      if (id) {
        $userid = id || $userid;
      }
    };


    /**
     * the storage
     *
     * @return {Object}
     */

    mytrakless.prototype.store = xstore;


    /**
     * you can provide different siteid and pixelUrl for in multi-tracker and site scenario
     *
     * @param {Number} siteid - the siteid
     * @param {String} pixelUrl - the pixel url
     * @return {Object}
     */

    mytrakless.prototype.getTracker = function(siteid, pixelUrl) {
      var id, rst, self;
      self = this;
      rst = new tracker();
      rst.siteid = siteid != null ? siteid : $siteid;
      rst.pixel = pixelUrl != null ? pixelUrl : $pixel;
      if ((rst.siteid != null) && (rst.pixel != null)) {
        rst.store = xstore;
        id = rst.getId();
        if (!self.trackers[id]) {
          self.trackers[id] = rst;
          rst.on('tracked', self._track);
        }
        return self.trackers[id];
      }
      throw "siteid or pixelUrl is required";
    };


    /**
     * get the default racker
     *
     */

    mytrakless.prototype.getDefaultTracker = function() {
      var id, self;
      self = this;
      id = ($siteid + "-" + $pixel).replace(/[^a-zA-z]/gi, '$');
      if (self.trackers[id] == null) {
        self.getTracker();
      }
      return self.trackers[id];
    };


    /**
     * utility
     *
     */

    mytrakless.prototype.util = myutil;


    /**
     * track event
     * @param  {string} category
     * @param  {string} action
     * @param  {string} label
     * @param  {string} property
     * @param  {string} value
     * @return {object}
     */

    mytrakless.prototype.event = function(category, action, label, property, value, extra) {
      extra = extra || {};
      if (!isNaN(parseInt(value))) {
        extra.ev = value;
      }
      extra.ec = category || 'event';
      if (action) {
        extra.ea = action;
      }
      if (label) {
        extra.el = label;
      }
      if (property) {
        extra.ep = property;
      }
      return this.track('event', extra);
    };


    /**
     * track page view
     * @param  {object} ctx context/addtional parameter
     * @return {object}
     */

    mytrakless.prototype.pageview = function(ctx) {
      return this.track('pageview', ctx);
    };


    /**
     * track anything
     * @param  {string} ht  hit type
     * @param  {object} ctx context/additonal parameter
     * @return {object}
     */

    mytrakless.prototype.track = function(ht, ctx) {
      var self;
      self = this;
      self.getDefaultTracker();
      ctx = ctx || {};
      ctx.z = new Date().getTime() - $st;
      queue.push({
        ht: ht,
        ctx: ctx,
        uuid: $uuid,
        usid: $sessionid,
        uid: $userid
      });
      self._track();
      return self;
    };


    /**
     * For situation when trakless is in an iframe, you can use this method
     * to emit event to the parent.
     * @param  {string} en event name
     * @param  {string} ed event detail
     * @return {object}    trakless
     */

    mytrakless.prototype.emitTop = function(en, ed) {
      if (typeof $trakless2 !== "undefined" && $trakless2 !== null) {
        $trakless2.emit(en, ed);
      }
      return this;
    };


    /**
     * Helpful utility method to parse script attribute
     * @param  {string} src name match ex: 'trakless'
     * @param  {string} attribute name handler
     */

    mytrakless.prototype.parseScriptAttributes = function(srcMatch, attrsHandler) {
      var fn, i, k, len, prefix, ref, results, script, toMatch;
      toMatch = new RegExp(srcMatch, 'i');
      ref = win.document.getElementsByTagName("script");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        script = ref[i];
        if (toMatch.test(script.src)) {
          results.push((function() {
            var j, len1, ref1, results1;
            ref1 = ['', 'data-'];
            results1 = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              prefix = ref1[j];
              results1.push((function() {
                var results2;
                results2 = [];
                for (k in attrsHandler) {
                  fn = attrsHandler[k];
                  results2.push(fn(script.getAttribute(prefix + k)));
                }
                return results2;
              })());
            }
            return results1;
          })());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    return mytrakless;

  })();

  trakless = new mytrakless;

  Emitter(trakless);

  $trakless2 = trakless;

  if (win.top !== win) {
    try {
      traklessParent = win.top.trakless;
      $trakless2 = traklessParent;
    } catch (error) {
      try {
        $trakless2 = win.parent.trakless;
      } catch (error) {
        $trakless2 = null;
      }
    }
  }

  trakless.on('track', function(item) {
    var myDef;
    if (item.ht === 'pageview') {
      myDef = webanalyser.get();
      return item.ctx = defaults(item.ctx, myDef);
    }
  });

  attrs = {
    site: function(value) {
      return trakless.setSiteId(value);
    },
    pixel: function(value) {
      if (typeof value !== "string") {
        return;
      }
      return trakless.setPixel(value);
    }
  };

  trakless.parseScriptAttributes('trakless', attrs);

  win.trakless = trakless;

  win._tk = trakless;

  module.exports = trakless;

}).call(this);

}, {"xstore":2,"emitter":3,"cookie":4,"defaults":5,"querystring":6,"uuid":7,"webanalyser":8,"domready":9,"debounce":10,"lsqueue":11,"delegate":12}],
2: [function(require, module, exports) {
// Generated by CoffeeScript 1.10.0
(function(win) {
  var cacheBust, cookie, debug, delay, dnt, doc, load, log, maxStore, mydeferred, myproxy, myq, onMessage, q, randomHash, store, usePostMessage, xstore;
  doc = win.document;
  debug = require('debug');
  log = debug('xstore');
  load = require('load-iframe');
  store = require('store.js');
  cookie = require('cookie');
  usePostMessage = win.postMessage != null;
  cacheBust = 0;
  delay = 333;
  maxStore = 6000 * 60 * 24 * 777;
  myq = [];
  q = setInterval(function() {
    if (myq.length > 0) {
      return myq.shift()();
    }
  }, delay + 5);
  dnt = win.navigator.doNotTrack || win.navigator.msDoNotTrack || win.doNotTrack;
  onMessage = function(fn) {
    if (win.addEventListener) {
      return win.addEventListener("message", fn, false);
    } else {
      return win.attachEvent("onmessage", fn);
    }
  };

  /**
   * defer/promise class
   *
   */
  mydeferred = (function() {
    var i, k, len, ref, v;

    function mydeferred() {}

    mydeferred.prototype.q = function(xs, event, item) {
      var d, dh, self;
      self = this;
      self.mycallbacks = [];
      self.myerrorbacks = [];
      dh = randomHash();
      d = [0, dh, event, item.k, item.v];
      xs.dob[dh] = self;
      if (usePostMessage) {
        xs.doPostMessage(xs, JSON.stringify(d));
      } else {
        if (xs.iframe !== null) {
          cacheBust += 1;
          d[0] = +(new Date) + cacheBust;
          xs.hash = '#' + JSON.stringify(d);
          if (xs.iframe.src) {
            xs.iframe.src = "" + proxyPage + xs.hash;
          } else if ((xs.iframe.contentWindow != null) && (xs.iframe.contentWindow.location != null)) {
            xs.iframe.contentWindow.location = "" + proxyPage + xs.hash;
          } else {
            xs.iframe.setAttribute('src', "" + proxyPage + xs.hash);
          }
        }
      }
      self.then = function(fn, fnErr) {
        if (fnErr) {
          self.myerrorbacks.push(fnErr);
        }
        self.mycallbacks.push(fn);
        return self;
      };
      return self;
    };

    mydeferred.prototype.myresolve = function(data) {
      var i, k, len, ref, self, v;
      self = this;
      ref = self.mycallbacks || [];
      for (k = i = 0, len = ref.length; i < len; k = ++i) {
        v = ref[k];
        v(data);
      }
      return self;
    };

    mydeferred.prototype.myreject = function(e) {
      var self;
      return self = this;
    };

    ref = self.myerrorbacks || [];
    for (k = i = 0, len = ref.length; i < len; k = ++i) {
      v = ref[k];
      v(data);
    }

    self;

    return mydeferred;

  })();
  myproxy = (function() {
    function myproxy() {}

    myproxy.prototype.delay = 333;

    myproxy.prototype.hash = win.location.hash;

    myproxy.prototype.init = function() {
      var self;
      self = this;
      if (usePostMessage) {
        return onMessage(self.handleProxyMessage);
      } else {
        return setInterval((function() {
          var newhash;
          newhash = win.location.hash;
          if (newhash !== xs.hash) {
            xs.hash = newhash;
            self.handleProxyMessage({
              data: JSON.parse(newhash.substr(1))
            });
          }
        }), self.delay);
      }
    };

    myproxy.prototype.handleProxyMessage = function(e) {
      var d, error, hash, id, key, method, myCacheBust, mystore, self;
      d = e.data;
      if (typeof d === "string") {
        if (/^xstore-/.test(d)) {
          d = d.split(",");
        } else {
          try {
            d = JSON.parse(d);
          } catch (error) {
            return;
          }
        }
      }
      if (!(d instanceof Array)) {
        return;
      }
      id = d[1];
      if (!/^xstore-/.test(id)) {
        return;
      }
      self = this;
      key = d[3] || 'xstore';
      method = d[2];
      cacheBust = 0;
      mystore = store;
      if (!store.enabled) {
        mystore = {
          get: function(k) {
            return cookie(key);
          },
          set: function(k, v) {
            return cookie(k, v, {
              maxage: maxStore
            });
          },
          remove: function(k) {
            return cookie(k, null);
          },
          clear: function() {
            var cookies, i, idx, k, len, name, results, v;
            cookies = doc.cookie.split(';');
            results = [];
            for (k = i = 0, len = cookies.length; i < len; k = ++i) {
              v = cookies[k];
              idx = v.indexOf('=');
              name = idx > -1 ? v.substr(0, idx) : v;
              results.push(doc.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT');
            }
            return results;
          }
        };
      }
      if (method === 'get') {
        d[4] = mystore.get(key);
      } else if (method === 'set') {
        mystore.set(key, d[4]);
      } else if (method === 'remove') {
        mystore.remove(key);
      } else if (method === 'clear') {
        mystore.clear();
      } else {
        d[2] = 'error-' + method;
      }
      d[1] = id.replace('xstore-', 'xstoreproxy-');
      if (usePostMessage) {
        e.source.postMessage(JSON.stringify(d), '*');
      } else {
        cacheBust += 1;
        myCacheBust = +(new Date) + cacheBust;
        d[0] = myCacheBust;
        hash = '#' + JSON.stringify(d);
        win.location = win.location.href.replace(win.location.hash, '') + hash;
      }
    };

    return myproxy;

  })();
  randomHash = function() {
    var rh;
    rh = Math.random().toString(36).substr(2);
    return "xstore-" + rh;
  };

  /**
   * xstore class
   *
   */
  xstore = (function() {
    function xstore() {}

    xstore.prototype.hasInit = false;

    xstore.prototype.debug = debug;

    xstore.prototype.proxyPage = '//niiknow.github.io/xstore/xstore.html';

    xstore.prototype.iframe = null;

    xstore.prototype.proxyWin = null;

    xstore.prototype.hash = null;

    xstore.prototype.tempStore = {};

    xstore.prototype.dob = {};

    xstore.prototype.get = function(k) {
      this.init();
      if (dnt) {
        return {
          then: function(fn) {
            return fn(self.tempStore[k]);
          }
        };
      }
      return (new mydeferred()).q(this, 'get', {
        'k': k
      });
    };

    xstore.prototype.set = function(k, v) {
      this.init();
      if (dnt) {
        return {
          then: function(fn) {
            self.tempStore[k] = v;
            return fn(self.tempStore[k]);
          }
        };
      }
      return (new mydeferred()).q(this, 'set', {
        'k': k,
        'v': v
      });
    };

    xstore.prototype.remove = function(k) {
      this.init();
      if (dnt) {
        return {
          then: function(fn) {
            delete self.tempStore[k];
            return fn;
          }
        };
      }
      return (new mydeferred()).q(this, 'remove', {
        'k': k
      });
    };

    xstore.prototype.clear = function() {
      this.init();
      if (dnt) {
        return {
          then: function(fn) {
            self.tempStore = {};
            return fn;
          }
        };
      }
      return (new mydeferred()).q(this, 'clear');
    };

    xstore.prototype.doPostMessage = function(xs, msg) {
      if ((xs.proxyWin != null)) {
        clearInterval(q);
        xs.proxyWin.postMessage(msg, '*');
      }
      return myq.push(function() {
        return xs.doPostMessage(xs, msg);
      });
    };

    xstore.prototype.handleMessageEvent = function(e) {
      var d, di, error, id, self;
      self = this;
      d = e.data;
      if (typeof d === "string") {
        if (/^xstoreproxy-/.test(d)) {
          d = d.split(",");
        } else {
          try {
            d = JSON.parse(d);
          } catch (error) {
            return;
          }
        }
      }
      if (!(d instanceof Array)) {
        return;
      }
      id = d[1];
      if (!/^xstoreproxy-/.test(id)) {
        return;
      }
      id = id.replace('xstoreproxy-', 'xstore-');
      di = self.dob[id];
      if (di) {
        if (/^error-/.test(d[2])) {
          di.myreject(d[2]);
        } else {
          di.myresolve(d[4]);
        }
        return self.dob[id] = null;
      }
    };

    xstore.prototype.init = function(options) {
      var iframe, self;
      self = this;
      if (self.hasInit) {
        return self;
      }
      self.hasInit = true;
      options = options || {};
      if (options.isProxy) {
        log('init proxy');
        (new myproxy()).init();
        return self;
      }
      self.proxyPage = options.url || self.proxyPage;
      if (options.dntIgnore || typeof dnt === 'undefined' || dnt === 'unspecified' || dnt === 'no' || dnt === '0') {
        log("disable dnt");
        dnt = false;
      }
      log("init storeage dnt = " + dnt);
      return iframe = load(self.proxyPage, function() {
        log('iframe loaded');
        self.proxyWin = iframe.contentWindow;
        if (!usePostMessage) {
          self.hash = proxyWin.location.hash;
          return setInterval((function() {
            if (proxyWin.location.hash !== hash) {
              self.hash = proxyWin.location.hash;
              self.handleMessageEvent({
                origin: proxyDomain,
                data: self.hash.substr(1)
              });
            }
          }), delay);
        } else {
          return onMessage(function() {
            return self.handleMessageEvent(arguments[0]);
          });
        }
      });
    };

    return xstore;

  })();
  return module.exports = xstore;
})(window);

}, {"debug":13,"load-iframe":14,"store.js":15,"cookie":16}],
13: [function(require, module, exports) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

}, {"./debug":17}],
17: [function(require, module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

}, {"ms":18}],
18: [function(require, module, exports) {
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

}, {}],
14: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var onload = require('script-onload');
var tick = require('next-tick');
var type = require('type');

/**
 * Expose `loadScript`.
 *
 * @param {Object} options
 * @param {Function} fn
 * @api public
 */

module.exports = function loadIframe(options, fn){
  if (!options) throw new Error('Cant load nothing...');

  // Allow for the simplest case, just passing a `src` string.
  if ('string' == type(options)) options = { src : options };

  var https = document.location.protocol === 'https:' ||
              document.location.protocol === 'chrome-extension:';

  // If you use protocol relative URLs, third-party scripts like Google
  // Analytics break when testing with `file:` so this fixes that.
  if (options.src && options.src.indexOf('//') === 0) {
    options.src = https ? 'https:' + options.src : 'http:' + options.src;
  }

  // Allow them to pass in different URLs depending on the protocol.
  if (https && options.https) options.src = options.https;
  else if (!https && options.http) options.src = options.http;

  // Make the `<iframe>` element and insert it before the first iframe on the
  // page, which is guaranteed to exist since this Javaiframe is running.
  var iframe = document.createElement('iframe');
  iframe.src = options.src;
  iframe.width = options.width || 1;
  iframe.height = options.height || 1;
  iframe.style.display = 'none';

  // If we have a fn, attach event handlers, even in IE. Based off of
  // the Third-Party Javascript script loading example:
  // https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html
  if ('function' == type(fn)) {
    onload(iframe, fn);
  }

  tick(function(){
    // Append after event listeners are attached for IE.
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(iframe, firstScript);
  });

  // Return the iframe element in case they want to do anything special, like
  // give it an ID or attributes.
  return iframe;
};
}, {"script-onload":19,"next-tick":20,"type":21}],
19: [function(require, module, exports) {

// https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html

/**
 * Invoke `fn(err)` when the given `el` script loads.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api public
 */

module.exports = function(el, fn){
  return el.addEventListener
    ? add(el, fn)
    : attach(el, fn);
};

/**
 * Add event listener to `el`, `fn()`.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function add(el, fn){
  el.addEventListener('load', function(_, e){ fn(null, e); }, false);
  el.addEventListener('error', function(e){
    var err = new Error('script error "' + el.src + '"');
    err.event = e;
    fn(err);
  }, false);
}

/**
 * Attach event.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function attach(el, fn){
  el.attachEvent('onreadystatechange', function(e){
    if (!/complete|loaded/.test(el.readyState)) return;
    fn(null, e);
  });
  el.attachEvent('onerror', function(e){
    var err = new Error('failed to load the script "' + el.src + '"');
    err.event = e || window.event;
    fn(err);
  });
}

}, {}],
20: [function(require, module, exports) {
"use strict"

if (typeof setImmediate == 'function') {
  module.exports = function(f){ setImmediate(f) }
}
// legacy node.js
else if (typeof process != 'undefined' && typeof process.nextTick == 'function') {
  module.exports = process.nextTick
}
// fallback for other environments / postMessage behaves badly on IE8
else if (typeof window == 'undefined' || window.ActiveXObject || !window.postMessage) {
  module.exports = function(f){ setTimeout(f) };
} else {
  var q = [];

  window.addEventListener('message', function(){
    var i = 0;
    while (i < q.length) {
      try { q[i++](); }
      catch (e) {
        q = q.slice(i);
        window.postMessage('tic!', '*');
        throw e;
      }
    }
    q.length = 0;
  }, true);

  module.exports = function(fn){
    if (!q.length) window.postMessage('tic!', '*');
    q.push(fn);
  }
}

}, {}],
21: [function(require, module, exports) {
/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  if (isBuffer(val)) return 'buffer';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val);

  return typeof val;
};

// code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
function isBuffer(obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

}, {}],
15: [function(require, module, exports) {
"use strict"
// Module export pattern from
// https://github.com/umdjs/umd/blob/master/returnExports.js
;(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.store = factory();
  }
}(this, function () {
	
	// Store.js
	var store = {},
		win = (typeof window != 'undefined' ? window : global),
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.version = '1.3.20'
	store.set = function(key, value) {}
	store.get = function(key, defaultVal) {}
	store.has = function(key) { return store.get(key) !== undefined }
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (defaultVal == null) {
			defaultVal = {}
		}
		var val = store.get(key, defaultVal)
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {}
	store.forEach = function() {}

	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key, defaultVal) {
			var val = store.deserialize(storage.getItem(key))
			return (val === undefined ? defaultVal : val)
		}
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.getAll = function() {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc && doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		var withIEStorage = function(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		var ieKeyFix = function(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key, defaultVal) {
			key = ieKeyFix(key)
			var val = store.deserialize(storage.getAttribute(key))
			return (val === undefined ? defaultVal : val)
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=attributes.length-1; i>=0; i--) {
				storage.removeAttribute(attributes[i].name)
			}
			storage.save(localStorageName)
		})
		store.getAll = function(storage) {
			var ret = {}
			store.forEach(function(key, val) {
				ret[key] = val
			})
			return ret
		}
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled
	
	return store
}));

}, {}],
16: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var debug = require('debug')('cookie');

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function(name, value, options){
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date + options.maxage);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  var str;
  try {
    str = document.cookie;
  } catch (err) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(err.stack || err);
    }
    return {};
  }
  return parse(str);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value){
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug('error `encode(%o)` - %o', value, e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug('error `decode(%o)` - %o', value, e)
  }
}

}, {"debug":22}],
22: [function(require, module, exports) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

}, {"./debug":23}],
23: [function(require, module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

}, {"ms":18}],
3: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = index(callbacks, fn._off || fn);
  if (~i) callbacks.splice(i, 1);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

}, {"indexof":24}],
24: [function(require, module, exports) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
}, {}],
4: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var debug = require('debug')('cookie');

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function(name, value, options){
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date + options.maxage);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  return parse(document.cookie);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value){
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug('error `encode(%o)` - %o', value, e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug('error `decode(%o)` - %o', value, e)
  }
}

}, {"debug":25}],
25: [function(require, module, exports) {
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}, {"./debug":26}],
26: [function(require, module, exports) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

}, {"ms":18}],
5: [function(require, module, exports) {
'use strict';

/**
 * Merge default values.
 *
 * @param {Object} dest destination object
 * @param {Object} src source object
 * @param {Boolean} recursive merge into destination recursively (default: false)
 * @return {Object} dest object
 */
var defaults = function (dest, src, recursive) {
  for (var prop in src) {
    if (! src.hasOwnProperty(prop)) {
      continue;
    }

    if (recursive && dest[prop] instanceof Object && src[prop] instanceof Object) {
      dest[prop] = defaults(dest[prop], src[prop], true);
    } else if (! (prop in dest)) {
      dest[prop] = src[prop];
    }
  }

  return dest;
};

/**
 * Expose `defaults`.
 */
module.exports = defaults;

}, {}],
6: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var encode = encodeURIComponent;
var decode = decodeURIComponent;
var trim = require('trim');
var type = require('type');

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = /(\w+)\[(\d+)\]/.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};

}, {"trim":27,"type":21}],
27: [function(require, module, exports) {

exports = module.exports = trim;

function trim(str){
  if (str.trim) return str.trim();
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  if (str.trimLeft) return str.trimLeft();
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  if (str.trimRight) return str.trimRight();
  return str.replace(/\s*$/, '');
};

}, {}],
7: [function(require, module, exports) {

/**
 * Taken straight from jed's gist: https://gist.github.com/982883
 *
 * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a random hexadecimal digit from 0 to f, and
 * y is replaced with a random hexadecimal digit from 8 to b.
 */

module.exports = function uuid(a){
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      >> a/4         // 8 to 11
      ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      [1e7] +        // 10000000 +
      -1e3 +         // -1000 +
      -4e3 +         // -4000 +
      -8e3 +         // -80000000 +
      -1e11          // -100000000000,
      ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        uuid         // random hex digits
      )
};
}, {}],
8: [function(require, module, exports) {
// Generated by CoffeeScript 1.10.0
(function(win) {
  'use strict';
  var $df, $doc, $loc, $nav, $scr, $win, defaults, fd, result, webanalyser;
  defaults = require('defaults');
  fd = require('flashdetect');
  $win = win;
  $doc = $win.document;
  $nav = $win.navigator;
  $scr = $win.screen;
  $loc = $win.location;
  $df = {
    sr: $scr.width + "x" + $scr.height,
    vp: $scr.availWidth + "x" + $scr.availHeight,
    sd: $scr.colorDepth,
    je: $nav.javaEnabled ? ($nav.javaEnabled() ? 1 : 0) : 0,
    ul: $nav.languages ? $nav.languages[0] : $nav.language || $nav.userLanguage || $nav.browserLanguage
  };

  /**
   * webanalyser
   */
  webanalyser = (function() {
    function webanalyser() {}

    webanalyser.prototype.get = function() {
      var rst;
      if ($df.z == null) {
        rst = {
          dr: $doc.referrer,
          dh: $loc.hostname,
          z: new Date().getTime()
        };
        if (fd.installed) {
          rst.fl = fd.major + " " + fd.minor + " " + fd.revisionStr;
        }
        $df = defaults(rst, $df);
      }
      $df.dl = $loc.href;
      $df.dt = $doc.title;
      return $df;
    };

    webanalyser.prototype.windowSize = function() {
      var rst;
      rst = {
        w: 0,
        h: 0
      };
      if (typeof $win.innerWidth === 'number') {
        rst.w = $win.innerWidth;
        rst.h = $win.innerHeight;
      } else if ($doc.documentElement && ($doc.documentElement.clientWidth || $doc.documentElement.clientHeight)) {
        rst.w = $doc.documentElement.clientWidth;
        rst.h = $doc.documentElement.clientHeight;
      } else if ($doc.body && ($doc.body.clientWidth || $doc.body.clientHeight)) {
        rst.w = $doc.body.clientWidth;
        rst.h = $doc.body.clientHeight;
      }
      return rst;
    };

    return webanalyser;

  })();
  result = new webanalyser();
  return module.exports = result;
})(window);

}, {"defaults":28,"flashdetect":29}],
28: [function(require, module, exports) {
'use strict';

/**
 * Merge default values.
 *
 * @param {Object} dest
 * @param {Object} defaults
 * @return {Object}
 * @api public
 */
var defaults = function (dest, src, recursive) {
  for (var prop in src) {
    if (recursive && dest[prop] instanceof Object && src[prop] instanceof Object) {
      dest[prop] = defaults(dest[prop], src[prop], true);
    } else if (! (prop in dest)) {
      dest[prop] = src[prop];
    }
  }

  return dest;
};

/**
 * Expose `defaults`.
 */
module.exports = defaults;

}, {}],
29: [function(require, module, exports) {
/*
Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
Code licensed under the BSD License: http://www.featureblend.com/license.txt
Version: 1.0.4
*/
var flashdetect = new function(){
    var self = this;
    self.installed = false;
    self.raw = "";
    self.major = -1;
    self.minor = -1;
    self.revision = -1;
    self.revisionStr = "";
    var activeXDetectRules = [
        {
            "name":"ShockwaveFlash.ShockwaveFlash.7",
            "version":function(obj){
                return getActiveXVersion(obj);
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash.6",
            "version":function(obj){
                var version = "6,0,21";
                try{
                    obj.AllowScriptAccess = "always";
                    version = getActiveXVersion(obj);
                }catch(err){}
                return version;
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash",
            "version":function(obj){
                return getActiveXVersion(obj);
            }
        }
    ];
    /**
     * Extract the ActiveX version of the plugin.
     * 
     * @param {Object} The flash ActiveX object.
     * @type String
     */
    var getActiveXVersion = function(activeXObj){
        var version = -1;
        try{
            version = activeXObj.GetVariable("$version");
        }catch(err){}
        return version;
    };
    /**
     * Try and retrieve an ActiveX object having a specified name.
     * 
     * @param {String} name The ActiveX object name lookup.
     * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
     * @type Object
     */
    var getActiveXObject = function(name){
        var obj = -1;
        try{
            obj = new ActiveXObject(name);
        }catch(err){
            obj = {activeXError:true};
        }
        return obj;
    };
    /**
     * Parse an ActiveX $version string into an object.
     * 
     * @param {String} str The ActiveX Object GetVariable($version) return value. 
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    var parseActiveXVersion = function(str){
        var versionArray = str.split(",");//replace with regex
        return {
            "raw":str,
            "major":parseInt(versionArray[0].split(" ")[1], 10),
            "minor":parseInt(versionArray[1], 10),
            "revision":parseInt(versionArray[2], 10),
            "revisionStr":versionArray[2]
        };
    };
    /**
     * Parse a standard enabledPlugin.description into an object.
     * 
     * @param {String} str The enabledPlugin.description value.
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    var parseStandardVersion = function(str){
        var descParts = str.split(/ +/);
        var majorMinor = descParts[2].split(/\./);
        var revisionStr = descParts[3];
        return {
            "raw":str,
            "major":parseInt(majorMinor[0], 10),
            "minor":parseInt(majorMinor[1], 10), 
            "revisionStr":revisionStr,
            "revision":parseRevisionStrToInt(revisionStr)
        };
    };
    /**
     * Parse the plugin revision string into an integer.
     * 
     * @param {String} The revision in string format.
     * @type Number
     */
    var parseRevisionStrToInt = function(str){
        return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
    };
    /**
     * Is the major version greater than or equal to a specified version.
     * 
     * @param {Number} version The minimum required major version.
     * @type Boolean
     */
    self.majorAtLeast = function(version){
        return self.major >= version;
    };
    /**
     * Is the minor version greater than or equal to a specified version.
     * 
     * @param {Number} version The minimum required minor version.
     * @type Boolean
     */
    self.minorAtLeast = function(version){
        return self.minor >= version;
    };
    /**
     * Is the revision version greater than or equal to a specified version.
     * 
     * @param {Number} version The minimum required revision version.
     * @type Boolean
     */
    self.revisionAtLeast = function(version){
        return self.revision >= version;
    };
    /**
     * Is the version greater than or equal to a specified major, minor and revision.
     * 
     * @param {Number} major The minimum required major version.
     * @param {Number} (Optional) minor The minimum required minor version.
     * @param {Number} (Optional) revision The minimum required revision version.
     * @type Boolean
     */
    self.versionAtLeast = function(major){
        var properties = [self.major, self.minor, self.revision];
        var len = Math.min(properties.length, arguments.length);
        for(i=0; i<len; i++){
            if(properties[i]>=arguments[i]){
                if(i+1<len && properties[i]==arguments[i]){
                    continue;
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }
    };
    /**
     * Constructor, sets raw, major, minor, revisionStr, revision and installed public properties.
     */
    self.flashdetect = function(){
        if(navigator.plugins && navigator.plugins.length>0){
            var type = 'application/x-shockwave-flash';
            var mimeTypes = navigator.mimeTypes;
            if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
                var version = mimeTypes[type].enabledPlugin.description;
                var versionObj = parseStandardVersion(version);
                self.raw = versionObj.raw;
                self.major = versionObj.major;
                self.minor = versionObj.minor; 
                self.revisionStr = versionObj.revisionStr;
                self.revision = versionObj.revision;
                self.installed = true;
            }
        }else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
            var version = -1;
            for(var i=0; i<activeXDetectRules.length && version==-1; i++){
                var obj = getActiveXObject(activeXDetectRules[i].name);
                if(!obj.activeXError){
                    self.installed = true;
                    version = activeXDetectRules[i].version(obj);
                    if(version!=-1){
                        var versionObj = parseActiveXVersion(version);
                        self.raw = versionObj.raw;
                        self.major = versionObj.major;
                        self.minor = versionObj.minor; 
                        self.revision = versionObj.revision;
                        self.revisionStr = versionObj.revisionStr;
                    }
                }
            }
        }
    }();
};
flashdetect.JS_RELEASE = "1.0.4";

module.exports = flashdetect;

}, {}],
9: [function(require, module, exports) {
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})

}, {}],
10: [function(require, module, exports) {

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

}, {"date-now":30}],
30: [function(require, module, exports) {
module.exports = Date.now || now

function now() {
    return new Date().getTime()
}

}, {}],
11: [function(require, module, exports) {
// Generated by CoffeeScript 1.9.2
var debounce, lsqueue, store;

require('json-fallback');

debounce = require('debounce');

store = require('store.js');


/**
 * a queue backed by localStorage
 * new queue("name")
 */

lsqueue = (function() {
  function lsqueue(name) {
    var self;
    self = this;
    self.qn = name || "queue";
    self.items = [];
    self.persist = debounce(function() {
      if (!store.enabled) {
        return self;
      }
      try {
        store.set(self.qn, self.items);
      } catch (_error) {

      }
      return self;
    }, 111);
    return self;
  }

  lsqueue.prototype.push = function(v) {
    var self;
    self = this;
    self.items.push(v);
    self.persist();
    return self;
  };

  lsqueue.prototype.pop = function() {
    var rst, self;
    self = this;
    if (self.items.length > 0) {
      rst = self.items.shift();
      self.persist();
      return rst;
    }
  };

  lsqueue.prototype.clear = function() {
    var self;
    self = this;
    self.items = [];
    self.persist();
    return self;
  };

  return lsqueue;

})();

module.exports = lsqueue;

}, {"json-fallback":31,"debounce":32}],
31: [function(require, module, exports) {
/*
    json2.js
    2014-02-04

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

(function () {
    'use strict';

    var JSON = module.exports = {};

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

}, {}],
32: [function(require, module, exports) {
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

}, {}],
12: [function(require, module, exports) {
/**
 * Module dependencies.
 */

var closest = require('closest')
  , event = require('event');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};

}, {"closest":33,"event":34}],
33: [function(require, module, exports) {
/**
 * Module Dependencies
 */

try {
  var matches = require('matches-selector')
} catch (err) {
  var matches = require('component-matches-selector')
}

/**
 * Export `closest`
 */

module.exports = closest

/**
 * Closest
 *
 * @param {Element} el
 * @param {String} selector
 * @param {Element} scope (optional)
 */

function closest (el, selector, scope) {
  scope = scope || document.documentElement;

  // walk up the dom
  while (el && el !== scope) {
    if (matches(el, selector)) return el;
    el = el.parentNode;
  }

  // check scope for match
  return matches(el, selector) ? el : null;
}

}, {"matches-selector":35,"component-matches-selector":35}],
35: [function(require, module, exports) {
/**
 * Module dependencies.
 */

try {
  var query = require('query');
} catch (err) {
  var query = require('component-query');
}

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

}, {"query":36,"component-query":36}],
36: [function(require, module, exports) {
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

}, {}],
34: [function(require, module, exports) {
var bind, unbind, prefix;

function detect () {
  bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
  unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
  prefix = bind !== 'addEventListener' ? 'on' : '';
}

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (!bind) detect();
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (!unbind) detect();
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

}, {}]}, {}, {"1":""})
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(0), __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(9);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *  wu.js - v0.3.1
 *  build: Wed Jun 13 2018 11:50:02 GMT-0500 (CDT)
 *  web utils
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Wu", [], factory);
	else if(typeof exports === 'object')
		exports["Wu"] = factory();
	else
		root["Wu"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(8);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domify = __webpack_require__(3);

var _domify2 = _interopRequireDefault(_domify);

var _componentEmitter = __webpack_require__(4);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _debounce = __webpack_require__(5);

var _debounce2 = _interopRequireDefault(_debounce);

var _componentCookie = __webpack_require__(6);

var _componentCookie2 = _interopRequireDefault(_componentCookie);

var _debug = __webpack_require__(0);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myRoot = { navigator: { userAgent: '' }, location: { protocol: 'file', hostname: '' } };

// Establish the object that gets returned to break out of a loop iteration.
var breaker = {};

// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;

// Create quick reference variables for speed access to core prototypes.
var slice = ArrayProto.slice,
    hasOwnProperty = ObjProto.hasOwnProperty;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeForEach = ArrayProto.forEach,
    nativeMap = ArrayProto.map,
    nativeSome = ArrayProto.some,
    nativeIndexOf = ArrayProto.indexOf,
    nativeKeys = Object.keys;

function isNull(obj, defaultValue) {
  return typeof obj === 'undefined' || obj === null || obj === 'null' ? defaultValue : obj;
};

var userAgent = myRoot.navigator.userAgent;

if (typeof window !== 'undefined') {
  myRoot = window;
}

function detectIe() {
  var ua = userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');
  var rv = ua.indexOf('rv:');

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  if (trident > 0) {
    // IE 11 (or newer) => return version number
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  // other browser
  return false;
};

function has(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function keys(obj) {
  if (nativeKeys) {
    return nativeKeys(obj);
  }

  if (obj !== Object(obj)) {
    throw new TypeError('Invalid object');
  }

  var keys = [],
      key = void 0;

  for (key in obj) {
    if (has(obj, key)) keys.push(key);
  }

  return keys;
};

function each(obj, iterator, context) {
  if (isNull(obj, null) === null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    var mykeys = keys(obj);

    for (var j = 0, length2 = mykeys.length; j < length2; j++) {
      if (iterator.call(context, obj[mykeys[j]], mykeys[j], obj) === breaker) return;
    }
  }
};

/**
 * Wu is short for Web Utilities
 */

var Wu = function () {
  function Wu() {
    _classCallCheck(this, Wu);

    this._name = 'Wu';
    this.browser = {
      isIE: detectIe(),
      isMobile: /iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/gi.test(userAgent),
      isAndroid: /(android)/gi.test(userAgent),
      isIOS: /iP(hone|od|ad)/gi.test(userAgent)
    };

    this.has = has;
    this.keys = keys;
    this.each = this.forEach = each;

    this.isNull = isNull;
    this.win = myRoot;
    this.doc = this.win.document || {};
    this.collect = this.map;
    this.any = this.some;
    this.attr = this.getAttribute = this.getAttr;
    this.setAttribute = this.setAttr;
    this.emitter = _componentEmitter2.default;
    this.domify = _domify2.default;
    this.debounce = _debounce2.default;
    this.cookie = _componentCookie2.default;
    this.debug = _debug2.default;

    // dummy up console log for IE
    if (typeof this.win.console === 'undefined') {
      this.win.console = { log: function log() {} };
      this.win.console.error = this.win.console.debug = this.win.console.info = this.win.console.log;
    }

    var hostname = this.trim(this.win.location.hostname.toLowerCase());

    // init current site config
    this.site = { hostname: hostname, domain: hostname.replace('www.', ''), config: {} };
  }

  /**
   * get the name of the library
   * @return {string} library name
   */


  _createClass(Wu, [{
    key: 'addEvent',


    /**
     * cross browser attach event
     * @param {object} obj     source object
     * @param {string} evtName event name
     * @param {object}         self
     */
    value: function addEvent(obj, evtName, func) {
      if (obj.addEventListener) {
        obj.addEventListener(evtName, func, false);
      } else if (obj.attachEvent) {
        obj.attachEvent(evtName, func);
      } else if (this.getAttr(obj, 'on' + evtName)) {
        obj['on' + evtName] = func;
      } else {
        obj[evtName] = func;
      }
      return this;
    }

    /**
     * cross browser detach event
     * @param {object} obj     source object
     * @param {string} evtName event name
     * @param {object}         self
     */

  }, {
    key: 'removeEvent',
    value: function removeEvent(obj, evtName, func) {
      if (obj.removeEventListener) {
        obj.removeEventListener(evtName, func, false);
      } else if (obj.detachEvent) {
        obj.detachEvent(evtName, func);
      } else if (this.getAttr(obj, 'on' + evtName)) {
        obj['on' + evtName] = null;
      } else {
        obj[evtName] = null;
      }
      return this;
    }

    /**
     * safely decode the string
     * @param  {string} str
     * @return {string} url decoded string
     */

  }, {
    key: 'decode',
    value: function decode(str) {
      try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
      } catch (e) {
        return str;
      }
    }

    /**
     * safely encode the string
     * @param  {string} str
     * @return {string} url encoded string
     */

  }, {
    key: 'encode',
    value: function encode(str) {
      try {
        return encodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }

    /**
     * get distance between two points
     * @param  {number} latitude1
     * @param  {number} longitude1
     * @param  {number} latitude2
     * @param  {number} longitude2
     * @param  {object} options
     * @return {number}
     */

  }, {
    key: 'geoDistance',
    value: function geoDistance(latitude1, longitude1, latitude2, longitude2, options) {
      options = options || {};

      function toRad(num) {
        return num * Math.PI / 180;
      }

      var start = { latitude: latitude1, longitude: longitude1 };
      var end = { latitude: latitude2, longitude: longitude2 };
      var radii = { km: 6371, mile: 3960, meter: 6371000, nmi: 3440 };
      var R = options.unit in radii ? radii[options.unit] : radii.km;
      var dLat = toRad(end.latitude - start.latitude);
      var dLon = toRad(end.longitude - start.longitude);
      var lat1 = toRad(start.latitude);
      var lat2 = toRad(end.latitude);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      if (options.threshold) {
        return options.threshold > R * c;
      }

      return R * c;
    }

    /**
     * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
     * @param  {array}    points
     * @param  {object}   origin point
     * @param  {function} callback    the closure function on result
     */

  }, {
    key: 'geoOrderByOrigin',
    value: function geoOrderByOrigin(points, origin, callback) {
      var that = this;
      var result = { origin: origin, results: [] };

      each(points, function (point) {
        var d = that.geoDistance(origin.Latitude, origin.Longitude, point.Latitude, point.Longitude, { unit: 'mile' });
        var newPoint = { point: point, distance: parseFloat(that.isNull(d, 0)).toFixed(2) };

        result.results.push(newPoint);
      });

      this.sortOn(result.results, 'distance');
      callback(result);
      return this;
    }

    /**
     * sort with nearest geopoint, expect object with two properties: Latitude and Longitude
     * @param  {array}    points
     * @params {string}   jsonpUrl    the jsonp url without any query string
     */

  }, {
    key: 'geoOrderByIP',
    value: function geoOrderByIP(points, jsonpUrl, callback) {
      var that = this;

      this.geoByIP(jsonpUrl, function (rst) {
        if (rst.latitude) {
          rst.Latitude = rst.latitude;
          rst.Longitude = rst.longitude;
          that.geoOrderByOrigin(points, rst, callback);
        }
      });

      return this;
    }

    /**
     * locate geo by IP
     * @param  {string}   jsonpUrl    the jsonp url without any query string
     * @param  {function} callback    the closure function on result
     */

  }, {
    key: 'geoByIP',
    value: function geoByIP(jsonpUrl, callback) {
      this.jsonp(jsonpUrl || '//freegeoip.net/json/', callback);
    }

    /**
     * cross browser get of xhr
     * @return {object} the xhr
     */

  }, {
    key: 'getAjaxObject',
    value: function getAjaxObject() {
      return 'XMLHttpRequest' in window ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    /**
     * helper method to get attribute on specific dom object
     * @param  {object} dom  element
     * @param  {string} attr attribute name
     * @param  {object} value attribute value
     * @return {string}      attribute value
     */

  }, {
    key: 'getAttr',
    value: function getAttr(dom, attr, val) {
      if (arguments.length > 2) {
        return this.setAttr(dom, attr, val);
      }

      var el = dom[0] || dom;

      return el.getAttribute ? el.getAttribute(attr) : el[attr];
    }

    /**
     * help method to get multiple attributes
     * @param  {object} dom   element
     * @param  {array}  attrs array of attribute names
     * @return {string}       result object
     */

  }, {
    key: 'getAttrs',
    value: function getAttrs(dom, attrs) {
      var rst = {};
      var that = this;

      each(['', 'data-'], function (v, k) {
        each(attrs || [], function (v2, k2) {
          var attr = that.getAttr(dom, v + k2);

          if (attr) {
            rst[k2] = attr;
          }
        });
      });

      return rst;
    }

    /**
     * helper method to set attribute
     * @param {object} dom   element
     * @param {string} attr  attribute name
     * @param {object} value attribute value
     */

  }, {
    key: 'setAttr',
    value: function setAttr(dom, attr, value) {
      var el = dom[0] || dom;

      if (el.setAttribute) {
        el.setAttribute(attr, value);
      } else {
        el[attr] = value;
      };

      return value;
    }

    /**
     * help method to set attributes
     * @param {object} dom   element
     * @param {object} attrs key value pair object
     */

  }, {
    key: 'setAttrs',
    value: function setAttrs(dom, attrs) {
      var el = dom[0] || dom;
      var that = this;

      each(attrs || [], function (v, k) {
        that.setAttr(el, k, v);
      });

      return el;
    }

    /**
     * determine if array contain item
     * @param  {array}  obj    array
     * @param  {object} target item
     * @return {bool}          true if item exists
     */

  }, {
    key: 'contains',
    value: function contains(obj, target) {
      if (this.isNull(obj, null) === null) return false;
      if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) !== -1;

      return this.any(obj, function (value) {
        return value === target;
      });
    }

    /**
     * create an iframe
     * @return {object} the iframe
     */

  }, {
    key: 'createiFrame',
    value: function createiFrame(id, className) {
      var iframe = this.doc.createElement('iframe');

      if (id) iframe.id = id;
      if (className) iframe.className = className;

      iframe.frameBorder = '0';
      iframe.marginWidth = '0';
      iframe.marginHeight = '0';
      iframe.setAttribute('border', '0');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.width = '100%';
      iframe.height = '100%';

      return iframe;
    }

    /**
     * delete an object property
     * @param  {object} obj the object
     * @param  {string} key the property name
     * @return {object}     the result object
     */

  }, {
    key: 'del',
    value: function del(obj, key) {
      obj[key] = undefined;
      try {
        delete obj[key];
      } catch (e) {
        var items = {};

        each(obj, function (v, k) {
          if (k !== key) {
            items[k] = v;
          }
        });

        return items;
      }

      return obj;
    }

    /**
     * apply all valid property of default object to dest object where null
     * @param  {object} dest     the dest object
     * @param  {object} default  the default object
     * @return {object}      the result object
     */

  }, {
    key: 'defaults',
    value: function defaults(dest) {
      each(slice.call(arguments, 1), function (source) {
        if (typeof source !== 'undefined') {
          each(source, function (v, k) {
            if (isNull(dest[k], null) === null) {
              dest[k] = v;
            }
          });
        }
      });

      return dest;
    }

    /**
     * apply all valid property of source object to dest object
     * @param  {object} dest the dest object
     * @param  {object} src  the source object
     * @return {object}      the result object
     */

  }, {
    key: 'extend',
    value: function extend(dest) {
      each(slice.call(arguments, 1), function (source) {
        if (typeof source !== 'undefined') {
          each(source, function (v, k) {
            if (isNull(v, null) !== null) {
              dest[k] = v;
            }
          });
        }
      });

      return dest;
    }

    /**
     * group a list by some key attribute
     * @param  {array}      list                list or array of objects
     * @param  {string}     attribute           object key property name
     * @param  {Function}   postProcessFunction do something on each group
     * @return {array}                      group result
     */

  }, {
    key: 'groupBy',
    value: function groupBy(list, attribute, postProcessFunction) {
      if (this.isNull(list, null) === null) return [];

      // First, reset declare result.
      var groups = [],
          grouper = {};

      // this make sure all elements are correctly sorted
      each(list, function (item) {
        var groupKey = item[attribute],
            group = grouper[groupKey];

        if (isNull(group, null) === null) {
          group = {
            key: groupKey,
            items: []
          };
          grouper[groupKey] = group;
        }
        group.items.push(item);
      });

      // finally, sort on group
      var i = 0;

      each(grouper, function (myGroup) {
        myGroup.$idx = i++;
        groups.push(myGroup);

        if (postProcessFunction) postProcessFunction(myGroup);
      });

      return this.sortOn(groups, 'key');
    }

    /**
     * helper method to determine if an element has class
     * @param  {HTMLElement}  el
     * @param  {string}       cls class names
     * @return {Boolean}
     */

  }, {
    key: 'hasCls',
    value: function hasCls(el, cls) {
      var i = void 0,
          k = void 0,
          len = void 0,
          ref = void 0,
          v = void 0;

      ref = cls.split(' ');
      for (k = i = 0, len = ref.length; i < len; k = ++i) {
        v = ref[k];
        if ((' ' + el.className + ' ').indexOf(' ' + v + ' ') >= 0) {
          return true;
        }
      }

      return false;
    }

    /**
     * Helper method to inject your own css.
     * You must first create the element
     * and property it with an id.
     * @param  {string} id  css id
     * @param  {string} css the css text
     * @return {Object}
     */

  }, {
    key: 'injectStyle',
    value: function injectStyle(id, css) {
      var el = void 0,
          elx = void 0,
          self = this;

      el = self.doc.getElementById(id);

      if (!el) {
        el = self.doc.createElement('style');
        el.id = id;
        el.type = 'text/css';
        if (el.styleSheet) {
          el.styleSheet.cssText = css;
        } else {
          el.appendChild(self.doc.createTextNode(css));
        }
        elx = self.doc.getElementsByTagName('link')[0];
        elx = elx || (self.doc.head || self.doc.getElementsByTagName('head')[0]).lastChild;
        elx.parentNode.insertBefore(el, elx);
      }

      return self;
    }

    /**
     * jsonp load
     * @param  {string}   uri      jsonp url with callback query string
     * @param  {Function} callback jsonp handler
     */

  }, {
    key: 'jsonp',
    value: function jsonp(uri, callback) {
      var callbackVar = 'wucb' + new Date().getTime();

      this.win[callbackVar] = function (svrRsp) {
        var rsp = svrRsp;

        if (typeof svrRsp === 'string') {
          if (svrRsp === 'null') {
            rsp = null;
          } else {
            rsp = JSON.parse(svrRsp);
          }
        }

        callback(rsp);
      };
      uri = uri;
      uri += (uri.indexOf('?') > 0 ? '&' : '?') + 'callback=' + callbackVar;
      this.loadScript(uri);
    }

    /**
     * helper method to load a single script
     * @param  {string}     uri          string url
     * @param  {Function}   callbackFunc execute on load
     */

  }, {
    key: 'loadScript',
    value: function loadScript(uri, callbackFunc) {
      var tag = void 0;

      function maybeDone() {
        if (this.readyState === undefined || this.readyState === 'complete') {
          // Pull the tags out based on the actual element in case IE ever
          // intermingles the onload and onreadystatechange handlers for the same
          // script block before notifying for another one.
          if (typeof callbackFunc === 'function') callbackFunc();
        }
      }

      if (uri.indexOf('//') < 0) {
        uri = 'http:' + uri;
      }

      // prefix protocol
      if ((myRoot.location || {}).protocol === 'file') {
        uri = uri.replace('https://', 'http://');
      }

      tag = this.doc.createElement('script');
      tag.type = 'text/javascript';
      tag.src = uri;
      if (callbackFunc) {
        tag.onload = maybeDone;
        tag.onreadystatechange = maybeDone;
      }

      this.doc.body.appendChild(tag);
    }

    /**
     * helper method to load multiple scripts synchronously
     * @param  {array}      uris         array of script uris
     * @param  {Function}   callbackFunc callback when all are loaded
     */

  }, {
    key: 'loadScripts',
    value: function loadScripts(uris, callbackFunc) {
      var toProcess = void 0,
          that = this;

      function processNext() {
        if (toProcess.length <= 0) {
          if (typeof callbackFunc === 'function') {
            callbackFunc();
          }
        } else {
          var item = toProcess[0];

          toProcess.splice(0, 1);
          that.loadScript(item, processNext);
        }
      }

      if (this.isNull(uris.length, 0) <= 0) {
        if (typeof callbackFunc === 'function') {
          callbackFunc();
        }
      } else {
        if (typeof uris === 'string') {
          uris = [uris];
        }

        toProcess = [].concat(uris);
        processNext();
      }
    } // loadScripts

    /**
     * helper method to load an iframe
     * @param  {HTMLElement} parentEl  the element
     * @param  {string} html      the html string
     * @param  {string} id        element id
     * @param  {string} className element class names
     * @return {HTMLElement}           the iframe
     */

  }, {
    key: 'loadiFrame',
    value: function loadiFrame(parentEl, html, id, className) {
      var iframe = this.createiFrame(id, className);

      parentEl[0].appendChild(iframe);

      if (iframe.contentWindow) {
        iframe.contentWindow.contents = html;
        iframe.src = 'javascript:window["contents"]';
      } else {
        var doc = iframe.contentDocument || iframe.document;

        doc.open();
        doc.write(html);
        doc.close();
      }

      return iframe;
    } // loadiFrame

    /**
     * call function for each object property and return result as array
     * @param  {object}     obj      the object
     * @param  {Function}   iterator the function to call on each property
     * @param  {object}     context  object to apply with
     * @return {array}          array result of each property call
     */

  }, {
    key: 'map',
    value: function map(obj, iterator, context) {
      var results = [];

      if (this.isNull(obj, null) === null) return results;
      if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

      each(obj, function (value, index, list) {
        results.push(iterator.call(context, value, index, list));
      });

      return results;
    }

    /**
     * create a distinct list of object by attribute
     * useful for converting array to object
     * @param  {array}  list      list of objects
     * @param  {string} attribute the key to map
     * @return {object}           the object result
     */

  }, {
    key: 'mapObject',
    value: function mapObject(list, attribute) {
      var obj = {};

      if (list) {
        if (this.isNull(list.length, -1) < 0) {
          obj[list[attribute]] = list;
        } else {
          this.map(list, function (item, i) {
            var k = item[attribute],
                e = obj[k];

            if (e) {
              if (Object.prototype.toString.call(e) !== '[object Array]') {
                e = [e];
              }
              e.push(item);
            } else {
              e = item;
            }
            obj[k] = e;
          });
        }
      }

      return obj;
    }

    /**
     * helper method to parse querystring to object
     * @param  {string} qstr the querystring
     * @return {object}      result
     */

  }, {
    key: 'queryParseString',
    value: function queryParseString(qstr) {
      qstr = (qstr || '').replace('?', '').replace('#', '');
      var pattern = /(\w+)\[(\d+)\]/;
      var decode = this.decode,
          obj = {},
          a = qstr.split('&');

      for (var i = 0; i < a.length; i++) {
        var parts = a[i].split('='),
            key = decode(parts[0]),
            m = pattern.exec(key);

        if (m) {
          obj[m[1]] = obj[m[1]] || [];
          obj[m[1]][m[2]] = decode(parts[1]);
          continue;
        }

        obj[parts[0]] = decode(parts[1] || '');
      }

      return obj;
    }

    /**
     * reverse object to query string
     * @param  {object} obj the object
     * @return {string}     the query string
     */

  }, {
    key: 'queryStringify',
    value: function queryStringify(obj) {
      var str = '',
          encode = this.encode;

      each(obj, function (v, k) {
        str += '&' + k + '=' + encode(v);
      });
      return str.replace('&', '');
    }

    /**
     * make http request
     * @param  {object} opts options: headers, method, data
     * @param  {Function} callback success callback
     * @param  {Function} errback  fail callback
     * @return {object}     the request object
     */

  }, {
    key: 'request',
    value: function request(opts, callback, errback) {
      var that = this;

      opts.headers = opts.headers || {};
      if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
        // convert data to query string
        if (opts.data) {
          opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.queryStringify(opts.data);
          opts = this.del(opts, 'data');
        }
      } else if (typeof opts.data !== 'string') {

        // handle non-string content body
        if ((opts.headers['Content-Type'] + '').indexOf('json') > 0) {
          opts.data = JSON.stringify(opts);
        } else {

          // must be form encoded
          opts.data = that.queryStringify(opts);
        }
      }

      return that.xhr(opts, callback, errback);
    }

    /**
     * slugify a string
     * @param  {string} str the string to slug
     * @return {string}     slug result
     */

  }, {
    key: 'slugify',
    value: function slugify(str) {
      str = str || '';
      if (str === '') return str;
      str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
      return str;
    }

    /**
     * aka any, determine if any object object property are true
     * @param  {object}     obj       the object
     * @param  {Function}   predicate function that return Boolean
     * @param  {object}     context   the this reference for function
     * @return {Boolean}          the result
     */

  }, {
    key: 'some',
    value: function some(obj, predicate, context) {
      var result = false;

      predicate = predicate || function (value) {
        return value;
      };
      if (this.isNull(obj, null) === null) return result;
      if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);

      each(obj, function (value, index, list) {
        if (result || (result = predicate.call(context, value, index, list))) return breaker;
        return null;
      });

      return result;
    }

    /**
     * sort a list of object base on some property name
     * @param  {array}  collection list of objects
     * @param  {string} name       property name
     * @return {object}            sorted list
     */

  }, {
    key: 'sortOn',
    value: function sortOn(collection, name) {
      if (this.isNull(collection, null) === null) return null;
      if (collection.length <= 0) return [];

      // detect attribute type, problem is if your first object is null or not string then this breaks
      if (typeof collection[0][name] === 'string') {
        collection.sort(function (a, b) {
          if ((a[name] && a[name].toLowerCase()) < (b[name] && b[name].toLowerCase())) return -1;
          if ((a[name] && a[name].toLowerCase()) > (b[name] && b[name].toLowerCase())) return 1;
          return 0;
        });
      } else {
        collection.sort(function (a, b) {
          if (a[name] < b[name]) return -1;
          if (a[name] > b[name]) return 1;
          return 0;
        });
      }

      return collection;
    }

    /**
     * trim string
     * @param  {string} str the string
     * @return {string}     trimmed result
     */

  }, {
    key: 'trim',
    value: function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s*|\s*$/g, '');
    }

    /* eslint-disable */

    /**
     * Taken straight from jed's gist: https://gist.github.com/982883
     * 
     * @param  {number} a placeholder
     * @return {string}   a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     */

  }, {
    key: 'uuid',
    value: function uuid(a) {
      return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
    }

    /* eslint-enable */

    /**
     * make an xhr request
     * @param  {object}   options  url string or options object
     * @param  {Function} callback
     * @param  {Function} errback  error callback
     * @return {object}     the request object
     */

  }, {
    key: 'xhr',
    value: function xhr(options, callback, errback) {
      var url = options;

      if (typeof url === 'string') {
        options = options || {};
        options.url = url;
      }

      // Create the XHR request itself
      var req = this.getAjaxObject();

      if (options.withCredentials) {
        req.withCredentials = true;
        if (typeof XDomainRequest !== 'undefined') {
          // XDomainRequest for IE.
          req = new XDomainRequest();
        }
      }

      // if there are no options, it failed
      if (!options || options.length === 0) {
        errback({
          xhr: req,
          error: new Error('xhr expects an url or an options object, none given.')
        });
      }

      // normalize method
      options.method = options.method || 'GET';

      // open url
      req.open(options.method, options.url, req.withCredentials);

      // set request header
      each(options.headers || {}, function (value, key) {
        req.setRequestHeader(key, value);
      });

      this.addEvent(req, 'readystatechange', function () {
        if (req.readyState === 4 && req.status >= 200 && req.status < 400) {
          // Callbacks for successful requests
          callback({
            xhr: req,
            text: req.responseText,
            url: req.responseURL
          });
        } else if (req.readyState === 4) {

          // Callbacks for failed requests
          errback({
            xhr: req
          });
        }

        // ignore everything else
      });

      this.addEvent(req, 'error', function (err) {
        errback({
          xhr: req,
          error: err
        });
      });

      // send unless prevent by options
      // such as user want to handle file upload
      if (!options.nosend) {
        req.send(options.data || void 0);
      }

      return req;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return Wu;
}();

exports.default = Wu;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {


/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(0)('cookie');

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function(name, value, options){
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date + options.maxage);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  var str;
  try {
    str = document.cookie;
  } catch (err) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(err.stack || err);
    }
    return {};
  }
  return parse(str);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value){
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug('error `encode(%o)` - %o', value, e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug('error `decode(%o)` - %o', value, e)
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(9);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=wu.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 *  gmodal.js - v2.0.3
 *  build: Fri Jul 21 2017 03:20:01 GMT-0500 (CDT)
 *  a modal
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Wu", [], factory);
	else if(typeof exports === 'object')
		exports["Wu"] = factory();
	else
		root["Wu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion: 6 */


var _domify = __webpack_require__(2);

var _domify2 = _interopRequireDefault(_domify);

var _componentEmitter = __webpack_require__(1);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var templateHtml = __webpack_require__(4);
var templateCss = __webpack_require__(3);
var win = window;

var modals = [];

function hideModalInternal(self) {
  self.elWrapper.className = '' + self.baseCls;
  self.el.className = 'gmodal-wrap gmodal-content';
  setTimeout(function () {
    var eCls = self.doc.getElementsByTagName('html')[0].className;

    self.doc.getElementsByTagName('html')[0].className = self.trim(eCls.replace(/html\-gmodal/gi, ''));
    self.isVisible = false;
    self.emit('hide', self);

    if (typeof self.opts.hideCallback === 'function') {
      self.opts.hideCallback(self);
    }

    if (self.opts._autoHideHandler) {
      self.off('esc', self.opts._autoHideHandler);
      self.off('click', self.opts._autoHideHandler);
      self.off('tap', self.opts._autoHideHandler);
    }

    if (modals.length !== 0) {
      return self.show();
    }
  }, self.opts.timeout || 50);

  return self;
}

function showModalInternal(self, opts) {
  var body = void 0,
      eCls = void 0,
      i = void 0,
      len = void 0,
      ref = void 0,
      v = void 0;

  self.isVisible = true;

  if (opts) {
    self.opts = opts;
    if (self.opts.content) {
      while (self.el.firstChild) {
        self.el.removeChild(self.el.firstChild);
      }

      if (typeof self.opts.content === 'string') {
        if (self.opts.content.indexOf('<!DOCTYPE') > -1 || self.opts.iframe) {
          self.loadiFrame(self.el, self.opts.content, null, 'gmodal-iframe');
        } else {
          self.el.appendChild(self.domify(self.opts.content));
        }
      } else {
        self.el.appendChild(self.opts.content);
      }

      self.opts.content = null;
    }
  }

  self.closeCls = self.opts.closeCls || self.closeCls;
  if (!self.opts.disableScrollTop) {
    win.scrollTo(0, 0);
  }

  self.elWrapper.style.display = self.elWrapper.style.visibility = '';
  self.elWrapper.className = self.trim(self.baseCls + ' ' + (self.opts.cls || ''));

  body = self.doc.getElementsByTagName('html')[0];
  eCls = body.className;
  body.className = self.trim(eCls + ' html-gmodal');

  setTimeout(function () {
    self.emit('show-timeout', self);
    self.el.className = self.trim((' ' + self.el.className + ' ').replace(' in ', '') + ' in');
  }, self.opts.timeout || 50);

  if (self.opts.hideOn) {
    self.opts._autoHideHandler = function () {
      return hideModalInternal(self);
    };
    ref = self.opts.hideOn.split(',');
    for (i = 0, len = ref.length; i < len; i++) {
      v = ref[i];
      if (v === 'esc' || v === 'click' || v === 'tap') {
        self.on(v, self.opts._autoHideHandler);
      }
    }
  }

  self.emit('show', self);
  return self;
}

function checkEvent(self, name, evt, el) {
  var myEvt, scls, tg;

  evt = evt || win.event;
  tg = evt.target || evt.srcElement;
  if (tg.nodeType === 3) {
    tg = tg.parentNode;
  }
  if (self.hasCls(tg.parentNode, '' + self.closeCls)) {
    tg = tg.parentNode;
  }
  scls = 'gmodal-container gmodal-wrap';
  if (name === 'click') {
    if (self.hasCls(tg, scls) || tg === el) {
      self.emit('click', tg, evt);
    }
  } else if (name === 'keypress') {
    if (self.hasCls(tg, scls) || tg === el || tg === self.doc || tg === self.doc.body) {
      if ((evt.which || evt.keyCode) === 27) {
        self.emit('esc', tg, evt);
      }
    }
  } else if (name === 'tap') {
    if (self.hasCls(tg, scls) || tg === el) {
      self.emit('tap', tg, evt);
    }
  }
  if (self.hasCls(tg, '' + self.closeCls)) {
    myEvt = {
      cancel: false
    };
    self.emit('close', myEvt, tg, evt);
    if (!myEvt.cancel) {
      hideModalInternal(self);
    }
  }
  return true;
}

function createModal(self) {
  var el = self.doc.getElementById('gmodal');

  if (!el) {
    self.injectStyle('gmodalcss', self.css);
    el = self.doc.createElement('div');
    el.id = 'gmodal';

    self.addEvent(el, 'click', function (evt) {
      return checkEvent(self, 'click', evt, el);
    });

    self.addEvent(el, 'keypress', function (evt) {
      return checkEvent(self, 'keypress', evt, el);
    });

    if (!self.doc.gmodalAttached) {
      self.addEvent(self.doc, 'keypress', function (evt) {
        return checkEvent(self, 'keypress', evt, el);
      });
      self.doc.gmodalAttached = true;
    }

    self.addEvent(el, 'tap', function (evt) {
      return checkEvent(self, 'tap', evt, el);
    });

    el.appendChild(self.domify(self.tpl));
    self.doc.getElementsByTagName('body')[0].appendChild(el);
  }

  return el;
}

var GModal = function () {
  function GModal() {
    _classCallCheck(this, GModal);

    this.win = window;
    this._name = 'gmodal';
    this.doc = this.win.document;
    this.ishim = null;
    this.elWrapper = null;
    this.el = null;
    this.opts = {};
    this.baseCls = 'gmodal';
    this.closeCls = 'gmodal-close';
    this.tpl = templateHtml;
    this.css = templateCss;
    this.domify = _domify2.default;
    this.emitter = _componentEmitter2.default;
  }

  _createClass(GModal, [{
    key: 'addEvent',


    /**
     * cross browser attach event
     * @param {object} obj     source object
     * @param {string} evtName event name
     * @param {object}         self
     */
    value: function addEvent(obj, evtName, func) {
      if (obj.addEventListener) {
        obj.addEventListener(evtName, func, false);
      } else if (obj.attachEvent) {
        obj.attachEvent(evtName, func);
      } else if (this.getAttr(obj, 'on' + evtName)) {
        obj['on' + evtName] = func;
      } else {
        obj[evtName] = func;
      }
      return this;
    }

    /**
     * helper method to determine if an element has class
     * @param  {HTMLElement}  el
     * @param  {string}       cls class names
     * @return {Boolean}
     */

  }, {
    key: 'hasCls',
    value: function hasCls(el, cls) {
      var i = void 0,
          k = void 0,
          len = void 0,
          ref = void 0,
          v = void 0;

      ref = cls.split(' ');
      for (k = i = 0, len = ref.length; i < len; k = ++i) {
        v = ref[k];
        if ((' ' + el.className + ' ').indexOf(' ' + v + ' ') >= 0) {
          return true;
        }
      }

      return false;
    }

    /**
     * Helper method to inject your own css.
     * You must first create the element
     * and property it with an id.
     * @param  {string} id  css id
     * @param  {string} css the css text
     * @return {Object}
     */

  }, {
    key: 'injectStyle',
    value: function injectStyle(id, css) {
      var el = void 0,
          elx = void 0,
          self = this;

      el = self.doc.getElementById(id);

      if (!el) {
        el = self.doc.createElement('style');
        el.id = id;
        el.type = 'text/css';
        if (el.styleSheet) {
          el.styleSheet.cssText = css;
        } else {
          el.appendChild(self.doc.createTextNode(css));
        }
        elx = self.doc.getElementsByTagName('link')[0];
        elx = elx || (self.doc.head || self.doc.getElementsByTagName('head')[0]).lastChild;
        elx.parentNode.insertBefore(el, elx);
      }

      return self;
    }

    /**
     * create an iframe
     * @return {object} the iframe
     */

  }, {
    key: 'createiFrame',
    value: function createiFrame(id, className) {
      var iframe = this.doc.createElement('iframe');

      if (id) iframe.id = id;
      if (className) iframe.className = className;

      iframe.frameBorder = '0';
      iframe.marginWidth = '0';
      iframe.marginHeight = '0';
      iframe.setAttribute('border', '0');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.width = '100%';
      iframe.height = '100%';

      return iframe;
    }

    /**
     * helper method to load an iframe
     * @param  {HTMLElement} parentEl  the element
     * @param  {string} html      the html string
     * @param  {string} id        element id
     * @param  {string} className element class names
     * @return {HTMLElement}           the iframe
     */

  }, {
    key: 'loadiFrame',
    value: function loadiFrame(parentEl, html, id, className) {
      var iframe = this.createiFrame(id, className);

      parentEl[0].appendChild(iframe);

      /* jshint scripturl: true */
      if (iframe.contentWindow) {
        iframe.contentWindow.contents = html;
        iframe.src = 'javascript:window["contents"]';
      } else {
        var doc = iframe.contentDocument || iframe.document;

        doc.open();
        doc.write(html);
        doc.close();
      }

      return iframe;
    } // loadiFrame

    /**
     * trim string
     * @param  {string} str the string
     * @return {string}     trimmed result
     */

  }, {
    key: 'trim',
    value: function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s*|\s*$/g, '');
    }

    /**
     * show or open modal
     * @param  {[Object}  opts   options
     * @param  {Function} hideCb callback function on hide
     * @return {Object}
     */

  }, {
    key: 'show',
    value: function show(opts, hideCb) {
      var ref = void 0,
          self = this;

      if (!((ref = self.doc) ? ref.body : void 0)) {
        return false;
      }

      self.elWrapper = createModal(self);
      if (!self.el) {
        self.el = self.doc.getElementById('gmodalContent');
      }

      if (opts) {
        opts.hideCallback = hideCb;
        modals.push(opts);
      }

      if (self.isVisible) {
        return false;
      }

      if (modals.length > 0) {
        opts = modals.shift();
      }

      if (!opts) {
        return false;
      }

      showModalInternal(self, opts);
      return self;
    }

    /**
     * hide or close modal
     * @return {Object}
     */

  }, {
    key: 'hide',
    value: function hide() {
      var self = this;

      if (!self.elWrapper) {
        return self;
      }

      if (self.opts) {
        hideModalInternal(self);
      }

      return self;
    }

    /**
     * append an iframe shim for older IE
     * WARNING: this is only for stupid older IE bug
     * do not use with modern browser or site with ssl
     * @return {Object}
     */

  }, {
    key: 'iShimmy',
    value: function iShimmy() {
      var self = this;

      if (self.elWrapper && !self.shim) {
        self.ishim = self.doc.createElement('iframe');
        self.ishim.className = 'gmodal-iframeshim';
        self.ishim.frameBorder = '0';
        self.ishim.marginWidth = '0';
        self.ishim.marginHeight = '0';
        self.ishim.scrolling = 'no';
        self.ishim.setAttribute('border', '0');
        self.ishim.height = '100%';
        self.ishim.width = '100%';
        self.elWrapper.appendChild(self.ishim);
      }
      return self;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return GModal;
}();

var gmodal = new GModal();

if (!gmodal.win.gmodal) {
  (0, _componentEmitter2.default)(GModal.prototype);
  gmodal.win.gmodal = new GModal();
}

module.exports = gmodal.win.gmodal;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ".gmodal {\n    display: none;\n    overflow: hidden;\n    outline: 0;\n    -webkit-overflow-scrolling: touch;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 200%;\n    z-index: 9999990;  /* based on safari 16777271 */ \n}\n.gmodal .frameshim {\n    position: absolute;\n    display: block;\n    visibility: hidden;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    top: 0;\n    left: 0;\n    border: none;\n    z-index: -999;\n}\n.html-gmodal body .gmodal { display: block; }\n.html-gmodal, .html-modal body { overflow: hidden; margin:0; padding:0; height:100%; width:100%; }\n.gmodal-container { display: table; position: relative; width: 100%; height: 50%; }\n.gmodal-wrap { display: table-cell; position: relative; vertical-align: middle; }\n.gmodal-left, .gmodal-right { width: 50%; }"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"gmodal-container\">\n\t<div class=\"gmodal-wrap gmodal-left\"></div>\n\t<div class=\"gmodal-wrap gmodal-content\" id=\"gmodalContent\"></div>\n\t<div class=\"gmodal-wrap gmodal-right\"></div>\n<div>"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});
//# sourceMappingURL=gmodal.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=bricktag.js.map