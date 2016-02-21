require 'sinatra'

get '/' do
  erb :index
end

get '/bitwise' do
  erb :bitwise
end