---
  title: Symbols
---

# Symbols

*Champions*: Dave Herman, Allen Wirfs-Brock

Symbols are a new, special kind of object that can be used as a unique property name in objects. Using symbols instead of strings allows different modules to create properties that don't conflict with one another. Symbols can also be made private, so that their properties can't be accessed by anyone who doesn't already have direct access to the symbol.

  * [detailed proposal](details)

## Using symbols for better subclassing

*FIXME:* write this

## Using symbols for safe monkey-patching

*FIXME:* write this

## Using symbols for lightweight information hiding

**Example:** a widely-used library might wish to provide objects that hide their implementation details so that clients don't accidentally rely on them.

```javascript
module query {
    import Symbol from "@symbol";

    let elements = new Symbol();

    function QueryResult(...) {
        this[elements] = ...;
    }
        
    export function query(selector) {
        ...
        return new QueryResult(...)
    }
}
```

## Private symbols for tamper resistance

**Example:** an online game might provide a `Player` class that represents a player in the game, and encapsulates access to the player's score. To prevent tampering with the player's score, it can be made private by giving the score property a private symbol:

```javascript
module player {
    import Symbol from "@symbol";
    
    // private and unexported so no one else has access to it
    let score = new Symbol("score", true);
    
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
