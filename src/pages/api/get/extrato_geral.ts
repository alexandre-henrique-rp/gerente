import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DataBase: any = process.env.NOTION_DATABASE_ID;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response: any = await notion.databases.query({
      database_id: DataBase,
    });
   
    const rest = response.results
   

    const MapResponse = await rest.map((i: any)=>{
      const dados = i.properties
      const resp = {
        id: i.id,
        conta: dados.conta.title[0].plain_text,
        trasacao: dados.trasacao.select?.name,
        typePg: dados.typePg.select?.name,
        total: dados.total.formula?.number,
        obs: dados.obs.rich_text[0]?.plain_text,
        valor: dados.valor?.number,
        pagamento: dados.pagamento.date?.start,
        status: dados.Status.formula?.string,
        vencimento: dados.vencimento.date?.start,
      }
      return resp;
    })

    const retorno = await Promise.all(MapResponse);
    res.status(200).json({retorno});
  } else {
    res
      .status(405)
      .send("Method Not Allowed: essa rota so permite requisição do tipo GET");
  }
}
