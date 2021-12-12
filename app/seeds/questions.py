from app.models import db, Question


def seed_questions():
    query1 = Question(
      query ="Which word describes you better?"
    )
    query2 = Question(
      query="Doesn't have kids but wants them"
    )
    query3 = Question(
      query="Doesn't have kids and doesn't want want them"
    )
    query4 = Question(
      query="Has kid(s) and doesn't want more"
    )
    query5 = Question(
      query="Has kid(s) and might want more"
    )
    query6 = Question(
      query="Has kid(s) and want more"
    )

    db.session.add(query1)
    db.session.add(query2)
    db.session.add(query3)
    db.session.add(query4)
    db.session.add(query5)
    db.session.add(query6)

    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
