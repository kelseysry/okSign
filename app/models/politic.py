from .db import db


class Politic(db.Model):
    __tablename__ = 'politics'

    id = db.Column(db.Integer, primary_key=True)
    belief = db.Column(db.String(255))


    userProfile = db.relationship("UserProfile", back_populate="politic")


    def to_dict(self):
        return {
            'id': self.id,
            'belief': self.belief,
        }
