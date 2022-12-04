const axios = require('axios');
const healthyService = require('./../../src/services/healthy.service');

jest.mock('axios');
describe('Integration Test', () => {
  beforeEach(async () => {
    // start server
    await require('../../src');
    jest.setTimeout(30000);
  });

  test('call /healthy route', async () => {
    axios.mockResolvedValue({ data: { status: true } });
    const { status } = await healthyService.healthy();
    expect(status).toBe(true);
  });
});
