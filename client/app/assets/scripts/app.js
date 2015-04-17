'use strict';

angular.module('underscore', [])
  .factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
  });

angular.module('task',['underscore'])
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

angular.module('routes',['ui.router'])
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
            });

        $stateProvider
            .state('forms',{
                url:'/forms',
                templateUrl:'assets/partials/contents/forms.html'
            })
            .state('directives',{
                url:'/directives',
                templateUrl:'assets/partials/contents/directives.html'
            });

        $stateProvider
            .state('ngRepeatExample',{
                url:'/ng-repeat-example',
                templateUrl:'assets/partials/directives/ng-repeat-example.html',
                controller:'ngRepeatExample'
            })
            .state('toDoExample',{
                url:'/to-do-example',
                templateUrl:'assets/partials/examples/to-do-example.html',
                controller:'TasksController'
            })
            .state('maximizing-angular-directives',{
                url:'/maximizing-angular-directives',
                templateUrl:'assets/partials/angular-web-application-development-cookbook/maximizing-angular-directives.html'
            })
            .state('gettingStarted',{
                url:'/getting-started',
                templateUrl:'assets/partials/getting-started/getting-started.html'
            });

    }]);

// Restangular

angular.module('forms',['ngMessages','restangular','uuid'])
    .factory('UsersService',['Restangular','$log',function(Restangular,$log){

        var users = Restangular.all('users');

        return {
            GET:function(){
                users.getList();

            },
            POST:function(){

            },
            DELETE:function(){

            },
            UPDATE :function(){

            }
        };
    }])
    .factory('UserMockService',['$log','rfc4122',function($log,rfc4122){
        var users = [];

        return {
            GET:function(){
                return users;
            },
            POST:function(user){
                user.uuid = rfc4122.v4();
                users.push(user);
            },
            DELETE:function(){
            },
            UPDATE:function(){

            }
        };
    }])
    .controller('UsersController',['$scope','$log','UserMockService','Restangular',function($scope,$log,UserMockService,Restangular){

        var original = angular.copy($scope.user = {
            name: '',
            lastName: '',
            email: ''
        });

        $scope.post = function(){
            if($scope.userForm.$valid){
                UserMockService.POST($scope.user);

                $scope.reset();
            }
        };

        $scope.get = function(){
            return UserMockService.GET();
        };

        $scope.reset = function(){
            $scope.user = angular.copy(original);
            $scope.userForm.$setUntouched();
            $scope.userForm.$setPristine();
        };


//        /api/v2
//        http://api.tumblr.com/v2/blog/citriccomics.tumblr.com/posts/text?api_key={key}
        
        var users = Restangular.allUrl('server');
        $scope.testPost = function(){
            var data = {
                name:'romel',
                lastName:'gomez'
            };

            users.post(data);
        };





    }]);


angular.module('directives',[])
    .controller('NgRepeatController',['$scope',function($scope){

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

    }])
    .directive('simpleDirective',[function(){
        return {
          restrict:'E',
          templateUrl: 'my-template.html'
        };
    }]);



angular.module('app',['routes','gist','directives','forms','task']);




