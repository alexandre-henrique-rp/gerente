import { FormEventHandler, useState } from "react";
import style from "./style/login.module.css";
import { signIn } from "next-auth/react";
import { NextPage } from "next";

const login: NextPage = (): JSX.Element => {
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: user,
      password: pass,
      redirect: false,
    });
    console.log(res)
    
    // if (res.status !== 200) {
      
    // }
  };


  return (
    <>
      <div className={style.BodyContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <div className={style.user}>
              <label>Usuario</label>
              <input type="text" name="usuario" onChange={(e) => setUser(e.target.value)} />
            </div>
            <div className={style.password}>
              <label>Senha</label>
              <input type="password" name="password" onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>
          <div className={style.BtmArea}>
            <div className={style.Recover}>
              <a href="">➡️ Não lenbro minhas credenciais</a>
            </div>
            <div className={style.BTM}>
              <input type="submit" value="Login" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default login