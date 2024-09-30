const config = {
    // baseHousesApiUrl: "https://localhost:4000/api/houses"
    // baseHousesApiUrl: "api/houses"
    baseHousesApiUrl: "https://realestatelistingexample.azurewebsites.net/api/houses"
}

const currencyFormatter = Intl.NumberFormat(
    "en-US",
    {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });

export default config;
export {currencyFormatter};