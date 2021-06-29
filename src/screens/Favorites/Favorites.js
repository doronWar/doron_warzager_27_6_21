import React from 'react';
import {useSelector} from 'react-redux'
import {useHistory} from "react-router-dom";
import {Paper, Typography} from '@material-ui/core'
import _ from 'lodash';
import helpers from '../../services/helpres'
import style from "./Favorites.module.scss";
import icons from '../../assets/weatherIcons/index'

function Favorites() {
    const history = useHistory();
    const { favorites, scaleIsFahrenheit } = useSelector((state) => state.weather);

    const getItems = ()=>{
        return (
            _.map(favorites, item=>{
                return (
                    <Paper
                        onClick={()=>history.push(`/weather/${item.key}/${item.name}`)}
                        elevation={3}
                        key={item.key}
                        className={style.favorite_item}
                    >
                        <div className={style.favorite_item_body}>

                            <div className={style.fav_data}>
                                <div>
                                    <Typography>
                                        {item.name},
                                    </Typography>
                                    <Typography>
                                        {item.country}
                                    </Typography>
                                </div>
                                <Typography>
                                    {helpers.generateTemp(item.Temperature.Imperial.Value, scaleIsFahrenheit)}
                                </Typography>
                            </div>
                            <div className={style.fav_overview}>
                                <img className={style.forecast_icon} src={icons[item.WeatherIcon]}/>
                                <p>{item.WeatherText}</p>
                            </div>
                        </div>

                    </Paper>
                )
            })
        )
    }
    return (
        <div className={style.favorite_wrapper}>
                <p>My Favorites</p>
            <Paper elevation={3} className={style.favorite_items_wrapper}>
                <>
                    <div className={style.forecast_img}/>
                    {getItems()}
                </>


            </Paper>
        </div>

    );
}

export default Favorites;
