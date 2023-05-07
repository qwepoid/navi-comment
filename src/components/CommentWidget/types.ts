export type TComment = {
    id: number
    title: string
    items: TComment[] | []
    timeStamp?: Date
    isEdited?: boolean
}

export type TCommentWidget = {
    currentComment: TComment,
    handleEditComment: Function,
    handleInsertComment: Function,
    handleDeleteComment: Function,
} 