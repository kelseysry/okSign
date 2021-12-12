from app.models import db, UserProfile

def seed_userProfiles():
  userProfile1 = UserProfile(
  user_id =1,
  age = 24,
  lat = 33.85897723024835,
  lng = -118.08115190136616,
  about_me ="Costco, manga, tea/coffee addict",
  goal = "to become a SWE! :) ",
  talent = "8hr focus streaks when it comes to studying...?",
  my_traits ="creative, always confused, random, studious",
  needs = "good food",
  hobbies = "reading manga, coding",
  secrets = "wouldn't be a secret anymore if I said it",
  dating = "it's great"
  user_audio = "https://res.cloudinary.com/mabmab/video/upload/v1639292032/okSign/New_Coronavirus_Laws_Funny_vu9ais.mp3",
  gender_id = # fill this out
  number_likes = 10,
  image_url1 = "https://res.cloudinary.com/mabmab/image/upload/v1639292458/okSign/kelsey1_yut7zy.png",
  image_url2 = "https://res.cloudinary.com/mabmab/image/upload/v1639294329/okSign/IMG_1193_amp2ic.jpg",
  image_url3 = "https://res.cloudinary.com/mabmab/image/upload/v1639294327/okSign/IMG_1196_rntazj.jpg",
  image_url4 = "https://res.cloudinary.com/mabmab/image/upload/v1639293141/okSign/Screen_Shot_2021-12-11_at_11.11.52_PM_kdphkm.png",
  image_url5 = "https://res.cloudinary.com/mabmab/image/upload/v1639294470/okSign/IMG_1192_dtdyvh.jpg",
  image_url6 = "https://res.cloudinary.com/mabmab/image/upload/v1639294665/okSign/Screen_Shot_2021-12-11_at_11.16.59_PM_mez2fg.png",
  orientation_id = # fill this out
  relationship_id = # fill this out
  pronouns = db.Column(db.String(255)),
  height = db.Column(db.Integer),
  education = db.Column(db.String(255)),
  occupation = db.Column(db.String(255)),
  religion = db.Column(db.String(255)),
  horoscope_id = # fill this out
  smoking = False
  drinking = False,
  children_id = # fill this out
  pet_id = # fill this out
  politics_id = # fill this out
  )

  db.session.add(userProfile1)

  db.session.commit()

def undo_userProfiles():
    db.session.execute('TRUNCATE userProfiles RESTART IDENTITY CASCADE;') 
    db.session.commit()
