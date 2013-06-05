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

    Backbone.Model.prototype.setAttrs = setAttrs;
    Backbone.Model.setAttrs = setAttrs;

    Backbone.ModelProperties = function(model_constructor) {
        var props = _.rest(arguments);
        model_constructor.prototype.setAttrs.apply(model_constructor.prototype, props);
    };

    // override Backbone.Model.extend in order to propagate setAttrs as a convenience
    Backbone.ModelProperties.backboneModelExtend = Backbone.Model.extend;
    Backbone.Model.extend = function() {
        var child = Backbone.ModelProperties.backboneModelExtend.apply(this, _.toArray(arguments));
        child.setAttrs = setAttrs;
        return child;
    }

    // or through config via injection of constructor (overrides any constructor you have defined)
    // Book = Backbone.ModelProperties.descend(Book, 'extra', 'props');
    Backbone.ModelProperties.descend = function(model_constructor) {
        // Backbone.Model.extend
        var props = _.rest(arguments),
            Constructor = function() {
                // call super constructor chain
                Constructor.__super__ && Constructor.__super__.constructor.apply(this, arguments);
                // set attributes for this instance, which could be supplied by descend arguments
                // or by model 'attrs' property set in model initialize
                this.setAttrs.apply(this, props)
            },
            child = null;
        // child (Constructor) prototype is overwritten by Backbone when setting up inheritance, so we
        // can't install descriptors on Constructor.prototype
        // installPropertyDescriptors(Constructor.prototype, props);
        child = model_constructor.extend({ constructor: Constructor });
        child.setAttrs.call(child, props);
        return child;
    }


    Backbone.Model.extendWithAttrs = function() {
        var child = Backbone.ModelProperties.backboneModelExtend.apply(this, _.toArray(arguments));
        if (child.extend != Backbone.Model.extendWithAttrs) {
            child.extend = Backbone.Model.extendWithAttrs;
        }
        child.setAttrs();
        return child;
    }

    // or used as a base via Backbone inheritance
    // Book = Backbone.ModelWithProperties.extend({ attrs: [ 'title', 'author' ] });
    Backbone.ModelWithProperties = Backbone.ModelProperties.descend(Backbone.Model);
    Backbone.ModelWithAttrs = Backbone.Model.extendWithAttrs();

})();
