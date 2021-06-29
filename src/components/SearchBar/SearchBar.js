import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import style from "./SearchBar.module.scss";
import useDebouncedSearch from './useDebouncedSearch'
import Suggestions from './Suggestions'
import {clearCityOptions, setCity} from '../../store/weather'
import  helpers from '../../services/helpres'

function SearchBar(props) {
    const dispatch = useDispatch();
    const {inputText, setInputText} = useDebouncedSearch();
    const { cityOptions } = useSelector((state) => state.weather);
    const [selected, setSelected] = useState({});
    const [err, setErr] = useState(false);

    useEffect(()=>{
        const escFunction = (event)=>{
            // if escape was clicked
            if(event.keyCode === 27) {
                dispatch(clearCityOptions());
            }
        }
        document.addEventListener("keydown", escFunction, false);

        return ()=>{
            document.removeEventListener("keydown", escFunction, false);
        }
    },[])

    useEffect(()=>{
        if(props.queryWeather && !_.isEmpty(selected)){
            dispatch(clearCityOptions());
            dispatch(setCity(selected));
            props.queryWeather(selected.key)
        }
    },[selected])

    const handleOnChange = (e)=>{
        const lastChar = e.currentTarget.value.length > 1 ? e.currentTarget.value.slice(-1) : e.currentTarget.value;
        if(lastChar.length){
            if(helpers.isEnglish(lastChar)){
                setInputText(e.currentTarget.value)
                if(err){
                    setErr(false)
                }
            } else{
                setErr(true)
            }

        } else {
            setInputText(e.currentTarget.value)
        }

    }

    return (
        <div className={style.search_bar_wrapper}>
            <div className={style.search_bar_body}>
            <FormControl className={style.input_wrapper} variant="outlined" error={err}>
                <InputLabel htmlFor="outlined">City</InputLabel>
                <OutlinedInput
                    id="outlined"
                    type='text'
                    value={inputText}
                    onChange={handleOnChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton
                                edge="start"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
                {err && <FormHelperText id="component-error-text">Please only use English letters</FormHelperText>}
            </FormControl>

            <Suggestions suggestions={cityOptions} setSelected={setSelected}/>
            </div>
        </div>

    );
}

export default SearchBar;
