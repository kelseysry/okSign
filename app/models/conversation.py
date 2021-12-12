from .db import db
from sqlalchemy.sql import func


class Conversation(db.Model):
    __tablename__ = 'conversations'

    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    to_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)


    def to_dict(self):
        return {
            'id': self.id,
            'question1': self.question1,
            'must_answer1' :self.must_answer1,
            'question2': self.question2,
            'must_answer2' :self.must_answer2,
            'question3': self.question3,
            'must_answer3' :self.must_answer3,

            'user_id': self.user_id
        }
