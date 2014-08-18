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
                release : '/maps/map-wap-www.json'
            },

            //排除其他fis-conf.js
            {
                reg:/\/conf-[^\.]*\.js/i,
                release:false
            },

            //排除其他html目录
            {
                reg:/\/html\/(?!wap-www\/)/i,
                release:false
            },

            //排除其他css目录
            {
                reg:/\/css\/(?!wap-www\/)/i,
                release:false
            },

            //排除其他images目录
            {
                reg:/\/images\/(?!wap-www\/)/i,
                release:false
            },

            //排除其他js目录
            {
                reg:/\/scripts\/(?!wap-www\/)/i,
                release:false
            },

            //将css里的pack的图片release到images目录中，并加上版本号
            {
                reg:/\/css\/wap-www\/([^\/]+\.png)/i,
                release:'/images/wap-www/$1',
                query: '?t=${timestamp}'
            }
        ]
    },
    settings : {},
    pack : {
        '/css/wap-www/wap-www_min.css' : [
            //'/css/wap-www/wap-www.less',
            '/css/wap-www/special-sale.less',
            '/css/wap-www/search_list.less',
            '/css/wap-www/theme.less',
            '/css/wap-www/index-v2.less'
        ],
        '/css/wap-www/wap-detail_min.css':[
            '/css/wap-www/wap-www.less'
        ],
        '/scripts/wap-www/wap-detail_min.js' : [
            '/scripts/wap-www/wap-detail.js',
            '/scripts/wap-www/wap-www.js'
        ]
    },
    deploy : {
		wuchen:{
				to:'C:/xampp/htdocs/b5m-web-frontpage/b5m'
			},
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