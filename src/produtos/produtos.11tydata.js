module.exports = {
  permalink: function (data) {
    return `/produtos/${data.page.fileSlug}/index.html`;
  },
  eleventyComputed: {
    titulo: (data) => data.nome,
    descricao: (data) => data.descricaoResumo
  }
};
