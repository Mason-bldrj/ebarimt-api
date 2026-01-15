import { Request, Response } from "express";
import axios from "axios";

const EBARIMT_URL = "http://localhost:7080/rest/receipt";

const sendToEbarimt = async (payload: any) => {
  const response = await axios.post(EBARIMT_URL, payload);
  return response.data;
};

export const ebarimtSendReceiptB2C_Receipt = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      totalAmount,
      districtCode,
      merchantTin,
      posNo,
      consumerNo,
      branchNo,
      items,
    } = req.body;

    const payload = {
      branchNo,
      totalAmount,
      totalVAT: 0,
      totalCityTax: 0,
      districtCode: "2501",
      merchantTin,
      posNo,
      customerTin: merchantTin,
      consumerNo: consumerNo || "",
      type: "B2C_RECEIPT",
      inactiveId: null,
      reportMonth: null,
      billIdSuffix: "01",
      receipts: [
        {
          totalAmount,
          taxType: "VAT_FREE",
          merchantTin,
          customerTin: null,
          totalVAT: 0,
          totalCityTax: 0,
          invoiceId: null,
          bankAccountNo: "",
          iBan: "",
          items,
        },
      ],
      payments: [
        {
          code: "CASH",
          status: "PAID",
          paidAmount: totalAmount,
        },
      ],
    };

    const data = await sendToEbarimt(payload);

    return res.status(200).json({ message: "Success", data });
  } catch (error: any) {
    return res.status(500).json({
      message: "B2C receipt error",
      error: error.response?.data || error.message,
    });
  }
};

export const ebarimtSendReceiptB2B_Receipt = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      totalAmount,
      districtCode,
      merchantTin,
      customerTin,
      posNo,
      branchNo,
      items,
    } = req.body;

    const payload = {
      branchNo,
      totalAmount,
      totalVAT: 0,
      totalCityTax: 0,
      districtCode: "2501",
      merchantTin,
      posNo,
      customerTin,
      consumerNo: "",
      type: "B2B_RECEIPT",
      inactiveId: null,
      reportMonth: null,
      billIdSuffix: "01",
      receipts: [
        {
          totalAmount,
          taxType: "VAT_FREE",
          merchantTin,
          customerTin,
          totalVAT: 0,
          totalCityTax: 0,
          bankAccountNo: null,
          iBan: null,
          items,
        },
      ],
      payments: [
        {
          code: "CASH",
          status: "PAID",
          paidAmount: totalAmount,
        },
      ],
    };

    const data = await sendToEbarimt(payload);

    return res.status(200).json({ message: "Success", data });
  } catch (error: any) {
    return res.status(500).json({
      message: "B2B receipt error",
      error: error.response?.data || error.message,
    });
  }
};

// export const ebarimtSendReceiptB2C_Invoice = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { totalAmount, totalVAT, districtCode, merchantTin, posNo } =
//       req.body;
//     const payload = {
//       branchNo: "001",
//       totalAmount,
//       totalVAT: totalVAT || 0,
//       totalCityTax: 0,
//       districtCode,
//       merchantTin,
//       posNo,
//       customerTin: null,
//       consumerNo: "",
//       type: "B2C_INVOICE",
//       inactiveId: null,
//       invoiceId: null,
//       reportMonth: null,
//       billIdSuffix: "01",
//       receipts: [
//         {
//           totalAmount,
//           taxType: "VAT_ZERO",
//           merchantTin,
//           customerTin: null,
//           totalVAT,
//           totalCityTax: 0,
//           bankAccountNo: "1111111111",
//           iBan: "1001000151111111111",
//           items: [
//             {
//               name: "Таван толгой - Хятад улсын Ганц модны боомт",
//               barCode: null,
//               barCodeType: "UNDEFINED",
//               classificationCode: "6511905",
//               measureUnit: "senlovesfits",
//               taxProductCode: "502",
//               qty: 1,
//               unitPrice: totalAmount,
//               totalVAT,
//               totalCityTax: 0,
//               totalAmount,
//             },
//           ],
//         },
//       ],
//       payments: [
//         {
//           code: "CASH",
//           status: "PAID",
//           paidAmount: totalAmount,
//         },
//       ],
//     };
//     const resEbarimt = await axios.post(
//       "http://localhost:7080/rest/receipt",
//       payload
//     );
//     return res.status(200).json({
//       message: "Success B2C",
//       data: resEbarimt.data, // :white_tick: SAFE
//     });
//   } catch (error: any) {
//     console.error("B2C invoice error:", error.message);
//     return res.status(500).json({
//       message: "Error",
//       error: error.response?.data || error.message, // :white_tick: SAFE
//     });
//   }
// };
// export const ebarimtSendReceiptB2B_Invoice = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { totalAmount, districtCode, merchantTin, posNo, items } = req.body;
//     // Optional basic validation
//     if (!totalAmount || !districtCode || !merchantTin || !posNo || !items) {
//       return res.status(400).json({
//         message: "Missing required fields",
//       });
//     }
//     const payload = {
//       branchNo: "001",
//       totalAmount: totalAmount,
//       totalVAT: 0,
//       totalCityTax: 0,
//       districtCode: districtCode,
//       merchantTin: merchantTin,
//       posNo: posNo,
//       customerTin: merchantTin,
//       consumerNo: "",
//       type: "B2B_RECEIPT",
//       inactiveId: null,
//       reportMonth: null,
//       billIdSuffix: "01",
//       receipts: [
//         {
//           totalAmount: totalAmount,
//           taxType: "VAT_FREE",
//           merchantTin: merchantTin,
//           customerTin: null,
//           totalVAT: 0,
//           totalCityTax: 0,
//           bankAccountNo: null,
//           invoiceId: null,
//           iBan: null,
//           items: items, // :point_left: EXACT items from request
//         },
//       ],
//       payments: [
//         {
//           code: "CASH",
//           status: "PAID",
//           paidAmount: totalAmount,
//         },
//       ],
//     };
//     const resEbarimt = await axios.post(
//       "http://localhost:7080/rest/receipt",
//       payload
//     );
//     return res.status(200).json({
//       message: "Success B2B",
//       data: resEbarimt.data, // :white_tick: SAFE
//     });
//   } catch (error: any) {
//     console.error("B2B VAT_FREE receipt error:", error.message);
//     return res.status(500).json({
//       message: "Error",
//       error: error.response?.data || error.message, // :white_tick: SAFE
//     });
//   }
// };
export const ebarimtSendDeleteReceipt = async (req: Request, res: Response) => {
  try {
    const { id, date } = req.body;

    const response = await axios.delete(EBARIMT_URL, {
      data: { id, date },
    });

    return res.status(200).json({
      message: "Deleted",
      data: response.data,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Delete error",
      error: error.response?.data || error.message,
    });
  }
};

export const ebarimtGetData = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    // const resEbarimt = await axios.get(`/rest/receipt`);
    // return res.status(200).json({
    //     message: "Success",
    //     data: resEbarimt,
    // });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error,
    });
  }
};
