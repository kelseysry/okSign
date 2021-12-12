from .db import db


class Horoscope(db.Model):
    __tablename__ = 'horoscopes'

    id = db.Column(db.Integer, primary_key=True)
    sign = db.Column(db.String(255))
    image_url = db.Column(db.String)
    match = db.Column(db.String)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())


    userProfile = db.relationship("UserProfile", back_populate="horoscope")


    def to_dict(self):
        return {
            'id': self.id,
            'sign': self.sign,
            'image_url': self.image_url,
            'match': self.match,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
