if (typeof Soret == 'undefined')
    var Soret = {};
if (typeof Soret.pages == 'undefined')
    Soret.pages = {};

(function($) {
    var __ = Soret.pages.work = {};

    __.init = function() {
        $('.level').click(function(e) {
          __.activate_level($(this).attr('data-level'));
        });
    };

    __.set_last_level = function(num) {
        __._last_level = num;
    };

    __.deactivate_all = function(num) {
        $('.level.active').removeClass('active');
    };

    __.activate_level = function(num) {
        if (num > __._last_level)
          throw "UnauthorizedLevelError";

        var lel = $('.level[data-level=' + num + ']');
        if (lel == null)
          throw "InvalidLevelError";

        if (lel.hasClass('active'))
            // nothing to do, already active.
            return;

        __.deactivate_all();

        lel.empty().load('/levels/' + num, function(responseText, textStatus, XMLHttpRequest){
            $('button.try', lel).click(function(e) {
                e.preventDefault();

                var answer = {
                    'match': $('input[name=match]', lel).val(),
                    'mods': $('input[name=mods]', lel).val() };

                var repl = $('input[name=repl]', lel);
                if (repl != null)
                    answer['repl'] = repl.val();

                if (__.check_level_answer(num, answer)) {
                    var next_level = num + 1;
                    if (next_level > __._last_level) {
                        __.set_last_level(next_level);
                        __.activate_level(next_level);
                    }
                }
            });

            lel.addClass('active');
        });

    };

    __.check_level_answer = function(num, answer) {
        return true;
    };

})(jQuery);
