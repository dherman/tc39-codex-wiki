---
  title: Private names
---

# Private names

*Champions*: [Dave Herman](/contributors/dave-herman), [Allen Wirfs-Brock](/contributors/allen-wirfs-brock)

Private names are a new, special kind of object that can be used as an unguessable property name in objects. You can use scope to control access to them so only the parts of your program that you give access to the name object can get at properties with that name.

  * [detailed proposal](details)

## Private names for information hiding

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
    
    // unexported so no one else has access to it
    let score = new Name();
    
    export function Player(username) {
        this.username = username;
        this[score] = 0;
    }
    
    // retrieve the current score
    Player.prototype.getScore = function() {
        return this[score];
    }
    
    // unexported so no one else has access to it
    function score(p, n) {
        p[score] += n;
    }
    
    // etc...
}
```

## Private names for better subclassing

*FIXME:* write this
