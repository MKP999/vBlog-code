import React, { useState, useEffect } from 'react'
import PageWrapper from "../../components/PageWrapper"
import { Image, Button } from 'antd'
import { InteractionOutlined  } from '@ant-design/icons';
import "./index.scss"

import { getJoke } from "../../server/jokeApi";

const index = () => {
    const [ joke, setJoke ] = useState({
        text: '',
        images: '',
        video: ''
    })
    const [ page, setPage ] = useState(Math.floor(Math.random()* 10000))

    useEffect(() => {
        const params = {
            page,
            count: 1
        }
        getJoke(params).then((res:{data: {data: { result: [{type: string, text: string, images: any, video:any}]}}}) => {
            setJoke(res.data.data.result[0])
        }).catch(err => {
            console.log(err)
        })
    }, [page])

    const handleClick = () => {
        setPage(Math.floor(Math.random()* 10000))
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 144px)', height: '100%'}}>
            <Button className="create-center" shape="round" icon={<InteractionOutlined />} size="large" onClick={() => handleClick()}>
                再来一条
            </Button>
            <PageWrapper>
                <h3 className="joke-text">{joke.text}</h3>
                <div className="picture">
                    <Image
                        width={400}
                        src={joke.images}
                        />
                </div>
                <div className="video">
                    {/* <video width="500" height="350" controls autoplay>
                        <source src={joke.video} type="video/mp4" ></source>
                        <source src={joke.video} type="video/ogg" ></source>
                        您的浏览器不支持Video标签。
                    </video> */}
                    <video width="500" height="350" controls autoPlay src={joke.video}>您的浏览器不支持Video标签。</video>
                </div>
            </PageWrapper>
        </div>
    )
}

export default index
