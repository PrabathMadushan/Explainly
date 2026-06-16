import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
  GitBranch,
  Layers,
  FileCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  BookOpen } from
'lucide-react';
export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar variant="marketing" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master any subject with{' '}
                    <span className="text-primary">structured learning</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Explainly helps you learn faster with interactive topic
                    trees, smart flashcards, and practice exams tailored to your
                    progress.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get started free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full min-[400px]:w-auto">

                      See how it works
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="aspect-square lg:aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-secondary to-background p-8 flex items-center justify-center relative overflow-hidden border shadow-xl">
                  {/* Abstract UI Representation */}
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                  <div className="relative z-10 w-full max-w-sm bg-card rounded-xl shadow-2xl border p-6 space-y-4">
                    <div className="h-2 w-1/3 bg-muted rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted/50 rounded" />
                      <div className="h-4 w-5/6 bg-muted/50 rounded" />
                      <div className="h-4 w-4/6 bg-muted/50 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="h-24 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <GitBranch className="h-8 w-8 text-primary" />
                      </div>
                      <div className="h-24 rounded-lg bg-secondary border flex items-center justify-center">
                        <Layers className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-12 -right-12 h-40 w-40 bg-primary/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-12 -left-12 h-40 w-40 bg-blue-500/30 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything you need to learn effectively
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Our platform combines the best learning techniques into one
                cohesive experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <GitBranch className="h-6 w-6" />
                  </div>
                  <CardTitle>Topic Tree Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Visualize your learning path with structured modules and
                    topics. Track exactly where you are.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6" />
                  </div>
                  <CardTitle>Flashcard Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reinforce concepts with smart flashcards that adapt to your
                    retention level.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <CardTitle>Practice Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Test your knowledge with quizzes and full-length exams to
                    prepare for the real thing.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See your growth over time with detailed analytics and
                    performance insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                How Explainly works
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Three simple steps to mastering any new subject.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-muted -z-10" />

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-background border-4 border-muted flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold">Choose your subject</h3>
                <p className="text-muted-foreground">
                  Select from our library of structured courses or create your
                  own learning path.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-background border-4 border-muted flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold">Study & Practice</h3>
                <p className="text-muted-foreground">
                  Read lessons, flip through flashcards, and take quizzes to
                  reinforce learning.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-background border-4 border-muted flex items-center justify-center z-10">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold">Track Progress</h3>
                <p className="text-muted-foreground">
                  Watch your knowledge grow as you complete nodes and master
                  topics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">10k+</h3>
                <p className="text-primary-foreground/80">Active Students</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">500+</h3>
                <p className="text-primary-foreground/80">Topics Covered</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">50k+</h3>
                <p className="text-primary-foreground/80">Flashcards</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold tracking-tighter">95%</h3>
                <p className="text-primary-foreground/80">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/50">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to start learning?
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Join thousands of students mastering new subjects today. It's
                free to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8">

                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);

}