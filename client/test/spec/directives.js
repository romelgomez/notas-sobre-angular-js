'use strict';

describe('directives', function() {
    beforeEach(module('directives'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('NgRepeatController Test', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('NgRepeatController', { $scope: $scope });
        });

        it('Images array should have 3 objects', function() {
            expect($scope.images.length).toEqual(3);
        });

    });

});

describe('',function(){
    var spy = jasmine.createSpy();
    beforeEach(function(done){
        var asynchronousFunc = function(callback){
            setTimeout(callback,0);
        };
        var callback = function(){
            spy();
            done();
        };
        asynchronousFunc(callback);
    });
    it('',function(){
        expect(spy).toHaveBeenCalled();
    });
});

describe('Asynchronous calls in Karma',function(){

   var spy = jasmine.createSpy();

   beforeEach(function(done){

      var asynchonousFunc = function(callback){
        setTimeout(callback,0);
      };

      var callback = function(){
        spy();
        done();
      };

      asynchonousFunc(callback);

   });

   it('expect spy() to have been called',function(){
       expect(spy).toHaveBeenCalled();
   });

});