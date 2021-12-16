from app.models import db, Drinking


def seed_drinkings():
    name1 = Drinking(
      name ="Drinks often"
    )
    name2 = Drinking(
      name="Drinks sometimes"
    )
    name3 = Drinking(
      name="Doesn't drink"
    )

    db.session.add(name1)
    db.session.add(name2)
    db.session.add(name3)


    db.session.commit()


def undo_drinkings():
    db.session.execute('TRUNCATE drinkings RESTART IDENTITY CASCADE;')
    db.session.commit()
