class ErrorHandler {
  constructor(url) {
      this.url = url;
      this.bindLog();
      this.bindDebugs();
      this.bindError();
      this.bindWarnings();
  }
  ajaxData(error){
    $.ajax({
        type: "POST",
        url: this.url,
        data: {error: error},
        /*success: function(msg){
            alert("delivered to server " + msg);
        }*/
    });
  }
  bindLog() {
    console.defaultLog = console.log.bind(console);
    console.logs = [];
    console.log = function () {
      console.defaultLog.apply(console, arguments);
      console.logs.push(Array.from(arguments));
      alert("L0G");
      this.ajaxData(arguments);
    };
  }
  bindError(){
    console.defaultError = console.error.bind(console);
    console.errors = [];
    console.error = function () {
      console.defaultError.apply(console, arguments);
      console.errors.push(Array.from(arguments));
      alert("ERR");
      this.ajaxData(arguments);
    };
  }
  bindWarnings(){
    console.defaultWarn = console.warn.bind(console);
    console.warns = [];
    console.warn = function () {
      console.defaultWarn.apply(console, arguments);
      console.warns.push(Array.from(arguments));
      alert("WAR");
      this.ajaxData(arguments);
    };
  }
  bindDebugs(){
    console.defaultDebug = console.debug.bind(console);
    console.debugs = [];
    console.debug = function () {
      console.defaultDebug.apply(console, arguments);
      console.debugs.push(Array.from(arguments));
      alert("DBG");
      this.ajaxData(arguments);
    };
  }
}
let ErrorHandlingJS = new ErrorHandler("uri");