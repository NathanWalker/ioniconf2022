import { environmentBase } from './environment.base';
import { IEnvironment } from '@ioniconf/xplat/core';
import { environmentProd } from '@ioniconf/xplat/environments';

export const environment: IEnvironment = environmentBase(environmentProd, {
  // app level customizations here...
});
