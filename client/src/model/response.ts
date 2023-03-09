
type QueryResponse<DATA> = {
    error?: boolean
    message: string
    data?: DATA
}

export type { QueryResponse };