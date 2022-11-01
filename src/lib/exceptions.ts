import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express'

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError, Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        message: 'Resource not found.',
      })
    } else {
      const exceptionResp = exception['response']
      if (exceptionResp)
        return response.status(400).json({
          message: 'Bad request.',
        })
      else
        return response.status(500).json({
          message: 'Something went wrong.',
        })
    }
  }
}
