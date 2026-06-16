import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { BookOpen, Check, ArrowLeft, Loader2 } from 'lucide-react';
export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Reset your password
          </CardTitle>
          <CardDescription>
            {isSubmitted ?
            'Check your email for the reset link' :
            "Enter your email and we'll send you a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSubmitted ?
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Check className="h-6 w-6" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                We've sent a password reset link to{' '}
                <span className="font-medium text-foreground">{email}</span>.
                Please check your inbox and follow the instructions.
              </p>
            </div> :

          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading} />

              </div>

              {error &&
            <div className="text-sm text-destructive font-medium">
                  {error}
                </div>
            }

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ?
              <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending link...
                  </> :

              'Send reset link'
              }
              </Button>
            </form>
          }
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            to="/login"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">

            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>);

}