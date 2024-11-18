import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  // console.log(req.body);
  console.log("Incoming Request Body:", req.body);



  try {
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }
    
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found. Please register the user first." });
      }
      
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect:{email: userEmail} },
      },

    });
    res.send({message:"Residency created successfully", residency});
  } catch (error) {
    if (error.code == "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(error.message);
  }
});
//get all residencies
export const getAllResidencies=asyncHandler(async(req,res)=>{
    const residencies=await prisma.residency.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })
    res.send({residencies})
});

//get a particular residency
export const getResidency=asyncHandler(async(req,res)=>{
    const {id}=req.params;

    try { 
        const residency=await prisma.residency.findUnique({
            where:{id}
        })
        res.send(residency)
    } catch (error) {
       throw new Error(error.message) 
    }
});