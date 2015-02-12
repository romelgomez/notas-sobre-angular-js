angular.module("App",['angular-underscore/filters'])
    .controller("ImagesController",function($scope){

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

    })
    .controller("TaskController",function($scope){

        $scope.allTasks = function(){
            // detect checkbox change angularjs
        };

        $scope.taskList = [
            {text:"Aprender Angular",   status:false},
            {text:"Aprender GoLang",    status:false},
            {text:"Aprender Git",       status:false},
            {text:"Aprender Yeoman",    status:true}
        ];

        $scope.taskListLength = function(){

            var completed  = _.filter($scope.taskList,function(task){
                return task.status;
            });

            return $scope.taskList.length-completed.length;
        };

        $scope.addTask = function(){
            $scope.taskList.push({"text":$scope.task,"status":false});
            $scope.task = '';
        };

        $scope.deleteTask = function(){
            // _.filter -> http://underscorejs.org/#filter
            $scope.taskList = _.filter($scope.taskList,function(task){
                return !task.status;
            });
        };

    });
