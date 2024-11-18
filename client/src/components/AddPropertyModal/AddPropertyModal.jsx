import { Container, Modal, Stepper } from '@mantine/core'
import React, { useState } from 'react'
import AddLocation from '../AddLocation/AddLocation';
import { useAuth0 } from '@auth0/auth0-react';
import UploadImage from '../UploadImage/UploadImage';
import BasicDetails from '../BasicDetails/BasicDetails';
import Facilities from '../Facilities/Facilities';

const AddPropertyModal = ({opened,setOpened}) => {
    const [active,setActive]=useState(0);
    const {user}=useAuth0()
    const [propertyDetails,setPropertyDetails]=useState({
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
    });


const nextStep=()=>{
    setActive((current)=>(current<4?current+1:current))
}


const prevStep=()=>{
    setActive((current)=>(current>0?current-1:current))
}

  return (
   <Modal
   opened={opened}
   onClose={()=>setOpened(false)}
   closeOnClickOutside
   size={"90rem"}
   styles={{
    modal: {
      '@media (max-width: 768px)': {
        width: '90%', // Set width for smaller screens
      },
      '@media (max-width: 480px)': {
        width: '100%', // Set width for very small screens
      },
    },
  }}
   >
    <Container h={"40rem"} w={"100%"}  style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '1rem',
      '@media (maxWidth: 768px)': {
        padding: '0.5rem',
      },
    }}>
    <Stepper active={active} onStepClick={setActive} breakpoint="sm"  styles={{
    stepper: {
      '@media (max-width: 768px)': {
        orientation: 'vertical', // Switch to vertical for smaller screens
      },
    },
  }}
    // allowNextStepSelect={false}
    >
        <Stepper.Step
          label="Location"
          description="Address"
         
        >
         <AddLocation
         nextStep={nextStep}
         propertyDetails={propertyDetails}
         setPropertyDetails={setPropertyDetails}
         styles={{
          container: {
            padding: '1rem',
            '@media (max-width: 768px)': {
              padding: '0.5rem',
            },
          },
        }}
         />
        </Stepper.Step>
        <Stepper.Step
          label="Images"
          description="Upload"
          
        >
          <UploadImage
           prevStep={prevStep}
           nextStep={nextStep}
           propertyDetails={propertyDetails}
           setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Basic"
          description="Details"
          
        >
          <BasicDetails
           prevStep={prevStep}
           nextStep={nextStep}
           propertyDetails={propertyDetails}
           setPropertyDetails={setPropertyDetails}
          />
        </Stepper.Step>
        <Stepper.Step>
          <Facilities
           prevStep={prevStep}
           propertyDetails={propertyDetails}
           setPropertyDetails={setPropertyDetails}
           setOpened={setOpened}
          //  setActiveStep={setActive}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </Container>
   </Modal>
  )
}

export default AddPropertyModal