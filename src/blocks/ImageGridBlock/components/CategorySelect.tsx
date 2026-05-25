'use client';
import React, { useMemo } from 'react';
import { SelectInput, useField, useFormFields } from '@payloadcms/ui';

interface CategoryOption {
  label: string;
  value: string;
}

const CategorySelect: React.FC<{ path: string }> = ({ path }) => {
  const { value = [], setValue } = useField<string[]>({ path });

  // Find sibling `category` array path
  const categoryPath = useMemo(() => {
    const parts = path.split('.');
    const itemsIndex = parts.indexOf('items');
    return itemsIndex > -1 ? `${parts.slice(0, itemsIndex).join('.')}.category` : 'category';
  }, [path]);

  // Access all form fields to derive options for categories
  const fields = useFormFields(([fields]) => fields);

  // Derive options for the select input based on sibling category array
  const options: CategoryOption[] = useMemo(() => {
    const categoryField = fields[categoryPath];

    if (!categoryField?.rows) return [];

    return categoryField.rows
      .map((_, index: number) => {
        const nameField = fields[`${categoryPath}.${index}.name`];
        const name = nameField?.value;
        return typeof name === 'string' && name.trim() ? { label: name, value: name } : null;
      })
      .filter(Boolean) as CategoryOption[];
  }, [fields, categoryPath]);

  const handleChange = (selected: unknown) => {
    if (!Array.isArray(selected)) {
      setValue([]);
      return;
    }

    const values = selected
      .map((item) => (typeof item === 'string' ? item : (item as CategoryOption)?.value))
      .filter(Boolean) as string[];

    setValue(values);
  };

  return (
    <div className="field-type select">
      {options.length > 0 && (
        <>
          <label className="field-label">Assigned Categories</label>
          <SelectInput
            path={path}
            name={path}
            options={options}
            value={value}
            hasMany
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default CategorySelect;
