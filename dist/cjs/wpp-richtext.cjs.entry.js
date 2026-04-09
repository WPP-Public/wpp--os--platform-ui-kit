'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const config = require('./config-6aa0b6b4.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-e1f17a8c.js');
const types = require('./types-3dbf006d.js');
const _commonjsHelpers = require('./_commonjsHelpers-bcc1208a.js');
require('./wpp-icon-attach-707b14c2.js');
require('./WppIcon-55327707.js');
require('./wpp-icon-unordered-list-0d44ce00.js');
require('./wpp-icon-video-clip-7ac45275.js');
require('./const-09fdf30a.js');
require('./marked.umd-e1074c94.js');
require('./wpp-progress-indicator-24971b5e.js');
require('./wpp-icon-chevron-36ae3eb4.js');
require('./wpp-icon-gallery-16651b4a.js');
require('./lodash-6b012aab.js');
require('./wpp-action-button-8dd2d2f8.js');
require('./WrappedSlot-4a4ef805.js');
require('./wpp-input-fe676474.js');
require('./turndown.browser.es-eb372b89.js');
require('./consts-dba6e6dd.js');

_commonjsHelpers.createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
  defineProperty(
    GeneratorFunctionPrototype,
    "constructor",
    { value: GeneratorFunction, configurable: true }
  );
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    defineProperty(this, "_invoke", { value: enqueue });
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method;
    var method = delegate.iterator[methodName];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method, or a missing .next mehtod, always terminate the
      // yield* loop.
      context.delegate = null;

      // Note: ["return"] must be used for ES3 parsing compatibility.
      if (methodName === "throw" && delegate.iterator["return"]) {
        // If the delegate iterator has a return method, give it a
        // chance to clean up.
        context.method = "return";
        context.arg = undefined$1;
        maybeInvokeDelegate(delegate, context);

        if (context.method === "throw") {
          // If maybeInvokeDelegate(context) changed context.method from
          // "return" to "throw", let that override the TypeError below.
          return ContinueSentinel;
        }
      }
      if (methodName !== "return") {
        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a '" + methodName + "' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(val) {
    var object = Object(val);
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

const meta$a = (options) => {
  return {
    applyHtmlTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header'].map(tag => tag.toLowerCase())
  }
};

class AbstractTag {
  _getCustomPatternOrDefault (options, tagName, defaultPattern) {
    return options.tags && options.tags[tagName] && options.tags[tagName].pattern ? options.tags[tagName].pattern : defaultPattern
  }

  _getActiveTagsWithoutIgnore (tags, ignoreTags) {
    if (Array.isArray(ignoreTags)) {
      return tags.reduce((allowTags, tag) => {
        if (!ignoreTags.includes(tag)) {
          allowTags.push(tag.toLowerCase());
        }
        return allowTags
      }, [])
    }
    return tags
  }
}

class Header extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'header';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^(#){1,6}\s/g);
    this.getAction.bind(this);
    this._meta = meta$a();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length || !this.activeTags.find(tag => tag === 'header')) {
          resolve(false);
          return
        }
        const size = match[0].length;
        const [line] = this.quillJS.getLine(selection.index);
        const index = this.quillJS.getIndex(line);

        if (!this.activeTags.includes(`h${size - 1}`)) {
          return resolve(false)
        }

        setTimeout(() => {
          this.quillJS.formatLine(index, 0, 'header', size - 1);
          this.quillJS.deleteText(index, size);
          resolve(true);
        }, 0);
      })
    }
  }
}

const meta$9 = (options) => {
  return {
    applyHtmlTags: ['blockquote'].map(tag => tag.toLowerCase())
  }
};

class Blockquote$1 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'blockquote';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^(>)\s/g);
    this.getAction.bind(this);
    this._meta = meta$9();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }
        const originalText = match[0] || '';
        setTimeout(() => {
          this.quillJS.formatText(selection.index, match.input.length - 1, 'blockquote', true);
          this.quillJS.deleteText(
            selection.index - originalText.length,
            originalText.length
          );
          resolve(true);
        }, 0);
      }),
      release: () => {
        setTimeout(() => {
          const contentIndex = this.quillJS.getSelection().index;

          const [, length] = this.quillJS.getLine(contentIndex);
          if (length === 0) this.quillJS.format('blockquote', false);
        }, 0);
      }
    }
  }
}

class Blockquote extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'blockquote';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^\s{0,99}(>)\s/g);
    this.getAction.bind(this);
    this._meta = meta$9();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }
        const originalText = match[0] || '';
        setTimeout(() => {
          const startOffset = selection.index - 1;
          this.quillJS.deleteText(startOffset, 2);
          setTimeout(() => {
            this.quillJS.formatLine(startOffset, originalText.length - 3, 'blockquote', true);
            resolve(true);
          }, 0);
        }, 0);
      })
    }
  }
}

const meta$8 = (options) => {
  return {
    applyHtmlTags: ['bold'].map(tag => tag.toLowerCase())
  }
};

class Bold$2 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'bold';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /(\*|_){2}(.+?)(?:\1){2}/g);
    this.getAction.bind(this);
    this._meta = meta$8();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern, lineStart) => new Promise((resolve) => {
        let match = pattern.exec(text);
        const [annotatedText, , matchedText] = match;
        const startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g) || !this.activeTags.length) {
          resolve(false);
          return
        }

        setTimeout(() => {
          this.quillJS.deleteText(startIndex, annotatedText.length);
          setTimeout(() => {
            this.quillJS.insertText(startIndex, matchedText, { bold: true });
            this.quillJS.format('bold', false);
            resolve(true);
          });
        }, 0);
      })
    }
  }
}

const meta$7 = (options) => {
  return {
    applyHtmlTags: ['checkbox'].map(tag => tag.toLowerCase())
  }
};

class Checkbox$1 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'checkbox-checked';
    this.pattern = this._getCustomPatternOrDefault(options, 'checkbox', /^(\[x\])+\s/g);
    this.getAction.bind(this);
    this._meta = meta$7();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }
        const [line] = this.quillJS.getLine(selection.index);
        const index = this.quillJS.getIndex(line);
        setTimeout(() => {
          const replaceText = text.split('[x] ').splice(1, 1).join('');
          this.quillJS.insertText(index, replaceText);
          this.quillJS.deleteText(index + replaceText.length - 1, text.length);
          setTimeout(() => {
            this.quillJS.formatLine(index, 0, 'list', 'checked');
            resolve(true);
          });
        }, 0);
      })
    }
  }
}

