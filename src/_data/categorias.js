const dados = require("./categorias-lista.json");

// Expõe diretamente a lista (array), para os templates continuarem
// usando "categorias" como um array simples: {% for cat in categorias %}
module.exports = dados.categorias;
