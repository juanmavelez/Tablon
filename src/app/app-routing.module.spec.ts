import { routes } from './app-routing.module';

describe('App Routing', () => {
  it('should have app as path', () => {
    expect(routes[0].path).toBe('auth');
    expect(routes[0].children);
  });
});
