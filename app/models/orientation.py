from .db import db


class Orientation(db.Model):
    __tablename__ = 'orientations'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255))


    userProfile = db.relationship("UserProfile", back_populate="orientation")


    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }
