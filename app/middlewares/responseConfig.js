"use strict";

/**
 * HTTP Status codes
 */
const statusCodes = {
  CONTINUE: 100,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  // COUNT_FULL: 205,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIME_OUT: 504
};

/** 自定义的错误码，方便客户端做国际化　*/
const customCodes = {
  STADAND: 4000, // 一般性错误
  OVER_LIMIT: 4001, // 超出数据数据限制
  MISSING_PARAM: 4002, // 参数缺失
  DATA_EXIST: 4003, // 数据已经存在，不能重复操作
  NO_DATE: 4004 // 尝试操作不存在的数据
};

const responseConfig = () => {
  return async (ctx, next) => {
    ctx.res.statusCodes = statusCodes;
    ctx.statusCodes = ctx.res.statusCodes;

    ctx.res.success = (data = null, message = null) => {
      ctx.status = ctx.status < 400 ? ctx.status : statusCodes.OK;
      ctx.body = {
        status: "success",
        code: 200,
        data,
        message
      };
    };

    ctx.res.fail = (
      code = customCodes.STADAND,
      message = null,
      data = null
    ) => {
      ctx.status = 200; // 错误用200状态码返回
      ctx.body = {
        status: "fail",
        code,
        data,
        message
      };
    };

    ctx.res.ok = (data, message) => {
      ctx.status = statusCodes.OK;
      ctx.res.success(data, message);
    };

    await next();
  };
};

module.exports = responseConfig;
