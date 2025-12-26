import { Request, Response } from 'express';
import { getHealthStatus } from '../../../src/controllers/healthController';

describe('HealthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnValue({ json: responseJson });
    mockResponse = {
      status: responseStatus,
      json: responseJson,
    };
  });

  describe('getHealthStatus', () => {
    it('should return health status', () => {
      getHealthStatus(mockRequest as Request, mockResponse as Response);

      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'OK',
          uptime: expect.any(Number),
          timestamp: expect.any(String),
          environment: expect.any(String),
        })
      );
    });
  });
});