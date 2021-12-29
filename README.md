<p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640760248/okSign/Screen_Shot_2021-12-28_at_10.44.01_PM_wfk2h3.png"/>
</p>

# Summary 
[okSign](https://oksign-kelseysry.herokuapp.com/login) is a dating app based off of okCupid. okSign was created by using React, Redux, Flask, Docker, and PostgreSQL. Anyone who uses okSign can do the following:

- Sign up
- Login and Log out
- Login as a demo user
- View, create, delete, and edit the profile the user created.
- Create and edit a question form 
- View, create, edit, and delete messages 
- View and create conversations between users
- View the location of all the users or between two users on Google maps
- Listen to an audio player on each potential matches' profile. 

# Index 

# okSign at a Glance 


 Users can answers a set of 10 personality questions and be matched with other users based on their answers.

<p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640758417/okSign/Screen_Shot_2021-12-28_at_10.13.18_PM_uykgy2.png"/>
</p>

Users can also match with other uses based on horoscope signs.
<p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640758361/okSign/Screen_Shot_2021-12-28_at_10.12.34_PM_n6av3g.png"/>
</p>


 A user can also search for others users based on location, gender, and horoscope sign.
 <p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640758509/okSign/Screen_Shot_2021-12-28_at_10.15.04_PM_jb6lqd.png"/>
</p>

 
 Users can send each other messages 
  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640758587/okSign/Screen_Shot_2021-12-28_at_10.16.22_PM_ntkhbw.png"/>
  </p>
 
 Each potential match has their own profile which displays a map of where the potential match and the current user are. The profile also has a feature that allows a potential match to post a recording to answer the question "A shower thought you recently had." 
  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640758629/okSign/Screen_Shot_2021-12-28_at_10.17.04_PM_rq4fsv.png"/>
  </p>

# Overall Structure

**Back end**
- The back end was created by using Flask as a REST API server and postgreSQL database with user austhentication routes.

**Front end**
- The front end was created by using React, Redux, Flexbox, and Grid. The React front end uses the backend API routes to let a user sign up for an account, log in, and log out.


# Primary Components

**User Authorizaition**

When a user logs in, the API login route will be sent with a request that has the user's email and password. The password that the user utilized to log in is then hashed and compared to the hashed password that is stored in the databse. If these passwords are the same, the user is redirected to the home page. 

  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640760060/okSign/Screen_Shot_2021-12-28_at_10.40.54_PM_pqkikw.png"/>
  </p>
  
