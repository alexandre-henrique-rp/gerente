import NextAuth, { DefaultUser } from "next-auth";
import { Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "@notionhq/client";
import { NotionRespose } from "Type-notion";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DataBase: any = process.env.NOTION_DATABASE_ID2;

export default NextAuth({
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60 // 4 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        const identifique: string = credentials.email;
        const senha: string = credentials.password;
        try {
          const res: any = await notion.databases.query({
            database_id: DataBase,
            filter: {
              and: [
                {
                  property: "Name",
                  title: {
                    equals: identifique
                  }
                },
                {
                  property: "Identificador",
                  rich_text: {
                    equals: senha
                  }
                }
              ]
            }
          });

          const resposta: any = res.results[0].properties;
          const user: any = {
            id: resposta.id.formula.string,
            name: resposta.Name.title[0].plain_text,
            email: resposta.email.email,
            type: resposta.type.select.name,
            status: resposta.status.checkbox,
            cel: resposta.cel.phone_number,
            aniversario: resposta.aniversario.date.start,
            avatar: resposta.avatar.files[0].file.url
          };

          const name = user.name;
          const email = user.email;
          const type = user.type;
          const status = user.status;
          const cel = user.cel;
          const aniversario = user.aniversario;
          const id = user.id;
          const avatar = user.avatar;

          console.log(name)

          const response = {
            id: id,
            name: name,
            email: email,
            type: type,
            status: status,
            cel: cel,
            aniversario: aniversario,
            avatar: avatar
          };

          if (!id || !name || !status) {
            return null;
          }
          console.log(response)
          return response;
        } catch (e) {
          console.log('aki')
          console.log(e);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/login"
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    jwt: async ({ token, user }): Promise<any> => {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(1* 60 * 60); // 4 hours

      if (isSignIn) {
        if (!user?.id || !user?.name || !user?.email) {
          return null;
        }

        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.type = user.type;
        token.status = user.status;
        token.cel = user.cel;
        token.aniversario = user.aniversario;
        token.avatar = user.avatar;
        token.jwt = token.jti

        token.expiration = actualDateInSeconds + tokenExpirationInSeconds;
      } else {
        if (!token?.expiration) {
          return null;
        }
      }

      return token as JWT;
    },
    session: async ({ session, token }): Promise<Session | any> => {
      if (
        !token?.id ||
        !token?.name ||
        !token?.email ||
        !token?.expiration ||
        !token?.status
      ) {
        return null;
      }

      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        type: token.type as string,
        status: token.status as boolean,
        cel: token.cel as string,
        aniversario: token.aniversario as string,
        avatar: token.avatar as string,
      };

      session.token = token.jti as string;
      return session;
    }
  }
});
