<p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640812067/okSign/Screen_Shot_2021-12-29_at_1.07.40_PM_gknpnx.png"/>
</p>

# Summary 
[okSign](https://oksign-kelseysry.herokuapp.com/login) is a dating app based off of okCupid. Users can match with other users by answering questions or by horoscope signs. okSign was created by using React, Redux, Flask, Docker, and PostgreSQL. Anyone who uses okSign can do the following:

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
- [Database Schema](https://github.com/kelseysry/okSign/wiki/Database-Schema)
- [Feature list](https://github.com/kelseysry/okSign/wiki/Feature-List)
- [Wireframes](https://github.com/kelseysry/okSign/wiki/Wireframe)
- [User Stories](https://github.com/kelseysry/okSign/wiki/User-Stories)

# Overall Structure

**Back end**
- The back end was created by using Flask as a REST API server and postgreSQL database with user austhentication routes.

**Front end**
- The front end was created by using React, Redux, Flexbox, and Grid. The React front end uses the backend API routes to let a user sign up for an account, log in, and log out.

**Libraries**
- React
- Redux
- Flask
- cors - Cross-Origin Resource Sharing
- google-map-react
- react-google-maps/api
- react-h5-audio-player
- Validator.js 


# Primary Components

## User Authorizaition

When a user logs in, the API login route will be sent with a request that has the user's email and password. The password that the user utilized to log in is then hashed and compared to the hashed password that is stored in the databse. If these passwords are the same, the user is redirected to the home page. 

  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643597151/okSign/Screen_Shot_2022-01-30_at_6.45.23_PM_f9ssub.png"/>
  </p>
  
## Questions Page 
 Users can answers a set of 10 personality questions and be matched with other users based on their answers on the Discover page. Users can also edit their answers. 
 
<p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643597213/okSign/Screen_Shot_2022-01-30_at_6.46.43_PM_j1rncs.png"/>
</p>

## Discover Page 

<!-- <img src="https://res.cloudinary.com/mabmab/image/upload/v1643599306/okSign/okSignGif3_z7kkds.gif" width="250" height="250"/>
 -->
<!-- <p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643598393/okSign/okSignGif_bnjgjk.gif"/>
</p> -->

## Horoscope Page 
Users can also match with other uses based on horoscope signs.
<p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643597461/okSign/Screen_Shot_2022-01-30_at_6.48.24_PM_suxobo.png"/>
</p>

## Search Feature 
 A user can also search for others users based on location, gender, and horoscope sign.
 <p align="center" width="80%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643597573/okSign/Screen_Shot_2022-01-30_at_6.48.54_PM_v51gt9.png"/>
</p>

 ## Messages 
 Users can send each other messages 
  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643597578/okSign/Screen_Shot_2022-01-30_at_6.49.47_PM_rwxwdn.png"/>
  </p>
 
 ## Match Profile
 Each potential match has their own profile which displays a map of where the potential match and the current user are. The profile also has a feature that allows a potential match to post a recording to answer the question "A shower thought you recently had." 
  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1643597581/okSign/Screen_Shot_2022-01-30_at_6.50.18_PM_mgrsro.png"/>
  </p>

## Technical Implementation Details 
Surprisngly, implementing the Google Maps API was the most challenging part of the project even though I had already implemented Google Maps on an Express backend. Google maps was rendering fine on localhost but when deployed to Heroku, I would get an error saying my API key didn't exist. I tried fetching the API key from the backend and the frontend in order to get around this. How I ended up fixing this was to grab the key from the backend via a useEffect and then storing the key in a useState. The important step is to grab the key in a component that is holding the map component. You don't want the map component to grab the key or else you'll get the "loader should not be called with diff options error." So then when you actually render the map component in the component that's holding it, you want to write a ternary statement that checks for the key first and then renders the map.
  <p align="center" width="50%">
  <img src="https://res.cloudinary.com/mabmab/image/upload/v1640762015/okSign/Screen_Shot_2021-12-28_at_11.13.29_PM_cwo6yg.png"/>
  </p>

# To-dos
- [ ] like count feature 

# Instructions on How to Install okSign app 
1. run git clone
2. Install dependencies in pipfile for development. Dockerfile is for production.

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
5. To generate a MAPS_API_KEY you must use your google account. 
    1. Go to [Google Cloud console](https://console.cloud.google.com/)
    2. Click `Select a Project` and then click on `New Project`. Pick a name for the project and put the location as `No Organization` then click `create`
    ![step1](https://res.cloudinary.com/mabmab/image/upload/v1636849102/khmer_food/step1_ggni4z.png)
    3. Click `APIs & Services` in the side navigation bar and then click `Credentials`. After that, click `Create credentials` and then choose `API KEY`.
    4. With your new API key, click `Restrict key`. After that rename the API KEY and then click the following APIS (Directions, Distance Matrix, Geocoding, Maps Javascript Places). 
       <p align="center" width="50%">
      <img src="https://res.cloudinary.com/mabmab/image/upload/v1640762537/okSign/Screen_Shot_2021-12-28_at_11.22.08_PM_hokvpc.png"/>
      </p>
    6.  Don't forget to click `Restrict Key`
    7.  Add your API key to the .env file.
6. Get into your pipenv, migrate your database, seed your database, and run your flask app
- the migrations folder is already created so don't need to run `flask db init`
- migration already generated too with a user table so don't need to run `flask db migrate`

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. cd into react-app and then run npm install. After installing, you can run npm start 
