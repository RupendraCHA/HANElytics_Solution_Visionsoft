import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "chandaluri210@gmail.com",
    pass: "sqsy sfxr canw bmns"
  },
});
