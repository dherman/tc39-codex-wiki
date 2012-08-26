---
  title: Maps and Sets
---

*Champions*: Mark Miller, Erik Arvidsson, Jason Orendorff<br/>
*Details*: [full proposal](http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets)

# Maps

If you want a simple storage mechanism that maps any object to anything, without
the shenanigans of prototype-based inheritance, Maps offer just what you need.

```javascript
let m = new Map();
m.set('something', 'something'.length);  // "something" → 9
m.has('something');     // true
m.get('something');     // 9
m.delete('something');  // true
m.has('something');     // false
```

You can also iterate through all keys and values.

```javascript
m.set('something',      'something'.length);
m.set('something else', 'something else'.length);

let values = [];
for (let [key, value] of m) {
  values.push(value);
}
value;  // [9, 14]
```

Instead of a for loop, you can go functional:

```javascript
m.forEach((value, key, map) => values.push(value));
```

# Sets

Just like maps, we have an API for dealing with data we want to include or
exclude from a fictitious bag.

```javascript
let s = new Set([1, 2, 3]);  // s has 1, 2 and 3.
s.has(-Infinity);  // false
s.add(-Infinity);     // s has 1, 2, 3, and -Infinity.
s.has(-Infinity);  // true
s.delete(-Infinity);  // true
s.has(-Infinity);  // false
```

Just like maps, we can iterate through values.

```javascript
let values = [];
for (let value of s) {
  values.push(value);
}
values;  // [1,2,3,-Infinity]
```

Let's go functional yet again!

```javascript
s.forEach((value, value, set) => values.push(value));
```
