import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter } from
'../../components/ui/Card';
import { Label } from '../../components/ui/Label';
import { Badge } from '../../components/ui/Badge';
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
  FileCheck,
  CheckCircle2,
  XCircle,
  Save,
  GripVertical } from
'lucide-react';
// Mock Data
const initialQuestions = [
{
  id: 'q-1',
  text: 'What is the output of console.log(typeof null)?',
  type: 'MCQ',
  topic: 'JavaScript Basics',
  difficulty: 'Intermediate',
  usageCount: 12,
  status: 'published'
},
{
  id: 'q-2',
  text: 'Explain the concept of closures in JavaScript.',
  type: 'Written',
  topic: 'JavaScript Basics',
  difficulty: 'Advanced',
  usageCount: 5,
  status: 'published'
},
{
  id: 'q-3',
  text: 'Which hook is used for side effects in React?',
  type: 'MCQ',
  topic: 'React Hooks',
  difficulty: 'Intro',
  usageCount: 25,
  status: 'published'
},
{
  id: 'q-4',
  text: 'Describe the difference between controlled and uncontrolled components.',
  type: 'Written',
  topic: 'React Forms',
  difficulty: 'Intermediate',
  usageCount: 8,
  status: 'draft'
}];

export function QuestionBankPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'bank' | 'builder'>('bank');
  const filteredQuestions = questions.filter(
    (q) =>
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectQuestion = (q: any) => {
    setSelectedQuestion(q);
  };
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Question Bank & Exam Builder
          </h2>
          <p className="text-muted-foreground">
            Manage questions and assemble exams.
          </p>
        </div>
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={activeTab === 'bank' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('bank')}>

            Question Bank
          </Button>
          <Button
            variant={activeTab === 'builder' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('builder')}>

            Exam Builder
          </Button>
        </div>
      </div>

      {activeTab === 'bank' ?
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Question List */}
          <Card className="lg:col-span-2 flex flex-col min-h-0">
            <CardHeader className="pb-3">
              <div className="flex justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                  placeholder="Search questions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />

                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Question
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="divide-y">
                {filteredQuestions.map((q) =>
              <div
                key={q.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedQuestion?.id === q.id ? 'bg-muted' : ''}`}
                onClick={() => handleSelectQuestion(q)}>

                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <Badge
                      variant={q.type === 'MCQ' ? 'default' : 'secondary'}
                      className="text-[10px] h-5">

                          {q.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          {q.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground mr-2">
                          Used {q.usageCount} times
                        </span>
                        <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground">

                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {q.text}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileCheck className="h-3 w-3" /> {q.topic}
                      </span>
                      <span>•</span>
                      <span>{q.difficulty}</span>
                      <span>•</span>
                      <span
                    className={
                    q.status === 'published' ?
                    'text-green-600' :
                    'text-yellow-600'
                    }>

                        {q.status}
                      </span>
                    </div>
                  </div>
              )}
              </div>
            </CardContent>
          </Card>

          {/* Editor Panel */}
          <Card className="lg:col-span-1 flex flex-col overflow-hidden">
            {selectedQuestion ?
          <>
                <CardHeader className="border-b bg-muted/10 py-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Edit Question</CardTitle>
                    <Badge variant="outline">{selectedQuestion.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Question Text</Label>
                    <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedQuestion.text} />

                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={selectedQuestion.type}>

                        <option>MCQ</option>
                        <option>Written</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={selectedQuestion.difficulty}>

                        <option>Intro</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>

                  {selectedQuestion.type === 'MCQ' &&
              <div className="space-y-4 border rounded-md p-4">
                      <Label>Options</Label>
                      <div className="space-y-3">
                        {['Object', 'String', 'Number', 'Undefined'].map(
                    (opt, i) =>
                    <div key={i} className="flex items-center gap-2">
                              <input
                        type="radio"
                        name="correct-opt"
                        defaultChecked={i === 0} />

                              <Input defaultValue={opt} className="h-8" />
                              <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive">

                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>

                  )}
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="mr-2 h-3 w-3" /> Add Option
                        </Button>
                      </div>
                    </div>
              }

                  {selectedQuestion.type === 'Written' &&
              <div className="space-y-2">
                      <Label>Ideal Answer / Rubric</Label>
                      <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter the ideal answer or grading criteria..." />

                    </div>
              }

                  <div className="space-y-2">
                    <Label>Explanation (shown after answer)</Label>
                    <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Explain why the answer is correct..." />

                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 bg-muted/10 flex justify-between">
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                  <Button size="sm">
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                </CardFooter>
              </> :

          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileCheck className="h-8 w-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium">No Question Selected</h3>
                <p className="text-sm text-center max-w-xs mt-2">
                  Select a question from the list to view and edit its details.
                </p>
              </div>
          }
          </Card>
        </div> /* Exam Builder View */ :

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          <Card className="lg:col-span-1 flex flex-col min-h-0">
            <CardHeader>
              <CardTitle>Exam Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Exam Title</Label>
                <Input placeholder="e.g. React Fundamentals Final" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Instructions for students..." />

              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time Limit (min)</Label>
                  <Input type="number" defaultValue={60} />
                </div>
                <div className="space-y-2">
                  <Label>Pass Score (%)</Label>
                  <Input type="number" defaultValue={70} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Question Selection</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="selection"
                    id="manual"
                    defaultChecked />

                    <label htmlFor="manual" className="text-sm">
                      Manual Selection
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="selection" id="random" />
                    <label htmlFor="random" className="text-sm">
                      Random from Tags
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create Exam</Button>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2 flex flex-col min-h-0">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Selected Questions (0)</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Questions
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-md m-6 bg-muted/20">
              <FileCheck className="h-12 w-12 mb-4 opacity-20" />
              <p>No questions added yet</p>
              <Button variant="link">Browse Question Bank</Button>
            </CardContent>
          </Card>
        </div>
      }
    </div>);

}