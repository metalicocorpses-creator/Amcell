module.exports = function (eleventyConfig) {
  // Copia arquivos estáticos direto para o site final, sem processar
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  // O painel admin (Decap CMS) fica fora de src/ para não ser processado
  // como template — é copiado direto para /admin/ no site final.
  eleventyConfig.addPassthroughCopy({ "admin-src": "admin" });

  // Coleção de produtos (lê todos os .md dentro de src/produtos)
  eleventyConfig.addCollection("produtos", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/produtos/*.md");
  });

  // Coleção de posts do blog (lê todos os .md dentro de src/blog)
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort(function (a, b) {
      return new Date(a.data.data) - new Date(b.data.data);
    });
  });

  // Filtro para formatar preço em Real (ex: 39.9 -> "39,90")
  eleventyConfig.addFilter("preco", function (valor) {
    if (valor === undefined || valor === null) return "";
    return Number(valor).toFixed(2).replace(".", ",");
  });

  // Filtro para formatar data (ex: "2026-05-12" -> "12 de maio de 2026")
  // Aceita tanto string "YYYY-MM-DD" quanto objeto Date (o Decap CMS salva como Date)
  function partesData(valor) {
    let d;
    if (valor instanceof Date) {
      d = valor;
    } else {
      const [ano, mes, dia] = String(valor).split("-").map(Number);
      d = new Date(Date.UTC(ano, mes - 1, dia));
    }
    return { dia: d.getUTCDate(), mes: d.getUTCMonth(), ano: d.getUTCFullYear() };
  }

  eleventyConfig.addFilter("dataLonga", function (valor) {
    if (!valor) return "";
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const { dia, mes, ano } = partesData(valor);
    return `${dia} de ${meses[mes]} de ${ano}`;
  });

  eleventyConfig.addFilter("dataCurta", function (valor) {
    if (!valor) return "";
    const mesesAbrev = [
      "jan", "fev", "mar", "abr", "mai", "jun",
      "jul", "ago", "set", "out", "nov", "dez"
    ];
    const { dia, mes, ano } = partesData(valor);
    return `${dia} ${mesesAbrev[mes]} ${ano}`;
  });

  // Slugify simples para gerar URLs a partir do nome do produto/artigo
  eleventyConfig.addFilter("slug", function (texto) {
    if (!texto) return "";
    return texto
      .toString()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  // Link do WhatsApp com mensagem pré-preenchida a partir do nome do produto
  eleventyConfig.addFilter("linkWhatsapp", function (nomeProduto, numero) {
    const num = numero || "5511999999999";
    const texto = `Olá! Tenho interesse no produto: ${nomeProduto}. Pode me ajudar?`;
    return `https://wa.me/${num}?text=${encodeURIComponent(texto)}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
