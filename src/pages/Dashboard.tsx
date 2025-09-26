import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MealTracker } from "@/components/MealTracker";
import { DietPlanCard } from "@/components/DietPlanCard";
import { UserProfileForm } from "@/components/UserProfileForm";
import { 
  BarChart3, 
  Target, 
  Calendar, 
  Sparkles, 
  TrendingUp,
  Apple,
  Brain
} from "lucide-react";
import nutritionHero from "@/assets/nutrition-hero.jpg";
import nutritrackLogo from "@/assets/nutritrack-logo.png";

interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  goal: string;
  activityLevel: string;
}

// Sample diet plans
const samplePlans = [
  {
    id: "1",
    name: "Mediterranean Diet",
    description: "Heart-healthy plan rich in fruits, vegetables, and healthy fats",
    duration: "4 weeks",
    difficulty: "Easy" as const,
    meals: ["Greek Salad", "Grilled Fish", "Quinoa Bowl", "Hummus & Veggies"],
    calories: 1800,
  },
  {
    id: "2",
    name: "High Protein Plan",
    description: "Perfect for muscle building and recovery",
    duration: "6 weeks",
    difficulty: "Medium" as const,
    meals: ["Protein Smoothie", "Chicken Breast", "Protein Pasta", "Greek Yogurt"],
    calories: 2200,
  },
  {
    id: "3",
    name: "Keto Lifestyle",
    description: "Low-carb, high-fat approach for weight management",
    duration: "8 weeks",
    difficulty: "Hard" as const,
    meals: ["Avocado Toast", "Salmon", "Cauliflower Rice", "Nuts & Seeds"],
    calories: 1600,
  }
];

export const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAIMessage, setShowAIMessage] = useState(false);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleGenerateAI = () => {
    setShowAIMessage(true);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-accent">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={nutritrackLogo} 
                alt="NutriTrack Pro Logo" 
                className="w-16 h-16 mr-4"
              />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                NutriTrack Pro
              </h1>
            </div>
            <img 
              src={nutritionHero} 
              alt="Healthy nutrition and diet planning" 
              className="w-full max-w-4xl mx-auto rounded-2xl shadow-glow mb-8"
            />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your AI-powered nutrition companion for personalized diet plans and meal tracking
            </p>
          </div>
          <UserProfileForm onProfileComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-accent">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img 
                src={nutritrackLogo} 
                alt="NutriTrack Pro Logo" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {userProfile.name}!</h1>
                <p className="text-muted-foreground">Track your nutrition and reach your goals</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setUserProfile(null)}>
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Target className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Goal</p>
                  <p className="font-semibold capitalize">{userProfile.goal.replace('-', ' ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-secondary rounded-lg">
                  <BarChart3 className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">BMI</p>
                  <p className="font-semibold">
                    {((parseFloat(userProfile.weight) / Math.pow(parseFloat(userProfile.height) / 100, 2))).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success rounded-lg">
                  <TrendingUp className="h-4 w-4 text-success-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activity</p>
                  <p className="font-semibold capitalize">{userProfile.activityLevel.split('-')[0]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning rounded-lg">
                  <Calendar className="h-4 w-4 text-warning-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day</p>
                  <p className="font-semibold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Meal Tracker */}
          <div className="lg:col-span-2">
            <MealTracker />
          </div>

          {/* Diet Plans Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5 text-primary" />
                  Diet Plans
                </CardTitle>
                <CardDescription>
                  Choose a plan that fits your lifestyle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {samplePlans.map((plan) => (
                  <DietPlanCard
                    key={plan.id}
                    plan={plan}
                    onSelect={setSelectedPlan}
                    onGenerateAI={handleGenerateAI}
                  />
                ))}
              </CardContent>
            </Card>

            {/* AI Features Card */}
            <Card className="shadow-soft border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI-Powered Features
                </CardTitle>
                <CardDescription>
                  Create personalized plans with AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showAIMessage ? (
                  <div className="p-4 bg-gradient-secondary rounded-lg text-center">
                    <Sparkles className="h-8 w-8 text-accent-foreground mx-auto mb-2" />
                    <p className="text-sm">
                      To unlock AI-powered custom diet plans, connect your project to Supabase. 
                      This will enable secure API integration with ChatGPT, Gemini, and other AI models.
                    </p>
                    <Button variant="accent" className="mt-3" size="sm">
                      Learn More
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="hero" 
                    className="w-full" 
                    onClick={handleGenerateAI}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Plan
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};