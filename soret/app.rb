# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'sinatra/content_for'
require 'haml'
require 'json'
require_relative 'lib/levels'

LEVELS_YAML_PATH = File.dirname(__FILE__) + '/levels.yaml'


module Soret

  class App < Sinatra::Base
    set :app_file, __FILE__
    set :haml, format: :html5

    helpers Sinatra::ContentFor

    @@levels = Levels.new LEVELS_YAML_PATH

    get '/' do
      haml :index, locals: { title: 'Index' }
    end

    get '/ws/levels' do
      levels = @@levels.all.each_with_index.map do |l, i|
        { 'title' => l['title'],
          'url'   => "/ws/levels/#{i}" }
      end
      out = { 'levels' => levels }
      [200, {'Content-Type' => 'application/json'}, out.to_json]
    end

    get '/ws/levels/:n' do
      out = @@levels[params[:n].to_i]
      [200, {'Content-Type' => 'application/json'}, out.to_json]
    end
  end

end

Soret::App.run! host: '0.0.0.0', port: 8002

# set: ts=2 sts=2 sw=2
