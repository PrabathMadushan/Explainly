import React, { useEffect, useState, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import {
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Mic,
  Play,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Eye,
  EyeOff } from
'lucide-react';
// Mock flashcard data
const flashcards = [
{
  id: 1,
  question: 'What is the primary purpose of the useState hook?',
  answer:
  'The useState hook allows you to add state to functional components. It returns a pair: the current state value and a function that lets you update it.',
  topic: 'React Hooks',
  difficulty: 'Intro'
},
{
  id: 2,
  question: 'How do you update state based on the previous state value?',
  answer:
  'You should pass a function to the state updater. For example: setCount(prevCount => prevCount + 1). This ensures you are working with the most up-to-date state value.',
  topic: 'React Hooks',
  difficulty: 'Intermediate'
},
{
  id: 3,
  question: 'What are the rules of hooks?',
  answer:
  '1. Only call Hooks at the top level (not inside loops, conditions, or nested functions).\n2. Only call Hooks from React function components (or custom hooks).',
  topic: 'React Hooks',
  difficulty: 'Intermediate'
},
{
  id: 4,
  question: 'What argument does useState take?',
  answer:
  'useState takes a single argument: the initial state. This can be a primitive value, an object, or a function (for lazy initialization).',
  topic: 'React Hooks',
  difficulty: 'Intro'
},
{
  id: 5,
  question: 'What does useState return?',
  answer:
  'It returns an array with two elements: [currentState, setStateFunction]. We typically use array destructuring to assign names to these values.',
  topic: 'React Hooks',
  difficulty: 'Intro'
}];

export function FlashcardSessionPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [ratings, setRatings] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const currentCard = flashcards[currentIndex];
  const progress = currentIndex / flashcards.length * 100;
  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const handleReveal = () => {
    setIsRevealed(true);
  };
  const handleRating = (rating: string) => {
    setRatings({
      ...ratings,
      [currentCard.id]: rating
    });
    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        handleNext();
      } else {
        // End of session
        // In a real app, show summary screen
        navigate('/dashboard');
      }
    }, 400);
  };
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
      setUserAnswer('');
      setRecordingTime(0);
      setIsRecording(false);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(true); // Usually show revealed when going back
      // Restore previous answer if saved (omitted for simplicity)
    }
  };
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Minimal Header */}
      <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-4 flex-1">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground">

              <X className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{currentCard.topic}</span>
            <span className="text-xs text-muted-foreground">
              Flashcard Practice
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>
              Card {currentIndex + 1} of {flashcards.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="flex-1 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => navigate('/dashboard')}>

            End Session
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto py-8 px-4 flex flex-col">
        {/* Mobile Progress (visible only on small screens) */}
        <div className="md:hidden mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>
              Card {currentIndex + 1} of {flashcards.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Flashcard Area */}
        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
          <Card className="w-full shadow-lg border-primary/10 overflow-hidden flex flex-col">
            <div className="h-2 bg-primary w-full" />
            <CardContent className="p-8 md:p-12 flex-1 flex flex-col">
              {/* Question Section */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 min-h-[200px]">
                <Badge variant="outline" className="mb-4">
                  {currentCard.difficulty}
                </Badge>
                <h2 className="text-2xl md:text-3xl font-medium leading-tight">
                  {currentCard.question}
                </h2>
              </div>

              {/* Reveal Button */}
              {!isRevealed &&
              <div className="flex justify-center py-8">
                  <Button
                  size="lg"
                  onClick={handleReveal}
                  className="px-8 h-12 text-lg shadow-md hover:shadow-lg transition-all">

                    <Eye className="mr-2 h-5 w-5" />
                    Show Answer
                  </Button>
                </div>
              }

              {/* Answer Section (Revealed) */}
              {isRevealed &&
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t pt-8 mt-8">
                  <div className="bg-muted/30 p-6 rounded-lg border border-border/50 mb-8">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Answer
                    </h3>
                    <p className="text-lg leading-relaxed whitespace-pre-line">
                      {currentCard.answer}
                    </p>
                  </div>

                  {/* User Input Section */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Your typed answer (optional)
                      </label>
                      <textarea
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      placeholder="Type your answer here to reinforce learning..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)} />

                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                      variant={isRecording ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={toggleRecording}
                      className="w-32">

                        <Mic className="mr-2 h-4 w-4" />
                        {isRecording ? 'Stop' : 'Record'}
                      </Button>
                      {isRecording &&
                    <span className="text-sm font-mono text-destructive animate-pulse">
                          {formatTime(recordingTime)}
                        </span>
                    }
                      {!isRecording && recordingTime > 0 &&
                    <Button variant="ghost" size="sm" disabled>
                          <Play className="mr-2 h-4 w-4" /> Play Recording
                        </Button>
                    }
                    </div>

                    {/* Self Rating */}
                    <div className="pt-4">
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        How well did you know this?
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                        variant="outline"
                        className="h-24 flex flex-col gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30"
                        onClick={() => handleRating('wrong')}>

                          <ThumbsDown className="h-8 w-8" />
                          <span>Got it wrong</span>
                        </Button>
                        <Button
                        variant="outline"
                        className="h-24 flex flex-col gap-2 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-200 dark:hover:bg-yellow-950/30"
                        onClick={() => handleRating('unsure')}>

                          <HelpCircle className="h-8 w-8" />
                          <span>Unsure</span>
                        </Button>
                        <Button
                        variant="outline"
                        className="h-24 flex flex-col gap-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200 dark:hover:bg-green-950/30"
                        onClick={() => handleRating('known')}>

                          <ThumbsUp className="h-8 w-8" />
                          <span>I knew this</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </CardContent>
          </Card>
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-muted-foreground">

            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground md:hidden">
            {currentIndex + 1} / {flashcards.length}
          </span>
          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="text-muted-foreground">

            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>);

}