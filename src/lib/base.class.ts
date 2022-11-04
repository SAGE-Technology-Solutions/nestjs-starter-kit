import { Logger } from '@nestjs/common'

export class BaseClass {
  private _Logger: Logger

  constructor() {
    this._Logger = new Logger(this.constructor.name)
  }

  log(msg: any) {
    const e = new Error()
    const m = e.stack.matchAll(/at (.+) \(/g)
    const mm = [...m]

    if (mm.length > 1) this._Logger.log({ functionContext: mm[1][1] }, msg)
    else this._Logger.log(msg)
  }

  error(msg: any) {
    const e = new Error()
    const m = e.stack.matchAll(/at (.+) \(/g)
    const mm = [...m]

    if (mm.length > 1) this._Logger.error({ functionContext: mm[1][1] }, msg)
    else this._Logger.error(msg)
  }
}
