interface ILogger {
  info(msg: string): void
  warn(msg: string): void
  error(msg: string): void
}

class LogLevel {
  None = 0
  Info = 1
  Verbose = 2
  Warn = 3
  Error = 4
}

export default class Logger implements ILogger {
  logLevel: LogLevel = new LogLevel()

  info(msg: string): void {
    this.logWith(this.logLevel.Info, msg)
  }

  warn(msg: string): void {
    this.logWith(this.logLevel.Warn, msg)
  }

  error(msg: string): void {
    this.logWith(this.logLevel.Error, msg)
  }

  private logWith(level: number, msg: string) {
    if (level <= this.logLevel.Error) {
      switch (level) {
        case this.logLevel.None:
          return console.log(msg)
        case this.logLevel.Info:
          return console.info('\x1b[34m' + msg,)
        case this.logLevel.Warn:
          return console.warn('\x1b[33m' + msg,)
        case this.logLevel.Error:
          return console.error('\x1b[31m' + msg,)
        default:
          console.debug(msg)
      }
    }
  }
}