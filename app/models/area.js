'use strict';
module.exports = (sequelize, DataTypes) => {
  // 媒体资源表，存储图片，音频，视频的基本信息
  const Area = sequelize.define('Area', {
    code: { type: DataTypes.STRING(100),comment:'地市编码' }, // 媒体类型
    pt: { type: DataTypes.STRING(100), comment: '葡语名称' },
    zh: { type: DataTypes.STRING(100), comment: '汉语名称',},
    parent: { type: DataTypes.STRING(100), comment: '父级地市编码' },
    mapping: { type: DataTypes.STRING(100), comment: '映射gis区域名称' },
  }, {
      tableName: 'dim_area', //媒体资源表
      underscore: true,
    });
  Area.sync();
  return Area;
};
