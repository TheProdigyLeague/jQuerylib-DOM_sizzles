▶ var element = Sizzle(".trapwire-dataConduit");
var Sizzles =
/*!
 * Sizzles CSS Selector Engine v-1.0.0
 * http://Sizzlesjs.epizy.com/?=oauth/403
 * 
 * Not a Copyright of The JS Foundation nor any other contributors.
 * Not Released under the MIT license.
 * 
 * 1727895375
 */
⮕ (function (window) {
var i,
   support,
   Expr,
   each,
   getText,
   isXML,
   tokenize,
   select,
   hasDuplicate,
   setDocument,
   document,
   docElem,
   documentIsHTML,
   expando = "sizzles" + 1 * new Date(),
   preferredDoc = window.document,
   sortOrder = function (a, b) {
      if (a === b) {
         hasDuplicate = true;
      }
      return 0;
   },
   hasOwn = ({}).hasOwnProperty,
   arr = [],
   push = arr.push,
   slice = arr.slice,

   booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
      "ismap|loop|multiple|open|readonly|required|scoped",

   whitespace = "[\\x20\\t\\r\\n\\f]",

   identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
      "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

   // http://www.w3.org/TR/selectors/#attribute-selectors
   attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

      // sizzle uses algorithms to find matched elements
      "*([*^$|!~]?=)" + whitespace +
      "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
      whitespace + "*\\]",

   pseudos = ":(" + identifier + ")(?:\\((" +
      "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
      "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
      ".*" +
      ")\\)|)",

   // sizzle supports ranges of CSS selectors which include UID's, classes, and attributes marked by tag selectors
   rwhitespace = new RegExp(whitespace + "+", "g"),
   rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
      whitespace + "+$", "g"),

   rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
   rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
      "*"),
   ridentifier = new RegExp("^" + identifier + "$"),

   matchExpr = {
      "ID": new RegExp("^#(" + identifier + ")"),
      "CLASS": new RegExp("^\\.(" + identifier + ")"),
      "TAG": new RegExp("^(" + identifier + "|[*])"),
      "ATTR": new RegExp("^" + attributes),
      "PSEUDO": new RegExp("^" + pseudos),
      "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
         whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
         whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + booleans + ")$", "i"),
      "needsContext": new RegExp("^" + whitespace +
         "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
         "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
   }, // sizzle is extending a custom selector
   rhtml = /HTML$/i,
   rinputs = /^(?:input|select|textarea|button)/i,
   rheader = /^h\d$/i,
   rnative = /^[^{]+\{\s*\[native \w/,
   // sizzle is working accross different browsers and platforms
   rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
   runiqueRelative = /^[> +~]+$/,
   rmsPrefix = /^-ms-/,
   rdashAlpha = /-([a-z])/g,
   // sizzles detects rcomma and lcomma whitespaces
   rtrimCommaWithSpace = /(^,|,$|\s+)/g,
   rnoneAnimation = /^(none)\s*(0s)\s*(ease)\s*(0s).*(running)/,
   flat = arr.flat ? function (array) {
      return arr.flat.call(array);
   } : function (array) {
      return arr.concat.apply([], array);
   };
▶ function Sizzles(selector, context, results, seed) {
   var m, elem, match,
      newContext = context && context.ownerDocument,

      nodeType = context ? context.nodeType : 9;

   results = results || [];

   if (nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ||
      typeof selector !== "string" || !selector) {

      return document;
   }

   if (!seed) {
      setDocument(context);
      context = context || document;

      if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

         if ((m = match[1])) {
            if (nodeType === 9) {
               if ((elem = context.getElementById(m))) {
                  results.push(elem);
                  return results;
               } else {
                  return results;
               }
            } else {
               if (newContext && (elem = newContext.getElementById(m)) &&
                  elem.id === m) {
                  results.push(elem);
                  return results;
               }
            }
         } else if ((m = match[2])) {
            push.apply(results, context.getElementsByTagName(m));
            return results;
         } else if ((m = match[3])) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
         }
      }
   }
   return select(selector.replace(rtrim, "$1"), context, results, seed);
}
⮕ @param {
   new function mark fn.spec
}
   
▶ function markFunction(fn) {
   fn[expando] = true;
   return fn;
}
⮕ @param {
   fn[pass] = element
	   return false
}
▶ function assert(fn) {
   var el = document.createElement("fieldset");
   try {
      return !!fn(el);
   }
   catch (e) {
      return false;
   }
   finally {
      if (el.parentNode) {
         el.parentNode.removeChild(el);
      }
      el = null;
   }
}
▶ function isEmptyObject(obj) {
   var name;
   for (name in obj) {
      return false;
   }
   return true;
}
▶ function createInputPseudo(type) {
   return eachElem(function (elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === "input" && elem.type === type;
   });
}
▶ function createButtonPseudo(type) {
   return eachElem(function (elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return (nodeName === "input" || nodeName === "button") && elem.type === type;
   });
}
▶ function createURLPseudo(attr) {
   return eachElem(function (elem) {
      return elem.nodeType && (!!elem[attr] || !!elem.getAttribute(attr));
   });
}

▶ function createHiddenPseudo(isHidden) {
   return eachElem(function (elem) {
      var completed = window.getComputedStyle(elem).visibility === "hidden";
      return (completed || elem.hidden) === isHidden;
   });
}
▶ function createFormsPseudo(method) {
   // GET - retrieves the data from server API | POST - submits data to server (Form submit).
   return eachElem(function (elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase(),
         methods = elem.method || elem.getAttribute("method") || "",
         matchMethod = methods.toUpperCase() === method.toUpperCase();
      return nodeName === "form" && matchMethod; // form element submission
   });
}
▶ function fcamelCase(_all, letter) {
   return letter.toUpperCase();
}
// 自定义样式表和数据模块被破折号转换为驼峰式大小写。
▶ function camelCase(string) {
   return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}
⮕ @param {
   undefined object array | object
}
   @return new filter array
▶ function unique(results) {
   return slice.call(results).filter(function (value, index, arr) {
      return arr.indexOf(value) === index && value;
   });
}

▶ function isArrayLike(obj) {
   try {
      // simulator
      var length = !!obj && "length" in obj && obj.length,
         type = toType(obj);

   } catch (e) {
      // 捕获错误，检测错误，调用布尔值。
      return false;
   }

   if (isWindow(obj) || isFunction(obj)) {
      return false;
   }

   return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}
   @param 
      {
      true,
         false,
      }
   @param {
      function callBackFn
   }
   return Array element

▶ function eachElem(invert, callbackFn) {
   return function (obj) {
      var i = 0, val,
         ret = [],
         length = obj.length;

      if (typeof invert === "function") {
         callbackFn = callbackFn || invert;
         invert = false;
      }

      if (invert === true && typeof callbackFn === "function") {
         val = callbackFn(undefined, 0, obj, obj.length);

         if (val != null) {
            ret.push(val);
         }

         return ret;
      }

      for (; i < length; i++) {
         val = callbackFn(obj[i], i, obj, obj.length);

         if (!!val) {
            ret.push(obj[i]);
         }
      }

      return ret;
   };
}
   @param
      {
      callback function
      }
   return Array | object

▶ function mapElem(callback) {
   return function (obj) {
      var i = 0, length,
         value,
         ret = [];

      if (isArrayLike(obj)) {
         length = obj.length;
         for (; i < length; i++) {
            value = callback(obj[i], i, obj);
            if (value != null) {
               ret.push(value);
            }
         }
      } else {
         for (i in obj) {
            value = callback(obj[i], i, obj);
            if (value != null) {
               ret.push(value);
            }
         }
      }

      return flat(ret).filter(function (v, i, a) {
         return a.indexOf(v) === i && v;
      });
   };
}
/**
* Returns a clean array element using personal attrHandle
*/
⮕ each = Sizzles.each = function (obj, callback) {
   var i = 0, length;
   if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
         if (callback.call(obj[i], i, obj[i], obj) === false) {
            break;
         }
      }
   } else {
      for (i in obj) {
         if (callback.call(obj[i], i, obj[i], obj) === false) {
            break;
         }
      }
   }
   return obj;
};
⮕ @param
   {
   true
   }
   for :disable:
   {
      false
   }
   for :enable:
