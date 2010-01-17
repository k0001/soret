/**
    This file is part of SORET, a Regular Expressions puzzle game.
    Copyright (c) 2009, Renzo Carbonara <gnuk0001@gmail.com>.  All rights reserved.
    See COPYING file distributed along with this file for licensing terms.
*/

if (typeof(Soret) == "undefined")
    Soret = {};

Soret.check_solution = function(regex, repl, level) {
    var level = level || Soret._current_level;
    if (level >= Soret.LEVELS.length)
        throw "Soret.InvalidLevel";
    return Soret.LEVELS[level].input.replace(regex, repl) == Soret.LEVELS[level].output;
};

Soret.load_level = function(level) {
    if (level >= Soret.LEVELS.length)
        throw "Soret.InvalidLevel";
    Soret._current_level = level;
    document.title = "Level " + level;
    $("#input").text(Soret.LEVELS[level].input);
    $("#output").text(Soret.LEVELS[level].output);
};

Soret.load_next_level = function() {
    Soret.load_level(Soret._current_level + 1);
};
