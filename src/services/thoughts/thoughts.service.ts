// Initializes the `thoughts` service on path `/thoughts`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Thoughts } from './thoughts.class';
import createModel from '../../models/thoughts.model';
import hooks from './thoughts.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'thoughts': Thoughts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/thoughts', new Thoughts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('thoughts');

  service.hooks(hooks);
}
