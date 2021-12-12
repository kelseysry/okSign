from .db import db


class Children(db.Model):
    __tablename__ = 'children'

    id = db.Column(db.Integer, primary_key=True)
    option = db.Column(db.String(255))


    userProfile = db.relationship("UserProfile", back_populate="relationship")


    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
        }
