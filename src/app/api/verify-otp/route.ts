import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const { otp, token } = await request.json();

        if (!otp || !token) {
            return NextResponse.json({ 
                success: false, 
                message: "OTP and token are required", 
                status: 400 
            });
        }

        const decodedToken = jwt.decode(token) as JwtPayload;

        if (!decodedToken) {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid token", 
                status: 400 
            });
        }

        if (decodedToken.otp === parseInt(otp)) {
            return NextResponse.json({ 
                success: true, 
                status: 200 
            });
        }

        return NextResponse.json({ 
            success: false, 
            message: "Invalid OTP", 
            status: 400 
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Internal server error", 
            status: 500 
        });
    }
}
