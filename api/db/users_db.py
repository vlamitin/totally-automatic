import json
import os

from models.user import UserInDB

file_path = os.path.join(os.path.dirname(__file__), 'users_db.json')


def get_user(username: str):
    with open(file_path, 'r') as users_file:
        users = json.load(users_file)
        if username in users:
            user_dict = users[username]
            return UserInDB(**user_dict)


def get_users():
    with open(file_path, 'r') as users_file:
        users = json.load(users_file)
        return [UserInDB(**users[username]) for username in users]
