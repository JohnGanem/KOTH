var express = require('express');
var game = require('../models/game');
var router = express.Router();
var helpers = require('../helpers/game_helpers');
var io = null;

/**
 * Initialise io la première connexion 
 */
router.all('/*', function (req, res, next) {
    if (io === null) {
        io = require('../bin/io').io();
    }
    req.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    req.id_player = helpers.exist_player(req.ip);
    next();
});

router.get('/register/:code', function (req, res) {
    io.of('/viewer').emit('new_player');

    if (game.nb_players < game.max_players) {
        if (req.id_player !== false) {
            res.send('["Already registered"]');
            return;
        }

        // If ip doesn't exist
        let id = helpers.insert_player(req.ip, req.params.code);
        res.send('[' + id + ']');
    } else {
        res.send('["Game is full"]');
    }
});

router.all('/*', function (req, res, next) {
    if (req.id_player === false) {
        res.send('["Not registered"]');
        return;
    }
    if (game.nb_players < game.max_players) {
        res.send("Game has not started yet");
        return;
    }
    req.is_capturing = helpers.is_capturing(req.id_player);
    next();
});

router.get('/capture', function (req, res) {
    if (req.is_capturing) {
        helpers.stop_capture(req.id_player);
        res.send('["Stop capturing"]');
    } else {
        helpers.capture(req.id_player);
        res.send('["Capturing"]');
    }
});

router.get('/capture_status', function (req, res) {
    res.send(helpers.capture_status());
});

router.get('/kill/:player/:code', function (req, res) {
    if (req.params.player <= 0 || req.params.player > game.nb_players) {
        res.send('["Player does not exist"]');
    }
    let try_kill = helpers.kill(req.params.player, req.params.code);
    if (try_kill === true) {
        res.send('["Player killed"]');
    } else {
        res.send('["Player not killed"]');
    }
});

module.exports = router;
