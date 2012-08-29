---
  title: Weak Maps
---

*Champions*: Mark Miller<br/>
*Details*: [here](http://wiki.ecmascript.org/doku.php?id=harmony:weak_maps)

# Weak Maps

`WeakMap`s help developers avoid memory leaks by holding references to their properties *weakly*, meaning that if a `WeakMap` is the only object with a reference to another object, the GC may collect the referenced object. This behavior differs from all variable references in ES5.

A key property of Weak Maps is the _inability to enumerate their keys_. This is necessary to prevent attackers observing the internal behavior of other systems in the environment which share weakly-mapped objects. Should the number or names of items in the collection be discoverable from the API, even if the values aren't, `WeakMap` instances might create a [side channel](http://en.wikipedia.org/wiki/Side_channel_attack) where one was previously not available.

`WeakMap` instances have the same `set` and `get` signature as [Maps](map-set) with one extra restriction: _keys must be Objects_:

```javascript
let m = new WeakMap();
m.set('something', 'something'.length);  // Exception!
// TypeError: Invalid value used as weak map key
m.has('something');                      // Exception!
// TypeError: Invalid value used as weak map key

let wmk = {};
m.set(wmk, 'thinger');  // wmk → 'thinger'
m.get(wmk);             // 'thinger'
m.has(wmk);             // true
m.delete(wmk);          // true
m.has(wmk);             // false
```
