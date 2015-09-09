![woah-sequelize](http://i.imgur.com/T9jfvdc.jpg)

Writing transactions in [Sequelize](sequelizejs.com) sucks:

```javascript
sequelize.transaction(function (t) {
  return User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, {transaction: t}).then(function (user) {
    return user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, {transaction: t});
  });

}).then(function (result) {
  // Transaction has been committed
}).catch(function (err) {
  // Transaction has been rolled back
});
```
[source](http://docs.sequelizejs.com/en/latest/docs/transactions/)

This library simplifies things:

```javascript
woah.transaction(function * (t) {
  var user = yield User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, { transaction: t });

  yield user.setShooter({
    firstName: 'John',
    lastName: 'Boothe'
  }, { transaction: t });
}).then(function (result) {
  // Transaction has been committed
}).catch(function (err) {
  // Transaction has been rolled back
});
```

## Testing

`npm test` to run tests.

All test cases are written in `spec/spec.js`.
