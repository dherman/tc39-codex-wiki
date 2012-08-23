---
  title: Arrow Functions
---

# Arrow Functions

*Champions*: Brendan Eich<br/>
*Details*: [full proposal](details)


The goal of Arrow Functions is to address and resolve several common pain points of traditional `Function Expression`:

  * Lexical `this` binding;

  * Shorter syntactical form (`() => {}` vs. `function () {}`)


## Proposal

```javascript

// Empty arrow function returns undefined
let empty = () => {};

// Single parameter case needs no parentheses around parameter list
let identity = x => x;

// No need for parentheses even for lower-precedence expression body
let square = x => x * x;

// Parenthesize the body to return an object literal expression
let key_maker = val => ({key: val});

// Statement body needs braces, must use 'return' explicitly if not void
let odds = evens.map(v => v + 1);

// `=>` has only lexical `this`, no dynamic `this`
const obj = {
  method: function () {
    return () => this;
  }
};
assert(obj.method()() === obj);

let fake = {steal: obj.method()};
assert(fake.steal() === obj);

// But `function` still has dynamic `this` of course
let real = {borrow: obj.method};
assert(real.borrow()() === real);

```

## Details

Arrow functions bind `this` lexically, bind `return` in the *Block* body case so it returns from the immediately enclosing arrow function, and preclude `break` and `continue` from referencing statements outside the immediately enclosing arrow function.

The *Identifier* primary expression `arguments` may not be used in an arrow function's body (whether expression or block form).

Likewise, `yield` may not be used in an arrow function's body. Arrows cannot be generators and we do not want deep continuations.

Arrow functions are like built-in functions in that both lack `.prototype` and any `[[Construct]]` internal method. So `new (() => {})` throws a `TypeError` but otherwise arrows are like functions:

```javascript
assert(typeof () => {} === "function");
assert(Object.getPrototypeOf(() => {}) === Function.prototype);
```

Because `this` is lexically bound, `arrow.call` and `arrow.apply` cannot bind a different `this` parameter value, but they can pass arbitrary arguments, of course.

The *ArrowFormalParameters* production requires GLR parsing or equivalent to disambiguate against the other right-hand sides of *AssignmentExpression*. For an LR(1) grammar, we can use:

```ebnf
ArrowFormalParameters :
    ( Expression_opt )
```

and write Supplemental Syntax to require that *Expression* reductions match *FormalParameterList*.

This works because *Expression* is a cover grammar for *FormalParameterList*, with *Identifier* primary expressions covering formal parameter names, array and object literals for [desstructuring](/es6/destructuring), assignment for [[harmony:parameter default values]], and [[harmony:spread]] for [[harmony:rest parameters]].

This cover grammar approach may require, e.g., extending [[strawman:guards]] to be legal in expressions if we add guards. We can cross that bridge later if necessary.

These changes are intended to be backward-compatible: existing JS parses as before, with the same semantics. New opt-in Harmony JS may use arrow functions where allowed.


## Rationale

- Hard to beat C# and CoffeeScript here (we want the unparenthesized single-parameter form as in C#).
  - TC39 should embrace, clean-up, and extend rather than re-invent or compete with de-facto and nearby de-jure standards.
  - However, we don't want CoffeeScript's `->`, it's confusing to have two arrows and dynamic `this` binding is an oft-fired footgun.
  - Currently we don't make `()` or `{}` in `() => {}` optional, but we could at risk of losing consensus (but no grammatical bugs bite optionality here).
- Lexical `this` matches the dominant cohort measured by Kevin Smith (see the [[https:*mail.mozilla.org/pipermail/es-discuss/2012-March/021126.html|BTF Measurements]] thread) that either does not use `this` or wants it lexically bound.
  - Best results after modifying subject code to use [[http:*wiki.ecmascript.org/doku.php?id=harmony:object_literals#object_literal_property_shorthands|method definition shorthand]] and only then scanning for `function`.
  - From lexical `this` it follows that arrow functions are not constructors (no `.prototype` or `[[Construct]]`).
- `=>` parses as if it were a low-precedence (assignment) operator joining a restricted comma expression (implicitly quoted) to a body.
  - This avoids precedence inversion when the body is an *AssignmentExpression*.
  - No preference for object literal over block (see [[strawman:block vs object literal]] to keep grammar simple and match expression-statement.
- TCP compliance "above" expressions -- for statements and programs -- looks like a mismatch with JS functions, old-style or arrow.
  - `return` is problematic because users want to write early returns in async callbacks, which under TCP would throw.
  - `break` and `continue` in sync callbacks could work well but would reify as exceptions and be observable via `finally` even if uncatchable.
  - In general the statements vs. expressions rift in JS, inherited via Java from C, means full TCP creates inevitable confusion and bugs.


## Deferred

- Optional leading `(this `*Initialiser*<sub>opt</sub>`)` parameter:
  - for explicit dynamic-`this` with [[strawman:soft_bind]] opt-in;
  - in lieu of `->` shorthand, to avoid having two arrows.
- Optional leading *Identifier* for named arrow function expressions.
- Optional leading `#` for deep freezing.



## See Also

*TODO*: Add reference links
