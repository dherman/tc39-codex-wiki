---
  title: Object Literal Enhancements
---

# Object Literal Enhancements

*Champions*: Allen Wirfs-Brock, ?<br/>
[ES Wiki](http://wiki.ecmascript.org/doku.php?id=harmony:object_literals#object_literal_property_shorthands)

## Property Value Shorthand

Provide a shorthand for object initialisers whose property keys are initialized by variables of the same name.

The example:

```javascript
function f( x, y ) {
  return { x: x, y: y };
}
```

Would be written as:

```javascript
function f( x, y ) {
  return { x, y };
}
```

## Method Definition Shorthand


The example:

```javascript
var o = {
  method: function() {
    return "Hello!";
  }
};
```

Would be written as:

```javascript
var o = {
  method() {
    return "Hello!";
  }
};
```
