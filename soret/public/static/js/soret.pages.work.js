if (typeof Soret == 'undefined')
    var Soret = {};
if (typeof Soret.pages == 'undefined')
    Soret.pages = {};

(function($) {
    var __ = Soret.pages.work = {};

    __.init = function() {
        $('article.level > header').click(function(e) {
            __.activate_level($(this).parent().attr('data-level'));
        });
    };

    __.set_last_level = function(num) {
        __._last_level = num;
    };

    __.deactivate_all = function(num) {
        var lel = $('article.level.active');
        if (lel) {
            lel.removeClass('active');
            $('> section.intro', lel).remove();
            $('> section.instructions', lel).remove();
            $('> form.work', lel).remove();
        }
    };

    __.activate_level = function(num) {
        if (num > __._last_level)
            throw "UnauthorizedLevelError";

        var lel = $('article.level[data-level=' + num + ']');
        if (lel && lel.hasClass('active'))
            return; // nothing to do, already active.

        $.ajax({
            method: 'GET',
            url: '/levels/' + num,
            dataType: 'html', // response's
            complete: function(xhr, status) {
                if (! (status == 'success' || status == 'notmodified')) {
                    console.error('Something went wrong! Please try again later. - ' + status);
                } else {
                    var new_lel = $(xhr.responseText); // html

                    if (lel)
                        lel.replaceWith(new_lel)
                    else
                        $('#levels').prepend(new_lel);

                    __.deactivate_all();
                    new_lel.addClass('active');
                    new_lel.focus();
                    location.hash = '#level-' + num;

                    $('> header', new_lel).click(function(e) {
                        __.activate_level($(this).parent().attr('data-level'));
                    });

                    $('> form.work button.try', new_lel).click(function(e) {
                        console.log('awesome');
                        e.preventDefault();

                        var answer = {
                            'match': $('input[name=match]', new_lel).val(),
                            'mods': $('input[name=mods]', new_lel).val()
                        };

                        var repl = $('input[name=repl]', new_lel);
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
                }
            }
        });
    };

    __.check_level_answer = function(num, answer) {
        return true;
    };

})(jQuery);
