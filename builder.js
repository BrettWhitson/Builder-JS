/**
 * BuilderJS - Modern DOM manipulation library with scoped building patterns
 * @version 0.0.4
 * @description Simplified API with comprehensive security validation
 */

// ===== GLOBAL CONFIGURATION =====

/**
 * Global configuration and state management
 * @private
 */
const BuilderConfig = {
  validationMode: "warn", // 'strict', 'warn', 'silent'
};

/**
 * WeakMap for storing event listeners to prevent memory leaks
 * @private
 */
const eventListeners = new WeakMap();

// ===== UTILITY FUNCTIONS =====

/**
 * Validates HTML tag names
 * @param {string} tag - Tag name to validate
 * @returns {boolean} True if valid
 * @private
 */
function isValidTag(tag) {
  if (!tag || typeof tag !== "string") return false;

  // Check for basic HTML tag format (letters, numbers, hyphens)
  if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(tag)) return false;

  // List of valid HTML5 tags
  const validTags = new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "search", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"]);

  return validTags.has(tag.toLowerCase());
}

/**
 * Applies options to a DOM element with consistent handling
 * @param {HTMLElement} element - The element to apply options to
 * @param {Object} options - Options object containing attributes and properties
 * @private
 */
function applyElementOptions(element, options) {
  if (!options || !element) return;

  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      element.className = value;
    } else if (key === "innerText") {
      element.innerText = value;
    } else if (key === "innerHTML") {
      element.innerHTML = value;
    } else {
      element.setAttribute(key, value);
    }
  });
}

// ===== MAIN BUILDER CLASS =====

/**
 * Main Builder class for DOM manipulation with scoped building patterns
 * @class Builder
 * @description Provides modern scoped building interface without navigation hell
 */
class Builder {
  // === STATIC METHODS ===

  /**
   * Creates a new Builder instance with optional configuration
   * @param {...*} args - Arguments to process for builder creation
   * @returns {Builder} New Builder instance
   * @static
   */
  static create(...args) {
    return new Builder(...args);
  }

  /**
   * Creates a document fragment builder for efficient DOM operations
   * @returns {Builder} Builder instance with DocumentFragment as root
   * @static
   */
  static fragment() {
    const builder = new Builder();
    builder.root = document.createDocumentFragment();
    builder.currentContext = builder.root;
    return builder;
  }

  // === CONSTRUCTOR ===

  /**
   * Creates a new Builder instance
   * @param {...*} args - Element creation arguments
   * @example
   * const builder = new Builder('div', {class: 'container', id: 'main'});
   */
  constructor(...args) {
    // Handle different input types
    if (args.length === 0) {
      // Default div
      this.root = document.createElement("div");
      this.currentContext = this.root;
    } else if (args[0] instanceof Builder) {
      // Copy from another builder
      this.root = args[0].root;
      this.currentContext = this.root;
    } else if (args[0] instanceof HTMLElement) {
      // Use existing element
      this.root = args[0];
      this.currentContext = this.root;
      this.applyOptions(args[1] || {});
    } else {
      // Standard tag + options
      const tag = args[0] || "div";

      // Validate tag name
      if (!isValidTag(tag)) {
        if (BuilderConfig.validationMode === "strict") {
          throw new Error(`BuilderJS: Invalid tag name '${tag}'`);
        } else if (BuilderConfig.validationMode === "warn") {
          console.warn(`BuilderJS: Invalid tag name '${tag}', using 'div' instead`);
        }
        this.root = document.createElement("div");
      } else {
        this.root = document.createElement(tag);
      }

      this.currentContext = this.root;
      this.applyOptions(args[1] || {});
    }
  }

  // === CORE BUILDING METHODS ===

  /**
   * Adds a child element to the current context with optional scoped building
   * @param {...*} args - Arguments for child creation, with optional callback as last parameter
   * @returns {Builder} This instance for chaining
   */
  add(...args) {
    // Check if last argument is a callback for scoped building
    const hasCallback = args.length >= 2 && typeof args[args.length - 1] === "function";
    const callback = hasCallback ? args[args.length - 1] : null;
    const argsForProcessing = hasCallback ? args.slice(0, -1) : args;

    // Simple element creation
    let node, childBuilder;

    if (argsForProcessing[0] instanceof Builder) {
      // Adding another builder
      node = argsForProcessing[0].root;
      childBuilder = argsForProcessing[0];
    } else if (argsForProcessing[0] instanceof HTMLElement) {
      // Adding an existing HTML element
      node = argsForProcessing[0];
      if (callback) {
        childBuilder = new Builder();
        childBuilder.root = node;
        childBuilder.currentContext = node;
      }
    } else {
      // Standard tag + options
      const tag = argsForProcessing[0] || "div";
      const options = argsForProcessing[1] || {};

      // Validate tag name
      if (!isValidTag(tag)) {
        if (BuilderConfig.validationMode === "strict") {
          throw new Error(`BuilderJS: Invalid tag name '${tag}'`);
        } else if (BuilderConfig.validationMode === "warn") {
          console.warn(`BuilderJS: Invalid tag name '${tag}', using 'div' instead`);
        }
        childBuilder = new Builder("div", options);
      } else {
        childBuilder = new Builder(tag, options);
      }

      node = childBuilder.root;
    }
    if (node) {
      this.currentContext.appendChild(node);
    }

    // If callback provided, execute with child builder for scoped building
    if (callback && childBuilder) {
      try {
        callback(childBuilder);
      } catch (error) {
        if (BuilderConfig.validationMode === "strict") {
          throw error;
        } else if (BuilderConfig.validationMode === "warn") {
          console.warn("BuilderJS add callback error:", error);
        }
      }
    }

    // Always return this instance for chaining
    return this;
  }

