import React from 'react';
import {ButtonGroup, Button} from '@material-ui/core'
import style from "./Header.module.scss";
import {useHistory} from "react-router-dom";
import SettingMenu from './settings'
import logo from '../../assets/herolo-logo.jpeg'

function Header() {
    const history = useHistory();

    return (
        <div className={style.header_wrapper}>
            <div className={style.header_logo} onClick={()=>history.push("/weather")}>
                <img className={style.logo} src={logo}/>
                <p className={style.logo_text}>Herolo Weather Task</p>
            </div>

            <div className={style.header_btns_wrapper}>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={()=>history.push("/weather")}>Weather</Button>
                    <Button onClick={()=>history.push("/favorites")}>Favorites</Button>

                </ButtonGroup>
                <SettingMenu/>
            </div>

        </div>

    );
}

export default Header;
