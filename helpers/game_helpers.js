var game = require('../models/game');

exports.exist_player = function (ip) {
    for (var player in game.players) {
        if (game.players[player].ip === ip) {
            return player;
        }
    }
    return false;
};

exports.insert_player = function (ip, code) {
    game.nb_players++;
    game.players[game.nb_players] = {
        ip: ip,
        code: code
    };
    if (game.nb_players === game.max_players) {
        exports.game_start();
    }
    return game.nb_players;
}

exports.game_start = function () {
    game.status = 2;
}

exports.is_capturing = function (id_player) {
    for (var player in game.capturing) {
        if (game.capturing[player] === id_player) {
            return true;
        }
    }
    return false;
};

exports.capture = function (id_player) {
    game.capturing.push(id_player);
};

exports.stop_capture = function (id_player) {
    for (var key = 0; key < game.capturing.length; key++) {
        if (game.capturing[key] === id_player) {
            game.capturing.splice(key, 1);
        }
    }
};

exports.capture_status = function () {
    return game.capturing;
};

exports.kill = function (player, code) {
    if (game.players[player].code === code) {
        game.players[player].kill_until = Date.now() + game.kill_duration * 1000;
        return true;
    }
    return false;
}