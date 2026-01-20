import dotenv from "dotenv";
import app from "./app";
import axios from "axios";

dotenv.config();

const PORT = process.env.PORT || 4000;
let isRunning = false;

const getInfoCheckReceiptCountAndSendData = () => {
    setInterval(
        async () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            if (hours === 23 && minutes === 59 && seconds === 59) {
                await axios.post("http://localhost:7080/rest/sendData");

                return;
            }

            if (isRunning) return;
            isRunning = true;

            try {
                const getInfo = await axios.get(
                    "http://localhost:7080/rest/info",
                );

                if (
                    getInfo.data.leftLotteries > 70000 &&
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
    getInfoCheckReceiptCountAndSendData();

    console.log(`🚀 Server running on port ${PORT}`);
});
