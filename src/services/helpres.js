function convertCelsiusToFahrenheit(value) {
    return (value * 9) / 5 + 32;
}

function convertFahrenheitToCelsius(value) {
    return (value - 32) * (5 / 9);
}



const generateTemp = (currentTemp, isFahrenheit, showScale=true)=>{
    if(!currentTemp){
        return;
    }

    let temperature = !isFahrenheit? Math.round(convertFahrenheitToCelsius(currentTemp)) :Math.round(currentTemp);
    if(showScale){
        return `${temperature}°${isFahrenheit? "F": "C"}`;
    } else {
        return temperature;
    }
}

const isEnglish = (char)=>{
    const lastCharCode = char.charCodeAt();
    if(lastCharCode >= 0 && lastCharCode <=122 ){
        return true;
    }
    return false
}

export default {
    generateTemp,
    isEnglish
}
