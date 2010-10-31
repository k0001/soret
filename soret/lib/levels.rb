# -*- coding: utf-8 -*-
require 'psych'
require 'kramdown'

module Soret

  class Levels
    def initialize(fname)
      load_yaml fname
      parse_markdown
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

      def parse_markdown
        @levels.each do |l|
          l['intro'] = Kramdown::Document.new(l['intro']).to_html
          l['instructions'] = Kramdown::Document.new(l['instructions']).to_html
        end
      end
  end
end


# set: ts=2 sts=2 sw=2
