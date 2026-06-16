import React from 'react';
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
import {
  Settings,
  Bot,
  Globe,
  Lock,
  Database,
  Save,
  AlertTriangle } from
'lucide-react';
export function SettingsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage global configuration and AI preferences.
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 space-y-1">
          <Button variant="secondary" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" /> General
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bot className="mr-2 h-4 w-4" /> AI & Automation
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Globe className="mr-2 h-4 w-4" /> Localization
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Lock className="mr-2 h-4 w-4" /> Privacy & Security
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Database className="mr-2 h-4 w-4" /> Data Management
          </Button>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Information</CardTitle>
              <CardDescription>
                Basic details about your Explainly instance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="Explainly Learning Platform" />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@explainly.com" />
              </div>
              <div className="space-y-2">
                <Label>Organization URL</Label>
                <Input defaultValue="https://learn.explainly.com" />
              </div>
            </CardContent>
          </Card>

          {/* AI Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" /> AI Configuration
              </CardTitle>
              <CardDescription>
                Configure how AI interacts with student content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">AI Answer Validation</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically grade written answers using AI models.
                  </p>
                </div>
                <div className="flex items-center h-6">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked />

                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Content Generation</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow authors to use AI for drafting articles and questions.
                  </p>
                </div>
                <div className="flex items-center h-6">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked />

                </div>
              </div>

              <div className="space-y-2">
                <Label>Default Grading Strictness</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Lenient (Focus on key concepts)</option>
                  <option>Balanced</option>
                  <option>Strict (Exact terminology required)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" /> Data Retention
              </CardTitle>
              <CardDescription>
                Manage how long student data is stored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Audio Recording Retention</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Indefinite</option>
                </select>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  Longer retention may increase storage costs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}