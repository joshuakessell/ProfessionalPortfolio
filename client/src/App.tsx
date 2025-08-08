import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Suspense, lazy } from "react";

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
  return (
    <>
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>}>
        <Router />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
