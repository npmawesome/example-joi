var Joi = require('joi');
var schema;

function log(err, value) {
  value = JSON.stringify(value);

  if (err) {
    console.log('\033[41mFAILED\033[49m ' + value + ' - ' + JSON.stringify(err, null, 2));
  } else {
    console.log('\033[42mOK\033[49m ' + value);
  }
  console.log('\n\n');
}

// most basic example
Joi.string().validate(10, log);
Joi.string().email().validate('hello+gmail.com', log);
Joi.string().email().validate('hello+world@gmail.com', log);

// more complex example
schema = {counter: Joi.number().min(1).max(10).required()};

Joi.validate({counter: 0}, schema, log);
Joi.validate({counter: 5}, schema, log);

// even more complex example
schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    confirmation: Joi.ref('password')
  })
  .with('password', 'confirmation')
  ;

Joi.validate({invalidProperty: 1}, schema, log);
Joi.validate({username: 'alex', password: 'qwerty'}, schema, log);
Joi.validate({username: 'alex', password: 'qwerty', confirmation: 'qwerty'}, schema, log);
