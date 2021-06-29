import React from 'react';
import {useSelector} from 'react-redux'
import _ from 'lodash'
import { useParams } from "react-router";
import SearchBar from '../../components/SearchBar/SearchBar'
import  ForeCast from './ForCast'

import style from "./Weather.module.scss";
import useForecastFetcher from './useForecastFetcher'

function Weather() {
    const { city, name } = useParams();
    const {handleQueryWeather} = useForecastFetcher({city, name});
    const { cityData} = useSelector((state) => state.weather);

    return (
        <div className={style.Weather_wrapper}>
                <p>The Weather</p>
            <SearchBar queryWeather={handleQueryWeather}/>
            {!_.isEmpty(cityData) &&
                <ForeCast/>
            }

        </div>

    );
}

export default Weather;
