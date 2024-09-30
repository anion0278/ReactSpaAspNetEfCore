import { useAddHouse } from "../Hooks/HouseHooks";
import { House } from "../Types/house";
import { ValidationSummary } from "../ValidationSummary";
import HouseForm from "./HouseForm";

const HouseAdd = () => {
    const addHouseMutation = useAddHouse();

    const house: House = {
        address: "",
        country: "",
        description: "",
        price: 0,
        id: 0,
        photo: "",
    };

    return (
        <>
            {addHouseMutation.isError && <ValidationSummary error={addHouseMutation.error} />}
            <HouseForm house={house} submitted={(h) => addHouseMutation.mutate(h)} />
        </>
    );
};

export default HouseAdd;