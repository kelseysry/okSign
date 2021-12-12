from app.models import db, Pet


def seed_pets():
    option1 = Pet(
      option ="Doesn't have pet(s)"
    )
    option2 = Pet(
      option="Has cat(s)"
    )
    option3 = Pet(
      option="Has dog(s)"
    )
    option4 = Pet(
      option="Has other pet(s)"
    )

    db.session.add(option1)
    db.session.add(option2)
    db.session.add(option3)
    db.session.add(option4)


    db.session.commit()


def undo_pets():
    db.session.execute('TRUNCATE pets RESTART IDENTITY CASCADE;')
    db.session.commit()
