import axios from "axios";
import dayjs from "dayjs";
import {toast} from "react-toastify";

export const api=axios.create({
  baseURL:"http://localhost:8000/api",
  headers: { 'Content-Type': 'application/json' },
});

export const getAllProperties=async()=>{
  try{
    const response =await api.get("/residency/allResidencies",{
      timeout:10*1000,
    });
    if(response.status===400|| response.status===500){
      throw response.data
    }
    return response.data
  }catch(err){
    toast.error("something went wrong");
    throw err;
  }
};

export const getPropertyDesc=async(id)=>{
  try{
    const response=await api.get(`/residency/${id}`,{
      timeout:10*1000,
    });
    if(response.status===400||response.status===5000){
      throw response.data
    }
    return response.data
  }catch(err){
    toast.error("something went wrong");
    throw err;
  }
}

export const createUser=async(email,token)=>{
  try {
    await api.post(`/user/register`,{email},{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
  } catch (error) {
    toast.error("something went wrong, please try again")
    throw error
  }
};

export const bookVisit=async(date,propertyId,email,token)=>{
  try {
    await api.post(`/user/bookVisit/${propertyId}`,{
     email,
     id:propertyId,
     date:dayjs(date).format("DD/MM/YY")
    },
  {
    headers:{
      Authorization:`Bearer ${token}`,
    }
  }
  )
  } catch (err) {
    toast.error("something went wrong, please try again");
    throw err
  }
}
export const removeBooking=async (id,email,token)=>{
  try {
    await api.post(`/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("something went wrong, please try again");
    throw error
  }
}
export const toFav=async(id,email,token)=>{
  try {
    await api.post(`/user/addFav/${id}`,
      { email},
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

// export const getAllFav = async (email, token) => {
//   if (!token) return;

//   try {
//     // const bodyData={email}
//     // console.log("Request Body:", bodyData);

//     const res = await api.post(
//       '/user/allfav/',
//       {email},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log("Response:", res.data);
//     return res.data["favResidenciesID"];
//   } catch (e) {
//     console.error("Error fetching favorites:", e);
//     toast.error("Something went wrong while fetching favourites");
//     throw e;
//   }
// };


// the code written below is also not working
export const getAllFav = async (email, token) => {
  if (!token) return;

  try {
     // Log to verify payload
    const response = await api.post(
      '/user/allfav/',
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.favResidenciesID;
  } catch (e) {
    console.error("Error fetching favorites:", e.response ? e.response.data : e);
    toast.error("Something went wrong while fetching favourites");
    throw e;
  }
};

export const getALLBookings=async(email,token)=>{
  if(!token) return
  try {
    const res=await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );
    // console.log("res",res)
    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error
  }
}
export const createResidency=async(data,token)=>{
  try {
//     const token = req.headers.authorization?.split(" ")[1];
// if (!token) {
//   return res.status(401).json({ message: "Authorization token is missing." });
// }
    const res=await api.post(
      `/residency/create`,
      {
        data
      },
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
      
    )
    console.log("res:",res.data)
  } catch (error) {
     throw error
}
}