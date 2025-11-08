/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 246:
/***/ (function() {


window.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    xoGroup.on('change', ({ element, index }) => {
        const contentEl = document.querySelectorAll('.filters-content__grid');
        const filterContent = document.querySelector('xo-filters-content');
        let number = Number(element.innerHTML);
        contentEl?.forEach((element) => element.setAttribute("style", `--xs: {{ columns_mobile }}; --sm: {{ columns_mobile }}; --md: {{ columns_desktop | minus: 1 }};--lg:${number}`));
        if (filterContent) {
            filterContent.handleContent((html) => {
                const doc = new DOMParser().parseFromString(html, "text/html");
                const gridEl = doc.querySelectorAll('.filters-content__grid');
                gridEl?.forEach((element) => element.setAttribute("style", `--xs: {{ columns_mobile }}; --sm: {{ columns_mobile }}; --md: {{ columns_desktop | minus: 1 }};--lg:${number}`));
                return doc.body.innerHTML;
            });
        }
    });
});


/***/ }),

/***/ 561:
/***/ (function() {


const scrollTopEl = document.querySelector('#xo-scroll-top');
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    if (scrollPosition >= 700) {
        scrollTopEl?.classList.add('xo-active');
    }
    else {
        scrollTopEl?.classList.remove('xo-active');
    }
});


/***/ }),

