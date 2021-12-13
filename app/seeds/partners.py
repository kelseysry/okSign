from app.models import db, Partner


# Adds a demo user, you can add other users here if you want
def seed_partners():
    Monogamous = Partner(
      title ="Monogamous"
    )
    NonMonogamous = Partner(
      title="Non-monogamous"
    )
    Open = Partner(
      title="Open to either"
    )


    db.session.add(Monogamous)
    db.session.add(NonMonogamous)
    db.session.add(Open)

    db.session.commit()


def undo_partners():
    db.session.execute('TRUNCATE partners RESTART IDENTITY CASCADE;')
    db.session.commit()
