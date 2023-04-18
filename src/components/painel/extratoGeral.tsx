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
      <div>
        {dados.map((item: any) => {
          // "id": "2059585ef9fa4cf28a9ff014ae2a9aa8",
          // "conta": "marmitex",
          // "trasacao": "Debito",
          // "typePg": "Debito",
          // "total": -15,
          // "obs": "marmitex ",
          // "valor": 15,
          // "pagamento": "2023-04-17",
          // "status": "Pg",
          // "vencimento": "2023-04-17"
          const date = new Date(item.vencimento);
          const dataAtual = date.toLocaleDateString();
          const date2 = new Date(item.pagamento);
          const dataAtual2 = date2.toLocaleDateString();
          return (
            <>
              <div
                key={item.id}
                style={{
                  width: "80%",
                  border: "1px solid #666666",
                  margin: "0.5rem auto",
                  borderRadius: "10px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "0.2rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Id: </label> <p>{item.id}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Conta: </label> <p>{item.conta}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Tramsação: </label>
                    <p>{item.trasacao}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "0.2rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Tipo de pagamento: </label>
                    <p>{item.typePg}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Valor: </label>
                    <p>
                      {item.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Vencimento: </label>
                    <p>{dataAtual === "Invalid Date" ? "" : dataAtual}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "0.5rem"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Status: </label>
                    <p>{item.status}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label>Data de pagamento: </label>
                    <p>{ dataAtual2 === "Invalid Date" ? "" : dataAtual2}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
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
      </div>
    </>
  );
};