/***/ 817:
/***/ (function() {


let previousSize = null;
// @ts-ignore
cartSubscribe((state) => {
    const notifyEl = document.querySelector('#xo-notify');
    if (previousSize !== null && state.size > previousSize && notifyEl) {
        notifyEl.classList.add('cart-drawer-hidden');
        const id = setTimeout(() => {
            notifyEl.classList.remove('cart-drawer-hidden');
            clearTimeout(id);
        }, 3000);
    }
    previousSize = state.size;
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/

;// ../../packages/utils/src/attrBoolean/index.ts
const attrBoolean = {
    get: (element, attr) => {
        if (element.getAttribute(attr) === 'false') {
            return false;
        }
        return element.hasAttribute(attr);
    },
    set: (element, attr, value) => {
        if (value) {
            element.setAttribute(attr, '');
        }
        else {
            element.removeAttribute(attr);
        }
    },
};

;// ../../packages/utils/src/typeOf/index.ts
function typeOf_typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
function primitive(value) {
    return value === null || (typeof value !== 'function' && typeof value !== 'object');
}
typeOf_typeOf.primitive = primitive;

;// ../../packages/utils/src/cloneDeep/index.ts

function cloneDeep_cloneDeep(value) {
    if (typeOf(value) === 'array') {
        return value.map((item) => cloneDeep_cloneDeep(item));
    }
    else if (typeOf(value) === 'object') {
        const result = {};
        for (const key in value) {
            result[key] = cloneDeep_cloneDeep(value[key]);
        }
        return result;
    }
    else {
        return value;
    }
}

;// ../../packages/utils/src/fastLoop/each.ts
function each(array, callback) {
    if (array.length === 0) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

;// ../../packages/utils/src/objectKeys/index.ts
const objectKeys = (obj) => {
    return Object.keys(obj);
};

;// ../../packages/utils/src/componentDefine/index.ts


function componentDefine(components, options) {
    each(objectKeys(components), (name) => {
        if (!customElements.get(name)) {
            customElements.define(name, components[name], options);
        }
    });
}

;// ../../packages/utils/src/delay/index.ts
function delay(ms = 0) {
    return new Promise((resolve) => {
        const timeId = window.setTimeout(() => {
            const clear = () => window.clearTimeout(timeId);
            resolve(clear);
            clearTimeout(timeId);
        }, ms);
    });
}

;// ../../packages/utils/src/fastLoop/filter.ts
function filter_filter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

;// ../../packages/utils/src/Emitter/implement.ts


class Emitter {
    id;
    events;
    constructor() {
        this.id = 0;
        this.events = {};
    }
    on(eventType, listener) {
        this.id++;
        this.events = {
            ...this.events,
            [eventType]: [
                ...(this.events[eventType] || []),
                {
                    listener,
                    id: this.id,
                },
            ],
        };
        return this.id;
    }
    off(id) {
        for (const eventType in this.events) {
            this.events = {
                ...this.events,
                [eventType]: filter_filter(this.events[eventType], (item) => item.id !== id),
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

;// ../../packages/utils/src/createAnimate/implement.ts


function createAnimate() {
    const event = new Emitter();
    let startId = -1;
    let moveId = -1;
    let endId = -1;
    let value = 0;
    let timeId = -1;
    let animationFrameId = -1;
    function animated({ to, from, duration = 1000, friction = 1, reverseEasing = false, easing, onStart, onUpdate, onEnd }) {
        let start = null;
        value = from;
        onStart?.(value);
        (async () => {
            await delay();
            event.emit('start', value);
        })();
        cancelAnimationFrame(animationFrameId);
        function step(timestamp) {
            if (!start) {
                start = timestamp;
            }
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            value = from + (to - from) * percentage * friction;
            if (typeof easing === 'function') {
                if (reverseEasing) {
                    value = from + (to - from) * (1 - easing(1 - percentage));
                }
                else {
                    value = from + (to - from) * easing(percentage);
                }
            }
            event.emit('update', value);
            onUpdate?.(value);
            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        }
        animationFrameId = requestAnimationFrame(step);
        timeId = window.setTimeout(() => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeId);
            value = to;
            onUpdate?.(value);
            onEnd?.(value);
            event.emit('update', value);
            event.emit('end', value);
        }, duration);
        return () => {
            clearTimeout(timeId);
            cancelAnimationFrame(animationFrameId);
        };
    }
    animated.onStart = (onStart) => {
        startId = event.on('start', onStart);
        return () => event.off(startId);
    };
    animated.onUpdate = (onUpdate) => {
        moveId = event.on('update', onUpdate);
        return () => event.off(moveId);
    };
    animated.onEnd = (onEnd) => {
        endId = event.on('end', onEnd);
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

;// ../../packages/utils/src/createAnimate/index.ts


;// ../../packages/utils/src/DOMLoaded/index.ts
function DOMLoaded(callback) {
    if (/comp|inter/.test(document.readyState)) {
        callback();
    }
    else if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', callback);
    }
    else {
        // @ts-ignore
        document.attachEvent('onreadystatechange', () => {
            if (document.readyState === 'complete') {
                callback();
            }
        });
    }
}

;// ../../packages/utils/src/easings/index.ts
const easings = {
    linear: (t) => t,
    ease: (t) => 0.5 * (1 - Math.cos(Math.PI * t)),
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - --t * t * t * t,
    easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t),
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
    easeInOut: (t) => (t < 0.5 ? easings.easeInBack(t * 2) / 2 : easings.easeOutBack(t * 2 - 1) / 2 + 0.5),
    easeInElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -(2 ** (10 * t - 10)) * Math.sin((t * 10 - 10.75) * c4);
    },
    easeOutElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    easeInExpo: (t) => (t === 0 ? 0 : 2 ** (10 * t - 10)),
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)),
    spring: (t) => 1 - Math.cos(t * 4.5 * Math.PI) * Math.exp(-t * 6),
    decay: (t) => 1 - Math.exp(-t * 6),
};

;// ../../packages/utils/src/equal/index.ts

function equal_equal(object1, object2) {
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
        if (typeof val1 === 'object' && typeof val2 === 'object') {
            if (!equal_equal(val1, val2)) {
                return false;
            }
        }
        else if (val1 !== val2) {
            return false;
        }
    }
    return true;
}

;// ../../packages/utils/src/fastLoop/map.ts
function map(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}

;// ../../packages/utils/src/fastLoop/index.ts






;// ../../packages/utils/src/frameManager/index.ts

class FrameManager {
    frameId;
    keepAliveFrameId;
    lastTimestamp;
    frames;
    keepAliveFrames;
    defaultTimestep;
    constructor() {
        this.frameId = null;
        this.keepAliveFrameId = null;
        this.lastTimestamp = null;
        this.frames = [];
        this.keepAliveFrames = [];
        this.defaultTimestep = (1 / 60) * 1000;
    }
    handleFrameLoop = (timestamp) => {
        if (this.lastTimestamp) {
            const delta = timestamp - this.lastTimestamp;
            each(this.keepAliveFrames, (frame) => frame.call(this, { delta, timestamp }));
        }
        this.lastTimestamp = timestamp;
        if (this.keepAliveFrameId) {
            cancelAnimationFrame(this.keepAliveFrameId);
        }
        this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop);
    };
    handleFrame = (timestamp) => {
        each(this.frames, (frame) => frame.call(this, { delta: this.defaultTimestep, timestamp }));
    };
    getFrames = () => this.frames;
    add = (frame, keepAlive = false) => {
        this.cancelFrame();
        if (!this.frames.includes(frame)) {
            this.frames.push(frame);
        }
        if (keepAlive && !this.keepAliveFrames.includes(frame)) {
            this.keepAliveFrames.push(frame);
        }
        this.start();
        return this;
    };
    start = () => {
        this.frameId = requestAnimationFrame(this.handleFrame);
        this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop);
    };
    cancelFrame = () => {
        if (this.frameId != null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
        if (this.keepAliveFrameId != null) {
            cancelAnimationFrame(this.keepAliveFrameId);
            this.keepAliveFrameId = null;
        }
    };
    stopFrame = (frames, frame) => {
        const taskIndex = frames.indexOf(frame);
        if (taskIndex !== -1) {
            frames.splice(taskIndex, 1);
        }
        if (frames.length === 0) {
            this.cancelFrame();
            this.lastTimestamp = null;
        }
    };
    remove = (frame) => {
        this.stopFrame(this.frames, frame);
        this.stopFrame(this.keepAliveFrames, frame);
        return this;
    };
    clear = () => {
        this.frames = [];
        this.keepAliveFrames = [];
        this.cancelFrame();
        this.lastTimestamp = null;
        return this;
    };
}
const frameManager = new FrameManager();

;// ../../packages/utils/src/namingConvention/index.ts
function snakeToCamel(value) {
    return value.replace(/([_]\w)/g, (g) => g[1].toUpperCase());
}
function snakeToPascal(value) {
    // eslint-disable-next-line no-useless-escape
    return value.replace(/(\-\w|\_\w)/g, (g) => g[1].toUpperCase()).replace(/^(\w)/, (g) => g[0].toUpperCase());
}
function camelToSnake(value) {
    return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
function camelToPascal(value) {
    return value.replace(/^(\w)/, (g) => g[0].toUpperCase());
}
function pascalToSnake(value) {
    return camelToSnake(value).replace(/^_/g, '');
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
    return camelToKebab(value).replace(/^-/g, '');
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
    pascalToKebab,
};

;// ../../packages/utils/src/objectParse/index.ts
function objectParse(value) {
    const val = value.trim();
    if (/^{|\[/g.test(val)) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            const fn = new Function(`return ${val}`);
            const obj = fn();
            return JSON.parse(JSON.stringify(obj));
        }
        catch {
            if (/^\[/g.test(val)) {
                return [];
            }
            return {};
        }
    }
    else {
        return {};
    }
}

;// ../../packages/utils/src/getAttrs/index.ts



function getValue(value, type) {
    switch (type) {
        case 'string':
            return value;
        case 'number':
            return Number(value);
        case 'string | number': {
            const number = Number(value);
            return isNaN(number) ? value : number;
        }
        case 'boolean':
            return value === 'true' || value === '';
        case 'object':
            return objectParse(value);
        case 'array':
            return objectParse(value);
        default:
            return value;
    }
}
/**
 * @description Get attributes from HTMLElement
 * @example
 * ```html
 * <div class="element" name="Foo" age="20" first-name="Bar"></div>
 * ```
 * @example
 * ```ts
 * import { getAttrs } from 'getAttrs';
 * const element = document.createElement('.element');
 * interface ElementAttrs {
 *   name: string;
 *   age: number;
 *   // Chú ý thuộc tính snake sẽ chuyển sang camel
 *   firstName: string;
 * }
 * const attrs = getAttrs(element, {
 *   // Các kiểu dữ liệu của các trường sẽ được convert sang
 *   types: {
 *     name: 'string',
 *     age: 'number',
 *     firstName: 'string'
 *   },
 *   // Các attr sẽ được lấy
 *   pick: ['name', 'age', 'firstName']
 * });
 * ```
 */
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
        const type = types?.[name];
        if (attr.value != null && pick?.includes(name)) {
            if (typeof propTransformer === 'function') {
                name = propTransformer(name);
            }
            if (!!types && type != null) {
                result = { ...result, [name]: getValue(attr.value, type) };
            }
            else {
                result = { ...result, [name]: attr.value };
            }
        }
    }
    return result;
}

;// ../../packages/utils/src/isMobile/index.ts


const isMobile = {
    android: !!navigator.userAgent.match(/Android/i),
    blackBerry: !!navigator.userAgent.match(/BlackBerry/i),
    ipad: !!navigator.userAgent.match(/iPad/i),
    iOS: !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
    opera: !!navigator.userAgent.match(/Opera Mini/i),
    windows: !!navigator.userAgent.match(/Windows Phone/i),
    amazonePhone: !!navigator.userAgent.match(/(?:SD4930UR|\\bSilk(?:.+)Mobile\\b)/i),
    amazoneTablet: !!navigator.userAgent.match(/Silk/i),
    any: !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Windows Phone|(?:SD4930UR|\bSilk(?:.+)Mobile\b)|Silk/i),
};
DOMLoaded(() => {
    const htmlEl = document.documentElement;
    if (isMobile.any) {
        htmlEl.classList.add('is-mobile');
        attrBoolean.set(htmlEl, 'xo-is-mobile', true);
    }
    else {
        htmlEl.classList.add('is-desktop');
        attrBoolean.set(htmlEl, 'xo-is-desktop', true);
    }
});

;// ../../packages/utils/src/objectValues/index.ts
const objectValues = (obj) => {
    return Object.values(obj);
};

;// ../../packages/utils/src/offset/index.ts
function getWindow(el) {
    return (el.nodeType === 9 && el.defaultView);
}
function offset_offset(el) {
    const doc = el?.ownerDocument;
    const docElem = doc.documentElement;
    const win = getWindow(doc);
    let box = { top: 0, left: 0 };
    if (!doc) {
        return {
            top: 0,
            left: 0,
        };
    }
    if (typeof el.getBoundingClientRect !== typeof undefined) {
        box = el.getBoundingClientRect();
    }
    return {
        top: box.top + win.scrollY - docElem.clientTop,
        left: box.left + win.scrollX - docElem.clientLeft,
    };
}

;// ../../packages/utils/src/panGesture/index.ts

class PanGesture {
    dx;
    dy;
    vx = 0;
    vy = 0;
    isStart = false;
    startX = 0;
    startX2 = 0;
    startY = 0;
    startY2 = 0;
    options;
    constructor(options) {
        this.options = options;
        this.dx = options.dx || 0;
        this.dy = options.dy || 0;
        options.element.addEventListener('mousedown', this.handleMouseDown);
        if (isMobile.any) {
            options.element.addEventListener('touchstart', this.handleMouseDown, { passive: false });
        }
    }
    handleMouseDown = (event) => {
        const { onStart } = this.options;
        if (event.type === 'touchstart' && event.touches.length > 1) {
            return;
        }
        if (event.type === 'mousedown' && event.button !== 0) {
            return;
        }
        const target = event.target;
        if (!isMobile.any && (target.closest('a') || target.closest('img'))) {
            event.preventDefault();
        }
        this.isStart = true;
        if (event.type === 'touchstart') {
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
            this.startX2 = event.touches[0].clientX;
            this.startY2 = event.touches[0].clientY;
        }
        else {
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.startX2 = event.clientX;
            this.startY2 = event.clientY;
        }
        onStart?.(event);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('touchmove', this.handleMouseMove, { passive: false });
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('touchend', this.handleMouseUp, { passive: false });
    };
    handleMouseMove = (event) => {
        const { onMove } = this.options;
        if (event.type === 'touchmove' && event.touches.length > 1) {
            return;
        }
        if (event.type === 'mousemove' && event.button !== 0) {
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
        if (event.type === 'touchmove') {
            currentX = event.touches[0].clientX;
            currentY = event.touches[0].clientY;
        }
        else {
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
        onMove?.({
            dx: this.dx,
            dy: this.dy,
            vx: this.vx,
            vy: this.vy,
            isHorizontalSwipe: Math.abs(currentX - this.startX2) * 3 > Math.abs(currentY - this.startY2),
        }, event);
    };
    handleEnd = (event, gestureState) => {
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
        onEnd?.({
            dx: this.dx,
            dy: this.dy,
            vx: this.vx,
            vy: this.vy,
        }, event);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchmove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchend', this.handleMouseUp);
    };
    handleMouseUp = (event) => {
        if (!isMobile.any) {
            event.preventDefault();
        }
        this.handleEnd(event);
    };
    setValue = ({ dx, dy }) => {
        if (dx != null) {
            this.dx = dx;
        }
        if (dy != null) {
            this.dy = dy;
        }
    };
    destroy = () => {
        this.options.element.removeEventListener('mousedown', this.handleMouseDown);
        this.options.element.removeEventListener('touchstart', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('touchmove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchend', this.handleMouseUp);
    };
}
function panGesture(options) {
    return new PanGesture(options);
}

;// ../../packages/utils/src/popper/index.ts

class Popper {
    target;
    options;
    top;
    left;
    constructor(target, options) {
        this.target = target;
        this.options = options;
        this.top = 0;
        this.left = 0;
    }
    handlePlacement = () => {
        const { element, placement, offset } = this.options;
        const { offsetWidth: targetWidth, offsetHeight: targetHeight } = this.target;
        const { top: targetTop, left: targetLeft } = offset_offset(this.target);
        const { offsetWidth: elementWidth, offsetHeight: elementHeight } = element;
        switch (placement) {
            case 'top-left':
                this.top = targetTop - elementHeight - offset;
                this.left = targetLeft;
                break;
            case 'top-center':
                this.top = targetTop - elementHeight - offset;
                this.left = targetLeft + targetWidth / 2 - elementWidth / 2;
                break;
            case 'top-right':
                this.top = targetTop - elementHeight - offset;
                this.left = targetLeft + targetWidth - elementWidth;
                break;
            case 'bottom-left':
                this.top = targetTop + targetHeight + offset;
                this.left = targetLeft;
                break;
            case 'bottom-center':
                this.top = targetTop + targetHeight + offset;
                this.left = targetLeft + targetWidth / 2 - elementWidth / 2;
                break;
            case 'bottom-right':
                this.top = targetTop + targetHeight + offset;
                this.left = targetLeft + targetWidth - elementWidth;
                break;
            case 'left-top':
                this.top = targetTop;
                this.left = targetLeft - elementWidth - offset;
                break;
            case 'left-center':
                this.top = targetTop + targetHeight / 2 - elementHeight / 2;
                this.left = targetLeft - elementWidth - offset;
                break;
            case 'left-bottom':
                this.top = targetTop + targetHeight - elementHeight;
                this.left = targetLeft - elementWidth - offset;
                break;
            case 'right-top':
                this.top = targetTop;
                this.left = targetLeft + targetWidth + offset;
                break;
            case 'right-center':
                this.top = targetTop + targetHeight / 2 - elementHeight / 2;
                this.left = targetLeft + targetWidth + offset;
                break;
            case 'right-bottom':
                this.top = targetTop + targetHeight - elementHeight;
                this.left = targetLeft + targetWidth + offset;
                break;
            default:
                break;
        }
    };
    checkBoundary = () => {
        const { element } = this.options;
        const { offsetWidth: elementWidth, offsetHeight: elementHeight } = element;
        const { clientWidth: windowWidth, clientHeight: windowHeight } = document.documentElement;
        if (this.top < window.scrollY) {
            this.top = window.scrollY;
        }
        else if (this.top + elementHeight > windowHeight + window.scrollY) {
            this.top = windowHeight + window.scrollY - elementHeight;
        }
        if (this.left < 0) {
            this.left = window.scrollX;
        }
        else if (this.left + elementWidth > windowWidth + window.scrollX) {
            this.left = windowWidth + window.scrollX - elementWidth;
        }
    };
    init = () => {
        const { element } = this.options;
        const { width: elementWidth, height: elementHeight } = element.getBoundingClientRect();
        this.handlePlacement();
        this.checkBoundary();
        return {
            top: this.top,
            left: this.left,
            width: elementWidth,
            height: elementHeight,
        };
    };
}
function popper(target, { element, placement = 'bottom-center', offset = 0 }) {
    const instance = new Popper(target, {
        element,
        placement,
        offset,
    });
    return instance.init();
}

;// ../../packages/utils/src/queryString/index.ts
function parse(value, isObject = false) {
    const result = isObject ? {} : [];
    const params = new URLSearchParams(value);
    for (const pair of params.entries()) {
        if (isObject) {
            const [key, value] = pair;
            result[key] = value;
        }
        else {
            result.push([pair[0], pair[1]]);
        }
    }
    return result;
}
function stringify(value) {
    const params = new URLSearchParams(value);
    const ampNewline = '&' + String.fromCharCode(10);
    return params
        .toString()
        .replace(/&/g, ampNewline)
        .replace(/\w.*=&?$/gm, '')
        .replace(/\n+/g, '')
        .replace(/&$/g, '');
}
const queryString = {
    parse,
    stringify,
};

;// ../../packages/utils/src/storage/index.ts
function createStore() {
    let checked = false;
    const storageAvailable = () => {
        if (!checked) {
            checked = true;
            const item = '@xoLocalStorageCheck';
            try {
                window.localStorage.setItem(item, item);
                window.localStorage.removeItem(item);
                return true;
            }
            catch {
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
            setItem() { },
            removeItem() { },
            clear() { },
            key() {
                return null;
            },
            length: 0,
        };
    };
    const storage = createStorage();
    return storage;
}
const storage_storage = createStore();

;// ../../packages/utils/src/XOStore/implement.ts




class XOStore {
    _store;
    _prevStore;
    _options;
    _listeners;
    _storageRegisters;
    _useDeepEquals;
    constructor(options = {}) {
        this._store = {};
        this._prevStore = {};
        this._listeners = {};
        this._storageRegisters = {};
        this._options = {
            logger: options.logger || false,
            loggerCollapsed: options.loggerCollapsed || false,
            storagePrefix: options.storagePrefix ? `${options.storagePrefix}/` : '',
        };
        this._useDeepEquals = {};
    }
    static logger(actionName, nextState, stateName, collapsed = false, prevStore, nextStore) {
        const date = new Date();
        const hour = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        const stateNameAssign = stateName;
        const space = stateNameAssign.length < 9
            ? Array(9 - stateNameAssign.length)
                .fill(' ')
                .join('')
            : '';
        // eslint-disable-next-line no-console
        console[collapsed ? 'groupCollapsed' : 'group'](`%c XOStore: ${actionName}`, 'color: #614eff', `@${hour}`);
        if (prevStore) {
            // eslint-disable-next-line no-console
            console.log('%c Prev Store ', 'color: #999; font-weight: 600', prevStore);
        }
        // eslint-disable-next-line no-console
        console.log(`%c ${stateNameAssign}  ${space}`, 'color: #44b0e2; font-weight: 600', nextState);
        if (nextStore) {
            // eslint-disable-next-line no-console
            console.log('%c Next Store ', 'color: #7ac143; font-weight: 600', nextStore);
        }
        // eslint-disable-next-line no-console
        console.groupEnd();
    }
    _handleListeners = (stateName) => {
        if (this._listeners[stateName]) {
            const next = this.get(stateName);
            for (let i = 0; i < this._listeners[stateName].length; i++) {
                const { equal, listener } = this._listeners[stateName][i];
                if (!equal) {
                    listener(next);
                }
                else {
                    const prev = cloneDeep(this._prevStore[stateName]);
                    if (!equal(prev, next)) {
                        listener(next);
                    }
                }
            }
        }
    };
    _getState = (stateName, initialState) => {
        const { storagePrefix } = this._options;
        const stateStr = storage.getItem(`${storagePrefix}${stateName}`);
        if (stateStr != null && stateStr !== undefined && this._storageRegisters[stateName]) {
            return JSON.parse(stateStr);
        }
        return initialState;
    };
    _setStorage = (stateName, state) => {
        if (!!stateName && state !== undefined && this._storageRegisters[stateName]) {
            const { storagePrefix } = this._options;
            const stateStr = JSON.stringify(state);
            storage.setItem(`${storagePrefix}${stateName}`, stateStr);
        }
    };
    _set = (stateName, nextState) => {
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
        return () => { };
    };
    get(stateName) {
        if (stateName) {
            return this._store[stateName];
        }
        return this._store;
    }
    create = (stateName, { initialState, useStorage, useDeepEqual }) => {
        const { logger, loggerCollapsed, storagePrefix } = this._options;
        if (!this._store[stateName]) {
            this._storageRegisters[stateName] = useStorage;
            if (!this._getState(stateName, initialState)) {
                this._setStorage(stateName, initialState);
            }
            this._store[stateName] = this._getState(stateName, initialState);
            if (!useStorage) {
                storage.removeItem(`${storagePrefix}${stateName}`);
            }
            this._handleListeners(stateName);
            if (logger) {
                XOStore.logger('@store/initialState', initialState, stateName, loggerCollapsed);
            }
        }
        if (!this._useDeepEquals[stateName]) {
            this._useDeepEquals[stateName] = !!useDeepEqual;
        }
    };
    set(stateName, state) {
        if (typeof state === 'function') {
            const callback = state;
            const prevState = this._store[stateName];
            return this._set(stateName, callback(prevState));
        }
        return this._set(stateName, state);
    }
    subscribe(stateName, listener, equal) {
        this._listeners[stateName] = this._listeners[stateName] || [];
        this._listeners[stateName].push({
            listener,
            equal,
        });
        // Kiểm tra xem trong store đã tồn tại stateName chưa
        if (Object.keys(this._store).includes(stateName)) {
            // Nếu subscribe được gọi sau khi create hoặc set thì vẫn lấy được giá trị ngay
            const next = this.get(stateName);
            const prev = cloneDeep(this._prevStore[stateName]);
            if (!equal) {
                listener(next);
            }
            else {
                if (!equal(prev, next)) {
                    listener(next);
                }
            }
        }
        return () => {
            this._listeners[stateName] = filter(this._listeners[stateName], ({ listener: _listener }) => _listener !== listener);
        };
    }
}

;// ../../packages/utils/src/XOStore/index.ts



;// ../../packages/utils/src/fastLoop/reduce.ts
function reduce(array, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

;// ../../packages/utils/src/getBreakpointsOptions/index.ts


function getBreakpointsOptions(breakpoints) {
    if (breakpoints == null) {
        return;
    }
    const breakpointKeys = objectKeys(breakpoints || {});
    const result = reduce(breakpointKeys, (acc, key, index) => {
        const max = parseInt(key.toString()) || 0;
        const min = parseInt(breakpointKeys[index - 1]?.toString?.() || '0');
        if (window.innerWidth > min && window.innerWidth <= max) {
            return {
                ...acc,
                ...breakpoints[key],
            };
        }
        return acc;
    }, {});
    if (!objectKeys(result).length) {
        return;
    }
    return result;
}

;// ../../packages/utils/src/wrapAroundRange/index.ts
function wrapAroundRange(value, min, max) {
    let range = max - min + 1;
    let result = (((value - min) % range) + range) % range;
    return result;
}

;// ../../packages/utils/src/Component/Component.ts



class XoComponent extends HTMLElement {
    constructor() {
        super();
    }
    $attributeObserver$ = null;
    static defaultProps = {};
    static propTypes = {};
    static observedProps = [];
    props = {};
    state = {};
    _setProps = () => {
        const propTypes = this.__proto__.constructor.propTypes;
        const defaultProps = this.__proto__.constructor.defaultProps;
        const props = getAttrs(this, {
            pick: Object.keys(propTypes),
            types: propTypes,
        });
        this.props = {
            ...defaultProps,
            ...props,
        };
    };
    setState(state) {
        const prevState = this.state;
        const isObject = typeof state === 'object' && !Array.isArray(state) && state !== null;
        if (isObject) {
            this.state = {
                ...this.state,
                ...state,
            };
        }
        else if (typeof state === 'function') {
            this.state = {
                ...this.state,
                ...state(prevState),
            };
        }
        this.stateUpdate(prevState);
    }
    setProps(prop) {
        const prevProps = this.props;
        const isObject = typeof prop === 'object' && !Array.isArray(prop) && prop !== null;
        if (isObject) {
            this.props = {
                ...this.props,
                ...prop,
            };
        }
        else if (typeof prop === 'function') {
            this.props = {
                ...this.props,
                ...prop(prevProps),
            };
        }
        Object.entries(this.props).forEach(([key, value]) => {
            const attrName = key.includes('-') ? key : namingConvention.camelToKebab(key);
            if (typeof value === 'boolean') {
                attrBoolean.set(this, attrName, value);
            }
            else if (value == null) {
                this.removeAttribute(attrName);
            }
            else {
                this.setAttribute(attrName, typeof value === 'string' ? value : JSON.stringify(value));
            }
        });
    }
    handlePropUpdate = () => {
        const observedProps = this.__proto__.constructor.observedProps;
        if (!observedProps || !observedProps.length) {
            return;
        }
        this.$attributeObserver$ = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const attrName = mutation.attributeName;
                if (attrName && mutation.type === 'attributes') {
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
            attributeFilter: observedProps.map((key) => namingConvention.camelToKebab(key)),
        });
    };
    // @ts-ignore
    connectedCallback() {
        this._setProps();
        this.setProps({});
        this.mount();
        this.handlePropUpdate();
    }
    // @ts-ignore
    disconnectedCallback() {
        this.$attributeObserver$?.disconnect();
        this.unmount();
    }
    emit(type, eventInitDict) {
        const event = new CustomEvent(type, eventInitDict);
        this.dispatchEvent(event);
        return event;
    }
    // @ts-ignore
    stateUpdate(prevState) { }
    // @ts-ignore
    propUpdate({ name, prevProp, nextProp }) { }
    mount() { }
    unmount() { }
}

;// ../../packages/utils/src/Component/customElements.ts
function customElements_customElements(name, options) {
    return (target) => {
        if (!window.customElements.get(name)) {
            window.customElements.define(name, target, options);
        }
    };
}

;// ../../packages/utils/src/Component/index.ts



;// ../../packages/utils/src/formatMoney/index.ts
function formatMoney(cents, format) {
    if (typeof cents === 'string')
        cents = cents.replace('.', '');
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || '{{amount}}';
    function formatWithDelimiters(number, precision, thousands = ',', decimal = '.') {
        if (isNaN(number) || number == null)
            return '0';
        number = Number((number / 100).toFixed(precision));
        const parts = number.toString().split('.');
        const dollarsAmount = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
        const centsAmount = parts[1] ? decimal + parts[1] : '';
        return dollarsAmount + centsAmount;
    }
    const match = formatString.match(placeholderRegex);
    if (!match)
        return formatString;
    switch (match[1]) {
        case 'amount':
            value = formatWithDelimiters(Number(cents), 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(Number(cents), 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(Number(cents), 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(Number(cents), 0, '.', ',');
            break;
        default:
            return formatString;
    }
    return formatString.replace(placeholderRegex, value);
}

;// ../../packages/utils/src/morph/index.ts


const events = new Emitter();
const SLOT_ATTR_NAME = 'slot';
const POPOVER_ATTR_NAME = 'popover';
function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}
function morphImpl(oldNode, newNode) {
    if (typeof newNode === 'string') {
        newNode = htmlToElement(newNode);
    }
    // Nếu khác loại node → thay hẳn
    if (oldNode.nodeName !== newNode.nodeName) {
        oldNode.replaceWith(newNode.cloneNode(true));
        return;
    }
    // Nếu là text node
    if (oldNode.nodeType === Node.TEXT_NODE && newNode.nodeType === Node.TEXT_NODE) {
        if (oldNode.textContent !== newNode.textContent) {
            oldNode.textContent = newNode.textContent;
        }
        return;
    }
    // Cập nhật attributes, style, dataset, listeners
    if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
        syncAttributes(oldNode, newNode);
        syncEventListeners(oldNode, newNode);
    }
    // Diff children
    diffChildrenWithKeys(oldNode, newNode);
    // Diff web components
    handleWebComponent(oldNode);
}
function handleWebComponent(node) {
    queueMicrotask(() => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node;
            const xoEls = [el, ...Array.from(el.querySelectorAll('*'))].filter((el) => el.localName.startsWith('xo-'));
            each(xoEls, (el, index) => {
                el.setAttribute('xo-observed', Date.now().toString() + index.toString());
            });
        }
    });
}
function syncAttributes(oldEl, newEl) {
    const oldAttrs = oldEl.attributes;
    const newAttrs = newEl.attributes;
    // Xóa attr thừa
    for (let i = oldAttrs.length - 1; i >= 0; i--) {
        const name = oldAttrs[i].name;
        if (!newEl.hasAttribute(name) && !name.startsWith(SLOT_ATTR_NAME) && !name.startsWith(POPOVER_ATTR_NAME)) {
            oldEl.removeAttribute(name);
        }
    }
    // Thêm / sửa attr mới
    for (let i = 0; i < newAttrs.length; i++) {
        const { name, value } = newAttrs[i];
        if (oldEl.getAttribute(name) !== value) {
            oldEl.setAttribute(name, value);
            events.emit('attr:update', { oldEl, newEl, name, value });
        }
    }
    // So sánh style inline
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
            oldStyle[prop] = '';
        }
    }
    // So sánh dataset
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
    off: events.off.bind(events),
});
function syncEventListeners(oldEl, newEl) {
    const allAttrs = Array.from(newEl.attributes).map((a) => a.name);
    each(allAttrs, (attr) => {
        if (attr.startsWith('on')) {
            const eventName = attr.slice(2).toLowerCase();
            const oldHandler = oldEl[attr];
            const newHandler = newEl[attr];
            if (oldHandler !== newHandler) {
                if (oldHandler)
                    oldEl.removeEventListener(eventName, oldHandler);
                if (typeof newHandler === 'function') {
                    oldEl.addEventListener(eventName, newHandler);
                    oldEl[attr] = newHandler;
                }
            }
        }
    });
}
function setDefaultKey(oldNode, newNode) {
    if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
        const oldEls = Array.from(oldNode.querySelectorAll('[xo-line]'));
        const newEls = Array.from(newNode.querySelectorAll('[xo-line]'));
        each(oldEls, (el) => {
            const key = el.getAttribute('key');
            if (!key) {
                el.setAttribute('key', el.getAttribute('xo-product-id'));
            }
        });
        each(newEls, (el) => {
            const key = el.getAttribute('key');
            if (!key) {
                el.setAttribute('key', el.getAttribute('xo-product-id'));
            }
        });
    }
}
function diffChildrenWithKeys(oldNode, newNode) {
    const oldChildren = Array.from(oldNode.childNodes);
    const newChildren = Array.from(newNode.childNodes);
    setDefaultKey(oldNode, newNode);
    const oldKeyMap = new Map();
    each(oldChildren, (child, idx) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            const key = child.getAttribute('key');
            if (key)
                oldKeyMap.set(key, { child, idx });
        }
    });
    let i = 0;
    while (i < newChildren.length) {
        const newChild = newChildren[i];
        const newKey = newChild.nodeType === Node.ELEMENT_NODE ? newChild.getAttribute('key') : null;
        if (newKey && oldKeyMap.has(newKey)) {
            const { child: oldChild } = oldKeyMap.get(newKey);
            morph(oldChild, newChild);
            if (oldNode.childNodes[i] !== oldChild) {
                oldNode.insertBefore(oldChild, oldNode.childNodes[i] || null);
            }
        }
        else {
            const oldChild = oldNode.childNodes[i];
            if (!oldChild) {
                oldNode.appendChild(newChild.cloneNode(true));
            }
            else if (!newKey && !oldChild.getAttribute?.('key')) {
                morph(oldChild, newChild);
            }
            else {
                oldNode.insertBefore(newChild.cloneNode(true), oldChild);
            }
        }
        i++;
    }
    // Xóa node thừa
    while (oldNode.childNodes.length > newChildren.length) {
        oldNode.removeChild(oldNode.lastChild);
    }
}

