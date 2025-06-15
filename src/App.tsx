
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import UserEventDetail from "./pages/UserEventDetail";
import Connections from "./pages/Connections";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SavedEventsProvider>
        <RSVPProvider>
          <UserEventsProvider>
            <BrowserRouter>
              <AuthProvider>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/user-event/:id" element={<UserEventDetail />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/connections" element={<PrivateRoute><Connections /></PrivateRoute>} />
                    <Route path="/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
                    <Route path="/my-events" element={<PrivateRoute><MyEvents /></PrivateRoute>} />
                    <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </AuthProvider>
            </BrowserRouter>
          </UserEventsProvider>
        </RSVPProvider>
      </SavedEventsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
