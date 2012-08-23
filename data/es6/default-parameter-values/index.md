---
  title: Default parameter values
---

# Default parameter values

*Champions*: (?) Waldemar
*Details*: [full proposal](details)
*ES wiki*: [here](http://wiki.ecmascript.org/doku.php?id=harmony:parameter_default_values)

Default parameter values allow you to initialize parameters if they were not explicitly supplied. This means that you no longer have to do `options = options || {};`.

## Syntax

The syntax is minorly modified by allowing an (optional) initialiser after the parameter names:

```js
function foo(x=5){ log(x); }
foo(); // 5
```

# Trailing

Only trailing parameters may have default values:

```js
function foo(x,y=5){}
function foo(x=5,y=5){}
function foo(x,y="hello",z=this){}
```

## Evaluation

Any value is evaluated in the scope of the function, so `this` will resolve to whatever context the function has at runtime.

## Undefined

Note that passing on `undefined` or `null` will not make that parameter get a default value, if any.

*FIXME* Or does it?

## Arity

The arity (`.length`) of the function will be the number of parameters that have no default value declared.

```js
(function(a){}).length // 1
(function(a=5){}).length // 0
(function(a,b,c=5){}).length // 2
```


