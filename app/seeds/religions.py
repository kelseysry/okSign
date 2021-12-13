from app.models import db, Religion


def seed_religions():
    belief1 = Religion(
      belief ="Agnosticism"
    )
    belief2 = Religion(
      belief="Atheism"
    )
    belief3 = Religion(
      belief="Christianity"
    )
    belief4 = Religion(
      belief="Judaism"
    )
    belief5 = Religion(
    belief="Catholicism"
    )
    belief6 = Religion(
    belief="Islam"
    )
    belief7 = Religion(
    belief="Hinduism"
    )
    belief8 = Religion(
    belief="Buddhism"
    )
    belief9 = Religion(
    belief="Sikh"
    )
    belief10 = Religion(
    belief="Other religion"
    )
    db.session.add(belief1)
    db.session.add(belief2)
    db.session.add(belief3)
    db.session.add(belief4)
    db.session.add(belief5)
    db.session.add(belief6)
    db.session.add(belief7)
    db.session.add(belief8)
    db.session.add(belief9)
    db.session.add(belief10)



    db.session.commit()


def undo_religions():
    db.session.execute('TRUNCATE religions RESTART IDENTITY CASCADE;')
    db.session.commit()
