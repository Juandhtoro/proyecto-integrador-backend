const { sendEmail } = require("./controllers/contact.controller");

// Define valores simulados para los argumentos de la función sendEmail
const fullname = "Juan Perez";
const email = "juan@example.com";
const telephone = "123456789";
const consult = "Hola, tengo una consulta.";

// Llama a la función sendEmail con los valores simulados
sendEmail(fullname, email, telephone, consult)
    .then(() => {
        console.log("Correo electrónico enviado correctamente");
        process.exit(0); // Sale del script con código de salida 0 (éxito)
    })
    .catch((error) => {
        console.error("Error al enviar el correo electrónico:", error);
        process.exit(1); // Sale del script con código de salida 1 (error)
    });