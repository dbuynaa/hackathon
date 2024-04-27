import { Login } from "./components/Login";
import { AuthType } from "./type";

type Props = {
  authType: AuthType | null;
  setAuthType: (type: AuthType | null) => void;
  email: string | null;
  setEmail: (type: string) => void;
};
export function AuthModal(props: Props) {
  const { authType, setAuthType, email, setEmail } = props;

  if (authType === AuthType.Login) return <Login setAuthType={setAuthType} />;

  return <></>;
}
