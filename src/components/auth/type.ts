export enum AuthType {
  Login = 'LOGIN',
  Forget = 'FORGET',
  NewPassword = 'NEW_PASSWORD',
  Confirmation = 'CONFIRMATION',
  Complete = 'COMPLETE',
}
export type Props = {
  setAuthType: (type: AuthType) => void;
};
export type forgotTypeProps = {
  setAuthType: (type: AuthType) => void;
  email?: string | null;
  setEmail: (type: string) => void;
};