;// ../../packages/utils/src/index.ts






















































;// ./src/groups/popups/popup-newsletter/popup-newsletter.script-global.ts

DOMLoaded(() => {
    const modal = document.getElementById('popup-newsletter__modal');
    const showValue = modal?.getAttribute('data-show');
    const lastShownTimestamp = localStorage.getItem('popup-newsletter-last-shown');
    const cooldownMinutes = parseInt(document.getElementById('popup-newsletter-data__cooldown')?.textContent || '0', 10);
    const cooldownInMs = cooldownMinutes * 60 * 1000;
    const path = window.location.pathname;
    const openModal = () => {
        if (!lastShownTimestamp || Date.now() - parseInt(lastShownTimestamp, 10) >= cooldownInMs) {
            delay(2000).then(() => {
                // @ts-ignore
                xoModal.open('popup-newsletter');
            });
            localStorage.setItem('popup-newsletter-last-shown', Date.now().toString());
        }
    };
    if (modal && showValue != 'hidden') {
        if (showValue === 'all' || showValue === 'home' && path.includes('pages/home') || path === '/') {
            openModal();
        }
    }
});
delay(1800000).then(() => {
    // @ts-ignore
    xoModal.close('popup-newsletter');
});

;// ./src/groups/popups/popup-promotion/popup-promotion.script-global.ts

DOMLoaded(() => {
    const modal = document.getElementById('popup-promotion__modal');
    const showValue = modal?.getAttribute('data-show');
    const lastShownTimestamp = localStorage.getItem('popup-promotion-last-shown');
    const cooldownMinutes = parseInt(document.getElementById('popup-promotion-data__cooldown')?.textContent || '0', 10);
    const cooldownInMs = cooldownMinutes * 60 * 1000;
    const path = window.location.pathname;
    const openModal = () => {
        if (!lastShownTimestamp || Date.now() - parseInt(lastShownTimestamp, 10) >= cooldownInMs) {
            delay(2000).then(() => {
                // @ts-ignore
                xoModal.open('popup-promotion');
            });
            localStorage.setItem('popup-promotion-last-shown', Date.now().toString());
        }
    };
    if (modal && showValue != 'hidden') {
        if (showValue === 'all' || showValue === 'home' && path.includes('pages/home') || path === '/') {
            openModal();
        }
    }
});
delay(1800000).then(() => {
    // @ts-ignore
    xoModal.close('popup-promotion');
});

;// ./src/groups/popups/popup-sale-notification/popup-sale-notification.script-global.ts

class XoPopupSaleNotification extends HTMLElement {
    show;
    start;
    initial;
    isHovered;
    hoverStartTime;
    removed;
    replaced;
    static get observedAttributes() {
        return ["xo-observed"];
    }
    connectedCallback() {
        this.show = false;
        this.initial = false;
        this.isHovered = false;
        this.popup = this.popup.bind(this);
        this.handleFrame = this.handleFrame.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.init();
        this.start = Date.now();
        this.initial = true;
        this.removed = false;
        this.replaced = false;
    }
    disconnectedCallback() {
        this.destroy();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && name === "xo-observed" && this.initial) {
            this.destroy();
            this.init();
        }
    }
    getRandomIndex(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
    replaceContent = () => {
        const time = this.querySelector(".xo-popup-sale-notification__minute");
        const customer = this.querySelector(".xo-popup-sale-notification__customer-name");
        const image = this.querySelector(".xo-popup-sale-notification__image img");
        const productName = this.querySelector(".xo-popup-sale-notification__product-title");
        const customerList = this.getAttribute("xo-customer") ?? "";
        const productList = this.querySelector(".xo-popup-sale-notification__product-list")?.textContent?.trim() ?? "";
        if (!!customer) {
            const index = this.getRandomIndex(0, customerList.split("/").length - 1);
            const list = customerList.split("/");
            customer.textContent = list[index];
        }
        if (!!time) {
            time.textContent = this.getRandomIndex(1, 10).toString();
        }
        if (!!image && !!productName) {
            const data = JSON.parse(productList);
            const length = data.length;
            if (!length) {
                return;
            }
            const index = this.getRandomIndex(0, length - 1);
            const src = data[index]?.featured_image?.src ?? data[index]?.featured_image ?? "https://cdn.shopify.com/s/files/1/0677/7900/2622/files/Product-placeholder.svg?v=1717753235";
            image.src = src;
            image.srcset = src;
            if (!!data?.[index]?.title) {
                productName.textContent = data[index].title;
            }
        }
    };
    handleMouseEnter(e) {
        // Check if the hover target is related to our toast
        const toast = this.querySelector('xo-toast[xo-name^="xo-popup-"]');
        const name = toast?.getAttribute("xo-name");
        // Check if the hover target is within our toast or the toast portal
        const target = e.target;
        const isRelatedToOurToast = target.closest(`xo-toast[xo-name="${name}"]`) || target === toast;
        if (isRelatedToOurToast && !this.isHovered) {
            this.isHovered = true;
            this.hoverStartTime = Date.now();
            frameManager.remove(this.handleFrame);
        }
        else if (this.isHovered && !isRelatedToOurToast) {
            this.isHovered = false;
            if (this.hoverStartTime && this.start) {
                const elapsedBeforeHover = this.hoverStartTime - this.start;
                const currentTime = Date.now();
                this.start = currentTime - elapsedBeforeHover;
            }
            frameManager.add(this.handleFrame, true);
        }
    }
    handleMouseLeave() {
        if (this.isHovered) {
            this.isHovered = false;
            if (this.hoverStartTime && this.start) {
                const elapsedBeforeHover = this.hoverStartTime - this.start;
                const currentTime = Date.now();
                this.start = currentTime - elapsedBeforeHover;
            }
            frameManager.add(this.handleFrame, true);
        }
    }
    handleFrame() {
        const toast = this.querySelector('xo-toast[xo-name^="xo-popup-"]');
        const name = toast?.getAttribute("xo-name");
        const ellapsed = Date.now() - (this.start ?? 0);
        const duration = Number(this?.getAttribute("xo-duration") ?? 3000);
        const delay = Number(this?.getAttribute("xo-delay") ?? 3000);
        if (ellapsed > duration + 800 && name) {
            if (!this.removed) {
                window.xoToast.remove(name);
                this.removed = true;
            }
            if (!this.replaced) {
                this.replaceContent();
                this.replaced = true;
            }
        }
        if (ellapsed > duration + delay + 800 && name) {
            window.xoToast.push({ name: name });
            this.removed = false;
            this.replaced = false;
            this.start = Date.now();
        }
    }
    popup = () => {
        const isShow = this?.getAttribute("xo-show") === "true";
        if (!isShow) {
            return;
        }
        frameManager.add(this.handleFrame, true);
        document.addEventListener("mouseover", this.handleMouseEnter);
        document.addEventListener("mouseleave", this.handleMouseLeave);
    };
    init() {
        window.addEventListener("load", this.popup);
    }
    destroy() {
        window.removeEventListener("load", this.popup);
        frameManager.remove(this.handleFrame);
        document.removeEventListener("mouseover", this.handleMouseEnter);
        document.removeEventListener("mouseleave", this.handleMouseLeave);
    }
}
function hiddenModal() {
    const toastEls = document.querySelectorAll('xo-toast[xo-name^="xo-popup-"]');
    const modalEls = document.querySelectorAll('xo-modal[xo-name^="xo-popup-"]');
    modalEls.forEach((el) => {
        const name = el.getAttribute("xo-name");
        if (name) {
            window.xoModal.close(name);
        }
    });
    toastEls.forEach((el) => {
        const name = el.getAttribute("xo-name");
        if (name) {
            window.xoToast.remove(name);
        }
    });
}
if (window.Shopify.designMode) {
    document.addEventListener("shopify:section:select", async (event) => {
        hiddenModal();
        const el = event.target;
        const toast = el.querySelector('xo-toast[xo-name^="xo-popup-"]');
        const modal = el.querySelector('xo-modal[xo-name^="xo-popup-"]');
        if (!!modal) {
            const name = modal?.getAttribute("xo-name");
            if (name) {
                await delay(200);
                window.xoModal.open(name);
            }
        }
        if (!!toast) {
            const name = toast?.getAttribute("xo-name");
            if (name) {
                await delay(200);
                window.xoToast.push({ name: name });
            }
        }
    });
    document.addEventListener("shopify:section:deselect", (event) => {
        hiddenModal();
        const el = event.target;
        const toast = el.querySelector('xo-toast[xo-name^="xo-popup-"]');
        const modal = el.querySelector('xo-modal[xo-name^="xo-popup-"]');
        if (!!modal) {
            const name = modal?.getAttribute("xo-name");
            if (name) {
                window.xoModal.close(name);
            }
        }
        if (!!toast) {
            const name = toast?.getAttribute("xo-name");
            if (name) {
                window.xoToast.remove(name);
            }
        }
    });
    document.addEventListener("shopify:section:load", async (event) => {
        hiddenModal();
        const el = event.target;
        const toast = el.querySelector('xo-toast[xo-name^="xo-popup-"]');
        const modal = el.querySelector('xo-modal[xo-name^="xo-popup-"]');
        if (!!modal) {
            const name = modal?.getAttribute("xo-name");
            if (name) {
                await delay(200);
                window.xoModal.open(name);
            }
        }
        if (!!toast) {
            const name = toast?.getAttribute("xo-name");
            if (name) {
                await delay(200);
                window.xoToast.push({ name: name });
            }
        }
    });
}
if (!window.customElements.get("xo-popup-sale-notification") && !window.Shopify.designMode) {
    window.customElements.define("xo-popup-sale-notification", XoPopupSaleNotification);
}

;// ./src/snippets/carousel-pagination-style3/carousel-pagination-style3.ts
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let XoCarouselPaginationBulletActive = class XoCarouselPaginationBulletActive extends XoComponent {
    static propTypes = {
        xoCarouselBulletSelector: 'string',
        xoDuration: 'number',
    };
    static defaultProps = {
        xoCarouselBulletSelector: '.carousel-pagination-style3__pagination xo-carousel-bullet',
        xoDuration: 100,
    };
    carouselEl = null;
    timeId = -1;
    prevPageIndex = -1;
    handleCarouselChange = (event) => {
        const { xoCarouselBulletSelector, xoDuration } = this.props;
        const { xoActiveIndex, activeIndex } = event.detail;
        const finalActiveIndex = xoActiveIndex ?? activeIndex;
        // @ts-ignore
        const { xoPerView, xoBreakpoints } = this.carouselEl.options;
        const breakpointOptions = getBreakpointsOptions(xoBreakpoints);
        const perView = breakpointOptions?.perView ?? xoPerView;
        const pageIndex = Math.ceil(finalActiveIndex / perView);
        const bulletEls = Array.from(this.carouselEl.querySelectorAll(xoCarouselBulletSelector));
        const currentBulletEl = bulletEls[pageIndex];
        if (currentBulletEl != null && this.prevPageIndex !== pageIndex) {
            if (this.hasAttribute('xo-vertical')) {
                const prevBulletEl = bulletEls[this.prevPageIndex] ?? currentBulletEl;
                const { top: currentTop } = offset_offset(currentBulletEl);
                const { top: prevTop } = offset_offset(prevBulletEl);
                const currentHeight = Math.abs(prevTop - currentTop) + prevBulletEl.offsetHeight;
                const isNext = this.prevPageIndex < pageIndex;
                this.style.opacity = '1';
                this.style.width = `${currentBulletEl.offsetWidth}px`;
                window.clearTimeout(this.timeId);
                if (isNext) {
                    this.style.top = `${prevBulletEl.offsetTop}px`;
                    this.style.height = `${currentHeight}px`;
                    this.timeId = window.setTimeout(() => {
                        this.style.top = `${currentBulletEl.offsetTop}px`;
                        this.style.height = `${currentBulletEl.offsetHeight}px`;
                    }, xoDuration);
                }
                else {
                    this.style.top = `${currentBulletEl.offsetTop}px`;
                    this.style.height = `${currentHeight}px`;
                    this.timeId = window.setTimeout(() => {
                        this.style.height = `${currentBulletEl.offsetHeight}px`;
                    }, xoDuration);
                }
            }
            else {
                const prevBulletEl = bulletEls[this.prevPageIndex] ?? currentBulletEl;
                const { left: currentLeft } = offset_offset(currentBulletEl);
                const { left: prevLeft } = offset_offset(prevBulletEl);
                const currentWidth = Math.abs(prevLeft - currentLeft) + prevBulletEl.offsetWidth;
                const isNext = this.prevPageIndex < pageIndex;
                this.style.opacity = '1';
                this.style.height = `${currentBulletEl.offsetHeight}px`;
                window.clearTimeout(this.timeId);
                if (isNext) {
                    this.style.left = `${prevBulletEl.offsetLeft}px`;
                    this.style.width = `${currentWidth}px`;
                    this.timeId = window.setTimeout(() => {
                        this.style.left = `${currentBulletEl.offsetLeft}px`;
                        this.style.width = `${currentBulletEl.offsetWidth}px`;
                    }, xoDuration);
                }
                else {
                    this.style.left = `${currentBulletEl.offsetLeft}px`;
                    this.style.width = `${currentWidth}px`;
                    this.timeId = window.setTimeout(() => {
                        this.style.width = `${currentBulletEl.offsetWidth}px`;
                    }, xoDuration);
                }
            }
        }
        this.prevPageIndex = pageIndex;
    };
    mount() {
        const { xoDuration } = this.props;
        this.carouselEl = this.closest('xo-carousel');
        this.style.setProperty('--xo-duration', `${xoDuration}ms`);
        if (this.carouselEl) {
            // @ts-ignore
            this.carouselEl.addEventListener('xo:carousel:init', this.handleCarouselChange);
            // @ts-ignore
            this.carouselEl.addEventListener('xo:carousel:change', this.handleCarouselChange);
        }
    }
    unmount() {
        window.clearTimeout(this.timeId);
        // @ts-ignore
        this.carouselEl?.removeEventListener('xo:carousel:init', this.handleCarouselChange);
        // @ts-ignore
        this.carouselEl?.removeEventListener('xo:carousel:change', this.handleCarouselChange);
    }
};
XoCarouselPaginationBulletActive = __decorate([
    customElements_customElements('xo-carousel-pagination-bullet-active')
], XoCarouselPaginationBulletActive);


