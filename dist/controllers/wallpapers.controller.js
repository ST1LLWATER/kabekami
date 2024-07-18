"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/wallpapers.controller.ts
var wallpapers_controller_exports = {};
__export(wallpapers_controller_exports, {
  getWallpapers: () => getWallpapers
});
module.exports = __toCommonJS(wallpapers_controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWallpapers
});
//# sourceMappingURL=wallpapers.controller.js.map