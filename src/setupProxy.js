const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8089/api/',
      ws: true,
      changOrigin: true, // 允许跨域
      pathRewrite: {
        '^/api': '', // 请求的时候使用这个api就可以
      },
    }),
  );
};
