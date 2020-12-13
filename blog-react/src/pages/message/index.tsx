import React from 'react'
import './index.scss'
import PageWrapper from "../../components/PageWrapper"
// import E from 'wangeditor'


const index = () => {
    // const editor = new E('#editor')
    // editor.create()

    return (
        <div style={{height: 'calc(100vh - 114px)'}}>
            <PageWrapper>
                <div id="editor"></div>
            </PageWrapper>
        </div>
    )
}

export default index