  /**
   * Adds multiple child elements to the current context
   * @param {Array} children - Array of child element configurations
   * @returns {Builder} This instance for chaining
   */
  addAll(children) {
    if (!Array.isArray(children)) {
      console.warn("BuilderJS: addAll() requires an array");
      return this;
    }

    children.forEach((child) => {
      if (typeof child === "string") {
        // Simple tag name
        this.add(child);
      } else if (typeof child === "object" && child !== null) {
        // Object with tag, options, callback
        const { tag, options, callback } = child;
        if (callback && typeof callback === "function") {
          this.add(tag, options, callback);
        } else {
          this.add(tag, options);
        }
      } else if (child instanceof HTMLElement) {
        // Direct HTML element
        this.add(child);
      } else if (child instanceof Builder) {
        // Builder instance
        this.add(child);
      }
    });

    return this;
  }

  /**
   * Execute a callback with this builder instance for scoped building
   * @param {Function} callback - Callback function to execute with this builder
   * @returns {Builder} This instance for chaining
   */
  scope(callback) {
    if (typeof callback !== "function") {
      console.warn("BuilderJS: scope() requires a callback function");
      return this;
    }

    try {
      const result = callback(this);
      return result instanceof Builder ? result : this;
    } catch (error) {
      if (BuilderConfig.validationMode === "strict") {
        throw error;
      } else if (BuilderConfig.validationMode === "warn") {
        console.warn("BuilderJS scope error:", error);
      }
      return this;
    }
  }

  // === CSS CLASS MANAGEMENT ===

  addClass(...classes) {
    classes.forEach((cls) => this.currentContext.classList.add(cls));
    return this;
  }

  removeClass(...classes) {
    classes.forEach((cls) => this.currentContext.classList.remove(cls));
    return this;
  }

  toggleClass(...classes) {
    classes.forEach((cls) => this.currentContext.classList.toggle(cls));
    return this;
  }

  hasClass(className) {
    return this.currentContext.classList.contains(className);
  }

  addClassIf(condition, ...classes) {
    if (condition) {
      this.addClass(...classes);
    }
    return this;
  }

  removeClassIf(condition, ...classes) {
    if (condition) {
      this.removeClass(...classes);
    }
    return this;
  }

  // === STYLING METHODS ===

  style(styles) {
    if (typeof styles === "object") {
      Object.entries(styles).forEach(([key, value]) => {
        this.currentContext.style[key] = value;
      });
    }
    return this;
  }

  css(property, value) {
    if (value !== undefined) {
      this.currentContext.style[property] = value;
    }
    return this;
  }

  show() {
    this.currentContext.style.display = "";
    return this;
  }

  hide() {
    this.currentContext.style.display = "none";
    return this;
  }

  toggle() {
    const isHidden = this.currentContext.style.display === "none";
    this.currentContext.style.display = isHidden ? "" : "none";
    return this;
  }

  // === EVENT HANDLING ===
  // TODO: Implement comprehensive event handling system
  // - Better event delegation
  // - Event namespacing
  // - Auto-cleanup on element removal
  // - Chained event binding (.click(), .hover(), etc.)
  // - Event data passing
  // - Once/off event utilities

  // TODO: Add Components and Templates system after event handling
  // - Component base class with lifecycle methods
  // - Template factory functions
  // - State management integration
  // - Component registry and auto-mounting

  on(events, handler, options = {}) {
    const eventArray = Array.isArray(events) ? events : [events];
    const listeners = eventListeners.get(this.currentContext) || [];

    eventArray.forEach((event) => {
      this.currentContext.addEventListener(event, handler, options);
      listeners.push({ event, handler, options });
    });

    eventListeners.set(this.currentContext, listeners);
    return this;
  }

