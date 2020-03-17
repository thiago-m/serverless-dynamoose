'use strict';

const Nota = require('./model/nota')

module.exports.hello = async event => {

  let notas = {} 
  
  try {
    notas.list = await Nota.list()
    notas.getId = await Nota.getId('t123')
    notas.count = await Nota.count()

  } catch(e) {
    console.log(e)
    notas.err = e
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        title: 'Tudo OK!',
        notas
        // input: event,
      },
      null,
      2
    ),
  };
};
