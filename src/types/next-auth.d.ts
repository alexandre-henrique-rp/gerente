import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    type: string;
    status: boolean;
    cel: string;
    aniversario: string;
    avatar: string
  }

  interface DefaultUser {
    id: string;
    name: string;
    email: string;
    type: string;
    status: boolean;
    cel: string;
    aniversario: string;
    avatar: string
  }

  /**
   * Add additional types for your custom properties
   * in the JWT token.
   */
  interface JWT {
    id: string;
    name: string;
    email: string;
    type: string;
    status: boolean;
    cel: string;
    aniversario: string;
    avatar: string
  }

  /**
   * You can define own custom types for the session object
   * that are returned by getSession().
   */
  interface Session {
    user: User;
    token: string;
  }
}
