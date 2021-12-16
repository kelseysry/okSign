from .db import db
from sqlalchemy.sql import func


class Smoking(db.Model):
    __tablename__ = 'smokings'

    id = db.Column(db.Integer, primary_key=True)
    option = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    profile = db.relationship("Profile", back_populates="smoking")


    def to_dict(self):
        return {
            'id': self.id,
            'option': self.option,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
