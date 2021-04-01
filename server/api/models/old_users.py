from typing import Optional
from pydantic import BaseModel, EmailStr, Field

from fastapi_users import models
from fastapi_users.authentication import JWTAuthentication


class User(models.BaseUser):
    # pass
    class Config:
        schema_extra = {
            'id': 'aaaaaaddddddssss'
        }


class UserCreate(models.BaseUserCreate):
    # pass
    firstName: str = Field(...)
    lastName: str = Field(...)

    class Config:
        schema_extra = {
            'example': {
                'firstName': 'John',
                'lastName': 'Smith',
                'email': 'johnsmith@example.com',
                'password': 'somethingComplicated',
                'is_active': 'True'
            }
        }


class UserUpdate(User, models.BaseUserUpdate):
    # pass
    # firstName: str = Optional[str]
    # lastName: str = Optional[str]

    class Config:
        schema_extra = {
            'example': {
                'firstName': 'Mike',
                'lastName': 'Johnson',
                'email': 'mikejohnson@example.com',
                'password': 'somethingComplicated2',
                'is_active': 'True'
            }
        }


class UserDB(User, models.BaseUserDB):
    firstName: str = Optional[str]
    lastName: str = Optional[str]


def ResponseModel(data, message):
    return{
        'data': [data],
        'code': 200,
        'message': message
    }


def ErrorResponseModel(error, code, message):
    return{
        'error': error,
        'code': code,
        'message': message
    }
