import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Group, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useContext } from 'react'
import UserDetailContext from '../../context/UserDetailContext';
import useProperties from "../hooks/useProperties"
import { useMutation } from 'react-query';
import { createResidency } from '../../utils/api.js';
import { toast } from 'react-toastify';

const Facilities = ({
    prevStep,
    propertyDetails,
    setPropertyDetails,
    setOpened,
    setActiveStep,
}) => {
    const form=useForm({
        initialValues:{
            rooms:propertyDetails?.facilities?.rooms??0,
            parkings:propertyDetails?.facilities?.parkings??0,
            bathrooms:propertyDetails?.facilities?.bathrooms??0
        },
        validate:{
            rooms:(value)=>(value<1?"Number of rooms can't be zero":null),
            bathrooms:(value)=>
                value<1?"Number of bathrooms can't be zero":null,
        },
    });

    const {rooms,parkings,bathrooms}=form.values;

    const handleSubmit=()=>{
      const {hasErrors}=form.validate();
      if(!hasErrors){
        setPropertyDetails((prev)=>({
            ...prev,
            facilities :{rooms,parkings,bathrooms},
            userEmail: user?.email,
      }));
      mutate()
      }
    };

    const {user}=useAuth0()
    console.log("checking useAuth0",user?.email)
    const {
        userDetails:{token}
    }=useContext(UserDetailContext);
    const {refetch:refetchProperties}=useProperties();
    const {mutate,isLoading}=useMutation({
        mutationFn:()=>{
        console.log("User email:", user?.email);
            createResidency({
            ...propertyDetails,facilities:{rooms,parkings,bathrooms},userEmail: user?.email
        },token)},
        onError:({response})=>toast.error(response.data.message,{position:"bottom-right"}),
        onSettled:()=>{
            toast.success("Added Successfully",{position:"bottom-right"});
            setPropertyDetails({
                title:"",
        description:"",
        price:0,
        country:"",
        city:"",
        address:"",
        image:null,
        facilities:{
            rooms:0,
            parkings:0,
            bathrooms:0,
        },
        userEmail:user?.email
            })
            setOpened(false)
            // setActiveStep(0)
            refetchProperties()
        }
    })

  return (
    <Box maw="30%" mx="auto" my="sm">
     <form
      onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit();
      }}
     >
      <NumberInput
       withAsterisk
       label="No of Rooms"
       min={0}
       {...form.getInputProps("rooms")}
      />
      <NumberInput
       label="No of parkings"
       min={0}
       {...form.getInputProps("parkings")}
      />
      <NumberInput
       withAsterisk
       label="No of Bathrooms"
       min={0}
       {...form.getInputProps("bathrooms")}
      />
      <Group position='center' mt={'xl'}>
        <Button varient="default" onClick={prevStep}>Back</Button>
        <Button type='submit' color='green' disabled={isLoading} >
            {isLoading? "submitting":"Add Property"}
            
        </Button>

      </Group>

     </form>
    </Box>
    
  )
}

export default Facilities