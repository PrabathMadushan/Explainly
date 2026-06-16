import React, { useEffect, useState, Fragment, Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  ChevronRight,
  Clock,
  BookOpen,
  Layers,
  FileCheck,
  CheckCircle2,
  Circle,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  PlayCircle } from
'lucide-react';
export function StudyModePage() {
  const { nodeId } = useParams();
  const [isCompleted, setIsCompleted] = useState(false);
  // Mock data based on nodeId (defaulting to useState hook content)
  const nodeData = {
    title: 'useState Hook',
    difficulty: 'Intermediate',
    duration: '20 min',
    breadcrumbs: ['Web Development', 'React', 'React Hooks', 'useState'],
    flashcardsCount: 15,
    examQuestionsCount: 8,
    nextTopic: 'useEffect Hook',
    prevTopic: 'React Components'
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <Link
            to="/dashboard"
            className="hover:text-foreground transition-colors">

            Dashboard
          </Link>
          {nodeData.breadcrumbs.map((crumb, index) =>
          <Fragment key={index}>
              <ChevronRight className="h-4 w-4 mx-2 shrink-0" />
              <span
              className={
              index === nodeData.breadcrumbs.length - 1 ?
              'font-medium text-foreground' :
              ''
              }>

                {crumb}
              </span>
            </Fragment>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge
                  variant="default"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">

                  {nodeData.difficulty}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {nodeData.duration}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {nodeData.title}
              </h1>
            </div>

            {/* Article Content */}
            <article className="prose prose-slate max-w-none dark:prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The <code className="text-primary font-semibold">useState</code>{' '}
                hook is one of the most fundamental hooks in React. It allows
                you to add state to functional components, which was previously
                only possible in class components.
              </p>

              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Introduction
                </h2>
                <p>
                  State is essentially data that changes over the lifecycle of a
                  component. When state updates, React re-renders the component
                  to reflect those changes in the UI.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Basic Syntax
                </h2>
                <p>
                  To use{' '}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    useState
                  </code>
                  , you first need to import it from React. Then, you call it
                  inside your component.
                </p>

                <div className="bg-muted rounded-lg p-4 overflow-x-auto border border-border">
                  <pre className="text-sm font-mono text-foreground">
                    {`import React, { useState } from 'react';

function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The{' '}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                    useState
                  </code>{' '}
                  function returns a pair: the current state value and a
                  function that lets you update it.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  Rules of Hooks
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Only call Hooks at the top level. Don't call Hooks inside
                    loops, conditions, or nested functions.
                  </li>
                  <li>
                    Only call Hooks from React function components. Don't call
                    Hooks from regular JavaScript functions.
                  </li>
                </ul>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg flex gap-3">
                <div className="shrink-0 mt-1">
                  <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    i
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                    Pro Tip
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    When your new state depends on the previous state, use the
                    functional update form:{' '}
                    <code className="bg-white/50 dark:bg-black/20 px-1 rounded">
                      setCount(prev =&gt; prev + 1)
                    </code>
                    . This ensures you're always working with the most recent
                    state update.
                  </p>
                </div>
              </div>
            </article>

            {/* Navigation Footer */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t mt-12">
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-start gap-1">

                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <span className="font-medium">{nodeData.prevTopic}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-end gap-1">

                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <span className="font-medium">{nodeData.nextTopic}</span>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium">Your Progress</span>
                  {isCompleted ?
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                      Completed
                    </Badge> :

                  <Badge variant="outline">In Progress</Badge>
                  }
                </div>
                <Button
                  className={
                  isCompleted ?
                  'w-full bg-green-600 hover:bg-green-700' :
                  'w-full'
                  }
                  variant={isCompleted ? 'default' : 'outline'}
                  onClick={() => setIsCompleted(!isCompleted)}>

                  {isCompleted ?
                  <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Completed
                    </> :

                  <>
                      <Circle className="mr-2 h-4 w-4" />
                      Mark as Completed
                    </>
                  }
                </Button>
              </CardContent>
            </Card>

            {/* Practice Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {nodeData.flashcardsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Flashcards
                    </div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {nodeData.examQuestionsCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Questions
                    </div>
                  </div>
                </div>

                <Link
                  to={`/flashcards/config/${nodeId || 'default'}`}
                  className="block">

                  <Button className="w-full" variant="default">
                    <Layers className="mr-2 h-4 w-4" />
                    Practice Flashcards
                  </Button>
                </Link>

                <Link to={`/exam/config/exam-1`} className="block">
                  <Button className="w-full" variant="outline">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <a
                  href="#"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors group">

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">
                      React Documentation
                    </span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors group">

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-red-100 text-red-600 flex items-center justify-center">
                      <PlayCircle className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Video Tutorial</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors group">

                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Cheat Sheet</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>);

}