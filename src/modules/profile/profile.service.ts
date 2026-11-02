import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
    // console.log(payload);
    const { user_id, bio, address, phone, gender } = payload;

    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1
        `, [user_id]);
    // console.log(user);

    if (user.rows.length === 0) {
        throw new Error("User Not Found");
    }

    const result = await pool.query(`
        INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [user_id, bio, address, phone, gender],
    );
    return result;
}

const getAllProfofileFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM profiles
        `);
    return result;
}

const getSingleProfileFromDB = async (id: string) => {
    const result = await pool.query(`
        SELECT * FROM profiles WHERE id=$1
        `, [id]);
    return result;
}


const updateProfileFromDB = async (payload: any, id: string) => {
    const { bio, address, phone, gender } = payload;

    const result = await pool.query(`
        UPDATE profiles
        SET
        bio=COALESCE($1, bio),
        address=COALESCE($2, address),
        phone=COALESCE($3, phone),
        gender=COALESCE($4, gender)
        
        WHERE id=$5 RETURNING *`,
        [bio, address, phone, gender, id],
    );
    return result;
}

const deleteProfileFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM profiles WHERE id=$1`,
        [id],
    );
    return result;
}


export const profileService = {
    createProfileIntoDB, getAllProfofileFromDB, getSingleProfileFromDB, updateProfileFromDB, deleteProfileFromDB
}