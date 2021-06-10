'use strict';
const redis = require("ioredis");
const lazyRateLimit = {
  get RateLimit() {
    return require('koa2-ratelimit').RateLimit;
  },
};

/**
 * `rate-limiting` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In rate-limiting policy.');
  const message = [
    {
      messages: [
        {
          id: 'Auth.form.error.ratelimit',
          message: 'Too many attempts, please try again in a minute.',
        },
      ],
    },
  ];

  console.log(ctx.request);
  // console.log(redis);
  // await next();

  return lazyRateLimit.RateLimit.middleware(
    Object.assign(
      {},
      {
        interval: 1 * 60 * 1000,
        max: 1,
        prefixKey: `${ctx.request.path}:${ctx.request.ip}`,
        message,
      },
      strapi.plugins['users-permissions'].config.ratelimit
    )
  )(ctx, next);
};

