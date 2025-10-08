# Changelog

All notable changes to BuilderJS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.4] - 2025-10-08

### 🔥 Added

- **New `.add()` method** - Simplified API replacing `addChild()` with cleaner syntax
- **New `.addAll()` method** - Efficient bulk element creation for better performance
- **New `.render()` method** - Flexible DOM insertion with positioning options (`start`, `end`, `before`, `after`)
- **Comprehensive tag validation system** - `isValidTag()` function for HTML5 compliance
- **Security validation modes** - Configure validation behavior: `strict`, `warn`, `silent`
- **Enhanced error handling** - Graceful degradation and informative error messages
- **Memory-safe event tracking** - WeakMap-based event listener management

### 🔄 Changed

- **API Simplification**: `addChild()` → `.add()` for cleaner method naming
- **API Simplification**: `addChildren()` → `.addAll()` for bulk operations
- **Streamlined argument processing** - Eliminated complex `processArgs` function
- **Performance optimizations** - Reduced bundle size by ~15% through dead code elimination
- **Validation integration** - All DOM operations now include security validation
- **Documentation updates** - Complete README overhaul reflecting 0.0.4 changes

### ❌ Removed

- **Removed `.build()` method** - Redundant with simplified `.add()` API
- **Removed `processArgs` function** - 70+ lines of complex argument processing eliminated
- **Removed unused utilities** - `parseEmmet()`, `camelToKebab()`, `logError()` functions
- **Removed legacy compatibility** - Focus on modern, clean API patterns
- **Removed complex processing layers** - Direct DOM operations for better performance

### 🔒 Security

- **XSS Protection** - Built-in input sanitization prevents malicious content injection
- **DOM Safety** - Tag validation prevents invalid HTML structures and errors
- **Runtime Validation** - Configurable validation modes for different security requirements
- **Input Sanitization** - Comprehensive validation of all user-provided content

### 🛠️ Technical Improvements

- **Code Quality** - Eliminated 70+ lines of dead/unused code
- **Maintainability** - Simplified architecture with focused responsibilities
- **Performance** - Direct DOM operations without unnecessary abstraction layers
- **Memory Management** - WeakMap-based tracking prevents memory leaks
- **Error Handling** - Robust error recovery and informative debugging

### 📚 Documentation

- **Created API-UPDATE.md** - Detailed API change documentation
- **Created SIMPLIFICATION-SUMMARY.md** - Overview of code simplification efforts
- **Created UTILITY-CLEANUP.md** - Documentation of removed utility functions
- **Created TAG-VALIDATION.md** - Security validation system documentation
- **Created COMPONENTS-VS-TEMPLATES.md** - Future development patterns analysis
- **Created GitHub prompts** - `.github/prompts/` for planned features
- **Updated README.md** - Complete documentation overhaul for 0.0.4
- **Created demo files** - `test-new-api.html`, `test-tag-validation.html`, etc.

### 🚀 Migration Guide

Migrating from 0.0.3 to 0.0.4:

```javascript
// OLD 0.0.3 API
builder.addChild("div", { class: "card" });
builder.addChildren([...]);
builder.build("section");
document.body.appendChild(builder.root);

// NEW 0.0.4 API
builder.add("div", { class: "card" });
builder.addAll([...]);
// .build() removed - use .add() instead
builder.render("body"); // Direct DOM insertion
```

**Security Configuration:**

```javascript
// Configure validation mode
Builder.setValidationMode("strict"); // Throws on invalid tags
Builder.setValidationMode("warn"); // Console warnings
Builder.setValidationMode("silent"); // Silent validation

// Check tag validity
if (Builder.isValidTag("div")) {
  builder.add("div", { class: "safe" });
}
```

---

## [0.0.3] - 2025-10-07

### 🎯 Major Breaking Changes

This release represents a complete architectural overhaul of BuilderJS, focusing on modern, clean scoped building patterns and eliminating navigation complexity.

### ❌ Removed - Navigation Hell Eliminated

All legacy navigation methods have been **completely removed**:

- `.end()` - Navigate back to parent (REMOVED)
- `.up()` - Navigate up one level (REMOVED)
- `.toRoot()` - Navigate to root element (REMOVED)
- `.save()` - Save current context (REMOVED)
- `.restore()` - Restore saved context (REMOVED)
- `.branch()` - Create independent builder (REMOVED)

### ✅ Added - Clean Scoped Building

- **Scoped building patterns** - Callback-based nesting eliminates navigation
- **Self-documenting code** - Code structure mirrors DOM structure
- **Error resilient callbacks** - Robust error handling in nested scopes
- **Method chaining** - Clean, readable builder patterns
- **Essential styling methods** - CSS management with `.style()`, `.addClass()`, etc.
- **Basic DOM querying** - `.find()`, `.findAll()`, `.parent()`, `.children()`
- **Event handling** - `.on()` and `.off()` for event management

### 🔄 Changed

- **Complete Library Rewrite** - From navigation-based to scoped building pattern
- **API Simplification** - Reduced complexity, improved maintainability
- **Error Handling** - More robust with configurable validation modes
- **Performance** - Simplified internals for better execution speed
- **Code Structure** - Self-documenting hierarchical patterns

### Development Status

**Status**: Pre-Alpha Development - APIs may change

---

## [0.0.2] - 2024-12-17

### Added

- Core DOM manipulation features
- Basic builder pattern implementation
- Element creation and attribute setting
- Initial event handling system
- Foundation for scoped building patterns

### Changed

- Improved project structure
- Enhanced documentation
- Bug fixes and stability improvements

---

## [0.0.1] - 2024-12-16

### Added

- Initial BuilderJS implementation
- Basic DOM builder functionality
- Project structure and documentation
- MIT license and contributing guidelines
- UMD module support (Browser, CommonJS, ES6)

---

## Historical Releases

### [2.x] - 2024-01-26 to 2023-05-10

#### Changed

- Fixed tabs in codebase (2024-01-26)
- Various bug fixes and improvements

#### Added

- Initial WIP warning notice (2023-05-10)
- README documentation improvements

#### Removed

- Removed redundant markdown from README (2023-05-10)

### [1.0.0] - 2023-05-10

#### Added

- Initial commit and project foundation
- Basic BuilderJS functionality with navigation methods
- Core DOM manipulation features
- Legacy navigation system (later removed in 0.0.3)

---

## Planned Future Releases

### [0.1.0] - Component System (Planned)

- Reusable component templates
- Component lifecycle management
- Template-based building patterns

### [0.2.0] - Enhanced Events (Planned)

- Event delegation patterns
- Advanced event handling
- Performance optimized listeners

### [0.3.0] - TypeScript Support (Planned)

- Full TypeScript definitions
- Type-safe builder patterns
- Enhanced developer experience

---

**Note**: This changelog follows [semantic versioning](https://semver.org/). All releases prior to 1.0.0 should be considered development releases with potential breaking changes.
