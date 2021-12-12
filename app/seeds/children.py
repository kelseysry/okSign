from app.models import db, Children


def seed_children():
    option1 = Children(
      option ="Doesn't have kids but might want them"
    )
    option2 = Children(
      option="Doesn't have kids but wants them"
    )
    option3 = Children(
      option="Doesn't have kids and doesn't want want them"
    )
    option4 = Children(
      option="Has kid(s) and doesn't want more"
    )
    option5 = Children(
      option="Has kid(s) and might want more"
    )
    option6 = Children(
      option="Has kid(s) and want more"
    )

    db.session.add(option1)
    db.session.add(option2)
    db.session.add(option3)
    db.session.add(option4)
    db.session.add(option5)
    db.session.add(option6)

    db.session.commit()


def undo_children():
    db.session.execute('TRUNCATE children RESTART IDENTITY CASCADE;')
    db.session.commit()
