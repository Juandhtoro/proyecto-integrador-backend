const nodemailer = require("nodemailer");

// Configura el transporter con las credenciales y configuraciones de tu proveedor de correo electrónico
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "powerfulmountainsender@gmail.com", // Tu correo electrónico
        pass: "Justtotest.24", // Tu contraseña
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