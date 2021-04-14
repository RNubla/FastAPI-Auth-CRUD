# from api.models.users.authentication_details import ResponseModel, UserAuthDetails
from fastapi import APIRouter, Body, Depends
from fastapi.encoders import jsonable_encoder
from api.db.users.database import auth_handler
from fastapi_jwt_auth import AuthJWT
from fastapi.responses import JSONResponse


from api.db.posts.post_db_v2 import (
    puslish_post,
    retrieve_post,
    retrieve_posts,
    update_post,
    delete_post,
)

from api.models.posts.post_model_v2 import(
    ErrorResponseModel,
    ResponseModel,
    PostSchema,
    UpdatePostModel
)
from api.models.users.login import(
    Settings,
)
from api.db.users.database import get_user_data


# @AuthJWT.load_config
# def get_config():
#     return Settings()


post_router = APIRouter()


@post_router.get('/', response_description='Get User Posts', status_code=201)
async def get_posts():
    posts = await retrieve_posts()
    if posts:
        return ResponseModel(posts, 'Posts data has been retrieved successfully')
    return ResponseModel(posts, 'Empy list returned')

""" GET SPECIFIC POST """


@post_router.get('/{id}', response_description='Post Data Retrieved')
async def get_post_data(id):
    post = await retrieve_post(id)
    if post:
        return ResponseModel(post, 'Post data retrieved successfully')
    return ErrorResponseModel('An error occurred', 404, 'Post Does not exist')


# @post_router.post('/', response_description='Add Post', status_code=201)
# async def add_post(user=Depends(auth_handler.auth_wrapper), post: PostSchema = Body(...)):
#     post = jsonable_encoder(post)
#     # print('from router: ', post)
#     # print(user)
#     new_post = await puslish_post(post, user['user_id'], user['user_fullname'])
#     if user:
#         return ResponseModel(new_post, 'New Post Added Successfully')
#     return ErrorResponseModel('An error occurred', 401, 'User not authenticated')


@post_router.post('/', response_description='Add Post', status_code=201)
async def add_post(Authorize: AuthJWT = Depends(), post: PostSchema = Body(...)):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()

    user = await get_user_data(current_user)
    post = jsonable_encoder(post)
    new_post = await puslish_post(post, user['_id'], user['user_fullname'])
    if user:
        return ResponseModel(new_post, 'New Post Added Successfully')
    return ErrorResponseModel('An error occurred', 401, 'User not authenticated')

""" UPDATE POST """


@post_router.put('/{id}', response_description='Update Post')
# async def update_post_data(id: str, user=Depends(auth_handler.auth_wrapper), req: UpdatePostModel = Body(...)):
async def update_post_data(id: str, Authorize: AuthJWT = Depends(), req: UpdatePostModel = Body(...)):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()
    req = {k: v for k, v in req.dict().items() if v is not None}
    user = await get_user_data(current_user)
    # print(req)
    # if user['_id'] ==
    updated_post = await update_post(id=id, user=user['_id'], data=req)
    if updated_post:
        return ResponseModel(
            f'Post with ID:{id} update is successful',
            'Post updated successfully'
        )
    return ErrorResponseModel(
        'An error occurred',
        403,
        'There was an error updating the post data'
    )


@post_router.delete('/{id}', response_description='Delete Post from Database')
async def delete_posts_data(id: str, user=Depends(auth_handler.auth_wrapper)):
    deleted_post = await delete_post(id)
    if deleted_post:
        return ResponseModel(
            f'Post with ID:{id} removed',
            'Successfully delete post'
        )
    return ErrorResponseModel(
        'An error occurred',
        404,
        f'Post with ID:{id} does not exist'
    )
