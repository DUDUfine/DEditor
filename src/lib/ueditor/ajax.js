function ajaxObject() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
    return xmlHttp;
};

function set(obj) {

    var str = [];
    for (var p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }

    return str.join('&');
};

// ajax post请求：
function ajax(option) {

    if (typeof(option) !== 'object') {
        return
    } else {

        if (typeof(option.url) !== 'string') {
            return
        }

        if (typeof(option.success) !== 'function') {
            return
        }

    }

    var url = option.url || '',
        data = set(option.data || {}),
        method = option.method || 'post',
        header = option.header || {},
        fnSucceed = option.success,
        fnFail = option.error || function() {};

    var ajax = ajaxObject();
    ajax.open(method, url, true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    
    // 遍历header
    for (var key in header) {
        ajax.setRequestHeader(key, header[key]);
    }

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                fnSucceed(JSON.parse(ajax.responseText));
            } else {
                fnFail("HTTP请求错误！错误码：" + ajax.status);
            }
        }
    }
    ajax.send(data);
};

export default ajax;