from app.models import db, Gender


# Adds a demo user, you can add other users here if you want
def seed_genders():
    women = Gender(
        type ="Women"
       )
    men = Gender(
      type="Men"
    )


    db.session.add(women)
    db.session.add(men)

    db.session.commit()


def undo_genders():
    db.session.execute('TRUNCATE genders RESTART IDENTITY CASCADE;') 
    db.session.commit()
