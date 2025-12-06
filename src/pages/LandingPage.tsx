import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Calendar, Users, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';

const features = [
  {
    icon: Video,
    title: 'Video Meetings',
    description: 'Host high-quality video meetings with your team and clients',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Intelligent scheduling that works around your availability',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite participants and collaborate seamlessly',
  },
];

const benefits = [
  'Unlimited meetings',
  'Calendar integration',
  'Meeting transcriptions',
  'Team management',
  'Analytics dashboard',
  'Mobile friendly',
];

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen animated-bg">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Video className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">Ekaiva</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <FadeIn>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Built for Ekaiva Hackathon</span>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Schedule Meetings
                <br />
                <span className="gradient-text">Effortlessly</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A modern meeting scheduler that helps teams collaborate better.
                Schedule, manage, and track all your meetings in one beautiful interface.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <Button variant="gradient" size="xl" className="group">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl">
                    Sign In
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Hero Image Placeholder */}
            <FadeIn delay={0.4}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-16 relative"
              >
                <div className="glass-card rounded-2xl p-4 shadow-glow">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border border-border/50">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto text-primary/50 mb-4" />
                      <p className="text-muted-foreground">Dashboard Preview</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
              </motion.div>
            </FadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12">
                Everything you need to manage meetings
              </h2>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="glass-card-hover rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="glass-card rounded-3xl p-12">
              <FadeIn>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Why teams love Ekaiva
                </h2>
              </FadeIn>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {benefits.map((benefit, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of teams already using Ekaiva to streamline their meetings.
              </p>
              <Link to="/register">
                <Button variant="gradient" size="xl" className="animate-glow">
                  Start Free Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border/50">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              <span className="font-semibold">Ekaiva</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for Ekaiva Hackathon 2024
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
