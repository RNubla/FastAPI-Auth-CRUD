from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException

from api.db.users.database import(
    register_user,
    login_user,
    # access_protected
)

from api.models.users.authentication_details import(
    ErrorResponseModel,
    ResponseModel,
    TokenResponseModel,
    UpdateUserModel,
    UserAuthDetails)
from api.models.users.login import(
    UserLoginAuthDetails,
    ResponseModel as UserResponseModel
)
router = APIRouter()


@router.post('/register', response_description='User registration', status_code=201)
async def register(user: UserAuthDetails = Body(...)):
    _user = jsonable_encoder(user)
    new_user = await register_user(_user)
    return ResponseModel(new_user, 'New User Registered Successfully')


# @router.post('/login', response_description='User Login', status_code=201)
# async def login(user: UserLoginAuthDetails):
#     _user = jsonable_encoder(user)
#     _login_user = await login_user(_user)
#     return ResponseModel(_login_user, 'User logged In Successfully')
@router.post('/login', response_description='User Login', status_code=201)
async def login(user: UserLoginAuthDetails, Authorize: AuthJWT = Depends()):
    # if user.user_name != 'test' or user.password != 'test':
    #     raise HTTPException(status_code=401, detail="Bad username or password")
    _user = jsonable_encoder(user)
    _login_user = await login_user(_user, Authorize)
    # access_token = Authorize.create_access_token(subject=user.user_name)
    # refresh_token = Authorize.create_refresh_token(subject=user.user_name)
    return UserResponseModel(_login_user, 'User logged In Successfully')


@router.post('/refresh', response_description='User Token Refresh', status_code=201)
async def refresh_token(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()
    current_user = Authorize.get_jwt_subject()
    # print(refresh_token_)
    new_access_token = Authorize.create_access_token(subject=current_user)
    return TokenResponseModel(new_access_token,'Created new access token')
