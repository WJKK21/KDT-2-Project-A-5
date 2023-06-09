import { Request, Response } from 'express';
import dbConnect from "../../utils/DB/dbConfigure";
class taxiCreatemodule {
  taxiKeyData: string[];
  taxiValueData: unknown[];
  constructor(taxiKeyData: string[], taxiValueData: unknown[]) {
    this.taxiKeyData = taxiKeyData;
    this.taxiValueData = taxiValueData;
  }
}
export default function taxiCreate(req: Request, res: Response) {
  let boxTest: boolean = true;
  const taxiKeyData = Object.keys(req.body);
  const taxiValueData = Object.values(req.body);
  const taxiData = new taxiCreatemodule(taxiKeyData, taxiValueData);
  dbConnect.query(`insert into taxi(${taxiData.taxiKeyData.join(', ')}) VALUES(?);`, [taxiData.taxiValueData], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send({boolean : boxTest});
    // dbConnect.query(`insert into passengers(${taxiData.taxiKeyData.join(', ')}) VALUES(?);`, [taxiData.taxiValueData], (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   }

    //   console.log(result);
    // });
    // console.log(result);
  });
}

