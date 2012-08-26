---
  title: Classes
---

# Classes

*Champions*: Mark Miller, Brendan Eich, Dave Herman, Allen Wirfs-Brock<br/>
*Details*: [full proposal](details)<br/>
*ES wiki*: [here](http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes)


ECMAScript already has excellent features for defining abstractions for kinds of things. The trinity of constructor functions, prototypes, and instances are more than adequate for solving the problems that classes solve in other languages. The intent of this strawman is not to change those semantics. Instead, it’s to provide a terse and declarative surface for those semantics so that programmer intent is expressed instead of the underlying imperative machinery.


This proposal is based on an es-discuss proposal by Russell Leggett, which was based on a simplification of Dave Herman’s minimal classes proposal. Allen Wirfs-Brock drafted the compiled proposals to form the "Maximally-Minimal Class".

The absolute minimal requirements are:

- has a declaration form that uses the class keyword and an identifier to create the class
- has a body that can include both the constructor function, as well as any instance (prototype) methods – including getter and setter properties
- can declare the class as a subclass of a another class (probably with the extends keyword)
- super is available from any of the methods or constructor function



## Examples


```js


class EventEmitter {
  constructor() {
    ....
  }
  emit() {
    ...
  }
  on() {
    ...
  }
  once() {
    ...
  }
  removeListener() {
    ...
  }
  removeAllListeners() {
    ...
  }
}

exports.EventEmitter = EventEmitter;

```

Class declarations with explicitly ommitted constructors have an implied constructor:

```js
constructor() { [empty] }
```

Similarly, classes with an extends clause will have an implicit constructor that itself has an implicit super call, roughly resembling:

```js
constructor(...args) {
  // Safety net that handles:
  // "class X extends null {}"
  try { super.constructor } catch (e) { return };

  super(...args);
}
```

This drastically simplifies code that requires inheritance strategies:


```js
class Stream extends EventEmitter {
  pipe(dest, options) {
    ...
  }
}
```


This is a rough approximation of Node.js Domains, as written using ES6 Classes:

```js

var stack = [];

class Domain extends EventEmitter {
  constructor() {
    super();

    this.members = [];
  }

  enter() {
    if (this._disposed) return;

    // note that this might be a no-op, but we still need
    // to push it onto the stack so that we can pop it later.
    exports.active = process.domain = this;
    stack.push(this);
  }

  exit() {
    if (this._disposed) return;

    // exit all domains until this one.
    var d;
    do {
      d = stack.pop();
    } while (d && d !== this);

    exports.active = stack[stack.length - 1];
    process.domain = exports.active;
  }

  add(ee) {
    // disposed domains can't be used for new things.
    if (this._disposed) return;

    // already added to this domain.
    if (ee.domain === this) return;

    // has a domain already - remove it first.
    if (ee.domain) {
      ee.domain.remove(ee);
    }

    // check for circular Domain->Domain links.
    // This causes bad insanity!
    if (this.domain && (ee instanceof Domain)) {
      for (var d = this.domain; d; d = d.domain) {
        if (ee === d) return;
      }
    }

    ee.domain = this;
    this.members.push(ee);
  }

  remove(ee) {
    ee.domain = null;
    var index = this.members.indexOf(ee);
    if (index !== -1) {
      this.members.splice(index, 1);
    }
  }

  run(fn) {
    return this.bind(fn)();
  };

  intercept(cb) {
    return this.bind(cb, true);
  }

  // ... To Be Continued.
}


exports.Domain = Domain;

exports.create = exports.createDomain = function(cb) {
  return new Domain(cb);
};

exports._stack = stack;
// the active domain is always the one that we're currently in.
exports.active = null;



```


## Semantics

[Semantics Decisions, July 26, 2012 TC39 Meeting](http://wiki.ecmascript.org/lib/exe/fetch.php?id=strawman%3Amaximally_minimal_classes&cache=cache&media=strawman:maxminclasssemantics.pdf)

TODO: Transfer from PDF

## Class Terminology

- **class definition**: A *ClassDeclaration* or *ClassExpression*.
- **class name**: The declared name bound by a *ClassDeclaration*.
- **class**:  The set of objects consisting of a constructor function and prototype object that is referenced by the function's "prototype" property.
- **class object**:  The constructor function component of a class.
- **class prototype**: The prototype object component of a class.
- **instance property**: A property of a class prototype.
- **class property**: A property of a class object.
- **direct class instance**: An object whose [[Prototype]] internal property is a class prototype.
- **per instance property**: A property of a direct class instance.



## Summary of Key Points

- Class declarations/expressions create a constructor function/prototype pair exactly as for function declarations.
- The class element whose PropertyName is "constructor" provides the FormalParameterList and FunctionBody of the constructor function.
- All other CE's define properties of the prototype object using the same semantics as if they were elements of an object literal.
- The bond name in a class declaration is bound as if it was a declared in a **const** declaration initialized by a class expression
- There is (intentionally) no direct declarative way to define either prototype data properties (other than methods) class properties, or instance property
- Instance property an be created within the constructor body.
- Class properties and prototype data properties need be created outside the declaration.
- Definition of private named properties is done exactly as with object literals.
- Properties specified in a class definition are assigned the same attributes as if they appeared in an object literal.
- The bond name in a class declaration is bound as if it was a declared in a **const** declaration initialized by a class expression.
- If a constructor function needs to perform superclass initialization, it must do so by explicitly calling `super(/*arguments*/)` at some point within the constructor body.

**The is intended as a closed-ended proposal and is not open for major feature additions.**

Future editions of ECMAScript may and probably will extend the proposed class definitions.  However, the intent for  "ES6" is to only include the features described in this proposal. Attempting to extend this proposal is likely to result in dead-lock that would result in the inclusion of no class definition support in "ES6".
