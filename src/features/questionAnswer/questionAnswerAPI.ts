import type { QuestionAnswer } from "../../types"
import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../../utils/firebase"

const mockQuestionAnswers: QuestionAnswer[] = [
  {
    id: "qa-001",
    writerUserId: "user-001",
    escortUserId: "escort-001",
    escortId: "escort-001",
    question: "What's your favorite type of date?",
    answer: {
      text: "I love romantic dinners followed by a walk under the stars.",
      createdAt: new Date("2024-08-21T18:00:00Z"),
      isPrivate: false,
    },
    isPrivate: false,
    createdAt: new Date("2024-08-20T18:00:00Z"),
  },
  {
    id: "qa-002",
    writerUserId: "user-002",
    escortUserId: "escort-001",
    escortId: "escort-001",
    question: "Do you offer overnight stays?",
    isPrivate: true,
    createdAt: new Date("2024-08-22T18:00:00Z"),
  },
]

export const fetchQuestionAnswers = async (
  escortId: string,
  useMockData: boolean = false,
): Promise<QuestionAnswer[]> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockQuestionAnswers.filter(qa => qa.escortId === escortId)
  } else {
    const qas = (await getDocuments("questionAnswers")) as QuestionAnswer[]
    return qas.filter(qa => qa.escortId === escortId)
  }
}

export const addQuestion = async (
  question: Omit<QuestionAnswer, "id" | "createdAt">,
  useMockData: boolean = false,
): Promise<QuestionAnswer> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newQuestion: QuestionAnswer = {
      ...question,
      id: `qa-${Date.now()}`,
      createdAt: new Date(),
    }
    mockQuestionAnswers.push(newQuestion)
    return newQuestion
  } else {
    return (await addDocument("questionAnswers", {
      ...question,
      createdAt: new Date(),
    })) as QuestionAnswer
  }
}

export const updateQuestion = async (
  questionId: string,
  updates: Partial<QuestionAnswer>,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockQuestionAnswers.findIndex(qa => qa.id === questionId)
    if (index !== -1) {
      mockQuestionAnswers[index] = { ...mockQuestionAnswers[index], ...updates }
    }
  } else {
    await updateDocument("questionAnswers", questionId, updates)
  }
}

export const deleteQuestion = async (
  questionId: string,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockQuestionAnswers.findIndex(qa => qa.id === questionId)
    if (index !== -1) {
      mockQuestionAnswers.splice(index, 1)
    }
  } else {
    await deleteDocument("questionAnswers", questionId)
  }
}

export const addAnswer = async (
  questionId: string,
  answer: QuestionAnswer["answer"],
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockQuestionAnswers.findIndex(qa => qa.id === questionId)
    if (index !== -1) {
      mockQuestionAnswers[index].answer = answer
    }
  } else {
    await updateDocument("questionAnswers", questionId, { answer })
  }
}

export const updateAnswer = async (
  questionId: string,
  updates: Partial<QuestionAnswer["answer"]>,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockQuestionAnswers.findIndex(qa => qa.id === questionId)
    if (index !== -1 && mockQuestionAnswers[index].answer) {
      mockQuestionAnswers[index].answer = {
        ...mockQuestionAnswers[index].answer,
        ...updates,
      }
    }
  } else {
    await updateDocument("questionAnswers", questionId, {
      answer: { ...updates },
    })
  }
}

export const deleteAnswer = async (
  questionId: string,
  useMockData: boolean = false,
): Promise<void> => {
  if (useMockData) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockQuestionAnswers.findIndex(qa => qa.id === questionId)
    if (index !== -1) {
      delete mockQuestionAnswers[index].answer
    }
  } else {
    await updateDocument("questionAnswers", questionId, { answer: null })
  }
}
