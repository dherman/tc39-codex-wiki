---
  title: Array Comprehensions
---

# Array Comprehensions

*Champions*: Dave Herman, Brendan Eich<br/>
*Details*: [full proposal](details)<br/>
*ES wiki*: [here](http://wiki.ecmascript.org/doku.php?id=harmony:array_comprehensions)

Array comprehensions were introduced in [JavaScript](https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Working_with_Arrays#Array_comprehensions). Comprehensions are a well-understood and popular language feature of list comprehensions, found in languages such as [Python](http://docs.python.org/tutorial/datastructures.html#list-comprehensions) and [Haskell](http://www.haskell.org/haskellwiki/List_comprehension), among [many other languages](http://en.wikipedia.org/wiki/List_comprehension). The syntax was inspired by the mathematical notation of [set comprehensions](http://en.wikipedia.org/wiki/Set-builder_notation).

Array comprehensions are a convenient, declarative form for creating computed arrays with a literal syntax that reads naturally.

Per [iterators](/es6/iterators), default property value (not key) enumeration and custom value iteration may be done using `for-of` loop head syntax, rather than `for-in`.

## Examples

Filtering an array:

```javascript
[ x for (x of a) if (x.color === ‘blue’) ]
```
<br/> 
Mapping an array:

```javascript
[ square(x) for (x of [1,2,3,4,5]) ]
```
<br/> 
Cartesian product:

```javascript
[ [i,j] for (i of rows) for (j of columns) ]
```

## See Also

- [Iterators](/es6/iterators)
