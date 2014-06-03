var expect = require("chai").expect;
var product = require("../src/js/lib/product");

describe("multiplying two numbers", function() {

    it("both arguments should be numbers", function() {
        product(function(err, ret) {
            expect(ret).to.equal(null);
        });
    });


    it("should provide the product of both numbers", function() {
        expect(product(10, 20)).to.equal(200);
        expect(product(2, 4)).to.equal(8);
    });

});
