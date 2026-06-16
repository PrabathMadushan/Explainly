import React, { useCallback, useMemo, useState, memo } from 'react';
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
  Layers,
  CheckCircle2,
  XCircle,
  Save } from
'lucide-react';
// Mock Data
const initialFlashcards = [
{
  id: 'fc-1',
  question: 'What is the primary purpose of the useState hook?',
  answer:
  'The useState hook allows you to add state to functional components. It returns a pair: the current state value and a function that lets you update it.',
  topic: 'React Hooks',
  difficulty: 'Intro',
  status: 'published',
  tags: ['react', 'hooks', 'state']
},
{
  id: 'fc-2',
  question: 'How do you update state based on the previous state value?',
  answer:
  'You should pass a function to the state updater. For example: setCount(prevCount => prevCount + 1). This ensures you are working with the most up-to-date state value.',
  topic: 'React Hooks',
  difficulty: 'Intermediate',
  status: 'published',
  tags: ['react', 'hooks', 'state', 'best-practices']
},
{
  id: 'fc-3',
  question: 'What are the rules of hooks?',
  answer:
  '1. Only call Hooks at the top level (not inside loops, conditions, or nested functions).\n2. Only call Hooks from React function components (or custom hooks).',
  topic: 'React Hooks',
  difficulty: 'Intermediate',
  status: 'draft',
  tags: ['react', 'hooks', 'rules']
},
{
  id: 'fc-4',
  question: 'Explain the difference between useMemo and useCallback.',
  answer:
  'useMemo returns a memoized value, while useCallback returns a memoized function.',
  topic: 'React Hooks',
  difficulty: 'Advanced',
  status: 'review',
  tags: ['react', 'hooks', 'performance']
}];

export function FlashcardManagementPage() {
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredFlashcards = flashcards.filter(
    (fc) =>
    fc.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fc.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectCard = (card: any) => {
    setSelectedCard(card);
  };
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Flashcard Management
          </h2>
          <p className="text-muted-foreground">
            Create and manage flashcards for your courses.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Flashcard
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Flashcard List */}
        <Card className="lg:col-span-2 flex flex-col min-h-0">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search flashcards..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="divide-y">
              {filteredFlashcards.map((fc) =>
              <div
                key={fc.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedCard?.id === fc.id ? 'bg-muted' : ''}`}
                onClick={() => handleSelectCard(fc)}>

                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <Badge
                      variant={
                      fc.status === 'published' ?
                      'default' :
                      fc.status === 'draft' ?
                      'secondary' :
                      'outline'
                      }
                      className="text-[10px] h-5">

                        {fc.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {fc.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground">

                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive">

                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium line-clamp-2 mb-1">
                    {fc.question}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3" /> {fc.topic}
                    </span>
                    <span>•</span>
                    <span>{fc.difficulty}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-2 bg-muted/10 flex justify-between items-center text-xs text-muted-foreground">
            <span className="px-2">
              Showing {filteredFlashcards.length} of {flashcards.length} cards
            </span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" disabled>
                Previous
              </Button>
              <Button variant="ghost" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Editor Panel */}
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          {selectedCard ?
          <>
              <CardHeader className="border-b bg-muted/10 py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Edit Flashcard</CardTitle>
                  <Badge variant="outline">{selectedCard.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedCard.question} />

                </div>

                <div className="space-y-2">
                  <Label>Answer</Label>
                  <textarea
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedCard.answer} />

                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>React Hooks</option>
                      <option>JavaScript Basics</option>
                      <option>CSS Layout</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <select
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={selectedCard.difficulty}>

                      <option>Intro</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedCard.tags.map((tag: string) =>
                  <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                        <XCircle className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" />
                      </Badge>
                  )}
                    <Badge
                    variant="outline"
                    className="text-xs border-dashed cursor-pointer hover:bg-muted">

                      <Plus className="mr-1 h-3 w-3" /> Add
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={selectedCard.status}>

                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 bg-muted/10 flex justify-between">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </CardFooter>
            </> :

          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Layers className="h-8 w-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium">No Card Selected</h3>
              <p className="text-sm text-center max-w-xs mt-2">
                Select a flashcard from the list to view and edit its details.
              </p>
            </div>
          }
        </Card>
      </div>
    </div>);

}