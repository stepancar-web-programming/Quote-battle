import React, { useState } from "react";
import {
    Spacing
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import CustomCard  from "./panels/CustomCard";



function Vote(props) {
    const [quotes, setQuotes] = useState([])

    var url = new URL(`http://localhost:8000/battle/today`)
    fetch(url, {method:'GET',headers:{"Access-Control-Allow-Origin":'*'}}).then(response=>response.json())
    .then((response)=>{ setQuotes(response.quotes)})

    async function setLike(type){
        var isLiked = localStorage.getItem(type)==='true'
        localStorage.setItem(type, isLiked?'false':'true');
        await fetch('http://localhost:8000/battle/vote', {
            method:'POST',
            headers:{"Access-Control-Allow-Origin":'*', "Content-Type": "application/x-www-form-urlencoded"}, 
            body:`type=${type}&delta=${isLiked?-1:1}`
        }).catch(err=>console.log(err))
    }

    return(
            <div style={{paddingLeft: 16, paddingRight: 16}}>
                {quotes.map(item=>
                <div>
                    <CustomCard quote_type={item.type} quote={item.quote} 
                    setLike={setLike} liked={localStorage.getItem(item.type)==='true'}/>
                    <Spacing/>
                </div>)}
            </div>
    )
}
export default Vote