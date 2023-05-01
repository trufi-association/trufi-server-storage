type Survey = {
    _id: string
    idDevice: string
    transportCode: string
    surveyData: string    
    createdAt: string
    updatedAt: string
}

type SurveyId = {
    id?: string
}

export type { Survey, SurveyId };