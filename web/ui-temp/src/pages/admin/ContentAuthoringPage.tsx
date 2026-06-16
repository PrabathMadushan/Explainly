import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription } from
'../../components/ui/Card';
import { Label } from '../../components/ui/Label';
import { Badge } from '../../components/ui/Badge';
import {
  ArrowLeft,
  Save,
  Eye,
  MoreHorizontal,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Code,
  Quote,
  CheckCircle2,
  Clock } from
'lucide-react';
export function ContentAuthoringPage() {
  const [content, setContent] = useState(
    '# Introduction to Semantic HTML\n\nSemantic HTML is the foundation of accessible and SEO-friendly web development.\n\n## Why it matters\n\nUsing the correct tags conveys meaning to both browsers and screen readers.'
  );
  const [isPreview, setIsPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Saved');
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaveStatus('Saving...');
    setTimeout(() => setSaveStatus('Saved'), 1000);
  };
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Semantic HTML
              </h2>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="font-mono">leaf-1</span> • Last edited by You 2
              mins ago
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground mr-2 flex items-center gap-1">
            {saveStatus === 'Saved' ?
            <CheckCircle2 className="h-3 w-3 text-green-500" /> :

            <Clock className="h-3 w-3 animate-spin" />
            }
            {saveStatus}
          </span>
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Publish
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Main Editor Area */}
        <Card className="lg:col-span-3 flex flex-col overflow-hidden">
          <div className="border-b p-2 flex items-center gap-1 bg-muted/20">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <div className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <div className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Italic className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Code className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Quote className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 relative">
            {isPreview ?
            <div className="absolute inset-0 p-6 overflow-y-auto prose dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-4">
                  Introduction to Semantic HTML
                </h1>
                <p className="mb-4">
                  Semantic HTML is the foundation of accessible and SEO-friendly
                  web development.
                </p>
                <h2 className="text-2xl font-bold mb-2">Why it matters</h2>
                <p>
                  Using the correct tags conveys meaning to both browsers and
                  screen readers.
                </p>
              </div> :

            <textarea
              className="absolute inset-0 w-full h-full p-6 resize-none focus:outline-none font-mono text-sm bg-background"
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing your content here..." />

            }
          </div>
        </Card>

        {/* Sidebar Metadata */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Publishing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Draft</option>
                  <option>In Review</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/20">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    AD
                  </div>
                  <span className="text-sm">Admin User</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value="1.0.2" readOnly />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Image className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Click to upload
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Resources</Label>
                <Button variant="outline" size="sm" className="w-full">
                  <LinkIcon className="mr-2 h-3 w-3" /> Add Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}