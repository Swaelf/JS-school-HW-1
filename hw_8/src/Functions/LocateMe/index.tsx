
 export default async function LocateMe(): Promise<string> {

    if (!navigator.geolocation) {

        window.alert("Geolocation is not supported by your browser");
        return 'Tbilisi';  

    } else {
        const currentPos: string = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const coords: string = position.coords.latitude + ',' + position.coords.longitude;;
                    resolve(coords);
                },
                (error) => {

                    console.error(error.message);
                    resolve('Tbilisi');
                }
            );
        });
        
        return WeatherCall(currentPos);
   }
}
const weatherUrl: string = "https://api.weatherapi.com/v1";
const weatherKey: string = "d9e8739732f24f7f942112753231504";

const WeatherCall = async (coords: string) => {
        
    return await fetch(
        weatherUrl + '/current.json?key=' + weatherKey + '&q=' + coords
        )
        .then(response => response.json())
        .then(response => {
            return response;
            console.log('weatherLoad = ok'); 
        });        
        
    }
