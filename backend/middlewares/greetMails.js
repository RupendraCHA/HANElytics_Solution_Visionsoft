import { transporter } from "./EmailConfig.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";


export const SendVerificationCode = async (email, verificationCode, firstname, lastname) => {
    try {
        const fullname = firstname + " " + lastname
        const response = await transporter.sendMail({
            from: '"Visionsoft Inc." <chandaluri210@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Hi ${fullname}, Verify Your Email`, // Subject line
            text: "Verify Your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode), // html body
          });

        //   console.log("Email sent successfully", response)
    } catch (error) {
        console.log(`Error occurred in sending an Email`)
    }
}

export const WelcomeEmail = async (email, firstname, lastname) => {
    try {
        const fullname = firstname + " " + lastname
        const response = await transporter.sendMail({
            from: '"Visionsoft Inc." <chandaluri210@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Hi ${fullname}, Explore HANElytics AI?ML Solutions`, // Subject line
            text: "Welcome to Visionsoft Inc.", // plain text body
            html: Welcome_Email_Template.replace("{name}", fullname), // html body
          });

        //   console.log("Email sent successfully", response)
    } catch (error) {
        console.log(`Error occurred in sending an Email`)
    }
}