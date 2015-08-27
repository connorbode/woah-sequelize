var woahModel = function (model) {
  return {
    findById: id => {
      return model.findById(id);
    },

    findOne: query => {
      return model.findOne(query);
    },

    findOrCreate: query => {
      return model.findOrCreate(query);
    },

    findAndCountAll: query => {
      return model.findAndCountAll(query);
    },

    findAll: query => {
      return model.findAll(query);
    },

    count: query => {
      return model.count(query);
    },

    max: query => {
      return model.max(query);
    },

    min: query => {
      return model.min(query);
    },

    sum: query => {
      return model.sum(query);
    },

    create: obj => {
      return model.create(obj);
    }
  };
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

  wrapper.transaction = function (transactionGenerator) {
    return models.sequelize.transaction((t) => { 
      var argz = [t];
      var gen = transactionGenerator.apply(this, argz);

      var handle = (response, transaction) => {
        var promise = response.value;

        if (response.done) {
          return Promise.resolve();
        }

        else {
          return promise
            .then(result => {
              if (result.done) return;
              return handle(gen.next(result));
            })
            .catch();
        }
      };

      return handle(gen.next());
    });
  };

  return wrapper;
};