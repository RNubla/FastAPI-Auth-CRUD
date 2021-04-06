from fastapi import APIRouter, Body, Depends
from fastapi.encoders import jsonable_encoder

from api.db.users.database import(
    register_user,
    login_user,
    # access_protected
)

from api.models.users.authentication_details import(
    ErrorResponseModel,
    ResponseModel,
    UpdateUserModel,
    UserAuthDetails)
from api.models.users.login import(
    UserLoginAuthDetails
)
router = APIRouter()


@router.post('/register', response_description='User registration', status_code=201)
async def register(user: UserAuthDetails = Body(...)):
    _user = jsonable_encoder(user)
    new_user = await register_user(_user)
    return ResponseModel(new_user, 'New User Registered Successfully')


@router.post('/login', response_description='User Login', status_code=201)
async def login(user: UserLoginAuthDetails):
    _user = jsonable_encoder(user)
    _login_user = await login_user(_user)
    return ResponseModel(_login_user, 'User logged In Successfully')

# @router.post('/refresh', response_description='Refresh Token', status_code=201)
# async def refresh()
