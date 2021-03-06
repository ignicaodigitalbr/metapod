(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.metapod = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _appenders;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var tag = {};

  var APPENDER_PREFIX = 'appender';

  var tagNames = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

  var propertiesAppenders = _defineProperty({
    events: function events(element, property, _events) {
      Object.keys(_events).forEach(function (eventName) {
        element.addEventListener(eventName, _events[eventName]);
      });
    },
    className: function className(element, property, value) {
      value = value.constructor.name === 'String' ? value.split(' ') : value;

      value.forEach(function (className) {
        element.classList.add(className);
      });
    },
    style: function style(element, property, styles) {
      Object.keys(styles).forEach(function (prop) {
        element.style[prop] = styles[prop];
      });
    }
  }, APPENDER_PREFIX + 'Default', function undefined(element, property, value) {
    element.setAttribute(property, value);
  });

  var appenders = (_appenders = {}, _defineProperty(_appenders, APPENDER_PREFIX + 'Object', function undefined(element, arg) {
    var propertyType = void 0;

    Object.keys(arg).forEach(function (value) {
      propertyType = typeof propertiesAppenders[value] === 'function' ? value : APPENDER_PREFIX + 'Default';

      propertiesAppenders[propertyType](element, value, arg[value]);
    });
  }), _defineProperty(_appenders, APPENDER_PREFIX + 'String', function undefined(element, arg) {
    element.appendChild(document.createTextNode(arg));
  }), _defineProperty(_appenders, APPENDER_PREFIX + 'Function', function undefined(element, arg) {
    element.appendChild(arg());
  }), _defineProperty(_appenders, APPENDER_PREFIX + 'Array', function undefined(element, arg) {
    arg.forEach(function (value) {
      element.appendChild(value);
    });
  }), _defineProperty(_appenders, APPENDER_PREFIX + 'Default', function undefined(element, arg) {
    element.appendChild(arg);
  }), _appenders);

  var normalizeArg = function normalizeArg(arg) {
    if (arg.constructor.name === 'Number') {
      return arg.toString();
    }

    return arg;
  };

  var builderElement = function builderElement(name, attrs) {
    var element = document.createElement(name);
    var appenderName = void 0;

    Array.prototype.forEach.call(attrs, function (arg) {
      if (arg === undefined || arg === null || !arg.constructor) {
        throw new Error('Invalid object tag was provided. Please, fix your template!');
      }

      arg = normalizeArg(arg);

      appenderName = typeof appenders[APPENDER_PREFIX + arg.constructor.name] === 'function' ? arg.constructor.name : 'Default';

      appenders[APPENDER_PREFIX + appenderName](element, arg);
    });

    return element;
  };

  tagNames.forEach(function (tagName) {
    tag[tagName] = function () {
      for (var _len = arguments.length, parameters = Array(_len), _key = 0; _key < _len; _key++) {
        parameters[_key] = arguments[_key];
      }

      return builderElement(tagName, parameters);
    };
  });

  exports.default = tag;
});
