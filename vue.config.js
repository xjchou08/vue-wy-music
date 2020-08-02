 'use strict'
const path = require('path')

function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports = {
    // public: '/',
    outputDir: 'dist',
    // baseURL: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,
        proxy: {
            '/api':{
                target:'https:autumnfish.cn',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
}


