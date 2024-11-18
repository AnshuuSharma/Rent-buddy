import React, { useEffect } from 'react'
import {useForm} from "@mantine/form";
import { validateString } from '../../utils/common'
import { Button, Group, Select, TextInput } from '@mantine/core'
import useCountries from '../hooks/useCountries';
import Map from '../Map/Map.jsx'
const AddLocation = ({propertyDetails,setPropertyDetails,nextStep}) => {
    const {getAll}=useCountries()
         

    

    const form=useForm({
        initialValues:{
            country:propertyDetails?.country,
            city:propertyDetails?.city,
            address:propertyDetails?.address
        },
        validate:{
            country:(value)=>validateString(value),
            city:(value)=>validateString(value),
            address:(value)=>validateString(value),

        }
    });

    const {country,city,address}=form.values;

    const handleSubmit=()=>{
        const {hasErrors}=form.validate();
        if(!hasErrors){
            setPropertyDetails((prev)=>({...prev,city,address,country}))
            nextStep();
        }
    }

    useEffect(() => {
        setPropertyDetails(form.values);
      }, [form.values, setPropertyDetails]);

  return (
    <form  
    onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
    }}
    >
<div className="flexCenter"  style={{
    justifyContent:"space-between",
    gap:"3rem",
    marginTop:"3rem",
}}
>
    {/* left side */}
<div className="flexColStart" style={{flex:1,gap:"1rem"}}>
    <Select
    w={"100%"}
    withAsterisk
    label="country"
    clearable
    searchable
    data={getAll()}
    {
        ...form.getInputProps("country",{type:"input"})
    }
    />

    <TextInput 
    w={"100%"}
    withAsterisk
    label="city"
    {
        ...form.getInputProps("city",{type:"input"})
    }
    />

<TextInput 
    w={"100%"}
    withAsterisk
    label="address"
    {
        ...form.getInputProps("address",{type:"input"})
    }
    />
</div>


   {/* right side */}

   <div style={{flex:1}}>
    <Map 
    address={address}
    city={city}
    country={country}
    >
        
    </Map>
   </div>
   </div>

   <Group position='center' mt={"xl"}>
    <Button type='submit'>Next Step</Button>
   </Group>
    </form>
    
  )

  
}

export default AddLocation;