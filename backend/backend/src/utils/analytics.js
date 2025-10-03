const Entry = require('../models/Entry');

class Analytics {
  static async calculateStreak(habitId) {
    const entries = await Entry.getByHabit(habitId);
    const completedEntries = entries
      .filter(e => e.completed)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (completedEntries.length === 0) return 0;

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of completedEntries) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      
      const dayDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24));

      if (dayDiff === streak || (streak === 0 && dayDiff <= 1)) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }

    return streak;
  }

  static async calculateCompletionRate(habitId, days = 30) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const entries = await Entry.getByHabit(habitId, startDate, endDate);
    const completed = entries.filter(e => e.completed).length;
    
    return {
      completed,
      total: days,
      rate: days > 0 ? (completed / days * 100).toFixed(1) : 0
    };
  }

  static async moodCorrelation(habitId) {
    const entries = await Entry.getByHabit(habitId);
    const withMood = entries.filter(e => e.mood && e.completed);

    if (withMood.length === 0) return null;

    const avgMood = withMood.reduce((sum, e) => sum + e.mood, 0) / withMood.length;
    
    return {
      averageMood: avgMood.toFixed(2),
      totalEntries: withMood.length,
      moodDistribution: {
        1: withMood.filter(e => e.mood === 1).length,
        2: withMood.filter(e => e.mood === 2).length,
        3: withMood.filter(e => e.mood === 3).length,
        4: withMood.filter(e => e.mood === 4).length,
        5: withMood.filter(e => e.mood === 5).length
      }
    };
  }

  static async getInsights(habitId) {
    const [streak, completion, mood] = await Promise.all([
      this.calculateStreak(habitId),
      this.calculateCompletionRate(habitId),
      this.moodCorrelation(habitId)
    ]);

    return { streak, completion, mood };
  }
}

module.exports = Analytics;