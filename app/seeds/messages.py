from app.models import db, Message


def seed_messages():
    message1 = Message(
      conversation_id=1,
      content="I have a costco executive membership",
      from_user_id =2
    )
    message2 = Message(
      conversation_id=1,
      content="👀",
      from_user_id =1
    )


    db.session.add(message1)
    db.session.add(message2)

    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
