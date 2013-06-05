// inject a method which records is invocation and delegates up the __super__ inheritance chain
function record_super(constructor, func_name) {
    this.call_record = this.call_record || [];
    this.call_record.push([constructor, func_name]);
    constructor.__super__[func_name].apply(this, _.rest(arguments, 2));
}

// model with properties injected (right into prototype)
BookWithSetAttrs = Backbone.Model.extend({
    defaults: { 'language':  "english" },
    constructor: function() { record_super.call(this, BookWithSetAttrs, 'constructor'); },
    initialize: function() { record_super.call(this, BookWithSetAttrs, 'initialize'); },
}, { type: "BookWithSetAttrs" });
BookWithSetAttrs.setAttrs('title', 'author', 'language');

BookExtendedWithAttrs = Backbone.Model.extendWithAttrs({
    defaults: { 'language':  "english" },
    attrs: [ 'title', 'author', 'language' ],
    constructor: function() { record_super.call(this, BookExtendedWithAttrs, 'constructor'); },
    initialize: function() { record_super.call(this, BookExtendedWithAttrs, 'initialize'); }
});

BookExtendingModelWithAttrs = Backbone.ModelWithAttrs.extend({
    defaults: { 'language':  "english" },
    attrs: [ 'title', 'author', 'language' ],
    constructor: function() { record_super.call(this, BookExtendingModelWithAttrs, 'constructor'); },
    initialize: function() { record_super.call(this, BookExtendingModelWithAttrs, 'initialize'); }
});

BookBase = Backbone.Model.extend({
    constructor: function() { record_super.call(this, BookBase, 'constructor'); },
    initialize: function() { record_super.call(this, BookBase, 'initialize'); }
});
BookBaseExtendedWithAttrsSub = BookBase.extendWithAttrs({
    defaults: { 'language':  "english" },
    attrs: [ 'title', 'author', 'language' ],
    constructor: function() { record_super.call(this, BookBaseExtendedWithAttrsSub, 'constructor'); },
    initialize: function() { record_super.call(this, BookBaseExtendedWithAttrsSub, 'initialize'); }
});

// test subclasses

BookWithSetAttrsSub = BookWithSetAttrs.extend({
    attrs: [ 'pages' ],
    constructor: function() { record_super.call(this, BookWithSetAttrsSub, 'constructor'); },
    initialize: function() { record_super.call(this, BookWithSetAttrsSub, 'initialize'); }
});

BookExtendedWithAttrsSub = BookExtendedWithAttrs.extend({
    attrs: [ 'pages' ],
    constructor: function() { record_super.call(this, BookExtendedWithAttrsSub, 'constructor'); },
    initialize: function() { record_super.call(this, BookExtendedWithAttrsSub, 'initialize'); }
});

BookExtendingModelWithAttrsSub = BookExtendingModelWithAttrs.extend({
    attrs: [ 'pages' ],
    constructor: function() { record_super.call(this, BookExtendingModelWithAttrsSub, 'constructor'); },
    initialize: function() { record_super.call(this, BookExtendingModelWithAttrsSub, 'initialize'); }
});

BookBaseExtendedWithAttrsSubSub = BookBaseExtendedWithAttrsSub.extend({
    attrs: ['pages'],
    constructor: function() { record_super.call(this, BookBaseExtendedWithAttrsSubSub, 'constructor'); },
    initialize: function() { record_super.call(this, BookBaseExtendedWithAttrsSubSub, 'initialize'); }
});