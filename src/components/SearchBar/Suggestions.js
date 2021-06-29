import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core'
import style from "./SearchBar.module.scss";
import _ from 'lodash'

function Suggestions(props) {
    const generateContext = ()=>{
        return _.map(props.suggestions, (suggestion)=>{
                return (
                    <Typography
                        key={suggestion.Key}
                        onClick={()=>props.setSelected({key: suggestion.Key, name:suggestion.LocalizedName, country: suggestion.Country.LocalizedName })}
                        color="textSecondary"
                        gutterBottom
                    >
                        {suggestion.LocalizedName}, {suggestion.Country.LocalizedName}
                    </Typography>
                )
            })
    }

    if(!props.suggestions.length){
        return <></>
    }

    return (
        <Card className={style.suggestions_wrapper}>
            <CardContent>
                {generateContext()}
            </CardContent>

        </Card>

    );
}

export default Suggestions;
