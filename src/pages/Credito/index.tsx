import { NextPage } from "next";
import React, { SetStateAction, useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { Tagsde } from "@/components/data/tags";

const Credito: NextPage = (): JSX.Element => {
  const router = useRouter();
  const DATE = new Date().toISOString();
  const [Titulo, setTitulo] = useState<string>("");
  const [Valor, setValor] = useState<string>("");
  const [Vencimento, setVencimento] = useState<any>(DATE);
  const [Obs, setObs] = useState<string>("");
  const [Tag, setTag] = useState<string>("");
  const [Dpagamento, setDpagamento] = useState<any>(DATE);
  const [Tpagamento, setTpagamento] = useState<string>("");
  const [trasacao, setTrasacao] = useState<string>("");
  const [Status, setStatus] = useState<string>("");
  const [Total, setTotal] = useState<number>(0);

  const salve = async () => {
    const data: any = {
      Titulo,
      Valor,
      Vencimento,
      Obs,
      Tag,
      Dpagamento,
      Tpagamento,
      trasacao
    };

    await fetch("/api/post/credito", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((resp) => resp.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <div className={style.display1}>
            <div>
              <label>Titulo</label>
              <input
                type="text"
                onChange={(e) => setTitulo(e.target.value)}
                value={Titulo}
              />
            </div>
            <div>
              <label>Valor</label>
              <input
                type="text"
                onChange={(e) => setValor(e.target.value)}
                value={Valor}
              />
            </div>
            <div>
              <label>Vencimento</label>
              <input
                type="date"
                onChange={(e) => setVencimento(e.target.value)}
                value={Vencimento}
              />
            </div>
            <div className={style.obsArea}>
              <label>Obs</label>
              <textarea onChange={(e) => setObs(e.target.value)} value={Obs} />
            </div>
          </div>
          <div className={style.display2}>
            <div>
              <label>Tag:</label>
              <select onChange={(e) => setTag(e.target.value)} value={Tag}>
                <option value=""></option>
                {Tagsde.map((i: any) => (
                  <option key={i.id} value={i.tag}>
                    {i.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Data de pagamento:</label>
              <input
                type="date"
                onChange={(e) => setDpagamento(e.target.value)}
                value={Dpagamento}
              />
            </div>
            <div>
              <label>Tipo de Transação:</label>
              <select
                onChange={(e) => setTrasacao(e.target.value)}
                value={trasacao}
              >
                <option value=""></option>
                <option value="Credito">Credito</option>
                <option value="Debito">Debito</option>
              </select>
            </div>
            <div>
              <label>Tipo de pagamento:</label>
              <select
                onChange={(e) => setTpagamento(e.target.value)}
                value={Tpagamento}
              >
                <option value=""></option>
                <option value="Credito">Credito</option>
                <option value="Debito">Debito</option>
                <option value="Pix">Pix</option>
                <option value="Boleto">Boleto</option>
                <option value="Tranferencia">Tranferencia</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <label>Status:</label>
            <h3>{Status}</h3>
          </div>
          <div className={style.display3}>
            <div style={{ display: "flex", gap: "10px" }}>
              <label>Total:</label>
              <h3>
                {Total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </h3>
            </div>
            <div className={style.btmArea}>
              <input
                type="button"
                value="Cancelar"
                className={style.btmCancel}
                onClick={() => router.push("/")}
              />
              <input
                type="button"
                value="Salvar"
                className={style.btmSalve}
                onClick={() => salve()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Credito;
