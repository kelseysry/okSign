from app.models import db, Smoking


def seed_smokings():
    name1 = Smoking(
      name ="Smokes cigarettes regularly"
    )
    name2 = Smoking(
      name="Smokes cigarettes sometimes"
    )
    name3 = Smoking(
      name="Vapes"
    )
    name4 = Smoking(
      name="Doesn't smoke"
    )

    db.session.add(name1)
    db.session.add(name2)
    db.session.add(name3)
    db.session.add(name4)


    db.session.commit()


def undo_smokings():
    db.session.execute('TRUNCATE smokings RESTART IDENTITY CASCADE;')
    db.session.commit()
