function attrs_should_have_defaults(model, attrs, defaults) {
    it('should have specified defaults', function() {
        _.each(attrs, function(attr) {
            expect(model[attr]).to.eql(defaults[attr]);
        });
        expect(model.attributes).to.eql(defaults);
    })
}

function attrs_should_be_accessed_by_props(model, attrs, defaults) {
    it('should be accessed by setters/getters', function() {
        var changes = {},
            expected_attrs = _.extend({}, defaults);
        // add listeners
        _.each(attrs, function(attr) {
            model.on("change:" + attr, function() {
                changes[attr] = true;
            });
        });
        // invoke setters
        _.each(attrs, function(attr) {
            model[attr] = attr + " changed via property";
            expected_attrs[attr] = attr + " changed via property";
        });
        // test results
        _.each(attrs, function(attr) {
            expect(changes[attr]).to.be(true);
        });
        expect(model.attributes).to.eql(expected_attrs);
        // test getters
        _.each(attrs, function(attr) {
            expect(model[attr]).to.eql(expected_attrs[attr]);
        });
    });
}

function subclass_property_behavior(cls) {
    attrs_should_be_accessed_by_props(new cls(), ['pages'], { language: "english" });
    properties_should_be_defined_on_proto(cls, 'pages');
}

function properties_should_be_defined_on_proto(cls) {
    var props = _.rest(arguments);
    it('should have properties defined on prototype', function() {
        _.each(props, function(prop) {
            expect(cls.prototype.hasOwnProperty(prop)).to.be(true);
            expect(Object.getOwnPropertyDescriptor(cls.prototype, prop)).not.to.be(undefined);
        });
    });
}

function properties_should_not_be_defined_on_proto(cls) {
    var props = _.rest(arguments);
    it('should not have properties defined on prototype', function() {
        _.each(props, function(prop) {
            expect(cls.prototype.hasOwnProperty(prop)).to.be(false);
            expect(Object.getOwnPropertyDescriptor(cls.prototype, prop)).to.be(undefined);
        });
    });
}

function standard_properties_should_be_defined_on_proto(cls) {
    properties_should_be_defined_on_proto(cls, 'title', 'author', 'language');
}

function standard_properties_should_not_be_defined_on_proto(cls) {
    properties_should_not_be_defined_on_proto(cls, 'title', 'author', 'language');
}

function should_preserve_inheritance_chain(book) {
    var classes = _.rest(arguments),
        constructor_calls = _.map(classes, function(cls) { return [ cls, 'constructor' ]; }),
        initialize_calls = _.map(classes, function(cls) { return [ cls, 'initialize' ]; }),
        expected_calls = constructor_calls.concat(initialize_calls);

    it('should initialize correctly', function() {
        console.log(expected_calls);
        expect(book.call_record).to.eql(expected_calls);
    });
}

function should_propagate_extendWithAttrs_as_extend(cls) {
    it("extend should == extendWithAttrs", function() {
        expect(cls.extend).to.eql(Backbone.Model.extendWithAttrs);
    });
}

function basic_behavior(cls, book, superName, props_on_super) {
    it("constructor should have setAttrs defined", function() {
        expect(cls['setAttrs']).to.be.a('function');
    });
    it("constructor should have extendWithAttrs defined", function() {
        expect(cls['extendWithAttrs']).to.be.a('function');
    });

    attrs_should_have_defaults(book, ['language', 'title', 'author'], { language: "english" });

    attrs_should_be_accessed_by_props(book, ['title', 'author', 'language']);

    if (props_on_super) {
        standard_properties_should_be_defined_on_proto(eval(superName));
        // ensure existing properties are defined in super's proto, not subclasses
        standard_properties_should_not_be_defined_on_proto(cls);
    } else {
        standard_properties_should_be_defined_on_proto(cls);
    }

    it('should have ' + superName + ' as __super__', function() {
        expect(cls.__super__).to.be(eval(superName).prototype);
    });

}
function first_level_of_inheritance_behavior(cls, superName) {
    var book = new cls();

    basic_behavior(cls, book, superName);
    should_preserve_inheritance_chain(book, cls);
}

function second_level_of_inheritance_behavior(cls, superName) {
    var book = new cls();

    basic_behavior(cls, book, superName, true);
    subclass_property_behavior(cls);
    should_preserve_inheritance_chain(book, cls, eval(superName));
    should_propagate_extendWithAttrs_as_extend(cls);
}

describe("single level of inheritance", function() {
    describe("BookWithSetAttrs", function() {
        first_level_of_inheritance_behavior(BookWithSetAttrs, 'Backbone.Model');
    });

    describe("BookExtendedWithAttrs", function() {
        first_level_of_inheritance_behavior(BookExtendedWithAttrs, 'Backbone.Model');
        should_propagate_extendWithAttrs_as_extend(BookExtendedWithAttrs);
    });

    describe("BookExtendingModelWithAttrs", function() {
        first_level_of_inheritance_behavior(BookExtendingModelWithAttrs, 'Backbone.ModelWithAttrs');
        should_propagate_extendWithAttrs_as_extend(BookExtendingModelWithAttrs);
    });

    describe("BookBaseExtendedWithAttrsSub", function() {
        var book = new BookBaseExtendedWithAttrsSub();

        basic_behavior(BookBaseExtendedWithAttrsSub, book, 'BookBase');
        // we have 1 more class in hierarchy
        should_preserve_inheritance_chain(book, BookBaseExtendedWithAttrsSub, BookBase);

        should_propagate_extendWithAttrs_as_extend(BookBaseExtendedWithAttrsSub);
    });
});


describe("second level of inheritence", function() {
    describe("BookWithSetAttrsSub", function() {
        basic_behavior(BookWithSetAttrsSub, new BookWithSetAttrsSub(), "BookWithSetAttrs", true);

        // we don't extendWithAttrs so property descriptors are not installed...
        properties_should_not_be_defined_on_proto(BookWithSetAttrsSub, 'pages');
        // and nothing is propagated
        it("extend is not overwritten since we have not extended with extendWithAttrs", function() {
            expect(BookWithSetAttrsSub.extend).to.eql(Backbone.Model.extend);
        });
    });

    describe("BookExtendedWithAttrsSub", function() {
        second_level_of_inheritance_behavior(BookExtendedWithAttrsSub, 'BookExtendedWithAttrs');
    });
    describe("BookExtendingModelWithAttrsSub", function() {
        second_level_of_inheritance_behavior(BookExtendingModelWithAttrsSub, 'BookExtendingModelWithAttrs');
    });
    describe("BookBaseExtendedWithAttrsSubSub", function() {
        var book = new BookBaseExtendedWithAttrsSubSub();

        basic_behavior(BookBaseExtendedWithAttrsSubSub, new BookBaseExtendedWithAttrsSubSub(), 'BookBaseExtendedWithAttrsSub', true);
        subclass_property_behavior(BookBaseExtendedWithAttrsSubSub);
        // we have 1 additional class in hierarchy
        should_preserve_inheritance_chain(book, BookBaseExtendedWithAttrsSubSub, BookBaseExtendedWithAttrsSub, BookBase);
        should_propagate_extendWithAttrs_as_extend(BookBaseExtendedWithAttrsSubSub);
    });
});