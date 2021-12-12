from .db import db


class Gender(db.Model):
    __tablename__ = 'genders'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255))


    userProfile = db.relationship("UserProfile", back_populate="gender")


    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }
