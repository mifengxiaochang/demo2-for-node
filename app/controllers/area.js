"use strict";
module.exports = {
  //获取平滑数据
  getAreaInfo: async ctx => {
    console.log("-------area----------");

    if (!Area) {
      ctx.res.fail(4004, "no data");
      return;
    }
    const { citys, parentCodes, code } = ctx.query;
    let query = {};

    if (parentCodes) {
      query.parentCodes = parentCodes;
    }
    if (code) {
      query.code = code;
    }
    if (citys == 1) {
      query.parent = "1";
    } else if (citys == 0) {
      query.parent = { $ne: "1" }; //不等于
    }

    let data = {};
    data = await Area.findAll({
      where: query
    });
    ctx.res.ok(data, "success");
  },
  //获取树形信息
  getAreaTreeInfo: async ctx => {
    const { Area } = ctx.orm();
    const { notNull } = ctx.query;
    let query = {};

    if (notNull) {
      query.mapping = { $ne: null };
    }

    let result = [];
    result = [].concat(
      await Area.findAll({
        where: query,
        raw: true //返回纯数据不带sequelize
      })
    );

    let provinces = result.filter(r => r.parent === "1");
    for (let item of provinces) {
      item.citys = result.filter(r => r.parent == item.code);
    }

    ctx.res.ok(provinces, "success");
  }
};
