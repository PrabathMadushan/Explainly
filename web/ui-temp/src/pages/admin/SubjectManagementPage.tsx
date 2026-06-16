import React, { useState, Children } from 'react';
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
  ChevronRight,
  ChevronDown,
  Plus,
  MoreHorizontal,
  GripVertical,
  Trash2,
  Edit2,
  Save,
  BookOpen,
  Layers,
  FileText,
  Search,
  CheckCircle2,
  FileCheck } from
'lucide-react';
// Mock Data
const initialTreeData = [
{
  id: 'mod-1',
  title: 'Frontend Fundamentals',
  type: 'module',
  status: 'published',
  children: [
  {
    id: 'top-1',
    title: 'HTML & CSS',
    type: 'topic',
    status: 'published',
    children: [
    {
      id: 'leaf-1',
      title: 'Semantic HTML',
      type: 'leaf',
      status: 'published'
    },
    {
      id: 'leaf-2',
      title: 'CSS Box Model',
      type: 'leaf',
      status: 'published'
    }]

  }]

},
{
  id: 'mod-2',
  title: 'React',
  type: 'module',
  status: 'draft',
  children: [
  {
    id: 'top-2',
    title: 'React Hooks',
    type: 'topic',
    status: 'draft',
    children: [
    {
      id: 'leaf-3',
      title: 'useState',
      type: 'leaf',
      status: 'draft'
    }]

  }]

}];

export function SubjectManagementPage() {
  const [treeData, setTreeData] = useState(initialTreeData);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['mod-1', 'top-1'])
  );
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };
  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
  };
  const renderTree = (nodes: any[], level = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes.has(node.id);
      const isSelected = selectedNode?.id === node.id;
      const hasChildren = node.children && node.children.length > 0;
      if (
      searchQuery &&
      !node.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !hasChildren)
      {
        return null;
      }
      return (
        <div key={node.id}>
          <div
            className={`flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors group ${isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
            style={{
              paddingLeft: `${level * 16 + 8}px`
            }}
            onClick={() => handleSelectNode(node)}>

            <div className="mr-2 text-muted-foreground cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-4 w-4" />
            </div>

            <div
              className="mr-1 p-1 rounded-sm hover:bg-muted-foreground/10"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}>

              {hasChildren ?
              isExpanded ?
              <ChevronDown className="h-4 w-4 text-muted-foreground" /> :

              <ChevronRight className="h-4 w-4 text-muted-foreground" /> :


              <div className="w-4 h-4" />
              }
            </div>

            <div className="mr-2">
              {node.type === 'module' &&
              <BookOpen className="h-4 w-4 text-blue-500" />
              }
              {node.type === 'topic' &&
              <Layers className="h-4 w-4 text-purple-500" />
              }
              {node.type === 'leaf' &&
              <FileText className="h-4 w-4 text-green-500" />
              }
            </div>

            <span className="flex-1 text-sm font-medium truncate">
              {node.title}
            </span>

            <Badge
              variant={node.status === 'published' ? 'secondary' : 'outline'}
              className="ml-2 text-[10px] h-5">

              {node.status}
            </Badge>

            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive">

                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {hasChildren && isExpanded &&
          <div className="border-l border-muted ml-[27px]">
              {renderTree(node.children, level + 1)}
            </div>
          }
        </div>);

    });
  };
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subject Management
          </h2>
          <p className="text-muted-foreground">
            Organize your curriculum structure.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" /> New Subject
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Tree View Panel */}
        <Card className="lg:col-span-1 flex flex-col min-h-0">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search nodes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />

            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-1">{renderTree(treeData)}</div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex justify-between w-full text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3 text-blue-500" /> Module
              </div>
              <div className="flex items-center gap-1">
                <Layers className="h-3 w-3 text-purple-500" /> Topic
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-green-500" /> Leaf Node
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Node Details Panel */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedNode ?
          <>
              <CardHeader className="border-b bg-muted/10">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {selectedNode.type === 'module' &&
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    }
                      {selectedNode.type === 'topic' &&
                    <Layers className="h-5 w-5 text-purple-500" />
                    }
                      {selectedNode.type === 'leaf' &&
                    <FileText className="h-5 w-5 text-green-500" />
                    }
                      {selectedNode.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      ID:{' '}
                      <span className="font-mono text-xs">
                        {selectedNode.id}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge
                  variant={
                  selectedNode.status === 'published' ?
                  'default' :
                  'secondary'
                  }>

                    {selectedNode.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input defaultValue={selectedNode.title} />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                    defaultValue={selectedNode.title.
                    toLowerCase().
                    replace(/\s+/g, '-')} />

                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter a brief description..." />

                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>Intro</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Duration</Label>
                    <Input placeholder="e.g. 15 min" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Add tags separated by commas..." />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-4">
                    Content & Resources
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2">

                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <span>Edit Article</span>
                    </Button>
                    <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2">

                      <Layers className="h-6 w-6 text-muted-foreground" />
                      <span>Manage Flashcards</span>
                    </Button>
                    <Button
                    variant="outline"
                    className="h-24 flex flex-col gap-2">

                      <FileCheck className="h-6 w-6 text-muted-foreground" />
                      <span>Exam Questions</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 bg-muted/10 flex justify-between">
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Node
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Save Changes</Button>
                </div>
              </CardFooter>
            </> :

          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium">No Node Selected</h3>
              <p className="text-sm text-center max-w-xs mt-2">
                Select a module, topic, or leaf node from the tree to view and
                edit its details.
              </p>
            </div>
          }
        </Card>
      </div>
    </div>);

}