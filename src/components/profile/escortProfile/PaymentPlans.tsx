import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { Escort } from "../../../types"
import { HeartIcon, StarIcon, SparklesIcon } from "@heroicons/react/24/solid"

interface PaymentPlansProps {
  profile: Escort | null
  onUpdate: (updatedData: Partial<Escort>) => void
}

interface Plan {
  tier: "Standard" | "Premium" | "Diamond"
  durations: {
    [key: string]: number
  }
  features: string[]
  color: string
  icon: React.ReactNode
}

const plans: Plan[] = [
  {
    tier: "Standard",
    durations: {
      "3 Days": 27.99,
      "1 Week": 47.99,
      "1 Month": 137.99,
    },
    features: [
      "Basic profile visibility",
      "Standard search placement",
      "Randomly top placement",
    ],
    color: "bg-blue-500",
    icon: <HeartIcon className="h-6 w-6" />,
  },
  {
    tier: "Premium",
    durations: {
      "3 Days": 39.99,
      "1 Week": 79.99,
      "1 Month": 259.99,
    },
    features: [
      "Enhanced profile visibility",
      "Priority search placement",
      "Enable to upload stories",
    ],
    color: "bg-purple-500",
    icon: <StarIcon className="h-6 w-6" />,
  },
  {
    tier: "Diamond",
    durations: {
      "3 Days": 49.99,
      "1 Week": 99.99,
      "1 Month": 299.99,
    },
    features: ["Top profile visibility", 'Featured in "Diamond Escorts"'],
    color: "bg-pink-500",
    icon: <SparklesIcon className="h-6 w-6" />,
  },
]

const PaymentPlans: React.FC<PaymentPlansProps> = ({ profile, onUpdate }) => {
  const [selectedPlan, setSelectedPlan] = useState<
    "Standard" | "Premium" | "Diamond" | null
  >(null)
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null)
  const [currentPlan, setCurrentPlan] = useState<{
    tier: "Standard" | "Premium" | "Diamond"
    startDate: Date
    endDate: Date
  } | null>(null)
  const selectedPlanRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (profile?.paymentPlan) {
      setCurrentPlan({
        tier: profile.paymentPlan.tier,
        startDate: new Date(profile.paymentPlan.startDate),
        endDate: new Date(profile.paymentPlan.endDate),
      })
    }
  }, [profile])

  const handlePlanSelection = (
    tier: "Standard" | "Premium" | "Diamond",
    duration: string,
  ) => {
    setSelectedPlan(tier)
    setSelectedDuration(duration)
    // Scroll to the "Selected Plan" div
    if (selectedPlanRef.current) {
      selectedPlanRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPlan && selectedDuration) {
      let newEndDate = new Date()
      if (currentPlan && selectedPlan === currentPlan.tier) {
        newEndDate = new Date(currentPlan.endDate)
      }

      switch (selectedDuration) {
        case "3 Days":
          newEndDate.setDate(newEndDate.getDate() + 3)
          break
        case "1 Week":
          newEndDate.setDate(newEndDate.getDate() + 7)
          break
        case "1 Month":
          newEndDate.setMonth(newEndDate.getMonth() + 1)
          break
      }

      // onUpdate({
      //   paymentPlan: {
      //     tier: selectedPlan,
      //     duration: selectedDuration,
      //     startDate: new Date(),
      //     endDate: newEndDate,
      //   },
      // })
    }
  }

  return (
    <div className="vogue-container">
      <h2 className="vogue-heading text-2xl mb-6">Elevate Your Experience</h2>

      {currentPlan && (
        <div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
          <h3 className="vogue-subheading mb-2">Current Membership</h3>
          <p className="text-sm">
            <span className="font-semibold">Tier:</span> {currentPlan.tier}
          </p>
          <p className="text-sm">
            <span className="font-semibold">End Date:</span>{" "}
            {currentPlan.endDate.toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {plans.map(plan => (
          <div
            key={plan.tier}
            className={`bg-white rounded-lg overflow-hidden shadow-md ${
              selectedPlan === plan.tier ? "ring-2 ring-accent" : ""
            }`}
          >
            <div
              className={`p-4 ${plan.color} text-white flex items-center justify-between`}
            >
              <h3 className="text-lg font-bold">{plan.tier}</h3>
              {plan.icon}
            </div>
            <div className="p-4">
              <ul className="text-sm mb-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-accent mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                {Object.entries(plan.durations).map(([duration, price]) => (
                  <button
                    key={duration}
                    onClick={() => handlePlanSelection(plan.tier, duration)}
                    className={`vogue-button w-full ${
                      selectedPlan === plan.tier &&
                      selectedDuration === duration
                        ? "bg-accent text-white"
                        : "bg-gray-200 text-primary"
                    }`}
                  >
                    {duration} - ${price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && selectedDuration && (
        <div
          className="mt-6 bg-gray-100 p-4 rounded-lg shadow"
          ref={selectedPlanRef}
        >
          <h3 className="vogue-subheading mb-2">Selected Plan</h3>
          <p className="text-sm">
            <span className="font-semibold">Tier:</span> {selectedPlan}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Duration:</span> {selectedDuration}
          </p>
          {currentPlan && currentPlan.tier === selectedPlan && (
            <p className="text-sm mt-2">
              Extending your current plan. New end date:{" "}
              <span className="font-semibold">
                {new Date(
                  new Date(currentPlan.endDate).getTime() +
                    (selectedDuration === "3 Days"
                      ? 3 * 86400000
                      : selectedDuration === "1 Week"
                        ? 7 * 86400000
                        : 30 * 86400000),
                ).toLocaleDateString()}
              </span>
            </p>
          )}
          <button onClick={handleSubmit} className="vogue-button w-full mt-4">
            {currentPlan && currentPlan.tier === selectedPlan
              ? "Extend Plan"
              : "Upgrade Now"}
          </button>
        </div>
      )}
    </div>
  )
}

export default PaymentPlans

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
