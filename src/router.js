import _ from 'lodash';

const isParam = (segment) => segment.startsWith(':');

const matchRouteToPath = (path, route) => {
  const pathParts = path.slice(1).split('/');
  const routeParts = route.slice(1).split('/');

  if (pathParts.length !== routeParts.length) {
    return false;
  }

  return pathParts.every((part, idx) => {
    if (isParam(routeParts[idx])) {
      return part.search('(\\w+)') !== -1;
    }

    return part === routeParts[idx];
  });
};

const extractParams = (path, route) => {
  const pathParts = path.slice(1).split('/');
  const routeParts = route.slice(1).split('/');

  return routeParts.reduce((acc, item, idx) => {
    if (isParam(item)) {
      const paramName = item.slice(1);
      acc[paramName] = pathParts[idx];
      return acc;
    }
    return acc;
  }, {});
};

export default function makeRouter(routes) {
  return {
    serve: (path) => {
      const obj = _.find(routes, (item) => matchRouteToPath(path, item.path));

      if (!obj) {
        throw new Error('No such route!');
      }

      const params = extractParams(path, obj.path);

      return {
        path: obj.path,
        handler: obj.handler,
        params,
      };
    },
  };
}
