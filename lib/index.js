module.exports = models => {
  var wrapper = {
    sequelize: models.sequelize,
    Sequelize: models.Sequelize
  };

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
            });
        }
      };

      return handle(gen.next());
    });
  };

  return wrapper;
};