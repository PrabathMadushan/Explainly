import React, { useEffect, useState, useContext, Children } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
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
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import {
  ChevronRight,
  ChevronDown,
  Search,
  BookOpen,
  Layers,
  FileCheck,
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft } from
'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Mock Data for Topic Tree
type NodeStatus = 'not-started' | 'in-progress' | 'completed';
type NodeDifficulty = 'Intro' | 'Intermediate' | 'Advanced';
interface TopicNode {
  id: string;
  title: string;
  type: 'module' | 'topic' | 'leaf';
  children?: TopicNode[];
  status?: NodeStatus;
  difficulty?: NodeDifficulty;
  duration?: string;
  description?: string;
  prerequisites?: string[];
  flashcardsCount?: number;
  examQuestionsCount?: number;
}
const subjectData = {
  id: 'web-dev',
  title: 'Web Development',
  description:
  'Master the fundamentals of modern web development, from HTML/CSS to React and beyond.',
  progress: 65,
  tree: [
  {
    id: 'module-1',
    title: 'Frontend Fundamentals',
    type: 'module',
    children: [
    {
      id: 'topic-1',
      title: 'HTML & CSS',
      type: 'topic',
      children: [
      {
        id: 'leaf-1',
        title: 'Semantic HTML',
        type: 'leaf',
        status: 'completed',
        difficulty: 'Intro',
        duration: '15 min',
        description:
        'Learn how to use semantic HTML tags to structure your web pages for better accessibility and SEO.',
        prerequisites: [],
        flashcardsCount: 12,
        examQuestionsCount: 5
      },
      {
        id: 'leaf-2',
        title: 'CSS Box Model',
        type: 'leaf',
        status: 'completed',
        difficulty: 'Intro',
        duration: '20 min',
        description:
        'Understand how margins, borders, padding, and content work together in CSS layout.',
        prerequisites: ['Semantic HTML'],
        flashcardsCount: 15,
        examQuestionsCount: 8
      },
      {
        id: 'leaf-3',
        title: 'Flexbox Layout',
        type: 'leaf',
        status: 'in-progress',
        difficulty: 'Intermediate',
        duration: '30 min',
        description:
        'Master flexible box layouts to create responsive designs with ease.',
        prerequisites: ['CSS Box Model'],
        flashcardsCount: 20,
        examQuestionsCount: 10
      }]

    },
    {
      id: 'topic-2',
      title: 'JavaScript Basics',
      type: 'topic',
      children: [
      {
        id: 'leaf-4',
        title: 'Variables & Data Types',
        type: 'leaf',
        status: 'not-started',
        difficulty: 'Intro',
        duration: '25 min',
        description:
        'Get started with JavaScript variables, strings, numbers, and booleans.',
        prerequisites: [],
        flashcardsCount: 10,
        examQuestionsCount: 5
      },
      {
        id: 'leaf-5',
        title: 'Functions & Scope',
        type: 'leaf',
        status: 'not-started',
        difficulty: 'Intermediate',
        duration: '35 min',
        description:
        'Learn how to write reusable functions and understand variable scope.',
        prerequisites: ['Variables & Data Types'],
        flashcardsCount: 18,
        examQuestionsCount: 12
      }]

    }]

  },
  {
    id: 'module-2',
    title: 'React',
    type: 'module',
    children: [
    {
      id: 'topic-3',
      title: 'React Hooks',
      type: 'topic',
      children: [
      {
        id: 'leaf-6',
        title: 'useState',
        type: 'leaf',
        status: 'in-progress',
        difficulty: 'Intermediate',
        duration: '20 min',
        description:
        'Manage state in functional components using the useState hook.',
        prerequisites: ['JavaScript Basics'],
        flashcardsCount: 15,
        examQuestionsCount: 8
      },
      {
        id: 'leaf-7',
        title: 'useEffect',
        type: 'leaf',
        status: 'not-started',
        difficulty: 'Advanced',
        duration: '30 min',
        description:
        'Handle side effects like data fetching and subscriptions in React components.',
        prerequisites: ['useState'],
        flashcardsCount: 22,
        examQuestionsCount: 15
      },
      {
        id: 'leaf-8',
        title: 'useContext',
        type: 'leaf',
        status: 'not-started',
        difficulty: 'Advanced',
        duration: '25 min',
        description:
        'Share state across the component tree without prop drilling.',
        prerequisites: ['useState', 'useEffect'],
        flashcardsCount: 12,
        examQuestionsCount: 6
      }]

    }]

  }] as
  TopicNode[]
};
export function SubjectOverviewPage() {
  const { subjectId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['module-1', 'topic-1', 'module-2', 'topic-3'])
  );
  const [selectedNode, setSelectedNode] = useState<TopicNode | null>(null);
  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };
  const handleNodeClick = (node: TopicNode) => {
    if (node.type === 'leaf') {
      setSelectedNode(node);
    } else {
      toggleNode(node.id);
    }
  };
  const renderTree = (nodes: TopicNode[], level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes.has(node.id);
      const isSelected = selectedNode?.id === node.id;
      const hasChildren = node.children && node.children.length > 0;
      // Simple search filter
      if (
      searchQuery &&
      !node.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !node.children?.some((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      {
        return null;
      }
      return (
        <div key={node.id} className="select-none">
          <div
            className={cn(
              'flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors hover:bg-muted/50',
              isSelected && 'bg-primary/10 text-primary hover:bg-primary/15',
              level === 0 && 'font-bold text-lg mt-4 mb-2',
              level === 1 && 'font-medium text-base ml-4',
              level === 2 && 'text-sm ml-8 border-l-2 border-muted pl-4'
            )}
            onClick={() => handleNodeClick(node)}>

            {hasChildren &&
            <span className="mr-2 text-muted-foreground">
                {isExpanded ?
              <ChevronDown className="h-4 w-4" /> :

              <ChevronRight className="h-4 w-4" />
              }
              </span>
            }

            <span className="flex-1">{node.title}</span>

            {node.type === 'leaf' &&
            <div className="flex items-center gap-3">
                <Badge
                variant={
                node.difficulty === 'Intro' ?
                'secondary' :
                node.difficulty === 'Intermediate' ?
                'default' :
                'destructive'
                }
                className="text-[10px] h-5 px-1.5">

                  {node.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {node.duration}
                </span>
                {node.status === 'completed' ?
              <CheckCircle2 className="h-4 w-4 text-green-500" /> :
              node.status === 'in-progress' ?
              <div className="relative h-4 w-4">
                    <Circle className="h-4 w-4 text-muted-foreground opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                    </div>
                  </div> :

              <Circle className="h-4 w-4 text-muted-foreground opacity-30" />
              }
              </div>
            }
          </div>

          {hasChildren && isExpanded &&
          <div className="animate-in slide-in-from-top-2 fade-in duration-200">
              {renderTree(node.children!, level + 1)}
            </div>
          }
        </div>);

    });
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="app" />

      <main className="flex-1 container py-8 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link
              to="/dashboard"
              className="hover:text-foreground flex items-center gap-1">

              <ArrowLeft className="h-3 w-3" /> Back to Dashboard
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {subjectData.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {subjectData.description}
              </p>
            </div>
            <div className="w-full md:w-64 space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span>Course Progress</span>
                <span>{subjectData.progress}%</span>
              </div>
              <Progress value={subjectData.progress} className="h-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Topic Tree */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>

            <Card className="min-h-[500px]">
              <CardContent className="p-6">
                {renderTree(subjectData.tree)}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Node Details (Sticky) */}
          <div className="lg:col-span-1 sticky top-24">
            {selectedNode ?
            <Card className="border-primary/20 shadow-lg animate-in fade-in slide-in-from-right-4 duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20">

                      {selectedNode.difficulty}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {selectedNode.duration}
                    </span>
                  </div>
                  <CardTitle className="text-xl">
                    {selectedNode.title}
                  </CardTitle>
                  <CardDescription>{selectedNode.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedNode.prerequisites &&
                selectedNode.prerequisites.length > 0 &&
                <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                          Prerequisites
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedNode.prerequisites.map((prereq) =>
                    <Badge
                      key={prereq}
                      variant="secondary"
                      className="text-xs">

                              {prereq}
                            </Badge>
                    )}
                        </div>
                      </div>
                }

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedNode.flashcardsCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Flashcards
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {selectedNode.examQuestionsCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Questions
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pt-2">
                  <Button className="w-full" size="lg">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Open Study Mode
                  </Button>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Button variant="outline" className="w-full">
                      <Layers className="mr-2 h-4 w-4" />
                      Flashcards
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileCheck className="mr-2 h-4 w-4" />
                      Start Quiz
                    </Button>
                  </div>
                </CardFooter>
              </Card> :

            <Card className="bg-muted/30 border-dashed border-2 flex flex-col items-center justify-center text-center p-8 h-[300px]">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-lg mb-1">No topic selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a topic from the tree to view details and start
                  learning.
                </p>
              </Card>
            }
          </div>
        </div>
      </main>
    </div>);

}