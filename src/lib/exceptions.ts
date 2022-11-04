import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { QueryFailedError } from 'typeorm/error/QueryFailedError'
import { Response } from 'express'

const STATUS_CODE_MSG_MAP = {
  400: 'Bad Request',
  401: 'Unauthenticated/Unauthorized',
  403: 'Unauthorized/Forbidden',
  404: 'Resource Not Found',
  406: 'Not Acceptable',
  500: 'Internal Server Error',
}

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  public catch(
    exception: EntityNotFoundError | QueryFailedError | HttpException,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof EntityNotFoundError) {
      return response.status(404).json({
        message: 'Resource not found.',
      })
    } else if (exception instanceof HttpException) {
      const resp = exception.getResponse()
      const status = exception.getStatus()

      let message

      if (typeof resp == 'string') message = resp
      else if (resp['message']) message = resp['message']
      else message = STATUS_CODE_MSG_MAP[status]

      return response.status(status).json({
        message,
      })
    } else {
      const exceptionResp = exception['response']
      if (exceptionResp) {
        const status =
          exceptionResp['statusCode'] || exceptionResp['status'] || 500
        const message =
          exceptionResp['response'] ||
          STATUS_CODE_MSG_MAP[exceptionResp['statusCode']] ||
          'Something went wrong.'

        return response.status(status).json({
          message,
        })
      }
    }
  }
}
