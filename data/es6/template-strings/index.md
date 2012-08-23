---
  title: Template Strings
---

# Template Strings

*Champions*: Mike Samuel<br/>
[ES Wiki](http://wiki.ecmascript.org/doku.php?id=harmony:quasis)

Allows string literals with embedded expressions in them. This is often referred
to as string interpolation. The ES Harmony name for this has histoprically been
Quasi Litarals.

*Details*: [full proposal](details)

A template string uses back ticks instead of double quotes or single quotes. The
template string can contain place holders, which use the `${ }` syntax. The
value of the expressions in the place holders as well as the text between them
gets passed to a function. This function is determined on the expression before
the template string. If there is no expression before the template string the
default template string is used.

## Default template string

**Example:** By default the template string just concatenates its part into a
single string.

```javascript
var x = 1;
var y = 2;
`${ x } + ${ y } = ${ x + y}`  // "1 + 2 = 3"
```

## Multiline strings

**Example:** Template strings can be used for mutliline strings:

```javascript
var s = `a
    b
    c`;
assert(s === 'a\n    b\n    c');
```

All characters are significant so leading whitespaces on a new row are not
ignored.


## Tagged template strings

**Example:** If a template string is preceded by an expression it is considered a tagged
template string. The expression before the template string is called with the
parsed template string.

```javascript
function tag(strings, ...values) {
  assert(strings[0] === 'a');
  assert(strings[1] === 'b');
  assert(values[0] === 0);
  return 'whatever';
}
tag `a${ 42 }b`  // "whatever"
```

## Raw strings

The template string allows access to the string parts as they were entered. For
example, if a string part contains `\n` then that represents two characters; `\`
and `n` instead of a single newline character.

To get access to the raw strings the template string tag function reads the
`raw` property of the first argument.

```javascript
function r(strings, ...values) {
  assert(strings.raw[0] === '\\n');
}

r `\n`
```

ES6 provides a new function called `String.raw` which works like the default
string template function except that it concatenates the raw strings.

```javascript
String.raw `a\n${ 42 }b`  // "a\\n42b"
```
