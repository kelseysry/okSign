from .db import db


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    # query = db.Column(db.String)
    question1 = db.Column(db.String)
    must_answer1 = db.Column(db.String)
    question2 = db.Column(db.String)
    must_answer2 = db.Column(db.String)
    question3 = db.Column(db.String)
    must_answer3 = db.Column(db.String)
    question4 = db.Column(db.String)
    must_answer4 = db.Column(db.String)
    question5 = db.Column(db.String)
    must_answer5 = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)

    user = db.relationship("User", back_populate="questions")

    def to_dict(self):
        return {
            'id': self.id,
            'question1': self.question1,
        }
