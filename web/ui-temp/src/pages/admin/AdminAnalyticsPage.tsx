import React, { useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend } from
'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
// Mock Data
const dailyActiveUsers = [
{
  name: 'Mon',
  students: 1200,
  admins: 5
},
{
  name: 'Tue',
  students: 1350,
  admins: 8
},
{
  name: 'Wed',
  students: 1250,
  admins: 6
},
{
  name: 'Thu',
  students: 1480,
  admins: 9
},
{
  name: 'Fri',
  students: 1600,
  admins: 7
},
{
  name: 'Sat',
  students: 1100,
  admins: 3
},
{
  name: 'Sun',
  students: 950,
  admins: 2
}];

const contentUsage = [
{
  name: 'Flashcards',
  value: 4500
},
{
  name: 'Exams',
  value: 2100
},
{
  name: 'Articles',
  value: 3200
}];

const examPerformance = [
{
  range: '0-50%',
  count: 150
},
{
  range: '51-70%',
  count: 420
},
{
  range: '71-85%',
  count: 680
},
{
  range: '86-100%',
  count: 350
}];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const problemQuestions = [
{
  id: 'q-1042',
  text: 'Explain the event loop in JavaScript',
  errorRate: '68%',
  attempts: 145,
  topic: 'Advanced JS'
},
{
  id: 'q-892',
  text: 'CSS Grid vs Flexbox usage',
  errorRate: '55%',
  attempts: 210,
  topic: 'CSS Layout'
},
{
  id: 'q-331',
  text: 'React useEffect dependency array',
  errorRate: '42%',
  attempts: 350,
  topic: 'React Hooks'
}];

export function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Platform usage and performance metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Last 7 Days
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
            <CardDescription>User activity over the last week.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyActiveUsers}>
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
                  axisLine={false} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }} />

                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  activeDot={{
                    r: 8
                  }} />

                <Line
                  type="monotone"
                  dataKey="admins"
                  stroke="#82ca9d"
                  strokeWidth={2} />

              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Usage Distribution</CardTitle>
            <CardDescription>Breakdown of learning activities.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value">

                  {contentUsage.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Exam Performance Distribution</CardTitle>
            <CardDescription>Student scores across all exams.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={examPerformance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="range"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />

                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false} />

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
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]} />

              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Top Problem Questions</CardTitle>
            <CardDescription>
              Questions with the highest error rates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {problemQuestions.map((q) =>
              <div
                key={q.id}
                className="p-3 rounded-lg border bg-muted/20 space-y-2">

                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-muted-foreground">
                      {q.id}
                    </span>
                    <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                      {q.errorRate} Error
                    </span>
                  </div>
                  <p className="text-sm font-medium line-clamp-2">{q.text}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{q.topic}</span>
                    <span>{q.attempts} attempts</span>
                  </div>
                </div>
              )}
              <Button variant="ghost" size="sm" className="w-full">
                View All Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

}