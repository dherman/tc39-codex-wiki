---
  title: Iterators
---

# Iterators

*Champion*: Dave Herman<br/>
*Details*: [ES Wiki](http://wiki.ecmascript.org/doku.php?id=harmony:iterators)

A object that represents a collection can provide an `[iterator]()` method so that other code can conveniently iterate over its contents.

* An *iterable object* is any object that has an `[iterator]()` method that returns an iterator.  (`iterator` is a standard [private name](../private-names).)

* An *iterator* is any object that has a `.next()` method. This method returns the next item, if any, and throws a `StopIteration` object if there are no more items.

* The easiest way to produce an iterator is to write a [generator](../generators). The easiest way to consume an iterator is to write a [for-of loop](../for-of).

The design of iterators and [generators](../generators) in ES6 follows similar features in Python.


## Example

The simplest way to make an object iterable is to give it an `[iterator]` method that is a generator.

```javascript
    // Make jQuery objects iterable
    import iterator from "@iter";
    jQuery.prototype[iterator] = function* iterator() {
        for (var i = 0; i < this.length; i++)
            yield $(this.get(i));
    };

    // Example code looping over a jQuery collection
    var t = 500;
    for (var p of $("p")) {
        p.fadeOut(t);
        t += 200;
    }
```

The standard `@iter` module provides a few convenience functions for iterating over object property names and values:

```javascript
    import keys, values, items from "@iter";

    for (var k of keys(obj))
        alert("property name: " + k);

    for (var v of values(obj))
        alert("property value: " + v);

    for (var [k, v] of items(obj))
        alert(k + ": " + v);
```