class Checkbox extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'checkbox-unchecked';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^(\[\s?\])+\s/g);
    this.getAction.bind(this);
    this._meta = meta$7();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }
        const [line] = this.quillJS.getLine(selection.index);
        const index = this.quillJS.getIndex(line);
        setTimeout(() => {
          let replaceText = text.split('[ ] ').length > 1 ? text.split('[ ] ').splice(1, 1).join('') : text;
          replaceText = replaceText.split('[] ').length > 1 ? replaceText.split('[] ').splice(1, 1).join('') : replaceText;
          this.quillJS.insertText(index, replaceText);
          this.quillJS.deleteText(index + replaceText.length - 1, text.length);
          setTimeout(() => {
            this.quillJS.formatLine(index, 0, 'list', 'unchecked');
            resolve(true);
          });
        }, 0);
      })
    }
  }
}

const meta$6 = (options) => {
  return {
    applyHtmlTags: ['code'].map(tag => tag.toLowerCase())
  }
};

class inlineCode extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'code';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, (value) => { return /(`){1}(.+)(`){1}/g.test(value) && !(/```.*/.test(value)) ? value : null });
    this.getAction.bind(this);
    this._meta = meta$6();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern, lineStart) => new Promise((resolve) => {
        let match = /(`){1}(.+)(`){1}/g.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }

        const [annotatedText] = match;
        const startIndex = lineStart + match.index;
        setTimeout(() => {
          this.quillJS.deleteText(startIndex, annotatedText.length);
          setTimeout(() => {
            const message = annotatedText.replace(/`/g, '');
            this.quillJS.insertText(startIndex, message, { code: true });
            this.quillJS.insertText(startIndex + message.length, ' ', { code: false });
            resolve(true);
          }, 0);
        }, 0);
      })
    }
  }
}

const meta$5 = (options) => {
  return {
    applyHtmlTags: ['italics'].map(tag => tag.toLowerCase())
  }
};

class Bold$1 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'italic';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /(?:^|\s)(?:(\*|_)\s*(?<text1>[^*_]+)\s*?\1|(\*|_){3}\s*(?<text3>[^*_]*)\s*\1{3})(?:$|(?=\s))/g);
    this.getAction.bind(this);
    this._meta = meta$5();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern, lineStart) => new Promise((resolve) => {
        let match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }

        const [annotatedText, matchedToken, matchedText] = match;
        const firstToken = (this.quillJS.getText())[lineStart + match.index];
        const secondToken = (this.quillJS.getText())[lineStart + match.index + 1];

        if (matchedToken === firstToken && firstToken === secondToken) {
          resolve(false);
          // duplicated match string tag. ** or __
          return
        }

        const startIndex = lineStart + match.index;

        setTimeout(() => {
          const isFirstLine = !match.index;
          const adjustPosition = isFirstLine ? startIndex : startIndex + 1;
          const deleteEndOffset = isFirstLine ? annotatedText.length : annotatedText.length - 1;
          this.quillJS.deleteText(adjustPosition, deleteEndOffset);
          this.quillJS.insertText(adjustPosition, matchedText, { italic: true });
          this.quillJS.format('italic', false);
          resolve(true);
        }, 0);
      })
    }
  }
}

const meta$4 = (options) => {
  return {
    applyHtmlTags: ['link'].map(tag => tag.toLowerCase())
  }
};

class Link$3 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'link';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /(?:\[(.+?)\])(?:\((.+?)\))/g);
    this.getAction.bind(this);
    this._meta = meta$4();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern, lineStart) => new Promise((resolve) => {
        const match = pattern.exec(text);
        const startIndex = lineStart + match.index;
        const linkStartIndex = text.search(pattern);
        const matchedText = text.match(pattern)[0];
        const hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        const hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        if (!this.activeTags.length) {
          resolve(false);
          return
        }

        if (linkStartIndex !== -1) {
          setTimeout(() => {
            const removeOffset = startIndex;
            this.quillJS.deleteText(removeOffset, matchedText.length);
            this.quillJS.insertText(removeOffset, hrefText.slice(1, hrefText.length - 1),
              'link', hrefLink.slice(1, hrefLink.length - 1));
            resolve(true);
          }, 0);
        } else {
          resolve(false);
        }
      })
    }
  }
}

class Link$2 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'link';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /(?:\[(.+?)\])(?:\((.+?)\))/g);
    this.getAction.bind(this);
    this._meta = meta$4();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const startIndex = text.search(pattern);
        const matchedText = text.match(pattern)[0];
        const hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        const hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        const start = selection.index - 1 + startIndex;

        if (!this.activeTags.length) {
          resolve(false);
          return
        }

        if (startIndex !== -1) {
          setTimeout(() => {
            const inlineModeText = this.quillJS.getText(start - matchedText.length, matchedText.length);
            const beginOffset = inlineModeText === matchedText ? start - matchedText.length : start;
            this.quillJS.deleteText(beginOffset, matchedText.length);
            this.quillJS.insertText(beginOffset, hrefText.slice(1, hrefText.length - 1),
              'link', hrefLink.slice(1, hrefLink.length - 1));
            resolve(true);
          }, 0);
        } else {
          resolve(false);
        }
      })
    }
  }
}

const meta$3 = (options) => {
  return {
    applyHtmlTags: ['li'].map(tag => tag.toLowerCase())
  }
};

class Link$1 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'li';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^\s{0,9}(\d)+\.\s/g);
    this.getAction.bind(this);
    this._meta = meta$3();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }
        const [line] = this.quillJS.getLine(selection.index);
        const index = this.quillJS.getIndex(line);
        setTimeout(() => {
          const depth = text.split('. ')[0].split('').filter(e => /\s/gi.test(e)).length;
          const replaceText = text.split('. ').splice(1, 1).join('');
          this.quillJS.insertText(index, replaceText);
          this.quillJS.deleteText(index + replaceText.length - 1, text.length);
          setTimeout(() => {
            this.quillJS.formatLine(index, 0, { list: 'ordered', indent: depth });
            resolve(true);
          }, 0);
        }, 0);
      })
    }
  }
}

const meta$2 = (options) => {
  return {
    applyHtmlTags: ['ul'].map(tag => tag.toLowerCase())
  }
};

class Link extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'ul';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^\s{0,9}(-|\*){1}\s/);
    this.getAction.bind(this);
    this._meta = meta$2();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }

        if (!(text.split('- ')[1]) && !(text.split('* ')[1])) {
          resolve(false);
          return
        }

        const [line] = this.quillJS.getLine(selection.index);
        const index = this.quillJS.getIndex(line);

        setTimeout(() => {
          let offsetText = /^\s{0,9}(\*){1}\s/.test(text) ? text.replace('*', '-') : text;
          const depth = offsetText.split('- ')[0].split('').filter(e => /\s/gi.test(e)).length;
          let replaceText = offsetText.split('- ').length > 1 ? offsetText.split('- ').splice(1, 1).join('') : offsetText;
          this.quillJS.insertText(index, replaceText);
          this.quillJS.deleteText(index + replaceText.length - 1, text.length);
          setTimeout(() => {
            this.quillJS.formatLine(index, 0, { list: 'bullet', indent: depth });
            resolve(true);
          }, 0);
        }, 0);
      })
    }
  }
}

