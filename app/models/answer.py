# from .db import db


# class Answer(db.Model):
#     __tablename__ = 'answers'

#     id = db.Column(db.Integer, primary_key=True)
#     question_id = db.Column(db.Integer, db.ForeignKey("questions.id"), nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
#     response = db.Column(db.String)

#     user = db.relationship("User", back_populate="answers")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'question_id': self.question_id,
#             'user_id': self.user_id,
#             'response': self.response
#         }
