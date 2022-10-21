require 'webspicy'

Webspicy::Configuration.new(Path.dir) do |c|

  c.host = ENV['PRINTIT_BASE'] || "http://127.0.0.1:3000"

end
