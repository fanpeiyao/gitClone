/**
    S3JS 工银聚项目开发独立应用的核心库
 */
"use strict";
var S3,s3;
s3 = S3 = (function ($) {
    //工具箱依赖于jquery
    if ($ === null){
        throw new ReferenceError("s3js needs jquery,but not found.");
    }

    var S3 = {};
    if(typeof _ != 'undefined'){
        S3 = _.noConflict();
    }
    var VERSION = "1.2.8";

    /**
     * 判断是否数组
     */
    if(!S3.isArray){
        S3.isArray = Array.isArray || function (obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';};
    }

    /**
     * 是否是类数组的结构
     * @param obj
     * @returns {boolean}
     * */
    if(!S3.isArrayLike){
        S3.isArrayLike = function(obj){
            return !!(S3.isArray(obj) || obj.length);
        };
    }
    
    /**
     *
     * @param str
     * @returns {*|{dist}|XML|{example, overwrite, disable_template_processing}|void|string}
     */
    var trim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };

    if(!String.prototype.trim){
        String.prototype.trim = function(){
            return trim(this);
        };
    }

    /**
     * 迭代器，用来兼容IE8-的数组迭代
     * @returns {boolean}
     * @param array
     * @param fn
     */
    var forEach = function(array,fn) {
        if(S3.isArrayLike(array)){
            var i;
            for(i=0;i<array.length;i++){
                fn(array[i],i)
            }
        }else{
            throw new Error('请传入正确的参数');
        }
    };
    if(!Array.prototype.forEach){
        Array.prototype.forEach = function(fn){
            return forEach(this,fn);
        }
    }

    /**
     *
     * @param array
     * @param fn
     * @returns {Array}
     */
    var filter = function(array,fn){
        if(S3.isArrayLike(array)){
            var newAry = [];
            for(var i = 0;i<array.length;i++){
                if(fn(array[i]),i)
                    newAry.push(array[i]);
            }
            return newAry;
        }
    };
    if(!Array.prototype.filter){
        Array.prototype.filter = function(fn){
            return filter(this,fn);
        }
    }
    /**
     * 数组函数，对每一个元素执行fn 只要一个返回真，则为真
     * @param array
     * @param fn
     * @returns {boolean}
     */
    var some = function(array,fn){
        if(S3.isArrayLike(array)){
            var i;
            for(i=0;i<array.length;i++){
                if(fn(array[i],i))
                    return true;
            }
            return false;
        }else{
            throw new Error('请传入正确的参数');
        }
    };
    if(!Array.prototype.some){
        Array.prototype.some = function(fn){
            return some(this,fn);
        }
    }

    /**
     * 数组函数，对每一个元素执行fn 只要一个返回真，则为真
     * @param array
     * @param fn
     * @returns {boolean}
     */
    var every = function(array,fn){
        if(S3.isArrayLike(array)){
            var i;
            for(i=0;i<array.length;i++){
                if(!fn(array[i],i))
                    return false;
            }
            return true;
        }else{
            throw new Error('请传入正确的参数');
        }
    };
    if(!Array.prototype.every){
        Array.prototype.every = function(fn){
            return every(this,fn);
        }
    }

    /**
     * 重定义array.map
     * @param array
     * @param fn
     * @returns {Array}
     */
    var map = function(array,fn){
        if(S3.isArrayLike(array)){
            var newAry = [];
            for(var i =0;i<array.length;i++){
                newAry.push(fn(array[i],i));
            }
            return newAry;
        }else{
            throw new Error('请传入正确参数');
        }
    };
    if(!Array.prototype.map){
        Array.prototype.map = function(fn){
            return map(this,fn);
        }
    }

    S3.version = function(){return VERSION;};
    return S3;
})(jQuery);
/**
 * ajax.js 实现ajax调用，综合原coresupport.js和core.js
 * Created by zjfh-chent on 2016/8/4.
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){
        var submitUrl;
        var CoreSupport = {};
        CoreSupport.dataSetIdList = "__ids";
        CoreSupport.dataSetParams = "__params";
        CoreSupport.treatParams = function(params, paramMap){
            if(paramMap == undefined)
                paramMap = {};
            if(typeof(params) === "string"){
                var pary = params.split('&');
                for(var i = 0,len = pary.length; i < len; i++){
                    if(pary[i] === null || pary[i] === '')
                        continue;
                    var tary = pary[i].split('='),
                        key = tary[0].trim(),
                        val = tary[1];
                    if(key.length === 0)
                        continue;
                    paramMap[key] = val;
                }
            }else if(typeof(params) === "object"){
                for(var key in params){
                    paramMap[key] = params[key];
                }
            }
            return paramMap;
        };

        /**
         * ajax方法，通用
         * @param {String} id
         * @param {String} paramStr
         * @param {String} appid
         * @param {String} async
         *  @param {String} method
         */
        var ajax = function(id,paramStr,appid,async,method){
            paramStr = paramStr || "";
            appid = appid || "s3Core";
            async = async || false;      //true为异步
            method = method || "POST";
            var submitUrl = getURL(),
                headers = {};
            try{
                headers.Token = token;
            }catch(e){
                headers = {};
            }
            if(!submitUrl)
                return undefined;
            var paramObj = CoreSupport.treatParams(paramStr);
            paramStr = CoreSupport.dataSetIdList + '=' + encodeURIComponent(id) + '&' + CoreSupport.dataSetParams + '=' + encodeURIComponent(JSON.stringify(paramObj)) + '&__appId=' + encodeURIComponent(appid) + '&__code=' + encodeURIComponent("");
            if(async){
                var defer = $.Deferred();
                $.ajax({
                    type: method,
                    url: submitUrl,
                    async: async,
                    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                    data:paramStr,
                    dataType: "html",
                    headers:headers,
                    cache:false,
                    timeout:10000,
                    success: function (ajaxData) {
                        try{
                            var retData =  JSON.parse(ajaxData);
                            if(retData["ESPRESSO_RETURN_VERSION"]){
                                if(retData.status === "001"||retData.status === "002"||retData.status === "003"){
                                    retData.retCode = '400';
                                }else
                                    retData = retData.data;
                            }
                            defer.resolve(retData);
                        }catch(e){
                            defer.resolve({
                                status:"400",
                                retCode:"400",
                                retMsg:ajaxData
                            });
                            throw new Error(ajaxData);
                        }
                    },
                    error: function(xhr,status,error){
                        defer.resolve({
                            status:"400",
                            retCode:"400",
                            retMsg:error.message != undefined ? error.message : error
                        });
                        throw new Error(error.message != undefined ? error.message : error);
                    }
                });
                return defer.promise();
            }else{
                var result;
                $.ajax({
                    type: method,
                    url: submitUrl,
                    async: async,
                    contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                    data:paramStr,
                    dataType: "html",
                    headers:headers,
                    cache:false,
                    timeout:10000,
                    success: function (ajaxData) {
                        try{
                            var retData =  JSON.parse(ajaxData);
                            if(retData["ESPRESSO_RETURN_VERSION"]){
                                if(retData.status === "001"||retData.status === "002"||retData.status === "003"){
                                    retData.retCode = '400';
                                }else
                                    retData = retData.data;
                            }
                            result = retData;
                        }catch(e){
                            throw new Error(ajaxData);
                        }
                    },
                    error: function(xhr,status,error){
                        throw new Error(error);
                    }
                });
                return result;
            }
        };

        /**
         * 循环调用，仅支持异步调用方式,接受一个先后有调用关系的数组
         * @param arr
         * @param resultBefore
         * @returns {*}
         */
        var recursiveAjax = function(arr,resultBefore){
            try{
                if(arr.length > 0){
                    var currentFunc = arr.shift();
                    return execute(currentFunc,resultBefore).then(function(resultBefore){
                        if(arr.length > 0){
                            recursiveAjax(arr,resultBefore);
                        }
                    });
                }
            }catch(e){
                throw new Error(e);
            }

            function execute(func,resultBefore){
                return func(resultBefore);
            }
        };


        /**
         *  指定提交的地址
         * @param url
         * @returns {*}
         */
        var setURL = function(url){
            return submitUrl = url;
        };

        /**
         * 内部方法，获取提交地址
         * @returns {*}
         */
        var getURL = function(){
            if(submitUrl){
                return submitUrl;
            }else if(typeof getSubmitURL === 'function'){
                return getSubmitURL();
            }else {
                throw new Error("Undefined getSubmitURL。未定义的ajax提交地址 请通过公共函数getSubmitURL来定义ajax的提交地址.");
            }
        };

        s3.setURL = setURL;
        s3.ajax = ajax;
        s3.ajaxChain = recursiveAjax;
});
/**
 * Created by zjfh-chent on 2017/11/23.
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3);
    }else{
        factory(window);
    }
}(function(s3){

    var defaultAllowList = new Array("jpg","png","jpeg","txt","xls","doc","docx","xlsx","pdf","JPG","PNG","JPEG","TXT","XLS","DOC","DOCX","XLSX","PDF");

    /**
     * 设定允许列表
     * @param list
     */
    var setAllowList = function(list){
        if(list.push){
            defaultAllowList = setAllowList;
        }
    };

    /**
     * 检查是否允许
     * @param fileToUpload
     * @param f
     * @returns {{status: string, retMsg: string}}
     */
    var checkFile = function(fileToUpload,f){
        var result = {
            status:"000",
            retMsg:"校验成功"
        };

        if(fileToUpload.type.indexOf("image")>-1 && typeof f == "function"){
            var reader = new FileReader();
            reader.onload = function(event){
                f(event.target.result);
            };
            reader.readAsDataURL(fileToUpload);
        }

        var extName;
        if(fileToUpload.name.lastIndexOf(".")>-1){
            extName = fileToUpload.name.substring(fileToUpload.name.lastIndexOf(".")+1);
        }
        //支持常用的图片及文本格式
        var listExtName = defaultAllowList;
        var flag = 0;
        for(var i = 0;i < listExtName.length; i++){
            if(listExtName[i]==extName){
                flag++;
            }
        }
        if(flag == 0){
            result = {
                status:"400",
                retMsg:"不能上传此种格式的文件"
            };
        }else{
            if(fileToUpload.size > 512000){
                result = {
                    status:"400",
                    retMsg:"文件不能超过500KB"
                };
            }
        }
        return result;
    };

    /**
     * 上传文件
     * @param fileToUpload  上传的文件
     * @param data  带数据的上传
     * @param url 上传地址
     */
    var uploadFileToUrl = function(fileToUpload,data,url){
        var fd = new FormData();
        fd.append("file",fileToUpload);
        if(typeof data === "object"){
            for(var key in data){
                fd.append(key,data[key]);
            }
        }

        var uploadURL;
        if(url != undefined){
            uploadURL = url;
        }else if(typeof getUploadURL == 'function'){
            uploadURL = getUploadURL();
        }

        if(uploadURL == undefined){
            throw new Error("未定义的上传文件地址, 请通过公共函数getUploadURL来定义上传地址.");
        }else{
            var defer = $.Deferred();
            $.ajax({
                type: 'POST',
                url: uploadURL,
                async: true,
                data:fd,
                cache:false,
                timeout:30000,
                processData:false,
                contentType:false,
                success: function (ajaxData) {
                    try{
                        var retData =  JSON.parse(ajaxData);
                        if(retData["ESPRESSO_RETURN_VERSION"]){
                            if(retData.status === "001"||retData.status === "002"||retData.status === "003"){
                                retData.retCode = '400';
                            }else
                                retData = retData.data;
                        }
                        defer.resolve(retData);
                    }catch(e){
                        defer.resolve({
                            status:"400",
                            retCode:"400",
                            retMsg:ajaxData
                        });
                        throw new Error(ajaxData);
                    }
                },
                error: function(xhr,status,error){
                    defer.resolve({
                        status:"400",
                        retCode:"400",
                        retMsg:error.message != undefined ? error.message : error
                    });
                    throw new Error(error.message != undefined ? error.message : error);
                }
            });
            return defer.promise();
        }
    };


    s3.checkFile = checkFile;
    s3.setAllow = setAllowList;
    s3.upload = uploadFileToUrl;
});
/**
 * Created by zjfh-chent on 2017/11/9.
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){

    var isPlainObject = function (obj) {
        if(obj && Object.prototype.toString.call(obj) === "[object Object]"&& obj.constructor === Object
            && !Object.hasOwnProperty.call(obj,"constructor")){
            var key;
            for(key in obj){}
            return key === undefined || Object.hasOwnProperty.call(obj,key);
        }
        return false;
    };

    var submit = function(url,data){
        if(url == undefined){
            throw Error("未定义的跳转地址，请传入正确的跳转地址");
        }else{
            if(data && 	isPlainObject(data)){
                var fd = document.createElement('form');
                fd.method = 'POST';
                for(var key in data){
                    var el = document.createElement("input");
                    el.setAttribute("name",key);
                    el.setAttribute("type","hidden");
                    fd.setAttribute("type","hidden");
                    fd.appendChild(el);
                    el.value = data[key];
                }
                document.body.appendChild(fd);
                fd.action = url;
                fd.submit();
            }else{
                window.location.href=url;
            }
        }
    };
    s3.jump = submit;
});
/**
 * Created by zjfh-chent on 2016/12/16.
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){
    var getItem = function(key){
        if(sessionStorage.getItem(key))
            return JSON.parse(sessionStorage.getItem(key));
        else
            return sessionStorage.getItem(key)
    };
    var setItem = function(key,value){
        sessionStorage.setItem(key,JSON.stringify(value));
    };

    var removeItem = function(key){
        sessionStorage.removeItem(key);
    };

    /**
     * localStorage
     */
    var getItemLocal = function(key){
        if(localStorage.getItem(key))
            return JSON.parse(localStorage.getItem(key));
        else
            return localStorage.getItem(key)
    };
    var setItemLocal = function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    };
    var removeItemLocal = function(key){
        localStorage.removeItem(key);
    };

    s3.istore = {
        get:getItem,
        set:setItem,
        remove:removeItem,
        getLocal:getItemLocal,
        setLocal:setItemLocal,
        removeLocal:removeItemLocal
    }
});
/**
 * Created by zjfh-chent on 2016/8/10.
 */

