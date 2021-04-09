from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from api.db.users.database import auth_handler

from fastapi_jwt_auth import AuthJWT
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException

""" import router """
from .routes.users.authentication_users_routes import router as AuthRouter
from api.routes.posts.posts_routes import post_router as PostRouter
app = FastAPI()

origins = [
    # "http://localhost.tiangolo.com",
    # "https://localhost.tiangolo.com",
    '*',
    # "http://localhost:8000",
    # "http://localhost:8081",
    # "http://localhost:8080",
    # 'http://192.168.1.233:8080/'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(AuthRouter, tags=['Authentication'], prefix='/auth')


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message,
                 'status_code': exc.status_code}
    )


app.include_router(PostRouter, tags=['Posts'], prefix='/posts')


@app.get('/protected')
async def protected(username=Depends(auth_handler.auth_wrapper)):
    return {'user_data': username}
