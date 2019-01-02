var game = require('../models/game');
var io = require('./io').io();

module.exports = function () {
    var viewer = io.of('/viewer');

    viewer.on('connection', function (socket) {
        socket.emit('new_connexion', {connexion: 'OK'});
        socket.on('recu', function (data) {
            io.of('/viewer').emit('new_viewer');
            socket.emit("fight_state", {state: game.fight_state});
            console.log(data);
        });
    });
    
    return viewer;
}