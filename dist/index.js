"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_morgan = __toESM(require("morgan"));
var import_express_session = __toESM(require("express-session"));
var import_memorystore = __toESM(require("memorystore"));
var import_session_file_store = __toESM(require("session-file-store"));

// src/utils/logger.ts
var import_winston = __toESM(require("winston"));
var logger = import_winston.default.createLogger({
  level: "info",
  format: import_winston.default.format.combine(
    import_winston.default.format.timestamp(),
    import_winston.default.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new import_winston.default.transports.Console(),
    new import_winston.default.transports.File({ filename: "error.log", level: "error" }),
    new import_winston.default.transports.File({ filename: "combined.log" })
  ]
});
var logger_default = logger;

// src/middlewares/errorHandler.ts
var errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger_default.error(`Status: ${status}, Message: ${message}, Stack: ${err.stack}`);
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === "production" ? "\u{1F95E}" : err.stack
  });
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// src/controllers/wallpapers.controller.ts
var import_joi = __toESM(require("joi"));
var getWallpapers = catchAsync(async (req, res) => {
  const { value, error } = import_joi.default.object({
    limit: import_joi.default.number().required(),
    offset: import_joi.default.number().required()
  }).validate(req.query);
  if (error) {
    throw error;
  }
  const { limit, offset } = value;
  res.json({ limit, offset });
});

// src/routes/wallpapers.ts
var import_express = require("express");
var router = (0, import_express.Router)();
router.get("/all", getWallpapers);
var wallpapers_default = router;

// src/routes/index.ts
var routers = [
  {
    router: wallpapers_default,
    path: "/api/wallpapers"
  }
];
var routes_default = routers;

// src/app.ts
var app = (0, import_express2.default)();
var MemoryStore = (0, import_memorystore.default)(import_express_session.default);
var SessionFileStore = (0, import_session_file_store.default)(import_express_session.default);
if (process.env.NODE_ENV === "development")
  app.use(
    (0, import_cors.default)({
      origin: [process.env.APP_URL || "localhost:3000"],
      credentials: true
    })
  );
app.use((0, import_morgan.default)("dev"));
app.use((0, import_express2.json)());
app.use(
  (0, import_express_session.default)({
    cookie: {
      maxAge: parseInt(
        process.env.SESSION_COOKIE_MAX_AGE || (84e3 * 1e3).toString()
      ),
      sameSite: "lax",
      secure: "auto"
    },
    store: (
      // using file store for development because memory store gets cleared every time app restarts
      process.env.NODE_ENV === "development" ? new SessionFileStore({
        path: ".session"
      }) : new MemoryStore({
        checkPeriod: parseInt(
          process.env.SESSION_COOKIE_MAX_AGE || (84e3 * 1e3).toString()
        )
      })
    ),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || process.env.SECRET || "kabekami"
  })
);
routes_default.forEach(({ router: router2, path }) => {
  if (path) {
    app.use(path, router2);
  } else app.use(router2);
});
app.use(errorHandler);
var app_default = app;

// src/index.ts
if (process.env.NODE_ENV !== "production")
  import("dotenv").then(({ config }) => config());
var { PORT = 5e3 } = process.env;
var server = app_default.listen(
  PORT,
  () => console.log(`Server started on http://localhost:${PORT}`)
);
var onCloseSignal = () => {
  logger_default.info("sigint received, shutting down");
  server.close(() => {
    logger_default.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 1e4).unref();
};
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
//# sourceMappingURL=index.js.map