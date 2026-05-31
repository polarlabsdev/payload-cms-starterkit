import { FullScreenHero } from './FullScreenHero';
import { HalfHero } from './HalfHero';
import { MinimalHero } from './MinimalHero';

export const heroComponents = {
  fullscreen: {
    label: 'Full Screen',
    component: FullScreenHero,
  },
  half: {
    label: 'Half Screen',
    component: HalfHero,
  },
  minimal: {
    label: 'Minimal',
    component: MinimalHero,
  },
};
