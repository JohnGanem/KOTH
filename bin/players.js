var game = require('../models/game');

module.exports = function (io) {
    var player = io.of('/player');

    player.on('connection', function (socket) {
        socket.emit('new_connexion', {connexion: 'OK'});
        socket.on('recu', function (data) {
            io.of('/player').emit('new_player');
            socket.emit("game_status", {state: game.status});
            console.log(data);
        });
    });
    
    return player;
}