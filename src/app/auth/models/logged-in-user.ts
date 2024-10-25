// logged-in-user.ts

export interface Tokens {
    access_token: string;
    refresh_token: string;
  }
  
  export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    GOD = 'GOD'
  }
  
  export interface UserProfile {
    id: number;
    username: string
    displayname:string;
    role: Role;
    exp: number;
  }
  
  export interface LoggedInUser {
    tokens: Tokens;
    userProfile: UserProfile;
  }
  export interface UserEditable {
    id: number| null;
    username:string;
    displayname:string;
    role: Role;
  }
  export interface UserEditable2 {
    username:string;
    displayname:string;
    role: Role;
  }