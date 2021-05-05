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
    {
      path: '/courses/:id',
      handler: () => 'dynamic',
    },
    {
      path: '/courses/:course_id/exercises/:id',
      handler: () => 'exercise!',
    },
  ];

  beforeEach(() => {
    router = makeRouter(routes);
  });

  it('serve', () => {
    const path = '/courses';
    const result = router.serve(path);

    expect(result.handler()).toEqual('courses!');

    const path2 = '/courses/basics';
    const result2 = router.serve(path2);
    expect(result2.handler()).toEqual('basics');
  });

  it('non exting route', () => {
    const path = '/unhandled';
    const fn = () => router.serve(path).handler;
    expect(fn).toThrowError('No such route!');
  });

  it('dynamic routes', () => {
    const path = '/courses/1';
    const result = router.serve(path);
    expect(result.handler()).toEqual('dynamic');

    const path2 = '/courses/1/exercises/2';
    const result2 = router.serve(path2);
    console.log(result2);
    expect(result2.handler()).toEqual('exercise!');
  });
});
