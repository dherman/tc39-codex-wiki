---
  title: Number
---

# Number

*Champions*: (?)<br/>
*Details*: [full proposal](details)<br/>
*Wiki*:
  * [Number.isFinite](http://wiki.ecmascript.org/doku.php?id=harmony:number.isfinite)
  * [Number.isNaN](http://wiki.ecmascript.org/doku.php?id=harmony:number.isnan)
  * [Number.isInteger](http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger)
  * [Number.toInteger](http://wiki.ecmascript.org/doku.php?id=harmony:number.tointeger)

Adds a few sugar functions to the `Number` object.

## isFinite

The `Number.isFinite` function does the same thing as the global es5 function `isFinite` except that it doesn't coerce its parameters.

```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite("foo"); // false
Number.isFinite("15"); // false (!)
Number.isFinite(true); // false (!)
```

## Polyfill for Number.isFinite

```js
(function (global) {
  var global_isFinite = global.isFinite;

  Object.defineProperty(Number, 'isFinite', {
    value: function isFinite(value) {
      return typeof value === 'number' && global_isFinite(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

## isNaN

The `Number.isNaN` function does hte same thing as the global es5 function `isNaN` except that it doesn't coerce its parameters.

```js
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN("15"); // false (!)
Number.isNaN(true); // false (!)
```

## Polyfill for Number.isNaN

```js
(function (global) {
  var global_isNaN = global.isNaN;

  Object.defineProperty(Number, 'isNaN', {
    value: function isNaN(value) {
      return typeof value === 'number' && global_isNaN(value);
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

## isInteger

The `Number.isInteger` function allows you to determine whether the given value is a number value without decimals.

```js
Number.isInteger(5); // true
Number.isInteger(-5); // true
Number.isInteger(5.5); // false
Number.isInteger("15"); // false
Number.isInteger(true); // false
```

## Polyfill for Number.isInteger

```js
(function (global) {
  var floor = Math.floor,
    isFinite = global.isFinite;

  Object.defineProperty(Number, 'isInteger', {
    value: function isInteger(value) {
      return typeof value === 'number' && isFinite(value) &&
        value > -9007199254740992 && value < 9007199254740992 &&
        floor(value) === value;
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

## toInteger

The `Number.toInteger` function can be used to convert any number to an integer, by dropping the decimals. This is the same as applying `Math.floor` to the value, or doing `foo|0`. Minus points for the semantics, of course.

```js
Number.toInteger(5); // 5
Number.toInteger(5.5); // 5
Number.toInteger(-0); // -0 (?)
Number.toInteger(Infinity); // ?
Number.toInteger("15"); // +0
Number.toInteger(false); // +0
```
*TOFIX* is `Number.toInteger(-0)` really `-0`? :)
*TOFIX* what should be the result of `Infinity`?
```

## Polyfill for Number.toInteger

```js
(function (global) {
  var abs = Math.abs,
    floor = Math.floor,
    isFinite = global.isFinite,
    isNaN = global.isNaN;

  function sign(n) { return (n < 0) ? -1 : 1; }

  Object.defineProperty(Number, 'toInteger', {
    value: function toInteger(value) {
      var n = +value;
      if (isNaN(n))
        return +0;
      if (n === 0 || !isFinite(n))
        return n;
      return sign(n) * floor(abs(n));
    },
    configurable: true,
    enumerable: false,
    writable: true
  });
})(this);
```

There's a similar one where you can use the bit-wise operators or `Math.floor` but it seems overkill to add these.




