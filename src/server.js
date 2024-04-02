const express = require("express");
const multer = require("multer");
const cors = require("cors");
const productsRouter = require("./routes/products.router.js");
const database = require("./connectionDB.js");
const { ENV_PATH, DIR_PUBLIC_PATH } = require("./constants/paths.js");
const { ERROR_SERVER } = require("./constants/messages.js");
const { sendEmail } = require("./controllers/contact.controller.js");
const { processShoppingCart } = require("./controllers/shoppingCart.controller.js");

const server = express();
const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "localhost";

require("dotenv").config({ path: ENV_PATH });

server.use(express.json());
server.use(cors());
server.use("/api/products", productsRouter);

server.use("/public", express.static(DIR_PUBLIC_PATH));

server.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(error.code).send({ success: false, message: error.field });
    }

    res.status(500).send({ success: false, message: ERROR_SERVER });
});

server.post("/api/contact", async (req, res) => {
    try {
        const { fullname, email, telephone, consult } = req.body;
        await sendEmail(fullname, email, telephone, consult);
        res.status(200).send({ success: true, message: "Consulta enviada con éxito" });
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        res.status(500).send({ success: false, message: ERROR_SERVER });
    }
});

server.post("/api/process-cart", async (req, res) => {
    try {
        await processShoppingCart(req, res);
    } catch (error) {
        console.error("Error al procesar el carrito:", error);
        res.status(500).send({ success: false, message: ERROR_SERVER });
    }
});

server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

server.options("*", cors());

server.listen(PORT, HOST, () => {
    console.log(`Server NodeJS version: ${process.version}`);
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
    database.connect(process.env.DATABASE_URL, process.env.DATABASE_NAME);
});

process.on("SIGINT", async () => {
    await database.desconnect();
    process.exit();
});