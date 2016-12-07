angular.module('ChatApp.directives', [])
    .directive('customNavbar', function() {
        return {
            templateUrl: 'views/directives/navbar.html',
            retrict: 'E',
            controller: ['$scope', '$rootScope', function($scope, $rootScope) {
                $rootScope.showingDrawer = false;
                $scope.toggleDrawer = function() {
                    console.log('clicked toggle');
                    $rootScope.showingDrawer = !$rootScope.showingDrawer;
                }
            }]
        }
    })
    .directive('customDrawer', function() {
        return {
            templateUrl: 'views/directives/drawer.html',
            restrict: 'E',
            controller: ['$scope', 'Users', 'UserService', '$location', function($scope, Users, UserService, $location) {
                $scope.users = Users.query();

                $scope.logout = function() {
                    console.log('clicked logout');
                    UserService.logout().then(function(success) {
                        $location.url('/');
                    });
                }
            }]
        }
    })
    .directive('customLogin', function() {
        return {
            templateUrl: 'views/directives/login.html',
            restrict: 'E',
            controller: ['$scope', 'UserService', function($scope, UserService) {
                UserService.me().then(function (success) {
                    redirect();
                });
                function redirect() {
                    var dest = $location.search().p;
                    if (!dest) {
                        dest = '/';
                    }
                    $location.path(dest).search('p', null).replace();
                }
                $scope.login = function () {
                    console.log('clicked login');
                    UserService.login($scope.email, $scope.password)
                        .then(function (success) {
                            console.log('logged in!');
                            redirect();
                        }, function (err) {
                            console.log(err);
                        });
                }
            }]
        }
    })