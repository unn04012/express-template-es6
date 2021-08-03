[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)
# Installation
```
> npm install -g express-template-es6
```
## Initialization
```
> estemplate init
```
## Make Router
```
> estemplate make router [routername]
```
## Make Model
```
> estemplate make model [modelname]
```

# Usage
This app is es6 based, so it runs on an es6 environment base.

Install the necessary modules before opening the server.
```
> npm i express dotenv nunjucks
```
This module is using a sequelize module and must first enter a value in `/config/config.json` to connect to the database.

The model, router, and middleware settings are set in server.js.
## model
```
import User from './models/user';
import User from './models/domain';

const models = [
  {name : 'User',   value : User},
  {name : 'Domain', value : Domain},
];
const model = new modelIndex(models);
```
## router
```
import Index from './routes/';
const routes = [    
    new Index(),    
];
```
## middleware
```
const middlewares = [
    morgan('dev'),
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({extended: false}),
    cookieParser(process.env.COOKIE_SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
            }
    }),     
    passport.initialize(),
    passport.session(), 
]
```
## setting
Set the existing express.set() function to key and value.
```
const settings = [
  {key : 'port', value : process.env.PORT || 8002},
  {key : 'view engine', value : 'html'},
]
```
## start server
```
const appConfig = {
    routes : routes,
    middlewares : middlewares,
    settings : settings,
    port : process.env.PORT || 3000,
};


new App(appConfig).listen();
```