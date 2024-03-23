const nodemailer = require("nodemailer");

// Configura el transporter con las credenciales y configuraciones de tu proveedor de correo electrónico
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "powerfulmountainproject@gmail.com", // Tu correo electrónico
        pass: "rwhl rbat girb lbmn", // Tu contraseña
    },
});

// Función para enviar correo electrónico
const sendEmail = async (fullname, email, telephone, consult) => {
    try {
        // Configura el correo electrónico
        const mailOptions = {
            from: "powerfulmountainsender@gmail.com", // Remitente
            to: "juandhtoro@gmail.com", // Destinatario (en este caso, el correo de la tienda)
            subject: "Consulta desde el formulario de contacto", // Asunto del correo
            html: `
                <p>Nombre: ${fullname}</p>
                <p>Email: ${email}</p>
                <p>Teléfono: ${telephone}</p>
                <p>Consulta: ${consult}</p>
            `, // Cuerpo del correo en formato HTML
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        throw new Error("Error al enviar el correo electrónico");
    }
};

module.exports = { sendEmail };