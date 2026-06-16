import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  ChevronRight,
  FileCheck,
  Clock,
  Target,
  Shield,
  Lightbulb,
  AlertCircle,
  Play } from
'lucide-react';
export function ExamConfigPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'practice' | 'real'>('real');
  // Mock data
  const examTitle = 'React Hooks Assessment';
  const breadcrumbs = ['Web Development', 'React', 'React Hooks', 'Assessment'];
  const handleStart = () => {
    navigate(`/exam/session/${examId || 'default'}`);
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6 max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors">

            Dashboard
          </Link>
          {breadcrumbs.map((crumb, index) =>
          <Fragment key={index}>
              <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
              <span
              className={
              index === breadcrumbs.length - 1 ?
              'font-medium text-foreground' :
              ''
              }>

                {crumb}
              </span>
            </Fragment>
          )}
        </nav>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {examTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Test your knowledge of React Hooks including useState, useEffect,
              and custom hooks.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm flex items-center gap-2">

                <Target className="h-3.5 w-3.5" />
                15 Questions
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm flex items-center gap-2">

                <Clock className="h-3.5 w-3.5" />
                30 Minutes
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm flex items-center gap-2">

                <Shield className="h-3.5 w-3.5" />
                70% to Pass
              </Badge>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-md ${mode === 'practice' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
              onClick={() => setMode('practice')}>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${mode === 'practice' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>

                    <Lightbulb className="h-6 w-6" />
                  </div>
                  {mode === 'practice' &&
                  <div className="h-4 w-4 rounded-full bg-primary" />
                  }
                </div>
                <h3 className="text-xl font-bold mb-2">Practice Mode</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Get immediate feedback after each question. Retry questions
                  and learn from explanations. No score recorded.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Immediate feedback
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Unlimited time
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Unlimited retries
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-md ${mode === 'real' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'}`}
              onClick={() => setMode('real')}>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${mode === 'real' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>

                    <Shield className="h-6 w-6" />
                  </div>
                  {mode === 'real' &&
                  <div className="h-4 w-4 rounded-full bg-primary" />
                  }
                </div>
                <h3 className="text-xl font-bold mb-2">Real Exam Mode</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  Timed assessment with final scoring. Your attempt will be
                  saved. Limited retries allowed.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    Timed (30 mins)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    Score recorded
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    No immediate feedback
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col items-center gap-4 pt-8">
            <Button
              size="lg"
              className="w-full md:w-auto px-12 h-12 text-lg shadow-lg shadow-primary/20"
              onClick={handleStart}>

              Start Exam
              <Play className="ml-2 h-5 w-5" />
            </Button>
            <button className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
              View exam instructions
            </button>
          </div>
        </div>
      </main>
    </div>);

}