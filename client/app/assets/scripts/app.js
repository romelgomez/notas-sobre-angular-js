'use strict';

angular.module('Task',['angular-underscore/filters'])
    .provider('tasks',function(){

        var tasks = [
            {task:'Aprender Angular',   status:false},
            {task:'Aprender GoLang',    status:false},
            {task:'Aprender Git',       status:false},
            {task:'Aprender Yeoman',    status:true}
        ];

        return {
            $get: function(){
                return {
                    'add':function(task){
                        tasks.push({'task':task,'status':false});
                    },
                    'get': function () {
                        return tasks;
                    },
                    'tasks':function(){
                        return tasks.length;
                    },
                    'changeAllStatus' : function(all){
                        if(all){
                            angular.forEach(tasks, function (value, key) {
                                tasks[key].status = true;
                            });
                        }else{
                            angular.forEach(tasks, function (value, key) {
                                tasks[key].status = false;
                            });
                        }
                    },
                    'left': function(){
                        // _.filter -> http://underscorejs.org/#filter
                        var completed  = _.filter(tasks,function(task){
                            return task.status;
                        });
                        return tasks.length-completed.length;
                    },
                    'length':function(){
                        return tasks.length;
                    },
                    'delete' : function(){
                        // _.filter -> http://underscorejs.org/#filter
                        tasks = _.filter(tasks,function(task){
                            return !task.status;
                        });
                    },
                    'hasValidLength': function () {
//                        return false |
                    }
                };
            }
        };

    })
    .controller('TasksController',['$scope','$log','tasks',function($scope,$log,tasks){

        $scope.tasks = {
            'task':'',
            'allStatus':false,
            'add':function(){
                tasks.add($scope.tasks.task);
                $scope.tasks.task = '';
            },
            'get':function(){
                return tasks.get();
            },
            'left':function(){
                return tasks.left();
            },
            'length':function(){
                return tasks.length();
            },
            'delete':function(){
                $scope.tasks.allStatus = false;
                return tasks.delete();
            },
            'changeAllStatus':function(status){
                tasks.changeAllStatus(status);
            }
        };


        //var VALID_LENGTH = 3;
        //$scope.hasValidLength = function(){
        //    var validLength = false;
        //
        //    if ($scope.task.length > VALID_LENGTH) {
        //        validLength = true
        //    }
        //
        //    return validLength;
        //};

    }]);

angular.module('routes',['ui.router','Task'])
    .config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'assets/partials/pages/home.html'
            })
            .state('about',{
                url:'/about',
                templateUrl:'assets/partials/pages/about.html'
            })
            .state('contact',{
                url:'/contact',
                templateUrl:'assets/partials/pages/contact.html'
            })
            .state('gettingStarted',{
                url:'/getting-started',
                templateUrl:'assets/partials/getting-started/getting-started.html'
            })
            .state('ngRepeatExample',{
                url:'/ng-repeat-example',
                templateUrl:'assets/partials/directives/ng-repeat-example.html',
                controller:'ngRepeatExample'
            })
            .state('toDoExample',{
                url:'/to-do-example',
                templateUrl:'assets/partials/examples/to-do-example.html',
                controller:'TasksController'
            });

    }])
    .controller('ngRepeatExample',['$scope',function($scope){

        $scope.images = [
            {
                id:1,
                title:'Imagen 1',
                name:'1.png'
            },
            {
                id:2,
                title:'Imagen 2',
                name:'2.png'
            },
            {
                id:3,
                title:'Imagen 3',
                name:'3.png'
            }
        ];

    }]);

angular.module('directives',[])
    .directive('myDirective',[function(){
        return {
            restrict:'E',
            templateUrl: 'my-template.html'
        };
    }])
    .directive('elementDirective',['$log',function($log){
        return {
            restrict:'E',
            template: '<div class="alert alert-info" > Element directive with replace property undefined</div>',
            link:function(scope,el,attrs){
                $log.log(el.html());
                $log.log(attrs.someAttr);
            }
        };
    }])
    .directive('elementDirectiveRemplace',['$log',function($log){
        return {
            restrict:'E',
            replace:true,
            template: '<div class="alert alert-info" > Element directive with replace property set to true</div>',
            link:function(scope,el,attrs){
                $log.log(el.html());
                $log.log(attrs.someAttr);
            }
        };
    }]);


angular.module('app',['routes','directives']);

//prettyPrint();