import React, { useEffect } from 'react';
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
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  ArrowRight,
  FileText,
  Layers,
  FileCheck } from
'lucide-react';
// Mock Data
const reviewItems = [
{
  id: 'rev-1',
  title: 'React Hooks: useEffect Deep Dive',
  type: 'Article',
  author: 'Sarah Miller',
  submitted: '2 hours ago',
  status: 'In Review',
  comments: 2
},
{
  id: 'rev-2',
  title: 'Advanced JavaScript Flashcards',
  type: 'Flashcard Set',
  author: 'James Wilson',
  submitted: 'Yesterday',
  status: 'In Review',
  comments: 0
},
{
  id: 'rev-3',
  title: 'CSS Grid vs Flexbox Exam',
  type: 'Exam',
  author: 'Emily Chen',
  submitted: '2 days ago',
  status: 'Changes Requested',
  comments: 5
},
{
  id: 'rev-4',
  title: 'Introduction to TypeScript',
  type: 'Module',
  author: 'Michael Brown',
  submitted: '3 days ago',
  status: 'Approved',
  comments: 1
}];

export function WorkflowReviewPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Review</h2>
          <p className="text-muted-foreground">
            Review, approve, or request changes on content submissions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-[1000px] h-full">
          {/* Column: In Review */}
          <div className="flex-1 flex flex-col bg-muted/30 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" /> In Review
              </h3>
              <Badge variant="secondary">2</Badge>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1">
              {reviewItems.
              filter((i) => i.status === 'In Review').
              map((item) =>
              <ReviewCard key={item.id} item={item} />
              )}
            </div>
          </div>

          {/* Column: Changes Requested */}
          <div className="flex-1 flex flex-col bg-muted/30 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" /> Changes Requested
              </h3>
              <Badge variant="secondary">1</Badge>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1">
              {reviewItems.
              filter((i) => i.status === 'Changes Requested').
              map((item) =>
              <ReviewCard key={item.id} item={item} />
              )}
            </div>
          </div>

          {/* Column: Approved */}
          <div className="flex-1 flex flex-col bg-muted/30 rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" /> Approved
              </h3>
              <Badge variant="secondary">1</Badge>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1">
              {reviewItems.
              filter((i) => i.status === 'Approved').
              map((item) =>
              <ReviewCard key={item.id} item={item} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}
function ReviewCard({ item }: {item: any;}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-[10px]">
            {item.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {item.submitted}
          </span>
        </div>
        <h4 className="font-medium text-sm mb-2 line-clamp-2">{item.title}</h4>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
              {item.author.
              split(' ').
              map((n: string) => n[0]).
              join('')}
            </div>
            <span>{item.author}</span>
          </div>
          {item.comments > 0 &&
          <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {item.comments}
            </div>
          }
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-muted/10 border-t flex justify-end">
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          Review <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>);

}