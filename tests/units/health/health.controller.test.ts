import { HealthController } from '@health/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(() => {
    healthController = new HealthController();
  });

  describe('health', () => {
    it('should return is healthy', () => {
      expect(healthController.health()).toContain(
        'Health: Server instance is healthy',
      );
    });

    it('should return the environment', () => {
      expect(healthController.env()).toEqual('This is the test environment.');
    });
  });
});