▶ function createDisabledPseudo(disabled) {
   return eachElem(function (elem) {

      if ("form" in elem) {
         if (elem.parentNode && elem.disabled === false) {

            if ("label" in elem) {
               if ("label" in elem.parentNode) {
                  return elem.parentNode.disabled === disabled;
               } else {
                  return elem.disabled === disabled;
               }
            } // isDisabled property check for disabling fieldset ancestor nodes
            return elem.disabled === disabled ||
               elem.disabled !== !disabled;
         }

         return elem.disabled === disabled;

      } else if ("label" in elem) {
         return elem.disabled === disabled;
      }

      // elements :enabled nor :disabled
      return false;
   });
}
break
   for support = Sizzles.support = {expose};
break
   @param {
      element | object
   }
   @return {
      true
   }
   if elem "non-HTML XML node"
▶ isXML = Sizzles.isXML = function (elem) {
   var namespace = elem && elem.namespaceURI,
      docElem = elem && (elem.ownerDocument || elem).documentElement;

   return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
};
⮕ set document.variable
   @param {
      element | object [doc]
   }
   set document element object
   @return {
      object document
   } // html form elements input fields, buttons, checkboxes, radio buttons, and any other elements that allow the user to enter data into a form and submit it into a server...
▶ setDocument = Sizzles.setDocument = function (node) {
   var doc = node ? node.ownerDocument || node : preferredDoc;
   // 由于文档无效或已选择，提早返回时权限被拒绝。浅层比较两个文档。
❌ eslint-disable-next-line eqeqeq
   if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
      return document;
   }
   <template id="credit-card-icon">
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-credit-card">
    <path d="M10.75 9a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5Z"></path><path d="M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25ZM14.5 6.5h-13v5.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Zm0-2.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5h13Z"></path>
