import { Controller, Get, Request } from '@nestjs/common'

@Controller('/users')
export class UsersController {
  @Get('/current')
  current(@Request() req: any) {
    const user = req.user as any

    return {
      data: user,
    }
  }
}
