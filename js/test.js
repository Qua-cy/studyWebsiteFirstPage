// 封装函数，简化dom的获取方式

//获取元素
var getEle = function(selector) {
    return document.querySelector(selector);
}

var getAllEle = function(selector) {
    return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element) {
    return element.getAttribute('class');
}

//设置元素样式
var setCls = function(element, cls) {
    return element.setAttribute('class', cls);
}

//为元素添加样式
var addCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + " " + cls);
    }
}

//为元素删除样式
var delCls = function(element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1) {
        setCls(element, baseCls.split(cls).join(" ").replace(/\s+/g, " "));
    }
}

//定义所有需要设置动画的元素，方便后续进行调用
var screenAnimateElements = {
    '.screen-1': [
        '.header',
        '.screen-1_heading',
        '.screen-1_subheading'
    ],
    '.screen-2': [
        '.screen-2_heading',
        '.screen-2_line',
        '.screen-2_subheading',
        '.screen-2_people'
    ],
    '.screen-3': [
        '.screen-3_decorate',
        '.screen-3_heading',
        '.screen-3_line',
        '.screen-3_subheading'
    ],
    '.screen-4': [
        '.screen-4_heading',
        '.screen-4_line',
        '.screen-4_subheading',
        '.screen-4_img_list01',
        '.screen-4_img_list02',
        '.screen-4_img_list03',
        '.screen-4_img_list04'
    ],
    '.screen-5': [
        '.screen-5_img',
        '.screen-5_heading',
        '.screen-5_line',
        '.screen-5_subheading'
    ]
};

//屏蔽所有屏中需要设置动画的元素
var setScreenAnimateInit = function(screenCls) {
    var animateElements = screenAnimateElements[screenCls]; /* 获取每一屏中动画元素的类选择器 */

    for (var i = 0; i < animateElements.length; i++) { /* 循环每一屏中的动画元素的类选择器 */
        var element = getEle(animateElements[i]); /* 获取每一屏动画元素 */
        var baseCls = element.getAttribute('class'); /* 获取该动画元素的原有class属性 */

        setCls(element, baseCls + ' ' + animateElements[i].substr(1) + '_animate_init'); /* 在原有class属性基础上，添加具有_animate_init的类属性 substr(1)表示不需要属性名前面的点，从第二个字符到最后*/
    }
}

// 调用setScreenAnimateInit()函数
window.onload = function() {
    for (k in screenAnimateElements) { /* k为'.screen-1'到'.screen-5'循环 */
        setScreenAnimateInit(k);
    }
}

//播放每一屏动画
var playScreenAnimateDone = function(screenCls) {
    var animateElements = screenAnimateElements[screenCls]; /* 获取每一屏中动画元素的类选择器 */

    for (var i = 0; i < animateElements.length; i++) {
        var element = getEle(animateElements[i]); /* 获取每一屏动画元素 */
        var baseCls = element.getAttribute('class'); /* 获取该动画元素的原有class属性 */

        setCls(element, baseCls.replace('_animate_init', '_animate_done'));
    }
}

// 封装顶部和侧边导航栏的active效果函数
var navItems = getAllEle('.header_nav-item'); /* 获取顶部导航的所有元素项 */
var outLineItems = getAllEle('.outline-item'); /* 获取侧边导航的所有元素项 */
var switchNavItemsActive = function(idx) { /* 封装设置active属性函数，在后续操作滚动条时调用 */
    for (var i = 0; i < navItems.length; i++) {
        delCls(navItems[i], 'header_nav-item_status_active'); /* 遍历所有项，先删掉 active属性*/
    }
    addCls(navItems[idx], 'header_nav-item_status_active'); /* 再给当前的项添加active属性 */

    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i], 'outline-item_status_active');
    }
    addCls(outLineItems[idx], 'outline-item_status_active');
}

