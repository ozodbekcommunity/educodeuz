-- Insert sample badges for motivation
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('Birinchi qadam', 'Birinchi darsni yakunlang', '🎯', 'complete_first_lesson'),
  ('O''quvchi', '5 ta darsni yakunlang', '📚', 'complete_5_lessons'),
  ('Bilimdon', '10 ta darsni yakunlang', '🎓', 'complete_10_lessons'),
  ('Test ustasi', 'Birinchi testdan o''ting', '✅', 'pass_first_test'),
  ('Dasturchi', 'Birinchi topshiriqni bajaring', '💻', 'complete_first_assignment'),
  ('Kurs yakunlovchi', 'Birinchi kursni yakunlang', '🏆', 'complete_first_course'),
  ('Mukammal ball', 'Testdan 100% ball oling', '⭐', 'perfect_test_score'),
  ('Faol talaba', '3 kun ketma-ket o''rganing', '🔥', 'streak_3_days')
ON CONFLICT (name) DO NOTHING;