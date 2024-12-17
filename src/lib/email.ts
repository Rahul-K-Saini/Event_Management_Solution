import 'server-only';
import nodemailer from 'nodemailer';


export async function sendEmail(template: any, data: any) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const options = {
            from: 'rahul545436@gmail.com',
            to: 'rahul545438@gmail.com',
            subject: 'Forget Password',
            html: template,
        };
        const res = await transporter.sendMail(options);

    } catch (error) {
        throw error;
    }
}