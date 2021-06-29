import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash'
import {useDispatch} from "react-redux";
import {getCityOptionsAsync} from '../../store/weather'



const useDebouncedSearch = () => {
    const [inputText, setInputText] = useState('');
    const dispatch = useDispatch();

    const getOptions = (text) =>{
        if(!text.length){
            return;
        }
        dispatch(getCityOptionsAsync(text));
    }
    const debouncedSearch = useCallback(_.debounce(getOptions, 400),[])

    useEffect(()=>{
        debouncedSearch(inputText)
    },[inputText])


    return {
        inputText,
        setInputText
    };
};

export default useDebouncedSearch;
