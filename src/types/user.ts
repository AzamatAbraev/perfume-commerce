export interface UserApi {
  user: UserType;
}


export interface UserType {
  role: number;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password: string;
}

