import { Injectable } from '@nestjs/common';
import { createClientAsync, Client } from 'soap';

@Injectable()
export class AppService {
  private _client: Client;
  getHello(): string {
    return 'Hello World!';
  }

  async test_endpoint(): Promise<{ Guardar_AbsentismoResult:{DocNum: string, Mensaje: string }}> {
    const url = "http://10.0.5.5:8921/ServiceModelServices/service?wsdl"
    const options = {}
    this._client = await createClientAsync(url, options);
    let json = {
      EmployeeID: 862,
      Reason: "prueba3",
      FromDate: "2023-03-22",
      ToDate: "2023-03-24",
      U_hora_desde: "1503",
      U_hora_hasta: "1503",
      ConfirmerNumber: 272,
      U_tipo_absent: 74
    }
    const data = {
      oAbsentismo: JSON.stringify(json)
    }
    return new Promise((resolve, reject) => {
      this._client.Guardar_Absentismo(data, (err: any, result: { Guardar_AbsentismoResult:{DocNum: string, Mensaje: string }}) => {
        if (err) {
          reject(err)
        } else {
          console.log(result)
          resolve(result)
        }
        this._client.removeAllListeners()
      })
    })
  }
}