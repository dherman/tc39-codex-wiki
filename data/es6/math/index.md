---
  title: Math
---

# Math

*Champions*: (?)<br/>
*Details*: [full proposal](details)<br/>
*Wiki*:
  * [More Math Functions](http://wiki.ecmascript.org/doku.php?id=harmony:more_math_functions)

Adds a few new functions to the `Math` object.

## log10
Returns the approximate base 10 logarithm of the first parameter.

## log2
Returns the approximate base 2 logarithm of the first parameter.

## log1p
## expm1
## cosh
## sinh
## tanh
## acosh
## asinh
## atanh
## hypot
## trunc

## sign
This function returns the sign of the first parameter, specifiying wether the value is positive, negative or zero.

```js
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-) // -0
Math.sign(NaN) // NaN
```

## Polyfill for Math.sign

```js
(function (global) {
  var isNaN = Number.isNaN;

  Object.defineProperty(Math, 'sign', {
    value: function sign(value) {
      var n = +value;
      if (isNaN(n))
        return n /* NaN */;

      if (n === 0)
        return n; // Keep the sign of the zero.

      return (n < 0) ? -1 : 1;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

## cbrt
