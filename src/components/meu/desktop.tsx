import React from "react";
import { useSession } from "next-auth/react";
import style from "@/styles/menu.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuDeskTop(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter()

  return (
    <>
      <nav className={style.menuGeral}>
        <div className={style.logo}>
          <h2>Gernte Finaceiro</h2>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className={style.menuLink}>
            <Link href="/">Home</Link>
            <Link href="/Debito">Add despesa</Link>
            <Link href="/Credito">Add renda</Link>
            <a onClick={() => router.push('/api/auth/signout')}>Logout</a>
          </div>
          <div className={style.avatarArea}>
            <img
              src={session?.user.avatar}
              alt={session?.user.name}
              className={style.avatarImg}
            />
            <h5 style={{ textTransform: "uppercase" }}>{session?.user.name}</h5>
          </div>
        </div>
      </nav>
    </>
  );
}
