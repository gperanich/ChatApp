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
                        console.log('logged out!');
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
            controller: ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
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
                            $scope.email = '';
                            $scope.password = '';
                            console.log('logged in!');
                            redirect();
                        }, function (err) {
                            console.log(err);
                        });
                }
            }]
        }
    })
    .directive('customRegister', function() {
        return {
            templateUrl: 'views/directives/register.html',
            restrict: 'E',
            controller: ['$scope', 'Users', function($scope, Users) {
                $scope.register = function() {
                    console.log('clicked register');
                    var userData = {
                        username: $scope.username,
                        email: $scope.email,
                        password: $scope.password 
                    }
                    var user = new Users(userData);
                    user.$save(function(success) {
                        console.log(success);
                        $scope.username = '';
                        $scope.email = '';
                        $scope.password = '';
                    });
                }
            }]
        }
    })