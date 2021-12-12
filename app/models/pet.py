from .db import db


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    option = db.Column(db.String(255))

    userProfile = db.relationship("UserProfile", back_populate="pet")


    def to_dict(self):
        return {
            'id': self.id,
            'option': self.option,
        }
