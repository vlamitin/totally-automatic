# Secrets provider

1. consider a key for encryption/decryption, save it in safe place
2. encrypt your secrets one by one with `python3 encrypter.py`
3. fill config.ini with encrypted secrets that you get from prev step
4. start secrets-provider server with `python3 main.py` (you'll need to provide same encryption/decryption key that you used for encryption at steps 1-3)
5. fetch your secrets like here `curl localhost:8000/secret1`, where `secret1` is secret name you want to fetch
