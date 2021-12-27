from .db import db
from sqlalchemy.sql import func


class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    age = db.Column(db.Integer)
    location = db.Column(db.String)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    about_me = db.Column(db.String(255))
    goal = db.Column(db.String(255))
    talent = db.Column(db.String(255))
    my_traits = db.Column(db.String(255))
    needs = db.Column(db.String(255))
    hobbies = db.Column(db.String(255))
    moments = db.Column(db.String(255))
    secrets = db.Column(db.String(255))
    looking_for = db.Column(db.String(255))
    user_audio = db.Column(db.String(255))
    gender_id = db.Column(db.Integer, db.ForeignKey("genders.id"), nullable=True)
    gender_preference_id = db.Column(db.Integer, db.ForeignKey("genders.id"), nullable=True)
    number_likes = db.Column(db.Integer)
    image_url1 = db.Column(db.String)
    image_url2 = db.Column(db.String)
    image_url3 = db.Column(db.String)
    image_url4 = db.Column(db.String)
    image_url5 = db.Column(db.String)
    image_url6 = db.Column(db.String)
    orientation_id = db.Column(db.Integer, db.ForeignKey("orientations.id"), nullable=True)
    partner_id = db.Column(db.Integer, db.ForeignKey("partners.id"), nullable=True)
    pronouns = db.Column(db.String(255))
    height = db.Column(db.Integer)
    education = db.Column(db.String(255))
    occupation = db.Column(db.String(255))
    horoscope_id = db.Column(db.Integer, db.ForeignKey("horoscopes.id"), nullable=True)
    smoking_id = db.Column(db.Integer, db.ForeignKey("smokings.id"), nullable=True)
    drinking_id = db.Column(db.Integer, db.ForeignKey("drinkings.id"), nullable=True)
    children_id = db.Column(db.Integer, db.ForeignKey("children.id"), nullable=True)
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.id"), nullable=True)
    politic_id = db.Column(db.Integer, db.ForeignKey("politics.id"), nullable=True)
    religion_id = db.Column(db.Integer, db.ForeignKey("religions.id"), nullable=True)


    # gender = db.relationship("Gender", back_populates="profile")
    user = db.relationship("User", back_populates="profile")
    partner = db.relationship("Partner", back_populates="profile")
    orientation = db.relationship("Orientation", back_populates="profile")
    horoscope = db.relationship("Horoscope", back_populates="profile")
    children = db.relationship("Children", back_populates="profile")
    pet = db.relationship("Pet", back_populates="profile")
    politic = db.relationship("Politic", back_populates="profile")
    religion = db.relationship("Religion", back_populates="profile")

    smoking = db.relationship("Smoking", back_populates="profile")
    drinking = db.relationship("Drinking", back_populates="profile")


    genderId = db.relationship("Gender", foreign_keys="[Profile.gender_id]")
    genderPreference = db.relationship("Gender", foreign_keys="[Profile.gender_preference_id]")

    # like = db.relationship("Like", back_populates="profile")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'age': self.age,
            'location': self.location,
            'lat': self.lat,
            'lng': self.lng,
            'about_me': self.about_me,
            'goal': self.goal,
            'talent': self.talent,
            'my_traits': self.my_traits,
            'needs': self.needs,
            'hobbies': self.hobbies,
            'moments': self.moments,
            'secrets': self.secrets,
            'looking_for': self.looking_for,
            'user_audio': self.user_audio,
            'gender_id': self.gender_id,
            'gender_preference_id': self.gender_preference_id,
            'number_likes': self.number_likes,
            'image_url1': self.image_url1,
            'image_url2': self.image_url2,
            'image_url3': self.image_url3,
            'image_url4': self.image_url4,
            'image_url5': self.image_url5,
            'image_url6': self.image_url6,
            'orientation_id': self.orientation_id,
            'partner_id': self.partner_id,
            'pronouns': self.pronouns,
            'height': self.height,
            'education': self.education,
            'occupation': self.occupation,
            'horoscope_id': self.horoscope_id,
            'smoking_id': self.smoking_id,
            'drinking_id': self.drinking_id,
            'children_id': self.children_id,
            'pet_id': self.pet_id,
            'politic_id': self.politic_id,
            'religion_id': self.religion_id
        }
