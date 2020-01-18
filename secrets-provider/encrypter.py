from getpass import getpass
from crypter import crypter


def encrypt(secret):
    return crypter.encrypt(f'{secret}'.encode()).decode('utf-8')


if __name__ == '__main__':
    print(encrypt(getpass(prompt='Enter your secret in plain: ')))
