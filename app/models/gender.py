from .db import db
from sqlalchemy.sql import func
from .profile import Profile


class Gender(db.Model):
    __tablename__ = 'genders'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # my_ratings = db.relationship(
    #                              'Profile',
    #                              secondary=genders,
    #                              primaryjoin=(genders.c.gender_id == id),
    #                              secondaryjoin=(ratings.c.gender_preference_id == id),
    #                              backref = db.backref('gender_types', lazy='dynamic'), lazy='dynamic'
    #                              )

    # profile = db.relationship("Profile", back_populates="gender")
    # gender_preference = db.relationship("Profile",
    # foreign_keys=[Profile.gender_preference_id],
    # back_populates="genderPreference"
    # )

    # user_gender_id = db.relationship("Profile",
    # foreign_keys=[Profile.gender_id],
    # back_populates="genderId"
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
