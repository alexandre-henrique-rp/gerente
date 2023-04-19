import { NextPage } from "next";
import React from "react";
import style from "./style.module.css";

const Credito: NextPage = (): JSX.Element => {
  // Status:
  // Pg

  // Total:
  // -R$ 15,00
  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.display1}>
            <div>
              <label>Titulo</label>
              <input type="text" />
            </div>
            <div>
              <label>Valor</label>
              <input type="text" />
            </div>
            <div>
              <label>Vencimento</label>
              <input type="date" />
            </div>
            <div className={style.obsArea}>
              <label>Obs</label>
              <textarea />
            </div>
          </div>
          <div className={style.display2}>
            <div>
              <label>Data de pagamento</label>
              <input type="date" />
            </div>
            <div>
              <label>Tipo de pagamento</label>
              <input type="text" />
            </div>
            <div style={{display: 'flex'}}>
              <label>Status</label>
              <h3>Pg</h3>
            </div>
          </div>
          <div className={style.display3}>
            <div style={{display: 'flex', gap: '10px'}}>
              <label>Total</label>
              <h3>R$ 1000,00</h3>
            </div>
            <div className={style.btmArea}>
              <input type="button" value="Cancelar" />
              <input type="button" value="Salvar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Credito;
