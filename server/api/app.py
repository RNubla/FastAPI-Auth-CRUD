from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

""" import router """
from .routes.authentication_users_routes import router as AuthRouter

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

app.include_router(AuthRouter, tags=['Authentication'], prefix='/auth')
# @app.post('/users/register', status_code=201, )
