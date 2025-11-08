var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.xobuildercomponents = {}));
})(this, function(exports2) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka;
  "use strict";
  /*! (c) Andrea Giammarchi @webreflection ISC */
  (function() {
    var attributesObserver = function(whenDefined2, MutationObserver2) {
      var attributeChanged = function attributeChanged2(records) {
        for (var i = 0, length = records.length; i < length; i++)
          dispatch(records[i]);
      };
      var dispatch = function dispatch2(_ref2) {
        var target = _ref2.target, attributeName = _ref2.attributeName, oldValue = _ref2.oldValue;
        target.attributeChangedCallback(attributeName, oldValue, target.getAttribute(attributeName));
      };
      return function(target, is2) {
        var attributeFilter = target.constructor.observedAttributes;
        if (attributeFilter) {
          whenDefined2(is2).then(function() {
            new MutationObserver2(attributeChanged).observe(target, {
              attributes: true,
              attributeOldValue: true,
              attributeFilter
            });
            for (var i = 0, length = attributeFilter.length; i < length; i++) {
              if (target.hasAttribute(attributeFilter[i]))
                dispatch({
                  target,
                  attributeName: attributeFilter[i],
                  oldValue: null
                });
            }
          });
        }
        return target;
      };
    };
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function() {
          };
          return {
            s: F,
            n: function() {
              if (i >= o.length)
                return {
                  done: true
                };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function(e) {
              throw e;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return {
        s: function() {
          it = it.call(o);
        },
        n: function() {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function(e) {
          didErr = true;
          err = e;
        },
        f: function() {
          try {
            if (!normalCompletion && it.return != null)
              it.return();
          } finally {
            if (didErr)
              throw err;
          }
        }
      };
    }
    /*! (c) Andrea Giammarchi - ISC */
    var TRUE = true, FALSE = false, QSA$1 = "querySelectorAll";
    var notify = function notify2(callback) {
      var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
      var MO = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : MutationObserver;
      var query2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ["*"];
      var loop = function loop2(nodes, selectors, added, removed, connected, pass) {
        var _iterator = _createForOfIteratorHelper(nodes), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var node = _step.value;
            if (pass || QSA$1 in node) {
              if (connected) {
                if (!added.has(node)) {
                  added.add(node);
                  removed["delete"](node);
                  callback(node, connected);
                }
              } else if (!removed.has(node)) {
                removed.add(node);
                added["delete"](node);
                callback(node, connected);
              }
              if (!pass)
                loop2(node[QSA$1](selectors), selectors, added, removed, connected, TRUE);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };
      var mo = new MO(function(records) {
        if (query2.length) {
          var selectors = query2.join(",");
          var added = /* @__PURE__ */ new Set(), removed = /* @__PURE__ */ new Set();
          var _iterator2 = _createForOfIteratorHelper(records), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var _step2$value = _step2.value, addedNodes = _step2$value.addedNodes, removedNodes = _step2$value.removedNodes;
              loop(removedNodes, selectors, added, removed, FALSE, FALSE);
              loop(addedNodes, selectors, added, removed, TRUE, FALSE);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      });
      var observe = mo.observe;
      (mo.observe = function(node) {
        return observe.call(mo, node, {
          subtree: TRUE,
          childList: TRUE
        });
      })(root);
      return mo;
    };
    var QSA = "querySelectorAll";
    var _self$1 = self, document$2 = _self$1.document, Element$1 = _self$1.Element, MutationObserver$2 = _self$1.MutationObserver, Set$2 = _self$1.Set, WeakMap$1 = _self$1.WeakMap;
    var elements = function elements2(element) {
      return QSA in element;
    };
    var filter2 = [].filter;
    var qsaObserver = function(options) {
      var live = new WeakMap$1();
      var drop = function drop2(elements2) {
        for (var i = 0, length = elements2.length; i < length; i++)
          live["delete"](elements2[i]);
      };
      var flush = function flush2() {
        var records = observer2.takeRecords();
        for (var i = 0, length = records.length; i < length; i++) {
          parse3(filter2.call(records[i].removedNodes, elements), false);
          parse3(filter2.call(records[i].addedNodes, elements), true);
        }
      };
      var matches = function matches2(element) {
        return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
      };
      var notifier = function notifier2(element, connected) {
        var selectors;
        if (connected) {
          for (var q, m = matches(element), i = 0, length = query2.length; i < length; i++) {
            if (m.call(element, q = query2[i])) {
              if (!live.has(element))
                live.set(element, new Set$2());
              selectors = live.get(element);
              if (!selectors.has(q)) {
                selectors.add(q);
                options.handle(element, connected, q);
              }
            }
          }
        } else if (live.has(element)) {
          selectors = live.get(element);
          live["delete"](element);
          selectors.forEach(function(q2) {
            options.handle(element, connected, q2);
          });
        }
      };
      var parse3 = function parse4(elements2) {
        var connected = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        for (var i = 0, length = elements2.length; i < length; i++)
          notifier(elements2[i], connected);
      };
      var query2 = options.query;
      var root = options.root || document$2;
      var observer2 = notify(notifier, root, MutationObserver$2, query2);
      var attachShadow2 = Element$1.prototype.attachShadow;
      if (attachShadow2)
        Element$1.prototype.attachShadow = function(init2) {
          var shadowRoot = attachShadow2.call(this, init2);
          observer2.observe(shadowRoot);
          return shadowRoot;
        };
      if (query2.length)
        parse3(root[QSA](query2));
      return {
        drop,
        flush,
        observer: observer2,
        parse: parse3
      };
    };
    var _self = self, document$1 = _self.document, Map2 = _self.Map, MutationObserver$1 = _self.MutationObserver, Object$1 = _self.Object, Set$1 = _self.Set, WeakMap2 = _self.WeakMap, Element = _self.Element, HTMLElement2 = _self.HTMLElement, Node2 = _self.Node, Error2 = _self.Error, TypeError$1 = _self.TypeError, Reflect2 = _self.Reflect;
    var defineProperty = Object$1.defineProperty, keys = Object$1.keys, getOwnPropertyNames = Object$1.getOwnPropertyNames, setPrototypeOf = Object$1.setPrototypeOf;
    var legacy = !self.customElements;
    var expando = function expando2(element) {
      var key = keys(element);
      var value = [];
      var ignore = new Set$1();
      var length = key.length;
      for (var i = 0; i < length; i++) {
        value[i] = element[key[i]];
        try {
          delete element[key[i]];
        } catch (SafariTP) {
          ignore.add(i);
        }
      }
      return function() {
        for (var _i2 = 0; _i2 < length; _i2++)
          ignore.has(_i2) || (element[key[_i2]] = value[_i2]);
      };
    };
    if (legacy) {
      var HTMLBuiltIn = function HTMLBuiltIn2() {
        var constructor = this.constructor;
        if (!classes.has(constructor))
          throw new TypeError$1("Illegal constructor");
        var is2 = classes.get(constructor);
        if (override)
          return augment(override, is2);
        var element = createElement.call(document$1, is2);
        return augment(setPrototypeOf(element, constructor.prototype), is2);
      };
      var createElement = document$1.createElement;
      var classes = new Map2();
      var defined = new Map2();
      var prototypes = new Map2();
      var registry = new Map2();
      var query = [];
      var handle = function handle2(element, connected, selector) {
        var proto = prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
          var redefine = expando(element);
          override = setPrototypeOf(element, proto);
          try {
            new proto.constructor();
          } finally {
            override = null;
            redefine();
          }
        }
        var method = "".concat(connected ? "" : "dis", "connectedCallback");
        if (method in proto)
          element[method]();
      };
      var _qsaObserver = qsaObserver({
        query,
        handle
      }), parse2 = _qsaObserver.parse;
      var override = null;
      var whenDefined = function whenDefined2(name) {
        if (!defined.has(name)) {
          var _, $ = new Promise(function($2) {
            _ = $2;
          });
          defined.set(name, {
            $,
            _
          });
        }
        return defined.get(name).$;
      };
      var augment = attributesObserver(whenDefined, MutationObserver$1);
      self.customElements = {
        define: function define3(is2, Class) {
          if (registry.has(is2))
            throw new Error2('the name "'.concat(is2, '" has already been used with this registry'));
          classes.set(Class, is2);
          prototypes.set(is2, Class.prototype);
          registry.set(is2, Class);
          query.push(is2);
          whenDefined(is2).then(function() {
            parse2(document$1.querySelectorAll(is2));
          });
          defined.get(is2)._(Class);
        },
        get: function get2(is2) {
          return registry.get(is2);
        },
        whenDefined
      };
      defineProperty(HTMLBuiltIn.prototype = HTMLElement2.prototype, "constructor", {
        value: HTMLBuiltIn
      });
      self.HTMLElement = HTMLBuiltIn;
      document$1.createElement = function(name, options) {
        var is2 = options && options.is;
        var Class = is2 ? registry.get(is2) : registry.get(name);
        return Class ? new Class() : createElement.call(document$1, name);
      };
      if (!("isConnected" in Node2.prototype))
        defineProperty(Node2.prototype, "isConnected", {
          configurable: true,
          get: function get2() {
            return !(this.ownerDocument.compareDocumentPosition(this) & this.DOCUMENT_POSITION_DISCONNECTED);
          }
        });
    } else {
      legacy = !self.customElements.get("extends-br");
      if (legacy) {
        try {
          var BR = function BR2() {
            return self.Reflect.construct(HTMLBRElement, [], BR2);
          };
          BR.prototype = HTMLLIElement.prototype;
          var is = "extends-br";
          self.customElements.define("extends-br", BR, {
            "extends": "br"
          });
          legacy = document$1.createElement("br", {
            is
          }).outerHTML.indexOf(is) < 0;
          var _self$customElements = self.customElements, get = _self$customElements.get, _whenDefined = _self$customElements.whenDefined;
          self.customElements.whenDefined = function(is2) {
            var _this = this;
            return _whenDefined.call(this, is2).then(function(Class) {
              return Class || get.call(_this, is2);
            });
          };
        } catch (o_O) {
        }
      }
    }
    if (legacy) {
      var _parseShadow = function _parseShadow2(element) {
        var root = shadowRoots.get(element);
        _parse(root.querySelectorAll(this), element.isConnected);
      };
      var customElements2 = self.customElements;
      var _createElement = document$1.createElement;
      var define2 = customElements2.define, _get = customElements2.get, upgrade = customElements2.upgrade;
      var _ref = Reflect2 || {
        construct: function construct2(HTMLElement3) {
          return HTMLElement3.call(this);
        }
      }, construct = _ref.construct;
      var shadowRoots = new WeakMap2();
      var shadows = new Set$1();
      var _classes = new Map2();
      var _defined = new Map2();
      var _prototypes = new Map2();
      var _registry = new Map2();
      var shadowed = [];
      var _query = [];
      var getCE = function getCE2(is2) {
        return _registry.get(is2) || _get.call(customElements2, is2);
      };
      var _handle = function _handle2(element, connected, selector) {
        var proto = _prototypes.get(selector);
        if (connected && !proto.isPrototypeOf(element)) {
          var redefine = expando(element);
          _override = setPrototypeOf(element, proto);
          try {
            new proto.constructor();
          } finally {
            _override = null;
            redefine();
          }
        }
        var method = "".concat(connected ? "" : "dis", "connectedCallback");
        if (method in proto)
          element[method]();
      };
      var _qsaObserver2 = qsaObserver({
        query: _query,
        handle: _handle
      }), _parse = _qsaObserver2.parse;
      var _qsaObserver3 = qsaObserver({
        query: shadowed,
        handle: function handle2(element, connected) {
          if (shadowRoots.has(element)) {
            if (connected)
              shadows.add(element);
            else
              shadows["delete"](element);
            if (_query.length)
              _parseShadow.call(_query, element);
          }
        }
      }), parseShadowed = _qsaObserver3.parse;
      var attachShadow = Element.prototype.attachShadow;
      if (attachShadow)
        Element.prototype.attachShadow = function(init2) {
          var root = attachShadow.call(this, init2);
          shadowRoots.set(this, root);
          return root;
        };
      var _whenDefined2 = function _whenDefined22(name) {
        if (!_defined.has(name)) {
          var _, $ = new Promise(function($2) {
            _ = $2;
          });
          _defined.set(name, {
            $,
            _
          });
        }
        return _defined.get(name).$;
      };
      var _augment = attributesObserver(_whenDefined2, MutationObserver$1);
      var _override = null;
      getOwnPropertyNames(self).filter(function(k) {
        return /^HTML.*Element$/.test(k);
      }).forEach(function(k) {
        var HTMLElement3 = self[k];
        function HTMLBuiltIn2() {
          var constructor = this.constructor;
          if (!_classes.has(constructor))
            throw new TypeError$1("Illegal constructor");
          var _classes$get = _classes.get(constructor), is2 = _classes$get.is, tag = _classes$get.tag;
          if (is2) {
            if (_override)
              return _augment(_override, is2);
            var element = _createElement.call(document$1, tag);
            element.setAttribute("is", is2);
            return _augment(setPrototypeOf(element, constructor.prototype), is2);
          } else
            return construct.call(this, HTMLElement3, [], constructor);
        }
        defineProperty(HTMLBuiltIn2.prototype = HTMLElement3.prototype, "constructor", {
          value: HTMLBuiltIn2
        });
        defineProperty(self, k, {
          value: HTMLBuiltIn2
        });
      });
      document$1.createElement = function(name, options) {
        var is2 = options && options.is;
        if (is2) {
          var Class = _registry.get(is2);
          if (Class && _classes.get(Class).tag === name)
            return new Class();
        }
        var element = _createElement.call(document$1, name);
        if (is2)
          element.setAttribute("is", is2);
        return element;
      };
      customElements2.get = getCE;
      customElements2.whenDefined = _whenDefined2;
      customElements2.upgrade = function(element) {
        var is2 = element.getAttribute("is");
        if (is2) {
          var _constructor = _registry.get(is2);
          if (_constructor) {
            _augment(setPrototypeOf(element, _constructor.prototype), is2);
            return;
          }
        }
        upgrade.call(customElements2, element);
      };
      customElements2.define = function(is2, Class, options) {
        if (getCE(is2))
          throw new Error2("'".concat(is2, "' has already been defined as a custom element"));
        var selector;
        var tag = options && options["extends"];
        _classes.set(Class, tag ? {
          is: is2,
          tag
        } : {
          is: "",
          tag: is2
        });
        if (tag) {
          selector = "".concat(tag, '[is="').concat(is2, '"]');
          _prototypes.set(selector, Class.prototype);
          _registry.set(is2, Class);
          _query.push(selector);
        } else {
          define2.apply(customElements2, arguments);
          shadowed.push(selector = is2);
        }
        _whenDefined2(is2).then(function() {
          if (tag) {
            _parse(document$1.querySelectorAll(selector));
            shadows.forEach(_parseShadow, [selector]);
          } else
            parseShadowed(document$1.querySelectorAll(selector));
        });
        _defined.get(is2)._(Class);
      };
    }
  })();
  const attrBoolean = {
    get: (element, attr) => {
      if (element.getAttribute(attr) === "false") {
        return false;
      }
      return element.hasAttribute(attr);
    },
    set: (element, attr, value) => {
      if (value) {
        element.setAttribute(attr, "");
      } else {
        element.removeAttribute(attr);
      }
    }
  };
  function throwError(message, example) {
    var _a2;
    if (!((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode)) {
      throw new Error(`${message}

${example ? `Example:
${example}` : ""}`);
    } else {
      console.warn(`${message}

${example ? `Example:
${example}` : ""}`);
    }
  }
  function checkAttr(componentName, attrName, attrValue) {
    if (!attrValue) {
      throwError(
        `${componentName} must have a \`${attrName}\` attribute.`,
        `
<${componentName} ${attrName}="..."></${componentName}>
    `
      );
    }
  }
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  function typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  }
  function primitive(value) {
    return value === null || typeof value !== "function" && typeof value !== "object";
  }
  typeOf.primitive = primitive;
  function cloneDeep(value) {
    if (typeOf(value) === "array") {
      return value.map((item) => cloneDeep(item));
    } else if (typeOf(value) === "object") {
      const result = {};
      for (const key in value) {
        result[key] = cloneDeep(value[key]);
      }
      return result;
    } else {
      return value;
    }
  }
  function each(array, callback) {
    if (array.length === 0) {
      return;
    }
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }
  const objectKeys = (obj) => {
    return Object.keys(obj);
  };
  function componentDefine(components, options) {
    each(objectKeys(components), (name) => {
      if (!customElements.get(name)) {
        customElements.define(name, components[name], options);
      }
    });
  }
  function delay(ms = 0) {
    return new Promise((resolve) => {
      const timeId = window.setTimeout(() => {
        const clear = () => window.clearTimeout(timeId);
        resolve(clear);
        clearTimeout(timeId);
      }, ms);
    });
  }
  function filter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
        result.push(array[i]);
      }
    }
    return result;
  }
  class Emitter {
    constructor() {
      __publicField(this, "id");
      __publicField(this, "events");
      this.id = 0;
      this.events = {};
    }
    on(eventType, listener) {
      this.id++;
      this.events = {
        ...this.events,
        [eventType]: [
          ...this.events[eventType] || [],
          {
            listener,
            id: this.id
          }
        ]
      };
      return this.id;
    }
    off(id2) {
      for (const eventType in this.events) {
        this.events = {
          ...this.events,
          [eventType]: filter(this.events[eventType], (item) => item.id !== id2)
        };
      }
    }
    emit(eventType, data) {
      if (this.events[eventType]) {
        each(this.events[eventType], ({ listener }) => {
          listener(data);
        });
      }
    }
  }
  function createAnimate() {
    const event = new Emitter();
    let startId = -1;
    let moveId = -1;
    let endId = -1;
    let value = 0;
    let timeId = -1;
    let animationFrameId = -1;
    function animated({ to, from, duration = 1e3, friction = 1, reverseEasing = false, easing, onStart, onUpdate, onEnd }) {
      let start = null;
      value = from;
      onStart == null ? void 0 : onStart(value);
      (async () => {
        await delay();
        event.emit("start", value);
      })();
      cancelAnimationFrame(animationFrameId);
      function step(timestamp) {
        if (!start) {
          start = timestamp;
        }
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        value = from + (to - from) * percentage * friction;
        if (typeof easing === "function") {
          if (reverseEasing) {
            value = from + (to - from) * (1 - easing(1 - percentage));
          } else {
            value = from + (to - from) * easing(percentage);
          }
        }
        event.emit("update", value);
        onUpdate == null ? void 0 : onUpdate(value);
        if (percentage < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      }
      animationFrameId = requestAnimationFrame(step);
      timeId = window.setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timeId);
        value = to;
        onUpdate == null ? void 0 : onUpdate(value);
        onEnd == null ? void 0 : onEnd(value);
        event.emit("update", value);
        event.emit("end", value);
      }, duration);
      return () => {
        clearTimeout(timeId);
        cancelAnimationFrame(animationFrameId);
      };
    }
    animated.onStart = (onStart) => {
      startId = event.on("start", onStart);
      return () => event.off(startId);
    };
    animated.onUpdate = (onUpdate) => {
      moveId = event.on("update", onUpdate);
      return () => event.off(moveId);
    };
    animated.onEnd = (onEnd) => {
      endId = event.on("end", onEnd);
      return () => event.off(endId);
    };
    animated.off = () => {
      event.off(startId);
      event.off(moveId);
      event.off(endId);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeId);
    };
    animated.getValue = () => value;
    return animated;
  }
  function hash(value) {
    let hash2 = 5381;
    let i = value.length;
    while (i) {
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    }
    return hash2 >>> 0;
  }
  function minifyCss(cssText) {
    return cssText.replace(/\s+/g, " ").trim();
  }
  function createCssInJs(type = "global") {
    return (template, ...args) => {
      let cssText = minifyCss(
        template.reduce((str, item, index) => {
          if (args[index] == null) {
            return str + item;
          }
          return str + item + args[index];
        }, "")
      );
      const classes = {};
      if (type === "scope") {
        cssText = minifyCss(
          cssText.replace(/(:global\(|)(?:[\.]{1})([a-zA-Z_]+[\w-_\\\[\]\+\=\{\}\?\*\!\(\)]*)(?:[\s\.\,\{\>#\:]{0})/gim, (value) => {
            if (value.includes(":global(")) {
              const className = value.replace(/:global\(\s*\.|\)$/g, "");
              classes[className] = className;
              return `.${className}`;
            }
            const defaultClassName = value.trim().replace(/^\./g, "");
            const newClassName = `xo-${defaultClassName}-${hash(cssText)}`;
            classes[defaultClassName] = newClassName;
            return `.${newClassName}`;
          })
        );
      }
      return {
        classes,
        cssText
      };
    };
  }
  function appendStyle(cssText, element) {
    var _a2;
    const el = element.querySelector(".xo-styles");
    if (el) {
      if (el.textContent && !((_a2 = el.textContent) == null ? void 0 : _a2.includes(cssText))) {
        el.textContent += cssText;
      }
    } else {
      const styleEl = document.createElement("style");
      styleEl.classList.add("xo-styles");
      styleEl.textContent = cssText;
      element.appendChild(styleEl);
    }
  }
  function debounce(fn, wait = 300) {
    let timeout = -1;
    return function call(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }
  function createDebounce() {
    let timeout = -1;
    function debounce2(fn, wait = 300) {
      return function call(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          fn.apply(context, args);
        }, wait);
      };
    }
    function cancel() {
      clearTimeout(timeout);
    }
    debounce2.cancel = cancel;
    return debounce2;
  }
  function DOMLoaded(callback) {
    if (/comp|inter/.test(document.readyState)) {
      callback();
    } else if ("addEventListener" in document) {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      document.attachEvent("onreadystatechange", () => {
        if (document.readyState === "complete") {
          callback();
        }
      });
    }
  }
  const easings = {
    linear: (t) => t,
    ease: (t) => 0.5 * (1 - Math.cos(Math.PI * t)),
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - --t * t * t * t,
    easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    easeOutBounce: (t) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) {
        return n1 * t * t;
      }
      if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
      }
      if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
      }
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
    easeInBounce: (t) => 1 - easings.easeOutBounce(1 - t),
    easeOutBack: (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
    },
    easeInBack: (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return c3 * t * t * t - c1 * t * t;
    },
    easeInOut: (t) => t < 0.5 ? easings.easeInBack(t * 2) / 2 : easings.easeOutBack(t * 2 - 1) / 2 + 0.5,
    easeInElastic: (t) => {
      const c4 = 2 * Math.PI / 3;
      return t === 0 ? 0 : t === 1 ? 1 : -(2 ** (10 * t - 10)) * Math.sin((t * 10 - 10.75) * c4);
    },
    easeOutElastic: (t) => {
      const c4 = 2 * Math.PI / 3;
      return t === 0 ? 0 : t === 1 ? 1 : 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    easeInExpo: (t) => t === 0 ? 0 : 2 ** (10 * t - 10),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - 2 ** (-10 * t),
    spring: (t) => 1 - Math.cos(t * 4.5 * Math.PI) * Math.exp(-t * 6),
    decay: (t) => 1 - Math.exp(-t * 6)
  };
  function equal(object1, object2) {
    if (typeOf.primitive(object1) || typeOf.primitive(object1) || object1 == null || object2 == null) {
      return object1 === object2;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      if (typeof val1 === "object" && typeof val2 === "object") {
        if (!equal(val1, val2)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }
    return true;
  }
  function findIndex(array, callback) {
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i], i, array)) {
        return i;
      }
    }
    return -1;
  }
  function map(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(callback(array[i], i, array));
    }
    return result;
  }
  function reduce(array, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
      accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
  }
  class FrameManager {
    constructor() {
      __publicField(this, "frameId");
      __publicField(this, "keepAliveFrameId");
      __publicField(this, "lastTimestamp");
      __publicField(this, "frames");
      __publicField(this, "keepAliveFrames");
      __publicField(this, "defaultTimestep");
      __publicField(this, "handleFrameLoop", (timestamp) => {
        if (this.lastTimestamp) {
          const delta = timestamp - this.lastTimestamp;
          each(this.keepAliveFrames, (frame) => frame.call(this, { delta, timestamp }));
        }
        this.lastTimestamp = timestamp;
        if (this.keepAliveFrameId) {
          cancelAnimationFrame(this.keepAliveFrameId);
        }
        this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop);
      });
      __publicField(this, "handleFrame", (timestamp) => {
        each(this.frames, (frame) => frame.call(this, { delta: this.defaultTimestep, timestamp }));
      });
      __publicField(this, "getFrames", () => this.frames);
      __publicField(this, "add", (frame, keepAlive = false) => {
        this.cancelFrame();
        if (!this.frames.includes(frame)) {
          this.frames.push(frame);
        }
        if (keepAlive && !this.keepAliveFrames.includes(frame)) {
          this.keepAliveFrames.push(frame);
        }
        this.start();
        return this;
      });
      __publicField(this, "start", () => {
        this.frameId = requestAnimationFrame(this.handleFrame);
        this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop);
      });
      __publicField(this, "cancelFrame", () => {
        if (this.frameId != null) {
          cancelAnimationFrame(this.frameId);
          this.frameId = null;
        }
        if (this.keepAliveFrameId != null) {
          cancelAnimationFrame(this.keepAliveFrameId);
          this.keepAliveFrameId = null;
        }
      });
      __publicField(this, "stopFrame", (frames, frame) => {
        const taskIndex = frames.indexOf(frame);
        if (taskIndex !== -1) {
          frames.splice(taskIndex, 1);
        }
        if (frames.length === 0) {
          this.cancelFrame();
          this.lastTimestamp = null;
        }
      });
      __publicField(this, "remove", (frame) => {
        this.stopFrame(this.frames, frame);
        this.stopFrame(this.keepAliveFrames, frame);
        return this;
      });
      __publicField(this, "clear", () => {
        this.frames = [];
        this.keepAliveFrames = [];
        this.cancelFrame();
        this.lastTimestamp = null;
        return this;
      });
      this.frameId = null;
      this.keepAliveFrameId = null;
      this.lastTimestamp = null;
      this.frames = [];
      this.keepAliveFrames = [];
      this.defaultTimestep = 1 / 60 * 1e3;
    }
  }
  const frameManager$1 = new FrameManager();
  function snakeToCamel(value) {
    return value.replace(/([_]\w)/g, (g) => g[1].toUpperCase());
  }
  function snakeToPascal(value) {
    return value.replace(/(\-\w|\_\w)/g, (g) => g[1].toUpperCase()).replace(/^(\w)/, (g) => g[0].toUpperCase());
  }
  function camelToSnake(value) {
    return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
  function camelToPascal(value) {
    return value.replace(/^(\w)/, (g) => g[0].toUpperCase());
  }
  function pascalToSnake(value) {
    return camelToSnake(value).replace(/^_/g, "");
  }
  function pascalToCamel(value) {
    return value.replace(/^(\w)/, (g) => g[0].toLowerCase());
  }
  function kebabToCamel(value) {
    return value.replace(/([-]\w)/g, (g) => g[1].toUpperCase());
  }
  function kebabToPascal(value) {
    return value.replace(/([-]\w)/g, (g) => g[1].toUpperCase()).replace(/^(\w)/, (g) => g[0].toUpperCase());
  }
  function camelToKebab(value) {
    return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  }
  function pascalToKebab(value) {
    return camelToKebab(value).replace(/^-/g, "");
  }
  const namingConvention = {
    snakeToCamel,
    snakeToPascal,
    camelToSnake,
    camelToPascal,
    pascalToSnake,
    pascalToCamel,
    kebabToCamel,
    kebabToPascal,
    camelToKebab,
    pascalToKebab
  };
  function objectParse(value) {
    const val = value.trim();
    if (/^{|\[/g.test(val)) {
      try {
        const fn = new Function(`return ${val}`);
        const obj = fn();
        return JSON.parse(JSON.stringify(obj));
      } catch {
        if (/^\[/g.test(val)) {
          return [];
        }
        return {};
      }
    } else {
      return {};
    }
  }
  function getValue(value, type) {
    switch (type) {
      case "string":
        return value;
      case "number":
        return Number(value);
      case "string | number": {
        const number = Number(value);
        return isNaN(number) ? value : number;
      }
      case "boolean":
        return value === "true" || value === "";
      case "object":
        return objectParse(value);
      case "array":
        return objectParse(value);
      default:
        return value;
    }
  }
  function getAttrs(el, { pick, types, camelCase = true, propTransformer } = {}) {
    let result = {};
    if (el == null) {
      return result;
    }
    const attrs = Array.from(el.attributes);
    if (pick == null) {
      pick = map(attrs, (attr) => attr.name);
    }
    for (const attr of attrs) {
      let name = camelCase ? namingConvention.kebabToCamel(attr.name) : attr.name;
      const type = types == null ? void 0 : types[name];
      if (attr.value != null && (pick == null ? void 0 : pick.includes(name))) {
        if (typeof propTransformer === "function") {
          name = propTransformer(name);
        }
        if (!!types && type != null) {
          result = { ...result, [name]: getValue(attr.value, type) };
        } else {
          result = { ...result, [name]: attr.value };
        }
      }
    }
    return result;
  }
  function imageUrl(url, { width, height } = {}) {
    const newUrl = url.replace(/(\?|&)width=\d*/g, "");
    const joiner = newUrl.includes("?") ? "&" : "?";
    const paramWidth = width ? `${joiner}width=${width}` : "";
    const paramHeight = height ? `${joiner}height=${height}` : "";
    return `${newUrl}${paramWidth}${paramHeight}`;
  }
  function interpolate({ inputRange, outputRange, value, easing = (value2) => value2, reverseEasing = false, extrapolate = "extend" }) {
    const sortedRanges = map(inputRange, (_, i2) => ({ input: inputRange[i2], output: outputRange[i2] })).sort((a, b) => a.input - b.input);
    const sortedInputRange = map(sortedRanges, ({ input }) => input);
    const sortedOutputRange = map(sortedRanges, ({ output }) => output);
    if (value <= sortedInputRange[0]) {
      return sortedOutputRange[0];
    }
    if (value >= sortedInputRange[sortedInputRange.length - 1]) {
      return sortedOutputRange[sortedOutputRange.length - 1];
    }
    let i = 0;
    for (const inputValue of sortedInputRange) {
      if (inputValue < value) {
        i++;
      }
    }
    const j = i - 1;
    let ratio = (value - sortedInputRange[j]) / (sortedInputRange[i] - sortedInputRange[j]);
    if (typeof easing === "function") {
      if (reverseEasing) {
        ratio = 1 - easing(1 - ratio);
      } else {
        ratio = easing(ratio);
      }
    }
    if (extrapolate === "clamp") {
      ratio = Math.max(Math.min(ratio, 1), 0);
    }
    return sortedOutputRange[j] * (1 - ratio) + sortedOutputRange[i] * ratio;
  }
  const isMobile = {
    android: !!navigator.userAgent.match(/Android/i),
    blackBerry: !!navigator.userAgent.match(/BlackBerry/i),
    ipad: !!navigator.userAgent.match(/iPad/i),
    iOS: !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
    opera: !!navigator.userAgent.match(/Opera Mini/i),
    windows: !!navigator.userAgent.match(/Windows Phone/i),
    amazonePhone: !!navigator.userAgent.match(/(?:SD4930UR|\\bSilk(?:.+)Mobile\\b)/i),
    amazoneTablet: !!navigator.userAgent.match(/Silk/i),
    any: !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Windows Phone|(?:SD4930UR|\bSilk(?:.+)Mobile\b)|Silk/i)
  };
  DOMLoaded(() => {
    const htmlEl = document.documentElement;
    if (isMobile.any) {
      htmlEl.classList.add("is-mobile");
      attrBoolean.set(htmlEl, "xo-is-mobile", true);
    } else {
      htmlEl.classList.add("is-desktop");
      attrBoolean.set(htmlEl, "xo-is-desktop", true);
    }
  });
  const objectValues = (obj) => {
    return Object.values(obj);
  };
  function getWindow(el) {
    return el.nodeType === 9 && el.defaultView;
  }
  function offset(el) {
    const doc = el == null ? void 0 : el.ownerDocument;
    const docElem = doc.documentElement;
    const win = getWindow(doc);
    let box = { top: 0, left: 0 };
    if (!doc) {
      return {
        top: 0,
        left: 0
      };
    }
    if (typeof el.getBoundingClientRect !== "undefined") {
      box = el.getBoundingClientRect();
    }
    return {
      top: box.top + win.scrollY - docElem.clientTop,
      left: box.left + win.scrollX - docElem.clientLeft
    };
  }
  class PanGesture {
    constructor(options) {
      __publicField(this, "dx");
      __publicField(this, "dy");
      __publicField(this, "vx", 0);
      __publicField(this, "vy", 0);
      __publicField(this, "isStart", false);
      __publicField(this, "startX", 0);
      __publicField(this, "startX2", 0);
      __publicField(this, "startY", 0);
      __publicField(this, "startY2", 0);
      __publicField(this, "options");
      __publicField(this, "handleMouseDown", (event) => {
        const { onStart } = this.options;
        if (event.type === "touchstart" && event.touches.length > 1) {
          return;
        }
        if (event.type === "mousedown" && event.button !== 0) {
          return;
        }
        const target = event.target;
        if (!isMobile.any && (target.closest("a") || target.closest("img"))) {
          event.preventDefault();
        }
        this.isStart = true;
        if (event.type === "touchstart") {
          this.startX = event.touches[0].clientX;
          this.startY = event.touches[0].clientY;
          this.startX2 = event.touches[0].clientX;
          this.startY2 = event.touches[0].clientY;
        } else {
          this.startX = event.clientX;
          this.startY = event.clientY;
          this.startX2 = event.clientX;
          this.startY2 = event.clientY;
        }
        onStart == null ? void 0 : onStart(event);
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("touchmove", this.handleMouseMove, { passive: false });
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("touchend", this.handleMouseUp, { passive: false });
      });
      __publicField(this, "handleMouseMove", (event) => {
        const { onMove } = this.options;
        if (event.type === "touchmove" && event.touches.length > 1) {
          return;
        }
        if (event.type === "mousemove" && event.button !== 0) {
          return;
        }
        if (!isMobile.any) {
          event.preventDefault();
        }
        if (!this.isStart) {
          return;
        }
        let currentX;
        let currentY;
        if (event.type === "touchmove") {
          currentX = event.touches[0].clientX;
          currentY = event.touches[0].clientY;
        } else {
          currentX = event.clientX;
          currentY = event.clientY;
        }
        const dx = currentX - this.startX;
        const dy = currentY - this.startY;
        this.startX = currentX;
        this.startY = currentY;
        this.dx += dx;
        this.dy += dy;
        this.vx = dx;
        this.vy = dy;
        onMove == null ? void 0 : onMove(
          {
            dx: this.dx,
            dy: this.dy,
            vx: this.vx,
            vy: this.vy,
            isHorizontalSwipe: Math.abs(currentX - this.startX2) * 3 > Math.abs(currentY - this.startY2)
          },
          event
        );
      });
      __publicField(this, "handleEnd", (event, gestureState) => {
        const { onEnd } = this.options;
        if (!this.isStart) {
          return;
        }
        this.isStart = false;
        if (!!gestureState) {
          this.dx = gestureState.dx;
          this.dy = gestureState.dy;
          this.vx = gestureState.vx;
          this.vy = gestureState.vy;
        }
        onEnd == null ? void 0 : onEnd(
          {
            dx: this.dx,
            dy: this.dy,
            vx: this.vx,
            vy: this.vy
          },
          event
        );
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("touchmove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("touchend", this.handleMouseUp);
      });
      __publicField(this, "handleMouseUp", (event) => {
        if (!isMobile.any) {
          event.preventDefault();
        }
        this.handleEnd(event);
      });
      __publicField(this, "setValue", ({ dx, dy }) => {
        if (dx != null) {
          this.dx = dx;
        }
        if (dy != null) {
          this.dy = dy;
        }
      });
      __publicField(this, "destroy", () => {
        this.options.element.removeEventListener("mousedown", this.handleMouseDown);
        this.options.element.removeEventListener("touchstart", this.handleMouseDown);
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("touchmove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("touchend", this.handleMouseUp);
      });
      this.options = options;
      this.dx = options.dx || 0;
      this.dy = options.dy || 0;
      options.element.addEventListener("mousedown", this.handleMouseDown);
      if (isMobile.any) {
        options.element.addEventListener("touchstart", this.handleMouseDown, { passive: false });
      }
    }
  }
  function panGesture(options) {
    return new PanGesture(options);
  }
  class Popper {
    constructor(target, options) {
      __publicField(this, "target");
      __publicField(this, "options");
      __publicField(this, "top");
      __publicField(this, "left");
      __publicField(this, "handlePlacement", () => {
        const { element, placement, offset: offset$1 } = this.options;
        const { offsetWidth: targetWidth, offsetHeight: targetHeight } = this.target;
        const { top: targetTop, left: targetLeft } = offset(this.target);
        const { offsetWidth: elementWidth, offsetHeight: elementHeight } = element;
        switch (placement) {
          case "top-left":
            this.top = targetTop - elementHeight - offset$1;
            this.left = targetLeft;
            break;
          case "top-center":
            this.top = targetTop - elementHeight - offset$1;
            this.left = targetLeft + targetWidth / 2 - elementWidth / 2;
            break;
          case "top-right":
            this.top = targetTop - elementHeight - offset$1;
            this.left = targetLeft + targetWidth - elementWidth;
            break;
          case "bottom-left":
            this.top = targetTop + targetHeight + offset$1;
            this.left = targetLeft;
            break;
          case "bottom-center":
            this.top = targetTop + targetHeight + offset$1;
            this.left = targetLeft + targetWidth / 2 - elementWidth / 2;
            break;
          case "bottom-right":
            this.top = targetTop + targetHeight + offset$1;
            this.left = targetLeft + targetWidth - elementWidth;
            break;
          case "left-top":
            this.top = targetTop;
            this.left = targetLeft - elementWidth - offset$1;
            break;
          case "left-center":
            this.top = targetTop + targetHeight / 2 - elementHeight / 2;
            this.left = targetLeft - elementWidth - offset$1;
            break;
          case "left-bottom":
            this.top = targetTop + targetHeight - elementHeight;
            this.left = targetLeft - elementWidth - offset$1;
            break;
          case "right-top":
            this.top = targetTop;
            this.left = targetLeft + targetWidth + offset$1;
            break;
          case "right-center":
            this.top = targetTop + targetHeight / 2 - elementHeight / 2;
            this.left = targetLeft + targetWidth + offset$1;
            break;
          case "right-bottom":
            this.top = targetTop + targetHeight - elementHeight;
            this.left = targetLeft + targetWidth + offset$1;
            break;
        }
      });
      __publicField(this, "checkBoundary", () => {
        const { element } = this.options;
        const { offsetWidth: elementWidth, offsetHeight: elementHeight } = element;
        const { clientWidth: windowWidth, clientHeight: windowHeight } = document.documentElement;
        if (this.top < window.scrollY) {
          this.top = window.scrollY;
        } else if (this.top + elementHeight > windowHeight + window.scrollY) {
          this.top = windowHeight + window.scrollY - elementHeight;
        }
        if (this.left < 0) {
          this.left = window.scrollX;
        } else if (this.left + elementWidth > windowWidth + window.scrollX) {
          this.left = windowWidth + window.scrollX - elementWidth;
        }
      });
      __publicField(this, "init", () => {
        const { element } = this.options;
        const { width: elementWidth, height: elementHeight } = element.getBoundingClientRect();
        this.handlePlacement();
        this.checkBoundary();
        return {
          top: this.top,
          left: this.left,
          width: elementWidth,
          height: elementHeight
        };
      });
      this.target = target;
      this.options = options;
      this.top = 0;
      this.left = 0;
    }
  }
  function popper(target, { element, placement = "bottom-center", offset: offset2 = 0 }) {
    const instance = new Popper(target, {
      element,
      placement,
      offset: offset2
    });
    return instance.init();
  }
  function parse(value, isObject = false) {
    const result = isObject ? {} : [];
    const params = new URLSearchParams(value);
    for (const pair of params.entries()) {
      if (isObject) {
        const [key, value2] = pair;
        result[key] = value2;
      } else {
        result.push([pair[0], pair[1]]);
      }
    }
    return result;
  }
  function stringify(value) {
    const params = new URLSearchParams(value);
    const ampNewline = "&" + String.fromCharCode(10);
    return params.toString().replace(/&/g, ampNewline).replace(/\w.*=&?$/gm, "").replace(/\n+/g, "").replace(/&$/g, "");
  }
  const queryString = {
    parse,
    stringify
  };
  function rubberBand(distance2, dimension, constant = 0.55) {
    return distance2 * dimension * constant / (dimension + constant * distance2);
  }
  function rubberBandClamp(min, max, delta, constant) {
    if (delta < min) {
      return -rubberBand(min - delta, max - min, constant) + min;
    } else {
      if (delta > max) {
        return rubberBand(delta - max, max - min, constant) + max;
      } else {
        return delta;
      }
    }
  }
  function createStore$1() {
    let checked = false;
    const storageAvailable = () => {
      if (!checked) {
        checked = true;
        const item = "@xoLocalStorageCheck";
        try {
          window.localStorage.setItem(item, item);
          window.localStorage.removeItem(item);
          return true;
        } catch {
          return false;
        }
      }
      return true;
    };
    const createStorage = () => {
      if (storageAvailable()) {
        return window.localStorage;
      }
      return {
        getItem() {
          return null;
        },
        setItem() {
        },
        removeItem() {
        },
        clear() {
        },
        key() {
          return null;
        },
        length: 0
      };
    };
    const storage2 = createStorage();
    return storage2;
  }
  const storage = createStore$1();
  class XOStore {
    constructor(options = {}) {
      __publicField(this, "_store");
      __publicField(this, "_prevStore");
      __publicField(this, "_options");
      __publicField(this, "_listeners");
      __publicField(this, "_storageRegisters");
      __publicField(this, "_useDeepEquals");
      __publicField(this, "_handleListeners", (stateName) => {
        if (this._listeners[stateName]) {
          const next2 = this.get(stateName);
          for (let i = 0; i < this._listeners[stateName].length; i++) {
            const { equal: equal2, listener } = this._listeners[stateName][i];
            if (!equal2) {
              listener(next2);
            } else {
              const prev2 = cloneDeep(this._prevStore[stateName]);
              if (!equal2(prev2, next2)) {
                listener(next2);
              }
            }
          }
        }
      });
      __publicField(this, "_getState", (stateName, initialState2) => {
        const { storagePrefix } = this._options;
        const stateStr = storage.getItem(`${storagePrefix}${stateName}`);
        if (stateStr != null && stateStr !== void 0 && this._storageRegisters[stateName]) {
          return JSON.parse(stateStr);
        }
        return initialState2;
      });
      __publicField(this, "_setStorage", (stateName, state) => {
        if (!!stateName && state !== void 0 && this._storageRegisters[stateName]) {
          const { storagePrefix } = this._options;
          const stateStr = JSON.stringify(state);
          storage.setItem(`${storagePrefix}${stateName}`, stateStr);
        }
      });
      __publicField(this, "_set", (stateName, nextState) => {
        const { logger, loggerCollapsed } = this._options;
        const cond = this._useDeepEquals[stateName] ? !equal(this._store[stateName], nextState) : this._store[stateName] !== nextState;
        if (cond) {
          this._prevStore[stateName] = cloneDeep(this._store[stateName]);
          this._store[stateName] = nextState;
          this._setStorage(stateName, nextState);
          this._handleListeners(stateName);
          if (logger) {
            return (actionName) => {
              XOStore.logger(actionName, nextState, stateName, loggerCollapsed, this._prevStore, this._store);
            };
          }
        }
        return () => {
        };
      });
      __publicField(this, "create", (stateName, { initialState: initialState2, useStorage, useDeepEqual }) => {
        const { logger, loggerCollapsed, storagePrefix } = this._options;
        if (!this._store[stateName]) {
          this._storageRegisters[stateName] = useStorage;
          if (!this._getState(stateName, initialState2)) {
            this._setStorage(stateName, initialState2);
          }
          this._store[stateName] = this._getState(stateName, initialState2);
          if (!useStorage) {
            storage.removeItem(`${storagePrefix}${stateName}`);
          }
          this._handleListeners(stateName);
          if (logger) {
            XOStore.logger("@store/initialState", initialState2, stateName, loggerCollapsed);
          }
        }
        if (!this._useDeepEquals[stateName]) {
          this._useDeepEquals[stateName] = !!useDeepEqual;
        }
      });
      this._store = {};
      this._prevStore = {};
      this._listeners = {};
      this._storageRegisters = {};
      this._options = {
        logger: options.logger || false,
        loggerCollapsed: options.loggerCollapsed || false,
        storagePrefix: options.storagePrefix ? `${options.storagePrefix}/` : ""
      };
      this._useDeepEquals = {};
    }
    static logger(actionName, nextState, stateName, collapsed = false, prevStore, nextStore) {
      const date = new Date();
      const hour = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const stateNameAssign = stateName;
      const space = stateNameAssign.length < 9 ? Array(9 - stateNameAssign.length).fill(" ").join("") : "";
      console[collapsed ? "groupCollapsed" : "group"](`%c XOStore: ${actionName}`, "color: #614eff", `@${hour}`);
      if (prevStore) {
        console.log("%c Prev Store ", "color: #999; font-weight: 600", prevStore);
      }
      console.log(`%c ${stateNameAssign}  ${space}`, "color: #44b0e2; font-weight: 600", nextState);
      if (nextStore) {
        console.log("%c Next Store ", "color: #7ac143; font-weight: 600", nextStore);
      }
      console.groupEnd();
    }
    get(stateName) {
      if (stateName) {
        return this._store[stateName];
      }
      return this._store;
    }
    set(stateName, state) {
      if (typeof state === "function") {
        const callback = state;
        const prevState = this._store[stateName];
        return this._set(stateName, callback(prevState));
      }
      return this._set(stateName, state);
    }
    subscribe(stateName, listener, equal2) {
      this._listeners[stateName] = this._listeners[stateName] || [];
      this._listeners[stateName].push({
        listener,
        equal: equal2
      });
      if (Object.keys(this._store).includes(stateName)) {
        const next2 = this.get(stateName);
        const prev2 = cloneDeep(this._prevStore[stateName]);
        if (!equal2) {
          listener(next2);
        } else {
          if (!equal2(prev2, next2)) {
            listener(next2);
          }
        }
      }
      return () => {
        this._listeners[stateName] = filter(this._listeners[stateName], ({ listener: _listener }) => _listener !== listener);
      };
    }
  }
  let scrollbarWidth = null;
  function getScrollbarWidth() {
    if (!document.body) {
      return 0;
    }
    if (document.body.scrollHeight <= window.innerHeight) {
      return 0;
    }
    const el = document.createElement("div");
    const size = 100;
    el.style.display = "block";
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.overflow = "scroll";
    el.style.position = "fixed";
    el.style.top = "-9999px";
    document.body.appendChild(el);
    scrollbarWidth = size - el.clientWidth;
    document.body.removeChild(el);
    return scrollbarWidth;
  }
  function getBreakpointsOptions(breakpoints) {
    if (breakpoints == null) {
      return;
    }
    const breakpointKeys = objectKeys(breakpoints || {});
    const result = reduce(
      breakpointKeys,
      (acc, key, index) => {
        var _a2, _b2;
        const max = parseInt(key.toString()) || 0;
        const min = parseInt(((_b2 = (_a2 = breakpointKeys[index - 1]) == null ? void 0 : _a2.toString) == null ? void 0 : _b2.call(_a2)) || "0");
        if (window.innerWidth > min && window.innerWidth <= max) {
          return {
            ...acc,
            ...breakpoints[key]
          };
        }
        return acc;
      },
      {}
    );
    if (!objectKeys(result).length) {
      return;
    }
    return result;
  }
  function resizeAxis(value, fn) {
    let prevWidowWidth = window.innerWidth;
    let prevWindowHeight = window.innerHeight;
    return function call(...args) {
      var _a2;
      const context = this;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        fn.apply(context, args);
      } else {
        if (value === "x") {
          if (prevWidowWidth !== window.innerWidth) {
            fn.apply(context, args);
          }
        } else if (value === "y") {
          if (prevWindowHeight !== window.innerHeight) {
            fn.apply(context, args);
          }
        }
        prevWidowWidth = window.innerWidth;
        prevWindowHeight = window.innerHeight;
      }
    };
  }
  const loadStyle = ({ file, content, insertPosition = "beforeend", id: id2, parentElement = document.head }) => {
    if (!!id2) {
      const el = document.getElementById(id2);
      el == null ? void 0 : el.remove();
    }
    if (!!file) {
      const el = document.createElement("link");
      if (!!id2) {
        el.id = id2;
      }
      el.rel = "stylesheet";
      el.href = file;
      parentElement.insertAdjacentElement(insertPosition, el);
      return el;
    }
    if (!!content) {
      const el = document.createElement("style");
      if (!!id2) {
        el.id = id2;
      }
      el.textContent = content;
      parentElement.insertAdjacentElement(insertPosition, el);
      return el;
    }
  };
  const loadScript = async ({ file, content, insertPosition = "beforeend", id: id2, parentElement = document.head, type }) => {
    if (!!id2) {
      const el = document.getElementById(id2);
      el == null ? void 0 : el.remove();
    }
    const scriptEl = document.createElement("script");
    if (!!id2) {
      scriptEl.id = id2;
    }
    if (!!file) {
      scriptEl.src = file;
      if (type) {
        scriptEl.type = type;
      }
    }
    if (!!content) {
      scriptEl.textContent = content;
    }
    if (!!file || !!content) {
      parentElement.insertAdjacentElement(insertPosition, scriptEl);
      return new Promise((resolve) => {
        scriptEl.onload = () => {
          resolve(scriptEl);
        };
      });
    }
    return new Promise((resolve) => {
      resolve(scriptEl);
    });
  };
  function range(start, end, step = 1) {
    const length = Math.ceil((end - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
  }
  class SVGPath {
    static toArray(path) {
      const pathArray = [];
      const pathData = path.match(/[a-df-z][^a-df-z]*/gi);
      if (!pathData) {
        return pathArray;
      }
      for (let i = 0; i < pathData.length; i++) {
        const pathSegment = pathData[i];
        const pathSegmentType = pathSegment.charAt(0);
        const pathSegmentValues = pathSegment.substring(1).split(/[\s,]+|(?=\s?[+\-])/).map((value) => {
          return +value;
        });
        pathArray.push({
          type: pathSegmentType,
          values: pathSegmentValues
        });
      }
      return pathArray;
    }
    static toString(path) {
      let pathString = "";
      for (let i = 0; i < path.length; i++) {
        const pathSegment = path[i];
        const pathSegmentType = pathSegment.type;
        const pathSegmentValues = pathSegment.values;
        pathString += pathSegmentType;
        for (let j = 0; j < pathSegmentValues.length; j++) {
          const value = pathSegmentValues[j];
          pathString += value + (j < pathSegmentValues.length - 1 ? " " : "");
        }
      }
      return pathString;
    }
  }
  function wrapAroundRange(value, min, max) {
    let range2 = max - min + 1;
    let result = ((value - min) % range2 + range2) % range2;
    return result;
  }
  class XoComponent extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "$attributeObserver$", null);
      __publicField(this, "props", {});
      __publicField(this, "state", {});
      __publicField(this, "_setProps", () => {
        this.props = this.getProps();
      });
      __publicField(this, "handlePropUpdate", () => {
        const observedProps = this.__proto__.constructor.observedProps;
        if (!observedProps || !observedProps.length) {
          return;
        }
        this.$attributeObserver$ = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const attrName = mutation.attributeName;
            if (attrName && mutation.type === "attributes") {
              const propName = namingConvention.kebabToCamel(attrName);
              const prevProp = mutation.oldValue;
              const nextProp = this.getAttribute(attrName);
              if (observedProps.includes(propName) && prevProp !== nextProp) {
                this._setProps();
                this.propUpdate({ name: propName, prevProp, nextProp });
              }
            }
          });
        });
        this.$attributeObserver$.observe(this, {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: observedProps.map((key) => namingConvention.camelToKebab(key))
        });
      });
    }
    getProps() {
      const propTypes = this.__proto__.constructor.propTypes;
      const defaultProps = this.__proto__.constructor.defaultProps;
      const props = getAttrs(this, {
        pick: Object.keys(propTypes),
        types: propTypes
      });
      return {
        ...defaultProps,
        ...props
      };
    }
    setState(state) {
      const prevState = this.state;
      const isObject = typeof state === "object" && !Array.isArray(state) && state !== null;
      if (isObject) {
        this.state = {
          ...this.state,
          ...state
        };
      } else if (typeof state === "function") {
        this.state = {
          ...this.state,
          ...state(prevState)
        };
      }
      this.stateUpdate(prevState);
    }
    setProps(prop) {
      const prevProps = this.props;
      const isObject = typeof prop === "object" && !Array.isArray(prop) && prop !== null;
      if (isObject) {
        this.props = {
          ...this.props,
          ...prop
        };
      } else if (typeof prop === "function") {
        this.props = {
          ...this.props,
          ...prop(prevProps)
        };
      }
      Object.entries(this.props).forEach(([key, value]) => {
        const attrName = key.includes("-") ? key : namingConvention.camelToKebab(key);
        if (typeof value === "boolean") {
          attrBoolean.set(this, attrName, value);
        } else if (value == null) {
          this.removeAttribute(attrName);
        } else {
          this.setAttribute(attrName, typeof value === "string" ? value : JSON.stringify(value));
        }
      });
    }
    connectedCallback() {
      this._setProps();
      this.setProps({});
      this.mount();
      this.handlePropUpdate();
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.$attributeObserver$) == null ? void 0 : _a2.disconnect();
      this.unmount();
    }
    emit(type, eventInitDict) {
      const event = new CustomEvent(type, eventInitDict);
      this.dispatchEvent(event);
      return event;
    }
    stateUpdate(prevState) {
    }
    propUpdate({ name, prevProp, nextProp }) {
    }
    mount() {
    }
    unmount() {
    }
  }
  __publicField(XoComponent, "defaultProps", {});
  __publicField(XoComponent, "propTypes", {});
  __publicField(XoComponent, "observedProps", []);
  function customElements$1(name, options) {
    return (target) => {
      if (!window.customElements.get(name)) {
        window.customElements.define(name, target, options);
      }
    };
  }
  function imagesLoaded(urls) {
    return new Promise((resolve) => {
      if (urls.length === 0) {
        resolve();
      }
      let loaded = 0;
      urls.forEach((url) => {
        const image = new Image();
        const handler = () => {
          loaded += 1;
          if (loaded === urls.length) {
            resolve();
          }
        };
        image.onload = handler;
        image.onerror = (error) => {
          console.error(error);
          handler();
        };
        image.src = url;
      });
    });
  }
  function sectionXoBuiderObserver(el, callback) {
    var _a2;
    const sectionEl = el.closest("section[xo-preset]");
    if (sectionEl && ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode)) {
      const observer2 = new MutationObserver(() => {
        callback();
      });
      observer2.observe(sectionEl, { attributes: true, attributeFilter: ["xo-preset"] });
      return observer2.disconnect;
    }
    return () => {
    };
  }
  function popoverSupported$1() {
    return typeof HTMLDialogElement === "function";
  }
  function openPopover(el) {
    var _a2;
    if (!popoverSupported$1()) {
      return;
    }
    if (el.hasAttribute("popover")) {
      (_a2 = el == null ? void 0 : el.showPopover) == null ? void 0 : _a2.call(el);
    }
  }
  function closePopover(el) {
    var _a2;
    if (!popoverSupported$1()) {
      return;
    }
    if (el.hasAttribute("popover")) {
      (_a2 = el == null ? void 0 : el.hidePopover) == null ? void 0 : _a2.call(el);
    }
  }
  function isYoutube(url) {
    return url.search(/^https?:\/\/(www|)\.youtube\.com/g) !== -1 || url.search(/^https?:\/\/(www|)\.youtu\.be/g) !== -1;
  }
  function isVimeo(url) {
    return url.search(/^https?:\/\/(player\.|)vimeo\.com/g) !== -1;
  }
  function handleVideo(type, selector) {
    var _a2, _b2;
    const videoEl = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (videoEl) {
      if (videoEl.tagName === "VIDEO") {
        videoEl[type]();
      } else if (videoEl.tagName === "IFRAME" && isYoutube(videoEl.src)) {
        (_a2 = videoEl.contentWindow) == null ? void 0 : _a2.postMessage(`{"event":"command","func":"${type}Video","args":[],"id":1,"channel":"widget"}`, "*");
      } else if (videoEl.tagName === "IFRAME" && isVimeo(videoEl.src)) {
        (_b2 = videoEl.contentWindow) == null ? void 0 : _b2.postMessage(
          {
            method: type,
            value: {}
          },
          "*"
        );
      }
    }
  }
  function playVideo(selector) {
    handleVideo("play", selector);
  }
  function pauseVideo(selector) {
    handleVideo("pause", selector);
  }
  function getShopifySectionId(el) {
    var _a2, _b2;
    return (_b2 = (_a2 = el.closest(".shopify-section")) == null ? void 0 : _a2.id.replace(/^shopify-section-/g, "")) != null ? _b2 : "";
  }
  function getRootRoute(value) {
    var _a2, _b2;
    const root = (_b2 = (_a2 = window.Shopify) == null ? void 0 : _a2.routes) == null ? void 0 : _b2.root;
    if (root && value && !value.includes(":") && !value.startsWith(root.replace(/\/$/g, "")) && value.startsWith("/") && !value.startsWith("//")) {
      return `${root}${value.replace(/^\//g, "")}`;
    }
    return value;
  }
  function formatMoney(cents, format) {
    if (typeof cents === "string")
      cents = cents.replace(".", "");
    let value = "";
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || "{{amount}}";
    function formatWithDelimiters(number, precision, thousands = ",", decimal = ".") {
      if (isNaN(number) || number == null)
        return "0";
      number = Number((number / 100).toFixed(precision));
      const parts = number.toString().split(".");
      const dollarsAmount = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
      const centsAmount = parts[1] ? decimal + parts[1] : "";
      return dollarsAmount + centsAmount;
    }
    const match = formatString.match(placeholderRegex);
    if (!match)
      return formatString;
    switch (match[1]) {
      case "amount":
        value = formatWithDelimiters(Number(cents), 2);
        break;
      case "amount_no_decimals":
        value = formatWithDelimiters(Number(cents), 0);
        break;
      case "amount_with_comma_separator":
        value = formatWithDelimiters(Number(cents), 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        value = formatWithDelimiters(Number(cents), 0, ".", ",");
        break;
      default:
        return formatString;
    }
    return formatString.replace(placeholderRegex, value);
  }
  const events = new Emitter();
  const SLOT_ATTR_NAME = "slot";
  const POPOVER_ATTR_NAME = "popover";
  function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }
  function morphImpl(oldNode, newNode) {
    if (typeof newNode === "string") {
      newNode = htmlToElement(newNode);
    }
    if (oldNode.nodeName !== newNode.nodeName) {
      oldNode.replaceWith(newNode.cloneNode(true));
      return;
    }
    if (oldNode.nodeType === Node.TEXT_NODE && newNode.nodeType === Node.TEXT_NODE) {
      if (oldNode.textContent !== newNode.textContent) {
        oldNode.textContent = newNode.textContent;
      }
      return;
    }
    if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
      syncAttributes(oldNode, newNode);
      syncEventListeners(oldNode, newNode);
    }
    diffChildrenWithKeys(oldNode, newNode);
    handleWebComponent(oldNode);
  }
  function handleWebComponent(node) {
    queueMicrotask(() => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        const xoEls = [el, ...Array.from(el.querySelectorAll("*"))].filter((el2) => el2.localName.startsWith("xo-"));
        each(xoEls, (el2, index) => {
          el2.setAttribute("xo-observed", Date.now().toString() + index.toString());
        });
      }
    });
  }
  function syncAttributes(oldEl, newEl) {
    const oldAttrs = oldEl.attributes;
    const newAttrs = newEl.attributes;
    for (let i = oldAttrs.length - 1; i >= 0; i--) {
      const name = oldAttrs[i].name;
      if (!newEl.hasAttribute(name) && !name.startsWith(SLOT_ATTR_NAME) && !name.startsWith(POPOVER_ATTR_NAME)) {
        oldEl.removeAttribute(name);
      }
    }
    for (let i = 0; i < newAttrs.length; i++) {
      const { name, value } = newAttrs[i];
      if (oldEl.getAttribute(name) !== value) {
        oldEl.setAttribute(name, value);
        events.emit("attr:update", { oldEl, newEl, name, value });
      }
    }
    const oldStyle = oldEl.style;
    const newStyle = newEl.style;
    for (let i = 0; i < newStyle.length; i++) {
      const prop = newStyle[i];
      if (oldStyle[prop] !== newStyle[prop]) {
        oldStyle[prop] = newStyle[prop];
      }
    }
    for (let i = 0; i < oldStyle.length; i++) {
      const prop = oldStyle[i];
      if (!newStyle[prop]) {
        oldStyle[prop] = "";
      }
    }
    for (const key in oldEl.dataset) {
      if (!(key in newEl.dataset)) {
        delete oldEl.dataset[key];
      }
    }
    for (const key in newEl.dataset) {
      if (oldEl.dataset[key] !== newEl.dataset[key]) {
        oldEl.dataset[key] = newEl.dataset[key];
      }
    }
  }
  const morph = Object.assign(morphImpl, {
    on: events.on.bind(events),
    off: events.off.bind(events)
  });
  function syncEventListeners(oldEl, newEl) {
    const allAttrs = Array.from(newEl.attributes).map((a) => a.name);
    each(allAttrs, (attr) => {
      if (attr.startsWith("on")) {
        const eventName = attr.slice(2).toLowerCase();
        const oldHandler = oldEl[attr];
        const newHandler = newEl[attr];
        if (oldHandler !== newHandler) {
          if (oldHandler)
            oldEl.removeEventListener(eventName, oldHandler);
          if (typeof newHandler === "function") {
            oldEl.addEventListener(eventName, newHandler);
            oldEl[attr] = newHandler;
          }
        }
      }
    });
  }
  function setDefaultKey(oldNode, newNode) {
    if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
      const oldEls = Array.from(oldNode.querySelectorAll("[xo-line]"));
      const newEls = Array.from(newNode.querySelectorAll("[xo-line]"));
      each(oldEls, (el) => {
        const key = el.getAttribute("key");
        if (!key) {
          el.setAttribute("key", el.getAttribute("xo-product-id"));
        }
      });
      each(newEls, (el) => {
        const key = el.getAttribute("key");
        if (!key) {
          el.setAttribute("key", el.getAttribute("xo-product-id"));
        }
      });
    }
  }
  function diffChildrenWithKeys(oldNode, newNode) {
    var _a2;
    const oldChildren = Array.from(oldNode.childNodes);
    const newChildren = Array.from(newNode.childNodes);
    setDefaultKey(oldNode, newNode);
    const oldKeyMap = /* @__PURE__ */ new Map();
    each(oldChildren, (child, idx) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const key = child.getAttribute("key");
        if (key)
          oldKeyMap.set(key, { child, idx });
      }
    });
    let i = 0;
    while (i < newChildren.length) {
      const newChild = newChildren[i];
      const newKey = newChild.nodeType === Node.ELEMENT_NODE ? newChild.getAttribute("key") : null;
      if (newKey && oldKeyMap.has(newKey)) {
        const { child: oldChild } = oldKeyMap.get(newKey);
        morph(oldChild, newChild);
        if (oldNode.childNodes[i] !== oldChild) {
          oldNode.insertBefore(oldChild, oldNode.childNodes[i] || null);
        }
      } else {
        const oldChild = oldNode.childNodes[i];
        if (!oldChild) {
          oldNode.appendChild(newChild.cloneNode(true));
        } else if (!newKey && !((_a2 = oldChild.getAttribute) == null ? void 0 : _a2.call(oldChild, "key"))) {
          morph(oldChild, newChild);
        } else {
          oldNode.insertBefore(newChild.cloneNode(true), oldChild);
        }
      }
      i++;
    }
    while (oldNode.childNodes.length > newChildren.length) {
      oldNode.removeChild(oldNode.lastChild);
    }
  }
  const WebComponent = {
    CircleBar: "xo-circle-bar",
    ScrollX: "xo-scroll-x",
    ScrollXInner: "xo-scroll-x-inner",
    ScrollXItem: "xo-scroll-x-item",
    ScrollY: "xo-scroll-y",
    ScrollYInner: "xo-scroll-y-inner",
    ScrollYItem: "xo-scroll-y-item",
    ScrollXYItem: "xo-scroll-xy-item",
    Toggle: "xo-toggle",
    ToggleTrigger: "xo-toggle-trigger",
    Modal: "xo-modal",
    ModalTrigger: "xo-modal-trigger",
    ModalInner: "xo-modal-inner",
    ModalContent: "xo-modal-content",
    ModalBackdrop: "xo-modal-backdrop",
    ModalPan: "xo-modal-pan",
    Toast: "xo-toast",
    ToastPortal: "xo-toast-portal",
    ToastContent: "xo-toast-content",
    ToastCloseButton: "xo-toast-close-button",
    Popover: "xo-popover",
    PopoverTrigger: "xo-popover-trigger",
    BuilderPopover: "xo-builder-popover",
    BuilderPopoverContent: "xo-builder-popover-content",
    Tooltip: "xo-tooltip",
    TooltipContent: "xo-tooltip-content",
    TooltipTrigger: "xo-tooltip-trigger",
    Sticky: "xo-sticky",
    StickyInner: "xo-sticky-inner",
    StickyContent: "xo-sticky-content",
    StickySpace: "xo-sticky-space",
    StickyHidden: "xo-sticky-hidden",
    Collapse: "xo-collapse",
    CollapseTrigger: "xo-collapse-trigger",
    CollapseProvider: "xo-collapse-provider",
    List: "xo-list",
    ListTrigger: "xo-list-trigger",
    ListPortal: "xo-list-portal",
    ListItem: "xo-list-item",
    Tabs: "xo-tabs",
    TabsPane: "xo-tabs-pane",
    TabsTrigger: "xo-tabs-trigger",
    TabsActive: "xo-tabs-active",
    Parallax: "xo-parallax",
    ParallaxScroll: "xo-parallax-scroll",
    ParallaxHover: "xo-parallax-hover",
    ParallaxHoverInner: "xo-parallax-hover-inner",
    Carousel: "xo-carousel",
    CarouselThumbnail: "xo-carousel-thumbnail",
    CarouselList: "xo-carousel-list",
    CarouselInner: "xo-carousel-inner",
    CarouselSlide: "xo-carousel-slide",
    CarouselNext: "xo-carousel-next",
    CarouselPrev: "xo-carousel-prev",
    CarouselPagination: "xo-carousel-pagination",
    CarouselBullet: "xo-carousel-bullet",
    CarouselSize: "xo-carousel-size",
    CarouselPage: "xo-carousel-page",
    CarouselTrigger: "xo-carousel-trigger",
    CarouselPaginationProgress: "xo-carousel-pagination-progress",
    CarouselDynamicBullets: "xo-carousel-dynamic-bullets",
    CarouselFilterEffect: "xo-carousel-filter-effect",
    ScrollCarousel: "xo-scroll-carousel",
    ScrollCarouselNext: "xo-scroll-carousel-next",
    ScrollCarouselPrev: "xo-scroll-carousel-prev",
    Range: "xo-range",
    RangePrice: "xo-range-price",
    RangeTrack: "xo-range-track",
    RangeThumb: "xo-range-thumb",
    RangeProgress: "xo-range-progress",
    Filters: "xo-filters",
    FiltersMobile: "xo-filters-mobile",
    FiltersField: "xo-filters-field",
    FiltersContent: "xo-filters-content",
    FiltersRefine: "xo-filters-refine",
    FiltersClear: "xo-filters-clear",
    FiltersFallback: "xo-filters-fallback",
    FiltersCount: "xo-filters-count",
    FiltersActiveSize: "xo-filters-active-size",
    FiltersPaginate: "xo-filters-paginate",
    FiltersLoadMore: "xo-filters-load-more",
    FiltersTop: "xo-filters-top",
    FiltersSortBySelected: "xo-filters-sort-by-selected",
    FiltersRefineClearIcon: "xo-filters-refine-clear-icon",
    Gallery: "xo-gallery",
    GalleryItem: "xo-gallery-item",
    GalleryPortal: "xo-gallery-portal",
    GalleryNext: "xo-gallery-next",
    GalleryPrev: "xo-gallery-prev",
    GalleryCounter: "xo-gallery-counter",
    Cart: "xo-cart",
    CartMini: "xo-cart-mini",
    CartSize: "xo-cart-size",
    CartAdd: "xo-cart-add",
    CartFly: "xo-cart-fly",
    CartRemove: "xo-cart-remove",
    CartChangeFallback: "xo-cart-change-fallback",
    CartQuantity: "xo-cart-quantity",
    CartQuantityMinus: "xo-cart-quantity-minus",
    CartQuantityPlus: "xo-cart-quantity-plus",
    CartQuantityTrigger: "xo-cart-quantity-trigger",
    CartNote: "xo-cart-note",
    CartNoteSubmit: "xo-cart-note-submit",
    CartShippingRates: "xo-cart-shipping-rates",
    CartShippingRatesField: "xo-cart-shipping-rates-field",
    CartShippingRatesSubmit: "xo-cart-shipping-rates-submit",
    CartShippingRatesError: "xo-cart-shipping-rates-error",
    CartDiscount: "xo-cart-discount",
    CartDiscountSubmit: "xo-cart-discount-submit",
    CartDiscountItem: "xo-cart-discount-item",
    CartDiscountRemove: "xo-cart-discount-remove",
    CartScroll: "xo-cart-scroll",
    CartAddError: "xo-cart-add-error",
    CartAddErrorMessage: "xo-cart-add-error-message",
    CartWillChange: "xo-cart-will-change",
    Product: "xo-product",
    ProductWillChange: "xo-product-will-change",
    ProductVariant: "xo-product-variant",
    ProductVariants: "xo-product-variants",
    ProductVariantActive: "xo-product-variant-active",
    ProductProperties: "xo-product-properties",
    ProductProperty: "xo-product-property",
    ProductData: "xo-product-data",
    ProductPickupAvailability: "xo-product-pickup-availability",
    ProductPickupAvailabilityList: "xo-product-pickup-availability-list",
    ProductQuickView: "xo-product-quick-view",
    ProductQuickViewTrigger: "xo-product-quick-view-trigger",
    ProductQuickViewVariant: "xo-product-quick-view-variant",
    ProductQuickViewLiquidBinding: "xo-product-quick-view-liquid-binding",
    ProductLiquidStatic: "xo-product-liquid-static",
    ProductVariantSelected: "xo-product-variant-selected",
    ProductRecipientForm: "xo-product-recipient-form",
    ProductRecipientFormError: "xo-product-recipient-form-error",
    ProductRecommendations: "xo-product-recommendations",
    ProductMedia: "xo-product-media",
    ProductCompareAdd: "xo-product-compare-add",
    ProductCompareRemove: "xo-product-compare-remove",
    ProductCompareClear: "xo-product-compare-clear",
    ProductCompareSize: "xo-product-compare-size",
    BundleProvider: "xo-bundle-provider",
    BundleAdd: "xo-bundle-add",
    BundleRemove: "xo-bundle-remove",
    BundleContent: "xo-bundle-content",
    BundlePrice: "xo-bundle-price",
    BundleSize: "xo-bundle-size",
    BundlePlaceholder: "xo-bundle-placeholder",
    BundleProgress: "xo-bundle-progress",
    BundleStep: "xo-bundle-step",
    BundleProperties: "xo-bundle-properties",
    PriceReduced: "xo-price-reduced",
    MarqueeScrollTransform: "xo-marquee-scroll-transform",
    Marquee: "xo-marquee",
    MarqueeItem: "xo-marquee-item",
    SvgMarquee: "xo-svg-marquee",
    Group: "xo-group",
    GroupButton: "xo-group-button",
    Animate: "xo-animate",
    AnimateItem: "xo-animate-item",
    ImageZoom: "xo-image-zoom",
    ImageZoomInner: "xo-image-zoom-inner",
    ImageZoomItem: "xo-image-zoom-item",
    ImageZoomThumb: "xo-image-zoom-thumb",
    ImageZoomManual: "xo-image-zoom-manual",
    Countdown: "xo-countdown",
    CountdownDay: "xo-countdown-day",
    CountdownHour: "xo-countdown-hour",
    CountdownMinute: "xo-countdown-minute",
    CountdownSecond: "xo-countdown-second",
    Countto: "xo-countto",
    CounttoNumber: "xo-countto-number",
    VideoCover: "xo-video-cover",
    VideoCoverButton: "xo-video-cover-button",
    VideoCoverItem: "xo-video-cover-item",
    Ripple: "xo-ripple",
    RippleItem: "xo-ripple-item",
    Typing: "xo-typing",
    TypingInner: "xo-typing-inner",
    TypingContent: "xo-typing-content",
    ImageComparison: "xo-image-comparison",
    Instagram: "xo-instagram",
    InstagramTemplate: "xo-instagram-template",
    InstagramItem: "xo-instagram-item",
    InstagramNext: "xo-instagram-next",
    InstagramPrev: "xo-instagram-prev",
    DarkMode: "xo-dark-mode",
    MegaMenu: "xo-mega-menu",
    Masonry: "xo-masonry",
    MasonryItem: "xo-masonry-item",
    Lazyload: "xo-lazyload",
    Cursor: "xo-cursor",
    CursorItem: "xo-cursor-item",
    VirtualScroll: "xo-virtual-scroll",
    Drr: "xo-drr",
    Drr2: "xo-drr-2",
    DrrAction: "xo-drr-action",
    Magnetic: "xo-magnetic",
    MagneticContent: "xo-magnetic-content",
    LineChart: "xo-line-chart",
    ScrollScene: "xo-scroll-scene",
    ScrollSceneInner: "xo-scroll-scene-inner",
    ScrollSceneItem: "xo-scroll-scene-item",
    CollectionTabs: "xo-collection-tabs",
    CollectionTabsTrigger: "xo-collection-tabs-trigger",
    CollectionTabsContent: "xo-collection-tabs-content",
    IntersectionVideo: "xo-intersection-video",
    ProductsFetcher: "xo-products-fetcher",
    ProductsFetcherAdd: "xo-products-fetcher-add",
    ProductsFetcherRemove: "xo-products-fetcher-remove",
    ProductsFetcherClear: "xo-products-fetcher-clear",
    ProductsFetcherSize: "xo-products-fetcher-size",
    ProductsFetcherPaginate: "xo-products-fetcher-paginate",
    Photoswipe: "xo-photoswipe",
    GlobalFunction: "xo-global-function",
    Item: "xo-item",
    GridHoverExpand: "xo-grid-hover-expand"
  };
  const cache$1 = /* @__PURE__ */ new Map();
  const WIDTH_PARAM = "width";
  const MIN_DEVICE_PIXEL_RATIO = (_a = window == null ? void 0 : window.xoImgDevicePixelRatio) != null ? _a : 1.2;
  const MAX_DEVICE_PIXEL_RATIO = (_b = window == null ? void 0 : window.xoImgDevicePixelRatio) != null ? _b : 1.2;
  const MAX_WIDTH = 2e3;
  function getSrc(src, width, min, max) {
    const oldSrc = src;
    if (!oldSrc) {
      return "";
    }
    if (oldSrc.includes("data:")) {
      return oldSrc;
    }
    const oldSrcRemoveWidth = oldSrc.replace(/(\?|&)(w|width)=\d*/g, "").replace(new RegExp(`(\\?|&)${WIDTH_PARAM}=\\d*`, "g"), "");
    const devicePixelRatio = clamp(window.devicePixelRatio, MIN_DEVICE_PIXEL_RATIO, MAX_DEVICE_PIXEL_RATIO);
    const lastWidth = clamp(Math.min(Math.round(width * devicePixelRatio), MAX_WIDTH), min, max);
    if (lastWidth === 0) {
      return oldSrc;
    }
    const withParam = `${WIDTH_PARAM}=${lastWidth}`;
    if (oldSrcRemoveWidth.includes("?")) {
      return `${oldSrcRemoveWidth}&${withParam}`;
    }
    return `${oldSrcRemoveWidth}?${withParam}`;
  }
  function getIntrinsicSize(el) {
    const intrinsicWidth = Number(el.getAttribute("xo-intrinsic-width")) || Number(el.getAttribute("data-intrinsic-width")) || 0;
    const intrinsicHeight = Number(el.getAttribute("xo-intrinsic-height")) || Number(el.getAttribute("data-intrinsic-height")) || 0;
    return { intrinsicWidth, intrinsicHeight };
  }
  function getFallbackWidth(el) {
    return Number(el.getAttribute("xo-fallback-width")) || Number(el.getAttribute("data-fallback-width")) || 400;
  }
  function hasWidthRange(el) {
    return el.hasAttribute("xo-width-range") || el.hasAttribute("data-width-range");
  }
  function getWidthRange(el) {
    return objectParse(el.getAttribute("xo-width-range") || el.getAttribute("data-width-range") || "[200, 1920]");
  }
  function hasIntrinsic(size) {
    return size.intrinsicWidth > 0 && size.intrinsicHeight > 0;
  }
  function getWidth(el) {
    const intrinsicSize = getIntrinsicSize(el);
    const fallbackWidth = getFallbackWidth(el);
    const { width } = el.getBoundingClientRect();
    const coverEl = el.parentElement;
    const _width = hasWidthRange(el) ? width : Math.max(width, fallbackWidth);
    if (!coverEl) {
      return _width;
    }
    if (hasIntrinsic(intrinsicSize)) {
      return Math.round(_width);
    }
    return _width;
  }
  class Lazyload extends HTMLImageElement {
    constructor() {
      super(...arguments);
      __publicField(this, "prevSrc", "");
      __publicField(this, "morphId", -1);
      __publicField(this, "removeOverlay", async () => {
        var _a2;
        const overlayEl = (_a2 = this.parentElement) == null ? void 0 : _a2.querySelector(".xo-lazyload-overlay");
        overlayEl == null ? void 0 : overlayEl.remove();
        cache$1.set(this.prevSrc, this.src);
        attrBoolean.set(this, "xo-loaded", true);
        this.style.removeProperty("--fallback");
      });
      __publicField(this, "handleLoad", () => {
        this.removeEventListener("load", this.handleLoad);
        this.removeOverlay();
      });
      __publicField(this, "handler", () => {
        const src = this.getAttribute("xo-src") || this.getAttribute("data-src") || this.src;
        const [min, max] = getWidthRange(this);
        const width = getWidth(this);
        const nextSrc = getSrc(src, width, min, max);
        if (src) {
          this.prevSrc = src;
          this.src = nextSrc;
          if (this.loading === "lazy") {
            this.style.setProperty("--fallback", `url('${this.prevSrc}')`);
          }
        }
        this.srcset = nextSrc;
        if (this.complete || cache$1.has(this.src)) {
          this.removeOverlay();
        }
        this.addEventListener("load", this.handleLoad);
      });
      __publicField(this, "init", async (isResize = false) => {
        if (this.loading === "eager") {
          await delay();
          const image = new Image();
          image.src = this.getAttribute("xo-src") || this.getAttribute("data-src") || this.src;
          image.onload = () => {
            this.handler();
          };
          return;
        }
        if (this.loading === "auto") {
          this.loading = "lazy";
        }
        const blocking = !!this.closest(`${WebComponent.Carousel}:not([xo-overflow="visible"]) ${WebComponent.CarouselInner}, ${WebComponent.Popover}, ${WebComponent.Modal}, ${WebComponent.Toggle}`) && !isResize;
        if (blocking) {
          return;
        }
        this.handler();
      });
      __publicField(this, "handleResize", debounce(() => this.init(true), 500));
    }
    static get observedAttributes() {
      return ["xo-src", "data-src"];
    }
    update() {
      this.init();
    }
    connectedCallback() {
      this.init();
      window.addEventListener("resize", this.handleResize, false);
      this.morphId = morph.on("attr:update", ({ oldEl }) => {
        if (oldEl === this) {
          this.init();
        }
      });
    }
    disconnectedCallback() {
      this.removeEventListener("load", this.handleLoad);
      window.removeEventListener("resize", this.handleResize, false);
      morph.off(this.morphId);
    }
    attributeChangedCallback(_, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.init();
      }
    }
  }
  function loadImages(els) {
    each(els, (el) => {
      if (el.getAttribute("is") === WebComponent.Lazyload && !attrBoolean.get(el, "xo-loaded")) {
        el == null ? void 0 : el.handler();
      }
    });
  }
  function getImageFromBackground(src) {
    const result = src.replace(/url\(["']|["']\)/g, "");
    if (result === window.location.href.replace(/\?.*/g, "") || result === "none") {
      return "";
    }
    return result;
  }
  let intersectionObserver = null;
  function handleLazyload(els) {
    function handleImage(el) {
      const oldSrc = getImageFromBackground(window.getComputedStyle(el).backgroundImage) || el.getAttribute("xo-src") || el.getAttribute("data-src") || "";
      if (oldSrc) {
        const [min, max] = getWidthRange(el);
        const src = getSrc(oldSrc, getWidth(el), min, max);
        const overlayEl = el.querySelector(".xo-lazyload-overlay");
        if (el.tagName.toLowerCase() === WebComponent.ParallaxScroll) {
          el.addEventListener("xo:parallax-scroll:init", () => {
            el.style.backgroundImage = `url('${src}')`;
            overlayEl == null ? void 0 : overlayEl.remove();
          });
        }
        el.style.backgroundImage = `url('${src}')`;
        overlayEl == null ? void 0 : overlayEl.remove();
      }
    }
    if ("IntersectionObserver" in window) {
      intersectionObserver == null ? void 0 : intersectionObserver.disconnect();
      intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          await delay(window.XO_DEV ? 1e3 : 50);
          if (entry.isIntersecting) {
            const el = entry.target;
            handleImage(el);
            intersectionObserver == null ? void 0 : intersectionObserver.unobserve(el);
          }
        });
      });
      els.forEach((el) => {
        intersectionObserver == null ? void 0 : intersectionObserver.observe(el);
      });
    } else {
      els.forEach(handleImage);
    }
  }
  function init(rootEl = document) {
    const els = Array.from(rootEl.querySelectorAll(".xo-background-lazyload"));
    handleLazyload(els);
  }
  morph.on("attr:update", ({ oldEl }) => {
    if (oldEl.classList.contains("xo-background-lazyload")) {
      init();
    }
  });
  DOMLoaded(init);
  document.addEventListener("shopify:section:load", (event) => init(event.target));
  document.addEventListener("shopify:section:reorder", (event) => init(event.target));
  window.addEventListener("resize", debounce(() => init(), 500));
  const megaMenuEls = Array.from(document.querySelectorAll(WebComponent.MegaMenu));
  const initialized = /* @__PURE__ */ new Map();
  each(megaMenuEls, (megaMenuEl) => {
    const liEl = megaMenuEl.closest("li");
    if (liEl) {
      liEl.addEventListener("mouseenter", () => {
        if (!initialized.get(liEl)) {
          init();
          initialized.set(liEl, true);
        }
      });
    }
  });
  const lazyload = "";
  if (!customElements.get(WebComponent.Lazyload)) {
    customElements.define(WebComponent.Lazyload, Lazyload, { extends: "img" });
  }
  const styles$A = "";
  function xbHref() {
    var _a2;
    if (!((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode)) {
      window.addEventListener("click", (event) => {
        const targetEl = event.target;
        const anchorEl = targetEl.closest("[xb-href], [xo-href]");
        const href = (anchorEl == null ? void 0 : anchorEl.getAttribute("xb-href")) || (anchorEl == null ? void 0 : anchorEl.getAttribute("xo-href"));
        if (href) {
          event.preventDefault();
          const isBlank = anchorEl.getAttribute("xb-target") === "_blank" || anchorEl.getAttribute("xo-target") === "_blank" || event.ctrlKey || event.metaKey;
          if (isBlank) {
            window.open(getRootRoute(href), "_blank");
          } else {
            window.location.href = getRootRoute(href);
          }
        }
      });
    }
  }
  xbHref();
  const lerp = (p1, p2, t) => {
    return p1 + (p2 - p1) * t;
  };
  const EMPTY = "===empty===";
  const DEFAULT_FPS$3 = 60;
  const DT_FPS$3 = 1e3 / DEFAULT_FPS$3;
  const MIN = 0;
  const MAX = 100;
  const UNIT_PATTERN = /(px|%|vh|vw|em|rem|pt|cm|mm|in|pc|ex|ch|vmin|vmax|lh|rlh|vb|vi|svw|svh|lvw|lvh|dvw|dvh|deg)/g;
  class ParallaxScrollItem {
    constructor(el, options, contextOptions) {
      __publicField(this, "el");
      __publicField(this, "cloneEl");
      __publicField(this, "options");
      __publicField(this, "contextOptions");
      __publicField(this, "currentValue");
      __publicField(this, "targetValue");
      __publicField(this, "handleFrameSyncUpdate", ({ delta }) => {
        const { lerpEase } = this.contextOptions;
        const diff = Math.abs(this.targetValue - this.currentValue);
        if (diff < 1e-3) {
          return;
        }
        let slowDownFactor = delta / DT_FPS$3;
        const slowDownFactorRounded = Math.round(slowDownFactor);
        if (slowDownFactorRounded >= 1) {
          slowDownFactor = slowDownFactorRounded;
        }
        const value = lerp(this.currentValue, this.targetValue, lerpEase * slowDownFactor);
        this.setStyles(this.el, value);
        this.currentValue = value;
      });
      __publicField(this, "destroy", () => {
        if (this.el) {
          const { style } = this.cloneEl;
          this.el.removeAttribute("style");
          each(Array.from(style), (prop) => {
            const val = style[prop];
            this.el.style[prop] = val;
          });
          frameManager$1.remove(this.handleFrameSyncUpdate);
        }
      });
      __publicField(this, "getElement", () => {
        return this.el;
      });
      this.el = el;
      this.cloneEl = this.el.cloneNode();
      this.options = options;
      this.contextOptions = contextOptions;
      this.currentValue = 0;
      this.targetValue = 0;
      frameManager$1.add(this.handleFrameSyncUpdate, true);
    }
    getInputRange() {
      const { keyframes } = this.options;
      return reduce(
        objectKeys(keyframes),
        (arr, item) => {
          const val = Number(item.replace("%", ""));
          if (isNaN(val)) {
            return arr;
          }
          return [...arr, val];
        },
        []
      ).sort((a, b) => a - b);
    }
    getKeyframesByProp(prop) {
      const { keyframes } = this.options;
      const inputRange = this.getInputRange();
      if (Math.max(...inputRange) > 100) {
        throwError("Max value of input range must be less than 100%");
      }
      let prevVal = null;
      return reduce(
        inputRange,
        (arr, item) => {
          const key = `${item}%`;
          const val = keyframes[key][prop];
          if (val != null) {
            arr.push(String(val));
          }
          prevVal = arr[arr.length - 1];
          if (val == null && prevVal != null) {
            arr.push(prevVal);
          }
          return arr;
        },
        []
      );
    }
    getDefaultUnit(prop) {
      switch (prop) {
        case "x":
        case "y":
        case "width":
        case "height":
        case "backgroundPositionY":
        case "blur":
        case "borderRadius":
          return "px";
        case "rotate":
        case "rotateX":
        case "rotateY":
        case "skew":
        case "skewX":
        case "skewY":
        case "hueRotate":
          return "deg";
        case "backgroundSizeX":
        case "backgroundSizeY":
        case "grayscale":
          return "%";
        case "scale":
        case "scaleX":
        case "scaleY":
        case "opacity":
        case "videoTime":
        case "brightness":
        case "contrast":
        default:
          return "";
      }
    }
    interpolate(value, prop) {
      const outputRange = this.getKeyframesByProp(prop);
      const unit = String(outputRange[0]).replace(/[0-9.,-]/g, "");
      const outputRangeNumber = outputRange.map((item) => Number(String(item).replace(UNIT_PATTERN, "")));
      if (outputRange.length === 0) {
        return EMPTY;
      }
      const result = interpolate({ value, inputRange: this.getInputRange(), outputRange: outputRangeNumber });
      return `${result}${unit || this.getDefaultUnit(prop)}`;
    }
    setStyles(el, value) {
      const { setStyles } = this.contextOptions;
      const x = this.interpolate(value, "x");
      const y = this.interpolate(value, "y");
      const rotate = this.interpolate(value, "rotate");
      const rotateX = this.interpolate(value, "rotateX");
      const rotateY = this.interpolate(value, "rotateY");
      const scale = this.interpolate(value, "scale");
      const scaleX = this.interpolate(value, "scaleX");
      const scaleY = this.interpolate(value, "scaleY");
      const skew = this.interpolate(value, "skew");
      const skewX = this.interpolate(value, "skewX");
      const skewY = this.interpolate(value, "skewY");
      const opacity = this.interpolate(value, "opacity");
      const borderRadius = this.interpolate(value, "borderRadius");
      const width = this.interpolate(value, "width");
      const height = this.interpolate(value, "height");
      const brightness = this.interpolate(value, "brightness");
      const contrast = this.interpolate(value, "contrast");
      const hueRotate = this.interpolate(value, "hueRotate");
      const blur = this.interpolate(value, "blur");
      const grayscale = this.interpolate(value, "grayscale");
      const backgroundPositionY = this.interpolate(value, "backgroundPositionY");
      const backgroundSizeX = this.interpolate(value, "backgroundSizeX");
      const backgroundSizeY = this.interpolate(value, "backgroundSizeY");
      const videoTime = this.interpolate(value, "videoTime");
      const groupImg = this.interpolate(value, "groupImg");
      const filterArr = [];
      el.style.transform = filter(
        [
          `translateX(${x})`,
          `translateY(${y})`,
          `rotate(${rotate})`,
          `rotateX(${rotateX})`,
          `rotateY(${rotateY})`,
          `scale(${scale})`,
          `scaleX(${scaleX})`,
          `scaleY(${scaleY})`,
          `skew(${skew})`,
          `skewX(${skewX})`,
          `skewY(${skewY})`
        ],
        (item) => !!item && !item.includes(EMPTY)
      ).join(" ");
      if (width !== EMPTY) {
        el.style.width = `${width}`;
      }
      if (height !== EMPTY) {
        el.style.height = `${height}`;
      }
      if (opacity !== EMPTY) {
        el.style.opacity = `${opacity}`;
      }
      if (borderRadius !== EMPTY) {
        el.style.borderRadius = `${borderRadius}`;
      }
      if (brightness !== EMPTY) {
        filterArr.push(`brightness(${brightness})`);
      }
      if (contrast !== EMPTY) {
        filterArr.push(`contrast(${contrast})`);
      }
      if (hueRotate !== EMPTY) {
        filterArr.push(`hue-rotate(${hueRotate})`);
      }
      if (blur !== EMPTY) {
        filterArr.push(`blur(${blur})`);
      }
      if (grayscale !== EMPTY) {
        filterArr.push(`grayscale(${grayscale})`);
      }
      if (filterArr.length > 0) {
        el.style.filter = filterArr.join(" ");
      }
      if (backgroundPositionY !== EMPTY) {
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        if (isMobile.iOS) {
          el.style.backgroundPosition = `50% calc(${backgroundPositionY} * -1)`;
        } else {
          el.style.backgroundAttachment = "fixed";
          el.style.backgroundPosition = `50% ${backgroundPositionY}`;
        }
      }
      if (backgroundSizeX !== EMPTY && backgroundSizeY === EMPTY) {
        el.style.backgroundSize = `${backgroundSizeX} 100%`;
      }
      if (backgroundSizeX === EMPTY && backgroundSizeY !== EMPTY) {
        el.style.backgroundSize = `100% ${backgroundSizeY}`;
      }
      if (backgroundSizeX !== EMPTY && backgroundSizeY !== EMPTY) {
        el.style.backgroundSize = `${backgroundSizeX} ${backgroundSizeY}`;
      }
      if (videoTime !== EMPTY) {
        const videoEl = el.querySelector("video");
        if (videoEl && videoEl.duration) {
          const currentTime = interpolate({
            value: Number(videoTime.replace(UNIT_PATTERN, "")),
            inputRange: [0, 100],
            outputRange: [0, videoEl.duration]
          });
          videoEl.currentTime = currentTime;
        }
      }
      if (groupImg !== EMPTY) {
        if (window.getComputedStyle(el).position === "static") {
          el.style.position = "relative";
        }
        const imageEls = Array.from(el.querySelectorAll("img"));
        const currentIndex = Math.floor(
          interpolate({
            value: Number(groupImg.replace(UNIT_PATTERN, "")),
            inputRange: [0, 100],
            outputRange: [0, imageEls.length - 1]
          })
        );
        each(imageEls, (imageEl, index) => {
          imageEl.style.opacity = index === currentIndex ? "1" : "0";
        });
      }
      if (setStyles) {
        setStyles({
          element: el,
          createValue: (prop) => this.interpolate(value, prop),
          EMPTY
        });
      }
    }
    handleParallax() {
      const start = window.scrollY - this.getFrom();
      const end = this.getTo() - this.getFrom();
      const value = clamp(start / end * 100, MIN, MAX);
      if (value >= MIN && value <= MAX) {
        this.targetValue = value;
      }
    }
    getFrom() {
      const { from } = this.options;
      if (typeof from === "function") {
        return from();
      }
      return from;
    }
    getTo() {
      const { to } = this.options;
      if (typeof to === "function") {
        return to();
      }
      return to;
    }
    init() {
      this.handleParallax();
    }
  }
  const _ParallaxScroll$1 = class {
    constructor(options) {
      __publicField(this, "options");
      __publicField(this, "items");
      __publicField(this, "handlerScroll", () => {
        for (const instance of this.items) {
          instance.init();
        }
      });
      __publicField(this, "add", (el, options) => {
        this.items.push(new ParallaxScrollItem(el, options, this.options));
        return this;
      });
      __publicField(this, "remove", (el) => {
        const item = this.items.find((item2) => item2.getElement() === el);
        this.items = this.items.filter((item2) => item2.getElement() !== el);
        if (item) {
          item.destroy();
        }
      });
      __publicField(this, "run", () => {
        const { targetElement } = this.options;
        this.handlerScroll();
        targetElement.removeEventListener("scroll", this.handlerScroll, false);
        targetElement.addEventListener("scroll", this.handlerScroll, false);
      });
      __publicField(this, "destroy", () => {
        const { targetElement } = this.options;
        targetElement.removeEventListener("scroll", this.handlerScroll, false);
        for (const instance of this.items) {
          instance.destroy();
        }
      });
      this.options = {
        ..._ParallaxScroll$1.defaultOptions,
        ...options
      };
      this.items = [];
    }
  };
  let ParallaxScroll$1 = _ParallaxScroll$1;
  __publicField(ParallaxScroll$1, "defaultOptions", {
    targetElement: window,
    setStyles: void 0,
    lerpEase: 0.08
  });
  const styles$z = "";
  function parallaxScroll(options = {}) {
    return new ParallaxScroll$1(options);
  }
  window.xoParallaxScroll = parallaxScroll;
  const styles$y = "";
  const SSR_PAGE_PATTERN = /\/(checkout|cart)/g;
  const hrefValid = (href) => {
    const url = new URL(href);
    return url.origin === location.origin && ["http:", "https:"].includes(url.protocol) && !(url.protocol === "http:" && location.protocol === "https:") && !(url.hash && url.pathname + url.search === location.pathname + location.search);
  };
  const SSRNavigate = (href) => {
    document.body.classList.add("xo-navigate-smooth");
    window.location.href = href;
  };
  const isAnchor = (el) => {
    return !!el.closest("a[href]");
  };
  const _PageSpeed = class {
    constructor(options) {
      __publicField(this, "linksLoaded", /* @__PURE__ */ new Set());
      __publicField(this, "domparser", new DOMParser());
      __publicField(this, "pages", /* @__PURE__ */ new Map());
      __publicField(this, "controllers", /* @__PURE__ */ new Map());
      __publicField(this, "options");
      __publicField(this, "lastTouchTimestamp", 0);
      __publicField(this, "timeId", -1);
      __publicField(this, "getHtml", async (el) => {
        const { use } = this.options;
        const { href } = el;
        if (!this.linksLoaded.has(href)) {
          this.linksLoaded.add(href);
          this.controllers.set(href, new AbortController());
          const { signal } = this.controllers.get(href);
          if (!this.pages.has(href)) {
            if (use === "SSR") {
              const linkEl = document.createElement("link");
              linkEl.rel = "prefetch";
              linkEl.href = href;
              linkEl.fetchPriority = "high";
              linkEl.as = "document";
              attrBoolean.set(linkEl, "xo-prefetch", true);
              linkEl.onload = () => {
                attrBoolean.set(el, "xo-prefetched", true);
              };
              document.head.appendChild(linkEl);
            } else {
              try {
                const res = await fetch(href, { signal });
                const htmlText = await res.text();
                const doc = this.domparser.parseFromString(htmlText, "text/html");
                this.pages.set(href, doc);
              } catch {
                this.linksLoaded.delete(href);
              }
            }
          }
        }
      });
      __publicField(this, "cancelRequest", (href) => {
        const { use } = this.options;
        if (this.controllers.has(href)) {
          if (use === "SSR") {
            const linkEl = document.querySelector(`link[xo-prefetch][href="${href}"]`);
            if (linkEl) {
              linkEl.remove();
            }
          } else {
            this.controllers.get(href).abort();
          }
          this.linksLoaded.delete(href);
        }
      });
      __publicField(this, "navigate", (href) => {
        if (SSR_PAGE_PATTERN.test(href)) {
          SSRNavigate(href);
        } else if (hrefValid(href)) {
          const { root } = this.options;
          if (this.pages.has(href) && root) {
            const rootSelector = `#${root.id}`;
            const nextRoot = this.pages.get(href).querySelector(rootSelector);
            if (nextRoot) {
              root.innerHTML = nextRoot.innerHTML;
              window.history.pushState(null, "", href);
              window.scrollTo(0, 0);
              this.update();
            }
          } else {
            SSRNavigate(href);
          }
        }
      });
      __publicField(this, "handleWindowClick", async (event) => {
        const { use } = this.options;
        const anchorEl = event.target.closest("a");
        if (!anchorEl) {
          return;
        }
        if (use === "CSR") {
          if (isAnchor(anchorEl)) {
            event.preventDefault();
            this.navigate(anchorEl.href);
          }
        }
      });
      __publicField(this, "handleMouseOver", (event) => {
        if (performance.now() - this.lastTouchTimestamp < 1100) {
          return;
        }
        const anchorEl = event.target.closest("a");
        if (anchorEl && hrefValid(anchorEl.href)) {
          this.timeId = window.setTimeout(() => {
            this.timeId = -1;
            this.getHtml(anchorEl);
          }, 80);
        }
      });
      __publicField(this, "handleTouchStart", (event) => {
        this.lastTouchTimestamp = Date.now();
        const anchorEl = event.target.closest("a");
        if (anchorEl && hrefValid(anchorEl.href)) {
          anchorEl.addEventListener("touchcancel", this.handleCancel, { passive: true });
          anchorEl.addEventListener("touchend", this.handleCancel, { passive: true });
          this.getHtml(anchorEl);
        }
      });
      __publicField(this, "handleCancel", (event) => {
        const anchorEl = event.target.closest("a");
        if (anchorEl && hrefValid(anchorEl.href) && !attrBoolean.get(anchorEl, "xo-prefetched")) {
          if (this.timeId !== -1) {
            clearTimeout(this.timeId);
            this.timeId = -1;
          } else {
            this.cancelRequest(anchorEl.href);
          }
        }
      });
      __publicField(this, "handlePopState", async (event) => {
        const { use } = this.options;
        if (use === "CSR") {
          event.preventDefault();
          this.navigate(window.location.href);
        }
      });
      __publicField(this, "update", () => {
        this.destroy();
        this.init();
      });
      __publicField(this, "init", () => {
        if (!window.Shopify.designMode) {
          if (!document.body.classList.contains("xo-navigate-smooth")) {
            document.body.classList.add("xo-using-page-speed");
          }
          document.addEventListener("mouseover", this.handleMouseOver, { capture: true, passive: true });
          document.addEventListener("mouseout", this.handleCancel, { passive: true });
          document.addEventListener("touchstart", this.handleTouchStart, { capture: true, passive: true });
          window.addEventListener("click", this.handleWindowClick);
          window.addEventListener("popstate", this.handlePopState);
        }
      });
      __publicField(this, "destroy", () => {
        clearTimeout(this.timeId);
        document.removeEventListener("mouseover", this.handleMouseOver);
        document.removeEventListener("mouseout", this.handleCancel);
        document.removeEventListener("touchstart", this.handleTouchStart);
        window.removeEventListener("click", this.handleWindowClick);
        window.removeEventListener("popstate", this.handlePopState);
      });
      this.options = {
        ..._PageSpeed.defaultOptions,
        ...options
      };
      this.init();
    }
  };
  let PageSpeed = _PageSpeed;
  __publicField(PageSpeed, "defaultOptions", {
    root: document.querySelector("#xo-main-content") || document.body,
    use: "SSR"
  });
  const styles$x = "";
  function removeColorSchemeAddedAttr(el) {
    const attr = "xo-color-scheme-added";
    const els = Array.from(el.querySelectorAll(`[${attr}]`));
    each(els, (el2) => {
      el2.removeAttribute(attr);
    });
  }
  const CONSTANT = 14;
  const _Marquee = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "index", 0);
      __publicField(this, "frameId", 0);
      __publicField(this, "cancelDelay", () => {
      });
      __publicField(this, "_options");
      __publicField(this, "imageLoaded", false);
      __publicField(this, "parallax", null);
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "disconnect", () => {
      });
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoSpeed", "xoRtl", "xoPauseOnHover", "xoScrollEnabled", "xoScrollSpeed", "xoAutoRun"],
          types: {
            xoSpeed: "number",
            xoRtl: "boolean",
            xoPauseOnHover: "boolean",
            xoScrollEnabled: "boolean",
            xoAutoRun: "boolean",
            xoScrollSpeed: "number"
          }
        });
      });
      __publicField(this, "getChildWidth", () => {
        const childEls = Array.from(this.children);
        if (!childEls.length) {
          return 0;
        }
        if (childEls.length === 1) {
          return childEls[0].clientWidth;
        }
        return (childEls.length - 1) * childEls[0].clientWidth;
      });
      __publicField(this, "setDuration", async () => {
        const imgEls = Array.from(this.querySelectorAll("img"));
        const urls = imgEls.map((imgEl) => imgEl.src);
        await imagesLoaded(urls);
        const { xoSpeed, xoRtl, xoAutoRun } = this.options;
        if (xoAutoRun) {
          const firstMarqueeItemEl = this.children[0];
          const duration = clamp(firstMarqueeItemEl.offsetWidth * CONSTANT - (xoSpeed - 1) * firstMarqueeItemEl.offsetWidth, firstMarqueeItemEl.offsetWidth, Infinity);
          this.style.setProperty("--xo-marquee-from", xoRtl ? "0" : "0");
          this.style.setProperty("--xo-marquee-to", xoRtl ? "100%" : "-100%");
          this.style.setProperty("--xo-marquee-duration", `${duration}ms`);
        }
      });
      __publicField(this, "handleClone", () => {
        const { xoScrollEnabled, xoScrollSpeed } = this.options;
        this.frameId = requestAnimationFrame(() => {
          const childEls = Array.from(this.children);
          if (this.getChildWidth() === 0) {
            const cloneNode = childEls[this.index].cloneNode(true);
            removeColorSchemeAddedAttr(cloneNode);
            const cloneEl = this.appendChild(cloneNode);
            attrBoolean.set(cloneEl, "xo-cloned", true);
            this.setDuration();
            cancelAnimationFrame(this.frameId);
          } else if (this.getChildWidth() <= this.offsetWidth * (xoScrollEnabled ? 2 * Math.min(xoScrollSpeed, 3) : 1)) {
            const cloneNode = childEls[this.index].cloneNode(true);
            removeColorSchemeAddedAttr(cloneNode);
            const cloneEl = this.appendChild(cloneNode);
            attrBoolean.set(cloneEl, "xo-cloned", true);
            this.handleClone();
            if (this.index === childEls.length - 1) {
              this.index = 0;
            } else {
              this.index++;
            }
            if (childEls.length >= 200) {
              this.update();
            }
          } else {
            const cloneEl = this.appendChild(childEls[this.index].cloneNode(true));
            attrBoolean.set(cloneEl, "xo-cloned", true);
            this.setDuration();
            cancelAnimationFrame(this.frameId);
          }
        });
      });
      __publicField(this, "removeCloned", () => {
        const childEls = Array.from(this.querySelectorAll(`${WebComponent.MarqueeItem}[xo-cloned]`));
        each(childEls, (childEl2) => {
          childEl2.remove();
        });
        const childEl = this.querySelector(WebComponent.MarqueeItem);
        if (childEl) {
          const grandChildEls = Array.from(childEl.children);
          each(grandChildEls, (grandChildEl) => {
            this.appendChild(grandChildEl);
          });
          childEl.remove();
        }
      });
      __publicField(this, "handler", async () => {
        const { xoRtl } = this.options;
        const childEls = Array.from(this.children);
        attrBoolean.set(this, "xo-rtl", xoRtl);
        if (!this.imageLoaded) {
          await delay(500);
          const imgEls = Array.from(this.querySelectorAll("img"));
          const urls = imgEls.map((imgEl) => imgEl.src);
          await imagesLoaded(urls);
          this.imageLoaded = true;
        }
        if (childEls[0].tagName.toLowerCase() !== WebComponent.MarqueeItem) {
          const itemEl = document.createElement(WebComponent.MarqueeItem);
          each(childEls, (childEl) => {
            itemEl.appendChild(childEl);
          });
          this.appendChild(itemEl);
        }
        this.handleClone();
        requestAnimationFrame(() => {
          attrBoolean.set(this, "xo-ready", true);
        });
      });
      __publicField(this, "handleParallax", () => {
        var _a2;
        const { xoScrollEnabled, xoScrollSpeed, xoRtl } = this.options;
        if (!xoScrollEnabled) {
          return;
        }
        (_a2 = this.parallax) == null ? void 0 : _a2.destroy();
        this.parallax = parallaxScroll({
          lerpEase: 1,
          setStyles: ({ element, createValue, EMPTY: EMPTY2 }) => {
            const value = createValue("marqueeScroll");
            if (value !== EMPTY2) {
              element.style.setProperty("--xo-marquee-scroll", `${Number(value) * xoScrollSpeed}px`);
            }
          }
        });
        const marqueeScrollTransformEl = this.closest(WebComponent.MarqueeScrollTransform);
        const from = () => {
          if (marqueeScrollTransformEl) {
            return offset(marqueeScrollTransformEl).top - window.innerHeight;
          }
          return offset(this).top - window.innerHeight;
        };
        const to = () => {
          if (marqueeScrollTransformEl) {
            return offset(marqueeScrollTransformEl).top + this.getBoundingClientRect().height;
          }
          return offset(this).top + this.getBoundingClientRect().height;
        };
        this.parallax.add(this, {
          from,
          to,
          keyframes: {
            "0%": {
              marqueeScroll: 0
            },
            "100%": {
              marqueeScroll: window.innerHeight * (xoRtl ? 1 : -1)
            }
          }
        }).run();
      });
      __publicField(this, "destroy", () => {
        var _a2, _b2;
        (_a2 = this.parallax) == null ? void 0 : _a2.destroy();
        this.cancelDelay();
        cancelAnimationFrame(this.frameId);
        this.index = 0;
        (_b2 = this.intersectionObserver) == null ? void 0 : _b2.disconnect();
      });
      __publicField(this, "update", async () => {
        this.destroy();
        this.setOptions();
        this.removeCloned();
        await this.handler();
        this.handleParallax();
      });
      __publicField(this, "handlePause", () => {
        attrBoolean.set(this, "xo-paused", true);
      });
      __publicField(this, "handlePlay", () => {
        attrBoolean.set(this, "xo-paused", false);
      });
      __publicField(this, "sectionListenerForBuilder", () => {
        this.disconnect = sectionXoBuiderObserver(this, () => {
          this.update();
        });
      });
    }
    get options() {
      return {
        ..._Marquee.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    async connectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        await delay(100);
      }
      this.setOptions();
      this.removeCloned();
      await this.handler();
      this.handleParallax();
      this.sectionListenerForBuilder();
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.handlePlay();
          } else {
            this.handlePause();
          }
        });
      });
      this.intersectionObserver.observe(this);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue != null && oldValue !== newValue && this.imageLoaded) {
        this.cancelDelay();
        this.cancelDelay = await delay(200);
        this.update();
      }
    }
    disconnectedCallback() {
      this.destroy();
      this.disconnect();
    }
  };
  let Marquee = _Marquee;
  __publicField(Marquee, "defaultOptions", {
    xoSpeed: 6,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    xoPauseOnHover: false,
    xoAutoRun: true,
    xoScrollEnabled: false,
    xoScrollSpeed: 1
  });
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(metadataKey, metadataValue);
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  const DEBOUNCE_TIME = 400;
  let SvgMarquee = (_c = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        defaultText: "",
        duration: 0,
        ratio: 0,
        textPathData: []
      });
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "pathId", `svg-path-${Math.random().toString(36).substring(2, 15)}`);
      __publicField(this, "debounce", createDebounce());
      __publicField(this, "getRepetitions", () => {
        const svgEl = this.querySelector("svg");
        const textEl = this.querySelector("text");
        const textWidth = textEl.getBBox().width;
        const svgWidth = svgEl.getBBox().width;
        const repetitions = Math.ceil(svgWidth / textWidth) + 1;
        return repetitions;
      });
      __publicField(this, "getDuration", (textWidth) => {
        const { xoSpeed } = this.props;
        const duration = clamp(textWidth * 14 - (xoSpeed - 1) * textWidth, textWidth, Infinity);
        return duration;
      });
      __publicField(this, "setSvgSize", () => {
        const pathEl = this.querySelector("path");
        const svgEl = this.querySelector("svg");
        const sizerEl = this.querySelector(`text.${WebComponent.SvgMarquee}-sizer`);
        const pathBox = pathEl.getBBox();
        const sizerBox = sizerEl.getBBox();
        const containerWidth = this.getBoundingClientRect().width;
        const height = pathBox.height + sizerBox.height;
        const finalWidth = Math.min(pathBox.width, containerWidth);
        svgEl.setAttribute("viewBox", `0 0 ${finalWidth} ${height}`);
        sizerEl.remove();
      });
      __publicField(this, "setTextPathData", () => {
        const { xoRtl } = this.props;
        const { ratio } = this.state;
        const repetitions = this.getRepetitions();
        this.setState({
          textPathData: range(0, repetitions).map((_, index) => {
            let from = 0;
            let to = 0;
            if (xoRtl) {
              from = 100 - ratio * (index + 1);
              to = 100 - ratio * index;
            } else {
              from = ratio * index;
              to = ratio * (index - 1);
            }
            return {
              from,
              to
            };
          })
        });
      });
      __publicField(this, "setRatio", () => {
        const pathEl = this.querySelector("path");
        const textPathEl = this.querySelector("textPath");
        const parts = Math.round(textPathEl.getComputedTextLength() / pathEl.getBBox().width + 0.5);
        const ratioEl = this.querySelector(`text.${WebComponent.SvgMarquee}-ratio`);
        if (parts > 1) {
          ratioEl.innerHTML = range(0, parts).map((part) => {
            const start = Math.floor(this.state.defaultText.length / parts * part);
            const end = Math.floor(this.state.defaultText.length / parts * (part + 1));
            return `
            <textPath href="#${this.pathId}">
              ${this.state.defaultText.slice(start, end)}
            </textPath>
          `;
          }).join("");
        } else {
          ratioEl.innerHTML = `<textPath href="#${this.pathId}">${this.state.defaultText}</textPath>`;
        }
        const ratioTextPathEls = Array.from(ratioEl.querySelectorAll("textPath"));
        const textWidth = ratioTextPathEls.reduce((total, textPathEl2) => total + textPathEl2.getBBox().width, 0);
        const pathWidth = pathEl.getBBox().width;
        const ratio = textWidth / pathWidth * 100;
        this.setState({ ratio, duration: this.getDuration(textWidth) });
      });
      __publicField(this, "updateUI", () => {
        const { textPathData, duration } = this.state;
        const textPathEl = this.querySelector("textPath");
        each(textPathData, (item, index) => {
          var _a2;
          if (index > 0) {
            const textPathElCloned = textPathEl.cloneNode(true);
            (_a2 = this.querySelector("text")) == null ? void 0 : _a2.appendChild(textPathElCloned);
          }
          const animateEl = this.querySelectorAll("animate")[index];
          if (animateEl) {
            animateEl.setAttribute("from", `${item.from}%`);
            animateEl.setAttribute("to", `${item.to}%`);
            animateEl.setAttribute("dur", `${duration}ms`);
          }
        });
      });
      __publicField(this, "handleResize", this.debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            this.innerHTML = this.render(this.state.defaultText);
            this.setRatio();
            this.setSvgSize();
            this.setTextPathData();
            this.prevWidth = currentWidth;
          }
        }
      }, DEBOUNCE_TIME));
      __publicField(this, "handlePause", () => {
        const svgEl = this.querySelector("svg");
        svgEl.pauseAnimations();
      });
      __publicField(this, "handlePlay", () => {
        const svgEl = this.querySelector("svg");
        svgEl.unpauseAnimations();
      });
    }
    render(text) {
      const { xoPath } = this.props;
      return `
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" width="100%" style="vertical-align: top;">
        <path id="${this.pathId}" fill="none" d="${xoPath}"></path>
        <text dominant-baseline="hanging">
          <textPath href="#${this.pathId}">
            <animate attributeName="startOffset" from="0" to="0" dur="0" repeatCount="indefinite" calcMode="linear" />
            ${text}
          </textPath>
        </text>
        <text class="${WebComponent.SvgMarquee}-ratio" style="opacity: 0">A</text>
        <text class="${WebComponent.SvgMarquee}-sizer" style="opacity: 0">A</text>
      </svg>
    `;
    }
    mount() {
      const defaultText = this.innerText.trim();
      this.setState({ defaultText });
      this.innerHTML = this.render(defaultText);
      this.setRatio();
      this.setSvgSize();
      this.setTextPathData();
      if (!this.resizeObserver) {
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(this);
      }
      if (this.props.xoPauseOnHover) {
        this.addEventListener("mouseenter", this.handlePause);
        this.addEventListener("mouseleave", this.handlePlay);
      }
    }
    stateUpdate() {
      this.updateUI();
    }
    unmount() {
      var _a2;
      (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
      this.resizeObserver = null;
      this.prevWidth = 0;
      this.removeEventListener("mouseenter", this.handlePause);
      this.removeEventListener("mouseleave", this.handlePlay);
    }
  }, __publicField(_c, "propTypes", {
    xoPath: "string",
    xoSpeed: "number",
    xoRtl: "boolean",
    xoPauseOnHover: "boolean"
  }), __publicField(_c, "defaultProps", {
    xoPath: "M0 109.753C222.233 105.798 231.626 0 469.504 0C715.916 0 721.456 110 961.467 110C1201.12 110 1205.66 3.21348 1432.51 0C1659.37 3.21348 1661.59 110 1908 110",
    xoSpeed: 10,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    xoPauseOnHover: false
  }), _c);
  SvgMarquee = __decorate([
    customElements$1(WebComponent.SvgMarquee)
  ], SvgMarquee);
  componentDefine({
    [WebComponent.Marquee]: Marquee
  });
  const none = (el, { value }) => {
    el.style.visibility = value === 0 ? "hidden" : "visible";
  };
  const zoom = (useOpacity = false) => {
    const animate2 = (el, { value, isOpen, usePan = false, easing }) => {
      if (usePan) {
        el.style.visibility = "hidden";
        el.style.opacity = "0";
      } else {
        const inputRange = isOpen ? [0, 1] : [1, 0];
        const reverseEasing = !isOpen;
        const scale = interpolate({
          value,
          inputRange,
          easing,
          reverseEasing,
          outputRange: isOpen ? [0.5, 1] : [1, 0.5]
        });
        if (useOpacity) {
          const opacity = interpolate({
            value,
            inputRange,
            easing: easings.ease,
            reverseEasing,
            outputRange: isOpen ? [0, 1] : [1, 0]
          });
          el.style.opacity = `${opacity}`;
        }
        el.style.transform = `scale(${scale})`;
        el.style.visibility = value === 0 ? "hidden" : "visible";
      }
    };
    return animate2;
  };
  const move = ({ dx = 0, dy = 0, opacity = 0 } = {}) => {
    const animate2 = (el, { value, isOpen, usePan = false, easing }) => {
      if (usePan) {
        el.style.visibility = "hidden";
        el.style.opacity = "0";
      } else {
        const inputRange = isOpen ? [0, 1] : [1, 0];
        const reverseEasing = !isOpen;
        const _opacity = interpolate({
          value,
          inputRange,
          easing: easings.ease,
          reverseEasing,
          outputRange: isOpen ? [opacity, 1] : [1, opacity]
        });
        const getTranslate = (outputValue) => interpolate({
          value,
          inputRange,
          easing,
          reverseEasing,
          outputRange: isOpen ? [outputValue, 0] : [0, outputValue]
        });
        el.style.transform = `translate(${getTranslate(typeof dx === "function" ? dx(el) : dx)}px, ${getTranslate(typeof dy === "function" ? dy(el) : dy)}px)`;
        el.style.opacity = `${_opacity}`;
        el.style.visibility = value === 0 ? "hidden" : "visible";
      }
    };
    return animate2;
  };
  const animate$1 = {
    none,
    zoom,
    move
  };
  const xoStore = new XOStore({
    logger: false,
    loggerCollapsed: true,
    storagePrefix: ((_d = window.Shopify) == null ? void 0 : _d.shop) ? `@xo/${hash(window.Shopify.shop)}` : ""
  });
  window.xoStore = xoStore;
  class ToggleBaseMethods {
    constructor(stateName) {
      __publicField(this, "stateName");
      __publicField(this, "getTriggerElement", (name, triggerElement) => {
        return triggerElement != null ? triggerElement : document.querySelector(`${WebComponent.PopoverTrigger}[xo-name="${name}"]`);
      });
      __publicField(this, "toggle", (name, triggerElement) => {
        const finalTriggerElement = this.getTriggerElement(name, triggerElement);
        xoStore.set(this.stateName, (state) => {
          var _a2;
          return {
            ...state,
            trigger: {
              ...state.trigger,
              [this.stateName]: name
            },
            data: {
              ...state.data,
              [name]: {
                ...state.data[name],
                isOpen: !((_a2 = state.data[name]) == null ? void 0 : _a2.isOpen),
                ...finalTriggerElement != null ? {
                  triggerElement: finalTriggerElement
                } : {}
              }
            }
          };
        })(`${this.stateName}/toggle`);
      });
      __publicField(this, "open", (name, triggerElement) => {
        const finalTriggerElement = this.getTriggerElement(name, triggerElement);
        xoStore.set(this.stateName, (state) => {
          return {
            ...state,
            trigger: {
              ...state.trigger,
              [this.stateName]: name
            },
            data: {
              ...state.data,
              [name]: {
                ...state.data[name],
                isOpen: true,
                ...finalTriggerElement != null ? {
                  triggerElement: finalTriggerElement
                } : {}
              }
            }
          };
        })(`${this.stateName}/open`);
      });
      __publicField(this, "close", (name, triggerElement) => {
        const finalTriggerElement = triggerElement === "empty" ? triggerElement : this.getTriggerElement(name, triggerElement);
        xoStore.set(this.stateName, (state) => {
          return {
            ...state,
            trigger: {
              ...state.trigger,
              [this.stateName]: name
            },
            data: {
              ...state.data,
              [name]: {
                ...state.data[name],
                isOpen: false,
                ...finalTriggerElement != null ? {
                  triggerElement: finalTriggerElement === "empty" ? null : finalTriggerElement
                } : {}
              }
            }
          };
        })(`${this.stateName}/close`);
      });
      __publicField(this, "on", (eventType, name, callback) => {
        return xoStore.subscribe(this.stateName, ({ data }) => {
          if (data[name] != null) {
            if (eventType === "open" && data[name].isOpen) {
              callback();
            } else if (eventType === "close" && !data[name].isOpen) {
              callback();
            }
          }
        });
      });
      this.stateName = stateName;
    }
  }
  const A11Y_SELECTOR = `summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe`;
  const tabIndexs = /* @__PURE__ */ new Map();
  function toggleA11y(el, disabled) {
    const a11yEls = Array.from(el.querySelectorAll(A11Y_SELECTOR));
    each(a11yEls, (el2) => {
      if (!tabIndexs.has(el2)) {
        tabIndexs.set(el2, el2.getAttribute("tabindex") || "");
      }
      if (disabled) {
        el2.setAttribute("tabindex", "-1");
      } else if (tabIndexs.has(el2)) {
        el2.setAttribute("tabindex", tabIndexs.get(el2));
      }
    });
  }
  function bindingHelper(el, attr, value) {
    const binding = el.getAttribute(attr);
    const bindings = binding ? binding.split(",") : [];
    each(bindings, (item) => {
      if (!/\[|\]/g.test(item)) {
        return;
      }
      const selector = item.replace(/\[.*/g, "").trim();
      const attrBinding = item.replace(/.*\[|\]/g, "").trim();
      const els = selector ? Array.from(el.querySelectorAll(selector)) : [el];
      each(els, (el2) => {
        if (typeof value === "string") {
          el2.setAttribute(attrBinding, value);
        } else if (typeof value === "boolean") {
          attrBoolean.set(el2, attrBinding, value);
        } else if (typeof value === "number") {
          el2.setAttribute(attrBinding, value.toString());
        }
      });
    });
  }
  function escapeValue(value) {
    return value.replace(/("|')/g, "\\$1");
  }
  function getParent(element) {
    let parent = element.parentElement;
    while (parent) {
      const { position, transform } = window.getComputedStyle(parent);
      if (position !== "static" || transform !== "none") {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document.body;
  }
  function hasParentNone(element) {
    const { display, visibility } = window.getComputedStyle(element);
    if (display == "none" || visibility == "hidden") {
      return true;
    }
    let parent = element.parentElement;
    while (parent) {
      const { display: display2, visibility: visibility2 } = window.getComputedStyle(parent);
      if (display2 == "none" || visibility2 == "hidden") {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }
  const css$2 = createCssInJs();
  let focusA11yEl = null;
  let triggerA11yEl = null;
  class ToggleBase extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "unsubscribe", null);
      __publicField(this, "sectionEl", null);
      __publicField(this, "initialized", false);
      __publicField(this, "prevIsOpen", false);
      __publicField(this, "allA11yEls", []);
      __publicField(this, "a11yEls", []);
      __publicField(this, "a11yNestedEls", []);
      __publicField(this, "firstA11yEl", null);
      __publicField(this, "lastA11yEl", null);
      __publicField(this, "firstA11yIndex", null);
      __publicField(this, "lastA11yIndex", null);
      __publicField(this, "index", null);
      __publicField(this, "listener", async () => {
        const { isOpen } = this.state;
        if (this.initialized && isOpen !== this.prevIsOpen) {
          if (isOpen) {
            this.componentOpen();
            this.handleAutoFocus();
            attrBoolean.set(this, "xo-active", true);
            bindingHelper(this, "xo-active-binding", true);
            document.addEventListener("keydown", this.handleA11y);
            triggerA11yEl = focusA11yEl;
            loadImages(Array.from(this.querySelectorAll("img")));
          } else {
            attrBoolean.set(this, "xo-active", false);
            bindingHelper(this, "xo-active-binding", false);
            if (triggerA11yEl != null) {
              triggerA11yEl.focus();
              triggerA11yEl = null;
              focusA11yEl = null;
            }
            this.componentClose();
            document.removeEventListener("keydown", this.handleA11y);
          }
          this.prevIsOpen = isOpen;
        }
        if (this.initialized) {
          this.subscribe();
        }
      });
      __publicField(this, "setState", (state) => {
        return xoStore.set(this.stateName, (prevState) => {
          const _prevState = prevState;
          return {
            ...prevState,
            data: {
              ..._prevState.data,
              ...typeof state === "function" ? state(_prevState.data) : state
            }
          };
        });
      });
      __publicField(this, "setCssVariables", (breakpoint, options) => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        let value = "";
        const opts = options || this.options;
        for (const key in opts) {
          const val = opts[key];
          if (val != null && typeof val !== "object") {
            let newKey = namingConvention.camelToKebab(key);
            newKey = newKey.includes("xo-") ? newKey : `xo-${newKey}`;
            const important = breakpoint != null ? " !important" : "";
            value += `--${newKey}: ${val}${important};`;
          }
        }
        const { cssText } = css$2`
      ${this.componentName}[xo-name="${xoName}"] {
        ${value}
      }
    `;
        if (breakpoint == null) {
          appendStyle(cssText, document.head);
        } else {
          appendStyle(`@media (max-width: ${breakpoint}px) { ${cssText} }`, document.head);
        }
      });
      __publicField(this, "handleA11y", (event) => {
        var _a2;
        const { xoEscCloseDisabled } = this.options;
        const { isOpen } = this.state;
        this.allA11yEls = Array.from(document.querySelectorAll(A11Y_SELECTOR));
        this.a11yEls = Array.from(this.querySelectorAll(A11Y_SELECTOR));
        const modalEls = Array.from(this.querySelectorAll(WebComponent.Modal));
        const toggleEls = Array.from(this.querySelectorAll(WebComponent.Toggle));
        const popoverEls = Array.from(this.querySelectorAll(WebComponent.Popover));
        this.a11yNestedEls = [
          ...modalEls,
          ...toggleEls,
          ...popoverEls,
          ...Array.from(this.querySelectorAll(`${WebComponent.Modal}, ${WebComponent.Toggle}, ${WebComponent.Popover}`)).flatMap((el) => Array.from(el.querySelectorAll(A11Y_SELECTOR)))
        ];
        this.a11yEls = this.a11yEls.filter((el) => {
          var _a3;
          return !((_a3 = this.a11yNestedEls) == null ? void 0 : _a3.includes(el)) && !hasParentNone(el) && el.getAttribute("tabindex") !== "-1";
        });
        this.allA11yEls = this.allA11yEls.filter((el) => {
          var _a3;
          return !((_a3 = this.a11yNestedEls) == null ? void 0 : _a3.includes(el)) && !hasParentNone(el) && el.getAttribute("tabindex") !== "-1";
        });
        const isShift = event.shiftKey;
        const isTab = event.key === "Tab";
        const isEscape = event.key === "Escape" && isOpen && !xoEscCloseDisabled;
        if (isEscape) {
          const { xoName } = this.options;
          checkAttr(this.componentName, "xo-name", xoName);
          const toggleBaseMethods = new ToggleBaseMethods(this.stateName);
          toggleBaseMethods.close(xoName);
        }
        if (!this.a11yEls.length) {
          const { isOpen: isOpen2 } = this.state;
          if (isOpen2) {
            event.preventDefault();
          }
          return;
        }
        this.firstA11yEl = this.a11yEls[0];
        this.lastA11yEl = this.a11yEls[this.a11yEls.length - 1];
        this.firstA11yIndex = this.allA11yEls.indexOf(this.firstA11yEl);
        this.lastA11yIndex = this.allA11yEls.indexOf(this.lastA11yEl);
        if (isTab) {
          event.preventDefault();
          const el = event.target;
          const target = el.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : el;
          this.index = this.allA11yEls.indexOf(target);
          if (isShift) {
            this.index--;
            if (this.index < this.firstA11yIndex) {
              this.index = this.lastA11yIndex;
            }
          } else {
            this.index++;
            if (this.index > this.lastA11yIndex) {
              this.index = this.firstA11yIndex;
            }
          }
          (_a2 = this.allA11yEls[this.index]) == null ? void 0 : _a2.focus();
        }
      });
      __publicField(this, "handleAutoFocus", async () => {
        var _a2;
        if (((_a2 = this.parentElement) == null ? void 0 : _a2.tagName.toLowerCase()) === WebComponent.GalleryPortal) {
          return;
        }
        const { xoAutofocus = false } = this.options;
        const isModal = this.componentName === WebComponent.Modal || this.componentName === WebComponent.Popover;
        if (isModal) {
          const duration = Number(this.getAttribute("xo-duration")) || 300;
          await delay(duration);
        }
        this.focus();
        if (xoAutofocus) {
          const inputEl = this.querySelector('input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="tel"], input[type="url"], input[type="search"], textarea');
          inputEl == null ? void 0 : inputEl.focus();
        }
      });
      __publicField(this, "handleShopifySectionSelect", () => {
        const { xoName } = this.options;
        const toggleBaseMethods = new ToggleBaseMethods(this.stateName);
        toggleBaseMethods.open(xoName);
      });
      __publicField(this, "handleShopifySectionDeselect", () => {
        const { xoName } = this.options;
        const toggleBaseMethods = new ToggleBaseMethods(this.stateName);
        toggleBaseMethods.close(xoName);
      });
      __publicField(this, "handleDesignMode", () => {
        var _a2, _b2, _c2;
        if (((_a2 = window.Shopify) == null ? void 0 : _a2.designMode) && !!attrBoolean.get(this, "xo-section-select")) {
          (_b2 = this.sectionEl) == null ? void 0 : _b2.addEventListener("shopify:section:select", this.handleShopifySectionSelect);
          (_c2 = this.sectionEl) == null ? void 0 : _c2.addEventListener("shopify:section:deselect", this.handleShopifySectionDeselect);
        }
      });
      __publicField(this, "handleFocusIn", (event) => {
        focusA11yEl = event.target.closest(A11Y_SELECTOR);
      });
      __publicField(this, "componentOpen", () => {
      });
      __publicField(this, "componentClose", () => {
      });
      __publicField(this, "componentMount", () => {
      });
      __publicField(this, "componentUnmount", () => {
      });
      __publicField(this, "subscribe", () => {
      });
      __publicField(this, "componentBeforeMount", () => {
      });
      this.sectionEl = this.closest(".shopify-section");
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName", "xoAutofocus", "xoSectionSelect", "xoEscCloseDisabled"],
        types: {
          xoName: "string",
          xoAutofocus: "boolean",
          xoSectionSelect: "boolean",
          xoEscCloseDisabled: "boolean"
        }
      });
      return options;
    }
    get state() {
      var _a2;
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      const stateObj = xoStore.get(this.stateName);
      const state = (_a2 = stateObj == null ? void 0 : stateObj.data) == null ? void 0 : _a2[xoName];
      if (typeof state !== "object" && state.isOpen == null) {
        return {};
      }
      return state;
    }
    async connectedCallback() {
      var _a2;
      this.componentBeforeMount();
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      attrBoolean.set(this, "xo-content", true);
      if (this.getAttribute("tabindex") == null && ((_a2 = this.parentElement) == null ? void 0 : _a2.tagName.toLowerCase()) !== WebComponent.GalleryPortal) {
        this.tabIndex = 0;
      }
      document.addEventListener("focusin", this.handleFocusIn);
      xoStore.set(this.stateName, (prevState) => {
        const _prevState = prevState;
        return {
          ..._prevState,
          data: {
            ..._prevState.data,
            [xoName]: {
              ...{ isOpen: false },
              ..._prevState.data[xoName]
            }
          }
        };
      })(`${this.stateName}/mount`);
      this.unsubscribe = xoStore.subscribe(this.stateName, this.listener, (_, nextState) => {
        return xoName !== nextState.trigger[this.stateName];
      });
      await delay(0);
      this.componentMount();
      this.handleDesignMode();
      this.initialized = true;
    }
    disconnectedCallback() {
      var _a2, _b2, _c2;
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
      this.componentUnmount();
      document.removeEventListener("keydown", this.handleA11y);
      document.removeEventListener("focusin", this.handleFocusIn);
      (_b2 = this.sectionEl) == null ? void 0 : _b2.removeEventListener("shopify:section:select", this.handleShopifySectionSelect);
      (_c2 = this.sectionEl) == null ? void 0 : _c2.removeEventListener("shopify:section:deselect", this.handleShopifySectionDeselect);
    }
  }
  class ToggleTriggerBase extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", null);
      __publicField(this, "initialized", false);
      __publicField(this, "prevIsOpen", false);
      __publicField(this, "contentTarget", false);
      __publicField(this, "bindClick", () => {
        this.addEventListener("click", this.handleTrigger);
      });
      __publicField(this, "bindHover", () => {
        const { xoName } = this.options;
        const toggleEl = document.querySelector(`[xo-content][xo-name="${xoName}"]`);
        this.addEventListener("mouseenter", this.handleMouseEnter);
        this.addEventListener("mouseleave", this.handleMouseLeave);
        if (toggleEl) {
          toggleEl.addEventListener("mouseenter", this.handleMouseEnter);
          toggleEl.addEventListener("mouseleave", this.handleMouseLeave);
        }
      });
      __publicField(this, "handleMouseEnter", (event) => {
        if (!this.contains(event.target)) {
          this.contentTarget = !!event.target;
        }
        if (!this.state.isOpen) {
          this.handleToggle("open");
        }
      });
      __publicField(this, "handleMouseLeave", async () => {
        if (this.state.isOpen) {
          await delay(200);
          if (!this.contentTarget) {
            this.handleToggle("close");
          }
          this.contentTarget = false;
        }
      });
      __publicField(this, "handleTrigger", async () => {
        await delay();
        this.handleToggle(this.actionType);
      });
      __publicField(this, "handleToggle", (type) => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        const toggleBaseMethods = new ToggleBaseMethods(this.stateName);
        if (type !== "none") {
          toggleBaseMethods[type](xoName);
        }
        this.componentTrigger();
      });
      __publicField(this, "listener", () => {
        const { isOpen } = this.state;
        if (this.initialized && isOpen !== this.prevIsOpen) {
          if (isOpen) {
            attrBoolean.set(this, "xo-active", true);
            this.componentOpen();
          } else {
            attrBoolean.set(this, "xo-active", false);
            this.componentClose();
          }
          this.prevIsOpen = isOpen;
        }
      });
      __publicField(this, "setState", (state) => {
        return xoStore.set(this.stateName, (prevState) => {
          const _prevState = prevState;
          return {
            ...prevState,
            data: {
              ..._prevState.data,
              ...typeof state === "function" ? state(_prevState.data) : state
            }
          };
        });
      });
      __publicField(this, "componentOpen", () => {
      });
      __publicField(this, "componentClose", () => {
      });
      __publicField(this, "componentMount", () => {
      });
      __publicField(this, "componentUnmount", () => {
      });
      __publicField(this, "componentTrigger", () => {
      });
      __publicField(this, "componentBeforeMount", () => {
      });
    }
    async connectedCallback() {
      this.componentBeforeMount();
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      if (this.eventType === "click") {
        this.bindClick();
      } else if (this.eventType === "hover") {
        if (isMobile.any) {
          this.bindClick();
        } else {
          this.bindHover();
        }
      }
      this.unsubscribe = xoStore.subscribe(this.stateName, this.listener, (_, nextState) => {
        return xoName !== nextState.trigger[this.stateName];
      });
      await delay(0);
      this.componentMount();
      this.initialized = true;
    }
    disconnectedCallback() {
      var _a2;
      this.removeEventListener("click", this.handleTrigger);
      if (!isMobile.any) {
        this.removeEventListener("mouseenter", this.handleMouseEnter);
        this.removeEventListener("mouseleave", this.handleMouseLeave);
      }
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
      this.componentUnmount();
    }
    get actionType() {
      return "toggle";
    }
    get eventType() {
      return "click";
    }
    get state() {
      var _a2;
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      const stateObj = xoStore.get(this.stateName);
      const state = (_a2 = stateObj == null ? void 0 : stateObj.data) == null ? void 0 : _a2[xoName];
      if (typeof state !== "object" && (state == null ? void 0 : state.isOpen) == null) {
        return {};
      }
      return state;
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName"],
        types: {
          xoName: "string"
        }
      });
      const parentEl = this.closest("[xo-name]");
      if (parentEl) {
        const options2 = getAttrs(parentEl, {
          pick: ["xoName"],
          types: {
            xoName: "string"
          }
        });
        return {
          ...options2,
          ...options
        };
      }
      return options;
    }
  }
  window.xoAnimate = animate$1;
  const xoToggle$1 = new ToggleBaseMethods("xo-toggle");
  const _Toggle = class extends ToggleBase {
    constructor() {
      super(...arguments);
      __publicField(this, "_options");
      __publicField(this, "parentEl", null);
      __publicField(this, "setOptions", () => {
        var _a2;
        const options = getAttrs(this, {
          pick: ["xoName", "xoAutofocus", "xoOutsideClickEnabled", "xoSectionSelect", "xoPortal", "xoParentSelector", "xoBreakpoints"],
          types: {
            xoName: "string",
            xoAutofocus: "boolean",
            xoOutsideClickEnabled: "boolean",
            xoSectionSelect: "boolean",
            xoPortal: "boolean",
            xoParentSelector: "string",
            xoBreakpoints: "object"
          }
        });
        const breakpointOpts = getBreakpointsOptions((_a2 = options.xoBreakpoints) != null ? _a2 : {});
        this.options = {
          ...options,
          xoPortal: (breakpointOpts == null ? void 0 : breakpointOpts.portal) != null ? breakpointOpts.portal : options.xoPortal
        };
      });
      __publicField(this, "handleOutsideClick", (event) => {
        const { xoName, xoOutsideClickEnabled } = this.options;
        const { isOpen } = this.state;
        const target = event.target;
        const triggerElement = document.querySelector(`${WebComponent.ToggleTrigger}[xo-name="${xoName}"]`);
        if (isOpen && xoOutsideClickEnabled && !this.contains(target) && !(triggerElement == null ? void 0 : triggerElement.contains(target))) {
          if (xoName) {
            xoToggle$1.close(xoName);
          }
        }
      });
      __publicField(this, "handleTopSelector", async () => {
        const { xoPortal } = this.options;
        if (!xoPortal) {
          return;
        }
        if (this.parentEl) {
          const { width, height, top } = this.parentEl.getBoundingClientRect();
          const { left } = offset(this.parentEl);
          this.style.setProperty("--xo-top", `${top}px`);
          this.style.setProperty("--xo-left", `${left}px`);
          this.style.setProperty("--xo-width", `${width}px`);
          this.style.setProperty("--xo-height", `${height}px`);
          await delay(500);
          this.handleTopSelector();
        }
      });
      __publicField(this, "handleScroll", () => {
        this.handleTopSelector();
      });
      __publicField(this, "handleResize", debounce(resizeAxis("x", () => {
        this.setOptions();
        this.init();
      }), 500));
      __publicField(this, "componentBeforeMount", () => {
        this.setOptions();
      });
      __publicField(this, "componentOpen", async () => {
        await delay();
        const { xoParentSelector } = this.options;
        if (xoParentSelector) {
          this.parentEl = document.querySelector(xoParentSelector);
        }
        this.handleTopSelector();
      });
      __publicField(this, "init", () => {
        const { xoPortal, xoName, xoParentSelector } = this.options;
        if (xoParentSelector) {
          this.parentEl = document.querySelector(xoParentSelector);
        }
        if (xoPortal && xoName && xoParentSelector) {
          this.setAttribute("popover", "manual");
          this.style.setProperty("--xo-right", `${getScrollbarWidth()}px`);
          openPopover(this);
          this.handleTopSelector();
          window.addEventListener("scroll", this.handleScroll);
        }
        if (!xoPortal) {
          closePopover(this);
          this.removeAttribute("popover");
          this.style.removeProperty("--xo-top");
          this.style.removeProperty("--xo-left");
          this.style.removeProperty("--xo-right");
          this.style.removeProperty("--xo-width");
          this.style.removeProperty("--xo-height");
        }
        document.addEventListener("click", this.handleOutsideClick);
      });
      __publicField(this, "componentMount", () => {
        const { xoBreakpoints } = this.options;
        this.init();
        if (xoBreakpoints && objectKeys(xoBreakpoints).length > 0) {
          window.addEventListener("resize", this.handleResize);
        }
      });
      __publicField(this, "componentUnmount", () => {
        document.addEventListener("click", this.handleOutsideClick);
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.handleResize);
        closePopover(this);
      });
    }
    static get observedAttributes() {
      return ["xo-portal", "xo-breakpoints"];
    }
    get options() {
      return {
        ..._Toggle.defaultOptions,
        ...this._options
      };
    }
    get stateName() {
      return "xo-toggle";
    }
    get componentName() {
      return WebComponent.Toggle;
    }
    set options(value) {
      this._options = value;
    }
    async attributeChangedCallback(_, oldValue, newValue) {
      if (oldValue !== newValue) {
        await delay(100);
        this.setOptions();
        this.init();
      }
    }
  };
  let Toggle = _Toggle;
  __publicField(Toggle, "defaultOptions", {
    xoName: null,
    xoOutsideClickEnabled: false,
    xoPortal: false,
    xoParentSelector: ""
  });
  class ToggleTrigger extends ToggleTriggerBase {
    get stateName() {
      return "xo-toggle";
    }
    get componentName() {
      return WebComponent.ToggleTrigger;
    }
  }
  xoStore.create("xo-toggle", {
    initialState: {
      trigger: {},
      data: {}
    }
  });
  const styles$w = "";
  const xoToggle = new ToggleBaseMethods("xo-toggle");
  window.xoToggle = xoToggle;
  componentDefine({
    [WebComponent.Toggle]: Toggle,
    [WebComponent.ToggleTrigger]: ToggleTrigger
  });
  const smartZoom = (useOpacity = false) => {
    const smartZoom2 = (el, { value, isOpen, triggerEl, dy = 0, modalEl, easing }) => {
      if (!triggerEl) {
        return animate$1.zoom(useOpacity)(el, { value, isOpen, easing });
      }
      const imgEl = modalEl.querySelector("img[xo-cropped]");
      const triggerMeasure = triggerEl.getBoundingClientRect();
      const inputRange = isOpen ? [0, 1] : [1, 0];
      const reverseEasing = !isOpen;
      const scaleXMin = triggerMeasure.width / el.offsetWidth;
      const scaleYMin = triggerMeasure.height / el.offsetHeight;
      const xMin = triggerMeasure.left + triggerMeasure.width / 2 - modalEl.scrollWidth / 2;
      const height = el.offsetHeight > modalEl.offsetHeight ? el.offsetHeight : modalEl.offsetHeight;
      const yMin = triggerMeasure.top + triggerMeasure.height / 2 - height / 2 + modalEl.scrollTop;
      const scaleX = interpolate({
        value,
        inputRange,
        easing,
        reverseEasing,
        outputRange: isOpen ? [scaleXMin, 1] : [1, scaleXMin]
      });
      const scaleY = interpolate({
        value,
        inputRange,
        easing,
        reverseEasing,
        outputRange: isOpen ? [scaleYMin, 1] : [1, scaleYMin]
      });
      const x = interpolate({
        value,
        inputRange,
        easing,
        reverseEasing,
        outputRange: isOpen ? [xMin, 0] : [0, xMin]
      });
      const y = interpolate({
        value,
        inputRange,
        easing,
        reverseEasing,
        outputRange: isOpen ? [yMin, dy] : [dy, yMin]
      });
      if (useOpacity) {
        const opacity = interpolate({
          value,
          inputRange,
          easing: easings.ease,
          reverseEasing,
          outputRange: isOpen ? [0, 1] : [1, 0]
        });
        el.style.opacity = `${opacity}`;
      }
      el.style.transform = `translateX(${x}px) translateY(${y}px) scaleX(${scaleX}) scaleY(${scaleY})`;
      el.style.visibility = value === 0 ? "hidden" : "visible";
      if (imgEl) {
        if (scaleX > scaleY) {
          imgEl.style.transform = `scaleY(${scaleX / scaleY})`;
        } else {
          imgEl.style.transform = `scaleX(${scaleY / scaleX})`;
        }
      }
    };
    return smartZoom2;
  };
  const setAnimate$1 = {
    none: animate$1.none,
    zoom: animate$1.zoom(true),
    "smart-zoom": smartZoom(),
    "smart-fade-zoom": smartZoom(true),
    fade: animate$1.move(),
    "fade-up": animate$1.move({ dy: 100 }),
    "fade-down": animate$1.move({ dy: -100 }),
    "fade-left": animate$1.move({ dx: 100 }),
    "fade-right": animate$1.move({ dx: -100 }),
    "slide-up": animate$1.move({
      dy: (modalEl) => {
        const { offsetTop } = modalEl;
        return window.innerHeight - offsetTop;
      },
      opacity: 1
    }),
    "slide-down": animate$1.move({
      dy: (modalEl) => {
        const { offsetTop, offsetHeight } = modalEl;
        return -1 * (offsetHeight + offsetTop);
      },
      opacity: 1
    }),
    "slide-left": animate$1.move({
      dx: (modalEl) => {
        const isRtl = document.documentElement.dir === "rtl";
        if (isRtl) {
          return -1 * (modalEl.offsetWidth + modalEl.offsetLeft);
        }
        return window.innerWidth - modalEl.offsetLeft;
      },
      opacity: 1
    }),
    "slide-right": animate$1.move({
      dx: (modalEl) => {
        const isRtl = document.documentElement.dir === "rtl";
        if (isRtl) {
          return window.innerWidth - modalEl.offsetLeft;
        }
        return -1 * (modalEl.offsetWidth + modalEl.offsetLeft);
      },
      opacity: 1
    })
  };
  const css$1 = createCssInJs();
  const createShadowStyles = (xoBackdropColor, xoBackdropBlur) => css$1`
  ${WebComponent.ModalBackdrop} {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: ${xoBackdropColor ? xoBackdropColor : "var(--xo-backdrop-color, rgba(0, 0, 0, 0.5))"};
    backdrop-filter: blur(${xoBackdropBlur ? `${xoBackdropBlur}px` : "var(--xo-backdrop-blur, 0px)"});
    pointer-events: auto;
  }
  ${WebComponent.ModalInner} {
    position: relative;
    display: flex;
    min-height: 100%;
    overflow: hidden;
  }
  ${WebComponent.ModalInner}[xo-placement="center"] {
    align-items: center;
    justify-content: center;
  }
  ${WebComponent.ModalInner}[xo-placement="top-center"] {
    justify-content: center;
  }
  ${WebComponent.ModalInner}[xo-placement="top-right"] {
    justify-content: flex-end;
  }
  ${WebComponent.ModalInner}[xo-placement="bottom-left"] {
    align-items: flex-end;
  }
  ${WebComponent.ModalInner}[xo-placement="bottom-center"] {
    align-items: flex-end;
    justify-content: center;
  }
  ${WebComponent.ModalInner}[xo-placement="bottom-right"] {
    align-items: flex-end;
    justify-content: flex-end;
  }
  ${WebComponent.ModalContent} {
    position: relative;
    z-index: 9;
    display: block;
    visibility: hidden;
    width: fit-content;
    height: fit-content;
    pointer-events: none;
  }
`;
  const createContentStyles = () => css$1`
  ${WebComponent.ModalContent} * {
    pointer-events: auto;
  }
`;
  function scrollDisable() {
    const scrollbarWidth2 = getScrollbarWidth();
    document.body.style.setProperty("--scroll-bar-width", `${scrollbarWidth2}px`);
    document.body.classList.add("xo-modal-open");
  }
  function scrollEnable() {
    const { data } = xoStore.get("xo-modal");
    const isOpen = objectValues(data).some((item) => item.isOpen && item.options.xoScrollDisabled);
    if (!isOpen) {
      document.body.style.removeProperty("--scroll-bar-width");
      document.body.classList.remove("xo-modal-open");
    }
  }
  function getCursorTemplate() {
    const cursorTemplateEl = document.querySelector("template[xo-modal-backdrop-cursor]");
    if (cursorTemplateEl) {
      return cursorTemplateEl.innerHTML;
    }
    return "";
  }
  const _Modal = class extends ToggleBase {
    constructor() {
      super(...arguments);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "shadow", this.attachShadow({ mode: "open" }));
      __publicField(this, "dialog", document.createElement("div"));
      __publicField(this, "currentZIndex", window.getComputedStyle(this).zIndex);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        var _a2;
        const options = getAttrs(this, {
          pick: [
            "xoName",
            "xoDuration",
            "xoEasing",
            "xoAnimate",
            "xoBackdropColor",
            "xoBackdropBlur",
            "xoBackdropDisabled",
            "xoPortal",
            "xoPlacement",
            "xoDisabled",
            "xoBreakpoints",
            "xoAutofocus",
            "xoSectionSelect",
            "xoVideoAutoplay",
            "xoScrollDisabled",
            "xoEscCloseDisabled",
            "xoBackdropCloseDisabled"
          ],
          types: {
            xoName: "string",
            xoDuration: "number",
            xoEasing: "string",
            xoAnimate: "string",
            xoBackdropColor: "string",
            xoBackdropBlur: "number",
            xoBackdropDisabled: "boolean",
            xoPortal: "boolean",
            xoPlacement: "string",
            xoDisabled: "boolean",
            xoBreakpoints: "object",
            xoAutofocus: "boolean",
            xoSectionSelect: "boolean",
            xoVideoAutoplay: "boolean",
            xoScrollDisabled: "boolean",
            xoEscCloseDisabled: "boolean",
            xoBackdropCloseDisabled: "boolean"
          }
        });
        const breakpointOpts = getBreakpointsOptions((_a2 = options.xoBreakpoints) != null ? _a2 : {});
        this.options = JSON.parse(JSON.stringify({
          ...options,
          xoDisabled: (breakpointOpts == null ? void 0 : breakpointOpts.disabled) != null ? breakpointOpts.disabled : options.xoDisabled,
          xoDuration: (breakpointOpts == null ? void 0 : breakpointOpts.duration) != null ? breakpointOpts.duration : options.xoDuration,
          xoEasing: (breakpointOpts == null ? void 0 : breakpointOpts.easing) != null ? breakpointOpts.easing : options.xoEasing,
          xoAnimate: (breakpointOpts == null ? void 0 : breakpointOpts.animate) != null ? breakpointOpts.animate : options.xoAnimate,
          xoBackdropColor: (breakpointOpts == null ? void 0 : breakpointOpts.backdropColor) != null ? breakpointOpts.backdropColor : options.xoBackdropColor,
          xoBackdropBlur: (breakpointOpts == null ? void 0 : breakpointOpts.backdropBlur) != null ? breakpointOpts.backdropBlur : options.xoBackdropBlur,
          xoBackdropDisabled: (breakpointOpts == null ? void 0 : breakpointOpts.backdropDisabled) != null ? breakpointOpts.backdropDisabled : options.xoBackdropDisabled,
          xoPlacement: (breakpointOpts == null ? void 0 : breakpointOpts.placement) != null ? breakpointOpts.placement : options.xoPlacement
        }));
      });
      __publicField(this, "componentOpen", () => {
        const { xoDuration: duration, xoVideoAutoplay, xoScrollDisabled } = this.options;
        openPopover(this);
        if (xoScrollDisabled) {
          scrollDisable();
        }
        this.cancel();
        this.cancel = this.animated({ from: 0, to: 1, duration });
        if (xoVideoAutoplay) {
          const videoEl = this.querySelector("video");
          videoEl == null ? void 0 : videoEl.play();
        }
      });
      __publicField(this, "componentClose", () => {
        const { xoDuration: duration, xoVideoAutoplay } = this.options;
        scrollEnable();
        this.cancel();
        this.animated({
          from: 1,
          to: 0,
          duration,
          onEnd: () => {
            closePopover(this);
          }
        });
        if (xoVideoAutoplay) {
          const videoEl = this.querySelector("video");
          videoEl == null ? void 0 : videoEl.pause();
        }
      });
      __publicField(this, "setStyles", (value) => {
        const { xoAnimate, xoEasing, xoBackdropDisabled } = this.options;
        const { isOpen, triggerElement, dy, usePan = false } = this.state;
        const contentEl = this.shadow.querySelector(WebComponent.ModalContent);
        const { cssText } = createContentStyles();
        const styleEl = this.shadow.querySelector("style");
        if (value === 0) {
          this.style.removeProperty("visibility");
          this.style.removeProperty("opacity");
        } else {
          if (!xoBackdropDisabled) {
            this.style.visibility = "visible";
          }
          this.style.opacity = "1";
        }
        if (value === 1) {
          this.style.removeProperty("pointer-events");
          if (styleEl && !styleEl.innerText.includes(cssText)) {
            styleEl.innerText = styleEl.innerText + cssText;
          }
          this.style.zIndex = this.currentZIndex;
        } else {
          this.style.pointerEvents = "none";
          this.style.zIndex = "-1";
          if (styleEl) {
            styleEl.innerText = styleEl.innerText.replace(cssText, "");
          }
        }
        (async () => {
          await delay(200);
          if (value === 1) {
            attrBoolean.set(this, "xo-ready", true);
          } else {
            attrBoolean.set(this, "xo-ready", false);
          }
          await delay(100);
          if (value === 1) {
            attrBoolean.set(this, "xo-animate-active", true);
          } else {
            attrBoolean.set(this, "xo-animate-active", false);
          }
        })();
        if (setAnimate$1[xoAnimate]) {
          setAnimate$1[xoAnimate](contentEl, {
            value,
            isOpen,
            triggerEl: triggerElement,
            dy,
            modalEl: this,
            usePan,
            easing: easings[xoEasing]
          });
        }
      });
      __publicField(this, "render", () => {
        const { xoName, xoBackdropColor, xoBackdropBlur, xoBackdropDisabled, xoPlacement, xoDisabled } = this.options;
        const { cssText } = createShadowStyles(xoBackdropColor, xoBackdropBlur);
        const backdrop = xoBackdropDisabled ? "" : `<${WebComponent.ModalBackdrop} part="backdrop" xo-name="${xoName}"><slot name="${xoName}-backdrop"></slot></${WebComponent.ModalBackdrop}>`;
        if (xoDisabled) {
          return `
        <${WebComponent.ModalInner} part="inner" xo-placement="${xoPlacement}">
          <${WebComponent.ModalContent} part="content">
            <slot name="${xoName}-inner"></slot>
          </${WebComponent.ModalContent}>
          ${backdrop}
        </${WebComponent.ModalInner}>
      `;
        }
        return `
      <style>${cssText}</style>
      <${WebComponent.ModalInner} part="inner" xo-placement="${xoPlacement}">
        <${WebComponent.ModalContent} part="content">
          <slot name="${xoName}-inner"></slot>
        </${WebComponent.ModalContent}>
        ${backdrop}
      </${WebComponent.ModalInner}>
    `;
      });
      __publicField(this, "addSlotName", (xoName) => {
        const modalChildEls = Array.from(this.querySelectorAll(WebComponent.Modal));
        const childEls = Array.from(this.children);
        each(childEls, (el) => {
          if (!modalChildEls.includes(el)) {
            el.setAttribute("slot", `${xoName}-inner`);
          }
        });
      });
      __publicField(this, "setOptionsState", (xoName) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            [xoName]: {
              ...prevState[xoName],
              options: this.options
            }
          };
        });
      });
      __publicField(this, "checkSmartAnimateSupport", () => {
        const { xoAnimate, xoPlacement } = this.options;
        if (xoAnimate.includes("smart-") && xoPlacement !== "center") {
          throwError(`[${WebComponent.Modal}] xo-placement="${xoPlacement}" is not supported with xo-animate="${xoAnimate}"`);
        }
      });
      __publicField(this, "handleImageCropped", () => {
        const imgEl = this.querySelector("img[xo-cropped]");
        if (imgEl) {
          imgEl.style.width = "100%";
          imgEl.style.height = "100%";
          imgEl.style.objectFit = "contain";
          imgEl.style.maxWidth = "none";
        }
      });
      __publicField(this, "componentBeforeMount", () => {
        this.setOptions();
        this.style.pointerEvents = "none";
        this.style.zIndex = "-1";
      });
      __publicField(this, "handleResize", debounce(resizeAxis("x", () => {
        const { xoName } = this.options;
        this.setOptions();
        this.animated.off();
        xoModal.close(xoName);
        this.mounted();
      }), 500));
      __publicField(this, "setCurrentDisabled", () => {
        const { xoDisabled } = this.options;
        attrBoolean.set(this, "xo-current-disabled", xoDisabled);
      });
      __publicField(this, "handleDialogCancel", (event) => {
        event.preventDefault();
      });
      __publicField(this, "appendCursor", () => {
        const { xoName } = this.options;
        const cursorTemplate = getCursorTemplate();
        const cursorHtml = cursorTemplate ? `<div slot="${xoName}-backdrop" is="xo-cursor" xo-backdrop-cursor xo-absolute xo-lerp-ease="0.2"><xo-cursor-item>${cursorTemplate}</xo-cursor-item></div>` : "";
        this.insertAdjacentHTML("beforeend", cursorHtml);
      });
      __publicField(this, "mounted", () => {
        const { xoName, xoDisabled, xoBreakpoints, xoPortal } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        this.addSlotName(xoName);
        this.setCurrentDisabled();
        if (xoPortal && popoverSupported$1()) {
          this.setAttribute("popover", "manual");
        }
        this.shadow.innerHTML = this.render();
        this.setCssVariables();
        this.appendCursor();
        if (xoBreakpoints && objectKeys(xoBreakpoints).length > 0) {
          each(objectKeys(xoBreakpoints).sort(), (key) => {
            const val = xoBreakpoints[key];
            this.setCssVariables(Number(key), val);
          });
        }
        if (!xoDisabled) {
          this.setOptionsState(xoName);
          this.checkSmartAnimateSupport();
          this.animated.onUpdate(this.setStyles);
          this.handleImageCropped();
        }
      });
      __publicField(this, "componentMount", () => {
        const { xoBreakpoints } = this.options;
        this.mounted();
        if (xoBreakpoints && objectKeys(xoBreakpoints).length > 0) {
          window.addEventListener("resize", this.handleResize);
        }
      });
      __publicField(this, "componentUnmount", () => {
        this.animated.off();
        window.removeEventListener("resize", this.handleResize);
        this.dialog.removeEventListener("cancel", this.handleDialogCancel);
      });
      __publicField(this, "handleClose", () => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        this.setState((prevState) => {
          return {
            ...prevState,
            [xoName]: {
              ...prevState[xoName],
              triggerElement: prevState[xoName].triggerElement,
              usePan: false,
              isOpen: false
            }
          };
        });
      });
    }
    get stateName() {
      return "xo-modal";
    }
    get componentName() {
      return WebComponent.Modal;
    }
    get options() {
      var _a2, _b2, _c2, _d2;
      const { xoPlacement } = this._options;
      const drawerDefaultOptions = !xoPlacement || xoPlacement === "center" ? {} : {
        xoDuration: (_b2 = (_a2 = window.settings) == null ? void 0 : _a2.drawer_duration) != null ? _b2 : 300,
        xoEasing: (_d2 = (_c2 = window.settings) == null ? void 0 : _c2.drawer_easing) != null ? _d2 : "decay",
        xoAnimate: "smart-fade-zoom"
      };
      const result = {
        ..._Modal.defaultOptions,
        ...drawerDefaultOptions,
        ...this._options
      };
      return {
        ...result,
        xoDuration: result.xoAnimate === "none" ? 0 : result.xoDuration
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getShadow() {
      return this.shadow;
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue != null && oldValue !== newValue) {
        await delay(100);
        this.setOptions();
        this.componentUnmount();
        this.componentMount();
        this.handleClose();
        const triggerEls = Array.from(document.querySelectorAll(`${WebComponent.ModalTrigger}[xo-name="${this.options.xoName}"]`));
        each(triggerEls, (triggerEl) => {
          triggerEl.setAttribute("xo-observed", newValue);
        });
      }
    }
  };
  let Modal = _Modal;
  __publicField(Modal, "defaultOptions", {
    xoName: null,
    xoDuration: (_f = (_e = window.settings) == null ? void 0 : _e.modal_duration) != null ? _f : 300,
    xoEasing: (_h = (_g = window.settings) == null ? void 0 : _g.modal_easing) != null ? _h : "decay",
    xoAnimate: (_j = (_i = window.settings) == null ? void 0 : _i.modal_animate) != null ? _j : "smart-fade-zoom",
    xoBackdropDisabled: false,
    xoPortal: popoverSupported$1(),
    xoPlacement: "center",
    xoDisabled: false,
    xoBreakpoints: {},
    xoScrollDisabled: true,
    xoAutofocus: false,
    xoVideoAutoplay: false
  });
  const DELTA_FPS = 1e3 / 60;
  const _ModalTrigger = class extends ToggleTriggerBase {
    constructor() {
      super(...arguments);
      __publicField(this, "timeId", -1);
      __publicField(this, "timeId2", -1);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoName", "xoSync"],
          types: {
            xoName: "string",
            xoSync: "boolean"
          }
        });
      });
      __publicField(this, "setTriggerElement", () => {
        const { xoName } = this.options;
        const { isOpen } = this.state;
        checkAttr(this.componentName, "xo-name", xoName);
        this.setState((prevState) => {
          var _a2;
          return {
            ...prevState,
            [xoName]: {
              ...prevState[xoName],
              triggerElement: isOpen ? this : (_a2 = prevState[xoName]) == null ? void 0 : _a2.triggerElement,
              usePan: false
            }
          };
        });
      });
      __publicField(this, "componentTrigger", () => {
        const { isOpen } = this.state;
        const { xoSync } = this.options;
        this.setTriggerElement();
        if (xoSync && isOpen) {
          this.timeId2 = window.setTimeout(() => {
            this.style.visibility = "hidden";
          }, DELTA_FPS);
        }
      });
      __publicField(this, "componentBeforeMount", () => {
        this.setOptions();
      });
      __publicField(this, "componentMount", () => {
        this.setTriggerElement();
      });
      __publicField(this, "componentUnmount", () => {
        clearTimeout(this.timeId);
        clearTimeout(this.timeId2);
      });
      __publicField(this, "componentClose", () => {
        const { xoSync } = this.options;
        if (xoSync) {
          const { options } = this.state;
          const { xoDuration } = options;
          this.timeId = window.setTimeout(() => {
            this.style.visibility = "visible";
          }, xoDuration - DELTA_FPS);
        }
      });
    }
    get stateName() {
      return "xo-modal";
    }
    get componentName() {
      return WebComponent.ModalTrigger;
    }
    get options() {
      const parentEl = this.closest("[xo-name]");
      if (parentEl) {
        const options2 = getAttrs(parentEl, {
          pick: ["xoName"],
          types: {
            xoName: "string"
          }
        });
        return {
          ..._ModalTrigger.defaultOptions,
          ...options2,
          ...this._options
        };
      }
      return {
        ..._ModalTrigger.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue != null && oldValue !== newValue) {
        await delay(100);
        this.setOptions();
      }
    }
  };
  let ModalTrigger = _ModalTrigger;
  __publicField(ModalTrigger, "defaultOptions", {
    xoName: null,
    xoSync: false
  });
  class ModalBackdrop extends ToggleTriggerBase {
    constructor() {
      super(...arguments);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "componentOpen", () => {
        const { options } = this.state;
        const { xoDuration: duration } = options;
        this.cancel();
        this.cancel = this.animated({
          from: 0,
          to: 1,
          duration,
          easing: easings.decay
        });
      });
      __publicField(this, "componentClose", () => {
        const { options, opacity = 1, usePan = false } = this.state;
        const { xoDuration } = options;
        this.cancel();
        this.cancel = this.animated({
          from: opacity,
          to: 0,
          duration: usePan ? 0 : xoDuration,
          easing: easings.decay
        });
      });
      __publicField(this, "componentMount", () => {
        const { options } = this.state;
        const { xoAnimate } = options;
        this.style.visibility = "hidden";
        this.animated.onUpdate((value) => {
          if (xoAnimate !== "none") {
            this.style.opacity = `${value}`;
          }
          if (value === 0) {
            this.style.visibility = "hidden";
          } else {
            this.style.visibility = "visible";
          }
        });
      });
      __publicField(this, "componentUnmount", () => {
        this.animated.off();
      });
    }
    get stateName() {
      return "xo-modal";
    }
    get componentName() {
      return WebComponent.ModalBackdrop;
    }
    get actionType() {
      const { options } = this.state;
      const { xoBackdropCloseDisabled } = options;
      if (xoBackdropCloseDisabled) {
        return "none";
      }
      return "close";
    }
  }
  const Axis$2 = {
    Idle: "idle",
    Target: "target",
    Lock: "lock"
  };
  const _ModalPan = class extends ToggleTriggerBase {
    constructor() {
      super(...arguments);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "panAnimated", createAnimate());
      __publicField(this, "panCloseAnimated", createAnimate());
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "modalEl", null);
      __publicField(this, "backdropEl", null);
      __publicField(this, "contentEl", null);
      __publicField(this, "distance", 0);
      __publicField(this, "opacity", 1);
      __publicField(this, "timeId", -1);
      __publicField(this, "pan", null);
      __publicField(this, "axis", Axis$2.Idle);
      __publicField(this, "componentOpen", () => {
        const { options } = this.state;
        const { xoDuration: duration } = options;
        this.cancel();
        this.cancel = this.animated({
          from: 0,
          to: 1,
          duration
        });
      });
      __publicField(this, "componentClose", () => {
        const { options } = this.state;
        const { xoDuration: duration } = options;
        this.cancel();
        this.cancel = this.animated({
          from: 1,
          to: 0,
          duration
        });
      });
      __publicField(this, "componentUnmount", () => {
        clearTimeout(this.timeId);
        if (this.pan) {
          this.pan.destroy();
        }
        this.animated.off();
        this.panAnimated.off();
        this.panCloseAnimated.off();
      });
      __publicField(this, "resetModalMeasure", () => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        this.setState((prevState) => {
          return {
            ...prevState,
            [xoName]: {
              ...prevState[xoName],
              dy: 0,
              opacity: 1
            }
          };
        })(`${this.stateName}/resetModalContentMeasure`);
      });
      __publicField(this, "componentMount", () => {
        const { xoName, xoVertical, xoThreshold, xoIntentionalAxis } = this.options;
        const { options } = this.state;
        const { xoEasing, xoAnimate } = options;
        const methods = new ToggleBaseMethods(this.stateName);
        checkAttr(this.componentName, "xo-name", xoName);
        this.pan = panGesture({
          element: this,
          onMove: ({ dx, dy }) => {
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
            const zoomEl = this.querySelector(WebComponent.ImageZoomItem);
            if (Number((_a2 = zoomEl == null ? void 0 : zoomEl.getAttribute("xo-zoom")) != null ? _a2 : "1") > 1) {
              return;
            }
            this.modalEl = this.closest(WebComponent.Modal);
            this.backdropEl = (_d2 = (_c2 = (_b2 = this.modalEl) == null ? void 0 : _b2.shadowRoot) == null ? void 0 : _c2.querySelector) == null ? void 0 : _d2.call(_c2, WebComponent.ModalBackdrop);
            this.contentEl = (_g2 = (_f2 = (_e2 = this.modalEl) == null ? void 0 : _e2.shadowRoot) == null ? void 0 : _f2.querySelector) == null ? void 0 : _g2.call(_f2, WebComponent.ModalContent);
            if (this.axis === Axis$2.Idle) {
              if (Math.abs(xoVertical ? dx : dy) / xoThreshold >= Math.abs(xoVertical ? dy : dx)) {
                this.axis = Axis$2.Target;
              } else {
                this.axis = Axis$2.Lock;
              }
            }
            if (this.axis === Axis$2.Target || !xoIntentionalAxis) {
              this.style.touchAction = "none";
              const spaceY = (xoVertical ? window.innerWidth - this.offsetWidth : window.innerHeight - this.offsetHeight) / 2;
              const threadholdY = (xoVertical ? this.offsetWidth : this.offsetHeight) + spaceY;
              if (this.backdropEl) {
                this.opacity = interpolate({
                  value: xoVertical ? dx : dy,
                  inputRange: [-threadholdY, 0, threadholdY],
                  outputRange: [0, 1, 0]
                });
                this.backdropEl.style.opacity = `${this.opacity}`;
              }
              if (this.contentEl) {
                if (xoAnimate.includes("smart-")) {
                  if (xoVertical) {
                    this.contentEl.style.transform = `translateX(${dx}px)`;
                  } else {
                    this.contentEl.style.transform = `translateY(${dy}px)`;
                  }
                } else if (xoVertical) {
                  this.contentEl.style.transform = `translateX(${dx}px)`;
                } else {
                  this.contentEl.style.transform = `translateY(${dy}px)`;
                }
              }
            } else if (this.pan) {
              this.pan.setValue({ dx: 0, dy: 0 });
            }
          },
          onEnd: ({ dx, dy, vx, vy }) => {
            var _a2;
            const zoomEl = this.querySelector(WebComponent.ImageZoomItem);
            if (Number((_a2 = zoomEl == null ? void 0 : zoomEl.getAttribute("xo-zoom")) != null ? _a2 : "1") > 1) {
              return;
            }
            const { options: options2 } = this.state;
            const { xoDuration, xoAnimate: xoAnimate2 } = options2;
            if (this.axis === Axis$2.Target || !xoIntentionalAxis) {
              this.style.pointerEvents = "none";
              this.distance = xoVertical ? dx : dy;
              if (this.contentEl) {
                let threadholdY = (xoVertical ? window.innerWidth : window.innerHeight) / 3;
                if (xoIntentionalAxis) {
                  threadholdY = (xoVertical ? this.contentEl.offsetWidth : this.contentEl.offsetHeight) / 2;
                }
                const hide = Math.abs(this.distance) > threadholdY || (xoVertical ? Math.abs(vx) : Math.abs(vy)) > 8;
                this.setState((prevState) => {
                  return {
                    ...prevState,
                    [xoName]: {
                      ...prevState[xoName],
                      dy,
                      opacity: this.opacity
                    }
                  };
                })(`${this.stateName}/setModalContentMeasure`);
                if (hide) {
                  if (xoAnimate2.includes("smart-")) {
                    methods.close(xoName);
                  } else {
                    this.panCloseAnimated({
                      from: 0,
                      to: 1,
                      duration: 300
                    });
                  }
                } else {
                  this.panAnimated({
                    from: 0,
                    to: 1,
                    duration: 300
                  });
                }
                if (this.pan) {
                  this.pan.setValue({ dx: 0, dy: 0 });
                }
                this.timeId = window.setTimeout(() => {
                  this.resetModalMeasure();
                  clearTimeout(this.timeId);
                  this.style.removeProperty("pointer-events");
                }, xoDuration);
              }
            }
            this.style.removeProperty("touch-action");
            this.axis = Axis$2.Idle;
          }
        });
        this.panAnimated.onUpdate((value) => {
          if (this.backdropEl) {
            const opacity = interpolate({
              value,
              inputRange: [0, 1],
              outputRange: [this.opacity, 1]
            });
            this.backdropEl.style.opacity = `${opacity}`;
          }
          if (this.contentEl) {
            const y = interpolate({
              value,
              inputRange: [0, 1],
              outputRange: [this.distance, 0],
              easing: easings[xoEasing]
            });
            if (xoVertical) {
              this.contentEl.style.transform = `translateX(${y}px) translateY(0px) scale(1)`;
            } else {
              this.contentEl.style.transform = `translateX(0px) translateY(${y}px) scale(1)`;
            }
          }
        });
        this.panCloseAnimated.onUpdate((value) => {
          if (this.backdropEl) {
            const opacity = interpolate({
              value,
              inputRange: [0, 1],
              outputRange: [this.opacity, 0]
            });
            this.backdropEl.style.opacity = `${opacity}`;
          }
          if (this.contentEl) {
            const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = this.contentEl;
            let range2 = -1 * (xoVertical ? offsetWidth + offsetLeft : offsetHeight + offsetTop);
            if (this.distance >= 0) {
              range2 = xoVertical ? window.innerWidth - offsetLeft : window.innerHeight - offsetTop;
            }
            const translate = interpolate({
              value,
              inputRange: [0, 1],
              outputRange: [this.distance, range2],
              easing: easings[xoEasing]
            });
            if (xoVertical) {
              this.contentEl.style.transform = `translateX(${translate}px) translateY(0px) scale(1)`;
            } else {
              this.contentEl.style.transform = `translateX(0px) translateY(${translate}px) scale(1)`;
            }
          }
        });
        this.panCloseAnimated.onEnd(() => {
          this.setState((prevState) => {
            return {
              ...prevState,
              [xoName]: {
                ...prevState[xoName],
                usePan: true
              }
            };
          });
          methods.close(xoName);
        });
      });
    }
    get stateName() {
      return "xo-modal";
    }
    get componentName() {
      return WebComponent.ModalPan;
    }
    get actionType() {
      return "none";
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName", "xoVertical", "xoThreshold", "xoIntentionalAxis"],
        types: {
          xoName: "string",
          xoVertical: "boolean",
          xoThreshold: "number",
          xoIntentionalAxis: "boolean"
        }
      });
      const parentEl = this.closest("[xo-name]");
      if (parentEl) {
        const options2 = getAttrs(parentEl, {
          pick: ["xoName"],
          types: {
            xoName: "string"
          }
        });
        return {
          ..._ModalPan.defaultOptions,
          ...options2,
          ...options
        };
      }
      return {
        ..._ModalPan.defaultOptions,
        ...options
      };
    }
  };
  let ModalPan = _ModalPan;
  __publicField(ModalPan, "defaultOptions", {
    xoName: null,
    xoVertical: false,
    xoThreshold: 1.5,
    xoIntentionalAxis: false
  });
  xoStore.create("xo-modal", {
    initialState: {
      trigger: {},
      data: {}
    }
  });
  const styles$v = "";
  const xoModal = new ToggleBaseMethods("xo-modal");
  window.xoModal = xoModal;
  componentDefine({
    [WebComponent.Modal]: Modal,
    [WebComponent.ModalTrigger]: ModalTrigger,
    [WebComponent.ModalBackdrop]: ModalBackdrop,
    [WebComponent.ModalPan]: ModalPan
  });
  class ScrollX extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "shadow", this.attachShadow({ mode: "open" }));
      __publicField(this, "instance", parallaxScroll({
        setStyles({ element, createValue }) {
          const width = createValue("width");
          element.style.width = `${width}`;
        }
      }));
      __publicField(this, "elementStyle", (screen) => {
        this.style.height = `${screen * 110}vh`;
        this.shadow.innerHTML = `
      <${WebComponent.ScrollXInner} part="inner"><slot></slot></${WebComponent.ScrollXInner}>
    `;
      });
      __publicField(this, "handleChild", (child, index) => {
        if ((child.tagName.toLowerCase() === WebComponent.ScrollXItem || child.tagName.toLowerCase() === WebComponent.ScrollXYItem) && index > 0) {
          attrBoolean.set(child, WebComponent.ScrollXItem, true);
          this.instance.add(child, {
            from: () => {
              const offsetTop = offset(this).top;
              return offsetTop - window.innerHeight * 2 + window.innerHeight * (index + 1);
            },
            to: () => {
              const offsetTop = offset(this).top;
              return offsetTop - window.innerHeight + window.innerHeight * (index + 1);
            },
            keyframes: {
              "20%": { width: "0%" },
              "100%": { width: "100%" }
            }
          });
        }
      });
    }
    connectedCallback() {
      const childEls = Array.from(this.children);
      this.elementStyle(childEls.length);
      each(childEls, this.handleChild);
      this.instance.run();
    }
  }
  const styles$u = "";
  componentDefine({
    [WebComponent.ScrollX]: ScrollX
  });
  class ScrollY extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "shadow", this.attachShadow({ mode: "open" }));
      __publicField(this, "instance", parallaxScroll({
        setStyles({ element, createValue }) {
          const y = createValue("yy");
          element.style.top = `${y}`;
        }
      }));
      __publicField(this, "elementStyle", (screen) => {
        this.style.height = `${screen * 110}vh`;
        this.shadow.innerHTML = `
      <${WebComponent.ScrollYInner} part="inner"><slot></slot></${WebComponent.ScrollYInner}>
    `;
      });
      __publicField(this, "handleChild", (child, index) => {
        if ((child.tagName.toLowerCase() === WebComponent.ScrollYItem || child.tagName.toLowerCase() === WebComponent.ScrollXYItem) && index > 0) {
          attrBoolean.set(child, WebComponent.ScrollYItem, true);
          this.instance.add(child, {
            from: () => {
              const offsetTop = offset(this).top;
              return offsetTop - window.innerHeight * 2 + window.innerHeight * (index + 1);
            },
            to: () => {
              const offsetTop = offset(this).top;
              return offsetTop - window.innerHeight + window.innerHeight * (index + 1);
            },
            keyframes: {
              "20%": { yy: "100%" },
              "100%": { yy: "0%" }
            }
          });
        }
      });
    }
    connectedCallback() {
      const childEls = Array.from(this.children);
      this.elementStyle(childEls.length);
      each(childEls, this.handleChild);
      this.instance.run();
    }
  }
  const styles$t = "";
  componentDefine({
    [WebComponent.ScrollY]: ScrollY
  });
  const xoCircleBar = {
    set(xoName, value) {
      xoStore.set("xo-circle-bar", (prevState) => {
        return {
          ...prevState,
          [xoName]: value
        };
      });
    },
    animate(xoName, { value, duration = 1e3, easing }) {
      const animated = createAnimate();
      animated({
        from: 0,
        to: value,
        duration,
        easing: easing ? easings[easing] : void 0,
        onUpdate(value2) {
          xoStore.set("xo-circle-bar", (prevState) => {
            return {
              ...prevState,
              [xoName]: value2
            };
          });
        }
      });
      return animated.off;
    }
  };
  const offs = {};
  const observer$1 = new IntersectionObserver((entries) => {
    const frameId = requestAnimationFrame(() => {
      entries.forEach(async (entry) => {
        const element = entry.target;
        const { xoDuration, xoName, xoEasing, xoValue } = element.getOptions();
        if (entry.isIntersecting && xoName && xoValue) {
          const prevOff = offs[xoName];
          prevOff == null ? void 0 : prevOff();
          const off = xoCircleBar.animate(xoName, { value: xoValue, duration: xoDuration, easing: xoEasing });
          offs[xoName] = off;
          cancelAnimationFrame(frameId);
          observer$1.unobserve(element);
        }
      });
    });
  }, {
    rootMargin: "0px 0px -50px 0px"
  });
  const _CircleBar = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", null);
      __publicField(this, "getOptions", () => {
        const options = getAttrs(this, {
          pick: ["xoName", "xoFill", "xoStrokeWidth", "xoSize", "xoTrackColor", "xoThumbColor", "xoStrokeLinecap", "xoAnimateOnScroll", "xoEasing", "xoValue", "xoDuration"],
          types: {
            xoName: "string",
            xoFill: "string",
            xoStrokeWidth: "number",
            xoSize: "number",
            xoTrackColor: "string",
            xoThumbColor: "string",
            xoStrokeLinecap: "string",
            xoAnimateOnScroll: "boolean",
            xoEasing: "string",
            xoValue: "number",
            xoDuration: "number"
          }
        });
        return {
          ..._CircleBar.defaultOptions,
          ...options
        };
      });
      __publicField(this, "listener", () => {
        var _a2;
        const { xoName, xoSize, xoStrokeWidth } = this.getOptions();
        const carouselEl = this.closest(WebComponent.Carousel);
        if (!carouselEl) {
          checkAttr(WebComponent.CircleBar, "xo-name", xoName);
        }
        const thumbEl = this.querySelector(".circle-bar-thumb");
        const value = (_a2 = xoStore.get("xo-circle-bar")) == null ? void 0 : _a2[xoName];
        if (value != null) {
          const offset2 = interpolate({
            value,
            inputRange: [0, 100],
            outputRange: [xoSize * Math.PI, xoStrokeWidth * Math.PI]
          });
          thumbEl.style.strokeDashoffset = `${offset2}`;
        }
      });
      __publicField(this, "render", () => {
        const { xoSize, xoStrokeWidth, xoTrackColor, xoThumbColor, xoStrokeLinecap, xoFill } = this.getOptions();
        return `
      <svg width="${xoSize}" height="${xoSize}" viewport="0 0 ${xoSize} ${xoSize}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle">
        <circle
          fill="${xoFill}"
          stroke-width="${xoStrokeWidth}"
          r="${(xoSize - xoStrokeWidth) / 2}"
          cx="${xoSize / 2}"
          cy="${xoSize / 2}"
          stroke="${xoTrackColor}"
        >
        </circle>
        <circle
          class="circle-bar-thumb"
          stroke-width="${xoStrokeWidth}"
          r="${(xoSize - xoStrokeWidth) / 2}"
          cx="${xoSize / 2}"
          cy="${xoSize / 2}"
          stroke="${xoThumbColor}"
          stroke-linecap="${xoStrokeLinecap}"
          stroke-dashoffset="${xoSize * Math.PI}"
          stroke-dasharray="${xoSize * Math.PI}"
          fill="transparent"
          transform="rotate(-90)"
          transform-origin="50% 50%"
        >
        </circle>
      </svg>
    `;
      });
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    connectedCallback() {
      const options = this.getOptions();
      this.innerHTML = this.render();
      this.style.display = "block";
      if (options.xoAnimateOnScroll) {
        observer$1.observe(this);
      }
      this.unsubscribe = xoStore.subscribe("xo-circle-bar", this.listener);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        await delay(100);
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
      observer$1.unobserve(this);
    }
  };
  let CircleBar = _CircleBar;
  __publicField(CircleBar, "defaultOptions", {
    xoName: null,
    xoFill: "transparent",
    xoSize: 100,
    xoStrokeWidth: 2,
    xoTrackColor: "#ebebeb",
    xoThumbColor: "#ea5b5b",
    xoStrokeLinecap: "round",
    xoAnimateOnScroll: false,
    xoEasing: "ease",
    xoValue: 0,
    xoDuration: 1e3
  });
  xoStore.create("xo-circle-bar", {
    initialState: {}
  });
  window.xoCircleBar = xoCircleBar;
  componentDefine({
    [WebComponent.CircleBar]: CircleBar
  });
  const toastEvents = new Emitter();
  const _ToastAction = class {
    constructor() {
      __publicField(this, "placements", ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"]);
      __publicField(this, "frames", {});
      __publicField(this, "elements", {});
      __publicField(this, "getOptions", (options) => {
        if (typeof options === "string") {
          return {
            ..._ToastAction.defaultOptions,
            content: options
          };
        }
        return {
          ..._ToastAction.defaultOptions,
          ...options
        };
      });
      __publicField(this, "handleFrame", (placement) => {
        var _a2;
        const el = this.elements[placement];
        if ((el == null ? void 0 : el.innerHTML.trim()) === "") {
          el.removeAttribute("popover");
          closePopover(el);
          (_a2 = this.frames[placement]) == null ? void 0 : _a2.remove(this.handleFrames[placement]);
          el.remove();
        }
      });
      __publicField(this, "handleFrames", {
        "top-left": () => {
          this.handleFrame("top-left");
        },
        "top-center": () => {
          this.handleFrame("top-center");
        },
        "top-right": () => {
          this.handleFrame("top-right");
        },
        "bottom-left": () => {
          this.handleFrame("bottom-left");
        },
        "bottom-center": () => {
          this.handleFrame("bottom-center");
        },
        "bottom-right": () => {
          this.handleFrame("bottom-right");
        }
      });
      __publicField(this, "createToastRoot", (placement) => {
        this.elements[placement] = document.querySelector(`${WebComponent.ToastPortal}[xo-placement="${placement}"]`);
        if (!this.elements[placement]) {
          this.elements[placement] = document.createElement(WebComponent.ToastPortal);
          this.elements[placement].setAttribute("xo-placement", placement);
          this.elements[placement].setAttribute("popover", "manual");
          document.body.appendChild(this.elements[placement]);
          openPopover(this.elements[placement]);
          this.frames[placement] = frameManager$1.add(this.handleFrames[placement], true);
        }
      });
      __publicField(this, "push", (options) => {
        const opts = this.getOptions(options);
        for (const placement of this.placements) {
          this.createToastRoot(placement);
        }
        toastEvents.emit("toast:push", opts);
      });
      __publicField(this, "remove", (name) => {
        toastEvents.emit("toast:remove", name);
      });
    }
  };
  let ToastAction = _ToastAction;
  __publicField(ToastAction, "defaultOptions", {
    name: "",
    content: "",
    duration: 200,
    delay: 2e3,
    className: "",
    style: {},
    placement: "bottom-center",
    easing: "decay",
    closeButtonDisabled: false,
    closeButtonClassName: "",
    closeButtonPlacement: "top-right",
    onShow() {
    },
    onHide() {
    }
  });
  const toastAction = new ToastAction();
  function xoToastPrivate(options) {
    return toastAction.push(options);
  }
  const xoToast = Object.assign(xoToastPrivate, {
    push: toastAction.push,
    remove: toastAction.remove
  });
  class ToastPortal extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "offId", -1);
      __publicField(this, "renderCloseButton", (message) => {
        return `
      <${WebComponent.ToastCloseButton} class="${message.closeButtonClassName}" xo-placement="${message.closeButtonPlacement}"><svg viewBox="0 0 20 20" focusable="false" aria-hidden="true"><path d="M6.707 5.293a1 1 0 0 0-1.414 1.414l3.293 3.293-3.293 3.293a1 1 0 1 0 1.414 1.414l3.293-3.293 3.293 3.293a1 1 0 0 0 1.414-1.414l-3.293-3.293 3.293-3.293a1 1 0 0 0-1.414-1.414l-3.293 3.293-3.293-3.293Z"></path></svg></${WebComponent.ToastCloseButton}>
    `;
      });
      __publicField(this, "listener", (message) => {
        if (message.name) {
          const messageEl = document.querySelector(`${WebComponent.Toast}[xo-name="${message.name}"]`);
          if (messageEl && messageEl.parentNode !== this) {
            const messageAttr = getAttrs(messageEl, {
              pick: ["xoDuration", "xoClassName", "xoDelay", "xoEasing", "xoPlacement", "xoCloseButtonClassName", "xoCloseButtonDisabled", "xoCloseButtonPlacement"],
              types: {
                xoDuration: "number",
                xoClassName: "string",
                xoDelay: "number",
                xoEasing: "string",
                xoPlacement: "string",
                xoCloseButtonClassName: "string",
                xoCloseButtonDisabled: "boolean",
                xoCloseButtonPlacement: "string"
              },
              propTransformer: (prop) => namingConvention.pascalToCamel(prop.replace(/^xo/, ""))
            });
            const messageMerge = { ...message, ...messageAttr };
            const messageEls = Array.from(this.querySelectorAll(`${WebComponent.Toast}[xo-name="${message.name}"]`));
            const hasMessage = messageEls.some((el) => {
              var _a2;
              return ((_a2 = el.message) == null ? void 0 : _a2.name) === messageMerge.name;
            });
            if (messageMerge.placement === this.getAttribute("xo-placement") && !hasMessage) {
              if (!messageMerge.closeButtonDisabled && !messageEl.querySelector(WebComponent.ToastCloseButton)) {
                messageEl.insertAdjacentHTML("beforeend", this.renderCloseButton(messageMerge));
              }
              const messageElClone = messageEl == null ? void 0 : messageEl.cloneNode(true);
              messageEl.message = messageMerge;
              messageElClone.message = messageMerge;
              attrBoolean.set(messageElClone, "xo-cloned", true);
              if (messageMerge.placement.includes("top-")) {
                this.insertAdjacentElement("beforeend", messageElClone);
              } else {
                this.insertAdjacentElement("afterbegin", messageElClone);
              }
            }
          }
        } else if (message.placement === this.getAttribute("xo-placement")) {
          const messageEl = document.createElement(WebComponent.Toast);
          if (!message.closeButtonDisabled) {
            messageEl.innerHTML = message.content + this.renderCloseButton(message);
          } else {
            messageEl.innerHTML = message.content;
          }
          messageEl.message = message;
          if (message.placement.includes("top-")) {
            this.insertAdjacentElement("beforeend", messageEl);
          } else {
            this.insertAdjacentElement("afterbegin", messageEl);
          }
        }
      });
    }
    connectedCallback() {
      this.offId = toastEvents.on("toast:push", this.listener);
    }
    disconnectedCallback() {
      toastEvents.off(this.offId);
    }
  }
  const OFFSET = 20;
  class Toast extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "timeId", -1);
      __publicField(this, "animatedIn", createAnimate());
      __publicField(this, "animatedOut", createAnimate());
      __publicField(this, "message", null);
      __publicField(this, "prevTimestamp", null);
      __publicField(this, "delayFromMouseEnter", 0);
      __publicField(this, "closeEl", null);
      __publicField(this, "unmounted", false);
      __publicField(this, "offId", -1);
      __publicField(this, "initialized", false);
      __publicField(this, "cleanup", () => {
        const name = this.getAttribute("xo-name");
        const els = Array.from(document.querySelectorAll(`${WebComponent.Toast}[xo-name="${name}"]`));
        each(els, (el) => {
          el.remove();
        });
      });
      __publicField(this, "destroy", () => {
        clearTimeout(this.timeId);
        this.animatedIn.off();
        this.animatedOut.off();
        this.removeEventListener("mouseenter", this.handleMouseEnter);
        this.removeEventListener("mouseleave", this.handleMouseLeave);
        if (this.closeEl) {
          this.closeEl.removeEventListener("click", this.handleCloseClick);
        }
        toastEvents.off(this.offId);
      });
      __publicField(this, "getHeight", () => {
        var _a2, _b2;
        const { placement } = this.message;
        const { marginTop, marginBottom } = window.getComputedStyle(this);
        const marginTopNumber = (_a2 = parseInt(marginTop)) != null ? _a2 : 0;
        const marginBottomNumber = (_b2 = parseInt(marginBottom)) != null ? _b2 : 0;
        if (placement.includes("top-")) {
          return this.offsetHeight + marginBottomNumber;
        }
        return this.offsetHeight + marginTopNumber;
      });
      __publicField(this, "getValueY", (value) => {
        const { placement } = this.message;
        const f = placement.includes("top-") ? -1 : 1;
        return f * (value + OFFSET);
      });
      __publicField(this, "handleMouseEnter", () => {
        this.delayFromMouseEnter = Math.max(0, this.delayFromMouseEnter - (Date.now() - this.prevTimestamp));
        clearTimeout(this.timeId);
      });
      __publicField(this, "handleMouseLeave", () => {
        if (this.delayFromMouseEnter !== Infinity) {
          this.timeId = window.setTimeout(() => {
            this.unmount();
          }, this.delayFromMouseEnter);
        }
        this.prevTimestamp = Date.now();
      });
      __publicField(this, "handleCloseClick", () => {
        this.unmount();
      });
      __publicField(this, "setStyles", () => {
        var _a2, _b2;
        const { closeButtonPlacement } = this.message;
        const { className, style } = this.message;
        if (className) {
          this.className = className;
        }
        Object.assign(this.style, style);
        if (this.closeEl) {
          const closeWidth = this.closeEl.offsetWidth + ((_a2 = parseInt(window.getComputedStyle(this.closeEl).marginRight)) != null ? _a2 : 0) + ((_b2 = parseInt(window.getComputedStyle(this.closeEl).marginLeft)) != null ? _b2 : 0);
          if (closeButtonPlacement.includes("left")) {
            this.style.paddingLeft = `${closeWidth}px`;
          } else {
            this.style.paddingRight = `${closeWidth}px`;
          }
        }
      });
      __publicField(this, "setCssVariables", () => {
        for (const key in this.message) {
          const val = this.message[key];
          if (val != null && !/onShow|onHide|className|closeButtonClassName|style|content/g.test(key)) {
            this.style.setProperty(`--xo-${namingConvention.camelToKebab(key)}`, ` ${JSON.stringify(val)}`);
          }
        }
      });
      __publicField(this, "mount", () => {
        const { duration, onShow, easing } = this.message;
        const height = this.getHeight();
        const from = this.getValueY(height);
        this.closeEl = this.querySelector(WebComponent.ToastCloseButton);
        this.prevTimestamp = Date.now();
        onShow(this);
        this.setStyles();
        this.setCssVariables();
        if (this.closeEl) {
          this.closeEl.addEventListener("click", this.handleCloseClick);
        }
        this.addEventListener("mouseenter", this.handleMouseEnter);
        this.addEventListener("mouseleave", this.handleMouseLeave);
        this.animatedIn({
          from,
          to: 0,
          duration,
          easing: easings[easing],
          onUpdate: (value) => {
            this.style.transform = `translateY(${value}px)`;
          }
        });
        this.unmounted = false;
      });
      __publicField(this, "unmount", () => {
        const { duration, placement, onHide, easing, name } = this.message;
        const height = this.getHeight();
        if (!this.unmounted) {
          this.unmounted = true;
          this.style.pointerEvents = "none";
          this.animatedOut({
            from: 0,
            to: 1,
            duration,
            onUpdate: (value) => {
              const margin = interpolate({
                value,
                inputRange: [0, 1],
                outputRange: [0, -height],
                easing: easings[easing]
              });
              const offset2 = interpolate({
                value,
                inputRange: [0, 1],
                outputRange: [0, OFFSET],
                easing: easings[easing]
              });
              if (placement.includes("top-")) {
                this.style.marginTop = `${margin}px`;
                this.style.transform = `translateY(-${offset2}px)`;
              } else {
                this.style.marginBottom = `${margin}px`;
                this.style.transform = `translateY(${offset2}px)`;
              }
            },
            onEnd: () => {
              this.style.removeProperty("pointer-events");
              if (name) {
                this.destroy();
                const portalEl = this.closest(WebComponent.ToastPortal);
                if (portalEl) {
                  this.remove();
                }
              } else {
                this.remove();
              }
              onHide(this);
            }
          });
        }
      });
    }
    connectedCallback() {
      const portalEl = this.closest(WebComponent.ToastPortal);
      if (!portalEl) {
        return;
      }
      if (this.message) {
        const { delay: delay2 } = this.message;
        this.initialized = true;
        this.delayFromMouseEnter = delay2;
        this.mount();
        if (delay2 !== Infinity) {
          this.timeId = window.setTimeout(() => {
            this.unmount();
          }, delay2);
        }
        this.offId = toastEvents.on("toast:remove", () => {
          this.unmount();
        });
      }
    }
    disconnectedCallback() {
      if (!attrBoolean.get(this, "xo-cloned")) {
        this.cleanup();
        return;
      }
      if (this.initialized) {
        this.destroy();
        this.unmount();
      }
    }
  }
  const styles$s = "";
  window.xoToast = xoToast;
  componentDefine({
    [WebComponent.ToastPortal]: ToastPortal,
    [WebComponent.Toast]: Toast
  });
  const xoPopover = new ToggleBaseMethods("xo-popover");
  const setAnimate = {
    none: animate$1.none,
    zoom: animate$1.zoom(true),
    fade: animate$1.move(),
    "fade-up": animate$1.move({ dy: 50 }),
    "fade-down": animate$1.move({ dy: -50 }),
    "fade-left": animate$1.move({ dx: 50 }),
    "fade-right": animate$1.move({ dx: -50 })
  };
  function popoverSupported(el) {
    const modalEl = el.closest(WebComponent.Modal);
    const stickyEl = el.closest(WebComponent.Sticky);
    return typeof HTMLDialogElement === "function" && !modalEl && !stickyEl;
  }
  const _Popover = class extends ToggleBase {
    constructor() {
      super(...arguments);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "canClose", false);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        var _a2;
        const options = getAttrs(this, {
          pick: [
            "xoName",
            "xoAnimate",
            "xoEasing",
            "xoDuration",
            "xoPlacement",
            "xoPortal",
            "xoDisabled",
            "xoBreakpoints",
            "xoAutofocus",
            "xoSectionSelect",
            "xoModalScrollSelector",
            "xoOffset"
          ],
          types: {
            xoName: "string",
            xoAnimate: "string",
            xoEasing: "string",
            xoDuration: "number",
            xoPlacement: "string",
            xoPortal: "boolean",
            xoDisabled: "boolean",
            xoBreakpoints: "object",
            xoAutofocus: "boolean",
            xoSectionSelect: "boolean",
            xoModalScrollSelector: "string",
            xoOffset: "number"
          }
        });
        const breakpointOpts = getBreakpointsOptions((_a2 = options.xoBreakpoints) != null ? _a2 : {});
        this.options = JSON.parse(JSON.stringify({
          ...options,
          xoDisabled: (breakpointOpts == null ? void 0 : breakpointOpts.disabled) != null ? breakpointOpts.disabled : options.xoDisabled,
          xoDuration: (breakpointOpts == null ? void 0 : breakpointOpts.duration) != null ? breakpointOpts.duration : options.xoDuration,
          xoEasing: (breakpointOpts == null ? void 0 : breakpointOpts.easing) != null ? breakpointOpts.easing : options.xoEasing,
          xoAnimate: (breakpointOpts == null ? void 0 : breakpointOpts.animate) != null ? breakpointOpts.animate : options.xoAnimate,
          xoPlacement: (breakpointOpts == null ? void 0 : breakpointOpts.placement) != null ? breakpointOpts.placement : options.xoPlacement,
          xoOffset: (breakpointOpts == null ? void 0 : breakpointOpts.offset) != null ? breakpointOpts.offset : options.xoOffset
        }));
      });
      __publicField(this, "handleCalTopLeft", () => {
        var _a2, _b2, _c2;
        const { xoPlacement, xoOffset, xoModalScrollSelector } = this.options;
        const { triggerElement } = this.state;
        if (triggerElement) {
          const measure2 = popper(triggerElement, {
            placement: xoPlacement,
            offset: xoOffset,
            element: this
          });
          const modalEl = this.closest(WebComponent.Modal);
          const stickyEl = this.closest(`${WebComponent.Sticky}:not([xo-disabled])`);
          if (modalEl) {
            const modalContentEl = (_a2 = modalEl.shadowRoot) == null ? void 0 : _a2.querySelector(WebComponent.ModalContent);
            const scrollEl = xoModalScrollSelector ? modalEl.querySelector(xoModalScrollSelector) : null;
            const contentEl = scrollEl || modalContentEl;
            const { left: modalLeft, top: modalTop } = offset(contentEl);
            const { x, y } = this.getValueWithBoundary(measure2.left - modalLeft, measure2.top - modalTop);
            this.style.top = `${y}px`;
            this.style.left = `${x}px`;
          } else if (stickyEl) {
            const parentEl = (_c2 = getParent(this)) != null ? _c2 : (_b2 = stickyEl.shadowRoot) == null ? void 0 : _b2.querySelector(WebComponent.StickyContent);
            const { left: stickyLeft, top: stickyTop } = offset(parentEl);
            const { x, y } = this.getValueWithBoundary(measure2.left - stickyLeft, measure2.top - stickyTop);
            this.style.top = `${y}px`;
            this.style.left = `${x}px`;
          } else {
            const { x, y } = this.getValueWithBoundary(measure2.left, measure2.top - window.scrollY);
            this.style.top = `${y}px`;
            this.style.left = `${x}px`;
          }
          this.style.setProperty("--xo-popover-trigger-width", `${triggerElement.offsetWidth}px`);
        }
      });
      __publicField(this, "handleScroll", () => {
        this.handleCalTopLeft();
      });
      __publicField(this, "subscribe", () => {
        const { xoDuration, xoDisabled } = this.options;
        const { triggerElement, isOpen } = this.state;
        if (!xoDisabled) {
          this.handleCalTopLeft();
          if (triggerElement) {
            this.animated({
              from: isOpen ? 0 : 1,
              to: isOpen ? 1 : 0,
              duration: xoDuration
            });
          }
        }
      });
      __publicField(this, "handleClose", () => {
        const { xoDuration, xoName } = this.options;
        this.animated({
          from: 1,
          to: 0,
          duration: xoDuration
        });
        if (xoName) {
          xoPopover.close(xoName, "empty");
        }
      });
      __publicField(this, "handleOutsideClick", (event) => {
        const { xoDisabled } = this.options;
        const { isOpen, triggerElement } = this.state;
        const target = event.target;
        if (this.canClose && isOpen && !xoDisabled && !this.contains(target) && !(triggerElement == null ? void 0 : triggerElement.contains(target))) {
          this.handleClose();
        }
      });
      __publicField(this, "resetStyles", () => {
        const { xoDisabled } = this.options;
        if (xoDisabled) {
          this.style.removeProperty("top");
          this.style.removeProperty("left");
          this.style.removeProperty("opacity");
          this.style.removeProperty("visibility");
          this.style.removeProperty("transform");
        }
      });
      __publicField(this, "handleResize", debounce(() => {
        this.setOptions();
        this.resetStyles();
        this.handleCalTopLeft();
        this.componentUnmount();
        this.componentMount();
      }, 500));
      __publicField(this, "setCurrentDisabled", () => {
        const { xoDisabled } = this.options;
        attrBoolean.set(this, "xo-current-disabled", xoDisabled);
      });
      __publicField(this, "componentOpen", () => {
        const { xoPortal } = this.options;
        if (xoPortal && popoverSupported(this)) {
          openPopover(this);
        }
      });
      __publicField(this, "componentClose", () => {
        const { xoDuration } = this.options;
        if (this.animated.getValue() > 0 && this.animated.getValue() < 1) {
          this.animated({
            from: 1,
            to: 0,
            duration: xoDuration
          });
          this.style.removeProperty("pointer-events");
        }
      });
      __publicField(this, "componentBeforeMount", () => {
        this.setOptions();
      });
      __publicField(this, "componentMount", async () => {
        const { xoName, xoAnimate, xoEasing, xoPortal, xoBreakpoints, xoModalScrollSelector } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        if (xoPortal && popoverSupported(this)) {
          this.setAttribute("popover", "manual");
        }
        this.setCurrentDisabled();
        this.setCssVariables();
        if (xoBreakpoints) {
          each(objectKeys(xoBreakpoints).sort(), (key) => {
            const val = xoBreakpoints[key];
            this.setCssVariables(Number(key), val);
          });
        }
        const modalEl = this.closest(WebComponent.Modal);
        const stickyEl = this.closest(`${WebComponent.Sticky}:not([xo-disabled])`);
        if (modalEl || stickyEl) {
          this.style.position = "absolute";
        } else {
          this.style.position = "fixed";
        }
        document.addEventListener("click", this.handleOutsideClick);
        this.animated.onUpdate((value) => {
          const { isOpen } = this.state;
          const cond = isOpen ? value === 1 : value === 0;
          if (cond) {
            this.style.removeProperty("pointer-events");
          } else {
            this.style.pointerEvents = "none";
          }
          if (setAnimate[xoAnimate]) {
            setAnimate[xoAnimate](this, { isOpen, easing: easings[xoEasing], value });
          }
          this.canClose = value === 1;
        });
        this.animated.onEnd(() => {
          const { isOpen } = this.state;
          if (!isOpen && xoPortal && popoverSupported(this)) {
            closePopover(this);
          }
        });
        window.addEventListener("resize", this.handleResize);
        if (modalEl) {
          const scrollEl = xoModalScrollSelector ? modalEl.querySelector(xoModalScrollSelector) || window : window;
          scrollEl.addEventListener("scroll", this.handleScroll);
        } else {
          window.addEventListener("scroll", this.handleScroll);
        }
      });
      __publicField(this, "componentUnmount", () => {
        const { xoModalScrollSelector } = this.options;
        this.animated.off();
        document.removeEventListener("click", this.handleOutsideClick);
        window.removeEventListener("resize", this.handleResize);
        const modalEl = this.closest(WebComponent.Modal);
        if (modalEl) {
          const scrollEl = xoModalScrollSelector ? modalEl.querySelector(xoModalScrollSelector) || window : window;
          scrollEl.removeEventListener("scroll", this.handleScroll);
        } else {
          window.removeEventListener("scroll", this.handleScroll);
        }
      });
    }
    static get observedAttributes() {
      return ["xo-placement", "xo-offset", "xo-breakpoints"];
    }
    get stateName() {
      return "xo-popover";
    }
    get componentName() {
      return WebComponent.Popover;
    }
    get options() {
      return {
        ..._Popover.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    getValueWithBoundary(x, y) {
      const boundaryEl = this.closest("[xo-popover-boundary]");
      if (boundaryEl) {
        const { left: boundaryLeft, top: boundaryTop } = boundaryEl.getBoundingClientRect();
        return {
          x: clamp(x, boundaryLeft, boundaryLeft + boundaryEl.offsetWidth - this.offsetWidth),
          y: clamp(y, boundaryTop, boundaryTop + boundaryEl.offsetHeight - this.offsetHeight)
        };
      }
      return { x, y };
    }
    async attributeChangedCallback(_, oldValue, newValue) {
      if (oldValue !== newValue) {
        await delay(100);
        this.setOptions();
        this.resetStyles();
        this.handleCalTopLeft();
      }
    }
  };
  let Popover = _Popover;
  __publicField(Popover, "defaultOptions", {
    xoName: null,
    xoAnimate: "fade-up",
    xoEasing: "decay",
    xoDuration: 300,
    xoPlacement: "bottom-center",
    xoPortal: false,
    xoOffset: 10,
    xoDisabled: false,
    xoBreakpoints: {},
    xoAutofocus: false
  });
  const _PopoverTrigger = class extends ToggleTriggerBase {
    constructor() {
      super(...arguments);
      __publicField(this, "componentTrigger", () => {
        const { xoName, xoType } = this.options;
        const { isOpen } = this.state;
        checkAttr(this.componentName, "xo-name", xoName);
        this.setState((prevState) => {
          return {
            ...prevState,
            [xoName]: {
              ...prevState[xoName],
              triggerElement: isOpen ? this : prevState[xoName].triggerElement,
              eventType: xoType
            }
          };
        })(`${this.componentName}/setTriggerElement`);
      });
    }
    get stateName() {
      return "xo-popover";
    }
    get componentName() {
      return WebComponent.PopoverTrigger;
    }
    get eventType() {
      return this.options.xoType;
    }
    get actionType() {
      return "toggle";
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName", "xoType"],
        types: {
          xoName: "string",
          xoType: "string"
        }
      });
      const parentEl = this.closest("[xo-name]");
      if (parentEl) {
        const options2 = getAttrs(parentEl, {
          pick: ["xoName"],
          types: {
            xoName: "string"
          }
        });
        return {
          ..._PopoverTrigger.defaultOptions,
          ...options2,
          ...options
        };
      }
      return {
        ..._PopoverTrigger.defaultOptions,
        ...options
      };
    }
  };
  let PopoverTrigger = _PopoverTrigger;
  __publicField(PopoverTrigger, "defaultOptions", {
    xoName: null,
    xoType: "click"
  });
  xoStore.create("xo-popover", {
    initialState: {
      trigger: {},
      data: {}
    }
  });
  const styles$r = "";
  let BuilderPopover = (_k = class extends XoComponent {
    constructor() {
      super();
      __publicField(this, "handleToggle", (event) => {
        const target = event.target;
        if (!target.closest(WebComponent.BuilderPopoverContent)) {
          this.setState({ isOpen: !this.state.isOpen });
        }
      });
      __publicField(this, "handleDocumentClick", (event) => {
        const target = event.target;
        if (!this.contains(target)) {
          this.setState({ isOpen: false });
        }
      });
      __publicField(this, "bindEvent", () => {
        const { xoType } = this.props;
        if (xoType === "click") {
          this.addEventListener("click", this.handleToggle);
          document.addEventListener("click", this.handleDocumentClick);
        }
      });
      __publicField(this, "addCssVars", () => {
        const { xoDuration } = this.props;
        this.style.setProperty("--xo-popover-duration", `${xoDuration}ms`);
      });
      this.state = {
        isOpen: false
      };
    }
    mount() {
      this.addCssVars();
      this.bindEvent();
    }
    unmount() {
      this.removeEventListener("click", this.handleToggle);
    }
    stateUpdate(prevState) {
      if (prevState.isOpen !== this.state.isOpen) {
        const contentEl = this.querySelector(WebComponent.BuilderPopoverContent);
        attrBoolean.set(this, "xo-open", this.state.isOpen);
        if (contentEl) {
          attrBoolean.set(contentEl, "xo-open", this.state.isOpen);
        }
      }
    }
    propUpdate({ name, prevProp, nextProp }) {
      if (name === "xoDuration" && prevProp !== nextProp) {
        this.addCssVars();
      }
      if (name === "xoType" && prevProp !== nextProp) {
        this.removeEventListener("click", this.handleToggle);
        this.bindEvent();
      }
    }
  }, __publicField(_k, "propTypes", {
    xoAnimate: "string",
    xoDuration: "number",
    xoPlacement: "string",
    xoType: "string"
  }), __publicField(_k, "defaultProps", {
    xoType: "click",
    xoPlacement: "bottom-center",
    xoAnimate: "fade-up",
    xoDuration: 300
  }), __publicField(_k, "observedProps", ["xoType", "xoDuration"]), _k);
  BuilderPopover = __decorate([
    customElements$1(WebComponent.BuilderPopover),
    __metadata("design:paramtypes", [])
  ], BuilderPopover);
  const builderPopover = "";
  window.xoPopover = xoPopover;
  componentDefine({
    [WebComponent.Popover]: Popover,
    [WebComponent.PopoverTrigger]: PopoverTrigger
  });
  const _Tooltip = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "contentEl", null);
      __publicField(this, "_options");
      __publicField(this, "intervalId", -1);
      __publicField(this, "isShowing", false);
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoTitle", "xoAnimate", "xoDuration", "xoPlacement", "xoPortalClass", "xoMobileDisabled"],
          types: {
            xoTitle: "string",
            xoAnimate: "string",
            xoDuration: "number",
            xoPlacement: "string",
            xoPortalClass: "string",
            xoMobileDisabled: "boolean"
          }
        });
      });
      __publicField(this, "handleShow", async (event) => {
        var _a2;
        if (event) {
          this.isShowing = true;
        }
        window.removeEventListener("scroll", this.handleHide, false);
        window.addEventListener("scroll", this.handleHide, false);
        const parentEl = (_a2 = this.closest(`${WebComponent.Popover}, ${WebComponent.Modal}`)) != null ? _a2 : document.body;
        if (!this.contentEl) {
          this.contentEl = this.createPortal();
          parentEl.appendChild(this.contentEl);
        }
        const { xoPlacement, xoAnimate, xoDuration, xoOffset, xoTitle, xoPortalClass } = this.options;
        this.contentEl.innerHTML = xoTitle;
        this.contentEl.style.removeProperty("transition-duration");
        this.contentEl.setAttribute("xo-placement", xoPlacement);
        this.contentEl.setAttribute("xo-animate", xoAnimate);
        if (xoPortalClass) {
          this.contentEl.classList.add(xoPortalClass);
        }
        if (parentEl.tagName.toLowerCase() === WebComponent.Modal) {
          this.contentEl.setAttribute("slot", `${parentEl.getAttribute("xo-name")}-inner`);
        }
        const measure2 = popper(this, {
          placement: xoPlacement,
          offset: xoOffset,
          element: this.contentEl
        });
        let top = `${measure2.top}px`;
        let left = `${measure2.left}px`;
        if ([WebComponent.Modal, WebComponent.Popover].includes(parentEl.tagName.toLowerCase())) {
          if (parentEl.tagName.toLowerCase() === WebComponent.Modal) {
            const modalContentEl = parentEl.getShadow().querySelector(WebComponent.ModalContent);
            const { left: parentLeft, top: parentTop } = offset(modalContentEl);
            top = `${measure2.top - parentTop}px`;
            left = `${measure2.left - parentLeft}px`;
          } else {
            const { left: parentLeft, top: parentTop } = offset(parentEl);
            top = `${measure2.top - parentTop}px`;
            left = `${measure2.left - parentLeft}px`;
          }
        }
        if (this.contentEl.style.top !== top) {
          this.contentEl.style.top = top;
        }
        if (this.contentEl.style.left !== left) {
          this.contentEl.style.left = left;
        }
        await delay(0);
        this.contentEl.style.transitionDuration = `${xoAnimate ? xoDuration : 0}ms`;
        attrBoolean.set(this.contentEl, "xo-active", true);
        this.intervalId = window.setInterval(() => {
          if (window.getComputedStyle(this).display === "none") {
            this.handleHide();
            clearInterval(this.intervalId);
          }
        }, 1e3);
      });
      __publicField(this, "handleHide", async () => {
        if (this.contentEl) {
          attrBoolean.set(this.contentEl, "xo-active", false);
          clearInterval(this.intervalId);
        }
      });
      __publicField(this, "handleTooltip", (event) => {
        if (!this.contains(event.target) && this.isShowing) {
          this.handleHide();
          this.isShowing = false;
        }
      });
      __publicField(this, "handleClick", (event) => {
        this.isShowing = true;
        this.handleTooltip(event);
      });
      __publicField(this, "createPortal", () => {
        const el = document.createElement(WebComponent.TooltipContent);
        return el;
      });
      __publicField(this, "show", () => {
        this.handleShow();
      });
      __publicField(this, "hide", () => {
        this.handleHide();
      });
    }
    get options() {
      return {
        ..._Tooltip.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    connectedCallback() {
      this.setOptions();
      const { xoMobileDisabled } = this.options;
      if (isMobile.any && xoMobileDisabled) {
        return;
      }
      this.addEventListener("mouseenter", this.handleShow, false);
      window.addEventListener("mousemove", this.handleTooltip, false);
      window.addEventListener("click", this.handleClick, false);
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.contentEl) == null ? void 0 : _a2.remove();
      clearInterval(this.intervalId);
      window.removeEventListener("mousemove", this.handleTooltip, false);
      window.removeEventListener("scroll", this.handleHide, false);
      this.removeEventListener("mouseenter", this.handleShow, false);
      window.removeEventListener("click", this.handleClick, false);
    }
  };
  let Tooltip = _Tooltip;
  __publicField(Tooltip, "defaultOptions", {
    xoTitle: "",
    xoAnimate: "fade-down",
    xoDuration: 400,
    xoPlacement: "top-center",
    xoPortalClass: "",
    xoOffset: 10,
    xoMobileDisabled: false
  });
  const styles$q = "";
  componentDefine({
    [WebComponent.Tooltip]: Tooltip
  });
  class CollapseMethods {
    constructor() {
      __publicField(this, "stateName", "xo-collapse");
      __publicField(this, "toggle", (name) => {
        xoStore.set(this.stateName, (state) => {
          return {
            ...state,
            [name]: {
              ...state[name],
              isOpen: !state[name].isOpen
            }
          };
        })(`${this.stateName}/toggle`);
      });
      __publicField(this, "open", (name) => {
        xoStore.set(this.stateName, (state) => {
          return {
            ...state,
            [name]: {
              ...state[name],
              isOpen: true
            }
          };
        })(`${this.stateName}/open`);
      });
      __publicField(this, "close", (name) => {
        xoStore.set(this.stateName, (state) => {
          return {
            ...state,
            [name]: {
              ...state[name],
              isOpen: false
            }
          };
        })(`${this.stateName}/close`);
      });
    }
  }
  const xoCollapse = new CollapseMethods();
  function hasProvider$1(providerEl) {
    return providerEl && providerEl.tagName.toLowerCase() === WebComponent.CollapseProvider;
  }
  function hasCollapseTrigger(collapseTriggerEl) {
    return collapseTriggerEl && collapseTriggerEl.tagName.toLowerCase() === WebComponent.CollapseTrigger;
  }
  const _Collapse = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "unsubscribe", null);
      __publicField(this, "frameId", -1);
      __publicField(this, "clear", () => {
      });
      __publicField(this, "initialized", false);
      __publicField(this, "prevIsOpen", false);
      __publicField(this, "_options");
      __publicField(this, "componentOpen", () => {
        const { xoDuration, xoEasing } = this.options;
        const height = this.scrollHeight;
        this.animated({
          from: 0,
          to: height,
          duration: xoDuration,
          easing: easings[xoEasing],
          onUpdate: (value) => {
            if (height === 0) {
              this.style.height = "auto";
            } else {
              this.style.height = `${value}px`;
            }
          },
          onEnd: () => {
            this.style.height = "auto";
          }
        });
      });
      __publicField(this, "componentClose", () => {
        const { xoDuration, xoEasing } = this.options;
        const height = this.scrollHeight;
        this.animated({
          from: height,
          to: 0,
          duration: xoDuration,
          easing: easings[xoEasing],
          onUpdate: (value) => {
            this.style.height = `${value}px`;
          }
        });
      });
      __publicField(this, "listener", (state) => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        if (state[xoName]) {
          const { isOpen } = state[xoName];
          toggleA11y(this, !isOpen);
          if (this.initialized && isOpen !== this.prevIsOpen) {
            if (isOpen) {
              attrBoolean.set(this, "xo-active", true);
              this.componentOpen();
            } else {
              attrBoolean.set(this, "xo-active", false);
              this.componentClose();
            }
            this.prevIsOpen = isOpen;
          }
        }
      });
      __publicField(this, "setOptions", () => {
        const options = getAttrs(this, {
          pick: ["xoName", "xoDuration", "xoEasing"],
          types: {
            xoName: "string",
            xoDuration: "number",
            xoEasing: "string"
          }
        });
        if (hasProvider$1(this.providerElement) && hasCollapseTrigger(this.triggerElement)) {
          const autoOptions = {
            xoName: this.triggerElement.xoNameProp,
            xoDuration: Number(this.providerElement.getAttribute("xo-duration") || 300)
          };
          this.options = {
            ..._Collapse.defaultOptions,
            ...autoOptions,
            ...options
          };
        } else {
          this.options = {
            ..._Collapse.defaultOptions,
            ...options
          };
        }
      });
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get componentName() {
      return WebComponent.Collapse;
    }
    get options() {
      return {
        ..._Collapse.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    get providerElement() {
      return this.closest(WebComponent.CollapseProvider);
    }
    get triggerElement() {
      return this.previousElementSibling;
    }
    async connectedCallback() {
      var _a2;
      this.setOptions();
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      this.initialized = true;
      if (((_a2 = { "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true }) == null ? void 0 : _a2.VITE_BUILD_MODE) === "xoSections") {
        this.clear = await delay(200);
        if (attrBoolean.get(this, "xo-active")) {
          xoCollapse.open(xoName);
        }
      } else {
        if (attrBoolean.get(this, "xo-active")) {
          await delay();
          xoCollapse.open(xoName);
        }
      }
      this.unsubscribe = xoStore.subscribe("xo-collapse", this.listener);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        this.setOptions();
        const isOpen = attrBoolean.get(this, "xo-active");
        if (isOpen) {
          this.style.height = "auto";
        } else {
          this.style.removeProperty("height");
        }
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        xoStore.set("xo-collapse", (prevState) => {
          return {
            ...prevState,
            [xoName]: {
              ...prevState == null ? void 0 : prevState[xoName],
              isOpen
            }
          };
        });
      }
    }
    disconnectedCallback() {
      var _a2;
      this.animated.off();
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
      this.clear();
      cancelAnimationFrame(this.frameId);
    }
  };
  let Collapse = _Collapse;
  __publicField(Collapse, "defaultOptions", {
    xoName: null,
    xoDuration: 300,
    xoEasing: "decay"
  });
  let last$1 = 0;
  const _CollapseTrigger = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "xoNameProp", "");
      __publicField(this, "_options");
      __publicField(this, "handleCollapseHasProvider", () => {
        const { xoName } = this.options;
        if (!hasProvider$1(this.providerElement)) {
          checkAttr(this.componentName, "xo-name", xoName);
        }
        const triggerEls = Array.from(this.providerElement.querySelectorAll(WebComponent.CollapseTrigger));
        each(triggerEls, (triggerEl) => {
          const name = triggerEl.getAttribute("xo-name") || triggerEl.xoNameProp;
          if (this !== triggerEl || this.hasAttribute("xo-active")) {
            attrBoolean.set(triggerEl, "xo-active", false);
            bindingHelper(triggerEl, "xo-active-binding", false);
          } else {
            attrBoolean.set(triggerEl, "xo-active", true);
            bindingHelper(triggerEl, "xo-active-binding", true);
          }
          if (name) {
            xoStore.set("xo-collapse", (prevState) => {
              var _a2;
              return {
                ...prevState,
                [name]: {
                  ...prevState == null ? void 0 : prevState[name],
                  isOpen: this === triggerEl ? !((_a2 = prevState == null ? void 0 : prevState[name]) == null ? void 0 : _a2.isOpen) : false
                }
              };
            });
          }
        });
      });
      __publicField(this, "handleCollapse", () => {
        const { xoName } = this.options;
        if (!hasProvider$1(this.providerElement)) {
          checkAttr(this.componentName, "xo-name", xoName);
        }
        if (attrBoolean.get(this, "xo-active")) {
          attrBoolean.set(this, "xo-active", false);
          bindingHelper(this, "xo-active-binding", false);
        } else {
          attrBoolean.set(this, "xo-active", true);
          bindingHelper(this, "xo-active-binding", true);
        }
        xoCollapse.toggle(xoName);
      });
      __publicField(this, "handleClick", () => {
        var _a2, _b2;
        const { xoName } = this.options;
        const duration = Number((_a2 = this.providerElement) == null ? void 0 : _a2.getAttribute("xo-duration")) || Number((_b2 = document.querySelector(`${WebComponent.Collapse}[xo-name="${xoName}"]`)) == null ? void 0 : _b2.getAttribute("xo-duration")) || 300;
        const delay2 = duration;
        const now = Date.now();
        if (now - last$1 < delay2) {
          return;
        }
        last$1 = now;
        if (hasProvider$1(this.providerElement)) {
          this.handleCollapseHasProvider();
        } else {
          this.handleCollapse();
        }
      });
    }
    get componentName() {
      return WebComponent.CollapseTrigger;
    }
    get options() {
      return {
        ..._CollapseTrigger.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    setOptions() {
      const options = getAttrs(this, {
        pick: ["xoName"],
        types: {
          xoName: "string"
        }
      });
      if (hasProvider$1(this.providerElement)) {
        const id2 = Array.from(this.providerElement.querySelectorAll(WebComponent.CollapseTrigger)).indexOf(this);
        const autoOptions = {
          xoName: `${this.providerElement.xoName}-${id2}`
        };
        this.options = {
          ..._CollapseTrigger.defaultOptions,
          ...autoOptions,
          ...options
        };
      } else {
        this.options = {
          ..._CollapseTrigger.defaultOptions,
          ...options
        };
      }
    }
    get providerElement() {
      return this.closest(WebComponent.CollapseProvider);
    }
    connectedCallback() {
      var _a2;
      this.setOptions();
      if ((_a2 = this.providerElement) == null ? void 0 : _a2.xoName) {
        const id2 = Array.from(this.providerElement.querySelectorAll(WebComponent.CollapseTrigger)).indexOf(this);
        this.xoNameProp = `${this.providerElement.xoName}-${id2}`;
      }
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      xoStore.set("xo-collapse", (prevState) => {
        var _a3, _b2;
        return {
          ...prevState,
          [xoName]: {
            ...prevState == null ? void 0 : prevState[xoName],
            isOpen: (_b2 = (_a3 = prevState == null ? void 0 : prevState[xoName]) == null ? void 0 : _a3.isOpen) != null ? _b2 : false
          }
        };
      });
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  };
  let CollapseTrigger = _CollapseTrigger;
  __publicField(CollapseTrigger, "defaultOptions", {
    xoName: null
  });
  let id$3 = 0;
  class CollapseProvider extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "xoName");
      id$3++;
      this.xoName = `collapse-${id$3}`;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        const triggerEls = Array.from(this.querySelectorAll(WebComponent.CollapseTrigger));
        const contentEls = Array.from(this.querySelectorAll(WebComponent.Collapse));
        each([...triggerEls, ...contentEls], (el) => {
          el.setAttribute("xo-observed", newValue);
        });
      }
    }
  }
  xoStore.create("xo-collapse", {
    initialState: {}
  });
  const styles$p = "";
  window.xoCollapse = xoCollapse;
  componentDefine({
    [WebComponent.CollapseProvider]: CollapseProvider,
    [WebComponent.CollapseTrigger]: CollapseTrigger,
    [WebComponent.Collapse]: Collapse
  });
  function hasProvider(providerEl) {
    return providerEl && providerEl.tagName.toLowerCase() === WebComponent.Tabs;
  }
  const _TabsPane = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", null);
      __publicField(this, "listener", (state) => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        if (state[this.providerElement.xoName]) {
          const { name: nameActive } = state[this.providerElement.xoName];
          toggleA11y(this, nameActive !== xoName);
          attrBoolean.set(this, "xo-active", nameActive === xoName);
        }
      });
    }
    get componentName() {
      return WebComponent.TabsPane;
    }
    get providerElement() {
      return this.closest(WebComponent.Tabs);
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName"],
        types: {
          xoName: "string"
        }
      });
      return {
        ..._TabsPane.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      const { xoName } = this.options;
      checkAttr(this.componentName, "xo-name", xoName);
      if (!hasProvider(this.providerElement)) {
        throwError(`The ${this.componentName} component must be a child of the ${WebComponent.Tabs} component`);
      }
      this.unsubscribe = xoStore.subscribe("xo-tabs", this.listener);
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
    }
  };
  let TabsPane = _TabsPane;
  __publicField(TabsPane, "defaultOptions", {
    xoName: null
  });
  function createState$5() {
    xoStore.create("xo-tabs", {
      initialState: {}
    });
  }
  function setActive(providerName, { name, width = 0, left, triggerElement }) {
    xoStore.set("xo-tabs", (state) => {
      var _a2, _b2, _c2, _d2;
      return {
        ...state,
        [providerName]: {
          ...state[providerName],
          name,
          width: width == null ? (_b2 = (_a2 = state[providerName]) == null ? void 0 : _a2.width) != null ? _b2 : 0 : width,
          left: left == null ? (_d2 = (_c2 = state[providerName]) == null ? void 0 : _c2.left) != null ? _d2 : 0 : left,
          triggerElement
        }
      };
    });
  }
  const xoTabs = {
    active: setActive
  };
  const _TabsTrigger = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", null);
      __publicField(this, "providerName", null);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoName", "xoTrigger", "xoActive"],
          types: {
            xoName: "string",
            xoTrigger: "string",
            xoActive: "boolean"
          }
        });
      });
      __publicField(this, "listener", (state) => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        if (this.providerName && state[this.providerName]) {
          const { name: nameActive } = state[this.providerName];
          attrBoolean.set(this, "xo-active", nameActive === xoName);
          bindingHelper(this, "xo-active-binding", nameActive === xoName);
        }
      });
      __publicField(this, "handleActive", async (event) => {
        const { xoName } = this.options;
        checkAttr(this.componentName, "xo-name", xoName);
        await delay(0);
        if (this.providerName) {
          if (this.providerElement) {
            const tabsActiveEl = this.providerElement.querySelector(WebComponent.TabsActive);
            const wrapperTabsActiveEl = tabsActiveEl == null ? void 0 : tabsActiveEl.parentElement;
            const left = wrapperTabsActiveEl ? offset(this).left - offset(wrapperTabsActiveEl).left : 0;
            if (wrapperTabsActiveEl && window.getComputedStyle(wrapperTabsActiveEl).position === "static") {
              wrapperTabsActiveEl.style.position = "relative";
            }
            setActive(this.providerName, {
              name: xoName,
              left,
              width: this.offsetWidth,
              triggerElement: this
            });
          } else {
            const listPortalEls = Array.from(document.querySelectorAll(WebComponent.ListPortal));
            each(listPortalEls, (listPortalEl) => {
              if (event && event.target instanceof HTMLElement && listPortalEl.contains(event.target)) {
                const targetEl = event.currentTarget;
                const id2 = setTimeout(() => {
                  if (this.providerName) {
                    setActive(this.providerName, {
                      name: xoName,
                      width: targetEl.offsetWidth,
                      left: targetEl.offsetLeft,
                      triggerElement: this
                    });
                  }
                  clearTimeout(id2);
                }, 0);
              }
            });
          }
        }
      });
      __publicField(this, "addTrigger", () => {
        if (this.options.xoTrigger === "hover" && !isMobile.any) {
          this.addEventListener("mouseenter", this.handleActive);
        } else {
          this.addEventListener("click", this.handleActive);
        }
      });
      __publicField(this, "removeTrigger", () => {
        this.removeEventListener("mouseenter", this.handleActive);
        this.removeEventListener("click", this.handleActive);
      });
    }
    get componentName() {
      return WebComponent.TabsTrigger;
    }
    get providerElement() {
      return this.closest(WebComponent.Tabs);
    }
    get options() {
      return {
        ..._TabsTrigger.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    connectedCallback() {
      var _a2;
      this.setOptions();
      if ((_a2 = this.providerElement) == null ? void 0 : _a2.xoName) {
        this.providerName = this.providerElement.xoName;
      }
      if (attrBoolean.get(this, "xo-active")) {
        this.handleActive();
      }
      this.unsubscribe = xoStore.subscribe("xo-tabs", this.listener);
      this.addTrigger();
    }
    disconnectedCallback() {
      var _a2;
      this.removeTrigger();
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      var _a2;
      if (name === "xo-observed" && oldValue !== newValue) {
        await delay(100);
        this.setOptions();
        if ((_a2 = this.providerElement) == null ? void 0 : _a2.xoName) {
          this.providerName = this.providerElement.xoName;
        }
        if (attrBoolean.get(this, "xo-active")) {
          this.handleActive();
        }
        this.removeTrigger();
        this.addTrigger();
        this.listener(xoStore.get("xo-tabs"));
      }
    }
  };
  let TabsTrigger = _TabsTrigger;
  __publicField(TabsTrigger, "defaultOptions", {
    xoName: null,
    xoTrigger: "click"
  });
  let id$2 = 0;
  class Tabs extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "xoName");
      id$2++;
      this.xoName = `tabs-${id$2}`;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue != null && oldValue !== newValue) {
        const tabsActiveEls = Array.from(this.querySelectorAll(WebComponent.TabsActive));
        const tabsTriggerEls = Array.from(this.querySelectorAll(WebComponent.TabsTrigger));
        const tabsPaneEls = Array.from(this.querySelectorAll(WebComponent.TabsPane));
        each([...tabsActiveEls, ...tabsTriggerEls, ...tabsPaneEls], (el) => {
          el.setAttribute("xo-observed", newValue);
        });
      }
    }
  }
  const _TabsActive = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "animated", createAnimate());
      __publicField(this, "prevLeft", 0);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "initialized", false);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoDuration", "xoEasing"],
          types: {
            xoDuration: "number",
            xoEasing: "string"
          }
        });
      });
      __publicField(this, "listener", (state) => {
        const { xoDuration, xoEasing } = this.options;
        if (hasProvider(this.providerElement) && state[this.providerElement.xoName]) {
          const { width = 0, left = 0 } = state[this.providerElement.xoName];
          if (!this.initialized) {
            this.style.width = `${width}px`;
            this.style.transform = `translateX(${left}px)`;
            this.prevLeft = left;
            this.prevWidth = width;
          } else {
            const threshold = 100;
            const _left = left + threshold;
            this.animated.off();
            this.animated({
              from: this.prevLeft,
              to: _left,
              duration: xoDuration,
              onUpdate: (value) => {
                const widthAnimated = interpolate({
                  value,
                  inputRange: [this.prevLeft, _left],
                  outputRange: [this.prevWidth, width],
                  reverseEasing: this.prevLeft > left,
                  easing: easings[xoEasing]
                });
                const xAnimated = interpolate({
                  value,
                  inputRange: [this.prevLeft, _left],
                  outputRange: [this.prevLeft, left],
                  reverseEasing: this.prevLeft > left,
                  easing: easings[xoEasing]
                });
                this.style.width = `${widthAnimated}px`;
                this.style.transform = `translateX(${xAnimated}px)`;
              },
              onEnd: () => {
                this.prevLeft = left;
                this.prevWidth = width;
              }
            });
          }
          this.initialized = true;
        }
      });
    }
    get options() {
      return {
        ..._TabsActive.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get providerElement() {
      return this.closest(WebComponent.Tabs);
    }
    connectedCallback() {
      this.setOptions();
      this.unsubscribe = xoStore.subscribe("xo-tabs", this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.animated.off();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        this.setOptions();
        this.initialized = false;
        this.listener(xoStore.get("xo-tabs") || {});
      }
    }
  };
  let TabsActive = _TabsActive;
  __publicField(TabsActive, "defaultOptions", {
    xoDuration: 200,
    xoEasing: "ease"
  });
  const styles$o = "";
  createState$5();
  window.xoTabs = xoTabs;
  componentDefine({
    [WebComponent.Tabs]: Tabs,
    [WebComponent.TabsActive]: TabsActive,
    [WebComponent.TabsTrigger]: TabsTrigger,
    [WebComponent.TabsPane]: TabsPane
  });
  class ParallaxScroll extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "keyframes", {});
      __publicField(this, "parallax", null);
      __publicField(this, "setStyleCallback", null);
      __publicField(this, "customEffects", (callback) => {
        this.setStyleCallback = callback;
      });
      __publicField(this, "beautyAttr", () => {
        const breakpointsAttr = this.getAttribute("xo-breakpoints");
        const keyframesAttr = this.getAttribute("xo-keyframes");
        if (breakpointsAttr) {
          this.setAttribute("xo-breakpoints", breakpointsAttr.replace(/\s+/g, " ").trim());
        }
        if (keyframesAttr) {
          this.setAttribute("xo-keyframes", keyframesAttr.replace(/\s+/g, " ").trim());
        }
      });
      __publicField(this, "init", async () => {
        const providerEl = this.closest(`${WebComponent.Parallax}, [${WebComponent.Parallax}]`);
        if (!this.getAttribute("xo-keyframes")) {
          throwError(`The ${WebComponent.ParallaxScroll} component must have the "xo-keyframes" attribute`);
        }
        if (providerEl && (providerEl.tagName.toLowerCase() === WebComponent.Parallax || providerEl.hasAttribute(WebComponent.Parallax))) {
          const { xoLerpEase = 0.08, xoBackfaceVisibility = "hidden", xoFitContent } = this.getOptions();
          if (xoBackfaceVisibility === "hidden") {
            this.style.backfaceVisibility = "hidden";
          }
          if (xoFitContent == null) {
            attrBoolean.set(this, "xo-fit-content", true);
          }
          this.dispatchEvent(new CustomEvent("xo:parallax-scroll:init", { bubbles: true }));
          await delay(50);
          this.setKeyframes();
          this.parallax = parallaxScroll({
            lerpEase: xoLerpEase,
            setStyles: ({ element, createValue, EMPTY: EMPTY2 }) => {
              var _a2;
              (_a2 = this.setStyleCallback) == null ? void 0 : _a2.call(this, { element, createValue, EMPTY: EMPTY2 });
            }
          });
          this.beautyAttr();
          this.parallax.add(this, {
            from: () => {
              return offset(providerEl).top - window.innerHeight;
            },
            to: () => {
              return offset(providerEl).top + providerEl.offsetHeight;
            },
            keyframes: this.keyframes
          }).run();
        }
      });
      __publicField(this, "handleResize", debounce(resizeAxis("x", () => {
        var _a2;
        (_a2 = this.parallax) == null ? void 0 : _a2.destroy();
        this.init();
      }), 500));
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-keyframes", "xo-breakpoints", "xo-lerp-ease", "xo-backface-visibility", "xo-fit-content"];
    }
    getOptions() {
      const options = getAttrs(this, {
        pick: ["xoKeyframes", "xoBreakpoints", "xoLerpEase", "xoBackfaceVisibility", "xoFitContent"],
        types: {
          xoKeyframes: "object",
          xoBreakpoints: "object",
          xoLerpEase: "number",
          xoBackfaceVisibility: "string",
          xoFitContent: "boolean"
        }
      });
      return options;
    }
    setKeyframes() {
      var _a2;
      const { xoKeyframes, xoBreakpoints } = this.getOptions();
      this.keyframes = (_a2 = getBreakpointsOptions(xoBreakpoints)) != null ? _a2 : xoKeyframes;
    }
    connectedCallback() {
      this.init();
      this.dispatchEvent(new CustomEvent("xo:parallax-scroll:init", { bubbles: true }));
      window.addEventListener("resize", this.handleResize);
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.parallax) == null ? void 0 : _a2.destroy();
      window.removeEventListener("resize", this.handleResize);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if ((name === "xo-observed" || name === "xo-keyframes" || name === "xo-breakpoints" || name === "xo-lerp-ease" || name === "xo-backface-visibility") && oldValue !== newValue) {
        await delay(100);
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }
  }
  const DEFAULT_FPS$2 = 60;
  const DT_FPS$2 = 1e3 / DEFAULT_FPS$2;
  const _ParallaxHover = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "shadow", this.attachShadow({ mode: "open" }));
      __publicField(this, "providerEl", null);
      __publicField(this, "targetValueX", 0);
      __publicField(this, "targetValueY", 0);
      __publicField(this, "currentValueX", 0);
      __publicField(this, "currentValueY", 0);
      __publicField(this, "handleParallax", (delta) => {
        var _a2;
        const { xoStrength, xo3d } = this.getOptions();
        let slowDown = delta / DT_FPS$2;
        const slowDownRounded = Math.round(slowDown);
        if (slowDownRounded >= 1) {
          slowDown = slowDownRounded;
        }
        const lerpEase = Number(((_a2 = this.providerEl) == null ? void 0 : _a2.getAttribute("xo-lerp-ease")) || "0.08");
        const valueX = lerp(this.currentValueX, this.targetValueX, lerpEase * slowDown);
        const valueY = lerp(this.currentValueY, this.targetValueY, lerpEase * slowDown);
        const innerEl = this.shadow.querySelector(WebComponent.ParallaxHoverInner);
        if (xo3d) {
          const constant = 4;
          innerEl.style.transformStyle = "preserve-3d";
          innerEl.style.transform = `perspective(2000px) rotateX(${-valueY / constant * xoStrength}deg) rotateY(${valueX / constant * xoStrength}deg)`;
        } else {
          innerEl.style.transform = `translate3d(${valueX * xoStrength}px, ${valueY * xoStrength}px, 0)`;
        }
        this.currentValueX = valueX;
        this.currentValueY = valueY;
      });
      __publicField(this, "handleFrameSyncUpdate", ({ delta }) => {
        const diffX = Math.abs(this.targetValueX - this.currentValueX);
        const diffY = Math.abs(this.targetValueY - this.currentValueY);
        if (diffX < 1e-3 && diffY < 1e-3) {
          return;
        }
        this.handleParallax(delta);
      });
      __publicField(this, "setTargetValue", (event, left, top, width, height) => {
        const centerX = offset(this).left + this.offsetWidth / 2;
        const centerY = offset(this).top + this.offsetHeight / 2;
        this.targetValueX = interpolate({
          value: event.pageX - left,
          inputRange: [0, centerX - left, width],
          outputRange: [-1, 0, 1]
        });
        this.targetValueY = interpolate({
          value: event.pageY - top,
          inputRange: [0, centerY - top, height],
          outputRange: [-1, 0, 1]
        });
      });
      __publicField(this, "handleMouseMove", (event) => {
        const providerLeft = offset(this.providerEl).left;
        const providerTop = offset(this.providerEl).top;
        const providerWidth = this.providerEl.offsetWidth;
        const providerHeight = this.providerEl.offsetHeight;
        this.setTargetValue(event, providerLeft, providerTop, providerWidth, providerHeight);
      });
      __publicField(this, "handleMouseLeave", () => {
        const { xoResetPosition } = this.getOptions();
        if (xoResetPosition) {
          this.targetValueX = 0;
          this.targetValueY = 0;
        }
      });
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-strength", "xo-reset-position", "xo-3d", "xo-inner-width"];
    }
    getOptions() {
      const options = getAttrs(this, {
        pick: ["xoStrength", "xoResetPosition", "xo3d", "xoInnerWidth"],
        types: {
          xoStrength: "number",
          xoResetPosition: "boolean",
          xo3d: "boolean",
          xoInnerWidth: "string"
        }
      });
      return {
        ..._ParallaxHover.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      frameManager$1.remove(this.handleFrameSyncUpdate);
      frameManager$1.add(this.handleFrameSyncUpdate, true);
      this.providerEl = this.closest(`${WebComponent.Parallax}, [${WebComponent.Parallax}]`);
      if (!this.providerEl) {
        throw new Error(`The ${WebComponent.ParallaxHover} component must be a child of ${WebComponent.Parallax}`);
      }
      if (!this.shadow.innerHTML) {
        const { xoInnerWidth } = this.getOptions();
        this.shadow.innerHTML = `<${WebComponent.ParallaxHoverInner} part="inner" style="display: block; width: ${xoInnerWidth}"><slot></slot></${WebComponent.ParallaxHoverInner}>`;
      }
      this.handleParallax(1 / 60 * 1e3);
      this.providerEl.addEventListener("mousemove", this.handleMouseMove);
      this.providerEl.addEventListener("mouseleave", this.handleMouseLeave);
    }
    disconnectedCallback() {
      var _a2, _b2;
      frameManager$1.remove(this.handleFrameSyncUpdate);
      (_a2 = this.providerEl) == null ? void 0 : _a2.removeEventListener("mousemove", this.handleMouseMove);
      (_b2 = this.providerEl) == null ? void 0 : _b2.removeEventListener("mouseleave", this.handleMouseLeave);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if ((name === "xo-observed" || name === "xo-strength" || name === "xo-reset-position" || name === "xo-3d" || name === "xo-inner-width") && oldValue !== newValue) {
        await delay(100);
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }
  };
  let ParallaxHover = _ParallaxHover;
  __publicField(ParallaxHover, "defaultOptions", {
    xoStrength: 100,
    xoResetPosition: true,
    xo3d: false,
    xoInnerWidth: "fit-content"
  });
  const styles$n = "";
  componentDefine({
    [WebComponent.ParallaxScroll]: ParallaxScroll,
    [WebComponent.ParallaxHover]: ParallaxHover
  });
  function createState$4() {
    xoStore.create("xo-carousel", {
      initialState: {},
      useDeepEqual: true
    });
  }
  function setOptions(name, options) {
    xoStore.set("xo-carousel", (prevState) => {
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          options
        }
      };
    });
  }
  function setThumbnailOptions(name, thumbnailOptions) {
    xoStore.set("xo-carousel", (prevState) => {
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          thumbnailOptions
        }
      };
    });
  }
  function setContainerSize(name, width, height) {
    xoStore.set("xo-carousel", (prevState) => {
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          containerWidth: width,
          containerHeight: height
        }
      };
    });
  }
  function setSlideLength(name, slideLength) {
    xoStore.set("xo-carousel", (prevState) => {
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          slideLength
        }
      };
    });
  }
  function nextSlide(names, next2) {
    each(names, (name) => {
      xoStore.set("xo-carousel", (prevState) => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2;
        const slideLength = (_b2 = (_a2 = prevState[name]) == null ? void 0 : _a2.slideLength) != null ? _b2 : 0;
        const perView = (_e2 = (_d2 = (_c2 = prevState[name]) == null ? void 0 : _c2.options) == null ? void 0 : _d2.xoPerView) != null ? _e2 : 0;
        const rewind = (_h2 = (_g2 = (_f2 = prevState[name]) == null ? void 0 : _f2.options) == null ? void 0 : _g2.xoRewind) != null ? _h2 : false;
        const loopFade = ((_k2 = (_j2 = (_i2 = prevState[name]) == null ? void 0 : _i2.options) == null ? void 0 : _j2.xoLoop) != null ? _k2 : false) && ((_m2 = (_l2 = prevState[name]) == null ? void 0 : _l2.options) == null ? void 0 : _m2.xoType) !== "slide";
        const prevActiveIndex = (_o2 = (_n2 = prevState[name]) == null ? void 0 : _n2.activeIndex) != null ? _o2 : 0;
        const prevThumbnailActiveIndex = (_q2 = (_p2 = prevState[name]) == null ? void 0 : _p2.thumbnailActiveIndex) != null ? _q2 : 0;
        let activeIndex = loopFade ? wrapAroundRange(prevActiveIndex + next2, 0, slideLength - perView) : clamp(prevActiveIndex + next2, 0, slideLength - perView);
        let thumbnailActiveIndex = clamp(prevThumbnailActiveIndex + next2, 0, slideLength - 1);
        if (rewind && prevActiveIndex === slideLength - perView) {
          activeIndex = 0;
        }
        if (rewind && prevThumbnailActiveIndex === slideLength - 1) {
          thumbnailActiveIndex = 0;
        }
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            activeIndex,
            thumbnailActiveIndex,
            useAnimated: true,
            timestamp: Date.now()
          }
        };
      })("xo-carousel/nextSlide");
    });
  }
  function prevSlide(names, prev2) {
    each(names, (name) => {
      xoStore.set("xo-carousel", (prevState) => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2;
        const perView = (_c2 = (_b2 = (_a2 = prevState[name]) == null ? void 0 : _a2.options) == null ? void 0 : _b2.xoPerView) != null ? _c2 : 0;
        const slideLength = (_e2 = (_d2 = prevState[name]) == null ? void 0 : _d2.slideLength) != null ? _e2 : perView;
        const prevActiveIndex = (_g2 = (_f2 = prevState[name]) == null ? void 0 : _f2.activeIndex) != null ? _g2 : 0;
        const rewind = (_j2 = (_i2 = (_h2 = prevState[name]) == null ? void 0 : _h2.options) == null ? void 0 : _i2.xoRewind) != null ? _j2 : false;
        const loopFade = ((_m2 = (_l2 = (_k2 = prevState[name]) == null ? void 0 : _k2.options) == null ? void 0 : _l2.xoLoop) != null ? _m2 : false) && ((_o2 = (_n2 = prevState[name]) == null ? void 0 : _n2.options) == null ? void 0 : _o2.xoType) !== "slide";
        let activeIndex = loopFade ? wrapAroundRange(prevActiveIndex - prev2, 0, slideLength - perView) : Math.max(prevActiveIndex - prev2, 0);
        if (rewind && prevActiveIndex === 0) {
          activeIndex = slideLength - perView;
        }
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            activeIndex,
            thumbnailActiveIndex: activeIndex,
            useAnimated: true,
            timestamp: Date.now()
          }
        };
      })("xo-carousel/prevSlide");
    });
  }
  function goToSlide(names, index, useAnimated) {
    each(names, (name) => {
      xoStore.set("xo-carousel", (prevState) => {
        var _a2, _b2, _c2, _d2, _e2;
        const perView = (_c2 = (_b2 = (_a2 = prevState[name]) == null ? void 0 : _a2.options) == null ? void 0 : _b2.xoPerView) != null ? _c2 : 0;
        const slideLength = (_e2 = (_d2 = prevState[name]) == null ? void 0 : _d2.slideLength) != null ? _e2 : perView;
        let activeIndex = clamp(index, 0, slideLength - perView);
        let thumbnailActiveIndex = clamp(index, 0, slideLength - 1);
        return {
          ...prevState,
          [name]: {
            ...prevState[name],
            activeIndex,
            thumbnailActiveIndex,
            useAnimated,
            timestamp: Date.now()
          }
        };
      })("xo-carousel/goToSlide");
    });
  }
  function getState$3(name) {
    var _a2;
    return {
      ...{ activeIndex: 0, thumbnailActiveIndex: 0 },
      ...(_a2 = xoStore.get("xo-carousel")) == null ? void 0 : _a2[name]
    };
  }
  function subscribe$4(name, listener, equalParam) {
    return xoStore.subscribe("xo-carousel", (state) => listener(state[name]), (prevState, nextState) => {
      if (equalParam) {
        return equalParam(prevState, nextState);
      }
      return equal(prevState == null ? void 0 : prevState[name], nextState == null ? void 0 : nextState[name]);
    });
  }
  const publicMethod = {
    next: (name, next2) => nextSlide([name], next2),
    prev: (name, next2) => prevSlide([name], next2),
    goTo: (name, index) => {
      const { options } = getState$3(name);
      let activeIndex = index;
      if (options.xoLoop) {
        activeIndex = index + options.xoPerView * 2;
      }
      goToSlide([name], activeIndex, true);
    }
  };
  const publicEvent = {
    init: (el, options) => {
      el.dispatchEvent(new CustomEvent("xo:carousel:init", { bubbles: false, detail: options }));
    },
    change: (el, activeIndex) => {
      el.dispatchEvent(new CustomEvent("xo:carousel:change", { bubbles: false, detail: { activeIndex } }));
    },
    destroy: (el) => {
      el.dispatchEvent(new CustomEvent("xo:carousel:destroy", { bubbles: false }));
    },
    resize: (el, width, height) => {
      el.dispatchEvent(new CustomEvent("xo:carousel:resize", { bubbles: false, detail: { width, height } }));
    }
  };
  const RESIZE_DELAY$3 = window.navigator.hardwareConcurrency === 4 ? 1e3 : 500;
  function getOuterHeight(el) {
    const height = el.offsetHeight;
    const style = getComputedStyle(el);
    const marginTop = parseInt(style.marginTop || "0", 10);
    const marginBottom = parseInt(style.marginBottom || "0", 10);
    const { boxShadow } = window.getComputedStyle(el);
    const [_, one, two] = boxShadow.split(" ").reverse();
    const boxShadowNum = parseInt(one || "0", 10) + parseInt(two || "0", 10);
    return height + marginTop + marginBottom + boxShadowNum;
  }
  function fixPopoverClone(el) {
    const popoverEls = Array.from(el.querySelectorAll(`${WebComponent.Popover}, ${WebComponent.PopoverTrigger}`));
    each(popoverEls, (popoverEl) => {
      const name = popoverEl.getAttribute("xo-name");
      popoverEl.setAttribute("xo-name", `${name}-${Date.now()}`);
    });
  }
  function cloneSlides(el, xoPerView) {
    const slideEls = Array.from(el.children);
    const fistSlideEls = [...slideEls.slice(0, xoPerView * 2), ...slideEls.slice(0, xoPerView * 2)];
    const lastSlideEls = [...slideEls.slice(-xoPerView * 2), ...slideEls.slice(-xoPerView * 2)];
    each(fistSlideEls, (slideEl, index) => {
      const isSlide = slideEl.tagName.toLowerCase() === WebComponent.CarouselSlide || slideEl.hasAttribute(WebComponent.CarouselSlide);
      if (index < xoPerView * 2 && isSlide) {
        const cloneEl = slideEl.cloneNode(true);
        cloneEl.removeAttribute("xo-active");
        cloneEl.removeAttribute("xo-center");
        cloneEl.removeAttribute("xo-next");
        cloneEl.removeAttribute("xo-prev");
        removeColorSchemeAddedAttr(cloneEl);
        attrBoolean.set(cloneEl, "xo-cloned", true);
        fixPopoverClone(cloneEl);
        el.appendChild(cloneEl);
      }
    });
    each(lastSlideEls, (slideEl, index) => {
      const isSlide = slideEl.tagName.toLowerCase() === WebComponent.CarouselSlide || slideEl.hasAttribute(WebComponent.CarouselSlide);
      if (index >= lastSlideEls.length - xoPerView * 2 && isSlide) {
        const cloneEl = slideEl.cloneNode(true);
        cloneEl.removeAttribute("xo-active");
        cloneEl.removeAttribute("xo-visible");
        removeColorSchemeAddedAttr(cloneEl);
        attrBoolean.set(cloneEl, "xo-cloned", true);
        fixPopoverClone(cloneEl);
        el.insertBefore(cloneEl, slideEls[0]);
      }
    });
  }
  let navLast = 0;
  function setNavLast(now) {
    navLast = now;
  }
  function getNavLast() {
    return navLast;
  }
  function getNames(el) {
    if (el.options.xoSyncId) {
      const els = Array.from(document.querySelectorAll(`${WebComponent.Carousel}[xo-sync-id="${el.options.xoSyncId}"]`));
      return els.map((el2) => el2.xoName);
    }
    return [el.xoName];
  }
  function getProviderElement(el) {
    var _a2;
    const carousel = el.closest(WebComponent.Carousel);
    if (!carousel) {
      const sectionId = ((_a2 = el.closest("[xo-section-id]")) == null ? void 0 : _a2.getAttribute("xo-section-id")) || getShopifySectionId(el);
      if (sectionId) {
        const carousel2 = document.querySelector(`${WebComponent.Carousel}[xo-name=${sectionId}]`);
        return carousel2;
      }
      return null;
    }
    return carousel;
  }
  function getShaderSvg() {
    return `
    <svg id="xo-carousel-filter" class="xo-hidden">
      <filter id="xo-carousel-filter-wind" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
        <feDisplacementMap in="SourceGraphic" in2="blurred" scale="50" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  `;
  }
  const masks = {
    nature: "https://raw.githubusercontent.com/long-hp/storage/main/nature-sprite.png",
    water: "https://raw.githubusercontent.com/long-hp/storage/main/nature-sprite-2.png",
    urban: "https://raw.githubusercontent.com/long-hp/storage/main/urban-sprite.png"
  };
  let id$1 = 0;
  const _Carousel = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "xoName");
      __publicField(this, "_options");
      __publicField(this, "prevActiveIndex", -1);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "resizeObserver", null);
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "timeId1", -1);
      __publicField(this, "timeId2", -1);
      __publicField(this, "debounce", createDebounce());
      __publicField(this, "setOptions", () => {
        var _a2;
        this.options = getAttrs(this, {
          pick: [
            "xoName",
            "xoActiveIndex",
            "xoPerView",
            "xoPerMove",
            "xoGap",
            "xoSpeed",
            "xoEasing",
            "xoOverflow",
            "xoVertical",
            "xoAutoplay",
            "xoHoverPause",
            "xoRewind",
            "xoRtl",
            "xoBreakpoints",
            "xoRenderBullet",
            "xoAutoheight",
            "xoType",
            "xoLoop",
            "xoColumnWidth",
            "xoSnake",
            "xoStopAutoplayOnInteraction",
            "xoProgress",
            "xoSyncId",
            "xoDragable"
          ],
          types: {
            xoName: "string",
            xoActiveIndex: "number",
            xoPerView: "number",
            xoPerMove: "number",
            xoGap: "number",
            xoSpeed: "number",
            xoEasing: "string",
            xoOverflow: "string",
            xoVertical: "boolean",
            xoAutoplay: "number",
            xoHoverPause: "boolean",
            xoRewind: "boolean",
            xoRtl: "boolean",
            xoBreakpoints: "object",
            xoRenderBullet: "string",
            xoAutoheight: "boolean",
            xoType: "string",
            xoLoop: "boolean",
            xoColumnWidth: "number",
            xoSnake: "boolean",
            xoStopAutoplayOnInteraction: "boolean",
            xoProgress: "boolean",
            xoSyncId: "string",
            xoDragable: "boolean"
          }
        });
        if (((_a2 = { "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true }) == null ? void 0 : _a2.VITE_BUILD_MODE) === "xoSections") {
          this.options = { ...this.options, xoAutoplay: 0, xoLoop: false };
        }
      });
      __publicField(this, "setOptionsForStore", () => {
        var _a2, _b2, _c2, _d2, _e2, _f2;
        const { xoBreakpoints, xoPerView, xoPerMove, xoGap, xoOverflow, xoType, xoColumnWidth, xoSnake, xoVertical, xoActiveIndex } = this.options;
        const breakpointOptions = getBreakpointsOptions(xoBreakpoints);
        const isSlide = xoType === "slide";
        const hasThumbnail = !!this.querySelector(WebComponent.CarouselThumbnail);
        const innerEl = this.querySelector(WebComponent.CarouselInner);
        let options = {
          ...this.options,
          xoPerView: isSlide ? (_a2 = breakpointOptions == null ? void 0 : breakpointOptions.perView) != null ? _a2 : xoPerView : 1,
          xoPerMove: isSlide ? (_b2 = breakpointOptions == null ? void 0 : breakpointOptions.perMove) != null ? _b2 : Math.min(xoPerMove, xoPerView) : 1,
          xoGap: isSlide ? (_c2 = breakpointOptions == null ? void 0 : breakpointOptions.gap) != null ? _c2 : xoGap : 0,
          xoAutoheight: isSlide ? this.options.xoAutoheight : true,
          xoOverflow: (_d2 = breakpointOptions == null ? void 0 : breakpointOptions.overflow) != null ? _d2 : xoOverflow,
          xoVertical: (_e2 = breakpointOptions == null ? void 0 : breakpointOptions.vertical) != null ? _e2 : xoVertical,
          xoActiveIndex: (_f2 = breakpointOptions == null ? void 0 : breakpointOptions.activeIndex) != null ? _f2 : xoActiveIndex,
          xoRewind: this.options.xoRewind,
          xoLoop: hasThumbnail ? false : this.options.xoLoop
        };
        if (options.xoPerView && options.xoLoop && innerEl) {
          const slideLength = Array.from(innerEl.querySelector(WebComponent.CarouselList).children).length;
          if (slideLength <= options.xoPerView) {
            options = {
              ...options,
              xoLoop: false
            };
          }
        }
        if (!!xoColumnWidth) {
          const hasPerview = this.hasAttribute("xo-per-view");
          const temp = Math.floor((this.offsetWidth + xoGap) / (xoColumnWidth + xoGap));
          const perView = hasPerview ? Math.min(xoPerView, temp) : temp;
          options = {
            ...options,
            xoPerView: perView,
            xoPerMove: Math.min(perView, xoPerMove)
          };
        }
        if (xoSnake) {
          options = {
            ...options,
            xoPerMove: options.xoPerView
          };
        }
        setOptions(this.xoName, options);
        this.style.setProperty("--xo-per-view", `${options.xoPerView}`);
        this.style.setProperty("--xo-gap", `${options.xoGap}px`);
        this.style.setProperty("--xo-speed", `${options.xoSpeed}ms`);
        let loopLength = 0;
        if (options.xoLoop && options.xoType === "slide") {
          loopLength = options.xoPerView * 4;
        }
        if (innerEl) {
          setSlideLength(this.xoName, Array.from(innerEl.querySelector(WebComponent.CarouselList).children).filter((el) => !el.hasAttribute("xo-cloned")).length + loopLength);
          if (options.xoOverflow === "visible") {
            innerEl.style.overflow = "visible";
          } else {
            innerEl.style.overflow = "hidden";
          }
        }
        goToSlide(getNames(this), options.xoActiveIndex + (options.xoLoop && options.xoType === "slide" ? xoPerView * 2 : 0), true);
      });
      __publicField(this, "beautyBreakpoints", () => {
        const breakpointsAttr = this.getAttribute("xo-breakpoints");
        if (breakpointsAttr) {
          this.setAttribute("xo-breakpoints", breakpointsAttr.replace(/\s+/g, " ").trim());
        }
      });
      __publicField(this, "handleShader", async (isNext) => {
        const el = this.querySelector(WebComponent.CarouselFilterEffect);
        if (el) {
          const { xoSpeed } = this.options;
          clearTimeout(this.timeId1);
          clearTimeout(this.timeId2);
          el.removeAttribute("xo-effect");
          this.timeId1 = window.setTimeout(() => {
            el.setAttribute("xo-effect", isNext ? "next" : "prev");
            this.timeId2 = window.setTimeout(() => {
              el.removeAttribute("xo-effect");
            }, xoSpeed);
          }, 0);
        }
      });
      __publicField(this, "addShaderSvg", () => {
        const { xoType } = this.options;
        const innerEl = this.querySelector(WebComponent.CarouselInner);
        const isShader = /wind/g.test(xoType);
        if (isShader && !(innerEl == null ? void 0 : innerEl.querySelector(WebComponent.CarouselFilterEffect))) {
          const filterEl = document.createElement(WebComponent.CarouselFilterEffect);
          filterEl.style.setProperty("backdrop-filter", `url('#xo-carousel-filter-${xoType}')`);
          filterEl.setAttribute("xo-type", xoType);
          innerEl == null ? void 0 : innerEl.appendChild(filterEl);
        }
        if (isShader && !document.querySelector("#xo-carousel-filter")) {
          document.body.insertAdjacentHTML("beforeend", getShaderSvg());
        }
      });
      __publicField(this, "handleIntersection", (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            const { xoType } = this.options;
            if (["nature", "water", "urban"].includes(xoType)) {
              attrBoolean.set(this, "xo-mask-initialized", true);
              this.style.setProperty("--xo-mask", `url('${masks[xoType]}')`);
            }
          }
        }
      });
      __publicField(this, "init", () => {
        this.setOptionsForStore();
        this.addShaderSvg();
        publicEvent.init(this, this.options);
      });
      __publicField(this, "handleResize", this.debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          const currentHeight = entry.contentRect.height;
          if (currentWidth !== this.prevWidth) {
            this.init();
            this.prevWidth = currentWidth;
            publicEvent.resize(this, currentWidth, currentHeight);
          }
        }
      }, RESIZE_DELAY$3));
      __publicField(this, "renderNavigation", () => {
        var _a2, _b2, _c2;
        const sectionId = ((_a2 = this.closest("[xo-section-id]")) == null ? void 0 : _a2.getAttribute("xo-section-id")) || getShopifySectionId(this);
        if (this.getAttribute("xo-name") === sectionId) {
          const sectionEl = this.closest(".shopify-section");
          const prevHtml = (_b2 = sectionEl == null ? void 0 : sectionEl.querySelector(`template[${WebComponent.CarouselPrev}]`)) == null ? void 0 : _b2.innerHTML;
          const nextHtml = (_c2 = sectionEl == null ? void 0 : sectionEl.querySelector(`template[${WebComponent.CarouselNext}]`)) == null ? void 0 : _c2.innerHTML;
          const oldPrevEl = this.querySelector(WebComponent.CarouselPrev);
          const oldNextEl = this.querySelector(WebComponent.CarouselNext);
          oldPrevEl == null ? void 0 : oldPrevEl.remove();
          oldNextEl == null ? void 0 : oldNextEl.remove();
          if (prevHtml) {
            this.insertAdjacentHTML("beforeend", prevHtml);
          }
          if (nextHtml) {
            this.insertAdjacentHTML("beforeend", nextHtml);
          }
        }
      });
      id$1++;
      this.setOptions();
      if (this.options.xoName) {
        this.xoName = this.options.xoName;
      } else {
        this.xoName = `carousel-${id$1}`;
      }
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get options() {
      return {
        ..._Carousel.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    connectedCallback() {
      var _a2;
      this.setOptions();
      if (((_a2 = { "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true }) == null ? void 0 : _a2.VITE_BUILD_MODE) === "xoSections") {
        if (this.options.xoName) {
          this.xoName = this.options.xoName;
        }
      }
      this.init();
      this.renderNavigation();
      this.beautyBreakpoints();
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this);
      this.intersectionObserver = new IntersectionObserver(this.handleIntersection, { rootMargin: "0px 0px -50px 0px" });
      this.intersectionObserver.observe(this);
      this.unsubscribe = subscribe$4(this.xoName, ({ options, slideLength, activeIndex }) => {
        if (this.prevActiveIndex !== activeIndex) {
          const realSlideLength = options.xoLoop && options.xoType === "slide" ? slideLength - options.xoPerView * 4 : slideLength;
          const _activeIndex = options.xoLoop && options.xoType === "slide" ? Math.min(Math.max(activeIndex - options.xoPerView * 2, 0), realSlideLength - options.xoPerView) : activeIndex;
          const paginationProgress = interpolate({
            value: _activeIndex,
            inputRange: [0, realSlideLength - options.xoPerView],
            outputRange: [0, 100]
          });
          const progressEls = [
            ...Array.from(document.querySelectorAll(`${WebComponent.CarouselPaginationProgress}[xo-name="${this.xoName}"]`)),
            ...Array.from(this.querySelectorAll(WebComponent.CarouselPaginationProgress))
          ];
          each(progressEls, (progressEl) => {
            progressEl.style.setProperty("--xo-pagination-progress", `${paginationProgress}%`);
          });
          this.style.setProperty("--xo-pagination-progress", `${paginationProgress}%`);
          if (options.xoAutoplay && options.xoProgress) {
            this.animated.off();
            this.animated({
              from: 0,
              to: 100,
              duration: options.xoAutoplay,
              onUpdate: (value) => {
                this.style.setProperty("--xo-autoplay-progress", `${value}%`);
              }
            });
          }
          this.handleShader(activeIndex > this.prevActiveIndex);
          this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { activeIndex: _activeIndex } }));
          this.prevActiveIndex = activeIndex;
        }
      });
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        if (window.xbEditor) {
          this.cancel = await delay(50);
        }
        this.setOptions();
        this.setOptionsForStore();
        const listEls = Array.from(this.querySelectorAll(WebComponent.CarouselList));
        each(listEls, (listEl) => {
          if (!listEl.closest(WebComponent.CarouselThumbnail)) {
            listEl.setAttribute("xo-observed", newValue);
          }
        });
      }
    }
    disconnectedCallback() {
      var _a2, _b2;
      this.unsubscribe();
      this.animated.off();
      (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
      (_b2 = this.intersectionObserver) == null ? void 0 : _b2.disconnect();
      publicEvent.destroy(this);
      this.cancel();
      clearTimeout(this.timeId1);
      clearTimeout(this.timeId2);
      this.debounce.cancel();
    }
  };
  let Carousel = _Carousel;
  __publicField(Carousel, "defaultOptions", {
    xoName: "",
    xoActiveIndex: 0,
    xoPerView: 1,
    xoPerMove: 1,
    xoGap: 20,
    xoSpeed: 200,
    xoEasing: "easeOutQuad",
    xoOverflow: "hidden",
    xoVertical: false,
    xoAutoplay: 0,
    xoHoverPause: true,
    xoRewind: false,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    xoRenderBullet: "<span></span>",
    xoBreakpoints: {},
    xoAutoheight: false,
    xoType: "slide",
    xoLoop: false,
    xoColumnWidth: 0,
    xoSnake: false,
    xoStopAutoplayOnInteraction: false,
    xoProgress: false,
    xoSyncId: "",
    xoDragable: true
  });
  const _CarouselThumbnail = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "_options");
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "debounce", createDebounce());
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoPerView", "xoPerMove", "xoGap", "xoBreakpoints", "xoVertical"],
          types: {
            xoPerView: "number",
            xoPerMove: "number",
            xoGap: "number",
            xoBreakpoints: "object",
            xoVertical: "boolean"
          }
        });
      });
      __publicField(this, "setOptionsForStore", async () => {
        var _a2, _b2, _c2, _d2;
        const { xoBreakpoints, xoPerView, xoPerMove, xoGap, xoVertical } = this.options;
        const breakpointOptions = getBreakpointsOptions(xoBreakpoints);
        const options = {
          ...this.options,
          xoPerView: (_a2 = breakpointOptions == null ? void 0 : breakpointOptions.perView) != null ? _a2 : xoPerView,
          xoPerMove: (_b2 = breakpointOptions == null ? void 0 : breakpointOptions.perMove) != null ? _b2 : Math.min(xoPerMove, xoPerView),
          xoGap: (_c2 = breakpointOptions == null ? void 0 : breakpointOptions.gap) != null ? _c2 : xoGap,
          xoVertical: (_d2 = breakpointOptions == null ? void 0 : breakpointOptions.vertical) != null ? _d2 : xoVertical
        };
        this.style.setProperty("--xo-per-view", `${options.xoPerView}`);
        this.style.setProperty("--xo-gap", `${options.xoGap}px`);
        await delay(50);
        const carouselEl = this.getProviderElement();
        if (carouselEl) {
          const { xoName } = carouselEl;
          setThumbnailOptions(xoName, options);
        }
      });
      __publicField(this, "handleResize", this.debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            this.setOptionsForStore();
            this.prevWidth = currentWidth;
          }
        }
      }, RESIZE_DELAY$3));
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getProviderElement() {
      return this.closest(WebComponent.Carousel);
    }
    get options() {
      return {
        ..._CarouselThumbnail.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    async connectedCallback() {
      this.setOptions();
      this.setOptionsForStore();
      this.cancel = await delay(50);
      const providerElement = this.getProviderElement();
      if (!providerElement) {
        return;
      }
      this.prevWidth = providerElement.clientWidth;
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(providerElement);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        this.setOptions();
        this.setOptionsForStore();
      }
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
      this.cancel();
      this.debounce.cancel();
    }
  };
  let CarouselThumbnail = _CarouselThumbnail;
  __publicField(CarouselThumbnail, "defaultOptions", {
    xoPerView: 5,
    xoPerMove: 1,
    xoGap: 10,
    xoBreakpoints: {},
    xoVertical: false
  });
  const Axis$1 = {
    Idle: "idle",
    Target: "target",
    Lock: "lock"
  };
  class CarouselList extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "isThumbMoving", false);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "animated", createAnimate());
      __publicField(this, "thumbAnimated", createAnimate());
      __publicField(this, "snakeAnimated", createAnimate());
      __publicField(this, "prevTranslate", 0);
      __publicField(this, "prevThumbTranslate", 0);
      __publicField(this, "axis", Axis$1.Idle);
      __publicField(this, "pan", null);
      __publicField(this, "thumbPan", null);
      __publicField(this, "dEnd", 0);
      __publicField(this, "prevDx", null);
      __publicField(this, "prevDy", null);
      __publicField(this, "prevThumbDx", null);
      __publicField(this, "prevThumbDy", null);
      __publicField(this, "isMove", false);
      __publicField(this, "timeoutId", -1);
      __publicField(this, "anchorEls", []);
      __publicField(this, "_options");
      __publicField(this, "initialized", false);
      __publicField(this, "prevScrollY", -1);
      __publicField(this, "startClientX", 0);
      __publicField(this, "isNextForSnake", false);
      __publicField(this, "isSnakeUpdated", false);
      __publicField(this, "resizeObserver", null);
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "providerIntersectionObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "wheelEndTimeId", -1);
      __publicField(this, "wheelStarting", false);
      __publicField(this, "isHorizontalSwipeState");
      __publicField(this, "prevActiveIndex", null);
      __publicField(this, "debounce", createDebounce());
      __publicField(this, "debounce2", createDebounce());
      __publicField(this, "intervalId", -1);
      __publicField(this, "autoplayReady", false);
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "setOptions", () => {
        const { options, thumbnailOptions } = getState$3(this.providerElement.xoName);
        if (this.isThumbnail) {
          this.options = {
            ...options,
            ...thumbnailOptions
          };
        } else {
          this.options = options;
        }
      });
      __publicField(this, "withRtl", (value) => {
        return this.options.xoRtl ? value * -1 : value;
      });
      __publicField(this, "setTranslate", (value) => {
        if (this.providerElement && !isNaN(value)) {
          const { xoType, xoVertical } = this.options;
          if (xoType === "slide") {
            if (xoVertical) {
              this.style.transform = `translate3d(0, ${value}px, 0)`;
            } else {
              this.style.transform = `translate3d(${this.withRtl(value)}px, 0, 0)`;
            }
          }
        }
      });
      __publicField(this, "handleSlide", (speed) => {
        if (!this.providerElement) {
          return;
        }
        const { options, activeIndex } = this;
        const { slideLength } = getState$3(this.providerElement.xoName);
        const lastIndex = this.isThumbnail ? slideLength : slideLength - options.xoPerView;
        const extra = this.isThumbnail ? Math.floor(options.xoPerView / 2) : 0;
        const remaining = this.isThumbnail ? options.xoPerView - extra : 0;
        const activeIndexClamp = this.isThumbnail ? clamp(activeIndex, extra, lastIndex - remaining) : activeIndex;
        const cond = activeIndexClamp <= lastIndex - remaining;
        if (cond) {
          const index = this.isThumbnail ? clamp(activeIndexClamp - extra, 0, lastIndex) : activeIndex;
          const translate = slideLength > options.xoPerView ? -index * this.slideSize : 0;
          if (options.xoType === "slide") {
            this.animated({
              from: this.isThumbnail ? this.prevThumbTranslate : this.prevTranslate,
              to: translate,
              duration: speed,
              easing: easings[options.xoEasing],
              onUpdate: this.setTranslate,
              onEnd: (value) => {
                attrBoolean.set(this, "xo-dragging", false);
                if (this.pan) {
                  if (options.xoVertical) {
                    this.pan.setValue({ dy: value });
                  } else {
                    this.pan.setValue({ dx: this.withRtl(value) });
                  }
                }
                if (this.thumbPan) {
                  if (options.xoVertical) {
                    this.thumbPan.setValue({ dy: value });
                  } else {
                    this.thumbPan.setValue({ dx: this.withRtl(value) });
                  }
                }
                if (this.isThumbnail) {
                  this.prevThumbTranslate = value;
                } else {
                  this.prevTranslate = value;
                }
                if (options.xoLoop) {
                  const indexLoop = index - options.xoPerView * 2;
                  const names = getNames(this.providerElement);
                  if (indexLoop <= options.xoPerView * -1) {
                    const nextIndex = lastIndex - (options.xoPerView * 2 + options.xoPerView * -1 - indexLoop);
                    goToSlide(names, nextIndex, false);
                  } else if (indexLoop >= lastIndex - options.xoPerView * 3) {
                    const nextIndex = options.xoPerView * 2 + indexLoop - (lastIndex - options.xoPerView * 3);
                    goToSlide(names, nextIndex, false);
                  }
                }
              }
            });
          } else {
            attrBoolean.set(this, "xo-dragging", false);
          }
          this.handleActiveSlide(index);
        }
      });
      __publicField(this, "handleSnake", () => {
        const { activeIndex, options } = getState$3(this.providerElement.xoName);
        const { xoSpeed, xoEasing, xoPerView } = options;
        this.snakeAnimated({
          from: 0,
          to: 1,
          duration: xoSpeed,
          easing: easings[xoEasing],
          onUpdate: (value) => {
            const x = interpolate({
              value,
              inputRange: [0, 0.5, 1],
              outputRange: [0, 15, 0]
            });
            this.style.gap = `${x}rem`;
            if (this.isNextForSnake) {
              this.style.marginLeft = `-${x * activeIndex}rem`;
            } else {
              this.style.marginLeft = `-${x * (activeIndex + xoPerView - 1)}rem`;
            }
            this.isSnakeUpdated = true;
          },
          onEnd: () => {
            this.isSnakeUpdated = false;
          }
        });
      });
      __publicField(this, "listener", () => {
        if (this.initialized) {
          const { xoSpeed, xoSnake, xoPerView, xoLoop, xoType } = this.options;
          const { useAnimated } = getState$3(this.providerElement.xoName);
          this.handleSlide(useAnimated ? xoSpeed : 0);
          if (!this.isSnakeUpdated && xoSnake) {
            this.handleSnake();
          }
          if (this.providerElement) {
            const activeIndex = xoLoop && xoType === "slide" ? this.activeIndex - xoPerView * 2 : this.activeIndex;
            if (this.prevActiveIndex != null && activeIndex !== this.prevActiveIndex) {
              publicEvent.change(this.providerElement, activeIndex);
            }
            this.prevActiveIndex = activeIndex;
          }
        }
      });
      __publicField(this, "rubberBandClamp", (d) => {
        const { slideLength } = getState$3(this.providerElement.xoName);
        const listSize = this.slideSize * slideLength;
        return rubberBandClamp(this.getContainerSize() - listSize, 0, d, 0.2);
      });
      __publicField(this, "lockScroll", (isHorizontalSwipe) => {
        if (this.isHorizontalSwipeState == null) {
          this.isHorizontalSwipeState = isHorizontalSwipe;
        }
        const nextIsHorizontalSwipeState = isMobile.any ? this.isHorizontalSwipeState : true;
        return nextIsHorizontalSwipeState;
      });
      __publicField(this, "panMove", ({ dx, dy, vx, vy, isHorizontalSwipe }, event) => {
        const modelViewerEl = event.target.closest("model-viewer");
        if (modelViewerEl) {
          return;
        }
        const { options } = this;
        if (!options.xoVertical) {
          if (!this.lockScroll(isHorizontalSwipe)) {
            return;
          }
          event.preventDefault();
        }
        this.isMove = true;
        if (this.prevDx == null) {
          this.prevDx = -this.slideSize * this.activeIndex;
        }
        if (this.prevDy == null) {
          this.prevDy = 0;
        }
        if (options.xoVertical) {
          this.axis = Axis$1.Target;
        } else if (isMobile.any) {
          if (this.axis === Axis$1.Idle) {
            if (isHorizontalSwipe) {
              this.axis = Axis$1.Target;
            } else {
              this.axis = Axis$1.Lock;
            }
          }
        } else {
          this.axis = Axis$1.Target;
        }
        if (this.axis === Axis$1.Target) {
          if (isMobile.any) {
            if (window.scrollY !== this.prevScrollY && this.prevScrollY !== -1) {
              this.panEnd({ dx, dy, vx, vy }, event);
            }
          }
          const d = options.xoVertical ? dy : this.withRtl(dx);
          const translate = this.rubberBandClamp(d);
          if (options.xoSnake) {
            this.isNextForSnake = true;
          } else {
            this.setTranslate(translate);
          }
          this.prevTranslate = translate;
        } else {
          if (isMobile.any) {
            this.style.removeProperty("touch-action");
          }
        }
      });
      __publicField(this, "magnet", (value, min, max, constant, condition) => {
        return clamp(Math.round(value + (condition ? constant : -constant)), min, max);
      });
      __publicField(this, "panEnd", (gestureState, event) => {
        if (!this.providerElement) {
          return;
        }
        const { options } = this;
        if (options.xoSnake) {
          const clientX = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
          this.isNextForSnake = this.startClientX >= clientX;
          const names = getNames(this.providerElement);
          if (this.isNextForSnake) {
            nextSlide(names, options.xoPerMove);
          } else {
            prevSlide(names, options.xoPerMove);
          }
        } else {
          const { d, v } = this.getDxy(gestureState);
          const { slideLength, activeIndex } = getState$3(this.providerElement.xoName);
          const listSize = this.slideSize * slideLength;
          const lastIndex = slideLength - options.xoPerView;
          const threshold = options.xoPerView > 2 ? options.xoPerView : 1;
          const newD = v === 0 ? d : this.dEnd > d ? d - v * threshold : d + v * threshold;
          const isNext = (options.xoVertical ? gestureState.vy : gestureState.vx) < 0;
          const getIndex = () => {
            if (options.xoType === "slide") {
              return this.magnet(interpolate({
                value: newD,
                inputRange: [0, -listSize],
                outputRange: [0, slideLength]
              }), 0, lastIndex, 0.4, this.dEnd > d);
            }
            if (options.xoLoop) {
              return wrapAroundRange(isNext ? activeIndex + 1 : activeIndex - 1, 0, lastIndex);
            }
            return clamp(isNext ? activeIndex + 1 : activeIndex - 1, 0, lastIndex);
          };
          const index = getIndex();
          if (this.axis === Axis$1.Target) {
            const names = getNames(this.providerElement);
            goToSlide(names, index, true);
          }
          if (index > 0 && index <= lastIndex) {
            if (this.pan) {
              if (this.axis === Axis$1.Target) {
                if (options.xoVertical) {
                  const d2 = -index * this.slideSize;
                  this.pan.setValue({ dx: 0, dy: d2 });
                  this.dEnd = d2;
                  this.prevDx = 0;
                  this.prevDy = d2;
                } else {
                  const d2 = this.withRtl(-index * this.slideSize);
                  this.pan.setValue({ dx: d2, dy: 0 });
                  this.dEnd = d2;
                  this.prevDx = d2;
                  this.prevDy = 0;
                }
                this.handleAutoPlay();
              } else {
                this.pan.setValue({ dx: this.prevDx, dy: this.prevDy });
              }
            }
          } else if (index === 0) {
            if (this.pan) {
              this.pan.setValue({ dx: 0, dy: 0 });
              this.dEnd = 0;
              this.prevDx = 0;
              this.prevDy = 0;
              this.handleAutoPlay();
            }
          } else {
            this.animated({
              from: this.prevTranslate,
              to: -(slideLength - options.xoPerView) * this.slideSize,
              duration: options.xoSpeed,
              easing: easings[options.xoEasing],
              onUpdate: (value) => {
                this.handlePause();
                this.setTranslate(value);
              },
              onEnd: (value) => {
                if (this.pan) {
                  if (options.xoVertical) {
                    this.pan.setValue({ dx: 0, dy: value });
                    this.dEnd = value;
                    this.prevDx = 0;
                    this.prevDy = value;
                  } else {
                    this.pan.setValue({ dx: this.withRtl(value), dy: 0 });
                    this.dEnd = this.withRtl(value);
                    this.prevDx = this.withRtl(value);
                    this.prevDy = 0;
                  }
                  this.handleAutoPlay();
                }
                this.prevTranslate = value;
              }
            });
          }
          this.axis = Axis$1.Idle;
          clearTimeout(this.timeoutId);
          this.timeoutId = window.setTimeout(() => {
            this.style.removeProperty("touch-action");
          }, 300);
          this.prevScrollY = window.scrollY;
        }
      });
      __publicField(this, "thumbPanMove", ({ dx, dy, vx, vy, isHorizontalSwipe }, event) => {
        var _a2, _b2;
        const { options } = this;
        if (!options.xoVertical) {
          if (!this.lockScroll(isHorizontalSwipe)) {
            return;
          }
          event.preventDefault();
        }
        const { slideLength } = getState$3(this.providerElement.xoName);
        if (this.prevThumbDx == null) {
          this.prevThumbDx = -this.slideSize * this.activeIndex;
        }
        if (this.prevThumbDy == null) {
          this.prevThumbDy = 0;
        }
        if (options.xoVertical) {
          this.axis = Axis$1.Target;
        } else if (isMobile.any) {
          if (this.axis === Axis$1.Idle) {
            if (Math.abs(dx - this.prevThumbDx) > Math.abs(dy - this.prevThumbDy) * 2.5) {
              this.axis = Axis$1.Target;
            } else {
              this.axis = Axis$1.Lock;
            }
          }
        } else {
          this.axis = Axis$1.Target;
        }
        if (this.axis === Axis$1.Target) {
          this.isThumbMoving = true;
          if (isMobile.any) {
            if (window.scrollY !== this.prevScrollY) {
              this.thumbPanEnd({ dx, dy, vx, vy });
            }
          }
          const d = options.xoVertical ? dy : this.withRtl(dx);
          const translate = clamp(d, -this.slideSize * (slideLength - options.xoPerView), 0);
          this.setTranslate(translate);
          if (options.xoVertical) {
            (_a2 = this.thumbPan) == null ? void 0 : _a2.setValue({ dx: 0, dy: translate });
          } else {
            (_b2 = this.thumbPan) == null ? void 0 : _b2.setValue({ dx: translate, dy: 0 });
          }
          this.prevThumbTranslate = translate;
        }
      });
      __publicField(this, "thumbPanEnd", ({ vx, vy }) => {
        const { options } = this;
        const { slideLength } = getState$3(this.providerElement.xoName);
        const v = options.xoVertical ? vy : this.withRtl(vx);
        this.thumbAnimated({
          from: this.prevThumbTranslate,
          to: this.prevThumbTranslate + v * 10,
          duration: options.xoSpeed,
          easing: easings.easeOutQuad,
          onUpdate: (value) => {
            if (this.isThumbMoving) {
              const translate = clamp(value, -this.slideSize * (slideLength - options.xoPerView), 0);
              this.setTranslate(translate);
            }
          },
          onEnd: (value) => {
            const translate = clamp(value, -this.slideSize * (slideLength - options.xoPerView), 0);
            if (this.thumbPan && this.isThumbMoving) {
              if (options.xoVertical) {
                this.thumbPan.setValue({ dx: 0, dy: translate });
                this.prevThumbDx = 0;
                this.prevThumbDy = translate;
              } else {
                this.thumbPan.setValue({ dx: translate, dy: 0 });
                this.prevThumbDx = this.withRtl(translate);
                this.prevThumbDy = 0;
              }
            }
            this.axis = Axis$1.Idle;
            clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(() => {
              this.style.removeProperty("touch-action");
            }, 300);
            if (this.isThumbMoving) {
              this.prevThumbTranslate = translate;
            }
            this.isThumbMoving = false;
            this.prevScrollY = window.scrollY;
          }
        });
        this.isHorizontalSwipeState = void 0;
      });
      __publicField(this, "handlePause", () => {
        window.clearInterval(this.intervalId);
        this.autoplayReady = false;
      });
      __publicField(this, "handlePauseHover", () => {
        const { options } = this;
        if (options.xoHoverPause) {
          this.handlePause();
        }
      });
      __publicField(this, "handleAutoPlay", () => {
        if (this.providerElement && !this.isThumbnail && !this.autoplayReady) {
          const names = getNames(this.providerElement);
          const { options } = this;
          if (options.xoAutoplay <= 0) {
            return;
          }
          this.intervalId = window.setInterval(() => {
            nextSlide(names, options.xoPerMove);
          }, options.xoAutoplay);
          this.autoplayReady = true;
        }
      });
      __publicField(this, "handleActiveSlide", (indexForVisibleAttrr) => {
        let index = -1;
        let slideHeight = 0;
        const { options, activeIndex } = this;
        const { slideLength } = getState$3(this.providerElement.xoName);
        const _activeIndex = options.xoLoop && options.xoType === "slide" ? activeIndex - options.xoPerView * 2 : activeIndex;
        const visibleIndex = this.isThumbnail ? indexForVisibleAttrr != null ? indexForVisibleAttrr : _activeIndex : _activeIndex;
        const prevIndex = visibleIndex - 1;
        const nextIndex = visibleIndex + options.xoPerView;
        const slideEls = Array.from(this.querySelectorAll(`:scope > ${WebComponent.CarouselSlide}:not([xo-cloned]), :scope > [${WebComponent.CarouselSlide}]:not([xo-cloned])`));
        each(slideEls, async (childEl) => {
          index++;
          childEl.index = index;
          childEl.setAttribute("aria-label", `${index + 1} / ${options.xoLoop && options.xoType === "slide" ? slideLength - options.xoPerView * 4 : slideLength}`);
          childEl.setAttribute("role", "tabpanel");
          if (_activeIndex === index) {
            attrBoolean.set(childEl, "xo-active", true);
            bindingHelper(childEl, "xo-active-binding", true);
          } else {
            attrBoolean.set(childEl, "xo-active", false);
            bindingHelper(childEl, "xo-active-binding", false);
          }
          if (index === prevIndex) {
            attrBoolean.set(childEl, "xo-prev", true);
          } else {
            attrBoolean.set(childEl, "xo-prev", false);
          }
          if (index === nextIndex) {
            attrBoolean.set(childEl, "xo-next", true);
          } else {
            attrBoolean.set(childEl, "xo-next", false);
          }
          if (options.xoPerView % 2 === 1) {
            if (index >= visibleIndex + Math.floor(options.xoPerView / 2) && index < visibleIndex + Math.floor(options.xoPerView / 2) + 1) {
              attrBoolean.set(childEl, "xo-center", true);
            } else {
              attrBoolean.set(childEl, "xo-center", false);
            }
          }
          if (index >= visibleIndex && index < visibleIndex + options.xoPerView) {
            attrBoolean.set(childEl, "xo-visible", true);
            loadImages(Array.from(childEl.querySelectorAll("img")));
            if (options.xoAutoheight) {
              if (childEl.children[0] instanceof HTMLElement) {
                if (!indexForVisibleAttrr) {
                  await delay(500);
                }
                const childHeight = getOuterHeight(childEl.children[0]);
                if (slideHeight < childHeight) {
                  slideHeight = childHeight;
                  const innerEl = this.closest(WebComponent.CarouselInner);
                  const thumbInnerEl = innerEl == null ? void 0 : innerEl.closest(WebComponent.CarouselThumbnail);
                  if (innerEl && !thumbInnerEl) {
                    innerEl.style.height = `${slideHeight}px`;
                    innerEl.style.transition = `height ${options.xoSpeed}ms`;
                  }
                }
              }
            } else {
              const innerEl = this.closest(WebComponent.CarouselInner);
              if (innerEl && !options.xoVertical) {
                innerEl.style.removeProperty("height");
              }
            }
          } else {
            attrBoolean.set(childEl, "xo-visible", false);
          }
        });
      });
      __publicField(this, "setContainerSize", () => {
        if (this.parentElement) {
          setContainerSize(this.providerElement.xoName, this.parentElement.offsetWidth, this.parentElement.offsetHeight);
        }
      });
      __publicField(this, "handleResize", this.debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            this.disconnectedCallback();
            this.connectedCallback();
            this.prevWidth = currentWidth;
          }
        }
      }, RESIZE_DELAY$3));
      __publicField(this, "handleWindowResize", this.debounce2(resizeAxis("x", () => {
        const names = getNames(this.providerElement);
        goToSlide(names, 0, false);
      }), RESIZE_DELAY$3));
      __publicField(this, "handleIntersection", (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.handleActiveSlide();
          }
        }
      });
      __publicField(this, "handleProviderIntersection", (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.handleAutoPlay();
          } else {
            this.handlePause();
          }
        }
      });
      __publicField(this, "handleAnchor", (event) => {
        if (this.isMove) {
          event.preventDefault();
        }
      });
      __publicField(this, "bindAnchor", () => {
        this.anchorEls = Array.from(this.querySelectorAll("a"));
        each(this.anchorEls, (anchorEl) => {
          anchorEl.addEventListener("click", this.handleAnchor);
        });
      });
      __publicField(this, "handleLoop", () => {
        const { xoPerView, xoLoop, xoType } = this.options;
        if (!xoLoop) {
          return;
        }
        if (xoType !== "slide") {
          return;
        }
        cloneSlides(this, xoPerView);
      });
      __publicField(this, "removeSlideCloned", () => {
        each(Array.from(this.children), (slideEl) => {
          const isSlide = slideEl.localName === WebComponent.CarouselSlide || slideEl.hasAttribute(WebComponent.CarouselSlide);
          if (isSlide) {
            if (attrBoolean.get(slideEl, "xo-cloned")) {
              this.removeChild(slideEl);
            }
          }
        });
      });
      __publicField(this, "handleSlideClick", () => {
        if (this.options.xoStopAutoplayOnInteraction) {
          this.handlePause();
        }
      });
      __publicField(this, "handleWheel", (event) => {
        const { xoPerView, xoVertical } = this.options;
        if (xoVertical) {
          return;
        }
        if (!this.wheelStarting && Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          const names = getNames(this.providerElement);
          if (event.deltaX > 0) {
            nextSlide(names, xoPerView);
          } else {
            prevSlide(names, xoPerView);
          }
        }
        this.wheelStarting = true;
        clearTimeout(this.wheelEndTimeId);
        this.wheelEndTimeId = window.setTimeout(() => {
          this.wheelStarting = false;
        }, 50);
      });
      __publicField(this, "reset", () => {
        var _a2, _b2, _c2, _d2, _e2;
        this.unsubscribe();
        this.handlePause();
        this.removeSlideCloned();
        (_a2 = this.pan) == null ? void 0 : _a2.destroy();
        (_b2 = this.thumbPan) == null ? void 0 : _b2.destroy();
        this.cancel();
        clearTimeout(this.timeoutId);
        clearTimeout(this.wheelEndTimeId);
        this.animated.off();
        this.snakeAnimated.off();
        (_c2 = this.resizeObserver) == null ? void 0 : _c2.disconnect();
        (_d2 = this.intersectionObserver) == null ? void 0 : _d2.disconnect();
        (_e2 = this.providerIntersectionObserver) == null ? void 0 : _e2.disconnect();
        if (this.providerElement) {
          this.providerElement.removeEventListener("click", this.handleSlideClick);
          this.providerElement.removeEventListener("mouseenter", this.handlePauseHover);
          this.providerElement.removeEventListener("mouseleave", this.handleAutoPlay);
          this.providerElement.removeEventListener("touchstart", this.handlePauseHover);
          this.providerElement.removeEventListener("touchend", this.handleAutoPlay);
          this.providerElement.removeEventListener("wheel", this.handleWheel);
        }
        each(this.anchorEls, (anchorEl) => {
          anchorEl.removeEventListener("click", this.handleAnchor);
        });
        if (!isMobile.any) {
          window.removeEventListener("resize", this.handleWindowResize);
        }
        this.debounce.cancel();
        this.debounce2.cancel();
      });
    }
    get providerElement() {
      return this.closest(WebComponent.Carousel);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get slideSize() {
      const { slideLength } = getState$3(this.providerElement.xoName);
      if (this.options.xoVertical) {
        return this.scrollHeight / slideLength;
      }
      return this.scrollWidth / slideLength;
    }
    getContainerSize() {
      const { containerWidth, containerHeight } = getState$3(this.providerElement.xoName);
      if (this.options.xoVertical) {
        return containerHeight;
      }
      return containerWidth;
    }
    get isThumbnail() {
      const thumbnailEl = this.closest(WebComponent.CarouselThumbnail);
      return !!thumbnailEl;
    }
    get options() {
      return this._options;
    }
    set options(value) {
      this._options = value;
    }
    get activeIndex() {
      const { activeIndex, thumbnailActiveIndex } = getState$3(this.providerElement.xoName);
      if (this.isThumbnail) {
        return thumbnailActiveIndex;
      }
      return activeIndex;
    }
    getDxy({ dx, dy, vx, vy }) {
      if (this.options.xoVertical) {
        return { d: dy, v: Math.abs(vy) };
      }
      return { d: this.withRtl(dx), v: Math.abs(vx) };
    }
    async connectedCallback() {
      this.cancel = await delay(100);
      if (!this.providerElement) {
        return;
      }
      this.reset();
      this.setOptions();
      this.handleLoop();
      this.setContainerSize();
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.providerElement);
      if (!isMobile.any) {
        window.addEventListener("resize", this.handleWindowResize);
      }
      this.providerElement.addEventListener("click", this.handleSlideClick);
      const { options } = this;
      if (options.xoAutoheight) {
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection);
        this.intersectionObserver.observe(this);
      }
      if (options.xoAutoplay && !this.isThumbnail) {
        this.providerIntersectionObserver = new IntersectionObserver(this.handleProviderIntersection);
        this.providerIntersectionObserver.observe(this.providerElement);
      }
      this.handleSlide(0);
      if (this.isThumbnail) {
        this.thumbPan = panGesture({
          element: this,
          onStart: () => {
            this.style.touchAction = "none";
          },
          onMove: this.thumbPanMove,
          onEnd: this.thumbPanEnd
        });
      } else {
        const { slideLength } = getState$3(this.providerElement.xoName);
        if (slideLength <= options.xoPerView && !this.isThumbnail) {
          return;
        }
        this.pan = panGesture({
          element: this,
          onStart: (event) => {
            const modelViewerEl = event.target.closest("model-viewer");
            if (modelViewerEl) {
              return;
            }
            this.isMove = false;
            this.startClientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
            this.style.touchAction = "none";
            this.style.outline = "none";
            attrBoolean.set(this, "xo-dragging", true);
          },
          onMove: options.xoSnake || !options.xoDragable ? void 0 : this.panMove,
          onEnd: (gestureState, event) => {
            const nextEl = event.target.closest(WebComponent.CarouselNext);
            const prevEl = event.target.closest(WebComponent.CarouselPrev);
            if (nextEl || prevEl) {
              return;
            }
            const modelViewerEl = event.target.closest("model-viewer");
            if (modelViewerEl) {
              return;
            }
            this.panEnd(gestureState, event);
            this.isHorizontalSwipeState = void 0;
            if (this.axis !== Axis$1.Target && isMobile.any) {
              clearTimeout(this.timeoutId);
              this.timeoutId = window.setTimeout(() => {
                this.style.removeProperty("touch-action");
                this.style.outline = "1px solid transparent";
              }, 300);
            }
          }
        });
      }
      this.handleActiveSlide();
      this.bindAnchor();
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener);
      this.providerElement.addEventListener("mouseenter", this.handlePauseHover);
      this.providerElement.addEventListener("mouseleave", this.handleAutoPlay);
      if (isMobile.any) {
        this.providerElement.addEventListener("touchstart", this.handlePauseHover, { passive: false });
        this.providerElement.addEventListener("touchend", this.handleAutoPlay, { passive: false });
      }
      if (options.xoPerView !== 1 || !this.isThumbnail) {
        this.providerElement.addEventListener("wheel", this.handleWheel, { passive: false });
      }
      attrBoolean.set(this.providerElement, "xo-initialized", true);
      this.initialized = true;
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        await delay(100);
        this.connectedCallback();
      }
    }
    disconnectedCallback() {
      this.reset();
    }
  }
  class CarouselItem {
    constructor(el) {
      __publicField(this, "el");
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handleClick", () => {
        const { index } = this.el;
        const carouselListElement = this.el.closest(WebComponent.CarouselList);
        if (!(carouselListElement == null ? void 0 : carouselListElement.isThumbMoving)) {
          goToSlide(getNames(this.providerElement), index, true);
        }
      });
      this.el = el;
    }
    get providerElement() {
      return this.el.closest(WebComponent.Carousel);
    }
    get isThumbnail() {
      const thumbnailEl = this.el.closest(WebComponent.CarouselThumbnail);
      return !!thumbnailEl;
    }
    mount() {
      var _a2;
      if (!this.providerElement) {
        return;
      }
      if (((_a2 = this.el.parentElement) == null ? void 0 : _a2.tagName.toLowerCase()) !== WebComponent.CarouselList) {
        return;
      }
      attrBoolean.set(this.el, "xo-carousel-slide", true);
      if (this.isThumbnail) {
        if (this.el.tabIndex === -1) {
          this.el.tabIndex = 0;
        }
        if (isMobile.any) {
          this.el.addEventListener("touchend", this.handleClick);
        } else {
          this.el.addEventListener("click", this.handleClick);
        }
      }
    }
    unmount() {
      if (!this.providerElement) {
        return;
      }
      this.unsubscribe();
      if (this.isThumbnail) {
        if (isMobile.any) {
          this.el.removeEventListener("touchend", this.handleClick);
        } else {
          this.el.removeEventListener("click", this.handleClick);
        }
      }
    }
  }
  class CarouselSlide extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "carouselItem", null);
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "index", 0);
    }
    async connectedCallback() {
      this.cancel = await delay(100);
      this.carouselItem = new CarouselItem(this);
      this.carouselItem.mount();
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.carouselItem) == null ? void 0 : _a2.unmount();
      this.cancel();
    }
  }
  class CarouselNext extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "setAttrDisabled", ({ options, activeIndex, slideLength }) => {
        if (!options.xoLoop) {
          if (!options.xoRewind && activeIndex === slideLength - options.xoPerView) {
            attrBoolean.set(this, "xo-disabled", true);
          } else {
            attrBoolean.set(this, "xo-disabled", false);
          }
        }
        if (slideLength <= options.xoPerView) {
          attrBoolean.set(this, "xo-hide", true);
        } else {
          attrBoolean.set(this, "xo-hide", false);
        }
      });
      __publicField(this, "listener", (state) => {
        this.setAttrDisabled(state);
      });
      __publicField(this, "nextSlide", (event) => {
        var _a2;
        if (!this.providerElement) {
          return;
        }
        if (this.closest("a")) {
          event.preventDefault();
        }
        const { options } = getState$3(this.providerElement.xoName);
        const now = Date.now();
        if (now - getNavLast() < options.xoSpeed + 100) {
          return;
        }
        setNavLast(now);
        nextSlide(getNames(this.providerElement), options.xoPerMove);
        if (options.xoSnake) {
          const listEl = (_a2 = this.providerElement) == null ? void 0 : _a2.querySelector(WebComponent.CarouselList);
          if (listEl) {
            listEl.isNextForSnake = true;
          }
        }
      });
    }
    get providerElement() {
      return getProviderElement(this);
    }
    async connectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        this.cancel = await delay(100);
      }
      if (!this.providerElement) {
        return;
      }
      const state = getState$3(this.providerElement.xoName);
      this.setAttrDisabled(state);
      this.addEventListener("click", this.nextSlide);
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.removeEventListener("click", this.nextSlide);
      this.cancel();
    }
  }
  class CarouselPrev extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "setAttrDisabled", ({ options, activeIndex, slideLength }) => {
        if (!options.xoLoop) {
          if (!options.xoRewind && activeIndex === 0) {
            attrBoolean.set(this, "xo-disabled", true);
          } else {
            attrBoolean.set(this, "xo-disabled", false);
          }
        }
        if (slideLength <= options.xoPerView) {
          attrBoolean.set(this, "xo-hide", true);
        } else {
          attrBoolean.set(this, "xo-hide", false);
        }
      });
      __publicField(this, "listener", (state) => {
        this.setAttrDisabled(state);
      });
      __publicField(this, "prevSlide", (event) => {
        var _a2;
        if (!this.providerElement) {
          return;
        }
        if (this.closest("a")) {
          event.preventDefault();
        }
        const { options } = getState$3(this.providerElement.xoName);
        const now = Date.now();
        if (now - getNavLast() < options.xoSpeed + 100) {
          return;
        }
        setNavLast(now);
        prevSlide(getNames(this.providerElement), options.xoPerMove);
        if (options.xoSnake) {
          const listEl = (_a2 = this.providerElement) == null ? void 0 : _a2.querySelector(WebComponent.CarouselList);
          if (listEl) {
            listEl.isNextForSnake = false;
          }
        }
      });
    }
    get providerElement() {
      return getProviderElement(this);
    }
    async connectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        this.cancel = await delay(100);
      }
      if (!this.providerElement) {
        return;
      }
      const state = getState$3(this.providerElement.xoName);
      this.setAttrDisabled(state);
      this.addEventListener("click", this.prevSlide);
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.removeEventListener("click", this.prevSlide);
      this.cancel();
    }
  }
  class CarouselPagination extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "bullet", "");
      __publicField(this, "listener", (state) => {
        this.renderBullet(state.slideLength, state.options);
      });
      __publicField(this, "renderBullet", (slideLength, options) => {
        var _a2;
        const _slideLength = options.xoLoop && options.xoType === "slide" ? slideLength - options.xoPerView * 4 : slideLength;
        const pages = (_a2 = Array(Math.ceil(_slideLength / options.xoPerView))) == null ? void 0 : _a2.fill(0);
        if (_slideLength <= options.xoPerView) {
          this.innerHTML = "";
          return;
        }
        if (!(pages == null ? void 0 : pages.length)) {
          return;
        }
        this.innerHTML = map(pages, (_, index) => {
          return `
        <${WebComponent.CarouselBullet} xo-index="${index}" xo-page="${index + 1}" role="button" tabindex="0" aria-label="Bullet ${index + 1}">
          ${this.bullet || options.xoRenderBullet}
        </${WebComponent.CarouselBullet}>
      `;
        }).join("");
      });
    }
    get providerElement() {
      return getProviderElement(this);
    }
    async connectedCallback() {
      this.cancel = await delay(100);
      if (!this.providerElement) {
        return;
      }
      if (!this.bullet) {
        const templateEl = this.children[0];
        if (templateEl) {
          this.bullet = templateEl.innerHTML.trim();
        }
      }
      const state = getState$3(this.providerElement.xoName);
      this.renderBullet(state.slideLength, state.options);
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener, (prevState, nextState) => {
        var _a2, _b2;
        return equal((_a2 = prevState[this.providerElement.xoName]) == null ? void 0 : _a2.options, (_b2 = nextState[this.providerElement.xoName]) == null ? void 0 : _b2.options);
      });
      this.dispatchEvent(new CustomEvent("xo:carousel:pagination:connected", { bubbles: true }));
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.cancel();
    }
  }
  let last = 0;
  class CarouselBullet extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "circleEl", null);
      __publicField(this, "listener", (state) => {
        this.handler(state);
      });
      __publicField(this, "handler", async ({ activeIndex, options, slideLength }) => {
        var _a2;
        const pageIndex = Number((_a2 = this.getAttribute("xo-index")) != null ? _a2 : 0);
        const realSlideLength = options.xoLoop && options.xoType === "slide" ? slideLength - options.xoPerView * 4 : slideLength;
        const _activeIndex = options.xoLoop && options.xoType === "slide" ? Math.min(activeIndex - options.xoPerView * 2, realSlideLength - options.xoPerView) : activeIndex;
        const pageIndexActive = Math.ceil(_activeIndex / options.xoPerView);
        await delay(0);
        if (pageIndex === pageIndexActive) {
          attrBoolean.set(this, "xo-active", true);
          if (this.closest(WebComponent.ProductMedia)) {
            attrBoolean.set(this, "xo-active-in-product-media", true);
          }
          bindingHelper(this, "xo-active-binding", true);
          xoCircleBar.animate(this.getCircleBarName(), {
            duration: options.xoAutoplay,
            value: 100
          });
        } else {
          attrBoolean.set(this, "xo-active", false);
          attrBoolean.set(this, "xo-active-in-product-media", false);
          bindingHelper(this, "xo-active-binding", false);
          xoCircleBar.animate(this.getCircleBarName(), {
            duration: options.xoAutoplay,
            value: 0
          });
        }
      });
      __publicField(this, "handleClick", () => {
        var _a2, _b2;
        const providerEl = this.getProviderElement();
        const { options, slideLength, activeIndex } = getState$3(providerEl.xoName);
        const now = Date.now();
        if (now - last < options.xoSpeed + 200) {
          return;
        }
        last = now;
        const surplus = slideLength % options.xoPerView;
        const minIndex = options.xoLoop && options.xoType === "slide" ? options.xoPerView * 2 : 0;
        const pageIndex = Number((_a2 = this.getAttribute("xo-index")) != null ? _a2 : 0) * options.xoPerView + minIndex;
        const maxIndex = slideLength - 1 - (options.xoPerView === 1 ? 0 : options.xoPerView - surplus);
        let nextIndex = clamp(pageIndex, minIndex, maxIndex);
        const listEl = (_b2 = this.getProviderElement()) == null ? void 0 : _b2.querySelector(WebComponent.CarouselList);
        goToSlide(getNames(providerEl), pageIndex, true);
        if (options.xoSnake) {
          if (listEl) {
            listEl.isNextForSnake = nextIndex > activeIndex;
          }
        }
      });
      __publicField(this, "getCircleBarName", () => {
        if (this.getProviderElement()) {
          return `${this.getProviderElement().xoName}-${this.getAttribute("xo-index")}`;
        }
        return "";
      });
      __publicField(this, "handleCircleBar", () => {
        this.circleEl = this.querySelector(WebComponent.CircleBar);
        if (this.circleEl) {
          this.circleEl.setAttribute("xo-name", this.getCircleBarName());
        }
      });
    }
    getProviderElement() {
      return getProviderElement(this);
    }
    connectedCallback() {
      const providerEl = this.getProviderElement();
      if (!providerEl) {
        return;
      }
      const state = getState$3(providerEl.xoName);
      this.handler(state);
      this.handleCircleBar();
      this.addEventListener("click", this.handleClick);
      this.unsubscribe = subscribe$4(providerEl.xoName, this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.removeEventListener("click", this.handleClick);
    }
  }
  class CarouselSize extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", ({ options, slideLength }) => {
        if (options.xoLoop && options.xoType === "slide") {
          this.innerText = `${slideLength - options.xoPerView * 4}`;
        } else {
          this.innerText = `${slideLength}`;
        }
      });
    }
    get providerElement() {
      return getProviderElement(this);
    }
    connectedCallback() {
      if (!this.providerElement) {
        return;
      }
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class CarouselPage extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", ({ options, activeIndex, slideLength }) => {
        const realSlideLength = options.xoLoop && options.xoType === "slide" ? slideLength - options.xoPerView * 4 : slideLength;
        const _activeIndex = options.xoLoop && options.xoType === "slide" ? Math.min(activeIndex - options.xoPerView * 2, realSlideLength - options.xoPerView) : activeIndex;
        const pageIndexActive = Math.ceil(_activeIndex / options.xoPerView);
        this.innerText = `${pageIndexActive + 1}`;
      });
    }
    get providerElement() {
      return getProviderElement(this);
    }
    connectedCallback() {
      if (!this.providerElement) {
        return;
      }
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  let XoCarouselTrigger = (_l = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "carouselEls", []);
      __publicField(this, "handleCarouselChange", (event) => {
        var _a2;
        const { xoIndex } = this.props;
        const activeIndex = (_a2 = event.detail.activeIndex) != null ? _a2 : event.detail.xoActiveIndex;
        this.setProps({ xoActive: xoIndex === activeIndex });
        bindingHelper(this, "xo-active-binding", xoIndex === activeIndex);
      });
      __publicField(this, "handleChange", (event) => {
        event.preventDefault();
        each(this.carouselEls, (carouselEl) => {
          goToSlide([carouselEl.xoName], this.props.xoIndex, true);
        });
      });
    }
    mount() {
      var _a2;
      const { xoType, xoCarouselSelector } = this.props;
      const containerEl = (_a2 = this.closest(".shopify-section")) != null ? _a2 : document;
      this.carouselEls = Array.from(containerEl.querySelectorAll(xoCarouselSelector));
      this.addEventListener(xoType === "click" ? "click" : "mouseenter", this.handleChange);
      each(this.carouselEls, (carouselEl) => {
        carouselEl.addEventListener("xo:carousel:init", this.handleCarouselChange);
        carouselEl.addEventListener("xo:carousel:change", this.handleCarouselChange);
      });
    }
    unmount() {
      const { xoType } = this.props;
      this.removeEventListener(xoType === "click" ? "click" : "mouseenter", this.handleChange);
      each(this.carouselEls, (carouselEl) => {
        carouselEl.removeEventListener("xo:carousel:init", this.handleCarouselChange);
        carouselEl.removeEventListener("xo:carousel:change", this.handleCarouselChange);
      });
    }
  }, __publicField(_l, "propTypes", {
    xoIndex: "number",
    xoType: "string",
    xoCarouselSelector: "string",
    xoActive: "boolean"
  }), __publicField(_l, "defaultProps", {
    xoIndex: 0,
    xoType: "click",
    xoCarouselSelector: "xo-carousel",
    xoActive: false
  }), _l);
  XoCarouselTrigger = __decorate([
    customElements$1(WebComponent.CarouselTrigger)
  ], XoCarouselTrigger);
  const CSS_VAR_SIZE = "--xo-size";
  let CarouselDynamicBullets = (_m = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "paginationEl", this.querySelector(WebComponent.CarouselPagination));
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handlePaginationConnected", () => {
        const { xoPerView } = this.props;
        const perView = Math.min(xoPerView, 5);
        const bulletEl = this.querySelector(WebComponent.CarouselBullet);
        if (!bulletEl) {
          return;
        }
        const size = bulletEl.offsetWidth * perView;
        this.style.width = `${size}px`;
      });
      __publicField(this, "listener", async (state) => {
        const { xoPerView } = this.props;
        const { xoSpeed } = this.providerElement.options;
        const currentBulletEl = this.querySelector(`${WebComponent.CarouselBullet}[xo-index="${state.activeIndex}"]`);
        if (!currentBulletEl) {
          return;
        }
        const perView = Math.min(xoPerView, 5);
        const threshold = perView % 2 === 1 ? perView - 1 : perView;
        const firstTranslate = currentBulletEl.offsetWidth * threshold / 2;
        const isStart = state.activeIndex >= Math.floor(perView / 2);
        const isEnd = state.activeIndex <= state.slideLength - Math.round(perView / 2);
        if (isStart && isEnd) {
          this.paginationEl.style.transition = `transform ${xoSpeed}ms`;
          this.paginationEl.style.transform = `translateX(${firstTranslate - (currentBulletEl == null ? void 0 : currentBulletEl.offsetLeft)}px)`;
        }
        const bulletIndexs = range(state.activeIndex - threshold, state.activeIndex + perView);
        const sizes = range(-threshold, perView).map((item) => {
          item = Math.sign(item) === -1 ? item : -item;
          return Math.trunc((item / perView + 1) * 100) / 100;
        });
        const allBulletEls = Array.from(this.querySelectorAll(WebComponent.CarouselBullet));
        each(allBulletEls, (el) => {
          el.style.removeProperty(CSS_VAR_SIZE);
        });
        each(bulletIndexs, (bulletIndex) => {
          var _a2;
          const bulletEl = this.querySelector(`${WebComponent.CarouselBullet}[xo-index="${bulletIndex}"]`);
          const size = interpolate({
            value: bulletIndex,
            inputRange: bulletIndexs,
            outputRange: sizes
          });
          (_a2 = bulletEl == null ? void 0 : bulletEl.style) == null ? void 0 : _a2.setProperty(CSS_VAR_SIZE, `${size}`);
        });
      });
    }
    get providerElement() {
      return getProviderElement(this);
    }
    async mount() {
      if (!this.paginationEl) {
        return;
      }
      if (!this.providerElement) {
        return;
      }
      this.style.opacity = "1";
      await delay();
      this.style.removeProperty("opacity");
      this.paginationEl.addEventListener("xo:carousel:pagination:connected", this.handlePaginationConnected);
      this.listener(getState$3(this.providerElement.xoName));
      this.unsubscribe = subscribe$4(this.providerElement.xoName, this.listener);
    }
    unmount() {
      var _a2;
      (_a2 = this.paginationEl) == null ? void 0 : _a2.removeEventListener("xo:carousel:pagination:connected", this.handlePaginationConnected);
      this.unsubscribe();
    }
  }, __publicField(_m, "propTypes", {
    xoPerView: "number"
  }), __publicField(_m, "defaultProps", {
    xoPerView: 5
  }), _m);
  CarouselDynamicBullets = __decorate([
    customElements$1(WebComponent.CarouselDynamicBullets)
  ], CarouselDynamicBullets);
  const styles$m = "";
  createState$4();
  window.xoCarousel = publicMethod;
  const xoCarousel = publicMethod;
  componentDefine({
    [WebComponent.Carousel]: Carousel,
    [WebComponent.CarouselThumbnail]: CarouselThumbnail,
    [WebComponent.CarouselSlide]: CarouselSlide,
    [WebComponent.CarouselNext]: CarouselNext,
    [WebComponent.CarouselPrev]: CarouselPrev,
    [WebComponent.CarouselList]: CarouselList,
    [WebComponent.CarouselPagination]: CarouselPagination,
    [WebComponent.CarouselBullet]: CarouselBullet,
    [WebComponent.CarouselSize]: CarouselSize,
    [WebComponent.CarouselPage]: CarouselPage
  });
  function createState$3() {
    xoStore.create("xo-filters", {
      initialState: {
        fieldInfo: {},
        formData: new FormData(),
        refine: [],
        status: "idle",
        html: "",
        prevHtml: "",
        priceMax: 0,
        priceMin: 0,
        sectionId: ""
      }
    });
  }
  function setPriceMinMax(min, max) {
    xoStore.set("xo-filters", (prevState) => ({
      ...prevState,
      priceMin: min,
      priceMax: max
    }))("xo-filters/setPriceMinMax");
  }
  function setSectionId(sectionId) {
    xoStore.set("xo-filters", (prevState) => ({
      ...prevState,
      sectionId
    }))("xo-filters/setSectionId");
  }
  function setDefaultFormData() {
    const url = new URL(window.location.href);
    const params = queryString.parse(url.search);
    const formData = new FormData();
    each(params, ([name, value]) => {
      formData.append(name, value);
    });
    xoStore.set("xo-filters", (prevState) => {
      if (Number(formData.get("filter.v.price.gte")) === prevState.priceMin && Number(formData.get("filter.v.price.lte")) === prevState.priceMax) {
        formData.delete("filter.v.price.gte");
        formData.delete("filter.v.price.lte");
      }
      return {
        ...prevState,
        formData: formDataPriceJoin(formData)
      };
    })("xo-filters/setDefaultFormData");
  }
  function setRefine() {
    xoStore.set("xo-filters", (prevState) => {
      const { formData } = prevState;
      const data = Array.from(formDataPriceJoin(formData));
      const refine = reduce(Array.from(data), (arr, [name, value]) => {
        if (value === "" || value == null) {
          return arr;
        }
        return [
          ...arr,
          {
            name,
            value
          }
        ];
      }, []);
      return {
        ...prevState,
        refine
      };
    })("xo-filters/setRefine");
  }
  function setFormData(formElement) {
    const formData = formElement instanceof FormData ? formElement : new FormData(formElement);
    xoStore.set("xo-filters", (prevState) => {
      if (Number(formData.get("filter.v.price.gte")) === prevState.priceMin && Number(formData.get("filter.v.price.lte")) === prevState.priceMax) {
        formData.delete("filter.v.price.gte");
        formData.delete("filter.v.price.lte");
      }
      return {
        ...prevState,
        formData: formDataPriceJoin(formData)
      };
    })("xo-filters/setFormData");
  }
  function pushFormDataItem(name, value) {
    xoStore.set("xo-filters", (prevState) => {
      const { formData } = prevState;
      formData.append(name, value);
      return {
        ...prevState,
        formData
      };
    })("xo-filters/pushFormDataItem");
  }
  function updateFormDataItem(name, value, isPaginate) {
    xoStore.set("xo-filters", (prevState) => {
      const { formData } = prevState;
      formData.set(name, value);
      if (!isPaginate) {
        formData.delete("page");
      }
      return {
        ...prevState,
        formData
      };
    })("xo-filters/updateFormDataItem");
  }
  function removeFormDataItem(name, value) {
    const hasValue = value != null;
    xoStore.set("xo-filters", (prevState) => {
      const { formData } = prevState;
      formData.delete("page");
      const data = Array.from(formDataPriceJoin(formData));
      const newFormData = reduce(data, (formData2, [key, val]) => {
        if (hasValue) {
          if (key === name && val === value) {
            return formData2;
          }
        } else if (key === name) {
          return formData2;
        }
        formData2.append(key, val);
        return formData2;
      }, new FormData());
      return {
        ...prevState,
        formData: newFormData
      };
    })("xo-filters/removeFormDataItem");
  }
  function removeRefineItem(name, value) {
    const hasValue = value != null;
    xoStore.set("xo-filters", (prevState) => {
      return {
        ...prevState,
        refine: filter(prevState.refine, (item) => {
          if (hasValue) {
            return !(item.name === name && item.value === value);
          }
          return item.name !== name;
        })
      };
    })("xo-filters/removeRefineItem");
  }
  function removeAllRefineAndFormData() {
    xoStore.set("xo-filters", (prevState) => {
      const { formData } = prevState;
      const q = formData.get("q");
      const newFormData = new FormData();
      if (q) {
        newFormData.append("q", q);
      }
      return {
        ...prevState,
        refine: [],
        formData: newFormData
      };
    })("xo-filters/removeAllRefineAndFormData");
  }
  const cache = /* @__PURE__ */ new Map();
  async function getHtml(url) {
    if (cache.size > 10) {
      const val = cache.keys().next().value;
      if (val != null) {
        cache.delete(val);
      }
    }
    try {
      xoStore.set("xo-filters", (prevState) => {
        return {
          ...prevState,
          status: "request"
        };
      })("xo-filters/getHtml/request");
      if (cache.has(url)) {
        await delay(10);
        xoStore.set("xo-filters", (prevState) => {
          return {
            ...prevState,
            status: "success",
            html: cache.get(url),
            prevHtml: prevState.html
          };
        })("xo-filters/getHtml/success");
      } else {
        const response = await fetch(url);
        const html = await response.text();
        cache.set(url, html);
        xoStore.set("xo-filters", (prevState) => {
          return {
            ...prevState,
            status: "success",
            html,
            prevHtml: prevState.html
          };
        })("xo-filters/getHtml/success");
      }
    } catch {
      xoStore.set("xo-filters", (prevState) => {
        return {
          ...prevState,
          status: "failure"
        };
      })("xo-filters/getHtml/failure");
    }
  }
  function resetStatus() {
    xoStore.set("xo-filters", (prevState) => {
      return {
        ...prevState,
        status: "idle"
      };
    })("xo-filters/resetStatus");
  }
  function getState$2() {
    return xoStore.get("xo-filters");
  }
  function subscribe$3(listener, equal2) {
    return xoStore.subscribe("xo-filters", listener, equal2);
  }
  const sfn = {
    sort: "sort_by",
    page: "page",
    price: "['filter.v.price.gte', 'filter.v.price.lte']"
  };
  function isField(el, type) {
    if (!el)
      return false;
    const tagName = el.tagName.toLowerCase();
    if (tagName === "input") {
      return el.getAttribute("type") === type;
    }
    return tagName === type;
  }
  function checkField(el) {
    if (el.children.length !== 1 && !/input|select|xo-range/g.test(el.children[0].tagName.toLowerCase())) {
      throw new Error(`${WebComponent.FiltersField}: field must have one child and it must be an input, select or ${WebComponent.Range}`);
    }
  }
  function formDataPriceJoin(formData) {
    var _a2, _b2;
    if (!formData.get("filter.v.price.gte")) {
      return formData;
    }
    const priceMin = (_a2 = Number(formData.get("filter.v.price.gte"))) != null ? _a2 : 0;
    const priceMax = (_b2 = Number(formData.get("filter.v.price.lte"))) != null ? _b2 : 0;
    formData.delete("filter.v.price.gte");
    formData.delete("filter.v.price.lte");
    formData.set(sfn.price, `[${priceMin}, ${priceMax}]`);
    return formData;
  }
  function formDataPriceSplit(formData) {
    if (!formData.get(sfn.price)) {
      return formData;
    }
    const price = formData.get(sfn.price);
    formData.delete(sfn.price);
    const [priceMin, priceMax] = objectParse(price);
    formData.set("filter.v.price.gte", String(priceMin));
    formData.set("filter.v.price.lte", String(priceMax));
    return formData;
  }
  function pushHistory() {
    const { formData } = getState$2();
    const url = new URL(window.location.href.replace(window.location.search, ""));
    url.search = queryString.stringify(formDataPriceSplit(formData));
    if (url.href !== window.location.href) {
      window.history.pushState(null, "", url.href);
    }
  }
  async function navigate() {
    const { formData, sectionId } = getState$2();
    const url = new URL(window.location.href.replace(window.location.search, ""));
    url.search = queryString.stringify(formDataPriceSplit(formData));
    await getHtml(sectionId ? url.href.includes("?") ? `${url.href}&section_id=${sectionId}` : `${url.href}?section_id=${sectionId}` : url.href);
    if (url.href !== window.location.href) {
      window.history.pushState(null, "", url.href);
    }
  }
  function setQueue(callback) {
    let id2 = -1;
    if ("requestIdleCallback" in window && "cancelIdleCallback" in window) {
      id2 = requestIdleCallback(() => {
        callback();
        cancelIdleCallback(id2);
      });
    } else {
      id2 = setTimeout(() => {
        callback();
        clearTimeout(id2);
      }, 0);
    }
    return id2;
  }
  function clearQueue(id2) {
    if ("cancelIdleCallback" in window) {
      cancelIdleCallback(id2);
    } else {
      clearTimeout(id2);
    }
  }
  function handleDesktopMobile() {
    let prevWidth = 0;
    const handler = () => {
      var _a2;
      const suffix = "::disabled";
      const desktopFilterEl = document.querySelector(WebComponent.Filters);
      const mobileFilterEl = document.querySelector(WebComponent.FiltersMobile);
      if (desktopFilterEl && mobileFilterEl) {
        const radioMobileEls = Array.from(mobileFilterEl.querySelectorAll(`${WebComponent.FiltersField} input[type="radio"]`));
        const radioDesktopEls = Array.from(desktopFilterEl.querySelectorAll(`${WebComponent.FiltersField} input[type="radio"]`)).filter((el) => !el.closest(WebComponent.FiltersMobile));
        const options = getAttrs(mobileFilterEl, {
          pick: ["xoMobileMaxWidth"],
          types: {
            xoMobileMaxWidth: "number"
          }
        });
        const mobileMaxWidth = (_a2 = options.xoMobileMaxWidth) != null ? _a2 : 767;
        const isMobileDevice = window.innerWidth <= mobileMaxWidth || isMobile.any;
        if (isMobileDevice) {
          each(radioMobileEls, (radioEl) => {
            const name = radioEl.getAttribute("name");
            if (name) {
              if (radioEl.checked) {
                radioEl.checked = true;
              }
              radioEl.setAttribute("name", name.replace(suffix, ""));
            }
          });
          each(radioDesktopEls, (radioEl) => {
            const name = radioEl.getAttribute("name");
            if (name && !name.includes(suffix)) {
              radioEl.checked = false;
              radioEl.setAttribute("name", name + suffix);
            }
          });
        } else {
          each(radioDesktopEls, (radioEl) => {
            const name = radioEl.getAttribute("name");
            if (name) {
              if (radioEl.checked) {
                radioEl.checked = true;
              }
              radioEl.setAttribute("name", name.replace(suffix, ""));
            }
          });
          each(radioMobileEls, (radioEl) => {
            const name = radioEl.getAttribute("name");
            if (name && !name.includes(suffix)) {
              radioEl.checked = false;
              radioEl.setAttribute("name", name + suffix);
            }
          });
        }
      }
    };
    const handleResize = debounce((entries) => {
      for (let entry of entries) {
        const currentWidth = entry.contentRect.width;
        if (currentWidth !== prevWidth) {
          handler();
          prevWidth = currentWidth;
        }
      }
    }, 300);
    handler();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);
  }
  function withMoneyFormat(el, value) {
    var _a2, _b2, _c2;
    const rootFormat = document.documentElement.getAttribute("xo-money-format");
    const format = (_c2 = (_b2 = (_a2 = el.closest(WebComponent.Filters)) == null ? void 0 : _a2.getAttribute("xo-money-format")) != null ? _b2 : el.getAttribute("xo-money-format")) != null ? _c2 : "";
    if (rootFormat) {
      return rootFormat.replace(/\{\{\s*(\w+)\s*\}\}/g, `${value}`);
    }
    return format.replace(/{.*}|(\d+(,|\.)?)+/g, `${value}`);
  }
  const _Range = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "inputEl1", null);
      __publicField(this, "inputEl2", null);
      __publicField(this, "trackEl", null);
      __publicField(this, "thumbEl1", null);
      __publicField(this, "thumbEl2", null);
      __publicField(this, "progressEl", null);
      __publicField(this, "priceEls", []);
      __publicField(this, "valueEls", []);
      __publicField(this, "initialized", false);
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "_value", [0, 100]);
      __publicField(this, "min", 0);
      __publicField(this, "max", 100);
      __publicField(this, "createChildComponent", (tagName) => {
        const element = document.createElement(tagName);
        return element;
      });
      __publicField(this, "createRange", (index, label) => {
        const { xoName, xoMin, xoMax, xoStep, xoValue } = this.options;
        const element = document.createElement("input");
        element.type = "range";
        element.name = `${xoName}`;
        element.min = `${xoMin}`;
        element.max = `${xoMax}`;
        element.step = `${xoStep}`;
        element.value = `${xoValue[index]}`;
        element.setAttribute("aria-label", label);
        element.addEventListener("input", this.handleInput);
        element.addEventListener("click", this.handleInput);
        element.addEventListener("mouseup", this.handleChangeEnd);
        element.addEventListener("touchend", this.handleChangeEnd);
        return element;
      });
      __publicField(this, "handleInput", (event) => {
        var _a2, _b2, _c2, _d2;
        const value1 = (_b2 = Number((_a2 = this.inputEl1) == null ? void 0 : _a2.value)) != null ? _b2 : 0;
        const value2 = (_d2 = Number((_c2 = this.inputEl2) == null ? void 0 : _c2.value)) != null ? _d2 : 0;
        if (this.inputEl1 && event.target === this.inputEl1 && value1 >= value2) {
          this.inputEl1.value = `${value2}`;
          return;
        }
        if (this.inputEl2 && event.target === this.inputEl2 && value2 <= value1) {
          this.inputEl2.value = `${value1}`;
          return;
        }
        this.setAttribute("xo-value", `[${value1}, ${value2}]`);
        this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value: [value1, value2] } }));
      });
      __publicField(this, "handler", ([value1, value2]) => {
        if (!this.inputEl1 || !this.inputEl2 || !this.thumbEl1 || !this.thumbEl2 || !this.progressEl) {
          return;
        }
        const { xoMin, xoMax, xoName, xoComponentName } = this.options;
        this.inputEl1.setAttribute("value", `${value1}`);
        this.inputEl1.value = `${value1}`;
        this.inputEl2.setAttribute("value", `${value2}`);
        this.inputEl2.value = `${value2}`;
        this.inputEl1.setAttribute("name", `${xoName[0]}`);
        this.inputEl2.setAttribute("name", `${xoName[1]}`);
        each(this.priceEls, (el) => {
          if (el.getAttribute("xo-component-name") === xoComponentName) {
            if (el.getAttribute("xo-type") === "min") {
              el.innerHTML = withMoneyFormat(el, value1);
            } else if (el.getAttribute("xo-type") === "max") {
              el.innerHTML = withMoneyFormat(el, value2);
            }
          }
        });
        each(this.valueEls, (el) => {
          if (el.getAttribute("xo-component-name") === xoComponentName) {
            if (el.getAttribute("xo-type") === "min") {
              el.setAttribute("value", `${value1}`);
              el.value = `${value1}`;
            } else if (el.getAttribute("xo-type") === "max") {
              el.setAttribute("value", `${value2}`);
              el.value = `${value2}`;
            }
          }
        });
        const x1 = interpolate({
          value: value1,
          inputRange: [xoMin, xoMax],
          outputRange: [0, this.offsetWidth - this.thumbEl1.offsetWidth]
        });
        const x2 = interpolate({
          value: value2,
          inputRange: [xoMin, xoMax],
          outputRange: [0, this.offsetWidth - this.thumbEl2.offsetWidth]
        });
        this.thumbEl1.style.transform = `translateX(${x1}px)`;
        this.thumbEl2.style.transform = `translateX(${x2}px)`;
        this.progressEl.style.transform = `translateX(${x1}px)`;
        this.progressEl.style.width = `${x2 - x1}px`;
      });
      __publicField(this, "handleValueInput", (event) => {
        const el = event.currentTarget;
        const valNum = Number(el.value);
        const threshold = 0;
        if (valNum !== null) {
          if (el.getAttribute("xo-type") === "min") {
            const val = el.value ? Math.min(valNum, this.value[1] - threshold) : 0;
            this.value = [val, this.value[1]];
          } else if (el.getAttribute("xo-type") === "max") {
            const val = el.value ? Math.max(valNum, this.value[0] + threshold) : 0;
            this.value = [this.value[0], val];
          }
          this.handleChangeEnd();
        }
      });
      __publicField(this, "handleChangeEnd", () => {
        this.dispatchEvent(new CustomEvent("changed", { bubbles: true, detail: { value: this.value } }));
      });
      __publicField(this, "setSize", () => {
        this.style.setProperty("--size", `${this.thumbEl1.offsetHeight}`);
      });
      this.innerHTML = "";
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoComponentName", "xoName", "xoMin", "xoMax", "xoStep", "xoValue"],
        types: {
          xoComponentName: "string",
          xoName: "array",
          xoMin: "number",
          xoMax: "number",
          xoStep: "number",
          xoValue: "array"
        }
      });
      return { ..._Range.defaultOptions, ...options };
    }
    get value() {
      return this._value;
    }
    set value(value) {
      this._value = value;
      this.setAttribute("xo-value", `[${value[0]}, ${value[1]}]`);
    }
    static get observedAttributes() {
      return ["xo-value", "xo-observed"];
    }
    async connectedCallback() {
      const { xoValue, xoMin, xoMax, xoComponentName } = this.options;
      this.innerHTML = "";
      this.inputEl1 = this.appendChild(this.createRange(0, "Min"));
      this.inputEl2 = this.appendChild(this.createRange(1, "Max"));
      this.trackEl = this.appendChild(this.createChildComponent(WebComponent.RangeTrack));
      this.thumbEl1 = this.appendChild(this.createChildComponent(WebComponent.RangeThumb));
      this.thumbEl2 = this.appendChild(this.createChildComponent(WebComponent.RangeThumb));
      this.progressEl = this.trackEl.appendChild(this.createChildComponent(WebComponent.RangeProgress));
      await delay(0);
      this.thumbEl1.setAttribute("xo-index", "0");
      this.thumbEl2.setAttribute("xo-index", "1");
      this.value = xoValue;
      this.setSize();
      this.min = xoMin;
      this.max = xoMax;
      this.priceEls = Array.from(document.querySelectorAll(`${WebComponent.RangePrice}[xo-component-name=${xoComponentName}]`));
      this.valueEls = Array.from(document.querySelectorAll(`input[xo-component-name=${xoComponentName}]`));
      this.handler(this.value);
      each(this.valueEls, (el) => {
        if (el.getAttribute("xo-component-name") === xoComponentName) {
          el.addEventListener("input", this.handleValueInput);
        }
      });
      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            this.setSize();
            this.handler(this.value);
            this.prevWidth = currentWidth;
          }
        }
      });
      this.resizeObserver.observe(this);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if ((oldValue != null && newValue != null || name === "xo-observed") && oldValue !== newValue) {
        const value = objectParse(newValue);
        this.value = value;
        this.handler(value);
        if (this.initialized) {
          this.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { value } }));
        }
        this.initialized = true;
      }
    }
    disconnectedCallback() {
      var _a2;
      if (!this.inputEl1 || !this.inputEl2) {
        return;
      }
      this.inputEl1.removeEventListener("input", this.handleInput);
      this.inputEl2.removeEventListener("input", this.handleInput);
      this.inputEl1.removeEventListener("mouseup", this.handleChangeEnd);
      this.inputEl2.removeEventListener("mouseup", this.handleChangeEnd);
      this.inputEl1.removeEventListener("touchend", this.handleChangeEnd);
      this.inputEl2.removeEventListener("touchend", this.handleChangeEnd);
      this.inputEl1.removeEventListener("click", this.handleInput);
      this.inputEl2.removeEventListener("click", this.handleInput);
      each(this.valueEls, (el) => {
        el.removeEventListener("input", this.handleValueInput);
      });
      (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
    }
  };
  let Range = _Range;
  __publicField(Range, "defaultOptions", {
    xoComponentName: "xo-range",
    xoName: ["", ""],
    xoMin: 0,
    xoMax: 100,
    xoStep: 1,
    xoValue: [0, 100]
  });
  const styles$l = "";
  componentDefine({
    [WebComponent.Range]: Range
  });
  const css = createCssInJs();
  const shadowStyles = css`
  ${WebComponent.StickyInner} {
    position: relative;
  }
  ${WebComponent.StickyInner}[xo-is-sticky] {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s;
    backface-visibility: hidden;
  }
  ${WebComponent.StickyInner}[xo-lock] {
    transform: translateY(0) !important;
  }
  ${WebComponent.StickyContent} {
    display: block;
  }
  ${WebComponent.StickyInner}[xo-hidden] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;
  function createState$2() {
    xoStore.create("xo-sticky", {
      initialState: {
        topNodes: [],
        bottomNodes: []
      }
    });
  }
  function getNodes(placement) {
    const state = xoStore.get("xo-sticky");
    return placement === "top" ? state.topNodes : state.bottomNodes;
  }
  function getKey(placement) {
    return placement === "top" ? "topNodes" : "bottomNodes";
  }
  function addNode(el, direction, placement) {
    xoStore.set("xo-sticky", (prevState) => {
      const nodes = getNodes(placement);
      const hasNode = nodes.find((n) => n.element === el);
      const node = {
        element: el,
        height: el.offsetHeight,
        isSticky: false,
        direction,
        directionDownHide: false
      };
      const newNodes = hasNode ? nodes : placement === "top" ? [...nodes, node] : [node, ...nodes];
      return {
        ...prevState,
        [getKey(placement)]: newNodes
      };
    });
  }
  function removeNode(el, placement) {
    xoStore.set("xo-sticky", (prevState) => {
      const nodes = getNodes(placement);
      const newNodes = filter(nodes, (n) => n.element !== el);
      return {
        ...prevState,
        [getKey(placement)]: newNodes
      };
    });
  }
  function setIsSticky(el, value, placement) {
    xoStore.set("xo-sticky", (prevState) => {
      const nodes = getNodes(placement);
      return {
        ...prevState,
        [getKey(placement)]: map(nodes, (node) => {
          if (node.element === el) {
            return {
              ...node,
              isSticky: value
            };
          }
          return node;
        })
      };
    });
  }
  function setDirectionDownHide(el, value, placement) {
    xoStore.set("xo-sticky", (prevState) => {
      const nodes = getNodes(placement);
      return {
        ...prevState,
        [getKey(placement)]: map(nodes, (node) => {
          if (node.element === el) {
            return {
              ...node,
              directionDownHide: value
            };
          }
          return node;
        })
      };
    });
  }
  const offsets = /* @__PURE__ */ new Map();
  function getOffset(el, placement) {
    var _a2;
    const nodes = getNodes(placement);
    const i = findIndex(nodes, (n) => n.element === el);
    const nodesFilter = filter(nodes, (node, index) => {
      return index < i && node.isSticky;
    });
    const offset2 = reduce(nodesFilter, (a, b) => a + b.height, 0);
    offsets.set(el, offset2);
    return (_a2 = offsets.get(el)) != null ? _a2 : 0;
  }
  function getHeightDirectionUp(el, placement) {
    const nodes = getNodes(placement);
    const i = findIndex(nodes, (n) => n.element === el);
    return reduce(nodes, (acc, node, index) => {
      const cond = index < i && node.direction === "up" && node.isSticky;
      return cond ? acc + node.height : acc;
    }, 0);
  }
  function getStickyHeight(placement) {
    const nodes = getNodes(placement);
    const totalHeight = reduce(nodes, (acc, node) => {
      if (node.directionDownHide) {
        return acc;
      }
      if (node.isSticky) {
        return acc + node.height;
      }
      return acc;
    }, 0);
    return totalHeight;
  }
  function subscribe$2(listener, equal2) {
    return xoStore.subscribe("xo-sticky", listener, equal2);
  }
  const _Sticky = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "frameId", -1);
      __publicField(this, "shadow", null);
      __publicField(this, "innerEl");
      __publicField(this, "contentEl");
      __publicField(this, "prevScrollY", window.scrollY);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoDirection", "xoPlacement", "xoDisabled", "xoName", "xoHeaderTransparent"],
          types: {
            xoDirection: "string",
            xoPlacement: "string",
            xoDisabled: "boolean",
            xoName: "string",
            xoHeaderTransparent: "boolean"
          }
        });
      });
      __publicField(this, "addSticky", () => {
        const { xoPlacement } = this.options;
        const offset2 = getOffset(this.contentEl, xoPlacement);
        attrBoolean.set(this.innerEl, "xo-is-sticky", true);
        if (xoPlacement === "top") {
          this.innerEl.style.top = `${offset2}px`;
        } else {
          this.innerEl.style.bottom = `${offset2}px`;
        }
      });
      __publicField(this, "removeStick", () => {
        const { xoPlacement } = this.options;
        attrBoolean.set(this.innerEl, "xo-is-sticky", false);
        if (xoPlacement === "top") {
          this.innerEl.style.removeProperty("top");
        } else {
          this.innerEl.style.removeProperty("bottom");
        }
      });
      __publicField(this, "handleStickyTop", () => {
        const { xoDirection } = this.options;
        const offset2 = getOffset(this.contentEl, "top");
        const heightDirectionUp = getHeightDirectionUp(this.contentEl, "top");
        const { top } = this.getBoundingClientRect();
        const up = window.scrollY < this.prevScrollY;
        const height = this.contentEl.offsetHeight;
        if (xoDirection === "up") {
          if (up) {
            if (top < offset2 - height) {
              this.addSticky();
              setIsSticky(this.contentEl, true, "top");
              setDirectionDownHide(this.contentEl, false, "top");
              attrBoolean.set(this, "xo-is-sticky", true);
            } else if (top >= offset2) {
              this.removeStick();
              setIsSticky(this.contentEl, false, "top");
              setDirectionDownHide(this.contentEl, true, "top");
              attrBoolean.set(this, "xo-is-sticky", false);
            }
            this.innerEl.style.transform = "translateY(0px)";
          } else {
            if (top < offset2 - height) {
              this.innerEl.style.transform = `translateY(-${height + offset2}px)`;
            }
            setDirectionDownHide(this.contentEl, true, "top");
          }
        } else {
          if (top < offset2 - heightDirectionUp) {
            this.addSticky();
            setIsSticky(this.contentEl, true, "top");
            attrBoolean.set(this, "xo-is-sticky", true);
          } else if (top >= offset2) {
            this.removeStick();
            setIsSticky(this.contentEl, false, "top");
            attrBoolean.set(this, "xo-is-sticky", false);
          }
          if (up) {
            this.innerEl.style.transform = "translateY(0px)";
          } else {
            this.innerEl.style.transform = `translateY(-${heightDirectionUp}px)`;
          }
        }
      });
      __publicField(this, "handleStickyBottom", () => {
        const { xoDirection } = this.options;
        const offset2 = getOffset(this.contentEl, "bottom");
        const heightDirectionUp = getHeightDirectionUp(this.contentEl, "bottom");
        const { top } = this.getBoundingClientRect();
        const up = window.scrollY < this.prevScrollY;
        const height = this.contentEl.offsetHeight;
        const bottom = top - window.innerHeight + height;
        if (xoDirection === "up") {
          if (bottom < offset2 - heightDirectionUp + height) {
            this.addSticky();
            setIsSticky(this.contentEl, true, "bottom");
            setDirectionDownHide(this.contentEl, false, "bottom");
            this.innerEl.style.transform = "translateY(0px)";
            if (up) {
              attrBoolean.set(this, "xo-is-sticky", true);
            }
          } else if (bottom >= offset2 + height) {
            setIsSticky(this.contentEl, false, "bottom");
            setDirectionDownHide(this.contentEl, true, "bottom");
            this.innerEl.style.transform = `translateY(${height + offset2}px)`;
            attrBoolean.set(this, "xo-is-sticky", false);
          }
          if (!up) {
            this.innerEl.style.transform = `translateY(${height + offset2}px)`;
            setDirectionDownHide(this.contentEl, true, "bottom");
          }
        } else {
          if (bottom < offset2 - heightDirectionUp) {
            this.addSticky();
            setIsSticky(this.contentEl, true, "bottom");
            attrBoolean.set(this, "xo-is-sticky", true);
          } else if (bottom >= offset2) {
            this.removeStick();
            setIsSticky(this.contentEl, false, "bottom");
            attrBoolean.set(this, "xo-is-sticky", false);
          }
          if (up) {
            this.innerEl.style.transform = "translateY(0px)";
          } else {
            this.innerEl.style.transform = `translateY(${heightDirectionUp}px)`;
          }
        }
      });
      __publicField(this, "handleHidden", () => {
        const { xoName } = this.options;
        const hiddenEl = document.querySelector(`${WebComponent.StickyHidden}[xo-name="${xoName}"]`);
        if (hiddenEl) {
          const { top: hiddenTop } = hiddenEl.getBoundingClientRect();
          attrBoolean.set(this.innerEl, "xo-hidden", hiddenTop < window.innerHeight);
        }
      });
      __publicField(this, "setHeaderHeightVariable", (height) => {
        const { xoHeaderTransparent } = this.options;
        if (xoHeaderTransparent) {
          document.body.style.setProperty("--header-sticky-height", `${height}px`);
        } else {
          document.body.style.removeProperty("--header-sticky-height");
        }
      });
      __publicField(this, "handler", () => {
        this.frameId = requestAnimationFrame(() => {
          const { xoPlacement } = this.options;
          const height = this.contentEl.offsetHeight;
          this.contentEl.style.height = `${height}px`;
          this.innerEl.style.height = `${height}px`;
          this.setHeaderHeightVariable(height);
          if (xoPlacement === "top") {
            this.handleStickyTop();
          } else {
            this.handleStickyBottom();
          }
          this.handleHidden();
          this.prevScrollY = window.scrollY;
        });
      });
      __publicField(this, "render", () => {
        const { cssText } = shadowStyles;
        return `
      <style>${cssText}</style>
      <${WebComponent.StickyInner} part="inner">
        <${WebComponent.StickyContent} part="content"><slot></slot></${WebComponent.StickyContent}>
      </${WebComponent.StickyInner}>
    `;
      });
      __publicField(this, "init", async () => {
        const { xoDirection, xoPlacement } = this.options;
        this.shadow = this.shadow || this.attachShadow({ mode: "open" });
        if (!this.shadow.innerHTML) {
          this.shadow.innerHTML = this.render();
        }
        this.innerEl = this.shadow.querySelector(WebComponent.StickyInner);
        this.contentEl = this.shadow.querySelector(WebComponent.StickyContent);
        await delay(100);
        addNode(this.contentEl, xoDirection, xoPlacement);
        if (xoPlacement === "top") {
          this.style.height = `${this.contentEl.offsetHeight}px`;
          this.setHeaderHeightVariable(this.contentEl.offsetHeight);
        }
        this.handler();
        window.addEventListener("scroll", this.handler);
        window.addEventListener("resize", this.handler);
      });
    }
    get options() {
      return {
        ..._Sticky.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-direction", "xo-placement", "xo-header-transparent"];
    }
    connectedCallback() {
      this.setOptions();
      const { xoDisabled } = this.options;
      if (xoDisabled) {
        return;
      }
      this.init();
      this.unsubscribe = xoStore.subscribe("xo-popover", (state) => {
        const popopverItem = objectValues(state.data).find((item) => item.isOpen);
        const isOpen = !!(popopverItem == null ? void 0 : popopverItem.isOpen);
        const element = popopverItem == null ? void 0 : popopverItem.triggerElement;
        const stickyElement = element == null ? void 0 : element.closest(WebComponent.Sticky);
        if (!!stickyElement) {
          attrBoolean.set(this.innerEl, "xo-lock", isOpen && !!this.innerEl);
        } else {
          attrBoolean.set(this.innerEl, "xo-lock", false);
        }
      });
    }
    disconnectedCallback() {
      const { xoPlacement } = this.options;
      if (this.innerEl) {
        this.innerEl.style.removeProperty("height");
        this.innerEl.style.removeProperty("transform");
        this.innerEl.style.removeProperty("top");
        this.innerEl.style.removeProperty("bottom");
      }
      if (this.contentEl) {
        this.contentEl.style.removeProperty("height");
      }
      this.style.removeProperty("height");
      attrBoolean.set(this, "xo-is-sticky", false);
      if (this.innerEl) {
        attrBoolean.set(this.innerEl, "xo-is-sticky", false);
      }
      window.removeEventListener("scroll", this.handler);
      window.removeEventListener("resize", this.handler);
      cancelAnimationFrame(this.frameId);
      if (this.contentEl) {
        removeNode(this.contentEl, xoPlacement);
      }
      this.unsubscribe();
    }
    async attributeChangedCallback(_, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.disconnectedCallback();
        await delay(100);
        this.connectedCallback();
      }
    }
  };
  let Sticky = _Sticky;
  __publicField(Sticky, "defaultOptions", {
    xoDirection: "up",
    xoPlacement: "top",
    xoDisabled: false,
    xoName: ""
  });
  const _StickySpace = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", null);
      __publicField(this, "prevStickyHeight", 0);
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoPlacement"],
        types: {
          xoPlacement: "string"
        }
      });
      return {
        ..._StickySpace.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      const { xoPlacement } = this.options;
      this.unsubscribe = subscribe$2(() => {
        const stickyHeight = getStickyHeight(xoPlacement);
        if (this.prevStickyHeight !== stickyHeight) {
          this.style.height = `${stickyHeight}px`;
          this.prevStickyHeight = stickyHeight;
        }
      });
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
    }
  };
  let StickySpace = _StickySpace;
  __publicField(StickySpace, "defaultOptions", {
    xoPlacement: "top"
  });
  const styles$k = "";
  createState$2();
  const xoSticky = { subscribe: subscribe$2, getStickyHeight, getNodes };
  window.xoSticky = xoSticky;
  componentDefine({
    [WebComponent.Sticky]: Sticky,
    [WebComponent.StickySpace]: StickySpace
  });
  const _Filters = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "unsubscribe2", () => {
      });
      __publicField(this, "timeId", -1);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoScrollTop", "xoSectionId"],
          types: {
            xoScrollTop: "boolean",
            xoSectionId: "string"
          }
        });
      });
      __publicField(this, "getStickyHeight", () => {
        const nodes = xoSticky.getNodes("top");
        const totalHeight = reduce(nodes, (acc, node) => {
          return acc + node.height;
        }, 0);
        return totalHeight;
      });
      __publicField(this, "listener", async () => {
        const { xoScrollTop } = this.options;
        await delay(100);
        if (xoScrollTop) {
          const topEl = document.querySelector(WebComponent.FiltersTop);
          if (topEl) {
            if (window.scrollY > offset(topEl).top) {
              window.scrollTo({
                top: offset(topEl).top - this.getStickyHeight(),
                behavior: "smooth"
              });
            }
          } else {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }
        }
      });
      __publicField(this, "listener2", () => {
        const { status } = getState$2();
        if (status === "request") {
          attrBoolean.set(this, "xo-loading", true);
        } else if (status === "success") {
          attrBoolean.set(this, "xo-loading", false);
        }
      });
      __publicField(this, "handlePopState", async (event) => {
        event.preventDefault();
        const { search } = window.location;
        const params = queryString.parse(search);
        const formData = new FormData();
        each(params, ([key, value]) => {
          formData.append(key, value);
        });
        setFormData(formData);
        await getHtml(window.location.href);
        setRefine();
      });
      __publicField(this, "setDefaultFieldsFromParams", () => {
        const { search } = window.location;
        const params = queryString.parse(search);
        const formData = new FormData();
        each(params, ([key, value]) => {
          formData.append(key, value);
        });
        const newFormData = formDataPriceJoin(formData);
        const newParams = queryString.parse(newFormData);
        each(newParams, ([name, value]) => {
          const fieldEls = Array.from(this.querySelectorAll(`${WebComponent.FiltersField} [name="${name}"], ${WebComponent.FiltersField} xo-range[xo-name="${sfn.price}"]`));
          each(fieldEls, (fieldEl) => {
            if (fieldEl) {
              if ((isField(fieldEl, "checkbox") || isField(fieldEl, "radio")) && name === fieldEl.getAttribute("name")) {
                const fieldEl2 = this.querySelector(`[name='${name}'][value='${value}']`);
                fieldEl2.checked = true;
                if (isField(fieldEl2, "radio")) {
                  const sortBySelectedEls = Array.from(this.querySelectorAll(WebComponent.FiltersSortBySelected));
                  each(sortBySelectedEls, (sortBySelectedEl) => {
                    var _a2;
                    if (fieldEl2.name === sfn.sort) {
                      sortBySelectedEl.textContent = (_a2 = fieldEl2.getAttribute("xo-label")) != null ? _a2 : value;
                    }
                  });
                }
              } else if (isField(fieldEl, "xo-range") && name === fieldEl.getAttribute("xo-name")) {
                const [val1, val2] = objectParse(value);
                fieldEl.setAttribute("xo-value", `[${val1}, ${val2}]`);
                fieldEl.value = [val1, val2];
              } else if (fieldEl instanceof HTMLSelectElement) {
                fieldEl.value = value;
              }
            }
          });
        });
      });
    }
    get options() {
      return {
        ..._Filters.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    async connectedCallback() {
      this.setOptions();
      this.timeId = window.setTimeout(() => {
        setDefaultFormData();
        this.setDefaultFieldsFromParams();
        setRefine();
        pushHistory();
        setSectionId(this.options.xoSectionId);
        clearTimeout(this.timeId);
      }, 50);
      window.addEventListener("popstate", this.handlePopState);
      this.unsubscribe = subscribe$3(this.listener, (prevState, nextState) => {
        return !(prevState != null && (prevState == null ? void 0 : prevState.html) !== (nextState == null ? void 0 : nextState.html) && prevState != null || prevState != null && !equal(prevState == null ? void 0 : prevState.refine, nextState == null ? void 0 : nextState.refine));
      });
      this.unsubscribe2 = subscribe$3(this.listener2, (prevState, nextState) => {
        return (prevState == null ? void 0 : prevState.status) === (nextState == null ? void 0 : nextState.status);
      });
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        this.setOptions();
      }
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.unsubscribe2();
      window.removeEventListener("popstate", this.handlePopState);
      clearTimeout(this.timeId);
    }
  };
  let Filters = _Filters;
  __publicField(Filters, "defaultOptions", {
    xoScrollTop: true,
    xoSectionId: ""
  });
  class FiltersField extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "handleInput", async (event) => {
        var _a2, _b2;
        const fieldEl = event.target;
        if (fieldEl instanceof HTMLInputElement && fieldEl.type !== "range") {
          if (isField(fieldEl, "checkbox")) {
            if (fieldEl.checked) {
              pushFormDataItem(fieldEl.name, fieldEl.value);
            } else {
              removeFormDataItem(fieldEl.name, fieldEl.value);
            }
          } else {
            const filtersEl = document.querySelector(WebComponent.Filters);
            if (filtersEl && isField(fieldEl, "radio")) {
              const popoverEl = fieldEl.closest(WebComponent.Popover);
              const popoverName = popoverEl == null ? void 0 : popoverEl.getAttribute("xo-name");
              const popoverTriggerEl = document.querySelector(`${WebComponent.PopoverTrigger}[xo-name="${popoverName}"]`);
              const sortBySelectedEls = Array.from((popoverTriggerEl != null ? popoverTriggerEl : filtersEl).querySelectorAll(WebComponent.FiltersSortBySelected));
              each(sortBySelectedEls, (sortBySelectedEl) => {
                var _a3;
                if (fieldEl.name === sfn.sort) {
                  sortBySelectedEl.textContent = (_a3 = fieldEl.getAttribute("xo-label")) != null ? _a3 : fieldEl.value;
                }
              });
              if (fieldEl.name === sfn.sort) {
                if (popoverEl && popoverName) {
                  xoPopover.close(popoverName);
                }
              }
            }
            updateFormDataItem(fieldEl.name, fieldEl.value);
          }
        } else if (fieldEl instanceof HTMLSelectElement) {
          updateFormDataItem(fieldEl.name, fieldEl.value);
        } else if (isField(fieldEl, "xo-range")) {
          const [val1, val2] = fieldEl.value;
          const min = (_a2 = Number(fieldEl.getAttribute("xo-min"))) != null ? _a2 : 0;
          const max = (_b2 = Number(fieldEl.getAttribute("xo-max"))) != null ? _b2 : 0;
          if (val1 === min && val2 === max) {
            removeFormDataItem(sfn.price);
          } else {
            updateFormDataItem(sfn.price, `[${val1}, ${val2}]`);
          }
        }
        const query = queryString.parse(window.location.search, true);
        if (query.page) {
          updateFormDataItem("page", query.page);
        }
        navigate();
        setRefine();
      });
      __publicField(this, "handleRange", debounce(this.handleInput));
      __publicField(this, "handler", (fieldEl) => {
        var _a2, _b2;
        if (!fieldEl)
          return;
        if (isField(fieldEl, "xo-range")) {
          setPriceMinMax((_a2 = Number(fieldEl.getAttribute("xo-min"))) != null ? _a2 : 0, (_b2 = Number(fieldEl.getAttribute("xo-max"))) != null ? _b2 : 0);
          fieldEl.addEventListener("changed", this.handleRange);
        } else {
          fieldEl.addEventListener("change", this.handleInput);
        }
      });
    }
    connectedCallback() {
      checkField(this);
      const fieldEls = Array.from(this.querySelectorAll("input, select, xo-range"));
      each(fieldEls, this.handler);
    }
    disconnectedCallback() {
      const fieldEl = Array.from(this.querySelectorAll("input, select, xo-range"));
      each(fieldEl, (fieldEl2) => {
        if (isField(fieldEl2, "xo-range")) {
          fieldEl2.removeEventListener("change", this.handleRange);
        } else {
          fieldEl2.removeEventListener("change", this.handleInput);
        }
      });
    }
  }
  const _FiltersClear = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", () => {
        const { refine, priceMin, priceMax } = getState$2();
        const { xoName, xoClearAll } = this.options;
        if (xoClearAll) {
          const isVisible = !!filter(refine, (item) => /filter./g.test(item.name)).length;
          attrBoolean.set(this, "xo-visible", isVisible);
        } else {
          attrBoolean.set(this, "xo-visible", false);
        }
        each(refine, (item) => {
          if (!item.name.includes("filter.v.price.") && item.name === xoName) {
            attrBoolean.set(this, "xo-visible", true);
          } else if (item.name.includes("filter.v.price.") && xoName.includes("filter.v.price.")) {
            const [val0, val1] = objectParse(item.value);
            if (val0 !== priceMin || val1 !== priceMax) {
              attrBoolean.set(this, "xo-visible", true);
            }
          }
        });
      });
      __publicField(this, "resetFields", () => {
        const { xoName, xoValue, xoClearAll } = this.options;
        let fieldEls = Array.from(document.querySelectorAll(`${WebComponent.FiltersField} input[type="radio"][name="${xoName}"]${xoValue ? `[value="${escapeValue(xoValue)}"]` : ""}, ${WebComponent.FiltersField} input[type="checkbox"][name="${xoName}"]${xoValue ? `[value="${escapeValue(xoValue)}"]` : ""}, ${WebComponent.FiltersField} xo-range[xo-name="${xoName}"], ${WebComponent.FiltersField} select[name="${xoName}"]`));
        if (xoClearAll) {
          fieldEls = Array.from(document.querySelectorAll(`${WebComponent.FiltersField} input[type="radio"], ${WebComponent.FiltersField} input[type="checkbox"], ${WebComponent.FiltersField} xo-range, ${WebComponent.FiltersField} select`));
        }
        each(fieldEls, (el) => {
          if (el && isField(el, "checkbox") || isField(el, "radio")) {
            el.removeAttribute("checked");
            el.checked = false;
          } else if (isField(el, "xo-range")) {
            el.value = [el.min, el.max];
          } else if (isField(el, "select")) {
            const optionEl = el.querySelector("option");
            el.value = (optionEl == null ? void 0 : optionEl.value) || "";
          }
        });
      });
      __publicField(this, "handleClick", async () => {
        const { xoName, xoValue, xoClearAll } = this.options;
        if (xoClearAll) {
          removeAllRefineAndFormData();
        } else {
          removeRefineItem(xoName, xoValue);
          removeFormDataItem(xoName, xoValue);
          if (xoName.includes("filter.v.price.")) {
            removeRefineItem(sfn.price);
            removeFormDataItem(sfn.price);
          }
        }
        await navigate();
        this.resetFields();
      });
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName", "xoValue", "xoClearAll"],
        types: {
          xoName: "string",
          xoValue: "string",
          xoClearAll: "boolean"
        }
      });
      return {
        ..._FiltersClear.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick);
      this.unsubscribe = subscribe$3(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.removeEventListener("click", this.handleClick);
    }
  };
  let FiltersClear = _FiltersClear;
  __publicField(FiltersClear, "defaultOptions", {
    xoName: "",
    xoClearAll: false
  });
  class FiltersRefine extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "childEls", []);
      __publicField(this, "setEmpty", () => {
        const { refine } = getState$2();
        const isEmpty = !filter(refine, (item) => /filter./g.test(item.name)).length;
        attrBoolean.set(this, "xo-empty", isEmpty);
      });
      __publicField(this, "render", () => {
        const { refine } = getState$2();
        return map(refine, (item) => {
          var _a2, _b2, _c2;
          if (!/filter./g.test(item.name)) {
            return "";
          }
          const fieldEl = document.querySelector(`${WebComponent.FiltersField} input[type="radio"][name="${item.name}"][value="${escapeValue(item.value)}"], ${WebComponent.FiltersField} input[type="checkbox"][name="${item.name}"][value="${item.value}"], ${WebComponent.FiltersField} xo-range[xo-name="${item.name}"]`);
          const label = item.name.includes("filter.v.price.") ? map(objectParse(item.value), (item2) => withMoneyFormat(this, item2)).join(" - ") : (_a2 = fieldEl == null ? void 0 : fieldEl.getAttribute("xo-label")) != null ? _a2 : "";
          const clearIcon = (_c2 = (_b2 = this.querySelector(WebComponent.FiltersRefineClearIcon)) == null ? void 0 : _b2.innerHTML) != null ? _c2 : "<span>&times;</span>";
          return `
        <${WebComponent.FiltersClear} xo-name="${item.name}" xo-value="${item.value}" role="button" tabindex="0">
          ${label} ${clearIcon}
        </${WebComponent.FiltersClear}>
      `;
        });
      });
      __publicField(this, "listener", () => {
        this.setEmpty();
        this.innerHTML = this.render().join("");
        each(this.childEls, (el) => {
          this.appendChild(el);
        });
      });
    }
    connectedCallback() {
      if (this.childEls.length === 0) {
        this.childEls = Array.from(this.childNodes);
      }
      this.setEmpty();
      this.unsubscribe = subscribe$3(this.listener);
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.unsubscribe) == null ? void 0 : _a2.call(this);
    }
  }
  const xoFilters = new Emitter();
  class FiltersContent extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "callback", null);
      __publicField(this, "handleContent", (callback) => {
        this.callback = callback;
      });
      __publicField(this, "listener", async () => {
        const { html, prevHtml, status } = getState$2();
        const currentIndex = Array.from(this.closest(WebComponent.Filters).querySelectorAll(WebComponent.FiltersContent)).indexOf(this);
        await delay();
        if (status === "success") {
          if (html !== prevHtml) {
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(html, "text/html");
            const contentEls = Array.from(doc.querySelectorAll(WebComponent.FiltersContent));
            const contentEl = contentEls[currentIndex];
            if (contentEl) {
              const contentClone = contentEl.cloneNode(true);
              const animateEls = Array.from(contentClone.querySelectorAll('[xo-animate="scroll"]'));
              each(animateEls, (animateEl) => {
                animateEl.setAttribute("xo-animate", "none");
              });
              if (this.callback) {
                if (contentEl.querySelector(WebComponent.Product)) {
                  this.outerHTML = this.callback(contentClone.outerHTML);
                } else {
                  this.outerHTML = contentClone.outerHTML;
                }
              } else {
                this.outerHTML = contentClone.outerHTML;
              }
              xoFilters.emit("done", void 0);
              resetStatus();
            }
          }
        }
      });
    }
    connectedCallback() {
      this.unsubscribe = subscribe$3(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class FiltersFallback extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", () => {
        const { status } = getState$2();
        if (status === "request") {
          attrBoolean.set(this, "xo-visible", true);
        } else if (status === "success") {
          attrBoolean.set(this, "xo-visible", false);
        }
      });
    }
    connectedCallback() {
      this.unsubscribe = subscribe$3(this.listener, (prevState, nextState) => {
        return prevState.status === nextState.status;
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  const _FiltersCount = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "queueId", -1);
      __publicField(this, "listener", () => {
        clearQueue(this.queueId);
        this.queueId = setQueue(() => {
          var _a2;
          const { xoUniqueId } = this.options;
          const { html } = getState$2();
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(html, "text/html");
          const newCountEl = doc.querySelector(`${WebComponent.FiltersCount}[xo-unique-id="${xoUniqueId}"]`);
          if (newCountEl && newCountEl.textContent && this.textContent !== newCountEl.textContent) {
            const count2 = (_a2 = Number(newCountEl.textContent.trim().replace(/\D*/g, ""))) != null ? _a2 : 0;
            this.textContent = newCountEl.textContent;
            const fieldEl = this.closest(WebComponent.FiltersField);
            if (fieldEl) {
              attrBoolean.set(fieldEl, "xo-disabled", count2 === 0);
            }
          }
        });
      });
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoUniqueId"],
        types: {
          xoUniqueId: "string"
        }
      });
      return {
        ..._FiltersCount.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      const { xoUniqueId } = this.options;
      const fieldEl = this.closest(WebComponent.FiltersField);
      if (!xoUniqueId) {
        throw new Error(`${WebComponent.FiltersCount}: Attribute xo-unique-id is required (Note: xo-unique-id is unique)`);
      }
      if (!fieldEl) {
        throw new Error(`${WebComponent.FiltersCount} must be inside ${WebComponent.FiltersField}`);
      }
      this.unsubscribe = subscribe$3(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  };
  let FiltersCount = _FiltersCount;
  __publicField(FiltersCount, "defaultOptions", {
    xoUniqueId: ""
  });
  const _FiltersActiveSize = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", () => {
        const { xoUniqueId } = this.options;
        const { html } = getState$2();
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(html, "text/html");
        const newEl = doc.querySelector(`${WebComponent.FiltersActiveSize}[xo-unique-id="${xoUniqueId}"]`);
        if (newEl && newEl.textContent) {
          this.textContent = newEl.textContent;
        }
      });
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoUniqueId"],
        types: {
          xoUniqueId: "string"
        }
      });
      return {
        ..._FiltersActiveSize.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      const { xoUniqueId } = this.options;
      if (!xoUniqueId) {
        throw new Error(`${WebComponent.FiltersActiveSize}: Attribute xo-unique-id is required (Note: xo-unique-id is unique)`);
      }
      this.unsubscribe = subscribe$3(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  };
  let FiltersActiveSize = _FiltersActiveSize;
  __publicField(FiltersActiveSize, "defaultOptions", {
    xoUniqueId: ""
  });
  class FiltersPaginate extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "anchorEls");
      __publicField(this, "observer");
      __publicField(this, "handleClick", (event) => {
        event.preventDefault();
        const url = new URL(event.currentTarget.href);
        const query = queryString.parse(url.search, true);
        updateFormDataItem("page", query.page, true);
        navigate();
        setRefine();
      });
      __publicField(this, "listener", () => {
        const { html } = getState$2();
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(html, "text/html");
        const newEl = doc.querySelector(WebComponent.FiltersPaginate);
        if (newEl && newEl.innerHTML) {
          this.innerHTML = newEl.innerHTML;
        }
      });
      this.anchorEls = Array.from(this.querySelectorAll("a"));
      this.observer = new MutationObserver(() => {
        this.anchorEls = Array.from(this.querySelectorAll("a"));
        each(this.anchorEls, (el) => {
          el.removeEventListener("click", this.handleClick);
          el.addEventListener("click", this.handleClick);
        });
      });
      this.observer.observe(this, { childList: true });
    }
    connectedCallback() {
      this.unsubscribe = subscribe$3(this.listener);
      each(this.anchorEls, (el) => {
        el.removeEventListener("click", this.handleClick);
        el.addEventListener("click", this.handleClick);
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.observer.disconnect();
      each(this.anchorEls, (el) => {
        el.removeEventListener("click", this.handleClick);
      });
    }
  }
  const styles$j = "";
  handleDesktopMobile();
  createState$3();
  window.xoFilters = xoFilters;
  componentDefine({
    [WebComponent.Filters]: Filters,
    [WebComponent.FiltersField]: FiltersField,
    [WebComponent.FiltersClear]: FiltersClear,
    [WebComponent.FiltersRefine]: FiltersRefine,
    [WebComponent.FiltersContent]: FiltersContent,
    [WebComponent.FiltersFallback]: FiltersFallback,
    [WebComponent.FiltersCount]: FiltersCount,
    [WebComponent.FiltersActiveSize]: FiltersActiveSize,
    [WebComponent.FiltersPaginate]: FiltersPaginate
  });
  const icons = {
    arrow: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="18" viewBox="0 0 263.7 473.1" xml:space="preserve">
  <path d="M244.5,473.1c-4.9,0-9.8-1.9-13.6-5.6L0,236.5L230.9,5.6c7.5-7.5,19.7-7.5,27.2,0c7.5,7.5,7.5,19.7,0,27.2L54.3,236.5 l203.7,203.7c7.5,7.5,7.5,19.7,0,27.2C254.3,471.2,249.4,473.1,244.5,473.1z"/>
</svg>`,
    close: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff"  width="18" x="0px" y="0px" viewBox="0 0 56.213 55.962" xml:space="preserve">
  <path d="M48.82,53.907,27.483,32.572,6.146,53.907a3.6,3.6,0,0,1-5.091-5.09L22.393,27.481,1.055,6.145a3.6,3.6,0,0,1,5.09-5.09L27.483,22.391,48.82,1.055a3.6,3.6,0,0,1,5.09,5.09L32.573,27.482,53.911,48.818a3.6,3.6,0,1,1-5.09,5.09Z" transform="translate(0.747 0.5)"/>
</svg>`
  };
  let id = 0;
  const _Gallery = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "itemEls", []);
      __publicField(this, "portalEl", null);
      __publicField(this, "portalContent");
      __publicField(this, "_options");
      __publicField(this, "queueId", -1);
      __publicField(this, "setOptions", () => {
        this.options = {
          ...getAttrs(this, {
            pick: ["xoPortalType", "xoAnimate", "xoDuration", "xoEasing", "xoBackdropColor", "xoSync", "xoPortalClass"],
            types: {
              xoPortalType: "string",
              xoAnimate: "string",
              xoDuration: "number",
              xoEasing: "string",
              xoBackdropColor: "string",
              xoSync: "boolean",
              xoPortalClass: "string"
            }
          })
        };
      });
      __publicField(this, "renderPortal", (itemEl, index) => {
        const { xoAnimate, xoDuration, xoEasing, xoBackdropColor, xoPortalType } = this.options;
        const name = this.getAttribute("xo-name");
        itemEl.setAttribute("xo-name", `${name}`);
        itemEl.setAttribute("xo-index", `${index}`);
        const width = itemEl.getAttribute("xo-intrinsic-width");
        const src = itemEl.getAttribute("xo-src");
        const videoPattern = /\.(mp4|webm|ogg)$/i;
        const isVideo = videoPattern.test(src);
        const srcZoom = width ? imageUrl(src, { width }) : src;
        const image = xoPortalType === "carousel" ? `<${WebComponent.ImageZoom} xo-zoom="1" xo-zoom-src="${srcZoom}" xo-zoom-full><img xo-cropped src="${src}" alt="" width="1000" height="1000" loading="lazy"></${WebComponent.ImageZoom}>` : `<img src="${src}" alt="" width="1000" height="1000" loading="lazy">`;
        const content = isVideo ? `<video src="${src}" controls title="Video" />` : image;
        return `
      <${WebComponent.Modal} xo-video-autoplay="false" xo-portal="false" xo-name="${name}" xo-duration="${xoDuration}" xo-animate="${xoPortalType === "scroll" ? xoAnimate.includes("smart") ? "zoom" : xoAnimate : xoAnimate}" xo-easing="${xoEasing}" xo-backdrop-color="${xoBackdropColor}" xo-backdrop-disabled>
        ${xoPortalType === "carousel" ? `
          <${WebComponent.ModalPan} xo-intentional-axis>
            ${content}
          </${WebComponent.ModalPan}>
        ` : content}
      </${WebComponent.Modal}>
    `;
      });
      __publicField(this, "renderContent", () => {
        const { xoPortalType } = this.options;
        const name = this.getAttribute("xo-name");
        return `
      ${this.portalContent}
      ${xoPortalType === "carousel" ? `
            <${WebComponent.GalleryPrev}>
                ${icons.arrow}
              </${WebComponent.GalleryPrev}>
              <${WebComponent.GalleryNext}>
                ${icons.arrow}
              </${WebComponent.GalleryNext}>
            <${WebComponent.GalleryCounter} xo-name="${name}"></${WebComponent.GalleryCounter}>
            ` : ""}
      <${WebComponent.ModalTrigger} xo-name="${name}">
        ${icons.close}
      </${WebComponent.ModalTrigger}>
    `;
      });
      __publicField(this, "handlePortal", () => {
        const { xoPortalClass, xoPortalType, xoBackdropColor } = this.options;
        const name = this.getAttribute("xo-name");
        const prevPortalEl = document.querySelector(`${WebComponent.GalleryPortal}[xo-name="${name}"]`);
        if (prevPortalEl) {
          prevPortalEl.remove();
        }
        this.itemEls = Array.from(this.querySelectorAll(WebComponent.GalleryItem));
        this.portalContent = map(this.itemEls, this.renderPortal).join("");
        this.portalEl = document.createElement(WebComponent.GalleryPortal);
        this.portalEl.className = xoPortalClass;
        this.portalEl.setAttribute("xo-type", xoPortalType);
        this.portalEl.style.setProperty("--xo-backdrop-color", xoBackdropColor);
        this.portalEl.setAttribute("xo-name", `${name}`);
        this.portalEl.innerHTML = this.renderContent();
        document.body.appendChild(this.portalEl);
      });
      __publicField(this, "init", () => {
        this.setOptions();
        this.handlePortal();
      });
      id++;
    }
    get options() {
      return {
        ..._Gallery.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    connectedCallback() {
      this.setAttribute("xo-name", `${id}`);
      this.queueId = window.requestAnimationFrame(() => {
        this.init();
        window == null ? void 0 : window.cancelAnimationFrame(this.queueId);
      });
    }
    disconnectedCallback() {
      var _a2;
      this.itemEls = [];
      (_a2 = this.portalEl) == null ? void 0 : _a2.remove();
      window.cancelAnimationFrame(this.queueId);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        this.setAttribute("xo-name", `${id}`);
        this.setOptions();
        this.handlePortal();
        const itemEls = Array.from(this.querySelectorAll(WebComponent.GalleryItem));
        each(itemEls, (itemEl) => {
          itemEl.setAttribute("xo-observed", newValue);
        });
      }
    }
  };
  let Gallery = _Gallery;
  __publicField(Gallery, "defaultOptions", {
    xoPortalType: "carousel",
    xoAnimate: "smart-zoom",
    xoDuration: 300,
    xoEasing: "decay",
    xoBackdropColor: "rgba(0, 0, 0, 0.5)",
    xoSync: true,
    xoPortalClass: ""
  });
  function createState$1() {
    xoStore.create("xo-gallery", {
      initialState: {
        indexes: {},
        galleryName: ""
      }
    });
  }
  function setIndex(galleryName, index) {
    xoStore.set("xo-gallery", (state) => ({
      ...state,
      indexes: {
        ...state.indexes,
        [galleryName]: index
      }
    }));
  }
  function setGalleryName(galleryName) {
    xoStore.set("xo-gallery", (state) => ({
      ...state,
      galleryName
    }));
  }
  function next(galleryName) {
    const { indexes } = getState$1();
    const index = indexes[galleryName] || 0;
    const nextIndex = index + 1;
    setIndex(galleryName, nextIndex);
  }
  function prev(galleryName) {
    const { indexes } = getState$1();
    const index = indexes[galleryName] || 0;
    const nextIndex = index - 1;
    setIndex(galleryName, nextIndex);
  }
  function getState$1() {
    return xoStore.get("xo-gallery");
  }
  function subscribe$1(callback) {
    return xoStore.subscribe("xo-gallery", callback);
  }
  class GalleryItem extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "triggerEl");
      __publicField(this, "queueId", -1);
      __publicField(this, "shadow", this.attachShadow({ mode: "open" }));
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", () => {
        const { indexes, galleryName } = getState$1();
        const index = indexes[galleryName];
        const name = this.getAttribute("xo-name");
        this.triggerEl.style.visibility = "visible";
        if (name === galleryName && index === this.getIndex() && this.triggerEl.getAttribute("xo-sync") != null) {
          this.triggerEl.style.visibility = "hidden";
        }
      });
      __publicField(this, "handleClick", (event) => {
        const targetEl = event.target;
        const targetItemEl = targetEl.closest(WebComponent.GalleryItem);
        const index = Number(targetItemEl.getAttribute("xo-index"));
        const name = targetItemEl.getAttribute("xo-name");
        const portalEl = document.querySelector(`${WebComponent.GalleryPortal}[xo-name="${name}"]`);
        if (portalEl) {
          if (portalEl.getAttribute("xo-type") === "scroll") {
            const { offsetTop } = portalEl.children[index];
            portalEl.scrollTo({
              top: offsetTop
            });
          } else {
            portalEl.scrollTo({
              left: index * portalEl.offsetWidth
            });
          }
        }
        setGalleryName(name);
        setIndex(name, index);
      });
      __publicField(this, "init", () => {
        this.triggerEl = this.querySelector(WebComponent.ModalTrigger);
        const galleryEl = this.closest(WebComponent.Gallery);
        if (galleryEl) {
          if (this.getSrc()) {
            const triggerEl = this.querySelector(WebComponent.ModalTrigger);
            if (triggerEl) {
              triggerEl.remove();
            }
            this.insertAdjacentHTML("afterbegin", `<img slot="content" src="${this.getSrc()}" loading="lazy" alt="" width="500" height="500">`);
          } else {
            if (this.children.length > 1) {
              throw new Error(`${WebComponent.GalleryItem} should have only one child.`);
            }
            const mediaEl = this.children[0];
            mediaEl.setAttribute("slot", "content");
          }
          this.triggerEl = this.shadow.querySelector(WebComponent.ModalTrigger);
          this.triggerEl.addEventListener("click", this.handleClick);
          this.unsubscribe = subscribe$1(this.listener);
        }
      });
      __publicField(this, "renderShadow", () => {
        const galleryEl = this.closest(WebComponent.Gallery);
        if (!galleryEl) {
          return "";
        }
        const { xoSync, xoPortalType } = galleryEl.options;
        const sync = xoPortalType === "carousel" ? xoSync : false;
        return `
      <${WebComponent.ModalTrigger} xo-name="${this.getName()}" ${sync && galleryEl.options.xoAnimate === "smart-zoom" ? "xo-sync" : ""}>
        <slot name="content" style="display: block; width: 100%; height: 100%"></slot>
      </${WebComponent.ModalTrigger}>
    `;
      });
      this.triggerEl = this.querySelector(WebComponent.ModalTrigger);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getSrc() {
      return this.getAttribute("xo-thumb-src") || "";
    }
    getName() {
      return this.getAttribute("xo-name") || "";
    }
    getIndex() {
      return Number(this.getAttribute("xo-index"));
    }
    async connectedCallback() {
      this.queueId = window.requestAnimationFrame(() => {
        this.shadow.innerHTML = this.renderShadow();
        this.init();
        window == null ? void 0 : window.cancelAnimationFrame(this.queueId);
      });
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.triggerEl) == null ? void 0 : _a2.removeEventListener("click", this.handleClick);
      this.unsubscribe();
      window.cancelAnimationFrame(this.queueId);
      this.removeEventListener("mouseenter", this.init);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        await delay(100);
        const { galleryName } = getState$1();
        setIndex(galleryName, -1);
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }
  }
  class GalleryPortal extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "unsubscribe2", () => {
      });
      __publicField(this, "listener", () => {
        const { indexes, galleryName } = getState$1();
        const index = indexes[galleryName];
        const galleryEl = document.querySelector(`${WebComponent.Gallery}[xo-name="${galleryName}"]`);
        if ((galleryEl == null ? void 0 : galleryEl.getAttribute("xo-portal-type")) === "carousel") {
          const videoEls = Array.from(this.querySelectorAll(`${WebComponent.Modal} video`));
          each(videoEls, (videoEl, i) => {
            if (i === index) {
              videoEl.play();
            } else {
              videoEl.pause();
            }
          });
        }
        if (index >= 0) {
          xoStore.set("xo-modal", (prevState) => {
            var _a2;
            return {
              ...prevState,
              data: {
                ...prevState.data,
                [this.getName()]: {
                  ...prevState.data[this.getName()],
                  triggerElement: (_a2 = galleryEl == null ? void 0 : galleryEl.querySelectorAll(WebComponent.GalleryItem)[index].querySelector(WebComponent.ModalTrigger)) != null ? _a2 : null
                }
              }
            };
          });
        }
      });
      __publicField(this, "handleScroll", () => {
        const { indexes, galleryName } = getState$1();
        const index = indexes[galleryName];
        const { scrollLeft } = this;
        const nextIndex = Math.round(scrollLeft / this.offsetWidth);
        if (index !== nextIndex) {
          setIndex(galleryName, nextIndex);
        }
      });
    }
    getName() {
      return this.getAttribute("xo-name") || "";
    }
    connectedCallback() {
      this.addEventListener("scroll", this.handleScroll);
      this.unsubscribe = xoStore.subscribe("xo-modal", (state) => {
        var _a2, _b2;
        const isOpen = (_b2 = (_a2 = state.data) == null ? void 0 : _a2[this.getName()]) == null ? void 0 : _b2.isOpen;
        attrBoolean.set(this, "xo-active", isOpen);
        if (isOpen) {
          this.setAttribute("popover", "manual");
          openPopover(this);
          document.body.style.overflow = "hidden";
        } else {
          this.removeAttribute("popover");
          closePopover(this);
          document.body.style.removeProperty("overflow");
          const videoEls = Array.from(this.querySelectorAll(`${WebComponent.Modal} video`));
          each(videoEls, (videoEl) => {
            videoEl.pause();
          });
        }
      });
      this.unsubscribe2 = subscribe$1(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.unsubscribe2();
      this.removeEventListener("scroll", this.handleScroll);
    }
  }
  const GAP = 20;
  class GalleryPrev extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "handleClick", () => {
        const portalEl = this.closest(WebComponent.GalleryPortal);
        const name = portalEl.getAttribute("xo-name") || "";
        if (portalEl.scrollLeft - portalEl.offsetWidth >= GAP) {
          portalEl.scrollTo(portalEl.scrollLeft - portalEl.offsetWidth, 0);
          prev(name);
        } else {
          portalEl.scrollTo(portalEl.scrollWidth - portalEl.offsetWidth, 0);
          const index = Math.round((portalEl.scrollWidth - portalEl.offsetWidth) / portalEl.offsetWidth);
          setIndex(name, index);
        }
      });
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class GalleryNext extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "handleClick", () => {
        const portalEl = this.closest(WebComponent.GalleryPortal);
        const name = portalEl.getAttribute("xo-name") || "";
        if (portalEl.scrollLeft + portalEl.offsetWidth < portalEl.scrollWidth - portalEl.offsetWidth) {
          portalEl.scrollTo(portalEl.scrollLeft + portalEl.offsetWidth, 0);
          next(name);
        } else {
          portalEl.scrollTo(0, 0);
          setIndex(name, 0);
        }
      });
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class GalleryCounter extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "listener", () => {
        const { indexes } = getState$1();
        const index = indexes[this.name];
        const galleryEl = document.querySelector(`${WebComponent.Gallery}[xo-name="${this.name}"]`);
        if (galleryEl) {
          this.innerText = `${index + 1} / ${galleryEl.querySelectorAll(WebComponent.GalleryItem).length}`;
        }
      });
      this.unsubscribe = subscribe$1(this.listener);
    }
    get name() {
      return this.getAttribute("xo-name") || "";
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  const styles$i = "";
  createState$1();
  componentDefine({
    [WebComponent.Gallery]: Gallery,
    [WebComponent.GalleryItem]: GalleryItem,
    [WebComponent.GalleryPortal]: GalleryPortal,
    [WebComponent.GalleryPrev]: GalleryPrev,
    [WebComponent.GalleryNext]: GalleryNext,
    [WebComponent.GalleryCounter]: GalleryCounter
  });
  const QUANTITY_NAME = "quantity";
  const QUICKVIEW_SIGNAL = "quickview_field";
  const STICKY_SIGNAL = "sticky_field";
  const QUICKVIEW_NAME = "quickview";
  const BUNDLE_CARD_ITEM_ATTR = "xo-bundle-item";
  const BUNDLE_CARD_PRICE_ATTR = "xo-bundle-price";
  const BINDING_ATTR = "xo-binding";
  const BUNDLE_PROP_ATTR = "xo-bundle-property";
  const FORM_CART_ADD_SELECTOR = 'form[action*="/cart/add"]';
  const FORM_CART_ADD_SELECTOR_2 = 'form[action*="/cart/add"]:not([xo-buy-ignore])';
  const MAX_PERCENT$1 = 100;
  async function addCart$1(el, variantId, quantity, productId, recipientState, variantSelected, sellingRadio, sellingPlan, productPropsArr) {
    const formData = new FormData();
    formData.append("form_type", "product");
    formData.append("utf8", "\u2713");
    formData.append("id", variantId);
    formData.append("quantity", `${quantity}`);
    formData.append("product-id", productId);
    if (sellingRadio != null) {
      formData.append("selling_radio", sellingRadio);
    }
    if (sellingPlan != null) {
      formData.append("selling_plan", sellingPlan);
    }
    const recipientEnableName = "properties[__shopify_send_gift_card_to_recipient]";
    if (recipientState == null ? void 0 : recipientState[recipientEnableName]) {
      for (const name in recipientState) {
        const value = recipientState[name];
        formData.append(name, value);
      }
    }
    if (productPropsArr == null ? void 0 : productPropsArr.length) {
      each(Object.entries(productPropsArr[0]), ([prop, value]) => {
        if (!formData.get(prop)) {
          formData.append(prop, value);
        }
      });
    }
    formData.append("sections", getServiceSections());
    formData.append("section_url", window.location.pathname);
    if (variantSelected) {
      for (const name in variantSelected) {
        const value = variantSelected[name];
        formData.append(name, value);
      }
    }
    const formEl = el.closest(FORM_CART_ADD_SELECTOR);
    const formDataFromEl = new FormData(formEl || void 0);
    formDataFromEl.forEach((value, key) => {
      formData.append(key, value);
    });
    const res = await fetch(`${window.Shopify.routes.root}cart/add`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/javascript",
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status === 404) {
      return Promise.reject(new Error(res.statusText));
    }
    if (res.status === 422) {
      const data2 = await res.json();
      if (typeof (data2 == null ? void 0 : data2.description) === "string") {
        return Promise.reject(new Error(data2.description));
      }
      return Promise.reject(new Error(data2.message));
    }
    const data = await res.json();
    if (data.status) {
      return Promise.reject(data);
    }
    return data;
  }
  async function addCartMulti(variantIds, quantities, productPropsArr) {
    const items = map(variantIds, (variantId, index) => {
      var _a2;
      return {
        id: variantId,
        quantity: quantities.length === 1 ? quantities[0] : (_a2 = quantities[index]) != null ? _a2 : 1,
        ...productPropsArr ? { properties: Object.fromEntries(Object.entries(productPropsArr[index]).map(([key, value]) => [key.replace(/properties\[|\]/g, ""), value])) } : {}
      };
    });
    const bodyObj = {
      items,
      sections: getServiceSections(),
      section_url: window.location.pathname
    };
    const res = await fetch(`${window.Shopify.routes.root}cart/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status === 404) {
      return Promise.reject(new Error(res.statusText));
    }
    const data = await res.json();
    if (data.errors) {
      return Promise.reject(data);
    }
    return data;
  }
  async function changeCart$1(line, quantity) {
    const res = await fetch(`${window.Shopify.routes.root}cart/change`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        line,
        quantity,
        sections: getServiceSections(),
        section_url: window.location.pathname
      })
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status === 404) {
      return Promise.reject(new Error(res.statusText));
    }
    const data = await res.json();
    if (data.errors) {
      return Promise.reject(data);
    }
    return data;
  }
  async function changeCartByVariantId(id2, quantity) {
    const res = await fetch(`${window.Shopify.routes.root}cart/change`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id2,
        quantity,
        sections: getServiceSections(),
        section_url: window.location.pathname
      })
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status === 404) {
      return Promise.reject(new Error(res.statusText));
    }
    const data = await res.json();
    if (data.errors) {
      return Promise.reject(data);
    }
    return data;
  }
  async function postCartNote$1(note) {
    const res = await fetch(`${window.Shopify.routes.root}cart/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        note
      })
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status !== 200 && res.status !== 201) {
      return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return data;
  }
  async function postCartDiscount$1(discountCodeValue, sectionId, currentDiscountCode, isAdd) {
    const res = await fetch(`${window.Shopify.routes.root}cart/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        discount: discountCodeValue,
        sections: getServiceSections()
      })
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status !== 200 && res.status !== 201) {
      return Promise.reject(res.statusText);
    }
    const data = await res.json();
    if (data.discount_codes.find((discount) => {
      return discount.code === discountCodeValue && discount.applicable === false;
    })) {
      return Promise.reject(new Error("discount_code"));
    }
    const newHtml = data.sections[sectionId];
    const parsedHtml = new DOMParser().parseFromString(newHtml, "text/html");
    const sectionEl = parsedHtml.querySelector(`${WebComponent.Cart}#${sectionId}, ${WebComponent.CartMini}#${sectionId}`);
    const discountItemEls = Array.from((sectionEl == null ? void 0 : sectionEl.querySelectorAll(WebComponent.CartDiscountItem)) || []);
    if (sectionEl && isAdd) {
      const existingSectionEl = document.querySelector(`${WebComponent.Cart}#${sectionId}, ${WebComponent.CartMini}#${sectionId}`);
      const existingDiscountItemEls = Array.from((existingSectionEl == null ? void 0 : existingSectionEl.querySelectorAll(WebComponent.CartDiscountItem)) || []);
      const existingDiscounts = existingDiscountItemEls.map((element) => element.getAttribute("xo-discount-code") || "").filter(Boolean);
      const codes = discountItemEls.map((element) => element.getAttribute("xo-discount-code") || "").filter(Boolean);
      if (codes.length === existingDiscounts.length && codes.every((code) => existingDiscounts.includes(code)) && data.discount_codes.find((discount) => {
        return discount.code === currentDiscountCode && discount.applicable === true;
      })) {
        return Promise.reject(new Error("shipping"));
      }
    }
    return data;
  }
  async function getShippingRates(zip, country, province) {
    const res = await fetch(`${window.Shopify.routes.root}cart/shipping_rates.json?shipping_address[zip]=${zip}&shipping_address[country]=${country}&shipping_address[province]=${province}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status === 404) {
      return Promise.reject(new Error(res.statusText));
    }
    const data = await res.json();
    if (!data.shipping_rates) {
      return Promise.reject(objectValues(data).flatMap((item) => item));
    }
    return data;
  }
  async function getProductHtml$1(url) {
    const res = await fetch(url, {
      method: "GET"
    });
    if (window.XO_DEV) {
      await delay(400);
    }
    if (res.status !== 200 && res.status !== 201) {
      return Promise.reject(res.statusText);
    }
    const data = await res.text();
    return data;
  }
  async function getPickupAvailability(variantId) {
    const res = await fetch(`${window.Shopify.routes.root}variants/${variantId}/?section_id=pickup-availability`, {
      method: "GET"
    });
    if (res.status !== 200 && res.status !== 201) {
      return Promise.reject(res.statusText);
    }
    const data = await res.text();
    return data;
  }
  const services = {
    addCart: addCart$1,
    addCartMulti,
    changeCart: changeCart$1,
    changeCartByVariantId,
    getProductHtml: getProductHtml$1,
    postCartNote: postCartNote$1,
    postCartDiscount: postCartDiscount$1,
    getShippingRates,
    getPickupAvailability
  };
  const htmlCache = /* @__PURE__ */ new Map();
  const pickupHtmlCache = /* @__PURE__ */ new Map();
  function createProductState() {
    xoStore.create("xo-product", {
      initialState: {
        status: "idle",
        observed: 1,
        productHtml: "",
        pickupAvailabilityHtml: "",
        quickviewProductHtml: {},
        quickviewTriggerEl: void 0,
        featuredProductHtmls: {},
        productData: {}
      }
    });
  }
  function setProductData(productData) {
    xoStore.set("xo-product", (prevState) => {
      return {
        ...prevState,
        observed: prevState.observed + 1,
        productData: {
          ...prevState.productData,
          [productData.id]: productData
        }
      };
    })("xo-product/setProductData");
  }
  async function getProductHtml(url, featured = false) {
    const newUrl = new URL(url);
    newUrl.search = "";
    const productUrl = newUrl.href;
    try {
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          status: "loading",
          observed: prevState.observed + 1
        };
      })("xo-product/getProductHtml/request");
      let productHtml = "";
      if (htmlCache.has(url)) {
        productHtml = htmlCache.get(url);
      } else {
        productHtml = await services.getProductHtml(url);
        htmlCache.set(url, productHtml);
      }
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          status: "success",
          observed: prevState.observed + 1,
          productHtml: featured ? prevState.productHtml : productHtml,
          featuredProductHtmls: featured ? {
            ...prevState.featuredProductHtmls,
            [productUrl]: productHtml
          } : prevState.featuredProductHtmls,
          productUrl
        };
      })("xo-product/getProductHtml/success");
    } catch {
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          observed: prevState.observed + 1,
          status: "error"
        };
      })("xo-product/getProductHtml/failure");
    }
  }
  async function getQuickviewProductHtml(name, url, quickviewTriggerEl) {
    const newUrl = new URL(url);
    newUrl.search = "";
    const productUrl = newUrl.href;
    try {
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          observed: prevState.observed + 1,
          quickviewTriggerEl,
          status: "loading"
        };
      })("xo-product/getQuickviewProductHtml/request");
      let productHtml = "";
      if (htmlCache.has(url)) {
        productHtml = htmlCache.get(url);
      } else {
        productHtml = await services.getProductHtml(url);
        htmlCache.set(url, productHtml);
      }
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          status: "success",
          observed: prevState.observed + 1,
          quickviewProductHtml: {
            ...prevState.quickviewProductHtml,
            [name]: productHtml
          },
          productUrl
        };
      })("xo-product/getQuickviewProductHtml/success");
    } catch {
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          observed: prevState.observed + 1,
          status: "error"
        };
      })("xo-product/getQuickviewProductHtml/failure");
    }
  }
  async function getPickupAvailabilityHtml(sectionId, productId) {
    try {
      const variantId = getVariantId(sectionId, productId);
      let pickupAvailabilityHtml = "";
      if (pickupHtmlCache.has(variantId)) {
        pickupAvailabilityHtml = pickupHtmlCache.get(variantId);
      } else {
        pickupAvailabilityHtml = await services.getPickupAvailability(variantId);
        pickupHtmlCache.set(variantId, pickupAvailabilityHtml);
      }
      xoStore.set("xo-product", (prevState) => {
        return {
          ...prevState,
          observed: prevState.observed + 1,
          pickupAvailabilityHtml
        };
      })("xo-product/getPickupAvailabilityHtml");
    } catch (error) {
      console.log(error);
    }
  }
  function updateObserved() {
    xoStore.set("xo-product", (prevState) => {
      return {
        ...prevState,
        observed: prevState.observed + 1
      };
    })("xo-product/updateObserved");
  }
  function getProductState() {
    return xoStore.get("xo-product");
  }
  function productSubscribe(listener) {
    return xoStore.subscribe("xo-product", listener, (prev2, next2) => {
      return (prev2 == null ? void 0 : prev2.observed) === (next2 == null ? void 0 : next2.observed);
    });
  }
  const initialState = {
    "properties[__shopify_send_gift_card_to_recipient]": "",
    "properties[Message]": "",
    "properties[Recipient email]": "",
    "properties[Recipient name]": "",
    "properties[Send on]": ""
  };
  function createRecipientState() {
    xoStore.create("xo-recipient", {
      initialState
    });
  }
  function setRecipientState(name, value) {
    xoStore.set("xo-recipient", (prevState) => ({
      ...prevState,
      [name]: value
    }))("xo-cart/setRecipientState");
  }
  function resetRecipientState() {
    xoStore.set("xo-recipient", initialState)("xo-cart/resetRecipientState");
  }
  function getRecipientState() {
    return xoStore.get("xo-recipient");
  }
  function recipientSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-recipient", listener, equal2);
  }
  function createCartState() {
    xoStore.create("xo-cart", {
      initialState: {
        addIdLoading: "",
        isAdded: false,
        variantId: "",
        changeLineLoading: -1,
        addErrorMessage: "",
        changeErrorMessage: "",
        size: 0,
        sections: {
          [WebComponent.Cart]: ""
        }
      }
    });
  }
  function setCartSize(size) {
    xoStore.set("xo-cart", (prevState) => ({
      ...prevState,
      size
    }))("xo-cart/setCartSize");
  }
  function addCartRequest(sectionId, productId) {
    const id2 = getId(sectionId, productId);
    xoStore.set("xo-cart", (prevState) => ({
      ...prevState,
      addIdLoading: id2,
      addErrorMessage: "",
      isAdded: false,
      variantId: "",
      productIdsForCartNotification: void 0
    }))("xo-cart/addCartRequest");
  }
  async function addCartSuccess(el, sectionId, productId, variantIdParam, hasCartError, quantity, sellingRadio, sellingPlan, productProps) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
    const id2 = getId(sectionId, productId);
    try {
      let variantId = productId;
      const { productData } = getProductState();
      const productVariants = (_a2 = productData == null ? void 0 : productData[productId]) == null ? void 0 : _a2.variants;
      if ((_b2 = productVariants == null ? void 0 : productVariants[0]) == null ? void 0 : _b2.id) {
        variantId = (_c2 = productVariants == null ? void 0 : productVariants[0]) == null ? void 0 : _c2.id;
      }
      const variantSelected = (_e2 = (_d2 = getCartFormState()) == null ? void 0 : _d2[id2]) == null ? void 0 : _e2.variantSelected;
      if (variantIdParam) {
        variantId = variantIdParam;
      } else {
        variantId = getVariantId(sectionId, productId) || variantId;
      }
      const recipientState = getRecipientState();
      const data = await services.addCart(el, variantId, quantity, productId, recipientState, variantSelected, sellingRadio, sellingPlan, productProps);
      xoStore.set("xo-cart", (prevState) => {
        return {
          ...prevState,
          size: prevState.size + quantity,
          sections: data.sections,
          item: data,
          addIdLoading: "",
          isAdded: true,
          variantId,
          productIdsForCartNotification: [`${data.id}`]
        };
      })("xo-cart/addCartSuccess");
    } catch (err) {
      const cartError = err;
      const errorMsg = (_g2 = (_f2 = cartError == null ? void 0 : cartError.description) != null ? _f2 : cartError == null ? void 0 : cartError.message) != null ? _g2 : cartError == null ? void 0 : cartError.errors;
      addCartFailure(errorMsg);
      if (errorMsg && !hasCartError && !((_h2 = window.xbEditor) == null ? void 0 : _h2.designMode)) {
        xoToast.push({
          content: errorMsg,
          className: "xo-cart-add-error",
          placement: "top-center",
          delay: 4e3
        });
      }
    }
  }
  async function addCartMultiSuccess(sectionId, productIds, variantIdsParam, hasCartError, isBundle, quantitiesParam, productProps) {
    var _a2, _b2, _c2;
    try {
      let variantIds = productIds;
      let quantities = quantitiesParam;
      if (variantIdsParam.length) {
        variantIds = variantIdsParam;
      } else if (!isBundle) {
        variantIds = productIds.reduce((acc, productId) => {
          var _a3, _b3, _c3;
          const variantId = getVariantId(sectionId, productId);
          const unavailable = !variantId;
          if (unavailable) {
            return acc;
          }
          if (quantitiesParam.length === 1 && quantitiesParam[0] === 1) {
            const id2 = getId(sectionId, productId);
            quantities = [...quantities, (_c3 = (_b3 = (_a3 = getCartFormState()) == null ? void 0 : _a3[id2]) == null ? void 0 : _b3.quantity) != null ? _c3 : 1];
          }
          return [...acc, variantId];
        }, []);
      }
      const data = await services.addCartMulti(variantIds, quantities, productProps);
      xoStore.set("xo-cart", (prevState) => {
        return {
          ...prevState,
          size: data.items.reduce((acc, item) => acc + item.quantity, 0),
          sections: data.sections,
          items: data.items,
          addIdLoading: "",
          isAdded: true,
          productIdsForCartNotification: map(variantIds, (variantId) => `${variantId}`)
        };
      })("xo-cart/addCartSuccess");
    } catch (err) {
      const cartError = err;
      const errorMsg = (_b2 = (_a2 = cartError == null ? void 0 : cartError.description) != null ? _a2 : cartError == null ? void 0 : cartError.message) != null ? _b2 : cartError == null ? void 0 : cartError.errors;
      addCartFailure(errorMsg);
      if (errorMsg && !hasCartError && !((_c2 = window.xbEditor) == null ? void 0 : _c2.designMode)) {
        xoToast.push({
          content: errorMsg,
          className: "xo-cart-add-error",
          placement: "top-center",
          delay: 4e3
        });
      }
    }
  }
  function addCartFailure(addErrorMessage) {
    xoStore.set("xo-cart", (prevState) => ({
      ...prevState,
      addIdLoading: "",
      addErrorMessage,
      isAdded: false,
      variantId: ""
    }))("xo-cart/addCartFailure");
  }
  async function addCart(el, sectionId, productId, variantId, quantity, hasCartError, checkoutRedirection = false, cartRedirection = false, quantities, sellingRadio, sellingPlan, productProps, isBundle = false) {
    addCartRequest(sectionId, productId);
    if (/^\[|\]$/g.test(productId) || /^\[|\]$/g.test(variantId)) {
      const productIds = productId ? objectParse(productId) : [];
      const variantIds = variantId ? objectParse(variantId) : [];
      await addCartMultiSuccess(sectionId, productIds, variantIds, hasCartError, isBundle, quantities ? quantities : [quantity], productProps);
    } else {
      await addCartSuccess(el, sectionId, productId, variantId, hasCartError, quantity, sellingRadio, sellingPlan, productProps);
    }
    if (checkoutRedirection) {
      window.location.href = `${window.Shopify.routes.root}checkout`;
    }
    if (cartRedirection) {
      window.location.href = `${window.Shopify.routes.root}cart`;
    }
  }
  function changeCartRequest(line) {
    xoStore.set("xo-cart", (prevState) => ({
      ...prevState,
      changeLineLoading: line,
      changeErrorMessage: ""
    }))("xo-cart/changeCartRequest");
  }
  async function changeCartSuccess(line, quantity) {
    var _a2, _b2;
    try {
      const data = await services.changeCart(line, quantity);
      xoStore.set("xo-cart", (prevState) => {
        return {
          ...prevState,
          size: data.item_count,
          sections: data.sections,
          changeLineLoading: -1
        };
      })("xo-cart/changeCartSuccess");
    } catch (err) {
      const cartError = err;
      const errorMsg = (_a2 = cartError == null ? void 0 : cartError.errors) != null ? _a2 : err == null ? void 0 : err.message;
      changeCartFailure(errorMsg);
      if (errorMsg && !((_b2 = window.xbEditor) == null ? void 0 : _b2.designMode)) {
        xoToast.push({
          content: errorMsg,
          className: "xo-cart-change-error",
          placement: "top-center",
          delay: 4e3
        });
      }
    }
  }
  function changeCartFailure(changeErrorMessage) {
    xoStore.set("xo-cart", (prevState) => ({
      ...prevState,
      changeLineLoading: -1,
      changeErrorMessage
    }))("xo-cart/changeCartFailure");
  }
  async function changeCart(line, quantity) {
    changeCartRequest(line);
    await changeCartSuccess(line, quantity);
  }
  function updateCartSections(sections) {
    xoStore.set("xo-cart", (prevState) => ({
      ...prevState,
      sections
    }))("xo-cart/updateCartSections");
  }
  function getCartState() {
    return xoStore.get("xo-cart");
  }
  function cartSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-cart", listener, equal2);
  }
  function createCartDiscountState() {
    xoStore.create("xo-cart-discount", {
      initialState: {
        status: "idle",
        currentDiscountCode: "",
        discountCodes: [],
        errorMessage: "",
        shippingErrorMessage: ""
      }
    });
  }
  function setCartDiscountMessages(errorMessage, shippingErrorMessage) {
    xoStore.set("xo-cart-discount", (prevState) => ({
      ...prevState,
      errorMessage,
      shippingErrorMessage
    }))("xo-cart/setCartDiscountMessages");
  }
  function setCartDiscountCodes(discountCodes) {
    xoStore.set("xo-cart-discount", (prevState) => ({
      ...prevState,
      discountCodes
    }))("xo-cart/setCartDiscountCodes");
  }
  function appendCartDiscountCode(discountCode) {
    const codes = discountCode.replace(/\s/g, "").split(",");
    xoStore.set("xo-cart-discount", (prevState) => ({
      ...prevState,
      currentDiscountCode: discountCode,
      discountCodes: [.../* @__PURE__ */ new Set([...prevState.discountCodes, ...codes])]
    }))("xo-cart/appendCartDiscountCode");
  }
  function removeCartDiscountCode(discountCode) {
    xoStore.set("xo-cart-discount", (prevState) => ({
      ...prevState,
      discountCodes: prevState.discountCodes.filter((code) => code !== discountCode)
    }))("xo-cart/removeCartDiscountCode");
  }
  function postCartDiscountRequest() {
    xoStore.set("xo-cart-discount", (prevState) => ({
      ...prevState,
      status: "loading"
    }));
  }
  async function postCartDiscountSuccess(sectionId, isAdd) {
    try {
      const { discountCodes, currentDiscountCode } = xoStore.get("xo-cart-discount");
      const discount = discountCodes.join(",").replace(/\s/g, "");
      const data = await services.postCartDiscount(discount, sectionId, currentDiscountCode, isAdd);
      xoStore.set("xo-cart-discount", (prevState) => {
        return {
          ...prevState,
          status: "success",
          discountCodes: [],
          currentDiscountCode: ""
        };
      })("xo-cart/postCartDiscountSuccess");
      updateCartSections(data.sections);
    } catch (err) {
      if (err instanceof Error) {
        postCartDiscountFailure(err.message);
      } else {
        postCartDiscountFailure("Error");
      }
    }
  }
  function postCartDiscountFailure(type) {
    xoStore.set("xo-cart-discount", (prevState) => ({
      ...prevState,
      status: "error",
      discountCodes: [],
      currentDiscountCode: ""
    }))("xo-cart/postCartDiscountFailure");
    xoToast.push({
      content: xoStore.get("xo-cart-discount")[type === "discount_code" ? "errorMessage" : "shippingErrorMessage"] || "Discount code cannot be applied to your cart.",
      className: "xo-cart-discount-error",
      placement: "top-center",
      delay: 4e3
    });
  }
  async function postCartDiscount(sectionId, isAdd = false) {
    postCartDiscountRequest();
    await postCartDiscountSuccess(sectionId, isAdd);
  }
  async function deleteCartDiscount(sectionId, discountCode) {
    removeCartDiscountCode(discountCode);
    await postCartDiscount(sectionId);
  }
  function getCartDiscountState() {
    return xoStore.get("xo-cart-discount");
  }
  function cartDiscountSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-cart-discount", listener, equal2);
  }
  class CreateSignal {
    constructor() {
      __publicField(this, "hasFieldSignal", (value) => {
        return /\[|\]/g.test(value);
      });
      __publicField(this, "addFieldSignal", (value, signal) => {
        if (this.hasFieldSignal(value)) {
          return value;
        }
        return `[${signal}]${value}`;
      });
      __publicField(this, "removeFieldSignal", (value) => {
        return value.replace(/^\[.*\]/g, "");
      });
    }
  }
  const fieldSignal = new CreateSignal();
  function isProductPage() {
    if (window.XO_DEV) {
      return true;
    }
    return window.location.pathname.includes("/products/");
  }
  function quantityChangeCart(el, line, quantity) {
    const cartEl = el.closest(WebComponent.Cart) || el.closest(WebComponent.CartMini);
    if (cartEl) {
      changeCart(line, quantity);
    }
  }
  function getId(sectionId, productId, suffix) {
    if (!productId) {
      if (suffix != null) {
        return `${sectionId}/${suffix}`;
      }
      return sectionId;
    }
    if (suffix != null) {
      return `${sectionId}/${productId}/${suffix}`;
    }
    return `${sectionId}/${productId}`;
  }
  function getSectionHTML(type, html, productIdsForCartNotification) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, "text/html");
    const shopifySectionEl = doc.querySelector(".shopify-section");
    const productEls = Array.from(doc.querySelectorAll(`${WebComponent.Product}[xo-product-id]`));
    if (productIdsForCartNotification) {
      each(productEls, (productEl) => {
        const productId = productEl.getAttribute("xo-product-id");
        if (!productIdsForCartNotification.includes(productId)) {
          productEl.remove();
        }
      });
    }
    const cartEl = shopifySectionEl.querySelector(WebComponent.Cart);
    if (cartEl) {
      return type === "inner" ? cartEl.innerHTML : cartEl.outerHTML;
    }
    const cartMiniEl = shopifySectionEl.querySelector(WebComponent.CartMini);
    if (cartMiniEl) {
      return type === "inner" ? cartMiniEl.innerHTML : cartMiniEl.outerHTML;
    }
    return type === "inner" ? shopifySectionEl.innerHTML : shopifySectionEl.outerHTML;
  }
  function getVariantId(sectionId, productId) {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
    const id2 = getId(sectionId, productId);
    const productEl = document.querySelector(`${WebComponent.Product}[xo-product-id="${productId}"][xo-section-id="${sectionId}"]`);
    if (productEl == null ? void 0 : productEl.getOptions().xoSelectedOrFirstAvailableVariantId) {
      return ((_b2 = (_a2 = getCartFormState()) == null ? void 0 : _a2[id2]) == null ? void 0 : _b2.variantId) || "";
    }
    let variantId = "";
    const variantSelected = (_d2 = (_c2 = getCartFormState()) == null ? void 0 : _c2[id2]) == null ? void 0 : _d2.variantSelected;
    const { productData } = getProductState();
    const productVariants = (_e2 = productData == null ? void 0 : productData[productId]) == null ? void 0 : _e2.variants;
    if ((productVariants == null ? void 0 : productVariants.length) === 1) {
      return productVariants[0].id;
    }
    if (productVariants) {
      if (variantSelected) {
        const optionsSelected = objectValues(variantSelected);
        variantId = (_g2 = (_f2 = productVariants.find((variant) => {
          if (variant.options.length === optionsSelected.length) {
            return equal(variant.options.sort(), optionsSelected.sort());
          } else {
            return variant.options.sort().toString().includes(optionsSelected.sort().toString());
          }
        })) == null ? void 0 : _f2.id) != null ? _g2 : "";
      } else {
        variantId = productVariants[0].id;
      }
    }
    return variantId;
  }
  function checkInstockAndAvailable(sectionId, productId, name, value) {
    var _a2, _b2, _c2;
    const id2 = getId(sectionId, productId);
    const variantSelected = (_b2 = (_a2 = getCartFormState()) == null ? void 0 : _a2[id2]) == null ? void 0 : _b2.variantSelected;
    const { productData } = getProductState();
    const productVariants = (_c2 = productData == null ? void 0 : productData[productId]) == null ? void 0 : _c2.variants;
    if (variantSelected && productVariants) {
      const optionsSelected = objectValues({ ...variantSelected, [name]: value }).filter(Boolean);
      return productVariants.some((variant) => {
        if (variant.options.length !== optionsSelected.length) {
          return true;
        }
        return equal(variant.options.sort(), optionsSelected.sort()) && variant.available;
      });
    }
    return true;
  }
  function checkAvailable(sectionId, productId, name, value) {
    var _a2, _b2, _c2;
    const id2 = getId(sectionId, productId);
    const variantSelected = (_b2 = (_a2 = getCartFormState()) == null ? void 0 : _a2[id2]) == null ? void 0 : _b2.variantSelected;
    const { productData } = getProductState();
    const productVariants = (_c2 = productData == null ? void 0 : productData[productId]) == null ? void 0 : _c2.variants;
    if (variantSelected && productVariants) {
      const optionsSelected = objectValues({ ...variantSelected, [name]: value }).filter(Boolean);
      return productVariants.some((variant) => {
        if (variant.options.length !== optionsSelected.length) {
          return true;
        }
        return variant.options.every((option) => optionsSelected.includes(option));
      });
    }
    return true;
  }
  function toggleParentModal(el, open = true) {
    var _a2;
    const modalEl = el.closest(WebComponent.Modal) || el.closest(WebComponent.Popover);
    if (modalEl && (modalEl.getAttribute("xo-for-cart-mini") === null || el.localName === WebComponent.CartMini)) {
      const modalName = (_a2 = modalEl.getAttribute("xo-name")) != null ? _a2 : "";
      if (modalEl.localName === WebComponent.Modal) {
        xoModal[open ? "open" : "close"](modalName);
      } else {
        xoPopover[open ? "open" : "close"](modalName);
      }
    }
  }
  function getCartLine(productEl) {
    const cartEl = productEl.closest(WebComponent.Cart) || productEl.closest(WebComponent.CartMini);
    if (!cartEl) {
      return;
    }
    const lineAttr = productEl.getAttribute("xo-line");
    if (lineAttr) {
      return Number(lineAttr);
    }
    const currentProductHtml = productEl.outerHTML;
    const productEls = Array.from(cartEl.querySelectorAll(`${WebComponent.CartWillChange} ${WebComponent.Product}`));
    const productHtmls = reduce(productEls, (acc, productEl2) => {
      const productHtml = productEl2.outerHTML;
      if (acc.includes(productHtml)) {
        return acc;
      }
      return [...acc, productHtml];
    }, []);
    const index = productHtmls.indexOf(currentProductHtml);
    const cartLine = index + 1;
    return cartLine;
  }
  function getServiceSections() {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
    if (window.Xotiny) {
      const cartId = (_b2 = (_a2 = document.querySelector(WebComponent.Cart)) == null ? void 0 : _a2.id) != null ? _b2 : "";
      const cartMiniId = (_d2 = (_c2 = document.querySelector(WebComponent.CartMini)) == null ? void 0 : _c2.id) != null ? _d2 : "";
      return window.location.pathname.includes("/cart") ? [cartId, cartMiniId] : [cartMiniId];
    }
    const cartNotificationEl = document.querySelector("cart-notification");
    const cartItemSectionId = (_g2 = (_f2 = (_e2 = document.querySelector('.shopify-section[id^="shopify-section-template--"][id$="__cart-items"]')) == null ? void 0 : _e2.id) == null ? void 0 : _f2.replace(/^shopify-section-/g, "")) != null ? _g2 : "";
    const cartFooterSectionId = (_j2 = (_i2 = (_h2 = document.querySelector('.shopify-section[id^="shopify-section-template--"][id$="__cart-footer"]')) == null ? void 0 : _h2.id) == null ? void 0 : _i2.replace(/^shopify-section-/g, "")) != null ? _j2 : "";
    if (cartNotificationEl) {
      return window.location.pathname.includes("/cart") ? [cartItemSectionId, cartFooterSectionId, "cart-icon-bubble", "cart-live-region-text"].filter(Boolean) : ["cart-notification-product", "cart-notification-button", "cart-icon-bubble"];
    }
    return window.location.pathname.includes("/cart") ? [cartItemSectionId, cartFooterSectionId, "cart-icon-bubble", "cart-live-region-text"].filter(Boolean) : ["cart-drawer", "cart-icon-bubble"];
  }
  function getSellingPlan() {
    var _a2, _b2;
    const sellingRadioEls = Array.from(document.querySelectorAll('input[name="selling_radio"]'));
    const sellingPlanEl = document.querySelector('input[name="selling_plan"]');
    const sellingRadio = (_a2 = sellingRadioEls.find((el) => el.checked)) == null ? void 0 : _a2.value;
    const sellingPlan = sellingPlanEl ? (_b2 = sellingPlanEl == null ? void 0 : sellingPlanEl.value) != null ? _b2 : "" : void 0;
    return { sellingRadio, sellingPlan };
  }
  function getProductProperties(productEl) {
    if (!productEl) {
      return void 0;
    }
    let result = void 0;
    const inputTextEls = Array.from(productEl.querySelectorAll('input[type="text"][name^="properties["], input[type="number"][name^="properties["], input[type="hidden"][name^="properties["], textarea[name^="properties["]'));
    const inputRadioEls = Array.from(productEl.querySelectorAll('input[type="radio"][name^="properties["], input[type="checkbox"][name^="properties["]'));
    const selectEls = Array.from(productEl.querySelectorAll('select[name^="properties["]'));
    each(inputTextEls, (el) => {
      if (el.value) {
        result = { ...result, [el.name]: el.value };
      }
    });
    each(inputRadioEls, (el) => {
      if (el.checked) {
        result = { ...result, [el.name]: el.value };
      }
    });
    each(selectEls, (el) => {
      if (el.value) {
        result = { ...result, [el.name]: el.value };
      }
    });
    return result;
  }
  function getCompareAtPrice(price, percentValue) {
    const compareAtPrice = Math.round(price - price * percentValue / MAX_PERCENT$1 + 0.4);
    return compareAtPrice;
  }
  function reselectAvailableVariants(el, productEl, fieldSelector) {
    var _a2, _b2, _c2;
    let clicked = false;
    const fieldEls = Array.from((_b2 = (_a2 = productEl.querySelector(`${WebComponent.ProductVariant}[xo-primary]`)) == null ? void 0 : _a2.querySelectorAll(fieldSelector)) != null ? _b2 : []);
    if (!fieldEls.length) {
      return;
    }
    const { xoProductId, xoSectionId } = productEl.getOptions();
    const variantId = getVariantId(xoSectionId, xoProductId);
    const currentFieldEl = fieldEls.find((fieldEl) => fieldEl.checked);
    if (currentFieldEl && !variantId && !clicked) {
      const { productData } = getProductState();
      const productVariants = (_c2 = productData == null ? void 0 : productData[xoProductId]) == null ? void 0 : _c2.variants;
      const availableVariant = productVariants == null ? void 0 : productVariants.find((productVariant) => {
        return productVariant.available && productVariant.options.includes(currentFieldEl.value);
      });
      if (availableVariant) {
        const { options } = availableVariant;
        each(options, (option) => {
          const fieldEl = el.querySelector(`input[value="${option}"]`);
          if (fieldEl && !fieldEl.checked) {
            fieldEl.click();
            clicked = true;
          }
        });
      }
    }
  }
  function setCartDiscountCodesAction(el) {
    const discountItemEls = Array.from(el.querySelectorAll(WebComponent.CartDiscountItem));
    const codes = discountItemEls.map((element) => element.getAttribute("xo-discount-code") || "").filter(Boolean);
    setCartDiscountCodes(codes);
  }
  function getCartSize(doc = document) {
    const cartMiniEl = doc.querySelector(WebComponent.CartMini);
    const quantityEls = Array.from((cartMiniEl == null ? void 0 : cartMiniEl.querySelectorAll(`${WebComponent.Product}[xo-line] input[name="quantity"]`)) || []);
    return quantityEls.reduce((acc, el) => acc + Number(el.value), 0) || 0;
  }
  function getProductType(productEl) {
    const { xoProductInformation, xoFeaturedProduct } = productEl.getOptions();
    if (xoFeaturedProduct) {
      return "featured";
    }
    const quickViewEl = productEl.closest(WebComponent.ProductQuickView);
    if (xoProductInformation && quickViewEl) {
      return "quickview";
    }
    return "information";
  }
  function getFieldEls(el) {
    return Array.from(el.querySelectorAll('input[type="radio"], select'));
  }
  function createCartFormState() {
    xoStore.create("xo-cart-form", {
      initialState: {}
    });
  }
  function setFormQuantity(sectionId, productId, line, callback) {
    const id2 = getId(sectionId, productId, line);
    xoStore.set("xo-cart-form", (prevState) => {
      var _a2, _b2;
      const prevQuantity = (_b2 = (_a2 = prevState == null ? void 0 : prevState[id2]) == null ? void 0 : _a2[QUANTITY_NAME]) != null ? _b2 : 1;
      return {
        ...prevState,
        [id2]: {
          ...prevState == null ? void 0 : prevState[id2],
          [QUANTITY_NAME]: Math.max(1, callback(prevQuantity))
        }
      };
    })("xo-cart-form/setFormQuantity");
  }
  function setFormVariant(sectionId, productId, name, value) {
    const id2 = getId(sectionId, productId);
    xoStore.set("xo-cart-form", (prevState) => {
      var _a2;
      return {
        ...prevState,
        [id2]: {
          ...prevState == null ? void 0 : prevState[id2],
          variantSelected: {
            ...(_a2 = prevState == null ? void 0 : prevState[id2]) == null ? void 0 : _a2.variantSelected,
            [name]: value
          }
        }
      };
    })("xo-cart-form/setFormVariant");
  }
  function setVariantId(sectionId, productId, variantId) {
    const id2 = getId(sectionId, productId);
    xoStore.set("xo-cart-form", (prevState) => {
      return {
        ...prevState,
        [id2]: {
          ...prevState == null ? void 0 : prevState[id2],
          variantId
        }
      };
    })("xo-cart-form/setVariantId");
  }
  function getCartFormState() {
    return xoStore.get("xo-cart-form");
  }
  function cartFormSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-cart-form", listener, equal2);
  }
  function createCartNoteState() {
    xoStore.create("xo-cart-note", {
      initialState: {
        status: "idle",
        note: "",
        noteDraft: ""
      }
    });
  }
  function setCartNoteDraft(note) {
    xoStore.set("xo-cart-note", (prevState) => ({
      ...prevState,
      noteDraft: note
    }))("xo-cart/setCartNoteDraft");
  }
  function postCartNoteRequest() {
    xoStore.set("xo-cart-note", (prevState) => ({
      ...prevState,
      status: "loading"
    }));
  }
  async function postCartNoteSuccess(note) {
    try {
      const data = await services.postCartNote(note);
      xoStore.set("xo-cart-note", (prevState) => {
        return {
          ...prevState,
          status: "success",
          note: data.note
        };
      })("xo-cart/postCartNoteSuccess");
    } catch {
      postCartNoteFailure();
    }
  }
  function postCartNoteFailure() {
    xoStore.set("xo-cart-note", (prevState) => ({
      ...prevState,
      status: "error"
    }))("xo-cart/postCartNoteFailure");
  }
  async function postCartNote(note) {
    postCartNoteRequest();
    await postCartNoteSuccess(note);
  }
  function getCartNoteState() {
    return xoStore.get("xo-cart-note");
  }
  function cartNoteSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-cart-note", listener, equal2);
  }
  function createCartShippingRatesState() {
    xoStore.create("xo-cart-shipping-rates", {
      initialState: {
        status: "idle",
        shippingRates: [],
        errorMessages: []
      }
    });
  }
  function getCartShippingRatesRequest() {
    xoStore.set("xo-cart-shipping-rates", (prevState) => ({
      ...prevState,
      status: "loading"
    }));
  }
  async function getCartShippingRatesSuccess(zip, country, province) {
    try {
      const data = await services.getShippingRates(zip, country, province);
      xoStore.set("xo-cart-shipping-rates", (prevState) => {
        return {
          ...prevState,
          status: "success",
          shippingRates: data.shipping_rates
        };
      })("xo-cart/getCartShippingRatesSuccess");
    } catch (err) {
      if (Array.isArray(err)) {
        const error = err;
        getCartShippingRatesFailure(error);
      } else {
        getCartShippingRatesFailure([err.message]);
      }
    }
  }
  function getCartShippingRatesFailure(error) {
    xoStore.set("xo-cart-shipping-rates", (prevState) => ({
      ...prevState,
      status: "error",
      errorMessages: error
    }))("xo-cart/getCartShippingRatesFailure");
  }
  async function getCartShippingRates(zip, country, province) {
    getCartShippingRatesRequest();
    await getCartShippingRatesSuccess(zip, country, province);
  }
  function getCartShippingRatesState() {
    return xoStore.get("xo-cart-shipping-rates");
  }
  function cartShippingRatesSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-cart-shipping-rates", listener, equal2);
  }
  function createCartShippingRatesFormState() {
    xoStore.create("xo-cart-shipping-rates-form", {
      initialState: {
        zip: "",
        country: "",
        province: "",
        provinces: []
      }
    });
  }
  function setCartShippingRatesField(name, value) {
    xoStore.set("xo-cart-shipping-rates-form", (prevState) => ({
      ...prevState,
      [name]: value
    }))("xo-cart-shipping-rates-form/setCartShippingRatesField");
  }
  function setProvinces(provinces) {
    xoStore.set("xo-cart-shipping-rates-form", (prevState) => ({
      ...prevState,
      provinces
    }))("xo-cart-shipping-rates-form/setProvinces");
  }
  function getCartShippingRatesFormState() {
    return xoStore.get("xo-cart-shipping-rates-form");
  }
  function cartShippingRatesFormSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-cart-shipping-rates-form", listener, equal2);
  }
  function createBundleState() {
    xoStore.create("xo-bundle", {
      initialState: {
        observed: 1,
        bundles: {}
      }
    });
  }
  function addBundleItem(name, item) {
    xoStore.set("xo-bundle", (prevState) => {
      var _a2, _b2;
      const prevItems = (_b2 = (_a2 = prevState.bundles) == null ? void 0 : _a2[name]) != null ? _b2 : [];
      if (prevItems.some((prevItem) => prevItem.productId === item.productId && prevItem.variantId === item.variantId)) {
        return {
          ...prevState,
          observed: prevState.observed + 1,
          bundles: {
            ...prevState.bundles,
            [name]: prevItems.map((prevItem) => {
              if (prevItem.productId === item.productId && prevItem.variantId === item.variantId) {
                return {
                  ...prevItem,
                  quantity: prevItem.quantity + 1
                };
              }
              return prevItem;
            })
          }
        };
      }
      return {
        ...prevState,
        observed: prevState.observed + 1,
        bundles: {
          ...prevState.bundles,
          [name]: [...prevItems, item]
        }
      };
    })("xo-bundle/addBundleItem");
  }
  function removeBundleItem(name, variantId) {
    xoStore.set("xo-bundle", (prevState) => {
      return {
        ...prevState,
        observed: prevState.observed + 1,
        bundles: {
          ...prevState.bundles,
          [name]: prevState.bundles[name].filter((item) => item.variantId !== variantId)
        }
      };
    })("xo-bundle/removeBundleItem");
  }
  function removeBundleAllItem(name) {
    xoStore.set("xo-bundle", (prevState) => {
      return {
        ...prevState,
        observed: prevState.observed + 1,
        bundles: {
          ...prevState.bundles,
          [name]: []
        }
      };
    })("xo-bundle/removeBundleAllItem");
  }
  function updateBundleQuantity(name, variantId, quantity) {
    xoStore.set("xo-bundle", (prevState) => {
      return {
        ...prevState,
        bundles: {
          ...prevState.bundles,
          [name]: prevState.bundles[name].map((item) => {
            if (item.variantId !== variantId) {
              return item;
            }
            return {
              ...item,
              quantity: Math.max(1, quantity)
            };
          })
        }
      };
    })("xo-bundle/updateQuantity");
  }
  function updateBundleQuantityByType(name, variantId, type) {
    xoStore.set("xo-bundle", (prevState) => {
      return {
        ...prevState,
        bundles: {
          ...prevState.bundles,
          [name]: prevState.bundles[name].map((item) => {
            if (item.variantId !== variantId) {
              return item;
            }
            return {
              ...item,
              quantity: Math.max(1, item.quantity + (type === "inc" ? 1 : -1))
            };
          })
        }
      };
    })("xo-bundle/updateBundleQuantityByType");
  }
  function clearBundle(name) {
    xoStore.set("xo-bundle", (prevState) => {
      return {
        ...prevState,
        observed: prevState.observed + 1,
        bundles: {
          ...prevState.bundles,
          [name]: []
        }
      };
    })("xo-bundle/clearBundle");
  }
  function getBundleState() {
    return xoStore.get("xo-bundle");
  }
  function bundleSubscribe(listener, equal2) {
    return xoStore.subscribe("xo-bundle", listener, equal2);
  }
  function createState() {
    createCartState();
    createCartFormState();
    createProductState();
    createCartNoteState();
    createCartDiscountState();
    createCartShippingRatesState();
    createCartShippingRatesFormState();
    createRecipientState();
    createBundleState();
  }
  const getState = {
    cart: getCartState,
    cartForm: getCartFormState,
    product: getProductState,
    cartNote: getCartNoteState,
    cartDiscount: getCartDiscountState,
    cartShippingRates: getCartShippingRatesState,
    cartShippingRatesForm: getCartShippingRatesFormState,
    recipient: getRecipientState,
    bundle: getBundleState
  };
  const subscribe = {
    cart: cartSubscribe,
    cartForm: cartFormSubscribe,
    product: productSubscribe,
    cartNote: cartNoteSubscribe,
    cartDiscount: cartDiscountSubscribe,
    cartShippingRates: cartShippingRatesSubscribe,
    cartShippingRatesForm: cartShippingRatesFormSubscribe,
    recipient: recipientSubscribe,
    bundle: bundleSubscribe
  };
  class Cart extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
    }
    connectedCallback() {
      if (!this.id) {
        throw new Error(`The ${WebComponent.Cart} component must have the id="{{ section.id }}" attribute`);
      }
      this.unsubscribe = subscribe.cart((state) => {
        const newContent = state.sections[this.id];
        const isLoading = state.changeLineLoading !== -1;
        if (newContent && this.innerHTML !== newContent && !isLoading) {
          const willChangeEls = Array.from(this.querySelectorAll(WebComponent.CartWillChange));
          if (willChangeEls.length) {
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(newContent, "text/html");
            const newCartWillChangeEls = doc.querySelectorAll(`${WebComponent.Cart} ${WebComponent.CartWillChange}`);
            if (!newCartWillChangeEls.length) {
              return;
            }
            each(willChangeEls, (willChangeEl, index) => {
              const uid = willChangeEl.getAttribute("xo-unique-id");
              let newCartWillChangeEl = null;
              if (uid) {
                newCartWillChangeEl = doc.querySelector(`${WebComponent.CartWillChange}[xo-unique-id="${uid}"]`);
              } else {
                newCartWillChangeEl = newCartWillChangeEls[index];
              }
              if (newCartWillChangeEl && willChangeEl.outerHTML !== (newCartWillChangeEl == null ? void 0 : newCartWillChangeEl.outerHTML)) {
                willChangeEl.innerHTML = newCartWillChangeEl.innerHTML;
                const attrs = Array.from(newCartWillChangeEl.attributes);
                each(attrs, (attr) => {
                  willChangeEl.setAttribute(attr.name, attr.value);
                });
              }
            });
          } else {
            this.innerHTML = getSectionHTML("outer", newContent);
          }
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class CartAdd extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "bundleUnsubscribe", () => {
      });
      __publicField(this, "bundleProviderEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "variantsEl", this.closest(WebComponent.ProductVariants));
      __publicField(this, "controller", new AbortController());
      __publicField(this, "getSectionId", () => {
        var _a2;
        const xoSectionId = (_a2 = this.getProductOptions()) == null ? void 0 : _a2.xoSectionId;
        return xoSectionId || getShopifySectionId(this);
      });
      __publicField(this, "getQuantityFromProductVariant", () => {
        var _a2;
        const quantityEl = (_a2 = this.closest(WebComponent.ProductVariant)) == null ? void 0 : _a2.querySelector(`${WebComponent.CartQuantity} input`);
        const value = quantityEl == null ? void 0 : quantityEl.value;
        if (value) {
          return Number(value);
        }
      });
      __publicField(this, "getQuantitiesFromProductVariant", () => {
        var _a2, _b2;
        const quantityEls = Array.from((_b2 = (_a2 = this.closest(WebComponent.ProductVariants)) == null ? void 0 : _a2.querySelectorAll(`${WebComponent.ProductVariant}[xo-variant-id] ${WebComponent.CartQuantity} input`)) != null ? _b2 : []);
        return quantityEls.reduce((acc, el) => {
          const value = Number(el.value);
          if (!value || isNaN(value)) {
            return acc;
          }
          return [...acc, value];
        }, []);
      });
      __publicField(this, "getVariantIdFromProductVariant", () => {
        var _a2, _b2;
        const quantityEls = Array.from((_b2 = (_a2 = this.closest(WebComponent.ProductVariants)) == null ? void 0 : _a2.querySelectorAll(`${WebComponent.ProductVariant}[xo-variant-id] ${WebComponent.CartQuantity} input`)) != null ? _b2 : []);
        return quantityEls.reduce((acc, el) => {
          const quantity = Number(el.value);
          if (!quantity || isNaN(quantity)) {
            return acc;
          }
          const productVariantEl = el.closest(WebComponent.ProductVariant);
          return [...acc, productVariantEl.getAttribute("xo-variant-id")];
        }, []);
      });
      __publicField(this, "handleAddToCart", async (event) => {
        var _a2, _b2, _c2, _d2;
        try {
          event.preventDefault();
          const cart = getState.cart();
          const { xoProductId, xoProductQuantity, xoCartOpened = true, xoCheckoutRedirection = false, xoCartRedirection = false, xoProductQuantities, xoTestFly, xoForBundle, xoVariantId = "", xoDisabled, xoSectionId } = this.getOptions();
          if (xoDisabled) {
            return;
          }
          const hasCartError = !!((_a2 = this.closest(WebComponent.Product)) == null ? void 0 : _a2.querySelector(WebComponent.CartAddError));
          const properties = getProductProperties(this.closest(WebComponent.Product));
          let propertiesArr = properties ? [properties] : void 0;
          if (!xoProductId) {
            return;
          }
          const quickviewEl = this.closest(WebComponent.ProductQuickView);
          const sectionId = this.getSectionId();
          if (this.productEl) {
            const id2 = getId(sectionId, xoProductId);
            let quantity = (_d2 = (_c2 = (_b2 = getState.cartForm()) == null ? void 0 : _b2[id2]) == null ? void 0 : _c2.quantity) != null ? _d2 : 1;
            let quantities = xoProductQuantities;
            let variantId = xoVariantId;
            if (xoVariantId) {
              const quantityFromProductVariant = this.getQuantityFromProductVariant();
              if (quantityFromProductVariant) {
                quantity = quantityFromProductVariant;
              }
            }
            if (this.variantsEl) {
              quantities = this.getQuantitiesFromProductVariant();
              const variantIds = this.getVariantIdFromProductVariant();
              if (!variantIds.length) {
                return;
              }
              variantId = JSON.stringify(variantIds);
            }
            if (cart.addIdLoading !== id2 && xoProductId) {
              const { sellingRadio, sellingPlan } = getSellingPlan();
              await addCart(this, sectionId, xoProductId, variantId, xoProductQuantity != null ? xoProductQuantity : quantity, hasCartError, xoCheckoutRedirection, xoCartRedirection, quantities, sellingRadio, sellingPlan, propertiesArr);
              if (quickviewEl) {
                toggleParentModal(this, false);
              }
            }
          } else {
            const id2 = getId(xoSectionId, xoProductId);
            if (cart.addIdLoading !== id2 && xoProductId) {
              let quantity = xoProductQuantity != null ? xoProductQuantity : 1;
              if (xoVariantId) {
                const quantityFromProductVariant = this.getQuantityFromProductVariant();
                if (quantityFromProductVariant) {
                  quantity = quantityFromProductVariant;
                }
              }
              if (xoForBundle) {
                propertiesArr = this.getAttribute("xo-product-props") ? JSON.parse(this.getAttribute("xo-product-props")) : void 0;
              }
              await addCart(this, xoSectionId, xoProductId, xoVariantId, quantity, hasCartError, xoCheckoutRedirection, xoCartRedirection, xoProductQuantities, void 0, void 0, propertiesArr, xoForBundle);
              if (this.bundleProviderEl) {
                const { xoName } = this.bundleProviderEl.props;
                clearBundle(xoName);
              }
            }
          }
          const nextCart = getState.cart();
          if (xoCartOpened && nextCart.addErrorMessage === "") {
            const cartMiniEl = document.querySelector(WebComponent.CartMini);
            if (cartMiniEl) {
              await delay(quickviewEl ? 300 : 0);
              toggleParentModal(cartMiniEl);
            }
          }
          if (nextCart.addErrorMessage === "" || xoTestFly) {
            this.handleCartFly();
          }
        } catch {
        }
      });
      __publicField(this, "handleCartFly", () => {
        const cartFlyEl = document.querySelector(WebComponent.CartFly);
        cartFlyEl == null ? void 0 : cartFlyEl.handle(this);
      });
      __publicField(this, "handleBundle", () => {
        const { xoForBundle } = this.getOptions();
        if (xoForBundle && this.bundleProviderEl) {
          const { xoName } = this.bundleProviderEl.props;
          this.bundleUnsubscribe = subscribe.bundle(({ bundles }) => {
            var _a2;
            const bundle = (_a2 = bundles == null ? void 0 : bundles[xoName || this.getSectionId()]) != null ? _a2 : [];
            if (bundle.length === 0) {
              this.removeAttribute("xo-product-quantities");
              this.removeAttribute("xo-product-id");
              this.removeAttribute("xo-product-props");
              attrBoolean.set(this, "xo-disabled", true);
            } else {
              this.setAttribute("xo-product-quantities", `[${bundle.map((item) => item.quantity).join(",")}]`);
              this.setAttribute("xo-product-id", `[${bundle.map((item) => item.variantId).join(",")}]`);
              const properties = bundle.map((item) => item.properties).filter((item) => item);
              if (properties.length) {
                this.setAttribute("xo-product-props", JSON.stringify(properties));
              }
              attrBoolean.set(this, "xo-disabled", false);
            }
          });
        }
      });
    }
    getOptions() {
      var _a2, _b2, _c2;
      const options = getAttrs(this, {
        pick: [
          "xoProductId",
          "xoSectionId",
          "xoProductQuantity",
          "xoCartOpened",
          "xoDisabled",
          "xoCheckoutRedirection",
          "xoCartRedirection",
          "xoProductQuantities",
          "xoTestFly",
          "xoForBundle",
          "xoVariantId"
        ],
        types: {
          xoProductId: "string",
          xoSectionId: "string",
          xoProductQuantity: "number",
          xoCartOpened: "boolean",
          xoDisabled: "boolean",
          xoCheckoutRedirection: "boolean",
          xoCartRedirection: "boolean",
          xoProductQuantities: "array",
          xoForBundle: "boolean",
          xoTestFly: "boolean",
          xoVariantId: "string"
        }
      });
      if (this.productEl) {
        return {
          ...options,
          xoProductId: (_b2 = options.xoProductId) != null ? _b2 : (_a2 = this.getProductOptions()) == null ? void 0 : _a2.xoProductId
        };
      } else {
        return {
          ...options,
          xoSectionId: (_c2 = options.xoSectionId) != null ? _c2 : "single"
        };
      }
    }
    static get observedAttributes() {
      return ["xo-product-id", "xo-product-quantity", "xo-disabled"];
    }
    get productEl() {
      return this.closest(WebComponent.Product);
    }
    getProductOptions() {
      var _a2;
      return (_a2 = this.productEl) == null ? void 0 : _a2.getOptions();
    }
    connectedCallback() {
      this.handleBundle();
      const { xoProductId, xoDisabled = false, xoForBundle } = this.getOptions();
      if (!xoForBundle && (xoDisabled || !xoProductId)) {
        return;
      }
      const buttonEl = this.querySelector("button");
      if (buttonEl) {
        buttonEl.addEventListener("click", this.handleAddToCart, { signal: this.controller.signal });
      } else {
        this.addEventListener("click", this.handleAddToCart, { signal: this.controller.signal });
      }
      this.unsubscribe = subscribe.cart(({ addIdLoading }) => {
        const { xoProductId: xoProductId2, xoSectionId } = this.getOptions();
        if (xoProductId2) {
          let id2 = "";
          if (this.productEl) {
            const sectionId = this.getSectionId();
            id2 = getId(sectionId, xoProductId2);
          } else {
            id2 = getId(xoSectionId, xoProductId2);
          }
          attrBoolean.set(this, "xo-loading", addIdLoading === id2);
          bindingHelper(this, "xo-loading-binding", addIdLoading === id2);
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.bundleUnsubscribe();
      this.controller.abort();
    }
  }
  class CartRemove extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "handleClick", async (event) => {
        event.preventDefault();
        const cartLine = getCartLine(this.productEl);
        if (cartLine) {
          await changeCart(cartLine, 0);
        }
      });
    }
    get productEl() {
      return this.closest(WebComponent.Product);
    }
    connectedCallback() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.CartRemove} must be inside ${WebComponent.Product}`);
      }
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class CartSize extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "prevSize", 0);
      __publicField(this, "timeId", -1);
      __publicField(this, "unsubscribe", () => {
      });
    }
    connectedCallback() {
      const defaultSize = getCartSize();
      this.prevSize = defaultSize;
      setCartSize(defaultSize);
      this.unsubscribe = subscribe.cart(async (state) => {
        this.innerText = `${state.size}`;
        if ((this.prevSize !== state.size || attrBoolean.get(this, "xo-test-fly")) && !state.addIdLoading) {
          const cartFlyEndEl = document.querySelector("[xo-cart-fly-end]");
          if (cartFlyEndEl) {
            clearTimeout(this.timeId);
            attrBoolean.set(cartFlyEndEl, "xo-cart-fly-end-animated", false);
            await delay();
            attrBoolean.set(cartFlyEndEl, "xo-cart-fly-end-animated", true);
            const animationDuration = Number(window.getComputedStyle(cartFlyEndEl).animationDuration.replace("s", "")) * 1e3;
            const animationDelay = Number(window.getComputedStyle(cartFlyEndEl).animationDelay.replace("s", "")) * 1e3;
            this.timeId = window.setTimeout(() => {
              attrBoolean.set(cartFlyEndEl, "xo-cart-fly-end-animated", false);
            }, animationDuration + animationDelay);
          }
        }
        this.prevSize = state.size;
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      clearTimeout(this.timeId);
    }
  }
  class CartMini extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "cartScrollEl", null);
      __publicField(this, "scScrollTop", 0);
      __publicField(this, "handleScroll", () => {
        var _a2, _b2;
        this.scScrollTop = (_b2 = (_a2 = this.cartScrollEl) == null ? void 0 : _a2.scrollTop) != null ? _b2 : this.scScrollTop;
      });
    }
    connectedCallback() {
      var _a2;
      if (!this.id) {
        throw new Error(`The ${WebComponent.CartMini} component must have the id="{{ section.id }}" attribute`);
      }
      const modalEl = this.closest(WebComponent.Modal);
      this.cartScrollEl = this.querySelector(WebComponent.CartScroll);
      if (modalEl) {
        attrBoolean.set(modalEl, "xo-for-cart-mini", true);
      }
      (_a2 = this.cartScrollEl) == null ? void 0 : _a2.addEventListener("scroll", this.handleScroll);
      this.unsubscribe = subscribe.cart((state) => {
        var _a3, _b2;
        const newContent = state.sections[this.id];
        if (newContent) {
          const isLoading = state.changeLineLoading !== -1;
          if (isLoading) {
            this.scScrollTop = (_b2 = (_a3 = this.cartScrollEl) == null ? void 0 : _a3.scrollTop) != null ? _b2 : this.scScrollTop;
          } else {
            const isNotification = attrBoolean.get(this, "xo-notification");
            if (this.innerHTML !== newContent) {
              const willChangeEls = Array.from(this.querySelectorAll(WebComponent.CartWillChange));
              if (willChangeEls.length) {
                const domParser = new DOMParser();
                const doc = domParser.parseFromString(newContent, "text/html");
                const newCartWillChangeEls = doc.querySelectorAll(`${WebComponent.CartMini} ${WebComponent.CartWillChange}`);
                if (!newCartWillChangeEls.length) {
                  return;
                }
                each(willChangeEls, (willChangeEl, index) => {
                  const uid = willChangeEl.getAttribute("xo-unique-id");
                  let newCartWillChangeEl = null;
                  if (uid) {
                    newCartWillChangeEl = doc.querySelector(`${WebComponent.CartWillChange}[xo-unique-id="${uid}"]`);
                  } else {
                    newCartWillChangeEl = newCartWillChangeEls[index];
                  }
                  if (newCartWillChangeEl && willChangeEl.outerHTML !== (newCartWillChangeEl == null ? void 0 : newCartWillChangeEl.outerHTML)) {
                    willChangeEl.innerHTML = newCartWillChangeEl.innerHTML;
                    const attrs = Array.from(newCartWillChangeEl.attributes);
                    each(attrs, (attr) => {
                      willChangeEl.setAttribute(attr.name, attr.value);
                    });
                  }
                });
              } else {
                this.innerHTML = getSectionHTML("inner", newContent, isNotification ? state.productIdsForCartNotification : void 0);
              }
              this.cartScrollEl = this.querySelector(WebComponent.CartScroll);
              if (this.cartScrollEl) {
                this.cartScrollEl.scrollTop = this.scScrollTop;
              }
            }
          }
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      if (this.cartScrollEl) {
        this.cartScrollEl.removeEventListener("scroll", this.handleScroll);
      }
    }
  }
  class CartChangeFallback extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
    }
    get productEl() {
      return this.closest(WebComponent.Product);
    }
    connectedCallback() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.CartChangeFallback} must be inside ${WebComponent.Product}.`);
      }
      this.unsubscribe = subscribe.cart(({ changeLineLoading }) => {
        const cartLine = getCartLine(this.productEl);
        if (cartLine) {
          attrBoolean.set(this, "xo-visible", cartLine === changeLineLoading);
          bindingHelper(this, "xo-visible-binding", cartLine === changeLineLoading);
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class CartQuantity extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "inputEl", null);
      __publicField(this, "bundleProviderEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "handleInput", (event) => {
        var _a2;
        const targetEl = event.target;
        const value = (_a2 = Number(targetEl.value)) != null ? _a2 : 1;
        if (value < 1) {
          targetEl.value = "1";
        }
        const { xoSectionId, xoProductId, xoLine } = this.productOptions;
        setFormQuantity(xoSectionId, xoProductId, xoLine, () => Number(targetEl.value));
      });
      __publicField(this, "handleInputForBundle", (event) => {
        var _a2;
        const { xoName } = this.bundleProviderEl.props;
        const targetEl = event.target;
        const value = (_a2 = Number(targetEl.value)) != null ? _a2 : 1;
        if (value < 1) {
          targetEl.value = "1";
        }
        const variantId = this.getAttribute("xo-variant-id");
        if (variantId) {
          updateBundleQuantity(xoName, variantId, Number(targetEl.value));
        }
      });
      __publicField(this, "handleBlur", (event) => {
        const { xoCartExclude = false } = this.productOptions;
        const targetEl = event.target;
        const cartLine = getCartLine(this.getProductEl());
        if (cartLine && !xoCartExclude) {
          quantityChangeCart(this, cartLine, Number(targetEl.value));
        }
      });
    }
    getProductEl() {
      return this.closest(WebComponent.Product);
    }
    getBundleContentEl() {
      return this.closest(WebComponent.BundleContent);
    }
    get productOptions() {
      return this.getProductEl().getOptions();
    }
    connectedCallback() {
      var _a2, _b2, _c2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        return;
      }
      const forBundle = this.getBundleContentEl();
      this.inputEl = this.querySelector("input");
      if (!this.inputEl) {
        throw new Error(`${WebComponent.CartQuantity} must have an input number element`);
      }
      this.inputEl.name = QUANTITY_NAME;
      if (this.inputEl.value == null || this.inputEl.value === "") {
        this.inputEl.value = (_b2 = this.getAttribute("xo-min")) != null ? _b2 : "1";
      }
      this.inputEl.min = (_c2 = this.getAttribute("xo-min")) != null ? _c2 : "1";
      const productVariantEl = this.closest(`${WebComponent.ProductVariant}, ${WebComponent.ProductVariants}`);
      if (productVariantEl) {
        return;
      }
      if (forBundle && this.bundleProviderEl) {
        const { xoName } = this.bundleProviderEl.props;
        this.inputEl.addEventListener("input", this.handleInputForBundle);
        const variantId = this.getAttribute("xo-variant-id");
        if (variantId) {
          this.unsubscribe = subscribe.bundle(({ bundles }) => {
            var _a3;
            const bundle = ((_a3 = bundles == null ? void 0 : bundles[xoName]) != null ? _a3 : []).find((item) => item.variantId === variantId);
            const quantity = bundle == null ? void 0 : bundle.quantity;
            if (quantity != null) {
              this.inputEl.value = `${quantity}`;
            }
          });
        }
      } else {
        const { xoSectionId, xoProductId, xoLine } = this.productOptions;
        setFormQuantity(xoSectionId, xoProductId, xoLine, () => {
          var _a3, _b3;
          return Number((_b3 = (_a3 = this.inputEl) == null ? void 0 : _a3.value) != null ? _b3 : 1);
        });
        this.inputEl.addEventListener("input", this.handleInput);
        this.inputEl.addEventListener("blur", this.handleBlur);
        this.unsubscribe = subscribe.cartForm((state) => {
          var _a3;
          const quantity = (_a3 = state == null ? void 0 : state[getId(xoSectionId, xoProductId, xoLine)]) == null ? void 0 : _a3.quantity;
          if (quantity != null) {
            this.inputEl.value = `${quantity}`;
          }
        });
      }
    }
    disconnectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        return;
      }
      this.unsubscribe();
      if (this.inputEl) {
        this.inputEl.removeEventListener("input", this.handleInput);
        this.inputEl.removeEventListener("blur", this.handleBlur);
        this.inputEl.removeEventListener("input", this.handleInputForBundle);
      }
    }
  }
  class CartQuantityMinus extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "quantityEl", null);
      __publicField(this, "bundleProviderEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "handleDecrement", () => {
        var _a2, _b2;
        const { xoSectionId, xoProductId, xoLine, xoCartExclude = false } = this.productOptions;
        this.getOptions();
        setFormQuantity(xoSectionId, xoProductId, xoLine, (value) => value - 1);
        const quantity = (_b2 = (_a2 = getState.cartForm()) == null ? void 0 : _a2[getId(xoSectionId, xoProductId, xoLine)]) == null ? void 0 : _b2.quantity;
        const cartLine = getCartLine(this.getProductEl());
        if (cartLine && !xoCartExclude) {
          quantityChangeCart(this, cartLine, quantity);
        }
      });
      __publicField(this, "handleDecrementForBundle", () => {
        if (!this.bundleProviderEl) {
          return;
        }
        const { xoName } = this.bundleProviderEl.props;
        const variantId = this.getQuantityEl().getAttribute("xo-variant-id");
        if (variantId) {
          updateBundleQuantityByType(xoName, variantId, "dec");
        }
      });
      __publicField(this, "handleDecrementForProductVariant", () => {
        var _a2;
        const inputEl = this.quantityEl.querySelector("input");
        const minStr = (_a2 = this.quantityEl) == null ? void 0 : _a2.getAttribute("xo-min");
        const min = minStr != null ? Number(minStr) : 1;
        inputEl.value = `${clamp(Number(inputEl.value) - 1, min, Infinity)}`;
      });
    }
    getProductEl() {
      return this.closest(WebComponent.Product);
    }
    getQuantityEl() {
      return this.closest(WebComponent.CartQuantity);
    }
    getBundleContentEl() {
      return this.closest(WebComponent.BundleContent);
    }
    get productOptions() {
      return this.getProductEl().getOptions();
    }
    getOptions() {
      const options = getAttrs(this, {
        pick: ["xoAutoUpdateCart"],
        types: {
          xoAutoUpdateCart: "boolean"
        }
      });
      return options;
    }
    connectedCallback() {
      this.quantityEl = this.closest(WebComponent.CartQuantity);
      if (!this.quantityEl) {
        throw new Error(`${WebComponent.CartQuantityMinus} must be inside ${WebComponent.CartQuantity}`);
      }
      const forBundle = this.getBundleContentEl();
      const productVariantEl = this.closest(WebComponent.ProductVariant);
      if (productVariantEl) {
        this.addEventListener("click", this.handleDecrementForProductVariant);
      } else if (forBundle) {
        this.addEventListener("click", this.handleDecrementForBundle);
      } else {
        this.addEventListener("click", this.handleDecrement);
      }
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleDecrement);
      this.removeEventListener("click", this.handleDecrementForBundle);
      this.removeEventListener("click", this.handleDecrementForProductVariant);
    }
  }
  class CartQuantityPlus extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "quantityEl", null);
      __publicField(this, "bundleProviderEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "handleIncrement", () => {
        var _a2, _b2;
        const { xoSectionId, xoProductId, xoLine, xoCartExclude = false } = this.productOptions;
        this.getOptions();
        setFormQuantity(xoSectionId, xoProductId, xoLine, (value) => value + 1);
        const quantity = (_b2 = (_a2 = getState.cartForm()) == null ? void 0 : _a2[getId(xoSectionId, xoProductId, xoLine)]) == null ? void 0 : _b2.quantity;
        const cartLine = getCartLine(this.getProductEl());
        if (cartLine && !xoCartExclude) {
          quantityChangeCart(this, cartLine, quantity);
        }
      });
      __publicField(this, "handleIncrementForBundle", () => {
        if (!this.bundleProviderEl) {
          return;
        }
        const { xoName } = this.bundleProviderEl.props;
        const variantId = this.getQuantityEl().getAttribute("xo-variant-id");
        if (variantId) {
          updateBundleQuantityByType(xoName, variantId, "inc");
        }
      });
      __publicField(this, "handleIncrementForProductVariant", () => {
        var _a2;
        const inputEl = this.quantityEl.querySelector("input");
        const minStr = (_a2 = this.quantityEl) == null ? void 0 : _a2.getAttribute("xo-min");
        const min = minStr != null ? Number(minStr) : 1;
        inputEl.value = `${clamp(Number(inputEl.value) + 1, min, Infinity)}`;
      });
    }
    getProductEl() {
      return this.closest(WebComponent.Product);
    }
    getQuantityEl() {
      return this.closest(WebComponent.CartQuantity);
    }
    getBundleContentEl() {
      return this.closest(WebComponent.BundleContent);
    }
    get productOptions() {
      return this.getProductEl().getOptions();
    }
    getOptions() {
      const options = getAttrs(this, {
        pick: ["xoAutoUpdateCart"],
        types: {
          xoAutoUpdateCart: "boolean"
        }
      });
      return options;
    }
    connectedCallback() {
      this.quantityEl = this.closest(WebComponent.CartQuantity);
      if (!this.quantityEl) {
        throw new Error(`${WebComponent.CartQuantityPlus} must be inside ${WebComponent.CartQuantity}`);
      }
      const forBundle = this.getBundleContentEl();
      const productVariantEl = this.closest(WebComponent.ProductVariant);
      if (productVariantEl) {
        this.addEventListener("click", this.handleIncrementForProductVariant);
      } else if (forBundle) {
        this.addEventListener("click", this.handleIncrementForBundle);
      } else {
        this.addEventListener("click", this.handleIncrement);
      }
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleIncrement);
      this.removeEventListener("click", this.handleIncrementForBundle);
      this.removeEventListener("click", this.handleIncrementForProductVariant);
    }
  }
  class CartNote extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "textareaEl", null);
      __publicField(this, "buttonEl", null);
      __publicField(this, "handleInput", (event) => {
        const textareaEl = event.target;
        setCartNoteDraft(textareaEl.value);
      });
      __publicField(this, "handleInputDebounced", debounce((event) => {
        const textareaEl = event.target;
        setCartNoteDraft(textareaEl.value);
        postCartNote(textareaEl.value);
      }, 600));
    }
    connectedCallback() {
      this.textareaEl = this.querySelector('textarea[name="note"]');
      if (!this.textareaEl) {
        throw new Error(`${WebComponent.CartNote} must have a textarea element with name="note"`);
      }
      this.buttonEl = this.querySelector(WebComponent.CartNoteSubmit);
      if (this.buttonEl) {
        this.textareaEl.addEventListener("input", this.handleInput);
      } else {
        this.textareaEl.addEventListener("input", this.handleInputDebounced);
      }
      this.unsubscribe = subscribe.cartNote(({ status }) => {
        attrBoolean.set(this, "xo-loading", status === "loading");
        bindingHelper(this, "xo-loading-binding", status === "loading");
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      if (this.textareaEl) {
        if (this.buttonEl) {
          this.textareaEl.removeEventListener("input", this.handleInput);
        } else {
          this.textareaEl.removeEventListener("input", this.handleInputDebounced);
        }
      }
    }
  }
  class CartNoteSubmit extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "cartNoteEl", null);
      __publicField(this, "handleClick", async (event) => {
        event.preventDefault();
        const { noteDraft } = getState.cartNote();
        await postCartNote(noteDraft);
        toggleParentModal(this, false);
      });
    }
    connectedCallback() {
      this.cartNoteEl = this.closest(WebComponent.CartNote);
      if (!this.cartNoteEl) {
        throw new Error(`${WebComponent.CartNoteSubmit} must be inside ${WebComponent.CartNote}`);
      }
      this.addEventListener("click", this.handleClick);
      this.unsubscribe = subscribe.cartNote(({ status }) => {
        attrBoolean.set(this, "xo-loading", status === "loading");
        bindingHelper(this, "xo-loading-binding", status === "loading");
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.removeEventListener("click", this.handleClick);
    }
  }
  class CartShippingRatesField extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "fieldEl", null);
      __publicField(this, "handleChange", (event) => {
        const targetEl = event.target;
        this.setState(targetEl.name, targetEl.value);
      });
    }
    setState(name, value) {
      var _a2;
      const name_ = name.replace(/address\[|\]/g, "");
      setCartShippingRatesField(name_, value);
      if (name_ === "country") {
        const optionEl = this.fieldEl.querySelector(`option[value="${this.fieldEl.value}"]`);
        setProvinces(objectParse((_a2 = optionEl.getAttribute("data-provinces")) != null ? _a2 : "[]"));
      }
    }
    connectedCallback() {
      this.fieldEl = this.querySelector('select, input[type="text"]');
      if (!this.fieldEl) {
        throw new Error(`${WebComponent.CartShippingRatesField} must have a select or input element`);
      }
      const eventType = this.fieldEl instanceof HTMLInputElement ? "input" : "change";
      this.setState(this.fieldEl.name, this.fieldEl.value);
      this.fieldEl.addEventListener(eventType, this.handleChange);
      const name = this.fieldEl.name.replace(/address\[|\]/g, "");
      if (name === "province") {
        attrBoolean.set(this, "xo-disabled", getState.cartShippingRatesForm().provinces.length === 0);
      }
      this.unsubscribe = subscribe.cartShippingRatesForm(({ provinces }) => {
        if (name === "province") {
          this.fieldEl.innerHTML = provinces.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
          const firstOptionEl = this.fieldEl.querySelector("option");
          if (firstOptionEl) {
            this.setState(this.fieldEl.name, firstOptionEl.value);
          }
          attrBoolean.set(this, "xo-disabled", provinces.length === 0);
        }
      }, (prevState, nextState) => {
        return equal(prevState == null ? void 0 : prevState.provinces, nextState.provinces);
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      if (this.fieldEl) {
        const eventType = this.fieldEl instanceof HTMLInputElement ? "input" : "change";
        this.fieldEl.removeEventListener(eventType, this.handleChange);
      }
    }
  }
  class CartShippingRatesSubmit extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handleClick", async (event) => {
        event.preventDefault();
        const { zip, country, province } = getState.cartShippingRatesForm();
        await getCartShippingRates(zip, country, province);
      });
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick);
      this.unsubscribe = subscribe.cartShippingRates(({ status }) => {
        attrBoolean.set(this, "xo-loading", status === "loading");
        bindingHelper(this, "xo-loading-binding", status === "loading");
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.removeEventListener("click", this.handleClick);
    }
  }
  class CartShippingRatesError extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
    }
    connectedCallback() {
      this.unsubscribe = subscribe.cartShippingRates(({ status, errorMessages }) => {
        if (status === "error") {
          this.innerHTML = errorMessages.join(", ");
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class CartAddError extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "animated", createAnimate());
    }
    connectedCallback() {
      var _a2;
      const contentEl = (_a2 = this.querySelector(WebComponent.CartAddErrorMessage)) != null ? _a2 : this;
      this.unsubscribe = subscribe.cart(async ({ addErrorMessage }) => {
        if (!!addErrorMessage) {
          this.style.visibility = "visible";
          this.style.height = "auto";
          contentEl.innerHTML = addErrorMessage;
          await delay(4e3);
          this.animated({
            from: this.offsetHeight,
            to: 0,
            duration: 300,
            onUpdate: (value) => {
              this.style.height = `${value}px`;
            },
            onEnd: () => {
              contentEl.innerHTML = "";
              this.style.removeProperty("visibility");
            }
          });
        } else {
          contentEl.innerHTML = "";
        }
      });
    }
    disconnectedCallback() {
      this.animated.off();
      this.unsubscribe();
    }
  }
  const locationEvent = new Emitter();
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;
  window.history.pushState = function(data, title, url) {
    originalPushState.call(window.history, data, title, url);
    locationEvent.emit("change", void 0);
  };
  window.history.replaceState = function(data, title, url) {
    originalReplaceState.call(window.history, data, title, url);
    locationEvent.emit("change", void 0);
  };
  window.addEventListener("popstate", () => {
    locationEvent.emit("change", void 0);
  });
  function handleSticky(productVariantEl) {
    const stickyEl = productVariantEl.closest(WebComponent.Sticky);
    if (stickyEl) {
      const fieldEls = Array.from(stickyEl.querySelectorAll(`input[type="radio"], select`));
      each(fieldEls, (fieldEl) => {
        const id2 = fieldEl.id;
        const labelEl = document.querySelector(`label[for="${id2}"]`);
        fieldEl.name = fieldSignal.addFieldSignal(fieldEl.name, STICKY_SIGNAL);
        if (id2) {
          fieldEl.id = fieldSignal.addFieldSignal(id2, STICKY_SIGNAL);
        }
        if (labelEl) {
          labelEl.setAttribute("for", fieldSignal.addFieldSignal(id2, STICKY_SIGNAL));
        }
      });
    }
  }
  let eventId$2 = -1;
  let productVariantIndex = -1;
  const prevVariantSelectedMap = /* @__PURE__ */ new Map();
  class ProductVariant extends HTMLElement {
    constructor(productEl, selector = 'input[type="radio"]:not([xo-for-quick-view]), select:not([xo-for-quick-view])', isProductQuickViewVariant = false) {
      super();
      __publicField(this, "fieldEls", []);
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "fieldSelector");
      __publicField(this, "isProductQuickViewVariant");
      __publicField(this, "queueId", -1);
      __publicField(this, "controller", new AbortController());
      __publicField(this, "debounce", createDebounce());
      __publicField(this, "debounce2", createDebounce());
      __publicField(this, "productUnsubscribe", () => {
      });
      __publicField(this, "cartFormUnsubscribe", () => {
      });
      __publicField(this, "getBindingElements", (el, value) => {
        var _a2;
        if (value.includes(":")) {
          const values = value.split(":");
          if (values.length === 1) {
            return [el];
          }
          const selector = (_a2 = values == null ? void 0 : values[1]) == null ? void 0 : _a2.replace(/(\w|\])(\[)(.*)/g, "$1");
          if (!selector) {
            return [el];
          }
          return Array.from(el.querySelectorAll(selector));
        }
        return [el];
      });
      __publicField(this, "getBindingType", (value) => {
        const bindingType = value.replace(/.*:/g, "").includes("[") ? value.replace(/.*\[/g, "").replace(/\]/g, "").trim() : "children";
        return bindingType;
      });
      __publicField(this, "handleBindingAttr", () => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        const variantId = getVariantId(xoSectionId, xoProductId);
        const textContent = (_g2 = (_f2 = (_c2 = (_b2 = (_a2 = this.productEl) == null ? void 0 : _a2.querySelector(`${WebComponent.ProductLiquidStatic} template`)) == null ? void 0 : _b2.content) == null ? void 0 : _c2.textContent) != null ? _f2 : (_e2 = (_d2 = this.productEl) == null ? void 0 : _d2.querySelector(WebComponent.ProductLiquidStatic)) == null ? void 0 : _e2.textContent) != null ? _g2 : "{}";
        const liquidStatics = objectParse(textContent);
        const liquidStatic = liquidStatics == null ? void 0 : liquidStatics[variantId];
        const contentBindEls = [
          ...Array.from(this.productEl.querySelectorAll(`[${BINDING_ATTR}]`)),
          ...Array.from((_j2 = (_i2 = (_h2 = this.productEl.querySelector(`template[${BUNDLE_CARD_ITEM_ATTR}]`)) == null ? void 0 : _h2.content) == null ? void 0 : _i2.querySelectorAll(`[${BINDING_ATTR}]`)) != null ? _j2 : [])
        ];
        each(contentBindEls, (contentBindEl) => {
          const bindings = contentBindEl.getAttribute(BINDING_ATTR).split(",");
          each(bindings, (binding) => {
            const key = binding.replace(/(:|\[).*/g, "").trim();
            const elements = this.getBindingElements(contentBindEl, binding);
            const bindingType = this.getBindingType(binding);
            if (typeOf(liquidStatic) === "object") {
              const newValue = liquidStatic[key];
              if (newValue != null) {
                each(elements, (element) => {
                  if (bindingType === "children") {
                    element.innerHTML = newValue;
                  } else {
                    element.setAttribute(bindingType, newValue);
                  }
                });
              }
            }
          });
        });
      });
      __publicField(this, "handleChange", (event) => {
        var _a2;
        const targetEl = event.target;
        const { value } = targetEl;
        const { name } = targetEl;
        const { xoSectionId, xoProductId, xoFeaturedProduct, xoProductUrl } = this.productEl.getOptions();
        const { productUrl } = getState.product();
        const newName = fieldSignal.removeFieldSignal(name);
        setFormVariant(xoSectionId, xoProductId, newName, value);
        this.closePopover();
        if (this.condChangeVariantAndRequest()) {
          this.handleFinalProductInformation();
        } else if (xoFeaturedProduct) {
          const variantId = getVariantId(xoSectionId, xoProductId);
          if (variantId) {
            const params = queryString.stringify({ section_id: xoSectionId, variant: variantId });
            const url = `${xoProductUrl}?${params}`;
            getProductHtml(url, true);
          }
          this.bindAvailable();
        } else if (productUrl != null) {
          const variantId = getVariantId(xoSectionId, xoProductId);
          if (variantId) {
            const params = queryString.stringify({ section_id: xoSectionId, variant: variantId });
            const url = `${productUrl}?${params}`;
            getProductHtml(url);
          }
          this.bindAvailable();
        } else {
          this.handleBindingAttr();
          this.bindAvailable();
          if (this.getAttribute("xo-add-to-bundle") != null) {
            const variantId = getVariantId(xoSectionId, xoProductId);
            const bundleAddEl = (_a2 = this.productEl) == null ? void 0 : _a2.querySelector(WebComponent.BundleAdd);
            if (bundleAddEl && variantId) {
              bundleAddEl.toggle = true;
              bundleAddEl.click();
            }
          }
        }
        this.handleUnavailable();
      });
      __publicField(this, "setFormVariantAfterLocationChange", this.debounce2(() => {
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        const { productData } = getProductState();
        const currentVariantId = queryString.parse(window.location.search, true).variant;
        const variantInputEls = Array.from(document.querySelectorAll(`${FORM_CART_ADD_SELECTOR} input[name="id"]`));
        each(variantInputEls, (variantInputEl) => {
          variantInputEl.value = currentVariantId;
        });
        const currentVariant = productData[xoProductId].variants.find((variant) => variant.id == currentVariantId);
        if (currentVariant) {
          const fieldEls = currentVariant.options.reduce((acc, value) => {
            var _a2;
            return [
              ...acc,
              ...Array.from(this.querySelectorAll(`input[type="radio"]:not([xo-for-quick-view])[value="${escapeValue(value)}"]`)),
              ...Array.from((_a2 = this.querySelector(`select:not([xo-for-quick-view])[value="${escapeValue(value)}"]`)) != null ? _a2 : [])
            ];
          }, []);
          each(fieldEls, (fieldEl) => {
            if (fieldEl) {
              const name = fieldSignal.removeFieldSignal(fieldEl.name);
              setFormVariant(xoSectionId, xoProductId, name, fieldEl.value);
            }
          });
          this.bindAvailable();
        }
      }, 0));
      __publicField(this, "handleLocationChange", () => {
        var _a2;
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        if (this.condChangeVariantAndRequest()) {
          const { href } = window.location;
          const url = href.includes("?") ? `${href}&section_id=${xoSectionId}` : `${href}?section_id=${xoSectionId}`;
          if (url.includes("variant=")) {
            getProductHtml(url);
          } else {
            updateObserved();
          }
          this.setFormVariantAfterLocationChange();
          const pickupEl = (_a2 = this.productEl) == null ? void 0 : _a2.querySelector(WebComponent.ProductPickupAvailability);
          if (pickupEl) {
            getPickupAvailabilityHtml(xoSectionId, xoProductId);
          }
          window.cancelAnimationFrame(this.queueId);
        }
      });
      __publicField(this, "handleProductVariantSelected", (fieldEl) => {
        const name = fieldSignal.removeFieldSignal(fieldEl.name);
        const productVariantSelectedEls = Array.from(this.productEl.querySelectorAll(`${WebComponent.ProductVariantSelected}[xo-name="${name}"]`));
        each(productVariantSelectedEls, (productVariantSelectedEl) => {
          if (productVariantSelectedEl) {
            productVariantSelectedEl.innerHTML = fieldEl.value;
          }
        });
      });
      __publicField(this, "closePopover", () => {
        const popoverEl = this.closest(WebComponent.Popover);
        const productEl = popoverEl == null ? void 0 : popoverEl.querySelector(WebComponent.Product);
        if (popoverEl && !productEl) {
          const popoverName = popoverEl.getAttribute("xo-name");
          xoPopover.close(popoverName);
        }
      });
      __publicField(this, "unavailable", () => {
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        const variantId = getVariantId(xoSectionId, xoProductId);
        if (this.children.length === 0) {
          return false;
        }
        return !variantId;
      });
      __publicField(this, "handleUnavailable", () => {
        attrBoolean.set(this.productEl, "xo-unavailable", this.unavailable());
        bindingHelper(this.productEl, "xo-unavailable-binding", this.unavailable());
      });
      __publicField(this, "handleAvailable", (fieldEl, _index) => {
        if (fieldEl instanceof HTMLInputElement) {
          const { xoSectionId, xoProductId } = this.productEl.getOptions();
          const name = fieldSignal.removeFieldSignal(fieldEl.name);
          const instockAndAvailableEnable = checkInstockAndAvailable(xoSectionId, xoProductId, name, fieldEl.value);
          const availableEnable = checkAvailable(xoSectionId, xoProductId, name, fieldEl.value);
          attrBoolean.set(fieldEl, "xo-disabled", !instockAndAvailableEnable);
          attrBoolean.set(fieldEl, "xo-unavailable", !availableEnable);
          bindingHelper(fieldEl, "xo-disabled-binding", !instockAndAvailableEnable);
          bindingHelper(fieldEl, "xo-unavailable-binding", !availableEnable);
        }
      });
      __publicField(this, "bindAvailable", this.debounce(() => {
        const allFieldEls = Array.from(this.productEl.querySelectorAll(this.fieldSelector));
        each(allFieldEls, this.handleAvailable);
        this.handleUnavailable();
        reselectAvailableVariants(this, this.productEl, this.fieldSelector);
      }, 0));
      __publicField(this, "cartFormListener", () => {
        var _a2, _b2;
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        const id2 = getId(xoSectionId, xoProductId);
        const variantSelected = (_b2 = (_a2 = getCartFormState()) == null ? void 0 : _a2[id2]) == null ? void 0 : _b2.variantSelected;
        if (variantSelected && !equal(prevVariantSelectedMap.get(id2), variantSelected)) {
          each(objectKeys(variantSelected), (name) => {
            const value = variantSelected[name];
            this.handleSyncFields(name, value);
          });
        }
        prevVariantSelectedMap.set(id2, variantSelected);
      });
      this.fieldSelector = selector;
      this.isProductQuickViewVariant = isProductQuickViewVariant;
      this.productEl = productEl != null ? productEl : this.closest(WebComponent.Product);
      productVariantIndex++;
      handleSticky(this);
    }
    condChangeVariantAndRequest() {
      const { xoProductInformation } = this.productEl.getOptions();
      const quickViewEl = this.closest(WebComponent.ProductQuickView);
      return isProductPage() && xoProductInformation && !quickViewEl;
    }
    async handleProductInformation() {
      const { xoSectionId, xoProductId } = this.productEl.getOptions();
      const variantId = getVariantId(xoSectionId, xoProductId);
      const newUrl = `${window.location.pathname}${variantId ? `?variant=${variantId}` : ""}`;
      if (window.location.href !== newUrl) {
        window.history.replaceState({}, "", newUrl);
      }
    }
    handleFinalProductInformation() {
      this.queueId = window.requestAnimationFrame(() => {
        this.handleProductInformation();
        window == null ? void 0 : window.cancelAnimationFrame(this.queueId);
      });
    }
    handleSyncFields(name, value) {
      var _a2, _b2;
      const { xoProductInformation } = this.productEl.getOptions();
      const currentFieldEls = Array.from((_b2 = (_a2 = this.productEl) == null ? void 0 : _a2.querySelectorAll(`input[type="radio"][name="${name}"][value="${escapeValue(value)}"], input[type="radio"][name$="${name}"][value="${escapeValue(value)}"], select[name="${name}"], select[name$="${name}"]`)) != null ? _b2 : []);
      if (xoProductInformation) {
        each(currentFieldEls, (currentFieldEl) => {
          const productRecommendationsEl = currentFieldEl.closest(WebComponent.ProductRecommendations);
          if (productRecommendationsEl || currentFieldEl.getAttribute("xo-for-quick-view")) {
            return;
          }
          if (currentFieldEl instanceof HTMLSelectElement) {
            const optionEls = Array.from(currentFieldEl.querySelectorAll("option"));
            each(optionEls, (optionEl) => {
              optionEl.selected = optionEl.value === value;
            });
          } else if (currentFieldEl instanceof HTMLInputElement) {
            currentFieldEl.checked = true;
          }
        });
      }
      each(currentFieldEls, (currentFieldEl) => {
        if (currentFieldEl instanceof HTMLInputElement) {
          this.handleProductVariantSelected(currentFieldEl);
        }
      });
    }
    handleFirstVariant(fieldEl) {
      const { xoSectionId, xoProductId } = this.productEl.getOptions();
      const name = fieldSignal.removeFieldSignal(fieldEl.name);
      if (fieldEl instanceof HTMLInputElement) {
        if (fieldEl.checked || fieldEl.hasAttribute("checked") && fieldEl.getAttribute("checked") !== "false") {
          fieldEl.checked = true;
          setFormVariant(xoSectionId, xoProductId, name, fieldEl.value);
          this.handleProductVariantSelected(fieldEl);
        }
      } else if (fieldEl instanceof HTMLSelectElement) {
        const optionEls = Array.from(fieldEl.querySelectorAll("option"));
        each(optionEls, (optionEl) => {
          if (optionEl.selected || optionEl.hasAttribute("selected") && optionEl.getAttribute("selected") !== "false") {
            optionEl.selected = true;
            setFormVariant(xoSectionId, xoProductId, name, fieldEl.value);
          }
        });
      }
    }
    connectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        return;
      }
      const { xoProductId, xoProductInformation } = this.productEl.getOptions();
      this.fieldEls = Array.from(this.querySelectorAll(this.fieldSelector));
      if (!this.isProductQuickViewVariant && xoProductInformation) {
        locationEvent.off(eventId$2);
        eventId$2 = locationEvent.on("change", this.handleLocationChange);
      }
      each(this.fieldEls, (fieldEl) => {
        fieldEl.name = fieldSignal.addFieldSignal(fieldEl.name, `SIGNAL_${xoProductId}_${productVariantIndex}`);
        this.handleFirstVariant(fieldEl);
        fieldEl.addEventListener("change", this.handleChange, { signal: this.controller.signal });
      });
      this.bindAvailable();
      this.cartFormUnsubscribe = subscribe.cartForm(this.cartFormListener, equal);
      this.productUnsubscribe = subscribe.product(this.bindAvailable);
    }
    disconnectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        return;
      }
      const { xoProductInformation } = this.productEl.getOptions();
      this.controller.abort();
      if (!this.isProductQuickViewVariant && xoProductInformation) {
        locationEvent.off(eventId$2);
      }
      this.cartFormUnsubscribe();
      this.productUnsubscribe();
      window.cancelAnimationFrame(this.queueId);
      this.debounce.cancel();
      this.debounce2.cancel();
    }
  }
  class ProductData extends HTMLElement {
    connectedCallback() {
      var _a2, _b2;
      const textContent = (_b2 = (_a2 = this.querySelector("template")) == null ? void 0 : _a2.content.textContent) != null ? _b2 : this.textContent;
      const data = objectParse(textContent);
      const { productData } = getState.product();
      if (data.id) {
        if (!objectKeys(productData).includes(data.id.toString())) {
          setProductData(data);
        }
      } else {
        throw new Error(`ProductData: Invalid product data (Content: ${textContent == null ? void 0 : textContent.trim()}).`);
      }
    }
  }
  class ProductPickupAvailability extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
    }
    connectedCallback() {
      this.unsubscribe = subscribe.product(({ pickupAvailabilityHtml }) => {
        if (pickupAvailabilityHtml) {
          const doc = new DOMParser().parseFromString(pickupAvailabilityHtml, "text/html");
          const newEl = doc.querySelector(`${WebComponent.ProductPickupAvailability}`);
          if (newEl) {
            if (this.innerHTML !== newEl.innerHTML) {
              this.innerHTML = newEl.innerHTML;
            }
          } else {
            this.innerHTML = "";
          }
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class ProductPickupAvailabilityList extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
    }
    connectedCallback() {
      this.unsubscribe = subscribe.product(({ pickupAvailabilityHtml }) => {
        if (pickupAvailabilityHtml) {
          const doc = new DOMParser().parseFromString(pickupAvailabilityHtml, "text/html");
          const newEl = doc.querySelector(WebComponent.ProductPickupAvailabilityList);
          if (newEl) {
            if (this.innerHTML !== newEl.innerHTML) {
              this.innerHTML = newEl.innerHTML;
            }
          } else {
            this.innerHTML = "";
          }
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class ProductQuickView extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "controller", new AbortController());
      __publicField(this, "triggerProductEl", null);
      __publicField(this, "bundleProviderEl", null);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handleBundle", (quickviewTriggerEl) => {
        const bundleProviderEl = quickviewTriggerEl == null ? void 0 : quickviewTriggerEl.closest(WebComponent.BundleProvider);
        if (bundleProviderEl) {
          const bundleAddEl = this.querySelector(WebComponent.BundleAdd);
          const triggerProductEl = quickviewTriggerEl == null ? void 0 : quickviewTriggerEl.closest(WebComponent.Product);
          this.setAttribute("xo-bundle-name", bundleProviderEl.props.xoName);
          if (triggerProductEl) {
            this.triggerProductEl = triggerProductEl;
            this.bundleProviderEl = bundleProviderEl;
            bundleAddEl == null ? void 0 : bundleAddEl.setTriggerProductEl(triggerProductEl);
            bundleAddEl == null ? void 0 : bundleAddEl.setProviderEl(bundleProviderEl);
          }
        }
      });
    }
    connectedCallback() {
      var _a2;
      const xoName = (_a2 = this.getAttribute("xo-name")) != null ? _a2 : QUICKVIEW_NAME;
      this.unsubscribe = subscribe.product(({ status, quickviewProductHtml, quickviewTriggerEl }) => {
        var _a3, _b2;
        const productTriggerEl = quickviewTriggerEl == null ? void 0 : quickviewTriggerEl.closest(WebComponent.Product);
        const productHtml = (_a3 = quickviewProductHtml[xoName]) != null ? _a3 : "";
        const newProductHtml = productHtml.replace(new RegExp(`${WebComponent.ProductVariant}(?=(\\s|>))`, "g"), WebComponent.ProductQuickViewVariant);
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(newProductHtml, "text/html");
        const templateEl = doc.querySelector("template[xo-quick-view-content]");
        const productEl = doc.querySelector(`${WebComponent.Product}[xo-product-information]:not([xo-product-information="false"])`);
        if (productTriggerEl) {
          productEl == null ? void 0 : productEl.setAttribute("xo-section-id", productTriggerEl.getAttribute("xo-section-id") || "");
        }
        const clone = templateEl == null ? void 0 : templateEl.content.cloneNode(true);
        if ((clone == null ? void 0 : clone.children.length) && (clone == null ? void 0 : clone.children.length) > 1) {
          throw new Error(`The <template xo-quick-view-content> element must have only one child node.`);
        }
        const contentEl = (clone == null ? void 0 : clone.children[0]) || productEl;
        if (contentEl && this.innerHTML === "" && status === "success") {
          const fieldEls = Array.from(contentEl.querySelectorAll(`${WebComponent.ProductQuickViewVariant} input[type="radio"], ${WebComponent.ProductQuickViewVariant} select`));
          each(fieldEls, (fieldEl) => {
            const id2 = fieldEl.id;
            const labelEl = doc.querySelector(`label[for="${id2}"]`);
            fieldEl.name = fieldSignal.addFieldSignal(fieldEl.name, QUICKVIEW_SIGNAL);
            if (id2) {
              fieldEl.id = fieldSignal.addFieldSignal(id2, QUICKVIEW_SIGNAL);
            }
            if (labelEl) {
              labelEl.setAttribute("for", fieldSignal.addFieldSignal(id2, QUICKVIEW_SIGNAL));
            }
            attrBoolean.set(fieldEl, "xo-for-quick-view", true);
          });
          const xoNameEls = Array.from(contentEl.querySelectorAll(`[xo-name]:not(${WebComponent.ProductVariantSelected}):not(${WebComponent.ModalTrigger})`));
          each(xoNameEls, (xoNameEl) => {
            xoNameEl.setAttribute("xo-name", fieldSignal.addFieldSignal(xoNameEl.getAttribute("xo-name"), QUICKVIEW_SIGNAL));
          });
          if (this.innerHTML !== contentEl.outerHTML) {
            this.innerHTML = contentEl.outerHTML;
            (_b2 = window.Shopify.PaymentButton) == null ? void 0 : _b2.init();
            loadImages(Array.from(this.querySelectorAll("img")));
            this.handleBundle(quickviewTriggerEl);
          }
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
      this.controller.abort();
    }
  }
  class ProductQuickViewTrigger extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "getProductUrl", () => {
        const { xoProductUrl } = this.options;
        const productEl = this.closest(WebComponent.Product);
        if (!productEl) {
          return xoProductUrl;
        }
        const { xoSectionId, xoProductId } = productEl.getOptions();
        const currentVariantId = getVariantId(xoSectionId, xoProductId);
        if (xoProductUrl.includes("?")) {
          return `${xoProductUrl}&variant=${currentVariantId}`;
        }
        return `${xoProductUrl}?variant=${currentVariantId}`;
      });
      __publicField(this, "loadingAndModal", () => {
        const { xoModalName, xoToggleName } = this.options;
        attrBoolean.set(this, "xo-loading", false);
        bindingHelper(this, "xo-loading-binding", false);
        if (xoModalName) {
          xoModal.open(xoModalName);
        }
        if (xoToggleName) {
          xoToggle$1.open(xoToggleName);
        }
      });
      __publicField(this, "handleClick", async () => {
        const { xoName = QUICKVIEW_NAME } = this.options;
        const productQuickViewEl = document.querySelector(WebComponent.ProductQuickView);
        if (productQuickViewEl) {
          productQuickViewEl.innerHTML = "";
        }
        attrBoolean.set(this, "xo-loading", true);
        bindingHelper(this, "xo-loading-binding", true);
        await getQuickviewProductHtml(xoName, this.getProductUrl(), this);
        if ("requestIdleCallback" in window) {
          requestIdleCallback(() => {
            this.loadingAndModal();
          });
        } else {
          this.loadingAndModal();
        }
      });
    }
    getOptions() {
      return getAttrs(this, {
        pick: ["xoName", "xoProductUrl", "xoModalName", "xoToggleName"],
        types: {
          xoName: "string",
          xoProductUrl: "string",
          xoModalName: "string",
          xoToggleName: "string"
        }
      });
    }
    get options() {
      return this.getOptions();
    }
    connectedCallback() {
      const { xoProductUrl } = this.options;
      if (!xoProductUrl) {
        throw new Error(`${WebComponent.ProductQuickViewTrigger} must have a xo-product-url attribute`);
      }
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class ProductQuickViewVariant extends ProductVariant {
    constructor() {
      const productEl = document.querySelector(`${WebComponent.ProductQuickView} ${WebComponent.Product}`);
      super(productEl, 'input[type="radio"][xo-for-quick-view], select[xo-for-quick-view]', true);
    }
  }
  class ProductLiquidStatic extends HTMLElement {
    connectedCallback() {
      const productEl = this.closest(WebComponent.Product);
      if (!productEl) {
        throw new Error(`${WebComponent.ProductLiquidStatic} must be a child of ${WebComponent.Product}}`);
      }
    }
  }
  let eventId$1 = -1;
  class ProductRecipientForm extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "recipientFieldsLiveRegion");
      __publicField(this, "checkboxInput", this.querySelector('input[type="checkbox"][name="properties[__shopify_send_gift_card_to_recipient]"]'));
      __publicField(this, "hiddenControlField", this.querySelector('input[type="hidden"][name="properties[__shopify_send_gift_card_to_recipient]"]'));
      __publicField(this, "emailInput", this.querySelector('input[name="properties[Recipient email]"]'));
      __publicField(this, "nameInput", this.querySelector('input[name="properties[Recipient name]"]'));
      __publicField(this, "messageInput", this.querySelector('textarea[name="properties[Message]"]'));
      __publicField(this, "sendonInput", this.querySelector('input[name="properties[Send on]"]'));
      __publicField(this, "offsetProperty", this.querySelector('input[name="properties[__shopify_offset]"]'));
      __publicField(this, "currentProductVariantId", "");
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handleChange", () => {
        var _a2;
        if ((_a2 = this.checkboxInput) == null ? void 0 : _a2.checked) {
          setRecipientState(this.checkboxInput.name, "on");
          this.enableInputFields();
          attrBoolean.set(this, "xo-active", true);
          if (this.recipientFieldsLiveRegion && window.accessibilityStrings.recipientFormExpanded) {
            this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormExpanded;
          }
        } else {
          this.clearInputFields();
          this.disableInputFields();
          resetRecipientState();
          attrBoolean.set(this, "xo-active", false);
          if (this.recipientFieldsLiveRegion && window.accessibilityStrings.recipientFormCollapsed) {
            this.recipientFieldsLiveRegion.innerText = window.accessibilityStrings.recipientFormCollapsed;
          }
        }
      });
      __publicField(this, "clearInputFields", () => {
        each(this.inputFields, (field) => {
          if (field) {
            field.value = "";
          }
        });
      });
      __publicField(this, "enableInputFields", () => {
        each(this.disableableFields, (field) => {
          if (field) {
            field.disabled = false;
          }
        });
      });
      __publicField(this, "disableInputFields", () => {
        each(this.disableableFields, (field) => {
          if (field) {
            field.disabled = true;
          }
        });
      });
      __publicField(this, "resetRecipientForm", () => {
        var _a2;
        if ((_a2 = this.checkboxInput) == null ? void 0 : _a2.checked) {
          this.checkboxInput.checked = false;
          this.handleChange();
          attrBoolean.set(this, "xo-error", false);
        }
      });
      __publicField(this, "setCurrentVariantId", () => {
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        const variantId = getVariantId(xoSectionId, xoProductId);
        this.currentProductVariantId = variantId;
      });
      __publicField(this, "handleFieldsChange", (event) => {
        const currentField = event.target;
        const { name, value } = currentField;
        setRecipientState(name, value);
      });
      __publicField(this, "bindFieldChange", () => {
        each(this.inputFields, (field) => {
          if (field) {
            field.addEventListener("input", this.handleFieldsChange);
          }
        });
      });
      this.recipientFieldsLiveRegion = this.querySelector(`#Recipient-fields-live-region-${this.dataset.sectionId}`);
      if (this.checkboxInput) {
        this.checkboxInput.disabled = false;
      }
      if (this.hiddenControlField) {
        this.hiddenControlField.disabled = true;
      }
      if (this.offsetProperty) {
        this.offsetProperty.value = new Date().getTimezoneOffset().toString();
      }
    }
    get productEl() {
      return this.closest(WebComponent.Product);
    }
    get inputFields() {
      return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput];
    }
    get disableableFields() {
      return [...this.inputFields, this.offsetProperty];
    }
    connectedCallback() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.ProductRecipientForm} must be in ${WebComponent.Product}`);
      }
      this.bindFieldChange();
      this.handleChange();
      this.addEventListener("change", this.handleChange);
      this.setCurrentVariantId();
      locationEvent.off(eventId$1);
      eventId$1 = locationEvent.on("change", this.setCurrentVariantId);
      this.unsubscribe = subscribe.cart(({ isAdded, variantId, addErrorMessage }) => {
        if (addErrorMessage) {
          const errorEl = this.querySelector(WebComponent.ProductRecipientFormError);
          if (errorEl) {
            errorEl.innerText = addErrorMessage;
            attrBoolean.set(this, "xo-error", true);
          }
        }
        if (isAdded && variantId === this.currentProductVariantId) {
          this.resetRecipientForm();
        }
      });
    }
    disconnectedCallback() {
      this.removeEventListener("change", this.handleChange);
      locationEvent.off(eventId$1);
      this.unsubscribe();
    }
  }
  const RELATED = "intent=related";
  class ProductRecommendations extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "handleIntersection", async (entries, observer2) => {
        var _a2;
        try {
          if (!entries[0].isIntersecting) {
            return;
          }
          observer2.unobserve(this);
          const { xoUrl } = this.options;
          const res = await fetch(xoUrl);
          const text = await res.text();
          const html = document.createElement("div");
          html.innerHTML = text;
          const recommendations = html.querySelector(WebComponent.ProductRecommendations);
          if (recommendations && recommendations.innerHTML.trim().length) {
            this.innerHTML = recommendations.innerHTML;
            const productsCountEls = (_a2 = this.closest('[id^="shopify-section-template--"]')) == null ? void 0 : _a2.querySelectorAll("[xo-products-count]");
            productsCountEls == null ? void 0 : productsCountEls.forEach((productsCountEl, index) => {
              const nextProductsCountEl = html.querySelectorAll("[xo-products-count]")[index];
              productsCountEl.setAttribute("xo-products-count", `${nextProductsCountEl.getAttribute("xo-products-count")}`);
            });
            const animateEls = Array.from(this.querySelectorAll('[xo-animate="scroll"]'));
            each(animateEls, (animateEl) => {
              attrBoolean.set(animateEl, "xo-visible", true);
            });
          } else {
            if (window.Xotiny) {
              if (xoUrl.endsWith(RELATED)) {
                const sectionEl = this.closest('[id^="shopify-section-template--"]');
                sectionEl == null ? void 0 : sectionEl.remove();
              }
            } else {
              const sectionEl = this.closest("[data-xb-section-id]");
              sectionEl == null ? void 0 : sectionEl.remove();
            }
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoUrl"],
        types: {
          xoUrl: "string"
        }
      });
      return options;
    }
    connectedCallback() {
      var _a2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        return;
      }
      new IntersectionObserver(this.handleIntersection, { rootMargin: "0px 0px 800px 0px" }).observe(this);
    }
  }
  let Product = (_n = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "debounce", createDebounce());
      __publicField(this, "prevStatus", "idle");
      __publicField(this, "controller", new AbortController());
      __publicField(this, "handleChange", this.debounce((status, productHtml, url) => {
        const willChangeEls = Array.from(this.querySelectorAll(WebComponent.ProductWillChange));
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(productHtml, "text/html");
        const nextWillChangeEls = Array.from(doc.querySelectorAll(url ? `${WebComponent.Product}[xo-featured-product][xo-product-url="${url}"] ${WebComponent.ProductWillChange}` : `${WebComponent.Product}[xo-product-information] ${WebComponent.ProductWillChange}`));
        if (!nextWillChangeEls.length) {
          return;
        }
        const featured = !!url;
        each(willChangeEls, (willChangeEl, index) => {
          var _a2, _b2;
          const uid = willChangeEl.getAttribute("xo-unique-id");
          let newProductWillChangeEl = null;
          if (featured) {
            if (uid) {
              newProductWillChangeEl = doc.querySelector(`${WebComponent.Product}[xo-featured-product][xo-product-url="${url}"] ${WebComponent.ProductWillChange}[xo-unique-id="${uid}"]`);
            } else {
              newProductWillChangeEl = doc.querySelectorAll(`${WebComponent.Product}[xo-featured-product][xo-product-url="${url}"] ${WebComponent.ProductWillChange}`)[index];
            }
          } else {
            if (uid) {
              newProductWillChangeEl = doc.querySelector(`${WebComponent.ProductWillChange}[xo-unique-id="${uid}"]`);
            } else {
              newProductWillChangeEl = doc.querySelectorAll(`${WebComponent.ProductWillChange}`)[index];
            }
          }
          const { xoProductUrl, xoSectionId, xoWithMorph } = this.props;
          const xoNewProductUrl = (_a2 = newProductWillChangeEl == null ? void 0 : newProductWillChangeEl.closest(WebComponent.Product)) == null ? void 0 : _a2.getAttribute("xo-product-url");
          const xoNewProductSectionId = (_b2 = newProductWillChangeEl == null ? void 0 : newProductWillChangeEl.closest(WebComponent.Product)) == null ? void 0 : _b2.getAttribute("xo-section-id");
          let cond = newProductWillChangeEl && willChangeEl.innerHTML !== newProductWillChangeEl.innerHTML && status === "success";
          if (featured) {
            cond = cond && xoProductUrl === xoNewProductUrl && xoSectionId === xoNewProductSectionId;
          }
          if (cond) {
            const buyItNowEl = willChangeEl.querySelector('[data-shopify="payment-button"]');
            const disabled = attrBoolean.get(newProductWillChangeEl, "xo-disabled");
            attrBoolean.set(willChangeEl, "xo-disabled", disabled);
            if (disabled) {
              buyItNowEl == null ? void 0 : buyItNowEl.addEventListener("click", (event) => {
                event.preventDefault();
              }, { signal: this.controller.signal });
              return;
            }
            if (!buyItNowEl) {
              if (xoWithMorph) {
                morph(willChangeEl, newProductWillChangeEl.outerHTML);
              } else {
                willChangeEl.outerHTML = newProductWillChangeEl.outerHTML;
              }
            }
          }
        });
      }, 0));
    }
    getOptions() {
      return this.getProps();
    }
    mount() {
      var _a2, _b2;
      const { xoProductId, xoSectionId, xoLine, xoSelectedOrFirstAvailableVariantId } = this.props;
      if (!xoProductId) {
        throw new Error(`${WebComponent.Product}: Attribute xo-product-id is required.`);
      }
      if (!xoSectionId) {
        throw new Error(`${WebComponent.Product}: Attribute xo-section-id is required.`);
      }
      if (this.closest(WebComponent.Cart) || this.closest(WebComponent.CartMini)) {
        if (!xoLine) {
          throw new Error(`If ${WebComponent.Product} is inside ${WebComponent.Cart} or ${WebComponent.CartMini}, it must have the xo-line="{{ forloop.index }}" attribute.`);
        }
      }
      const id2 = getId(xoSectionId, xoProductId);
      if (xoSelectedOrFirstAvailableVariantId && !((_b2 = (_a2 = getState.cartForm()) == null ? void 0 : _a2[id2]) == null ? void 0 : _b2.variantId)) {
        setVariantId(xoSectionId, xoProductId, xoSelectedOrFirstAvailableVariantId);
      }
      this.unsubscribe = subscribe.product(({ status, productHtml, featuredProductHtmls, quickviewProductHtml, quickviewTriggerEl }) => {
        var _a3, _b3;
        const { xoProductId: xoProductId2, xoSectionId: xoSectionId2, xoProductUrl } = this.props;
        const variantId = getVariantId(xoSectionId2, xoProductId2);
        if (!variantId) {
          return;
        }
        if (status !== "success" && this.prevStatus === status) {
          return;
        }
        switch (getProductType(this)) {
          case "featured": {
            if (!xoProductUrl) {
              return;
            }
            const featuredProductHtml = featuredProductHtmls[xoProductUrl];
            this.handleChange(status, featuredProductHtml, xoProductUrl);
            break;
          }
          case "quickview": {
            const productTriggerEl = quickviewTriggerEl == null ? void 0 : quickviewTriggerEl.closest(WebComponent.Product);
            const xoName = (_a3 = productTriggerEl == null ? void 0 : productTriggerEl.getAttribute("xo-name")) != null ? _a3 : QUICKVIEW_NAME;
            const finalProductHtml = (_b3 = quickviewProductHtml[xoName]) != null ? _b3 : "";
            this.handleChange(status, finalProductHtml);
            break;
          }
          case "information": {
            this.handleChange(status, productHtml);
            break;
          }
        }
        this.prevStatus = status;
      });
    }
    unmount() {
      this.unsubscribe();
      this.controller.abort();
    }
  }, __publicField(_n, "propTypes", {
    xoProductId: "string",
    xoSectionId: "string",
    xoSelectedOrFirstAvailableVariantId: "string",
    xoProductInformation: "boolean",
    xoFeaturedProduct: "boolean",
    xoProductUrl: "string",
    xoCartExclude: "boolean",
    xoLine: "number",
    xoWithMorph: "boolean"
  }), _n);
  Product = __decorate([
    customElements$1(WebComponent.Product)
  ], Product);
  const ANIMATE_DURATION = 300;
  let ProductMedia = (_o = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        isHover: false,
        carouselNextContent: "",
        carouselPrevContent: ""
      });
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "contentEl", null);
      __publicField(this, "media");
      __publicField(this, "delayCancel", () => {
      });
      __publicField(this, "cancel2", () => {
      });
      __publicField(this, "renderCarousel", () => {
        if (!this.media) {
          return "";
        }
        if (this.contentEl) {
          return "";
        }
        const { xoCarouselAutoplay, xoCarouselType, xoImageLazyloadOverlayContent, xoCarouselPaginationEnabled, xoCarouselBulletContent, xoCarouselActiveIndex, xoCarouselDynamicBulletsEnabled, xoCarouselDynamicBulletsPerView } = this.props;
        const { carouselNextContent, carouselPrevContent } = this.state;
        const hasNavigation = carouselNextContent && carouselPrevContent;
        const images = this.media.filter((media) => media.media_type === "image");
        if (images.length <= 1) {
          return "";
        }
        return `
      <xo-carousel xo-product-media-content xo-type="${xoCarouselType}" xo-active-index="${xoCarouselActiveIndex}" xo-rewind xo-speed="600" xo-autoplay="${xoCarouselAutoplay}" xo-render-bullet="${xoCarouselBulletContent}" xo-dragable="false">
        <xo-carousel-inner>
          <xo-carousel-list>
            ${images.map((image) => {
          var _a2;
          return `
                <xo-carousel-slide xo-active-binding="[xo-product-media-slide-active]">
                  <div style="position: relative"><img is="xo-lazyload" src="${imageUrl(image.src, { width: 100 })}" alt="${(_a2 = image.alt) != null ? _a2 : ""}" /><div class="xo-lazyload-overlay">${xoImageLazyloadOverlayContent}</div></div>
                </xo-carousel-slide>
              `;
        }).join("")}
          </xo-carousel-list>
        </xo-carousel-inner>
        ${hasNavigation ? `<xo-carousel-prev style="opacity: 0">${carouselPrevContent}</xo-carousel-prev><xo-carousel-next style="opacity: 0">${carouselNextContent}</xo-carousel-next>` : ""}
        ${xoCarouselPaginationEnabled ? xoCarouselDynamicBulletsEnabled ? `<xo-carousel-dynamic-bullets xo-per-view="${xoCarouselDynamicBulletsPerView}"><xo-carousel-pagination></xo-carousel-pagination></xo-carousel-dynamic-bullets>` : `<xo-carousel-pagination></xo-carousel-pagination>` : ""}
      </xo-carousel>
    `;
      });
      __publicField(this, "renderVideo", () => {
        var _a2;
        if (!this.media) {
          return "";
        }
        if (this.contentEl) {
          return "";
        }
        const videoMedia = (_a2 = this.media.filter((media) => media.media_type === "video")) == null ? void 0 : _a2[0];
        const videoMp4Arr = videoMedia.sources.filter((source) => source.format === "mp4");
        const video = videoMp4Arr.reduce((acc, source) => {
          if (source.width > acc.maxWidth) {
            return {
              url: source.url,
              maxWidth: source.width
            };
          }
          return acc;
        }, { url: "", maxWidth: 0 }).url;
        if (!video) {
          return "";
        }
        return `
      <xo-video-cover xo-product-media-content xo-src="${video}" style="opacity: 0"></xo-video-cover>
    `;
      });
      __publicField(this, "handleNextElementHide", async () => {
        const { xoCarouselAutoplay } = this.props;
        this.delayCancel = await delay(xoCarouselAutoplay + 100 || ANIMATE_DURATION);
        const { isHover } = this.state;
        if (isHover) {
          const nextEls = Array.from(this.querySelectorAll("[xo-product-media-content] ~ *"));
          each(nextEls, (nextEl) => {
            attrBoolean.set(nextEl, "xo-hidden", true);
          });
        }
      });
      __publicField(this, "handleNextElementShow", () => {
        const nextEls = Array.from(this.querySelectorAll("[xo-product-media-content] ~ *"));
        each(nextEls, (el) => {
          attrBoolean.set(el, "xo-hidden", false);
        });
      });
      __publicField(this, "getType", () => {
        var _a2;
        const { xoType } = this.props;
        if (xoType === "carousel") {
          return "carousel";
        } else if (xoType === "video") {
          return "video";
        } else {
          const hasVideoMedia = !!((_a2 = this.media) == null ? void 0 : _a2.some((media) => media.media_type === "video"));
          if (hasVideoMedia) {
            return "video";
          }
          return "carousel";
        }
      });
      __publicField(this, "handleMouseEnter", async () => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
        const { xoCarouselAutoplay } = this.props;
        const draggingEl = this.closest(`[xo-dragging]`);
        if (draggingEl) {
          return;
        }
        const type = this.getType();
        this.setState({ isHover: true });
        if (type === "carousel") {
          this.delayCancel();
          if (!this.contentEl) {
            this.insertAdjacentHTML("afterbegin", this.renderCarousel());
            this.contentEl = this.querySelector("[xo-product-media-content]");
            (_a2 = this.contentEl) == null ? void 0 : _a2.addEventListener("xo:carousel:init", this.handleNextElementHide);
          }
          (_b2 = this.contentEl) == null ? void 0 : _b2.style.setProperty("opacity", "1");
          (_c2 = this.contentEl) == null ? void 0 : _c2.setAttribute("xo-autoplay", `${xoCarouselAutoplay}`);
          (_d2 = this.contentEl) == null ? void 0 : _d2.setAttribute("xo-observed", `${Date.now()}`);
          await delay(ANIMATE_DURATION);
          const nextEl = (_e2 = this.contentEl) == null ? void 0 : _e2.querySelector(WebComponent.CarouselNext);
          const prevEl = (_f2 = this.contentEl) == null ? void 0 : _f2.querySelector(WebComponent.CarouselPrev);
          if (nextEl && prevEl) {
            nextEl.style.opacity = "1";
            prevEl.style.opacity = "1";
          }
        } else {
          if (!this.contentEl) {
            this.insertAdjacentHTML("afterbegin", this.renderVideo());
            this.contentEl = this.querySelector("[xo-product-media-content]");
          }
          (_g2 = this.contentEl) == null ? void 0 : _g2.style.setProperty("opacity", "1");
          const videoEl = this.contentEl.querySelector("video");
          if (videoEl) {
            videoEl.autoplay = true;
            videoEl.play();
          }
        }
      });
      __publicField(this, "handleMouseLeave", () => {
        var _a2, _b2;
        this.setState({ isHover: false });
        this.handleNextElementShow();
        this.delayCancel();
        this.cancel2();
        if (this.contentEl) {
          this.contentEl.removeEventListener("xo:carousel:init", this.handleNextElementHide);
          (_a2 = this.contentEl) == null ? void 0 : _a2.style.setProperty("opacity", "0");
          if (this.contentEl.tagName.toLowerCase() === WebComponent.Carousel) {
            this.contentEl.setAttribute("xo-autoplay", "0");
            (_b2 = this.contentEl) == null ? void 0 : _b2.setAttribute("xo-observed", `${Date.now()}`);
          }
          const videoEl = this.contentEl.querySelector("video");
          if (videoEl) {
            videoEl.autoplay = false;
            videoEl.pause();
          }
        }
      });
    }
    async mount() {
      var _a2, _b2, _c2, _d2;
      if (isMobile.any) {
        return;
      }
      this.cancel2 = await delay();
      if (!this.productEl) {
        throw new Error(`${WebComponent.ProductMedia} must be in ${WebComponent.Product}`);
      }
      const { xoTargetSelector } = this.props;
      const { xoProductId } = this.productEl.getOptions();
      const { productData } = getProductState();
      this.media = (_b2 = (_a2 = productData[xoProductId]) == null ? void 0 : _a2.media) != null ? _b2 : [];
      const targetEl = xoTargetSelector ? this.querySelector(xoTargetSelector) : this;
      const finalTargetEl = targetEl != null ? targetEl : this;
      finalTargetEl.addEventListener("mouseenter", this.handleMouseEnter);
      finalTargetEl.addEventListener("mouseleave", this.handleMouseLeave);
      this.setState({
        carouselNextContent: (_c2 = this.props.xoCarouselNextContent) != null ? _c2 : "",
        carouselPrevContent: (_d2 = this.props.xoCarouselPrevContent) != null ? _d2 : ""
      });
      this.setProps({
        xoCarouselNextContent: void 0,
        xoCarouselPrevContent: void 0
      });
    }
    unmount() {
      var _a2;
      const { xoTargetSelector } = this.props;
      const targetEl = xoTargetSelector ? this.querySelector(xoTargetSelector) : this;
      const finalTargetEl = targetEl != null ? targetEl : this;
      this.handleNextElementShow();
      this.delayCancel();
      this.cancel2();
      finalTargetEl.removeEventListener("mouseenter", this.handleMouseEnter);
      finalTargetEl.removeEventListener("mouseleave", this.handleMouseLeave);
      (_a2 = this.contentEl) == null ? void 0 : _a2.removeEventListener("xo:carousel:init", this.handleNextElementHide);
    }
  }, __publicField(_o, "propTypes", {
    xoType: "string",
    xoTargetSelector: "string",
    xoCarouselAutoplay: "number",
    xoCarouselPrevContent: "string",
    xoCarouselNextContent: "string",
    xoCarouselType: "string",
    xoCarouselPaginationEnabled: "boolean",
    xoCarouselBulletContent: "string",
    xoCarouselActiveIndex: "number",
    xoCarouselDynamicBulletsEnabled: "boolean",
    xoCarouselDynamicBulletsPerView: "number",
    xoRtl: "boolean",
    xoImageLazyloadOverlayContent: "string"
  }), __publicField(_o, "defaultProps", {
    xoType: "carousel",
    xoTargetSelector: "",
    xoCarouselAutoplay: 1500,
    xoCarouselPrevContent: "",
    xoCarouselNextContent: "",
    xoCarouselType: "fade",
    xoCarouselPaginationEnabled: false,
    xoCarouselBulletContent: "<span></span>",
    xoCarouselActiveIndex: 1,
    xoCarouselDynamicBulletsEnabled: false,
    xoCarouselDynamicBulletsPerView: 3,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    xoImageLazyloadOverlayContent: ""
  }), _o);
  ProductMedia = __decorate([
    customElements$1(WebComponent.ProductMedia)
  ], ProductMedia);
  const FROM = 0;
  const TO = 100;
  let CartFly = (_p = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "animated", createAnimate());
      __publicField(this, "handleAnimate", (target, cartFlyEndEl) => (value) => {
        const { top: targetTop, left: targetLeft } = offset(target);
        const { width: targetWidth, height: targetHeight } = target.getBoundingClientRect();
        const { top, left } = offset(cartFlyEndEl);
        const { width, height } = cartFlyEndEl.getBoundingClientRect();
        const finalTop = interpolate({
          inputRange: [FROM, TO],
          outputRange: [targetTop, top],
          easing: (t) => {
            const c1 = -3;
            const c3 = c1 + 1;
            return c3 * t * t * t - c1 * t * t;
          },
          value
        });
        const finalLeft = interpolate({
          inputRange: [FROM, TO],
          outputRange: [targetLeft, left],
          value
        });
        const finalWidth = interpolate({
          inputRange: [FROM, TO],
          outputRange: [targetWidth, width],
          value
        });
        const finalHeight = interpolate({
          inputRange: [FROM, TO],
          outputRange: [targetHeight, height],
          value
        });
        this.style.top = `${finalTop}px`;
        this.style.left = `${finalLeft}px`;
        this.style.width = `${finalWidth}px`;
        this.style.height = `${finalHeight}px`;
      });
      __publicField(this, "handle", (target) => {
        const { xoSpeed, xoEasing } = this.props;
        const cartFlyEndEl = document.querySelector("[xo-cart-fly-end]");
        if (cartFlyEndEl) {
          this.style.display = "block";
          this.animated({
            from: FROM,
            to: TO,
            duration: xoSpeed,
            easing: easings[xoEasing],
            onUpdate: this.handleAnimate(target, cartFlyEndEl),
            onEnd: () => {
              this.style.removeProperty("display");
            }
          });
        }
      });
    }
    mount() {
      this.unsubscribe = subscribe.cart((state) => {
        var _a2, _b2;
        let src = "";
        if (state.item) {
          src = (_a2 = state.item) == null ? void 0 : _a2.featured_image.src;
        } else if (state.items && state.items.length > 0) {
          src = (_b2 = state.items[0]) == null ? void 0 : _b2.featured_image.src;
        }
        if (src) {
          this.style.setProperty("--product-featured-image", `url('${imageUrl(src, { width: 300 })}')`);
        }
      });
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_p, "propTypes", {
    xoSpeed: "number",
    xoEasing: "string"
  }), __publicField(_p, "defaultProps", {
    xoSpeed: 1e3,
    xoEasing: "ease"
  }), _p);
  CartFly = __decorate([
    customElements$1(WebComponent.CartFly)
  ], CartFly);
  let BundleProvider = (_q = class extends XoComponent {
  }, __publicField(_q, "propTypes", {
    xoName: "string",
    xoDiscounts: "array"
  }), __publicField(_q, "defaultProps", {
    xoDiscounts: []
  }), _q);
  BundleProvider = __decorate([
    customElements$1(WebComponent.BundleProvider)
  ], BundleProvider);
  let BundleContent = (_r = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundleContent} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoName } = this.providerEl.props;
      const { xoGroup: xoGroup2 } = this.props;
      this.unsubscribe = subscribe.bundle(({ bundles }) => {
        var _a2, _b2;
        const bundle = (_b2 = xoGroup2 ? (_a2 = bundles[xoName]) == null ? void 0 : _a2.filter((item) => item.group === xoGroup2) : bundles[xoName]) != null ? _b2 : [];
        this.setState({ bundle });
        this.setProps({ xoEmpty: bundle.length === 0 });
      }, (prev2, next2) => {
        return (prev2 == null ? void 0 : prev2.observed) === (next2 == null ? void 0 : next2.observed);
      });
    }
    stateUpdate() {
      const { bundle } = this.state;
      this.innerHTML = bundle.map((item) => item.html).join("");
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_r, "propTypes", {
    xoGroup: "string",
    xoEmpty: "boolean"
  }), _r);
  BundleContent = __decorate([
    customElements$1(WebComponent.BundleContent)
  ], BundleContent);
  let BundleAdd = (_s = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        prevVariantId: ""
      });
      __publicField(this, "toggle", false);
      __publicField(this, "triggerProductEl", null);
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "quickViewEl", this.closest(WebComponent.ProductQuickView));
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "getBundleTemplateEl", () => {
        return (this.triggerProductEl || this.productEl).querySelector(`template[${BUNDLE_CARD_ITEM_ATTR}]`);
      });
      __publicField(this, "getBundlePropTemplateEl", () => {
        return this.providerEl.querySelector(`template[${BUNDLE_PROP_ATTR}]`);
      });
      __publicField(this, "handleClick", () => {
        var _a2, _b2, _c2, _d2, _e2;
        const xoName = ((_a2 = this.providerEl) == null ? void 0 : _a2.props.xoName) || ((_b2 = this.quickViewEl) == null ? void 0 : _b2.getAttribute("xo-bundle-name"));
        if (!xoName) {
          return;
        }
        if (this.quickViewEl) {
          this.providerEl = this.quickViewEl.bundleProviderEl;
          this.triggerProductEl = this.quickViewEl.triggerProductEl;
        }
        const { xoGroup: xoGroup2, xoVariantId } = this.props;
        const { xoProductId, xoSectionId } = this.productEl.getOptions();
        const variantId = xoVariantId || getVariantId(xoSectionId, xoProductId).toString();
        const properties = getProductProperties(this.closest(WebComponent.Product));
        const templateEl = this.getBundleTemplateEl();
        const bundlePropTemplateEl = this.getBundlePropTemplateEl();
        const price = templateEl == null ? void 0 : templateEl.getAttribute(BUNDLE_CARD_PRICE_ATTR);
        const quantityEl = templateEl == null ? void 0 : templateEl.content.querySelector(WebComponent.CartQuantity);
        const removeEl = templateEl == null ? void 0 : templateEl.content.querySelector(WebComponent.BundleRemove);
        const propertiesEl = templateEl == null ? void 0 : templateEl.content.querySelector(WebComponent.BundleProperties);
        quantityEl == null ? void 0 : quantityEl.setAttribute("xo-variant-id", variantId);
        removeEl == null ? void 0 : removeEl.setAttribute("xo-variant-id", variantId);
        if (properties && bundlePropTemplateEl && propertiesEl) {
          propertiesEl.innerHTML = "";
          each(Object.entries(properties), ([key, value]) => {
            const label = key.replace(/properties\[|\]/g, "");
            const content = bundlePropTemplateEl.innerHTML.replace(/{\s*label\s*}/g, label).replace(/{\s*value\s*}/g, value);
            propertiesEl.insertAdjacentHTML("beforeend", content);
          });
        }
        const bundleUI = (_c2 = templateEl == null ? void 0 : templateEl.innerHTML) != null ? _c2 : "";
        if (price) {
          const priceFinal = Number(price);
          const quantity = (_e2 = (_d2 = this.productEl.querySelector(`${WebComponent.CartQuantity} input`)) == null ? void 0 : _d2.value) != null ? _e2 : "1";
          if (this.toggle && this.state.prevVariantId) {
            removeBundleItem(xoName, this.state.prevVariantId);
          }
          addBundleItem(xoName, {
            group: xoGroup2,
            variantId,
            html: bundleUI,
            productId: xoProductId,
            productPrice: priceFinal,
            quantity: Number(quantity),
            trigger: this,
            properties
          });
          this.setState({ prevVariantId: variantId });
        }
      });
    }
    setTriggerProductEl(productEl) {
      this.triggerProductEl = productEl;
    }
    setProviderEl(providerEl) {
      this.providerEl = providerEl;
    }
    mount() {
      this.addEventListener("click", this.handleClick);
      this.unsubscribe = subscribe.bundle(async ({ bundles }) => {
        var _a2, _b2;
        if (this.quickViewEl) {
          await delay();
        }
        const xoName = ((_a2 = this.providerEl) == null ? void 0 : _a2.props.xoName) || ((_b2 = this.quickViewEl) == null ? void 0 : _b2.getAttribute("xo-bundle-name"));
        if (!xoName) {
          return;
        }
        const bundle = bundles[xoName];
        if (bundle) {
          const productEls = Array.from(this.providerEl.querySelectorAll(WebComponent.Product));
          each(productEls, (productEl) => {
            attrBoolean.set(productEl, "xo-bundle-added", false);
          });
          each(bundle, (bundleItem) => {
            var _a3;
            const productEl = (_a3 = bundleItem.trigger) == null ? void 0 : _a3.closest(WebComponent.Product);
            if (productEl) {
              attrBoolean.set(productEl, "xo-bundle-added", true);
            }
          });
        }
      });
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
      this.unsubscribe();
    }
  }, __publicField(_s, "propTypes", {
    xoGroup: "string",
    xoVariantId: "string"
  }), __publicField(_s, "defaultProps", {}), _s);
  BundleAdd = __decorate([
    customElements$1(WebComponent.BundleAdd)
  ], BundleAdd);
  let BundleRemove = (_t = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        currentVariantId: ""
      });
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "handleProductVariant", (productVariantEls) => {
        if (productVariantEls.length) {
          each(productVariantEls, (productVariantEl) => {
            const { xoSectionId, xoProductId } = productVariantEl.closest(WebComponent.Product).getOptions();
            const fieldEls = Array.from(productVariantEl.querySelectorAll('input[type="radio"], select'));
            productVariantEl == null ? void 0 : productVariantEl.bindAvailable();
            each(fieldEls, (fieldEl) => {
              const newName = fieldSignal.removeFieldSignal(fieldEl.name);
              setFormVariant(xoSectionId, xoProductId, newName, "");
              if (fieldEl instanceof HTMLInputElement) {
                fieldEl.checked = false;
              } else if (fieldEl instanceof HTMLSelectElement) {
                const optionEls = Array.from(fieldEl.querySelectorAll("option"));
                each(optionEls, (optionEl) => {
                  optionEl.selected = false;
                });
              }
            });
          });
        }
      });
      __publicField(this, "handleClick", () => {
        var _a2, _b2, _c2, _d2;
        const { xoName } = this.providerEl.props;
        const { xoAll } = this.props;
        const { currentVariantId } = this.state;
        if (xoAll) {
          removeBundleAllItem(xoName);
          const productVariantEls = Array.from((_b2 = (_a2 = this.providerEl) == null ? void 0 : _a2.querySelectorAll(`${WebComponent.ProductVariant}[xo-add-to-bundle], ${WebComponent.ProductVariants}[xo-add-to-bundle]`)) != null ? _b2 : []);
          this.handleProductVariant(productVariantEls);
        } else {
          removeBundleItem(xoName, currentVariantId);
          const productVariantEls = Array.from((_d2 = (_c2 = this.productEl) == null ? void 0 : _c2.querySelectorAll(`${WebComponent.ProductVariant}[xo-add-to-bundle], ${WebComponent.ProductVariants}[xo-add-to-bundle]`)) != null ? _d2 : []);
          this.handleProductVariant(productVariantEls);
        }
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundleRemove} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoVariantId } = this.props;
      this.setState({ currentVariantId: xoVariantId });
      this.addEventListener("click", this.handleClick);
    }
    propUpdate({ name, nextProp }) {
      if (name === "xoVariantId" && nextProp && typeof nextProp === "string") {
        this.setState({ currentVariantId: nextProp });
      }
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
    }
  }, __publicField(_t, "propTypes", {
    xoVariantId: "string",
    xoAll: "boolean"
  }), __publicField(_t, "observedProps", ["xoVariantId"]), _t);
  BundleRemove = __decorate([
    customElements$1(WebComponent.BundleRemove)
  ], BundleRemove);
  let BundlePrice = (_u = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundlePrice} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoCompareAtPrice } = this.props;
      const { xoDiscounts, xoName } = this.providerEl.props;
      const format = document.documentElement.getAttribute("xo-money-format");
      if (!format) {
        throw new Error('xo-money-format="{{ shop.money_format }}" attribute of <html> is required');
      }
      this.unsubscribe = subscribe.bundle(({ bundles }) => {
        var _a2;
        const bundle = (_a2 = bundles[xoName]) != null ? _a2 : [];
        const totalPrice = bundle.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        const quantity = bundle.reduce((total, item) => total + item.quantity, 0);
        const minQuantity = Math.min(...xoDiscounts.map(({ minQuantity: minQuantity2 }) => minQuantity2));
        if (xoCompareAtPrice) {
          if (quantity >= minQuantity) {
            const price = formatMoney(totalPrice, format);
            this.innerHTML = price;
            this.setProps({ xoHidden: false });
          } else {
            this.innerHTML = "";
            this.setProps({ xoHidden: true });
          }
        } else if (xoDiscounts.length) {
          if (quantity >= minQuantity) {
            const prices = xoDiscounts.map(({ type, value, minQuantity: minQuantity2 }) => {
              if (type === "percentage") {
                const percent = value;
                const compareAtPrice2 = bundle.reduce((total, item) => {
                  const result = total + getCompareAtPrice(item.productPrice, percent) * item.quantity;
                  return result;
                }, 0);
                const price3 = formatMoney(compareAtPrice2, format);
                return {
                  compare: compareAtPrice2,
                  minQuantity: minQuantity2,
                  price: price3
                };
              }
              const compareAtPrice = totalPrice - value * Number(window.Shopify.currency.rate);
              const price2 = formatMoney(compareAtPrice, format);
              return {
                compare: compareAtPrice,
                minQuantity: minQuantity2,
                price: price2
              };
            });
            const { price } = prices.filter((item) => quantity >= item.minQuantity).sort((a, b) => a.compare - b.compare)[0];
            this.innerHTML = price;
          } else {
            const price = formatMoney(totalPrice, format);
            this.innerHTML = price;
          }
        }
      });
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_u, "propTypes", {
    xoCompareAtPrice: "boolean",
    xoHidden: "boolean"
  }), __publicField(_u, "defaultProps", {
    xoCompareAtPrice: false
  }), _u);
  BundlePrice = __decorate([
    customElements$1(WebComponent.BundlePrice)
  ], BundlePrice);
  let BundleSize = (_v = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundleSize} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoDiscounts, xoName } = this.providerEl.props;
      this.unsubscribe = subscribe.bundle(({ bundles }) => {
        var _a2;
        const bundle = (_a2 = bundles[xoName]) != null ? _a2 : [];
        const quantity = bundle.reduce((total, item) => total + item.quantity, 0);
        const minQuantity = Math.min(...xoDiscounts.map(({ minQuantity: minQuantity2 }) => minQuantity2));
        this.style.setProperty("--xo-size", `${quantity}`);
        this.setProps({ xoSize: quantity, xoQualified: quantity >= minQuantity });
      });
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_v, "propTypes", {
    xoSize: "number",
    xoQualified: "boolean"
  }), __publicField(_v, "defaultProps", {
    xoSize: 0
  }), _v);
  BundleSize = __decorate([
    customElements$1(WebComponent.BundleSize)
  ], BundleSize);
  let BundlePlaceholder = (_w = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundlePlaceholder} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoDiscounts, xoName } = this.providerEl.props;
      const maxQuantity = Math.max(...xoDiscounts.map(({ minQuantity }) => minQuantity));
      const template = this.innerHTML;
      this.unsubscribe = subscribe.bundle(({ bundles }) => {
        var _a2;
        const bundle = (_a2 = bundles[xoName]) != null ? _a2 : [];
        this.innerHTML = range(0, maxQuantity - bundle.length).map(() => {
          return template;
        }).join("");
      });
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_w, "propTypes", {}), __publicField(_w, "defaultProps", {}), _w);
  BundlePlaceholder = __decorate([
    customElements$1(WebComponent.BundlePlaceholder)
  ], BundlePlaceholder);
  let BundleProgress = (_x = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundleProgress} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoDiscounts, xoName } = this.providerEl.props;
      const minQuantity = Math.min(...xoDiscounts.map(({ minQuantity: minQuantity2 }) => minQuantity2));
      this.unsubscribe = subscribe.bundle(({ bundles }) => {
        var _a2;
        const bundle = (_a2 = bundles[xoName]) != null ? _a2 : [];
        const quantity = bundle.reduce((total, item) => total + item.quantity, 0);
        this.style.setProperty("--xo-x", `${Math.min(0, 100 * (quantity / minQuantity) - 100)}%`);
        this.setProps({ xoQualified: quantity >= minQuantity });
      });
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_x, "propTypes", {
    xoQualified: "boolean"
  }), __publicField(_x, "defaultProps", {}), _x);
  BundleProgress = __decorate([
    customElements$1(WebComponent.BundleProgress)
  ], BundleProgress);
  let BundleStep = (_y = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "providerEl", this.closest(WebComponent.BundleProvider));
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      if (!this.providerEl) {
        throw new Error(`${WebComponent.BundleStep} must be a child of ${WebComponent.BundleProvider}}`);
      }
      const { xoDiscounts, xoName } = this.providerEl.props;
      const { xoMinQuantity } = this.props;
      this.unsubscribe = subscribe.bundle(({ bundles }) => {
        var _a2, _b2, _c2;
        const bundle = (_a2 = bundles[xoName]) != null ? _a2 : [];
        const totalPrice = bundle.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        const quantity = bundle.reduce((total, item) => total + item.quantity, 0);
        if (quantity > 0) {
          const temp = xoDiscounts.map(({ type, value, minQuantity }) => {
            if (type === "percentage") {
              const percent = value;
              const compareAtPrice2 = totalPrice - Math.floor(totalPrice * percent / 100);
              return {
                compare: compareAtPrice2,
                minQuantity
              };
            }
            const compareAtPrice = totalPrice - value;
            return {
              compare: compareAtPrice,
              minQuantity
            };
          });
          if (temp) {
            const minQuantity = (_c2 = (_b2 = temp.filter((item) => quantity >= item.minQuantity).sort((a, b) => a.compare - b.compare)) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.minQuantity;
            this.setProps({ xoQualified: minQuantity === xoMinQuantity });
          }
        } else {
          this.setProps({ xoQualified: false });
        }
      });
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_y, "propTypes", {
    xoMinQuantity: "number",
    xoQualified: "boolean"
  }), __publicField(_y, "defaultProps", {}), _y);
  BundleStep = __decorate([
    customElements$1(WebComponent.BundleStep)
  ], BundleStep);
  let CartQuantityTrigger = (_z = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handleQuantity", () => {
        const { xoValue, xoChecked } = this.props;
        const { xoSectionId, xoProductId, xoLine } = this.productOptions;
        if (xoValue) {
          const valueToggle = xoChecked ? 1 : xoValue;
          setFormQuantity(xoSectionId, xoProductId, xoLine, () => valueToggle);
        }
      });
    }
    getProductEl() {
      return this.closest(WebComponent.Product);
    }
    get productOptions() {
      return this.getProductEl().getOptions();
    }
    async mount() {
      await delay();
      if (!this.getProductEl()) {
        console.error(`${WebComponent.CartQuantityTrigger} must be a child of ${WebComponent.Product}}`);
      }
      const { xoValue, xoChecked } = this.props;
      const { xoSectionId, xoProductId, xoLine } = this.productOptions;
      this.addEventListener("click", this.handleQuantity);
      this.unsubscribe = subscribe.cartForm((state) => {
        var _a2;
        const quantity = (_a2 = state == null ? void 0 : state[getId(xoSectionId, xoProductId, xoLine)]) == null ? void 0 : _a2.quantity;
        this.setProps({ xoChecked: quantity === xoValue });
      });
      if (xoChecked) {
        this.handleQuantity();
      }
    }
    unmount() {
      this.removeEventListener("click", this.handleQuantity);
      this.unsubscribe();
    }
  }, __publicField(_z, "propTypes", {
    xoValue: "number",
    xoDiscount: "object",
    xoChecked: "boolean"
  }), __publicField(_z, "defaultProps", {
    xoValue: 0,
    xoChecked: false
  }), _z);
  CartQuantityTrigger = __decorate([
    customElements$1(WebComponent.CartQuantityTrigger)
  ], CartQuantityTrigger);
  let PriceReduced = (_A = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "cartQuantityTriggerEl", this.closest(WebComponent.CartQuantityTrigger));
    }
    mount() {
      var _a2;
      const { xoPrice, xoQuantity, xoDiscount } = this.props;
      const triggerProps = (_a2 = this.cartQuantityTriggerEl) == null ? void 0 : _a2.props;
      const discount = xoDiscount != null ? xoDiscount : triggerProps == null ? void 0 : triggerProps.xoDiscount;
      const quantity = xoQuantity != null ? xoQuantity : triggerProps == null ? void 0 : triggerProps.xoValue;
      if (!discount || !quantity) {
        return;
      }
      const format = document.documentElement.getAttribute("xo-money-format");
      if (!format) {
        throw new Error('xo-money-format="{{ shop.money_format }}" attribute of <html> is required');
      }
      if (discount.type === "percentage") {
        const compareAtPrice = getCompareAtPrice(xoPrice / quantity, discount.value) * quantity;
        const price = formatMoney(compareAtPrice, format);
        this.innerHTML = price;
      } else {
        const compareAtPrice = xoPrice - discount.value * Number(window.Shopify.currency.rate);
        const price = formatMoney(compareAtPrice, format);
        this.innerHTML = price;
      }
    }
  }, __publicField(_A, "propTypes", {
    xoPrice: "number",
    xoQuantity: "number",
    xoDiscount: "object"
  }), _A);
  PriceReduced = __decorate([
    customElements$1(WebComponent.PriceReduced)
  ], PriceReduced);
  let ProductProperties = (_B = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handler", async () => {
        const { xoUrl } = this.props;
        if (!xoUrl) {
          return;
        }
        const productHtml = await services.getProductHtml(xoUrl);
        const doc = new DOMParser().parseFromString(productHtml, "text/html");
        const proprertyEls = Array.from(doc.querySelectorAll(WebComponent.ProductProperty));
        this.innerHTML = "";
        each(proprertyEls, (proprertyEl) => {
          this.appendChild(proprertyEl);
        });
      });
    }
    mount() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.ProductProperty} must be in ${WebComponent.Product}`);
      }
      const toggleEl = this.closest(WebComponent.Toggle);
      const modalEl = this.closest(WebComponent.Modal);
      if (toggleEl) {
        const { xoName } = toggleEl.options;
        if (!xoName) {
          return;
        }
        this.unsubscribe = xoStore.subscribe("xo-toggle", ({ data }) => {
          var _a2;
          const isOpen = (_a2 = data[xoName]) == null ? void 0 : _a2.isOpen;
          if (isOpen) {
            this.handler();
          }
        });
      }
      if (modalEl) {
        const { xoName } = modalEl.options;
        if (!xoName) {
          return;
        }
        this.unsubscribe = xoStore.subscribe("xo-modal", ({ data }) => {
          var _a2;
          const isOpen = (_a2 = data[xoName]) == null ? void 0 : _a2.isOpen;
          if (isOpen) {
            this.handler();
          }
        });
      }
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_B, "propTypes", {
    xoUrl: "string"
  }), _B);
  ProductProperties = __decorate([
    customElements$1(WebComponent.ProductProperties)
  ], ProductProperties);
  let ProductProperty = (_C = class extends XoComponent {
    mount() {
      const fieldEls = Array.from(this.querySelectorAll(`input, select`));
      const productEl = this.closest(WebComponent.Product);
      if (!productEl) {
        throw new Error(`${WebComponent.ProductProperty} must be in ${WebComponent.Product}`);
      }
      const formEl = productEl.querySelector(FORM_CART_ADD_SELECTOR_2);
      const formId = formEl == null ? void 0 : formEl.getAttribute("id");
      if (!formId) {
        return;
      }
      each(fieldEls, (fieldEl) => {
        fieldEl.setAttribute("form", formId);
      });
    }
  }, __publicField(_C, "propTypes", {}), _C);
  ProductProperty = __decorate([
    customElements$1(WebComponent.ProductProperty)
  ], ProductProperty);
  let CartDiscount = (_D = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "setDiscountCodes", () => {
        const { xoDiscountErrorMessage, xoShippingErrorMessage } = this.props;
        setCartDiscountCodesAction(this);
        setCartDiscountMessages(xoDiscountErrorMessage, xoShippingErrorMessage);
      });
    }
    mount() {
      const inputEl = this.querySelector('input[type="text"][name="discount"]');
      if (!inputEl) {
        throw new Error(`${WebComponent.CartDiscount} must have a input element with name="discount"`);
      }
      this.setDiscountCodes();
    }
  }, __publicField(_D, "propTypes", {
    xoDiscountErrorMessage: "string",
    xoShippingErrorMessage: "string"
  }), _D);
  CartDiscount = __decorate([
    customElements$1(WebComponent.CartDiscount)
  ], CartDiscount);
  let CartDiscountSubmit = (_E = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "cartDiscountEl", null);
      __publicField(this, "handleClick", async (event) => {
        var _a2;
        event.preventDefault();
        const inputEl = this.cartDiscountEl.querySelector('input[type="text"][name="discount"]');
        const sectionId = (_a2 = this.closest(`${WebComponent.Cart}, ${WebComponent.CartMini}`)) == null ? void 0 : _a2.id;
        if (sectionId) {
          this.setProps({ xoLoading: true });
          appendCartDiscountCode(inputEl.value);
          await postCartDiscount(sectionId, true);
          this.setProps({ xoLoading: false });
          inputEl.value = "";
        }
      });
    }
    mount() {
      this.cartDiscountEl = this.closest(WebComponent.CartDiscount);
      if (!this.cartDiscountEl) {
        throw new Error(`${WebComponent.CartDiscountSubmit} must be inside ${WebComponent.CartDiscount}`);
      }
      this.addEventListener("click", this.handleClick);
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
    }
  }, __publicField(_E, "propTypes", {
    xoLoading: "boolean"
  }), _E);
  CartDiscountSubmit = __decorate([
    customElements$1(WebComponent.CartDiscountSubmit)
  ], CartDiscountSubmit);
  let CartDiscountRemove = (_F = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "cartDiscountEl", null);
      __publicField(this, "cartDiscountItemEl", null);
      __publicField(this, "handleClick", async () => {
        var _a2, _b2;
        const code = (_a2 = this.cartDiscountItemEl) == null ? void 0 : _a2.getAttribute("xo-discount-code");
        const sectionId = (_b2 = this.closest(`${WebComponent.Cart}, ${WebComponent.CartMini}`)) == null ? void 0 : _b2.id;
        if (code && sectionId && this.cartDiscountEl) {
          try {
            this.setProps({ xoLoading: true });
            setCartDiscountCodesAction(this.cartDiscountEl);
            await deleteCartDiscount(sectionId, code);
            this.setProps({ xoLoading: false });
          } catch {
            this.setProps({ xoLoading: false });
          }
        }
      });
    }
    mount() {
      this.cartDiscountEl = this.closest(WebComponent.CartDiscount);
      this.cartDiscountItemEl = this.closest(WebComponent.CartDiscountItem);
      if (!this.cartDiscountEl) {
        throw new Error(`${WebComponent.CartDiscountSubmit} must be inside ${WebComponent.CartDiscount}`);
      }
      if (!this.cartDiscountItemEl) {
        throw new Error(`${WebComponent.CartDiscountSubmit} must be inside ${WebComponent.CartDiscountItem}`);
      }
      this.addEventListener("click", this.handleClick);
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
    }
  }, __publicField(_F, "propTypes", {
    xoLoading: "boolean"
  }), _F);
  CartDiscountRemove = __decorate([
    customElements$1(WebComponent.CartDiscountRemove)
  ], CartDiscountRemove);
  let eventId = -1;
  let ProductVariants = (_G = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        variantClicked: false
      });
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "productWillChangeEl", this.querySelector(WebComponent.ProductWillChange));
      __publicField(this, "sectionEl", this.closest(".shopify-section"));
      __publicField(this, "controller", new AbortController());
      __publicField(this, "prevStatus", "idle");
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "getBindingElements", (el, value) => {
        var _a2;
        if (value.includes(":")) {
          const values = value.split(":");
          if (values.length === 1) {
            return [el];
          }
          const selector = (_a2 = values == null ? void 0 : values[1]) == null ? void 0 : _a2.replace(/(\w|\])(\[)(.*)/g, "$1");
          if (!selector) {
            return [el];
          }
          return Array.from(el.querySelectorAll(selector));
        }
        return [el];
      });
      __publicField(this, "getBindingType", (value) => {
        const bindingType = value.replace(/.*:/g, "").includes("[") ? value.replace(/.*\[/g, "").replace(/\]/g, "").trim() : "children";
        return bindingType;
      });
      __publicField(this, "handleBindingAttr", () => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
        const quickviewTriggerEl = getState.product().quickviewTriggerEl;
        const outerProductEl = quickviewTriggerEl == null ? void 0 : quickviewTriggerEl.closest(WebComponent.Product);
        if (!outerProductEl) {
          return;
        }
        const textContent = (_e2 = (_d2 = (_b2 = (_a2 = this.productEl.querySelector(`${WebComponent.ProductQuickViewLiquidBinding} template`)) == null ? void 0 : _a2.content) == null ? void 0 : _b2.textContent) != null ? _d2 : (_c2 = this.productEl.querySelector(WebComponent.ProductQuickViewLiquidBinding)) == null ? void 0 : _c2.textContent) != null ? _e2 : "{}";
        const liquidBindingData = objectParse(textContent);
        const contentBindEls = [
          ...Array.from(outerProductEl.querySelectorAll(`[${BINDING_ATTR}]`)),
          ...Array.from((_h2 = (_g2 = (_f2 = outerProductEl.querySelector(`template[${BUNDLE_CARD_ITEM_ATTR}]`)) == null ? void 0 : _f2.content) == null ? void 0 : _g2.querySelectorAll(`[${BINDING_ATTR}]`)) != null ? _h2 : [])
        ];
        each(contentBindEls, (contentBindEl) => {
          const bindings = contentBindEl.getAttribute(BINDING_ATTR).split(",");
          each(bindings, (binding) => {
            const key = binding.replace(/(:|\[).*/g, "").trim();
            const elements = this.getBindingElements(contentBindEl, binding);
            const bindingType = this.getBindingType(binding);
            if (typeOf(liquidBindingData) === "object") {
              const newValue = liquidBindingData[key];
              if (newValue != null && newValue.trim() !== "") {
                each(elements, async (element) => {
                  if (bindingType === "children") {
                    element.innerHTML = newValue;
                    await delay(100);
                    loadImages(Array.from(element.querySelectorAll("img")));
                  } else {
                    element.setAttribute(bindingType, newValue);
                  }
                });
              }
            }
          });
        });
      });
      __publicField(this, "closePopover", (fieldEl) => {
        const popoverEl = fieldEl.closest(WebComponent.Popover);
        const productEl = popoverEl == null ? void 0 : popoverEl.querySelector(WebComponent.Product);
        if (popoverEl && !productEl) {
          const popoverName = popoverEl.getAttribute("xo-name");
          xoPopover.close(popoverName);
        }
      });
      __publicField(this, "getOptionValueIds", () => {
        return getFieldEls(this).reduce((acc, el) => {
          if (el instanceof HTMLInputElement) {
            if (el.checked) {
              const optionValueId = el.getAttribute("xo-option-value-id");
              return optionValueId ? [...acc, optionValueId] : acc;
            }
          } else if (el instanceof HTMLSelectElement) {
            const optionSelectedEl = el.querySelector("option:checked");
            if (optionSelectedEl) {
              const optionValueId = optionSelectedEl.getAttribute("xo-option-value-id");
              return optionValueId ? [...acc, optionValueId] : acc;
            }
          }
          return acc;
        }, []);
      });
      __publicField(this, "getVariantStatus", () => {
        let result = "available";
        for (const el of getFieldEls(this)) {
          if (el instanceof HTMLInputElement) {
            const unavailable = el.hasAttribute("xo-unavailable");
            if (el.checked && unavailable) {
              result = "unavailable";
              break;
            }
            const outOfStock = el.hasAttribute("xo-disabled");
            if (el.checked && outOfStock) {
              result = "out-of-stock";
              break;
            }
          } else if (el instanceof HTMLSelectElement) {
            const optionSelectedEl = el.querySelector("option:checked");
            const unavailable = optionSelectedEl == null ? void 0 : optionSelectedEl.hasAttribute("xo-unavailable");
            if (unavailable) {
              result = "unavailable";
              break;
            }
            const outOfStock = optionSelectedEl == null ? void 0 : optionSelectedEl.hasAttribute("xo-disabled");
            if (outOfStock) {
              result = "out-of-stock";
              break;
            }
          }
        }
        return result;
      });
      __publicField(this, "setProductStatus", () => {
        switch (this.getVariantStatus()) {
          case "unavailable":
            attrBoolean.set(this.productEl, "xo-unavailable", true);
            attrBoolean.set(this.productEl, "xo-disabled", false);
            break;
          case "out-of-stock":
            attrBoolean.set(this.productEl, "xo-disabled", true);
            attrBoolean.set(this.productEl, "xo-unavailable", false);
            break;
          case "available":
            attrBoolean.set(this.productEl, "xo-disabled", false);
            attrBoolean.set(this.productEl, "xo-unavailable", false);
            break;
        }
      });
      __publicField(this, "inputVariantIdChange", (variantId) => {
        const variantInputEls = Array.from(document.querySelectorAll(`${FORM_CART_ADD_SELECTOR} input[name="id"]`));
        each(variantInputEls, (variantInputEl) => {
          variantInputEl.value = variantId;
        });
      });
      __publicField(this, "getUrl", (url, isQuickview = false) => {
        const { xoSectionId } = this.productEl.getOptions();
        const optionValueIds = this.getOptionValueIds();
        const nextUrl = new URL(url);
        nextUrl.search = queryString.stringify({
          option_values: optionValueIds.join(","),
          section_id: isQuickview ? queryString.parse(nextUrl.search, true).section_id : xoSectionId
        });
        return nextUrl.href;
      });
      __publicField(this, "handleFeatured", () => {
        const { xoProductUrl } = this.productEl.getOptions();
        getProductHtml(this.getUrl(xoProductUrl), true);
      });
      __publicField(this, "handleProductInformation", (variantId) => {
        const newUrl = `${window.location.pathname}${variantId ? `?variant=${variantId}` : ""}`;
        if (window.location.href !== newUrl) {
          window.history.replaceState({}, "", newUrl);
        }
      });
      __publicField(this, "handleQuickView", () => {
        var _a2, _b2;
        const xoName = (_b2 = (_a2 = this.closest(WebComponent.ProductQuickView)) == null ? void 0 : _a2.getAttribute("xo-name")) != null ? _b2 : QUICKVIEW_NAME;
        const quickviewTriggerEl = getState.product().quickviewTriggerEl;
        if (!quickviewTriggerEl) {
          return;
        }
        const { xoProductUrl } = quickviewTriggerEl.getOptions();
        getQuickviewProductHtml(xoName, this.getUrl(xoProductUrl, true), quickviewTriggerEl);
      });
      __publicField(this, "handleLocationChange", () => {
        var _a2;
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        getProductHtml(this.getUrl(window.location.href));
        const pickupEl = (_a2 = this.productEl) == null ? void 0 : _a2.querySelector(WebComponent.ProductPickupAvailability);
        if (pickupEl) {
          getPickupAvailabilityHtml(xoSectionId, xoProductId);
        }
      });
      __publicField(this, "addFieldSignals", (productVariantsEl) => {
        const { xoProductId } = this.productEl.getOptions();
        each(getFieldEls(productVariantsEl), (fieldEl) => {
          const id2 = fieldEl.id;
          let signal = `product_${xoProductId}`;
          if (getProductType(this.productEl) === "quickview") {
            signal = QUICKVIEW_SIGNAL;
            const xoNameEls = Array.from(this.productEl.querySelectorAll(`[xo-name]:not(${WebComponent.ProductVariantSelected}):not(${WebComponent.ModalTrigger})`));
            each(xoNameEls, (xoNameEl) => {
              xoNameEl.setAttribute("xo-name", fieldSignal.addFieldSignal(xoNameEl.getAttribute("xo-name"), QUICKVIEW_SIGNAL));
            });
          }
          const labelEl = document.querySelector(`label[for="${id2}"]`);
          fieldEl.name = fieldSignal.addFieldSignal(fieldEl.name, signal);
          if (id2) {
            fieldEl.id = fieldSignal.addFieldSignal(id2, signal);
          }
          if (labelEl) {
            labelEl.setAttribute("for", fieldSignal.addFieldSignal(id2, signal));
          }
        });
      });
      __publicField(this, "getVariantId", (fieldEl) => {
        let variantId = fieldEl.getAttribute("xo-variant-id") || "";
        if (fieldEl instanceof HTMLSelectElement) {
          const optionSelectedEl = fieldEl.querySelector("option:checked");
          if (optionSelectedEl) {
            variantId = optionSelectedEl.getAttribute("xo-variant-id") || variantId;
          }
        }
        return variantId;
      });
      __publicField(this, "handler", (event) => {
        const { xoSectionId, xoProductId } = this.productEl.getOptions();
        const target = event.target;
        let variantId = this.getVariantId(target);
        this.inputVariantIdChange(variantId);
        setVariantId(xoSectionId, xoProductId, variantId);
        this.closePopover(target);
        this.setState({ variantClicked: true });
        switch (getProductType(this.productEl)) {
          case "featured": {
            return this.handleFeatured();
          }
          case "quickview": {
            return this.handleQuickView();
          }
          case "information": {
            return this.handleProductInformation(variantId);
          }
        }
      });
      __publicField(this, "morph", (productHtml, isQuickview = false) => {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(productHtml, "text/html");
        const productVariantEls = Array.from(doc.querySelectorAll(WebComponent.ProductVariants));
        each(productVariantEls, (productVariantEl, index) => {
          var _a2;
          this.addFieldSignals(productVariantEl);
          const currentProductVariantEl = (_a2 = this.sectionEl) == null ? void 0 : _a2.querySelectorAll(WebComponent.ProductVariants)[index];
          if (currentProductVariantEl && productVariantEl.innerHTML !== currentProductVariantEl.innerHTML) {
            currentProductVariantEl.innerHTML = productVariantEl.innerHTML;
          }
        });
        const bindingEls = Array.from(doc.querySelectorAll(WebComponent.ProductQuickViewLiquidBinding));
        each(bindingEls, (bindingEl, index) => {
          var _a2;
          const currentbindingEl = (_a2 = this.sectionEl) == null ? void 0 : _a2.querySelectorAll(WebComponent.ProductQuickViewLiquidBinding)[index];
          if (currentbindingEl && bindingEl.innerHTML !== currentbindingEl.innerHTML) {
            currentbindingEl.innerHTML = bindingEl.innerHTML;
            if (isQuickview && this.state.variantClicked) {
              this.handleBindingAttr();
            }
          }
        });
      });
      __publicField(this, "listener", async () => {
        var _a2, _b2, _c2;
        const { xoProductUrl } = this.productEl.getOptions();
        const { status, quickviewProductHtml, featuredProductHtmls, productHtml, quickviewTriggerEl } = getState.product();
        if (status === "loading") {
          this.style.opacity = "0.7";
          this.style.pointerEvents = "none";
        } else {
          this.style.removeProperty("opacity");
          this.style.removeProperty("pointer-events");
        }
        if (status !== "success" && this.prevStatus === status) {
          return;
        }
        const productTriggerEl = quickviewTriggerEl == null ? void 0 : quickviewTriggerEl.closest(WebComponent.Product);
        let finalProductHtml = "";
        const type = getProductType(this.productEl);
        switch (type) {
          case "featured": {
            finalProductHtml = (_a2 = featuredProductHtmls[xoProductUrl != null ? xoProductUrl : ""]) != null ? _a2 : "";
            break;
          }
          case "quickview": {
            const xoName = (_b2 = productTriggerEl == null ? void 0 : productTriggerEl.getAttribute("xo-name")) != null ? _b2 : QUICKVIEW_NAME;
            finalProductHtml = (_c2 = quickviewProductHtml[xoName]) != null ? _c2 : "";
            break;
          }
          case "information": {
            finalProductHtml = productHtml;
            break;
          }
        }
        this.morph(finalProductHtml, type === "quickview");
        this.prevStatus = status;
        each(getFieldEls(this), (el) => {
          el.addEventListener("input", this.handler, { signal: this.controller.signal });
        });
        this.setProductStatus();
        loadImages(Array.from(this.querySelectorAll("img")));
        if (status === "success") {
          this.setState({ variantClicked: false });
        }
      });
    }
    async mount() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.ProductVariants} must be used within a ${WebComponent.Product} component`);
      }
      if (this.productWillChangeEl) {
        throw new Error(`You cannot use ${WebComponent.ProductWillChange} inside ${WebComponent.ProductVariants}`);
      }
      await delay();
      const type = getProductType(this.productEl);
      handleSticky(this);
      this.addFieldSignals(this);
      each(getFieldEls(this), (el) => {
        el.addEventListener("input", this.handler, { signal: this.controller.signal });
      });
      if (type === "information") {
        locationEvent.off(eventId);
        eventId = locationEvent.on("change", this.handleLocationChange);
      }
      this.unsubscribe = subscribe.product(this.listener);
    }
    unmount() {
      this.prevStatus = "idle";
      locationEvent.off(eventId);
      this.controller.abort();
      this.unsubscribe();
    }
  }, __publicField(_G, "propTypes", {}), __publicField(_G, "defaultProps", {}), _G);
  ProductVariants = __decorate([
    customElements$1(WebComponent.ProductVariants)
  ], ProductVariants);
  const styles$h = "";
  createState();
  const xoProductQuickView = {
    on(eventStatus, listener) {
      const unsubscribe = subscribe.product(({ status, productHtml }) => {
        if (status === eventStatus) {
          listener(productHtml);
        }
      });
      return unsubscribe;
    }
  };
  window.xoProductQuickView = xoProductQuickView;
  window.cartFormSubscribe = cartFormSubscribe;
  window.cartSubscribe = cartSubscribe;
  window.getCartFormState = getCartFormState;
  window.productSubscribe = productSubscribe;
  componentDefine({
    [WebComponent.ProductData]: ProductData,
    [WebComponent.Cart]: Cart,
    [WebComponent.CartMini]: CartMini,
    [WebComponent.CartAdd]: CartAdd,
    [WebComponent.CartAddError]: CartAddError,
    [WebComponent.CartRemove]: CartRemove,
    [WebComponent.CartSize]: CartSize,
    [WebComponent.CartChangeFallback]: CartChangeFallback,
    [WebComponent.CartQuantity]: CartQuantity,
    [WebComponent.CartQuantityMinus]: CartQuantityMinus,
    [WebComponent.CartQuantityPlus]: CartQuantityPlus,
    [WebComponent.CartNote]: CartNote,
    [WebComponent.CartNoteSubmit]: CartNoteSubmit,
    [WebComponent.CartShippingRatesField]: CartShippingRatesField,
    [WebComponent.CartShippingRatesSubmit]: CartShippingRatesSubmit,
    [WebComponent.CartShippingRatesError]: CartShippingRatesError,
    [WebComponent.ProductVariant]: ProductVariant,
    [WebComponent.ProductPickupAvailability]: ProductPickupAvailability,
    [WebComponent.ProductPickupAvailabilityList]: ProductPickupAvailabilityList,
    [WebComponent.ProductQuickView]: ProductQuickView,
    [WebComponent.ProductQuickViewTrigger]: ProductQuickViewTrigger,
    [WebComponent.ProductQuickViewVariant]: ProductQuickViewVariant,
    [WebComponent.ProductLiquidStatic]: ProductLiquidStatic,
    [WebComponent.ProductRecipientForm]: ProductRecipientForm,
    [WebComponent.ProductRecommendations]: ProductRecommendations
  });
  const groupEvent = new Emitter();
  class Group extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "buttonEls", []);
      __publicField(this, "handleClick", (event) => {
        event.preventDefault();
        const currentEl = event.currentTarget;
        attrBoolean.set(currentEl, "xo-active", true);
        each(this.buttonEls, (buttonEl) => {
          if (buttonEl !== currentEl) {
            attrBoolean.set(buttonEl, "xo-active", false);
          }
        });
        groupEvent.emit("change", { element: currentEl, index: this.buttonEls.indexOf(currentEl) });
      });
    }
    connectedCallback() {
      this.buttonEls = Array.from(this.querySelectorAll(WebComponent.GroupButton));
      each(this.buttonEls, (buttonEl) => {
        buttonEl.addEventListener("click", this.handleClick);
      });
    }
    disconnectedCallback() {
      each(this.buttonEls, (buttonEl) => {
        buttonEl.removeEventListener("click", this.handleClick);
      });
    }
  }
  const xoGroup = {
    on: groupEvent.on.bind(groupEvent)
  };
  window.xoGroup = xoGroup;
  componentDefine({
    [WebComponent.Group]: Group
  });
  const cssEasing = {
    easeLight: "cubic-bezier(0, 0, 0.3, 1)",
    easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    easeOut: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    easeIn: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
    easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    easeInOutBack: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    easeInCirc: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
    easeOutCirc: "cubic-bezier(0.075, 0.82, 0.165, 1)",
    easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    easeInCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    easeOutCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    easeInExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
    easeOutExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
    easeInOutExpo: "cubic-bezier(1, 0, 0, 1)",
    easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
    easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    easeInQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
    easeOutQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    easeInOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
    easeInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    easeOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
    easeInOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
    easeInSine: "cubic-bezier(0.47, 0, 0.745, 0.715)",
    easeOutSine: "cubic-bezier(0.39, 0.575, 0.565, 1)",
    easeInOutSine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    easeInBounce: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    easeOutBounce: "cubic-bezier(0.23, 1, 0.32, 1)",
    linear: "cubic-bezier(0, 0, 1, 1)",
    spring: "cubic-bezier(.27,.79,.45,1.24)"
  };
  function getWrapEl(el) {
    const wrapEl = el.closest(`${WebComponent.Carousel}:not([xo-per-view]):not([xo-column-width])`) || el.closest(`${WebComponent.Carousel}[xo-per-view="1"]:not([xo-column-width])`) || el.closest(WebComponent.Toggle) || el.closest(WebComponent.Modal) || el.closest(WebComponent.Popover) || el.closest(WebComponent.TabsPane);
    return wrapEl;
  }
  const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  function addPrevAttrForSvg(element) {
    const els = Array.from(element.querySelectorAll("[xo-next-stroke-dasharray], [xo-next-stroke-dashoffset]"));
    each(els, (pathEl) => {
      const d = pathEl.getAttribute("d");
      const nextD = pathEl.getAttribute("xo-next-d");
      const hasPrevD = pathEl.hasAttribute("xo-prev-d");
      const dasharray = pathEl.getAttribute("stroke-dasharray");
      const nextDasharray = pathEl.getAttribute("xo-next-stroke-dasharray");
      const hasPrevDasharray = pathEl.hasAttribute("xo-prev-stroke-dasharray");
      const dashoffset = pathEl.getAttribute("stroke-dashoffset");
      const nextDashoffset = pathEl.getAttribute("xo-next-stroke-dashoffset");
      const hasPrevDashoffset = pathEl.hasAttribute("xo-prev-stroke-dashoffset");
      if (d && nextD && !hasPrevD) {
        pathEl.setAttribute("xo-prev-d", d);
      }
      if (dasharray && nextDasharray && !hasPrevDasharray) {
        pathEl.setAttribute("xo-prev-stroke-dasharray", dasharray);
      }
      if (dashoffset && nextDashoffset && !hasPrevDashoffset) {
        pathEl.setAttribute("xo-prev-stroke-dashoffset", dashoffset);
      }
    });
  }
  async function handleSVG(element, options) {
    const { xoDuration, xoOrder, xoConstant, xoDisabled } = options;
    const els = Array.from(element.querySelectorAll("[xo-next-d], [xo-next-stroke-dasharray], [xo-next-stroke-dashoffset]")).filter((el) => {
      const parentEl = el.closest(WebComponent.Animate);
      return !(parentEl && parentEl !== element);
    });
    if (els.length === 0) {
      return;
    }
    if (!xoDisabled) {
      await delay(xoOrder * xoConstant);
    }
    each(els, (pathEl) => {
      const animated = createAnimate();
      const d = pathEl.getAttribute("d");
      const nextD = pathEl.getAttribute("xo-next-d");
      const dasharray = pathEl.getAttribute("stroke-dasharray");
      const nextDasharray = pathEl.getAttribute("xo-next-stroke-dasharray");
      const dashoffset = pathEl.getAttribute("stroke-dashoffset");
      const nextDashoffset = pathEl.getAttribute("xo-next-stroke-dashoffset");
      if (d && nextD) {
        const dArr = SVGPath.toArray(d);
        const nextDArr = SVGPath.toArray(nextD);
        animated({
          from: 0,
          to: 1,
          duration: isReduced || xoDisabled ? 0 : xoDuration,
          easing: easings.linear,
          onUpdate: (value) => {
            const newArr = map(dArr, (dItem, index) => {
              const nextDItem = nextDArr[index];
              if (dItem.type === (nextDItem == null ? void 0 : nextDItem.type)) {
                const values = map(dItem.values, (valueItem, valueIndex) => {
                  const nextValueItem = nextDItem.values[valueIndex];
                  const newValueItem = interpolate({
                    value,
                    inputRange: [0, 1],
                    outputRange: [valueItem, nextValueItem]
                  });
                  return newValueItem;
                }).filter(Boolean);
                return {
                  ...dItem,
                  values
                };
              }
              return dItem;
            });
            pathEl.setAttribute("d", SVGPath.toString(newArr));
          }
        });
      }
      if (dasharray && nextDasharray) {
        const dasharrayArr = dasharray.replace(/\s+/g, " ").split(" ");
        const nextDasharrayArr = nextDasharray.replace(/\s+/g, " ").split(" ");
        animated({
          from: 0,
          to: 1,
          duration: isReduced || xoDisabled ? 0 : xoDuration,
          easing: easings.linear,
          onUpdate: (value) => {
            const newArr = map(dasharrayArr, (dasharrayItem, index) => {
              var _a2, _b2;
              const nextDasharrayItem = nextDasharrayArr[index];
              const newValueItem = interpolate({
                value,
                inputRange: [0, 1],
                outputRange: [Number(((_a2 = dasharrayItem.match(/[\d.]*/g)) == null ? void 0 : _a2[0]) || 0), Number(((_b2 = nextDasharrayItem.match(/[\d.]*/g)) == null ? void 0 : _b2[0]) || 0)]
              });
              return newValueItem;
            });
            pathEl.setAttribute("stroke-dasharray", newArr.join(" "));
          }
        });
      }
      if (dashoffset && nextDashoffset) {
        const dashoffsetArr = dashoffset.replace(/\s+/g, " ").split(" ");
        const nextDashoffsetArr = nextDashoffset.replace(/\s+/g, " ").split(" ");
        animated({
          from: 0,
          to: 1,
          duration: isReduced ? 0 : xoDuration,
          easing: easings.linear,
          onUpdate: (value) => {
            const newArr = map(dashoffsetArr, (dashoffsetItem, index) => {
              var _a2, _b2;
              const nextDashoffsetItem = nextDashoffsetArr[index];
              const newValueItem = interpolate({
                value,
                inputRange: [0, 1],
                outputRange: [Number(((_a2 = dashoffsetItem.match(/[\d.]*/g)) == null ? void 0 : _a2[0]) || 0), Number(((_b2 = nextDashoffsetItem.match(/[\d.]*/g)) == null ? void 0 : _b2[0]) || 0)]
              });
              return newValueItem;
            });
            pathEl.setAttribute("stroke-dashoffset", newArr.join(" "));
          }
        });
      }
    });
  }
  function revertSVG(element) {
    const els = Array.from(element.querySelectorAll("[xo-prev-d], [xo-prev-stroke-dasharray], [xo-prev-stroke-dashoffset]"));
    each(els, (pathEl) => {
      const d = pathEl.getAttribute("d");
      const prevD = pathEl.getAttribute("xo-prev-d");
      const dasharray = pathEl.getAttribute("stroke-dasharray");
      const prevDasharray = pathEl.getAttribute("xo-prev-stroke-dasharray");
      const dashoffset = pathEl.getAttribute("stroke-dashoffset");
      const prevDashoffset = pathEl.getAttribute("xo-prev-stroke-dashoffset");
      if (prevD && d) {
        pathEl.setAttribute("d", prevD);
      }
      if (prevDasharray && dasharray) {
        pathEl.setAttribute("stroke-dasharray", prevDasharray);
      }
      if (prevDashoffset && dashoffset) {
        pathEl.setAttribute("stroke-dashoffset", prevDashoffset);
      }
    });
  }
  function handleInfiniteSVG(element) {
    const els = Array.from(element.querySelectorAll("[xo-next-stroke-dasharray], [xo-next-stroke-dashoffset]"));
    each(els, (pathEl) => {
      const d = pathEl.getAttribute("d");
      const nextD = pathEl.getAttribute("xo-next-d");
      const dasharray = pathEl.getAttribute("stroke-dasharray");
      const nextDasharray = pathEl.getAttribute("xo-next-stroke-dasharray");
      const dashoffset = pathEl.getAttribute("stroke-dashoffset");
      const nextDashoffset = pathEl.getAttribute("xo-next-stroke-dashoffset");
      if (d && nextD) {
        pathEl.style.setProperty("--xo-d", d);
        pathEl.style.setProperty("--xo-next-d", nextD);
      }
      if (dasharray && nextDasharray) {
        pathEl.style.setProperty("--xo-stroke-dasharray", dasharray);
        pathEl.style.setProperty("--xo-next-stroke-dasharray", nextDasharray);
      }
      if (dashoffset && nextDashoffset) {
        pathEl.style.setProperty("--xo-stroke-dashoffset", dashoffset);
        pathEl.style.setProperty("--xo-next-stroke-dashoffset", nextDashoffset);
      }
    });
  }
  function renderSvgFilters() {
    if (isReduced) {
      return;
    }
    const svg = `
    <svg class="xo-hidden">
      <defs>
        <filter id="xo-goo-1">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 13 -6" result="goo"></feColorMatrix>
          <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-2">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 12 -4" result="goo"></feColorMatrix>
          <feTurbulence type="turbulence" baseFrequency="1" numOctaves="1" seed="2" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-3">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 15 -8" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="0.1 0.5" numOctaves="5" seed="2" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-4">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -8" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="1 0.01" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-5">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 14 -1" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="0.009 1" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-6">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 12 -8" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-7">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -5" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="0.07 0.3" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
      </defs>
    </svg>
  `;
    document.body.insertAdjacentHTML("beforeend", svg);
  }
  const attrMapping = {
    "xo-goo-1": {
      stdDeviation: { start: 50, end: 0 }
    },
    "xo-goo-2": {
      stdDeviation: { start: 20, end: 0 },
      scale: { start: 100, end: 0 },
      baseFrequency: { start: 0.1, end: 0.05 }
    },
    "xo-goo-3": {
      stdDeviation: { start: 40, end: 0 },
      scale: { start: 150, end: 0 }
    },
    "xo-goo-4": {
      stdDeviation: { start: 70, end: 0 },
      scale: { start: 200, end: 0 }
    },
    "xo-goo-5": {
      stdDeviation: { start: 40, end: 0 },
      scale: { start: 100, end: 0 }
    },
    "xo-goo-6": {
      stdDeviation: { start: 90, end: 0 },
      scale: { start: 300, end: 0 },
      baseFrequency: { start: 0.1, end: 0.01 }
    },
    "xo-goo-7": {
      stdDeviation: { start: 35, end: 0 },
      scale: { start: 250, end: 0 }
    }
  };
  function runSvgFilterAnimate(text, duration, _delay) {
    const filterId = text.getAttribute("xo-type");
    if (!(filterId == null ? void 0 : filterId.startsWith("goo-"))) {
      return;
    }
    const finalFilterId = `xo-${filterId}`;
    const feBlur = document.querySelector(`#${finalFilterId} feGaussianBlur`);
    const feTurbulence = document.querySelector(`#${finalFilterId} feTurbulence`);
    const feDisplacementMap = document.querySelector(`#${finalFilterId} feDisplacementMap`);
    text.style.filter = `url(#${finalFilterId})`;
    text.style.opacity = "0";
    const animated = createAnimate();
    animated({
      from: 0,
      to: 1,
      duration: duration + 1200,
      easing: easings.easeOutExpo,
      onUpdate: (value) => {
        const inputRange = [0, 1];
        const stdDeviationObj = attrMapping[finalFilterId].stdDeviation;
        const scaleOutputObj = attrMapping[finalFilterId].scale;
        const baseFrequencyObj = attrMapping[finalFilterId].baseFrequency;
        const stdDeviation = stdDeviationObj != null ? interpolate({
          value,
          inputRange,
          outputRange: [stdDeviationObj.start, stdDeviationObj.end]
        }) : null;
        const scale = scaleOutputObj != null ? interpolate({
          value,
          inputRange,
          outputRange: [scaleOutputObj.start, scaleOutputObj.end]
        }) : null;
        const baseFrequency = baseFrequencyObj != null ? interpolate({
          value,
          inputRange,
          outputRange: [baseFrequencyObj.start, baseFrequencyObj.end]
        }) : null;
        if (stdDeviation) {
          feBlur == null ? void 0 : feBlur.setAttribute("stdDeviation", stdDeviation.toString());
        }
        if (scale) {
          feDisplacementMap == null ? void 0 : feDisplacementMap.setAttribute("scale", scale.toString());
        }
        if (baseFrequency) {
          feTurbulence == null ? void 0 : feTurbulence.setAttribute("baseFrequency", baseFrequency.toString());
        }
        text.style.opacity = value.toString();
      }
    });
  }
  const observer = new IntersectionObserver((entries) => {
    const frameId = requestAnimationFrame(() => {
      let order = -1;
      entries.forEach(async (entry) => {
        const element = entry.target;
        const { xoCascade, xoDuration, xoConstant, xoItemUsed, xoOrder } = element.options;
        if (entry.isIntersecting) {
          attrBoolean.set(element, "xo-visible", true);
          bindingHelper(element, "xo-visible-binding", true);
          element.removeAttribute("aria-disabled");
          element.handleWidthIncrement();
          handleSVG(element, element.options);
          if (xoCascade) {
            order++;
            element.style.setProperty("--xo-order", `${order}`);
          } else if (xoOrder) {
            order = xoOrder;
          }
          const wrapEl = getWrapEl(element);
          if (!wrapEl) {
            runSvgFilterAnimate(element, xoDuration);
          }
          observer.unobserve(element);
          cancelAnimationFrame(frameId);
          await delay(xoDuration + Math.max(1, order + 1) * xoConstant + 200);
          if (xoItemUsed) {
            element.getItemEls().forEach((itemEl) => {
              itemEl.style.opacity = "1";
            });
          } else {
            element.style.animation = "none";
            element.style.opacity = "1";
          }
        }
      });
    });
  }, {
    rootMargin: "0px 0px -50px 0px"
  });
  const _Animate = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "timeId", -1);
      __publicField(this, "cssId", "");
      __publicField(this, "_options");
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "getItemEls", () => {
        return this.querySelectorAll(WebComponent.AnimateItem);
      });
      __publicField(this, "handleWidthIncrement", () => {
        const { xoType, xoDuration } = this.options;
        if (xoType === "width-increment") {
          const childEls = Array.from(this.children);
          each(childEls, (childEl) => {
            childEl.style.width = `var(--xo-width)`;
            childEl.style.maxWidth = "none";
          });
          this.style.width = `var(--xo-width)`;
          clearTimeout(this.timeId);
          this.timeId = window.setTimeout(() => {
            each(childEls, (childEl) => {
              childEl.style.removeProperty("width");
              childEl.style.removeProperty("max-width");
            });
            this.style.removeProperty("width");
            clearTimeout(this.timeId);
          }, xoDuration);
        }
      });
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoDuration", "xoConstant", "xoOrder", "xoType", "xoEasing", "xoStrength", "xoCascade", "xoDisabled", "xoItemUsed", "xoScrollForced"],
          types: {
            xoDuration: "number",
            xoConstant: "number",
            xoOrder: "number",
            xoType: "string",
            xoEasing: "string",
            xoStrength: "number",
            xoCascade: "boolean",
            xoDisabled: "boolean",
            xoItemUsed: "boolean",
            xoScrollForced: "boolean"
          }
        });
      });
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-duration", "xo-type", "xo-easing", "xo-strength", "xo-cascade", "xo-order", "xo-constant", "xo-disabled", "xo-visible"];
    }
    get options() {
      return {
        ..._Animate.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    async connectedCallback() {
      var _a2, _b2, _c2;
      this.setOptions();
      const { xoConstant, xoOrder, xoDuration, xoEasing, xoStrength, xoType, xoCascade, xoDisabled, xoItemUsed, xoScrollForced } = this.options;
      if (xoDisabled || isReduced) {
        attrBoolean.set(this, "xo-visible", false);
        bindingHelper(this, "xo-visible-binding", false);
        this.style.removeProperty("animation");
        this.style.removeProperty("--xo-order");
        this.style.removeProperty("--xo-strength");
        this.style.removeProperty("--xo-constant");
        this.style.removeProperty("--xo-duration");
        this.style.removeProperty("--xo-easing");
        return;
      }
      const wrapEl = xoScrollForced ? null : getWrapEl(this);
      if (!attrBoolean.get(this, "xo-visible") && !wrapEl) {
        if (xoItemUsed) {
          this.getItemEls().forEach((itemEl) => {
            itemEl.style.opacity = "0";
            itemEl.setAttribute("aria-disabled", "true");
            itemEl.setAttribute("xo-type", `${xoType}`);
          });
        } else {
          this.style.opacity = "0";
          this.setAttribute("aria-disabled", "true");
        }
      }
      this.setAttribute("xo-type", `${xoType}`);
      this.style.setProperty("--xo-order", `${xoOrder}`);
      this.style.setProperty("--xo-strength", `${xoStrength}`);
      this.style.setProperty("--xo-constant", `${xoConstant}`);
      this.style.setProperty("--xo-duration", `${xoDuration}`);
      this.style.setProperty("--xo-easing", (_a2 = cssEasing[xoEasing]) != null ? _a2 : xoEasing);
      if (xoType === "width-increment" && this.offsetWidth > 0) {
        this.style.setProperty("--xo-width", `${this.offsetWidth}px`);
        this.style.width = "0px";
      }
      await delay(0);
      if (wrapEl) {
        this.style.transition = `all ${xoDuration}ms ${(_b2 = cssEasing[xoEasing]) != null ? _b2 : xoEasing} calc(((var(--xo-order) * var(--xo-constant)) + var(--xo-wrap-duration, 0)) * 1ms)`;
        if (xoCascade) {
          const duration = (_c2 = wrapEl.getAttribute("xo-duration")) != null ? _c2 : "300";
          const animateEls = Array.from(wrapEl.querySelectorAll(`${WebComponent.Animate}, [is^="${WebComponent.Animate}"]`));
          each(animateEls, (animateEl, index) => {
            if (this === animateEl) {
              this.style.setProperty("--xo-order", `${index}`);
              this.style.setProperty("--xo-wrap-duration", `${Number(duration) / 3}`);
            }
          });
        }
      } else {
        observer.observe(this);
      }
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-visible") {
        this.getItemEls().forEach((itemEl) => {
          attrBoolean.set(itemEl, "xo-visible", newValue != null && newValue !== "false");
          bindingHelper(this, "xo-visible-binding", newValue != null && newValue !== "false");
        });
      }
      if ((name === "xo-observed" || name === "xo-type" || name === "xo-duration" || name === "xo-easing" || name === "xo-cascade" || name === "xo-strength" || name === "xo-order" || name === "xo-disabled" || name === "xo-constant") && oldValue !== newValue) {
        const wrapEl = getWrapEl(this);
        if (!wrapEl) {
          attrBoolean.set(this, "xo-visible", false);
          bindingHelper(this, "xo-visible-binding", false);
          this.style.removeProperty("animation");
          observer.unobserve(this);
          observer.observe(this);
        }
        this.connectedCallback();
      }
    }
    disconnectedCallback() {
      clearTimeout(this.timeId);
      observer.unobserve(this);
      this.cancel();
    }
  };
  let Animate = _Animate;
  __publicField(Animate, "defaultOptions", {
    xoDuration: (_I = (_H = window.settings) == null ? void 0 : _H.animate_duration) != null ? _I : 500,
    xoType: (_K = (_J = window.settings) == null ? void 0 : _J.animate_effect) != null ? _K : "fade-up",
    xoConstant: 75,
    xoOrder: 0,
    xoStrength: (_M = (_L = window.settings) == null ? void 0 : _L.animate_strength) != null ? _M : 1,
    xoEasing: "easeLight",
    xoCascade: false,
    xoDisabled: false,
    xoItemUsed: false,
    xoScrollForced: false
  });
  const _AnimateScroll = class {
    constructor() {
      __publicField(this, "observer");
      __publicField(this, "mutation");
      __publicField(this, "updateMutation");
      __publicField(this, "timeIds", /* @__PURE__ */ new WeakMap());
      __publicField(this, "handleWidthIncrement", async (el) => {
        await delay(10);
        const { xoType, xoDuration } = this.getOptions(el);
        if (xoType === "width-increment") {
          const childEls = Array.from(el.children);
          each(childEls, (childEl) => {
            childEl.style.width = `var(--xo-width)`;
            childEl.style.maxWidth = "none";
          });
          el.style.width = `var(--xo-width)`;
          clearTimeout(this.timeIds.get(el));
          this.timeIds.delete(el);
          const timeId = window.setTimeout(() => {
            each(childEls, (childEl) => {
              childEl.style.removeProperty("width");
              childEl.style.removeProperty("max-width");
            });
            el.style.removeProperty("width");
            clearTimeout(this.timeIds.get(el));
            this.timeIds.delete(el);
          }, xoDuration);
          this.timeIds.set(el, timeId);
        }
      });
      __publicField(this, "handleIntersection", (entries, observer2) => {
        let count2 = -1;
        entries.forEach((entry, index) => {
          var _a2, _b2, _c2;
          const el = entry.target;
          const { xoAnimate, xoType, xoCascade, xoOrder, xoStrength, xoDuration, xoConstant, xoEasing } = this.getOptions(el);
          el.setAttribute("xo-type", `${xoType}`);
          el.style.setProperty("--xo-strength", `${xoStrength}`);
          el.style.setProperty("--xo-constant", `${xoConstant}`);
          el.style.setProperty("--xo-duration", `${xoDuration}`);
          el.style.setProperty("--xo-easing", (_a2 = cssEasing[xoEasing]) != null ? _a2 : xoEasing);
          if (xoType === "width-increment" && el.offsetWidth > 0) {
            el.style.setProperty("--xo-width", `${el.offsetWidth}px`);
            el.style.width = "0px";
          }
          if (entry.isIntersecting) {
            if (xoAnimate === "scroll") {
              count2++;
              let order = -1;
              if ((_b2 = window.xbEditor) == null ? void 0 : _b2.designMode) {
                order = xoCascade ? count2 : xoOrder;
              } else {
                order = xoCascade ? index : xoOrder;
              }
              el.style.setProperty("--xo-order", `${order}`);
              attrBoolean.set(el, "xo-visible", true);
              attrBoolean.set(el, "xo-opacity", false);
              el.removeAttribute("aria-disabled");
              if (el.querySelector("svg")) {
                handleSVG(el, this.getOptions(el));
              }
              if ((_c2 = el.getAttribute("xo-type")) == null ? void 0 : _c2.startsWith("goo-")) {
                runSvgFilterAnimate(el, xoDuration);
              }
              this.handleWidthIncrement(el);
              observer2.unobserve(el);
            }
          } else {
            attrBoolean.set(el, "xo-visible", false);
          }
        });
      });
      __publicField(this, "handleMutation", (mutations) => {
        mutations.forEach(async (mutation) => {
          var _a2;
          const el = mutation.target;
          if (mutation.attributeName === "xo-observed" || mutation.attributeName === "xo-animate" || mutation.attributeName === "xo-type" || mutation.attributeName === "xo-duration") {
            const { xoAnimate, xoDuration } = this.getOptions(el);
            if (xoAnimate === "scroll") {
              attrBoolean.set(el, "xo-visible", true);
              if (el.querySelector("svg")) {
                revertSVG(el);
                handleSVG(el, this.getOptions(el));
              }
              if ((_a2 = el.getAttribute("xo-type")) == null ? void 0 : _a2.startsWith("xo-goo-")) {
                runSvgFilterAnimate(el, xoDuration);
              }
              this.handleWidthIncrement(el);
            } else if (xoAnimate === "svg-infinite") {
              this.handleSingleSVG(el);
            } else {
              attrBoolean.set(el, "xo-visible", false);
            }
          }
        });
      });
      __publicField(this, "getEls", () => {
        var _a2;
        return document.querySelectorAll(((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) ? '[xo-animate="none"], [xo-animate="scroll"], [xo-animate="infinite"], [xo-animate="svg-infinite"]' : '[xo-animate="scroll"]');
      });
      __publicField(this, "handleSingleSVG", async (el) => {
        var _a2;
        const { xoDuration, xoEasing } = this.getOptions(el);
        if (el.querySelector("svg")) {
          revertSVG(el);
          el.style.setProperty("--xo-duration", `${xoDuration}`);
          el.style.setProperty("--xo-easing", (_a2 = cssEasing[xoEasing]) != null ? _a2 : xoEasing);
          el.classList.add("xo-animate-svg-none");
          handleInfiniteSVG(el);
          await delay(50);
          el.classList.remove("xo-animate-svg-none");
        }
      });
      __publicField(this, "svgInfinite", () => {
        const els = document.querySelectorAll('[xo-animate="svg-infinite"]');
        els.forEach(this.handleSingleSVG);
      });
      __publicField(this, "handleAllSvg", () => {
        const els = document.querySelectorAll('[xo-animate="scroll"], [xo-animate="svg-infinite"]');
        els.forEach((el) => {
          if (el.querySelector("svg")) {
            addPrevAttrForSvg(el);
          }
        });
      });
      __publicField(this, "initIntersection", () => {
        const els = this.getEls();
        els.forEach((el) => {
          this.observer.observe(el);
        });
      });
      __publicField(this, "first", () => {
        const els = this.getEls();
        els.forEach((el) => {
          const { xoAnimate } = this.getOptions(el);
          if (!attrBoolean.get(el, "xo-visible") && xoAnimate === "scroll") {
            attrBoolean.set(el, "xo-opacity", true);
            el.setAttribute("aria-disabled", "true");
          }
        });
      });
      __publicField(this, "initMutation", () => {
        const els = this.getEls();
        els.forEach((el) => {
          this.mutation.observe(el, {
            attributes: true,
            attributeFilter: ["xo-observed", "xo-animate", "xo-type", "xo-duration"]
          });
        });
      });
      __publicField(this, "update", async () => {
        await delay();
        this.init();
      });
      this.observer = new IntersectionObserver(this.handleIntersection, {
        rootMargin: "0px 0px -50px 0px"
      });
      this.mutation = new MutationObserver(this.handleMutation);
      this.updateMutation = new MutationObserver(this.update);
      this.updateMutation.observe(document.body, { attributes: true, attributeFilter: ["xo-animate-observed"] });
    }
    getOptions(el) {
      const options = getAttrs(el, {
        pick: ["xoAnimate", "xoDuration", "xoConstant", "xoOrder", "xoType", "xoEasing", "xoStrength", "xoCascade", "xoDisabled", "xoInfinite"],
        types: {
          xoAnimate: "string",
          xoDuration: "number",
          xoConstant: "number",
          xoOrder: "number",
          xoType: "string",
          xoEasing: "string",
          xoStrength: "number",
          xoCascade: "boolean",
          xoDisabled: "boolean",
          xoInfinite: "boolean"
        }
      });
      return {
        ..._AnimateScroll.defaultOptions,
        ...options
      };
    }
    init() {
      var _a2;
      this.observer.disconnect();
      this.mutation.disconnect();
      this.first();
      this.handleAllSvg();
      this.svgInfinite();
      this.initIntersection();
      if ((_a2 = window == null ? void 0 : window.xbEditor) == null ? void 0 : _a2.designMode) {
        this.initMutation();
      }
    }
  };
  let AnimateScroll = _AnimateScroll;
  __publicField(AnimateScroll, "defaultOptions", {
    xoAnimate: "none",
    xoDuration: (_O = (_N = window.settings) == null ? void 0 : _N.animate_duration) != null ? _O : 500,
    xoType: (_Q = (_P = window.settings) == null ? void 0 : _P.animate_effect) != null ? _Q : "fade-up",
    xoConstant: 75,
    xoOrder: 0,
    xoStrength: (_S = (_R = window.settings) == null ? void 0 : _R.animate_strength) != null ? _S : 1,
    xoEasing: "easeLight",
    xoCascade: false,
    xoDisabled: false,
    xoInfinite: false
  });
  const animate = new AnimateScroll();
  let elementAdded = false;
  if ((_T = window == null ? void 0 : window.xbEditor) == null ? void 0 : _T.designMode) {
    animate.init();
    DOMLoaded(async () => {
      if (!elementAdded) {
        await delay(500);
        animate.init();
      }
    });
    document.addEventListener("xb:element:load", () => {
      elementAdded = true;
      animate.init();
    });
  } else {
    DOMLoaded(() => {
      animate.init();
    });
    if ((_U = window.Shopify) == null ? void 0 : _U.designMode) {
      document.addEventListener("shopify:section:load", () => animate.init());
      document.addEventListener("shopify:section:reorder", () => animate.init());
    }
  }
  const styles$g = "";
  renderSvgFilters();
  componentDefine({
    [WebComponent.Animate]: Animate
  });
  function getTouchDistance(touch1, touch2) {
    if (!touch2) {
      return Math.hypot(touch1.clientX, touch1.clientY);
    }
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.hypot(dx, dy);
  }
  const styles$f = "";
  const _ImageZoom = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "imageZoomItemEl", null);
      __publicField(this, "innerEl", null);
      __publicField(this, "thumbEl", null);
      __publicField(this, "zoomState", 4);
      __publicField(this, "zooming", false);
      __publicField(this, "touchOffsetX", 0);
      __publicField(this, "touchOffsetY", 0);
      __publicField(this, "clientX", 0);
      __publicField(this, "clientY", 0);
      __publicField(this, "pan", null);
      __publicField(this, "scale", 1);
      __publicField(this, "initialDistance", 0);
      __publicField(this, "mutationObserver", null);
      __publicField(this, "imageLoaded", false);
      __publicField(this, "hovered", false);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        this.options = getAttrs(this, {
          pick: ["xoName", "xoZoom", "xoZoomSrc", "xoPlacement", "xoZoomFull", "xoUseWheel"],
          types: {
            xoName: "string",
            xoZoom: "number",
            xoZoomSrc: "string",
            xoPlacement: "string",
            xoZoomFull: "boolean",
            xoUseWheel: "boolean"
          }
        });
      });
      __publicField(this, "handleThumb", (x, y) => {
        const thumbEl = this.thumbEl;
        const { offsetWidth, offsetHeight } = this;
        const thumbWidth = offsetWidth / this.zoomState;
        const thumbHeight = offsetHeight / this.zoomState;
        const thumbTop = clamp(y - thumbEl.offsetHeight / 2, 0, offsetHeight - thumbEl.offsetHeight);
        const thumbLeft = clamp(x - thumbEl.offsetWidth / 2, 0, offsetWidth - thumbEl.offsetWidth);
        thumbEl.style.width = `${thumbWidth}px`;
        thumbEl.style.height = `${thumbHeight}px`;
        thumbEl.style.top = `${thumbTop}px`;
        thumbEl.style.left = `${thumbLeft}px`;
      });
      __publicField(this, "handleZoomImage", (translateX, translateY) => {
        const { xoZoomSrc, xoZoomFull } = this.options;
        const imageZoomItemEl = this.imageZoomItemEl;
        if (xoZoomFull) {
          attrBoolean.set(this, "xo-active", this.zoomState > 1);
        } else {
          attrBoolean.set(this, "xo-active", true);
        }
        const imgEl = this.querySelector("img");
        imageZoomItemEl.setAttribute("xo-zoom", `${this.zoomState}`);
        if (imgEl) {
          if (this.imageLoaded) {
            imageZoomItemEl.style.backgroundImage = `url('${xoZoomSrc}')`;
          } else {
            imageZoomItemEl.style.backgroundImage = `url('${imgEl.src}')`;
          }
        }
        imageZoomItemEl.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${this.zoomState})`;
        if (!this.imageLoaded) {
          const image = new Image();
          image.src = xoZoomSrc;
          image.onload = () => {
            imageZoomItemEl.style.backgroundImage = `url('${xoZoomSrc}')`;
            this.imageLoaded = true;
          };
        }
      });
      __publicField(this, "resetTransform", () => {
        const imageZoomItemEl = this.imageZoomItemEl;
        imageZoomItemEl.style.transform = `translate3d(0, 0, 0) scale(1)`;
        imageZoomItemEl.removeAttribute("xo-zoom");
      });
      __publicField(this, "handler", (event) => {
        var _a2;
        const { xoPlacement, xoUseWheel } = this.options;
        let offsetX = 0;
        let offsetY = 0;
        if (event.type === "touchmove") {
          offsetX = this.touchOffsetX;
          offsetY = this.touchOffsetY;
        } else {
          offsetX = event.offsetX;
          offsetY = event.offsetY;
        }
        const { offsetWidth, offsetHeight } = this;
        const isCenter = xoPlacement === "center";
        const thumbWidth = offsetWidth / this.zoomState;
        const thumbHeight = offsetHeight / this.zoomState;
        const halfWidth = isCenter ? 0 : thumbWidth / 2;
        const halfHeight = isCenter ? 0 : thumbHeight / 2;
        const translateX = interpolate({
          value: offsetX,
          inputRange: [halfWidth, offsetWidth - halfWidth],
          outputRange: [0, -(offsetWidth * (this.zoomState - 1))]
        });
        const translateY = interpolate({
          value: offsetY,
          inputRange: [halfHeight, offsetHeight - halfHeight],
          outputRange: [0, -(offsetHeight * (this.zoomState - 1))]
        });
        (_a2 = this.pan) == null ? void 0 : _a2.setValue({ dx: translateX, dy: translateY });
        this.handleZoomImage(translateX, translateY);
        this.handleThumb(offsetX, offsetY);
        if (!isMobile.any && xoUseWheel && !this.hovered) {
          this.addEventListener("wheel", this.handleWheel);
        }
        this.hovered = true;
      });
      __publicField(this, "handleMouseLeave", () => {
        const { xoZoom, xoZoomFull } = this.options;
        if (!xoZoomFull) {
          attrBoolean.set(this, "xo-active", false);
          this.zoomState = xoZoom;
        }
        this.removeEventListener("wheel", this.handleWheel);
        this.hovered = false;
      });
      __publicField(this, "handleWheel", (event) => {
        event.preventDefault();
        const { deltaY } = event;
        this.zoomState = clamp(this.zoomState + deltaY / 60, 1, 10);
        this.handler(event);
      });
      __publicField(this, "handleWindowClick", (event) => {
        if (!this.contains(event.target)) {
          attrBoolean.set(this, "xo-active", false);
          this.resetTransform();
          this.zoomState = this.options.xoZoom;
        }
      });
      __publicField(this, "handleTouchMove", (event) => {
        if (event.targetTouches[0] && event.targetTouches[1]) {
          event.preventDefault();
          const currentDistance = getTouchDistance(event.targetTouches[0], event.targetTouches[1]);
          const zoomFactor = currentDistance / this.initialDistance;
          this.zoomState = this.scale * zoomFactor;
          if (this.zoomState > 1) {
            this.zooming = true;
          } else {
            this.zooming = false;
          }
          this.handler(event);
        }
      });
      __publicField(this, "handleTouchEnd", (event) => {
        if (event.touches.length === 0) {
          const transform = window.getComputedStyle(this.imageZoomItemEl).transform;
          if (transform !== "none") {
            const matrix = new WebKitCSSMatrix(transform);
            this.scale = matrix.a;
          }
          document.removeEventListener("touchmove", this.handleTouchMove);
          document.removeEventListener("touchend", this.handleTouchEnd);
        }
      });
      __publicField(this, "handleTouchStart", (event) => {
        if (event.targetTouches[0] && event.targetTouches[1]) {
          this.initialDistance = getTouchDistance(event.targetTouches[0], event.targetTouches[1]);
          const rect = event.target.getBoundingClientRect();
          const clientX1 = event.targetTouches[0].clientX;
          const clientY1 = event.targetTouches[0].clientY;
          const clientX2 = event.targetTouches[1].clientX;
          const clientY2 = event.targetTouches[1].clientY;
          this.clientX = (clientX1 + clientX2) / 2;
          this.clientY = (clientY1 + clientY2) / 2;
          this.touchOffsetX = (this.clientX - rect.left) / this.scale;
          this.touchOffsetY = (this.clientY - rect.top) / this.scale;
          document.addEventListener("touchmove", this.handleTouchMove, { passive: false });
          document.addEventListener("touchend", this.handleTouchEnd);
        }
      });
      __publicField(this, "handleMutation", () => {
        const galleryPortalEl = this.closest(WebComponent.GalleryPortal);
        if (!attrBoolean.get(galleryPortalEl, "xo-active")) {
          this.scale = 1;
          this.initialDistance = 0;
        }
      });
    }
    get options() {
      return {
        ..._ImageZoom.defaultOptions,
        ...this._options
      };
    }
    set options(value) {
      this._options = value;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    createChild() {
      const { xoPlacement, xoName } = this.options;
      this.thumbEl = document.createElement(WebComponent.ImageZoomThumb);
      this.imageZoomItemEl = document.createElement(WebComponent.ImageZoomItem);
      if (xoPlacement === "manual") {
        this.innerEl = document.querySelector(`${WebComponent.ImageZoomManual}[xo-name="${xoName}"]`);
      } else {
        this.innerEl = document.createElement(WebComponent.ImageZoomInner);
      }
      this.innerEl.appendChild(this.imageZoomItemEl);
      this.appendChild(this.innerEl);
      if (xoPlacement !== "center") {
        this.appendChild(this.thumbEl);
      }
    }
    connectedCallback() {
      this.setOptions();
      const { xoPlacement, xoZoom, xoZoomFull } = this.options;
      this.zoomState = xoZoom;
      this.setAttribute("xo-placement", xoPlacement);
      this.createChild();
      if (isMobile.any) {
        if (xoZoomFull) {
          this.addEventListener("touchstart", this.handleTouchStart);
          this.pan = panGesture({
            element: this,
            onStart: (event) => {
              if (this.zooming) {
                event.preventDefault();
              }
            },
            onMove: (gestureState) => {
              if (this.zooming) {
                this.handleZoomImage(gestureState.dx, gestureState.dy);
              }
            }
          });
        }
      } else {
        this.addEventListener("mousemove", this.handler);
        this.addEventListener("mouseleave", this.handleMouseLeave);
      }
      window.addEventListener("click", this.handleWindowClick);
      const galleryPortalEl = this.closest(WebComponent.GalleryPortal);
      if (galleryPortalEl) {
        this.mutationObserver = new MutationObserver(this.handleMutation);
        this.mutationObserver.observe(galleryPortalEl, { attributes: true, attributeFilter: ["xo-active"] });
      }
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        this.setOptions();
        this.zoomState = this.options.xoZoom;
      }
    }
    disconnectedCallback() {
      var _a2;
      this.removeEventListener("mousemove", this.handler);
      this.removeEventListener("mouseleave", this.handleMouseLeave);
      this.removeEventListener("wheel", this.handleWheel);
      window.removeEventListener("click", this.handleWindowClick);
      this.removeEventListener("touchstart", this.handleTouchStart);
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
      (_a2 = this.pan) == null ? void 0 : _a2.destroy();
    }
  };
  let ImageZoom = _ImageZoom;
  __publicField(ImageZoom, "defaultOptions", {
    xoName: "",
    xoZoom: 4,
    xoZoomSrc: "",
    xoPlacement: "center",
    xoZoomFull: false,
    xoUseWheel: true
  });
  componentDefine({
    [WebComponent.ImageZoom]: ImageZoom
  });
  const styles$e = "";
  class Countdown extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "daysEl", null);
      __publicField(this, "hoursEl", null);
      __publicField(this, "minutesEl", null);
      __publicField(this, "secondsEl", null);
      __publicField(this, "setDefaultText", () => {
        if (this.daysEl) {
          this.daysEl.innerText = this.setZeroPad("0");
        }
        if (this.hoursEl) {
          this.hoursEl.innerText = this.setZeroPad("0");
        }
        if (this.minutesEl) {
          this.minutesEl.innerText = this.setZeroPad("0");
        }
        if (this.secondsEl) {
          this.secondsEl.innerText = this.setZeroPad("0");
        }
      });
      __publicField(this, "handleCountdown", () => {
        const timestamp = this.getAttribute("xo-timestamp");
        if (!timestamp) {
          throw new Error(`${WebComponent.Countdown}: Attribute xo-timestamp is required.`);
        }
        const deadline = Number(timestamp);
        const distance2 = deadline - Date.now();
        if (!this.daysEl) {
          this.daysEl = this.querySelector(WebComponent.CountdownDay);
        }
        if (!this.hoursEl) {
          this.hoursEl = this.querySelector(WebComponent.CountdownHour);
        }
        if (!this.minutesEl) {
          this.minutesEl = this.querySelector(WebComponent.CountdownMinute);
        }
        if (!this.secondsEl) {
          this.secondsEl = this.querySelector(WebComponent.CountdownSecond);
        }
        if (distance2 > 0) {
          const days = this.getDays(distance2);
          const hours = this.getHours(distance2);
          const minutes = this.getMinutes(distance2);
          const seconds = this.getSeconds(distance2);
          if (this.daysEl && Number(this.daysEl.innerText) !== days) {
            if (days < 1) {
              this.daysEl.innerText = this.setZeroPad("0");
            } else {
              this.daysEl.innerText = this.setZeroPad(`${days}`);
            }
          }
          if (this.hoursEl && Number(this.hoursEl.innerText) !== hours) {
            this.hoursEl.innerText = this.setZeroPad(`${hours}`);
          }
          if (this.minutesEl && Number(this.minutesEl.innerText) !== minutes) {
            this.minutesEl.innerText = this.setZeroPad(`${minutes}`);
          }
          if (this.secondsEl && Number(this.secondsEl.innerText) !== seconds) {
            this.secondsEl.innerText = this.setZeroPad(`${seconds}`);
          }
          attrBoolean.set(this, "xo-expired", false);
        } else {
          frameManager$1.remove(this.handleCountdown);
          attrBoolean.set(this, "xo-expired", true);
          this.setDefaultText();
        }
      });
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getDays(distance2) {
      return Math.floor(distance2 / (1e3 * 60 * 60 * 24));
    }
    getHours(distance2) {
      return Math.floor(distance2 % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
    }
    getMinutes(distance2) {
      return Math.floor(distance2 % (1e3 * 60 * 60) / (1e3 * 60));
    }
    getSeconds(distance2) {
      return Math.floor(distance2 % (1e3 * 60) / 1e3);
    }
    setZeroPad(value) {
      const zeroPad = Number(this.getAttribute("xo-zero-pad")) || 1;
      return value.padStart(zeroPad, "0");
    }
    connectedCallback() {
      frameManager$1.add(this.handleCountdown, true);
      this.daysEl = this.querySelector(WebComponent.CountdownDay);
      this.hoursEl = this.querySelector(WebComponent.CountdownHour);
      this.minutesEl = this.querySelector(WebComponent.CountdownMinute);
      this.secondsEl = this.querySelector(WebComponent.CountdownSecond);
      this.setDefaultText();
    }
    disconnectedCallback() {
      frameManager$1.remove(this.handleCountdown);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if (name === "xo-observed" && oldValue !== newValue) {
        await delay(100);
        this.disconnectedCallback();
        this.connectedCallback();
      }
    }
  }
  componentDefine({
    [WebComponent.Countdown]: Countdown
  });
  let Countto = (_V = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "observer", null);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "attrAnimated", createAnimate());
      __publicField(this, "timeId", -1);
      __publicField(this, "handleCountto", async () => {
        const { xoFrom, xoTo, xoDuration, xoDelay, xoEasing } = this.props;
        const numberEl = this.querySelector(WebComponent.CounttoNumber);
        this.timeId = window.setTimeout(() => {
          this.animated({
            from: xoFrom,
            to: xoTo,
            duration: xoDuration,
            onUpdate: (value) => {
              var _a2;
              const fractionDigits = ((_a2 = xoTo.toString().split(".")[1]) == null ? void 0 : _a2.length) || 0;
              const num = value.toFixed(fractionDigits);
              if (numberEl) {
                numberEl.textContent = `${num}`;
              } else {
                this.textContent = `${num}`;
              }
            }
          });
          this.attrAnimated({
            from: xoFrom,
            to: xoTo,
            duration: xoDuration,
            easing: easings[xoEasing],
            onUpdate: (value) => {
              this.style.setProperty("--xo-value", `${value}`);
            }
          });
        }, xoDelay);
      });
    }
    mount() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          var _a2;
          if (entry.isIntersecting) {
            this.handleCountto();
            (_a2 = this.observer) == null ? void 0 : _a2.unobserve(this);
          }
        });
      }, {
        rootMargin: "0px 0px -50px 0px"
      });
      this.observer.observe(this);
    }
    propUpdate({ name, prevProp, nextProp }) {
      if (name === "xoObserved" && prevProp != null && prevProp !== nextProp) {
        clearTimeout(this.timeId);
        this.animated.off();
        this.attrAnimated.off();
        this.handleCountto();
      }
    }
    unmount() {
      var _a2;
      (_a2 = this.observer) == null ? void 0 : _a2.unobserve(this);
      this.animated.off();
      this.attrAnimated.off();
    }
  }, __publicField(_V, "propTypes", {
    xoFrom: "number",
    xoTo: "number",
    xoDuration: "number",
    xoDelay: "number",
    xoEasing: "string"
  }), __publicField(_V, "defaultProps", {
    xoFrom: 0,
    xoTo: 100,
    xoDuration: 2e3,
    xoDelay: 0,
    xoEasing: "ease"
  }), __publicField(_V, "observedProps", ["xoObserved"]), _V);
  Countto = __decorate([
    customElements$1(WebComponent.Countto)
  ], Countto);
  function changeUrlVimeo(url, autoplay = true) {
    const id2 = url.replace(/(^.*(video|vimeo\.com)\/)(\w*)(.*$)/g, "$3");
    return `https://player.vimeo.com/video/${id2}?${autoplay ? "autoplay=1&" : ""}loop=1&background=1&muted=1`;
  }
  function changeUrlYoutube(url, autoplay = true) {
    const id2 = url.replace(/(^.*(embed\/|(\?|&)v=))(\w*)(.*$)/g, "$4");
    return `https://www.youtube.com/embed/${id2}?${autoplay ? "autoplay=1&" : ""}loop=1&mute=1&controls=0&iv_load_policy=1&disablekb=1&playlist=${id2}&modestbranding=1&playsinline=1`;
  }
  function changeUrl(url, autoplay) {
    if (isVimeo(url)) {
      return changeUrlVimeo(url, autoplay);
    }
    if (isYoutube(url)) {
      return changeUrlYoutube(url, autoplay);
    }
    return url;
  }
  async function getYoutubeAspectRatio(url) {
    const res = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
    const data = await res.json();
    return data.width / data.height;
  }
  class VideoCover extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "_options");
      __publicField(this, "videoRatio", 16 / 9);
      __publicField(this, "itemEl", null);
      __publicField(this, "videoEl", null);
      __publicField(this, "getAutoplay", () => {
        const { xoAutoplay = true } = this.options;
        return xoAutoplay ? "autoplay" : "";
      });
      __publicField(this, "renderVimeo", (url) => {
        return `<${WebComponent.VideoCoverItem}>
      <iframe
        src="${url}"
        title="Vimeo video"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowsInlineMediaPlayback; ${this.getAutoplay()}"
        allowfullscreen
      ></iframe>
    </${WebComponent.VideoCoverItem}>`;
      });
      __publicField(this, "renderYoutube", (url) => {
        return `<${WebComponent.VideoCoverItem}>
      <iframe
        src="${url}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowsInlineMediaPlayback; ${this.getAutoplay()}"
        allowfullscreen
        allowsInlineMediaPlayback
      ></iframe>
    </${WebComponent.VideoCoverItem}>`;
      });
      __publicField(this, "renderVideo", (url) => {
        return `<${WebComponent.VideoCoverItem}>
      <video
        src="${url}"
        title="Video"
        ${this.getAutoplay()}
        muted
        loop
        playsinline
        preload="metadata"
      ></video>
    </${WebComponent.VideoCoverItem}>`;
      });
      __publicField(this, "setVideoSize", () => {
        if (!!this.itemEl) {
          const containerRatio = this.offsetWidth / this.offsetHeight;
          if (this.videoRatio > containerRatio) {
            this.itemEl.style.height = `${this.offsetHeight}px`;
            this.itemEl.style.width = `${this.offsetHeight * this.videoRatio}px`;
          } else {
            this.itemEl.style.width = `${this.offsetWidth + 1}px`;
            this.itemEl.style.height = `${this.offsetWidth / this.videoRatio}px`;
          }
        }
      });
      __publicField(this, "handleVideoRatio", () => {
        if (!!this.videoEl) {
          this.videoRatio = this.videoEl.videoWidth / this.videoEl.videoHeight;
          this.setVideoSize();
        }
      });
      __publicField(this, "handleYoutubeRatio", async () => {
        try {
          this.videoRatio = await getYoutubeAspectRatio(this.options.xoSrc);
          this.setVideoSize();
        } catch {
          console.log("error");
        }
      });
      __publicField(this, "handleVideo", () => {
        if (this.videoEl instanceof HTMLVideoElement) {
          if (this.videoEl.readyState >= 2) {
            this.handleVideoRatio();
          } else {
            this.videoEl.addEventListener("loadedmetadata", this.handleVideoRatio);
          }
        }
      });
      __publicField(this, "assignEl", () => {
        var _a2;
        this.itemEl = this.querySelector(WebComponent.VideoCoverItem);
        this.videoEl = (_a2 = this.itemEl) == null ? void 0 : _a2.querySelector("iframe, video");
      });
      __publicField(this, "init", () => {
        this.setOptions();
        const { xoSrc, xoAutoplay = true } = this.options;
        const videoUrl = changeUrl(xoSrc, xoAutoplay);
        if (isVimeo(xoSrc)) {
          this.insertAdjacentHTML("beforeend", this.renderVimeo(videoUrl));
          this.assignEl();
          this.setVideoSize();
        } else if (isYoutube(xoSrc)) {
          this.insertAdjacentHTML("beforeend", this.renderYoutube(videoUrl));
          this.assignEl();
          this.handleYoutubeRatio();
        } else {
          this.insertAdjacentHTML("beforeend", this.renderVideo(videoUrl));
          this.assignEl();
          this.handleVideo();
        }
      });
      __publicField(this, "destroy", () => {
        if (this.videoEl instanceof HTMLVideoElement) {
          this.videoEl.removeEventListener("loadedmetadata", this.handleVideo);
        }
      });
      __publicField(this, "handleResize", debounce(resizeAxis("x", () => {
        this.destroy();
        this.init();
      }), 400));
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-src", "xo-breakpoints", "xo-autoplay"];
    }
    get options() {
      return this._options;
    }
    set options(value) {
      this._options = value;
    }
    setOptions() {
      var _a2;
      const options = getAttrs(this, {
        pick: ["xoSrc", "xoBreakpoints", "xoAutoplay"],
        types: {
          xoSrc: "string",
          xoBreakpoints: "object",
          xoAutoplay: "boolean"
        }
      });
      const breakpointOptions = getBreakpointsOptions(options.xoBreakpoints);
      this.options = options;
      if (breakpointOptions) {
        this.options = {
          ...options,
          xoSrc: (_a2 = breakpointOptions == null ? void 0 : breakpointOptions.src) != null ? _a2 : options.xoSrc
        };
      }
    }
    connectedCallback() {
      this.init();
      this.dispatchEvent(new CustomEvent("xo-video-cover:init"));
      window.addEventListener("resize", this.handleResize);
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if ((name === "xo-observed" || name === "xo-src" || name === "xo-breakpoints") && oldValue != null && oldValue !== newValue) {
        await delay(0);
        this.destroy();
        this.init();
      }
    }
    disconnectedCallback() {
      window.removeEventListener("resize", this.handleResize);
      this.destroy();
    }
  }
  let VideoCoverButton = class VideoCoverButton2 extends XoComponent {
    constructor() {
      super();
      __publicField(this, "wcVideoEl", null);
      __publicField(this, "handleClick", () => {
        this.setState((prevState) => ({
          isPlaying: !prevState.isPlaying
        }));
      });
      __publicField(this, "handleVideoInit", () => {
        var _a2;
        const autoplayAttr = (_a2 = this.wcVideoEl) == null ? void 0 : _a2.getAttribute("xo-autoplay");
        this.setState({
          isPlaying: autoplayAttr ? autoplayAttr == "true" : true
        });
      });
      this.state = {
        isPlaying: void 0
      };
    }
    mount() {
      var _a2;
      this.wcVideoEl = this.closest(WebComponent.VideoCover);
      (_a2 = this.wcVideoEl) == null ? void 0 : _a2.addEventListener("xo-video-cover:init", this.handleVideoInit);
      this.addEventListener("click", this.handleClick);
    }
    unmount() {
      var _a2;
      (_a2 = this.wcVideoEl) == null ? void 0 : _a2.removeEventListener("xo-video-cover:init", this.handleVideoInit);
      this.removeEventListener("click", this.handleClick);
    }
    stateUpdate(prevState) {
      const { isPlaying } = this.state;
      if (prevState.isPlaying !== isPlaying) {
        const wcVideoEl = this.closest(WebComponent.VideoCover);
        const videoEl = wcVideoEl == null ? void 0 : wcVideoEl.querySelector("video");
        if (videoEl && wcVideoEl) {
          if (isPlaying) {
            videoEl.play();
            attrBoolean.set(wcVideoEl, "xo-playing", true);
            attrBoolean.set(wcVideoEl, "xo-paused", false);
          } else {
            videoEl.pause();
            attrBoolean.set(wcVideoEl, "xo-paused", true);
            attrBoolean.set(wcVideoEl, "xo-playing", false);
          }
        }
      }
    }
  };
  VideoCoverButton = __decorate([
    customElements$1(WebComponent.VideoCoverButton),
    __metadata("design:paramtypes", [])
  ], VideoCoverButton);
  const styles$d = "";
  componentDefine({
    [WebComponent.VideoCover]: VideoCover
  });
  function renderGoo() {
    const goo = `
    <svg class="xo-hidden">
    <defs>
      <filter id="xo-typing-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
        <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
                  0 1 0 0 0
                  1 0 1 0 0
                  0 0 0 18 -8" result="goo"></feColorMatrix>
        <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
    </filter>
    </defs>
  </svg>
  `;
    document.body.insertAdjacentHTML("beforeend", goo);
  }
  const DEFAULT_FPS$1 = 60;
  const DT_FPS$1 = 1e3 / DEFAULT_FPS$1;
  const _Goo = class {
    constructor(el, options) {
      __publicField(this, "el");
      __publicField(this, "options");
      __publicField(this, "line", 0);
      __publicField(this, "start", Date.now());
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "animated", createAnimate());
      __publicField(this, "typingContent", null);
      __publicField(this, "init", () => {
        const { xoDuration, xoDelay } = this.options;
        const content = `<${WebComponent.TypingInner} style="--xo-duration: ${xoDuration}; --xo-delay: ${xoDelay}"><${WebComponent.TypingContent}></${WebComponent.TypingContent}></${WebComponent.TypingInner}>`;
        this.el.innerHTML = content;
        this.typingContent = this.el.querySelector(WebComponent.TypingContent);
        this.el.style.filter = "url(#xo-typing-goo)";
      });
      __publicField(this, "handleGoo", (type) => {
        const { xoDuration } = this.options;
        const feBlur = document.querySelector(`#xo-typing-goo feGaussianBlur`);
        this.animated({
          from: type === "inc" ? 0 : 8,
          to: type === "inc" ? 8 : 0,
          duration: xoDuration,
          onUpdate(value) {
            feBlur == null ? void 0 : feBlur.setAttribute("stdDeviation", value.toString());
          }
        });
      });
      __publicField(this, "handleFrame", async () => {
        const { xoContent, xoDuration, xoDelay } = this.options;
        const ellapsed = Date.now() - this.start;
        if (ellapsed > xoDelay) {
          attrBoolean.set(this.el, "xo-goo", true);
          this.handleGoo("inc");
          this.start = Date.now();
          this.animated.off();
          this.handleGoo("dec");
          this.cancel = await delay(xoDuration - DT_FPS$1);
          attrBoolean.set(this.el, "xo-goo", false);
          this.line = (this.line + 1) % xoContent.length;
        }
        const text = xoContent[this.line];
        const nextLine = (this.line + 1) % xoContent.length;
        const nextText = xoContent[nextLine];
        const content = `<span>${text}</span><span>${nextText}</span>`;
        const spanEls = Array.from(this.el.querySelectorAll("span"));
        each(spanEls, (spanEl, index) => {
          const width = spanEl.offsetWidth;
          this.el.style.setProperty(`--xo-width-${index}`, `${width}px`);
        });
        if (this.typingContent && this.typingContent.innerHTML !== content) {
          this.typingContent.innerHTML = content;
        }
      });
      __publicField(this, "destroy", () => {
        frameManager$1.remove(this.handleFrame);
        this.cancel();
        this.animated.off();
      });
      this.el = el;
      this.options = options;
      this.el = el;
      this.options = {
        ..._Goo.defaultOptions,
        ...options
      };
      frameManager$1.add(this.handleFrame, true);
      this.init();
    }
  };
  let Goo = _Goo;
  __publicField(Goo, "defaultOptions", {
    xoContent: [],
    xoDuration: 1e3,
    xoDelay: 2e3,
    xoEffect: "typing"
  });
  const _Slide = class {
    constructor(el, options) {
      __publicField(this, "el");
      __publicField(this, "options");
      __publicField(this, "line", 0);
      __publicField(this, "start", Date.now());
      __publicField(this, "cancel", () => {
      });
      __publicField(this, "typingContent", null);
      __publicField(this, "init", () => {
        const { xoDuration, xoDelay } = this.options;
        const content = `<${WebComponent.TypingInner} style="--xo-duration: ${xoDuration}; --xo-delay: ${xoDelay}"><${WebComponent.TypingContent}></${WebComponent.TypingContent}></${WebComponent.TypingInner}>`;
        this.el.innerHTML = content;
        this.typingContent = this.el.querySelector(WebComponent.TypingContent);
      });
      __publicField(this, "handleFrame", async () => {
        const { xoContent, xoDuration, xoDelay } = this.options;
        const ellapsed = Date.now() - this.start;
        if (ellapsed > xoDelay) {
          attrBoolean.set(this.el, "xo-slide", true);
          this.start = Date.now();
          this.cancel = await delay(xoDuration - DT_FPS$1);
          attrBoolean.set(this.el, "xo-slide", false);
          this.line = (this.line + 1) % xoContent.length;
        }
        const text = xoContent[this.line];
        const nextLine = (this.line + 1) % xoContent.length;
        const nextText = xoContent[nextLine];
        const content = `<span>${text}</span><span>${nextText}</span>`;
        const spanEls = Array.from(this.el.querySelectorAll("span"));
        each(spanEls, (spanEl, index) => {
          const width = spanEl.offsetWidth;
          this.el.style.setProperty(`--xo-width-${index}`, `${width}px`);
        });
        if (this.typingContent && this.typingContent.innerHTML !== content) {
          this.typingContent.innerHTML = content;
        }
      });
      __publicField(this, "destroy", () => {
        frameManager$1.remove(this.handleFrame);
        this.cancel();
      });
      this.el = el;
      this.options = options;
      this.el = el;
      this.options = {
        ..._Slide.defaultOptions,
        ...options
      };
      frameManager$1.add(this.handleFrame, true);
      this.init();
    }
  };
  let Slide = _Slide;
  __publicField(Slide, "defaultOptions", {
    xoContent: [],
    xoDuration: 300,
    xoDelay: 2e3,
    xoEffect: "typing"
  });
  const _Typing = class {
    constructor(el, options) {
      __publicField(this, "el");
      __publicField(this, "options");
      __publicField(this, "type", "");
      __publicField(this, "line", -1);
      __publicField(this, "minIndex", -1);
      __publicField(this, "sameText", "");
      __publicField(this, "index", -1);
      __publicField(this, "start", Date.now());
      __publicField(this, "start2", Date.now());
      __publicField(this, "start3", Date.now());
      __publicField(this, "increasing", true);
      __publicField(this, "handleFrame", () => {
        const { xoContent, xoDuration, xoDelay, xoCursorChar } = this.options;
        if (this.index === this.minIndex) {
          this.line = (this.line + 1) % xoContent.length;
          this.increasing = true;
          this.sameText = "";
          this.minIndex = -1;
        }
        const deleteDuration = 30;
        const text = xoContent[this.line];
        const delay2 = xoDelay + (xoDuration + deleteDuration) * text.length;
        if (xoContent.length > 1) {
          const nextLine = (this.line + 1) % xoContent.length;
          const nextText = xoContent[nextLine];
          if (!this.increasing) {
            for (let i = 0; i < text.length; i++) {
              const char = text[i];
              if (new RegExp(`^${this.sameText}`, "g").test(nextText)) {
                this.minIndex = this.sameText.length - 1;
                this.sameText += char;
              } else {
                break;
              }
            }
          }
        }
        const ellapsed = Date.now() - this.start;
        if (ellapsed > xoDuration) {
          if (this.increasing && this.index < text.length - 1) {
            this.index = (this.index + 1) % text.length;
            this.start = Date.now();
          }
        }
        if (this.index === text.length - 1) {
          const ellapsed2 = Date.now() - this.start2;
          if (ellapsed2 > delay2) {
            this.increasing = false;
            this.start2 = Date.now();
          }
        }
        const ellapsed3 = Date.now() - this.start3;
        if (!this.increasing && ellapsed3 > deleteDuration) {
          this.index = this.index - 1;
          this.start3 = Date.now();
        }
        this.type = text.substring(0, Math.min(this.index + 1, text.length));
        if (this.el.innerHTML !== this.type) {
          this.el.innerHTML = this.type;
        }
        const height = this.el.offsetHeight;
        const width = this.el.offsetWidth;
        if (height > 0) {
          this.el.style.setProperty("--xo-height", `${height}px`);
        }
        this.el.style.setProperty("--xo-width", `${width}px`);
        this.el.setAttribute("xo-cursor-char", `${xoCursorChar}`);
      });
      __publicField(this, "destroy", () => {
        frameManager$1.remove(this.handleFrame);
      });
      this.el = el;
      this.options = options;
      this.el = el;
      this.options = {
        ..._Typing.defaultOptions,
        ...options
      };
      frameManager$1.add(this.handleFrame, true);
    }
  };
  let Typing = _Typing;
  __publicField(Typing, "defaultOptions", {
    xoContent: [],
    xoDuration: 100,
    xoDelay: 2e3,
    xoEffect: "typing",
    xoCursorChar: "|"
  });
  class TypingFactory extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "typing", null);
      __publicField(this, "slide", null);
      __publicField(this, "goo", null);
      __publicField(this, "init", () => {
        const options = this.getOptions();
        switch (options.xoEffect) {
          case "slide":
            this.slide = new Slide(this, options);
            break;
          case "goo":
            this.goo = new Goo(this, options);
            break;
          case "typing":
          default:
            this.typing = new Typing(this, options);
            break;
        }
      });
      __publicField(this, "destroy", () => {
        var _a2, _b2, _c2;
        (_a2 = this.typing) == null ? void 0 : _a2.destroy();
        (_b2 = this.slide) == null ? void 0 : _b2.destroy();
        (_c2 = this.goo) == null ? void 0 : _c2.destroy();
      });
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-duration", "xo-content", "xo-delay", "xo-effect", "xo-cursor-char"];
    }
    getOptions() {
      const options = getAttrs(this, {
        pick: ["xoContent", "xoDuration", "xoDelay", "xoEffect", "xoCursorChar"],
        types: {
          xoContent: "array",
          xoDuration: "number",
          xoDelay: "number",
          xoEffect: "string",
          xoCursorChar: "string"
        }
      });
      return options;
    }
    connectedCallback() {
      this.init();
    }
    disconnectedCallback() {
      this.destroy();
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if ((name === "xo-observed" || name === "xo-duration" || name === "xo-content" || name === "xo-delay" || name === "xo-effect" || name === "xo-cursor-char") && oldValue !== newValue) {
        await delay(100);
        this.destroy();
        this.init();
      }
    }
  }
  const styles$c = "";
  renderGoo();
  componentDefine({
    [WebComponent.Typing]: TypingFactory
  });
  const Axis = {
    Idle: "idle",
    Target: "target",
    Lock: "lock"
  };
  const _ImageComparison = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "handleEl");
      __publicField(this, "pan");
      __publicField(this, "animated", createAnimate());
      __publicField(this, "prevDx", 0);
      __publicField(this, "axis", Axis.Idle);
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "setVariables", (value) => {
        this.style.setProperty("--xo-value", `${value}`);
        this.setAttribute("xo-value", `${value}`);
      });
      __publicField(this, "handleDefaultAnimate", () => {
        const { xoDefaultPercent, xoAnimate } = this.getOptions();
        const isReduced2 = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
        if (isReduced2) {
          this.setVariables(xoDefaultPercent);
          return;
        }
        if (!xoAnimate) {
          this.setVariables(xoDefaultPercent);
          return;
        }
        this.intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            var _a2;
            if (entry.isIntersecting) {
              (_a2 = this.intersectionObserver) == null ? void 0 : _a2.unobserve(this);
              this.animated({
                from: 0,
                to: xoDefaultPercent,
                duration: 2e3,
                easing: easings.spring,
                onUpdate: this.animateUpdate
              });
            }
          });
        }, { rootMargin: "0px 0px -200px 0px" });
        this.intersectionObserver.observe(this);
      });
      __publicField(this, "handler", () => {
        const { xoDefaultPercent } = this.getOptions();
        this.handleDefaultAnimate();
        this.handleEl = this.querySelector(`${WebComponent.ImageComparison}-handle`);
        const { width } = this.getBoundingClientRect();
        const threshold = 1.5;
        this.prevDx = width * (xoDefaultPercent / 100);
        this.pan = panGesture({
          element: this,
          dx: width * (xoDefaultPercent / 100),
          onMove: ({ dx, dy }) => {
            const { width: width2 } = this.getBoundingClientRect();
            if (this.axis === Axis.Idle) {
              if (Math.abs(dx - this.prevDx) / threshold >= Math.abs(dy)) {
                this.axis = Axis.Target;
              } else {
                this.axis = Axis.Lock;
              }
            }
            if (this.axis === Axis.Target) {
              this.style.touchAction = "none";
              this.style.cursor = "ew-resize";
              const val = interpolate({
                value: dx,
                inputRange: [0, width2],
                outputRange: [0, 100]
              });
              this.setVariables(val);
              this.prevDx = dx;
            }
          },
          onEnd: () => {
            this.axis = Axis.Idle;
            this.pan.setValue({ dx: this.prevDx, dy: 0 });
            this.style.removeProperty("cursor");
            this.style.removeProperty("touch-action");
          }
        });
      });
      __publicField(this, "animateUpdate", (value) => {
        const { width } = this.getBoundingClientRect();
        this.setVariables(value);
        this.pan.setValue({ dx: width * (value / 100) });
      });
      __publicField(this, "handleClick", (event) => {
        if (!this.handleEl.contains(event.target)) {
          const { width } = this.getBoundingClientRect();
          const { offsetX } = event;
          const afterWidth = interpolate({
            value: offsetX,
            inputRange: [0, width],
            outputRange: [0, 100]
          });
          this.animated({
            from: Number(this.style.getPropertyValue("--xo-value")),
            to: afterWidth,
            duration: 100,
            easing: easings.decay,
            onUpdate: this.animateUpdate
          });
        }
      });
      __publicField(this, "init", () => {
        this.handler();
        if (!isMobile.any) {
          this.addEventListener("mousedown", this.handleClick);
        }
      });
      __publicField(this, "destroy", () => {
        var _a2;
        this.pan.destroy();
        this.animated.off();
        if (!isMobile.any) {
          this.removeEventListener("mousedown", this.handleClick);
        }
        (_a2 = this.intersectionObserver) == null ? void 0 : _a2.disconnect();
      });
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-value", "xo-default-percent", "xo-animate"];
    }
    getOptions() {
      const options = getAttrs(this, {
        pick: ["xoDefaultPercent", "xoAnimate"],
        types: {
          xoDefaultPercent: "number",
          xoAnimate: "boolean"
        }
      });
      return {
        ..._ImageComparison.defaultOptions,
        ...options
      };
    }
    connectedCallback() {
      this.init();
    }
    disconnectedCallback() {
      this.destroy();
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      if ((name === "xo-observed" || name === "xo-default-percent") && oldValue !== newValue) {
        await delay(100);
        this.destroy();
        this.init();
      }
    }
  };
  let ImageComparison = _ImageComparison;
  __publicField(ImageComparison, "defaultOptions", {
    xoDefaultPercent: 50,
    xoAnimate: false
  });
  const styles$b = "";
  componentDefine({
    [WebComponent.ImageComparison]: ImageComparison
  });
  const getMegaMenuFileName = (sectionId) => {
    const shortenSectionId = sectionId.toString().slice(-8);
    return `xb-menu-${shortenSectionId}`;
  };
  async function getMegaMenu(id2) {
    const sectionId = getMegaMenuFileName(id2);
    const res = await fetch(`/?section_id=${sectionId}`);
    const data = await res.text();
    return data;
  }
  const _MegaMenu = class extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "linkEl", null);
      __publicField(this, "prevIndex", null);
      __publicField(this, "builderMegaMenuHtml", "");
      __publicField(this, "controller", new AbortController());
      __publicField(this, "handleLinkClick", (event) => {
        const targetEl = event.target;
        const currentEl = targetEl.closest("a");
        const modalName = currentEl == null ? void 0 : currentEl.getAttribute("xo-modal-name");
        if (modalName) {
          event.preventDefault();
          xoModal.open(modalName);
        }
      });
      __publicField(this, "handleMenuHamburger", () => {
        const modalEl = this.closest(WebComponent.Modal);
        const hasContent = !_MegaMenu.isEmpty(this);
        if (modalEl && hasContent) {
          this.linkEl = modalEl.previousElementSibling;
          if (this.linkEl) {
            this.linkEl.setAttribute("xo-modal-name", modalEl.getAttribute("xo-name"));
            this.linkEl.addEventListener("click", this.handleLinkClick, { signal: this.controller.signal });
          }
        }
      });
      __publicField(this, "renderForTheme", () => {
        const { xoIndex, xoName } = this.options;
        const selector = `template[xo-mega-menu-name='${xoName}'][xo-mega-menu-index="${xoIndex}"]`;
        const megamenuContentEl = document.querySelector(selector);
        if (megamenuContentEl && _MegaMenu.isEmpty(this)) {
          const sectionId = getShopifySectionId(megamenuContentEl);
          this.setAttribute("xo-section-id", sectionId);
          this.appendChild(megamenuContentEl.content.cloneNode(true));
        }
        _MegaMenu.setPositionStatic(this);
      });
      __publicField(this, "renderForBuilder", async () => {
        try {
          const { xoName, xoPreviewMode } = this.options;
          if (xoPreviewMode) {
            const selector = `template[xo-mega-menu-name='${xoName}']`;
            const megamenuContentEl = document.querySelector(selector);
            if (megamenuContentEl && _MegaMenu.isEmpty(this)) {
              this.appendChild(megamenuContentEl.content.cloneNode(true));
            }
          } else {
            if (!this.builderMegaMenuHtml) {
              this.builderMegaMenuHtml = await getMegaMenu(xoName);
            }
            const regexp = new RegExp(`(<template.*xo-mega-menu-name=['"]${xoName}['"]>|<\\/template>)`, "g");
            const megaMenuHtml = `<xo-fragment>${this.builderMegaMenuHtml.replace(regexp, "")}</xo-fragment>`;
            const doc = new DOMParser().parseFromString(megaMenuHtml, "text/html");
            const scriptEls = Array.from(doc.querySelectorAll("script")).filter((el) => el.type === "" || el.type === "text/javascript");
            if (megaMenuHtml && _MegaMenu.isEmpty(this)) {
              each(scriptEls, (scriptEl) => {
                scriptEl.remove();
              });
              const xoFragmentEl = doc.body.querySelector("xo-fragment");
              each(Array.from(xoFragmentEl.children), (el) => {
                this.appendChild(el);
              });
              each(scriptEls, (scriptEl) => {
                if (scriptEl.src) {
                  loadScript({ id: scriptEl.id || `id-${hash(scriptEl.src)}`, file: scriptEl.src });
                } else if (scriptEl.textContent) {
                  loadScript({ id: scriptEl.id || `id-${hash(scriptEl.textContent)}`, content: scriptEl.textContent });
                }
              });
            }
          }
        } catch {
        }
      });
      __publicField(this, "render", () => {
        var _a2;
        const { xoBuilder } = this.options;
        if (xoBuilder) {
          this.renderForBuilder();
          return;
        }
        if (!isMobile.any) {
          const sectionEl = this.closest(".shopify-section");
          if ((_a2 = window.Shopify) == null ? void 0 : _a2.designMode) {
            this.renderForTheme();
          } else {
            sectionEl == null ? void 0 : sectionEl.addEventListener("mouseenter", this.renderForTheme, { signal: this.controller.signal });
            if ("requestIdleCallback" in window) {
              requestIdleCallback(() => {
                this.renderForTheme();
              }, { timeout: 1e3 });
            } else {
              setTimeout(() => {
                this.renderForTheme();
              }, 1e3);
            }
          }
          return;
        }
        this.renderForTheme();
      });
      __publicField(this, "sectionLoad", async (event) => {
        const { xoName, xoSectionId } = this.options;
        const { sectionId } = event.detail;
        if (xoName && sectionId && sectionId === xoSectionId) {
          await delay(1e3);
          const megaMenuEls2 = Array.from(document.querySelectorAll(WebComponent.MegaMenu));
          each(megaMenuEls2, async (el) => {
            var _a2;
            const { xoIndex, xoName: xoName2 } = el.options;
            const templateEl = document.querySelector(`template[xo-mega-menu-name="${xoName2}"][xo-mega-menu-index="${xoIndex}"]`);
            if (!templateEl) {
              el.innerHTML = "";
              return;
            }
            const shopifySectionId = getShopifySectionId(templateEl);
            const res = await fetch(`/?section_id=${shopifySectionId}`);
            const data = await res.text();
            const doc = new DOMParser().parseFromString(data, "text/html");
            const newContent = ((_a2 = doc.querySelector(`template[xo-mega-menu-name]`)) == null ? void 0 : _a2.innerHTML) || "";
            attrBoolean.set(el, "xo-selected", shopifySectionId === sectionId);
            if (el.innerHTML !== newContent) {
              el.innerHTML = newContent;
              _MegaMenu.setPositionStatic(el);
            }
          });
        }
      });
      __publicField(this, "sectionSelect", (event) => {
        const { xoSectionId } = this.options;
        const { sectionId } = event.detail;
        attrBoolean.set(this, "xo-selected", sectionId === xoSectionId);
        const templateEl = document.querySelector(`#shopify-section-${sectionId} template[xo-mega-menu-name]`);
        const index = templateEl == null ? void 0 : templateEl.getAttribute("xo-mega-menu-index");
        if (this.prevIndex == null) {
          this.prevIndex = index;
        }
      });
      __publicField(this, "selectDeselect", () => {
        this.prevIndex = null;
      });
    }
    static get observedAttributes() {
      return ["xo-name"];
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoIndex", "xoName", "xoSectionId", "xoSelected", "xoBuilder", "xoPreviewMode"],
        types: {
          xoIndex: "number",
          xoName: "string",
          xoSectionId: "string",
          xoSelected: "boolean",
          xoBuilder: "boolean",
          xoPreviewMode: "boolean"
        }
      });
      return options;
    }
    connectedCallback() {
      var _a2, _b2;
      if ((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode) {
        return;
      }
      this.render();
      this.handleMenuHamburger();
      if ((_b2 = window.Shopify) == null ? void 0 : _b2.designMode) {
        document.addEventListener("shopify:section:load", this.sectionLoad, { signal: this.controller.signal });
        document.addEventListener("shopify:section:select", this.sectionSelect, { signal: this.controller.signal });
        document.addEventListener("shopify:section:deselect", this.selectDeselect, { signal: this.controller.signal });
      }
    }
    disconnectedCallback() {
      this.controller.abort();
    }
  };
  let MegaMenu = _MegaMenu;
  __publicField(MegaMenu, "isEmpty", (el) => {
    return el.innerHTML.trim() === "";
  });
  __publicField(MegaMenu, "setPositionStatic", (megaMenuEl) => {
    const hasContent = !_MegaMenu.isEmpty(megaMenuEl);
    if (hasContent) {
      const parentEl = megaMenuEl.parentElement;
      if (parentEl.localName !== WebComponent.Toggle) {
        parentEl.style.position = "static";
      } else {
        parentEl.style.removeProperty("position");
      }
    }
  });
  componentDefine({
    [WebComponent.MegaMenu]: MegaMenu
  });
  const COLOR_SCHEME_ADDED = "xo-color-scheme-added";
  class DarkMode extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "colorSchemeIds", ((_W = window.settings) == null ? void 0 : _W.color_scheme_ids) || []);
      __publicField(this, "darkModeMapping", (_X = window.settings) == null ? void 0 : _X.dark_mode_mapping);
      __publicField(this, "colorSchemeMapping");
      __publicField(this, "prevIds", /* @__PURE__ */ new Map());
      __publicField(this, "nextIds", /* @__PURE__ */ new Map());
      __publicField(this, "rootPrevId", "");
      __publicField(this, "rootNextId", "");
      __publicField(this, "handleToggles", []);
      __publicField(this, "pushIds", []);
      __publicField(this, "colorEls", []);
      __publicField(this, "getIndexFromKey", (colorSchemeKey) => {
        const prevIndex = Number(colorSchemeKey.replace(/Scheme\s/g, "")) - 1;
        const nextIndex = Number(this.colorSchemeMapping[colorSchemeKey].replace(/Scheme\s/g, "")) - 1;
        return { prevIndex, nextIndex };
      });
      __publicField(this, "getIdFromKey", (colorSchemeKey) => {
        const { prevIndex, nextIndex } = this.getIndexFromKey(colorSchemeKey);
        const prevId = this.colorSchemeIds[prevIndex];
        const nextId = this.colorSchemeIds[nextIndex];
        return { prevId, nextId };
      });
      __publicField(this, "setIds", (els, colorSchemeKey) => {
        const { prevId, nextId } = this.getIdFromKey(colorSchemeKey);
        each(els, (colorEl) => {
          this.prevIds.set(colorEl, prevId);
          this.nextIds.set(colorEl, nextId);
          attrBoolean.set(colorEl, COLOR_SCHEME_ADDED, true);
        });
      });
      __publicField(this, "setRootIds", (colorSchemeKey) => {
        const { prevIndex } = this.getIndexFromKey(colorSchemeKey);
        const { prevId, nextId } = this.getIdFromKey(colorSchemeKey);
        if (prevIndex === 0) {
          this.rootPrevId = prevId;
          this.rootNextId = nextId;
        }
      });
      __publicField(this, "handleColor", (prevIds, isDark) => {
        prevIds.forEach((value, colorEl) => {
          if (isDark) {
            const prevClassName = `color-${value}`;
            const nextClassname = `color-${this.nextIds.get(colorEl)}`;
            if (colorEl.classList.contains(prevClassName)) {
              colorEl.classList.remove(prevClassName);
              colorEl.classList.add(nextClassname);
            }
          } else {
            const nextClassname = `color-${this.nextIds.get(colorEl)}`;
            const prevClassName = `color-${value}`;
            if (colorEl.classList.contains(nextClassname)) {
              colorEl.classList.remove(nextClassname);
              colorEl.classList.add(prevClassName);
            }
          }
        });
      });
      __publicField(this, "handleStorage", (prevId, isDark) => {
        const storageValue = {
          ...objectParse(storage.getItem("@xo/darkMode") || "{}"),
          [prevId]: isDark ? "dark" : "light"
        };
        let prevIds = [];
        for (let key in this.colorSchemeMapping) {
          const { prevId: prevId2 } = this.getIdFromKey(key);
          prevIds.push(prevId2);
        }
        if (!equal(prevIds, objectKeys(storageValue))) {
          each(objectKeys(storageValue), (key) => {
            storageValue[key] = objectValues(storageValue)[0];
            if (!prevIds.includes(key)) {
              delete storageValue[key];
            }
          });
        }
        storage.setItem("@xo/darkMode", JSON.stringify(storageValue));
      });
      if (this.darkModeMapping) {
        try {
          this.colorSchemeMapping = this.darkModeMapping.trim().split(String.fromCharCode(10)).reduce((acc, item) => {
            const [key, value] = item.replace(/:\s+/g, ":").split(":");
            return {
              ...acc,
              [key]: value
            };
          }, {});
        } catch {
          this.colorSchemeMapping = {};
        }
      } else {
        this.colorSchemeMapping = {};
      }
    }
    connectedCallback() {
      var _a2;
      for (let key in this.colorSchemeMapping) {
        const prevIndex = Number(key.replace(/Scheme\s/g, "")) - 1;
        const { prevId } = this.getIdFromKey(key);
        this.colorEls = Array.from(document.querySelectorAll(`.color-${prevId}:not([${COLOR_SCHEME_ADDED}])`));
        this.setIds(this.colorEls, key);
        this.setRootIds(key);
        let isDark = ((_a2 = objectParse(storage.getItem("@xo/darkMode") || "{}")) == null ? void 0 : _a2[prevId]) === "dark";
        const pushIds = () => {
          const newColorEls = Array.from(document.querySelectorAll(`.color-${prevId}:not([${COLOR_SCHEME_ADDED}])`));
          this.setIds(newColorEls, key);
          const prevIds = /* @__PURE__ */ new Map();
          each(newColorEls, (el) => {
            prevIds.set(el, prevId);
          });
          this.handleColor(prevIds, isDark);
        };
        const handleChange = () => {
          attrBoolean.set(this, "xo-loading", true);
          const handler = () => {
            if (this.prevIds.size) {
              this.setAttribute("xo-mode", isDark ? "dark" : "light");
              attrBoolean.set(document.documentElement, "xo-dark-mode", isDark);
              this.handleColor(this.prevIds, isDark);
            }
            if (prevIndex === 0) {
              if (isDark) {
                const prevClassName = `color-${this.rootPrevId}`;
                const nextClassname = `color-${this.rootNextId}`;
                document.documentElement.classList.remove(prevClassName);
                document.documentElement.classList.add(nextClassname);
              } else {
                const nextClassname = `color-${this.rootNextId}`;
                const prevClassName = `color-${this.rootPrevId}`;
                document.documentElement.classList.remove(nextClassname);
                document.documentElement.classList.add(prevClassName);
              }
            }
            attrBoolean.set(this, "xo-loading", false);
          };
          if ("requestIdleCallback" in window) {
            requestIdleCallback(() => {
              handler();
            });
          } else {
            setTimeout(() => {
              handler();
            }, 0);
          }
        };
        const handleToggle = () => {
          isDark = !isDark;
          this.handleStorage(prevId, isDark);
          handleChange();
        };
        this.handleStorage(prevId, isDark);
        handleChange();
        this.addEventListener("click", handleToggle);
        document.addEventListener("scroll", pushIds);
        document.addEventListener("mouseover", pushIds);
        document.addEventListener("touchstart", pushIds);
        this.handleToggles.push(handleToggle);
        this.pushIds.push(pushIds);
      }
    }
    disconnectedCallback() {
      each(this.handleToggles, (handleToggle) => {
        this.removeEventListener("click", handleToggle);
      });
      each(this.pushIds, (pushIds) => {
        document.removeEventListener("scroll", pushIds);
        document.removeEventListener("mouseover", pushIds);
        document.removeEventListener("touchstart", pushIds);
      });
    }
  }
  DOMLoaded(async () => {
    await delay(0);
    componentDefine({
      [WebComponent.DarkMode]: DarkMode
    });
  });
  const RESIZE_DELAY$2 = 300;
  const _Masonry = class extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "heights", []);
      __publicField(this, "resized", false);
      __publicField(this, "debounceId", -1);
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "_options");
      __publicField(this, "setOptions", () => {
        var _a2, _b2, _c2, _d2;
        const options = getAttrs(this, {
          pick: ["xoGap", "xoColumn", "xoBreakpoints"],
          types: {
            xoGap: "number",
            xoColumn: "number",
            xoBreakpoints: "object"
          }
        });
        const breakpointOptions = getBreakpointsOptions(options.xoBreakpoints);
        this.options = {
          ...options,
          xoGap: (_b2 = (_a2 = breakpointOptions == null ? void 0 : breakpointOptions.gap) != null ? _a2 : options.xoGap) != null ? _b2 : _Masonry.defaultOptions.xoGap,
          xoColumn: (_d2 = (_c2 = breakpointOptions == null ? void 0 : breakpointOptions.column) != null ? _c2 : options.xoColumn) != null ? _d2 : _Masonry.defaultOptions.xoColumn
        };
      });
      __publicField(this, "setItemStyles", (columnEl) => {
        const { xoGap } = this.options;
        const { xoColumn } = this.options;
        columnEl.style.position = "absolute";
        columnEl.style.width = `${100 / xoColumn}%`;
        columnEl.style.left = `${100 / xoColumn * this.indexSelected}%`;
        columnEl.style.top = `${this.minHeight}px`;
        columnEl.style.padding = `${xoGap / 2}px`;
        if (this.resized) {
          columnEl.style.transition = "all 0.4s ease";
        }
      });
      __publicField(this, "handleMasonryElement", () => {
        const { xoGap } = this.options;
        const itemEls = Array.from(this.querySelectorAll(`${WebComponent.MasonryItem}, [${WebComponent.MasonryItem}]`));
        each(itemEls, (columnEl) => {
          this.setItemStyles(columnEl);
          this.heights[this.indexSelected] += columnEl.offsetHeight;
        });
        this.style.height = `${this.maxHeight}px`;
        this.style.margin = `-${xoGap / 2}`;
        if (this.debounceId) {
          clearTimeout(this.debounceId);
        }
        this.debounceId = window.setTimeout(() => {
          itemEls.forEach((columnElement) => {
            columnElement.style.removeProperty("transition");
          });
          this.resized = false;
        }, 500);
      });
      __publicField(this, "setDefaultHeights", () => {
        const { xoColumn } = this.options;
        this.heights = Array(xoColumn).fill(0);
      });
      __publicField(this, "setContainerGap", () => {
        const { xoGap } = this.options;
        this.style.margin = `-${xoGap / 2}px`;
      });
      __publicField(this, "update", () => {
        this.setOptions();
        this.setDefaultHeights();
        this.handleMasonryElement();
        this.setContainerGap();
      });
      __publicField(this, "handleResize", debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            this.resized = true;
            this.update();
            this.prevWidth = currentWidth;
          }
        }
      }, RESIZE_DELAY$2));
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get options() {
      return this._options;
    }
    set options(value) {
      this._options = value;
    }
    get minHeight() {
      return Math.min(...this.heights);
    }
    get maxHeight() {
      return Math.max(...this.heights);
    }
    get indexSelected() {
      return findIndex(this.heights, (item) => item === this.minHeight);
    }
    connectedCallback() {
      this.update();
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
      var _a2;
      clearTimeout(this.debounceId);
      (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
      this.update();
    }
    async attributeChangedCallback(name, oldValue, newValue) {
      var _a2;
      if (name === "xo-observed" && oldValue !== newValue) {
        await delay(100);
        clearTimeout(this.debounceId);
        (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
        this.update();
      }
    }
  };
  let Masonry = _Masonry;
  __publicField(Masonry, "defaultOptions", {
    xoGap: 30,
    xoColumn: 4,
    xoBreakpoints: {}
  });
  const DELAY = 300;
  class MasonryItemBase {
    constructor(el) {
      __publicField(this, "el");
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "prevHeight", 0);
      __publicField(this, "masonryEl", null);
      __publicField(this, "handleResize", debounce((entries) => {
        var _a2;
        for (const entry of entries) {
          const currentWidth = entry.contentRect.width;
          const currentHeight = entry.contentRect.height;
          if (currentWidth !== this.prevWidth || currentHeight !== this.prevHeight) {
            (_a2 = this.masonryEl) == null ? void 0 : _a2.update();
            this.prevWidth = currentWidth;
            this.prevHeight = currentHeight;
          }
        }
      }, DELAY));
      this.el = el;
    }
    mount() {
      var _a2;
      this.masonryEl = this.el.parentElement;
      if (this.masonryEl.tagName.toLowerCase() !== WebComponent.Masonry) {
        return;
      }
      attrBoolean.set(this.el, "xo-masonry-item", true);
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.el);
      (_a2 = this.masonryEl) == null ? void 0 : _a2.update();
    }
    unmount() {
      var _a2, _b2;
      clearTimeout((_a2 = this.masonryEl) == null ? void 0 : _a2.debounceId);
      (_b2 = this.resizeObserver) == null ? void 0 : _b2.disconnect();
    }
  }
  class MasonryItem extends HTMLElement {
    constructor() {
      super(...arguments);
      __publicField(this, "masonryItemBase", null);
    }
    connectedCallback() {
      this.masonryItemBase = new MasonryItemBase(this);
      this.masonryItemBase.mount();
    }
    disconnectedCallback() {
      var _a2;
      (_a2 = this.masonryItemBase) == null ? void 0 : _a2.unmount();
    }
  }
  const styles$a = "";
  componentDefine({
    [WebComponent.Masonry]: Masonry,
    [WebComponent.MasonryItem]: MasonryItem
  });
  function distance(x1, x2, y1, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.hypot(a, b);
  }
  const DEFAULT_FPS = 60;
  const DT_FPS = 1e3 / DEFAULT_FPS;
  const frameManager = new FrameManager();
  const _Cursor = class extends HTMLDivElement {
    constructor() {
      super(...arguments);
      __publicField(this, "targetValueX", 0);
      __publicField(this, "targetValueY", 0);
      __publicField(this, "currentValueX", 0);
      __publicField(this, "currentValueY", 0);
      __publicField(this, "displacementX", 0);
      __publicField(this, "displacementY", 0);
      __publicField(this, "isHover", false);
      __publicField(this, "itemEl", null);
      __publicField(this, "isStart", false);
      __publicField(this, "handleFrameSyncUpdate", ({ delta }) => {
        if (this.itemEl) {
          const diffX = Math.abs(this.targetValueX - this.currentValueX);
          const diffY = Math.abs(this.targetValueY - this.currentValueY);
          if (diffX < 1e-3 && diffY < 1e-3) {
            return;
          }
          let slowDown = delta / DT_FPS;
          const slowDownRounded = Math.round(slowDown);
          if (slowDownRounded >= 1) {
            slowDown = slowDownRounded;
          }
          const { xoLerpEase } = this.options;
          const valueX = lerp(this.currentValueX, this.targetValueX, (this.isHover ? xoLerpEase : 1) * slowDown);
          const valueY = lerp(this.currentValueY, this.targetValueY, (this.isHover ? xoLerpEase : 1) * slowDown);
          this.itemEl.style.top = `${valueY}px`;
          this.itemEl.style.left = `${valueX}px`;
          this.currentValueX = valueX;
          this.currentValueY = valueY;
          this.isHover = true;
          this.handleDistortion(slowDown);
        }
      });
      __publicField(this, "handleDistortion", (slowDown) => {
        const { xoLerpEase, xoDistortion } = this.options;
        if (xoDistortion === "none") {
          return;
        }
        this.itemEl.style.filter = `url(#xo-cursor-${xoDistortion})`;
        this.displacementX = lerp(this.displacementX, this.targetValueX, xoLerpEase * slowDown);
        this.displacementY = lerp(this.displacementY, this.targetValueY, xoLerpEase * slowDown);
        const mouseDistance = distance(this.displacementX, this.targetValueX, this.displacementY, this.targetValueY);
        const feDisplacementMapEl = document.querySelector(`#xo-cursor-${xoDistortion} feDisplacementMap`);
        feDisplacementMapEl.scale.baseVal = mouseDistance;
      });
      __publicField(this, "setHoverButton", (event) => {
        const isButton = !!event.target.closest("a") || !!event.target.closest("button") || !!event.target.closest('[role="button"]');
        if (this.itemEl) {
          attrBoolean.set(this.itemEl, "xo-is-hovering-button", isButton);
        }
      });
      __publicField(this, "handleMouseMove", (event) => {
        const { xoAbsolute } = this.options;
        if (!this.isStart) {
          this.isStart = true;
          frameManager.add(this.handleFrameSyncUpdate, true);
        }
        this.setItemLeftRightEl(event);
        each(this.itemEls, (itemEl) => {
          attrBoolean.set(itemEl, "xo-active", false);
        });
        if (this.itemEl && !attrBoolean.get(this.itemEl, "xo-active")) {
          attrBoolean.set(this.itemEl, "xo-active", true);
        }
        const { scrollX, scrollY } = this.getScrollXY();
        if (xoAbsolute) {
          const { top, left } = offset(this);
          this.targetValueX = event.pageX - left;
          this.targetValueY = event.pageY - top;
        } else {
          this.targetValueX = event.pageX - scrollX;
          this.targetValueY = event.pageY - scrollY;
        }
        this.setHoverButton(event);
        this.handleDisabled(event);
      });
      __publicField(this, "handleDisabled", (event) => {
        var _a2;
        const cursorDisabledEl = (_a2 = event.target) == null ? void 0 : _a2.closest("[xo-cursor-disabled]");
        if (!this.itemEl) {
          return;
        }
        if (cursorDisabledEl) {
          this.handleMouseLeave(event);
        } else {
          frameManager.add(this.handleFrameSyncUpdate, true);
        }
      });
      __publicField(this, "handleMouseLeave", (event) => {
        event.stopPropagation();
        if (this.itemEl) {
          attrBoolean.set(this.itemEl, "xo-active", false);
          this.isHover = false;
          frameManager.remove(this.handleFrameSyncUpdate);
        }
      });
      __publicField(this, "setItemLeftRightEl", (event) => {
        const { xoName } = this.options;
        if (xoName.startsWith("[") && xoName.endsWith("]")) {
          const [prevName, nextName] = objectParse(xoName);
          const isNext = offset(this).left + this.offsetWidth / 2 < event.pageX;
          if (isNext) {
            this.itemEl = this.querySelector(`${WebComponent.CursorItem}[xo-name="${nextName}"]`);
          } else {
            this.itemEl = this.querySelector(`${WebComponent.CursorItem}[xo-name="${prevName}"]`);
          }
        }
      });
      __publicField(this, "handleMouseEnter", (event) => {
        event.stopPropagation();
        this.setItemLeftRightEl(event);
        if (this.itemEl) {
          this.setHoverButton(event);
          frameManager.add(this.handleFrameSyncUpdate, true);
        }
      });
    }
    get options() {
      const options = getAttrs(this, {
        pick: ["xoName", "xoLerpEase", "xoDistortion", "xoAbsolute", "xoMobileDisabled"],
        types: {
          xoName: "string",
          xoLerpEase: "number",
          xoDistortion: "string",
          xoAbsolute: "boolean",
          xoMobileDisabled: "boolean"
        }
      });
      return {
        ..._Cursor.defaultOptions,
        ...options
      };
    }
    setItemEl() {
      const { xoName } = this.options;
      if (xoName.startsWith("[") && xoName.endsWith("]")) {
        this.itemEl = null;
      }
      if (xoName) {
        this.itemEl = this.querySelector(`${WebComponent.CursorItem}[xo-name="${xoName}"]`);
      }
      this.itemEl = this.querySelector(WebComponent.CursorItem);
    }
    get itemEls() {
      return Array.from(document.querySelectorAll(WebComponent.CursorItem));
    }
    getScrollXY() {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      return {
        scrollX,
        scrollY
      };
    }
    connectedCallback() {
      if (isMobile.any && this.options.xoMobileDisabled) {
        return;
      }
      const { top, left } = offset(this);
      const { scrollX, scrollY } = this.getScrollXY();
      this.targetValueX = left + this.offsetWidth / 2 - scrollX;
      this.targetValueY = top + this.offsetHeight / 2 - scrollY;
      this.currentValueX = this.targetValueX;
      this.currentValueY = this.targetValueY;
      this.setItemEl();
      this.addEventListener("mouseenter", this.handleMouseEnter, false);
      this.addEventListener("mousemove", this.handleMouseMove, false);
      this.addEventListener("mouseleave", this.handleMouseLeave, false);
    }
    disconnectedCallback() {
      this.removeEventListener("mouseenter", this.handleMouseEnter, false);
      this.removeEventListener("mousemove", this.handleMouseMove, false);
      this.removeEventListener("mouseleave", this.handleMouseLeave, false);
      frameManager.remove(this.handleFrameSyncUpdate);
    }
  };
  let Cursor = _Cursor;
  __publicField(Cursor, "defaultOptions", {
    xoName: "",
    xoLerpEase: 0.1,
    xoDistortion: "none",
    xoAbsolute: false,
    xoMobileDisabled: false
  });
  function renderCursorFilter() {
    const filter2 = `
    <svg class="xo-hidden">
      <filter id="xo-cursor-distortion-1">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-2">
        <feTurbulence type="turbulence" baseFrequency="0.07 0.01" numOctaves="5" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-3">
        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-4">
        <feTurbulence type="fractalNoise" baseFrequency="0 0.04" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-5">
        <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
    </svg>
  `;
    document.body.insertAdjacentHTML("beforeend", filter2);
  }
  const styles$9 = "";
  renderCursorFilter();
  if (!customElements.get(WebComponent.Cursor)) {
    customElements.define(WebComponent.Cursor, Cursor, { extends: "div" });
  }
  function scrollTo() {
    var _a2;
    if (!((_a2 = window.xbEditor) == null ? void 0 : _a2.designMode)) {
      let getOptions = function(el) {
        const defaultOptions = {
          xoOffset: 0,
          xoDuration: 500,
          xoEasing: "easeInOutCubic"
        };
        const options = getAttrs(el, {
          pick: ["xoOffset", "xoDuration", "xoEasing"],
          types: {
            xoOffset: "number",
            xoDuration: "number",
            xoEasing: "string"
          }
        });
        return {
          ...defaultOptions,
          ...options
        };
      };
      const animated = createAnimate();
      window.addEventListener("click", (event) => {
        var _a3, _b2;
        const targetEl = event.target;
        const el = targetEl.closest("[xo-scroll-to]");
        const href = (_b2 = (_a3 = el == null ? void 0 : el.getAttribute("href")) != null ? _a3 : el == null ? void 0 : el.getAttribute("xb-href")) != null ? _b2 : el == null ? void 0 : el.getAttribute("xo-href");
        if (el && href) {
          event.preventDefault();
          const { xoOffset, xoDuration, xoEasing } = getOptions(el);
          if (href === "#top") {
            animated({
              from: window.scrollY,
              to: 0 + xoOffset,
              duration: xoDuration,
              easing: easings[xoEasing],
              onUpdate: (value) => {
                window.scrollTo({ top: value });
              }
            });
          } else {
            const el2 = document.querySelector(href);
            if (el2 != null) {
              const from = window.scrollY;
              const to = el2.getBoundingClientRect().top + window.scrollY + xoOffset;
              animated({
                from,
                to,
                duration: xoDuration,
                easing: easings[xoEasing],
                onUpdate: (value) => {
                  const stickyHeight = getStickyHeight("top");
                  const stickyHeightInterpolation = interpolate({
                    inputRange: [from, to],
                    outputRange: [0, stickyHeight],
                    value
                  });
                  window.scrollTo({ top: value - stickyHeightInterpolation });
                }
              });
            }
          }
        }
      });
    }
  }
  scrollTo();
  const DURATION$1 = 1200;
  const VX_OFFSET = 30;
  const CLAMP_THRESHOLD = 0.3;
  let ScrollCarousel = (_Y = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "innerEl", this.children[0]);
      __publicField(this, "animated", createAnimate());
      __publicField(this, "pan", null);
      __publicField(this, "nextEl", this.querySelector(WebComponent.ScrollCarouselNext));
      __publicField(this, "prevEl", this.querySelector(WebComponent.ScrollCarouselPrev));
      __publicField(this, "anchorEls", Array.from(this.querySelectorAll("a")));
      __publicField(this, "isPanMove", false);
      __publicField(this, "stopAnimated", () => {
      });
      __publicField(this, "state", {
        isDragging: false,
        x: 0,
        navTarget: false
      });
      __publicField(this, "getDirConstant", () => {
        const { xoRtl } = this.props;
        return xoRtl ? -1 : 1;
      });
      __publicField(this, "endX", () => {
        const { xoGap } = this.props;
        return (this.offsetWidth - this.innerEl.scrollWidth + xoGap) * this.getDirConstant();
      });
      __publicField(this, "getValue", (x, useRuberBand = true) => {
        const { xoRtl } = this.props;
        const min = xoRtl ? 0 : this.endX();
        const max = xoRtl ? this.endX() : 0;
        if (useRuberBand) {
          return rubberBandClamp(min, max, x, CLAMP_THRESHOLD);
        }
        return clamp(x, min, max);
      });
      __publicField(this, "handlePanStart", (event) => {
        var _a2, _b2;
        if (((_a2 = this.nextEl) == null ? void 0 : _a2.contains(event.target)) || ((_b2 = this.prevEl) == null ? void 0 : _b2.contains(event.target))) {
          this.setState({ navTarget: true });
        }
        this.isPanMove = false;
        this.stopAnimated();
      });
      __publicField(this, "handlePanMove", ({ dx, isHorizontalSwipe }, event) => {
        const { isHorizontalSwipeState } = this.state;
        if (isHorizontalSwipeState == null) {
          this.setState({ isHorizontalSwipeState: isHorizontalSwipe });
        }
        const nextIsHorizontalSwipeState = isMobile.any ? this.state.isHorizontalSwipeState : true;
        if (nextIsHorizontalSwipeState) {
          event.preventDefault();
          this.isPanMove = true;
          const x = this.getValue(dx);
          this.setState({ x, isDragging: true });
        }
      });
      __publicField(this, "handlePanEnd", ({ dx, vx }) => {
        const { isDragging, navTarget } = this.state;
        if (isDragging) {
          if (!navTarget) {
            this.setState({ isDragging: false });
          }
          this.stopAnimated = this.animated({
            from: dx,
            to: this.getValue(dx + vx * VX_OFFSET, false),
            duration: DURATION$1,
            easing: easings.easeOutExpo,
            onUpdate: (value) => {
              var _a2;
              const x = this.getValue(value);
              this.setState({ x });
              (_a2 = this.pan) == null ? void 0 : _a2.setValue({ dx: x });
            }
          });
        }
        this.setState({ isHorizontalSwipeState: void 0, navTarget: false });
      });
      __publicField(this, "handleWheel", (event) => {
        var _a2;
        const { deltaX, deltaY } = event;
        if (deltaY) {
          return;
        }
        event.preventDefault();
        const { x } = this.state;
        const nextX = Math.round(this.getValue(x - deltaX + (deltaX > 0 ? 1 : -1)));
        this.stopAnimated();
        this.setState({ x: nextX });
        (_a2 = this.pan) == null ? void 0 : _a2.setValue({ dx: nextX });
      });
      __publicField(this, "getFirstLastEls", () => {
        const itemEls = Array.from(this.innerEl.children);
        let inViewportEls = itemEls.filter((el) => {
          const { left } = offset(el);
          const right = left + el.offsetWidth;
          return left >= 0 && right < window.innerWidth;
        });
        if (inViewportEls.length === 0) {
          inViewportEls = itemEls.filter((el) => {
            const rect = el.getBoundingClientRect();
            return rect.left + rect.width >= 0 && rect.left <= window.innerWidth;
          });
        }
        return {
          firstEl: inViewportEls.length === 1 ? inViewportEls[0].previousElementSibling || inViewportEls[0] : inViewportEls[0],
          lastEl: inViewportEls[inViewportEls.length - 1]
        };
      });
      __publicField(this, "handleGo", (value) => {
        const { xoSpeed, xoEasing } = this.props;
        const { x } = this.state;
        this.stopAnimated = this.animated({
          from: x,
          to: this.getValue(value, false),
          duration: xoSpeed,
          easing: easings[xoEasing],
          onUpdate: (value2) => {
            var _a2;
            const x2 = this.getValue(value2);
            this.setState({ x: x2, navTarget: false });
            (_a2 = this.pan) == null ? void 0 : _a2.setValue({ dx: x2 });
          }
        });
        this.setState({ isHorizontalSwipeState: void 0 });
      });
      __publicField(this, "handleNext", (event) => {
        event.preventDefault();
        const { xoRtl } = this.props;
        const { x, isDragging } = this.state;
        this.setState({ isDragging: false });
        if (isDragging) {
          return;
        }
        const { lastEl } = this.getFirstLastEls();
        const rtlNextX = this.offsetWidth - lastEl.offsetLeft;
        const ltrNextX = -(lastEl.offsetLeft + lastEl.offsetWidth);
        const nextX = xoRtl ? rtlNextX : ltrNextX;
        if (x !== this.endX()) {
          if (nextX === x) {
            this.handleGo(x - this.offsetWidth * this.getDirConstant());
          } else {
            this.handleGo(nextX);
          }
        }
      });
      __publicField(this, "handlePrev", (event) => {
        event.preventDefault();
        const { xoGap, xoRtl } = this.props;
        const { x, isDragging } = this.state;
        this.setState({ isDragging: false });
        if (isDragging) {
          return;
        }
        const { firstEl } = this.getFirstLastEls();
        const rtlNextX = (firstEl.offsetLeft + xoGap) * -1;
        const ltrNextX = (firstEl.offsetLeft + firstEl.offsetWidth - this.offsetWidth - xoGap) * -1;
        const nextX = xoRtl ? rtlNextX : ltrNextX;
        if (x !== 0) {
          if (nextX === x) {
            this.handleGo(x + this.offsetWidth * this.getDirConstant());
          } else {
            this.handleGo(nextX);
          }
        }
      });
      __publicField(this, "handleAnchor", (event) => {
        if (this.isPanMove) {
          event.preventDefault();
        }
      });
      __publicField(this, "bindAnchor", () => {
        each(this.anchorEls, (anchorEl) => {
          anchorEl.addEventListener("click", this.handleAnchor);
        });
      });
      __publicField(this, "unbindAnchor", () => {
        each(this.anchorEls, (anchorEl) => {
          anchorEl.removeEventListener("click", this.handleAnchor);
        });
      });
      __publicField(this, "updateUI", () => {
        const { x } = this.state;
        this.innerEl.style.transform = `translate3d(${x}px, 0, 0)`;
        if (this.nextEl) {
          attrBoolean.set(this.nextEl, "xo-disabled", x >= 0);
        }
        if (this.prevEl) {
          attrBoolean.set(this.prevEl, "xo-disabled", x <= this.endX());
        }
      });
    }
    mount() {
      var _a2, _b2;
      const { xoGap } = this.props;
      if (!this.innerEl) {
        return;
      }
      this.updateUI();
      this.innerEl.style.setProperty("--xo-gap", `${xoGap}px`);
      this.bindAnchor();
      this.pan = panGesture({
        element: this,
        onStart: this.handlePanStart,
        onMove: this.handlePanMove,
        onEnd: this.handlePanEnd
      });
      this.addEventListener("wheel", this.handleWheel);
      (_a2 = this.nextEl) == null ? void 0 : _a2.addEventListener("click", this.handleNext);
      (_b2 = this.prevEl) == null ? void 0 : _b2.addEventListener("click", this.handlePrev);
    }
    stateUpdate() {
      this.updateUI();
    }
    unmount() {
      var _a2, _b2, _c2;
      (_a2 = this.pan) == null ? void 0 : _a2.destroy();
      this.stopAnimated();
      this.unbindAnchor();
      this.removeEventListener("wheel", this.handleWheel);
      (_b2 = this.nextEl) == null ? void 0 : _b2.removeEventListener("click", this.handleNext);
      (_c2 = this.prevEl) == null ? void 0 : _c2.removeEventListener("click", this.handlePrev);
    }
  }, __publicField(_Y, "propTypes", {
    xoSpeed: "number",
    xoGap: "number",
    xoEasing: "string",
    xoRtl: "boolean"
  }), __publicField(_Y, "defaultProps", {
    xoSpeed: 200,
    xoEasing: "ease",
    xoGap: 30,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl"
  }), _Y);
  ScrollCarousel = __decorate([
    customElements$1(WebComponent.ScrollCarousel)
  ], ScrollCarousel);
  const styles$8 = "";
  const EASING = "cubic-bezier(.29,.99,.53,.88)";
  let Magnetic = (_Z = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "handleMouseMove", (event) => {
        const { xoDuration, xoRadius, xoRadiusMove } = this.props;
        const childEl = this.querySelector(WebComponent.MagneticContent);
        const { top, left, width, height } = this.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;
        const lx = Math.max(cx - event.clientX, 0);
        const rx = Math.max(event.clientX - cx, 0);
        const ty = Math.max(cy - event.clientY, 0);
        const by = Math.max(event.clientY - cy, 0);
        const r = xoRadius;
        const c = 1.3;
        const radiusMove = xoRadiusMove || r;
        if (!childEl) {
          return;
        }
        if (this.checkCircle(event.clientX, event.clientY, cx, cy, r)) {
          const x = Math.abs(event.clientX) - cx;
          const y = Math.abs(event.clientY) - cy;
          const d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          let translateX = 0;
          let translateY = 0;
          if (lx > 0) {
            translateX = lx / -c;
          } else if (rx > 0) {
            translateX = rx / c;
          }
          if (ty > 0) {
            translateY = ty / -c;
          } else if (by > 0) {
            translateY = by / c;
          }
          translateX = translateX / (d / r * (r / radiusMove) + 0.5);
          translateY = translateY / (d / r * (r / radiusMove) + 0.5);
          attrBoolean.set(this, "xo-active", true);
          childEl.style.transition = `${xoDuration}ms ${EASING}`;
          childEl.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        } else {
          attrBoolean.set(this, "xo-active", false);
          childEl.style.transform = "translate3d(0, 0, 0)";
        }
      });
      __publicField(this, "handleMouseLeave", () => {
        const childEl = this.querySelector(WebComponent.MagneticContent);
        attrBoolean.set(this, "xo-active", false);
        if (childEl) {
          childEl.style.transform = "translate3d(0, 0, 0)";
        }
      });
      __publicField(this, "getContainerEl", () => {
        var _a2;
        const { xoTarget } = this.props;
        const dfContainerEl = this.closest(".shopify-section") || document.body;
        return xoTarget ? (_a2 = this.closest(xoTarget)) != null ? _a2 : dfContainerEl : dfContainerEl;
      });
    }
    checkCircle(x, y, cx, cy, r) {
      return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) <= Math.pow(r, 2);
    }
    mount() {
      const container = this.getContainerEl();
      container.addEventListener("mousemove", this.handleMouseMove);
      container.addEventListener("mouseleave", this.handleMouseLeave);
    }
    unmount() {
      const container = this.getContainerEl();
      container.removeEventListener("mousemove", this.handleMouseMove);
      container.removeEventListener("mouseleave", this.handleMouseLeave);
    }
  }, __publicField(_Z, "propTypes", {
    xoDuration: "number",
    xoRadius: "number",
    xoRadiusMove: "number",
    xoTarget: "string"
  }), __publicField(_Z, "defaultProps", {
    xoDuration: 600,
    xoRadius: 100
  }), _Z);
  Magnetic = __decorate([
    customElements$1(WebComponent.Magnetic)
  ], Magnetic);
  const styles$7 = "";
  function generatePath(data, width, height, maxX, maxY, smoothness = 0.5) {
    const points = data.map((point, index) => {
      const x = index / maxX * width;
      const y = height - point / maxY * height;
      return { x, y };
    });
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || points[i + 1];
      const cp1x = p1.x + (p2.x - p0.x) * smoothness / 6;
      const cp1y = p1.y + (p2.y - p0.y) * smoothness / 6;
      const cp2x = p2.x - (p3.x - p1.x) * smoothness / 6;
      const cp2y = p2.y - (p3.y - p1.y) * smoothness / 6;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return { path, points };
  }
  const RESIZE_DELAY$1 = 400;
  let LineChart = (__ = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "observer", null);
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "getAnimateEl", () => {
        return this.closest(WebComponent.Animate);
      });
      __publicField(this, "getChartDimensions", () => {
        const { xoMargin } = this.props;
        const chartHeight = this.offsetHeight - xoMargin * 2;
        const chartWidth = this.offsetWidth - xoMargin * 2;
        return { chartHeight, chartWidth };
      });
      __publicField(this, "renderXLabels", () => {
        const { xoXLabels } = this.props;
        const { chartHeight, chartWidth } = this.getChartDimensions();
        return xoXLabels.map((label, index) => {
          const x = index / (xoXLabels.length - 1) * chartWidth;
          return `
        <text x="${x}" y="${chartHeight + 20}" text-anchor="middle" font-size="12">${label}</text>
      `;
        }).join("");
      });
      __publicField(this, "renderYLabels", () => {
        const { xoYLabels } = this.props;
        const { chartHeight } = this.getChartDimensions();
        return xoYLabels.map((label, index) => {
          const y = chartHeight - index / (xoYLabels.length - 1) * chartHeight;
          return `
        <text x="-10" y="${y}" text-anchor="end" dominant-baseline="middle" font-size="12">${label}</text>
      `;
        }).join("");
      });
      __publicField(this, "renderGridLines", () => {
        const { xoGridColor, xoGridType, xoXLabels, xoYLabels } = this.props;
        const { chartWidth, chartHeight } = this.getChartDimensions();
        return [
          ...xoXLabels.map((_, index) => {
            const x = index / (xoXLabels.length - 1) * chartWidth;
            return `
          <line x1="${x}" y1="0" x2="${x}" y2="${chartHeight}" stroke="${xoGridColor}" stroke-width="1"${xoGridType === "dashed" ? ' stroke-dasharray="5,5"' : ""}></line>
        `;
          }),
          ...xoYLabels.map((_, index) => {
            const y = index / (xoYLabels.length - 1) * chartHeight;
            return `
          <line x1="0" y1="${y}" x2="${chartWidth}" y2="${y}" stroke="${xoGridColor}" stroke-width="1"${xoGridType === "dashed" ? ' stroke-dasharray="5,5"' : ""}></line>
        `;
          })
        ].join("");
      });
      __publicField(this, "renderPoints", (pointsData, dotEnabled, dotColor, dotSize, useAnimate) => {
        if (!dotEnabled) {
          return "";
        }
        return pointsData.map((point) => {
          return `<circle cx="${point.x}" cy="${point.y}" r="${dotSize}" fill="${dotColor}"${useAnimate && this.getAnimateEl() ? ' style="transition: 1s ease 0.2s; opacity: 0;"' : ""}></circle>`;
        }).join("");
      });
      __publicField(this, "renderLines", (useAnimate) => {
        const { xoDatasets, xoMax, xoYLabels, xoXLabels, xoSmoothness } = this.props;
        const { chartWidth, chartHeight } = this.getChartDimensions();
        return xoDatasets.map((dataset) => {
          const { data, lineColor = "#3438fb", lineWidth = 2, lineCap = "square", dotEnabled = true, dotColor, dotSize = 4 } = dataset;
          const maxX = xoXLabels.length - 1;
          const maxY = xoMax != null ? xoMax : Math.max(...xoYLabels.map(Number));
          const { path: pathData, points: pointsData } = generatePath(data, chartWidth, chartHeight, maxX, maxY, clamp(xoSmoothness, 0, 1));
          return `
          <path d="${pathData}" fill="none" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-linecap="${lineCap}"></path>
          ${this.renderPoints(pointsData, dotEnabled, dotColor || lineColor, dotSize, useAnimate)}
        `;
        }).join("");
      });
      __publicField(this, "renderChart", (useAnimate) => {
        const { xoMargin } = this.props;
        const { chartWidth, chartHeight } = this.getChartDimensions();
        return `
      <svg width="${chartWidth + xoMargin * 2}" height="${chartHeight + xoMargin * 2}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle">
        <g transform="translate(${xoMargin}, ${xoMargin})">
          ${this.renderXLabels()}
          ${this.renderYLabels()}
          ${this.renderGridLines()}
          ${this.renderLines(useAnimate)}
        </g>
      </svg>
    `;
      });
      __publicField(this, "handler", (useAnimate = false) => {
        this.innerHTML = this.renderChart(useAnimate);
        if (useAnimate) {
          this.handleAnimate();
        }
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.resizeObserver.observe(this);
      });
      __publicField(this, "handleResize", debounce((entries) => {
        var _a2;
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            if (this.prevWidth !== 0) {
              this.innerHTML = "";
              (_a2 = this.observer) == null ? void 0 : _a2.disconnect();
              this.handler();
            }
            this.prevWidth = currentWidth;
          }
        }
      }, RESIZE_DELAY$1));
    }
    handleAnimate() {
      const paths = Array.from(this.querySelectorAll("path"));
      const cicles = Array.from(this.querySelectorAll("circle"));
      const animateEl = this.getAnimateEl();
      if (animateEl) {
        each(paths, (path) => {
          const totalLength = path.getTotalLength();
          path.setAttribute("stroke-dashoffset", String(totalLength));
          path.setAttribute("stroke-dasharray", String(totalLength));
          path.setAttribute("xo-next-stroke-dashoffset", "0");
        });
        this.observer = new MutationObserver((mutations) => {
          each(mutations, (mutation) => {
            var _a2;
            const dashOffset = mutation.target.getAttribute("stroke-dashoffset");
            if (dashOffset === "0" || !dashOffset) {
              each(cicles, (circle) => {
                circle.style.opacity = "1";
              });
              (_a2 = this.observer) == null ? void 0 : _a2.disconnect();
            }
          });
        });
        this.observer.observe(paths[0], { attributes: true, attributeFilter: ["stroke-dashoffset"] });
      }
    }
    destroy() {
      var _a2, _b2;
      this.innerHTML = "";
      (_a2 = this.observer) == null ? void 0 : _a2.disconnect();
      (_b2 = this.resizeObserver) == null ? void 0 : _b2.disconnect();
    }
    mount() {
      this.handler(true);
    }
    unmount() {
      this.destroy();
    }
    propUpdate({ prevProp, nextProp }) {
      if (prevProp != null && prevProp !== nextProp) {
        this.destroy();
        this.handler();
      }
    }
  }, __publicField(__, "propTypes", {
    xoXLabels: "array",
    xoYLabels: "array",
    xoMax: "number",
    xoDatasets: "array",
    xoGridColor: "string",
    xoGridType: "string",
    xoMargin: "number",
    xoSmoothness: "number"
  }), __publicField(__, "defaultProps", {
    xoXLabels: [],
    xoYLabels: [],
    xoDatasets: [],
    xoGridColor: "#ddd",
    xoGridType: "dashed",
    xoMargin: 40,
    xoSmoothness: 1
  }), __publicField(__, "observedProps", ["xoXLabels", "xoYLabels", "xoDatasets", "xoMax", "xoGridColor", "xoGridType", "xoMargin"]), __);
  LineChart = __decorate([
    customElements$1(WebComponent.LineChart)
  ], LineChart);
  const styles$6 = "";
  let ScrollScene = (_$ = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "timeId", -1);
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "itemEls", Array.from(this.querySelectorAll(`:scope > ${WebComponent.ScrollSceneInner} > ${WebComponent.ScrollSceneItem}`)));
      __publicField(this, "state", {
        activeIndex: 0
      });
      __publicField(this, "getThreshold", () => {
        const { xoThreshold } = this.props;
        const isMac = /Mac/.test(navigator.userAgent);
        if (isMac) {
          return xoThreshold + 0.3;
        }
        return xoThreshold;
      });
      __publicField(this, "handleScroll", () => {
        const threshold = this.getThreshold();
        const { top } = this.getBoundingClientRect();
        const index = Math.trunc(top * -1 / (window.innerHeight * threshold));
        const activeIndex = clamp(index, 0, this.itemEls.length - 1);
        this.setState({ activeIndex });
      });
      __publicField(this, "updateUI", () => {
        var _a2, _b2;
        const { activeIndex } = this.state;
        const itemEl = this.itemEls[activeIndex];
        const itemPrevEl = (_a2 = this.itemEls) == null ? void 0 : _a2[activeIndex - 1];
        const itemNextEl = (_b2 = this.itemEls) == null ? void 0 : _b2[activeIndex + 1];
        each(this.itemEls, (itemEl2) => {
          attrBoolean.set(itemEl2, "xo-active", false);
          attrBoolean.set(itemEl2, "xo-prev", false);
          attrBoolean.set(itemEl2, "xo-next", false);
        });
        if (itemEl) {
          attrBoolean.set(itemEl, "xo-active", true);
        }
        if (itemPrevEl) {
          attrBoolean.set(itemPrevEl, "xo-prev", true);
        }
        if (itemNextEl) {
          attrBoolean.set(itemNextEl, "xo-next", true);
        }
      });
      __publicField(this, "handleResize", debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            const { xoMobileDisabled, xoMobileBreakpoint } = this.props;
            const isMobile2 = xoMobileDisabled && window.innerWidth < xoMobileBreakpoint;
            if (isMobile2) {
              this.style.removeProperty("height");
              window.removeEventListener("scroll", this.handleScroll);
            } else {
              const threshold = this.getThreshold();
              window.addEventListener("scroll", this.handleScroll);
              this.style.height = `${100 * (this.itemEls.length + 1 / threshold) * threshold}vh`;
            }
            this.prevWidth = currentWidth;
          }
        }
      }, 400));
    }
    setActive(index) {
      this.setState({ activeIndex: index });
    }
    mount() {
      if (this.itemEls.length <= 1) {
        return;
      }
      this.updateUI();
      const threshold = this.getThreshold();
      window.addEventListener("scroll", this.handleScroll);
      this.style.height = `${100 * (this.itemEls.length + 1 / threshold) * threshold}vh`;
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this);
    }
    stateUpdate(prevState) {
      const { activeIndex } = this.state;
      if (prevState.activeIndex !== activeIndex) {
        this.updateUI();
        this.emit("xo:scroll-scene:change", { bubbles: true, detail: { activeIndex } });
      }
    }
    unmount() {
      var _a2;
      clearTimeout(this.timeId);
      window.removeEventListener("scroll", this.handleScroll);
      (_a2 = this.resizeObserver) == null ? void 0 : _a2.disconnect();
    }
  }, __publicField(_$, "propTypes", {
    xoThreshold: "number",
    xoMobileDisabled: "boolean",
    xoMobileBreakpoint: "number"
  }), __publicField(_$, "defaultProps", {
    xoThreshold: 0.5,
    xoMobileDisabled: false,
    xoMobileBreakpoint: 0
  }), _$);
  ScrollScene = __decorate([
    customElements$1(WebComponent.ScrollScene)
  ], ScrollScene);
  const styles$5 = "";
  async function getCollectionContents(handle, sectionId) {
    const res = await fetch(`/collections/${handle}?section_id=${sectionId}`);
    const data = await res.text();
    const doc = new DOMParser().parseFromString(data, "text/html");
    const templateMegaMenuEl = doc.querySelector("template[xo-mega-menu-name]");
    if (templateMegaMenuEl) {
      const tabContentEls2 = Array.from(templateMegaMenuEl.content.querySelectorAll(WebComponent.CollectionTabsContent));
      return tabContentEls2.map((tabContentEl) => {
        var _a2;
        return (_a2 = tabContentEl == null ? void 0 : tabContentEl.innerHTML.trim()) != null ? _a2 : "";
      });
    }
    const tabContentEls = Array.from(doc.querySelectorAll(WebComponent.CollectionTabsContent));
    return tabContentEls.map((tabContentEl) => {
      var _a2;
      return (_a2 = tabContentEl == null ? void 0 : tabContentEl.innerHTML.trim()) != null ? _a2 : "";
    });
  }
  let CollectionTabs = (_aa = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "cache", /* @__PURE__ */ new Map());
      __publicField(this, "state", {
        isLoading: false,
        contents: []
      });
      __publicField(this, "handleRequest", async (handle) => {
        if (this.cache.has(handle)) {
          await delay();
          this.setState({ contents: this.cache.get(handle) });
          this.emit("change", { bubbles: true, detail: { handle } });
          return;
        }
        try {
          const { xoSectionId } = this.props;
          this.setState({ isLoading: true });
          const contents = await getCollectionContents(handle, xoSectionId);
          this.setState({ contents });
          this.emit("change", { bubbles: true, detail: { handle } });
          if (contents) {
            this.cache.set(handle, contents);
          }
        } catch (err) {
          console.error(err);
        } finally {
          this.setState({ isLoading: false });
        }
      });
      __publicField(this, "handleClick", (event) => {
        const { xoSectionId } = this.props;
        const target = event.target;
        const currentTriggerEl = target.closest(`${WebComponent.CollectionTabs}[xo-section-id="${xoSectionId}"] ${WebComponent.CollectionTabsTrigger}`);
        const triggerEls = Array.from(this.querySelectorAll(WebComponent.CollectionTabsTrigger));
        if (currentTriggerEl) {
          const handle = currentTriggerEl.getAttribute("xo-handle");
          if (handle) {
            each(triggerEls, (triggerEl) => {
              attrBoolean.set(triggerEl, "xo-active", false);
              bindingHelper(triggerEl, "xo-active-binding", false);
            });
            attrBoolean.set(currentTriggerEl, "xo-active", true);
            bindingHelper(currentTriggerEl, "xo-active-binding", true);
            this.handleRequest(handle);
          }
        }
      });
      __publicField(this, "handleInit", async () => {
        var _a2;
        const triggerEls = Array.from(this.querySelectorAll(WebComponent.CollectionTabsTrigger));
        const handle = (_a2 = triggerEls.find((triggerEl) => attrBoolean.get(triggerEl, "xo-active"))) == null ? void 0 : _a2.getAttribute("xo-handle");
        const tabContentEls = Array.from(this.querySelectorAll(WebComponent.CollectionTabsContent));
        const contents = tabContentEls.map((tabContentEl) => {
          var _a3;
          return (_a3 = tabContentEl == null ? void 0 : tabContentEl.innerHTML.trim()) != null ? _a3 : "";
        });
        if (handle && contents) {
          this.cache.set(handle, contents);
        }
      });
      __publicField(this, "handleIntersection", async (entries, observer2) => {
        try {
          if (!entries[0].isIntersecting) {
            return;
          }
          observer2.unobserve(this);
          const { xoSectionId } = this.props;
          const triggerEls = Array.from(this.querySelectorAll(WebComponent.CollectionTabsTrigger));
          each(triggerEls, async (triggerEl, index) => {
            if (index >= 10) {
              return;
            }
            const handle = triggerEl.getAttribute("xo-handle");
            const active = attrBoolean.get(triggerEl, "xo-active");
            if (handle && !active && !this.cache.has(handle)) {
              const contents = await getCollectionContents(handle, xoSectionId);
              this.cache.set(handle, contents);
            }
          });
        } catch (err) {
          console.error(err);
        }
      });
    }
    mount() {
      this.handleInit();
      if (!window.Shopify.designMode) {
        this.intersectionObserver = new IntersectionObserver(this.handleIntersection, { rootMargin: "0px 0px 400px 0px" });
        this.intersectionObserver.observe(this);
      }
      document.addEventListener("click", this.handleClick);
    }
    stateUpdate(prevState) {
      const { isLoading, contents } = this.state;
      this.setProps({ xoLoading: isLoading });
      const tabContentEls = Array.from(this.querySelectorAll(WebComponent.CollectionTabsContent));
      each(tabContentEls, (tabContentEl, index) => {
        var _a2;
        const content = contents[index];
        const prevContent = (_a2 = prevState.contents) == null ? void 0 : _a2[index];
        if (prevContent !== content && (tabContentEl == null ? void 0 : tabContentEl.innerHTML) !== content) {
          tabContentEl.innerHTML = content;
        }
      });
    }
    unmount() {
      var _a2;
      (_a2 = this.intersectionObserver) == null ? void 0 : _a2.disconnect();
      document.removeEventListener("click", this.handleClick);
    }
  }, __publicField(_aa, "propTypes", {
    xoSectionId: "string"
  }), __publicField(_aa, "defaultProps", {}), _aa);
  CollectionTabs = __decorate([
    customElements$1(WebComponent.CollectionTabs)
  ], CollectionTabs);
  const styles$4 = "";
  const styles$3 = "";
  const callbacks = {};
  let iframeId = 0;
  const subscribed = {};
  function addYoutubeEventListener(iframe, callback) {
    if (iframeId === 0) {
      window.addEventListener("message", (e) => {
        if (e.origin !== "https://www.youtube.com" || !e.data) {
          return;
        }
        try {
          const data = JSON.parse(e.data);
          subscribed[data.id] = true;
          if (data.event !== "onStateChange")
            return;
          const cb = callbacks[data.id];
          cb == null ? void 0 : cb(data);
        } catch (error) {
          console.error("Failed to parse message data", error);
        }
      }, true);
    }
    iframeId++;
    callbacks[iframeId] = callback;
    subscribed[iframeId] = false;
    const currentFrameId = iframeId;
    const doSubscribe = () => {
      const messages = [
        {
          event: "listening",
          id: currentFrameId,
          channel: "widget"
        },
        {
          event: "command",
          func: "addEventListener",
          args: ["onStateChange"],
          id: currentFrameId,
          channel: "widget"
        }
      ];
      messages.forEach((message) => {
        var _a2;
        (_a2 = iframe.contentWindow) == null ? void 0 : _a2.postMessage(JSON.stringify(message), "https://www.youtube.com");
      });
    };
    iframe.addEventListener("load", () => {
      let tries = 0;
      const checkSubscribed = () => {
        if (!subscribed[currentFrameId]) {
          tries++;
          if (tries < 100) {
            doSubscribe();
          } else {
            console.warn(`Unable to subscribe ${currentFrameId}`);
          }
        }
      };
      doSubscribe();
      setTimeout(checkSubscribed, 100);
    }, true);
    return () => {
      delete callbacks[currentFrameId];
      delete subscribed[currentFrameId];
    };
  }
  function addVimeoEventListener(iframe, callback) {
    window.addEventListener("message", (event) => {
      var _a2;
      if (event.origin !== "https://player.vimeo.com" || iframe.contentWindow !== event.source) {
        return;
      }
      if (typeof event.data === "string" && event.data.includes("ready")) {
        (_a2 = iframe.contentWindow) == null ? void 0 : _a2.postMessage({ method: "addEventListener", value: "play" }, "https://player.vimeo.com");
      }
      if (event.data.event === "play") {
        callback();
      }
    });
  }
  let IntersectionVideo = (_ba = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "getAutoplay", (el) => {
        if (!el) {
          return false;
        }
        if (el.tagName === "VIDEO") {
          return el.autoplay;
        }
        if (el.tagName === "IFRAME") {
          return el.src.includes("autoplay=1");
        }
        return false;
      });
      __publicField(this, "handleIntersection", (entries) => {
        const { xoThreshold } = this.props;
        entries.forEach((entry) => {
          const videoEl = entry.target.querySelector("video, iframe");
          if (entry.isIntersecting && entry.intersectionRatio >= xoThreshold) {
            if (this.getAutoplay(videoEl)) {
              playVideo(videoEl);
            }
          } else {
            pauseVideo(videoEl);
          }
        });
      });
      __publicField(this, "handlePauseAll", () => {
        const currentVideoEl = this.querySelector("video, iframe");
        const videoEls = Array.from(document.querySelectorAll(`${WebComponent.IntersectionVideo} video, ${WebComponent.IntersectionVideo} iframe`));
        each(videoEls, (videoEl) => {
          if (videoEl !== currentVideoEl) {
            pauseVideo(videoEl);
          }
        });
      });
    }
    async mount() {
      const { xoThreshold } = this.props;
      await delay(1e3);
      this.intersectionObserver = new IntersectionObserver(this.handleIntersection, {
        threshold: xoThreshold
      });
      this.intersectionObserver.observe(this);
      const videoEl = this.querySelector("video, iframe");
      if (isYoutube(videoEl.src)) {
        addYoutubeEventListener(videoEl, (data) => {
          const isPlay = data.info === 1;
          if (isPlay) {
            this.handlePauseAll();
          }
        });
      } else if (isVimeo(videoEl.src)) {
        addVimeoEventListener(videoEl, () => {
          this.handlePauseAll();
        });
      } else {
        videoEl == null ? void 0 : videoEl.addEventListener("play", () => {
          this.handlePauseAll();
        });
      }
    }
    unmount() {
      var _a2;
      (_a2 = this.intersectionObserver) == null ? void 0 : _a2.disconnect();
    }
  }, __publicField(_ba, "propTypes", {
    xoThreshold: "number"
  }), __publicField(_ba, "defaultProps", {
    xoThreshold: 0.75
  }), _ba);
  IntersectionVideo = __decorate([
    customElements$1(WebComponent.IntersectionVideo)
  ], IntersectionVideo);
  function createStore() {
    xoStore.create("xo-viewed-products", {
      initialState: [],
      useStorage: true
    });
    xoStore.create("xo-compare-products", {
      initialState: [],
      useStorage: true
    });
    xoStore.create("xo-wishlist-products", {
      initialState: [],
      useStorage: true
    });
    xoStore.create("xo-bundle-products", {
      initialState: {}
    });
    xoStore.create("xo-viewed-products-limit", {
      initialState: 50
    });
    xoStore.create("xo-compare-products-limit", {
      initialState: 4
    });
    xoStore.create("xo-wishlist-products-limit", {
      initialState: Infinity
    });
    xoStore.create("xo-bundle-products-limit", {
      initialState: {}
    });
  }
  function addProduct(type, id2) {
    if (type === "viewed") {
      xoStore.set("xo-viewed-products", (prevState) => {
        const limit = xoStore.get("xo-viewed-products-limit");
        const limited = prevState.length >= limit;
        if (prevState.includes(id2)) {
          return prevState;
        }
        return [id2, ...limited ? prevState.filter((_, index) => index < prevState.length - 1) : prevState];
      });
    } else if (type === "bundle") {
      const sectionId = getShopifySectionId(this);
      xoStore.set(`xo-bundle-products`, (prevState) => {
        var _a2, _b2;
        if ((_a2 = prevState[sectionId]) == null ? void 0 : _a2.includes(id2)) {
          return {
            ...prevState,
            [sectionId]: (prevState[sectionId] || []).filter((itemId) => itemId !== id2)
          };
        }
        const limit = (_b2 = xoStore.get(`xo-bundle-products-limit`)[sectionId]) != null ? _b2 : 3;
        const limited = (prevState[sectionId] || []).length >= limit;
        if (!limited) {
          return {
            ...prevState,
            [sectionId]: [...prevState[sectionId] || [], id2]
          };
        }
        return prevState;
      });
    } else {
      xoStore.set(`xo-${type}-products`, (prevState) => {
        if (prevState.includes(id2)) {
          return prevState.filter((itemId) => itemId !== id2);
        }
        const limit = xoStore.get(`xo-${type}-products-limit`);
        const limited = prevState.length >= limit;
        if (!limited) {
          return [...prevState, id2];
        }
        return prevState;
      });
    }
  }
  function removeProduct(type, id2) {
    if (type === "bundle") {
      const sectionId = getShopifySectionId(this);
      xoStore.set(`xo-bundle-products`, (prevState) => {
        return {
          ...prevState,
          [sectionId]: (prevState[sectionId] || []).filter((itemId) => itemId !== id2)
        };
      });
    } else {
      xoStore.set(`xo-${type}-products`, (prevState) => {
        return prevState.filter((itemId) => itemId !== id2);
      });
    }
  }
  function clearProducts(type) {
    if (type === "bundle") {
      const sectionId = getShopifySectionId(this);
      xoStore.set(`xo-bundle-products`, (prevState) => {
        return {
          ...prevState,
          [sectionId]: []
        };
      });
    } else {
      xoStore.set(`xo-${type}-products`, []);
    }
  }
  function setProductsLimit(type, limit) {
    if (type === "bundle") {
      const sectionId = getShopifySectionId(this);
      xoStore.set(`xo-bundle-products-limit`, (prevState) => {
        return {
          ...prevState,
          [sectionId]: limit
        };
      });
    } else {
      xoStore.set(`xo-${type}-products-limit`, limit);
    }
  }
  function getCurrentIds(ids, page, pageLimit) {
    if (pageLimit === Infinity) {
      return ids;
    }
    const start = (page - 1) * pageLimit;
    const end = start + pageLimit;
    return ids.slice(start, end);
  }
  function getPage() {
    var _a2, _b2;
    const page = (_b2 = (_a2 = queryString.parse(window.location.search, true)) == null ? void 0 : _a2.page) != null ? _b2 : 1;
    return page;
  }
  async function readContent(sectionId, ids, pageLimit) {
    let page = 1;
    const pageParam = getPage();
    if (pageLimit === Infinity) {
      page = pageParam;
    }
    const fetchParams = getCurrentIds(ids, pageParam, pageLimit).reduce((acc, id2, index) => {
      return acc + `${index === 0 ? "" : " OR "}id:${id2}`;
    }, `section_id=${sectionId}&page=${page}&type=product&q=`);
    const res = await fetch(`/search?${fetchParams}`);
    const data = await res.text();
    return data;
  }
  async function readPaginate(sectionId, ids) {
    return readContent(sectionId, ids, Infinity);
  }
  const ORDER_ATTR = WebComponent.ProductsFetcher + "-order";
  const SCROLL_ATTR = WebComponent.ProductsFetcher + "-scroll";
  let ProductsFetcher = (_ca = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        ids: [],
        ready: false
      });
      __publicField(this, "intersectionObserver", null);
      __publicField(this, "scrollEl", this.querySelector(`[${SCROLL_ATTR}]`));
      __publicField(this, "st", 0);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "removeAnimate", (doc) => {
        const animateAttrEls = Array.from(doc.querySelectorAll('[xo-animate="scroll"]'));
        const animateEls = Array.from(doc.querySelectorAll(WebComponent.Animate));
        each(animateAttrEls, (animateEl) => {
          animateEl.setAttribute("xo-animate", "none");
        });
        each(animateEls, (animateEl) => {
          attrBoolean.set(animateEl, "xo-disabled", true);
        });
        return doc;
      });
      __publicField(this, "renderContent", async () => {
        var _a2, _b2;
        try {
          const { xoType, xoName, xoPageLimit } = this.props;
          const sectionId = getShopifySectionId(this);
          const { ids } = this.state;
          const content = await readContent(sectionId, ids, xoPageLimit);
          let doc = new DOMParser().parseFromString(content, "text/html");
          doc = this.removeAnimate(doc);
          const newHtml = (_b2 = (_a2 = doc.querySelector(`${WebComponent.ProductsFetcher}[xo-type="${xoType}"]${xoName ? `[xo-name="${xoName}"]` : ""}`)) == null ? void 0 : _a2.innerHTML.trim()) != null ? _b2 : "";
          if (this.innerHTML !== newHtml) {
            this.innerHTML = newHtml;
            this.handleOrder();
            if (this.scrollEl) {
              this.scrollEl.scrollTop = this.st;
            }
          }
          this.setProps({ xoLoading: false });
        } catch {
          this.setProps({ xoLoading: false });
        }
      });
      __publicField(this, "handleIntersection", (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.state.ready) {
          this.setState({ ready: true });
        }
      });
      __publicField(this, "handleOrder", () => {
        const { ids } = this.state;
        each(ids, (id2, index) => {
          var _a2;
          const orderEl = this.querySelector(`[${ORDER_ATTR}="${id2}"]`);
          (_a2 = orderEl == null ? void 0 : orderEl.style) == null ? void 0 : _a2.setProperty("order", `${index + 1}`);
        });
      });
      __publicField(this, "handleScroll", () => {
        var _a2, _b2;
        this.st = (_b2 = (_a2 = this.scrollEl) == null ? void 0 : _a2.scrollTop) != null ? _b2 : this.st;
      });
      __publicField(this, "autoPrev", () => {
        const page = getPage();
        if (page > 1) {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("page", `${page - 1}`);
          window.location.href = newUrl.href;
        }
      });
      __publicField(this, "removeRedundant", () => {
        const { xoPageLimit, xoType } = this.props;
        const { ids } = this.state;
        const page = getPage();
        const currentIds = getCurrentIds(ids, page, xoPageLimit);
        const hasRealId = !!this.querySelector(`[${ORDER_ATTR}]`);
        if (!hasRealId) {
          return;
        }
        const realIds = Array.from(this.querySelectorAll(`[${ORDER_ATTR}]`)).map((el) => el.getAttribute(ORDER_ATTR));
        const redundantIds = currentIds.filter((item) => !realIds.includes(item));
        if (redundantIds.length > 0) {
          each(redundantIds, (id2) => {
            removeProduct.call(this, xoType, id2);
          });
        }
      });
    }
    mount() {
      var _a2, _b2;
      const { xoType, xoLimit } = this.props;
      const sectionId = getShopifySectionId(this);
      if (!sectionId) {
        return;
      }
      if (xoLimit != null) {
        setProductsLimit.call(this, xoType, xoLimit);
      }
      if (!xoType) {
        return;
      }
      this.setProps({ xoLoading: true });
      this.intersectionObserver = new IntersectionObserver(this.handleIntersection, { rootMargin: "0px 0px 400px 0px" });
      this.intersectionObserver.observe((_a2 = this.closest('[id^="shopify-section-template--"]')) != null ? _a2 : this);
      if (xoType === "bundle") {
        this.unsubscribe = xoStore.subscribe("xo-bundle-products", (data) => {
          var _a3;
          const ids = (_a3 = data[sectionId]) != null ? _a3 : [];
          this.setState({ ids });
        });
      } else {
        this.unsubscribe = xoStore.subscribe(`xo-${xoType}-products`, (ids) => {
          this.setState({ ids });
        });
      }
      (_b2 = this.scrollEl) == null ? void 0 : _b2.addEventListener("scroll", this.handleScroll);
    }
    async stateUpdate() {
      const { xoModalName, xoPageLimit } = this.props;
      const { ids, ready } = this.state;
      if (!ready) {
        return;
      }
      const page = getPage();
      if (getCurrentIds(ids, page, xoPageLimit).length === 0) {
        this.autoPrev();
        this.setProps({ xoEmpty: true });
        if (xoModalName) {
          xoModal.close(xoModalName);
        }
      } else {
        this.setProps({ xoEmpty: false });
        if (xoModalName) {
          xoModal.open(xoModalName);
        }
      }
      await this.renderContent();
      this.removeRedundant();
    }
    unmount() {
      var _a2, _b2;
      this.unsubscribe();
      (_a2 = this.intersectionObserver) == null ? void 0 : _a2.disconnect();
      (_b2 = this.scrollEl) == null ? void 0 : _b2.removeEventListener("scroll", this.handleScroll);
    }
  }, __publicField(_ca, "propTypes", {
    xoType: "string",
    xoEmpty: "boolean",
    xoLoading: "boolean",
    xoName: "string",
    xoModalName: "string",
    xoLimit: "number",
    xoPageLimit: "number"
  }), __publicField(_ca, "defaultProps", {
    xoEmpty: false,
    xoLoading: false,
    xoPageLimit: Infinity
  }), _ca);
  ProductsFetcher = __decorate([
    customElements$1(WebComponent.ProductsFetcher)
  ], ProductsFetcher);
  let ProductsFetcherAdd = (_da = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        active: false,
        limit: 0,
        size: 0
      });
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "unsubscribe2", () => {
      });
      __publicField(this, "handleClick", () => {
        const { xoProductId } = this.productEl.getOptions();
        const { xoType } = this.props;
        addProduct.call(this, xoType, xoProductId);
      });
    }
    mount() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.ProductsFetcherAdd} must be in ${WebComponent.Product}`);
      }
      const { xoType } = this.props;
      if (!xoType) {
        return;
      }
      const { xoProductId } = this.productEl.getOptions();
      const sectionId = getShopifySectionId(this);
      this.addEventListener("click", this.handleClick);
      if (xoType === "bundle") {
        this.unsubscribe = xoStore.subscribe(`xo-bundle-products`, (data) => {
          var _a2;
          const ids = (_a2 = data[sectionId]) != null ? _a2 : [];
          this.setState({ active: ids.includes(xoProductId), size: ids.length });
        });
        this.unsubscribe2 = xoStore.subscribe(`xo-bundle-products-limit`, (data) => {
          var _a2;
          const limit = (_a2 = data[sectionId]) != null ? _a2 : 3;
          this.setState({ limit });
        });
      } else {
        this.unsubscribe = xoStore.subscribe(`xo-${xoType}-products`, (ids) => {
          this.setState({ active: ids.includes(xoProductId), size: ids.length });
        });
        this.unsubscribe2 = xoStore.subscribe(`xo-${xoType}-products-limit`, (limit) => {
          this.setState({ limit });
        });
      }
    }
    stateUpdate(prevState) {
      const { active, limit, size } = this.state;
      if (prevState.active !== active) {
        this.setProps({ xoAdded: active });
      }
      this.setProps({ xoLimited: size >= limit });
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
      this.unsubscribe();
      this.unsubscribe2();
    }
  }, __publicField(_da, "propTypes", {
    xoType: "string",
    xoAdded: "boolean",
    xoLimited: "boolean"
  }), __publicField(_da, "defaultProps", {
    xoAdded: false,
    xoLimited: false
  }), _da);
  ProductsFetcherAdd = __decorate([
    customElements$1(WebComponent.ProductsFetcherAdd)
  ], ProductsFetcherAdd);
  let ProductsFetcherRemove = (_ea = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "productEl", this.closest(WebComponent.Product));
      __publicField(this, "handleClick", () => {
        const { xoType } = this.props;
        const { xoProductId } = this.productEl.getOptions();
        this.setProps({ xoLoading: true });
        removeProduct.call(this, xoType, xoProductId);
      });
    }
    mount() {
      if (!this.productEl) {
        throw new Error(`${WebComponent.ProductsFetcherRemove} must be in ${WebComponent.Product}`);
      }
      const { xoType } = this.props;
      if (!xoType) {
        return;
      }
      this.addEventListener("click", this.handleClick);
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
    }
  }, __publicField(_ea, "propTypes", {
    xoType: "string",
    xoLoading: "boolean"
  }), __publicField(_ea, "defaultProps", {}), _ea);
  ProductsFetcherRemove = __decorate([
    customElements$1(WebComponent.ProductsFetcherRemove)
  ], ProductsFetcherRemove);
  let ProductsFetcherClear = (_fa = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "handleClick", () => {
        const { xoType } = this.props;
        clearProducts.call(this, xoType);
      });
    }
    mount() {
      const { xoType } = this.props;
      if (!xoType) {
        return;
      }
      const sectionId = getShopifySectionId(this);
      this.addEventListener("click", this.handleClick);
      if (xoType === "bundle") {
        this.unsubscribe = xoStore.subscribe(`xo-bundle-products`, (data) => {
          var _a2;
          const ids = (_a2 = data[sectionId]) != null ? _a2 : [];
          this.setProps({ xoEmpty: ids.length === 0 });
        });
      } else {
        this.unsubscribe = xoStore.subscribe(`xo-${xoType}-products`, (ids) => {
          this.setProps({ xoEmpty: ids.length === 0 });
        });
      }
    }
    unmount() {
      this.removeEventListener("click", this.handleClick);
      this.unsubscribe();
    }
  }, __publicField(_fa, "propTypes", {
    xoType: "string",
    xoEmpty: "boolean"
  }), __publicField(_fa, "defaultProps", {
    xoEmpty: false
  }), _fa);
  ProductsFetcherClear = __decorate([
    customElements$1(WebComponent.ProductsFetcherClear)
  ], ProductsFetcherClear);
  let ProductsFetcherSize = (_ga = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "unsubscribe", () => {
      });
    }
    mount() {
      const { xoType } = this.props;
      if (!xoType) {
        return;
      }
      const sectionId = getShopifySectionId(this);
      if (xoType === "bundle") {
        this.unsubscribe = xoStore.subscribe(`xo-bundle-products`, (data) => {
          var _a2;
          const ids = (_a2 = data[sectionId]) != null ? _a2 : [];
          this.innerHTML = `${ids.length}`;
          this.setProps({ xoEmpty: ids.length === 0 });
        });
      } else {
        this.unsubscribe = xoStore.subscribe(`xo-${xoType}-products`, (ids) => {
          this.innerHTML = `${ids.length}`;
          this.setProps({ xoEmpty: ids.length === 0 });
        });
      }
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_ga, "propTypes", {
    xoType: "string",
    xoEmpty: "boolean"
  }), __publicField(_ga, "defaultProps", {
    xoEmpty: false
  }), _ga);
  ProductsFetcherSize = __decorate([
    customElements$1(WebComponent.ProductsFetcherSize)
  ], ProductsFetcherSize);
  let ProductsFetcherPaginate = (_ha = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        ids: []
      });
      __publicField(this, "unsubscribe", () => {
      });
      __publicField(this, "renderContent", async () => {
        var _a2, _b2;
        try {
          const sectionId = getShopifySectionId(this);
          const { ids } = this.state;
          const content = await readPaginate(sectionId, ids);
          const doc = new DOMParser().parseFromString(content, "text/html");
          const newHtml = (_b2 = (_a2 = doc.querySelector(WebComponent.ProductsFetcherPaginate)) == null ? void 0 : _a2.innerHTML) != null ? _b2 : "";
          if (this.innerHTML !== newHtml) {
            this.innerHTML = newHtml;
          }
        } catch (err) {
          console.error(err);
        }
      });
    }
    mount() {
      const { xoType } = this.props;
      const sectionId = getShopifySectionId(this);
      if (!sectionId) {
        return;
      }
      if (xoType === "bundle") {
        this.unsubscribe = xoStore.subscribe("xo-bundle-products", (data) => {
          var _a2;
          const ids = (_a2 = data[sectionId]) != null ? _a2 : [];
          this.setState({ ids });
        });
      } else {
        this.unsubscribe = xoStore.subscribe(`xo-${xoType}-products`, (ids) => {
          this.setState({ ids });
        });
      }
    }
    stateUpdate() {
      this.renderContent();
    }
    unmount() {
      this.unsubscribe();
    }
  }, __publicField(_ha, "propTypes", {
    xoType: "string"
  }), __publicField(_ha, "defaultProps", {}), _ha);
  ProductsFetcherPaginate = __decorate([
    customElements$1(WebComponent.ProductsFetcherPaginate)
  ], ProductsFetcherPaginate);
  createStore();
  let count = 0;
  let PhotoSwipe = (_ia = class extends XoComponent {
    constructor() {
      super();
      __publicField(this, "cssId", `${WebComponent.Photoswipe}-css`);
      __publicField(this, "jsLightboxId", `${WebComponent.Photoswipe}-lightbox-js`);
      __publicField(this, "jsId", `${WebComponent.Photoswipe}-js`);
      __publicField(this, "cssFile", "https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.min.css");
      __publicField(this, "jsFile", "https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/umd/photoswipe.umd.min.js");
      __publicField(this, "jsLightboxFile", "https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/umd/photoswipe-lightbox.umd.min.js");
      __publicField(this, "photoswipeId", "");
      __publicField(this, "lightbox", null);
      __publicField(this, "handlePhotoswipe", () => {
        this.lightbox = new window.PhotoSwipeLightbox({
          children: "a",
          ...this.props.xoOptions,
          gallery: `#${this.photoswipeId}`,
          pswpModule: window.PhotoSwipe
        });
        this.lightbox.init();
      });
      __publicField(this, "handler", async () => {
        if (!document.querySelector(`#${this.cssId}`)) {
          loadStyle({ id: this.cssId, file: this.cssFile });
          await Promise.all([loadScript({ id: this.jsId, file: this.jsFile }), loadScript({ id: this.jsLightboxId, file: this.jsLightboxFile })]);
        }
        this.handlePhotoswipe();
      });
      count++;
      this.photoswipeId = `xo-photoswipe-${count}`;
    }
    mount() {
      this.id = this.photoswipeId;
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          this.handler();
        }, { timeout: 3e3 });
      } else {
        setTimeout(() => {
          this.handler();
        }, 4e3);
      }
    }
    unmount() {
      var _a2;
      (_a2 = this.lightbox) == null ? void 0 : _a2.destroy();
      this.lightbox = null;
    }
  }, __publicField(_ia, "propTypes", {
    xoOptions: "object"
  }), __publicField(_ia, "defaultProps", {
    xoOptions: {}
  }), _ia);
  PhotoSwipe = __decorate([
    customElements$1(WebComponent.Photoswipe),
    __metadata("design:paramtypes", [])
  ], PhotoSwipe);
  const styles$2 = "";
  const globalData = {};
  const EVENT_NAME = "xo:globalFunction:mount";
  document.addEventListener(EVENT_NAME, () => {
    const el = document.querySelector(WebComponent.GlobalFunction);
    const els = document.querySelectorAll(`${WebComponent.GlobalFunction}:not([xo-ready])`);
    if (el && els.length === 0) {
      Object.entries(globalData).forEach(([method, fns]) => {
        window[method] = (targetProductId, content) => {
          fns.forEach((fn) => {
            fn(targetProductId, content);
          });
        };
      });
    }
  });
  let GlobalFunction = (_ja = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "update", (targetProductId, content) => {
        const { xoNodeBinding } = this.props;
        const bindingItems = xoNodeBinding.split(/,\s*/g);
        each(bindingItems, (item) => {
          var _a2, _b2;
          if (!/\[|\]/g.test(item)) {
            return;
          }
          const selector = item.replace(/\[.*/g, "").trim();
          const valueBinding = item.replace(/.*\[|\]/g, "").trim();
          const vals = valueBinding.split("=").flatMap((item2, _, arr) => {
            if (item2 === "children") {
              return item2;
            }
            if (arr.length === 1) {
              return [item2, "true"];
            }
            return item2;
          });
          const els = Array.from((_b2 = (_a2 = this.closest(`xo-product[xo-product-id="${targetProductId}"]`)) == null ? void 0 : _a2.querySelectorAll(`${WebComponent.GlobalFunction} ${selector}`)) != null ? _b2 : []);
          each(els, (el) => {
            if (vals.length === 1) {
              el.innerHTML = content;
            }
            if (vals.length === 2) {
              const [name, value] = vals;
              el.setAttribute(name, value);
            }
          });
        });
      });
    }
    mount() {
      const { xoFunction } = this.props;
      if (!globalData[xoFunction]) {
        globalData[xoFunction] = [];
      }
      globalData[xoFunction].push(this.update);
      this.setProps({ xoReady: true });
      document.dispatchEvent(new CustomEvent(EVENT_NAME, { bubbles: true }));
    }
  }, __publicField(_ja, "propTypes", {
    xoFunction: "string",
    xoNodeBinding: "string",
    xoReady: "boolean"
  }), __publicField(_ja, "defaultProps", {
    xoNodeBinding: ""
  }), _ja);
  GlobalFunction = __decorate([
    customElements$1(WebComponent.GlobalFunction)
  ], GlobalFunction);
  let Item = class Item2 extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "carouselItem", null);
      __publicField(this, "masonryItemBase", null);
    }
    mount() {
      this.carouselItem = new CarouselItem(this);
      this.carouselItem.mount();
      this.masonryItemBase = new MasonryItemBase(this);
      this.masonryItemBase.mount();
    }
    unmount() {
      var _a2, _b2;
      (_a2 = this.carouselItem) == null ? void 0 : _a2.unmount();
      (_b2 = this.masonryItemBase) == null ? void 0 : _b2.unmount();
    }
  };
  Item = __decorate([
    customElements$1(WebComponent.Item)
  ], Item);
  const styles$1 = "";
  const DURATION = 200;
  const MAX_PERCENT = 100;
  const RESIZE_DELAY = 300;
  let GridHoverExpand = (_ka = class extends XoComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        column: 1
      });
      __publicField(this, "controller", new AbortController());
      __publicField(this, "gridItemEls", []);
      __publicField(this, "currentEl", null);
      __publicField(this, "resizeObserver", null);
      __publicField(this, "prevWidth", 0);
      __publicField(this, "handleExpand", (gridItemEl) => {
        const { column } = this.state;
        if (column === 1) {
          return;
        }
        const width = this.offsetWidth / (column + 1);
        const otherWidth = this.offsetWidth / column;
        const withPercent = MAX_PERCENT * width / this.offsetWidth;
        const otherWidthPercent = MAX_PERCENT * otherWidth / this.offsetWidth;
        if (gridItemEl === this.currentEl) {
          gridItemEl.style.setProperty("width", `${withPercent * 2}%`, "important");
          attrBoolean.set(gridItemEl, "xo-active", true);
        } else {
          const { top: currentTop } = this.currentEl.getBoundingClientRect();
          const row = gridItemEl.getBoundingClientRect().top === currentTop;
          if (row) {
            gridItemEl.style.setProperty("width", `${withPercent}%`, "important");
          } else {
            gridItemEl.style.setProperty("width", `${otherWidthPercent}%`, "important");
          }
          attrBoolean.set(gridItemEl, "xo-active", false);
        }
      });
      __publicField(this, "handler", debounce(() => {
        each(this.gridItemEls, (gridItemEl) => {
          this.handleExpand(gridItemEl);
        });
      }, DURATION * 3 / 4));
      __publicField(this, "handleMouseEnter", (event) => {
        this.currentEl = event.currentTarget;
        this.handler();
      });
      __publicField(this, "setColumn", () => {
        var _a2;
        const max = 99999;
        const xs = window.getComputedStyle(this).getPropertyValue("--xs");
        const sm = window.getComputedStyle(this).getPropertyValue("--sm") || xs;
        const md = window.getComputedStyle(this).getPropertyValue("--md") || sm;
        const lg = window.getComputedStyle(this).getPropertyValue("--lg") || md;
        const breakpoints = {
          575: { col: xs },
          767: { col: sm },
          991: { col: md },
          [max]: { col: lg }
        };
        this.setState({
          column: Number(((_a2 = getBreakpointsOptions(breakpoints)) == null ? void 0 : _a2.col) || "1")
        });
      });
      __publicField(this, "start", () => {
        const { xoActiveIndex } = this.props;
        if (xoActiveIndex != null) {
          this.currentEl = this.gridItemEls[xoActiveIndex];
          this.handler();
        }
      });
      __publicField(this, "handleResize", debounce((entries) => {
        for (let entry of entries) {
          const currentWidth = entry.contentRect.width;
          if (currentWidth !== this.prevWidth) {
            each(this.gridItemEls, (gridItemEl) => {
              gridItemEl.style.removeProperty("width");
            });
            this.setColumn();
            this.start();
            this.prevWidth = currentWidth;
          }
        }
      }, RESIZE_DELAY));
    }
    mount() {
      if (isMobile.any) {
        return;
      }
      this.gridItemEls = Array.from(this.children);
      this.setColumn();
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this);
      this.start();
      each(this.gridItemEls, (gridItemEl) => {
        gridItemEl.style.transition = `${DURATION}ms`;
        gridItemEl.addEventListener("mouseenter", this.handleMouseEnter, { signal: this.controller.signal });
      });
    }
    unmount() {
      this.controller.abort();
    }
  }, __publicField(_ka, "propTypes", {
    xoActiveIndex: "number"
  }), __publicField(_ka, "defaultProps", {}), _ka);
  GridHoverExpand = __decorate([
    customElements$1(WebComponent.GridHoverExpand)
  ], GridHoverExpand);
  const styles = "";
  window.XoComponent = XoComponent;
  window.xoCustomElements = customElements$1;
  function handleRoleButton() {
    document.addEventListener("keydown", async (event) => {
      const isEnter = event.key === "Enter" || event.key === " ";
      const element = event.target;
      if (element) {
        const isButton = attrBoolean.get(element, "xo-button") || attrBoolean.get(element, "data-button") || element.getAttribute("role") === "button";
        const isCarouselThumb = element.tagName.toLowerCase() === WebComponent.CarouselSlide && element.closest(WebComponent.CarouselThumbnail);
        if (isButton && isEnter) {
          await delay();
          element.click();
        }
        if (isCarouselThumb) {
          element.click();
        }
        const link = element.getAttribute("xb-href");
        if (link && isEnter) {
          if (event.ctrlKey || event.metaKey) {
            window.open(link, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = link;
          }
        }
      }
    });
  }
  function loadLottie() {
    var _a2;
    const lottie = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.js";
    const dotlottiePlayer = document.querySelector("dotlottie-player");
    if ((_a2 = dotlottiePlayer == null ? void 0 : dotlottiePlayer.getAttribute("src")) == null ? void 0 : _a2.endsWith(".lottie")) {
      loadScript({ id: "dotlottie-player", file: lottie });
      loadStyle({ id: "dotlottie-player", content: "dotlottie-player { width: 100% !important; height: auto !important }" });
    }
  }
  function handleAnchor() {
    const anchorEls = document.querySelectorAll("a");
    anchorEls.forEach((el) => {
      const href = el.getAttribute("href");
      if (href) {
        el.setAttribute("href", getRootRoute(href));
      }
    });
  }
  async function viewedProducts() {
    var _a2, _b2;
    if (location.pathname.startsWith("/products/")) {
      if ((_b2 = (_a2 = window.meta) == null ? void 0 : _a2.product) == null ? void 0 : _b2.id) {
        addProduct("viewed", window.meta.product.id.toString());
      } else {
        const productInformationEl = document.querySelector(`${WebComponent.Product}[xo-product-information]`);
        const productId = productInformationEl == null ? void 0 : productInformationEl.getAttribute("xo-product-id");
        if (productId) {
          addProduct("viewed", productId);
        }
      }
    }
  }
  function measure() {
    function handler(currentTarget) {
      const parentSelector = currentTarget.getAttribute("xo-measure-parent-selector");
      const parentEl = parentSelector ? currentTarget.closest(parentSelector) : null;
      const currentOffset = offset(currentTarget);
      const parentOffset = parentEl ? offset(parentEl) : { top: 0, left: 0 };
      const top = currentOffset.top - parentOffset.top;
      const left = currentOffset.left - parentOffset.left;
      const { width, height } = currentTarget.getBoundingClientRect();
      currentTarget.style.setProperty("--xo-top", top.toString());
      currentTarget.style.setProperty("--xo-left", left.toString());
      currentTarget.style.setProperty("--xo-width", width.toString());
      currentTarget.style.setProperty("--xo-height", height.toString());
      currentTarget.style.setProperty("--xo-current-left", currentOffset.left.toString());
    }
    function handleEvent(event) {
      const target = event.target;
      const currentTarget = target.closest("[xo-measure]");
      if (currentTarget) {
        handler(currentTarget);
      }
    }
    setTimeout(() => {
      const els = Array.from(document.querySelectorAll("[xo-measure]"));
      each(els, (el) => {
        handler(el);
        el.addEventListener("mouseenter", handleEvent);
      });
    }, 500);
    window.addEventListener("click", handleEvent);
  }
  function handleYtbSrc() {
    const ytbVideoEls = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
    ytbVideoEls.forEach((ytbVideoEl) => {
      if (!ytbVideoEl.src.includes("enablejsapi=")) {
        if (ytbVideoEl.src.includes("?")) {
          ytbVideoEl.src += "&enablejsapi=1";
        } else {
          ytbVideoEl.src += "?enablejsapi=1";
        }
      }
    });
  }
  DOMLoaded(() => {
    handleYtbSrc();
    handleRoleButton();
    handleAnchor();
    loadLottie();
    viewedProducts();
    measure();
  });
  const base = "";
  console.log("WC V1.7.1");
  exports2.CircleBar = CircleBar;
  exports2.cartFormSubscribe = cartFormSubscribe;
  exports2.cartSubscribe = cartSubscribe;
  exports2.fieldSignal = fieldSignal;
  exports2.getCartFormState = getCartFormState;
  exports2.getCartState = getCartState;
  exports2.xoCarousel = xoCarousel;
  exports2.xoCircleBar = xoCircleBar;
  exports2.xoCollapse = xoCollapse;
  exports2.xoFilters = xoFilters;
  exports2.xoGroup = xoGroup;
  exports2.xoModal = xoModal;
  exports2.xoPopover = xoPopover;
  exports2.xoProductQuickView = xoProductQuickView;
  exports2.xoSticky = xoSticky;
  exports2.xoStore = xoStore;
  exports2.xoTabs = xoTabs;
  exports2.xoToast = xoToast;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
