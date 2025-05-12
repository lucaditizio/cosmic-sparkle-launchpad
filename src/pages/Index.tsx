
import { useEffect, useState } from 'react';
import NewsletterForm from '@/components/NewsletterForm';
import SparkleEffect from '@/components/SparkleEffect';
import { Sparkle } from 'lucide-react';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />
      
      {/* Sparkle cursor effect */}
      <SparkleEffect />
      
      {/* Content with fade-in animation */}
      <div 
        className={`z-10 text-center transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Logo/Icon */}
        <div className="mb-6">
          <Sparkle className="h-16 w-16 mx-auto text-primary/80" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          Coming Soon
        </h1>
        
        {/* Subheading */}
        <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
          We're building something amazing. <br> 
          Be the first to know when we launch.
        </p>
        
        {/* Newsletter form */}
        <div className="mb-12">
          <NewsletterForm />
        </div>
        
        {/* Footer */}
        <div className="text-muted-foreground/60 text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Index;
