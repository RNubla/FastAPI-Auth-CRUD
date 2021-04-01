import motor.motor_asyncio
from fastapi import Request
from fastapi_users.db import MongoDBUserDatabase
from bson.objectid import ObjectId

from api.models.users import (
    UserDB
)

DATABASE_URL = "mongodb://localhost:27017"


client = motor.motor_asyncio.AsyncIOMotorClient(
    DATABASE_URL, uuidRepresentation='standard')
db = client['user_database']
collection = db['users']
user_db = MongoDBUserDatabase(UserDB, collection)

""" helper function for parsing the result from database query into a python dictionary """


def user_helper(user) -> dict:
    return{
        'id': str(user['id']),
        'firstName': str(user['firstName']),
        'lastName': str(user['lastName']),
        'email': user['email'],
        'is_active': user['is_active']
    }


def on_after_register(user: UserDB, request: Request):
    print(f"User {user.id} has registered.")


def on_after_forgot_password(user: UserDB, token: str, request: Request):
    print(f"User {user.id} has forgot their password. Reset token: {token}")


def after_verification_request(user: UserDB, token: str, request: Request):
    print(
        f"Verification requested for user {user.id}. Verification token: {token}")
