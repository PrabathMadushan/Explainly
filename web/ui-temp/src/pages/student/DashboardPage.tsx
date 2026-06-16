import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import {
  BookOpen,
  Layers,
  FileCheck,
  Play,
  ArrowRight,
  Clock,
  MoreHorizontal,
  TrendingUp } from
'lucide-react';
// Mock Data
const subjects = [
{
  id: 'web-dev',
  title: 'Web Development',
  progress: 65,
  totalNodes: 42,
  completedNodes: 27,
  icon: <BookOpen className="h-6 w-6 text-blue-500" />,
  color: 'bg-blue-100'
},
{
  id: 'data-structures',
  title: 'Data Structures',
  progress: 32,
  totalNodes: 28,
  completedNodes: 9,
  icon: <Layers className="h-6 w-6 text-purple-500" />,
  color: 'bg-purple-100'
},
{
  id: 'machine-learning',
  title: 'Machine Learning',
  progress: 12,
  totalNodes: 56,
  completedNodes: 7,
  icon: <FileCheck className="h-6 w-6 text-green-500" />,
  color: 'bg-green-100'
},
{
  id: 'db-systems',
  title: 'Database Systems',
  progress: 0,
  totalNodes: 34,
  completedNodes: 0,
  icon: <BookOpen className="h-6 w-6 text-orange-500" />,
  color: 'bg-orange-100'
}];

const recentActivity = [
{
  id: 1,
  type: 'study',
  title: 'Studied React Hooks — useEffect',
  timestamp: '2 hours ago',
  icon: <BookOpen className="h-4 w-4" />,
  status: 'Completed'
},
{
  id: 2,
  type: 'flashcards',
  title: 'Practiced 15 flashcards in Data Structures',
  timestamp: 'Yesterday',
  icon: <Layers className="h-4 w-4" />,
  status: 'Good'
},
{
  id: 3,
  type: 'quiz',
  title: 'Completed quiz: Binary Trees',
  timestamp: '2 days ago',
  icon: <FileCheck className="h-4 w-4" />,
  status: '85% Score'
},
{
  id: 4,
  type: 'study',
  title: 'Studied Introduction to Neural Networks',
  timestamp: '3 days ago',
  icon: <BookOpen className="h-4 w-4" />,
  status: 'In Progress'
},
{
  id: 5,
  type: 'flashcards',
  title: 'Practiced 30 flashcards in Web Development',
  timestamp: '4 days ago',
  icon: <Layers className="h-4 w-4" />,
  status: 'Excellent'
}];

export function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, Alex
            </h1>
            <p className="text-muted-foreground">{currentDate}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Continue Learning Card */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/50 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Play className="h-8 w-8 text-primary ml-1" />
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-background">
                  Web Development
                </Badge>
                <span>•</span>
                <span>Last studied 2 hours ago</span>
              </div>
              <h2 className="text-xl font-semibold">React Hooks — useState</h2>
              <div className="w-full max-w-md">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
            <Button size="lg" className="shrink-0 w-full md:w-auto">
              Resume Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all">

            <Layers className="h-6 w-6 text-purple-500" />
            <span>Start Flashcard Practice</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all">

            <FileCheck className="h-6 w-6 text-green-500" />
            <span>Take a Quiz</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all">

            <TrendingUp className="h-6 w-6 text-blue-500" />
            <span>View Progress</span>
          </Button>
        </div>

        {/* Subjects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              Your Subjects
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) =>
            <Card
              key={subject.id}
              className="flex flex-col hover:shadow-md transition-shadow">

                <CardHeader className="pb-2">
                  <div
                  className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center mb-2`}>

                    {subject.icon}
                  </div>
                  <CardTitle className="text-lg">{subject.title}</CardTitle>
                  <CardDescription>
                    {subject.completedNodes} / {subject.totalNodes} topics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{subject.progress}% Complete</span>
                    </div>
                    <Progress value={subject.progress} className="h-1.5" />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link to={`/subjects/${subject.id}`} className="w-full">
                    <Button
                    variant={subject.progress > 0 ? 'secondary' : 'outline'}
                    className="w-full">

                      {subject.progress > 0 ? 'Continue' : 'Start Learning'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Recent Activity
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((activity) =>
                <div
                  key={activity.id}
                  className="flex items-center p-4 hover:bg-muted/30 transition-colors">

                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-4 text-muted-foreground">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                    </div>
                    <Badge
                    variant="secondary"
                    className="ml-2 whitespace-nowrap">

                      {activity.status}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/10 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground">

                View full history
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>);

}