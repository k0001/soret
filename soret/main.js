/**
    This file is part of SORET, a Regular Expressions puzzle game.
    Copyright (c) 2009, Renzo Carbonara <gnuk0001@gmail.com>.  All rights reserved.
    See COPYING file distributed along with this file for licensing terms.
*/

$(document).ready(function() {

    Soret.load_level(0);

    $("#try").click(function(e) {
        var m = $("#regex").val().match(/^(.*?[^\\/])\/(.*?[^\\/]?)\/(.*[^\\/])/);
        var pattern = m[1], repl = m[2], mods = m[3];
        if (Soret.check_solution(new RegExp(pattern, mods), repl)) {
            try {
                Soret.load_next_level();
            } catch(err) {
                if (err == "Soret.InvalidLevel")
                    console.log("Done!");
                else
                    throw err;
            }
            console.log("Yes!");
        } else {
            console.log("Not!");
        }
    });

});
