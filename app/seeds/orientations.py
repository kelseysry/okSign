from app.models import db, Orientation


# Adds a demo user, you can add other users here if you want
def seed_orientations():
    Straight = Orientation(
      type ="Straight"
    )
    Lesbian = Orientation(
      type="Lesbian"
    )
    Gay = Orientation(
      type="Gay"
    )
    Bisexual = Orientation(
      type="Bisexual"
    )
    Queer = Orientation(
      type="Queer"
    )
    Pansexual = Orientation(
      type="Pansexual"
    )


    db.session.add(Straight)
    db.session.add(Lesbian)
    db.session.add(Gay)
    db.session.add(Bisexual)
    db.session.add(Queer)
    db.session.add(Pansexual)

    db.session.commit()


def undo_orientations():
    db.session.execute('TRUNCATE orientations RESTART IDENTITY CASCADE;')
    db.session.commit()
