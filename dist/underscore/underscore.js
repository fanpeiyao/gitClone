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
