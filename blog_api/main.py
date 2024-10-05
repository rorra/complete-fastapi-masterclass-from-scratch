from fastapi import FastAPI
from db import models
from db.database import engine
from routers import post
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(post.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


models.Base.metadata.create_all(engine)

app.mount("/images", StaticFiles(directory="images"), name="images")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
