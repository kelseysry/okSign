from app.models import db, Drinking


def seed_drinkings():
    option1 = Drinking(
      option ="Drinks often"
    )
    option2 = Drinking(
      option="Drinks sometimes"
    )
    option3 = Drinking(
      option="Doesn't drink"
    )

    db.session.add(option1)
    db.session.add(option2)
    db.session.add(option3)


    db.session.commit()


def undo_drinkings():
    db.session.execute('TRUNCATE drinkings RESTART IDENTITY CASCADE;')
    db.session.commit()
