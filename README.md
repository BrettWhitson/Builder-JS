> ## ⚠️ **DEVELOPMENT STATUS NOTICE** ⚠️
>
> **This project is currently IN DEVELOPMENT and not ready for production use.**
>
> - APIs may change without notice
> - Features are incomplete and being actively developed
> - Documentation may be outdated or missing
> - Use at your own risk in non-production environments only
>
> **Current Version: 0.0.3 - In Development**

# 🚀 BuilderJS 0.0.3 - Clean Scoped DOM Building (In Development)

[![Version](https://img.shields.io/badge/version-0.0.3--in--development-orange.svg)](https://github.com/BrettWhitson/Builder-JS)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)](https://github.com/BrettWhitson/Builder-JS)
[![Modern](https://img.shields.io/badge/Modern-Clean%20Architecture-## 📋 TODOs (In Development)rightgreen.svg)](https://github.com/BrettWhitson/Builder-JS)

**BuilderJS 0.0.3** is a **clean, modern DOM manipulation library** in active development that focuses exclusively on **scoped building patterns**. We've eliminated navigation hell by removing all legacy methods and focusing on what matters: **readable, maintainable DOM construction**.

> ⚠️ **In Development**: This is an active development project. APIs may change and features are still being added.

## 🧹 What's New in 0.0.3

### ❌ **Removed Navigation Hell**

We've completely eliminated all legacy navigation methods:

- ~~`.end()`~~ ❌ **REMOVED**
- ~~`.up()`~~ ❌ **REMOVED**
- ~~`.toRoot()`~~ ❌ **REMOVED**
- ~~`.save()`~~ ❌ **REMOVED**
- ~~`.restore()`~~ ❌ **REMOVED**
- ~~`.branch()`~~ ❌ **REMOVED**

### ✅ **Clean Scoped Building Only**

BuilderJS 0.0.3 focuses on **one pattern that works**:

```javascript
// ✅ CLEAN - Code structure matches DOM structure
builder
  .addChild("header", (header) => {
    header.addChild("h1", { innerText: "Title" });
    header.addChild("nav", (nav) => {
      nav.addChild("ul", (ul) => {
        ul.addChild("li", { innerText: "Home" });
        ul.addChild("li", { innerText: "About" });
      });
    });
  })
  .addChild("main", (main) => {
    main.addChild("section", { innerText: "Content" });
  });
```

## 🎯 Core Features

### � **Scoped Building Patterns**

- **Callback-based nesting**: No navigation required
- **Self-documenting**: Code structure mirrors DOM structure
- **Error resilient**: Robust error handling in callbacks
- **Clean syntax**: `addChild(tag, attributes, callback)`

### 🎨 **Essential Styling**

- **CSS management**: `.style()`, `.addClass()`, `.removeClass()`
- **Class utilities**: `.toggleClass()`, `.hasClass()`
- **Computed styles**: Read current element styles

### 🔍 **Basic Querying**

- **Element selection**: `.find()`, `.findAll()`
- **Tree traversal**: `.parent()`, `.children()`
- **Simple queries**: Basic DOM navigation when needed

### 🎯 **Event Handling**

- **Event management**: `.on()`, `.off()`
- **Clean syntax**: Consistent event API
- **Memory safe**: Proper cleanup and management

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
// Create a complete layout with scoped building
const app = new Builder("div", { class: "app" });

app
  .addChild("header", { class: "header" }, (header) => {
    header.addChild("h1", { innerText: "My Application" });
    header.addChild("nav", { class: "navigation" }, (nav) => {
      nav.addChild("a", { href: "#home", innerText: "Home" });
      nav.addChild("a", { href: "#about", innerText: "About" });
      nav.addChild("a", { href: "#contact", innerText: "Contact" });
    });
  })
  .addChild("main", { class: "content" }, (main) => {
    main.addChild("section", { class: "hero" }, (hero) => {
      hero.addChild("h2", { innerText: "Welcome to BuilderJS 3.0!" });
      hero.addChild("p", {
        innerText: "Clean, readable DOM building without navigation hell.",
      });
      hero
        .addChild("button", {
          innerText: "Get Started",
          class: "cta-button",
        })
        .on("click", () => {
          alert("BuilderJS 3.0 - Clean and Simple!");
        });
    });
  })
  .addChild("footer", { class: "footer" }, (footer) => {
    footer.addChild("p", { innerText: "© 2024 BuilderJS 3.0" });
  });

// Add to page
document.body.appendChild(app.root);
```

## 📚 Core Methods

### **`addChild(tag, attributes?, callback?)`**

The primary method for scoped building:

```javascript
// Basic element creation
builder.addChild("div");

// With attributes
builder.addChild("div", { class: "container", id: "main" });

// With scoped callback
builder.addChild("div", { class: "card" }, (card) => {
  card.addChild("h3", { innerText: "Card Title" });
  card.addChild("p", { innerText: "Card content goes here." });
});

// Method chaining
builder
  .addChild("header", (header) => {
    header.addChild("h1", { innerText: "Title" });
  })
  .addChild("main", (main) => {
    main.addChild("section", { innerText: "Content" });
  });
```

### **`build(tag, attributes?, callback?)`**

Alternative builder method:

```javascript
const form = new Builder("form");

form.build("div", { class: "form-group" }, (group) => {
  group.addChild("label", { innerText: "Name", for: "name" });
  group.addChild("input", { type: "text", id: "name" });
});
```

### **`scope(callback)`**

Execute operations in isolation:

```javascript
builder.scope((scoped) => {
  scoped.addChild("div", { class: "temp" });
  scoped.addChild("span", { innerText: "Temporary content" });
  // Operations don't affect the main builder
});
```

## 🎯 Practical Examples

### **Form Building**

```javascript
const form = new Builder("form", { class: "user-form" });

form
  .addChild("div", { class: "form-group" }, (group) => {
    group.addChild("label", { innerText: "Email", for: "email" });
    group.addChild("input", {
      type: "email",
      id: "email",
      required: true,
      placeholder: "Enter your email",
    });
  })
  .addChild("div", { class: "form-group" }, (group) => {
    group.addChild("label", { innerText: "Password", for: "password" });
    group.addChild("input", {
      type: "password",
      id: "password",
      required: true,
    });
  })
  .addChild("div", { class: "form-actions" }, (actions) => {
    actions
      .addChild("button", {
        type: "submit",
        innerText: "Sign In",
        class: "btn primary",
      })
      .on("click", handleSubmit);

    actions.addChild("button", {
      type: "button",
      innerText: "Cancel",
      class: "btn secondary",
    });
  });
```

### **Card Layout**

```javascript
const card = new Builder("div", { class: "card" });

card
  .addChild("header", { class: "card-header" }, (header) => {
    header.addChild("h3", { innerText: "Product Card" });
    header.addChild("button", {
      class: "close-btn",
      innerText: "×",
      "aria-label": "Close",
    });
  })
  .addChild("div", { class: "card-body" }, (body) => {
    body.addChild("img", {
      src: "product.jpg",
      alt: "Product Image",
      class: "product-image",
    });
    body.addChild("p", {
      innerText: "High-quality product description.",
      class: "description",
    });
    body.addChild("div", { class: "price" }, (price) => {
      price.addChild("span", { innerText: "$", class: "currency" });
      price.addChild("span", { innerText: "29.99", class: "amount" });
    });
  })
  .addChild("footer", { class: "card-footer" }, (footer) => {
    footer.addChild("button", {
      innerText: "Add to Cart",
      class: "btn primary",
    });
    footer.addChild("button", {
      innerText: "Wishlist",
      class: "btn outline",
    });
  });
```

### **Dynamic List Building**

```javascript
const todoApp = new Builder("div", { class: "todo-app" });

// Build the app structure
todoApp
  .addChild("header", { class: "app-header" }, (header) => {
    header.addChild("h1", { innerText: "Todo List" });
    header.addChild("div", { class: "add-todo" }, (addSection) => {
      addSection.addChild("input", {
        type: "text",
        placeholder: "Add new todo...",
        class: "todo-input",
      });
      addSection
        .addChild("button", {
          innerText: "Add",
          class: "add-btn",
        })
        .on("click", function () {
          const input = this.root.parentElement.querySelector(".todo-input");
          if (input.value.trim()) {
            addTodoItem(input.value.trim());
            input.value = "";
          }
        });
    });
  })
  .addChild("div", { class: "todo-list" });

// Function to add todo items
function addTodoItem(text) {
  const todoList = todoApp.find(".todo-list");

  const item = new Builder("div", { class: "todo-item" });
  item.addChild("span", { innerText: text, class: "todo-text" });
  item
    .addChild("button", {
      innerText: "Done",
      class: "done-btn",
    })
    .on("click", function () {
      this.root.parentElement.remove();
    });

  todoList.currentContext.appendChild(item.root);
}
```

## 🔄 Migration Guide (v2.x → v3.0)

These navigation methods are **completely removed** in v3.0:

```javascript
// ❌ ALL REMOVED IN v3.0
.end()        // Navigate back to parent
.up()         // Navigate up one level
.toRoot()     // Navigate to root element
.save()       // Save current context
.restore()    // Restore saved context
.branch()     // Create independent builder
```

### **✅ Migration Examples**

**Before (v2.x) - Navigation Hell:**

```javascript
// ❌ OLD - Complex navigation
builder.addChild("header").addChild("h1").end().addChild("nav").end().end().addChild("main").save("main").addChild("section").end().restore("main").end().addChild("footer");
```

**After (v3.0) - Clean Scoped Building:**

```javascript
// ✅ NEW - Clean structure
builder
  .addChild("header", (header) => {
    header.addChild("h1");
    header.addChild("nav");
  })
  .addChild("main", (main) => {
    main.addChild("section");
  })
  .addChild("footer");
```

### **🛠️ Step-by-Step Migration**

1. **Replace `.end()` chains:**

   ```javascript
   // Before: .addChild("div").addChild("p").end().addChild("span")
   // After:  .addChild("div", div => div.addChild("p")).addChild("span")
   ```

2. **Convert bookmarks to callbacks:**

   ```javascript
   // Before: .save("main").addChild("section").restore("main")
   // After:  .addChild("section") // Use proper nesting instead
   ```

3. **Eliminate `.toRoot()` with structure:**
   ```javascript
   // Before: .addChild("deep").addChild("nested").toRoot().addChild("sibling")
   // After:  Plan your structure with proper nesting from the start
   ```

## 📚 API Reference

### **Creation & Building**

- `new Builder(tag, attributes?)` - Create new builder instance
- `.addChild(tag, attributes?, callback?)` - Add child with optional scoped callback
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

- **[Live Demo](development-showcase.html)** - See BuilderJS 0.0.3 in action
- **[API Documentation](docs/builder.html)** - Complete method reference
- **[Migration Guide](#-migration-guide-v2x--v003)** - Upgrade from v2.x

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
