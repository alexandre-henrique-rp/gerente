import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const data = req.body;
    const ID: any = req.query.id;

    const response: any = await notion.pages.update({
      page_id: ID,
      properties: {
        vencimento: {
          date: {
            start: ""
          }
        },
        pagamento: {
          date: {
            start: "2023-04-20"
          }
        },
        valor: {
          number: 40
        },
        obs: {
          rich_text: [
            {
              text: {
                content: "a jo pagou"
              }
            }
          ]
        },
        tag: {
          select: {
            name: "Supermecado"
          }
        },
        typePg: {
          select: {
            name: "Pix"
          }
        },
        trasacao: {
          select: {
            name: "Debito"
          }
        },
        conta: {
          title: [
            {
              text: {
                content: "mercado"
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
      .send("Method Not Allowed: essa rota so permite requisição do tipo PUT");
  }
}
