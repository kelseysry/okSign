from app.models import db, Relationship


# Adds a demo user, you can add other users here if you want
def seed_relationships():
    Monogamous = Relationship(
      title ="Monogamous"
    )
    NonMonogamous = Relationship(
      title="Non-monogamous"
    )
    Open = Relationship(
      title="Open to either"
    )


    db.session.add(Monogamous)
    db.session.add(NonMonogamous)
    db.session.add(Open)

    db.session.commit()


def undo_relationships():
    db.session.execute('TRUNCATE relationships RESTART IDENTITY CASCADE;')
    db.session.commit()
