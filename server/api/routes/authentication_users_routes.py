from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from api.database import(
    register_user
)

from api.models.authentication_details import(
    ErrorResponseModel,
    ResponseModel,
    UpdateUserModel,
    UserAuthDetails)
router = APIRouter()


@router.post('/', response_description='User registration', status_code=201)
async def register(user: UserAuthDetails = Body(...)):
    _user = jsonable_encoder(user)
    new_user = await register_user(_user)
    return ResponseModel(new_user, 'New User Registered Successfully')
