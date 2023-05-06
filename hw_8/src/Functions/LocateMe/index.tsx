const config = require ('../../config.json');
const key = process.env.REACT_APP_API_KEY;
 
export default async function LocateMe(): Promise<string> {

    if (!navigator.geolocation) {

        window.alert("Geolocation is not supported by your browser");
        return config.defaultCity;  

    } else {
        const currentPos: string = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const coords: string = position.coords.latitude + ',' + position.coords.longitude;;
                    resolve(coords);
                },
                (error) => {

                    window.alert(error.message + '\nWill be shown weather for location Tbilisi');
                    resolve(config.defaultCity);
                }
            );
        });
        
        return WeatherCall(currentPos);
   }
}

const WeatherCall = async (coords: string) => {
        
    return await fetch(
        config.weatherUrl + '/current.json?key=' + key + '&q=' + coords
        )
        .then(response => response.json())
        .then(response => {
            return response;
        });        
        
    }