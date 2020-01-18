from getpass import getpass
from crypter import crypter


def decrypt(encrypted_secret):
    return crypter.decrypt(encrypted_secret.encode()).decode('utf-8')


if __name__ == '__main__':
    print(decrypt(getpass(prompt='Enter your encrypted secret: ')))
