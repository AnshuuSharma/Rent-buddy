import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
dotenv.config()

const app=express();
const PORT=process.env.PORT || 3000;
app.use(
    cors(
    {
      origin: ' http://localhost:5173', // Replace with the URL of your frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    //   // credentials: true,
    }
    )
  );
  
app.use(express.json())
app.use(cookieParser())

  

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

app.use('/api/user',userRoute)
app.use("/api/residency",residencyRoute)