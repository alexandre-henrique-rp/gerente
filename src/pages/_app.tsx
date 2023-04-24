import Layout from "@/components/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { FunctionComponent } from "react";

interface MyAppProps {
  Component: FunctionComponent<any>;
  pageProps: {
    session: any;
    [key: string]: any;
  };
}

const MyApp: FunctionComponent<MyAppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  console.log("🚀 ~ file: _app.tsx:18 ~ session:", session)
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
