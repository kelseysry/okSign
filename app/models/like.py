from .db import db
from sqlalchemy.sql import func


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    liked = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    match_profile_id = db.Column(db.Integer, db.ForeignKey("profiles.id"), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="like")
    profile = db.relationship("Profile", back_populates="like")

    def to_dict(self):
        return {
            'id': self.id,
            'liked': self.liked,
            'user_id': self.user_id,
            'match_profile_id': self.match_profile_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