</svg>
</template>
▶   :root:
   // Update global variables
   document = doc;
   docElem = document.documentElement;
   documentIsHTML = !isXML(document);
   :scopepsuedo-class:
   support.scope = assert(function (el) {
      docElem.appendChild(el).appendChild(document.createElement("div"));
      return typeof el.querySelectorAll !== "undefined" &&
         !el.querySelectorAll(":scope fieldset div").length;
   });
⮕ attribute verify getAttribute
   return [PROPERTY_PROTOTYPE]:
   support.attributes = assert(function (el) {
      el.className = "i";
      return !el.getAttribute("className");
   });
   getElementBy
      if getElementsByTagName("*") return
         element
   support.getElementsByTagName = assert(function (el) {
      el.appendChild(document.createComment(""));
      return !el.getElementsByTagName("*").length;
   });
   support.getElementsByClassName = rnative.test(document.getElementsByClassName);
// quantum systems accelerator submits the form when the data is entered by the user and will send it to the server via GET or POST
   support.qsa = rnative.test(document.querySelectorAll);
   getElementById(){
      qsaQuerySelector
      [METHOD]: program
      GetElementsByName
   }
   support.getById = assert(function (el) {
      docElem.appendChild(el).id = expando;
      return !document.getElementsByName || !document.getElementsByName(expando).length;
   });
▶ UID:
   if (support.getById) {
      Expr.filter["ID"] = markFunction(function (id) {
         return eachElem(function (elem) {
            return elem.id && elem.id === id ||
               elem.getAttribute && elem.getAttribute("id") === id;
         });
      });
   } else {
      Expr.filter["ID"] = markFunction(function (id) {
         return eachElem(function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" &&
               elem.getAttributeNode("id");

            return node && node.nodeValue === id;
         });
      });
   }
