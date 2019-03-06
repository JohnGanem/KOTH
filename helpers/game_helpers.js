var game = require('../models/game');

exports.exist_player = function (ip) {
    for (var player in game.players) {
        if (game.players[player].ip === ip) {
            return player;
        }
    }
    return false;
};

exports.is_capturing = function (id_player) {
    for (var player in game.capturing) {
        if (game.capturing[player] === id_player) {
            return true;
        }
    }
    return false;
};

exports.stop_capturing = function (id_player) {
    for (var key = 0; key < game.capturing.length; key++) {
        if (game.capturing[key] === id_player) {
            game.capturing.splice(key, 1);
        }
    }
};