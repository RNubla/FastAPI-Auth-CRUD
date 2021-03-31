from fastapi.routing import APIRouter
from api.database import(
    user_db
)
from api.models.users import(
    User,
    UserCreate,
    UserUpdate,
    UserDB
)
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import JWTAuthentication
SECRET = 'SECRET'

# router = APIRouter()

jwt_authentication = JWTAuthentication(
    secret=SECRET, lifetime_seconds=3600, tokenUrl='/auth/jwt/login')

FASTAPI_USERS = FastAPIUsers(
    user_db,
    [jwt_authentication],
    User,
    UserCreate,
    UserUpdate,
    UserDB

)
