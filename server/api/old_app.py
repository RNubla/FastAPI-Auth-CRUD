# from server.api.example_app import on_after_register
from api.routes.users import SECRET
from fastapi import FastAPI, File, UploadFile
from api.routes.users import FASTAPI_USERS, jwt_authentication
from api.database import(
    on_after_register,
    on_after_forgot_password,
    after_verification_request
)
from fastapi.middleware.cors import CORSMiddleware
# from server.api.routes.users

app = FastAPI()


origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    '*',
    "http://localhost:8000",
    "http://localhost:8080",
    'http://192.168.1.233:8080/'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
""" Login route """
app.include_router(
    FASTAPI_USERS.get_auth_router(jwt_authentication), prefix='/auth/jwt', tags=['auth']
)
""" Register route  """
app.include_router(
    FASTAPI_USERS.get_register_router(on_after_register), prefix='/auth', tags=['auth']
)
""" Forgot and Reset Password Route """
app.include_router(
    FASTAPI_USERS.get_reset_password_router(
        SECRET, after_forgot_password=on_after_forgot_password
    ),
    prefix='/auth',
    tags=['auth']
)
""" Request verification token and Verify Route """
app.include_router(
    FASTAPI_USERS.get_verify_router(
        SECRET, after_verification_request=after_verification_request
    ),
    prefix='/auth',
    tags=['auth']
)
app.include_router(FASTAPI_USERS.get_users_router(),
                   prefix="/users", tags=["users"])
