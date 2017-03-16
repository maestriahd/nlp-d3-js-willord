// importa librerias necesarias
const express = require('express');
const router = express.Router();
// libreria de procesamiento de lenguaje natural
const nlp = require('compromise');
// textos de prueba
const corpus = require('nlp-corpus');

/* GET home page. */
router.get('/', function(req, res) {
  // obtiene un texto aleatorio de discursos presidenciales
  var txt = corpus.sotu.random();

  // entrega el texto al motor de NLP
  var r = nlp(txt);
  // extrae las personas del texto
  var people = r.people();
  // limpia un poco el texto
  people.normalize();
  // ordena el resultado por frecuencia
  people.sort('frequency').unique();

  // extrae los sustantivos
  var nouns = r.nouns();

  // hace el render de la vista entregando el texto, la lista de personas
  // y sustantivos
  res.render('nlp', {
    txt: txt,
    people: {
      list: people.list,
      length: people.list.length
    },
    nouns: {
      list: nouns.list,
      length: nouns.list.length
    }
    });
});

module.exports = router;
