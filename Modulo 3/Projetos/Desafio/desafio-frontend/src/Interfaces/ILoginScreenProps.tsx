import { IUser } from './IUser';

export interface ILoginScreenProps {
  onSignin: (user: IUser) => void;
}
