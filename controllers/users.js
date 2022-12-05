const User = require('../models/user');

// REGISTER CONTROLLERS
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

//LOGIN CONTROLLERS
module.exports.renderLogin = (req, res) => {
    if (req.query.returnTo) {
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success', 'Farewell!');
        res.redirect('/campgrounds');
    });
}