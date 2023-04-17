import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DataBase: any = process.env.NOTION_DATABASE_ID;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const response: any = await notion.databases.query({
      database_id: DataBase,
    });
    console.log(response)

   /*  if (response.results[0] === undefined) {
      res.status(400).send("Ususario não encontrado");
    }
    const [repData] = response.results;
    const retorna: any = repData.properties; */
    res.status(200).json(response);
  } else {
    res
      .status(405)
      .send("Method Not Allowed: essa rota so permite requisição do tipo GET");
  }
}
