// Minimal Emmet parser for demo purposes
function parseEmmet(emmet) {
  // Only supports: tag#id.class>child*count
  var tagMatch = emmet.match(/^(\w+)/);
  var tag = tagMatch ? tagMatch[1] : "div";
  var idMatch = emmet.match(/#(\w+)/);
  var classMatch = emmet.match(/\.(\w+)/);
  var childMatch = emmet.match(/>(\w+)(\*(\d+))?/);
  var el = document.createElement(tag);
  if (idMatch) el.id = idMatch[1];
  if (classMatch) el.className = classMatch[1];
  if (childMatch) {
    var childTag = childMatch[1];
    var count = childMatch[3] ? parseInt(childMatch[3], 10) : 1;
    for (var i = 0; i < count; i++) {
      el.appendChild(document.createElement(childTag));
    }
  }
  return el;
}

class Builder {
  // --- Static Methods ---
  static processArgs(...args) {
    // Prevent recursion: if already Builder or HTMLElement, just return
    if (args[0] instanceof Builder) {
      return { root: args[0].root };
    }
    if (args[0] instanceof HTMLElement) {
      return { root: args[0] };
    }
    // Function
    if (typeof args[0] === "function") {
      const result = args[0]();
      if (result instanceof Builder) {
        return { root: result.root };
      } else if (result instanceof HTMLElement) {
        return { root: result };
      }
    }
    // Emmet string
    if (typeof args[0] === "string" && /[>#.*{]/.test(args[0])) {
      return { root: parseEmmet(args[0]), options: args[1] || {} };
    }
    // Object { tag, options, children }
    if (typeof args[0] === "object" && args[0] !== null) {
      const { tag, options = {}, children = [] } = args[0];
      return { tag, options, children };
    }
    // Normal tag, options
    return { tag: args[0], options: args[1] || {} };
  }

  static create(...args) {
    const processed = Builder.processArgs(...args);
    if (processed.root) {
      const builder = new Builder("div");
      builder.root = processed.root;
      builder.applyOptions(processed.options);
      return builder;
    }
    const builder = new Builder(processed.tag, processed.options);
    if (processed.children) builder.addChildren(processed.children);
    return builder;
  }

  static addChild(builderInstance) {
    if (builderInstance instanceof Builder) {
      document.body.appendChild(builderInstance.root);
    } else if (builderInstance instanceof HTMLElement) {
      document.body.appendChild(builderInstance);
    } else if (typeof builderInstance === "function") {
      const result = builderInstance();
      if (result instanceof Builder) {
        document.body.appendChild(result.root);
      } else if (result instanceof HTMLElement) {
        document.body.appendChild(result);
      }
    } else if (typeof builderInstance === "string" && /[>#.*]/.test(builderInstance)) {
      document.body.appendChild(parseEmmet(builderInstance));
    }
  }

  // --- Instance Methods ---
  constructor(...args) {
    const processed = Builder.processArgs(...args);
    if (processed.root) {
      this.root = processed.root;
      this.applyOptions(processed.options);
    } else {
      this.root = document.createElement(processed.tag);
      this.applyOptions(processed.options);
      if (processed.children) this.addChildren(processed.children);
    }
  }

  addChild(...args) {
    const processed = Builder.processArgs(...args);
    let node, childBuilder;
    if (processed.root) {
      if (typeof args[0] === "string" && /[>#.*{]/.test(args[0])) {
        childBuilder = new Builder("div");
        childBuilder.root = processed.root;
        childBuilder.applyOptions(processed.options);
        node = childBuilder.root;
      } else {
        node = processed.root;
      }
    } else if (processed.tag) {
      childBuilder = new Builder(processed.tag, processed.options);
      node = childBuilder.root;
    } else if (args[0] instanceof Builder) {
      node = args[0].root;
      childBuilder = args[0];
    } else if (args[0] instanceof HTMLElement) {
      node = args[0];
    } else if (typeof args[0] === "function") {
      const result = args[0]();
      if (result instanceof Builder) {
        node = result.root;
        childBuilder = result;
      } else {
        node = result;
      }
    }
    if (node) {
      this.root.appendChild(node);
    }
    return childBuilder || this;
  }

  addChildren(children) {
    children.forEach((child) => this.addChild(child));
    return this;
  }

  applyOptions(options) {
    if (!options) return;
    Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
        this.root.className = value;
      } else if (key === "innerText") {
        this.root.innerText = value;
      } else if (key === "innerHTML") {
        this.root.innerHTML = value;
      } else {
        this.root.setAttribute(key, value);
      }
    });
  }
}

export default Builder;
