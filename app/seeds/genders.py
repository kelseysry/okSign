from app.models import db, Gender


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io', password='password')
    kelsey = User(
        first_name='Kelsey', last_name='Sry', username='kelsey', email='kelsey@aa.io', password='password')
    lisa = User(
        first_name='Lisa', last_name='Sry', username='lisa', email='lisa@aa.io', password='password')

    db.session.add(demo)
    db.session.add(kelsey)
    db.session.add(lisa)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;') # drop all users in db, included ones you submitted via form
    db.session.commit()
