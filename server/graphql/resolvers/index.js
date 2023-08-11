const authResolvers = require("./auth");
const eventsResolvers = require("./events");
const bookingResolvers = require("./booking");

const rootResolvers = {
  ...authResolvers,
  ...eventsResolvers,
  ...bookingResolvers,
};

module.exports = rootResolvers;
