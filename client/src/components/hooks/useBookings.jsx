import React, { useContext, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';

import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { getALLBookings, getAllFav } from '../../utils/api';



const useBookings = () => {
    const { userDetails:{token}, setUserDetails } = useContext(UserDetailContext);
    const queryRef = useRef();
    const { user } = useAuth0();
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: "allBookings",
        queryFn: () => getALLBookings(user?.email,token),
        onSuccess: (data) => setUserDetails((prev) => ({ ...prev, bookings: data })),
        enabled: !!user?.email && !!token, // Run only if email and token are defined
        staleTime: 30000
    });

    queryRef.current = refetch;

    useEffect(() => {
        if (token) {
            queryRef.current && queryRef.current();
        }
    }, [token]);

    return { data, isError, isLoading, refetch };
};

export default useBookings;

