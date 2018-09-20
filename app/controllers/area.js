"use strict";
module.exports = {
  //获取数据
  getAreaInfo: async ctx => {
    console.log("-------area----------");
    const { Area } = ctx.orm();
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
  },
  batchUpdateHotTrend: async ctx => {
    const { sequelize } = ctx.orm();
    let { topicId, categoryId, langId, list } = ctx.request.body;
    if (
      // 验证参数必填项
      !ctx.res.checkParams(ctx.request.body, [
        "topicId",
        "categoryId",
        "langId",
        "list"
      ])
    ) {
      return;
    }

    //将条件组合成一个临时视图（相当于一个列名为degree和day的表格）
    let tempTable = list
      .map(item => {
        return `
      select '${item.degree}' as degree, '${item.day}' as day
      `;
      })
      .join(" UNION ALL ");
    // select 1和select 2的结果加起来，并且不处理重复项。
    // 比如：select 1返回的是为:1,2,3，select 2返回的值为2,4,5，那么整个这句话返回的值为：1,2,3,2,4,5

    //更新表tbs_dm_bs_out_topic_heat_trend_sec_screen别名a 临时表as b
    //将b的degree批量导入给a表的all_action_count列条件是下面那个
    let sql = `update tbs_dm_bs_out_topic_heat_trend_sec_screen a,(${tempTable}) b
        set a.all_action_count = b.degree 
        WHERE a.type = 'daily_topice_heat_trend_recently'
        AND a.topic_category_id=${categoryId}
        AND a.topic_hash=${topicId}
        AND a.language='${langId}'
        AND a.day= b.day`;
    const result = await sequelize.query(sql); //sequelize执行query语句
    console.log(result);
    ctx.res.ok({}, "success");
  }
};