;// ./src/snippets/cart-free-shipping/cart-free-shipping.ts
var cart_free_shipping_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let CartFreeShippingCustom = class CartFreeShippingCustom extends XoComponent {
    static propTypes = {
        xoFreeShippingNotice: 'string',
        xoFreeShippingProgress: 'string',
    };
    mutationObserver = null;
    checkingEl = this.querySelector('.xo-cart-free-shipping-checking-inner');
    getProgressLevel = (progressPercent) => {
        if (progressPercent > 30 && progressPercent <= 60) {
            return '2';
        }
        if (progressPercent > 60 && progressPercent < 100) {
            return '3';
        }
        if (progressPercent == 100) {
            return '4';
        }
        return '1';
    };
    updateProgressTextUI = (formattedRemainingAmount, checking) => {
        const { xoFreeShippingNotice, xoFreeShippingProgress } = this.props;
        const textEl = this.querySelector(".xo-cart-free-shipping__text");
        if (textEl) {
            if (checking) {
                textEl.innerHTML = xoFreeShippingNotice;
            }
            else {
                textEl.innerHTML = xoFreeShippingProgress.replace(/\{\{.*?\}\}/g, formattedRemainingAmount);
            }
        }
    };
    updateLevelUI = (progressPercent) => {
        const progressBarEl = this.querySelector(".xo-cart-free-shipping__progress");
        if (!progressBarEl) {
            return;
        }
        const level = this.getProgressLevel(progressPercent);
        progressBarEl.classList.forEach(className => {
            if (className.startsWith("xo-cart-free-shipping__progress--level-")) {
                progressBarEl.classList.remove(className);
            }
        });
        progressBarEl.style.setProperty("--progress", `${Math.min(100, progressPercent)}%`);
        progressBarEl.classList.add(`xo-cart-free-shipping__progress--level-${level}`);
    };
    handler = () => {
        const totalPrice = Number(this.checkingEl.getAttribute('xo-total-price'));
        const cartTotal = totalPrice;
        // @ts-ignore
        const currencyRate = Shopify.currency.rate;
        const freeShippingThreshold = window.settings?.cart_free_shipping_min_amount;
        if (!freeShippingThreshold) {
            return;
        }
        const convertedThreshold = Math.round(freeShippingThreshold * 100 * currencyRate);
        const remainingAmount = Math.max(0, convertedThreshold - cartTotal);
        const progressPercent = (cartTotal / convertedThreshold) * 100;
        const format = document.documentElement.getAttribute('xo-money-with-currency-format') || document.documentElement.getAttribute('xo-money-format');
        if (!format) {
            return;
        }
        const checking = cartTotal >= convertedThreshold;
        const formattedRemainingAmount = formatMoney(remainingAmount, format);
        this.updateProgressTextUI(formattedRemainingAmount, checking);
        this.updateLevelUI(progressPercent);
    };
    mount() {
        if (!this.checkingEl) {
            return;
        }
        this.handler();
        this.mutationObserver = new MutationObserver(this.handler);
        this.mutationObserver.observe(this.checkingEl, { attributeFilter: ['xo-total-price'], attributes: true });
    }
    unmount() {
        this.mutationObserver?.disconnect();
    }
};
CartFreeShippingCustom = cart_free_shipping_decorate([
    customElements_customElements('xo-cart-free-shipping-custom')
], CartFreeShippingCustom);


// EXTERNAL MODULE: ./src/snippets/cart-mini/cart-mini.ts
var cart_mini = __webpack_require__(817);
;// ./src/snippets/currency-select/currency-select.ts

const COMPONENT_NAME = 'xo-currency-select';
class CurrencySelect extends HTMLElement {
    inputEls = [];
    formEl = null;
    constructor() {
        super();
        this.inputEls = Array.from(this.querySelectorAll('.xo-currency-select__content .xo-currency-select__input'));
        this.formEl = this.querySelector('.xo-currency-select__form');
    }
    handleChange = () => {
        this.formEl?.submit();
    };
    connectedCallback() {
        each(this.inputEls, (inputEl) => {
            inputEl.addEventListener('input', this.handleChange);
        });
    }
    disconnectedCallback() {
        each(this.inputEls, (inputEl) => {
            inputEl.removeEventListener('input', this.handleChange);
        });
    }
}
componentDefine({
    [COMPONENT_NAME]: CurrencySelect,
});

;// ./src/snippets/language-select/language-select.ts

const language_select_COMPONENT_NAME = 'xo-language-select';
class LanguageSelect extends HTMLElement {
    inputEls = [];
    formEl = null;
    constructor() {
        super();
        this.inputEls = Array.from(this.querySelectorAll('.xo-language-select__content .xo-language-select__input'));
        this.formEl = this.querySelector('.xo-language-select__form');
    }
    handleChange = () => {
        this.formEl?.submit();
    };
    connectedCallback() {
        each(this.inputEls, (inputEl) => {
            inputEl.addEventListener('input', this.handleChange);
        });
    }
    disconnectedCallback() {
        each(this.inputEls, (inputEl) => {
            inputEl.removeEventListener('input', this.handleChange);
        });
    }
}
componentDefine({
    [language_select_COMPONENT_NAME]: LanguageSelect,
});

;// ./src/snippets/menu-hamburger-drawer-desktop/menu-hamburger-drawer-desktop.ts
// @ts-ignore

function init() {
    const menuEl = document.querySelector('.menu-hamburger-drawer-desktop--click');
    const linkEls = Array.from(menuEl?.querySelectorAll('.menu-hamburger-drawer-desktop__link') ?? []);
    each(linkEls, (linkEl) => {
        const itemEl = linkEl.parentElement;
        const hasChildMenu = !!itemEl.querySelector('.menu-hamburger-drawer-desktop__sub-menu') || !!itemEl.querySelector('.menu-hamburger-drawer-desktop__mega-menu')?.innerHTML.trim();
        if (hasChildMenu) {
            linkEl.addEventListener('click', (event) => {
                event.preventDefault();
                const currentItemEl = linkEl.parentElement;
                const itemParentEl = currentItemEl?.parentElement?.closest('.menu-hamburger-drawer-desktop__item--click');
                each(linkEls, (linkEl) => {
                    const itemEl = linkEl.parentElement;
                    if (itemEl?.classList.contains('menu-hamburger-drawer-desktop__item--click') && itemEl !== currentItemEl) {
                        itemEl?.classList.remove('menu-hamburger-drawer-desktop__item--open');
                    }
                });
                if (currentItemEl?.classList.contains('menu-hamburger-drawer-desktop__item--click')) {
                    currentItemEl?.classList.toggle('menu-hamburger-drawer-desktop__item--open');
                }
                itemParentEl?.classList.add('menu-hamburger-drawer-desktop__item--open');
            });
        }
    });
    const handleWindowClick = (event) => {
        if (!menuEl?.contains(event.target)) {
            each(linkEls, (linkEl) => {
                const itemEl = linkEl.parentElement;
                itemEl?.classList.remove('menu-hamburger-drawer-desktop__item--open');
            });
        }
    };
    window.addEventListener('click', handleWindowClick);
}
init();
if (window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
        const el = event.target;
        const hasMenu = !!el.querySelector('.menu-hamburger-drawer-desktop__list');
        if (hasMenu) {
            init();
        }
    });
}

;// ./src/snippets/menu-horizontal/menu-horizontal.script-global.ts
// @ts-ignore

function menu_horizontal_script_global_init() {
    const menuEl = document.querySelector('.xo-menu-horizontal--click');
    const linkEls = Array.from(menuEl?.querySelectorAll('.xo-menu-horizontal__link') ?? []);
    each(linkEls, (linkEl) => {
        const itemEl = linkEl.parentElement;
        const hasChildMenu = !!itemEl.querySelector('.xo-menu-horizontal__sub-menu') || !!itemEl.querySelector('.xo-menu-horizontal__mega-menu')?.innerHTML.trim();
        if (hasChildMenu) {
            linkEl.addEventListener('click', (event) => {
                event.preventDefault();
                const currentItemEl = linkEl.parentElement;
                const itemParentEl = currentItemEl?.parentElement?.closest('.xo-menu-horizontal__item--click');
                each(linkEls, (linkEl) => {
                    const itemEl = linkEl.parentElement;
                    if (itemEl?.classList.contains('xo-menu-horizontal__item--click') && itemEl !== currentItemEl) {
                        itemEl?.classList.remove('xo-menu-horizontal__item--open');
                    }
                });
                if (currentItemEl?.classList.contains('xo-menu-horizontal__item--click')) {
                    currentItemEl?.classList.toggle('xo-menu-horizontal__item--open');
                }
                itemParentEl?.classList.add('xo-menu-horizontal__item--open');
            });
        }
    });
    const handleWindowClick = (event) => {
        if (!menuEl?.contains(event.target)) {
            each(linkEls, (linkEl) => {
                const itemEl = linkEl.parentElement;
                itemEl?.classList.remove('xo-menu-horizontal__item--open');
            });
        }
    };
    window.addEventListener('click', handleWindowClick);
}
menu_horizontal_script_global_init();
if (window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (event) => {
        const el = event.target;
        const hasMenu = !!el.querySelector('.xo-menu-horizontal');
        if (hasMenu) {
            menu_horizontal_script_global_init();
        }
    });
}

;// ./src/snippets/menu-scroll/menu-scroll.ts

const menuScrollEl = document.querySelector('.xo-menu-scroll');
const menuListScrollEl = menuScrollEl?.querySelector('.xo-menu-scroll__list');
const linkEls = Array.from(menuScrollEl?.querySelectorAll('.xo-menu-scroll__link') ?? []);
const currentLinkEl = menuScrollEl?.querySelector('.xo-menu-scroll__link--current');
let isDragging = false;
let startScrollLeft = 0;
if (menuListScrollEl && currentLinkEl) {
    const { left: linkOffsetLeft } = offset_offset(currentLinkEl);
    const { left: menuListOffsetLeft } = offset_offset(menuListScrollEl);
    menuListScrollEl.scrollTo({
        left: linkOffsetLeft - menuListOffsetLeft - (menuListScrollEl.offsetWidth - currentLinkEl.offsetWidth) / 2,
    });
    if (!isMobile.any) {
        const pan = panGesture({
            element: menuListScrollEl,
            onStart: () => {
                isDragging = true;
                startScrollLeft = menuListScrollEl.scrollLeft;
            },
            onMove: ({ dx }) => {
                menuListScrollEl.scrollTo({
                    left: startScrollLeft - dx,
                });
            },
            onEnd: () => {
                isDragging = false;
                pan.setValue({ dx: 0 });
            },
        });
        function handleAnchor(event) {
            const nextIsDragging = !isDragging;
            if (nextIsDragging) {
                event.preventDefault();
            }
        }
        each(linkEls, (linkEl) => {
            linkEl.addEventListener('click', handleAnchor);
        });
    }
}

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/validate.js
function validateQuery(query) {
  var error;

  if (query === null || query === undefined) {
    error = new TypeError("'query' is missing");
    error.type = "argument";
    throw error;
  }

  if (typeof query !== "string") {
    error = new TypeError("'query' is not a string");
    error.type = "argument";
    throw error;
  }
}

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/utilities/CustomError.js
function GenericError() {
  var error = Error.call(this);

  error.name = "Server error";
  error.message = "Something went wrong on the server";
  error.status = 500;

  return error;
}

function NotFoundError(status) {
  var error = Error.call(this);

  error.name = "Not found";
  error.message = "Not found";
  error.status = status;

  return error;
}

function ServerError() {
  var error = Error.call(this);

  error.name = "Server error";
  error.message = "Something went wrong on the server";
  error.status = 500;

  return error;
}

function ContentTypeError(status) {
  var error = Error.call(this);

  error.name = "Content-Type error";
  error.message = "Content-Type was not provided or is of wrong type";
  error.status = status;

  return error;
}

function JsonParseError(status) {
  var error = Error.call(this);

  error.name = "JSON parse error";
  error.message = "JSON syntax error";
  error.status = status;

  return error;
}

function ThrottledError(status, name, message, retryAfter) {
  var error = Error.call(this);

  error.name = name;
  error.message = message;
  error.status = status;
  error.retryAfter = retryAfter;

  return error;
}

function InvalidParameterError(status, name, message) {
  var error = Error.call(this);

  error.name = name;
  error.message = message;
  error.status = status;

  return error;
}

function ExpectationFailedError(status, name, message) {
  var error = Error.call(this);

  error.name = name;
  error.message = message;
  error.status = status;

  return error;
}

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/request.js


function request(searchPath, configParams, query, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  var route = searchPath + '/suggest.json';

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var contentType = xhr.getResponseHeader("Content-Type");

      if (xhr.status >= 500) {
        onError(new ServerError());

        return;
      }

      if (xhr.status === 404) {
        onError(new NotFoundError(xhr.status));

        return;
      }

      if (
        typeof contentType !== "string" ||
        contentType.toLowerCase().match("application/json") === null
      ) {
        onError(new ContentTypeError(xhr.status));

        return;
      }

      if (xhr.status === 417) {
        try {
          var invalidParameterJson = JSON.parse(xhr.responseText);

          onError(
            new InvalidParameterError(
              xhr.status,
              invalidParameterJson.message,
              invalidParameterJson.description
            )
          );
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 422) {
        try {
          var expectationFailedJson = JSON.parse(xhr.responseText);

          onError(
            new ExpectationFailedError(
              xhr.status,
              expectationFailedJson.message,
              expectationFailedJson.description
            )
          );
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 429) {
        try {
          var throttledJson = JSON.parse(xhr.responseText);

          onError(
            new ThrottledError(
              xhr.status,
              throttledJson.message,
              throttledJson.description,
              xhr.getResponseHeader("Retry-After")
            )
          );
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      if (xhr.status === 200) {
        try {
          var res = JSON.parse(xhr.responseText);
          res.query = query;
          onSuccess(res);
        } catch (error) {
          onError(new JsonParseError(xhr.status));
        }

        return;
      }

      try {
        var genericErrorJson = JSON.parse(xhr.responseText);
        onError(
          new GenericError(
            xhr.status,
            genericErrorJson.message,
            genericErrorJson.description
          )
        );
      } catch (error) {
        onError(new JsonParseError(xhr.status));
      }

      return;
    }
  };

  xhr.open(
    "get",
    route + "?q=" + encodeURIComponent(query) + "&" + configParams
  );

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send();
}
;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/utilities/debounce.js
function debounce(func, wait) {
  var timeout = null;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(context, args);
    }, wait || 0);
  };
}

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/utilities/Dispatcher.js
function Dispatcher() {
  this.events = {};
}

Dispatcher.prototype.on = function(eventName, callback) {
  var event = this.events[eventName];
  if (!event) {
    event = new DispatcherEvent(eventName);
    this.events[eventName] = event;
  }
  event.registerCallback(callback);
};

Dispatcher.prototype.off = function(eventName, callback) {
  var event = this.events[eventName];
  if (event && event.callbacks.indexOf(callback) > -1) {
    event.unregisterCallback(callback);
    if (event.callbacks.length === 0) {
      delete this.events[eventName];
    }
  }
};

Dispatcher.prototype.dispatch = function(eventName, payload) {
  var event = this.events[eventName];
  if (event) {
    event.fire(payload);
  }
};

function DispatcherEvent(eventName) {
  this.eventName = eventName;
  this.callbacks = [];
}

DispatcherEvent.prototype.registerCallback = function(callback) {
  this.callbacks.push(callback);
};

