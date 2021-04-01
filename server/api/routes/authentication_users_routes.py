from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.post('/', response_description='User registration', status_code=201)
def register():
    return {
        'message': 'register'
    }