const meta$1 = (options) => {
  return {
    applyHtmlTags: ['pre'].map(tag => tag.toLowerCase())
  }
};

class Codeblock$1 extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'pre';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^(```).*/g);
    this.getAction.bind(this);
    this._meta = meta$1();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }

        const originalText = match[0] || '';
        setTimeout(() => {
          const startIndex = selection.index - originalText.length;
          this.quillJS.deleteText(startIndex, originalText.length);
          setTimeout(() => {
            this.quillJS.insertText(startIndex, '\n');
            const newLinePosition = startIndex + 1 + '\n'.length + 1;
            this.quillJS.insertText(newLinePosition - 1, '\n');
            this.quillJS.formatLine(newLinePosition - 2, 1, 'code-block', true);
            resolve(true);
          }, 0);
        }, 0);
      }),
      release: () => {
        setTimeout(() => {
          const cursorIndex = this.quillJS.getSelection().index;
          const block = this.quillJS.getLine(cursorIndex)[0];
          const blockText = block.domNode.textContent;
          if (block && blockText && blockText.replace('\n', '').length <= 0) {
            this.quillJS.format('code-block', false);
          }
        }, 0);
      }
    }
  }
}

class Codeblock extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'pre';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^(```)/g);
    this.getAction.bind(this);
    this._meta = meta$1();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern) => new Promise((resolve) => {
        const match = pattern.exec(text);
        if (!match || !this.activeTags.length) {
          resolve(false);
          return
        }
        const originalText = match[0] || '';
        const [line] = this.quillJS.getLine(selection.index);
        setTimeout(() => {
          const startIndex = this.quillJS.getIndex(line);
          this.quillJS.deleteText(startIndex, originalText.length + 1);
          setTimeout(() => {
            let line = this.quillJS.getLine(startIndex)[0];
            while (line) {
              const lineOffset = this.quillJS.getIndex(line);
              const _text = line.domNode.textContent;
              const offsetText = line.domNode.textContent.length;
              const isBreak = this.pattern.test(_text);
              if (isBreak) {
                this.quillJS.deleteText(lineOffset, _text.length);
                resolve(true);
                return
              }
              this.quillJS.formatLine(lineOffset, 0, 'code-block', true);
              line = this.quillJS.getLine(lineOffset + offsetText + 1)[0];
            }
            resolve(true);
          }, 0);
        }, 0);
      }),
      release: () => {
        setTimeout(() => {
          const cursorIndex = this.quillJS.getSelection().index;
          const block = this.quillJS.getLine(cursorIndex)[0];
          const blockText = block.domNode.textContent;
          if (block && blockText && blockText.replace('\n', '').length <= 0) {
            this.quillJS.format('code-block', false);
          }
        }, 0);
      }
    }
  }
}

const meta = (options) => {
  return {
    applyHtmlTags: ['strikethrough'].map(tag => tag.toLowerCase())
  }
};

class Bold extends AbstractTag {
  constructor (quillJS, options = {}) {
    super();
    this.quillJS = quillJS;
    this.name = 'strikethrough';
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /(?:~|_){2}(.+?)(?:~|_){2}/g);
    this.getAction.bind(this);
    this._meta = meta();
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags);
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern, lineStart) => new Promise((resolve) => {
        let match = pattern.exec(text);

        if (!this.activeTags.length) {
          resolve(false);
          return
        }

        const annotatedText = match[0];
        const matchedText = match[1];
        const startIndex = lineStart + match.index;

        if (text.match(/^([~_ \n]+)$/g)) {
          resolve(false);
          return
        }

        setTimeout(() => {
          this.quillJS.deleteText(startIndex, annotatedText.length);
          this.quillJS.insertText(startIndex, matchedText, { strike: true });
          this.quillJS.format('strike', false);
          resolve(true);
        }, 0);
      })
    }
  }
}

class TagsOperators {
  constructor (quillJS, options = { tags: {} }) {
    this.quillJS = quillJS;
    this.getOperatorsAll.bind(this);
    this.supportInlineTags = [
      new Header(this.quillJS, options).getAction(),
      new Blockquote$1(this.quillJS, options).getAction(),
      new Bold$2(this.quillJS, options).getAction(),
      new Codeblock$1(this.quillJS, options).getAction(),
      new inlineCode(this.quillJS, options).getAction(),
      new Bold(this.quillJS, options).getAction(),
      new Bold$1(this.quillJS, options).getAction(),
      new Link$3(this.quillJS, options).getAction()
    ];

    this.supportfullTextTags = [
      new Header(this.quillJS, options).getAction(),
      new Checkbox$1(this.quillJS, options).getAction(),
      new Checkbox(this.quillJS, options).getAction(),
      new Link$1(this.quillJS, options).getAction(),
      new Link(this.quillJS, options).getAction(),
      new Blockquote(this.quillJS, options).getAction(),
      new Codeblock(this.quillJS, options).getAction(),
      new Bold$2(this.quillJS, options).getAction(),
      new Link$2(this.quillJS, options).getAction(),
      new inlineCode(this.quillJS, options).getAction(),
      new Bold(this.quillJS, options).getAction(),
      new Bold$1(this.quillJS, options).getAction()
    ];

    this.tags = [...this.supportInlineTags];
    this.fullTextTags = [...this.supportfullTextTags];
  }

  getOperatorsAll () {
    return this.tags
  }

  getFullTextOperatorsAll () {
    return this.fullTextTags
  }
}

class MarkdownActivity {
  constructor (quillJS, options = {}) {
    this.quillJS = quillJS;
    this.options = options;
    this.onTextChangeBound = this.onTextChange.bind(this);
    this.quillJS.on('text-change', this.onTextChangeBound);
    this.actionCharacters = {
      whiteSpace: ' ',
      newLine: '\n',
      asterisk: '*',
      rightParenthesis: ')',
      grave: '`',
      tilde: '~',
      underscore: '_'
    };
    this.ignoreTags = ['PRE', ...(options.ignoreTags || [])];
    this.tags = new TagsOperators(this.quillJS, options);
    this.matches = this.tags.getOperatorsAll();
    this.fullMatches = this.tags.getFullTextOperatorsAll();
  }

  destroy () {
    this.quillJS.off('text-change', this.onTextChangeBound);
  }

