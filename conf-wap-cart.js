var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(),now.getMinutes()].join(''));

fis.config.merge({
    modules : {
        parser : {less : ['less']}
    },

    roadmap : {

        domain:'http://staticcdn.b5m.com',

        ext: {
            less : 'css'
        },

        path : [
            {
                reg : 'map.json',
                release : '/maps/map-wap-cart.json'
            },

            //排除其他fis-conf.js
            {
                reg:/\/conf-[^\.]*\.js/i,
                release:false
            },

            //排除其他html目录
            {
                reg:/\/html\/(?!wap-cart\/)/i,
                release:false
            },

            //排除其他css目录
            {
                reg:/\/css\/(?!wap-cart\/)/i,
                release:false
            },

            //排除其他images目录
            {
                reg:/\/images\/(?!wap-cart\/)/i,
                release:false
            },

            //排除其他js目录
            {
                reg:/\/scripts\/(?!wap-cart\/)/i,
                release:false
            },

            //将css里的pack的图片release到images目录中，并加上版本号
            {
                reg:/\/css\/wap-cart\/([^\/]+\.png)/i,
                release:'/images/wap-cart/$1',
                query: '?t=${timestamp}'
            }
        ]
    },
    settings : {},
    pack : {
        '/css/wap-cart/cart_min.css' : [
            '/css/wap-cart/style.less'
        ],
        '/css/wap-cart/cart_min.js' : [
            '/scripts/wap-cart/cart.js'
        ]
    },
    deploy : {
        test:{
            to:'../../b5mtest'
        },
        build : {
            to : '../../b5m'
        },
        stage : {
            receiver:'http://172.16.11.51/receiver.php',
            to : '/var/web/static'
        },
        prod: {
            receiver:'http://10.10.99.101:8244/receiver.php',
            to : '/opt/webroot/nginx_staticcdn_80'
        }
    }
});
//fis.config.merge({
//    modules : {
//        parser : {less : ['less']}
//    },
//
//    roadmap : {
//        ext: {
//            less : 'css'
//        },
//
//        path : [
//
//            //发布map.json -> map-common.json
//            {
//                reg : 'map.json',
//                release : '/static/maps/map-wap-cart.json'
//            },
//
//            //排除所有conf.js项目配置文件
//            {
//                reg:/\/conf-[^\.]*\.js/i,
//                release:false
//            },
//
//            {
//                reg:/\/b5m\//i,
//                release:false
//            },
//            {
//                reg:/\/node\//i,
//                release:false
//            },
//
//            //排除public目录
//            {
//                reg:/\/public\//i,
//                release:false
//            },
//
//            //只命中/static/html/korea/
//            {
//                reg:/\/static\/html\/(?!wap-cart\/)/i,
//                release:false
//            },
//
//            //只命中/static/css/korea/
//            {
//                reg:/\/static\/css\/(?!wap-cart\/)/i,
//                release:false
//            },
//
//            //只命中/static/scripts/korea/
//            {
//                reg:/\/static\/scripts\/(?!wap-cart\/)/i,
//                release:false
//            },
//
//            //只命中/static/images/korea/
//            {
//                reg:/\/static\/images\/(?!wap-cart\/)/i,
//                release:false
//            },
//
//            //将自动合并图片的文件release到images/相应目录下
//            {
//                reg:/\/static\/css\/wap-cart\/([^\/]+\.png)/i,
//                release:'/static/images/wap-cart/$1'
//            }
//        ]
//    },
//    settings : {},
//    pack : {
//        '/static/css/wap-cart/cart_min.css' : [
//            '/static/css/wap-cart/style.less'
//        ],
//        '/static/css/wap-cart/cart_min.js' : [
//            '/static/scripts/wap-cart/cart.js'
//        ]
//    },
//        deploy : {
//        local : {
//            to : '../b5m'
//        }
//    }
//
//});