import { useNavigate } from "react-router-dom";
import config from "../config";
import { House } from "../Types/house";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import Problem from "../Types/Problem";


const useFetchHouses = () => {
    return useQuery<House[], AxiosError>(
        {
            queryKey: ["houses"],
            queryFn: () =>
                axios.get(config.baseHousesApiUrl).then((resp) => resp.data),
        });
};

const useFetchHouse = (id: number) => {
    return useQuery<House, AxiosError>(
        {
            queryKey: ["houses", id],
            queryFn: () =>
                axios.get(`${config.baseHousesApiUrl}/${id}`).then((resp) => {console.log(`Hi: ${config.baseHousesApiUrl}/${id}`); console.log(resp); return resp.data;}),
        });
};

const useAddHouse = () => {
    const nav = useNavigate();

    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError<Problem>, House>({
        mutationFn: (h) => axios.post(config.baseHousesApiUrl, h), 
        onSuccess: () => {
            queryClient.invalidateQueries(
                {
                    queryKey: ["houses"]
                }   
            );
            nav("/");
        }
    });
}

const useUpdateHouse = () => {
    const nav = useNavigate();

    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError<Problem>, House>({
        mutationFn: (h) => axios.put(config.baseHousesApiUrl, h), 
        onSuccess: (_, house) => {
            queryClient.invalidateQueries(
                {
                    queryKey: ["houses"]
                }   
            );
            nav(`/houses/${house.id}`);
        }
    });
}

const useDeleteHouse = () => {
    const nav = useNavigate();

    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError, House>({
        mutationFn: (h) => axios.delete(`${config.baseHousesApiUrl}/${h.id}`), 
        onSuccess: () => {
            queryClient.invalidateQueries(
                {
                    queryKey: ["houses"]
                }   
            );
            nav("/");
        }
    });
}

export { useFetchHouse, useAddHouse, useUpdateHouse, useDeleteHouse, useFetchHouses };
