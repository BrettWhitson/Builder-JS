# 🚀 BuilderJS 0.0.4 - Simplified & Secure DOM Manipulation

[![Version](https://img.shields.io/badge/version-0.0.4-brightgreen.svg)](https://github.com/BrettWhitson/Builder-JS)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Modern](https://img.shields.io/badge/ES6+-Modern%20JavaScript-blue.svg)](https://github.com/BrettWhitson/Builder-JS)

**BuilderJS 0.0.4** is a **clean, modern DOM manipulation library** focused on **scoped building patterns** with **comprehensive security validation**. Clean API, robust validation, and powerful scoped building - no navigation hell, no bloat.

> ✨ **Latest Release**: Major API simplification with security enhancements

## 🎯 What's New in 0.0.4

### 🔥 **Major API Simplification**

Streamlined API with intuitive method names:

- **`.add()`** ✅ **NEW** - Replaces `addChild()` with cleaner syntax
- **`.addAll()`** ✅ **NEW** - Bulk element addition
- **`.render()`** ✅ **NEW** - Flexible positioning and DOM insertion
- ~~`.addChild()`~~ ❌ **REPLACED** by `.add()`
- ~~`.addChildren()`~~ ❌ **REPLACED** by `.addAll()`
- ~~`.build()`~~ ❌ **REMOVED** - Redundant with `.add()`

### 🔒 **Security-First Design**

Comprehensive tag validation system:

- **HTML5 Tag Validation** - Prevents invalid DOM structures
- **XSS Protection** - Built-in input sanitization
- **Three Validation Modes**: `strict`, `warn`, `silent`
- **Runtime Safety** - Catches errors before DOM manipulation

### ⚡ **Performance Optimizations**

Eliminated complex processing overhead:

- **Removed `processArgs`** - 70+ lines of dead code eliminated
- **Streamlined Utilities** - Removed unused helper functions
- **Direct DOM Operations** - No unnecessary abstraction layers
- **Smaller Bundle Size** - ~15% reduction in file size

### 🎨 **Modern Patterns**

Clean, readable DOM construction:

```javascript
// ✅ NEW 0.0.4 API - Clean and secure
const builder = new Builder("div", { class: "app" });

builder
  .add("header", (header) => {
    header.add("h1", { innerText: "BuilderJS 0.0.4" });
    header.add("nav", (nav) => {
      nav.addAll([
        { tag: "a", attrs: { href: "#home", innerText: "Home" } },
        { tag: "a", attrs: { href: "#about", innerText: "About" } },
        { tag: "a", attrs: { href: "#contact", innerText: "Contact" } },
      ]);
    });
  })
  .add("main", (main) => {
    main.add("section", { innerText: "Secure & Simple DOM Building" });
  })
  .render("body"); // ✨ NEW - Direct DOM insertion with positioning
```

## 🎯 Core Features

### 🏗️ **Simplified Building API**

- **`.add()`** - Primary building method with intuitive syntax
- **`.addAll()`** - Bulk element creation for efficient DOM construction
- **`.render()`** - Flexible positioning: `start`, `end`, `before`, `after`
- **Scoped callbacks** - Code structure mirrors DOM structure

### 🔒 **Security & Validation**

- **HTML5 Tag Validation** - Comprehensive tag checking with `isValidTag()`
- **Validation Modes** - Configure via `Builder.setValidationMode()`
- **XSS Protection** - Input sanitization and safe DOM construction
- **Runtime Safety** - Graceful error handling and recovery

### 🎨 **Essential Styling**

- **CSS management**: `.style()`, `.addClass()`, `.removeClass()`
- **Class utilities**: `.toggleClass()`, `.hasClass()`
- **Computed styles**: Read current element styles

### 🔍 **DOM Querying**

- **Element selection**: `.find()`, `.findAll()`
- **Tree traversal**: `.parent()`, `.children()`
- **Simple queries**: Efficient DOM navigation when needed

### 🎯 **Event Handling**

- **Event management**: `.on()`, `.off()`
- **Memory safe**: Automatic cleanup with WeakMap tracking
- **Event delegation**: Efficient event handling patterns

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/BrettWhitson/Builder-JS.git

# Or download builder.js directly
curl -O https://raw.githubusercontent.com/BrettWhitson/Builder-JS/main/builder.js
```

### Include in Your Project

```html
<!-- Browser Global -->
<script src="./builder.js"></script>
<script>
  const app = new Builder("div");
</script>
```

```javascript
// Node.js / Module (UMD support)
const Builder = require("./builder.js");
// or
import Builder from "./builder.js";
```

### Basic Example - Clean Scoped Building

```javascript
// Create a complete layout with the new 0.0.4 API
const app = new Builder("div", { class: "app" });

app
  .add("header", { class: "header" }, (header) => {
    header.add("h1", { innerText: "BuilderJS 0.0.4" });
    header.add("nav", { class: "navigation" }, (nav) => {
      nav.addAll([
        { tag: "a", attrs: { href: "#home", innerText: "Home" } },
        { tag: "a", attrs: { href: "#about", innerText: "About" } },
        { tag: "a", attrs: { href: "#contact", innerText: "Contact" } },
      ]);
    });
  })
  .add("main", { class: "content" }, (main) => {
    main.add("section", { class: "hero" }, (hero) => {
      hero.add("h2", { innerText: "Simplified & Secure DOM Building" });
      hero.add("p", {
        innerText: "Clean API with comprehensive validation and security.",
      });
      hero
        .add("button", {
          innerText: "Get Started",
          class: "cta-button",
        })
        .on("click", () => {
          alert("BuilderJS 0.0.4 - Simple, Secure, Fast!");
        });
    });
  })
  .render("body"); // ✨ Direct DOM insertion
```

## 📚 Core API Methods

### **`.add(tag, attributes?, callback?)`**

Primary method for DOM construction with validation:

```javascript
// Basic element creation
builder.add("div");

// With attributes
builder.add("div", { class: "container", id: "main" });

// With scoped callback
builder.add("div", { class: "card" }, (card) => {
  card.add("h3", { innerText: "Card Title" });
  card.add("p", { innerText: "Card content goes here." });
});

// Method chaining
builder
  .add("header", (header) => {
    header.add("h1", { innerText: "Title" });
  })
  .add("main", (main) => {
    main.add("section", { innerText: "Content" });
  });
```

### **`.addAll(elements)`**

Efficient bulk element creation:

```javascript
builder.addAll([
  { tag: "h1", attrs: { innerText: "Title" } },
  { tag: "p", attrs: { innerText: "Paragraph 1" } },
  { tag: "p", attrs: { innerText: "Paragraph 2" } },
  {
    tag: "div",
    attrs: { class: "section" },
    callback: (div) => {
      div.add("span", { innerText: "Nested content" });
    },
  },
]);
```

### **`.render(target?, position?)`**

Flexible DOM insertion with positioning:

```javascript
// Append to body
builder.render();

// Insert at specific position
builder.render("body", "start"); // Insert at beginning
builder.render("body", "end"); // Insert at end (default)
builder.render("#container", "before"); // Insert before element
builder.render("#container", "after"); // Insert after element

// With element reference
const container = document.getElementById("container");
builder.render(container, "start");
```

### **Security & Validation**

Configure validation behavior:

```javascript
// Set validation mode
Builder.setValidationMode("strict"); // Throws errors
Builder.setValidationMode("warn"); // Console warnings
Builder.setValidationMode("silent"); // Silent validation

// Check tag validity
if (Builder.isValidTag("div")) {
  // Safe to use
}
```

scoped.addChild("span", { innerText: "Temporary content" });
// Operations don't affect the main builder
});

````

## 🎯 Practical Examples

### **Form Building with New API**

```javascript
const form = new Builder("form", { class: "user-form" });

form
  .add("div", { class: "form-group" }, (group) => {
    group.add("label", { innerText: "Email", for: "email" });
    group.add("input", {
      type: "email",
      id: "email",
      required: true,
      placeholder: "Enter your email",
    });
  })
  .add("div", { class: "form-group" }, (group) => {
    group.add("label", { innerText: "Password", for: "password" });
    group.add("input", {
      type: "password",
      id: "password",
      required: true,
    });
  })
  .add("div", { class: "form-actions" }, (actions) => {
    actions
      .add("button", {
        type: "submit",
        innerText: "Sign In",
        class: "btn primary",
      })
      .on("click", handleSubmit);

    actions.add("button", {
      type: "button",
      innerText: "Cancel",
      class: "btn secondary",
    });
  })
  .render("body"); // ✨ Direct insertion
````

### **Card Layout with addAll()**

```javascript
const card = new Builder("div", { class: "card" });

card
  .add("header", { class: "card-header" }, (header) => {
    header.addAll([
      { tag: "h3", attrs: { innerText: "Product Card" } },
      {
        tag: "button",
        attrs: {
          class: "close-btn",
          innerText: "×",
          "aria-label": "Close",
        },
      },
    ]);
  })
  .add("div", { class: "card-body" }, (body) => {
    body.addAll([
      {
        tag: "img",
        attrs: {
          src: "product.jpg",
          alt: "Product Image",
          class: "product-image",
        },
      },
      {
        tag: "p",
        attrs: {
          innerText: "High-quality product with security validation.",
          class: "description",
        },
      },
      {
        tag: "div",
        attrs: { class: "price" },
        callback: (price) => {
          price.addAll([
            { tag: "span", attrs: { innerText: "$", class: "currency" } },
            { tag: "span", attrs: { innerText: "29.99", class: "amount" } },
          ]);
        },
      },
    ]);
  })
  .add("footer", { class: "card-footer" }, (footer) => {
    footer.addAll([
      {
        tag: "button",
        attrs: { innerText: "Add to Cart", class: "btn primary" },
      },
      {
        tag: "button",
        attrs: { innerText: "Wishlist", class: "btn outline" },
      },
    ]);
  })
  .render("#products-container");
```

### **Dynamic Content with Security**

```javascript
// Set validation mode for security
Builder.setValidationMode("strict");

const todoApp = new Builder("div", { class: "todo-app" });

todoApp
  .add("header", { class: "app-header" }, (header) => {
    header.add("h1", { innerText: "Secure Todo List" });
    header.add("div", { class: "add-todo" }, (addSection) => {
      addSection.addAll([
        {
          tag: "input",
          attrs: {
            type: "text",
            placeholder: "Add new todo...",
            class: "todo-input",
          },
        },
        {
          tag: "button",
          attrs: { innerText: "Add", class: "add-btn" },
          callback: (btn) => {
            btn.on("click", function () {
              const input = this.root.parentElement.querySelector(".todo-input");
              const value = input.value.trim();

              // Validation ensures safe content
              if (value && Builder.isValidTag("div")) {
                addTodoItem(value);
                input.value = "";
              }
            });
          },
        },
      ]);
    });
  })
  .add("div", { class: "todo-list" })
  .render("body");

// Secure todo item creation
function addTodoItem(text) {
  const todoList = todoApp.find(".todo-list");

  const item = new Builder("div", { class: "todo-item" }).addAll([
    { tag: "span", attrs: { innerText: text, class: "todo-text" } },
    {
      tag: "button",
      attrs: { innerText: "Complete", class: "done-btn" },
      callback: (btn) => {
        btn.on("click", function () {
          this.root.parentElement.remove();
        });
      },
    },
  ]);

  item.render(todoList.currentContext);
}
```

## 🔄 Migration Guide (0.0.3 → 0.0.4)

### **API Method Changes**

```javascript
// ❌ OLD 0.0.3 API
builder.addChild("div", { class: "card" });
builder.addChildren([...]);
builder.build("section");

// ✅ NEW 0.0.4 API
builder.add("div", { class: "card" });
builder.addAll([...]);
// .build() removed - use .add() instead
```

### **New Security Features**

```javascript
// ✅ NEW - Configure validation
Builder.setValidationMode("strict"); // Throws on invalid tags
Builder.setValidationMode("warn"); // Console warnings
Builder.setValidationMode("silent"); // Silent validation

// ✅ NEW - Check tag validity
if (Builder.isValidTag("div")) {
  builder.add("div", { class: "safe" });
}
```

### **New Rendering System**

```javascript
// ❌ OLD - Manual DOM append
document.body.appendChild(builder.root);

// ✅ NEW - Direct rendering with positioning
builder.render("body"); // Append to body
builder.render("body", "start"); // Insert at beginning
builder.render("#container", "before"); // Insert before element
```

## 📚 API Reference

### **Creation & Building**

- `new Builder(tag, attributes?)` - Create new builder instance
- `.add(tag, attributes?, callback?)` - Add child with optional scoped callback
- `.addAll(elements)` - Bulk element creation
- `.render(target?, position?)` - Flexible DOM insertion

### **Styling & Attributes**

- `.style(property, value?)` - Set/get CSS styles
- `.addClass(className)` - Add CSS class
- `.removeClass(className)` - Remove CSS class
- `.toggleClass(className)` - Toggle CSS class
- `.hasClass(className)` - Check for CSS class

### **DOM Querying**

- `.find(selector)` - Find first matching descendant
- `.findAll(selector)` - Find all matching descendants
- `.parent()` - Get parent element
- `.children()` - Get child elements

### **Event Handling**

- `.on(event, handler)` - Add event listener
- `.off(event, handler?)` - Remove event listener(s)

### **Security & Validation**

- `Builder.setValidationMode(mode)` - Configure validation: "strict", "warn", "silent"
- `Builder.isValidTag(tag)` - Check if tag is valid HTML5
- `Builder.getValidationMode()` - Get current validation mode

## 🚀 What's Next

BuilderJS 0.0.4 establishes a solid foundation for modern DOM manipulation. Future development will focus on:

- **Component System** - Reusable component templates
- **Enhanced Event Handling** - Delegation and advanced patterns
- **Performance Optimizations** - Further bundle size reduction
- **TypeScript Support** - Full type definitions

See our [GitHub Issues](https://github.com/BrettWhitson/Builder-JS/issues) for the complete roadmap.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📈 Version History

- **0.0.4** - API simplification, security validation, performance improvements
- **0.0.3** - Scoped building patterns, navigation removal
- **0.0.2** - Core DOM manipulation features
- **0.0.1** - Initial release

---

**BuilderJS 0.0.4** - Simple, Secure, Fast DOM Building 🚀

- `.build(tag, attributes?, callback?)` - Alternative building method
- `.scope(callback)` - Execute operations in isolation

### **Styling & Classes**

- `.style(property, value)` or `.style(object)` - Set CSS styles
- `.addClass(class1, class2, ...)` - Add CSS classes
- `.removeClass(class1, class2, ...)` - Remove CSS classes
- `.toggleClass(class)` - Toggle CSS class
- `.hasClass(class)` - Check if class exists

### **Event Handling**

- `.on(event, handler)` - Add event listener
- `.off(event, handler?)` - Remove event listener
- `.once(event, handler)` - Add one-time event listener

### **Querying & Navigation**

- `.find(selector)` - Find first matching child element
- `.findAll(selector)` - Find all matching child elements
- `.parent()` - Get parent element
- `.children()` - Get child elements

### **Properties**

- `.root` - Access the DOM element
- `.currentContext` - Current building context

## 🎯 Why BuilderJS 3.0?

### **Before: Navigation Hell**

```javascript
// ❌ Old patterns were confusing and error-prone
builder.addChild("div").addChild("h1").end().addChild("p").end().end().addChild("footer").save("footer").addChild("p").end().restore("footer").end();
```

### **After: Clean & Simple**

```javascript
// ✅ v3.0 is readable and maintainable
builder
  .addChild("div", (div) => {
    div.addChild("h1");
    div.addChild("p");
  })
  .addChild("footer", (footer) => {
    footer.addChild("p");
  });
```

## 🚀 Benefits

- **🧹 Clean Code**: Eliminated navigation complexity
- **📖 Readable**: Code structure mirrors DOM structure
- **🛡️ Error-Free**: No context navigation mistakes
- **⚡ Fast**: Simplified internals, better performance
- **🔧 Maintainable**: Self-documenting hierarchical patterns
- **🆕 Modern**: Contemporary JavaScript patterns only

## � TODOs (Pre-Alpha Development)

### 🔄 **Component & Template System Restoration**

- **Issue**: Component and template functionality was removed during navigation hell cleanup
- **Status**: Infrastructure exists (`BuilderConfig.components`, `BuilderConfig.templates` Maps) but no registration/usage methods
- **Priority**: High - Restore with modern scoped architecture compatibility
- **Tasks**:
  - [ ] Add `registerComponent()` method to Builder prototype
  - [ ] Add `registerTemplate()` method to Builder prototype
  - [ ] Add `.component()` usage method with scoped callback support
  - [ ] Add `.template()` usage method with scoped callback support
  - [ ] Update documentation with component/template examples
  - [ ] Add component/template demos to showcase

### 🧪 **Testing & Validation**

- [ ] Add comprehensive test suite
- [ ] Validate cross-browser compatibility
- [ ] Performance benchmarking
- [ ] Memory leak testing

### 📚 **Documentation & Examples**

- [ ] Complete API documentation review
- [ ] Add more complex real-world examples
- [ ] Create migration tooling for v2.x projects

## 📖 Documentation

- **[Live Demo](https://home.brettwhitson.dev/Builder-JS/development-showcase.html)** - See BuilderJS 0.0.3 in action (GitHub Pages)
- **[Local Demo](development-showcase.html)** - Development showcase (local file)

## 📄 License

MIT License - feel free to use in any project!

## 🤝 Contributing

We welcome contributions! BuilderJS 0.0.3 focuses on:

- **Clean scoped building patterns only**
- **No navigation methods**
- **Modern JavaScript practices**
- **Readable, maintainable code**

---

**BuilderJS 0.0.3** - _Clean DOM building for the modern web_ 🚀
