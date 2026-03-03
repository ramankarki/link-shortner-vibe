import { SignUpButton, SignInButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Check,
  Zap,
  LockKeyhole,
  BarChart3,
  Share2,
  Settings,
} from 'lucide-react';
import { AuthRedirect } from './components/auth-redirect';

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Shortening',
      description: 'Turn long URLs into short, shareable links in seconds',
    },
    {
      icon: LockKeyhole,
      title: 'Secure & Private',
      description:
        'Your links are encrypted and stored securely on our servers',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description:
        'Share shortened links across social media and messaging apps',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track clicks and monitor the performance of your links',
    },
    {
      icon: Settings,
      title: 'Customization',
      description: 'Create custom short codes to personalize your links',
    },
    {
      icon: Check,
      title: 'Link Management',
      description: 'Edit, organize, and delete your links from your dashboard',
    },
  ];

  return (
    <>
      <AuthRedirect />
      <main className="min-h-screen bg-linear-to-b from-black via-black to-zinc-900">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center gap-8 px-4 py-20 sm:py-32">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Shorten. Share. Track.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 mb-8 leading-relaxed">
              Transform long, unwieldy URLs into clean, memorable short links.
              Perfect for social media, marketing campaigns, and everyday
              sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignUpButton mode="modal">
                <Button size="lg" className="px-8 py-6 text-base">
                  Get Started Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base"
                >
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-zinc-300">
                Everything you need to shorten and manage your links effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Icon className="w-6 h-6 text-blue-400" />
                        <CardTitle className="text-white">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="bg-linear-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur">
              <CardHeader className="gap-4">
                <CardTitle className="text-3xl text-white">
                  Ready to get started?
                </CardTitle>
                <CardDescription className="text-lg text-zinc-300">
                  Create an account today and start shortening URLs in minutes.
                  It&apos;s free and takes less than a minute to sign up.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignUpButton mode="modal">
                  <Button size="lg" className="px-8 py-6 text-base">
                    Sign Up Now
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-base"
                  >
                    Already have an account?
                  </Button>
                </SignInButton>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 px-4 py-8 text-center text-zinc-400">
          <p>© 2026 Link Shortener. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
