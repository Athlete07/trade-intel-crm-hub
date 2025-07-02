import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Globe, 
  Shield, 
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface AuthPageProps {
  onAuthSuccess: (user: SupabaseUser) => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    country: '',
    role: 'user'
  });

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          onAuthSuccess(session.user);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        onAuthSuccess(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [onAuthSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        toast({
          title: "Authentication Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome Back!",
          description: "You have successfully logged in.",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (signupForm.password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: signupForm.firstName,
            last_name: signupForm.lastName,
            company: signupForm.company,
            phone: signupForm.phone,
            country: signupForm.country,
            role: signupForm.role
          }
        }
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding Section */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">EXIM CRM</h1>
            <p className="text-xl text-blue-100 mb-8">
              International Trade Management Platform
            </p>
          </div>

          <div className="space-y-6 w-full max-w-md">
            <div className="flex items-center gap-4 text-blue-100">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Global Trade Compliance</h3>
                <p className="text-sm">International standards & regulations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-blue-100">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Enterprise Security</h3>
                <p className="text-sm">Bank-grade encryption & security</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-blue-100">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted by 500+ Companies</h3>
                <p className="text-sm">Across 50+ countries worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="flex flex-col justify-center">
          <Card className="bg-white shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="lg:hidden mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">EXIM CRM</h1>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome to Your Trade Platform
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Manage your international trade operations with confidence
              </p>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="text-sm font-medium">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm font-medium">
                    Create Account
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                            className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Form */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                          First Name
                        </Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="first-name"
                            placeholder="First name"
                            value={signupForm.firstName}
                            onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                          Last Name
                        </Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="last-name"
                            placeholder="Last name"
                            value={signupForm.lastName}
                            onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                          Company Name
                        </Label>
                        <div className="relative mt-1">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="company"
                            placeholder="Company name"
                            value={signupForm.company}
                            onChange={(e) => setSignupForm({...signupForm, company: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="+1 (555) 000-0000"
                            value={signupForm.phone}
                            onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                        Country
                      </Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <select
                          id="country"
                          value={signupForm.country}
                          onChange={(e) => setSignupForm({...signupForm, country: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 h-12 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                          required
                        >
                          <option value="">Select your country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="IN">India</option>
                          <option value="CN">China</option>
                          <option value="JP">Japan</option>
                          <option value="AU">Australia</option>
                          <option value="BR">Brazil</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                          Confirm Password
                        </Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                            className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {showPassword ? "Hide" : "Show"} Password
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Security Information */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Your data is protected with enterprise-grade security</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