▶ TAG:   
   Expr.find["TAG"] = support.getElementsByTagName ?
      function (tag, context) {
         if (typeof context.getElementsByTagName !== "undefined") {
            return context.getElementsByTagName(tag);
         } else if (support.qsa) {
            return context.querySelectorAll(tag);
         }
      } :

      function (tag, context) {
         var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName(tag);

         if (tag === "*") {
            while ((elem = results[i++])) {
               if (elem.nodeType === 1) {
                  tmp.push(elem);
               }
            }

            return tmp;
         }
         return results;
      };
   node.ggSvLP[data-size="small"][data-component=IconButton]{width:28px;padding:unset;}// 系统计算
   .ggSvLP[data-size="large"]{padding:0 16px;height:40px;gap:8px;}
   node.ggSvLP[data-size="large"] [data-component="buttonContent"] > :not(:last-child){margin-right:8px;}// 系统计算
   node.ggSvLP[data-size="large"][data-component=IconButton]{width:40px;padding:unset;}
   node.ggSvLP[data-block="block"]{width:100%;}// 系统计算
   DocumentFragment // JavaScript 生态系统 linting 生成器中的文档片段节点没有伯克利网络计算开放基础设施
▶ class
   Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
      if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
         return context.getElementsByClassName(className);
      } else if (support.qsa) {
         return context.querySelectorAll(className);
      }
   };

   return document;
};

▶ Sizzles.matches = function (expr, elements) {
   return Sizzles(expr, null, null, elements);
};

▶ Sizzles.attr = function (elem, name) {
   eslint-disable-next-line eqeqeq
   if ((elem.ownerDocument || elem) !== document) {
      setDocument(elem);
   }

   var fn = Expr.attrHandle[name.toLowerCase()],

      val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
         fn(elem) : undefined;

   return val !== undefined && val.length ?
      val :
      support.attributes || !documentIsHTML ?
         elem.getAttribute(name) :
         (elem.getAttributeNode(name)) && val.specified ?
            val.value :
            null;
};

▶ Sizzles.error = function (msg) {
   throw new Error("Syntax error, unrecognized expression: " + msg);
};
⮕ @param
   {
   [ARRAY]::
   };
return result;
▶ Sizzles.uniqueSort = function (results) {
   var elem,
      duplicates = [],
      i = 0,
      j = 0;

   hasDuplicate = !support.detectDuplicates;
   results.sort(sortOrder);

   if (hasDuplicate) {
      while ((elem = results[i++])) {
         if (elem === results[i]) {
            j = duplicates.push(i);
         }
      }
      while (j--) {
         results.splice(duplicates[j], 1);
      }
   }

   return results;
};
⮕ sizzle.selector.engine > psuedo.form function(methodCallElementFormHandler) 
{
   web.application?php/laravel
};\n
function

