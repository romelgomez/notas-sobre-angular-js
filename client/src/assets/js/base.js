angular.module("Task",['angular-underscore/filters'])
    .provider('tasks',function(){

        var tasks = [
            {task:"Aprender Angular",   status:false},
            {task:"Aprender GoLang",    status:false},
            {task:"Aprender Git",       status:false},
            {task:"Aprender Yeoman",    status:true}
        ];

        return {
            $get: function(){
                return {
                    'add':function(task){
                        tasks.push({"task":task,"status":false});
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
                }
            }
        }

    });


angular.module("App",['Task'])
    .controller("ImagesController",['$scope',function($scope){

        $scope.images = [
            {
                id:1,
                title:"Imagen 1",
                name:"1.png"
            },
            {
                id:2,
                title:"Imagen 2",
                name:"2.png"
            },
            {
                id:3,
                title:"Imagen 3",
                name:"3.png"
            }
        ];

    }])
    .controller("TasksController",['$scope','$log','tasks',function($scope,$log,tasks){

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
                return tasks.left()
            },
            'length':function(){
                return tasks.length();
            },
            'delete':function(){
                $scope.tasks.allStatus = false;
                return tasks.delete();
            },
            'changeAllStatus':function(status){
                tasks.changeAllStatus(status)
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