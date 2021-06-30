import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import mockData from '../contants/mockCityRes'
import mockForeCast from '../contants/mockForeCast.json'
import mockCurrentTemp from '../contants/mockCurrentTemp.json'
import locationByLangLong from '../contants/locationByLangLong.json'

const makeRequest = async (url, methodName)=>{
    try{
        const response = await fetch(url).then(res=>res.json())
        return response;
    } catch(e){
        console.log(`[${methodName}] failed with: `, e);
        toast("Failed to to connect to server")
    }

    return null;
}

const initialState = {
    defaultLocation: {key:215854, name: "Tel Aviv"},
    favorites: {},
    selectedCity: {},
    currentTemp:{},
    cityData: {},
    cityKeyLongLat: "",
    cityOptions: [],
    scaleIsFahrenheit: true
};

export const getCityByLongLat = createAsyncThunk(
    'city/long-lat',
    async (position) => {

        const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${position.coords.latitude}%2C%20${position.coords.longitude}`
        return makeRequest(url, "getCityByLongLat")
        // return Promise.resolve()
    }
);

export const getCityOptionsAsync = createAsyncThunk(
    'city/autocomplete/fetchOptions',
    async (str) => {
        const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_WEATHER_KEY}&q=${str}`
        return makeRequest(url, "getCityOptionsAsync")
        // return Promise.resolve()
    }
);

export const getWeatherForecastAsync = createAsyncThunk(
    'weather/fetchForecast',
    async (key) => {
        const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${process.env.REACT_APP_WEATHER_KEY}`
        return makeRequest(url, "getWeatherForecastAsync")
        // return Promise.resolve()

    }
);

export const getCurrentTempAsync = createAsyncThunk(
    'weather/fetchCurrentTemp',
    async (key) => {
        const url = `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${process.env.REACT_APP_WEATHER_KEY}`
        return makeRequest(url, "getCurrentTempAsync")
        // return Promise.resolve()

    }
);


export const weatherSlice = createSlice({
    name: 'weatherStore',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const key = Object.keys(action.payload)[0]
            state.favorites[key]= action.payload[key]
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFavorite: (state, action) => {
            delete state.favorites[action.payload]
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        populateFavorite: (state, action) => {
            const fav = localStorage.getItem('favorites');
            if(fav){
                try{
                    state.favorites = JSON.parse(fav);
                } catch(e){
                    console.log("failed to get local storage. please delete it and try again")
                }

            }

        },
        setCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        setCityData: (state, action) => {
            state.cityData = action.payload;
            // state.cityOptions = [];
        },
        clearCityOptions: (state, action) => {
            state.cityOptions = [];
        },
        setScale: (state, action) => {
            state.scaleIsFahrenheit= action.payload
        },
        reset: (state, action) => {
            state.cityOptions = [];
            state.selectedCity= {};
            state.currentTemp={};
            state.cityData= {};
        }



    },
    extraReducers: (builder) => {
        builder
            .addCase(getCityOptionsAsync.fulfilled, (state, action) => {
                // state.cityOptions = mockData;
                if(action.payload){
                    state.cityOptions = action.payload;
                    if(!action.payload.length){
                        toast("No suggestions were found")
                    }

                }

            });
        builder
            .addCase(getWeatherForecastAsync.fulfilled, (state, action) => {
                // state.cityData = mockForeCast;
                if(action.payload){
                    state.cityData = action.payload;
                }

            });
        builder
            .addCase(getCityByLongLat.fulfilled, (state, action) => {
                // state.cityKeyLongLat = {key:locationByLangLong.Key, name:locationByLangLong.LocalizedName};
                // state.defaultLocation = {key:locationByLangLong.Key, name:locationByLangLong.LocalizedName};
                if(action.payload){
                    state.cityKeyLongLat = {key:action.payload.Key, name:action.payload.LocalizedName};
                    state.defaultLocation = {key:locationByLangLong.Key, name:locationByLangLong.LocalizedName};
                }

            });
        builder
            .addCase(getCurrentTempAsync.fulfilled, (state, action) => {
                // state.currentTemp = mockCurrentTemp[0];

                if(action.payload){
                    state.currentTemp = action.payload[0];
                }

            });
    },
});

export const { addFavorite, removeFavorite, setCity, setCityData, clearCityOptions, reset, populateFavorite, setScale  } = weatherSlice.actions;
export default weatherSlice.reducer;
