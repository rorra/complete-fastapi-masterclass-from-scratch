from fastapi import APIRouter, Depends, File, UploadFile
from routers.schema import PostBase, PostDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_post
import string
import random

router = APIRouter(
    prefix="/posts",
    tags=["post"]
)


@router.post("")
def create(request: PostBase, db: Session = Depends(get_db)):
    return db_post.create(db, request)


@router.get("/all")
def get_all(db: Session = Depends(get_db)):
    return db_post.get_all(db)


@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    return db_post.delete(db, id)


@router.post('/image')
def upload_image(image: UploadFile = File(...)):
    letter = string.ascii_letters
    rand_str = ''.join(random.choice(letter) for i in range(6))

    file_name = f"{image.filename.rsplit('.', 1)[0]}_{rand_str}.{image.filename.rsplit('.', 1)[1]}"
    # file_name = f"_{rand_str}.{image.filename.rsplit('.', 1)[1]}"
    # file_name = f"{image.filename.rsplit('.', 1)[0]}_{rand_str}."
    path = f"images/{file_name}"

    with open(path, 'w+b') as buffer:
        buffer.write(image.file.read())

    return {"file_name": path}
