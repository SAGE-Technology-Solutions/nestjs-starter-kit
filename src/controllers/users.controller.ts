import { Controller, Get, Request } from '@nestjs/common'
import { BaseController } from './base.controller'

@Controller('/users')
export class UsersController extends BaseController {
  @Get('/current')
  current(@Request() req: any) {
    const user = req.user as any

    return {
      data: user,
    }
  }
}
