import React from 'react'
import { Row, Col, Carousel, List, Avatar, Pagination, Image, BackTop } from 'antd';
import { UserOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Link } from 'umi'
import './index.scss'
import blogBg from '../../public/images/blog.png'
import productionBg from '../../public/images/production.png'
import messageBg from '../../public/images/message.png'
import linkBg from '../../public/images/link.png'
import timelineBg from '../../public/images/timeline.png'
import jokeBg from '../../public/images/joke.png'

const index = () => {
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

    const data = [
        {
            "title": "首日开盘市值突破1000亿：泡泡玛特凭什么吸引95后",
            "passtime": "2020-12-11 10:00:45"
          },
          {
            "title": "狂降至3折！孙正义60亿元贱卖波士顿动力 韩企接盘",
            "passtime": "2020-12-11 10:00:45"
          },
          {
            "title": "抗美援朝前夕林彪突然病倒 聂荣臻:从没见他这么怕过",
            "passtime": "2020-12-11 10:00:45"
          },
          {
            "title": "他扳倒两任总统 一夜间自己成下届总统最热门人选",
            "passtime": "2020-12-11 10:00:45"
          },
          {
            "title": "印度专家谈中国人不想生:别担心,说明中国人变富了!",
            "passtime": "2020-12-11 10:00:45"
          }
    ]

    const img = [
        {imgUrl: 'http://cms-bucket.ws.126.net/2020/1210/5206ca10j00ql3nuq003uc000s600e3c.jpg?imageView&thumbnail=140y88&quality=85'},
        {imgUrl: 'http://cms-bucket.ws.126.net/2020/1210/21bd7f97p00ql3kfl002vc0009c0070c.png?imageView&thumbnail=140y88&quality=85'},
        {imgUrl: 'http://cms-bucket.ws.126.net/2020/1210/5206ca10j00ql3nuq003uc000s600e3c.jpg?imageView&thumbnail=140y88&quality=85'},
        {imgUrl: 'http://cms-bucket.ws.126.net/2020/1210/21bd7f97p00ql3kfl002vc0009c0070c.png?imageView&thumbnail=140y88&quality=85'},
        {imgUrl: 'http://cms-bucket.ws.126.net/2020/1210/5206ca10j00ql3nuq003uc000s600e3c.jpg?imageView&thumbnail=140y88&quality=85'}
    ]

    return (
        <div>
            {/* 中心图片 */}
            <div className="center">
                <div className="title">Welcome !!! <br/> </div>
                <div className="mask"></div>
                {/* <img style={{width: '100%', height: '500px'}} src={background} alt=""/> */}
            </div>

            {/* 新闻&名片 */}
            <section className="news-card">
            <Row justify="space-around">
                {/* 新闻 */}
                <Col flex={2} style={{background: '#fff', display: 'flex', flexDirection: 'row'}}>
                    <Carousel style={{width: '350px', height: '240px', padding: '20px 10px'}} autoplay>
                        {img.map((item, i) => {
                            return (
                                <div>
                                    {/* <img style={{width: '100%', height: '100%'}} key={i} src={item.imgUrl} alt=""/> */}
                                    <Image
                                        width={350}
                                        height={210}
                                        src={item.imgUrl}
                                        placeholder={
                                        <Image
                                            src={item.imgUrl}
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
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={<a>{item.title}</a>}
                            />
                            <div>{item.passtime}</div>
                        </List.Item>
                        )}
                    />
                    <Pagination style={{position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)'}} size="small" total={50} />
                </Col>
                <Col flex="20px" />
                {/* 个人名片 */}
                <Col flex={1}>
                    <ul className="call-card">
                        <li className="avatar">
                            <Avatar size={64} icon={<UserOutlined />} />
                        </li>
                        <li>职业： </li>
                        <li>现居： </li>
                        <li>邮箱： </li>
                        <li>微信： </li>
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
                <div className="back-up"><UpCircleOutlined style={{ fontSize: '18px' }}/></div>
            </BackTop>
        </div>
    )
}

export default index