if (!this.JSON) {
    this.JSON = {};
}
(function () {

    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return this.getUTCFullYear()   + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z';
        };
    }
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
        return this.valueOf();
    };

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ?
        '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' :
        '"' + string + '"';
    }


    function str(key, holder) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                        partial.join(',\n' + gap) + '\n' +
                        mind + ']' :
                        '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                    mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }


    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/.
                test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
                replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
})();
/**
 * Forms Manager管理表单的读写
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function (s3) {


        /**
         *判断是否是纯对象 纯{}下的
         * @param obj
         * @return {boolean}
         */
        var isPlainObject = function (obj) {
            if(obj && Object.prototype.toString.call(obj) === "[object Object]"&& obj.constructor === Object
                && !Object.hasOwnProperty.call(obj,"constructor")){
                var key;
                for(key in obj){}
                return key === undefined || Object.hasOwnProperty.call(obj,key);
            }
            return false;
        };

        /**
         * 清理form
         * @param form
         */
       var clearForm = function (form){
            form.reset();
        };

        /**
         * 将form表单中的数据封装成JSON对象。
         * @param form
         * @return {}
         */
       var form2json = function(form){
            var obj = {};
            var a = $(form).serializeArray();
            $.each(a,function(){
                if(obj[this.name]!==undefined){
                    if(!obj[this.name].push){
                        obj[this.name] = [obj[this.name]];
                    }
                    obj[this.name].push(this.value||'');
                }else{
                    obj[this.name]=this.value||'';
                }
            });
            return obj;
        };


        /**
         * 将数据导入表单
         * @param form
         * @param jsonObj
         */
        var json2form = function(form,jsonObj,pre){
            var key,value,name,eles,match;

            pre = pre || '';

            //遍历对象
            for(key in jsonObj){
                name = pre + key;
                value = jsonObj[key];

                //如果还是对象，那就要递归  基本用不到
                if(isPlainObject(value)){
                    json2form(form,value,key+'.');
                }else{
                    //查找form中 名字与name匹配的元素
                    eles = [];
                    match = form.elements;
                    for(var i = 0 ;i<match.length;i++){
                        if(match[i].getAttribute('name') === name){
                            eles.push(match[i]);
                        }
                    }
                    //返回的匹配都是数组，直接计算即可
                    eles.forEach(function(elex){
                        //select
                        if(elex.tagName.toLowerCase() === "select") {
                            if(elex.type === "select-multiple"){
                                for(var i = 0;i<elex.options.length;i++){
                                    value.forEach(function (x) {
                                        if(elex.options[i].value === x)
                                            elex.options[i].selected = true;
                                    });
                                }
                            }else{
                                for (var i = 0; i < elex.options.length; i++) {
                                    if (elex.options[i].value === value) {
                                        elex.selectedIndex = i;
                                    }
                                }
                            }
                        }
                        //checkbox
                        else if(elex.type === "checkbox"){
                            elex.checked = (elex.value === value || value.some(function(x){ return elex.value === x})) ? true:false;
                        }
                        // radio
                        else if (elex.type !== "radio") {
                            elex.value = value;
                        } else {
                            elex.checked = (elex.value === value);
                        }
                    });
                }
            }
        };

    s3.forms ={
        clearForm:clearForm,
        json2form:json2form,
        form2json:form2json
    };
});

