const appTemplate = 
`import express from 'express';
import nunjucks from 'nunjucks';

export default class App{
  app = express();    
  port;  
  constructor(appConfig){    
    nunjucks.configure('views', { // 폴더 경로
      express: this.app,
      watch: true,
    }); 

    this.port = appConfig.port;        
    this.applySettings(appConfig.settings);
    this.applyMiddlewares(appConfig.middlewares);           
    this.applyRoutes(appConfig.routes);        
    this.app.use(this.notFoundError)
    this.app.use(this.serverError);
  }
  

  applySettings(settings){
    settings.forEach(setting => {
      this.app.set(setting.key, setting.value);
    })
  }

  applyRoutes(routes){
    routes.forEach(route => {          
      this.app.use(route.path, route.router);
    })
  }

  applyMiddlewares(middlewares){
    middlewares.forEach(middleware => {      
      this.app.use(middleware);
    })
  }

  notFoundError = (req, res, next) => {
    const error =  new Error('There is no router');
    error.status = 404;
    next(error);
  }

  serverError = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  }
  

  listen(){
    this.app.listen(this.port, () => {
      console.log(this.port, '번 포트에서 대기중');
    });
  }
}`

module.exports = appTemplate;