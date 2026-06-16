import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import {
  TrendingUp,
  Clock,
  Layers,
  FileCheck,
  Flame,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal } from
'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend } from
'recharts';
// Mock Data for Charts
const activityData = [
{
  name: 'Mon',
  hours: 2.5,
  cards: 45
},
{
  name: 'Tue',
  hours: 1.8,
  cards: 30
},
{
  name: 'Wed',
  hours: 3.2,
  cards: 60
},
{
  name: 'Thu',
  hours: 4.0,
  cards: 85
},
{
  name: 'Fri',
  hours: 2.1,
  cards: 40
},
{
  name: 'Sat',
  hours: 5.5,
  cards: 120
},
{
  name: 'Sun',
  hours: 3.8,
  cards: 75
}];

const topicPerformanceData = [
{
  name: 'React',
  score: 85,
  fill: '#8884d8'
},
{
  name: 'JavaScript',
  score: 92,
  fill: '#82ca9d'
},
{
  name: 'CSS',
  score: 78,
  fill: '#ffc658'
},
{
  name: 'HTML',
  score: 95,
  fill: '#ff8042'
},
{
  name: 'Node.js',
  score: 65,
  fill: '#0088FE'
}];

const weakestTopics = [
{
  id: 1,
  topic: 'useEffect Dependency Array',
  subject: 'React Hooks',
  score: 45,
  trend: 'down'
},
{
  id: 2,
  topic: 'CSS Grid Layout',
  subject: 'Advanced CSS',
  score: 52,
  trend: 'flat'
},
{
  id: 3,
  topic: 'Asynchronous JavaScript',
  subject: 'JavaScript',
  score: 58,
  trend: 'up'
}];

const recentAttempts = [
{
  id: 101,
  question: 'What is the difference between useMemo and useCallback?',
  type: 'Flashcard',
  result: 'I knew this',
  time: '2 hours ago',
  score: 'High'
},
{
  id: 102,
  question: 'Explain the concept of hoisting in JavaScript.',
  type: 'Exam Question',
  result: 'Correct',
  time: '5 hours ago',
  score: '100%'
},
{
  id: 103,
  question: 'How does the CSS box model work?',
  type: 'Flashcard',
  result: 'Unsure',
  time: 'Yesterday',
  score: 'Medium'
},
{
  id: 104,
  question: 'What are the lifecycle methods in React class components?',
  type: 'Exam Question',
  result: 'Incorrect',
  time: 'Yesterday',
  score: '0%'
},
{
  id: 105,
  question: 'Describe the purpose of semantic HTML.',
  type: 'Flashcard',
  result: 'I knew this',
  time: '2 days ago',
  score: 'High'
}];

export function ProgressDashboardPage() {
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6 space-y-8">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
            <p className="text-muted-foreground">
              Track your learning journey and performance metrics.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              {dateRange}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Layers className="h-4 w-4" />
              {subjectFilter}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Study Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42h 15m</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12%</span> from
                last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Flashcards Reviewed
              </CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+85</span> new this
                week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Exams Completed
              </CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-muted-foreground">Avg. Score: </span>
                <span className="font-medium ml-1">78%</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Streak
              </CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Days</div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep it up! You're on fire!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>
                Study hours and flashcards over the last 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false} />

                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }} />

                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    activeDot={{
                      r: 8
                    }}
                    name="Study Hours" />

                  <Line
                    type="monotone"
                    dataKey="cards"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    name="Flashcards" />

                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Topic Performance</CardTitle>
              <CardDescription>
                Your mastery level across different subjects.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={80} />

                  <Tooltip
                    cursor={{
                      fill: 'transparent'
                    }}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }} />

                  <Bar
                    dataKey="score"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                    name="Mastery Score" />

                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weakest Topics */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Weakest Topics</CardTitle>
              <CardDescription>
                Focus on these areas to improve.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {weakestTopics.map((item) =>
              <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium leading-none">
                        {item.topic}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.subject}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                      variant={item.score < 50 ? 'destructive' : 'secondary'}
                      className="text-xs">

                        {item.score}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={item.score} className="h-1.5" />
                  <div className="flex justify-end">
                    <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">

                      Review Topic <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Attempts */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Attempts</CardTitle>
                <CardDescription>
                  Your latest practice sessions and exam questions.
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttempts.map((attempt) =>
                <div
                  key={attempt.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">

                    <div className="flex items-start gap-4">
                      <div
                      className={`mt-1 h-9 w-9 rounded-full flex items-center justify-center ${attempt.type === 'Flashcard' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>

                        {attempt.type === 'Flashcard' ?
                      <Layers className="h-4 w-4" /> :

                      <FileCheck className="h-4 w-4" />
                      }
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                          {attempt.question}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{attempt.type}</span>
                          <span>•</span>
                          <span>{attempt.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                      variant={
                      attempt.result === 'Correct' ||
                      attempt.result === 'I knew this' ?
                      'default' // Primary/Success color usually
                      : attempt.result === 'Incorrect' ?
                      'destructive' :
                      'secondary'
                      }>

                        {attempt.result}
                      </Badge>
                      <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild>

                        <Link to={`/questions/${attempt.id}/history`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>);

}