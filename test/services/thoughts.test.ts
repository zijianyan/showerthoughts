import app from '../../src/app';

describe('\'thoughts\' service', () => {
  it('registered the service', () => {
    const service = app.service('thoughts');
    expect(service).toBeTruthy();
  });
  it('creates a thought', async () => {
    const service = app.service('thoughts');
    const thought = await service.create({
      text: 'this is a shower thought!',
      author: 'zicodes',
      publish: false
    }, {});
    expect(thought).toBeTruthy();
  });
});
