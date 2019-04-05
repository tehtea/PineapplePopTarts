const loginManager = require('../loginManager');
const expect = require('chai').expect;

describe("login backend", function() {
    describe("validCredentials", function() {
        it('should return success message', function(done) {
            loginManager.checkAccount("cheese", "Pie")
            .then((val) => {
                expect(val).equals("account found");
                done()
            })
            .catch((err) => {
                done(new Error("supposed to find an account"));
            })
        });
    });

    describe("invalidPassword", function() {
        it('should return failure message', function(done) {
            loginManager.checkAccount("cheese", "basket")
            .then((val) => {
                done(new Error("supposed to not resolve successfully"));
            })
            .catch((err) => {
                expect(err).equals("no account found");
                done();
            })
        });
    });

    describe("invalidUsername", function() {
        it('should return failure message', function(done) {
            loginManager.checkAccount("babi", "Pie")
            .then((val) => {
                done(new Error("supposed to not resolve successfully"));
            })
            .catch((err) => {
                expect(err).equals("no account found");
                done();
            })
        });
    });
});