import _ from 'lodash';

export default function makeRouter(routes) {
  return {
    serve: (path) => {
      const requiredObj = _.find(routes, { path });
      if (!requiredObj) {
        throw new Error('No such route!');
      }
      return requiredObj.handler;
    },
  };
}
