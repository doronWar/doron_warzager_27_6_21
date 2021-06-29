import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {populateFavorite} from "./store/weather";
import Weather from './screens/Weather/Weather'
import Favorites from './screens/Favorites/Favorites'
import Header from './components/Header/Header'
import Notifier from './components/Notifier/Notifier'
import useForecastFetcher from "./screens/Weather/useForecastFetcher";





export default function Routes() {
    const dispatch = useDispatch();
    const {defaultLocation} = useSelector((state) => state.weather);
    const {getGeoLocation} = useForecastFetcher({city:defaultLocation.key, name:defaultLocation.name});

    useEffect(()=>{
        dispatch(populateFavorite())
        getGeoLocation()
    },[])

    return (
        <Router>
            <div>
                <Header/>
                <Notifier/>
            <Switch>
                <Route exact path="/weather/:city/:name" component={Weather}/>
                <Route exact path="/weather" component={Weather}/>
                <Route exact path="/favorites" component={Favorites}/>
                <Redirect to="/weather" />
            </Switch>
            </div>
        </Router>
    )
}

