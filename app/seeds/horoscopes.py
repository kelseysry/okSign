from app.models import db, Horoscope


def seed_horoscopes():
    Aries = Horoscope(
      sign ="Aries",
      image_url="https://cdn-icons.flaticon.com/png/512/1913/premium/1913925.png?token=exp=1639300535~hmac=dd8c482b996d8f90bb9a950a0e8b4bf0",
      match="Gemini"
    )

    Taurus = Horoscope(
      sign ="Taurus",
      image_url="",
      match="Cancer"
    )

    Gemini = Horoscope(
      sign ="Gemini",
      image_url="",
      match="Aries"
    )

    Cancer = Horoscope(
      sign ="Cancer",
      image_url="",
      match="Taurus"
    )

    Leo = Horoscope(
      sign ="Leo",
      image_url="",
      match="Libra"
    )

    Virgo = Horoscope(
      sign ="Virgo",
      image_url="",
      match="Capricorn"
    )

    Libra = Horoscope(
      sign ="Libra",
      image_url="",
      match="Leo"
    )

    Scorpio = Horoscope(
      sign ="Scorpio",
      image_url="",
      match="Pisces"
    )

    Sagittarius = Horoscope(
      sign ="Sagittarius",
      image_url="",
      match="Aquarius"
    )

    Capricorn = Horoscope(
      sign ="Capricorn",
      image_url="",
      match="Virgo"
    )

    Aquarius = Horoscope(
      sign ="Aquarius",
      image_url="",
      match="Sagittarius"
    )

    Pisces = Horoscope(
      sign ="Pisces",
      image_url="",
      match="Scorpio"
    )

    db.session.add(Aries)
    db.session.add(Taurus)
    db.session.add(Gemini)
    db.session.add(Cancer)
    db.session.add(Leo)
    db.session.add(Virgo)
    db.session.add(Libra)
    db.session.add(Scorpio)
    db.session.add(Sagittarius)
    db.session.add(Capricorn)
    db.session.add(Aquarius)
    db.session.add(Pisces)

    db.session.commit()


def undo_horoscopes():
    db.session.execute('TRUNCATE horoscopes RESTART IDENTITY CASCADE;')
    db.session.commit()
