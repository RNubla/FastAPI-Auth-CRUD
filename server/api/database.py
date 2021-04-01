from api.auth.auth import AuthHandler
import motor.motor_asyncio
from bson.objectid import ObjectId
from fastapi import HTTPException, Depends

MONGO_DETAILS = 'mongodb://localhost:27017'

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.users

user_collection = database.get_collection('users_collection')


""" THE HELPER FUNCTION TRANSFORMS DATABASE QUERY INTO PYTHON DICTIONARY """


def user_helper(user) -> dict:
    return{
        'id': str(user['_id']),
        'user_name': user['user_name'],
        'email': user['email'],
        'password': user['password']
    }


""" CRUD OPERATIONS """

""" REGISTER USER """
auth_handler = AuthHandler()


async def register_user(user_data: dict) -> dict:
    """
    FIND EXISTING USER. IF FOUND, THEN RAISE HTTPEXCEPTION WITH MESSAGE THAT USERNAME IS TAKEN
    """
    existing_user = await user_collection.find_one({'user_name': user_data['user_name']})
    if existing_user:
        raise HTTPException(status_code=400, detail='Username is taken')
    """ 
    HASH THE PASSWORD AND IT WILL GET STORED IN THE DATABASE
    """
    hashed_password = auth_handler.get_hashed_password(user_data['password'])
    user_data['password'] = hashed_password
    user = await user_collection.insert_one(user_data)
    new_user = await user_collection.find_one({'_id': user.inserted_id})
    return user_helper(new_user)


async def login_user(user_data: dict) -> dict:
    user = await user_collection.find_one({'user_name': user_data['user_name']})
    # print(user['password'])
    _user = user_helper(user)
    # print(_user)

    if (user is None) or (not auth_handler.get_verify_password(user_data['password'], user['password'])):
        raise HTTPException(
            status_code=401, detail='Invalid username and/or password')

    token = auth_handler.enconde_token(user['user_name'])
    return {'token', token}