DispatcherEvent.prototype.unregisterCallback = function(callback) {
  var index = this.callbacks.indexOf(callback);
  if (index > -1) {
    this.callbacks.splice(index, 1);
  }
};

DispatcherEvent.prototype.fire = function(payload) {
  var callbacks = this.callbacks.slice(0);
  callbacks.forEach(function(callback) {
    callback(payload);
  });
};

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/utilities/Cache.js
function Cache(config) {
  this._store = {};
  this._keys = [];
  if (config && config.bucketSize) {
    this.bucketSize = config.bucketSize;
  } else {
    this.bucketSize = 20;
  }
}

Cache.prototype.set = function(key, value) {
  if (this.count() >= this.bucketSize) {
    var deleteKey = this._keys.splice(0, 1);
    this.delete(deleteKey);
  }

  this._keys.push(key);
  this._store[key] = value;

  return this._store;
};

Cache.prototype.get = function(key) {
  return this._store[key];
};

Cache.prototype.has = function(key) {
  return Boolean(this._store[key]);
};

Cache.prototype.count = function() {
  return Object.keys(this._store).length;
};

Cache.prototype.delete = function(key) {
  var exists = Boolean(this._store[key]);
  delete this._store[key];
  return exists && !this._store[key];
};

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/utilities/objectToQueryParams.js
function objectToQueryParams(obj, parentKey) {
  var output = "";
  parentKey = parentKey || null;

  Object.keys(obj).forEach(function (key) {
    var outputKey = key + "=";
    if (parentKey) {
      outputKey = parentKey + "[" + key + "]";
    }

    switch (trueTypeOf(obj[key])) {
      case "object":
        output += objectToQueryParams(obj[key], parentKey ? outputKey : key);
        break;
      case "array":
        output += outputKey + "=" + obj[key].join(",") + "&";
        break;
      default:
        if (parentKey) {
          outputKey += "=";
        }
        output += outputKey + encodeURIComponent(obj[key]) + "&";
        break;
    }
  });

  return output;
}

function trueTypeOf(obj) {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}
;// ../../node_modules/.pnpm/@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search/src/theme-predictive-search.js




var DEBOUNCE_RATE = 10;
var requestDebounced = debounce(request, DEBOUNCE_RATE);

function PredictiveSearch(config) {
  if (!config) {
    throw new TypeError("No config object was specified");
  }

  var configParameters = config;

  this._retryAfter = null;
  this._currentQuery = null;

  this.dispatcher = new Dispatcher();
  this.cache = new Cache({ bucketSize: 40 });

  this.searchPath = configParameters.search_path || "/search";

  if(configParameters.search_path) {
    delete configParameters['search_path'];
  }

  this.configParams = objectToQueryParams(configParameters);
}

PredictiveSearch.SEARCH_PATH = "/search";

PredictiveSearch.TYPES = {
  PRODUCT: "product",
  PAGE: "page",
  ARTICLE: "article",
  COLLECTION: "collection"
};

PredictiveSearch.FIELDS = {
  AUTHOR: "author",
  BODY: "body",
  PRODUCT_TYPE: "product_type",
  TAG: "tag",
  TITLE: "title",
  VARIANTS_BARCODE: "variants.barcode",
  VARIANTS_SKU: "variants.sku",
  VARIANTS_TITLE: "variants.title",
  VENDOR: "vendor"
};

PredictiveSearch.UNAVAILABLE_PRODUCTS = {
  SHOW: "show",
  HIDE: "hide",
  LAST: "last"
};

PredictiveSearch.prototype.query = function query(query) {
  try {
    validateQuery(query);
  } catch (error) {
    this.dispatcher.dispatch("error", error);
    return;
  }

  if (query === "") {
    return this;
  }

  this._currentQuery = normalizeQuery(query);
  var cacheResult = this.cache.get(this._currentQuery);
  if (cacheResult) {
    this.dispatcher.dispatch("success", cacheResult);
    return this;
  }

  requestDebounced(
    this.searchPath,
    this.configParams,
    query,
    function(result) {
      this.cache.set(normalizeQuery(result.query), result);
      if (normalizeQuery(result.query) === this._currentQuery) {
        this._retryAfter = null;
        this.dispatcher.dispatch("success", result);
      }
    }.bind(this),
    function(error) {
      if (error.retryAfter) {
        this._retryAfter = error.retryAfter;
      }
      this.dispatcher.dispatch("error", error);
    }.bind(this)
  );

  return this;
};

PredictiveSearch.prototype.on = function on(eventName, callback) {
  this.dispatcher.on(eventName, callback);

  return this;
};

PredictiveSearch.prototype.off = function on(eventName, callback) {
  this.dispatcher.off(eventName, callback);

  return this;
};

function normalizeQuery(query) {
  if (typeof query !== "string") {
    return null;
  }

  return query
    .trim()
    .replace(" ", "-")
    .toLowerCase();
}

;// ../../node_modules/.pnpm/@shopify+theme-predictive-search-component@4.1.1_@shopify+theme-predictive-search@4.1.1/node_modules/@shopify/theme-predictive-search-component/src/theme-predictive-search-component.js


var DEFAULT_PREDICTIVE_SEARCH_API_CONFIG = {
  search_path: PredictiveSearch.SEARCH_PATH,
  resources: {
    type: [PredictiveSearch.TYPES.PRODUCT],
    options: {
      unavailable_products: PredictiveSearch.UNAVAILABLE_PRODUCTS.LAST,
      fields: [
        PredictiveSearch.FIELDS.TITLE,
        PredictiveSearch.FIELDS.VENDOR,
        PredictiveSearch.FIELDS.PRODUCT_TYPE,
        PredictiveSearch.FIELDS.VARIANTS_TITLE
      ]
    }
  }
};

function PredictiveSearchComponent(config) {
  // validate config
  if (
    !config ||
    !config.selectors ||
    !config.selectors.input ||
    !isString(config.selectors.input) ||
    !config.selectors.result ||
    !isString(config.selectors.result) ||
    !config.resultTemplateFct ||
    !isFunction(config.resultTemplateFct) ||
    !config.numberOfResultsTemplateFct ||
    !isFunction(config.numberOfResultsTemplateFct) ||
    !config.loadingResultsMessageTemplateFct ||
    !isFunction(config.loadingResultsMessageTemplateFct)
  ) {
    var error = new TypeError("PredictiveSearchComponent config is not valid");
    error.type = "argument";
    throw error;
  }

  // Find nodes
  this.nodes = findNodes(config.selectors);

  // Validate nodes
  if (!isValidNodes(this.nodes)) {
    // eslint-disable-next-line no-console
    console.warn("Could not find valid nodes");
    return;
  }

  // Store the keyword that was used for the search
  this._searchKeyword = "";

  // Assign result template
  this.resultTemplateFct = config.resultTemplateFct;

  // Assign number of results template
  this.numberOfResultsTemplateFct = config.numberOfResultsTemplateFct;

  // Assign loading state template function
  this.loadingResultsMessageTemplateFct =
    config.loadingResultsMessageTemplateFct;

  // Assign number of search results
  this.numberOfResults = config.numberOfResults || 4;

  // Set classes
  this.classes = {
    visibleVariant: config.visibleVariant ?
      config.visibleVariant :
      "predictive-search-wrapper--visible",
    itemSelected: config.itemSelectedClass ?
      config.itemSelectedClass :
      "predictive-search-item--selected",
    clearButtonVisible: config.clearButtonVisibleClass ?
      config.clearButtonVisibleClass :
      "predictive-search__clear-button--visible"
  };

  this.selectors = {
    searchResult: config.searchResult ?
      config.searchResult :
      "[data-search-result]"
  };

  // Assign callbacks
  this.callbacks = assignCallbacks(config);

  // Add input attributes
  addInputAttributes(this.nodes.input);

  // Add input event listeners
  this._addInputEventListeners();

  // Add body listener
  this._addBodyEventListener();

  // Add accessibility announcer
  this._addAccessibilityAnnouncer();

  // Display the reset button if the input is not empty
  this._toggleClearButtonVisibility();

  // Instantiate Predictive Search API
  this.predictiveSearch = new PredictiveSearch(
    config.PredictiveSearchAPIConfig ?
    config.PredictiveSearchAPIConfig :
    DEFAULT_PREDICTIVE_SEARCH_API_CONFIG
  );

  // Add predictive search success event listener
  this.predictiveSearch.on(
    "success",
    this._handlePredictiveSearchSuccess.bind(this)
  );

  // Add predictive search error event listener
  this.predictiveSearch.on(
    "error",
    this._handlePredictiveSearchError.bind(this)
  );
}

/**
 * Private methods
 */
function findNodes(selectors) {
  return {
    input: document.querySelector(selectors.input),
    reset: document.querySelector(selectors.reset),
    result: document.querySelector(selectors.result)
  };
}

function isValidNodes(nodes) {
  if (
    !nodes ||
    !nodes.input ||
    !nodes.result ||
    nodes.input.tagName !== "INPUT"
  ) {
    return false;
  }

  return true;
}

function assignCallbacks(config) {
  return {
    onBodyMousedown: config.onBodyMousedown,
    onBeforeOpen: config.onBeforeOpen,
    onOpen: config.onOpen,
    onBeforeClose: config.onBeforeClose,
    onClose: config.onClose,
    onInputFocus: config.onInputFocus,
    onInputKeyup: config.onInputKeyup,
    onInputBlur: config.onInputBlur,
    onInputReset: config.onInputReset,
    onBeforeDestroy: config.onBeforeDestroy,
    onDestroy: config.onDestroy
  };
}

function addInputAttributes(input) {
  input.setAttribute("autocorrect", "off");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("autocapitalize", "off");
  input.setAttribute("spellcheck", "false");
}

function removeInputAttributes(input) {
  input.removeAttribute("autocorrect", "off");
  input.removeAttribute("autocomplete", "off");
  input.removeAttribute("autocapitalize", "off");
  input.removeAttribute("spellcheck", "false");
}

/**
 * Public variables
 */
PredictiveSearchComponent.prototype.isResultVisible = false;
PredictiveSearchComponent.prototype.results = {};

/**
 * "Private" variables
 */
PredictiveSearchComponent.prototype._latencyTimer = null;
PredictiveSearchComponent.prototype._resultNodeClicked = false;

/**
 * "Private" instance methods
 */
PredictiveSearchComponent.prototype._addInputEventListeners = function () {
  var input = this.nodes.input;
  var reset = this.nodes.reset;

  if (!input) {
    return;
  }

  this._handleInputFocus = this._handleInputFocus.bind(this);
  this._handleInputBlur = this._handleInputBlur.bind(this);
  this._handleInputKeyup = this._handleInputKeyup.bind(this);
  this._handleInputKeydown = this._handleInputKeydown.bind(this);

  input.addEventListener("focus", this._handleInputFocus);
  input.addEventListener("blur", this._handleInputBlur);
  input.addEventListener("keyup", this._handleInputKeyup);
  input.addEventListener("keydown", this._handleInputKeydown);

  if (reset) {
    this._handleInputReset = this._handleInputReset.bind(this);
    reset.addEventListener("click", this._handleInputReset);
  }
};

PredictiveSearchComponent.prototype._removeInputEventListeners = function () {
  var input = this.nodes.input;

  input.removeEventListener("focus", this._handleInputFocus);
  input.removeEventListener("blur", this._handleInputBlur);
  input.removeEventListener("keyup", this._handleInputKeyup);
  input.removeEventListener("keydown", this._handleInputKeydown);
};

PredictiveSearchComponent.prototype._addBodyEventListener = function () {
  this._handleBodyMousedown = this._handleBodyMousedown.bind(this);

  document
    .querySelector("body")
    .addEventListener("mousedown", this._handleBodyMousedown);
};

PredictiveSearchComponent.prototype._removeBodyEventListener = function () {
  document
    .querySelector("body")
    .removeEventListener("mousedown", this._handleBodyMousedown);
};

PredictiveSearchComponent.prototype._removeClearButtonEventListener = function () {
  var reset = this.nodes.reset;

  if (!reset) {
    return;
  }

  reset.removeEventListener("click", this._handleInputReset);
};

/**
 * Event handlers
 */
PredictiveSearchComponent.prototype._handleBodyMousedown = function (evt) {
  if (this.isResultVisible && this.nodes !== null) {
    if (
      evt.target.isEqualNode(this.nodes.input) ||
      this.nodes.input.contains(evt.target) ||
      evt.target.isEqualNode(this.nodes.result) ||
      this.nodes.result.contains(evt.target)
    ) {
      this._resultNodeClicked = true;
    } else {
      if (isFunction(this.callbacks.onBodyMousedown)) {
        var returnedValue = this.callbacks.onBodyMousedown(this.nodes);
        if (isBoolean(returnedValue) && returnedValue) {
          this.close();
        }
      } else {
        this.close();
      }
    }
  }
};

PredictiveSearchComponent.prototype._handleInputFocus = function (evt) {
  if (isFunction(this.callbacks.onInputFocus)) {
    var returnedValue = this.callbacks.onInputFocus(this.nodes);
    if (isBoolean(returnedValue) && !returnedValue) {
      return false;
    }
  }

  if (evt.target.value.length > 0) {
    this._search();
  }

  return true;
};

PredictiveSearchComponent.prototype._handleInputBlur = function () {
  // This has to be done async, to wait for the focus to be on the next
  // element and avoid closing the results.
  // Example: Going from the input to the reset button.
  setTimeout(
    function () {
      if (isFunction(this.callbacks.onInputBlur)) {
        var returnedValue = this.callbacks.onInputBlur(this.nodes);
        if (isBoolean(returnedValue) && !returnedValue) {
          return false;
        }
      }

      if (document.activeElement.isEqualNode(this.nodes.reset)) {
        return false;
      }

      if (this._resultNodeClicked) {
        this._resultNodeClicked = false;
        return false;
      }

      this.close();
    }.bind(this)
  );

  return true;
};

PredictiveSearchComponent.prototype._addAccessibilityAnnouncer = function () {
  this._accessibilityAnnouncerDiv = window.document.createElement("div");

  this._accessibilityAnnouncerDiv.setAttribute(
    "style",
    "position: absolute !important; overflow: hidden; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0;"
  );

  this._accessibilityAnnouncerDiv.setAttribute("data-search-announcer", "");
  this._accessibilityAnnouncerDiv.setAttribute("aria-live", "polite");
  this._accessibilityAnnouncerDiv.setAttribute("aria-atomic", "true");

  this.nodes.result.parentElement.appendChild(this._accessibilityAnnouncerDiv);
};

PredictiveSearchComponent.prototype._removeAccessibilityAnnouncer = function () {
  this.nodes.result.parentElement.removeChild(this._accessibilityAnnouncerDiv);
};

PredictiveSearchComponent.prototype._updateAccessibilityAttributesAfterSelectingElement = function (
  previousSelectedElement,
  currentSelectedElement
) {
  // Update the active descendant on the search input
  this.nodes.input.setAttribute(
    "aria-activedescendant",
    currentSelectedElement.id
  );

  // Unmark the previousSelected elemented as selected
  if (previousSelectedElement) {
    previousSelectedElement.removeAttribute("aria-selected");
  }

  // Mark the element as selected
  currentSelectedElement.setAttribute("aria-selected", true);
};

PredictiveSearchComponent.prototype._clearAriaActiveDescendant = function () {
  this.nodes.input.setAttribute("aria-activedescendant", "");
};

PredictiveSearchComponent.prototype._announceNumberOfResultsFound = function (
  results
) {
  var currentAnnouncedMessage = this._accessibilityAnnouncerDiv.innerHTML;
  var newMessage = this.numberOfResultsTemplateFct(results);

  // If the messages are the same, they won't get announced
  // add white space so it gets announced
  if (currentAnnouncedMessage === newMessage) {
    newMessage = newMessage + "&nbsp;";
  }

  this._accessibilityAnnouncerDiv.innerHTML = newMessage;
};

PredictiveSearchComponent.prototype._announceLoadingState = function () {
  this._accessibilityAnnouncerDiv.innerHTML = this.loadingResultsMessageTemplateFct();
};

