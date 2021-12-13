from app.models import db, Children


def seed_children():
    preference1 = Children(
      preference ="Doesn't have kids but might want them"
    )
    preference2 = Children(
      preference="Doesn't have kids but wants them"
    )
    preference3 = Children(
      preference="Doesn't have kids and doesn't want want them"
    )
    preference4 = Children(
      preference="Has kid(s) and doesn't want more"
    )
    preference5 = Children(
      preference="Has kid(s) and might want more"
    )
    preference6 = Children(
      preference="Has kid(s) and want more"
    )

    db.session.add(preference1)
    db.session.add(preference2)
    db.session.add(preference3)
    db.session.add(preference4)
    db.session.add(preference5)
    db.session.add(preference6)

    db.session.commit()


def undo_children():
    db.session.execute('TRUNCATE children RESTART IDENTITY CASCADE;')
    db.session.commit()
