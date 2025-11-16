import type { SearchParams, Recommendation } from '../types';

export async function generateRecommendations(
  params: SearchParams,
  userPreferences: { likes: string[]; dislikes: string[] }
): Promise<Recommendation[]> {
  const { placeType, cuisine, activity, budget, partySize, location } = params;

  const recommendations: Recommendation[] = [
    {
      name: `The Cozy Corner ${cuisine || 'Bistro'}`,
      description: `A charming local spot perfect for ${partySize || 2} people. Known for its ${cuisine || 'diverse menu'} and welcoming atmosphere.`,
      estimatedCost: budget ? budget * 0.8 : 25,
      address: `123 Main St, ${location || 'Your Area'}`,
      rating: 4.5,
      category: placeType || cuisine || 'restaurant',
      whyRecommended: `Matches your budget and preferences for ${cuisine || activity || 'great food'}. Popular with locals.`,
    },
    {
      name: `${activity || placeType || 'Adventure'} Hub`,
      description: `An exciting venue offering ${activity || placeType || 'various activities'}. Great for groups of ${partySize || 'any size'}.`,
      estimatedCost: budget ? budget * 0.9 : 30,
      address: `456 Park Ave, ${location || 'Your Area'}`,
      rating: 4.7,
      category: activity || placeType || 'entertainment',
      whyRecommended: `Perfect match for your interests in ${activity || 'having a good time'}. Well within your budget.`,
    },
    {
      name: `${location || 'Local'} Favorites`,
      description: `A hidden gem that offers ${cuisine || activity || 'something special'}. Ideal for ${partySize || 2}-person outings.`,
      estimatedCost: budget ? budget * 1.0 : 35,
      address: `789 Oak Rd, ${location || 'Your Area'}`,
      rating: 4.8,
      category: cuisine || activity || 'experience',
      whyRecommended: `Highly rated by people with similar tastes. Fits your budget of $${budget || 30}/person perfectly.`,
    },
  ];

  return recommendations.filter(rec => {
    const matchesBudget = !budget || rec.estimatedCost <= budget;
    const notDisliked = !userPreferences.dislikes.some(dislike =>
      rec.name.toLowerCase().includes(dislike.toLowerCase()) ||
      rec.category.toLowerCase().includes(dislike.toLowerCase())
    );
    return matchesBudget && notDisliked;
  });
}

export async function processSearchQuery(query: string): Promise<Partial<SearchParams>> {
  const lowerQuery = query.toLowerCase();

  const params: Partial<SearchParams> = {};

  if (lowerQuery.includes('restaurant') || lowerQuery.includes('eat') || lowerQuery.includes('food')) {
    params.placeType = 'restaurant';
  }
  if (lowerQuery.includes('bar') || lowerQuery.includes('drink')) {
    params.placeType = 'bar';
  }
  if (lowerQuery.includes('movie') || lowerQuery.includes('cinema')) {
    params.activity = 'movies';
  }
  if (lowerQuery.includes('park') || lowerQuery.includes('outdoor')) {
    params.activity = 'outdoor';
  }

  const cuisineKeywords = ['italian', 'chinese', 'mexican', 'japanese', 'thai', 'indian', 'french', 'american', 'pizza', 'sushi'];
  for (const cuisine of cuisineKeywords) {
    if (lowerQuery.includes(cuisine)) {
      params.cuisine = cuisine;
      break;
    }
  }

  const budgetMatch = lowerQuery.match(/\$(\d+)/);
  if (budgetMatch) {
    params.budget = parseInt(budgetMatch[1]);
  }

  const peopleMatch = lowerQuery.match(/(\d+)\s*(people|person)/);
  if (peopleMatch) {
    params.partySize = parseInt(peopleMatch[1]);
  }

  return params;
}
