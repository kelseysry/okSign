from app.models import db, Smoking


def seed_smokings():
    option1 = Smoking(
      option ="Smokes cigarettes regularly"
    )
    option2 = Smoking(
      option="Smokes cigarettes sometimes"
    )
    option3 = Smoking(
      option="Vapes"
    )
    option4 = Smoking(
      option="Doesn't smoke"
    )

    db.session.add(option1)
    db.session.add(option2)
    db.session.add(option3)
    db.session.add(option4)


    db.session.commit()


def undo_smokings():
    db.session.execute('TRUNCATE smokings RESTART IDENTITY CASCADE;')
    db.session.commit()
