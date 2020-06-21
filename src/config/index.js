import { merge } from "lodash";
const env = process.env.NODE_ENV || "development";
const baseConfig = {
  env,
  isLocal: env === "local",
  isDev: env === "development",
  isTesting: env === "testing",
  isProd: env === "production"
};

let envConfig = {};

switch (env) {
  case "local":
    envConfig = require("./local").config;
    break;
  case "development":
    envConfig = require("./dev").config;
    break;
  case "test":
  case "testing":
    envConfig = require("./testing").config;
    break;
  case "production":
    envConfig = require("./prod").config;
    break;
  default:
    envConfig = require("./local").config;
}

export default merge(baseConfig, envConfig);
