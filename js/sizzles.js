var Sizzles =
/*!
 * Sizzles CSS Selector Engine v-1.0.0
 * http://Sizzlesjs.epizy.com/
 * 
 * No Copyright JS Foundation and other contributors
 * No Released under the MIT any license
 * 
 * Date: 14-07-2022
 */
(function (window, noGlobal) {
var i,
   support,
   Expr,
   each,
   getText,
   isXML,
   tokenize,
   select,
   hasDuplicate,

   // Local document vars
   setDocument,
   document,
   docElem,
   documentIsHTML,

   // Instance-specific data
   expando = "sizzles" + 1 * new Date(),
   preferredDoc = window.document,
   sortOrder = function (a, b) {
      if (a === b) {
         hasDuplicate = true;
      }
      return 0;
   },

   // Instance methods
   hasOwn = ({}).hasOwnProperty,
   arr = [],
   push = arr.push,
   slice = arr.slice,

   booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
      "ismap|loop|multiple|open|readonly|required|scoped",

   // Regular expressions

   whitespace = "[\\x20\\t\\r\\n\\f]",

   identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
      "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

   // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
   attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

      // Operator (capture 2)
      "*([*^$|!~]?=)" + whitespace +

      // "Attribute values must be CSS identifiers [capture 5]
      // or strings [capture 3 or capture 4]"
      "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
      whitespace + "*\\]",

   pseudos = ":(" + identifier + ")(?:\\((" +

      // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
      // 1. quoted (capture 3; capture 4 or capture 5)
      "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

      // 2. simple (capture 6)
      "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

      // 3. anything else (capture 2)
      ".*" +
      ")\\)|)",

   // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
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

      // For use in libraries implementing .is()
      // We use this for POS matching in `select`
      "needsContext": new RegExp("^" + whitespace +
         "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
         "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
   },

   rhtml = /HTML$/i,
   rinputs = /^(?:input|select|textarea|button)/i,
   rheader = /^h\d$/i,

   rnative = /^[^{]+\{\s*\[native \w/,

   // Easily-parseable/retrievable ID or TAG or CLASS selectors
   rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

   runiqueRelative = /^[> +~]+$/,

   rmsPrefix = /^-ms-/,
   rdashAlpha = /-([a-z])/g,

   // detect rcomma and lcomma and whitespaces
   rtrimCommaWithSpace = /(^,|,$|\s+)/g,

   rnoneAnimation = /^(none)\s*(0s)\s*(ease)\s*(0s).*(running)/,

   flat = arr.flat ? function (array) {
      return arr.flat.call(array);
   } : function (array) {
      return arr.concat.apply([], array);
   };

function Sizzles(selector, context, results, seed) {
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

   // All others
   return select(selector.replace(rtrim, "$1"), context, results, seed);
}

/**
* Mark a function for special use by Sizzle
* @param {Function} fn The function to mark
*/
function markFunction(fn) {
   fn[expando] = true;
   return fn;
}

/**
* Support testing using an element
* @param {Function} fn Passed the created element and returns a boolean result
*/
function assert(fn) {
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

/**
* Returns a Booleans true/false to use in check empty object
* @param {Object} obj accept paremeter only object
* @returns Booleans true/false
*/
function isEmptyObject(obj) {
   var name;
   for (name in obj) {
      return false;
   }
   return true;
}

/**
* Returns a function to use in pseudos for input types
* @param {String} type 
*/
function createInputPseudo(type) {
   return eachElem(function (elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === "input" && elem.type === type;
   });
}

/**
* Returns a function to use in pseudos for buttons
* @param {String} type 
* @returns function
*/
function createButtonPseudo(type) {
   return eachElem(function (elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return (nodeName === "input" || nodeName === "button") && elem.type === type;
   });
}

/**
* Returns a function to use in pseudos for :src/:href elements
* @param {String} attr node attributes
* @returns Function
*/
function createURLPseudo(attr) {
   return eachElem(function (elem) {
      return elem.nodeType && (!!elem[attr] || !!elem.getAttribute(attr));
   });
}

function createHiddenPseudo(isHidden) {
   return eachElem(function (elem) {
      var completed = window.getComputedStyle(elem).visibility === "hidden";
      return (completed || elem.hidden) === isHidden;
   });
}

/**
* Returns a function to use in pseudos for methods GET/POST
* @param {Methods} method GET || POST
* @returns Function
*/
function createFormsPseudo(method) {

   // Know :GET only detect the method get in form elements and :POST only get method post form elements
   return eachElem(function (elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase(),
         methods = elem.method || elem.getAttribute("method") || "",
         matchMethod = methods.toUpperCase() === method.toUpperCase();
      return nodeName === "form" && matchMethod;
   });
}

// Used by camelCase as callback to replace()
function fcamelCase(_all, letter) {
   return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase(string) {
   return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}

/**
* Returns a new clean filtered array object to use unique arraly element
* @param {Object} results array | object
* @returns newly filtered array
*/
function unique(results) {
   return slice.call(results).filter(function (value, index, arr) {
      return arr.indexOf(value) === index && value;
   });
}

function isArrayLike(obj) {
   try {
      // Support: real iOS 8.2 only (not reproducible in simulator)
      var length = !!obj && "length" in obj && obj.length,
         type = toType(obj);

   } catch (e) {

      // if when catching or detecting any errors return false
      return false;
   }

   if (isWindow(obj) || isFunction(obj)) {
      return false;
   }

   return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}

/**
* Returns a Array to use in pseudos reading one by one element
* @param {Booleans} invert true or false
* @param {Function} callbackFn accept only function
* @returns clean Array element
*/
function eachElem(invert, callbackFn) {
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

/**
* Returns a Array object to use in pseudos get array elements
* @param {Function} callback function
* @returns array object
*/
function mapElem(callback) {
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
each = Sizzles.each = function (obj, callback) {
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

/**
* Returns a function to use in pseudos for :enabled/:disabled
* @param {Boolean} disabled true for :disabled; false for :enabled
*/
function createDisabledPseudo(disabled) {
   return eachElem(function (elem) {

      if ("form" in elem) {
         if (elem.parentNode && elem.disabled === false) {

            if ("label" in elem) {
               if ("label" in elem.parentNode) {
                  return elem.parentNode.disabled === disabled;
               } else {
                  return elem.disabled === disabled;
               }
            }

            // Support: IE 6 - 11
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
            return elem.disabled === disabled ||
               elem.disabled !== !disabled;
         }

         return elem.disabled === disabled;

      } else if ("label" in elem) {
         return elem.disabled === disabled;
      }

      // Remaining elements are neither :enabled nor :disabled
      return false;
   });
}

// Expose support vars for convenience
support = Sizzles.support = {};

/**
* Detects XML nodes
* @param {Element|Object} elem An element or a document
* @returns {Boolean} True iff elem is a non-HTML XML node
*/
isXML = Sizzles.isXML = function (elem) {
   var namespace = elem && elem.namespaceURI,
      docElem = elem && (elem.ownerDocument || elem).documentElement;

   return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
};

/**
* Sets document-related variables once based on the current document
* @param {Element|Object} [doc] An element or document object to use to set the document
* @returns {Object} Returns the current document
*/
setDocument = Sizzles.setDocument = function (node) {
   var doc = node ? node.ownerDocument || node : preferredDoc;

   // Return early if doc is invalid or already selected
   // Support: IE 11+, Edge 17 - 18+
   // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
   // two documents; shallow comparisons work.
   // eslint-disable-next-line eqeqeq
   if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
      return document;
   }

   // Update global variables
   document = doc;
   docElem = document.documentElement;
   documentIsHTML = !isXML(document);

   // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
   // Safari 4 - 5 only, Opera <=11.6 - 12.x only
   // IE/Edge & older browsers don't support the :scope pseudo-class.
   // Support: Safari 6.0 only
   // Safari 6.0 supports :scope but it's an alias of :root there.
   support.scope = assert(function (el) {
      docElem.appendChild(el).appendChild(document.createElement("div"));
      return typeof el.querySelectorAll !== "undefined" &&
         !el.querySelectorAll(":scope fieldset div").length;
   });

   /* Attributes
   ---------------------------------------------------------------------- */

   // Support: IE<8
   // Verify that getAttribute really returns attributes and not properties
   // (excepting IE8 booleans)
   support.attributes = assert(function (el) {
      el.className = "i";
      return !el.getAttribute("className");
   });

   /* getElement(s)By*
   ---------------------------------------------------------------------- */

   // Check if getElementsByTagName("*") returns only elements
   support.getElementsByTagName = assert(function (el) {
      el.appendChild(document.createComment(""));
      return !el.getElementsByTagName("*").length;
   });

   // Support: IE<9
   support.getElementsByClassName = rnative.test(document.getElementsByClassName);

   /* QSA/matchesSelector
   ---------------------------------------------------------------------- */

   // QSA and matchesSelector support
   support.qsa = rnative.test(document.querySelectorAll);

   // Support: IE<10
   // Check if getElementById returns elements by name
   // The broken getElementById methods don't pick up programmatically-set names,
   // so use a roundabout getElementsByName test
   support.getById = assert(function (el) {
      docElem.appendChild(el).id = expando;
      return !document.getElementsByName || !document.getElementsByName(expando).length;
   });


   /* #ID
   ---------------------------------------------------------------------- */
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

   /* TAG 
   ---------------------------------------------------------------------- */
   Expr.find["TAG"] = support.getElementsByTagName ?
      function (tag, context) {
         if (typeof context.getElementsByTagName !== "undefined") {
            return context.getElementsByTagName(tag);

            // DocumentFragment nodes don't have gEBTN
         } else if (support.qsa) {
            return context.querySelectorAll(tag);
         }
      } :

      function (tag, context) {
         var elem,
            tmp = [],
            i = 0,

            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
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

   /* CLASS
   ---------------------------------------------------------------------- */
   Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
      if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
         return context.getElementsByClassName(className);

         // DocumentFragment nodes don't have gEBCN
      } else if (support.qsa) {
         return context.querySelectorAll(className);
      }
   };

   return document;
};

Sizzles.matches = function (expr, elements) {
   return Sizzles(expr, null, null, elements);
};

Sizzles.attr = function (elem, name) {

   // Set document vars if needed
   // Support: IE 11+, Edge 17 - 18+
   // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
   // two documents; shallow comparisons work.
   // eslint-disable-next-line eqeqeq
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

Sizzles.error = function (msg) {
   throw new Error("Syntax error, unrecognized expression: " + msg);
};


/**
* Document sorting and removing duplicates
* @param {ArrayLike} results
*/
Sizzles.uniqueSort = function (results) {
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

/**
* Utility function for retrieving the text value of an array of DOM nodes
* @return {Array|Element} elem
*/
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

      // Use textContent for elements
      // innerText usage removed for consistency of new lines (jQeury #11153)
      if (typeof elem.textContent === "string") {
         return elem.textContent;
      } else {

         // Traverse its children
         for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
         }
      }
   } else if (nodeType === 3 || nodeType === 4) {
      return elem.nodeValue;
   }

   // Do not include comment or processing instruction nodes
   return ret;
};

Expr = Sizzles.selectors = {

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

            /* eslint-disable max-len */
            return operator === "=" ? result === check :
               operator === "!=" ? result !== check :
                  operator === "^=" ? check && result.indexOf(check) === 0 :
                     operator === "*=" ? check && result.indexOf(check) > -1 :
                        operator === "$=" ? check && result.slice(-check.length) === check :
                           operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :

                              operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                 false;
            /* eslint-enable max-len */
         });
      }),

      "CHILD": markFunction(function (child) {
         return eachElem(function (elem) {
            return !!(elem.querySelectorAll(child) || []).length;
         });
      }),

      "PSEUDO": function (pseudo, argument) {

         // pseudo-class names are case-insensitive
         // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
         // Remember that setFilters inherits from pseudos
         var fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
            Sizzles.error("Unsupported pseudo: Failed execute '" + pseudo + "' not supported.");

         // The user may use createPseudo to indicate that
         // arguments are needed to create the filter function
         // just as Sizzle does
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
         // lang value must be a valid identifier
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

      // Miscellaneous
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

      // Boolean properties
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

      // Contents
      "empty": eachElem(function (elem) {

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

Expr.pseudos["nth"] = Expr.pseudos["eq"];
Expr.pseudos["is"] = Expr.pseudos["filter"];

// Add button/input type pseudos
for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
   Expr.pseudos[i] = createInputPseudo(i);
}
for (i in { search: true, url: true, range: true }) {
   Expr.pseudos[i] = createInputPseudo(i);
}
for (i in { submit: true, reset: true }) {
   Expr.pseudos[i] = createButtonPseudo(i);
}
// Add src/href attribute pseudos
for (i in { src: true, href: true }) {
   Expr.pseudos[i] = createURLPseudo(i);
}


// Easy API for creating new setFilters
function setFilters() { }
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

each(matchExpr.bool.source.match(/\w+/g), function (_i, name) {
   Expr.attrHandle[name] = eachElem(function (elem) {
      return !!(elem[name] || elem.hasAttribute(name));
   });
});

tokenize = Sizzles.tokenize = function (selector) {
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

function getDefaultAllDocumentElements(context) {
   var bySet = (context || []).length > 0,
      superMatcher = function (context, results, outermost) {
         var elem, results = results || [],
            i = 0,

            // We must always have either seed elements or outermost context
            elems = outermost && Expr.find["TAG"]("*", outermost),

            len = elems.length;

         // Add elements passing elementMatchers directly to results
         // Support: IE<9, Safari
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

select = Sizzles.select = function (selector, context, results, seed) {
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
support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

if (typeof noGlobal === "undefined") {
   window.Sizzles = window._s = window.s = Sizzles;
}

return Sizzles;
})
(window);