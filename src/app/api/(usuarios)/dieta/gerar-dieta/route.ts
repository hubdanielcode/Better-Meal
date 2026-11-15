import { DailyMealPlanProps, WeekDayProps } from "@/features/users/meals/types/mealPlan";
import { errorMessages } from "@/lib/server/helpers/errorMessages";
import { errorResponse } from "@/lib/server/helpers/errorResponse";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openAI = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const POST = async (request: NextRequest) => {
  try {
    const { dietType, calories, allergies, cuisine, snacks, days } = await request.json();

    /* - Gerando o prompt - */

    const myPrompt = `You're a professional nutritionist with more than 20 years of experience dealing with safe and balanced diety. 

Create a ${days} days meal plan for an individual following a specific ${dietType} diet aiming for ${calories} calories per day.

Allergies or restrictions: ${allergies || "none"}
Preferred Cuisine: ${cuisine || "none"}
Include snacks: ${snacks ? "yes" : "no"}


For each day, provide:

- Breakfast
- Lunch
- Dinner 
${snacks ? "- Snacks" : ""}

Use simple ingredients and provide brief instructions on how to prepare it. Include the approximated amount of callories of each meal.

Structure the response as a JSON object where each day is a key, and each meal (breakfast, lunch, dinner, snacks) is a sub-key.

Example:

Example:

{
  "Monday": {
    "Breakfast": {
      "Meal": "Oatmeal with fruits - 350 calories",
      "Instructions": "Cook the oatmeal with water or milk, add sliced bananas and honey"
    },
    "Lunch": {
      "Meal": "Grilled Chicken with potatoes and salad - 700 calories",
      "Instructions": "Grill the chicken for 6-7 minutes per side, boil or roast the potatoes, and toss the salad with olive oil and lemon"
    },
    "Dinner": {
      "Meal": "Steamed vegetables with quinoa - 600 calories",
      "Instructions": "Rinse the quinoa and simmer it in water for 15 minutes, steam the vegetables for 5-8 minutes and season with salt and herbs"
    },
    "Snacks": {
      "Meal": "Greek Yogurt - 150 calories",
      "Instructions": "Serve the yogurt plain or with a drizzle of honey"
    }
  },
  "Tuesday": {
    "Breakfast": {
      "Meal": "Smoothie bowl of cereals - 300 calories",
      "Instructions": "Blend frozen fruit with milk or yogurt until thick, pour into a bowl and top with cereal"
    }
  }
}

... and so on for each day.
}

Return only the JSON, with no commentaries and no backticks. Make sure there's no addtional text before OR after the response. If the user choses not to include snacks, don't include snacks field

Keep the JSON keys exactly in English: "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" for the days, and "Breakfast", "Lunch", "Dinner", "Snacks" for the meals.
Write only the values (the food descriptions, preparation instructions and calories) in Brazilian Portuguese (pt-BR).


`;

    const response = await openAI.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: myPrompt }],
      temperature: 0.7,
      max_tokens: 20000,
    });

    const aiContent = response.choices[0].message.content?.trim();

    if (!aiContent) {
      return errorResponse("mealDataError", 400, errorMessages.mealDataError);
    }

    let parsedMealPlan: Record<WeekDayProps, DailyMealPlanProps>;

    try {
      parsedMealPlan = JSON.parse(aiContent);
    } catch (parseError) {
      return errorResponse("mealDataError", 400, errorMessages.mealDataError);
    }

    if (typeof parsedMealPlan !== "object" || parsedMealPlan === null) {
      return errorResponse("mealDataError", 400, errorMessages.mealDataError);
    }

    return NextResponse.json({ mealPlan: parsedMealPlan });
  } catch (error) {
    return errorResponse("unexpectedError", 500, errorMessages.unexpectedError);
  }
};

export { POST };
