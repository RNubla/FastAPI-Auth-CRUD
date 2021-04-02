# from api.models.users.authentication_details import ResponseModel, UserAuthDetails
from fastapi import APIRouter, Body, Depends
from fastapi.encoders import jsonable_encoder
from api.db.users.database import auth_handler

from api.db.posts.database import (
    puslish_post,
    retrieve_posts
)

from api.models.posts.posts_model import(
    ErrorResponseModel,
    ResponseModel,
    PostSchema
)
post_router = APIRouter()


@post_router.get('/', response_description='Get User Posts', status_code=201)
async def get_posts():
    posts = await retrieve_posts()
    if posts:
        return ResponseModel(posts, 'Posts data has been retrieved successfully')
    return ResponseModel(posts, 'Empy list returned')


@post_router.post('/', response_description='Add Post', status_code=201)
async def add_post(user=Depends(auth_handler.auth_wrapper), post: PostSchema = Body(...)):
    post = jsonable_encoder(post)
    # print('from router: ', post)
    print(user)
    new_post = await puslish_post(post, user['user_id'], user['user_fullname'])
    return ResponseModel(new_post, 'New Post Added Successfully')
