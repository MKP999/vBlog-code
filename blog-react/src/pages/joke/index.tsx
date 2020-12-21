import React, { useState, useEffect } from 'react'
import PageWrapper from "../../components/PageWrapper"

import { getJoke } from "../../server/homeApi";

const index = () => {
    const [ joke, setJoke ] = useState({})

    useEffect(() => {
        const params = {
            page: Math.floor(Math.random()* 10000),
            count: 1
        }
        getJoke(params).then((res:{data: {data: { result: [type: string, text: string, images: any, video:any]}}}) => {
            console.log(res.data)
            setJoke(res.data.data.result[0])
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div style={{height: 'calc(100vh - 114px)'}}>
            <PageWrapper>
                {joke.text}
                <img src={joke.images} alt=""/>
                <video src={joke.video}></video>
            </PageWrapper>
        </div>
    )
}

export default index
