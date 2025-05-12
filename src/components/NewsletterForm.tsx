
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert email into Supabase
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);
      
      if (error) {
        // Handle duplicate emails gracefully
        if (error.code === '23505') { // Unique violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          console.error("Supabase error:", error);
          toast({
            title: "Error",
            description: "There was a problem subscribing you. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail('');
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast({
        title: "Error",
        description: "There was a problem subscribing you. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto space-x-2">
      <Input
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-secondary/50 border-secondary newsletter-input text-primary placeholder:text-muted-foreground/60"
        disabled={isSubmitting}
        required
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? (
          "Subscribing..."
        ) : (
          <>
            Notify Me <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default NewsletterForm;
