const db = require('../config/database');

class Habit {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM habits ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM habits WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  static create(habit) {
    return new Promise((resolve, reject) => {
      const { name, description, color, target_frequency } = habit;
      db.run(
        'INSERT INTO habits (name, description, color, target_frequency) VALUES (?, ?, ?, ?)',
        [name, description, color || '#3b82f6', target_frequency || 1],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...habit });
        }
      );
    });
  }

  static update(id, habit) {
    return new Promise((resolve, reject) => {
      const { name, description, color, target_frequency } = habit;
      db.run(
        'UPDATE habits SET name = ?, description = ?, color = ?, target_frequency = ? WHERE id = ?',
        [name, description, color, target_frequency, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, changes: this.changes });
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM habits WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = Habit;