//操作滚动条滑动到哪一屏就播放哪一屏,同时导航栏active对应各个屏
window.onscroll = function() {
    var top = Math.round(document.documentElement.scrollTop); /* 获取滚动条高度值 */
    switchNavItemsActive(0); /* 设置初始active导航项 */
    navTip.style.left = 30 + 'px'; /* 设置初始滑动门导航项 */
    if (top >= 80) {
        addCls(getEle('.header'), 'header_status_change'); /* 用于设置header背景颜色的变化 */
        addCls(getEle('.header_logo'), 'header_logo_status_change'); /* 用于设置logo文字颜色的变化 */
        addCls(getEle('.header_nav'), 'header_nav_status_change'); /* 用于设置导航栏文字颜色的变化 */
        addCls(getEle('.outline'), 'outline_status_in'); /* 用于设置侧边导航栏出现和隐藏得动画效果 */
    } else {
        delCls(getEle('.header'), 'header_status_change');
        delCls(getEle('.header_logo'), 'header_logo_status_change');
        delCls(getEle('.header_nav'), 'header_nav_status_change');
        delCls(getEle('.outline'), 'outline_status_in');
    }
    if (top >= 440) {
        switchNavItemsActive(1);
        playScreenAnimateDone('.screen-2');
        navTip.style.left = 94 + 30 + 'px';
        var rocket = getEle('#screen-2_rocket'); /* 此处是当top>=440 时，才给小火箭添加class属性值，从而才能播放动画，主要是控制小火箭动画的进场时间*/
        setCls(rocket, 'screen-2_rocket');
    }
    if (top >= 550 * 2) {
        switchNavItemsActive(2);
        playScreenAnimateDone('.screen-3');
        navTip.style.left = (2 * 94) + 30 + 'px';
        var allCourse = getEle('#screen-3_all-course'); /* 此处是当top>=550*2 时，才给课程添加class属性值，从而才能播放动画，主要是控制课程动画的进场时间*/
        setCls(allCourse, 'screen-3_all-course');
    }
    if (top >= 550 * 3) {
        switchNavItemsActive(3);
        playScreenAnimateDone('.screen-4');
        navTip.style.left = (3 * 94) + 30 + 'px';
    }
    if (top >= 550 * 4) {
        switchNavItemsActive(4);
        playScreenAnimateDone('.screen-5');
        navTip.style.left = (4 * 94) + 30 + 'px';
    }
}

// 默认直接播放第一屏
setTimeout(function() {
    playScreenAnimateDone('.screen-1');
}, 200);

//点击导航栏跳到对应的屏
var setNavJump = function(i, lib) {
    var item = lib[i];
    item.onclick = function() { /* 点击哪一个就跳到哪一屏 */
        document.documentElement.scrollTop = i * 640 - 80;
    }
}
for (var i = 0; i < navItems.length; i++) {
    setNavJump(i, navItems); /* 遍历所有导航项，并调用 */
}
for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i, outLineItems);
}

// 滑动门特效
var navTip = getEle('.header_nav-tip');
var setTip = function(idx, lib) {
    lib[idx].onmouseover = function() {
        navTip.style.left = (94 * idx) + 30 + 'px'; /* 当鼠标移入任意一个导航项，就依靠其索引值来修改navTip的left属性，实现滑动效果 */
        console.log(idx);
    }
    var activeIdx = 0;
    lib[idx].onmouseout = function() { /* 当鼠标移出导航项，先遍历所有导航项，看那个项的class属性值有active，找到后获取其索引值，再用索引值设置left值，使navTip回到有active的导航项中。 */
        for (var i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header_nav-item_status_active') > -1) {
                activeIdx = i;
                break;
            }
        }
        navTip.style.left = (94 * activeIdx) + 30 + 'px';
    }
}

for (var i = 0; i < navItems.length - 1; i++) { /* 遍历导航项，navItems.length-1是为了除掉“即刻学习”，此项不需要滑动门效果 */
    setTip(i, navItems);
}

// 点击“继续了解学习体验”返回顶部
var goTop = getEle('.screen-6_button');
goTop.onclick = function() {
    document.documentElement.scrollTop = 0;
}