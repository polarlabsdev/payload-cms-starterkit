import { shapeClasses, sizeClasses, variantClasses } from '@/components/ui/Button';
import { titleCase } from '@/lib/utils';
import type { Block } from 'payload';

export const ButtonBlock: Block = {
  slug: 'button',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      options: Object.keys(variantClasses).map((variant) => ({
        label: titleCase(variant),
        value: variant,
      })),
      defaultValue: 'default',
    },
    {
      name: 'size',
      type: 'select',
      options: Object.keys(sizeClasses).map((size) => ({ label: titleCase(size), value: size })),
      defaultValue: 'default',
    },
    {
      name: 'shape',
      type: 'select',
      options: Object.keys(shapeClasses).map((shape) => ({
        label: titleCase(shape),
        value: shape,
      })),
      defaultValue: 'default',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
};
