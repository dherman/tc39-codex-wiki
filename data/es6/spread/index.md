---
  title: Spread
---

# Spread

*Champions*: Allen Wirfs-Brock, Brendan Eich, Erik Arvidsson<br/>

The spread construct allows an expression to be expanded in places where
multiple arguments (for function calls) or multiple elements (for array
literals) are expected.

*Details*: [full proposal](details)


## A better apply

**Example:** it is common to use `Function.prototype.apply` in cases where you
want to use an array
as arguments to a function.

```javascript
function f(x, y, z) { }
var args = [0, 1, 2];
f.apply(null, args);
```

With ES6 spread you can now write the above as

```javascript
function f(x, y, z) { }
var args = [0, 1, 2];
f(...args);
```

Any argument in the argument list can use the spread syntax and it can be used
multiple times.

```javascript
function f(v, w, x, y, z) { }
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```


## A more powerful array literal

**Example:** Today if you have an array and want to create a new array with the
existing one being part of it, the array literal syntax is no longer sufficient
and you have to fall back to imperative code, using a combination of `push`,
`splice`, `concat` etc. With spread syntax this becomes much more succingt.

```javascript
var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
```

Just like with spread for argument lists `...` can be used anywhere in the array
literal and it can be used multiple times.


## Apply for new

**Example:** In ES5 it is not possible to compose `new` with `apply` (`apply`
does a `[[Construct]]` and not a `[[Call]]`). In ES6 the spread syntax naturally
supports this.

```javascript
var dataFields = readDateFields(database);
var d = new Date(...dateFields);
```


## A better push

**Example:** `push` is often used to push an array to the end of an existing
array. In ES5 this is often done as

```javascript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// Append all items from arr2 onto arr1
Array.prototype.push.apply(arr1, arr2);
```

In ES6 with spread this becomes:

```javascript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```


## Converting any array like

Since the spread construct for array literals copies every item of any object
over to a new array it is a convenient way to ensure that you have a real `Array`.

```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```


## See Also

- [Array Improvements](/es6/array-improvements)
- [Spread](/es6/spread)
