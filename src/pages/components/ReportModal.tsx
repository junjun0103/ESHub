import type React from "react"
import { useState } from "react"

interface ReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string, comment: string) => void
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reason, setReason] = useState("")
  const [comment, setComment] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(reason, comment)
    setReason("")
    setComment("")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-accent-gold">
          Report This Escort
        </h2>
        <form onSubmit={handleSubmit}>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded-lg"
            required
          >
            <option value="">Select a reason</option>
            <option value="Photo and Face Mismatch">
              Photo and Face Mismatch
            </option>
            <option value="Lack of Professionalism">
              Lack of Professionalism
            </option>
            <option value="Poor Communication">Poor Communication</option>
            <option value="Service Satisfaction">Service Satisfaction</option>
            <option value="Cleanliness Concern">Cleanliness Concern</option>
          </select>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded-lg"
            placeholder="Additional comments..."
            rows={4}
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportModal
