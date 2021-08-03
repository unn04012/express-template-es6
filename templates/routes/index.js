const indexRouter = (className = 'Index') => {
    let template = 
`import express from 'express';

export default class ${className}{
    path = '/';        
    router = express.Router();
    constructor(){        
        this.router.get('/', this.index);        
    }
    index = async(req, res, next) => {
        try{              
            res.render('index', {head : 'express template with es6'})
        }catch(err){
            console.error(err);
            next(err);
        }
    }    
}
`
return template;
}


module.exports = indexRouter;
