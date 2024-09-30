type Error = {
    [name: string] : string[];
};

type Problem = 
{
    type: string;
    title: string;
    status: string;
    errors: Error;
};

export default Problem;