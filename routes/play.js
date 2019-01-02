var express = require('express');
var game = require('../models/game');
var router = express.Router();

/**
 * Initialise io la première connexion 
 */
var io = null;
router.all('/*', function(req, res, next){
    if (io === null) {
         io = require('../bin/io').io();
    }
    next();
});

router.get('/register/:inputCode', function (req, res) {
    io.of('/viewer').emit('new_player');
    
    game.nb_players++;
    game.player[game.nb_players] = {
        code: req.params.inputCode
    };
    res.send(game);
});

module.exports = router;
