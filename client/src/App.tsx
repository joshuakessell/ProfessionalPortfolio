import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Suspense, lazy } from "react";
import { MobileLoadingCheck } from "@/components/ui/mobile-loading-check";

const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const isDev = import.meta.env.DEV;
  
  return (
    <>
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span>Loading Portfolio...</span>
          </div>
        </div>
      }>
        <Router />
      </Suspense>
      <Toaster />
      {isDev && window.innerWidth <= 768 && <MobileLoadingCheck />}
    </>
  );
}

export default App;
