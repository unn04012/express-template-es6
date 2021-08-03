#! /usr/bin/env node
const appTemplate = require('./templates/app');
const serverTemplate = require('./templates/server');
const viewTemplate=  require('./templates/views/');
const errorTemplate=  require('./templates/views/error');
const routerTemplate = require('./templates/routes');
const modelTemplate = require('./templates/models/template');
const modelInit = require('./templates/models');
const {program} = require('commander');
const chalk = require('chalk');

const fs = require('fs');
const path = require('path');

const exist = (dir) => { // 폴더 존재 함수
    try {
      fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (e) {
      return false;
    }
};

const mkdirp = (dir) => { // 경로 생성 함수
    const dirname = path
      .relative('.', path.normalize(dir))
      .split(path.sep)
      .filter(p => !!p);
    dirname.forEach((d, idx) => {
      const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
      if (!exist(pathBuilder)) {
        fs.mkdirSync(pathBuilder);
      }
    });
  };

const makeTemplate = (type, name) => {    
    if (type === 'router') {
      if(!exist('./routes')) mkdirp('./routes');      
      const pathToFile = path.join('./routes', `${name}.js`);
      if (exist(pathToFile)) {
        console.error(chalk.bold.red('The file already exists'));
      } else {
        fs.writeFileSync(pathToFile, routerTemplate(name));
        console.log(chalk.green(pathToFile, 'created successfully'));
      }
    } else if (type === 'model') {
      if(!name) console.error(chalk.bold.red('Please enter a file name'));
      const pathToFile = path.join('./models', `${name}.js`);
      if (exist(pathToFile)) {
        console.error(chalk.bold.red('The file already exists'));
      } else {
        fs.writeFileSync(pathToFile, modelTemplate(name));
        console.log(chalk.green(pathToFile, 'created successfully'));
      }
    } else {
      console.error(chalk.bold.red('Enter either model or router.'));
    }
  };

const init = () => {
    const config = [
        {dir : './', name : 'app.js', template : appTemplate},
        {dir : './', name : 'server.js', template : serverTemplate},
        {dir : './views',name : 'index.html',  template : viewTemplate},
        {dir : './views',name : 'error.html',  template : errorTemplate},
        {dir : './routes',name : 'index.js',  template : routerTemplate()},
        {dir : './models',name : 'index.js',  template : modelInit},
    ];
    config.forEach(element => {
        const elementPath = path.join('.', path.normalize(element.dir));        
        const elementFilePath = path.join(elementPath, element.name);        
        if(exist(elementFilePath)){
            console.error(chalk.bold.red(`${elementFilePath} file already exists`));
        }else{            
            if(!exist(elementPath)) fs.mkdirSync(elementPath);
            fs.writeFileSync(elementFilePath, element.template);
            console.log(chalk.green(element.dir, 'created successfully'));
        }
    })
}

  program
  .version('1.0.0', '-v, --version')
  .name('es6-template');

program
  .command('make <type> <filename>')  
  .description('create template.')  
  // .option('-t, --type [type]', 'Please enter a type.', '')
  // .option('-f, --filename [filename]', 'Please enter a file name', 'index')
  .action((type, filename) => {
    makeTemplate(type, filename);
  });

  program
  .command('init')     
  .description('initialize es6 template.')   
  .action(() => {
    init()
  });

program
  .command('*' , {noHelp : true})
  .action(() => {
      console.log('The command could not be found.');
      program.help()
  });

program.parse(process.argv);