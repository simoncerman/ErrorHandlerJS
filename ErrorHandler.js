class ErrorHandler {
  constructor(url, level = "all") {
    this.url = url;
    if (level == "none") return;
    this.bindLog();
    if (level == "log") return;
    this.bindDebugs();
    if (level == "debug") return;
    this.bindWarnings();
    if (level == "warning") return;
    this.bindError();
  }
  bindLog() {
    console.defaultLog = console.log.bind(console);
    console.logs = [];
    console.log = function () {
      console.defaultLog.apply(console, arguments);
      console.logs.push(Array.from(arguments));
      //alert("L0G");
      ErrorHandlingJS.ajaxData(arguments);
    };
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
  }
  bindWarnings() {
    console.defaultWarn = console.warn.bind(console);
    console.warns = [];
    console.warn = function () {
      console.defaultWarn.apply(console, arguments);
      console.warns.push(Array.from(arguments));
      //alert("WAR");
      ErrorHandlingJS.ajaxData(arguments);
    };
  }
  bindDebugs() {
    console.defaultDebug = console.debug.bind(console);
    console.debugs = [];
    console.debug = function () {
      console.defaultDebug.apply(console, arguments);
      console.debugs.push(Array.from(arguments));
      //alert("DBG");
      ErrorHandlingJS.ajaxData(arguments);
    };
  }
  ajaxData(error) {
    $.ajax({
      type: "POST",
      url: this.url,
      data: { error: error },
      /*success: function(msg){
            alert("delivered to server " + msg);
        }*/
    });
  }
}
//level none->log->debug->warning->all
let ErrorHandlingJS = new ErrorHandler("uri", "log");
