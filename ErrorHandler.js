class ErrorHandler {
  constructor(url, level) {
    this.url = url;
    if (level["log"]) this.bindLog();
    if (level["debug"]) this.bindDebugs();
    if (level["warning"]) this.bindWarnings();
    if (level["error"]) this.bindError();
  }
  bindError() {
    //console.error() handling
    console.defaultError = console.error.bind(console);
    console.errors = [];
    console.error = function () {
      console.defaultError.apply(console, arguments);
      console.errors.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
    //handling all other errors which are not handled by console
    window.onerror = function (msg, url, line, col, error) {
      let errrorString =
        msg + " " + url + " line:" + line + " col:" + col + " " + error;
      ErrorHandlingJS.ajaxData(errrorString);
    };
  }
  bindLog() {
    //console.log() handling
    console.defaultLog = console.log.bind(console);
    console.logs = [];
    console.log = function () {
      console.defaultLog.apply(console, arguments);
      console.logs.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
  }
  bindWarnings() {
    //console.warn() handling
    console.defaultWarn = console.warn.bind(console);
    console.warns = [];
    console.warn = function () {
      console.defaultWarn.apply(console, arguments);
      console.warns.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
  }
  bindDebugs() {
    //console.debug() handling
    console.defaultDebug = console.debug.bind(console);
    console.debugs = [];
    console.debug = function () {
      console.defaultDebug.apply(console, arguments);
      console.debugs.push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    };
  }
  /**
   * Sending string to url which is set in constructor
   * @param {string} error 
   */
  ajaxData(error) {
    //ErrorSaver.php works for debuging this programm
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
