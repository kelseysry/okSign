from .db import db


class Relationship(db.Model):
    __tablename__ = 'relationships'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255))


    userProfile = db.relationship("UserProfile", back_populate="relationship")


    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }
