from typing import Optional
from pydantic import BaseModel, Field

""" 
    This is the basic schema for user authentication

"""


class UserAuthDetails(BaseModel):
    user_name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            'example': {
                'user_name': 'johnsmith1776',
                'email': 'johnsmith1776@example.com',
                'password': 'secretpassword'
            }
        }


""" 
    This will allow us to update username and password when it is needed
 """


class UpdateUserModel(BaseModel):
    user_name: Optional[str]
    email: Optional[str]
    password: Optional[str]

    class Config:
        schema_extra = {
            'example': {
                'user_name': 'johnsmith1776',
                'email': 'johnsmith1776@example.com',
                'password': 'secretpassword'
            }
        }


""" 
    Allow for showing the response message when we are testing out the api
 """


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
