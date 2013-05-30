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

    // ModelProps can be mixed into existing models like:
    // Backbone.ModelProperties(Book, 'title', 'author');
    Backbone.ModelProperties = function(model_constructor) {
        var props = _.rest(arguments);
        installPropertyDescriptors(model_constructor.prototype, props);
    };

    // or through config via injection of constructor (overrides any constructor you have defined)
    // Book = Backbone.ModelProperties.descend(Book, 'extra', 'props');
    Backbone.ModelProperties.descend = function(model_constructor) {
        // Backbone.Model.extend
        var props = _.rest(arguments),
            Constructor = function() {
                // call super constructor chain
                Constructor.__super__ && Constructor.__super__.constructor.apply(this, arguments);
                // install property descriptors from specified arguments. install on instance since
                // Constructor proto is overwritten and properties (not descriptors) are copied into child
                installPropertyDescriptors(this, props);
                // install a descriptor for each model-configured property (via 'attrs')
                // this is only known after the subclass has been defined, so we have to hook in constructor
                installPropertyDescriptors(this, this.attrs);
            };
        // child (Constructor) prototype is overwritten by Backbone when setting up inheritance, so we
        // can't install descriptors on Constructor.prototype
        // installPropertyDescriptors(Constructor.prototype, _.rest(arguments));
        return model_constructor.extend({ constructor: Constructor });
    }

    // or used as a base via Backbone inheritance
    // Book = Backbone.ModelWithProperties.extend({ attrs: [ 'title', 'author' ] });
    Backbone.ModelWithProperties = Backbone.ModelProperties.descend(Backbone.Model);
})();
