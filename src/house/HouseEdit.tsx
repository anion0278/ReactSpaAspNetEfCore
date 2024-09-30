import { useParams } from "react-router-dom";
import { useFetchHouse, useUpdateHouse } from "../Hooks/HouseHooks";
import ApiStatus from "../apiStatus";
import HouseForm from "./HouseForm";
import { ValidationSummary } from "../ValidationSummary";

const HouseEdit = () => {
    const { id } = useParams();
    if (!id) throw Error("No house ID");

    const houseId = parseInt(id);
    const { data, status, isSuccess } = useFetchHouse(houseId);
    const updateHouseMutation = useUpdateHouse();

    if (!isSuccess) return <ApiStatus status={status} />

    return (
        <>
            {updateHouseMutation.isError && <ValidationSummary error={updateHouseMutation.error} />}
            <HouseForm house={data} submitted={(h) => updateHouseMutation.mutate(h)} />
        </>
    )
};

export default HouseEdit;