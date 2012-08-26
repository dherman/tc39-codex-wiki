---
  title: for-of loop
---

# for-of loop

*Champion*: Dave Herman<br/>
*Details*: [ES6 draft section 12.6.4](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-12.6.4) 

The new `for-of` loop is for looping over iterable objects.

## Examples

Conveniently iterate over data in Arrays, [Sets](../map-set), and [Maps](../map-set):

```javascript
    for (let word of ["one", "two", "three"])
        alert(word);

    let s = new Set([3, 4, 5]);
    for (let value of s)
        alert(value);

    let m = new Map([['red', 'rojo'], ['blue', 'azul']]);
    for (let [name, value] of m)
        alert(name + " = " + value);
```

`for-of` is also available in [array comprehensions](../array-comprehensions).

See [iterators](../iterators) for examples of how to create custom iterable objects.

## How for-of is different from for-in

The `for-of` and `for-in` loops look similar, but they do two very different things.

* `for-in` is for inspecting object properties. It works on any object, and it always loops over the names of the object's enumerable properties.

* `for-of` is for looping over data. It only works on [iterable objects](../iterators); that is, objects with a suitable `[iterator]` method.

```javascript
    var colors = new Set(['rojo', 'amarillo', 'azul']);
    colors.language = 'es';     // add an expando property

    for (let name in colors)
        alert(name);            // "language" (the property name)

    for (let word of colors)
        alert(word);            // "rojo", "amarillo", "azul" (the data)
```