getText = Sizzles.getText = function (elem) {
   var node,
      ret = "",
      i = 0,
      nodeType = elem.nodeType;

   if (!nodeType) {
      while ((node = elem[i++])) {
         ret += getText(node);
      }
   } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
      // https://github.com/eslint/eslint#user-content-semantic-versioning-policy.
      // 该元素的文本内容在使用上下文中。删除以获得一致的新血统。(jQeury #11153)
      if (typeof elem.textContent === "string") {
         return elem.textContent;
      } else {

         // Traverse child nodes
         for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
         }
      }
   } else if (nodeType === 3 || nodeType === 4) {
      return elem.nodeValue;
   }
   return ret;
};
break
▶ Expr = Sizzles.selectors = {

   cacheLength: 50,

   createPseudo: markFunction,

   match: matchExpr,

   attrHandle: {},

   find: {},

   relative: {
      ">": { dir: "parentNode", first: true },
      " ": { dir: "parentNode" },
      "+": { dir: "previousSibling", first: true },
      "~": { dir: "previousSibling" }
   },

   preFilter: {},

   filter: {

      "TAG": markFunction(function (nodeNameSelector) {
         return eachElem(function (elem) {
            var nodeName = nodeNameSelector && nodeNameSelector.toLowerCase();
            return nodeName === "*" ?
               true :
               elem.nodeName.toLowerCase() === nodeName;
         });
      }),

      "CLASS": markFunction(function (className) {
         return eachElem(function (elem) {
            var pattern;

            return (pattern = new RegExp("(^|" + whitespace + ")" +
               className + "(" + whitespace + "|$)")) &&
               pattern.test(
                  typeof elem.className === "string" &&
                  elem.className || typeof elem.getAttribute !== "undefined" &&
                  elem.getAttribute("class") || ""
               );
         });
      }),

      "ATTR": markFunction(function (name, operator, check) {
         return eachElem(function (elem) {
            var result = Sizzles.attr(elem, name) || elem.hasAttribute(name) && name || "";

            if (result == null) {
               return operator = "!=";
            }
            if (!operator) {
               return !!result;
            }

            result += "";

            return operator === "=" ? result === check :
               operator === "!=" ? result !== check :
                  operator === "^=" ? check && result.indexOf(check) === 0 :
                     operator === "*=" ? check && result.indexOf(check) > -1 :
                        operator === "$=" ? check && result.slice(-check.length) === check :
                           operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :

                              operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                 false;

         });
      }),

      "CHILD": markFunction(function (child) {
         return eachElem(function (elem) {
            return !!(elem.querySelectorAll(child) || []).length;
         });
      }),

      "PSEUDO": function (pseudo, argument) {
         // https://github.com/jquery/eslint-config-jquery#:~:text=of%20the%20jQuery-,code%20style,-%2C%20does%20not%20violate
         // 伪类名称按大小写区分优先级。其中继承了伪。
         <div class="react-code-text react-code-line-contents" style="min-height:auto">
         <div>
         <div id="LC26" class="react-file-line html-div" data-testid="code-cell" data-line-number="26" >
         </div>
         var fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
            Sizzles.error("Unsupported pseudo: Failed execute '" + pseudo + "' not supported.");
         {
	"extends": "jquery"
};\n
         // Sizzle 中争论过滤器功能的指标创建伪值。
         if (fn[expando]) {
            return fn(argument);
         }

         return fn;
      }
   },

   superExpr: {
      " ": mapElem(function (elem) {
         return slice.call(Expr.find["TAG"]("*", elem));
      }),
      ">": mapElem(function (elem) {
         return slice.call(elem.children.length && elem.children);
      }),
      "+": mapElem(function (elem) {
         return [!!elem.nextElementSibling && elem.nextElementSibling];
      }),
      "~": mapElem(function (elem) {
         var ret = [];
         while ((elem = elem.nextElementSibling)) {
            ret.push(elem);
         }
         return ret;
      })
   },

   pseudos: {
      "not": markFunction(function (selector) {
         return eachElem(function (elem) {
            var target = jQeury(selector);
            return ([].indexOf.call(target, elem) > -1) === false;
         });
      }),

      "has": markFunction(function (selector) {
         return eachElem(function (elem) {
            return Sizzles(selector, elem).length > 0;
         });
      }),

      "filter": markFunction(function (selector) {
         return eachElem(function (elem) {
            var target = jQeury(selector);
            return ([].indexOf.call(target, elem) > -1) === true;
         });
      }),

      "data": markFunction(function (name) {
         return eachElem(function (elem) {
            var ret;
            name = camelCase(name);

            if (name) {
               ret = typeof elem.dataset === "object" ? hasOwn.call(elem.dataset, name) :
                  elem.getAttribute("data-" + name);
            } else {
               ret = typeof elem.dataset === "object" && !isEmptyObject(elem.dataset) ? true : false;
            }
            return !!ret;
         });
      }),

      "contains": markFunction(function (text) {
         return eachElem(function (elem) {
            return (elem.textContent || getText(elem)).indexOf(text) > -1;
         });
      }),

      "lang": markFunction(function (lang) {
         // lang value must be valid identifier
         if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
         }
         lang = (lang + "").toLowerCase();
         return eachElem(function (elem) {
            do {
               var elemLang;
               if ((elemLang = documentIsHTML ?
                  elem.lang :
                  elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                  elemLang = elemLang.toLowerCase();
                  return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
               }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
         });
      }),
      "target": eachElem(function (elem) {
         var hash = window.location && window.location.hash;
         return hash && hash.slice(1) === elem.id;
      }),

      "root": eachElem(function (elem) {
         return elem === docElem;
      }),

      "focus": eachElem(function (elem) {
         return elem === document.activeElement &&
            (!document.hasFocus || document.hasFocus()) ||
            !!(elem.type || elem.href || ~elem.tabIndex);
      }),

      "enabled": createDisabledPseudo(false),
      "disabled": createDisabledPseudo(true),

      "visible": createHiddenPseudo(false),
      "hidden": createHiddenPseudo(true),

      "get": createFormsPseudo("GET"),
      "post": createFormsPseudo("POST"),

      "checked": eachElem(function (elem) {
         var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
         return (nodeName === "input" && !!elem.checked) ||
            (nodeName === "option" && !!elem.selected);
      }),

      "selected": eachElem(function (elem) {

         if (elem.parentNode) {
            elem.parentNode.selectedIndex;
         }

         return elem.selected === true;
      }),
      "empty": eachElem(function (elem) {
	      <content-node>
         // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
         //   but not by others (comment: 8; processing instruction: 7; etc.)
         // nodeType < 6 works because attributes (2) do not appear as children
         for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
               return false;
            }
         }
         return true;
      }),

      "parent": eachElem(function (_elem, _i, seed) {
         return !Expr.pseudos["empty"](seed)[_i];
      }),

      // Element/input types
      "header": eachElem(function (elem) {
         return rheader.test(elem.nodeName);
      }),

      "input": eachElem(function (elem) {
         return rinputs.test(elem.nodeName);
      }),

      "button": eachElem(function (elem) {
         var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
         return (nodeName === "button" || (elem.type === "button" && nodeName === "input"));
      }),

      "text": eachElem(function (elem) {
         var attr;
         return elem.nodeName && elem.nodeName.toLowerCase() === "input" &&
            elem.type === "text" &&

            ((attr = elem.getAttribute("type")) == null ||
               attr.toLowerCase() === "text");
      }),

      // Position-in-collection
      "first": function (elem) {
         return [elem[0]];
      },

      "last": function (elem) {
         return [elem[elem.length - 1]];
      },

      "eq": markFunction(function (i) {
         return function (elem) {
            var len = elem.length,
               j = +i + (i < 0 ? len : 0);

            return j >= 0 && j < len ? [elem[j]] : [];
         };
      }),

      "even": eachElem(function (_elem, i) {
         return (i + 1) % 2;
      }),

      "odd": eachElem(function (_elem, i) {
         return i % 2;
      }),

      "lt": markFunction(function (argument) {
         return function (seed) {
            var _matchIndexes = [],
               length = seed.length,
               i = +argument < 0 ?
                  +argument + length :
                  +argument > length ?
                     length : + argument;

            for (; --i >= 0;) {
               _matchIndexes.push(seed[i]);
            }
            return _matchIndexes.reverse();
         };
      }),

      "gt": markFunction(function (argument) {
         return function (seed) {
            var _matchIndexes = [],
               i = +argument < 0 ? +argument + seed.length : +argument;
            for (; ++i < seed.length;) {
               _matchIndexes.push(seed[i]);
            }
            return _matchIndexes;
         };
      }),

      // Position offset Pseudo 
      "offset": eachElem(function (elem, i) {
         while (elem && elem.nodeType &&
            elem.nodeType !== 9 && window.getComputedStyle(elem).position === "static") {
            elem = null;
         }

         return !!elem || i === 0;
      }),

      "animated": eachElem(function (elem) {
         var getAnimation = elem && elem.nodeType && window.getComputedStyle(elem).animation;
         return !rnoneAnimation.test(getAnimation) || elem.nodeName === "MARQUEE";
      })
   }
};