PredictiveSearchComponent.prototype._handleInputKeyup = function (evt) {
  var UP_ARROW_KEY_CODE = 38;
  var DOWN_ARROW_KEY_CODE = 40;
  var RETURN_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var BACKSPACE = 8;

  if (isFunction(this.callbacks.onInputKeyup)) {
    var returnedValue = this.callbacks.onInputKeyup(this.nodes);
    if (isBoolean(returnedValue) && !returnedValue) {
      return false;
    }
  }

  this._toggleClearButtonVisibility();

  if (this.isResultVisible && this.nodes !== null) {
    if (evt.keyCode === UP_ARROW_KEY_CODE) {
      this._navigateOption(evt, "UP");
      return true;
    }

    if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
      this._navigateOption(evt, "DOWN");
      return true;
    }

    if (evt.keyCode === RETURN_KEY_CODE) {
      this._selectOption();
      return true;
    }

    if (evt.keyCode === ESCAPE_KEY_CODE) {
      this.close();
    }
  }

  if (BACKSPACE === 8 && evt.target.value.length <= 0) {
    this.close();
    this._setKeyword("");
  } else if (evt.target.value.length > 0) {
    this._search();
  }

  return true;
};

PredictiveSearchComponent.prototype._handleInputKeydown = function (evt) {
  var RETURN_KEY_CODE = 13;
  var UP_ARROW_KEY_CODE = 38;
  var DOWN_ARROW_KEY_CODE = 40;

  // Prevent the form default submission if there is a selected option
  if (evt.keyCode === RETURN_KEY_CODE && this._getSelectedOption() != null) {
    evt.preventDefault();
  }

  // Prevent the cursor from moving in the input when using the up and down arrow keys
  if (
    evt.keyCode === UP_ARROW_KEY_CODE ||
    evt.keyCode === DOWN_ARROW_KEY_CODE
  ) {
    evt.preventDefault();
  }
};

PredictiveSearchComponent.prototype._handleInputReset = function (evt) {
  evt.preventDefault();

  if (isFunction(this.callbacks.onInputReset)) {
    var returnedValue = this.callbacks.onInputReset(this.nodes);
    if (isBoolean(returnedValue) && !returnedValue) {
      return false;
    }
  }

  this.nodes.input.value = "";
  this.nodes.input.focus();
  this._toggleClearButtonVisibility();
  this.close();

  return true;
};

PredictiveSearchComponent.prototype._navigateOption = function (evt, direction) {
  var currentOption = this._getSelectedOption();

  if (!currentOption) {
    var firstOption = this.nodes.result.querySelector(
      this.selectors.searchResult
    );
    firstOption.classList.add(this.classes.itemSelected);
    this._updateAccessibilityAttributesAfterSelectingElement(null, firstOption);
  } else {
    if (direction === "DOWN") {
      var nextOption = currentOption.nextElementSibling;
      if (nextOption) {
        currentOption.classList.remove(this.classes.itemSelected);
        nextOption.classList.add(this.classes.itemSelected);
        this._updateAccessibilityAttributesAfterSelectingElement(
          currentOption,
          nextOption
        );
      }
    } else {
      var previousOption = currentOption.previousElementSibling;
      if (previousOption) {
        currentOption.classList.remove(this.classes.itemSelected);
        previousOption.classList.add(this.classes.itemSelected);
        this._updateAccessibilityAttributesAfterSelectingElement(
          currentOption,
          previousOption
        );
      }
    }
  }
};

PredictiveSearchComponent.prototype._getSelectedOption = function () {
  return this.nodes.result.querySelector("." + this.classes.itemSelected);
};

PredictiveSearchComponent.prototype._selectOption = function () {
  var selectedOption = this._getSelectedOption();

  if (selectedOption) {
    selectedOption.querySelector("a, button").click();
  }
};

PredictiveSearchComponent.prototype._search = function () {
  var newSearchKeyword = this.nodes.input.value;

  if (this._searchKeyword === newSearchKeyword) {
    return;
  }

  clearTimeout(this._latencyTimer);
  this._latencyTimer = setTimeout(
    function () {
      this.results.isLoading = true;

      // Annonuce that we're loading the results
      this._announceLoadingState();

      this.nodes.result.classList.add(this.classes.visibleVariant);
      // NOTE: We could benifit in using DOMPurify.
      // https://github.com/cure53/DOMPurify
      this.nodes.result.innerHTML = this.resultTemplateFct(this.results);
    }.bind(this),
    500
  );

  this.predictiveSearch.query(newSearchKeyword);
  this._setKeyword(newSearchKeyword);
};

PredictiveSearchComponent.prototype._handlePredictiveSearchSuccess = function (
  json
) {
  clearTimeout(this._latencyTimer);
  this.results = json.resources.results;

  this.results.isLoading = false;
  this.results.products = this.results.products.slice(0, this.numberOfResults);
  this.results.canLoadMore =
    this.numberOfResults <= this.results.products.length;
  this.results.searchQuery = this.nodes.input.value;

  if (this.results.products.length > 0 || this.results.searchQuery) {
    this.nodes.result.innerHTML = this.resultTemplateFct(this.results);
    this._announceNumberOfResultsFound(this.results);
    this.open();
  } else {
    this.nodes.result.innerHTML = "";

    this._closeOnNoResults();
  }
};

PredictiveSearchComponent.prototype._handlePredictiveSearchError = function () {
  clearTimeout(this._latencyTimer);
  this.nodes.result.innerHTML = "";

  this._closeOnNoResults();
};

PredictiveSearchComponent.prototype._closeOnNoResults = function () {
  if (this.nodes) {
    this.nodes.result.classList.remove(this.classes.visibleVariant);
  }

  this.isResultVisible = false;
};

PredictiveSearchComponent.prototype._setKeyword = function (keyword) {
  this._searchKeyword = keyword;
};

PredictiveSearchComponent.prototype._toggleClearButtonVisibility = function () {
  if (!this.nodes.reset) {
    return;
  }

  if (this.nodes.input.value.length > 0) {
    this.nodes.reset.classList.add(this.classes.clearButtonVisible);
  } else {
    this.nodes.reset.classList.remove(this.classes.clearButtonVisible);
  }
};

/**
 * Public methods
 */
PredictiveSearchComponent.prototype.open = function () {
  if (this.isResultVisible) {
    return;
  }

  if (isFunction(this.callbacks.onBeforeOpen)) {
    var returnedValue = this.callbacks.onBeforeOpen(this.nodes);
    if (isBoolean(returnedValue) && !returnedValue) {
      return false;
    }
  }

  this.nodes.result.classList.add(this.classes.visibleVariant);
  this.nodes.input.setAttribute("aria-expanded", true);
  this.isResultVisible = true;

  if (isFunction(this.callbacks.onOpen)) {
    return this.callbacks.onOpen(this.nodes) || true;
  }

  return true;
};

PredictiveSearchComponent.prototype.close = function () {
  if (!this.isResultVisible) {
    return true;
  }

  if (isFunction(this.callbacks.onBeforeClose)) {
    var returnedValue = this.callbacks.onBeforeClose(this.nodes);
    if (isBoolean(returnedValue) && !returnedValue) {
      return false;
    }
  }

  if (this.nodes) {
    this.nodes.result.classList.remove(this.classes.visibleVariant);
  }

  this.nodes.input.setAttribute("aria-expanded", false);
  this._clearAriaActiveDescendant();
  this._setKeyword("");

  if (isFunction(this.callbacks.onClose)) {
    this.callbacks.onClose(this.nodes);
  }

  this.isResultVisible = false;
  this.results = {};

  return true;
};

PredictiveSearchComponent.prototype.destroy = function () {
  this.close();

  if (isFunction(this.callbacks.onBeforeDestroy)) {
    var returnedValue = this.callbacks.onBeforeDestroy(this.nodes);
    if (isBoolean(returnedValue) && !returnedValue) {
      return false;
    }
  }

  this.nodes.result.classList.remove(this.classes.visibleVariant);
  removeInputAttributes(this.nodes.input);
  this._removeInputEventListeners();
  this._removeBodyEventListener();
  this._removeAccessibilityAnnouncer();
  this._removeClearButtonEventListener();

  if (isFunction(this.callbacks.onDestroy)) {
    this.callbacks.onDestroy(this.nodes);
  }

  return true;
};

PredictiveSearchComponent.prototype.clearAndClose = function () {
  this.nodes.input.value = "";
  this.close();
};

/**
 * Utilities
 */
function getTypeOf(value) {
  return Object.prototype.toString.call(value);
}

function isString(value) {
  return getTypeOf(value) === "[object String]";
}

function isBoolean(value) {
  return getTypeOf(value) === "[object Boolean]";
}

function isFunction(value) {
  return getTypeOf(value) === "[object Function]";
}

/* harmony default export */ var theme_predictive_search_component = (PredictiveSearchComponent);
;// ./src/snippets/predictive-search/predictive-search.ts
// @ts-ignore


function getLocales() {
    const containerEl = document.querySelector('.xo-predictive-search');
    const locales = containerEl?.dataset.locales;
    if (!locales) {
        throw new Error('Missing data-locales attribute');
    }
    return objectParse(locales);
}
function getLinkCol(data) {
    if (data?.products.length > 0 || data?.articles.length > 0) {
        return `--xs: 12; --sm: 4; --md: 4`;
    }
    else {
        return `--xs: 12; --sm: 6; --md: 12`;
    }
}
function getProductCol(data) {
    if (data?.pages.length > 0 || data?.collections.length > 0) {
        if (data?.articles.length > 0) {
            return `--xs: 12; --sm: 4; --md: 4`;
        }
        return `--xs: 12; --sm: 8; --md: 8`;
    }
    else {
        return `--xs: 12; --sm: 6; --md: 12`;
    }
}
function getArticleCol(data) {
    if (data?.pages.length > 0 || data?.collections.length > 0) {
        if (data?.products.length > 0) {
            return `--xs: 12; --sm: 4; --md: 4`;
        }
        return `--xs: 12; --sm: 8; --md: 8`;
    }
    else {
        return `--xs: 12; --sm: 6; --md: 12`;
    }
}
function Page({ url, title }) {
    return `
    <a href="${url}" data-search-result class='xo-predictive-search__item'>
      <span>${title}</span>
    </a>
  `;
}
function Collection({ url, title }) {
    return `
    <a href="${url}" data-search-result class='xo-predictive-search__item'>
      <span>${title}</span>
    </a>
  `;
}
function Product({ url, image, title, vendor, price }) {
    let display_currency_code;
    let display_vendor;
    let display_price;
    if (show_currency_code) {
        display_currency_code = 'inline-block';
    }
    else {
        display_currency_code = 'none';
    }
    if (show_vendor) {
        display_vendor = 'block';
    }
    else {
        display_vendor = 'none';
    }
    ;
    if (show_price) {
        display_price = 'flex';
    }
    else {
        display_price = 'none';
    }
    return `
    <a href="${url}" data-search-result class='xo-predictive-search__item'>
      <img src="${image}" alt="${title}" class='xo-predictive-search__item-image' is='xo-lazyload' loading='lazy'/>
      <div>
        <div class='xo-predictive-search__product-title'>${title}</div>
        <div class='xo-predictive-search__product-vendor' style='display:${display_vendor}'>${vendor}</div>
        <div class='xo-predictive-search__product-price' style='display:${display_price}'><span>${currency_symbol}${price}</span><span style='display: ${display_currency_code}'>${currency_code}</span></div>
      </div>
    </a>
  `;
}
function Article({ url, image, title }) {
    return `
    <a href="${url}" data-search-result class='xo-predictive-search__item'>
      <img src="${image}" alt="${title}" class='xo-predictive-search__item-image' is='xo-lazyload' loading='lazy'/>
      <span class='xo-predictive-search__article-title'>${title}</span>
    </a>
  `;
}
function ProductList(data) {
    const hasData = data?.products.length > 0;
    if (!hasData) {
        return '';
    }
    return `
    <div style="${getProductCol(data)}">
      <h3 id='predictive-search-product'>${getLocales().products}</h3>
      <xo-grid style='--col-width: 15rem' class='xo-predictive-search__item-list' aria-labelledby='predictive-search-product'>
        ${data.products.map(Product).join('')}
      </xo-grid>
    </div>
  `;
}
function ArticleList(data) {
    const hasData = data?.articles.length > 0;
    if (!hasData) {
        return '';
    }
    return `
    <div style="${getArticleCol(data)}">
    <h3 id='predictive-search-article'>${getLocales().articles}</h3>
      <xo-grid style='--col-width: 15rem' class='xo-predictive-search__item-list' aria-labelledby='predictive-search-article'>
        ${data.articles.map(Article).join('')}
      </xo-grid>
    </div>
  `;
}
function CollectionList(data) {
    const hasData = data?.collections.length > 0;
    if (!hasData) {
        return '';
    }
    return `
    <h3 id='predictive-search-collection'>${getLocales().collections}</h3>
    <div class='xo-predictive-search__item-list xo-predictive-search__item-list--article' aria-labelledby='predictive-search-collection'>
      ${data.collections.map(Collection).join('')}
    </div>
  `;
}
function PageList(data) {
    const hasData = data?.pages.length > 0;
    if (!hasData) {
        return '';
    }
    return `
    <h3 id='predictive-search-page'>${getLocales().pages}</h3>
    <div class='xo-predictive-search__item-list' aria-labelledby='predictive-search-page'>
      ${data.pages.map(Page).join('')}
    </div>
  `;
}
function LinkList(data) {
    const hasData = data?.collections.length > 0 || data?.pages.length > 0;
    if (!hasData) {
        return '';
    }
    return `
    <div style="${getLinkCol(data)}">
      ${CollectionList(data)}
      ${PageList(data)}
    </div>
  `;
}
function Root(data) {
    const hasData = data?.products.length > 0 || data?.articles.length > 0 || data?.pages.length > 0 || data?.collections.length > 0;
    if (!hasData) {
        return '';
    }
    return `
    <div class="xo-predictive-search__inner">
      <xo-container>
        <xo-grid>
          ${LinkList(data)}
          ${ProductList(data)}
          ${ArticleList(data)}
        </xo-grid>
      </xo-container>
    </div>
  `;
}
const predictiveSearch = new theme_predictive_search_component({
    selectors: {
        input: '[data-predictive-search-input="header"]',
        reset: '[data-predictive-search-reset="header"]',
        result: '[data-predictive-search-result="header"]',
    },
    PredictiveSearchAPIConfig: {
        search_path: '/search',
        resources: {
            type: ['product', 'article', 'page', 'collection'],
            options: {
                unavailable_products: 'last',
                fields: ['title', 'vendor', 'product_type', 'variants.title'],
            },
        },
    },
    resultTemplateFct: Root,
    // (a11y) Function to return the number of results that you will display.
    // This will be announced to the user via an aria-live.
    numberOfResultsTemplateFct: (data) => {
        if (data.products.length === 1) {
            return 'one result found';
        }
        return '[results_count] results found'.replace('[results_count]', `${data.products.length}`);
    },
    // (a11y) Return a string that indicates that we're loading results.
    // This will be announced to the user via an aria-live.
    loadingResultsMessageTemplateFct: () => {
        return 'loading';
    },
    onInputFocus: (nodes) => {
        if (nodes.input.value) {
            predictiveSearch.open();
        }
    },
    onInputKeyup: () => {
        return true; // This will allow the event callback to execute
    },
    onInputBlur: () => {
        return false; // This will prevent the event callback to execute
    },
    // onInputClear: (nodes) => {},s
    // onBeforeKill: (nodes) => {},
    // onBeforeOpen: (nodes) => {},
    // onOpen: (nodes) => {},
    // onBeforeClose: (nodes) => {},
    // onClose: (nodes) => {},
    // onDestroy: (nodes) => {},
});

// EXTERNAL MODULE: ./src/snippets/scroll-top/scroll-top.ts
var scroll_top = __webpack_require__(561);
;// ./src/snippets/share/share.ts

const share_COMPONENT_NAME = 'xo-copy';
const TOAST_NAME = 'share-copy';
class Copy extends HTMLElement {
    static defaultOptions = {
        xoUrl: '',
    };
    get options() {
        const options = getAttrs(this, {
            pick: ['xoUrl'],
            types: {
                xoUrl: 'string',
            },
        });
        return {
            ...Copy.defaultOptions,
            ...options,
        };
    }
    handleClick = async () => {
        try {
            const { options } = this;
            const { xoUrl } = options;
            await navigator.clipboard.writeText(xoUrl);
            // @ts-ignore
            xoToast({ name: TOAST_NAME });
        }
        catch (err) {
            console.error(err);
        }
    };
    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
    }
}
componentDefine({
    [share_COMPONENT_NAME]: Copy,
});

;// ./src/pages/addresses/snippets/address-form/address-form.ts

