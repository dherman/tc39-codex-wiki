---
  title: Block scoping
---

# Block scoping

*Champions*: [Dave Herman](/about/people/dave-herman), [Mark Miller](/about/people/mark-miller)

Block scoping introduces new declaration forms for defining variables scoped to a single block. This includes:

  * `let`: syntactically similar to `var`, but defines a variable in the current block
  * `function`: allow `function` declarations in nested blocks
  * `const`: like `let`, but for read-only constant declarations

## A better `var`

Using `let` in place of `var` makes it easier to define block-local variables without worrying about them clashing with variables elsewhere in the same function body.

```javascript
function log(msg) { ... }

function f(x) {
    if (...) {
        let { log, sin, cos } = Math;
        ... log(x) ...
    }
    log("done computing f()");
}
```

## Closures in loops

Using `let` makes it easier to create closures within loops:

```javascript
for (i = 0; i < n; i++) {
    let x = a[i];
    element.onclick = function() {
        ... x ...
    };
}
```

## Closures in `for` loops

*FIXME*: example

