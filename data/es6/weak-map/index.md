---
  title: Weak Maps
---

# Weak Maps

*Champions*: Mark Miller<br/>
*Details*: [full proposal](details)
*ES Wiki*: [here](http://wiki.ecmascript.org/doku.php?id=harmony:weak_maps)

Weak Maps allow developers to create applications which are less prone to memory leaks. They accomplish this by holding references to their properties *weakly*. That is to say, if a WeakMap is the only object holding a reference to another object, the GC may collect the referened element.

This behavior differs from object references in ES5, either as properties or captured in closure scopes, and represents a new way for authors to prevent memory leaks in thier applications. Objects which access to collections of DOM elements, for example, often want to hold references to them without keeping them alive should another part of an application choose to dispose of them. 
A key property of Weak Maps is the _inability to enumerate their keys_.