  onTextChange (delta, oldContents, source) {
    if (source !== 'user') return
    const cursorOffset = (delta.ops[0] && delta.ops[0].retain) || 0;
    const inputText = delta.ops[0].insert || (delta.ops[1] && delta.ops[1].insert);
    const [removeLine] = this.quillJS.getLine(cursorOffset);
    const insertDelta = delta.ops.find(e => e.hasOwnProperty('insert')) || {};
    const isRemoveCommand = delta.ops.find(e => e.hasOwnProperty('delete')) || insertDelta.insert === '\n';
    if (isRemoveCommand && removeLine.domNode.textContent.length <= 1) {
      const rangeElements = ['PRE', 'BLOCKQUOTE'];
      if (rangeElements.includes(removeLine.domNode.tagName)) {
        this.onRemoveElement({ delete: 1 });
      }
    }

    if (!inputText) return
    if (inputText.length > 1) {
      setTimeout(async () => {
        const cursorOffsetFixed = cursorOffset;
        const tokens = inputText.split('\n');
        let _offset = cursorOffsetFixed;
        // eslint-disable-next-line no-unused-vars
        for (let v of tokens) {
          const [line] = this.quillJS.getLine(_offset);
          if (!line) {
            return 0
          }
          const firstIndex = this.quillJS.getIndex(line);
          let _targetText = '';
          let result = await this.onFullTextExecute.bind(this)({ index: firstIndex, delta, length: 0 });

          if (result) {
            while (result) {
              const [line] = this.quillJS.getLine(_offset);
              const firstIndex = this.quillJS.getIndex(line);
              if (!line || !(line.domNode)) {
                result = false;
                break
              }

              _targetText = line.domNode.textContent || '';
              result = await this.onFullTextExecute.bind(this)({ index: firstIndex, delta, length: 0 });
            }
          } else {
            _targetText = line.domNode.textContent || '';
          }
          _offset += _targetText.length + 1;
        }
      }, 0);
      return
    }

    delta.ops.filter(e => e.hasOwnProperty('insert')).forEach(e => {
      switch (e.insert) {
        case this.actionCharacters.whiteSpace:
        case this.actionCharacters.rightParenthesis:
        case this.actionCharacters.asterisk:
        case this.actionCharacters.grave:
        case this.actionCharacters.newLine:
        case this.actionCharacters.tilde:
        case this.actionCharacters.underscore:
          this.onInlineExecute.bind(this)();
          break
      }
    });

    delta.ops.filter(e => e.hasOwnProperty('delete')).forEach((e) => {
      this.onRemoveElement(e);
    });
  }

  onInlineExecute () {
    const selection = this.quillJS.getSelection();
    if (!selection) return
    const [line, offset] = this.quillJS.getLine(selection.index);
    const text = line.domNode.textContent;
    const lineStart = selection.index - offset;
    const format = this.quillJS.getFormat(lineStart);
    if (format['code-block'] || format['code']) {
      // if exists text in code-block, to skip.
      return
    }
    for (let match of this.matches) {
      const matchedText = typeof match.pattern === 'function' ? match.pattern(text) : text.match(match.pattern);
      if (matchedText) {
        match.action(text, selection, match.pattern, lineStart);
        return
      }
    }
  }

  async onFullTextExecute (virtualSelection) {
    let selection = virtualSelection || this.quillJS.getSelection();
    const delta = virtualSelection.delta;
    if (!selection) return false
    const [line, offset] = this.quillJS.getLine(selection.index);

    if (!line || offset < 0) return false
    const retain = (delta && delta.ops && delta.ops[0].retain) || 0;
    const lineStart = selection.index - offset;
    const formatLineStart = retain ? retain - 1 : lineStart;
    const format = this.quillJS.getFormat(formatLineStart);
    if (format['code-block'] || format['code']) {
      // if exists text in code-block, to skip.

      if (format['code']) {
        // ignore all styles when copied text in code block.
        const copiedTexts = delta.ops.filter(d => d.insert).map(d => d.insert).join('');
        this.quillJS.deleteText(retain, copiedTexts.length);
        this.quillJS.insertText(retain, copiedTexts.replace(/\n/g, ''), { code: true });
        this.quillJS.format('code', false);
      }
      return false
    }
    const beforeNode = this.quillJS.getLine(lineStart - 1)[0];
    const beforeLineText = beforeNode && beforeNode.domNode.textContent;
    const text = line.domNode.textContent + ' ';
    selection.length = selection.index++;
    // remove block rule.
    if (typeof beforeLineText === 'string' && beforeLineText.length > 0 && text === ' ') {
      const releaseTag = this.fullMatches.find(e => e.name === line.domNode.tagName.toLowerCase());
      if (releaseTag && releaseTag.release) {
        releaseTag.release(selection);
        return false
      }
    }

    for (let match of this.fullMatches) {
      const matchedText = typeof match.pattern === 'function' ? match.pattern(text) : text.match(match.pattern);
      if (matchedText) {
        // eslint-disable-next-line no-return-await
        return await match.action(text, selection, match.pattern, lineStart)
      }
    }
    return false
  }

  onRemoveElement (range) {
    const selection = this.quillJS.getSelection();
    // if removed one item before, editor need to clear item.
    if (range && range.delete === 1) {
      const removeItem = this.quillJS.getLine(selection.index);
      const lineItem = removeItem[0];
      const releaseTag = this.matches.find(e => e.name === lineItem.domNode.tagName.toLowerCase());
      if (releaseTag && releaseTag.release) {
        releaseTag.release(selection);
      }
    }
  }
}

if (typeof window !== 'undefined') {
  window.QuillMarkdown = MarkdownActivity;
}

