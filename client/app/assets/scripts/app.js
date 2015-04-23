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
            .state('solvency',{
                url:'/solvency',
                templateUrl:'assets/partials/contents/solvency.html'
            });



    }]);

// Restangular

angular.module('forms',['ngMessages','restangular','uuid'])
    .factory('UsersService',['Restangular','$log',function(Restangular){

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

        $scope.testRest = function(){
          Restangular.allUrl('google','http://www.google.com').getList();
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





    }])
    .controller('SolvencyController',['$scope',function($scope) {

//        $scope.user = {
//            study: 'Pregrado'
//        };

        $scope.ubicacion = {
            'Dtto. Capital': {
                'Libertador': ['La Vega', 'Antimano']
            },
            'Miranda': {
                'Plaza': ['Guarenas'],
                'Zamora': ['Guatire']
            }
        };

//        for array data sources:

//        label for value in array
//        select as label for value in array
//        label group by group for value in array
//        label disable when disable for value in array
//        label group by group for value in array track by trackexpr
//        label disable when disable for value in array track by trackexpr
//        label for value in array | orderBy:orderexpr track by trackexpr (for including a filter with track by)

//        # current
//        study for (study,specialty) in studies
//        specialty for specialty in user.specialty['user.study']

//        # when is studies was one array
//        o         as o        for o       in  studies
//        select    as label    for value   in  array

//        for object data sources:

//        label for (key , value) in object
//        select as label for (key , value) in object
//        label group by group for (key, value) in object
//        label disable when disable for (key, value) in object
//        select as label group by group for (key, value) in object
//        select as label disable when disable for (key, value) in object

        // color.name for color in colors
        // obj.study for obj in objects
        // obj.specialties for obj in

        // obj.study        for obj in objects
        // label for label in user.study.specialties

        $scope.objects = [
            {
                'study':'Pregrado',
                'specialties':[
                    'Biología',
                    'Física',
                    'Química',
                    'Matemática',
                    'Ciencias de la Tierra',
                    'Geografía e Historia',
                    'Educación Física',
                    'Educación Integral',
                    'Educación Comercial',
                    'Educación Especial',
                    'Educación Preescolar',
                    'Informática',
                    'Ingles',
                    'Lengua y Literatura'
                ]
            },
            {
                'study':'Maestría',
                'specialties':[
                    'MAESTRÍA EN EDUCACIÓN MENCIÓN EDUCACIÓN SUPERIOR',
                    'MAESTRÍA EN EDUCACIÓN MENCIÓN GERENCIA EDUCACIONAL',
                    'MAESTRÍA EN EDUCACIÓN MENCIÓN ENSEÑANZA DE LA MATEMÁTICA',
                    'MAESTRÍA EN EDUCACIÓN MENCIÓN ENSEÑANZA DE LA GEOHISTORIA',
                    'MAESTRÍA EN EDUCACIÓN MENCIÓN ENSEÑANZA DE LA EDUCACIÓN FÍSICA',
                    'MAESTRÍA EN LINGÜÍSTICA',
                    'MAESTRÍA EN LITERATURA LATINOAMERICANA',
                    'MAESTRÍA EN ENSEÑANZA DEL INGLÉS COMO LENGUA EXTRANJERA',
                    'MAESTRÍA EN EDUCACIÓN AMBIENTAL'
                ]
            }
        ];

//        $scope.studies = [
//            'Pregrado',
//            'Postgrado',
//            'Maestría',
//            'Doctorado'
//        ];

        $scope.specialty = {
            'Pregrado':[
                'Biología',
                'Física',
                'Química',
                'Matemática',
                'Ciencias de la Tierra',
                'Geografía e Historia',
                'Educación Física',
                'Educación Integral',
                'Educación Comercial',
                'Educación Especial',
                'Educación Preescolar',
                'Informática',
                'Ingles',
                'Lengua y Literatura'
            ],
            'Maestría':[
                'MAESTRÍA EN EDUCACIÓN MENCIÓN EDUCACIÓN SUPERIOR',
                'MAESTRÍA EN EDUCACIÓN MENCIÓN GERENCIA EDUCACIONAL',
                'MAESTRÍA EN EDUCACIÓN MENCIÓN ENSEÑANZA DE LA MATEMÁTICA',
                'MAESTRÍA EN EDUCACIÓN MENCIÓN ENSEÑANZA DE LA GEOHISTORIA',
                'MAESTRÍA EN EDUCACIÓN MENCIÓN ENSEÑANZA DE LA EDUCACIÓN FÍSICA',
                'MAESTRÍA EN LINGÜÍSTICA',
                'MAESTRÍA EN LITERATURA LATINOAMERICANA',
                'MAESTRÍA EN ENSEÑANZA DEL INGLÉS COMO LENGUA EXTRANJERA',
                'MAESTRÍA EN EDUCACIÓN AMBIENTAL'
            ],
            'Especializaciones':[
                'ESPECIALIZACIÓN EN EDUCACIÓN BÁSICA',
                'ESPECIALIZACIÓN EN PROCESOS DIDÁCTICOS PARA EL NIVEL EDUCATIVO BÁSICO',
                'ESPECIALIZACIÓN EN DOCENCIA UNIVERSITARIA',
                'ESPECIALIZACIÓN EN EDUCACIÓN PARA LA GESTIÓN COMUNITARIA',
                'ESPECIALIZACIÓN EN EDUCACIÓN PARA LA INTEGRACIÓN DE PERSONAS CON DISCAPACIDADES',
                'ESPECIALIZACIÓN EN EDUCACIÓN INICIAL'
            ],
            'Doctorado':[
                'DOCTORADO EN EDUCACIÓN'
            ]
        };




    }])
    .filter('capitalize', function() {
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    });


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
