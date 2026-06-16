import React, { useEffect, useMemo, useState, useContext, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  ArrowLeft,
  Sparkles } from
'lucide-react';
// Mock results data
const examResult = {
  title: 'React Hooks Assessment',
  score: 85,
  passed: true,
  totalQuestions: 15,
  correct: 12,
  incorrect: 2,
  skipped: 1,
  timeTaken: '22:15',
  topics: [
  {
    name: 'useState',
    score: 100,
    status: 'good'
  },
  {
    name: 'useEffect',
    score: 75,
    status: 'medium'
  },
  {
    name: 'useContext',
    score: 67,
    status: 'medium'
  },
  {
    name: 'Custom Hooks',
    score: 50,
    status: 'weak'
  }],

  questions: [
  {
    id: 1,
    text: 'Which hook should be used for data fetching?',
    userAnswer: 'useEffect',
    correctAnswer: 'useEffect',
    isCorrect: true,
    explanation:
    'useEffect is designed to handle side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.'
  },
  {
    id: 2,
    text: 'What is the return value of useState?',
    userAnswer: 'The current state value',
    correctAnswer: 'An array containing [value, updateFunction]',
    isCorrect: false,
    explanation:
    'useState returns an array with exactly two values: the current state and a function to update it. This allows you to name them whatever you want using array destructuring.'
  },
  {
    id: 3,
    text: 'When does useEffect run by default?',
    userAnswer: 'After every render',
    correctAnswer: 'After every render',
    isCorrect: true,
    explanation:
    'By default, effects run after every completed render, but you can choose to fire them only when certain values have changed.'
  },
  {
    id: 4,
    text: 'Explain why we cannot call hooks inside loops or conditions.',
    userAnswer:
    'Because React relies on the order of hooks calls to associate state with the correct hook.',
    correctAnswer: 'React relies on the order of hooks calls.',
    isCorrect: true,
    type: 'written',
    explanation:
    "Correct! React relies on the call order of Hooks to associate the local state with the correct Hook call. If the order changes between renders, React won't know which state corresponds to which Hook."
  },
  {
    id: 5,
    text: 'Describe a scenario where you would use useMemo instead of useEffect.',
    userAnswer: 'Skipped',
    correctAnswer: 'To memoize expensive calculations.',
    isCorrect: false,
    isSkipped: true,
    type: 'written',
    explanation:
    "useMemo is used to memoize expensive calculations so they don't re-run on every render unless dependencies change. useEffect is for side effects."
  }]

};
export function ExamResultsPage() {
  const { attemptId } = useParams();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
    new Set()
  );
  const toggleQuestion = (id: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6 max-w-4xl mx-auto">
        {/* Header / Score Card */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">

            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>

          <Card className="border-primary/20 shadow-md overflow-hidden">
            <div
              className={`h-2 w-full ${examResult.passed ? 'bg-green-500' : 'bg-red-500'}`} />

            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {examResult.title}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Badge
                      variant={examResult.passed ? 'default' : 'destructive'}
                      className={
                      examResult.passed ?
                      'bg-green-600 hover:bg-green-700' :
                      ''
                      }>

                      {examResult.passed ? 'Passed' : 'Failed'}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      Completed in {examResult.timeTaken}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative h-32 w-32 flex items-center justify-center">
                    {/* Simple CSS circular progress mock */}
                    <div
                      className={`absolute inset-0 rounded-full border-8 ${examResult.passed ? 'border-green-100' : 'border-red-100'}`} />

                    <div
                      className={`absolute inset-0 rounded-full border-8 border-t-transparent border-l-transparent -rotate-45 ${examResult.passed ? 'border-green-500' : 'border-red-500'}`}
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                      }} // Mock partial circle
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold">
                        {examResult.score}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Score
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">
                        {examResult.correct}
                      </span>{' '}
                      Correct
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">
                        {examResult.incorrect}
                      </span>{' '}
                      Incorrect
                    </div>
                    <div className="flex items-center gap-2">
                      <MinusCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {examResult.skipped}
                      </span>{' '}
                      Skipped
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Question Review */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Question Review</h2>

            <div className="space-y-4">
              {examResult.questions.map((q, idx) => {
                const isExpanded = expandedQuestions.has(q.id);
                const statusColor = q.isCorrect ?
                'text-green-600 border-green-200 bg-green-50' :
                q.isSkipped ?
                'text-muted-foreground border-border bg-muted/30' :
                'text-red-600 border-red-200 bg-red-50';
                const Icon = q.isCorrect ?
                CheckCircle2 :
                q.isSkipped ?
                MinusCircle :
                XCircle;
                return (
                  <Card
                    key={q.id}
                    className={`overflow-hidden transition-all ${isExpanded ? 'ring-1 ring-primary/20' : ''}`}>

                    <div
                      className="p-4 flex items-start gap-4 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => toggleQuestion(q.id)}>

                      <div
                        className={`mt-0.5 shrink-0 ${q.isCorrect ? 'text-green-500' : q.isSkipped ? 'text-muted-foreground' : 'text-red-500'}`}>

                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="font-medium text-sm truncate pr-4">
                            <span className="text-muted-foreground mr-2">
                              {idx + 1}.
                            </span>
                            {q.text}
                          </p>
                          {isExpanded ?
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> :

                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          }
                        </div>
                      </div>
                    </div>

                    {isExpanded &&
                    <div className="px-4 pb-4 pt-0 space-y-4 animate-in slide-in-from-top-2">
                        <div className="pl-9 space-y-4">
                          <p className="text-lg font-medium">{q.text}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                            className={`p-3 rounded-md border ${q.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>

                              <span className="text-xs font-semibold uppercase tracking-wider opacity-70 block mb-1">
                                Your Answer
                              </span>
                              <p className="text-sm font-medium">
                                {q.userAnswer}
                              </p>
                            </div>

                            {!q.isCorrect &&
                          <div className="p-3 rounded-md border bg-green-50 border-green-200">
                                <span className="text-xs font-semibold uppercase tracking-wider opacity-70 text-green-700 block mb-1">
                                  Correct Answer
                                </span>
                                <p className="text-sm font-medium text-green-900">
                                  {q.correctAnswer}
                                </p>
                              </div>
                          }
                          </div>

                          {q.type === 'written' &&
                        <div className="bg-primary/5 border border-primary/10 rounded-md p-3 flex gap-3">
                              <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-primary">
                                  AI Feedback
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Your answer covers the main points but misses
                                  the detail about call order. Good effort!
                                </p>
                              </div>
                            </div>
                        }

                          <div className="bg-muted p-4 rounded-md">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                              Explanation
                            </span>
                            <p className="text-sm text-muted-foreground">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    }
                  </Card>);

              })}
            </div>
          </div>

          {/* Sidebar: Topic Breakdown & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Topic Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {examResult.topics.map((topic) =>
                <div key={topic.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{topic.name}</span>
                      <span className="font-medium">{topic.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                      className={`h-full rounded-full ${topic.score >= 80 ? 'bg-green-500' : topic.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{
                        width: `${topic.score}%`
                      }} />

                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake as Practice
              </Button>
              <Link to="/flashcards/config/weak-topics" className="block">
                <Button variant="outline" className="w-full">
                  <Layers className="mr-2 h-4 w-4" />
                  Review Weak Topics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>);

}