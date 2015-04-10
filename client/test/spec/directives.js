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