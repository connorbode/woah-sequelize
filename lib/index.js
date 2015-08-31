module.exports = models => {
  var wrapper = {
    sequelize: models.sequelize,
    Sequelize: models.Sequelize
  };

  var applyGenerator = (generator, argz) => {
    var gen = generator.apply(this, argz);

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
          });
      }
    };

    return handle(gen.next());
  };

  wrapper.transaction = function (transactionGenerator) {
    return models.sequelize.transaction((t) => { 
      var argz = [t];

      return applyGenerator(transactionGenerator, argz);
    });
  };

  return wrapper;
};