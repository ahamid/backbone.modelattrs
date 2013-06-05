Backbone.ModelProperties
========================

A simple helper that exploits `Object.defineProperties` to generate dynamic getters/setters for Model attributes.

Usage
-----

```
// apply properties to your own model...
Book = Backbone.Model.extend({
    defaults: { 'language':  "english" },
    ...
});
Book.setAttrs('title', 'author', 'language');

// or extendWithAttrs
Book = Backbone.Model.extendWithAttrs({
    defaults: { 'language':  "english" },
    attrs: [ 'title', 'author', 'language' ],
    ...
});

// or extend any subclass with attrs
Book = Backbone.ModelWithAttrs.extend({
    defaults: { 'language':  "english" },
    attrs: [ 'title', 'author', 'language' ]
    ...
}

// inheritance still works as normal
BookBase = Backbone.Model.extend({
    ...
});
BookWithAttrs = BookBase.extendWithAttrs({
    defaults: { 'language':  "english" },
    attrs: [ 'title', 'author', 'language' ]
});
EvenMoreSpecializedBook = BookWithAttrs.extend({
   ...
});

// then use properties in place of set/get

var book = new Book();
book.title = 'A Heartbreaking Work of Staggering Genius';

```