  off(events, handler) {
    const eventArray = Array.isArray(events) ? events : [events];
    eventArray.forEach((event) => {
      this.currentContext.removeEventListener(event, handler);
    });
    return this;
  }

  delegate(event, selector, handler) {
    const delegateHandler = (e) => {
      if (e.target.matches(selector)) {
        handler.call(this, e);
      }
    };
    this.on(event, delegateHandler);
    return this;
  }

  // === ELEMENT QUERYING ===

  find(selector) {
    const element = this.currentContext.querySelector(selector);
    if (element) {
      const builder = new Builder();
      builder.root = element;
      builder.currentContext = element;
      return builder;
    }
    return null;
  }

  findAll(selector) {
    const elements = Array.from(this.currentContext.querySelectorAll(selector));
    return elements.map((element) => {
      const builder = new Builder();
      builder.root = element;
      builder.currentContext = element;
      return builder;
    });
  }

  // === UTILITY METHODS ===

  /**
   * Renders the builder's root element to a target container
   * @param {string|HTMLElement} target - CSS selector string or HTMLElement to render into
   * @param {Object} options - Rendering options
   * @param {boolean} options.clear - Whether to clear the target container before rendering (default: false)
   * @param {string} options.position - Where to insert the element: 'start', 'end', 'before', 'after' (default: 'end')
   * @returns {Builder} This instance for chaining
   */
  render(target, options = {}) {
    if (!target) {
      console.warn("BuilderJS: render() requires a target");
      return this;
    }

    let targetElement;

    // Handle target parameter
    if (typeof target === "string") {
      targetElement = document.querySelector(target);
      if (!targetElement) {
        console.warn(`BuilderJS: Target element not found: ${target}`);
        return this;
      }
    } else if (target instanceof HTMLElement) {
      targetElement = target;
    } else {
      console.warn("BuilderJS: Invalid target type. Expected string selector or HTMLElement");
      return this;
    }

    // Default options
    const { clear = false, position = "end" } = options;

    // Clear target if requested
    if (clear) {
      targetElement.innerHTML = "";
    }

    // Insert based on position
    switch (position) {
      case "start":
        targetElement.insertBefore(this.root, targetElement.firstChild);
        break;
      case "end":
        targetElement.appendChild(this.root);
        break;
      case "before":
        if (targetElement.parentNode) {
          targetElement.parentNode.insertBefore(this.root, targetElement);
        } else {
          console.warn("BuilderJS: Cannot insert before element with no parent");
        }
        break;
      case "after":
        if (targetElement.parentNode) {
          targetElement.parentNode.insertBefore(this.root, targetElement.nextSibling);
        } else {
          console.warn("BuilderJS: Cannot insert after element with no parent");
        }
        break;
      default:
        console.warn(`BuilderJS: Invalid position "${position}". Using default "end"`);
        targetElement.appendChild(this.root);
    }

    return this;
  }

  applyOptions(options) {
    applyElementOptions(this.currentContext, options);
    return this;
  }

  /**
   * Simple utility method to append this builder's root element to a parent
   * @param {HTMLElement|Builder|string} parent - Parent element, Builder instance, or CSS selector
   * @returns {Builder} This instance for chaining
   * @note For advanced rendering options (positioning, clearing), use render() instead
   */
  appendTo(parent) {
    if (typeof parent === "string") {
      const element = document.querySelector(parent);
      if (element) {
        element.appendChild(this.root);
      } else {
        console.warn(`BuilderJS: appendTo target not found: ${parent}`);
      }
    } else if (parent instanceof HTMLElement) {
      parent.appendChild(this.root);
    } else if (parent instanceof Builder) {
      parent.currentContext.appendChild(this.root);
    } else {
      console.warn("BuilderJS: appendTo requires HTMLElement, Builder, or CSS selector");
    }
    return this;
  }

  // === GLOBAL CONFIGURATION ===

  static setValidationMode(mode) {
    if (["strict", "warn", "silent"].includes(mode)) {
      BuilderConfig.validationMode = mode;
    }
  }

  static getValidationMode() {
    return BuilderConfig.validationMode;
  }

  static isValidTag(tag) {
    return isValidTag(tag);
  }
}

// ===== EXPORTS =====

// Universal module definition for maximum compatibility
if (typeof module !== "undefined" && module.exports) {
  // Node.js/CommonJS
  module.exports = Builder;
  module.exports.BuilderConfig = BuilderConfig;
} else if (typeof window !== "undefined") {
  // Browser global
  window.Builder = Builder;
  window.BuilderConfig = BuilderConfig;
}

// ES6 modules for modern bundlers
try {
  if (typeof exports !== "undefined") {
    exports.BuilderConfig = BuilderConfig;
    exports.default = Builder;
  }
} catch (e) {
  // Ignore in browser environments
}
