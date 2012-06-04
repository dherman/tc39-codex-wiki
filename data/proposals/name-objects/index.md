---
  title: Name objects
---

# Name objects

*Champions*: [Dave Herman](/about/people/dave-herman), [Allen Wirfs-Brock](/about/people/allen-wirfs-brock)

Names are a new, special kind of object that can be used as a unique property name in objects. Using name objects instead of strings allows different modules to create properties that don't conflict with one another. Names can also be made private, so that they can't be accessed by anyone who doesn't have access to the name directly.

  * [detailed proposal](details)

## Unique names for better subclassing

*FIXME:* write this

## Unique names for safe monkey-patching

*FIXME:* write this

## Unique names for lightweight information hiding

**Example:** a widely-used library might wish to provide objects that hide their implementation details so that clients don't accidentally rely on them.

```javascript
module query {
    import Name from "@name";

    let elements = new Name();

    function QueryResult(...) {
        this[elements] = ...;
    }
        
    export function query(selector) {
        ...
        return new QueryResult(...)
    }
}
```

## Private names for tamper resistance

**Example:** an online game might provide a `Player` class that represents a player in the game, and encapsulates access to the player's score. To prevent tampering with the player's score, it can be made private by giving the score property a private name:

```javascript
module player {
    import Name from "@name";
    
    // private and unexported so no one else has access to it
    let score = new Name("score", true);
    
    export function Player(username) {
        this.username = username;
        this[score] = 0;
    }
    
    // retrieve the current score
    Player.prototype.getScore = function() {
        return this[score];
    }
    
    // unexported so no one else has access to it
    function increaseScore(p, n) {
        p[score] += n;
    }
    
    // etc...
}
```
