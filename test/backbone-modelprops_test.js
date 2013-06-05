function shared_behavior(book) {
    describe("attributes", function() {
        it('should have specified defaults', function() {
            expect(book.language).to.be("english");
            expect(book.title).to.eql(undefined);
            expect(book.author).to.be(undefined);
            expect(book.attributes).to.eql({ language: "english" });
        });

        it('should be accessed by setters/getters', function() {
            var title_changed = false, author_changed = false;
            book.on({ "change:title": function() { title_changed = true },
                "change:author": function() { author_changed = true },
                "change:language": function() { lang_changed = true }});
            book.title = "test title";
            book.author = "test author";
            book.language = "test language";
            expect(book.attributes).to.eql({ title: "test title", author: "test author", language: "test language" });
            expect(title_changed).to.be(true);
            expect(author_changed).to.be(true);
            expect(lang_changed).to.be(true);
        });
    });
}

describe("BookWithMixin", function() {
    var book = new BookWithMixin();

    shared_behavior(book);

    it('should have properties defined on prototype', function() {
        expect(BookWithMixin.prototype.hasOwnProperty('title')).to.be(true);
        expect(BookWithMixin.prototype.hasOwnProperty('author')).to.be(true);
        expect(BookWithMixin.prototype.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookWithMixin.prototype, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithMixin.prototype, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithMixin.prototype, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookWithMixin, 'constructor'],
            [BookWithMixin, 'initialize']
        ]);
    });
})

describe("BookWithMixin2", function() {
    var book = new BookWithMixin2();

    shared_behavior(book);

    it('should have properties defined on prototype', function() {
        expect(BookWithMixin2.prototype.hasOwnProperty('title')).to.be(true);
        expect(BookWithMixin2.prototype.hasOwnProperty('author')).to.be(true);
        expect(BookWithMixin2.prototype.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookWithMixin2.prototype, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithMixin2.prototype, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithMixin2.prototype, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookWithMixin2, 'constructor'],
            [BookWithMixin2, 'initialize']
        ]);
    });
});

describe("BookWithConfig", function() {
    var book = new BookWithConfig();

    shared_behavior(book);

    it('should have properties defined on instance', function() {
        expect(book.hasOwnProperty('title')).to.be(true);
        expect(book.hasOwnProperty('author')).to.be(true);
        expect(book.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(book, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(book, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(book, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookWithConfig, 'constructor'],
            [BookWithConfig, 'initialize']
        ]);
    });
});

describe("BookWithStaticConfig", function() {
    var book = new BookWithStaticConfig();

    shared_behavior(book);

    it('should have BookAncestor as __super__', function() {
        expect(BookWithStaticConfig.__super__).to.be(BookAncestor.prototype);
    });

    it('should have properties defined on instance', function() {
        expect(book.hasOwnProperty('title')).to.be(true);
        expect(book.hasOwnProperty('author')).to.be(true);
        expect(book.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(book, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(book, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(book, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookAncestor, 'constructor'],
            [BookAncestor, 'initialize']
        ]);
    });
});


describe("BookWithProtoConfig", function() {
    var book = new BookWithProtoConfig();

    shared_behavior(book);

    it('should have properties defined on prototype', function() {
        expect(BookWithProtoConfig.prototype.hasOwnProperty('title')).to.be(true);
        expect(BookWithProtoConfig.prototype.hasOwnProperty('author')).to.be(true);
        expect(BookWithProtoConfig.prototype.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookWithProtoConfig.prototype, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithProtoConfig.prototype, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithProtoConfig.prototype, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookWithProtoConfig, 'constructor'],
            [BookWithProtoConfig, 'initialize']
        ]);
    });
})


describe("BookExtendedWithAttrs", function() {
    var book = new BookExtendedWithAttrs();

    shared_behavior(book);

    it('should have BookAncestor as __super__', function() {
        expect(BookExtendedWithAttrs.__super__).to.be(BookBase.prototype);
    });

    it('should have properties defined on prototype', function() {
        expect(BookExtendedWithAttrs.prototype.hasOwnProperty('title')).to.be(true);
        expect(BookExtendedWithAttrs.prototype.hasOwnProperty('author')).to.be(true);
        expect(BookExtendedWithAttrs.prototype.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookExtendedWithAttrs.prototype, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookExtendedWithAttrs.prototype, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookExtendedWithAttrs.prototype, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookExtendedWithAttrs, 'constructor'],
            [BookExtendedWithAttrs, 'initialize']
        ]);
    });
})


