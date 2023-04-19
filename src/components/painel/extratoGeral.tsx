import React, { useEffect, useState } from "react";

export const ExtratoGeral = (): JSX.Element => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("/api/get/extrato_geral")
        .then((Response) => Response.json())
        .then((res: any) => {
          console.log(res.retorno);
          setDados(res.retorno);
        })
        .catch((err: any) => console.log(err));
    })();
  }, []);

  return (
    <>
        {dados.map((item: any) => {
          const date = new Date(item.vencimento);
          const dataAtual = date.toLocaleDateString();
          const date2 = new Date(item.pagamento);
          const dataAtual2 = date2.toLocaleDateString();
          return (
            <>
              <div
                key={item.id}
                style={{
                  width: "20rem",
                  height: "13rem",
                  border: "1px solid #666666",
                  margin: "0.5rem auto",
                  borderRadius: "10px",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ width: "100%", margin: "2rem 1.3rem" }}>
                  <h3>{item.conta}</h3>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: 'wrap',
                    padding: "0.2rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Tramsação: </label>
                    <p>{item.trasacao}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Tipo de pagamento: </label>
                    <p>{item.typePg}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Valor: </label>
                    <p>
                      {item.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Vencimento: </label>
                    <p>{dataAtual === "Invalid Date" ? "" : dataAtual}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Data de pagamento: </label>
                    <p>{dataAtual2 === "Invalid Date" ? "" : dataAtual2}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: '100%',
                    padding: "0.5rem",

                  }}
                  >
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Status: </label>
                    <p>{item.status}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", margin: '0 0.2rem', gap: '5px'}}>
                    <label>Total: </label>
                    <p>
                      {item.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};
