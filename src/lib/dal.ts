"use server";

import { deleteSession, verifySession } from "./sessions";
import { cache } from "react"
import pool from "../utils/db";
import { redirect } from "next/navigation"

export const logoutUser = async () => {
    await deleteSession();
    redirect("/");
}

export const getEvents = cache(async () => {
    const session = await verifySession();
    if (!session) return null;
    const query_res = await pool.query(
        'SELECT id, title, description, event_date, location, status, image FROM events WHERE created_by = $1',
        [session.userId]
    );
    console.log(query_res);
    return query_res.rows || null;
});

export const getEvent = cache(async (id: string) => {
    const query_res = await pool.query(
        'SELECT * FROM events WHERE id = $1',
        [id]
    );
    return query_res.rows[0] || null;
});

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