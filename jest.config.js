module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!troublesome-dependency/.*)"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
