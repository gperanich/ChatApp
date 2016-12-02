angular.module('ChatApp.controllers', [])
    .controller('ChatController', ['$scope', function($scope) {
        $(document).ready(function() {
            var socket = io();
            $('form').submit(function() {
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return false;
            });
            socket.on('chat message', function(msg) {
                $('#messages').append($('<li>').text(msg));
            });
            socket.on('user connected', function(user) {
                $('#messages').append($('<li>').text(user));
            });
            socket.on('user disconnected', function(user) {
                $('#messages').append($('<li>').text(user));
            });
        });
    }])
    .controller('LoginController', ['$scope', function($scope) {

    }])