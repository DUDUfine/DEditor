function setAttr(elem, key, val) {
    elem.setAttribute(key, val);
    return elem;
}

function getAttr(elem, key) {
    return elem.getAttribute(key);
}

function hasClass(elem, cls) {
    //将要检查的类名selector赋值给className, l为选择器选择的当前要检查的jQuery对象数组的长度。
    var className = " " + cls + " ";
    if (elem.nodeType === 1 && (" " + elem.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(className) >= 0) {
        return true;
    }
    return false;
}

function addClass(elem, cls) {
    if (elem.className) {
        // 解析当前 className 转换为数组
        let arr = elem.className.split(/\s/);
        arr = arr.filter(function(item) {
            return !!item.trim();
        });
        // 添加 class
        if (arr.indexOf(cls) < 0) {
            arr.push(cls);
        }
        // 修改 elem.class
        elem.className = arr.join(' ');
    } else {
        elem.className = cls;
    }

    return elem;
}

function removeClass(elem, cls) {
    if (elem.className) {
        // 解析当前 className 转换为数组
        let arr = elem.className.split(/\s/);
        arr = arr.filter(function(item) {
            item = item.trim();
            // 删除 class
            if (!item || item === cls) {
                return false;
            }
            return true;
        });
        // 修改 elem.class
        elem.className = arr.join(' ');
    }

    return elem;
}


export default {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    setAttr: setAttr,
    getAttr: getAttr
}