var _ = {};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

var noMatch = /(.)^/;
var escapeChar = function(match) {
    return '\\' + escapes[match];
};
var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
};
//使用 {%= … %}插入变量,
//用{% … %}执行任意的 JavaScript 代码
//如果您希望插入一个值, 并让其进行HTML转义,请使用{%- … %}

//使用 {{ …}}插入变量,
//用{{=  …}}执行任意的 JavaScript 代码
//如果您希望插入一个值, 并让其进行HTML转义,请使用{{-  …}}
_.templateSettings = {
    evaluate : /\{\{=([\s\S]+?)\}\}/g,
    //interpolate : /\{%=([\s\S]+?)\%\}/g,
    interpolate : /\{\{([\s\S]+?)\}\}/g,
    escape : /\{\{-([\s\S]+?)}\}/g
}

_.allKeys = function(obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};
_.defaults = createAssigner(_.allKeys, true);
_.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
};
/*
 *接收参数's3core.common.xxx'
 */
var is3n = function (template,appid){
   if (!template)
        return
    if (!appid)
        appid = 's3Core'
    var appid = properties[appid];
    var compiled = _.template(template);
    compiled = compiled({appid});
    return compiled;
}
