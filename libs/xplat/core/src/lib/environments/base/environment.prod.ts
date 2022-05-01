import { IEnvironment } from '@ioniconf/xplat/core';
import { deepMerge } from '@ioniconf/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentProd = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  // customizations here...
});
