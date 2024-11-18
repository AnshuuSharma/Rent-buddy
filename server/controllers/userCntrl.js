import asyncHandler from 'express-async-handler'
import {prisma} from "../config/prismaConfig.js"

export const createUser=asyncHandler(async(req,res)=>{
    console.log("creating a user");
    let {email}=req.body;
    const userExists=await prisma.user.findUnique({where:{email:email}})

    if(!userExists){
        const user=await prisma.user.create({data:req.body});
       return  res.send({
            message:"User registered successfully",
            user:user,
        });
    }

    else return res.status(201).json({message:"user already registered"});
});

// book visit

export const bookVisit=asyncHandler(async(req,res)=>{
    const {email,date}=req.body;
    const {id}=req.params

    try {
         const alreadyBooked=await prisma.user.findUnique({
            where:{email},
            select:{bookedVisits:true}
         })

         if(alreadyBooked.bookedVisits.some((visit)=>visit.id===id)){
            res.status(400).json({message:"already booked"})
         }
         else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:{push:{id,date}}
                }
            });
            res.send("visit booked successfully");
         }
         
    } catch (error) {
        throw new Error(error.message)
    }
});
// get all visit bookings

export const getALLBookings=asyncHandler(async (req,res)=>{
    const{email}=req.body;
    try {
       const bookings=await prisma.user.findUnique({
        where:{email},
        select:{bookedVisits:true}
       })
       res.status(200).send(bookings); 
    } catch (error) {
        throw new Error(err.message);
    }
});

// cancel booking

export const cancelBooking=asyncHandler(async (req,res)=>{
    const {email}=req.body;
    const {id}=req.params
    try {
        const user=await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })
        const index=user.bookedVisits.findIndex((visit)=>visit.id===id)

        if(index===-1){
            res.status(404).json({message:"booking not found"})
        }else{
            user.bookedVisits.splice(index,1);
            await prisma.user.update({
                where:{email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
            res.send("booking cancelled")
        }
    } catch (error) {
        throw new Error(err.message);
    }
})

// mark a residency as favorite

export const  favResidency=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    const {rid}=req.params;

    try {
       const user=await prisma.user.findUnique({
        where:{email}
       }) 
       if(user.favResidenciesID.includes(rid)){
        const updateUser=await prisma.user.update({
            where:{email},
            data:{
                favResidenciesID:{
                    set:user.favResidenciesID.filter((id)=>id!==rid)
                }
            }
        });
        res.send({message:"removed from favorites",user:updateUser})
       }else{
        const updateUser=await prisma.user.update({
            where:{email},
            data:{
                favResidenciesID:{
                    push:rid
                }
            }
        })
        res.send({message:"updated favorites",user:updateUser})
       }
    } catch (error) {
        throw new Error(error.message);
    }
})
// get all favorites
// export const getAllFav = asyncHandler(async (req, res) => {
//     // console.log("Request Body:", req.body); // Debugging line
//     const {email}=req.body;

//     try {
//         const favresd = await prisma.user.findUnique({
//             where: { email },
//             select: { favResidenciesID: true }
//         });
//         res.status(200).send(favresd);
//     } catch (error) {
//         console.error("Error fetching favourites:", error.message);
//         res.status(500).send({ message: "An error occurred while fetching favourites" });
//     }
// });
// ------------------------------------------------
export const getAllFav = asyncHandler(async (req, res) => {
    console.log("Email received:", req.body.email);  // Debugging line
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {
        const favresd = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID: true }
        });
        console.log("Fetched favorites:", favresd);  // Debugging line
        res.status(200).send(favresd);
    } catch (error) {
        console.error("Error fetching favourites:", error.message);
        res.status(500).send({ message: "An error occurred while fetching favourites" });
    }
});



