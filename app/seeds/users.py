from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Kelsey', last_name='Sry', username='demoKelsey', email='kelseyysry@gmail.com', password='password')

    user2 = User(
    first_name='Nanami', last_name='Kento', username='Nanami', email='nanami@aol.com', password='password')


    db.session.add(demo)
    db.session.add(user2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;') # drop all users in db, included ones you submitted via form
    db.session.commit()
