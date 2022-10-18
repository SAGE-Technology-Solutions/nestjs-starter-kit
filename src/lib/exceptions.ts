import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express'

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError, Error)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        message: exception.message,
      })
    } else {
      const exceptionResp = exception['response']
      if (exceptionResp)
        return response.status(exceptionResp['statusCode'] || 400).json({
          message: exceptionResp,
        })
      else
        return response.status(exception['statusCode'] || 500).json({
          message: exception['message'] || exceptionResp['response'] || 'Oops! Something went wrong. Please try again later.',
        })
    }
  }
}
