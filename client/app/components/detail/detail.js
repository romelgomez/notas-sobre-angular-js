angular.module('app.detail',[])
  .controller('DetailController',['$routeParams','$log',function($routeParams,$log){

    $log.log('test'+$routeParams.id);
    this.id = $routeParams.id;
  }]);
