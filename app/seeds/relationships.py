from app.models import db, Relationship


# Adds a demo user, you can add other users here if you want
def seed_relationships():
    Monogamous = Relationship(
      type ="Monogamous"
    )
    NonMonogamous = Relationship(
      type="Non-monogamous"
    )
    Open = Relationship(
      type="Open to either"
    )


    db.session.add(Monogamous)
    db.session.add(NonMonogamous)
    db.session.add(Open)

    db.session.commit()


def undo_relationships():
    db.session.execute('TRUNCATE relationships RESTART IDENTITY CASCADE;')
    db.session.commit()
