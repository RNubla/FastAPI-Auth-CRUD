from typing import Optional
from pydantic import BaseModel, Field
from fastapi_jwt_auth import AuthJWT

""" 
    This is the basic schema for user authentication

"""


class UserLoginAuthDetails(BaseModel):
    user_name: str = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            'example': {
                'user_name': 'johnsmith1776',
                'password': 'secretpassword'
            }
        }


""" 
    Allow for showing the response message when we are testing out the api
 """


class Settings(BaseModel):
    authjwt_secret_key: str = 'secret'


@AuthJWT.load_config
def get_config():
    return Settings()


def ResponseModel(data, message):
    return {
        'data': data,
        'code': 200,
        'message': message
    }


""" Function similarly to ResponseModel Method """


def ErrorResponseModel(error, code, message):
    return{
        'error': error,
        'code': code,
        'message': message
    }
