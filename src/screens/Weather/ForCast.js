import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Paper, Button, Typography} from '@material-ui/core'
import _ from 'lodash'
import helpers from '../../services/helpres'
import SvgMapPin from '../../assets/icons/mapPin'
import SvgHeart from '../../assets/icons/heart'
import style from "./Weather.module.scss";
import constants from '../../contants/constants'
import {addFavorite, removeFavorite} from '../../store/weather'
import icons from '../../assets/weatherIcons/index'

function ForeCast() {
    const { cityData, selectedCity, currentTemp, favorites, scaleIsFahrenheit } = useSelector((state) => state.weather);
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false);

    //control heart color
    useEffect(()=>{
        if(favorites[selectedCity.key]){
            setIsFav(true);
        } else {
            setIsFav(false);
        }
    },[favorites, selectedCity])



    const handleOnClickFav = ()=>{
        if(!favorites[selectedCity.key]){
            dispatch(addFavorite({[selectedCity.key]: {...currentTemp, ...{name: selectedCity.name, key: selectedCity.key, country: selectedCity.country}}}))
        } else{
            dispatch(removeFavorite(selectedCity.key))
        }

    }

    const getUpperPart = ()=>{
        const Temperature = currentTemp.Temperature? currentTemp.Temperature.Imperial.Value : null
        return (
            <div className={style.top_forecast}>
                <div className={style.city_data}>
                    <SvgMapPin width={80} height={80}/>
                    <div>
                        <p>{selectedCity.name}</p>
                        <p>{helpers.generateTemp(Temperature, scaleIsFahrenheit)}</p>
                    </div>
                </div>

                <div className={style.fav_options} onClick={handleOnClickFav}>
                    <SvgHeart isLiked={isFav}/>

                </div>
            </div>
        )
    }

    const getForeCastByDays = ()=>{
        const getDay = (date)=>{
            return constants.days[new Date(date).getDay()];
        }
        return _.map(cityData.DailyForecasts, day=>{
            return (
                <Paper elevation={3} key={day.EpochDate} className={style.day_forecast}>
                    <img className={style.forecast_icon} src={icons[day.Day.Icon]}/>
                    <div>
                        <Typography>
                            {getDay(day.Date)}
                        </Typography>
                        <Typography>
                            {`${helpers.generateTemp(day.Temperature.Minimum.Value, scaleIsFahrenheit, false)}-${helpers.generateTemp(day.Temperature.Maximum.Value, scaleIsFahrenheit)}`}
                        </Typography>
                    </div>
                </Paper>
            )
        })
    }


    return (
        <Paper className={style.forecast_wrapper} elevation={3}>
            <div className={style.forecast_img}/>
            < div className={style.forecast_body}>
                {getUpperPart()}
                <div className={style.bottom_forecast}>
                    {getForeCastByDays()}
                </div>
            </div>
        </Paper>





    );
}

export default ForeCast;
