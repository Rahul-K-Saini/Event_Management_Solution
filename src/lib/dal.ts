"use server";

import { deleteSession, verifySession } from "./sessions";
import { cache } from "react"
import pool from "./db";
import {redirect} from "next/navigation"

export const logoutUser = async () => {
    await deleteSession();
    redirect("/");
}

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
    try {
        const query_res = await pool.query(
            'SELECT name, email, phone, role FROM users WHERE id = $1',
            [session.userId]
        )
        return query_res.rows[0] || null
    }
    catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})