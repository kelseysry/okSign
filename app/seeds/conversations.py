from app.models import db, Conversation


def seed_conversations():
    conversation1 = Conversation(
      from_user_id=1,
      to_user_id=2,
    )


    db.session.add(conversation1)
    db.session.commit()

def undo_conversations():
    db.session.execute('TRUNCATE conversations RESTART IDENTITY CASCADE;')
    db.session.commit()
