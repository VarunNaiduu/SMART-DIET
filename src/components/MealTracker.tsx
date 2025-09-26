import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Utensils, Clock, Flame } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  category: "breakfast" | "lunch" | "dinner" | "snack";
}

interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const MealTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    category: "breakfast" as Meal["category"]
  });

  // Sample daily targets - would come from user profile
  const targets: DailyTargets = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  };

  const addMeal = () => {
    if (!newMeal.name || !newMeal.calories) return;

    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein) || 0,
      carbs: parseInt(newMeal.carbs) || 0,
      fat: parseInt(newMeal.fat) || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: newMeal.category
    };

    setMeals([...meals, meal]);
    setNewMeal({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      category: "breakfast"
    });
  };

  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getMealIcon = (category: string) => {
    const iconClass = "h-4 w-4";
    switch (category) {
      case "breakfast": return <Utensils className={iconClass} />;
      case "lunch": return <Utensils className={iconClass} />;
      case "dinner": return <Utensils className={iconClass} />;
      case "snack": return <Flame className={iconClass} />;
      default: return <Utensils className={iconClass} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breakfast": return "bg-accent text-accent-foreground";
      case "lunch": return "bg-primary text-primary-foreground";
      case "dinner": return "bg-secondary text-secondary-foreground";
      case "snack": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Daily Progress */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Calories</span>
                <span>{totals.calories}/{targets.calories}</span>
              </div>
              <Progress value={(totals.calories / targets.calories) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Protein (g)</span>
                <span>{totals.protein}/{targets.protein}</span>
              </div>
              <Progress value={(totals.protein / targets.protein) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Carbs (g)</span>
                <span>{totals.carbs}/{targets.carbs}</span>
              </div>
              <Progress value={(totals.carbs / targets.carbs) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fat (g)</span>
                <span>{totals.fat}/{targets.fat}</span>
              </div>
              <Progress value={(totals.fat / targets.fat) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Meal Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
          <CardDescription>Track what you eat throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              placeholder="Food name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Calories"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={newMeal.category}
              onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value as Meal["category"] })}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Input
              type="number"
              placeholder="Protein (g)"
              value={newMeal.protein}
              onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Carbs (g)"
              value={newMeal.carbs}
              onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Fat (g)"
              value={newMeal.fat}
              onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
            />
          </div>
          <Button onClick={addMeal} variant="success" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Food
          </Button>
        </CardContent>
      </Card>

      {/* Meals List */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No meals logged yet. Start tracking your food!
            </p>
          ) : (
            <div className="space-y-3">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={getCategoryColor(meal.category)}>
                      {getMealIcon(meal.category)}
                      {meal.category}
                    </Badge>
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {meal.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{meal.calories} cal</p>
                    <p className="text-sm text-muted-foreground">
                      P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};