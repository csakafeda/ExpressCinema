[![LinkedIn-csakafeda][linkedin-shield-csakafeda]][linkedin-url-csakafeda]

# ExpressCinema

![Image](https://github.com/csakafeda/Moodily/assets/105170258/2f2b0fac-1180-4335-aaec-a1d208523343)

### About the project

This is a website, where you can reserve seats in an outdoor cinema for your favorit movies.
If someone already selected/bought the seats, you cannot buy that seat for the movie :(

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
  - make as many post request as many seats you want to be available this endpoint: http://localhost:8080/api/seats/add_seat (don't need request body, max 30)
- Frontend
  - Open the client folder in the terminal and run ```npm install``` to install the necessary dependencies
  - Run ```npm start``` to start the React server 
- Open **localhost:3000** in your browser to access the application

### Future plans for the project
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
