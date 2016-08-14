/** Created by Girish on 2/7/2016.*/
angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('root',{
        url:"/",
        abstract:true,
        views: {
          'content@':{
            templateUrl: 'views/content.html'
          } ,
          'sidenav@':{
            templateUrl: 'sidenav.html',
            controller:'SideNavController'
          }
        }
      })
      .state('home', {
        url: "/",
        views: {
          'content@':{
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          }
        },
        data: { requireAuth: false },
        resolve:{
          currentuser:function (userService) {
            return userService.currentUser()
          },
          checklogin: function (authService,$window) {
            return authService.auth($window.localStorage.token,$window.localStorage.username)
          }
        }
      })
      .state('register', {
        url: "/register",
        data: { requireAuth: false },
        views: {
          'content@':{
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
          }
        },
        onEnter: ['$state','$rootScope',function($state, $rootScope){
          console.log("checking register")
          if($rootScope.isAuthenticated){
            $state.go('home');
          }
        }]
      })
      .state('login', {
        url: "/login",
        views: {
          'content@': {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
          }
        },
        data: { requireAuth: false },
        onEnter: ['$state','$rootScope',function($state, $rootScope){
          console.log("checking login")
          if($rootScope.isAuthenticated){
            $state.go('home');
          }
        }]
      })
      .state('root.dashboard', {
        url: "dashboard",
        data: { requireAuth: true },
        views: {
          'main@':{
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
          },
          'profile@root.dashboard':{
            templateUrl: 'views/dashboard/profileOverview.html',
            controller: 'ProfileOverviewController'
          },
          'submissions@root.dashboard':{
            templateUrl: 'views/dashboard/submissionsOverview.html',
            controller: ''
          },
          'reviews@root.dashboard':{
            templateUrl: 'views/dashboard/reviewsOverview.html',
            controller: ''
          }
        }
      })
      .state('root.chair',{
        url:"chair"
      })
      .state('root.chair.dashboard', {
        url: "/dashboard",
        data: { requireAuth: true },
        views: {
          'main@':{
            templateUrl: 'views/chair/dashboard.html',
            controller: 'chair.DashboardController'
          }
        }
      })

      .state('404', {
        url: "/404",
        views: {
          'content@':{
            templateUrl: 'views/404.html'
          }
        },
        data: { requireAuth: false }
      })
      .state('root.profiledetails', {
        url: "profiledetails",
        views: {
          'main@': {
            templateUrl: 'views/profile-details.html',
            controller: 'ProfileDetailsController'
          }
        },
        data: { requireAuth: true }
      });
});