if (typeof Soret == 'undefined')
    var Soret = {};
if (typeof Soret.pages == 'undefined')
    Soret.pages = {};

(function($) {
    var __ = Soret.pages.work = {};

    __.init = function() {

      __._match_el = $(""+<r><![CDATA[
          <div id="match">
            <div class="intro"></div>
            <div class="instructions"></div>
            <dl class="what">
              <dt class="original-text">Original Text</dt>
              <dd class="original-text">
                <pre></pre>
              </dd>
              <dt class="expected-match">Expected Match</dt>
              <dd class="expected-match">
                <pre></pre>
              </dd>
            </dl>
            <form class="work">
              <fieldset>
                <label for="match-field-match">Match</label>
                <input id="match-field-match" name="match" type="text">
                <label for="match-field-mods">Mods</label>
                <input id="match-field-mods" name="mods" type="text">
              </fieldset>
              <button class="try">Try</button>
            </form>
          </div>]]></r>);

      __._sub_el = $(""+<r><![CDATA[
          <div id="sub">
            <div class="intro"></div>
            <div class="instructions"></div>
            <dl class="what">
              <dt class="original-text"></dt>
              <dd class="original-text">
                <pre></pre>
              </dd>
              <dt class="expected-text"></dt>
              <dd class="expected-text">
                <pre></pre>
              </dd>
            </dl>
            <form class="work">
              <fieldset>
                <label for="sub-field-match">Match</label>
                <input id="sub-field-match" name="sub" type="text">
                <label for="sub-field-repl">Replacement</label>
                <input id="sub-field-repl" name="repl" type="text">
                <label for="sub-field-mods">Mods</label>
                <input id="sub-field-mods" name="mods" type="text">
              </fieldset>
              <button class="try">Try</button>
            </form>
          </div>]]></r>);

        $('.level').click(function(e) {
          __.activate_level($(this).attr('data-level'));
        });
    };

    __.deactivate_all = function(num) {
        $('.level.active').removeClass('active');
        __._match_el.remove();
        __._sub_el.remove();
    };

    __.activate_level = function(num) {
        var lel = $('.level[data-level=' + num + ']');
        if (lel.hasClass('active'))
            // nothing to do, already active.
            return;

        __.deactivate_all();

        lel.addClass('active');

        if (lel.hasClass('match')) {
            var type = 'match';
            lel.append(__._match_el);
        } else if (lel.hasClass('sub')) {
            var type = 'sub';
            lel.append(__._sub_el);
        }

    };

})(jQuery);
