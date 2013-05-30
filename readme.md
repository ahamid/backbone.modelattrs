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
Backbone.ModelProperties(Book, 'title', 'author', 'language');

// or extend Backbone.ModelWithProperties
Book = Backbone.ModelWithProperties.extend({
   defaults: { 'language':  "english" },
   attrs: [ 'title', 'author', 'language' ]
   ...
});


// then use properties in place of set/get

var book = new Book();
book.title = 'A Heartbreaking Work of Staggering Genius';

```
