export type userRole = 'buyer' | 'admin' | 'superAdmin';

export interface IloginUser {
  email: string;
  password: string;
}

export interface IregisterUser extends IloginUser {
  userRole: userRole;
}
