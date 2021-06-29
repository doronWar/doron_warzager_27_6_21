import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {
    getWeatherForecastAsync,
    getCurrentTempAsync,
    reset,
    setCity,
    getCityByLongLat,
    populateFavorite
} from '../../store/weather'

function useForecastFetcher(props){
    const dispatch = useDispatch();
    const {cityKeyLongLat, defaultLocation} = useSelector((state) => state.weather);

    const handleQueryWeather = (key) => {
        dispatch(getWeatherForecastAsync(key))
        dispatch(getCurrentTempAsync(key))
    }

    const onSuccessFindLocation = (position) => {
        dispatch(getCityByLongLat(position))
    }
    const onErrorFindLocation = () => {
        handleQueryWeather(defaultLocation.key);
        dispatch(setCity(defaultLocation));
    }

    // set location by geolocation or by default value (On Error event)
    const getGeoLocation = ()=>{
        navigator.geolocation.getCurrentPosition(onSuccessFindLocation, onErrorFindLocation);
        dispatch(populateFavorite())
    }

    useEffect(() => {
        // update location forecast by url query or received geolocation key
        if (props.city) {
            handleQueryWeather(props.city);
            dispatch(setCity({name: props.name, key: props.city}));
        } else {
            handleQueryWeather(defaultLocation.key);
            dispatch(setCity(defaultLocation));
        }

        return () => {
            dispatch(reset())
        }
    }, [props.city, cityKeyLongLat])

    return {handleQueryWeather, getGeoLocation}

}

export default useForecastFetcher
