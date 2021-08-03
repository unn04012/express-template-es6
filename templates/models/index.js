const indexModel = 
`import Sequelize from 'sequelize';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();
const env = process.env.NODE_ENV || 'development';



export default  class Index {
  db = {};  
  sequelize = new Sequelize(
    config[env].database, config[env].username, config[env].password, config[env],
  );

  constructor(models){            
    this.db.sequelize = this.sequelize;        
    this.migration(models);    
  };

  migration(models){
    this.createModel(models);
    this.init(models);
    this.associate(models);
  }

  createModel(models){
    models.forEach(model => {
      this.db[model.name] = model.value;
    })
  }

  init(models){
    models.forEach(model => {      
      model.value.init(this.sequelize);      
    });
  }
  associate(models){
    models.forEach(model => {
      model.value.associate(this.db);
    })
  } 
} 
`
module.exports = indexModel;