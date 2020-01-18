from http.server import HTTPServer, BaseHTTPRequestHandler
from config import config
from decrypter import decrypt

HOST_ADDRESS = '127.0.0.1'
HOST_PORT = 8000


decrypted_secrets = {}
for secret in config['ENCRYPTED_SECRETS']:
    decrypted_secrets[secret] = decrypt(config['ENCRYPTED_SECRETS'][secret])


class RequestHandler(BaseHTTPRequestHandler):
    """ Our custom, example request handler """

    def send_response(self, code, message=None):
        """ override to customize header """
        self.log_request(code)
        self.send_response_only(code)
        self.send_header('Server', 'python3 http.server Development Server')
        self.send_header('Date', self.date_time_string())
        self.end_headers()

    def do_GET(self):
        requested_secret = self.path[1:]
        if requested_secret not in decrypted_secrets:
            self.send_response(404)
            return

        self.send_response(200)
        self.wfile.write(decrypted_secrets[requested_secret].encode())


def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler):
    """ follows example shown on docs.python.org """
    server_address = (HOST_ADDRESS, HOST_PORT)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()


if __name__ == '__main__':
    run(handler_class=RequestHandler)