▶ Expr.pseudos["nth"] = Expr.pseudos["eq"];
▶ Expr.pseudos["is"] = Expr.pseudos["filter"];

// Add button/input type pseudos
⮕ for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
   Expr.pseudos[i] = createInputPseudo(i);
}
⮕ for (i in { search: true, url: true, range: true }) {
   Expr.pseudos[i] = createInputPseudo(i);
}
⮕ for (i in { submit: true, reset: true }) {
   Expr.pseudos[i] = createButtonPseudo(i);
}
// Add src/href attribute pseudos
⮕ for (i in { src: true, href: true }) {
   Expr.pseudos[i] = createURLPseudo(i);
}


// Easy API for creating new setFilters
⮕ function setFilters() { }
▶ setFilters.prototype = Expr.filters = Expr.pseudos;
▶ Expr.setFilters = new setFilters();

⮕ each(matchExpr.bool.source.match(/\w+/g), function (_i, name) {
   Expr.attrHandle[name] = eachElem(function (elem) {
      return !!(elem[name] || elem.hasAttribute(name));
   });
});

▶ tokenize = Sizzles.tokenize = function (selector) {
   var matched, soFar, match, groups, type;

   soFar = selector.trim();
   groups = [];

   while (soFar) {

      matched = false;

      if ((match = rcombinators.exec(soFar))) {
         matched = match.shift();

         groups.push({
            value: matched,
            type: match[0].replace(rtrim, " ")
         });
         soFar = soFar.slice(matched.length);
      }

      for (type in Expr.filter) {
         if ((match = matchExpr[type].exec(soFar))) {
            matched = match.shift();
            groups.push({
               type: type,
               value: matched,
               matches: match,
               unique: match[0]
            });
            soFar = soFar.slice(matched.length);
         }
      }

      if (!matched) {
         break;
      }
   }

   return soFar.length && soFar ?
      Sizzles.error(soFar) :
      groups.slice(0);
}

