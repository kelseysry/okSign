from .db import db
from sqlalchemy.sql import func


class Religion(db.Model):
    __tablename__ = 'religions'

    id = db.Column(db.Integer, primary_key=True)
    belief = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())



    profile = db.relationship("Profile", back_populates="religion")


    def to_dict(self):
        return {
            'id': self.id,
            'belief': self.belief,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
