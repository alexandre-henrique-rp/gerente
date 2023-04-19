import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MenuDeskTop from "./meu/desktop";

function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession();

  
  useEffect(() => {
    if (!session && router.asPath !== "/login" && !status) {
      router.push("/login");
    }
    if (session && router.asPath === "/login" && status) {
      router.push("/");
    }
  }, [!session, !status]);
  if (!session && router.asPath === "/login") {
    return <>{children}</>;
  }
  if (!session && router.asPath !== "/login" && !status) {
    return <>{children}</>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <main style={{ width: "100%", height: "auto" }}>
        <MenuDeskTop />
      </main>
      <div style={{ width: "100%" }}>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
