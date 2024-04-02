const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "powerfulmountainproject@gmail.com",
        pass: "rwhl rbat girb lbmn",
    },
});

const sendEmail = async (fullname, email, telephone, consult) => {
    try {

        const mailOptions = {
            from: "powerfulmountainsender@gmail.com",
            to: "juandhtoro@gmail.com",
            subject: "Consulta desde el formulario de contacto",
            html: `
                <p>Nombre: ${fullname}</p>
                <p>Email: ${email}</p>
                <p>Teléfono: ${telephone}</p>
                <p>Consulta: ${consult}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        throw new Error("Error al enviar el correo electrónico");
    }
};

module.exports = { sendEmail };