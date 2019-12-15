from typing import List

from pydantic import BaseModel


class User(BaseModel):
    username: str
    allowed_scopes: List[str]
    email: str = None
    full_name: str = None
    disabled: bool = None


class UserInDB(User):
    hashed_password: str
