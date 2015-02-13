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
    .controller("TaskController",['$scope','$log',function($scope,$log){

        var tasks = {
          defaultList: [
            {text:"Aprender Angular",   status:false},
            {text:"Aprender GoLang",    status:false},
            {text:"Aprender Git",       status:false},
            {text:"Aprender Yeoman",    status:true}
          ]
        };

        $scope.checkOrUncheckTasks = function(all){
            if(all){
                angular.forEach(tasks.defaultList, function (value, key) {
                    tasks.defaultList[key].status = true;
                });
            }else{
                angular.forEach(tasks.defaultList, function (value, key) {
                    tasks.defaultList[key].status = false;
                });
            }
        };

        $scope.getDefaultTaskList = function(){
            return tasks.defaultList;
        };

        $scope.addTask = function(){
            tasks.defaultList.push({"text":$scope.task,"status":false});
            $scope.task = '';
        };

        $scope.taskListTotal = function(){
            return tasks.defaultList.length;
        };

        $scope.taskListLeft = function(){
            // _.filter -> http://underscorejs.org/#filter
            var completed  = _.filter(tasks.defaultList,function(task){
                return task.status;
            });
            return tasks.defaultList.length-completed.length;
        };

        $scope.deleteTask = function(){
            // _.filter -> http://underscorejs.org/#filter
            tasks.defaultList = _.filter(tasks.defaultList,function(task){
                return !task.status;
            });
        };

    }
    ]);
