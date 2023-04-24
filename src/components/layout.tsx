"use client";
import { getSession, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import MenuDeskTop from "./meu/desktop";
import { useEffect } from "react";
import { checkIsPublicRouter } from "@/functions/check-is-public-router";
import PrivateRoute from "./privateRouter";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const pathName = usePathname();
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const isPublicPage = checkIsPublicRouter(pathName);
  console.log(
    "🚀 ~ file: layout.tsx:14 ~ Layout ~ isPublicPage:",
    isPublicPage
  );
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!session && !token) {
      push("/login");
    }
    if (session) {
      const token = session.token
      localStorage.setItem('token', token)
      push("/");
    }
  },[session,status]);

  return (
    <>
      {isPublicPage && <>{children}</>}
      {!isPublicPage && (
        <>
          <PrivateRoute>
            <div style={{ width: "100%", height: "100vh" }}>
              <main style={{ width: "100%", height: "auto" }}>
                <MenuDeskTop />
              </main>
              <div style={{ width: "100%" }}>
                <div>{children}</div>
              </div>
            </div>
          </PrivateRoute>
        </>
      )}
    </>
  );
}

export default Layout;
