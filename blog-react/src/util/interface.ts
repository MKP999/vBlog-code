
export interface blogRollItem {
    _id:string,
    avatar: string,
    title: string,
    describe:string
}

export interface detailBlogItem {
    _id: string,
    avatar: string,
    name:string,
    content: string,
    date: string
}

export interface messageItem {
    _id: string,
    avatar: string,
    name: string,
    email: string,
    content: string,
    date: string,
    reply: boolean,
    comments:[]
}

export interface timelineItem {
    _id: string,
    color: string,
    title:string,
    content: string,
    date: string
}
