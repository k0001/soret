/**
    This file is part of SORET, a Regular Expressions puzzle game.
    Copyright (c) 2009, Renzo Carbonara <gnuk0001@gmail.com>.  All rights reserved.
    See COPYING file distributed along with this file for licensing terms.
*/

$(document).ready(function() {
    Soret.load_level(0);

    $("#try").click(function(e) {
        var pattern = $("#pattern").val(), repl = $("#repl").val(), mods = $("#mods").val();

        if (Soret.check_solution(new RegExp(pattern, mods), repl)) {
            try {
                Soret.load_next_level();
            } catch(err) {
                if (err == "Soret.InvalidLevel")
                    console.log("Done!");
                else
                    throw err;
            }
            $("#pattern").val("");
            $("#repl").val("");
            $("#mods").val("");
            $("#pattern").focus();

            console.log("Yes!");
        } else {
            $("#result").show();
            $("#wrongOutput").text("Wrong!");

            console.log("Not!");
        }
    });

});
