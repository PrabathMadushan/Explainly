import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
  useReducer } from
'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Clock,
  Flag,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X } from
'lucide-react';
// Mock exam questions
const questions = [
{
  id: 1,
  type: 'mcq',
  text: 'Which hook should be used for data fetching?',
  options: [
  {
    id: 'a',
    text: 'useState'
  },
  {
    id: 'b',
    text: 'useEffect'
  },
  {
    id: 'c',
    text: 'useContext'
  },
  {
    id: 'd',
    text: 'useReducer'
  }]

},
{
  id: 2,
  type: 'mcq',
  text: 'What is the return value of useState?',
  options: [
  {
    id: 'a',
    text: 'The current state value'
  },
  {
    id: 'b',
    text: 'A function to update state'
  },
  {
    id: 'c',
    text: 'An array containing [value, updateFunction]'
  },
  {
    id: 'd',
    text: 'An object containing { value, updateFunction }'
  }]

},
{
  id: 3,
  type: 'mcq',
  text: 'When does useEffect run by default?',
  options: [
  {
    id: 'a',
    text: 'Only on mount'
  },
  {
    id: 'b',
    text: 'Only on unmount'
  },
  {
    id: 'c',
    text: 'After every render'
  },
  {
    id: 'd',
    text: 'Before every render'
  }]

},
{
  id: 4,
  type: 'written',
  text: 'Explain why we cannot call hooks inside loops or conditions.',
  maxLength: 500
},
{
  id: 5,
  type: 'written',
  text: 'Describe a scenario where you would use useMemo instead of useEffect.',
  maxLength: 500
}];

export function ExamSessionPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isSaving, setIsSaving] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Auto-save simulation
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setIsSaving(true);
      const timeout = setTimeout(() => setIsSaving(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [answers]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };
  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion.id)) {
      newFlagged.delete(currentQuestion.id);
    } else {
      newFlagged.add(currentQuestion.id);
    }
    setFlagged(newFlagged);
  };
  const handleSubmit = () => {
    navigate(`/exam/results/attempt-1`);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Top Bar */}
      <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-background/95 backdrop-blur sticky top-0 z-20">
        <div className="font-semibold text-lg truncate max-w-[200px] md:max-w-none">
          React Hooks Assessment
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium tabular-nums bg-muted/50 px-3 py-1.5 rounded-md">
            <Clock
              className={`h-4 w-4 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`} />

            <span className={timeLeft < 300 ? 'text-red-600' : ''}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            {isSaving ?
            <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </> :

            <>
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                All changes saved
              </>
            }
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Main Question Area */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Card className="flex-1 shadow-sm border-primary/10">
              <CardContent className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="h-6">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                    <Badge variant="secondary" className="h-6">
                      {currentQuestion.type === 'mcq' ?
                      'Multiple Choice' :
                      'Written Answer'}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={
                    flagged.has(currentQuestion.id) ?
                    'text-orange-500 hover:text-orange-600 hover:bg-orange-50' :
                    'text-muted-foreground'
                    }
                    onClick={toggleFlag}>

                    <Flag
                      className={`mr-2 h-4 w-4 ${flagged.has(currentQuestion.id) ? 'fill-current' : ''}`} />

                    {flagged.has(currentQuestion.id) ?
                    'Flagged' :
                    'Flag for review'}
                  </Button>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
                    {currentQuestion.text}
                  </h2>
                </div>

                {/* Answer Input Area */}
                <div className="space-y-4">
                  {currentQuestion.type === 'mcq' ?
                  <div className="space-y-3">
                      {currentQuestion.options?.map((option) =>
                    <div
                      key={option.id}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${answers[currentQuestion.id] === option.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50 hover:bg-muted/30'}`}
                      onClick={() => handleAnswer(option.id)}>

                          <div
                        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 ${answers[currentQuestion.id] === option.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>

                            {answers[currentQuestion.id] === option.id &&
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                        }
                          </div>
                          <span className="text-base">{option.text}</span>
                        </div>
                    )}
                    </div> :

                  <div className="space-y-2">
                      <textarea
                      className="w-full min-h-[200px] rounded-lg border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                      placeholder="Type your answer here..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      maxLength={currentQuestion.maxLength} />

                      <div className="flex justify-end text-xs text-muted-foreground">
                        {(answers[currentQuestion.id] || '').length} /{' '}
                        {currentQuestion.maxLength} characters
                      </div>
                    </div>
                  }
                </div>
              </CardContent>
            </Card>

            {/* Navigation Bar */}
            <div className="flex justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
              <Button
                variant="outline"
                onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestionIndex === 0}>

                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>

              {currentQuestionIndex === questions.length - 1 ?
              <Button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-8">

                  Submit Exam
                </Button> :

              <Button
                onClick={() =>
                setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
                )
                }
                variant="outline">

                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              }
            </div>
          </div>

          {/* Question Index Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Question Index</h3>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = !!answers[q.id];
                    const isFlagged = flagged.has(q.id);
                    const isCurrent = currentQuestionIndex === idx;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`
                          aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-all
                          ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                          ${isFlagged ? 'border-2 border-orange-400 bg-orange-50 text-orange-700' : isAnswered ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}
                        `}>

                        {idx + 1}
                      </button>);

                  })}
                </div>

                <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-primary" /> Answered
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded border-2 border-orange-400 bg-orange-50" />{' '}
                    Flagged
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-muted" /> Unanswered
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded border-2 border-primary" />{' '}
                    Current
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Modal Overlay */}
      {showSubmitConfirm &&
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-lg border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Submit Exam?
              </CardTitle>
              <CardDescription>
                You have answered {Object.keys(answers).length} of{' '}
                {questions.length} questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Once you submit, you won't be able to change your answers. Are
                you sure you want to finish?
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button
              variant="outline"
              onClick={() => setShowSubmitConfirm(false)}>

                Cancel
              </Button>
              <Button onClick={handleSubmit}>Yes, Submit Exam</Button>
            </CardFooter>
          </Card>
        </div>
      }
    </div>);

}