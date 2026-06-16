import React, { useState, Fragment } from 'react';
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
  Layers,
  Filter,
  RotateCcw,
  Play,
  Check,
  AlertCircle } from
'lucide-react';
export function FlashcardConfigPage() {
  const { nodeId } = useParams();
  const navigate = useNavigate();
  // State for filters
  const [scope, setScope] = useState<'node' | 'subtree'>('node');
  const [difficulties, setDifficulties] = useState<string[]>([
  'Intro',
  'Intermediate']
  );
  const [tags, setTags] = useState<string[]>(['Definitions', 'Conceptual']);
  const [status, setStatus] = useState<'unseen' | 'review' | 'all'>('all');
  // Mock data
  const nodeTitle = 'useState Hook';
  const breadcrumbs = ['Web Development', 'React', 'React Hooks', 'useState'];
  // Mock calculation of card count based on filters
  const calculateCardCount = () => {
    let count = 25;
    if (scope === 'node') count -= 10;
    if (difficulties.length < 3) count -= (3 - difficulties.length) * 2;
    if (tags.length < 4) count -= (4 - tags.length) * 1;
    if (status === 'unseen') count = Math.floor(count * 0.4);
    if (status === 'review') count = Math.floor(count * 0.3);
    return Math.max(0, count);
  };
  const cardCount = calculateCardCount();
  const toggleDifficulty = (diff: string) => {
    if (difficulties.includes(diff)) {
      setDifficulties(difficulties.filter((d) => d !== diff));
    } else {
      setDifficulties([...difficulties, diff]);
    }
  };
  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };
  const resetFilters = () => {
    setScope('node');
    setDifficulties(['Intro', 'Intermediate', 'Advanced']);
    setTags(['Definitions', 'Conceptual', 'Code examples', 'Best practices']);
    setStatus('all');
  };
  const handleStart = () => {
    navigate('/flashcards/session');
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6 max-w-5xl mx-auto">
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Layers className="h-8 w-8 text-primary" />
              Flashcard Practice
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure your practice session for{' '}
              <span className="font-medium text-foreground">{nodeTitle}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Configuration
                </CardTitle>
                <CardDescription>
                  Customize which cards you want to study
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Scope Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Scope
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${scope === 'node' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                      onClick={() => setScope('node')}>

                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <p className="font-medium text-foreground">
                              Only this topic
                            </p>
                            <p className="text-muted-foreground text-xs mt-1">
                              Practice cards specifically for {nodeTitle}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${scope === 'node' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>

                          {scope === 'node' &&
                          <div className="h-2 w-2 rounded-full bg-white" />
                          }
                        </div>
                      </div>
                    </div>
                    <div
                      className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${scope === 'subtree' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                      onClick={() => setScope('subtree')}>

                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <p className="font-medium text-foreground">
                              Include subtopics
                            </p>
                            <p className="text-muted-foreground text-xs mt-1">
                              Include cards from all nested topics
                            </p>
                          </div>
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${scope === 'subtree' ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>

                          {scope === 'subtree' &&
                          <div className="h-2 w-2 rounded-full bg-white" />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difficulty Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none">
                    Difficulty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Intro', 'Intermediate', 'Advanced'].map((diff) =>
                    <Badge
                      key={diff}
                      variant={
                      difficulties.includes(diff) ? 'default' : 'outline'
                      }
                      className={`cursor-pointer px-3 py-1.5 text-sm ${difficulties.includes(diff) ? '' : 'hover:bg-muted'}`}
                      onClick={() => toggleDifficulty(diff)}>

                        {diff}
                        {difficulties.includes(diff) &&
                      <Check className="ml-2 h-3 w-3" />
                      }
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                    'Definitions',
                    'Conceptual',
                    'Code examples',
                    'Best practices'].
                    map((tag) =>
                    <Badge
                      key={tag}
                      variant={tags.includes(tag) ? 'secondary' : 'outline'}
                      className={`cursor-pointer px-3 py-1.5 text-sm ${tags.includes(tag) ? 'bg-secondary hover:bg-secondary/80' : 'hover:bg-muted'}`}
                      onClick={() => toggleTag(tag)}>

                        {tag}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Status Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none">
                    Card Status
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                    {
                      id: 'unseen',
                      label: 'Unseen only'
                    },
                    {
                      id: 'review',
                      label: 'Needs review'
                    },
                    {
                      id: 'all',
                      label: 'All cards'
                    }].
                    map((option) =>
                    <div
                      key={option.id}
                      className="flex items-center space-x-2">

                        <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center cursor-pointer ${status === option.id ? 'border-primary bg-primary' : 'border-muted-foreground'}`}
                        onClick={() => setStatus(option.id as any)}>

                          {status === option.id &&
                        <div className="h-2 w-2 rounded-full bg-white" />
                        }
                        </div>
                        <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        onClick={() => setStatus(option.id as any)}>

                          {option.label}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className="text-muted-foreground">

                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset filters
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-lg">Session Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-5xl font-bold text-primary tracking-tight">
                    {cardCount}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Cards Selected
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Topic</span>
                    <span className="font-medium truncate max-w-[120px]">
                      {nodeTitle}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Scope</span>
                    <span className="font-medium">
                      {scope === 'node' ? 'Topic only' : 'Topic + Subtree'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="font-medium">
                      {difficulties.length} selected
                    </span>
                  </div>
                </div>

                {cardCount === 0 ?
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      No cards match your filters. Try selecting more
                      difficulties or tags.
                    </span>
                  </div> :

                <Button
                  className="w-full h-12 text-lg shadow-md shadow-primary/20"
                  onClick={handleStart}>

                    Start Practice
                    <Play className="ml-2 h-5 w-5" />
                  </Button>
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>);

}