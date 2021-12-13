from .db import db
from sqlalchemy.sql import func


class Relationship(db.Model):
    __tablename__ = 'relationships'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    profile = db.relationship("Profile", back_populates="relationship_status", uselist=False)


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
