import makeRouter from '../src/router.js';

describe('router', () => {
  let router;
  const routes = [
    {
      path: '/courses', // маршрут
      handler: () => 'courses!', // обработчик
    },
    {
      path: '/courses/basics',
      handler: () => 'basics',
    },
  ];

  beforeEach(() => {
    router = makeRouter(routes);
  });

  it('serve', () => {
    const path = '/courses';
    const handler = router.serve(path);

    expect(handler()).toEqual('courses!');

    const path2 = '/courses/basics';
    const handler2 = router.serve(path2);
    expect(handler2()).toEqual('basics');
  });

  it('non exting route', () => {
    const path = '/unhandled';
    const fn = () => router.serve(path);
    expect(fn).toThrowError('No such route!');
  });
});
