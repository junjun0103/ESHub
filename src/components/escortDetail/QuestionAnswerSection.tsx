import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import {
  selectQuestionAnswers,
  fetchQuestionAnswersAsync,
  addQuestionAsync,
  updateQuestionAsync,
  deleteQuestionAsync,
  addAnswerAsync,
  updateAnswerAsync,
  deleteAnswerAsync,
} from "../../features/questionAnswer/questionAnswerSlice"
import CollapsibleSection from "./CollapsibleSection"
import type { Escort, QuestionAnswer } from "../../types"
import {
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
  FaUser,
} from "react-icons/fa"

interface QuestionAnswerSectionProps {
  escort: Escort
}

const QUESTIONS_PER_PAGE = 5

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({
  escort,
}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const questions = useAppSelector(selectQuestionAnswers)
  const [newQuestion, setNewQuestion] = useState("")
  const [isNewQuestionPrivate, setIsNewQuestionPrivate] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  )
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null)
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null,
  )
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(fetchQuestionAnswersAsync(escort.id))
  }, [dispatch, escort.id])

  const canViewPrivate = (qa: QuestionAnswer) => {
    return (
      user?.userType === "superAdmin" ||
      user?.id === qa.writerUserId ||
      user?.id === escort.userId
    )
  }

  const canEdit = (qa: QuestionAnswer) => {
    return user?.userType === "superAdmin" || user?.id === qa.writerUserId
  }

  const canAnswer = (qa: QuestionAnswer) => {
    return user?.id === escort.userId
  }

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (newQuestion.trim() && user && user.id !== escort.userId) {
      dispatch(
        addQuestionAsync({
          writerUserId: user.id,
          escortUserId: escort.userId,
          escortId: escort.id,
          question: newQuestion,
          isPrivate: isNewQuestionPrivate,
        }),
      )
      setNewQuestion("")
      setIsNewQuestionPrivate(false)
    }
  }

  const QuestionAnswerItem: React.FC<{ qa: QuestionAnswer }> = ({ qa }) => {
    const [editedQuestion, setEditedQuestion] = useState(qa.question)
    const [editedAnswer, setEditedAnswer] = useState(qa.answer?.text || "")
    const [isEditedQuestionPrivate, setIsEditedQuestionPrivate] = useState(
      qa.isPrivate,
    )
    const [isEditedAnswerPrivate, setIsEditedAnswerPrivate] = useState(
      qa.answer?.isPrivate,
    )

    const isExpanded = expandedQuestionId === qa.id
    const isCurrentUserQuestion = user?.id === qa.writerUserId

    if (qa.isPrivate && !canViewPrivate(qa)) {
      return (
        <div className="text-gray-500 italic">This question is private.</div>
      )
    }

    const handleEditQuestion = () => {
      dispatch(
        updateQuestionAsync({
          questionId: qa.id,
          updates: {
            question: editedQuestion,
            isPrivate: isEditedQuestionPrivate,
          },
        }),
      )
      setEditingQuestionId(null)
    }

    const handleDeleteQuestion = () => {
      dispatch(deleteQuestionAsync(qa.id))
    }

    const handleAddAnswer = () => {
      dispatch(
        addAnswerAsync({
          questionId: qa.id,
          answer: {
            text: editedAnswer,
            createdAt: new Date(),
            isPrivate: isEditedAnswerPrivate,
          },
        }),
      )
      setEditedAnswer("")
      setIsEditedAnswerPrivate(false)
    }

    const handleEditAnswer = () => {
      dispatch(
        updateAnswerAsync({
          questionId: qa.id,
          updates: { text: editedAnswer, isPrivate: isEditedAnswerPrivate },
        }),
      )
      setEditingAnswerId(null)
    }

    const handleDeleteAnswer = () => {
      dispatch(deleteAnswerAsync(qa.id))
    }

    return (
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpandedQuestionId(isExpanded ? null : qa.id)}
        >
          <div className="flex-1 mr-4">
            <p className="text-white truncate">{qa.question}</p>
          </div>
          <div className="flex items-center">
            {isCurrentUserQuestion && (
              <span className="text-blue-400 text-xs mr-2 flex items-center">
                <FaUser className="mr-1" /> Mine
              </span>
            )}
            {qa.answer && (
              <span className="text-green-500 text-xs mr-2">answered</span>
            )}
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {isExpanded && (
          <>
            {editingQuestionId === qa.id ? (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleEditQuestion()
                }}
                className="mt-4"
              >
                <input
                  type="text"
                  value={editedQuestion}
                  onChange={e => setEditedQuestion(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditedQuestionPrivate}
                      onChange={e =>
                        setIsEditedQuestionPrivate(e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Only me</span>
                  </label>
                  <div>
                    <button
                      type="button"
                      onClick={() => setEditingQuestionId(null)}
                      className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-accent-gold text-black px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <>
                <p className="text-sm text-gray-400 mt-1">
                  Asked on {new Date(qa.createdAt).toLocaleDateString()}
                </p>
                {canEdit(qa) && (
                  <div className="mt-2">
                    <button
                      onClick={() => setEditingQuestionId(qa.id)}
                      className="text-accent-gold mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={handleDeleteQuestion}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </>
            )}

            {qa.answer && (
              <div className="mt-4 pl-4 border-l-2 border-accent-gold">
                {qa.answer.isPrivate && !canViewPrivate(qa) ? (
                  <p className="text-gray-500 italic">
                    This answer is private.
                  </p>
                ) : editingAnswerId === qa.id ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      handleEditAnswer()
                    }}
                  >
                    <textarea
                      value={editedAnswer}
                      onChange={e => setEditedAnswer(e.target.value)}
                      className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isEditedAnswerPrivate}
                          onChange={e =>
                            setIsEditedAnswerPrivate(e.target.checked)
                          }
                          className="mr-2"
                        />
                        <span className="text-sm">Private answer</span>
                      </label>
                      <div>
                        <button
                          type="button"
                          onClick={() => setEditingAnswerId(null)}
                          className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-accent-gold text-black px-4 py-2 rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="text-white">{qa.answer.text}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Answered by {escort.name} on{" "}
                      {new Date(qa.answer.createdAt).toLocaleDateString()}
                    </p>
                    {canAnswer(qa) && (
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setEditedAnswer(qa.answer!.text)
                            setIsEditedAnswerPrivate(qa.answer!.isPrivate)
                            setEditingAnswerId(qa.id)
                          }}
                          className="text-accent-gold mr-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={handleDeleteAnswer}
                          className="text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {!qa.answer && canAnswer(qa) && (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleAddAnswer()
                }}
                className="mt-4"
              >
                <textarea
                  value={editedAnswer}
                  onChange={e => setEditedAnswer(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                  placeholder="Write your answer here..."
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isEditedAnswerPrivate}
                      onChange={e => setIsEditedAnswerPrivate(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Private answer</span>
                  </label>
                  <button
                    type="submit"
                    className="bg-accent-gold text-black px-4 py-2 rounded"
                  >
                    Submit Answer
                  </button>
                </div>
              </form>
            )}
          </>
        )}{" "}
      </div>
    )
  }

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
  const paginatedQuestions = questions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE,
  )

  if (!user) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <p className="text-white">Please log in to view Q&A section.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      {user.id !== escort.userId && user.userType !== "escort" && (
        <form onSubmit={handleSubmitQuestion} className="mb-6">
          <textarea
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 rounded mb-2"
            placeholder="Ask a question..."
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isNewQuestionPrivate}
                onChange={e => setIsNewQuestionPrivate(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Only me</span>
            </label>
            <button
              type="submit"
              className="bg-accent-gold text-black px-4 py-2 rounded"
            >
              Submit Question
            </button>
          </div>
        </form>
      )}

      {paginatedQuestions.map(qa => (
        <QuestionAnswerItem key={qa.id} qa={qa} />
      ))}

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default QuestionAnswerSection