const wppRichtextCss = ".ql-image-actions__overlay{position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px dashed var(--richtext-border-color-hover)}.ql-image-actions__toolbar{position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;top:-26px;margin-left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);padding:0 6px;z-index:1;display:-ms-flexbox;display:flex;gap:4px;border:1px solid var(--richtext-border-color);background:white;cursor:default;border-radius:var(--wpp-border-radius-s)}.ql-image-actions__toolbar:hover{border:1px solid var(--richtext-border-color-active)}.ql-image-actions__toolbar-button{display:inline-block;width:24px;height:24px;padding:2px;vertical-align:middle;color:var(--richtext-button-inactive-color);background-color:var(--richtext-button-background-color);cursor:pointer}.ql-image-actions__toolbar-button:hover{color:var(--richtext-button-inactive-hover-color)}.ql-image-actions__toolbar-button:active{color:var(--richtext-button-inactive-click-color)}.ql-image-actions__toolbar-button.is-selected{color:var(--richtext-button-active-color)}.ql-image-actions__toolbar-button.is-selected:hover{color:var(--richtext-button-active-hover-color)}.ql-image-actions__toolbar-button.is-selected:active{color:var(--richtext-button-active-click-color)}.ql-image-actions__toolbar-button svg{display:inline-block;width:20px;height:20px;vertical-align:middle;fill:currentColor}.ql-image-actions__resize-handle{position:absolute;background-color:white;border:1px solid var(--richtext-border-color);-webkit-box-sizing:border-box;box-sizing:border-box;opacity:0.8}.image-actions__proxy-image{position:absolute;display:block;max-width:none}.ql-editor .ql-attachment-uploading .wpp-progress-indicator{--pi-width:.8em !important;--pi-circle-stroke-width:12;margin-right:7px}.ql-container>.ql-uploading-progress-indicator{--pi-width:20px;--pi-circle-stroke-width:8;position:absolute;pointer-events:none}.wpp-richtext{--richtext-padding:var(--wpp-richtext-padding, 9px 12px);--richtext-label-color:var(--wpp-richtext-label-color, var(--wpp-text-color-info));--richtext-characters-limit-label-color:var(--wpp-richtext-characters-limit-label-color, var(--wpp-grey-color-800));--richtext-label-margin:var(--wpp-richtext-label-margin, 0 0 8px 0);--richtext-inline-message-margin:var(--wpp-richtext-inline-message-margin, 4px 0 0 0);--richtext-placeholder-color:var(--wpp-richtext-placeholder-color, var(--wpp-grey-color-700));--richtext-text-color-disabled:var(--wpp-richtext-text-color-disabled, var(--wpp-text-color-disabled));--richtext-characters-limit-font-weight:var(--wpp-richtext-characters-limit-font-weight, 400);--richtext-warning-charecters-limit-color:var(--wpp-richtext-border-radius, var(--wpp-warning-color-500));--richtext-error-charecters-limit-color:var(--wpp-richtext-border-radius, var(--wpp-danger-color-500));--richtext-bg-color:var(--wpp-richtext-bg-color, transparent);--richtext-bg-color-hover:var(--wpp-richtext-bg-color-hover, var(--wpp-grey-color-200));--richtext-bg-color-active:var(--wpp-richtext-bg-color-active, transparent);--richtext-bg-color-disabled:var(--wpp-richtext-bg-color-disabled, var(--wpp-grey-color-100));--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color));--richtext-border-width:var(--wpp-richtext-border-width, var(--wpp-border-width-s));--richtext-border-style:var(--wpp-richtext-border-style, solid);--richtext-border-radius:var(--wpp-richtext-border-radius, var(--wpp-border-radius-m));--richtext-border-color:var(--wpp-richtext-border-color, var(--wpp-grey-color-500));--richtext-border-color-hover:var(--wpp-richtext-border-color-hover, var(--wpp-grey-color-700));--richtext-border-color-active:var(--wpp-richtext-border-color-active, var(--wpp-grey-color-800));--richtext-border-color-disabled:var(--wpp-richtext-border-color-disabled, var(--wpp-grey-color-400));--richtext-first-border-color-focus:var(--wpp-richtext-first-border-color-focus, var(--wpp-grey-color-000));--richtext-second-border-color-focus:var(--wpp-richtext-second-border-color-focus, var(--wpp-brand-color));--richtext-toolbar-outline-color:var(--wpp-richtext-toolbar-outline-color, var(--wpp-brand-color));--richtext-warning-border-color:var(--wpp-richtext-warning-border-color, var(--wpp-warning-color-400));--richtext-error-border-color:var(--wpp-richtext-error-border-color, var(--wpp-danger-color-400));--richtext-tooltip-padding:var(--wpp-richtext-tooltip-padding, 5px 12px);--richtext-tooltip-color:var(--wpp-richtext-tooltip-color, var(--wpp-typography-color));--richtext-tooltip-bg-color:var(--wpp-richtext-tooltip-bg-color, var(--wpp-grey-color-000));--richtext-button-inactive-color:var(--wpp-grey-color-600);--richtext-button-inactive-hover-color:var(--wpp-grey-color-700);--richtext-button-inactive-click-color:var(--wpp-grey-color-800);--richtext-button-active-color:var(--wpp-primary-color-500);--richtext-button-active-hover-color:var(--wpp-primary-color-400);--richtext-button-active-click-color:var(--wpp-primary-color-600);--richtext-button-background-color:var(--wpp-grey-color-000);--richtext-editor-min-width:var(--wpp-richtext-editor-min-width, 376px);--richtext-float-gap:1em;--richtext-editor-min-height:var(--wpp-richtext-editor-min-height, 136px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:var(--richtext-editor-min-width)}.wpp-richtext .label{margin:var(--richtext-label-margin)}.wpp-richtext .ql-form-control{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-height:0;min-width:var(--richtext-editor-min-width)}.wpp-richtext .ql-form-control.tab-focus.tab-focus{border-radius:var(--wpp-border-radius-m);outline:none;-webkit-box-shadow:0 0 0 1px var(--richtext-first-border-color-focus), 0 0 0 3px var(--richtext-second-border-color-focus);box-shadow:0 0 0 1px var(--richtext-first-border-color-focus), 0 0 0 3px var(--richtext-second-border-color-focus)}.wpp-richtext .ql-form-control.tab-focus .ql-toolbar *:focus{outline-color:var(--richtext-toolbar-outline-color)}.wpp-richtext .ql-form-control,.wpp-richtext .ql-form-control .ql-toolbar,.wpp-richtext .ql-form-control .ql-container{border:var(--richtext-border-width) var(--richtext-border-style) var(--richtext-border-color);border-radius:var(--richtext-border-radius)}.wpp-richtext .ql-form-control .ql-container{height:100%;min-height:var(--richtext-editor-min-height)}.wpp-richtext .ql-form-control .ql-toolbar,.wpp-richtext .ql-form-control .ql-container{border-left:none;border-right:none;border-top-width:0;border-bottom-width:0}.wpp-richtext .ql-form-control .ql-toolbar+.ql-container,.wpp-richtext .ql-form-control .ql-container+.ql-toolbar{border-top-left-radius:0;border-top-right-radius:0;border-top-width:var(--richtext-border-width)}.wpp-richtext .ql-form-control:hover:not(.active),.wpp-richtext .ql-form-control:hover:not(.active) .ql-toolbar,.wpp-richtext .ql-form-control:hover:not(.active) .ql-container{border-color:var(--richtext-border-color-hover)}.wpp-richtext .ql-form-control:hover:not(.active) .ql-container{background-color:var(--wpp-grey-color-200)}.wpp-richtext .ql-form-control.active,.wpp-richtext .ql-form-control.active .ql-toolbar,.wpp-richtext .ql-form-control.active .ql-container{border-color:var(--richtext-border-color-active)}.wpp-richtext .ql-form-control.warning,.wpp-richtext .ql-form-control.warning:hover{border:var(--richtext-border-width) var(--richtext-border-style) var(--wpp-warning-color-400)}.wpp-richtext .ql-form-control.error,.wpp-richtext .ql-form-control.error:hover{border:var(--richtext-border-width) var(--richtext-border-style) var(--wpp-danger-color-400)}.wpp-richtext .ql-form-control.disabled *,.wpp-richtext .ql-form-control.disabled .ql-editor.ql-blank:before,.wpp-richtext .ql-form-control.disabled:hover *,.wpp-richtext .ql-form-control.disabled:hover .ql-editor.ql-blank:before{cursor:not-allowed;color:var(--richtext-text-color-disabled)}.wpp-richtext .ql-form-control.disabled,.wpp-richtext .ql-form-control.disabled .ql-toolbar,.wpp-richtext .ql-form-control.disabled .ql-container,.wpp-richtext .ql-form-control.disabled:hover,.wpp-richtext .ql-form-control.disabled:hover .ql-toolbar,.wpp-richtext .ql-form-control.disabled:hover .ql-container{border-color:var(--richtext-border-color-disabled)}.wpp-richtext .ql-form-control.disabled .ql-toolbar,.wpp-richtext .ql-form-control.disabled:hover .ql-toolbar{pointer-events:none}.wpp-richtext .ql-form-control.disabled .ql-container,.wpp-richtext .ql-form-control.disabled:hover .ql-container{background-color:var(--richtext-bg-color-disabled)}.wpp-richtext .ql-form-control.warning,.wpp-richtext .ql-form-control.warning:hover{border-color:var(--richtext-warning-border-color)}.wpp-richtext .ql-form-control.error,.wpp-richtext .ql-form-control.error:hover{border-color:var(--richtext-error-border-color)}.wpp-richtext .ql-form-control .form-control-input{position:absolute;left:0;bottom:0;z-index:0;opacity:0;pointer-events:none}.wpp-richtext .ql-toolbar{display:-ms-flexbox;display:flex;padding:2px 12px;-ms-flex-wrap:wrap;flex-wrap:wrap;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.wpp-richtext .ql-toolbar *:focus{outline-color:transparent}.wpp-richtext .ql-toolbar .ql-picker-label .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}.wpp-richtext .ql-toolbar .ql-picker-label[aria-expanded=true] .wpp-icon-chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.wpp-richtext .ql-editor{height:100%}.wpp-richtext .ql-editor.ql-blank:before{color:var(--richtext-placeholder-color)}.wpp-richtext .messages-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin:var(--richtext-inline-message-margin)}.wpp-richtext .messages-wrapper.without-text-message{-ms-flex-pack:end;justify-content:flex-end}.wpp-richtext .characters-limit{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin-left:32px}.wpp-richtext .characters-limit.warning .wpp-typography{color:var(--richtext-warning-charecters-limit-color)}.wpp-richtext .characters-limit.warning .wpp-typography:first-child::part(typography){color:var(--richtext-warning-charecters-limit-color)}.wpp-richtext .characters-limit.error .wpp-typography{color:var(--richtext-error-charecters-limit-color)}.wpp-richtext .characters-limit.error .wpp-typography:first-child::part(typography){color:var(--richtext-error-charecters-limit-color)}.wpp-richtext .characters-limit .wpp-typography:first-child{--wpp-typography-color:$labelColor;white-space:nowrap}.wpp-richtext .characters-limit .wpp-typography:first-child::part(typography){color:var(--richtext-characters-limit-label-color);font-weight:var(--richtext-characters-limit-font-weight)}.wpp-richtext .characters-limit .entered-characters{margin-left:2px;white-space:nowrap}.ql-toolbar[hidden],.ql-container[hidden]{display:block}.ql-tooltip{padding:var(--richtext-tooltip-padding);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);border-radius:var(--wpp-border-radius-s);color:var(--richtext-tooltip-color);background-color:var(--richtext-tooltip-bg-color);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.preserve-whitespace,.preserve-whitespace .ql-editor{white-space:pre-wrap;word-break:break-word}";

