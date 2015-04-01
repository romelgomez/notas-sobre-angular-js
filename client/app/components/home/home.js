

angular.module('app.contents',[])
  .controller('ContentsController',function(){

  });

angular.module('app.notes',[])
  .controller('NotesController',function(){

  });

angular.module('app.home',['app.contents','app.notes'])
  .controller('HomeController',['$router',function($router){

    $router.config([
      {
        path: '/ok',
        component: {
          'contents':'contents',
          'notes':'notes'
        }
      }
    ]);

    this.controllerName = 'Home';

  }]);
