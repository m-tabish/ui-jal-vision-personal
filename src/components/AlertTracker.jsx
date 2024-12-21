import React from 'react'

const AlertTracker = ({ currentStatus }) => {
  const stages = [
    { label: 'Alert Raised', status: 1 },
    { label: 'Received by', status: 2 },
    { label: 'Notified the vendor', status: 3 },
    { label: 'Ground Truthing', status: 4 },
  ]

  const getStatusColor = (stage) => {
    return stage.status <= currentStatus ? 'bg-yellow-500' : 'bg-gray-300'
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex items-center justify-between bg-white rounded shadow p-4">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.label}>
            <div className="flex flex-col items-center">
              <div className="mb-2 text-sm font-medium text-gray-700">
                {stage.label}
              </div>
              <div className={`w-10 h-10 rounded-full ${getStatusColor(stage)} flex items-center justify-center text-white font-bold`}>
                {stage.status}
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-1 ${getStatusColor(stages[index + 1])}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default AlertTracker

