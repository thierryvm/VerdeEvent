import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import OceaneEventPlanner from "./pages/OceaneEventPlanner";
import Vertiyo from "./pages/Vertiyo";
import AdminBlog from "./pages/AdminBlog";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/ProtectedRoute";
import AdminBlogEdit from "./pages/AdminBlogEdit";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPages from "./pages/AdminPages";
import AdminMedia from "./pages/AdminMedia";
import AdminSettings from "./pages/AdminSettings";
import { AuthProvider } from "./auth";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import AdminFloatingMenu from "./components/AdminFloatingMenu";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AdminFloatingMenu />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="oceane-event-planner" element={<OceaneEventPlanner />} />
            <Route path="vertiyo" element={<Vertiyo />} />
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
          </Route>

          <Route path="auth-vm2024" element={<AdminLogin />} />
          <Route path="dashboard-vm2024" element={<PrivateRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="blog/edit/:id?" element={<AdminBlogEdit />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
