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

    def [](index)
      @levels[index]
    end

    def all
      @levels
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
