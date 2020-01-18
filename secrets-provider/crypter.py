import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from getpass import getpass

encoding_key = getpass(prompt='Enter key for encryption/decryption: ')

kdf = PBKDF2HMAC(
    algorithm=hashes.SHA256(),
    length=32,
    salt=b'TODO_TEST_SALT',
    iterations=100000,
    backend=default_backend()
)

crypter = Fernet(base64.urlsafe_b64encode(kdf.derive(f'{encoding_key}'.encode())))
