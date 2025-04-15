import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Lightbulb, 
  MessageSquare, 
  BarChart3, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AIFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const aiFeatures = [
    {
      title: "Smart Code Generation",
      description: "Utilizing AI to generate boilerplate code, optimize functions, and suggest improvements based on best practices and patterns.",
      icon: Lightbulb,
      color: "primary",
      example: `// AI-generated code example
const optimizedFunction = async (data) => {
  const results = await Promise.all(
    data.map(async item => processItem(item))
  );
  return results.filter(Boolean);
};`
    },
    {
      title: "Natural Language Interface",
      description: "Building conversational interfaces that understand user intent and provide intelligent responses across various applications.",
      icon: MessageSquare,
      color: "violet",
      chat: [
        {
          user: true,
          message: "How do I implement a dark mode toggle?"
        },
        {
          user: false,
          message: "To implement a dark mode toggle, use the prefers-color-scheme media query combined with CSS variables. Here's a basic implementation..."
        }
      ]
    },
    {
      title: "Data Analysis & Visualization",
      description: "Using machine learning algorithms to analyze complex datasets and create meaningful visualizations for better insights.",
      icon: BarChart3,
      color: "green",
      chart: true
    }
  ];
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/10 dark:to-violet-900/10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="inline-block mb-4 bg-violet-500/10 text-violet-500">
            AI-Powered Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enhancing Development with AI</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leveraging artificial intelligence to improve code quality, automate workflows,
            and create smarter applications.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  feature.color === "primary" ? "bg-blue-100 dark:bg-blue-900/20" : 
                  feature.color === "violet" ? "bg-violet-100 dark:bg-violet-900/20" : 
                  "bg-green-100 dark:bg-green-900/20"
                )}>
                  <feature.icon className={cn(
                    "h-6 w-6",
                    feature.color === "primary" ? "text-primary" : 
                    feature.color === "violet" ? "text-violet-500" : 
                    "text-green-500"
                  )} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                
                {feature.example && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                      {feature.example}
                    </pre>
                  </div>
                )}
                
                {feature.chat && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    {feature.chat.map((message, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          message.user 
                            ? "bg-blue-100 dark:bg-blue-900/20" 
                            : "bg-violet-100 dark:bg-violet-900/20"
                        )}>
                          {message.user ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          )}
                        </div>
                        <div className={cn(
                          "rounded-lg p-2 text-sm",
                          message.user 
                            ? "bg-gray-100 dark:bg-gray-800" 
                            : "bg-violet-50 dark:bg-violet-900/10"
                        )}>
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {feature.chart && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    <div className="h-32 w-full flex items-center justify-center">
                      <div className="flex items-end h-24 space-x-2">
                        <div className="w-6 bg-blue-500/70 dark:bg-blue-500/50 rounded-t-sm h-12 animate-pulse" style={{ animationDuration: "2s" }}></div>
                        <div className="w-6 bg-blue-500/70 dark:bg-blue-500/50 rounded-t-sm h-16 animate-pulse" style={{ animationDuration: "2.2s" }}></div>
                        <div className="w-6 bg-blue-500/70 dark:bg-blue-500/50 rounded-t-sm h-20 animate-pulse" style={{ animationDuration: "2.4s" }}></div>
                        <div className="w-6 bg-violet-500/70 dark:bg-violet-500/50 rounded-t-sm h-24 animate-pulse" style={{ animationDuration: "2.6s" }}></div>
                        <div className="w-6 bg-blue-500/70 dark:bg-blue-500/50 rounded-t-sm h-16 animate-pulse" style={{ animationDuration: "2.8s" }}></div>
                        <div className="w-6 bg-blue-500/70 dark:bg-blue-500/50 rounded-t-sm h-12 animate-pulse" style={{ animationDuration: "3s" }}></div>
                        <div className="w-6 bg-blue-500/70 dark:bg-blue-500/50 rounded-t-sm h-8 animate-pulse" style={{ animationDuration: "3.2s" }}></div>
                      </div>
                    </div>
                    <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                      AI-generated insights from project analytics
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button className="bg-violet-500 hover:bg-violet-600">
            <span>Explore AI Solutions</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("px-3 py-1 rounded-full text-sm font-medium", className)}>
      {children}
    </span>
  );
}
