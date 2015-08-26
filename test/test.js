var assert = require("chai").assert; // node.js core module
var getenv = require('getenv');

describe('webhook',function(){

    var seneca = require('seneca')();
    seneca.use('..');

    describe('get',function(){
        it('should get a webhook',function(done){
            var req =  {lpi:'webhook', cmd:'get', config:{webhook:{name:"TEST",url:"https://public.opencpu.org/ocpu/library/MASS/data/Boston/json"}}};

            seneca.act(req, function(err,result){
                console.log( '%j', result );
                assert.isArray(result,'result is an Array');
                done();
            });
        })
    });

    describe('about',function(){
        it('should return integration properties',function(done){
            seneca.act( {lpi:'webhook', cmd:'about'}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                assert.equal(result.name,'webhook','name is webhook');
                done();
            });
        })
    });


    describe('list',function(){
        it('should return a command\'s json schema',function(done){
            seneca.act({lpi:'webhook',cmd:'list'}, function(err,list){
                console.log('%j',list);
                assert.isObject(list,'list is object');
                done();
            });
        });
    });
});
