const indexCtrl = {};

indexCtrl.renderIndex = (req, res )=> {

    res.render('index');

};

indexCtrl.renderAbout = (req, res) => {

    res.render('../views/partials/about.hbs');

};

module.exports = indexCtrl;