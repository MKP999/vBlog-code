import React from 'react'
import { Row, Col, Card, Divider } from 'antd'
import './index.scss'
import PageWrapper from "../../components/PageWrapper"
import bollUrl from '../../public/images/canvasBoll.png'
import planeUrl from '../../public/images/jsplane.png'
import musicUrl from '../../public/images/kgmusic.png'
import readUrl from '../../public/images/reading.png'
import shopUrl from '../../public/images/uni-app-shopping.png'
import movieUrl from '../../public/images/wc-movie.png'

const index = () => {
    const { Meta } = Card;
    const data = [
        {
            id: 1,
            title: '球球大作战',
            imageUrl: bollUrl,
            url: 'https://MKP999.github.io/HTML5/ballWar/',
            describe: 'canvas为基础球吃球小游戏'
        },
        {
            id: 2,
            title: '飞机大战',
            imageUrl: planeUrl,
            url: 'https://mkp999.github.io/planegame/04-plane/plane.html',
            describe: '原生js实现经典飞机大战'
        },
        {
            id: 3,
            title: '仿酷狗音乐播放器',
            imageUrl: musicUrl,
            url: 'https://mkp999.github.io/kgmusic/',
            describe: 'vue&vant-ui打造仿酷狗音乐盒'
        },
        {
            id: 4,
            title: '品书小说阅读器',
            imageUrl: readUrl,
            url: 'https://mkp999.github.io/novel/',
            describe: 'vue重现读者的天堂'
        },
        {
            id: 5,
            title: 'uni-app仿小米商城',
            imageUrl: shopUrl,
            url: '',
            describe: 'uni-app打造适配app、h5与小程序商城'
        },
        {
            id: 6,
            title: '微信小程序场库',
            imageUrl: movieUrl,
            url: '',
            describe: '一个短视频微信小程序'
        }

    ]

    return (
        <div>
            <PageWrapper>
                    <Divider style={{color: '#fff', borderColor: '#fff', fontSize: '18px'}}>作品</Divider>

                     <Row gutter={30} style={{padding: '0 30px'}}>
                     {data.map(item => {
                            return (
                                <Col key={item.id} span={12}>
                                    <a href={item.url}>
                                        <Card
                                            style={{marginBottom: '20px'}}
                                            key={item.id}
                                            hoverable
                                            cover={<img alt={item.title} src={item.imageUrl} />}
                                        >
                                        <Meta title={item.title} description={item.describe} />
                                        </Card>
                                    </a>
                                </Col>
                            )
                        })}
                    </Row>
            </PageWrapper>
        </div>
    )
}

export default index
