from fastapi import Depends, HTTPException, Security, APIRouter
from typing import List
from auth.main import TokenData, authorize_user
from db import users_db
from models.user import User

router = APIRouter()


async def get_current_user(token_data: TokenData = Depends(authorize_user)):
    user = users_db.get_user(username=token_data.username)
    return user


async def get_current_active_user(
        current_user: User = Security(get_current_user, scopes=["me"])
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def get_users(token_data: TokenData = Depends(authorize_user)):
    return users_db.get_users()


@router.get("/users/", response_model=List[User])
async def read_users(users: List[User] = Security(get_users, scopes=["users"])):
    return users


@router.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@router.get("/users/me/items/")
async def read_own_items(
        current_user: User = Security(get_current_active_user, scopes=["items"])
):
    return [{"item_id": "Foo", "owner": current_user.username}]


@router.get("/status/")
async def read_system_status(current_user: User = Depends(get_current_user)):
    return {"status": "ok"}
