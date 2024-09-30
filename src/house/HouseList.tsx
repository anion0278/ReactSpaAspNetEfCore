import {useFetchHouses} from "../Hooks/HouseHooks";
import { currencyFormatter } from "../config";
import ApiStatus from "../apiStatus";
import { Link, useNavigate } from "react-router-dom";

const HouseList = () => {
    const { data, status, isSuccess } = useFetchHouses();
    const nav = useNavigate();

    if (!isSuccess)
        return <ApiStatus status={status} />

    return (
        <div>
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    Available houses:
                </h5>
            </div>
            <table className="table talble-hover">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((h) =>
                        (<tr key={h.id} onClick={() => nav(`/houses/${h.id}`)}>
                            <td>{h.address}</td>
                            <td>{h.country}</td>
                            <td>{currencyFormatter.format(h.price)}</td>
                        </tr>))}
                </tbody>
            </table>
            <Link className="btn btn-primary" to="/houses/add">
                Add
            </Link>
        </div>
    )
}

export default HouseList;