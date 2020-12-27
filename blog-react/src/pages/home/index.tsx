import React, { useState, useEffect } from 'react'
import { Row, Col, Carousel, List, Avatar, Pagination, Image, BackTop } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { Link } from 'umi'
import './index.scss'
import avatar from "../../public/images/zp.png";
import blogBg from '../../public/images/compute.png'
import productionBg from '../../public/images/production.png'
import messageBg from '../../public/images/message.png'
import linkBg from '../../public/images/link.png'
import timelineBg from '../../public/images/timeline.png'
import jokeBg from '../../public/images/joke.png'

import { getNewsList } from "../../server/homeApi";

const index = () => {

    const [ news, setNews ] = useState([])
    const content = '一名依靠毒鸡汤, 每天激情热血的程序员'
    const [title, setTitle ] = useState('')
    const [ page, setPage ] = useState(1)

    useEffect(() => {
        const contentArr = content.split('')
        let titleSplit = ''
        let i = 0
        const timer = setInterval(() => {
            titleSplit += contentArr[i]
            setTitle(titleSplit + '_')
            i++
            if (i === contentArr.length) {
                setTitle(titleSplit)
                clearInterval(timer)
            }
        }, 250)
        return (() => clearInterval(timer))
    }, [])

    useEffect(() => {
        const params = {page, count: 5}
        getNewsList(params).then((res: {data: {data: {result: []}}}) => {
            setNews(res.data.data.result)
        }).catch(err => {
            console.log(err)
        })
    }, [page])

    const typeInfo = [
        [
            {   
                id: 1,
                imageUrl: blogBg,
                url: '/blog',
                type: '博客',
                etype: 'BLOG',
                describe: '记录美好技术————技博'
            },
            {
                id: 2,
                imageUrl: productionBg,
                url: '/production',
                type: '作品',
                etype: 'BLOG',
                describe: '是时候展现真正的技术了!'
            },
            {   
                id: 3,
                imageUrl: messageBg,
                url: '/message',
                type: '留言板',
                etype: 'BLOG',
                describe: '消消的你来了, 留个言再走吧~'
            }
        ],
        [
            {   
                id: 4,
                imageUrl: linkBg,
                url: '/blog',
                type: '友情链接',
                etype: 'BLOG',
                describe: '链接的不仅是友情，还有各种情...'
            },
            {
                id: 5,
                imageUrl: timelineBg,
                url: '/production',
                type: '时光轴',
                etype: 'BLOG',
                describe: '光阴似箭, 日月如梭...后面忘了'
            },
            {   
                id: 6,
                imageUrl: jokeBg,
                url: '/message',
                type: '每日段子',
                etype: 'BLOG',
                describe: '每日一条小段子, 生命多活一阵子, 双押？'
            }
        ]
        
    ]

    const pageChange = (page: number) => {
        setPage(page)
    }


    return (
        <div>
            {/* 中心图片 */}
            <div className="center">
                <div className="title">{title}<br/> </div>
                <div className="mask"></div>
                {/* <img style={{width: '100%', height: '500px'}} src={background} alt=""/> */}
            </div>

            {/* 新闻&名片 */}
            <section className="news-card">
            <Row justify="space-around">
                {/* 新闻 */}
                <Col flex={2} style={{background: 'rgba(251,251,251,0.8)', display: 'flex', flexDirection: 'row', borderRadius: '10px'}}>
                    <Carousel style={{width: '350px', height: '240px', padding: '20px 10px'}} autoplay>
                        {news.map((item, i) => {
                            return (
                                <div key={i}>
                                    <Image
                                        width={350}
                                        height={210}
                                        src={item.image}
                                        placeholder={
                                        <Image
                                            src={item.image}
                                            width={350}
                                            height={210}
                                        />
                                        }
                                    />
                                </div>
                            )
                        })}
                    </Carousel>
                    
                    <List
                        style={{flex: 1, padding: '10px 15px'}}
                        itemLayout="horizontal"
                        dataSource={news}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={<a>{item.title}</a>}
                            />
                            <div>{item.passtime}</div>
                        </List.Item>
                        )}
                    />
                    <Pagination  current={page} onChange={(page) => pageChange(page)} 
                    style={{position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)'}} size="small" total={100} showSizeChanger={false} />
                </Col>
                <Col flex="20px" />
                {/* 个人名片 */}
                <Col flex={1}>
                    <ul className="call-card">
                        <div className="avatar">
                            <Avatar size={64} src={avatar} style={{marginBottom: '15px', border: '1px solid #eee'}} />
                        </div>
                        <table align="center">
                            <tbody>
                                <tr>
                                    <td>职业：</td>
                                    <td>某小企前端工程师</td>
                                </tr>
                                <tr>
                                    <td>现居：</td>
                                    <td>广东省广州市</td>
                                </tr>
                                <tr>
                                    <td>邮箱：</td>
                                    <td>993646298@qq.com</td>
                                </tr>
                                <tr>
                                    <td>微信：</td>
                                    <td>17620004641</td>
                                </tr>
                            </tbody>
                        </table>
                    </ul>
                </Col>
            </Row>
            </section>

            {/* 网页导航分类 */}
            <section className="nav-type">
                {typeInfo.map((type, index) => {
                    return (
                        <Row key={index}>
                            {type.map(item => {
                                return (
                                    <Col span={8} key={item.id}>
                                        <div className="type-box" style={{background: `url(${item.imageUrl})`, backgroundSize: 'cover'}}>
                                            <div className="mask"></div>
                                            <div className="nav-title">
                                                <span>{item.type}</span><br/>
                                                <span className="english">{item.etype}</span>
                                                <p>{item.describe}</p>
                                            </div>
                                            <div className="enter-btn">
                                                <span><Link to={item.url}>ENTER</Link></span>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    )
                })}
            </section>
                
            {/* 回到顶部 */}
            <BackTop>
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '30px' }}/></div>
            </BackTop>
        </div>
    )
}

export default index
