import { Login } from './components/Login';
import { AuthType } from './type';
import { Forget } from './components/Forget';
import { Confirmation } from './components/Confirmation';
import { NewPassword } from './components/NewPassword';

type Props = {
  authType: AuthType | null;
  setAuthType: (type: AuthType | null) => void;
  email: string | null;
  setEmail: (type: string) => void;
};
export function AuthModal(props: Props) {
  const { authType, setAuthType, email, setEmail } = props;

  if (authType === AuthType.Login) return <Login setAuthType={setAuthType} />;
  if (authType === AuthType.Forget)
    return <Forget setAuthType={setAuthType} setEmail={setEmail} />;
  if (authType === AuthType.Confirmation)
    return (
      <Confirmation
        setAuthType={setAuthType}
        email={email}
        setEmail={setEmail}
      />
    );
  if (authType === AuthType.NewPassword)
    return (
      <NewPassword
        setAuthType={setAuthType}
        email={email}
        setEmail={setEmail}
      />
    );

  return <></>;
}
