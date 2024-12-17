import MagicCodeEmail from "@/components/email/forget-password";
import { render } from "@react-email/components";
import { sendEmail } from "@/lib/email";
import { generateOTP } from "@/utils/generateOtp";
import jwt from "jsonwebtoken";
import pool from "@/utils/db";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        console.log(email)
        const emailQuery = await pool.query("SELECT email FROM users where email=$1", [email])
        if (emailQuery.rowCount == 0) {
            return Response.json({ error: "Email is not regsitered", status: 500 })
        }
        const otp = generateOTP();
        const token = jwt.sign(
            { email, otp },
            process.env.SESSION_SECRET as string,
            { expiresIn: '5m' }
        );
        const optEmailTemplate = await render(MagicCodeEmail(otp));
        await sendEmail(optEmailTemplate, { to: email });
        return Response.json({ message: "Email sent successfully", token, status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to send email", status: 500 });
    }
}