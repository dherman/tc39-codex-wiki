---
  title: Array Improvements
---

# Array Improvements

*Champions*: Rick Waldron, Dave Herman<br/>
*Details*: [full proposal](details)

Array Improvements will include, but are not limited to, the addition of two new static Array constructor functions:

  * `Array.from`: Converts a single argument that is an array-like object or list (eg. `arguments`, `NodeList`, `DOMTokenList` (used by `classList`), `NamedNodeMap` (used by attributes property)) into a `new Array()` and returns it;

  * `Array.of`: Converts a variable length of arguments to an array. Unlike `Array`, does not have the special case for `new Array(42)`, which presets length (and hints to implementations to preallocate) but leaves holes).


## Array.from( arg ) [ Unary ]


Converting arguments:

```javascript

function foo() {
  var args = Array.from( arguments );

  // ... do stuff with |args|
}

foo( "a", "b", "c" );

```

Converting _any_ Array-Like:

```javascript

Array.from({ 0: "a", 1: "b", 2: "c", length: 3 });

// [ "a", "b" , "c" ]

```


Assuming the following HTML:

```html
<div class="some classes" data-info="12"></div>
<div data-info="10"></div>
```

The following examples illustrate common DOM use cases:

```javascript
var divs = document.querySelectorAll("div");

Array.from( divs );
// [ <div class=​"some classes" data-info=​"12">​</div>​, <div data-info=​"10">​</div>​ ]


Array.from( divs ).forEach(function( node ) {
    console.log( node );
});
// <div class=​"some classes" data-info=​"12">​</div>​
// <div data-info=​"10">​</div>​


Array.from( divs ).filter(function( node ) {
    return !!node.classList.length;
});
// [ <div class="some classes" data-info="12"></div> ]


Array.from( divs ).reduce(function( prev, current ) {
    return ( +prev.dataset.info ) + ( +current.dataset.info );
});
// 22


Array.from( divs[0].classList )
// ["some", "classes"]


// Now shorter then [].foo.call :)
var a = Array;


a.from( divs );
// [ <div class=​"some classes" data-info=​"12">​</div>​, <div data-info=​"10">​</div>​ ]
```

## Array.of() [ Variable Arity ]

Examples of common use cases:

```javascript

Array.of( 10 );

// [ 10 ]


```

## See Also

- [Rest](/es6/rest-parameters)
- [Spread](/es6/spread)
