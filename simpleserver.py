# Ref.
# https://qiita.com/okhrn/items/4d3c74563154f191ba16
# https://blog.sarabande.jp/post/81479479934

import http.server
import socketserver
from urllib.parse import urlparse
import numpy as np
PORT = 8000

class ServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        values = self.path.split('/')
        command = values[1]
        if (command == 'inv'):
            A = np.array([[float(values[2]),float(values[3])],[float(values[4]),float(values[5])]])
            inv_A = np.linalg.inv(A)
            print(str(inv_A))
            body = str(inv_A).encode()
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-length', len(body))
            self.end_headers()
            self.wfile.write(body)

with socketserver.TCPServer(("", PORT), ServerHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
