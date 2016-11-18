const tag = {};

const APPENDER_PREFIX = 'appender';

const tagNames = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
  'bdi', 'bdo', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code',
  'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn',
  'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head',
  'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'kbd', 'keygen',
  'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem',
  'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
  'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby',
  's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span',
  'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul',
  'var', 'video', 'wbr',
];

const propertiesAppenders = {
  events(element, property, events) {
    Object.keys(events).forEach((eventName) => {
      element.addEventListener(eventName, events[eventName]);
    });
  },
  className(element, property, value) {
    value = value.constructor.name === 'String' ? value.split(' ') : value;

    value.forEach((className) => {
      element.classList.add(className);
    });
  },
  style(element, property, styles) {
    Object.keys(styles).forEach((prop) => {
      element.style[prop] = styles[prop];
    });
  },
  [`${APPENDER_PREFIX}Default`](element, property, value) {
    element.setAttribute(property, value);
  },
};

const appenders = {
  [`${APPENDER_PREFIX}Object`](element, arg) {
    let propertyType;

    Object.keys(arg).forEach((value) => {
      propertyType = typeof propertiesAppenders[value] === 'function' ? value : `${APPENDER_PREFIX}Default`;

      propertiesAppenders[propertyType](element, value, arg[value]);
    });
  },
  [`${APPENDER_PREFIX}String`](element, arg) {
    element.appendChild(document.createTextNode(arg));
  },
  [`${APPENDER_PREFIX}Function`](element, arg) {
    element.appendChild(arg());
  },
  [`${APPENDER_PREFIX}Array`](element, arg) {
    arg.forEach((value) => {
      element.appendChild(value);
    });
  },
  [`${APPENDER_PREFIX}Default`](element, arg) {
    element.appendChild(arg);
  },
};

const normalizeArg = (arg) => {
  if (arg.constructor.name === 'Number') {
    return arg.toString();
  }

  return arg;
};

const builderElement = (name, attrs) => {
  const element = document.createElement(name);
  let appenderName;

  Array.prototype.forEach.call(attrs, (arg) => {
    if (arg === undefined || arg === null || !arg.constructor) {
      throw new Error('Invalid object tag was provided. Please, fix your template!');
    }

    arg = normalizeArg(arg);

    appenderName = typeof appenders[APPENDER_PREFIX + arg.constructor.name] === 'function' ? arg.constructor.name : 'Default';

    appenders[APPENDER_PREFIX + appenderName](element, arg);
  });

  return element;
};

tagNames.forEach((tagName) => {
  tag[tagName] = (...parameters) => builderElement(tagName, parameters);
});

export default tag;