const address_form_COMPONENT_NAME = 'xo-address-form';
const EDIT_ADDRESS_PREFIX = 'edit-address-';
const CREATE_ADDRESS = 'create-address';
const CREATE_ADDRESS_ID = 'new';
const PARENT_SELECTOR = '.js-address-province';
class AddressForm extends HTMLElement {
    unsubscribe = () => { };
    addressId = '';
    selectCountryEl = null;
    connectedCallback() {
        // @ts-ignore
        this.unsubscribe = xoStore.subscribe('xo-modal', ({ data }) => {
            const modalData = objectValues(data).find((item) => item.isOpen);
            if (modalData && modalData.isOpen) {
                if (modalData.options.xoName?.includes(EDIT_ADDRESS_PREFIX)) {
                    this.addressId = modalData.options.xoName.replace(EDIT_ADDRESS_PREFIX, '');
                    this.bindCountry();
                }
                else if (modalData.options.xoName === CREATE_ADDRESS) {
                    this.addressId = CREATE_ADDRESS_ID;
                    this.bindCountry();
                }
            }
        });
    }
    bindCountry = () => {
        this.selectCountryEl = document.querySelector(`select[name="address[country]"][data-country-id="${this.addressId}"]`);
        const countryDataDefault = this.selectCountryEl?.getAttribute('data-default');
        const countryOptionEl = this.selectCountryEl?.querySelector(`option[value="${countryDataDefault}"]`);
        if (countryOptionEl) {
            countryOptionEl.setAttribute('selected', 'selected');
            const provinces = this.getProvinces(countryOptionEl);
            this.renderProvinces(provinces);
        }
        const selectProvinceEl = document.querySelector(`select[name="address[province]"][data-province-id="${this.addressId}"]`);
        const provinceDataDefault = selectProvinceEl?.getAttribute('data-default');
        const provinceOptionEl = selectProvinceEl?.querySelector(`option[value="${provinceDataDefault}"]`);
        if (provinceOptionEl) {
            provinceOptionEl.setAttribute('selected', 'selected');
        }
        this.selectCountryEl?.addEventListener('change', this.handleCountryChange);
    };
    getProvinces = (optionEl) => {
        const provinces = objectParse(optionEl.getAttribute('data-provinces') ?? '[]');
        return provinces;
    };
    handleCountryChange = (event) => {
        const targetEl = event.target;
        const optionEl = targetEl.querySelector(`option[value="${targetEl.value}"]`);
        if (optionEl) {
            const provinces = this.getProvinces(optionEl);
            this.renderProvinces(provinces);
        }
    };
    renderProvinces = (provinces) => {
        const selectProvinceEl = document.querySelector(`select[name="address[province]"][data-province-id="${this.addressId}"]`);
        if (selectProvinceEl) {
            selectProvinceEl.innerHTML = provinces.map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
            const parentEl = selectProvinceEl.closest(PARENT_SELECTOR);
            const isShow = provinces.length > 0;
            if (parentEl) {
                if (isShow) {
                    parentEl.classList.remove('hide');
                }
                else {
                    parentEl.classList.add('hide');
                }
            }
        }
    };
    disconnectedCallback() {
        this.unsubscribe();
        this.selectCountryEl?.removeEventListener('change', this.handleCountryChange);
    }
}
componentDefine({
    [address_form_COMPONENT_NAME]: AddressForm,
});

// EXTERNAL MODULE: ./src/pages/collection/main-collection/main-collection.ts
var main_collection = __webpack_require__(246);
;// ./src/pages/product/main-product/main-product.ts

const QUICK_VIEW_NAME = 'quick-view';
const globalShopify = window.Shopify;
//Function: run slide and scroll to image when click on variants
class ProductInformationVariantHandler {
    productInfoEl;
    productDataEl;
    productData;
    CAROUSEL_NAME = window.innerWidth > 767 ? 'product-information-desktop' : 'product-information-mobile';
    variantSelected = {};
    cartFormUnsubscribe = () => { };
    constructor(productInformationSelector) {
        this.productInfoEl = document.querySelector(productInformationSelector);
        this.productDataEl = this.productInfoEl?.querySelector('xo-product-data script');
        this.productData = objectParse(this.productDataEl?.textContent ?? '');
    }
    getMediaId() {
        const variantValueSelected = Object.values(this.variantSelected || {});
        let mediaId = this.productData.variants.find(variant => {
            return JSON.stringify(variant.options.sort()) === JSON.stringify(variantValueSelected.sort());
        })?.featured_media?.id;
        if (!mediaId) {
            mediaId = this.productData.variants.find(variant => variant.featured_media)?.featured_media?.id;
        }
        return mediaId;
    }
    handleCarousel(mediaId) {
        const carouselSlideEls = Array.from(this.productInfoEl?.querySelectorAll(`xo-carousel[xo-name*="${this.CAROUSEL_NAME}"] xo-carousel-slide[data-media-id]:not([xo-cloned])`) ?? []);
        const currentIndex = carouselSlideEls.findIndex(el => {
            return el.getAttribute('data-media-id') === mediaId?.toString();
        });
        const carouselEl = carouselSlideEls?.[0]?.closest(`xo-carousel[xo-name*="${this.CAROUSEL_NAME}"]`);
        const carouselName = carouselEl?.getAttribute('xo-name');
        if (carouselName) {
            // @ts-ignore
            xoCarousel.goTo(carouselName, currentIndex);
        }
    }
    handleScrollTo(mediaId) {
        const el = this.productInfoEl?.querySelector(`xo-animate[data-media-id="${mediaId}"]`);
        if (el) {
            const { top } = offset_offset(el);
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    }
    init() {
        // @ts-ignore
        this.cartFormUnsubscribe = cartFormSubscribe(() => {
            const sectionId = this.productInfoEl?.getAttribute('xo-section-id');
            const productId = this.productInfoEl?.getAttribute('xo-product-id');
            const id = `${sectionId}/${productId}`;
            // @ts-ignore
            const cartFormState = getCartFormState()?.[id];
            if (cartFormState) {
                const variantSelected = cartFormState.variantSelected;
                if (JSON.stringify(variantSelected) !== JSON.stringify(this.variantSelected)) {
                    this.variantSelected = variantSelected;
                    const mediaId = this.getMediaId();
                    this.handleCarousel(mediaId);
                    this.handleScrollTo(mediaId);
                }
            }
        });
    }
    unsubscribe = () => {
        this.cartFormUnsubscribe();
    };
}
//Function: run 3D AR product
class ProductModel extends HTMLElement {
    modelViewerUI;
    constructor() {
        super();
        const poster = this.querySelector('.xb-product-model__poster');
        if (!poster) {
            return;
        }
        poster.addEventListener('click', this.loadContent.bind(this));
    }
    loadContent() {
        if (!this.getAttribute('loaded')) {
            const content = document.createElement('div');
            const currentTemplateEl = this.querySelector('template');
            if (!!currentTemplateEl) {
                const firstEl = currentTemplateEl.content.firstElementChild;
                if (!!firstEl) {
                    content.appendChild(firstEl.cloneNode(true));
                }
            }
            this.setAttribute('loaded', 'true');
            const viewerEl = content.querySelector('model-viewer');
            if (viewerEl) {
                const deferredElement = this.appendChild(viewerEl);
                deferredElement.focus();
            }
        }
        globalShopify.loadFeatures([
            {
                name: 'model-viewer-ui',
                version: '1.0',
                onLoad: this.setupModelViewerUI.bind(this),
            },
        ]);
    }
    setupModelViewerUI(errors) {
        if (errors) {
            return;
        }
        this.modelViewerUI = new globalShopify.ModelViewerUI(this.querySelector('model-viewer'));
    }
}
window.customElements.define('xo-product-model', ProductModel);
//Function: accept term and policy for buy buttons
class AcceptPolicyHandler {
    TERMS_NAME = '@term';
    inputPolicyEls = document.querySelectorAll(".xo-field-checkbox__input[name='agree_policy'][type='checkbox']");
    constructor() {
        this.init();
    }
    setTerms = (value) => {
        localStorage.setItem(this.TERMS_NAME, value ? 'true' : 'false');
    };
    getTerms = () => {
        const terms = localStorage.getItem(this.TERMS_NAME);
        if (terms == null) {
            return false;
        }
        return terms === 'true' ? true : false;
    };
    handleChange = (event) => {
        const currentEl = event.target;
        this.setTerms(currentEl.checked);
        this.termsBinding();
    };
    termsBinding = () => {
        const termsBindingEls = document.querySelectorAll('.terms-binding');
        const terms = this.getTerms();
        termsBindingEls.forEach(termsBindingEl => {
            if (terms) {
                termsBindingEl.classList.remove('disabled-button');
            }
            else {
                termsBindingEl.classList.add('disabled-button');
            }
        });
    };
    setDefaultChecked = (inputPolicyEl) => {
        inputPolicyEl.checked = this.getTerms();
    };
    init() {
        if (this.inputPolicyEls.length > 0) {
            this.inputPolicyEls.forEach(inputPolicyEl => {
                inputPolicyEl.addEventListener('input', this.handleChange);
                this.setDefaultChecked(inputPolicyEl);
            });
            this.termsBinding();
        }
    }
}
// Handle quickview open modal
const productInformationVariantHandler = new ProductInformationVariantHandler('xo-product[xo-product-information]');
productInformationVariantHandler.init();
new AcceptPolicyHandler();
const quickviewModalEl = document.querySelector(`xo-modal[xo-name="${QUICK_VIEW_NAME}"]`);
if (quickviewModalEl) {
    const observer = new MutationObserver(() => {
        const quickviewProductInformationVariantHandler = new ProductInformationVariantHandler('xo-product-quick-view xo-product[xo-product-information]');
        if (attrBoolean.get(quickviewModalEl, 'xo-active')) {
            quickviewProductInformationVariantHandler.init();
            productInformationVariantHandler.unsubscribe();
            new AcceptPolicyHandler();
        }
        else {
            productInformationVariantHandler.init();
            quickviewProductInformationVariantHandler.unsubscribe();
        }
    });
    observer.observe(quickviewModalEl, {
        attributes: true,
        attributeFilter: ['xo-active']
    });
}

;// ./src/pages/product/snippets/visitor/visitor.ts
var visitor_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let Example = class Example extends XoComponent {
    static propTypes = {
        xoMax: 'number',
        xoMin: 'number',
        xoChange: 'number',
    };
    static defaultProps = {
        xoMin: 100,
        xoMax: 500,
        xoChange: 10,
    };
    state = {
        visitorCount: 200,
    };
    randomVisitorNumberEl = null;
    intervalId = -1;
    handleRandomNumber = (xoMin, xoMax) => {
        const minNumber = Math.min(xoMin, xoMax);
        const maxNumber = Math.max(xoMin, xoMax);
        const visitorCount = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        this.setState({ visitorCount: visitorCount });
        this.updateUI(this.state.visitorCount);
    };
    updateUI = (visitorCount) => {
        if (this.randomVisitorNumberEl) {
            this.randomVisitorNumberEl.textContent = visitorCount.toString();
        }
    };
    mount() {
        this.randomVisitorNumberEl = this.querySelector('xo-random-visitor-number');
        const { xoMin, xoMax, xoChange } = this.props;
        this.handleRandomNumber(xoMin, xoMax);
        this.intervalId = window.setInterval(() => this.handleRandomNumber(xoMin, xoMax), xoChange * 1000);
    }
    unmount() {
        window.clearInterval(this.intervalId);
    }
};
Example = visitor_decorate([
    customElements_customElements('xo-random-visitor')
], Example);


;// ./src/scripts/components/360-viewer/configureCore.ts
const WebComponent = {
    Xo360Viewer: 'xo-360-viewer',
    Xo360ViewerContent: 'xo-360-viewer-content',
    Xo360ViewerNext: 'xo-360-viewer-next',
    Xo360ViewerPrev: 'xo-360-viewer-prev',
    Xo360ViewerPlay: 'xo-360-viewer-play',
    Xo360ViewerPause: 'xo-360-viewer-pause',
};

;// ./src/scripts/components/360-viewer/getImages.ts

function getImages(images) {
    if (images.startsWith('[') && images.endsWith(']')) {
        return objectParse(images);
    }
    const result = [];
    const [min, max] = images.replace(/.*{/g, '').replace(/}.*/g, '').replace(/\s/g, '').split(',');
    const minNum = Number(min);
    const maxNum = Number(max);
    const format = min.replace(/\d/g, '0');
    for (let i = minNum; i <= maxNum; i++) {
        const regexp = new RegExp(`(.*)(\\d{${i.toString().length}})`, 'g');
        const name = format.length === 1 ? `${i}` : format.replace(regexp, `$1${i}`);
        const imageUrl = images.replace(/{.*}/g, name);
        result.push(imageUrl);
    }
    return result;
}

;// ./src/scripts/components/360-viewer/loadImage.ts
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(url);
        image.onerror = () => reject('Error loading image');
        image.src = url;
    });
}

;// ./src/scripts/components/360-viewer/360ViewerStore.ts



