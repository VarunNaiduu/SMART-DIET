import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, User, Target } from "lucide-react";

interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  goal: string;
  activityLevel: string;
}

interface UserProfileFormProps {
  onProfileComplete: (profile: UserProfile) => void;
}

export const UserProfileForm = ({ onProfileComplete }: UserProfileFormProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: "",
    activityLevel: ""
  });

  const calculateBMI = () => {
    if (!profile.height || !profile.weight) return null;
    const heightM = parseFloat(profile.height) / 100;
    const weightKg = parseFloat(profile.weight);
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-warning" };
    if (bmi < 25) return { text: "Normal", color: "text-success" };
    if (bmi < 30) return { text: "Overweight", color: "text-warning" };
    return { text: "Obese", color: "text-destructive" };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileComplete(profile);
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <Card className="max-w-2xl mx-auto shadow-soft">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-primary rounded-full">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Set Up Your Profile</CardTitle>
        <CardDescription>
          Help us create the perfect nutrition plan for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                placeholder="Your age"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                placeholder="e.g. 175"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                placeholder="e.g. 70"
                required
              />
            </div>
          </div>

          {bmi && (
            <div className="p-4 bg-gradient-accent rounded-lg border">
              <div className="flex items-center gap-3">
                <Calculator className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Your BMI: {bmi}</p>
                  <p className={`text-sm ${bmiCategory?.color}`}>
                    Category: {bmiCategory?.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Primary Goal</Label>
            <Select value={profile.goal} onValueChange={(value) => setProfile({ ...profile, goal: value })}>
              <SelectTrigger>
                <SelectValue placeholder="What's your main goal?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose-weight">Lose Weight</SelectItem>
                <SelectItem value="gain-weight">Gain Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="build-muscle">Build Muscle</SelectItem>
                <SelectItem value="improve-health">Improve Overall Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select value={profile.activityLevel} onValueChange={(value) => setProfile({ ...profile, activityLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="How active are you?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                <SelectItem value="light">Light (Exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (Exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (Exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (2x/day or intense exercise)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={!profile.name || !profile.age || !profile.height || !profile.weight || !profile.gender || !profile.goal || !profile.activityLevel}
          >
            <Target className="h-5 w-5 mr-2" />
            Create My Nutrition Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};