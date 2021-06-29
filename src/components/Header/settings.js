import React, {useState, useRef, useEffect} from 'react';
import {Paper, Switch} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import clsx from 'clsx'
import style from "./Header.module.scss";
import {setScale} from '../../store/weather'

function SettingMenu() {
    const dispatch = useDispatch();
    const { scaleIsFahrenheit} = useSelector((state) => state.weather);
    const [isOpen, setIsOpen] = useState(false)
    const ignoreClickOnMeElement = useRef(null)
    useEffect(()=>{
        document.addEventListener('click', function(event) {
            const isClickInsideElement = ignoreClickOnMeElement.current.contains(event.target);
            if (!isClickInsideElement) {
                setIsOpen(false);
            }
        });
    },[])

    return (
        <div className={style.menu_wrapper} ref={ignoreClickOnMeElement}>
            <div className={clsx(style.center, { [style.menu_open]: isOpen })} onClick={()=>setIsOpen(s=>!s)} >

                <div></div>
            </div>
            {isOpen &&
            <Paper elevation={3} className={style.menu_body}>
                <div className={style.sacle_wrapper}>
                    <p>Scale</p>
                    <div className={style.sacle_Toggle_wrapper}>
                        <p>°C</p>
                        <Switch
                            checked={scaleIsFahrenheit}
                            onChange={()=>dispatch(setScale(!scaleIsFahrenheit))}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <p>°F</p>
                    </div>
                </div>
            </Paper>
            }

        </div>

    );
}

export default SettingMenu;
