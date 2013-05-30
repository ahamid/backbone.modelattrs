// inject a method which records is invocation and delegates up the __super__ inheritance chain
function record_super(constructor, func_name) {
    this.call_record = this.call_record || [];
    this.call_record.push([constructor, func_name]);
    constructor.__super__[func_name].apply(this, _.rest(arguments, 2));
}

// model with properties injected (right into prototype)
BookWithMixin = Backbone.Model.extend({
    defaults: { 'language':  "english" },
    constructor: function() { record_super.call(this, BookWithMixin, 'constructor'); },
    initialize: function() { record_super.call(this, BookWithMixin, 'initialize'); },
}, { type: "BookWithMixin" });
Backbone.ModelProperties(BookWithMixin, 'title', 'author', 'language');

// model with properties. these are injected into instance as we must consult 'attrs' property at run/construction-time
BookWithConfig = Backbone.ModelWithProperties.extend({
    defaults: { 'language':  "english" },
    constructor: function() { record_super.call(this, BookWithConfig, 'constructor'); },
    initialize: function() { record_super.call(this, BookWithConfig, 'initialize'); },
    attrs: [ 'title', 'author', 'language' ]
}, { type: "BookWithConfig" });

// model with properties injected into instance
BookAncestor = Backbone.Model.extend({
    defaults: { 'language':  "english" },
    constructor: function() { record_super.call(this, BookAncestor, 'constructor'); },
    initialize: function() { record_super.call(this, BookAncestor, 'initialize'); }
})
BookWithStaticConfig = Backbone.ModelProperties.descend(BookAncestor, 'title', 'author', 'language');

// apply properties both ways
BookWithMixinAndConfig = Backbone.ModelWithProperties.extend({
    defaults: { 'language':  "english" },
    constructor: function() { record_super.call(this, BookWithMixinAndConfig, 'constructor'); },
    initialize: function() { record_super.call(this, BookWithMixinAndConfig, 'initialize'); },
    attrs: ['language']
}, { type: "BookWithMixinAndConfig" });
Backbone.ModelProperties(BookWithMixinAndConfig, 'title', 'author')

// ensure inheritance still works as normal
BookFromBookWithMixin = BookWithMixin.extend({
    constructor: function() { record_super.call(this, BookFromBookWithMixin, 'constructor'); },
    initialize: function() { record_super.call(this, BookFromBookWithMixin, 'initialize'); },
});

BookFromBookWithConfig = BookWithConfig.extend({
    constructor: function() { record_super.call(this, BookFromBookWithConfig, 'constructor'); },
    initialize: function() { record_super.call(this, BookFromBookWithConfig, 'initialize'); },
});
