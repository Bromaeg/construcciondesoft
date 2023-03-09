const Module = require('../models/module.model');

exports.getModule = (req, res, next) => {
  const cookies = req.get('Cookie') || '';
  let consultas = cookies.split('=')[1] || 0;
  consultas++;

  res.setHeader('Set-Cookie', 'consultas=' + consultas + '; HttpOnly');
  res.render('module', { pageTitle: 'Módulo 1', consultas: consultas });
};

exports.postModule = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Module.findOne({ username: username, password: password })
    .then(module => {
      if (!module) {
        res.redirect('/module');
      } else {
        req.session.isLoggedIn = true;
        req.session.user = module;
        req.session.save(err => {
          console.log(err);
          res.redirect('/module');
        });
      }
    })
    .catch(err => console.log(err));
};
