// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const productsRouter = require("./routes/products.router.js");
// const database = require("./connectionDB.js");
// const { ENV_PATH, DIR_PUBLIC_PATH } = require("./constants/paths.js");
// const { ERROR_SERVER } = require("./constants/messages.js");

// // Configuración de express
// const server = express();
// const PORT = process.env.PORT || 3030;
// const HOST = process.env.HOST || "localhost";

// // variables de entorno
// require("dotenv").config({ path: ENV_PATH });

// // Middlewares
// server.use(express.json());
// server.use(cors()); // Habilita CORS para todas las rutas
// server.use("/api/products", productsRouter);

// // Configuración de carpeta estatica
// server.use("/public", express.static(DIR_PUBLIC_PATH));

// // Control de errores
// server.use((error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         return res.status(error.code).send({ success: false, message: error.field });
//     }

//     res.status(500).send({ success: false, message: ERROR_SERVER });
// });

// // Control de rutas inexistentes
// server.use("*", (req, res) => {
//     res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
// });

// // Middleware para manejar las solicitudes OPTIONS
// server.options("*", cors());

// // Método oyente de solicitudes
// server.listen(PORT, HOST, () => {
//     console.log(`Server NodeJS version: ${process.version}`);
//     console.log(`Ejecutandose en http://${HOST}:${PORT}`);
//     database.connect(process.env.DATABASE_URL, process.env.DATABASE_NAME);
// });

// // Método para desconectar MongoDB
// process.on("SIGINT", async () => {
//     await database.desconnect();
//     process.exit();
// });

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const productsRouter = require("./routes/products.router.js");
const database = require("./connectionDB.js");
const { ENV_PATH, DIR_PUBLIC_PATH } = require("./constants/paths.js");
const { ERROR_SERVER } = require("./constants/messages.js");
const { sendEmail } = require("./controllers/contact.controller.js"); // Importa la función sendEmail del controlador de contacto
const { processShoppingCart } = require("./controllers/shoppingCart.controller.js"); // Importa la función processShoppingCart del controlador de carrito

// Configuración de express
const server = express();
const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "localhost";

// variables de entorno
require("dotenv").config({ path: ENV_PATH });

// Middlewares
server.use(express.json());
server.use(cors()); // Habilita CORS para todas las rutas
server.use("/api/products", productsRouter);

// Configuración de carpeta estática
server.use("/public", express.static(DIR_PUBLIC_PATH));

// Control de errores
server.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(error.code).send({ success: false, message: error.field });
    }

    res.status(500).send({ success: false, message: ERROR_SERVER });
});

// Ruta para manejar las solicitudes de contacto
server.post("/api/contact", async (req, res) => {
    try {
        const { fullname, email, telephone, consult } = req.body;
        // Enviar correo electrónico con los detalles de la consulta
        await sendEmail(fullname, email, telephone, consult); // Utiliza la función sendEmail del controlador de contacto
        res.status(200).send({ success: true, message: "Consulta enviada con éxito" });
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        res.status(500).send({ success: false, message: ERROR_SERVER });
    }
});

// Ruta para manejar las solicitudes de proceso de carrito
server.post("/api/process-cart", async (req, res) => {
    try {
        // Aquí colocas el código para procesar el carrito
        await processShoppingCart(req, res);
    } catch (error) {
        console.error("Error al procesar el carrito:", error);
        res.status(500).send({ success: false, message: ERROR_SERVER });
    }
});

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Middleware para manejar las solicitudes OPTIONS
server.options("*", cors());

// Método oyente de solicitudes
server.listen(PORT, HOST, () => {
    console.log(`Server NodeJS version: ${process.version}`);
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
    database.connect(process.env.DATABASE_URL, process.env.DATABASE_NAME);
});

// Método para desconectar MongoDB
process.on("SIGINT", async () => {
    await database.desconnect();
    process.exit();
});