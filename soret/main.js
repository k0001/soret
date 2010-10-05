/**
    This file is part of SORET, a Regular Expressions puzzle game.
    Copyright (c) 2009, Renzo Carbonara <gnuk0001@gmail.com>.  All rights reserved.
    See COPYING file distributed along with this file for licensing terms.
*/

$(document).ready(function() {
    var initial_level = 0; // Used for debug
    Soret.load_level(initial_level);

    $("#try").click(function(e) {
        var m = $("#regex").val().match(/^(.*?[^\\/])\/(.*?[^\\/]?)\/(.*[^\\/])/);
        var pattern = m[1], repl = m[2], mods = m[3];
//        var result = Soret.process_regex(new RegExp(pattern,mods), repl);
        if (Soret.check_solution(new RegExp(pattern, mods), repl)) {
//        if (result == Soret.LEVELS[Soret._current_level].output) {
            try {
                Soret.load_next_level();
            } catch(err) {
                if (err == "Soret.InvalidLevel")
                    console.log("Done!");
                else
                    throw err;
            }
            $("#regex").val("");
            $("#regex").focus();
            console.log("Yes!");
        } else {
            $("#result").show();
            $("#wrongOutput").text("Wrong!");
            console.log("Not!");
        }
    });

});
