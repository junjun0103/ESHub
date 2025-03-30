import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import type { QuestionAnswer } from "../../types"
import * as questionAnswerAPI from "./questionAnswerAPI"

interface QuestionAnswerState {
  questionAnswers: QuestionAnswer[]
  status: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: QuestionAnswerState = {
  questionAnswers: [],
  status: "idle",
  error: null,
}

export const fetchQuestionAnswersAsync = createAsyncThunk(
  "questionAnswer/fetchQuestionAnswers",
  async (escortId: string) => {
    const response = await questionAnswerAPI.fetchQuestionAnswers(
      escortId,
      true,
    )
    return response
  },
)

export const addQuestionAsync = createAsyncThunk(
  "questionAnswer/addQuestion",
  async (question: Omit<QuestionAnswer, "id" | "createdAt">) => {
    const response = await questionAnswerAPI.addQuestion(question, true)
    return response
  },
)

export const updateQuestionAsync = createAsyncThunk(
  "questionAnswer/updateQuestion",
  async ({
    questionId,
    updates,
  }: {
    questionId: string
    updates: Partial<QuestionAnswer>
  }) => {
    await questionAnswerAPI.updateQuestion(questionId, updates, true)
    return { questionId, updates }
  },
)

export const deleteQuestionAsync = createAsyncThunk(
  "questionAnswer/deleteQuestion",
  async (questionId: string) => {
    await questionAnswerAPI.deleteQuestion(questionId, true)
    return questionId
  },
)

export const addAnswerAsync = createAsyncThunk(
  "questionAnswer/addAnswer",
  async ({
    questionId,
    answer,
  }: {
    questionId: string
    answer: QuestionAnswer["answer"]
  }) => {
    await questionAnswerAPI.addAnswer(questionId, answer, true)
    return { questionId, answer }
  },
)

export const updateAnswerAsync = createAsyncThunk(
  "questionAnswer/updateAnswer",
  async ({
    questionId,
    updates,
  }: {
    questionId: string
    updates: Partial<QuestionAnswer["answer"]>
  }) => {
    await questionAnswerAPI.updateAnswer(questionId, updates, true)
    return { questionId, updates }
  },
)

export const deleteAnswerAsync = createAsyncThunk(
  "questionAnswer/deleteAnswer",
  async (questionId: string) => {
    await questionAnswerAPI.deleteAnswer(questionId, true)
    return questionId
  },
)

export const questionAnswerSlice = createSlice({
  name: "questionAnswer",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchQuestionAnswersAsync.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchQuestionAnswersAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.questionAnswers = action.payload
      })
      .addCase(fetchQuestionAnswersAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      .addCase(addQuestionAsync.fulfilled, (state, action) => {
        state.questionAnswers.push(action.payload)
      })
      .addCase(updateQuestionAsync.fulfilled, (state, action) => {
        const index = state.questionAnswers.findIndex(
          qa => qa.id === action.payload.questionId,
        )
        if (index !== -1) {
          state.questionAnswers[index] = {
            ...state.questionAnswers[index],
            ...action.payload.updates,
          }
        }
      })
      .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
        state.questionAnswers = state.questionAnswers.filter(
          qa => qa.id !== action.payload,
        )
      })
      .addCase(addAnswerAsync.fulfilled, (state, action) => {
        const index = state.questionAnswers.findIndex(
          qa => qa.id === action.payload.questionId,
        )
        if (index !== -1) {
          state.questionAnswers[index].answer = action.payload.answer
        }
      })
      .addCase(updateAnswerAsync.fulfilled, (state, action) => {
        const index = state.questionAnswers.findIndex(
          qa => qa.id === action.payload.questionId,
        )
        if (index !== -1 && state.questionAnswers[index].answer) {
          state.questionAnswers[index].answer = {
            ...state.questionAnswers[index].answer,
            ...action.payload.updates,
          }
        }
      })
      .addCase(deleteAnswerAsync.fulfilled, (state, action) => {
        const index = state.questionAnswers.findIndex(
          qa => qa.id === action.payload,
        )
        if (index !== -1) {
          delete state.questionAnswers[index].answer
        }
      })
  },
})

export const selectQuestionAnswers = (state: RootState) =>
  state.questionAnswer.questionAnswers
export const selectQuestionAnswerStatus = (state: RootState) =>
  state.questionAnswer.status
export const selectQuestionAnswerError = (state: RootState) =>
  state.questionAnswer.error

export default questionAnswerSlice.reducer
