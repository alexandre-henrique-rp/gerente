import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";


const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DataBase: any = process.env.NOTION_DATABASE_ID2;


export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { nome, senha } = req.body;
  console.log(nome)
  const response: any = await notion.databases.query({
    database_id: DataBase,
    filter: {
      and: [
        {
          property: "Name",
          title: {
            equals: nome
          }
        },
        {
          property: "Identificador",
          rich_text: {
            equals: senha
          }
        }
      ]
    }
  });

  if (response.results[0] === undefined){
    res.status(400).send('Ususario não encontrado');
  };
  const [repData] = response.results;
  const retorna: any = repData.properties;
  res.status(200).json(retorna);
}
