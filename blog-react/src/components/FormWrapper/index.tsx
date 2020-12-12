import React from 'react'
import './index.scss'

const index = (props: {children: React.ReactNode}) => {
    return (
        <>
            <div className='form-wrapper'>
                {props.children}
            </div>
        </>
    )
}

export default index
