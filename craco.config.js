const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@pages": "./src/pages",
          "@config": "./src/config",
          "@components": "./src/components",
        },
      },
    },
  ],
};
