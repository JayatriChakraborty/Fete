
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import EventDetail from "./pages/EventDetail";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import { SavedEventsProvider } from "./contexts/SavedEventsContext";
import { RSVPProvider } from "./contexts/RSVPContext";
import { UserEventsProvider } from "./contexts/UserEventsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SavedEventsProvider>
        <RSVPProvider>
          <UserEventsProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/event/:id" element={<EventDetail />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/create" element={<CreateEvent />} />
                  <Route path="/my-events" element={<MyEvents />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </UserEventsProvider>
        </RSVPProvider>
      </SavedEventsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
