import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"

const app : Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


const pool = new Pool({
    connectionString : "postgresql://neondb_owner:npg_aB9RqIGQJm3A@ep-old-breeze-b44bi2c4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

const initDB = async() =>{
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)

            console.log("Database connected successfully")
    }catch(error){
        console.log(error)
    }
}

initDB()

app.get('/', (req: Request, res: Response) => {

  res.status(200).json({
    "message" : "Express---server",
    "author": "ASHIK KHAN"
  });
});

app.post('/', async(req:Request, res:Response)=>{
    // console.log(req.body);
    const {name, email, password, age} = req.body;
    const result = await pool.query(`
        INSERT INTO users(name, email, password, age) VALUES($1,$2,$3,$4) RETURNING *
        `,[name, email, password, age]);
        // console.log(result);

    res.status(201).json({
        message : "User Created successfully",
        data: result.rows[0]
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})