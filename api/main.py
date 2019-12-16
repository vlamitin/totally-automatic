from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes.main import api_router

app = FastAPI()

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
