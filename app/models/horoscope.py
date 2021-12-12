from .db import db


class Horoscope(db.Model):
    __tablename__ = 'horoscopes'

    id = db.Column(db.Integer, primary_key=True)
    sign = db.Column(db.String(255))
    image_url = db.Column(db.String)
    match = db.Column(db.String)


    userProfile = db.relationship("UserProfile", back_populate="horoscope")


    def to_dict(self):
        return {
            'id': self.id,
            'sign': self.sign,
            'image_url': self.image_url,
            'match': self.match
        }
