from datetime import timedelta

from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import (
    OAuth2PasswordRequestForm,
)
from pydantic import BaseModel

from auth.main import authenticate_user, create_access_token
from conf.config import config

router = APIRouter()


class Token(BaseModel):
    access_token: str
    token_type: str


@router.post('/login', response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=400, detail='Incorrect username or password')

    not_allowed_scopes = set(form_data.scopes) - set(user.allowed_scopes)
    if len(not_allowed_scopes) > 0:
        raise HTTPException(
            status_code=400,
            detail='Not allowed scopes for this user requested: {}'.format(', '.join(not_allowed_scopes))
        )

    access_token_expires = timedelta(minutes=int(config['AUTH']['token_expire_minutes']))
    access_token = create_access_token(
        data={'sub': user.username, 'scopes': form_data.scopes},
        expires_delta=access_token_expires,
    )

    return {'access_token': access_token, 'token_type': 'bearer'}
