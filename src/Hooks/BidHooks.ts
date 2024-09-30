import axios, { AxiosError, AxiosResponse } from "axios";
import { Bid } from "../Types/bid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "../config";
import Problem from "../Types/Problem";

const useFetchBids = (houseId: number) => {
    return useQuery<Bid[], AxiosError<Problem>>(
        {
            queryKey: ["bids", houseId] ,
            queryFn: () =>
                axios.get(`${config.baseHousesApiUrl}/${houseId}/bids`).then((resp) => resp.data),
        });
};

const useAddBid = (houseId: number) => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError<Problem>, Bid>({
        mutationFn: (b) => axios.post(`${config.baseHousesApiUrl}/${houseId}/bids`, b), 
        onSuccess: () => {
            queryClient.invalidateQueries(
                {
                    queryKey: ["bids", houseId]
                }   
            );
        }
    });
}


export {useFetchBids, useAddBid};
