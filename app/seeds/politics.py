from app.models import db, Politic


def seed_politics():
    option1 = Politic(
      option ="Politically liberal"
    )
    option2 = Politic(
      option="Politically moderate"
    )
    option3 = Politic(
      option="Politically conservative"
    )
    option4 = Politic(
      option="Other political beliefs"
    )

    db.session.add(option1)
    db.session.add(option2)
    db.session.add(option3)
    db.session.add(option4)


    db.session.commit()


def undo_politics():
    db.session.execute('TRUNCATE politics RESTART IDENTITY CASCADE;')
    db.session.commit()
