from app.models import db, Pet


def seed_pets():
    preference1 = Pet(
      preference ="Doesn't have pet(s)"
    )
    preference2 = Pet(
      preference="Has cat(s)"
    )
    preference3 = Pet(
      preference="Has dog(s)"
    )
    preference4 = Pet(
      preference="Has other pet(s)"
    )

    db.session.add(preference1)
    db.session.add(preference2)
    db.session.add(preference3)
    db.session.add(preference4)


    db.session.commit()


def undo_pets():
    db.session.execute('TRUNCATE pets RESTART IDENTITY CASCADE;')
    db.session.commit()
