angular.module('ChatApp.controllers', [])
    .controller('ChatController', ['$scope', function($scope) {
        var typingTimer;
        var doneTypingInterval = 2000;
        
        $(document).ready(function() {
            var socket = io();
            $('form').submit(function() {
                socket.emit('chat message', $('#m').val());
                $('#m').val('');
                return false;
            });

            function doneTyping() {
                $('#typing').empty();
            }
            function clearConnection() {
                $('#user-connection').empty();
            }

            $('form').on('keypress', function() {
                clearTimeout(typingTimer);
                socket.emit('user typing', 'gperanich is typing');
            });

            $('form').on('keyup', function() {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            });
        
            socket.on('chat message', function(msg) {
                $('#messages').append($('<li>').text('gperanich: ' + msg));
            });
            socket.on('user connected', function(user) {
                $('#user-connection').append($('<p>').text(user));
                setTimeout(clearConnection, 3000);
            });
            socket.on('user disconnected', function(user) {
                $('#user-connection').append($('<p>').text(user));
                setTimeout(clearConnection, 3000);
            });
            socket.on('user typing', function(user) {
                $('#typing').empty();
                $('#typing').append($('<p>').text(user));
            });
        });
    }])
    .controller('LoginController', ['$scope', function($scope) {

    }])