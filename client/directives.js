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
            controller: ['$scope', function($scope) {

            }]
        }
    })
    .directive('customLogin', function() {
        return {
            templateUrl: 'views/directives/login.html',
            restrict: 'E',
            controller: ['$scope', function($scope) {
                
            }]
        }
    })