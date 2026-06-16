import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import {
  Menu,
  X,
  BookOpen,
  User,
  LogOut,
  Settings,
  ChevronDown } from
'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface NavbarProps {
  variant?: 'marketing' | 'app';
}
export function Navbar({ variant = 'marketing' }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Mock user for app variant
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'AJ'
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-primary">

            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <span>Explainly</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {variant === 'marketing' ?
          <>
              <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">

                Features
              </a>
              <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">

                How it works
              </a>
              <div className="flex items-center gap-2 ml-4">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get started</Button>
                </Link>
              </div>
            </> :

          <>
              <Link
              to="/dashboard"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === '/dashboard' ?
                'text-foreground' :
                'text-muted-foreground'
              )}>

                Dashboard
              </Link>

              {/* Subject Switcher Mock */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Subjects <ChevronDown className="h-4 w-4" />
                </button>
                {/* Dropdown would go here - simplified for this iteration */}
              </div>

              <div className="ml-4 flex items-center gap-4 border-l pl-4">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {user.name}
                  </span>
                </div>
              </div>
            </>
          }
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu">

          {isMobileMenuOpen ?
          <X className="h-6 w-6" /> :

          <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div className="md:hidden border-t p-4 bg-background animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            {variant === 'marketing' ?
          <>
                <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}>

                  Features
                </a>
                <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}>

                  How it works
                </a>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Get started</Button>
                  </Link>
                </div>
              </> :

          <>
                <Link
              to="/dashboard"
              className="text-sm font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}>

                  Dashboard
                </Link>
                <div className="text-sm font-medium text-muted-foreground">
                  Subjects
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                      {user.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">

                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </Button>
                </div>
              </>
          }
          </div>
        </div>
      }
    </nav>);

}