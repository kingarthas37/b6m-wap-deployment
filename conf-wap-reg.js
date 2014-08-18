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

            //发布map.json -> map-wap-reg.json
            {
                reg : 'map.json',
                release : '/static/maps/map-wap-reg.json'
            },

            //排除其他fis-conf.js
            {
                reg:/\/conf-[^\.]*\.js/i,
                release:false
            },

            //排除其他html目录
            {
                reg:/\/html\/(?!wap-reg\/)/i,
                release:false
            },

            //排除其他css目录
            {
                reg:/\/css\/(?!wap-reg\/)/i,
                release:false
            },

            //排除其他images目录
            {
                reg:/\/images\/(?!wap-reg\/)/i,
                release:false
            },

            //排除其他js目录
            {
                reg:/\/scripts\/(?!wap-reg\/)/i,
                release:false
            },

            //将css里的pack的图片release到images目录中，并加上版本号
            {
                reg:/\/css\/wap-reg\/([^\/]+\.png)/i,
                release:'/images/wap-reg/$1',
                query: '?t=${timestamp}'
            }
        ]
    },
    settings : {},
    pack : {
        '/css/wap-reg/reg_min.css' : [
            '/css/wap-reg/reg.less'
        ],
        '/scripts/wap-reg/reg_min.js' : [
            '/scripts/wap-reg/reg.js'
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