import { useEffect, useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  SendIcon,
  MessageSquare,
  ArrowRight
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
import { motion } from "framer-motion";

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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const contactMethods = [
    { 
      icon: <Mail className="h-5 w-5 text-white" />,
      label: "Email",
      value: "hello@joshuakessell.com",
      href: "mailto:hello@joshuakessell.com",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    { 
      icon: <Phone className="h-5 w-5 text-white" />,
      label: "Phone",
      value: "+1 (214) 864-1386",
      href: "tel:+12148641386",
      color: "bg-green-500 hover:bg-green-600"
    },
    { 
      icon: <MapPin className="h-5 w-5 text-white" />,
      label: "Location",
      value: "Dallas, Texas",
      href: null,
      color: "bg-amber-500 hover:bg-amber-600"
    }
  ];
  
  return (
    <div className="container mx-auto px-4">
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I'm currently available for freelance work and full-time opportunities.
          Let's discuss how I can help with your next project.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid lg:grid-cols-5 gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Contact Form - Takes up 3 columns on large screens */}
        <motion.div 
          className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
          
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
                          className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 h-11"
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
                          className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 h-11"
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
                        className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 h-11"
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
                        placeholder="Tell me about your project..." 
                        rows={5} 
                        className="resize-none bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700" 
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
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-600 dark:text-gray-400">
                        I agree to the <a href="#" className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 underline">privacy policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 text-white bg-primary hover:bg-primary/90 font-medium rounded-lg group"
              >
                {isSubmitting ? "Sending..." : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <SendIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
        
        {/* Contact Info - Takes up 2 columns on large screens */}
        <motion.div 
          className="lg:col-span-2 space-y-8"
          variants={itemVariants}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center flex-shrink-0 shadow-md transition-transform hover:scale-105`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{method.label}</p>
                    {method.href ? (
                      <a 
                        href={method.href} 
                        className="text-lg font-semibold hover:text-primary dark:hover:text-primary transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold">{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h4 className="font-medium mb-4">Follow me on</h4>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/joshuakessell" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                
                <a 
                  href="https://linkedin.com/in/joshuakessell" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 border border-primary/20"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-2">Looking for a dedicated developer?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Let's discuss how I can contribute to your team or project with my experience in full-stack development and AI integration.
            </p>
            
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white group"
              asChild
            >
              <a href="mailto:hello@joshuakessell.com?subject=Let's%20Work%20Together">
                <span className="flex items-center gap-1">
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
