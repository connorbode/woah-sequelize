var woahModel = function (model) {
  return {
    findById: id => {
      console.log('find by id!');
      return model.findById(id);
    },

    findOne: query => {
      console.log('find one!');
      return model.findOne(query);
    },

    findOrCreate: query => {
      console.log('find or create!');
      return model.findOrCreate(query);
    },

    findAndCountAll: query => {
      console.log('find and count all!');
      return model.findAndCountAll(query);
    },

    findAll: query => {
      console.log('find all!');
      return model.findAll(query);
    },

    count: query => {
      console.log('count!');
      return model.count(query);
    },

    max: query => {
      console.log('max!');
      return model.max(query);
    },

    min: query => {
      console.log('min!');
      return model.min(query);
    },

    sum: query => {
      console.log('sum!');
      return model.sum(query);
    },

    create: obj => {
      console.log('create!');
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
    var gen = transactionGenerator.apply(this, arguments);

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

    return models.sequelize.transaction((t) => {
      return handle(gen.next());
    });
  };

  return wrapper;
};