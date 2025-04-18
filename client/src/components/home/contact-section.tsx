import { useEffect, useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Info 
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactForm } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  privacy: z.boolean().refine(value => value === true, {
    message: "You must agree to the privacy policy.",
  }),
});

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      await sendContactForm({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          <div 
            className={`w-full md:w-1/2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-8 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-primary">Get in Touch</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's work together on your next project</h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                I'm currently available for freelance work or full-time opportunities.
                If you're interested in working together, have a question, or just want to say hi,
                feel free to reach out!
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <a 
                      href="mailto:hello@joshuakessell.com" 
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
                    >
                      hello@joshuakessell.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <a 
                      href="tel:+14692785289" 
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
                    >
                      +1 (469) 278-5289
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="text-gray-900 dark:text-gray-100 font-medium">Dallas, Texas</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/joshuakessell" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors holographic-hover"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
                
                <a 
                  href="https://linkedin.com/in/joshuakessell" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors holographic-hover"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </div>
          
          <div 
            className={`w-full md:w-1/2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-white dark:bg-gray-900"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email" 
                              type="email" 
                              {...field} 
                              className="bg-white dark:bg-gray-900"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="How can I help you?" 
                            {...field} 
                            className="bg-white dark:bg-gray-900"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..." 
                            rows={5} 
                            className="resize-none bg-white dark:bg-gray-900" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="privacy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <a href="#" className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300">privacy policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <Button type="submit" disabled={isSubmitting} className="holographic-hover">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Info className="h-5 w-5 mr-1 text-primary" />
                      <span>Response within 24hrs</span>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
