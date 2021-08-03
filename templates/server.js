const serverTemplate = 
`import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import Index from './routes/Index';

import App from './app';



dotenv.config();

/**
 * DEFINE MODELS
 * @OBJECT
 * name : modelName;
 * value : modelObject
 * 
 * const models = [
    {name : 'User',   value : User},
    {name : 'Domain', value : Domain},
 ];
  
const model = new modelIndex(models);
  



 model.db.sequelize.sync({ force: false })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error(err);
 });
 */

 

/**
 * DEFINE ROUTES
 * @OBJECT
 */
const routes = [    
    new Index(),    
];

/**
 * DEFINE MIDDLEWARES
 */

const middlewares = [    
    express.static(path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({extended: false}),        
]

/**
 * DEFINE SETTINGS FOR express().set
 */

const settings = [
  {key : 'port', value : process.env.PORT || 8002},
  {key : 'view engine', value : 'html'},
]

const appConfig = {
    routes : routes,
    middlewares : middlewares,
    settings : settings,
    port : process.env.PORT || 3000,
};

// CREATE SERVER
new App(appConfig).listen();

`

module.exports = serverTemplate;

