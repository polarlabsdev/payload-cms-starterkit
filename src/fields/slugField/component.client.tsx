'use client';
import React, { useState, useCallback } from 'react';
import { TextFieldClientProps, TypedUser } from 'payload';
import { useField, Button, TextInput, FieldLabel, toast } from '@payloadcms/ui';
import { hasPermissionCheck, type PermissionString, type RoleName } from '@/accessControl/roles';

import './index.scss';

type SlugUIProps = {
  adminUpdatesOnly: boolean;
  editPermission: PermissionString;
  user: TypedUser;
} & TextFieldClientProps;

const TOAST_WARNING =
  'Only admins can change a page slug after the page has been created. This is to prevent unintentional breaking of links and SEO.';

export const SlugUI: React.FC<SlugUIProps> = ({
  field,
  path,
  adminUpdatesOnly,
  editPermission,
  user,
}) => {
  const { label } = field;
  const { value, setValue } = useField<string>({ path: path || field.name });
  const [isLocked, setIsLocked] = useState(value ? true : false);

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault();

      // Only allow unlocking if adminUpdatesOnly is false or user has editPermission
      // If there is no value set yet this must be a new page, and we can allow manual editing
      // on the initial resource creation.
      if (
        !adminUpdatesOnly ||
        hasPermissionCheck(user.roles as RoleName[], editPermission) ||
        !value
      ) {
        setIsLocked(!isLocked);
      } else {
        toast.warning(TOAST_WARNING);
      }
    },
    [isLocked, adminUpdatesOnly, editPermission, user, value],
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
