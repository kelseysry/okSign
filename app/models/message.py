from .db import db
from sqlalchemy.sql import func


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey("conversations.id"), nullable=True)
    content = db.Column(db.Text)
    date = db.Column(db.Date)
    from_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    conversation = db.relationship("Conversation", back_populate="messages")
    user = db.relationship("User", back_populate="messages")


    def to_dict(self):
        return {
            'id': self.id,
            'conversation_id': self.conversation_id,
            'content': self.content,
            'date': self.date,
            'from_user_id':self.from_user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
