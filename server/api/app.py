from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    '*',
    'http://localhost:8000'
    'http://localhost:8080'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/', tags=['Root'])
async def read_root():
    return {
        'message': 'Welcome to FastAPI-AuthCRUD'
    }
