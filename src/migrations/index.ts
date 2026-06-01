import * as migration_20260528_054013 from './20260528_054013';
import * as migration_20260531_193903 from './20260531_193903';

export const migrations = [
  {
    up: migration_20260528_054013.up,
    down: migration_20260528_054013.down,
    name: '20260528_054013',
  },
  {
    up: migration_20260531_193903.up,
    down: migration_20260531_193903.down,
    name: '20260531_193903',
  },
];
