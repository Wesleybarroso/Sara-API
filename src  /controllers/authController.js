const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('auth', { error: 'Email já registrado', activeTab: 'register' });
    }
    const user = new User({ email, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(400).render('auth', { error: error.message, activeTab: 'register' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).render('auth', { error: 'Credenciais inválidas', activeTab: 'login' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
    req.session.token = token;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).render('auth', { error: error.message, activeTab: 'login' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

exports.renderAuth = (req, res) => {
  res.render('auth', { error: null, activeTab: 'login' });
};

exports.renderDashboard = async (req, res) => {
  res.render('dashboard', { user: req.user });
};
