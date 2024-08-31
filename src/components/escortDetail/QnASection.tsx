import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import { fetchQuestionAnswers } from "../../features/questionAnswer/questionAnswerAPI"
import type { QuestionAnswer, User } from "../../types"
import { formatDate, truncateDescription } from "./Helper"

interface QnASectionProps {
  escortId: string
  escortUserId: string
}

const QnASection: React.FC<QnASectionProps> = ({ escortId, escortUserId }) => {
  const [qnas, setQnas] = useState<QuestionAnswer[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const user = useAppSelector(selectUser)

  useEffect(() => {
    fetchQnAs(currentPage)
  }, [currentPage, escortId])

  const fetchQnAs = async (page: number) => {
    // TODO: Implement API call to fetch QnAs
    // This should return an object with QnAs and total pages
    const response = await fetchQuestionAnswers(escortId, true)
    setQnas(response)
    // setTotalPages(response.totalPages);
  }

  const handleCreateQuestion = async (question: string, isPrivate: boolean) => {
    // TODO: Implement API call to create a new question
    // After successful creation, refetch the first page of QnAs
    // fetchQnAs(1);
    // setCurrentPage(1);
  }

  const handleUpdateQuestion = async (
    questionId: string,
    newQuestion: string,
    isPrivate: boolean,
  ) => {
    // TODO: Implement API call to update a question
    // After successful update, refetch the current page of QnAs
    // fetchQnAs(currentPage);
  }

  const handleDeleteQuestion = async (questionId: string) => {
    // TODO: Implement API call to delete a question
    // After successful deletion, refetch the current page of QnAs
    // fetchQnAs(currentPage);
  }

  const handleAnswer = async (
    questionId: string,
    answer: string,
    isPrivate: boolean,
  ) => {
    // TODO: Implement API call to answer a question
    // After successful answer, refetch the current page of QnAs
    // fetchQnAs(currentPage);
  }

  const handleUpdateAnswer = async (
    questionId: string,
    newAnswer: string,
    isPrivate: boolean,
  ) => {
    // TODO: Implement API call to update an answer
    // After successful update, refetch the current page of QnAs
    // fetchQnAs(currentPage);
  }

  if (!user) {
    return (
      <section className="mb-20">
        <h2 className="vogue-heading text-4xl mb-8">Q&A</h2>
        <p>Please log in to view and participate in Q&A.</p>
      </section>
    )
  }

  return (
    <section className="mb-20">
      <h2 className="vogue-heading text-4xl mb-8">Q&A</h2>
      {user.userType !== "escort" && (
        <QuestionForm onSubmit={handleCreateQuestion} />
      )}
      <QnAList
        qnas={qnas}
        currentUser={user}
        escortUserId={escortUserId}
        onUpdateQuestion={handleUpdateQuestion}
        onDeleteQuestion={handleDeleteQuestion}
        onAnswer={handleAnswer}
        onUpdateAnswer={handleUpdateAnswer}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  )
}

interface QuestionFormProps {
  onSubmit: (question: string, isPrivate: boolean) => void
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(question, isPrivate)
    setQuestion("")
    setIsPrivate(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ask a question..."
        required
      />
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="private"
          checked={isPrivate}
          onChange={e => setIsPrivate(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="private">Make this question private</label>
      </div>
      <button
        type="submit"
        className="mt-2 bg-primary text-secondary px-4 py-2 rounded"
      >
        Submit Question
      </button>
    </form>
  )
}

interface QnAListProps {
  qnas: QuestionAnswer[]
  currentUser: User
  escortUserId: string
  onUpdateQuestion: (
    questionId: string,
    newQuestion: string,
    isPrivate: boolean,
  ) => void
  onDeleteQuestion: (questionId: string) => void
  onAnswer: (questionId: string, answer: string, isPrivate: boolean) => void
  onUpdateAnswer: (
    questionId: string,
    newAnswer: string,
    isPrivate: boolean,
  ) => void
}

const QnAList: React.FC<QnAListProps> = ({
  qnas,
  currentUser,
  escortUserId,
  onUpdateQuestion,
  onDeleteQuestion,
  onAnswer,
  onUpdateAnswer,
}) => {
  return (
    <div className="space-y-4">
      {qnas.map(qna => (
        <QnAItem
          key={qna.id}
          qna={qna}
          currentUser={currentUser}
          escortUserId={escortUserId}
          onUpdateQuestion={onUpdateQuestion}
          onDeleteQuestion={onDeleteQuestion}
          onAnswer={onAnswer}
          onUpdateAnswer={onUpdateAnswer}
        />
      ))}
    </div>
  )
}

interface QnAItemProps {
  qna: QuestionAnswer
  currentUser: User
  escortUserId: string
  onUpdateQuestion: (
    questionId: string,
    newQuestion: string,
    isPrivate: boolean,
  ) => void
  onDeleteQuestion: (questionId: string) => void
  onAnswer: (questionId: string, answer: string, isPrivate: boolean) => void
  onUpdateAnswer: (
    questionId: string,
    newAnswer: string,
    isPrivate: boolean,
  ) => void
}

const QnAItem: React.FC<QnAItemProps> = ({
  qna,
  currentUser,
  escortUserId,
  onUpdateQuestion,
  onDeleteQuestion,
  onAnswer,
  onUpdateAnswer,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditingQuestion, setIsEditingQuestion] = useState(false)
  const [isEditingAnswer, setIsEditingAnswer] = useState(false)
  const [editedQuestion, setEditedQuestion] = useState(qna.question)
  const [editedQuestionPrivate, setEditedQuestionPrivate] = useState<boolean>(
    qna.isPrivate || false,
  )
  const [editedAnswer, setEditedAnswer] = useState(qna.answer?.text || "")
  const [editedAnswerPrivate, setEditedAnswerPrivate] = useState(
    qna.answer?.isPrivate || false,
  )
  const [newAnswer, setNewAnswer] = useState("")
  const [newAnswerPrivate, setNewAnswerPrivate] = useState(false)

  const canView =
    currentUser.userType === "superAdmin" ||
    currentUser.id === qna.writerUserId ||
    currentUser.id === escortUserId ||
    !qna.isPrivate
  const canEditQuestion = currentUser.id === qna.writerUserId
  const canEditAnswer = currentUser.id === escortUserId
  const canAnswer = currentUser.id === escortUserId && !qna.answer
  const isAnswered = !!qna.answer
  const isMine = currentUser.id === qna.writerUserId

  if (!canView) return null

  const handleUpdateQuestion = () => {
    onUpdateQuestion(qna.id, editedQuestion, editedQuestionPrivate)
    setIsEditingQuestion(false)
  }

  const handleUpdateAnswer = () => {
    if (qna.answer) {
      onUpdateAnswer(qna.id, editedAnswer, editedAnswerPrivate)
      setIsEditingAnswer(false)
    }
  }

  const handleAnswer = () => {
    onAnswer(qna.id, newAnswer, newAnswerPrivate)
    setNewAnswer("")
    setNewAnswerPrivate(false)
  }

  return (
    <div
      className={`border rounded p-4 ${isAnswered ? "border-green-500" : ""} ${isMine ? "border-blue-500" : ""}`}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-bold">{truncateDescription(qna.question, 20)}</h3>
          <p className="text-sm text-gray-500">{formatDate(qna.createdAt)}</p>
        </div>
        <div className="flex items-center space-x-2">
          {isAnswered && <span className="text-green-500">Answered</span>}
          {isMine && <span className="text-blue-500">Mine</span>}
          <span>{isExpanded ? "▲" : "▼"}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4">
          {isEditingQuestion ? (
            <div>
              <textarea
                value={editedQuestion}
                onChange={e => setEditedQuestion(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`private-${qna.id}`}
                  checked={editedQuestionPrivate}
                  onChange={e => setEditedQuestionPrivate(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`private-${qna.id}`}>
                  Make this question private
                </label>
              </div>
              <button
                onClick={handleUpdateQuestion}
                className="mt-2 bg-primary text-secondary px-4 py-2 rounded mr-2"
              >
                Update Question
              </button>
              <button
                onClick={() => setIsEditingQuestion(false)}
                className="mt-2 bg-gray-300 text-primary px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <p>{qna.question}</p>
              {canEditQuestion && (
                <div className="mt-2">
                  <button
                    onClick={() => setIsEditingQuestion(true)}
                    className="text-blue-500 mr-2"
                  >
                    Edit Question
                  </button>
                  <button
                    onClick={() => onDeleteQuestion(qna.id)}
                    className="text-red-500"
                  >
                    Delete Question
                  </button>
                </div>
              )}
            </>
          )}

          {qna.answer && (canView || !qna.answer.isPrivate) && (
            <div className="mt-4">
              <h4 className="font-semibold">Answer:</h4>
              {isEditingAnswer ? (
                <div>
                  <textarea
                    value={editedAnswer}
                    onChange={e => setEditedAnswer(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id={`answer-private-${qna.id}`}
                      checked={editedAnswerPrivate}
                      onChange={e => setEditedAnswerPrivate(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`answer-private-${qna.id}`}>
                      Make this answer private
                    </label>
                  </div>
                  <button
                    onClick={handleUpdateAnswer}
                    className="mt-2 bg-primary text-secondary px-4 py-2 rounded mr-2"
                  >
                    Update Answer
                  </button>
                  <button
                    onClick={() => setIsEditingAnswer(false)}
                    className="mt-2 bg-gray-300 text-primary px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p>{qna.answer.text}</p>
                  {canEditAnswer && (
                    <button
                      onClick={() => setIsEditingAnswer(true)}
                      className="text-blue-500 mt-2"
                    >
                      Edit Answer
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {canAnswer && (
            <div className="mt-4">
              <textarea
                value={newAnswer}
                onChange={e => setNewAnswer(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Write an answer..."
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`new-answer-private-${qna.id}`}
                  checked={newAnswerPrivate}
                  onChange={e => setNewAnswerPrivate(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor={`new-answer-private-${qna.id}`}>
                  Make this answer private
                </label>
              </div>
              <button
                onClick={handleAnswer}
                className="mt-2 bg-primary text-secondary px-4 py-2 rounded"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-primary text-secondary"
              : "bg-gray-200 text-primary"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default QnASection
