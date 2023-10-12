# Carallel Web APP

# Introduction

- This document guides you on how to set up this web app project and how to run it.

## Technologies

The following technology stack was used in developing this project:

* Backend: Nest.js, MySQL
* Frontent: Next.js
* API Interceptor : Swagger and Postman

## Requirements

- Create a web-app, using next.js, that lets a user login/signup
- Within the app, create a Resources area, that consists of different articles - provided by a backend API
- Next, implement deep linking capabilities so that when someone opens the link to an article, they are asked to login/signup and then directed to the said article.
- Create back-end apis, using express/node.js or nest.js (preferred), that provide authentication capabilities, creates a jwt token, and validate the token at login and all API calls.
- In addition, maintain a history of all the links a person went to in a db.

# Getting Started

### How to run
- You can run the application locally following below steps.


Step 1:

* clone the repository

```
git clone https://github.com/mithil1610/carallel-exercise.git
```

Step 2:

* Navigate to the main directory:
```
cd /carallel-exercise
```

Step 3:
* Navigate to the carallel-backend
```
cd carallel-backend
```

Step 4:
* To Start backend server install dependency
```
npm install
```

Step 5:
* To start backend server
```
npm run start
```

Step 6:
* Navigate to the carallel-frontend
```
cd carallel-frontend
```

Step 7:
* install frontend dependency
```
npm install
```

Step 8:
* Run the Fronend
```
npm run dev
```

* You can see frontend running here: http://localhost:8080/
