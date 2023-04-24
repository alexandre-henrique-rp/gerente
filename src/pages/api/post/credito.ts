import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DataBase: any = process.env.NOTION_DATABASE_ID;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log("🚀 ~ file: credito.ts:10 ~ data:", data.Titulo)

    const response: any = await notion.pages.create({
      parent: {
        database_id: DataBase
      },
      properties: {
        vencimento: {
          date: {
            start: data.Vencimento
          }
        },
        pagamento: {
          date: {
            start: data.Dpagamento
          }
        },
        valor: {
          number: data.Valor
        },
        obs: {
          rich_text: [
            {
              text: {
                content: data.Obs
              }
            }
          ]
        },
        tag: {
          select: {
            name: data.Tag
          }
        },
        typePg: {
          select: {
            name: data.Tpagamento
          }
        },
        trasacao: {
          select: {
            name: data.trasacao
          }
        },
        conta: {
          title: [
            {
              text: {
                content: data.Title,
              },
            }
          ]
        }
      }
    });

    res.status(200).json(data);
    // res.status(200).json(response);
  } else {
    res
      .status(405)
      .send("Method Not Allowed: essa rota so permite requisição do tipo POST");
  }
}
