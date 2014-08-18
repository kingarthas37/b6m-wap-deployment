(function() {

    /**
     * 调用搜索接口
     * source:数据接口
     * autoClose:点击页面其余位置，自动关闭搜索弹出框
     */
    $('.J-autofill-input').suggestion({
        source: "http://s.b5m.com/mautofill.htm",
        autoClose: true
    });

    /**
     * 点击页面输入框，显示搜索页面
     */
    $('.J-search-trigger').on('click', function() 
    {
        $('.J-search-container').css({'display': 'block'});

        // 搜索页面输入框获得焦点
        $('.J-autofill-input').focus();

        // 搜索页面占满整平
        $('body').css({'position':'relative'});
    });


    $('.J-autofill-input').focus(function()
    {
        var value = this.value;

        if(!value)
        {
            $('.ui-suggestion').hide();
        }
    });

    $('.J-autofill-input').keyup(function()
    {

        var value = this.value;

        if(!value)
        {
            $('.ui-suggestion').hide();
        }else{
            $('.ui-suggestion').show();
        }

    });


    /**
     * 点击回退按钮，隐藏搜索页面，弹出原页面
     */
    $('.J-autofill-back').on('click', function() 
    {
        $('.J-search-container').animate(
        {
            'transform':'translate3d(100%, 0, 0)'
        },800, 'ease-out', function() {
            $('.J-search-container').removeClass('search-container-animate').css({
                'display':'none',
                'transform':'translate3d(0,0,0)'
            });
        });
    });

    window.searchHis = window.searchHis || {
        localStoryageInit: {
            getItem: function(key) {
                var searchHistory = decodeURIComponent(localStorage.getItem(key));

                if (searchHistory === 'null') {
                    searchHistory = '';
                }

                return searchHistory;
            },
            removeItem: function(key) {

                if (!key) {
                    return;
                }

                localStorage.removeItem(key);
            }
        },
        addHis: function() 
        {
            "use strict";

            var _this = this,
                itemHis = _this.localStoryageInit.getItem('SUG-Sharing-History'),
                itemArr = [],
                html = '',
                hisBox = null;

            if (!itemHis) {
                return;
            }

            itemArr = itemHis.split(',');

            html = _this.getHtml(itemArr);

            hisBox = _this.getById('J_searchHistory');

            /**
             * 渲染浏览历史记录
             */

            hisBox.innerHTML = html;

            /**
             * 清除历史记录
             */
            if (html) {
                $('#J_clearHist').on('click', function() {
                    hisBox.remove();
                    _this.removeHis();
                });
            }
        },
        removeHis: function() 
        {
            var _this = this;

            _this.localStoryageInit.removeItem('SUG-Sharing-History');
        },
        getHtml: function(itemArr) 
        {
            "use strict";

            var htmlStr = "",
                url = 'http://s.m.b5m.com/s/search?keyword=';

            htmlStr = '<ul class="autofill-content">';

            for (var i = 0, len = itemArr.length; i < len; i++) {
                htmlStr += '<li><a href="' + url + itemArr[i] + '"><em>' + itemArr[i] + '</em><i></i></a></li>';
            }

            htmlStr += '</ul>';

            htmlStr += '<a href="#" class="clear-hist" id="J_clearHist">清空搜索历史</a>';

            return htmlStr;
        },
        getById: function(id) 
        {
            "use strict";

            if (!id) {
                return;
            }

            return document.querySelector('#' + id);
        }
    }

    /**
     * 搜索历史
     */
    window.searchHis.addHis();
})();
