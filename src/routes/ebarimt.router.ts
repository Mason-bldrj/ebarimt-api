import express from "express";
import {
    ebarimtGetData,
    ebarimtSendDeleteReceipt,
    ebarimtSendReceiptB2B_Receipt,
    ebarimtSendReceiptB2C_Invoice,
    ebarimtSendReceiptB2C_Receipt,
} from "../service/ebarimt.controller";

const ebarimtRouter = express.Router();

ebarimtRouter.route("/sendDataB2C").post(ebarimtSendReceiptB2C_Receipt);
ebarimtRouter.route("/sendDataB2B").post(ebarimtSendReceiptB2B_Receipt);
ebarimtRouter.route("/sendDataB2C").post(ebarimtSendReceiptB2C_Invoice);
ebarimtRouter.route("/delete-data-receipt").delete(ebarimtSendDeleteReceipt);
ebarimtRouter.route("/get-data-receipt").get(ebarimtGetData);

export default ebarimtRouter;
