import Spinner from "./Components/Spinner";

type Args = 
{ 
    status: "success" | "error" | "pending"; 
};

const ApiStatus = ({status} : Args) => {
    switch (status)
    {
        case "error": return <div>API error</div>
        case "pending": return <div><Spinner /></div>
        default: throw Error("Unknown API state");
    }
}

export default ApiStatus;
