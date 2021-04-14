from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from fastapi import Depends
from api.db.users.database import auth_handler


class PostSchema(BaseModel):
    # title: str = Field(...)
    data: dict = Field(...)
    # author: str = Field(...)
    # post_img: str = Field()
    published_on: str = Field(datetime.utcnow())

    class Config:
        schema_extra = {
            'example': {
                # 'title': 'Hello World',
                'data': 'Lorem something .....',
                # 'author': 'John Smith',
                # 'post_img': 'img_url',
                'published_on': f'{datetime.utcnow()}'
            }
        }


class UpdatePostModel(BaseModel):
    # title: Optional[str]
    data: Optional[dict]
    # author: str = Field(...)
    # post_img: Optional[str]
    published_on: Optional[str]

    class Config:
        schema_extra = {
            'example': {
                # 'title': 'Hello World',
                'data': 'Lorem something .....',
                # 'author': 'John Smith',
                # 'post_img': 'img_url',
                'published_on': f'{datetime.utcnow()}'
            }
        }


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
