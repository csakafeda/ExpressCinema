[![LinkedIn-csakafeda][linkedin-shield-csakafeda]][linkedin-url-csakafeda]

# ExpressCinema

![Image](https://github.com/csakafeda/Moodily/assets/105170258/1d596d8c-b033-42d4-bdf8-61fe8aedfb58)

### About the project

This is a little website, where you can reserve seats in an outdoor cinema for your favorite movies.

The projects tasks are:    
You are given a cinema, a room with 2 free seats.
1. Make sure you can book these free seats via the web!
2. Only 1 successful reservation per seat is possible at a time.
3. A user can book 1 or 2 free seats.
4. In case of unsuccessful "payment", the reservation will be released after 2 minutes!
5. Users can see the status of the chairs: "free"; "reserved"; "sold out"
6. After a successful reservation, as payment, please enter the customer's email address and send an email with the following information
After the booking has been successfully made, send an email to the customer's email address to confirm the successful booking and change the status of the chair to "sold"!
(7. When solving the problem, it's not the display that matters, but the simultaneous bookings exclusion of simultaneous bookings)

+ I've done more seats, to be more "cinema like".

### Built With

- [![React][React-badge]][React-url]
- [![Mui][Mui-badge]][Mui-url]
- [![Node.js][Nodejs-badge]][Nodejs-url]
- [![Express.js][Express-badge]][Express-url]
- [![MySQL][MySQL-badge]][MySQL-url]

### Installation

- Clone the repository
- Backend
  - make a mySQL database (note the name, you will need it below)
  - Add environmental variables to the server in a .env file
  ```
  DB_HOST=
  DB_USER=
  DB_PASSWORD=
  DB_DATABASE=

  SENDING_EMAIL=
  EMAIL_PASSWORD=
  ```
  - open server folder in the terminal and run ```npm start```
  - make as many post request as many seats you want to be available this endpoint: http://localhost:8080/api/seats/add_seat (max 30)
- Frontend
  - Open the client folder in the terminal and run ```npm install``` to install the necessary dependencies
  - Run ```npm start``` to start the React server 
- Open **localhost:3000** in your browser to access the application

  ### Plans
- add websocket to handle multiple users
- make unit tests for backend
- rewrite it in nuxt.js 

[linkedin-shield-csakafeda]: https://img.shields.io/badge/-Feodóra%20Bakó-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-csakafeda]: https://www.linkedin.com/in/feodorabako/
[Express-badge]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[React-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react
[React-url]: https://reactjs.org/
[MySQL-badge]: https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Mui-badge]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[Mui-url]: https://mui.com/
[Nodejs-badge]:https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Nodejs-url]: https://nodejs.org/en
