from .db import db
from sqlalchemy.sql import func


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    preference = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    profile = db.relationship("Profile", back_populates="pet")


    def to_dict(self):
        return {
            'id': self.id,
            'preference': self.preference,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
