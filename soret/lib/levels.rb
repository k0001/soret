# -*- coding: utf-8 -*-
require 'cgi'
require 'psych'
require 'kramdown'

module Soret

  class Levels
    def initialize(fname)
      load_yaml fname
      preload
    end

    def [](level_num)
      @levels[level_num]
    end

    def all
      @levels
    end

    def check(level_num, match, repl=nil, mods=nil)
      level = self[level_num]

      rx = Regexp.new match

      m = level['text'].match(rx)
      return false if m.nil?

      matched = \
        # if there is any grouping, will check against them
        if not m.captures.empty?
          m.captures.each_with_index.map do |x, i|
            [x, m.begin(i+1), m.end(i+1)] == level['matches'][i]
          end
        # otherwise, will check against the full single match
        else
          m.to_a.each_with_index.map do |x, i|
            [x, m.begin(i), m.end(i)] == level['matches'][i]
          end
        end


      puts matched

      return false if not matched.all?

      # correct replacement?
      if level['type'] == 'sub'
        return false if level['text'].gsub(rx, repl) != level['expected']
      end

      return true
    end

    private
      def load_yaml(fname)
        File.open(fname) do |f|
          @levels = Psych.load f.read
        end
      end

      def preload
        @levels.each do |l|
          l['intro'] = Kramdown::Document.new(l['intro']).to_html
          l['instructions'] = Kramdown::Document.new(l['instructions']).to_html

          # XXX this is ugly, and does not belong in here
          matches_html = l['text'].dup
          l['matches'].reverse.each do |text, ibegin, iend|
            matches_html[iend...iend] = "{/MARK}"
            matches_html[ibegin...ibegin] = "{MARK #{ibegin} #{iend}}"
          end
          l['matches_html'] = CGI.escapeHTML(matches_html)
              .gsub(/{MARK (\d+) (\d+)}/, '<mark title="Match at [\1, \2]">')
              .gsub(/{\/MARK}/, '</mark>')
        end
      end
  end
end


# set: ts=2 sts=2 sw=2
