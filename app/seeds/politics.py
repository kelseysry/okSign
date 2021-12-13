from app.models import db, Politic


def seed_politics():
    belief1 = Politic(
      belief ="Politically liberal"
    )
    belief2 = Politic(
      belief="Politically moderate"
    )
    belief3 = Politic(
      belief="Politically conservative"
    )
    belief4 = Politic(
      belief="Other political beliefs"
    )

    db.session.add(belief1)
    db.session.add(belief2)
    db.session.add(belief3)
    db.session.add(belief4)


    db.session.commit()


def undo_politics():
    db.session.execute('TRUNCATE politics RESTART IDENTITY CASCADE;')
    db.session.commit()
