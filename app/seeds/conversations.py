from app.models import db, Conversation


def seed_conversations():
    conversation1 = Conversation(
      user_id_one=1,
      user_id_two=2,
    )


    db.session.add(conversation1)
    db.session.commit()

def undo_conversations():
    db.session.execute('TRUNCATE conversations RESTART IDENTITY CASCADE;')
    db.session.commit()
