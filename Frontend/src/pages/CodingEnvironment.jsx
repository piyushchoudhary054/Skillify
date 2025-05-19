import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChallenges } from '../contexts/ChallengesContext'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import CodeEditor from '../components/coding/CodeEditor'

const DEFAULT_CODE = {
  javascript: "function solution(input) {\n  // Write your code here\n  \n  return result;\n}",
  python: "def solution(input):\n    # Write your code here\n    \n    return result",
  java: "public class Solution {\n    public static Object solution(Object input) {\n        // Write your code here\n        \n        return result;\n    }\n}",
}

const CodingEnvironment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getChallenge, submitSolution } = useChallenges()
  const { isAuthenticated } = useAuth()
  
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/coding/${id}` } })
      return
    }

    const loadChallenge = async () => {
      try {
        const challengeData = await getChallenge(id)
        setChallenge(challengeData)
        setCode(challengeData.starterCode?.[language] || DEFAULT_CODE[language])
      } catch (error) {
        toast.error('Failed to load challenge')
        navigate('/challenges')
      } finally {
        setLoading(false)
      }
    }

    loadChallenge()
  }, [id, getChallenge, navigate, isAuthenticated, language])

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    setCode(challenge.starterCode?.[newLanguage] || DEFAULT_CODE[newLanguage])
  }

  const handleCodeChange = (newCode) => {
    setCode(newCode)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setOutput(null)
    console.log("Submitting:", { id: challenge?._id, code, language });
    try {
      const result = await submitSolution(challenge._id, code, language)
      setOutput(result)
      
      if (result.status === 'Accepted') {
        toast.success('All test cases passed!')
      } else {
        toast.error('Some test cases failed')
      }
    } catch (error) {
      toast.error(error.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-pulse bg-[#e2e8f0] h-8 w-48 mx-auto rounded"></div>
          <div className="animate-pulse bg-[#e2e8f0] h-64 w-full mx-auto mt-4 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-[#1e293b]">
            {challenge.title}
          </h1>
          <div className="mt-2 flex items-center space-x-4">
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${
                challenge.difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : challenge.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {challenge.difficulty}
            </span>
            <div className="flex space-x-2">
              {challenge.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[#f1f5f9] text-[#475569] text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col h-[500px]">
            <div className="bg-white rounded-lg border h-full overflow-auto">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Problem Description
                </h2>
                <div className="prose max-w-none">
                  <p>{challenge.description}</p>

                  <h3 className="text-md font-semibold mt-4">Examples:</h3>
                  {challenge.examples.map((example, index) => (
                    <div key={index} className="mt-2 bg-[#f8fafc] p-3 rounded">
                      <p>
                        <strong>Input:</strong> {example.input}
                      </p>
                      <p>
                        <strong>Output:</strong> {example.output}
                      </p>
                      {example.explanation && (
                        <p>
                          <strong>Explanation:</strong> {example.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  <h3 className="text-md font-semibold mt-4">Constraints:</h3>
                  <ul className="list-disc list-inside">
                    {challenge.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-[500px]">
            <div className="mb-4 flex items-center justify-between">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-white border rounded px-3 py-1 text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`px-4 py-1 rounded text-white font-medium ${
                  submitting
                    ? "bg-[#38bdf8]"
                    : "bg-[#0284c7] hover:bg-[#0369a1]"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            <CodeEditor
              initialCode={code}
              language={language}
              onChange={handleCodeChange}
            />
          </div>
        </div>

        {output && (
          <div className="p-6 border-t">
            <h2 className="text-lg font-semibold mb-4">Results</h2>
            <div
              className={`p-4 rounded ${
                output.status === "Accepted"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <p className="font-medium">{output.status}</p>
              {output.testResults && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold">Test Cases:</h3>
                  <div className="space-y-2 mt-2">
                    {output.testResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border ${
                          result.passed
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${
                              result.passed ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            Test case {index + 1}:{" "}
                            {result.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        {!result.passed && (
                          <div className="mt-2 text-sm">
                            <p>
                              <strong>Input:</strong> {result.input}
                            </p>
                            <p>
                              <strong>Expected:</strong> {result.expected}
                            </p>
                            <p>
                              <strong>Actual:</strong> {result.actual}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {output.executionTime && (
                <p className="mt-2 text-sm">
                  Execution time: {output.executionTime}ms
                </p>
              )}
              {output.memoryUsage && (
                <p className="text-sm">Memory usage: {output.memoryUsage}MB</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodingEnvironment