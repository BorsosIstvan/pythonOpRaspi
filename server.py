import SimpleHTTPServer
import SocketServer

# Specificeer de map waarin je HTML-bestanden zich bevinden
html_directory = "/poci/pythonOnRaspi/html"

# Specificeer de poort waarop de server zal draaien
port = 8000

# Wijzig de huidige werkmap naar de map met HTML-bestanden
# Dit is belangrijk omdat de server vanuit deze map bestanden zal serveren
import os
os.chdir(html_directory)

# Start de HTTP-server
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", port), Handler)

print "Serving op poort", port
httpd.serve_forever()
