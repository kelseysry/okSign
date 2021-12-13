from app.models import db, UserProfile

def seed_userProfiles():
  userProfile1 = UserProfile(
  user_id =1,
  age = 24,
  location = 'Long Beach, California'
  lat = 33.85897723024835,
  lng = -118.08115190136616,
  about_me ="Costco, manga, tea/coffee addict",
  goal = "to become a SWE! :) ",
  talent = "8hr focus streaks when it comes to studying...?",
  my_traits ="creative, always confused, random, studious",
  needs = "good food",
  hobbies = "reading manga, coding",
  secrets = "wouldn't be a secret anymore if I said it",
  looking_for = "must have costco executive membership "
  user_audio = "https://res.cloudinary.com/mabmab/video/upload/v1639292032/okSign/New_Coronavirus_Laws_Funny_vu9ais.mp3",
  gender_id =2,
  number_likes = 1,
  image_url1 = "https://res.cloudinary.com/mabmab/image/upload/v1639292458/okSign/kelsey1_yut7zy.png",
  image_url2 = "https://res.cloudinary.com/mabmab/image/upload/v1639294329/okSign/IMG_1193_amp2ic.jpg",
  image_url3 = "https://res.cloudinary.com/mabmab/image/upload/v1639294327/okSign/IMG_1196_rntazj.jpg",
  image_url4 = "https://res.cloudinary.com/mabmab/image/upload/v1639293141/okSign/Screen_Shot_2021-12-11_at_11.11.52_PM_kdphkm.png",
  image_url5 = "https://res.cloudinary.com/mabmab/image/upload/v1639294470/okSign/IMG_1192_dtdyvh.jpg",
  image_url6 = "https://res.cloudinary.com/mabmab/image/upload/v1639294665/okSign/Screen_Shot_2021-12-11_at_11.16.59_PM_mez2fg.png",
  orientation_id =1,
  relationship_id =1,
  pronouns = db.Column(db.String(255)),
  height = db.Column(db.Integer),
  education = "Stanford University",
  occupation = db.Column(db.String(255)),
  religion = db.Column(db.String(255)),
  horoscope_id =11,
  smoking = False
  drinking = False,
  children_id =3,
  pet_id =1,
  politics_id =2
  )

  userProfile2 = UserProfile(
  user_id =2,
  age = 28,
  location = 'Tokyo, Japan'
  lat = 35.66386037006631,
  lng = 139.71280545767016,
  about_me ="ex-salaryman,
  goal = "to mentor Yuji well and destroy curses.",
  talent = "?",
  my_traits ="can perfectly divide anything into a 7:3 ratio point",
  needs = "nothing",
  hobbies = "reading at cafes ",
  secrets = "...",
  looking_for = "decent person"
  user_audio = "https://res.cloudinary.com/mabmab/video/upload/v1639359984/okSign/nanami_audio_tq9fb3.mp3",
  gender_id =1,
  number_likes = 2,
  image_url1 = "https://res.cloudinary.com/mabmab/image/upload/v1639360793/okSign/Screen_Shot_2021-12-12_at_5.59.47_PM_kdl0py.png",
  image_url2 = "https://res.cloudinary.com/mabmab/image/upload/v1639360649/okSign/Screen_Shot_2021-12-12_at_5.57.22_PM_klubft.png",
  image_url3 = "https://res.cloudinary.com/mabmab/image/upload/v1639360501/okSign/Screen_Shot_2021-12-12_at_5.54.56_PM_x2tg82.png",
  image_url4 = "https://res.cloudinary.com/mabmab/image/upload/v1639360604/okSign/Screen_Shot_2021-12-12_at_5.56.35_PM_tkqbgd.png",
  image_url5 = "https://res.cloudinary.com/mabmab/image/upload/v1639361013/okSign/Screen_Shot_2021-12-12_at_6.03.25_PM_x0xfzv.png",
  image_url6 = "https://res.cloudinary.com/mabmab/image/upload/v1639360809/okSign/Screen_Shot_2021-12-12_at_6.00.02_PM_rqfsy2.png",
  orientation_id =1,
  relationship_id =1,
  pronouns ='He/Him'
  height = 184,
  education = "Jujutsu Tech",
  occupation ="Jujutsu sorcerer"
  religion = # to do
  horoscope_id =4,
  smoking = True
  drinking = True,
  children_id =3,
  pet_id =1,
  politics_id =4
  )

  db.session.add(userProfile1)

  db.session.commit()

def undo_userProfiles():
    db.session.execute('TRUNCATE userProfiles RESTART IDENTITY CASCADE;')
    db.session.commit()
