import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { BookOpen, Lock, ArrowRight } from 'lucide-react';
export function AdminLoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 font-bold text-2xl text-primary">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <span>Explainly</span>
            <span className="text-muted-foreground font-normal text-lg ml-1">
              Admin
            </span>
          </div>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Admin Console</CardTitle>
            <CardDescription>
              Enter your credentials to access the management dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@explainly.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />

              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />

              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ?
                <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Authenticating...
                  </span> :

                <span className="flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Log in
                  </span>
                }
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t bg-muted/10 p-6">
            <div className="text-center text-sm text-muted-foreground">
              <Link
                to="/"
                className="hover:text-primary flex items-center justify-center gap-1">

                Back to main site <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>);

}