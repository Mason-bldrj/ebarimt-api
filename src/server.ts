import dotenv from "dotenv";
import app from "./app";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT || 4000;
let isRunning = false;

const getInfoCheckReceiptCountAndSendData = () => {
  setInterval(
    async () => {
      if (isRunning) return;
      isRunning = true;

      try {
        const getInfo = await axios.get("http://localhost:7080/rest/info");

        if (
          70000 < getInfo.data.leftLotteries &&
          getInfo.data.leftLotteries < 99999
        ) {
          await axios.post("http://localhost:7080/rest/sendData");
        }
      } catch (error) {
        console.error("Check error:", error);
      } finally {
        isRunning = false;
      }
    },
    60 * 60 * 1000,
  );
};

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  getInfoCheckReceiptCountAndSendData();
});
