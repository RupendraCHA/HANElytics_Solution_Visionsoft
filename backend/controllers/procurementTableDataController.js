import hana from "@sap/hana-client";
import { MongoClient } from "mongodb";

const connOptions = {
  host: process.env.HOST,
  port: 30215,
  user: process.env.USER,
  password: `${process.env.PASSWORD}#1234`,
};

const clientConn = hana.createClient(connOptions);

export const getProcurementTableDataFromEKKO = async (req, res) => {
  try {
    await clientConn.disconnect();

    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM EKKO");

    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    const allDocuments = await collection.find().toArray();

    const updatedArray1 = result.map((object, index) => {
      if (object.EBELN === "4400002345") {
        return {
          ...object,
          fileName: allDocuments[0].name,
          UUID: allDocuments[0]._id,
        };
      } else if (object.EBELN === "4400002349") {
        return {
          ...object,
          fileName: allDocuments[1].name,
          UUID: allDocuments[1]._id,
        };
      } else if (object.EBELN === "4400002278") {
        return {
          ...object,
          fileName: allDocuments[2].name,
          UUID: allDocuments[2]._id,
        };
      } else if (object.EBELN === "4400002279") {
        return {
          ...object,
          fileName: allDocuments[3].name,
          UUID: allDocuments[3]._id,
        };
      } else if (object.EBELN === "4400002280") {
        return {
          ...object,
          fileName: allDocuments[4].name,
          UUID: allDocuments[4]._id,
        };
      } else if (object.EBELN === "4400002281") {
        return {
          ...object,
          fileName: allDocuments[5].name,
          UUID: allDocuments[5]._id,
        };
      } else if (object.EBELN === "4400002282") {
        return {
          ...object,
          fileName: allDocuments[6].name,
          UUID: allDocuments[6]._id,
        };
      } else if (object.EBELN === "4400002283") {
        return {
          ...object,
          fileName: allDocuments[7].name,
          UUID: allDocuments[7]._id,
        };
      } else if (object.EBELN === "4400002284") {
        return {
          ...object,
          fileName: allDocuments[8].name,
          UUID: allDocuments[8]._id,
        };
      } else if (object.EBELN === "4400002286") {
        return {
          ...object,
          fileName: allDocuments[9].name,
          UUID: allDocuments[9]._id,
        };
      } else if (object.EBELN === "4400002287") {
        return {
          ...object,
          fileName: allDocuments[10].name,
          UUID: allDocuments[10]._id,
        };
      } else if (object.EBELN === "4400002288") {
        return {
          ...object,
          fileName: allDocuments[11].name,
          UUID: allDocuments[11]._id,
        };
      } else if (object.EBELN === "4400002289") {
        return {
          ...object,
          fileName: allDocuments[12].name,
          UUID: allDocuments[12]._id,
        };
      } else if (object.EBELN === "4400002290") {
        return {
          ...object,
          fileName: allDocuments[13].name,
          UUID: allDocuments[13]._id,
        };
      } else if (object.EBELN === "4400002291") {
        return {
          ...object,
          fileName: allDocuments[14].name,
          UUID: allDocuments[14]._id,
        };
      } else if (object.EBELN === "4400002292") {
        return {
          ...object,
          fileName: allDocuments[15].name,
          UUID: allDocuments[15]._id,
        };
      } else if (object.EBELN === "4400002293") {
        return {
          ...object,
          fileName: allDocuments[16].name,
          UUID: allDocuments[16]._id,
        };
      } else if (object.EBELN === "4400002294") {
        return {
          ...object,
          fileName: allDocuments[17].name,
          UUID: allDocuments[17]._id,
        };
      } else if (object.EBELN === "4400002295") {
        return {
          ...object,
          fileName: allDocuments[18].name,
          UUID: allDocuments[18]._id,
        };
      } else if (object.EBELN === "4400002296") {
        return {
          ...object,
          fileName: allDocuments[19].name,
          UUID: allDocuments[19]._id,
        };
      } else if (object.EBELN === "4400002297") {
        return {
          ...object,
          fileName: allDocuments[20].name,
          UUID: allDocuments[20]._id,
        };
      } else if (object.EBELN === "4400002298") {
        return {
          ...object,
          fileName: allDocuments[21].name,
          UUID: allDocuments[21]._id,
        };
      } else if (object.EBELN === "4400002299") {
        return {
          ...object,
          fileName: allDocuments[22].name,
          UUID: allDocuments[22]._id,
        };
      } else if (object.EBELN === "4400002300") {
        return {
          ...object,
          fileName: allDocuments[23].name,
          UUID: allDocuments[23]._id,
        };
      } else if (object.EBELN === "4400002301") {
        return {
          ...object,
          fileName: allDocuments[24].name,
          UUID: allDocuments[24]._id,
        };
      } else if (object.EBELN === "4400002302") {
        return {
          ...object,
          fileName: allDocuments[25].name,
          UUID: allDocuments[25]._id,
        };
      } else if (object.EBELN === "4400002303") {
        return {
          ...object,
          fileName: allDocuments[26].name,
          UUID: allDocuments[26]._id,
        };
      } else if (object.EBELN === "4400002304") {
        return {
          ...object,
          fileName: allDocuments[27].name,
          UUID: allDocuments[27]._id,
        };
      } else if (object.EBELN === "4400002305") {
        return {
          ...object,
          fileName: allDocuments[28].name,
          UUID: allDocuments[28]._id,
        };
      } else if (object.EBELN === "4400002306") {
        return {
          ...object,
          fileName: allDocuments[29].name,
          UUID: allDocuments[29]._id,
        };
      } else if (object.EBELN === "4400002307") {
        return {
          ...object,
          fileName: allDocuments[30].name,
          UUID: allDocuments[30]._id,
        };
      } else if (object.EBELN === "4400002308") {
        return {
          ...object,
          fileName: allDocuments[31].name,
          UUID: allDocuments[31]._id,
        };
      } else if (object.EBELN === "4400002309") {
        return {
          ...object,
          fileName: allDocuments[32].name,
          UUID: allDocuments[32]._id,
        };
      } else if (object.EBELN === "4400002310") {
        return {
          ...object,
          fileName: allDocuments[33].name,
          UUID: allDocuments[33]._id,
        };
      } else if (object.EBELN === "4400002363") {
        return {
          ...object,
          fileName: allDocuments[34].name,
          UUID: allDocuments[34]._id,
        };
      } else if (object.EBELN === "4400002364") {
        return {
          ...object,
          fileName: allDocuments[35].name,
          UUID: allDocuments[35]._id,
        };
      } else if (object.EBELN === "4400002365") {
        return {
          ...object,
          fileName: allDocuments[36].name,
          UUID: allDocuments[36]._id,
        };
      }
      else if (object.EBELN === "4400002467") {
        return {
          ...object,
          fileName: allDocuments[38].name,
          UUID: allDocuments[38]._id,
        };
      }
      return object;
    });
    await clientConn.disconnect();
     
    res.status(200).json({ success: true, data: updatedArray1 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementTableDataFromEKPO = async (req, res) => {
  try {
    clientConn.connect();

    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    // const allDocuments = await collection.find().toArray();

    const result = await clientConn.exec("SELECT * FROM EKPO");

    // const updatedArray1 = result.map((object, index) => {
    //   if (object.EBELN === "4400002276") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[0].name,
    //       UUID: allDocuments[0]._id,
    //     };
    //   } else if (object.EBELN === "4400002277") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[1].name,
    //       UUID: allDocuments[1]._id,
    //     };
    //   } else if (object.EBELN === "4400002278") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[2].name,
    //       UUID: allDocuments[2]._id,
    //     };
    //   } else if (object.EBELN === "4400002279") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[3].name,
    //       UUID: allDocuments[3]._id,
    //     };
    //   } else if (object.EBELN === "4400002280") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[4].name,
    //       UUID: allDocuments[4]._id,
    //     };
    //   } else if (object.EBELN === "4400002281") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[5].name,
    //       UUID: allDocuments[5]._id,
    //     };
    //   } else if (object.EBELN === "4400002282") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[6].name,
    //       UUID: allDocuments[6]._id,
    //     };
    //   } else if (object.EBELN === "4400002283") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[7].name,
    //       UUID: allDocuments[7]._id,
    //     };
    //   } else if (object.EBELN === "4400002284") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[8].name,
    //       UUID: allDocuments[8]._id,
    //     };
    //   } else if (object.EBELN === "4400002286") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[9].name,
    //       UUID: allDocuments[9]._id,
    //     };
    //   } else if (object.EBELN === "4400002287") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[10].name,
    //       UUID: allDocuments[10]._id,
    //     };
    //   } else if (object.EBELN === "4400002288") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[11].name,
    //       UUID: allDocuments[11]._id,
    //     };
    //   } else if (object.EBELN === "4400002289") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[12].name,
    //       UUID: allDocuments[12]._id,
    //     };
    //   } else if (object.EBELN === "4400002290") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[13].name,
    //       UUID: allDocuments[13]._id,
    //     };
    //   } else if (object.EBELN === "4400002291") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[14].name,
    //       UUID: allDocuments[14]._id,
    //     };
    //   } else if (object.EBELN === "4400002292") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[15].name,
    //       UUID: allDocuments[15]._id,
    //     };
    //   } else if (object.EBELN === "4400002293") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[16].name,
    //       UUID: allDocuments[16]._id,
    //     };
    //   } else if (object.EBELN === "4400002294") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[17].name,
    //       UUID: allDocuments[17]._id,
    //     };
    //   }else if (object.EBELN === "4400002295") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[18].name,
    //       UUID: allDocuments[18]._id,
    //     };
    //   } else if (object.EBELN === "4400002296") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[19].name,
    //       UUID: allDocuments[19]._id,
    //     };
    //   } else if (object.EBELN === "4400002297") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[20].name,
    //       UUID: allDocuments[20]._id,
    //     };
    //   } else if (object.EBELN === "4400002298") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[21].name,
    //       UUID: allDocuments[21]._id,
    //     };
    //   } else if (object.EBELN === "4400002299") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[22].name,
    //       UUID: allDocuments[22]._id,
    //     };
    //   } else if (object.EBELN === "4400002300") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[23].name,
    //       UUID: allDocuments[23]._id,
    //     };
    //   } else if (object.EBELN === "4400002301") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[24].name,
    //       UUID: allDocuments[24]._id,
    //     };
    //   } else if (object.EBELN === "4400002302") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[25].name,
    //       UUID: allDocuments[25]._id,
    //     };
    //   } else if (object.EBELN === "4400002303") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[26].name,
    //       UUID: allDocuments[26]._id,
    //     };
    //   } else if (object.EBELN === "4400002304") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[27].name,
    //       UUID: allDocuments[27]._id,
    //     };
    //   } else if (object.EBELN === "4400002305") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[28].name,
    //       UUID: allDocuments[28]._id,
    //     };
    //   } else if (object.EBELN === "4400002306") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[29].name,
    //       UUID: allDocuments[29]._id,
    //     };
    //   } else if (object.EBELN === "4400002307") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[30].name,
    //       UUID: allDocuments[30]._id,
    //     };
    //   } else if (object.EBELN === "4400002308") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[31].name,
    //       UUID: allDocuments[31]._id,
    //     };
    //   } else if (object.EBELN === "4400002309") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[32].name,
    //       UUID: allDocuments[32]._id,
    //     };
    //   }else if (object.EBELN === "4400002310") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[33].name,
    //       UUID: allDocuments[33]._id,
    //     };
    //   }
    //   return object;
    // });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementItemData = async (req, res) => {
  const { purchaseOrderNumber } = req.params;
  console.log(purchaseOrderNumber);

  try {
    clientConn.connect();
    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    const allDocuments = await collection.find().toArray();

    const query = `
      SELECT *
      FROM EKKO
      WHERE EKKO.EBELN = '${purchaseOrderNumber}'`;

    const result = await clientConn.exec(query);

    const updatedArray1 = result.map((object, index) => {
      if (object.EBELN === "4400002345") {
        return {
          ...object,
          fileName: allDocuments[0].name,
          UUID: allDocuments[0]._id,
        };
      } else if (object.EBELN === "4400002349") {
        return {
          ...object,
          fileName: allDocuments[1].name,
          UUID: allDocuments[1]._id,
        };
      } else if (object.EBELN === "4400002278") {
        return {
          ...object,
          fileName: allDocuments[2].name,
          UUID: allDocuments[2]._id,
        };
      } else if (object.EBELN === "4400002279") {
        return {
          ...object,
          fileName: allDocuments[3].name,
          UUID: allDocuments[3]._id,
        };
      } else if (object.EBELN === "4400002280") {
        return {
          ...object,
          fileName: allDocuments[4].name,
          UUID: allDocuments[4]._id,
        };
      } else if (object.EBELN === "4400002281") {
        return {
          ...object,
          fileName: allDocuments[5].name,
          UUID: allDocuments[5]._id,
        };
      } else if (object.EBELN === "4400002282") {
        return {
          ...object,
          fileName: allDocuments[6].name,
          UUID: allDocuments[6]._id,
        };
      } else if (object.EBELN === "4400002283") {
        return {
          ...object,
          fileName: allDocuments[7].name,
          UUID: allDocuments[7]._id,
        };
      } else if (object.EBELN === "4400002284") {
        return {
          ...object,
          fileName: allDocuments[8].name,
          UUID: allDocuments[8]._id,
        };
      } else if (object.EBELN === "4400002286") {
        return {
          ...object,
          fileName: allDocuments[9].name,
          UUID: allDocuments[9]._id,
        };
      } else if (object.EBELN === "4400002287") {
        return {
          ...object,
          fileName: allDocuments[10].name,
          UUID: allDocuments[10]._id,
        };
      } else if (object.EBELN === "4400002288") {
        return {
          ...object,
          fileName: allDocuments[11].name,
          UUID: allDocuments[11]._id,
        };
      } else if (object.EBELN === "4400002289") {
        return {
          ...object,
          fileName: allDocuments[12].name,
          UUID: allDocuments[12]._id,
        };
      } else if (object.EBELN === "4400002290") {
        return {
          ...object,
          fileName: allDocuments[13].name,
          UUID: allDocuments[13]._id,
        };
      } else if (object.EBELN === "4400002291") {
        return {
          ...object,
          fileName: allDocuments[14].name,
          UUID: allDocuments[14]._id,
        };
      } else if (object.EBELN === "4400002292") {
        return {
          ...object,
          fileName: allDocuments[15].name,
          UUID: allDocuments[15]._id,
        };
      } else if (object.EBELN === "4400002293") {
        return {
          ...object,
          fileName: allDocuments[16].name,
          UUID: allDocuments[16]._id,
        };
      } else if (object.EBELN === "4400002294") {
        return {
          ...object,
          fileName: allDocuments[17].name,
          UUID: allDocuments[17]._id,
        };
      } else if (object.EBELN === "4400002295") {
        return {
          ...object,
          fileName: allDocuments[18].name,
          UUID: allDocuments[18]._id,
        };
      } else if (object.EBELN === "4400002296") {
        return {
          ...object,
          fileName: allDocuments[19].name,
          UUID: allDocuments[19]._id,
        };
      } else if (object.EBELN === "4400002297") {
        return {
          ...object,
          fileName: allDocuments[20].name,
          UUID: allDocuments[20]._id,
        };
      } else if (object.EBELN === "4400002298") {
        return {
          ...object,
          fileName: allDocuments[21].name,
          UUID: allDocuments[21]._id,
        };
      } else if (object.EBELN === "4400002299") {
        return {
          ...object,
          fileName: allDocuments[22].name,
          UUID: allDocuments[22]._id,
        };
      } else if (object.EBELN === "4400002300") {
        return {
          ...object,
          fileName: allDocuments[23].name,
          UUID: allDocuments[23]._id,
        };
      } else if (object.EBELN === "4400002301") {
        return {
          ...object,
          fileName: allDocuments[24].name,
          UUID: allDocuments[24]._id,
        };
      } else if (object.EBELN === "4400002302") {
        return {
          ...object,
          fileName: allDocuments[25].name,
          UUID: allDocuments[25]._id,
        };
      } else if (object.EBELN === "4400002303") {
        return {
          ...object,
          fileName: allDocuments[26].name,
          UUID: allDocuments[26]._id,
        };
      } else if (object.EBELN === "4400002304") {
        return {
          ...object,
          fileName: allDocuments[27].name,
          UUID: allDocuments[27]._id,
        };
      } else if (object.EBELN === "4400002305") {
        return {
          ...object,
          fileName: allDocuments[28].name,
          UUID: allDocuments[28]._id,
        };
      } else if (object.EBELN === "4400002306") {
        return {
          ...object,
          fileName: allDocuments[29].name,
          UUID: allDocuments[29]._id,
        };
      } else if (object.EBELN === "4400002307") {
        return {
          ...object,
          fileName: allDocuments[30].name,
          UUID: allDocuments[30]._id,
        };
      } else if (object.EBELN === "4400002308") {
        return {
          ...object,
          fileName: allDocuments[31].name,
          UUID: allDocuments[31]._id,
        };
      } else if (object.EBELN === "4400002309") {
        return {
          ...object,
          fileName: allDocuments[32].name,
          UUID: allDocuments[32]._id,
        };
      } else if (object.EBELN === "4400002310") {
        return {
          ...object,
          fileName: allDocuments[33].name,
          UUID: allDocuments[33]._id,
        };
      } else if (object.EBELN === "4400002363") {
        return {
          ...object,
          fileName: allDocuments[34].name,
          UUID: allDocuments[34]._id,
        };
      } else if (object.EBELN === "4400002364") {
        return {
          ...object,
          fileName: allDocuments[35].name,
          UUID: allDocuments[35]._id,
        };
      } else if (object.EBELN === "4400002365") {
        return {
          ...object,
          fileName: allDocuments[36].name,
          UUID: allDocuments[36]._id,
        };
      }
      else if (object.EBELN === "4400002467") {
        return {
          ...object,
          fileName: allDocuments[38].name,
          UUID: allDocuments[38]._id,
        };
      }
      return object;
    });

    // console.log(result);

    res.status(200).json({ success: true, data: updatedArray1 });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

export const getProcurementItemEKPOData = async (req, res) => {
  const { purchaseOrderNumber } = req.params;
  console.log(purchaseOrderNumber);

  try {
    clientConn.connect();
    const mongoURI = process.env.MONGO_URI;
    const client = new MongoClient(mongoURI);
    client.connect();

    const database = client.db("HANElytics_Clients");
    const collection = database.collection("procurementfiles");

    // const allDocuments = await collection.find().toArray();

    const query = `
      SELECT *
      FROM EKPO
      WHERE EKPO.EBELN = '${purchaseOrderNumber}'`;

    const result = await clientConn.exec(query);

    // const updatedArray1 = result.map((object, index) => {
    //   if (object.EBELN === "4400002276") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[0].name,
    //       UUID: allDocuments[0]._id,
    //     };
    //   } else if (object.EBELN === "4400002277") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[1].name,
    //       UUID: allDocuments[1]._id,
    //     };
    //   } else if (object.EBELN === "4400002278") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[2].name,
    //       UUID: allDocuments[2]._id,
    //     };
    //   } else if (object.EBELN === "4400002279") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[3].name,
    //       UUID: allDocuments[3]._id,
    //     };
    //   } else if (object.EBELN === "4400002280") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[4].name,
    //       UUID: allDocuments[4]._id,
    //     };
    //   } else if (object.EBELN === "4400002281") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[5].name,
    //       UUID: allDocuments[5]._id,
    //     };
    //   } else if (object.EBELN === "4400002282") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[6].name,
    //       UUID: allDocuments[6]._id,
    //     };
    //   } else if (object.EBELN === "4400002283") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[7].name,
    //       UUID: allDocuments[7]._id,
    //     };
    //   } else if (object.EBELN === "4400002284") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[8].name,
    //       UUID: allDocuments[8]._id,
    //     };
    //   } else if (object.EBELN === "4400002286") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[9].name,
    //       UUID: allDocuments[9]._id,
    //     };
    //   } else if (object.EBELN === "4400002287") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[10].name,
    //       UUID: allDocuments[10]._id,
    //     };
    //   } else if (object.EBELN === "4400002288") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[11].name,
    //       UUID: allDocuments[11]._id,
    //     };
    //   } else if (object.EBELN === "4400002289") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[12].name,
    //       UUID: allDocuments[12]._id,
    //     };
    //   } else if (object.EBELN === "4400002290") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[13].name,
    //       UUID: allDocuments[13]._id,
    //     };
    //   } else if (object.EBELN === "4400002291") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[14].name,
    //       UUID: allDocuments[14]._id,
    //     };
    //   } else if (object.EBELN === "4400002292") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[15].name,
    //       UUID: allDocuments[15]._id,
    //     };
    //   } else if (object.EBELN === "4400002293") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[16].name,
    //       UUID: allDocuments[16]._id,
    //     };
    //   } else if (object.EBELN === "4400002294") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[17].name,
    //       UUID: allDocuments[17]._id,
    //     };
    //   }else if (object.EBELN === "4400002295") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[18].name,
    //       UUID: allDocuments[18]._id,
    //     };
    //   } else if (object.EBELN === "4400002296") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[19].name,
    //       UUID: allDocuments[19]._id,
    //     };
    //   } else if (object.EBELN === "4400002297") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[20].name,
    //       UUID: allDocuments[20]._id,
    //     };
    //   } else if (object.EBELN === "4400002298") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[21].name,
    //       UUID: allDocuments[21]._id,
    //     };
    //   } else if (object.EBELN === "4400002299") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[22].name,
    //       UUID: allDocuments[22]._id,
    //     };
    //   } else if (object.EBELN === "4400002300") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[23].name,
    //       UUID: allDocuments[23]._id,
    //     };
    //   } else if (object.EBELN === "4400002301") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[24].name,
    //       UUID: allDocuments[24]._id,
    //     };
    //   } else if (object.EBELN === "4400002302") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[25].name,
    //       UUID: allDocuments[25]._id,
    //     };
    //   } else if (object.EBELN === "4400002303") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[26].name,
    //       UUID: allDocuments[26]._id,
    //     };
    //   } else if (object.EBELN === "4400002304") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[27].name,
    //       UUID: allDocuments[27]._id,
    //     };
    //   } else if (object.EBELN === "4400002305") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[28].name,
    //       UUID: allDocuments[28]._id,
    //     };
    //   } else if (object.EBELN === "4400002306") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[29].name,
    //       UUID: allDocuments[29]._id,
    //     };
    //   } else if (object.EBELN === "4400002307") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[30].name,
    //       UUID: allDocuments[30]._id,
    //     };
    //   } else if (object.EBELN === "4400002308") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[31].name,
    //       UUID: allDocuments[31]._id,
    //     };
    //   } else if (object.EBELN === "4400002309") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[32].name,
    //       UUID: allDocuments[32]._id,
    //     };
    //   }else if (object.EBELN === "4400002310") {
    //     return {
    //       ...object,
    //       fileName: allDocuments[33].name,
    //       UUID: allDocuments[33]._id,
    //     };
    //   }
    //   return object;
    // });

    // console.log(result);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};
