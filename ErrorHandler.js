class ErrorHandler {
  constructor(url, level) {
    this.url = url;
    if (level["log"]) this.bindLog();
    if (level["debug"]) this.bindDebugs();
    if (level["warning"]) this.bindWarnings();
    if (level["error"]) this.bindError();
  }
  bindError() {
    console.defaultError = console.error.bind(console);
    console.errors = [];
    console.error = function () {
      console.defaultError.apply(console, arguments);
      console.errors.push(Array.from(arguments));
      //alert("ERR");
      ErrorHandlingJS.ajaxData(arguments);
    };
    //handling all errors
    window.onerror = function (msg, url, line, col, error) {
      let errrorString =
        msg + " " + url + " line:" + line + " col:" + col + " " + error;
      ErrorHandlingJS.ajaxData(errrorString);
    };
  }
  bindLog() {
    console.defaultLog = console.log.bind(console);
    console.logs = [];
    console.log = function () {
      console.defaultLog.apply(console, arguments);
      console.logs.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
  }
  bindWarnings() {
    console.defaultWarn = console.warn.bind(console);
    console.warns = [];
    console.warn = function () {
      console.defaultWarn.apply(console, arguments);
      console.warns.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
  }
  bindDebugs() {
    console.defaultDebug = console.debug.bind(console);
    console.debugs = [];
    console.debug = function () {
      console.defaultDebug.apply(console, arguments);
      console.debugs.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
  }
  ajaxData(error) {
    let useUrl = this.url == "uri" ? "ErrorSaver.php" : this.url;
    $.ajax({
      type: "POST",
      url: useUrl,
      data: { error: error },
    });
  }
}
//level none->log->debug->warning->all
let ErrorHandlingJS = new ErrorHandler("uri", {
  log: true,
  debug: true,
  warning: true,
  error: true,
});
