const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

exports.sendWelcomeEmail = async (payload) => {
    const { name, email, password, verificationLink } = payload;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // Use environment variables
            pass: process.env.EMAIL_PASS,  // Use App Passwords or secure method
        },
    });

    let emailTemplate = `
        <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2>Welcome to Our Platform!</h2>
            <p>Hi ${name},</p>
            <p><strong>Username:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>Thank you for signing up. Please verify your email to activate your account.</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">If you didn’t sign up, you can safely ignore this email.</p>
        </div>
    `;

    let mailOptions = {
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome! Verify Your Email",
        html: emailTemplate,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.messageId);
        return { success: true, msg: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, msg: "Failed to send email", error: error.message };
    }
};
