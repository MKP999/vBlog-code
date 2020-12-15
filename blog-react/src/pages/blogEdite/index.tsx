import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd';
import './index.scss'
import E from 'wangeditor'

let editor: any = null
const index = () => {
    const [content, setContent] = useState('')

    useEffect(() => {
        // 注：class写法需要在componentDidMount 创建编辑器
        editor = new E("#editor")
    
        editor.config.onchange = (newHtml: any) => {
          setContent(newHtml)
        }
        // 设置编辑区域高度为 1000px
        editor.config.height = 750

        /**一定要创建 */
        editor.create()
        
        return () => {
          // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
          editor.destroy()
        }
      }, [])

       // 获取html方法1
        const getHtml = () => {
            alert(content)
        }

        // 获取html方法2
        const getHtml1 = () => {
            alert(editor.txt.html())
        }

        // 获取text
        const getText = () => {
            alert(editor.txt.text())
        }


    return (
        <div style={{height: 'calc(100vh - 114px)'}}>
            <Row>
                <Col span={16} offset={4}>
                    <div id="editor" ></div>

                    <button onClick={getHtml}>获取html</button>
                    <button onClick={getHtml1}>获取html1</button>
                    <button onClick={getText}>获取text</button>
                </Col>
            </Row>
        </div>
    )
}

export default index