//
//angular.module('buildingSimpleElementDirective',[])
//  .directive('myDirective',[function(){
//    return {
//      restrict:'E',
//      templateUrl: 'my-template.html'
//    };
//  }]);
//
//angular.module('workingThroughTheDirectiveSpectrum',[])
//  .directive('elementDirective',['$log',function(){
//    return {
//      restrict:'E',
//      template: '<div class="alert alert-info" > Element directive with replace property undefined</div>',
//      link:function(scope,el,attrs){
////        $log.log('*** Element directive with replace property undefined ***');
////        $log.log(el.html());
////        $log.log(attrs.someAttr);
//      }
//    };
//  }])
//  .directive('elementDirectiveRemplace',['$log',function(){
//    return {
//      restrict:'E',
//      replace:true,
//      template: '<div class="alert alert-info" > Element directive with replace property set to true</div>',
//      link:function(scope,el,attrs){
////        $log.log('*** Element directive with replace property set to true ***');
////        $log.log(el.html());
////        $log.log(attrs.someAttr);
//      }
//    };
//  }])
//  .directive('attributeDirective',['$log',function(){
//    return {
//      restrict:'A',
//      template: '<div class="alert alert-info" style="margin-bottom: 0;" > The Attribute directive template property content.</div>',
//      link:function(scope, el, attrs){
////        $log.log('*** The Attribute directive ***');
////        $log.log(el.html());
////        $log.log(attrs.someAttr);
////        $log.log(attrs.attributeDirective);
//      }
//    };
//
//  }])
//  .directive('classDirective',['$log',function(){
//    return {
//      restrict:'C',
//      template: '<div class="alert alert-info" style="margin-bottom: 0;" > The class directive template.</div>',
//      link:function(scope, el, attrs){
////        $log.log('*** The class directive ***');
////        $log.log(el.html());
////        $log.log(el.hasClass('normal-class'));
////        $log.log(attrs.someAttr);
////        $log.log(attrs.classDirective);
//      }
//    };
//  }]);
//
//angular.module('manipulatingTheDom',[])
//  .directive('counter',['$log',function(){
//    return {
//      restrict:'A',
//      link:function(scope, el, attrs){
////        $log.log('*** The counter directive ***');
//        var incr = parseInt(attrs.incr || 1), val = 0;
//        el.bind('click',function(){
//          el.html(val+=incr);
//        });
//
////        $log.log(el.html());
//      }
//    };
//
//  }]);
//
//angular.module('likingDirectives',[])
//  .directive('vectorText',['$log','$document',function($log,$document){
//    return {
//      restrict:'A',
//      template:'<span>{{ heading }}</span>',
//      link:function(scope, el, attrs){
////        $log.log('*** The Linking directives ***');
//
//        el.css({
//          'float':'left',
//          'padding': attrs.buffer+'px',
//          'background-color':'antiquewhite'
//        });
//
//        scope.heading = '';
//
//        $document.on('mousemove',function(event){
//          scope.$apply(function(){
//
//            if(event.pageY < 300){
//              scope.heading = 'N';
//            }else{
//              scope.heading = 'S';
//            }
//
//            if(event.pageX < 300){
//              scope.heading += 'W';
//            }else{
//              scope.heading += 'E';
//            }
//
//          });
//        });
//
////        $log.log(el.html());
//
//      }
//    };
//
//  }]);
//
//angular.module('interfacingDirectiveUsingIsolateScope',[])
//  .controller('IsolateScopeController',['$scope','$log',function($scope){
//    $scope.controllerValue = 'myData';
//    $scope.controllerMethod = function (){
////      $log.log('This is controller method called front iso3 directive');
//    };
//
//  }])
//  .directive('iso',['$log',function(){
//    return {
//      scope:{
//        'readOnlyIsolateScopeValue':'@attrValue'
//      },
//      link:function(scope){
////        $log.log('*** Interfacing Directive Using Isolate Scope ***');
//
//
////        $log.log('readOnlyIsolateScopeValue:', scope.readOnlyIsolateScopeValue);
//
//      }
//    };
//  }])
//  .directive('iso2',['$log',function(){
//    return {
//      scope:{
//        'bindingFrontTheParentScope':'=attrValue'
//      },
//      link:function(scope){
////        $log.log('*** Interfacing Directive Using Isolate Scope ***');
////
////
////        $log.log(scope.bindingFrontTheParentScope);
//
//      }
//    };
//  }])
//  .directive('iso3',['$log',function(){
//    return {
//      scope:{
//        'methodFrontTheParentScope':'&attrValue'
//      },
//      link:function(scope){
////        $log.log('*** Interfacing Directive Using Isolate Scope ***');
//
//        scope.methodFrontTheParentScope();
//      }
//    };
//  }]);
//
//angular.module('interactionBetweenNestedDirectives',[])
//  .directive('parentDirective',['$log',function(){
//    return {
//      controller: function(){
//        this.identify = function(){
////          $log.log('Parent!');
//        };
//      }
//    };
//  }])
//  .directive('siblingDirective',['$log',function(){
//    return {
//      controller: function(){
//        this.identify = function(){
////          $log.log('sibling!');
//        };
//      }
//    };
//  }])
//  .directive('childDirective',['$log',function(){
//    return {
//      require: ['^parentDirective','^siblingDirective'],
//      link:function(scope,el,attrs,ctrls){
////        $log.log('*** Interaction Between Nested Directives ***');
//
//
//        ctrls[0].identify();
//        ctrls[1].identify();
//      }
//    };
//  }]);
//
//angular.module('optionalNestedDirectiveControllers',[])
//  .directive('parentDirective2',['$log',function(){
//    return {
//      controller: function(){
//        this.identify = function(){
////          $log.log('Parent!');
//        };
//      }
//    };
//  }])
//  .directive('siblingDirective2',['$log',function(){
//    return {
//      controller: function(){
//        this.identify = function(){
////          $log.log('sibling!');
//        };
//      }
//    };
//  }])
//  .directive('childDirective2',['$log',function(){
//    return {
//      require: ['^parentDirective2','^siblingDirective2','^?missingDirective'],
//      link:function(scope,el,attrs,ctrls){
////        $log.log('*** Optional Nested Directive Controllers ***');
//
//        ctrls[0].identify();
//        ctrls[1].identify();
////        $log.log(ctrls[2]);
//
//      }
//    };
//  }]);
//
//angular.module('directiveScopeInheritance',[]);
//
//angular.module('directiveTemplating',[]);
//
//angular.module('isolateScope',[]);
//
//angular.module('directiveTransclusion',[]);
//
//angular.module('recursiveDirectives',[]);
//
//angular.module('maximizingAngularDirectives',
//  [
//    'buildingSimpleElementDirective',
//    'workingThroughTheDirectiveSpectrum',
//    'manipulatingTheDom',
//    'likingDirectives',
//    'interfacingDirectiveUsingIsolateScope',
//    'interactionBetweenNestedDirectives',
//    'optionalNestedDirectiveControllers',
//    'directiveScopeInheritance',
//    'directiveTemplating',
//    'isolateScope',
//    'directiveTransclusion',
//    'recursiveDirectives'
//  ]);
//
//angular.module('angular-web-application-development-cookbook',['maximizingAngularDirectives']);


//prettyPrint();
