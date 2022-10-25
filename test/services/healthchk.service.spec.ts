import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { HealthChkQueue } from '../../src/constants/queues'
import { HealthChk } from '../../src/entities/healthchk.entity'
import { HealthChkService } from '../../src/services/healthchk.service'
import { getQueueToken } from '@nestjs/bull'
import { HttpException } from '@nestjs/common'

describe('HealthChkService', () => {
  const mockedRepo = {
    count: jest.fn(() => Promise.resolve(1)),
  }
  const mockedQueue = {
    add: jest.fn((s: string, payload: any) => Promise.resolve()),
  }

  let service: HealthChkService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthChkService,
        {
          provide: getRepositoryToken(HealthChk),
          useValue: mockedRepo,
        },
        {
          provide: getQueueToken(HealthChkQueue.label),
          useValue: mockedQueue,
        },
      ],
    }).compile()
    // get the service from the testing module.
    service = await module.get(HealthChkService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('#status', () => {
    it('returns status text', () => {
      expect(service.status()).toEqual({
        message: expect.stringContaining('OK'),
      })
    })
  })

  describe('#storages', () => {
    describe('when data storage is working', () => {
      it('returns status text', async () => {
        expect(await service.storages()).toEqual({
          message: expect.stringContaining('Storage OK'),
        })

        expect(mockedRepo.count).toHaveBeenCalled()
      })
    })

    describe('when data storage is not working', () => {
      it('returns status text with status 500', () => {
        jest.spyOn(mockedRepo, 'count').mockImplementation(() => {
          throw new Error('Connection Error')
        })

        expect(service.storages()).rejects.toEqual(
          expect.objectContaining({
            response: expect.any(String),
            status: 500,
          })
        )
      })
    })
  })

  describe('#queues', () => {
    describe('when queues are working', () => {
      it('returns status text', async () => {
        expect(await service.queues()).toEqual({
          message: expect.stringContaining('Queues OK'),
        })

        expect(mockedQueue.add).toHaveBeenCalled()
      })
    })

    describe('when queues are not working', () => {
      it('returns status text with status 500', () => {
        jest.spyOn(mockedQueue, 'add').mockImplementation(() => {
          throw new Error('Connection Error')
        })

        expect(service.queues()).rejects.toEqual(
          expect.objectContaining({
            response: expect.any(String),
            status: 500,
          })
        )
      })
    })
  })

  describe('#throw', () => {
    it('throws HTTP Exception', () => {
      expect(service.throw).toThrowError(HttpException)
    })
  })
})
