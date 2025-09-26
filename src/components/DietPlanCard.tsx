import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Clock, Users, Sparkles } from "lucide-react";

interface DietPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  meals: string[];
  calories: number;
  isAIGenerated?: boolean;
}

interface DietPlanCardProps {
  plan: DietPlan;
  onSelect: (plan: DietPlan) => void;
  onGenerateAI?: () => void;
}

export const DietPlanCard = ({ plan, onSelect, onGenerateAI }: DietPlanCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-glow transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              {plan.isAIGenerated && <Bot className="h-4 w-4 text-primary" />}
              {plan.name}
            </CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          <Badge className={getDifficultyColor(plan.difficulty)}>
            {plan.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {plan.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {plan.calories} cal/day
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Sample Meals:</h4>
          <div className="flex flex-wrap gap-2">
            {plan.meals.slice(0, 3).map((meal, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {meal}
              </Badge>
            ))}
            {plan.meals.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{plan.meals.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => onSelect(plan)} 
            variant="hero" 
            className="flex-1 group-hover:scale-105 transition-transform"
          >
            Select Plan
          </Button>
          {onGenerateAI && (
            <Button 
              onClick={onGenerateAI} 
              variant="accent" 
              size="icon"
              className="group-hover:scale-105 transition-transform"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};