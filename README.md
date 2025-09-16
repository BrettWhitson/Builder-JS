# ⚠️ BuilderJS (IN PROGRESS) ⚠️

BuilderJS is a modern utility for building and manipulating DOM elements in JavaScript, with a focus on flexible APIs, chaining, and Emmet-like syntax. The API is currently evolving and this documentation reflects the latest available features.

## Key Features

- **Flexible element creation**: Use tag names, options objects, Emmet strings, functions, or Builder instances.
- **Chaining**: Easily chain child elements and build complex structures.
- **Static and instance methods**: Create elements with `Builder.create`, add children with `addChild`, and process arguments in multiple formats.
- **Emmet-like syntax**: Create elements using simple Emmet strings (limited support).
- **Options object**: Set attributes, classes, innerText, innerHTML, and children.
- **Children as arrays, functions, or Builder instances**: Compose UIs with maximum flexibility.

## Usage Examples

```js
import Builder from "./builder.js";

// Create a container div
const builder = new Builder("div", { id: "main-container", class: "container" });

// Add children in various ways
builder.addChild("h1", { innerText: "Welcome to BuilderJS" });
builder.addChild("p", { innerText: "Paragraph added with options." });
builder.addChild(new Builder("p", { innerText: "Added with Builder instance." }));
builder.addChild(() => {
  const p = document.createElement("p");
  p.innerText = "Added with function.";
  return p;
});
builder.addChild(() => new Builder("p", { innerText: "Function returning Builder." }));

// Chaining with static create
builder.addChild(Builder.create("ul", { class: "list" }).addChild("li", { innerText: "Chained item 1" }).addChild("li", { innerText: "Chained item 2" }));

// Static create with children array
builder.addChild(
  Builder.create({
    tag: "div",
    options: { class: "static", innerText: "Static div" },
    children: [{ tag: "p", options: { innerText: "Child paragraph" } }, Builder.create("p", { innerText: "Builder child" })],
  })
);

// Emmet syntax
builder.addChild("div.container#secondary{Emmet div}").addChild(Builder.create("h2", { innerText: "Emmet h2" }));

// Object literal
builder.addChild({ tag: "p", options: { innerText: "Object literal paragraph." } });
```

## API Reference (Current)

### `Builder` class

- **Constructor**: `new Builder(tag, options?)`
- **Static create**: `Builder.create(...args)`
- **addChild(...args)**: Add a child element (Builder, HTMLElement, function, Emmet string, object, etc.)
- **addChildren(array)**: Add multiple children
- **applyOptions(options)**: Set attributes, class, innerText, innerHTML

### Emmet Support

Basic Emmet parsing is supported for strings like `div#id.class>child*count`. More advanced Emmet features are planned.

### Status

This project is actively being rebuilt. The API and features may change. See `showcase.html` for live usage examples.
