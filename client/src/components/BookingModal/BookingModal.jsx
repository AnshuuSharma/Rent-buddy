import { Modal, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import UserDetailContext from '../../context/UserDetailContext.js';
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const BookingModal = ({ opened, setopened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const { userDetails: { token },setUserDetails } = useContext(UserDetailContext);

  const handleBookingSuccess=()=>{
    toast.success("Visit booked succesfully ",{position:"bottom-right"});
    setUserDetails((prev)=>({
      ...prev,
      bookings:[
        ...prev.bookings,
        {
          id:propertyId,date:dayjs(value).format('DD/MM/YYYY')
        }
      ]
    }))
  }
  
  const { mutate , isLoading} = useMutation({
    mutationFn:()=>bookVisit(value, propertyId, email,token),
    onSuccess:()=>handleBookingSuccess(),
    onError:({response})=>toast.error(response.data.message),
    onSettled:()=>setopened(false)
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setopened(false)}
      title="Select your date of visit"
      centered
      withinPortal
    >
      <div className="flexColCenter" style={{gap:"1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() =>{
           try {
             mutate();
          } catch (error) {
            console.error("Mutation error:", error);
          }
        }}>Book Visit</Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
// export default Demo;

