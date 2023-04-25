import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DataBase: any = process.env.NOTION_DATABASE_ID;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    
    const response: any = await notion.pages.create({
      parent: {
        database_id: DataBase
      },
      properties: {
        vencimento: {
          type: "date",
          date: {
            start: data.Vencimento
          }
        },
        pagamento: {
          type: "date",
          date: {
            start: data.Dpagamento
          }
        },
        valor: {
          type: "number",
          number: parseFloat(data.Valor)
        },
        obs: {
          rich_text: [
            {
              type: "text",
              text: {
                content: data.Obs
              }
            }
          ]
        },
        tag: {
          type: "select",
          select: {
            name: data.Tag
          }
        },
        typePg: {
          type: "select",
          select: {
            name: data.Tpagamento
          }
        },
        trasacao: {
          select: {
            id: data.trasaction == "Credito" ? "~oMU" : "XoWn",
            name: data.trasaction === ''? null : data.trasaction 
          }
        },
        conta: {
          title: [
            {
              type: "text",
              text: {
                content: data.Titulo
              }
            }
          ]
        }
      }
    });

    res.status(200).json(response);
  } else {
    res
      .status(405)
      .send("Method Not Allowed: essa rota so permite requisição do tipo POST");
  }
}
