import type { NextApiRequest, NextApiResponse } from "next";

export interface IData {
  numberOfPorts: number;
}

let response: IData = undefined;

export default function data(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    response = req.body;
    res.status(200).send("Success");
  } else if (req.method === "GET") res.status(200).json(response);
  else res.status(405);
}
