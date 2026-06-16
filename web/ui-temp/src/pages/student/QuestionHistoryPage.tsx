import React, { useCallback, useMemo, useState, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  ArrowLeft,
  Clock,
  Layers,
  FileCheck,
  Play,
  Mic,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw } from
'lucide-react';
// Mock Data
const questionData = {
  id: '101',
  text: 'What is the difference between useMemo and useCallback in React?',
  modelAnswer:
  'useMemo returns a memoized value, while useCallback returns a memoized function. useMemo is used to optimize expensive calculations, whereas useCallback is used to prevent unnecessary re-renders of child components that rely on reference equality of functions.',
  topic: 'React Hooks',
  difficulty: 'Advanced',
  totalAttempts: 5,
  masteryLevel: 'High'
};
const attemptsHistory = [
{
  id: 1,
  date: 'Today, 10:30 AM',
  mode: 'Flashcard',
  result: 'I knew this',
  score: 'High',
  studentAnswer:
  'useMemo is for values, useCallback is for functions. Both help with performance.',
  hasAudio: false,
  feedback:
  'Correct core concept. You could elaborate on the specific use cases for each.'
},
{
  id: 2,
  date: 'Yesterday, 2:15 PM',
  mode: 'Exam Question',
  result: 'Correct',
  score: '100%',
  studentAnswer:
  "useMemo caches the result of a function call. useCallback caches the function definition itself so it doesn't change on every render.",
  hasAudio: false,
  feedback: 'Excellent answer. Precise and accurate.'
},
{
  id: 3,
  date: '3 days ago',
  mode: 'Flashcard',
  result: 'Unsure',
  score: 'Medium',
  studentAnswer: '',
  hasAudio: true,
  audioDuration: '0:15',
  feedback: null
},
{
  id: 4,
  date: '5 days ago',
  mode: 'Flashcard',
  result: 'Got it wrong',
  score: 'Low',
  studentAnswer: 'They are basically the same thing?',
  hasAudio: false,
  feedback:
  'Not quite. While related, they serve different purposes. Review the documentation on memoization.'
}];

export function QuestionHistoryPage() {
  const { questionId } = useParams();
  const [expandedAttempts, setExpandedAttempts] = useState<Set<number>>(
    new Set([1])
  );
  const toggleAttempt = (id: number) => {
    const newExpanded = new Set(expandedAttempts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedAttempts(newExpanded);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6 space-y-8 max-w-4xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <Link
            to="/progress"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">

            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Progress
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{questionData.topic}</Badge>
                <Badge variant="secondary">{questionData.difficulty}</Badge>
              </div>
              <h1 className="text-2xl font-bold leading-tight">
                {questionData.text}
              </h1>
            </div>
            <Button>
              <RotateCcw className="mr-2 h-4 w-4" />
              Practice Again
            </Button>
          </div>
        </div>

        {/* Model Answer Panel */}
        <Card className="bg-muted/30 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Model Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              {questionData.modelAnswer}
            </p>
          </CardContent>
        </Card>

        {/* History Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Attempt History</h2>
            <span className="text-sm text-muted-foreground">
              {questionData.totalAttempts} total attempts
            </span>
          </div>

          <div className="relative border-l-2 border-muted ml-4 space-y-8 pb-4">
            {attemptsHistory.map((attempt) =>
            <div key={attempt.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div
                className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 bg-background ${attempt.score === 'High' || attempt.score === '100%' ? 'border-green-500' : attempt.score === 'Medium' ? 'border-yellow-500' : 'border-red-500'}`} />


                <Card
                className={`transition-all hover:shadow-md ${expandedAttempts.has(attempt.id) ? 'ring-1 ring-primary/20' : ''}`}>

                  <div
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => toggleAttempt(attempt.id)}>

                    <div className="flex items-start gap-4">
                      <div
                      className={`mt-1 h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${attempt.mode === 'Flashcard' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>

                        {attempt.mode === 'Flashcard' ?
                      <Layers className="h-5 w-5" /> :

                      <FileCheck className="h-5 w-5" />
                      }
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            Attempt #{attemptsHistory.length - attempt.id + 1}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            • {attempt.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                          variant={
                          attempt.result === 'Correct' ||
                          attempt.result === 'I knew this' ?
                          'default' :
                          attempt.result === 'Incorrect' ||
                          attempt.result === 'Got it wrong' ?
                          'destructive' :
                          'secondary'
                          }>

                            {attempt.result}
                          </Badge>
                          {attempt.hasAudio &&
                        <Badge variant="outline" className="gap-1">
                              <Mic className="h-3 w-3" /> Audio
                            </Badge>
                        }
                        </div>
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      {expandedAttempts.has(attempt.id) ?
                    <ChevronUp className="h-5 w-5" /> :

                    <ChevronDown className="h-5 w-5" />
                    }
                    </div>
                  </div>

                  {expandedAttempts.has(attempt.id) &&
                <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-2 duration-200">
                      <div className="border-t pt-4 space-y-4">
                        {attempt.studentAnswer &&
                    <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">
                              Your Answer
                            </span>
                            <p className="text-sm bg-muted/30 p-3 rounded-md">
                              {attempt.studentAnswer}
                            </p>
                          </div>
                    }

                        {attempt.hasAudio &&
                    <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">
                              Voice Recording
                            </span>
                            <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-md">
                              <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 rounded-full">

                                <Play className="h-4 w-4" />
                              </Button>
                              <div className="h-8 flex-1 flex items-center gap-1">
                                {/* Mock Waveform */}
                                {[...Array(20)].map((_, i) =>
                          <div
                            key={i}
                            className="w-1 bg-primary/40 rounded-full"
                            style={{
                              height: `${Math.random() * 16 + 4}px`
                            }} />

                          )}
                              </div>
                              <span className="text-xs font-mono text-muted-foreground">
                                {attempt.audioDuration}
                              </span>
                            </div>
                          </div>
                    }

                        {attempt.feedback &&
                    <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">
                              Feedback
                            </span>
                            <div className="flex gap-3 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md border border-blue-100 dark:border-blue-900">
                              <div className="mt-0.5">
                                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <p className="text-sm text-blue-900 dark:text-blue-100">
                                {attempt.feedback}
                              </p>
                            </div>
                          </div>
                    }
                      </div>
                    </div>
                }
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>);

}