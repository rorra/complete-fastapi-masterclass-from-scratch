from fastapi import APIRouter, Depends
from routers.schema import PostBase, PostDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_post

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
