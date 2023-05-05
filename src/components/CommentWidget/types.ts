export type TComment = {
    id: number
    title: string
    items: TComment[] | []
}

export type TCommentWidget = {
    currentComment: TComment,
    handleInsertComment: Function,
    handleDeleteComment: Function,
} 