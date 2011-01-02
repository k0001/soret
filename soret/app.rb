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
    #  session['current_level'] = 0
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
      if level.nil? or level_num > @current_level
        return [404, "Invalid level #{level_num}"]
      end

      haml :single_level,
           :layout => !request.xhr?,
           :locals => { body_id: 'level',
                        title: "Level #{level_num}",
                        level_num: level_num,
                        level: level }
    end


    ## API

    get %r{^/api/0/levels/(\d+)} do |level_num|
      level_num = level_num.to_i
      level = @@levels[level_num]
      if level.nil? or level_num > @current_level
        out = { 'status' => 'ENOTFOUND', 'info' => "Invalid level #{level_num}" }
        return [404, {'Content-Type' => 'application/json'}, out.to_json]
      end

      out = { 'status' => 'OK', 'payload' => {'level' => level } }
      return [200, {'Content-Type' => 'application/json'}, out.to_json]
    end

    # XXX limit POST content size
    post %r{^/api/0/levels/(\d+)/check} do |level_num|
      level_num = level_num.to_i
      level = @@levels[level_num]
      if level.nil? or level_num > @current_level
        out = { 'status' => 'ENOTFOUND', 'info' => "Invalid level #{level_num}" }
        return [404, {'Content-Type' => 'application/json'}, out.to_json]
      end

      if params[:match].nil?
        out = { 'status' => 'EINCOMPLETE', 'info' => "Missing argument 'match'" }
        return [400, {'Content-Type' => 'application/json'}, out.to_json]
      end

      if level['type'] == 'sub' and params[:repl].nil?
        out = { 'status' => 'EINCOMPLETE', 'info' => "Missing argument 'repl'" }
        return [400, {'Content-Type' => 'application/json'}, out.to_json]
      end

      success = @@levels.check(level_num, params[:match], params[:repl], params[:mods])

      if not success
        out = { 'status' => 'EINVALID', 'info' => "Invalid answer." }
        return [409, {'Content-Type' => 'application/json'}, out.to_json]
      end

      puts "x #{@current_level}, y #{level_num}"
      if success and level_num == @current_level
        session['current_level'] += 1
      end

      out = { 'status' => 'OK',
              'payload' => { 'next_level' => @@levels[level_num + 1] } }
      return [200, {'Content-Type' => 'application/json'}, out.to_json]

    end

  end

end

Soret::App.run! host: '0.0.0.0', port: 8002

# set: ts=2 sts=2 sw=2
