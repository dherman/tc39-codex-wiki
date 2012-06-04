---
  title: Name objects - detailed proposal
---

# Name objects - detailed proposal

This proposal introduces a new kind of object called a *name object*, which can be used to add truly private properties to any object. The semantics of property lookup is generalized such that whenever [[ToString]] was used for property names in ES5, this is replaced with a new [[ToPropertyName]] operation.

## API

The `@name` module provides the following API:

  * `[new] Name(str = <unspecified new string>, priv = false)`

Produces a new name object. The `str` argument is used as the result of `toString`. The `priv` argument indicates whether the name is private.

  * `isName(x)`

Determines whether a given value is a name object.

## Semantics

This proposal replaces the use of [[ToString]] for performing property access with a new [[ToPropertyName]] operation, which behaves exactly the same as [[ToString]] except with name objects, which are returned as is. Object property tables can be keyed by both strings and name objects.

Unlike string property names, when defining a new property with a name object, the enumerability attribute of the new property defaults to **false**.

### Private names

A private name object is a name object that was created with the `priv` flag set to `true`.

Every private name object has a `public` property that is a reference to a deeply frozen object that **contains no references to the name object**, and whose `toString` method produces the same string as the private name object. The `public` object is **not itself a name object**. (In reflection API's, this prevents an ambiguity between the private name and some other property value.)

Private names are not reflected by any of the core semantic algorithms except for proxy traps. In particular, private names are not reflected by:

  * `Object.getOwnPropertyNames`
  * `for`...`in`

When proxy traps are invoked for a private name, they receive the name’s `public` property instead of the name itself. This prevents unintended leakage of the private name, but still identifies the name to code that already has access to it. For example:

```javascript
var key = new Name("key", true);
...
var proxy = new Proxy(target, {
    ...
    get: function(receiver, name) {
        if (name === key.public)
            ...
        else
            ...
    },
    ...
});
```
