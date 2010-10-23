/**
    This file is part of SORET, a Regular Expressions puzzle game.
    Copyright (c) 2009, Renzo Carbonara <gnuk0001@gmail.com>.  All rights reserved.
    See COPYING file distributed along with this file for licensing terms.
*/


$(document).ready(function() {
    Soret.load_level(0);

    $("#try").click(function(e) {
        var pattern = $("#pattern").val(), repl = $("#repl").val(), mods = $("#mods").val();

        var user_output = Soret.sub(new RegExp(pattern, mods), repl);
        var expected_output = Soret.get_expected_output();

        if (user_output == expected_output) {
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
            $("#wrongOutput").text(user_output);

            console.log("Not!");
        }
    });

});
