import bcrypt from "bcryptjs";
import { pool } from "../../db";


const loginUserIntoDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);

    if (userData.rows[0] === 0) {
        throw new Error("Invalid Credentials !")
    }

    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);

    console.log(matchPassword)

    if(!matchPassword){
        throw new Error("Invalid Credentials")
    }
    
}

export const authService = {
    loginUserIntoDB
}