const overwriteMerge = (destination, source) => source;
const WppRichtext = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppInit = index.createEvent(this, "wppInit", 1);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppSelectionChange = index.createEvent(this, "wppSelectionChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppUploadRequest = index.createEvent(this, "wppUploadRequest", 5);
    this._locales = config.LOCALES_DEFAULTS;
    this.onFocusIn = (event) => {
      if (!this.active) {
        this.active = true;
        this.wppFocus.emit(event);
      }
    };
    this.onFocusOut = (event) => {
      const isInternalBlur = !event.relatedTarget || this.host.contains(event.relatedTarget);
      if (!isInternalBlur) {
        this.active = false;
        this.focusType = common.FOCUS_TYPE.NONE;
        this.wppBlur.emit(event);
      }
      else {
        event.preventDefault();
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    };
    this.onMouseDown = (e) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      if (this.disabled) {
        e.preventDefault();
      }
    };
    this.onEditorBlur = () => {
      this.savedSelectionRange = this.quill.selection.savedRange;
    };
    this.onEditorFocus = () => {
      if (this.focusType === common.FOCUS_TYPE.TAB) {
        this.quill.selection.setRange(this.savedSelectionRange);
      }
    };
    this.onDragstart = (e) => {
      // this.dragElement can be already set from outside, in imageLibrary for example
      if (!this.dragElement && e.target instanceof HTMLElement) {
        const tagName = e.target.tagName.toLowerCase();
        const eventTarget = e.target.eventTarget;
        if ((tagName && (tagName === 'img' || tagName === 'video')) || eventTarget) {
          const el = eventTarget || e.target;
          //@ts-ignore typing
          const blot = el.__blot?.blot;
          if (blot) {
            this.dragElement = blot.domNode;
            this.quill.setSelection(this.quill.getIndex(blot), blot.length());
          }
        }
      }
      if (this.dragElement && e.dataTransfer) {
        e.dataTransfer.clearData();
        e.dataTransfer.setData('text/html', this.dragElement.outerHTML.replace(config.embedBlotInnerHtmlRegexp, ''));
        this.dragThumbnail = config.createDragThumbnail(this.dragElement);
        e.dataTransfer.setDragImage(this.dragThumbnail, 0, 0);
      }
    };
    this.onDragend = () => {
      this.dragElement = null;
      if (this.dragThumbnail) {
        document.body.removeChild(this.dragThumbnail);
      }
    };
    this.onDrop = () => {
      const tagName = this.dragElement?.tagName.toLowerCase();
      // Workaround for Video elements
      if (tagName === 'video') {
        this.dragElement?.remove();
        this.quill.update(types.sources.user);
      }
    };
    this.updateEnteredCharacters = () => {
      if (this.charactersLimit) {
        // -1 because Quill adds a newline character at the end even when the editor is empty
        this.enteredCharacters = this.quill.getText().length - 1;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-richtext': true,
    });
    this.formControlCssClasses = () => ({
      'ql-form-control': true,
      active: this.active,
      [config.KEYBOARD_FOCUS_CLASS]: this.active && this.focusType === common.FOCUS_TYPE.TAB,
      [`${this.messageType}`]: Boolean(this.messageType),
      disabled: this.disabled,
    });
    this.hasWarning = () => {
      if (!this.charactersLimit)
        return false;
      if (this.enteredCharacters < this.warningThreshold)
        return false;
      if (this.enteredCharacters > this.charactersLimit)
        return false;
      return true;
    };
    this.charLimitCssClasses = () => ({
      'characters-limit': true,
      warning: this.hasWarning(),
      error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
    });
    this.messageCssClasses = () => ({
      'messages-wrapper': true,
      'without-text-message': !!this.charactersLimit && !this.message,
    });
    this.focusType = undefined;
    this.enteredCharacters = undefined;
    this.plainText = '';
    this.name = undefined;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.charactersLimit = undefined;
    this.locales = {};
    this.warningThreshold = 20;
    this.active = false;
    this.format = types.formats.html;
    this.preserveWhitespace = true;
    this.bounds = undefined;
    this.value = undefined;
    this.debug = types.debugLevels.warn;
    this.formats = [];
    this.modules = undefined;
    this.placeholder = 'Insert text here...';
    this.scrollingContainer = undefined;
    this.strict = true;
    this.styles = '{}';
  }
  syncValueAndEmit(source) {
    const newValue = this.getValue();
    if (newValue !== this.value) {
      this.value = newValue;
      if (this.formControlInput) {
        this.formControlInput.value = this.value;
      }
      if (this.format === types.formats.markdown) {
        const { plainText } = config.processMarkdownValue(this.value);
        this.plainText = plainText;
      }
      else {
        this.plainText = this.value || '';
      }
      this.wppChange.emit({
        value: this.value,
        plainText: this.plainText,
        editor: this.quill,
        source,
        name: this.name,
      });
    }
  }
  setValue(value) {
    if (this.format === types.formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, types.sources.api);
    }
    else if (this.format === types.formats.markdown) {
      const str = String(value || '');
      // Process markdown: blank lines (\n\n) are preserved as visible empty paragraphs via &nbsp; markers
      const { html, plainText } = config.processMarkdownValue(str);
      this.plainText = plainText;
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, types.sources.api);
      // cleanup of empty <li>
      const editorEl = this.quill.root;
      const emptyListItems = editorEl.querySelectorAll('li');
      let removedCount = 0;
      emptyListItems.forEach(li => {
        const trimmedContent = li.innerHTML.trim();
        if (trimmedContent === '<br>' || trimmedContent === '') {
          li.remove();
          removedCount++;
        }
      });
      if (removedCount > 0) {
        this.quill.update(types.sources.api);
      }
    }
    else if (this.format === types.formats.text) {
      this.quill.setText(value, types.sources.api);
    }
    else if (this.format === types.formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), types.sources.api);
      }
      catch (_) {
        this.quill.setText(value, types.sources.api);
      }
    }
    else {
      this.quill.setText(value, types.sources.api);
    }
  }
  getValue() {
    const text = this.quill.getText();
    const content = this.quill.getContents();
    let html = this.quill.root.innerHTML || '';
    if (html === '<p><br></p>' || html === '<div><br></div>') {
      html = '';
    }
    if (this.format === types.formats.html) {
      return config.exportHtml(html);
    }
    else if (this.format === types.formats.markdown) {
      let markdown = config.turndownService.turndown(html);
      // Trim leading/trailing whitespace only - preserve internal blank lines
      markdown = markdown.trim();
      return markdown;
    }
    else if (this.format === types.formats.text) {
      return text;
    }
    else if (this.format === types.formats.json) {
      try {
        return JSON.stringify(content);
      }
      catch (_) {
        return text;
      }
    }
    else {
      return text;
    }
  }
  componentDidLoad() {
    let modules = {};
    try {
      if (this.modules) {
        modules = JSON.parse(this.modules);
      }
    }
    catch (_) {
      throw new Error('Cannot parse "modules" attribute');
    }
    modules = config.deepmerge_1(types.Quill.DEFAULTS.modules, modules, { arrayMerge: overwriteMerge });
    const customToolbarElem = this.host.querySelector('[slot="quill-toolbar"]');
    if (customToolbarElem) {
      modules['toolbar'] = customToolbarElem;
    }
    // *** Markdown Integration ***
    types.Quill.register('modules/QuillMarkdown', MarkdownActivity, true);
    if (this.format === types.formats.markdown) {
      modules.QuillMarkdown = config.quillMarkdownOptions;
    }
    this.quill = new types.Quill(this.containerElement, {
      ...types.Quill.DEFAULTS,
      ...{
        debug: this.debug,
        modules,
        placeholder: this.placeholder,
        theme: 'wpp',
        formats: [...types.Quill.DEFAULTS.formats, ...this.formats],
        bounds: this.bounds ? (this.bounds === 'self' ? this.containerElement : this.bounds) : document.body,
        strict: this.strict,
        scrollingContainer: this.scrollingContainer,
      },
    });
    const el = this.host;
    el.quill = this.quill;
    el.format = this.format;
    el.name = this.name;
    // Used in quill-upload plugin
    this.quill.editor.scroll.quill = this.quill;
    this.quill.wppRichtext = this;
    this.host.addEventListener(config.KEYBOARD_FOCUS_EVENT, () => {
      this.focusType = common.FOCUS_TYPE.TAB;
    });
    if (this.styles) {
      const styles = JSON.parse(this.styles);
      Object.keys(styles).forEach((key) => {
        this.containerElement.style.setProperty(key, styles[key]);
      });
    }
    if (this.value) {
      this.setValue(this.value);
      this.quill.history.clear();
    }
    this.updateEnteredCharacters();
    this.selectionChangeEvent = this.quill.on('selection-change', (range, oldRange, source) => {
      this.wppSelectionChange.emit({
        editor: this.quill,
        range,
        oldRange,
        source,
      });
    });
    this.host.addEventListener('focusin', this.onFocusIn);
    this.host.addEventListener('focusout', this.onFocusOut);
    this.host.addEventListener('keyup', this.onKeyUp);
    this.host.addEventListener('mousedown', this.onMouseDown);
    this.quill.root.addEventListener('keyup', this.onKeyUp);
    this.quill.root.addEventListener('blur', this.onEditorBlur);
    this.quill.root.addEventListener('focus', this.onEditorFocus);
    this.containerElement.parentElement.addEventListener('dragstart', this.onDragstart);
    this.containerElement.parentElement.addEventListener('dragend', this.onDragend);
    this.containerElement.parentElement.addEventListener('drop', this.onDrop);
    this.quill.root.addEventListener(types.UPLOAD_REQUEST_EVENT, e => {
      e.stopPropagation();
      e.preventDefault();
      //@ts-ignore event type
      this.wppUploadRequest.emit(e.detail);
    });
    this.formControlInput?.addEventListener('focus', () => {
      this.quill.root.focus();
    });
    utils.autoFocusElement(this.autoFocus, this.quill.root);
    this.updateDisabled(this.disabled);
    setTimeout(() => {
      this.wppInit.emit(this.quill);
    });
    // --- TEXT CHANGE HANDLER ---
    this.quill.on('text-change', (_delta, _oldDelta, source) => {
      if (source !== 'user')
        return;
      const range = this.quill.getSelection();
      if (!range) {
        // Need to sync and emit value change on any user interaction
        // to ensure the editor is in a consistent state
        this.syncValueAndEmit(source);
        return;
      }
      const [line, offset] = this.quill.getLine(range.index);
      const text = line.domNode.textContent || '';
      // --- Heading Logic ---
      const headingMatch = text.match(/^(#{1,6})\s/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const newText = text.replace(/^(#{1,6}\s)/, '');
        const docLineStart = range.index - offset;
        this.quill.deleteText(docLineStart, text.length, 'user');
        this.quill.insertText(docLineStart, newText, 'user');
        this.quill.formatLine(docLineStart, newText.length, 'header', level, 'user');
        this.syncValueAndEmit(source);
        return;
      }
      // --- Intra -word emphasis Logic (asterisk-based only) ---
      // This regex uses negative lookbehind/lookahead to match only single asterisks:
      // eslint-disable-next-line no-useless-escape
      const italicRegex = /(?<!\*)\*([^\*\s]+?)\*(?!\*)/g;
      const italicMatches = Array.from(text.matchAll(italicRegex));
      if (italicMatches && italicMatches.length > 0) {
        const docLineStart = range.index - offset;
        // Process the matches in reverse order using forEach
        italicMatches.reverse().forEach(match => {
          // If match.index is undefined, skip processing this match
          if (match.index === undefined)
            return;
          // match[0] is the full matched string (e.g. "*b*")
          // match[1] is the captured content that should be italicized (e.g. "b")
          const content = match[1];
          const matchIndex = match.index; // relative index in the line
          const fullMatchLength = match[0].length;
          const contentLength = content.length;
          // Delete the opening marker at (docLineStart + matchIndex)
          this.quill.deleteText(docLineStart + matchIndex, 1, 'user');
          // After deletion, the closing marker shifts left by one.
          const newClosingPos = matchIndex + fullMatchLength - 2;
          this.quill.deleteText(docLineStart + newClosingPos, 1, 'user');
          // Apply italic formatting to the content that remains.
          this.quill.formatText(docLineStart + matchIndex, contentLength, 'italic', true, 'user');
        });
        // Reset italic toolbar formatting so subsequent typing is not left in italic.
        this.quill.format('italic', false, 'user');
        // Optionally, set the cursor at the end of the line.
        this.quill.setSelection(docLineStart + text.length, 0, 'user');
        this.syncValueAndEmit(source);
        return;
      }
      this.syncValueAndEmit(source);
    });
  }
  disconnectedCallback() {
    if (this.format === types.formats.markdown && this.quill) {
      const markdownModule = this.quill.getModule('QuillMarkdown');
      if (markdownModule && typeof markdownModule.destroy === 'function') {
        markdownModule.destroy();
      }
    }
    if (this.selectionChangeEvent) {
      this.selectionChangeEvent.removeListener('selection-change');
    }
    if (this.textChangeEvent) {
      this.textChangeEvent.removeListener('text-change');
    }
  }
  updateContent(newValue) {
    const value = this.getValue();
    this.updateEnteredCharacters();
    if (Object.values(types.formats).indexOf(this.format) > -1 && newValue === value) {
      return null;
    }
    else {
      let changed = false;
      try {
        const json = JSON.stringify(newValue);
        changed = JSON.stringify(value) !== json;
      }
      catch {
        return null;
      }
      if (!changed) {
        return null;
      }
    }
    this.setValue(newValue);
  }
  updateDisabled(newValue) {
    this.quill?.enable(!newValue);
    this.quill?.theme.modules.toolbar?.enable(!newValue);
    // TODO Remove when will be fixed in Quill
    if (!newValue) {
      this.quill.root.setAttribute('contenteditable', 'true');
    }
    else {
      this.quill.root.removeAttribute('contenteditable');
    }
  }
  updatePlaceholder(newValue, oldValue) {
    if (this.quill && newValue !== oldValue) {
      this.quill.root.dataset.placeholder = newValue;
    }
  }
  updateStyle(newValue, oldValue) {
    if (oldValue) {
      const old = JSON.parse(oldValue);
      Object.keys(old).forEach((key) => {
        this.containerElement?.style.setProperty(key, '');
      });
    }
    if (newValue) {
      const value = JSON.parse(newValue);
      Object.keys(value).forEach((key) => {
        this.containerElement?.style.setProperty(key, value[key]);
      });
    }
  }
  updateCharacterLimit() {
    this.updateEnteredCharacters();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    const rawFormat = this.host.getAttribute('format');
    if (rawFormat)
      this.format = rawFormat.replace(/^['"]|['"]$/g, '');
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-required": this.required, "data-testid": "wpp-rich-text" }, index.h("wpp-richtext-icon-loader-v3-6-0", null), index.h("wpp-quill-styles-v3-6-0", null), index.h("wpp-richtext-common-styles-v3-6-0", null), this.labelConfig?.text && (index.h("wpp-label-v3-6-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), index.h("div", { class: this.formControlCssClasses(), "data-testid": "rich-text-form" }, index.h("slot", { name: "quill-toolbar", "quill-toolbar": "" }), index.h("div", { ref: el => (this.containerElement = el), "data-testid": "richtext-editor" }), Boolean(this.name) && (index.h("input", { ref: el => (this.formControlInput = el), tabindex: "-1", id: this.name, class: "form-control-input", "data-testid": "rich-text-input", disabled: this.disabled }))), (Boolean(this.message) || Boolean(this.charactersLimit)) && (index.h("div", { class: this.messageCssClasses(), part: "message-wrapper" }, Boolean(this.message) && (index.h("wpp-inline-message-v3-6-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message", class: "message", "data-testid": "message" })), Boolean(this.charactersLimit) && (index.h("div", { class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, index.h("wpp-typography-v3-6-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":\u00A0"), index.h("wpp-typography-v3-6-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit)))))));
  }
  static get registryIs() { return "wpp-richtext-v3-6-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["updateContent"],
    "disabled": ["updateDisabled"],
    "placeholder": ["updatePlaceholder"],
    "styles": ["updateStyle"],
    "charactersLimit": ["updateCharacterLimit"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppRichtext.style = wppRichtextCss;

exports.wpp_richtext = WppRichtext;
