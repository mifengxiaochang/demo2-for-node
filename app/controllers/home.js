"use strict";

const pkginfo = require("../../package.json");

/**
 * /:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show API information.
 *     operationId: showApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
exports.welcome = async ctx => {
  console.log("/");
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    author: pkginfo.author
    // record: r,
  };
  console.log(data);
  ctx.res.ok(data, "Hello, API!");
};

exports.showSwaggerSpec = ctx => {
  ctx.body = spec;
};
