"use strict";
const Router = require("koa-router");
const homeController = require("./controllers/home");
const areaController = require("./controllers/area");
//const areaController = require("./controllers/area");

const router = new Router();
router.get("/", homeController.welcome);

//area
router.get("/area", areaController.getAreaInfo);
router.get("/area/tree", areaController.getAreaTreeInfo);
module.exports = router;
