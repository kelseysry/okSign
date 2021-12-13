from .db import db
from sqlalchemy.sql import func


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    user_id_one = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    user_id_two = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    date = db.Column(db.Date)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    users = db.relationship("User", back_populate="conversations")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id_one': self.user_id_one,
            'user_id_two': self.user_id_two,
            'date': self.date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
