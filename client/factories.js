angular.module('ChatApp.factories', [])
    .factory('Users', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/users/:id', { id:'@id' });
    }])