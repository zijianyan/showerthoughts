import app from '../../src/app';

describe('\'thoughts\' service', () => {
  it('registered the service', () => {
    const service = app.service('thoughts');
    expect(service).toBeTruthy();
  });
});
