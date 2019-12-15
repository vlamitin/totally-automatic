# Backend

## Prerequisites
- TODO

## Setup
- ... TODO
- `source env/bin/activate`
- `mv db/users_db.json.example db/users_db.json`
- edit db/users_db.json (change users and password hashes!)
```
import auth.main
auth.main.get_password_hash('your_secret_password') # to gen pass hash
```
- `mv conf/config.ini.example conf/config.ini`
- edit conf/config.ini, change secret keys!


## Start
- `uvicorn main:app`