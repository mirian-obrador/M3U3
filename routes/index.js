var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.post("/", async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  console.log("mostrar variables");
  console.log(req.body);
  var obj = {
    to: "obradormirian@gmail.com",
    subject: "Contacto web Enredados",
    html:
      nombre +
      " " +
      apellido +
      " se contacto a través de la web y quiere más información a este correo:" +
      email +
      ". <br> Además, hizo este comentario: " +
      mensaje,
  };

  var smtpConfig = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  };

  var transporter = nodemailer.createTransport(smtpConfig);

  var info = await transporter.sendMail(obj);

  res.render("index", {
    message: "Mensaje enviado correctamente",
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
