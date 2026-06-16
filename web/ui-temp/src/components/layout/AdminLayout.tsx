import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Button } from '../ui/Button';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  BarChart3,
  Layers,
  FileCheck,
  GitPullRequest } from
'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const sidebarItems = [
{
  title: 'Dashboard',
  href: '/admin/dashboard',
  icon: LayoutDashboard
},
{
  title: 'Subjects & Topics',
  href: '/admin/subjects',
  icon: BookOpen
},
{
  title: 'Content Library',
  href: '/admin/content',
  icon: FileText
},
{
  title: 'Flashcards',
  href: '/admin/flashcards',
  icon: Layers
},
{
  title: 'Exams & Questions',
  href: '/admin/exams',
  icon: FileCheck
},
{
  title: 'Workflow & Review',
  href: '/admin/workflow',
  icon: GitPullRequest
},
{
  title: 'Users & Roles',
  href: '/admin/users',
  icon: Users
},
{
  title: 'Analytics',
  href: '/admin/analytics',
  icon: BarChart3
},
{
  title: 'Settings',
  href: '/admin/settings',
  icon: Settings
}];

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-muted/10">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:flex-shrink-0',
          !isSidebarOpen && '-translate-x-full'
        )}>

        <div className="h-16 flex items-center px-6 border-b">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 font-bold text-xl text-primary">

            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <span>Explainly</span>
          </Link>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2 mt-2">
            Management
          </div>
          {sidebarItems.map((item) =>
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + '/') ?
              'bg-primary/10 text-primary' :
              'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}>

              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}>

              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold md:hidden">Admin Console</h1>

            {/* Breadcrumb placeholder - could be dynamic */}
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer">
                Admin
              </span>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">
                {sidebarItems.find((i) => location.pathname.startsWith(i.href))?.
                title || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground">

              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground relative">

              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
            </Button>
            <div className="h-8 w-px bg-border mx-1" />
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                AD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium leading-none">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@explainly.com
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen &&
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={() => setIsSidebarOpen(false)} />

      }
    </div>);

}