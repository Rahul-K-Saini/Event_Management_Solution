import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import bcrypt from "bcryptjs";
import { z } from "zod";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();


        const { email, newPassword } = body;
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const userQuery = await pool.query(
            "UPDATE users SET password = $1 WHERE email = $2 RETURNING id, email",
            [hashedPassword, email]
        );

        if (userQuery.rowCount === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Password updated successfully",
            user: userQuery.rows[0]
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update password" },
            { status: 500 }
        );
    }
}