/**
 Number Calculator 数据/金额计算器
 */
+function(){

    /**
     * 保证精确性的数值乘法
     * @param n1
     * @param n2
     * @returns {Number}
     */
    var multiply = function (n1, n2) {
        var m = 0,
            s1 = Number(n1).toString(),
            s2 = Number(n2).toString(),
            t = s1.split(".");
        //判断小数点
        if (t[1]) {
            m += t[1].length;
        }
        t = s2.split(".");
        if (t[1]) {
            m += t[1].length;
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };
    /**
     * 确保精度的数值加法
     * @param n1
     * @param n2
     * @returns {Number}
     */
    var add = function (n1, n2) {
        var m1 = 0, m2 = 0,
            t =  Number(n1).toString().split(".");
        if (t[1]) {
            m1 = t[1].length;
        }
        t =  Number(n2).toString().split(".");
        if (t[1]) {
            m2 = t[1].length;
        }
        var m = Math.pow(10, Math.max(m1, m2));
        return Math.round(Number(n1) * m + Number(n2) * m) / m;
    };
    /**
     * 确保精度的数值减法
     * @param n1
     * @param n2
     * @returns {Number}
     */
    var sub = function (n1, n2) {
        var m1 = 0, m2 = 0,
            t =  Number(n1).toString().split(".");
        if (t[1]) {
            m1 = t[1].length;
        }
        t =  Number(n2).toString().split(".");
        if (t[1]) {
            m2 = t[1].length;
        }
        var m = Math.pow(10, Math.max(m1, m2));
        return Number((Math.round(Number(n1) * m - Number(n2) * m) / m).toFixed(Math.max(m1, m2)));
    };

    /**
     * 相对精确的数值除法
     *
     * @param n1
     * @param n2
     * @param num  保留几位小数
     * @returns {Number}
     */
    var divide = function (n1, n2,num) {
        num ? num : num =2;
        var m, m1 = 0, m2 = 0, t;
        var s1 =  Number(n1).toString();
        var s2 =  Number(n2).toString();
        t = s1.split(".");
        if (t[1]) {
            m1 += t[1].length;
        }
        t = s2.split(".");
        if (t[1]) {
            m2 += t[1].length;
        }
        m = Math.pow(10, m2 - m1);
        return Number((Number(s1.replace(".", "")) / Number(s2.replace(".", "")) * m).toFixed(num));
    };
    var mod = function(n1,n2){
        var m, m1 = 0, m2 = 0, t;
        var s1 =  Number(n1).toString();
        var s2 =  Number(n2).toString();
        t = s1.split(".");
        if (t[1]) {
            m1 += t[1].length;
        }
        t = s2.split(".");
        if (t[1]) {
            m2 += t[1].length;
        }
        m = Math.pow(10, Math.max(m1, m2));
        return  (Number(n1) * m) % (Number(n2) * m) / m;
    };

    /**
     * 数字格式化为金额表达式
     * @param value
     * @returns {*}
     */
    var addComma = function (value) {
        /*if (isNaN(value)) {
            return NaN;
        }*/
        value = value.toString();
        var hasMinus = false;
        var reg = /(-?\d+)(\d{3})/;
        var index = value.indexOf('.');
        //为负数
        if (value.indexOf('-') != -1) {
            value = value.replace(/[-]/g, '');
            hasMinus = true;
        }
        //没有小数点
        if (index == -1){
            while (reg.test(value)){
                value =  value.replace(reg,"$1,$2");
            }
        }else {
            var intPart = value.substring(0,index);
            var pointPart = value.substring(index ,value.length);
            while (reg.test(intPart)){
                intPart =  intPart.replace(reg,"$1,$2");
            }
            value = intPart + pointPart;
        }
        if (hasMinus) {
            return ('-' + value);
        } else {
            return value;
        }
    };
    /**
     * 价钱单位转换
     * @param n1 传入数值
     * @param n2 保留位数
     * @returns {String}
     */
    var numFormat = function (n1,n2) {
        if (isNaN(n1)) {
            return NaN;
        }
        var hasMinus = false,
            len,num,index,n1Index,pointPart;
        n1 = n1.toString();
        n1Index = n1.indexOf('.');
        pointPart= n1.slice(n1Index);
        n1Index != -1 ? n1 = n1.slice(0,n1Index):n1;
        n2 == "" || n2 == undefined? n2=2:n2;
        //为负数
        if (n1.indexOf('-') != -1) {
            n1 = n1.replace(/[-]/g, '');
            hasMinus = true;
        }
        num = Number(n1);
        len = num.length - 1;
        if (num>=11000 && num<110000000) {
            num = num /10000;
            if(num.toString().indexOf('.') == -1){
                n1 = num+ '万元';
            }else{
                index = num.toString().indexOf('.');
                len = index+n2+1;
                n1 = num.toString().slice(0,len)+ '万元';
            }
        }else if (num >= 110000000) {
            num = num / 100000000;
            if(num.toString().indexOf('.') == -1){
                n1 = num+ '亿元';
            }else{
                index = num.toString().indexOf('.');
                len = index+n2+1;
                n1 = num.toString().slice(0,len) + '亿元';
            }
        }else{
            pointPart = pointPart.slice(0,n2+1);
            n1Index != -1 ? n1 = num + pointPart + '元' :n1 = num + '元';
        }
        if (hasMinus) {
            return ('-' + n1);
        } else {
            return n1;
        }
    };

    /**
     * 金额类型转换
     * @param {}
     * @type  转换类型 0单价 | 1小计 | 2总和 | 3其他
     * @returns {number || string}
     */
    var moneyFormat = function (num,obj) {
        //默认最少保留两位
        obj.bitLength !== ''  ? Number(obj.bitLength) : obj.bitLength = 2;
        //默认配置单位为元
        obj.unit ? obj.unit :obj.unit = "0";
        num = num * Math.pow(10, obj.bitLength);
        // 判断舍取方式
        switch(true){
            case obj.roundOff == '1' :
                num = Number(Math.floor(num)).toString().split(".")[0];
                break;
            case obj.roundOff == '2' :
                num = Number(Math.round(num)).toString().split(".")[0];
                break;
            case obj.roundOff == '3' :
                num = Number(Math.ceil(num)).toString().split(".")[0];
                break;
        }
        num = Number(num) / Math.pow(10, obj.bitLength);
        //当保留位数为整数时
        if(obj.bitLength == 0){
            return num
        }else{
            //当有保留位数但目前为整数时
            if(num.toString().indexOf('.') == -1){
                var len = Math.pow(10, obj.bitLength).toString().replace('1','');
                return num + "." + len;
            }else{
                var now_len = num.toString().length - num.toString().indexOf('.') -1;
                if(now_len !=  obj.bitLength){
                    var len = Math.pow(10, obj.bitLength-now_len).toString().replace('1','');
                    num = num + len;
                }
                return num
            }
        }

    };



    /**
     * 移除逗号分隔符
     * @param value
     * @returns {*|string|{example, overwrite, disable_template_processing}|void|XML}
     */
    var removeComma = function (value) {
        return value === undefined ? value : value.replace(/,/g, '');
    };

    //Number.prototype 扩展
    Number.prototype.add = function(n){
        n = Number(n);
        if(isNaN(n))
            return NaN;
         return add(this,n);
    };
    Number.prototype.sub = function(n){
        n = Number(n);
        if(isNaN(n))
            return NaN;
         return sub(this,n);
    };
    Number.prototype.mul = function(n){
        n = Number(n);
        if(isNaN(n))
            return NaN;
        return multiply(this,n);
    };
    Number.prototype.divide = function (n,num) {
        n = Number(n);
        if(isNaN(n))
            return NaN;
        return divide(this,n,num);
    };
    Number.prototype.mod = function(n){
        n = Number(n);
        if(isNaN(n))
            throw new TypeError("parameter n must be Number");
        return mod(this,n);
    };
    Number.prototype.money = function(){
        return addComma(this);
    };
    String.prototype.money = function(){
        return addComma(this);
    };
    Number.prototype.numFormat = function(n){
        return numFormat(this,n);
    };
    Number.prototype.moneyFormat =  function(obj){
        return moneyFormat(this,obj);
    };

}();
/**
 * Event Manager 事件管理器
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){

    var types =['blur','focus','click','dbclick','mouseover','mousedown','mouseup','mousemove','mouseout','mouseenter','mouseleave','change','load','unload','resize','scroll','select','submit','keydown','keypress','keyup','error'];

    /**
     * 满足浏览器兼容性的事件绑定函数
     * @param element
     * @param type
     * @param handler
     */
    var addHandler = function(element,type,handler){
      if(element.addEventListener){
          element.addEventListener(type,handler,false);
      }else if(element.attachEvent){
          element.attachEvent("on"+type,handler);
      }else{
          element["on"+type] = handler;
      }
    };

    /**
     * 事件解除绑定，考虑浏览器兼容性
     * @param element
     * @param type
     * @param handler
     */
    var removeHandler = function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element["on"+type] = null;
        }
    };

    /**
     * @returns {Event|*}
     */
    var getEvent = function(event){
        return event ? event : window.event;
    };

    /**
     * 获取当前事件的节点
     * @returns {*|Object}
     */
    var getTarget = function(){
        return event.target || event.srcElement;
    };

    /**
     * 停止冒泡
     * @param event
     */
    var stopPropagation = function(event){
        // if(event.stopPropagation){
        //     event.stopPropagation();
        // }else{
        //     event.cancelBubble = true;
        // }

        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    };

    /**
     * 关闭默认事件
     * @param event
     */
    var preventDefault = function(event){
        /*if(event.preventDefault)
            event.preventDefault();
        else
            event.returnValue = false;*/
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
    };

    /**
     * 初始化事件绑定,通过检测元素的属性来完成绑定事件
     */
    var init = function(selector){
        //正则表达式，匹配函数
        var evt,target,f,
            pattern = /[a-zA-Z0-9-_]\([a-zA-Z0-9-_]*\)$/,
            pattern1 = /\([a-zA-Z0-9-_]*\)$/;
        selector = typeof selector == 'string'? ""+selector :"";
        types.forEach(function(item){
            $(selector+" ["+item+"]").each(function(){
                var fn = $(this).attr(item);
                $(this).on(item,function(event){
                    evt = getEvent(event);
                    target = getTarget(evt);
                    if(pattern.test(fn)){
                        f = fn.replace(pattern1,"(target)");
                        eval(f);
                    }else{
                        f = fn+"(target)";
                        eval(f);
                    }
                })
            })
        });
    };

    /**
     * 添加事件类型
     * @param type
     */
    var addTypes = function(type){
        types.push(type);
    };

    s3.events = {
        init:init,
        addTypes:addTypes,
        addHandler: addHandler,
        removeHandler:removeHandler,
        getEvent:getEvent,
        getTarget:getTarget,
        stopPropagation:stopPropagation,
        preventDefault:preventDefault
    };
});
/**
 * Created by zjfh-chent on 2016/8/23.
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){

    /**
     * 处理属性设置
     * @param node
     * @param key
     * @param value
     */
    function setAttr(node,key,value){
        switch(key){
            case 'style':
                node.style.cssText = value;
                break;
            case 'value':
                var tagName = node.tagName || '';
                tagName = tagName.toLowerCase();
                if(tagName === 'input' || tagName === 'textarea'){
                    node.value = value;
                }else{
                    node.setAttribute(key,value);
                }
                break;
            default:
                node.setAttribute(key,value);
                break;
        }
    }

    var isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    /**
     * 虚拟DOM对象
     * @param {String} tagName  对象的标签名
     * @param {Object} props   对象的属性
     * @param {Array<Element|String>} children 元素的子元素 可以是文字，也可以是Element对象
     */
    function Element (tagName, props, children) {
        if (!(this instanceof Element)) {
            if (!isArray(children) && children != null) {
                children = Array.prototype.slice.call(arguments, 2)
                    .filter(
                        function(value){
                            return !!value;
                        })
            }
            return new Element(tagName, props, children)
        }

        if (isArray(props)) {
            children = props;
            props = {}
        }

        this.tagName = tagName;
        this.props = props || {};
        this.children = children || [];
        this.key = props
            ? props.key
            : void 666;

        var count = 0;

        this.children.forEach(function (child, i) {
            if (child instanceof Element) {
                count += child.count
            } else {
                children[i] = '' + child
            }
            count++
        });

        this.count = count
    }

    /**
     * 渲染DOM树
     * @returns {Element}
     */
    Element.prototype.render = function () {
        var el = document.createElement(this.tagName);
        var props = this.props;

        for (var propName in props) {
            var propValue = props[propName];
            setAttr(el, propName, propValue)
        }

        this.children.forEach(function (child) {
            // 阿门, 又是IE 8  input element has no appendChild property
            if(el.tagName.toLowerCase() != 'input') {
                var childEl = (child instanceof Element)
                    ? child.render()
                    : document.createTextNode(child);
                el.appendChild(childEl)
            }
        });
        return el
    };

    /**
     * 
     * @param tagName
     * @param props
     * @param children
     * @returns {Element}
     */
    s3.element = function(tagName,props,children){
        return new Element(tagName,props,children);
    };
});
/**
 * Utils 通用功能
 *
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){
    /**
     *判断是否是纯对象 纯{}下的
     * @param obj
     * @return {boolean}
     */
    var isPlainObject = function (obj) {
        if(obj && Object.prototype.toString.call(obj) === "[object Object]"&& obj.constructor === Object
            && !Object.hasOwnProperty.call(obj,"constructor")){
            var key;
            for(key in obj){}
            return key === undefined || Object.hasOwnProperty.call(obj,key);
        }
        return false;
    };
    /**
     * 判断是否微信浏览器
     * @returns {boolean}
     */
    var isWeixin = function() {
        var ua;
        ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }else{
            return false;
        }
    };
    s3.isPlainObject = isPlainObject;
    s3.isWeixin = isWeixin();
});

/**
 * Created by zjfh-chent on 2017/11/9.
 */
+function(factory){
    if(typeof s3 != 'undefined'){
        factory(s3)
    }else{
        factory(window)
    }
}(function(s3){

    /**
     *  计时器
     * @param f
     * @param start
     * @param interval
     * @param end
     */
    function invoke(f,start,interval,end){
        if(!start) start =0;
        if(arguments.length <=2)
            setTimeout(f,start);
        else{
            var repeat =function (){
                var h = setInterval(f,interval);
                if(end)
                    setTimeout(function(){clearInterval(h);},end);
            };
            setTimeout(repeat,start);

        }
    }

    /**
     * 定时开始，只执行一次
     * @param fn    执行函数
     * @param start 开始时间
     */
    var timeout = function(fn,start){
        invoke(fn,start)
    };

    /**
     * 定时开始，循环执行
     * @param fn 执行的函数
     * @param start  开始时间
     * @param interval  执行间隔
     * @param end   结束时间
     */
    var interval = function(fn,start,interval,end){
        invoke(fn,start,interval,end);
    };
    s3.timer = {
        timeout:timeout,
        interval:interval
    }
});
