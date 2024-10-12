import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    secure: true,
    auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmailToSubscribers = async (options) => {
    try {
        const { to, template, data } = options;

        // get the email template path
        const emailTemplate = path.join(__dirname, `../mails/${template}.ejs`);
        const html = await ejs.renderFile(emailTemplate, { event: data });

        const subject = `New Event: ${data.title}`;

        const message = {
            from: process.env.SMTP_USER_EMAIL,
            subject,
            html
        };

        // Check if 'to' is an array
        if (Array.isArray(to)) {
            for (const recipient of to) {
                await transporter.sendMail({ ...message, to: recipient });
            }
        } else {
            await transporter.sendMail({ ...message, to });
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};