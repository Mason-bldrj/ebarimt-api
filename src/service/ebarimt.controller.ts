import { Request, Response } from "express";
import axios from "axios";

export const ebarimtSendReceiptB2C_Receipt = async (
    req: Request,
    res: Response,
) => {
    const {
        totalAmount,
        totalVAT,
        districtCode,
        merchantTin,
        posNo,
        consumerNo,
        items,
    } = req.body;
    const payload = {
        branchNo: "001",
        totalAmount: totalAmount,
        totalVAT: totalVAT,
        totalCityTax: 100,
        districtCode: districtCode,
        merchantTin: merchantTin,
        posNo: posNo,
        customerTin: null,
        consumerNo: consumerNo || " ",
        type: "B2C_RECEIPT",
        inactiveId: null,
        reportMonth: null,
        billIdSuffix: "01",
        receipts: [
            {
                totalAmount: 5600,
                taxType: "VAT_FREE",
                merchantTin: "110718991986",
                customerTin: null,
                totalVAT: 500,
                totalCityTax: 100,
                invoiceId: null,
                bankAccountNo: "",
                iBan: "",
                items: items,
            },
        ],
        payments: [
            {
                code: "CASH",
                status: "PAID",
                paidAmount: 5600,
            },
        ],
    };

    try {
        const resEbarimt = await axios.post(
            "//localhost:7080/rest/receipt",
            req.body,
        );
        return res.status(200).json({
            message: "Success",
            data: resEbarimt,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error,
        });
    }
};

export const ebarimtSendReceiptB2B_Receipt = async (
    req: Request,
    res: Response,
) => {
    const {
        totalAmount,
        totalVAT,
        districtCode,
        merchantTin,
        posNo,
        consumerNo,
        items,
    } = req.body;
    const payload = {
        branchNo: "001",
        totalAmount: totalAmount,
        totalVAT: totalVAT,
        totalCityTax: 100,
        districtCode: districtCode,
        merchantTin: merchantTin,
        posNo: posNo,
        customerTin: merchantTin,
        consumerNo: consumerNo || "",
        type: "B2B_RECEIPT",
        inactiveId: null,
        reportMonth: null,
        billIdSuffix: "01",
        receipts: [
            {
                totalAmount: totalAmount,
                taxType: "VAT_FREE",
                merchantTin: merchantTin,
                customerTin: null,
                totalVAT: totalVAT,
                totalCityTax: 100,
                invoiceId: null,
                bankAccountNo: "",
                iBan: "",
                items: items,
            },
        ],
        payments: [
            {
                code: "CASH",
                status: "PAID",
                paidAmount: 5600,
            },
        ],
    };

    try {
        const resEbarimt = await axios.post(
            "//localhost:7080/rest/receipt",
            payload,
        );
        return res.status(200).json({
            message: "Success",
            data: resEbarimt,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error,
        });
    }
};

export const ebarimtSendReceiptB2C_Invoice = async (
    req: Request,
    res: Response,
) => {
    const {
        totalAmount,
        totalVAT,
        districtCode,
        merchantTin,
        posNo,
        consumerNo,
        items,
    } = req.body;
    const payload = {
        branchNo: "001",
        totalAmount: totalAmount,
        totalVAT: totalVAT || 0,
        totalCityTax: 0,
        districtCode: districtCode,
        merchantTin: merchantTin,
        posNo: posNo,
        customerTin: null,
        consumerNo: "",
        type: "B2C_INVOICE",
        inactiveId: null,
        invoiceId: null,
        reportMonth: null,
        billIdSuffix: "01",
        receipts: [
            {
                totalAmount: totalAmount,
                taxType: "VAT_ZERO",
                merchantTin: merchantTin,
                customerTin: null,
                totalVAT: totalVAT,
                totalCityTax: 0,
                bankAccountNo: "1111111111",
                iBan: "1001000151111111111",
                items: [
                    {
                        name: "Таван толгой - Хятад улсын Ганц модны боомт",
                        barCode: null,
                        barCodeType: "UNDEFINED",
                        classificationCode: "6511905",
                        measureUnit: "senlovesfits",
                        taxProductCode: "502",
                        qty: 1,
                        unitPrice: 5000,
                        totalVAT: totalVAT,
                        totalCityTax: 0,
                        totalAmount: totalAmount,
                    },
                ],
            },
        ],
        payments: [
            {
                code: "CASH",
                status: "PAID",
                paidAmount: 5000,
            },
        ],
    };

    try {
        const resEbarimt = await axios.post("", req.body);
        return res.status(200).json({
            message: "Success",
            data: resEbarimt,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error,
        });
    }
};

export const ebarimtSendReceiptB2B_Invoice = async (
    req: Request,
    res: Response,
) => {
    const {
        totalAmount,
        totalVAT,
        districtCode,
        merchantTin,
        posNo,
        consumerNo,
        items,
    } = req.body;
    const payload = {
        branchNo: "001",
        totalAmount: totalAmount,
        totalVAT: totalVAT,
        totalCityTax: 20,
        districtCode: districtCode,
        merchantTin: merchantTin,
        posNo: posNo,
        customerTin: merchantTin,
        consumerNo: consumerNo || "",
        type: "B2B_RECEIPT",
        inactiveId: null,
        invoiceId: null,
        reportMonth: null,
        billIdSuffix: "string",
        data: {},
        receipts: [
            {
                totalAmount: 1120,
                totalVAT: 100,
                totalCityTax: 20,
                taxType: "VAT_ABLE",
                merchantTin: merchantTin,
                bankAccountNo: "string",
                iBan: "100100015121212121111",
                data: {},
                items: [
                    {
                        name: "Бичгийн Цаас А4",
                        barCode: "0123456789012",
                        barCodeType: "GS1",
                        classificationCode: "3212911",
                        taxProductCode: "string",
                        measureUnit: "string",
                        qty: 1,
                        unitPrice: 1120,
                        totalVAT: 100,
                        totalCityTax: 20,
                        totalAmount: 1120,
                        data: {
                            lotNo: "string",
                            stockQR: ["BF6B1FBA86FB4C41ADDBB01C09C024F5"],
                        },
                    },
                ],
            },
        ],
        payments: [
            {
                code: "string",
                exchangeCode: "string",
                status: "string",
                paidAmount: 1120,
                data: {},
            },
        ],
    };
    try {
        const resEbarimt = await axios.post("", req.body);
        return res.status(200).json({
            message: "Success",
            data: resEbarimt,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error,
        });
    }
};

export const ebarimtSendDeleteReceipt = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const resEbarimt = await axios.delete(`/rest/receipt`, {
            data: {
                id: id,
                date: Date.now(),
            },
        });
        return res.status(200).json({
            message: "Success",
            data: resEbarimt,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error,
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
