'use client';
import React, { useState, useCallback } from 'react';
import { TextFieldClientProps, User } from 'payload';
import { useField, Button, TextInput, FieldLabel, toast } from '@payloadcms/ui';

import './index.scss';

type SlugUIProps = {
  adminUpdatesOnly: boolean;
  user: User;
} & TextFieldClientProps;

const TOAST_WARNING =
  'Only admins can change a page slug after the page has been created. This is to prevent unintentional breaking of links and SEO.';

export const SlugUI: React.FC<SlugUIProps> = ({ field, path, adminUpdatesOnly, user }) => {
  const { label } = field;
  const { value, setValue } = useField<string>({ path: path || field.name });
  const [isLocked, setIsLocked] = useState(value ? true : false);

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault();

      // Only allow unlocking if adminUpdatesOnly is false or user is admin
      // If there is no value set yet this must be a new page, and we can allow manual editing
      // on the initial resource creation.
      if (!adminUpdatesOnly || user?.role === 'admin' || !value) {
        setIsLocked(!isLocked);
      } else {
        toast.warning(TOAST_WARNING);
      }
    },
    [isLocked, adminUpdatesOnly, user, value],
  );

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {isLocked ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput value={value} onChange={setValue} path={path || field.name} readOnly={isLocked} />
    </div>
  );
};
