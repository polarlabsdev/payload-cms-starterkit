import { TextFieldServerProps } from 'payload';
import { SlugUI } from './component.client';

type SlugComponentProps = {
  adminUpdatesOnly: boolean;
} & TextFieldServerProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
  adminUpdatesOnly,
  user,
  clientField,
  path,
}) => {
  return <SlugUI adminUpdatesOnly={adminUpdatesOnly} user={user} field={clientField} path={path} />;
};
