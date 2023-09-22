import { type } from "os";
import type { NextApiRequest, NextApiResponse } from "../../../node_modules/next/dist/shared/lib/utils";

type data = {
  statusCode: Number;
  data: {
    id: number;
    nama: string;
    usia: number;
  }[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<data>) {
  const data = [
    { id: 1, nama: "MUHAMMAD ALIF FESSOR ADNAN MENDRE", usia: 23 },
    { id: 2, nama: "FILLIANA MAY", usia: 28 },
  ];
  res.status(200).json({ statusCode: 200, data });
}
