import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import {
  Users,
  BookOpen,
  FileCheck,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus } from
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
  ResponsiveContainer } from
'recharts';
// Mock Data
const activeUsersData = [
{
  name: 'Mon',
  users: 1200
},
{
  name: 'Tue',
  users: 1350
},
{
  name: 'Wed',
  users: 1250
},
{
  name: 'Thu',
  users: 1480
},
{
  name: 'Fri',
  users: 1600
},
{
  name: 'Sat',
  users: 1100
},
{
  name: 'Sun',
  users: 950
}];

const popularSubjectsData = [
{
  name: 'React',
  students: 850
},
{
  name: 'JS',
  students: 720
},
{
  name: 'CSS',
  students: 650
},
{
  name: 'Node',
  students: 580
},
{
  name: 'SQL',
  students: 420
}];

const recentActivity = [
{
  id: 1,
  user: 'Sarah Miller',
  action: 'Completed Exam',
  target: 'React Hooks Mastery',
  time: '5 mins ago',
  status: 'Passed'
},
{
  id: 2,
  user: 'James Wilson',
  action: 'Started Course',
  target: 'Advanced JavaScript',
  time: '12 mins ago',
  status: 'Active'
},
{
  id: 3,
  user: 'Emily Chen',
  action: 'Reported Issue',
  target: 'Question #1042',
  time: '25 mins ago',
  status: 'Pending'
},
{
  id: 4,
  user: 'Michael Brown',
  action: 'New Signup',
  target: 'Student Account',
  time: '1 hour ago',
  status: 'Verified'
}];

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of platform performance and content metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Content
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+18%</span> from last
              month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subjects
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+3</span> new this
              week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Questions
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+120</span> added
              recently
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Engagement
            </CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">-2%</span> session
              duration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Daily Active Students</CardTitle>
            <CardDescription>
              Unique students logging in over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeUsersData}>
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

                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    activeDot={{
                      r: 8
                    }} />

                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Popular Subjects</CardTitle>
            <CardDescription>
              Most enrolled subjects this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularSubjectsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={50} />

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
                    dataKey="students"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    barSize={30} />

                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item) =>
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">

                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    {item.user.
                  split(' ').
                  map((n) => n[0]).
                  join('')}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.user}{' '}
                      <span className="text-muted-foreground font-normal">
                        performed
                      </span>{' '}
                      {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.target} • {item.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {item.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>);

}