describe("BookExtendingModelWithAttrs", function() {
    var book = new BookExtendingModelWithAttrs();

    shared_behavior(book);

    it('should have ModelWithAttrs as __super__', function() {
        expect(BookExtendingModelWithAttrs.__super__).to.be(Backbone.ModelWithAttrs.prototype);
    });

    it('should have properties defined on prototype', function() {
        expect(BookExtendingModelWithAttrs.prototype.hasOwnProperty('title')).to.be(true);
        expect(BookExtendingModelWithAttrs.prototype.hasOwnProperty('author')).to.be(true);
        expect(BookExtendingModelWithAttrs.prototype.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookExtendingModelWithAttrs.prototype, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookExtendingModelWithAttrs.prototype, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookExtendingModelWithAttrs.prototype, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookExtendingModelWithAttrs, 'constructor'],
            [BookExtendingModelWithAttrs, 'initialize']
        ]);
    });
})

describe("BookWithMixinAndConfig", function() {
    var book = new BookWithMixinAndConfig();

    shared_behavior(book);

    it('should have Mixin properties defined on prototype', function() {
        expect(BookWithMixinAndConfig.prototype.hasOwnProperty('title')).to.be(true);
        expect(BookWithMixinAndConfig.prototype.hasOwnProperty('author')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookWithMixinAndConfig.prototype, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookWithMixinAndConfig.prototype, 'author')).not.to.be(undefined);
    });

    it('should have Configured properties defined on instance', function() {
        expect(book.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(book, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookWithMixinAndConfig, 'constructor'],
            [BookWithMixinAndConfig, 'initialize']
        ]);
    });
});

describe("Model extending BookWithMixin", function() {
    var book = new BookFromBookWithMixin();

    shared_behavior(book);

    it('should have BookWithMixin as __super__', function() {
        expect(BookFromBookWithMixin.__super__).to.be(BookWithMixin.prototype);
    })

    it('should not have properties defined on own prototype', function() {
        expect(BookFromBookWithMixin.prototype.hasOwnProperty('title')).to.be(false);
        expect(BookFromBookWithMixin.prototype.hasOwnProperty('author')).to.be(false);
        expect(BookFromBookWithMixin.prototype.hasOwnProperty('language')).to.be(false);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin.prototype, 'title')).to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin.prototype, 'author')).to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin.prototype, 'language')).to.be(undefined);
    });

    it('should inherit from / delegate to properties on __super__ prototype', function() {
        expect(BookFromBookWithMixin.__super__.hasOwnProperty('title')).to.be(true);
        expect(BookFromBookWithMixin.__super__.hasOwnProperty('author')).to.be(true);
        expect(BookFromBookWithMixin.__super__.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin.__super__, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin.__super__, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin.__super__, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookFromBookWithMixin, 'constructor'],
            [BookWithMixin, 'constructor'],
            [BookFromBookWithMixin, 'initialize'],
            [BookWithMixin, 'initialize']
        ]);
    });
});


describe("Model extending BookWithMixin2", function() {
    var book = new BookFromBookWithMixin2();

    shared_behavior(book);

    it('should have BookWithMixin as __super__', function() {
        expect(BookFromBookWithMixin2.__super__).to.be(BookWithMixin2.prototype);
    })

    it('should not have properties defined on own prototype', function() {
        expect(BookFromBookWithMixin2.prototype.hasOwnProperty('title')).to.be(false);
        expect(BookFromBookWithMixin2.prototype.hasOwnProperty('author')).to.be(false);
        expect(BookFromBookWithMixin2.prototype.hasOwnProperty('language')).to.be(false);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin2.prototype, 'title')).to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin2.prototype, 'author')).to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin2.prototype, 'language')).to.be(undefined);
    });

    it('should inherit from / delegate to properties on __super__ prototype', function() {
        expect(BookFromBookWithMixin2.__super__.hasOwnProperty('title')).to.be(true);
        expect(BookFromBookWithMixin2.__super__.hasOwnProperty('author')).to.be(true);
        expect(BookFromBookWithMixin2.__super__.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin2.__super__, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin2.__super__, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(BookFromBookWithMixin2.__super__, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookFromBookWithMixin2, 'constructor'],
            [BookWithMixin2, 'constructor'],
            [BookFromBookWithMixin2, 'initialize'],
            [BookWithMixin2, 'initialize']
        ]);
    });
});

describe("Model extending BookWithConfig", function() {
    var book = new BookFromBookWithConfig();

    shared_behavior(book);

    it('should have BookWithConfig as __super__', function() {
        expect(BookFromBookWithConfig.__super__).to.be(BookWithConfig.prototype);
    });

    it('should have properties defined on instance', function() {
        expect(book.hasOwnProperty('title')).to.be(true);
        expect(book.hasOwnProperty('author')).to.be(true);
        expect(book.hasOwnProperty('language')).to.be(true);
        expect(Object.getOwnPropertyDescriptor(book, 'title')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(book, 'author')).not.to.be(undefined);
        expect(Object.getOwnPropertyDescriptor(book, 'language')).not.to.be(undefined);
    });

    it('should initialize correctly', function() {
        expect(book.call_record).to.eql([
            [BookFromBookWithConfig, 'constructor'],
            [BookWithConfig, 'constructor'],
            [BookFromBookWithConfig, 'initialize'],
            [BookWithConfig, 'initialize']
        ]);
    });
});