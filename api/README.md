# Backend

## Prerequisites
- TODO

## Setup
- `python -m venv env`
- `source env/bin/activate`
- `pip install -r requirements.txt`
- `mv db/users_db.json.example db/users_db.json`
- edit db/users_db.json (change users and password hashes!)
```
import auth.main
auth.main.get_password_hash('your_secret_password') # to gen pass hash
```
- `mv conf/config.ini.example conf/config.ini`
- edit conf/config.ini, change secret keys!
- [get auth files for google spreadsheeds](https://developers.google.com/sheets/api/quickstart/python)
- put them here:
```
spreadsheets_connector
L token.pickle
L google_sheets_credentials.json
```

## Start
- `uvicorn --host ${your_machine_host} --port ${your_api_port}  main:app`
