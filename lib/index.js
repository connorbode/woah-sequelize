var woahModel = function (model) {

};

module.exports = models => {
  var wrapper = {};
  wrapper._models = models;
  Object.keys(models).forEach(key => {
    if (key === 'sequelize' || key === 'Sequelize') {
      wrapper[key] = models[key];
    } else {
      wrapper[key] = woahModel(models[key]);
    }
  });
};