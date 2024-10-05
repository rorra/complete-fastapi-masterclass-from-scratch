from routers.schema import PostBase
from sqlalchemy.orm.session import Session
import datetime
from db.models import DbPost


def create(db: Session, request: PostBase):
    new_post = DbPost(
        image_url=request.image_url,
        title=request.title,
        content=request.content,
        creator=request.creator,
        timestamp=datetime.datetime.now()
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all(db: Session):
    return db.query(DbPost).all()
