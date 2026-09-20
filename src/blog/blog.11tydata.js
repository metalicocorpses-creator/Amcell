module.exports = {
  permalink: function (data) {
    return `/blog/${data.page.fileSlug}/index.html`;
  },
  eleventyComputed: {
    titulo: (data) => data.titulo,
    descricao: (data) => data.resumo
  }
};
