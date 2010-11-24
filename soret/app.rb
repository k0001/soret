# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'sinatra/content_for'
require 'haml'
require 'json'
require_relative 'lib/levels'

LEVELS_YAML_PATH = File.dirname(__FILE__) + '/levels.yaml'


module Soret

  class App < Sinatra::Base
    set :sessions, true
    set :app_file, __FILE__
    set :haml, { :format        => :html5,
                 :attr_wrapper  => '"'  }

    helpers Sinatra::ContentFor

    @@levels = Levels.new LEVELS_YAML_PATH

    before do
      @current_level = session['current_level'] ||= 0
    end

    ## Web Pages

    get %{^/} do
      haml :work,
           :locals => { body_id: 'work',
                        title: 'Index',
                        levels: @@levels }
    end

    get %r{^/levels/(\d+)} do |level_num|
      level_num = level_num.to_i
      level = @@levels[level_num]
      if level.nil?
        return [404, "Invalid level #{level_num}"]
      end

      if level_num > @current_level
        return [403, "You haven't reached this level yet!"]
      end

      haml :single_level,
           :layout => !request.xhr?,
           :locals => { body_id: 'level',
                        title: "Level #{level_num}",
                        level_num: level_num,
                        level: level }
    end


    ## Web Service

    get %r{^/ws/levels} do
      levels = @@levels.all.each_with_index.map do |l, i|
        { 'title' => l['title'], 'url' => "/ws/levels/#{i}" }
      end

      out = { 'status' => 'OK', 'payload' => { 'levels' => levels } }
      return [200, {'Content-Type' => 'application/json'}, out.to_json]
    end


    get %r{^/ws/levels/(\d+)} do |level_num|
      level_num = level_num.to_i
      level = @@levels[level_num]
      if level.nil?
        out = { 'status' => 'ERROR', 'info' => "Invalid level #{level_num}" }
        return [404, {'Content-Type' => 'application/json'}, out.to_json]
      end

      if level_num > @current_level
        out = { 'status' => 'ERROR', 'info' => "You haven't reached this level yet!" }
        return [403, {'Content-Type' => 'application/json'}, out.to_json]
      end

      out = { 'status' => 'OK', 'payload' => {'level' => level } }
      return [200, {'Content-Type' => 'application/json'}, out.to_json]
    end
  end

end

Soret::App.run! host: '0.0.0.0', port: 8002

# set: ts=2 sts=2 sw=2
