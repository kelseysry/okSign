from .db import db


class Relationship(db.Model):
    __tablename__ = 'relationships'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    userProfile = db.relationship("UserProfile", back_populate="relationship")


    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
