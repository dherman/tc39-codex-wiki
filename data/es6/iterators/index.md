---
  title: Iterators
---

# Iterators

*Champion*: Dave Herman<br/>
*Details*: [ES Wiki](http://wiki.ecmascript.org/doku.php?id=harmony:iterators)

A object that represents a collection can provide an `[iterator]()` method so that other code can conveniently iterate over its contents.

* An *iterable object* is any object that has an `[iterator]()` method that returns an iterator.  (`iterator` is a standard [private name](../private-names).)

* An *iterator* is any object that has a `.next()` method.

* To loop over the contents of an iterable object, use a [for-of loop](../for-of). The loop will automatically call the `[iterator]()` method once to produce an iterator, then call `it.next()` repeatedly until the iterator throws a `StopIteration` object.

The design of iterators and [generators](../generators) in ES6 follows similar features in Python.

