import { TextFieldServerProps, TypedUser } from 'payload';
import { SlugUI } from './component.client';
import type { PermissionString } from '@/accessControl/roles';

type SlugComponentProps = {
  adminUpdatesOnly: boolean;
  editPermission: PermissionString;
  user: TypedUser;
} & TextFieldServerProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
  adminUpdatesOnly,
  editPermission,
  user,
  clientField,
  path,
}) => {
  return (
    <SlugUI
      adminUpdatesOnly={adminUpdatesOnly}
      editPermission={editPermission}
      user={user}
      field={clientField}
      path={path}
    />
  );
};
