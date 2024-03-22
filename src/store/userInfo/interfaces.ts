import { IUser } from '../../interfaces/IUser';

export interface IUserInfoState {
  loading: boolean;
  error: string | null;
  user: IUser | null;
}
