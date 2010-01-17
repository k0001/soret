/**
    This file is part of SORET, a Regular Expressions puzzle game.
    Copyright (c) 2009, Renzo Carbonara <gnuk0001@gmail.com>.  All rights reserved.
    See COPYING file distributed along with this file for licensing terms.
*/

if (typeof(Soret) == "undefined")
    Soret = {};

Soret.LEVELS = [
    {
        input: "Hello",
        output: "Hell"
    },
    {
        input: "Javaschrist",
        output: "Javascript"
    },
    {
        input: "asdfasdfaasdf",
        output: "sdfsdfsdf"
    },
    {
        input: "asdf1asdf2asdf3asdf4asdf",
        output: "asdfasdfasdfasdfasdf"
    },
    {
        input: "asdf\nasdf\nasdf",
        output: "asd\nasd\nasd"
    }
];

