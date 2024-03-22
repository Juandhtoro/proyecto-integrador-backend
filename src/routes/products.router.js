// const Router = require("express");
// const { validateParamId, validateBody } = require("../validations/products.validation.js");
// const { getAll, getOne, create, update, remove, uploadImage } = require("../controllers/products.controller.js");
// const uploaderImage = require("../uploader.image.js");

// const routes = Router();

// routes
//     .get("/", (req, res) => {
//         getAll(req, res);
//     })
//     .get("/:id", validateParamId, (req, res) => {
//         getOne(req, res);
//     })
//     .post("/", validateBody, (req, res) => {
//         create(req, res);
//     })
//     .put("/:id", validateParamId, validateBody, (req, res) => {
//         update(req, res);
//     })
//     .delete("/:id", validateParamId, (req, res) => {
//         remove(req, res);
//     })
//     .post("/upload", uploaderImage.single("file"), (req, res) => {
//         uploadImage(req, res);
//     });

// module.exports = routes;

const Router = require("express");
const { validateParamId, validateBody } = require("../validations/products.validation.js");
const { getAll, getOne, create, update, remove, uploadImage } = require("../controllers/products.controller.js");
const { sendEmail } = require("../controllers/contact.controller.js"); // Importa la función para enviar correos electrónicos
const uploaderImage = require("../uploader.image.js");

const routes = Router();

routes
    .get("/", (req, res) => {
        getAll(req, res);
    })
    .get("/:id", validateParamId, (req, res) => {
        getOne(req, res);
    })
    .post("/", validateBody, (req, res) => {
        create(req, res);
    })
    .put("/:id", validateParamId, validateBody, (req, res) => {
        update(req, res);
    })
    .delete("/:id", validateParamId, (req, res) => {
        remove(req, res);
    })
    .post("/upload", uploaderImage.single("file"), (req, res) => {
        uploadImage(req, res);
    })
    .post("/contact", validateBody, async (req, res) => { // Nueva ruta para manejar las solicitudes de contacto
        try {
            const { fullname, email, telephone, consult } = req.body;
            await sendEmail(fullname, email, telephone, consult); // Envía el correo electrónico
            res.status(200).send({ success: true, message: "Consulta enviada con éxito" });
        } catch (error) {
            console.error("Error al enviar el correo electrónico:", error);
            res.status(500).send({ success: false, message: "Error al enviar la consulta" });
        }
    });

module.exports = routes;