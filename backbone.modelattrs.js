(function() {
    // installs setters and getters for given properties
    // that delegate to Backbone.Model set/get
    function installPropertyDescriptors(object, props) {
        _.each(props, function(prop) {
            Object.defineProperty(object, prop, {
                get: function() {
                    return this.get(prop);
                },
                set: function(newValue) {
                    this.set(prop, newValue);
                },
                enumerable: true
            });
        });
    }

    function setAttrs() {
        // if called on Backbone.Model subclass, then install in the prototype
        // otherwise install in the context (instance) object
        var target = this['__super__'] ? this.prototype : this;
        // install a descriptor for each model-configured property (via 'attrs')
        installPropertyDescriptors(target, target.attrs);
        // install property descriptors from specified arguments. install on instance since
        installPropertyDescriptors(target, _.toArray(arguments));
    };

    // save original Backbone.Model.extend
    var backboneModelExtend = Backbone.Model.extend;

    // enable explicitly setting attrs on existing model classes or instances
    Backbone.Model.prototype.setAttrs = setAttrs;
    Backbone.Model.setAttrs = setAttrs;

    // override Backbone.Model.extend in order to propagate setAttrs to all subclasses as a convenience
    Backbone.Model.extend = function() {
        var child = backboneModelExtend.apply(this, _.toArray(arguments));
        child.setAttrs = setAttrs;
        return child;
    }

    // introduce extendWithAttrs that:
    // 1) sets virtual properties on model prototype
    // 2) rewrites extend on descendent hierarchy to extendWithAttrs (so attrs wiring behavior is inherited)
    Backbone.Model.extendWithAttrs = function() {
        var child = backboneModelExtend.apply(this, _.toArray(arguments));
        if (child.extend != Backbone.Model.extendWithAttrs) {
            child.extend = Backbone.Model.extendWithAttrs;
        }
        child.setAttrs();
        return child;
    }

    // or used as a base via Backbone inheritance
    // Book = Backbone.ModelWithAttrs.extend({ attrs: [ 'title', 'author' ] });
    Backbone.ModelWithAttrs = Backbone.Model.extendWithAttrs();
})();
