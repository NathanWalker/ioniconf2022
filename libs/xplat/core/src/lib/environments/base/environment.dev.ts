import { IEnvironment } from '@ioniconf/xplat/core';
import { deepMerge } from '@ioniconf/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentDev = deepMerge(environmentBase, <IEnvironment>{
  // customizations here...
});
