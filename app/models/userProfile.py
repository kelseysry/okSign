from .db import db


class UserProfile(db.Model):
    __tablename__ = 'userProfiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    age = db.Column(db.Integer)
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
    dating = db.Column(db.String(255))
    user_audio = db.Column(db.String(255))
    gender_id = db.Column(db.Integer, db.ForeignKey("genders.id"), nullable=True)
    number_likes = db.Column(db.Integer)
    image_url = db.Column(db.String)
    orientation_id = db.Column(db.Integer, db.ForeignKey("orientations.id"), nullable=True)
    relationship_id = db.Column(db.Integer, db.ForeignKey("relationships.id"), nullable=True)
    pronouns = db.Column(db.String(255))
    height = db.Column(db.Integer)
    education = db.Column(db.String(255))
    occupation = db.Column(db.String(255))
    religion = db.Column(db.String(255))
    horoscope_id = db.Column(db.Integer, db.ForeignKey("horoscopes.id"), nullable=True)
    smoking = db.Column(db.Boolean, default=False)
    drinking = db.Column(db.Boolean, default=False)
    children_id = db.Column(db.Integer, db.ForeignKey("children.id"), nullable=True)
    pet_id = db.Column(db.Boolean, default=False)


    gender = db.relationship("Gender", back_populate="userProfile")
    user = db.relationship("User", back_populate="userProfile")
    relationship = db.relationship("Relationship", back_populate="userProfile")
    orientation = db.relationship("Orientation", back_populate="userProfile")
    horoscope = db.relationship("Horoscope", back_populate="userProfile")
    children = db.relationship("Children", back_populate="userProfile")
    pet = db.relationship("Pet", back_populate="userProfile")
    politic = db.relationship("Politic", back_populate="userProfile")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'age': self.age,
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
            'dating': self.dating,
            'user_audio': self.user_audio,
            'gender_id': self.gender_id,
            'number_likes' = self.number_likes,
            'image_url' = self.image_url,
            'orientation_id' = self.orientation_id,
            'relationship_id' = self.relationship_id,
            'pronouns' = self.pronouns,
            'height' = self.height,
            'education' = self.education,
            'occupation' = self.occupation,
            'religion' = self.religion,
            'horoscope_id' = self.horoscope_id,
            'smoking' = self.smoking,
            'drinking' = self.drinking,
            'children_id' = self.children_id,
            'pet_id' = self.pet_id
        }
