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
                release : '/maps/map-wap-center.json'
            },

            //排除其他fis-conf.js
            {
                reg:/\/conf-[^\.]*\.js/i,
                release:false
            },

            //排除其他html目录
            {
                reg:/\/html\/(?!wap-center\/)/i,
                release:false
            },

            //排除其他css目录
            {
                reg:/\/css\/(?!wap-center\/)/i,
                release:false
            },

            //排除其他images目录
            {
                reg:/\/images\/(?!wap-center\/)/i,
                release:false
            },

            //排除其他js目录
            {
                reg:/\/scripts\/(?!wap-center\/)/i,
                release:false
            },

            //将css里的pack的图片release到images目录中，并加上版本号
            {
                reg:/\/css\/wap-center\/([^\/]+\.png)/i,
                release:'/images/wap-center/$1',
                query: '?t=${timestamp}'
            }
        ]
    },
    settings : {},
    pack : {
        '/css/wap-center/center_min.css' : [
            '/css/wap-center/index.less'
        ],
        '/scripts/wap-center/center_min.js' : [
            '/scripts/wap-center/wap-center.js'
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
