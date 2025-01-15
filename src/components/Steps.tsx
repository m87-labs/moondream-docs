import React from 'react'

interface Step {
  title: string
  description: React.ReactNode
}

interface StepsProps {
  steps: Step[]
}

export function Steps({ steps }: StepsProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="flex-none w-8 h-8 bg-blue-100 text-blue-700 font-semibold rounded-full flex items-center justify-center">
            {index + 1}
          </div>
          <div>
            <div className="font-medium">{step.title}</div>
            <div className="text-gray-600">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}