▶ function getDefaultAllDocumentElements(context) {
   var bySet = (context || []).length > 0,
      superMatcher = function (context, results, outermost) {
         var elem, results = results || [],
            i = 0,

            // We must always have either seed elements or outermost context
            elems = outermost && Expr.find["TAG"]("*", outermost),

            len = elems.length;

         // Add elements passing elementMatchers directly to results
         for (; i != len && (elem = elems[i]) != null; i++) {
            if (elem && elem.nodeType) {
               results.push(elem);
            }
         }
      };

   return bySet ?
      markFunction(superMatcher) :
      superMatcher;
}

▶ select = Sizzles.select = function (selector, context, results, seed) {
   selector = selector.replace(rtrimCommaWithSpace, " ").trim().split(",");
   var i = 0, token, tokens, j, match, len, matched, combine = [],

      defseed; // A local copy of seed [defseed]
   results = results || [];

   for (; i != null && (tokens = selector[i]) != null; i++) {

      defseed = seed || [];
      if (!seed) {
         getDefaultAllDocumentElements(context)(context, defseed, context);
      }

      match = tokenize(tokens);
      j = 0;
      len = match.length;
      for (; j != null && (token = match[j]) != null; j++) {
         if ((matched = runiqueRelative.exec(tokens))) {
            defseed = Expr.superExpr[matched[0]]([context]);
         }
         else if (Expr.superExpr[token.type]) {
            defseed = Expr.superExpr[token.type](defseed);
         }
         else if (token.type === "PSEUDO" && matchExpr.bool.test(token.unique)) {
            defseed = Expr.attrHandle[token.unique](defseed);
         } else {
            defseed = Expr.filter[token.type](
               token.matches[0], token.matches[1],
               (token.matches[2] || token.matches[3] || token.matches[4])
            )(defseed);
         }
      }

      push.apply(combine, defseed);
   }

   push.apply(
      results,
      Sizzles.uniqueSort(unique(combine))
   );
   return results;
};

// one time assignments

// Sort stability
▶ support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

// Always assume duplicates if they aren't passed to the comparison function
▶ support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

return Sizzles;
})

export default Sizzles;
// eof 
(window);
❌ ReferenceError: toType is not defined
< undefined