class Xo360ViewerStore {
    listeners = [];
    state;
    constructor(initial = 0) {
        this.state = {
            index: initial,
            loading: true,
            images: [],
            min: 0,
            max: 0,
        };
    }
    setState(state) {
        this.state = {
            ...this.state,
            ...state,
        };
        this.listeners.forEach((listener) => listener());
    }
    increment = () => {
        const { index, max, min } = this.state;
        if (index === max) {
            this.setState({ index: min });
        }
        else {
            this.setState({ index: index + 1 });
        }
    };
    decrement = () => {
        const { index, min, max } = this.state;
        if (index === min) {
            this.setState({ index: max });
        }
        else {
            this.setState({ index: index - 1 });
        }
    };
    setIndexWrapAroundRange = (value) => {
        const { min, max } = this.getState();
        const index = wrapAroundRange(Math.floor(value), min, max);
        this.setState({ index });
    };
    imagesRequest = async (xoImages) => {
        try {
            const imageUrls = getImages(xoImages);
            const imagesLoaded = await Promise.allSettled(imageUrls.map((url) => loadImage(url)));
            const images = imagesLoaded.reduce((acc, cur) => {
                if (cur.status === 'fulfilled') {
                    acc.push(cur.value);
                }
                return acc;
            }, []);
            this.setState({
                max: images.length - 1,
                images,
                loading: false,
            });
        }
        catch (error) {
            this.setState({
                loading: false,
            });
        }
    };
    getState() {
        return this.state;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}

;// ./src/scripts/components/360-viewer/360Viewer.ts



const MAX_SPEED = 1000;
const MAX_PAN_SPEED = 100;
const DURATION = 2000;
class Xo360Viewer extends HTMLElement {
    store;
    nextEl = null;
    prevEl = null;
    playEl = null;
    pauseEl = null;
    pan = null;
    prevDx = 0;
    start = Date.now();
    animated = createAnimate();
    image = new Image();
    unsubscribe = () => { };
    stopAnimated = () => { };
    static defaultOptions = {
        xoSpeed: 10,
        xoImages: '',
        xoPanSpeed: 10,
    };
    getOptions = () => {
        const options = getAttrs(this, {
            pick: ['xoSpeed', 'xoImages', 'xoPanSpeed'],
            types: {
                xoSpeed: 'number',
                xoImages: 'string',
                xoPanSpeed: 'number',
            },
        });
        return {
            ...Xo360Viewer.defaultOptions,
            ...options,
        };
    };
    listener = () => {
        const { loading } = this.store.getState();
        if (!loading) {
            attrBoolean.set(this, 'xo-loading', false);
            this.appendImage();
        }
    };
    appendImage = () => {
        const { index, images } = this.store.getState();
        const contentEl = this.querySelector(WebComponent.Xo360ViewerContent);
        if (contentEl) {
            this.image.src = images[index];
            this.image.alt = '';
            if (!contentEl.firstChild) {
                contentEl.appendChild(this.image);
            }
        }
    };
    handleNext = () => {
        this.store.increment();
    };
    handlePrev = () => {
        this.store.decrement();
    };
    handleFrameUpdate = () => {
        const { xoSpeed } = this.getOptions();
        const ellapsed = Date.now() - this.start;
        if (ellapsed > MAX_SPEED / xoSpeed) {
            this.store.increment();
            this.start = Date.now();
        }
    };
    handlePlay = () => {
        this.stopAnimated();
        attrBoolean.set(this, 'xo-playing', true);
        frameManager.add(this.handleFrameUpdate, true);
    };
    handlePause = () => {
        attrBoolean.set(this, 'xo-playing', false);
        frameManager.remove(this.handleFrameUpdate);
    };
    bindEvents = () => {
        const { xoPanSpeed } = this.getOptions();
        this.nextEl?.addEventListener('click', this.handleNext);
        this.prevEl?.addEventListener('click', this.handlePrev);
        this.playEl?.addEventListener('click', this.handlePlay);
        this.pauseEl?.addEventListener('click', this.handlePause);
        const contentEl = this.querySelector(WebComponent.Xo360ViewerContent);
        this.pan = panGesture({
            element: contentEl,
            onStart: () => {
                this.stopAnimated();
            },
            onMove: ({ dx }) => {
                const ellapsed = Date.now() - this.start;
                if (ellapsed > MAX_PAN_SPEED / xoPanSpeed) {
                    if (dx > this.prevDx) {
                        this.store.decrement();
                    }
                    else if (dx < this.prevDx) {
                        this.store.increment();
                    }
                    this.prevDx = dx;
                    this.start = Date.now();
                }
            },
            onEnd: ({ vx }) => {
                const { index } = this.store.getState();
                const { setIndexWrapAroundRange } = this.store;
                this.stopAnimated = this.animated({
                    from: index,
                    to: index - vx,
                    duration: DURATION,
                    easing: easings.easeOutExpo,
                    onUpdate: setIndexWrapAroundRange,
                });
            },
        });
    };
    initial = () => {
        this.nextEl = this.querySelector(WebComponent.Xo360ViewerNext);
        this.prevEl = this.querySelector(WebComponent.Xo360ViewerPrev);
        this.playEl = this.querySelector(WebComponent.Xo360ViewerPlay);
        this.pauseEl = this.querySelector(WebComponent.Xo360ViewerPause);
        this.store = new Xo360ViewerStore(0);
        this.pan = null;
        attrBoolean.set(this, 'xo-loading', true);
    };
    renderContent = () => {
        const content = `<${WebComponent.Xo360ViewerContent}></${WebComponent.Xo360ViewerContent}>`;
        this.insertAdjacentHTML('afterbegin', content);
    };
    loadImages = async () => {
        const { xoImages } = this.getOptions();
        const { imagesRequest } = this.store;
        await imagesRequest(xoImages);
        this.removeAttribute('xo-images');
    };
    connectedCallback() {
        this.initial();
        this.loadImages();
        this.renderContent();
        this.bindEvents();
        this.unsubscribe = this.store.subscribe(this.listener);
    }
    disconnectedCallback() {
        this.unsubscribe();
        this.pan?.destroy();
    }
}

;// ./src/scripts/components/360-viewer/index.ts



componentDefine({
    [WebComponent.Xo360Viewer]: Xo360Viewer,
});

;// ./src/scripts/components/list-trigger/constants.ts
const constants_WebComponent = {
    List: 'xo-list',
    ListTrigger: 'xo-list-trigger',
    ListPortal: 'xo-list-portal',
    ListItem: 'xo-list-item',
};

;// ./src/scripts/components/list-trigger/setAnimate.ts
const setAnimate = {
    // @ts-ignore
    none: window.xoAnimate.none,
    // @ts-ignore
    zoom: window.xoAnimate.zoom(true),
    // @ts-ignore
    fade: window.xoAnimate.move(),
    // @ts-ignore
    'fade-up': window.xoAnimate.move({ dy: 50 }),
    // @ts-ignore
    'fade-down': window.xoAnimate.move({ dy: -50 }),
    // @ts-ignore
    'fade-left': window.xoAnimate.move({ dx: 50 }),
    // @ts-ignore
    'fade-right': window.xoAnimate.move({ dx: -50 }),
};

;// ./src/scripts/components/list-trigger/store.ts

function createState() {
    // @ts-ignore
    window.xoStore.create('xo-list', {
        initialState: {
            data: {},
            listNameTrigger: '',
        },
    });
}
function setIdxs(name, idxs) {
    // @ts-ignore
    window.xoStore.set('xo-list', (prevState) => {
        const data = prevState?.data || {};
        const prev = data?.[name] || {};
        return {
            ...prevState,
            data: {
                ...data,
                [name]: {
                    ...prev,
                    idxs,
                },
            },
        };
    });
}
function replaceFirstId(name, oldIndex, newIndex) {
    // @ts-ignore
    window.xoStore.set('xo-list', (prevState) => {
        const data = prevState?.data || {};
        const prev = data?.[name] || {};
        return {
            ...prevState,
            data: {
                ...data,
                [name]: {
                    ...prev,
                    idxs: map(prev?.idxs || [], (i) => {
                        if (i === oldIndex) {
                            return newIndex;
                        }
                        return i;
                    }),
                },
            },
        };
    })('xo-list/replaceLastId');
}
function removeIndex(name, index) {
    // @ts-ignore
    window.xoStore.set('xo-list', (prevState) => {
        const data = prevState?.data || {};
        const prev = data?.[name] || {};
        const idxs = filter_filter(prev?.idxs || [], (i) => i !== index);
        return {
            ...prevState,
            data: {
                ...data,
                [name]: {
                    ...prev,
                    idxs,
                },
            },
        };
    });
}
function toggle(name, value) {
    // @ts-ignore
    window.xoStore.set('xo-list', (prevState) => {
        const data = prevState?.data || {};
        const prev = data?.[name] || {};
        return {
            ...prevState,
            data: {
                ...data,
                [name]: {
                    ...prev,
                    isOpen: value == null ? !prev.isOpen : value,
                },
            },
            listNameTrigger: name,
        };
    });
}
function getState() {
    // @ts-ignore
    return window.xoStore.get('xo-list');
}
function subscribe(listener, equal) {
    // @ts-ignore
    return window.xoStore.subscribe('xo-list', listener, equal);
}

;// ./src/scripts/components/list-trigger/ListPortal.ts




class ListPortal extends HTMLElement {
    unsubscribe = () => { };
    animated = createAnimate();
    prevIsOpen = false;
    name = '';
    info = [];
    buttonEl = null;
    options = null;
    connectedCallback() {
        window.addEventListener('resize', this.handler);
        window.addEventListener('scroll', this.handler);
        // Hack riêng cho thằng tab component
        this.addEventListener('click', this.handleForTabsComponent);
        this.unsubscribe = subscribe(this.listener);
    }
    disconnectedCallback() {
        this.unsubscribe();
        this.animated.off();
        window.removeEventListener('resize', this.handler);
        window.removeEventListener('scroll', this.handler);
        this.removeEventListener('click', this.handleForTabsComponent);
    }
    /**
     * Trường hợp cheat riêng cho tab component
     */
    handleForTabsComponent = (event) => {
        if (event.target instanceof HTMLElement) {
            const state = getState();
            const tabsTriggerEl = (event.target.tagName.toLowerCase() === 'xo-tabs-trigger' ? event.target : event.target.closest('xo-tabs-trigger'));
            const targetListItemEl = tabsTriggerEl?.closest?.(constants_WebComponent.ListItem);
            const providerEl = Array.from(document.querySelectorAll(constants_WebComponent.List)).find((el) => el.name === state.listNameTrigger);
            if (!!tabsTriggerEl && !!targetListItemEl) {
                // @ts-ignore
                tabsTriggerEl.widthFromList = targetListItemEl.offsetWidth;
            }
            if (!!targetListItemEl && !!providerEl) {
                const listItemEls = providerEl.querySelectorAll(constants_WebComponent.ListItem);
                const lastElement = listItemEls[listItemEls.length - 1];
                const nextIndex = this.info.findIndex((item) => item.element === lastElement);
                const targetIndex = this.info.findIndex((item) => item.element === targetListItemEl);
                if (targetIndex != null && nextIndex != null) {
                    replaceFirstId(state.listNameTrigger, targetIndex, nextIndex);
                }
            }
        }
    };
    handler = () => {
        if (!this.options) {
            return;
        }
        const { xoPortalPlacement, xoPortalOffset } = this.options;
        if (this.buttonEl) {
            const measure = popper(this.buttonEl, {
                placement: xoPortalPlacement,
                offset: xoPortalOffset,
                element: this,
            });
            this.style.top = `${measure.top - window.scrollY}px`;
            this.style.left = `${measure.left}px`;
        }
    };
    handleOpen = () => {
        if (!this.options) {
            return;
        }
        const { xoPortalAnimate, xoPortalEasing, xoPortalDuration, xoPortalPlacement, xoPortalOffset, xoPortalClass } = this.options;
        if (this.buttonEl) {
            if (xoPortalClass) {
                this.classList.add(xoPortalClass);
            }
            const measure = popper(this.buttonEl, {
                placement: xoPortalPlacement,
                offset: xoPortalOffset,
                element: this,
            });
            this.style.top = `${measure.top - window.scrollY}px`;
            this.style.left = `${measure.left}px`;
            this.animated({
                from: 0,
                to: 1,
                duration: xoPortalDuration,
                onUpdate: (value) => {
                    if (setAnimate[xoPortalAnimate]) {
                        setAnimate[xoPortalAnimate](this, { isOpen: true, easing: easings[xoPortalEasing], value });
                    }
                },
            });
        }
    };
    handleClose = () => {
        if (!this.options) {
            return;
        }
        const { xoPortalAnimate, xoPortalEasing, xoPortalDuration } = this.options;
        this.animated({
            from: 1,
            to: 0,
            duration: xoPortalDuration,
            onUpdate: (value) => {
                if (setAnimate[xoPortalAnimate]) {
                    setAnimate[xoPortalAnimate](this, { isOpen: false, easing: easings[xoPortalEasing], value });
                }
            },
        });
    };
    listener = (state) => {
        const { name, info } = this;
        if (state?.data?.[name]) {
            const providerRealEl = Array.from(document.querySelectorAll(constants_WebComponent.List)).find((el) => el.name === state.listNameTrigger);
            const listTriggerEls = providerRealEl?.querySelectorAll?.(constants_WebComponent.ListItem);
            const { idxs = [], isOpen } = state.data[name];
            each(info, ({ element, parentElement }, index) => {
                if (idxs.includes(index)) {
                    this.appendChild(element);
                    // Đoạn này dành riêng cho trường hợp bấm vào thằng tab
                }
                else if (listTriggerEls) {
                    parentElement.insertBefore(element, parentElement.children[listTriggerEls.length - 1]);
                }
            });
            if (this.prevIsOpen !== !!isOpen) {
                if (isOpen) {
                    this.handleOpen();
                    attrBoolean.set(this, 'xo-active', true);
                }
                else {
                    this.handleClose();
                    attrBoolean.set(this, 'xo-active', false);
                }
                this.prevIsOpen = !!isOpen;
            }
        }
    };
}

;// ./src/scripts/components/list-trigger/ListTrigger.ts


class ListTrigger extends HTMLElement {
    unsubscribe = () => { };
    name = '';
    portalEl = null;
    _options;
    static defaultOptions = {
        xoPortalAnimate: 'fade-up',
        xoPortalDuration: 300,
        xoPortalEasing: 'decay',
        xoPortalPlacement: 'bottom-right',
        xoPortalOffset: 10,
        xoPortalClass: '',
        xoPortalClickHide: true,
    };
    get options() {
        return {
            ...ListTrigger.defaultOptions,
            ...this._options,
        };
    }
    set options(value) {
        this._options = value;
    }
    static get observedAttributes() {
        return ['xo-observed'];
    }
    setOptions = () => {
        this.options = getAttrs(this, {
            pick: ['xoPortalAnimate', 'xoPortalDuration', 'xoPortalEasing', 'xoPortalPlacement', 'xoPortalOffset', 'xoPortalClass', 'xoPortalClickHide'],
            types: {
                xoPortalAnimate: 'string',
                xoPortalDuration: 'number',
                xoPortalEasing: 'string',
                xoPortalPlacement: 'string',
                xoPortalOffset: 'number',
                xoPortalClass: 'string',
                xoPortalClickHide: 'boolean',
            },
        });
    };
    handleOutsideClick = (event) => {
        const { xoPortalClickHide } = this.options;
        const { name } = this;
        const state = getState();
        // @ts-ignore
        const popoverState = window.xoStore.get('xo-popover');
        const popoverIsOpen = !!objectValues(popoverState.data).find((item) => item.isOpen)?.isOpen;
        // Chú ý: Nếu có popover đang mở thì không làm gì cả
        if (state?.data?.[name] && !popoverIsOpen) {
            const { isOpen } = state.data[name];
            const target = event.target;
            // Nếu xoPortalClickHide = true thì khi click vào bất kì vị trí nào cũng sẽ đóng list
            // Nếu xoPortalClickHide = false thì khi click vào bất kì vị trí nào ngoại trừ portal và trigger thì sẽ đóng list
            if (xoPortalClickHide) {
                if (isOpen && !this.contains(target)) {
                    toggle(this.name);
                }
            }
            else if (isOpen && !this.contains(target) && !this.portalEl?.contains(target)) {
                toggle(this.name);
            }
        }
    };
    listener = (state) => {
        const { name } = this;
        if (state?.data?.[name]) {
            const { idxs = [], isOpen } = state.data[name];
            attrBoolean.set(this, 'xo-visible', !!idxs.length);
            attrBoolean.set(this, 'xo-active', isOpen);
        }
    };
    handleClick = () => {
        if (this.portalEl) {
            this.portalEl.buttonEl = this;
            this.portalEl.options = this.options;
        }
        toggle(this.name);
    };
    connectedCallback() {
        this.setOptions();
        this.addEventListener('click', this.handleClick);
        window.addEventListener('click', this.handleOutsideClick);
        this.unsubscribe = subscribe(this.listener);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'xo-observed' && oldValue !== newValue) {
            this.setOptions();
        }
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
        window.removeEventListener('click', this.handleOutsideClick);
        this.unsubscribe();
    }
}

;// ./src/scripts/components/list-trigger/List.ts



let id = 0;
class List extends HTMLElement {
    name = '';
    info = [];
    portalEl = null;
    buttonElement = null;
    resizeObserver = null;
    idleId = -1;
    constructor() {
        super();
        id++;
        this.name = `horizontal-list-${id}`;
    }
    get childElements() {
        return Array.from(this.querySelectorAll(constants_WebComponent.ListItem));
    }
    hasButton(buttonElement) {
        if (!buttonElement) {
            return false;
        }
        return buttonElement.tagName.toLowerCase() === constants_WebComponent.ListTrigger;
    }
    handler = () => {
        const buttonWidth = this.buttonElement?.scrollWidth || 0;
        const parentWidth = this.offsetWidth - buttonWidth;
        const indexs = [];
        if (this.portalEl) {
            this.portalEl.name = this.name;
            this.portalEl.info = this.info;
        }
        each(this.info, ({ element, parentElement, position, width, left }, index) => {
            if (element !== this.buttonElement) {
                if (left + width >= parentWidth) {
                    indexs.push(index);
                }
                else {
                    removeIndex(this.name, index);
                    parentElement.insertBefore(element, parentElement.children[position]);
                }
            }
        });
        setIdxs(this.name, indexs);
        if (!indexs.length) {
            toggle(this.name, false);
        }
    };
    setInfo = () => {
        const { left: parentLeft } = offset_offset(this);
        this.info = map(this.childElements, (childEl) => {
            const { left } = offset_offset(childEl);
            const parentElement = childEl.parentElement;
            return {
                element: childEl,
                position: Array.from(parentElement.children).indexOf(childEl),
                parentElement,
                left: left - parentLeft,
                width: childEl.offsetWidth,
            };
        });
    };
    renderPortal = () => {
        if (this.portalEl) {
            this.portalEl.name = this.name;
            this.portalEl.info = this.info;
            const bodyChildEls = Array.from(document.body.children);
            if (!bodyChildEls.includes(this.portalEl)) {
                document.body.appendChild(this.portalEl);
            }
        }
    };
    handleButton = () => {
        if (this.hasButton(this.buttonElement)) {
            this.buttonElement.name = this.name;
            this.buttonElement.portalEl = this.portalEl;
        }
    };
    connectedCallback() {
        this.portalEl = document.createElement(constants_WebComponent.ListPortal);
        this.buttonElement = this.querySelector(constants_WebComponent.ListTrigger);
        this.setInfo();
        this.renderPortal();
        this.handleButton();
        this.handler();
        this.resizeObserver = new ResizeObserver(() => {
            this.idleId = requestIdleCallback(this.handler);
        });
        this.resizeObserver.observe(this);
    }
    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        this.portalEl?.remove?.();
        cancelIdleCallback(this.idleId);
    }
}

;// ./src/scripts/components/list-trigger/index.ts






createState();
componentDefine({
    [constants_WebComponent.ListPortal]: ListPortal,
    [constants_WebComponent.ListTrigger]: ListTrigger,
    [constants_WebComponent.List]: List,
});

;// ./src/main.ts
// Import all sections ts files



;
;
// Snippets ts
















// Import SCSS

// Import list-trigger, 360-viewer web component















// console.log('%c Designed by Xotiny ', 'background:#243b90;color: #fff', 'Learn more at https:/xotiny.com/');

/******/ })()
;