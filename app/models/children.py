from .db import db
from sqlalchemy.sql import func


class Children(db.Model):
    __tablename__ = 'children'

    id = db.Column(db.Integer, primary_key=True)
    preference = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    profile = db.relationship("Profile", back_populates="children")


    def to_dict(self):
        return {
            'id': self.id,
            'preference': self.preference,
            'date': self.date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
