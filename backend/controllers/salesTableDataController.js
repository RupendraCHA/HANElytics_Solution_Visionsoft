// Data From VBAK Table
import hana from "@sap/hana-client";

const connOptions = {
  host: process.env.HOST,
  // port: process.env.PORT,
  port: 30215,
  user: process.env.USER,
  password: `${process.env.PASSWORD}#1234`,
};

const clientConn = hana.createClient(connOptions);

// GET TABLES DATA

// Fetching VBAK (Sales Order Header) Table Data
export const getSalesTableDataFromVBAK = async (req, res) => {
  try {
    clientConn.connect();
    const query = `SELECT VBAK.*, VBAP.*, VBKD.* 
      FROM VBAK
      JOIN VBAP ON VBAK.VBELN = VBAP.VBELN
      JOIN VBKD ON VBAP.VBELN = VBKD.VBELN
    `;
    const result = await clientConn.exec(query);
    // const result = await clientConn.exec("SELECT * FROM VBAK");
    const resultData = result.map(({VBELN, POSNR, MATNR, ARKTX, KWMENG,KBMENG,VDATU_ANA, NETPR,NETWR,VRKME, WERKS, PSTYV,FKREL}) => ({VBELN, POSNR, MATNR, ARKTX, KWMENG,KBMENG,VDATU_ANA, NETPR,NETWR,VRKME, WERKS, PSTYV,FKREL}))
    console.log(resultData)
    res.status(200).json({ success: true, data: resultData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching VBAP (Sales Order Item) Table Data
export const getSalesTableDataFromVBAP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBAP");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Header) Table Data

export const getSalesTableDataFromLIKP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM LIKP");
    const resultData = result.map(({VBELN,VSTEL,VKORG,LFART,WADAT,INCO1,INCO2,KUNAG,KUNNR,BTGEW,NTGEW,WAERK}) => ({VBELN,VSTEL,VKORG,LFART,WADAT,INCO1,INCO2,KUNAG,KUNNR,BTGEW,NTGEW,WAERK}))
    res.status(200).json({ success: true, data: resultData });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Item) Table Data

export const getSalesTableDataFromLIPS = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM LIPS");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching Billing Header Table Data

export const getSalesTableDataFromVBRK = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBRK");
    const resultData = result.map(({VBELN,FKART,VBTYP,WAERK,VKORG,VTWEG,KONDA,INCO1,INCO2,ZTERM,BUKRS,NETWR,KUNRG,KUNAG}) => ({VBELN,FKART,VBTYP,WAERK,VKORG,VTWEG,KONDA,INCO1,INCO2,ZTERM,BUKRS,NETWR,KUNRG,KUNAG}))
    res.status(200).json({ success: true, data: resultData });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching LIPK (Sales Delivery Item) Table Data

export const getSalesTableDataFromVBRP = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec("SELECT * FROM VBRP");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching EKKO (Purchase Order Header) Table Data

export const getFilesDataFromEKKO = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec(`SELECT
        *
    FROM
        EKKO`);
    // const query = `SELECT VBAK.*, VBAP.*, VBKD.*
    //   FROM VBAK
    //   JOIN VBAP ON VBAK.VBELN = VBAP.VBELN
    //   JOIN VBKD ON VBAP.VBELN = VBKD.VBELN
    // `;
    // const result = await clientConn.exec(query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching EKKO (Purchase Order Header) Table Data

export const getFilesDataFromEKPO = async (req, res) => {
  try {
    clientConn.connect();
    const result = await clientConn.exec(`SELECT 
        *
    FROM 
        EKPO`);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Fetching Data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching EKKO (Purchase Order Header) Table Data

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the database!');

//   const query = 'SELECT SO_FOLDER_ROOT_ID_GET(?, ?) AS result';
//   const values = [1, 2]; // Example values for your function

//   connection.query(query, values, (err, results) => {
//   if (err) throw err;

//   console.log('Result from the database function:', results[0].result);

//   connection.end();
//   });
//   });

// /VSDMAG/ZPO_ATTACH_CONTENT
// IV_PO_NUMBER
// 4500000000
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the database!");

//   const query = "SELECT /VSDMAG/ZPO_ATTACH_CONTENT(?, ?) AS result";
//   const values = [IV_PO_NUMBER, 4500000000]; // Example values for your function

//   connection.query(query, values, (err, results) => {
//     if (err) throw err;

//     console.log("Result from the database function:", results[0].result);

//     connection.end();
//   });
// });
export const getFilesDataFromSRGBTBREL = async (req, res) => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");

    const query = "SELECT /VSDMAG/ZPO_ATTACH_CONTENT(?, ?) AS result";
    const values = [IV_PO_NUMBER, 4500000000]; // Example values for your function

    connection.query(query, values, (err, results) => {
      if (err) throw err;

      console.log("Result from the database function:", results[0].result);

      connection.end();
    });
  });
  // try {
  //   clientConn.connect();
  //   const result = await clientConn.exec(`SELECT
  //       *
  //   FROM
  //       SRGBTBREL`);
  //   // const result = clientConn.connect(query);

  //   res.status(200).json({ success: true, data: result });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Error Fetching Data");
  // } finally {
  //   clientConn.disconnect();
  // }
};

// ITEM DATA QUERY

// Fetching Sales Order Item Data W.R.T (With Respect To) Document Number
export const getSalesDocumentOrderItemData = async (req, res) => {
  const { documentNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    //     const query = `
    //       SELECT VBAP.MATNR AS materialNumber,
    //        VBAP.POSNR AS itemNumber,
    //        VBAP.KWMENG AS quantity,
    //        VBAP.NETWR AS netValue
    // FROM VBAP
    // WHERE VBAP.VBELN = '${documentNumber}'`;
    // WHERE VBAP.VBELN = '${documentNumber}'

    const query = `
      SELECT *
      FROM VBAP
      WHERE VBAP.VBELN = '${documentNumber}'`;

    const result = await clientConn.exec(query);
    // console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching Sales Order Item Data W.R.T (With Respect To) Document Number
export const getSalesDocumenDeliverytItemData = async (req, res) => {
  const { documentNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    const query = `
      SELECT *
      FROM LIPS
      WHERE LIPS.VBELN = '${documentNumber}'`;

    const result = await clientConn.exec(query);
    // console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Fetching Sales Invoice Item Data W.R.T (With Respect To) Document Number
export const getSalesDocumenBillingtItemData = async (req, res) => {
  const { documentNumber } = req.params;
  console.log(documentNumber);

  try {
    clientConn.connect();

    const query = `
      SELECT *
      FROM VBRP
      WHERE VBRP.VBELN = '${documentNumber}'`;

    const result = await clientConn.exec(query);
    // console.log(result);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  } finally {
    clientConn.disconnect();
  }
};

// Get Attachments
