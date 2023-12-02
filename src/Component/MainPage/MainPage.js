import './MainPage.scss';

import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';
import {Button} from '@mui/material';

import ActionPopup from '../ActionPopup/ActionPopup';

const TopKeywords = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [interval, setInterval] = useState(7);
    const [popupData, setPopupData] = useState(null);


    useEffect(() => {

            window.addEventListener('keydown', (key) => {
                console.log(key)
                if (key.code === 'Escape' && popupData) {
                    setPopupData(null);
                }
            })


            setLoading(true);
            fetch(`${process.env.REACT_APP_DOMAIN}:8443/getSessionHistory`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    limit: 20, 
                    offset: 10,
                    interval
                })
            })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setData(data.data);
            });
    }, [interval]);



    const showPopup = (data) => {
        setPopupData(data);
    }

    const unshowPopup = () => {
        setPopupData(null);
    }


    const wrapperStyle = loading ? 'c-wrapper blur' : 'c-wrapper';

    return (
        <div className='App'>

        {popupData ? 
        <ActionPopup 
        data={popupData} 
        unshowPopup={unshowPopup}/> 
        : null}

        {loading  ?
        <div className="spinner">
            <CircularProgress/>
            <p className='loading-info'>Loading...</p>
        </div>
        : null}

        <div className={wrapperStyle}>
            <div className="c-container">
                <div className='page-header'>
                    <div className="page-info">
                        <p className='page-info--name'>Action</p>
                    </div>
                </div>
                <table className='keyword-table'>
                    <tr className='keyword-table--header'>
                        <th style={{width: "3%"}}>#</th>
                        <th style={{width: "5%"}}>ID</th>
                        <th style={{width: "10%"}}>IP</th>
                        <th style={{width: "15%"}}>Action</th>  
                        <th style={{width: "15%"}}>mail</th>  
                        <th style={{width: "5%"}}>Country</th>
                        <th style={{width: "15%"}}>Date</th>

                    </tr>

                    {data.map((item, id) => 
                        <tr 
                        onClick={() => showPopup(item)}
                        key={id} 
                        style={id%2===0 ? 
                        {backgroundColor: 'white'} : 
                        {backgroundColor: 'rgb(246, 246, 246)'}}>
                            
                            <td>{1+id}</td>
                            <td>{item?.id}</td>
                            <td>{item?.ip}</td>
                            <td>{item?.userAction}</td>
                            <td>mail</td>
                            <td>{item?.country}</td>
                            <td>{item?.actionData}</td>
                        </tr>                        
                    )}
                </table>
            </div>

        </div>
        <div className='keywords-range'>

        <Button variant="outlined" onClick={() => interval !== 30 ? setInterval(30) : null}>Last 30 days</Button>    
        <Button variant="outlined" onClick={() => interval !== 10 ? setInterval(10) : null}>Last 10 days</Button>    
        <Button variant="outlined" onClick={() => interval !== 7 ? setInterval(7) : null}>Last 7 days</Button>     

        </div>
        </div>
    )
}

export default TopKeywords