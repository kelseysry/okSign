from app.models import db, Like

def seed_likes():
    like1 = Like(
      liked="true",
      user_id=1,
      match_profile_id=2
    )
    like2 = Like(
      liked="true",
      user_id=1,
      match_profile_id=4
    )
    like3 = Like(
      liked="false",
      user_id=2,
      match_profile_id=1
    )

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)


    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
