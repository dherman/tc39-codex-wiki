---
  title: Rest Parameters
---

# Rest Parameters

*Champions*: Allen Wirfs-Brock, Brendan Eich, Erik Arvidsson<br/>

Rest parameters provide a cleaner way of dealing with functions that takes
arbitrary number of parameters than using `arguments`.

*Details*: [full proposal](details)

## A better arguments

The `arguments` object is one of the strangest objects in ES5. It looks like an
array but it isn't. It also magically updates the named parameters when it is
changed. The rest parameter feature allows a function to declare that it is
variadic.

```javascript
function sprintf(format, ...args) {}
```

The rest parameter is a real `Array` and it is a snapshot of the arguments
passed to the function. Changing the array has no strange side effects.

**Example:** Below is one incomplete implementation of `sprintf`.

```javascript
function sprintf(format, ...args) {
  var i = 0;
  return format.replace(/%(.)/, function(_, c) {
    switch (c) {
      case '%':
        return '%';
      case 's':
        return String(args[i++]);
    }
  });
}

format('Name: %s', 'Hello World')
```

## See Also

- [Spread](/es6/spread)
- [Destructuring](/es6/destructuring)

