class ErrorHandler {
  constructor(url, level) {
    this.url = url;
    this.bindPrepare(); //prepare console
    if (level["CONSOL_log"]) console.log = this.bindHandler(console.log, 0);
    if (level["CONSOL_debug"]) console.debug = this.bindHandler(console.debug, 1);
    if (level["CONSOL_warning"]) console.warn = this.bindHandler(console.warn, 2)
    if (level["CONSOL_error"]) console.error = this.bindHandler(console.error, 3);
    if (level["FATAL_error"]) this.bindFatal();
  }

  bindPrepare() {
    console.editDat = [[], [], [], []];
    console.defaults = [null, null, null, null];
  }
  bindHandler(consoleFunction, type) {
    console.defaults[type] = consoleFunction.bind(console);
    return function(){
      console.defaults[type].apply(console,arguments);
      console.editDat[type].push(Array.from(arguments));
      ErrorHandlingJS.ajaxData(arguments[0]);
    }
  }

  bindFatal() {
    //handling all other errors which are not handled by console
    window.onerror = function (msg, url, line, col, error) {
      let errrorString =
        msg + " " + url + " line:" + line + " col:" + col + " " + error;
      ErrorHandlingJS.ajaxData(errrorString);
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
  CONSOL_log: true,
  CONSOL_debug: true,
  CONSOL_warning: true,
  CONSOL_error: true,
  FATAL_error: true
});
