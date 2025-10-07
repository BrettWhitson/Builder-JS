# Changelog

All notable changes to BuilderJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0 / 0.0.3] - 2025-10-07 (In Development)

### 🎯 Major Breaking Changes

This release represents a complete architectural overhaul of BuilderJS, focusing on modern, clean scoped building patterns and eliminating navigation complexity.

#### ❌ Removed - Navigation Hell Eliminated

All legacy navigation methods have been **completely removed**:

- `.end()` - Navigate back to parent (REMOVED)
- `.up()` - Navigate up one level (REMOVED)
- `.toRoot()` - Navigate to root element (REMOVED)
- `.save()` - Save current context (REMOVED)
- `.restore()` - Restore saved context (REMOVED)
- `.branch()` - Create independent builder (REMOVED)

### ✨ Added - New Features

#### Core API
- **Scoped Building Pattern**: Callback-based nesting with `addChild(tag, attributes?, callback?)`
- **Modern Builder Class**: Complete rewrite with clean, modern JavaScript practices
- **Scope Method**: `.scope(callback)` for executing operations in isolation
- **Build Method**: `.build(tag, attributes?, callback?)` as alternative building interface
- **Fragment Support**: `Builder.fragment()` for efficient DOM operations
- **Static Factory**: `Builder.create()` for convenient instantiation

#### Styling & Classes
- **CSS Management**: `.style(property, value)` or `.style(object)`
- **Class Utilities**: `.addClass()`, `.removeClass()`, `.toggleClass()`, `.hasClass()`
- **Computed Styles**: Read current element styles

#### Event Handling
- **Event Management**: `.on(event, handler)` for adding event listeners
- **Event Removal**: `.off(event, handler?)` for removing listeners
- **One-time Events**: `.once(event, handler)` for single-use listeners
- **Memory Safety**: Proper cleanup with WeakMap-based listener tracking

#### Querying & Navigation
- **Element Selection**: `.find(selector)` and `.findAll(selector)`
- **Tree Traversal**: `.parent()` and `.children()`
- **Basic DOM Navigation**: Simple querying when needed

#### Configuration & Validation
- **Validation Modes**: 'strict', 'warn', or 'silent' error handling
- **Error Callbacks**: Custom error handling with `Builder.setErrorCallback()`
- **Tag Validation**: Built-in HTML tag name validation
- **Emmet Support**: Basic Emmet syntax parsing for element creation

### 📚 Documentation

#### Added
- Comprehensive README with v3.0.0 documentation
- Development showcase HTML demo (`development-showcase.html`)
- Migration guide from v2.x to v3.0
- Live demo deployed to GitHub Pages
- API reference with detailed examples
- Practical examples for forms, navigation, cards, and more

#### Removed
- Legacy SCSS files (`SCSS/style.scss`)
- Old showcase file (`showcase.html`)
- Legacy builder file (`legacy-builder.js`)
- Minified CSS files (`min/style.min.css`)

### 🎨 Styling
- Added modern development showcase CSS (`css/development-showcase.css`)
- Removed old SCSS build system
- Clean, modern visual design for demo pages

### 🔄 Changed
- **Complete Library Rewrite**: From navigation-based to scoped building pattern
- **API Simplification**: Reduced complexity, improved maintainability
- **Error Handling**: More robust with configurable validation modes
- **Performance**: Simplified internals for better execution speed
- **Code Structure**: Self-documenting hierarchical patterns

### 📦 Technical Details
- **Version in Code**: 3.0.0 (builder.js)
- **Marketing Version**: 0.0.3 (README.md)
- **Status**: In Active Development
- **License**: MIT
- **Module Support**: Universal module definition (UMD, CommonJS, ES6 modules, Browser global)

### 🚧 Development Status

**Current State**: Pre-Alpha Development

#### Pending Work
- [ ] Complete API documentation review
- [ ] Add more complex real-world examples
- [ ] Create migration tooling for v2.x projects
- [ ] Restore component & template system
- [ ] Add comprehensive test suite
- [ ] Performance benchmarking
- [ ] Cross-browser testing

---

## [2.x] - 2024-01-26 to 2023-05-10

### Changed
- Fixed tabs in codebase (2024-01-26)
- Various bug fixes and improvements

### Added
- Initial WIP warning notice (2023-05-10)
- README documentation improvements

### Removed
- Removed redundant markdown from README (2023-05-10)

---

## [1.0.0] - 2023-05-10

### Added
- Initial commit and project foundation
- Basic BuilderJS functionality with navigation methods
- Core DOM manipulation features
- Initial documentation

---

## Project Timeline

- **2025-10-07**: v3.0.0/0.0.3 - Major rebuild with scoped building patterns
- **2025-09-16**: Significant development work ("cooking something")
- **2024-01-26**: v2.x maintenance and bug fixes
- **2023-05-10**: v1.0.0 - Initial project release

---

## Migration Guide

### From v2.x to v3.0.0

**Before (v2.x) - Navigation Hell:**
```javascript
// ❌ OLD - Complex navigation
builder
  .addChild('header')
    .addChild('h1').end()
    .addChild('nav').end()
    .end()
  .addChild('main')
    .save('main')
    .addChild('section').end()
    .restore('main')
    .end()
  .addChild('footer');
```

**After (v3.0.0) - Clean Scoped Building:**
```javascript
// ✅ NEW - Clean structure
builder
  .addChild('header', header => {
    header.addChild('h1');
    header.addChild('nav');
  })
  .addChild('main', main => {
    main.addChild('section');
  })
  .addChild('footer');
```

---

## Philosophy

BuilderJS 3.0.0 embraces:
- 🧹 **Clean Code**: No navigation complexity
- 📖 **Readability**: Code structure mirrors DOM structure
- 🛡️ **Error-Free**: No context navigation mistakes
- ⚡ **Fast**: Simplified internals, better performance
- 🔧 **Maintainable**: Self-documenting hierarchical patterns
- 🆕 **Modern**: Contemporary JavaScript practices only

---

## Links

- **Repository**: [https://github.com/BrettWhitson/Builder-JS](https://github.com/BrettWhitson/Builder-JS)
- **Live Demo**: [https://home.brettwhitson.dev/Builder-JS/development-showcase.html](https://home.brettwhitson.dev/Builder-JS/development-showcase.html)
- **Issues**: [https://github.com/BrettWhitson/Builder-JS/issues](https://github.com/BrettWhitson/Builder-JS/issues)
- **License**: MIT

---

*This project is currently in active development. APIs may change without notice. Use at your own risk in non-production environments only.*
