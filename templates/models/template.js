const indexModel = (className) => {
    let template = 
`import Sequelize from 'sequelize';

export default  class ${className} extends Sequelize.Model {
  static init(sequelize) {
    return super.init({

    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {   
    db.User.hasMany(db.Domain);
  }
};

`
return template;
}
module.exports = indexModel;