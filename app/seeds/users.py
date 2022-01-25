from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Demo', username='Demo', email='demo@aol.com', password='password')

    user2 = User(
    first_name='Nanami', last_name='Kento', username='Nanami', email='nanami@aol.com', password='password')

    user3 = User(
    first_name='Grimmjow', last_name='Jaegerjaquez', username='Grimmjow', email='grim@aol.com', password='password')

    user4 = User(
     first_name='Zero', last_name='Kiryu', username='Zero', email='zero@aol.com', password='password')

    user5 = User(
     first_name='L',
     last_name='Lawliet',
     username='LLawliet',
     email='lawliet@aol.com',
     password='password')

    user6 = User(
     first_name='Kakashi',
     last_name='Hatake',
     username='Kakashi',
     email='kakashi@aol.com',
     password='password')

    user7 = User(
     first_name='Alex',
     last_name='Armstrong',
     username='Alex',
     email='alex@aol.com',
     password='password')

    user8 = User(
     first_name='Levi',
     last_name='Ackerman',
     username='Levi',
     email='levi@aol.com',
     password='password')

    user9 = User(
     first_name='Erza',
     last_name='Scarlet',
     username='Erza',
     email='erza@aol.com',
     password='password')

    user10 = User(
     first_name='Tori',
     last_name='Qi',
     username='Tori',
     email='tori@aol.com',
     password='password')

    user11 = User(
     first_name='Zedd',
     last_name='Li',
     username='Zedd',
     email='zedd@aol.com',
     password='password')

    user12 = User(
     first_name='Gojo',
     last_name='Satoru',
     username='Gojo',
     email='gojo@aol.com',
     password='password')

    user13 = User(
     first_name='Erwin',
     last_name='Smith',
     username='Erwin',
     email='erwin@aol.com',
     password='password')

    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.add(user11)
    db.session.add(user12)
    db.session.add(user13)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;') # drop all users in db, included ones you submitted via form
    db.session.commit()
