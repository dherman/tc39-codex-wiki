---
  title: Egal
---

# Egal

*Champions*: (?)<br/>
*Details*: [full proposal](details)<br/>
*Wiki*: [here](http://wiki.ecmascript.org/doku.php?id=harmony:egal)

Exposes the internal `SameValue` algorithm as a function. It introduces the function as `Object.is`.

## ===

Main differences between `===` and `Object.is` are the way `NaN`s and (negative) zeroes are treated. A `NaN` is egal to another `NaN` and negative zeroes are not `egal` from other positive zeroes.

```js
Object.is(0, -0); // false
Object.is(NaN, NaN); // true

0 === -0; // true
NaN === NaN; // false
```

## Syntax

There is no new syntax for `Object.is`, obviously.

## Polyfill

This is how you can define `Object.is` in es5:

```js
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 0 === -0, but they are not identical
      return x !== 0 || 1 / x === 1 / y;
    }
 
    // NaN !== NaN, but they are identical.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is a NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN("foo") => true
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});
```

