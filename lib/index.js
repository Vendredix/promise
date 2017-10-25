module.exports = function(Promise) {
  require("./thenables")(Promise);
  require("./delay")(Promise);
  require("./each")(Promise);
  require("./every")(Promise);
  require("./filter")(Promise);
  require("./map")(Promise);
  require("./reduce")(Promise);
  require("./some")(Promise);
  require("./spread")(Promise);
  require("./thenables")(Promise);
  require("./defer")(Promise);
};
