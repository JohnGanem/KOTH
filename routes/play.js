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

router.get('/register/:inputCode', function (req, res) {
    io.of('/viewer').emit('new_player');

    if (game.nb_players < game.max_players) {
        if (req.id_player !== false) {
            res.send("Already registered");
            return;
        }

        // If ip doesn't exist
        game.nb_players++;
        game.players[game.nb_players] = {
            ip: req.ip,
            code: req.params.inputCode
        };
        res.send("Registration ok");
    } else {
        res.send("Game is full");
    }
});

router.all('/*', function (req, res, next) {
    if (req.id_player === false) {
        res.send("Not registered");
        return;
    }
    req.is_capturing = helpers.is_capturing(req.id_player);
    next();
});

router.get('/capture', function (req, res) {
    if (req.is_capturing) {
        helpers.stop_capturing(req.id_player);
        res.send("Stop capturing");
    } else {
        game.capturing.push(req.id_player);
        res.send("Capturing");
    }
});

module.exports = router;
