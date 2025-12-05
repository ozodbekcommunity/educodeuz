-- Insert sample badges for motivation
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('Birinchi qadam', 'Birinchi darsni yakunlang', '🎯', '{"type": "complete_first_lesson"}'::jsonb),
  ('O''quvchi', '5 ta darsni yakunlang', '📚', '{"type": "complete_5_lessons"}'::jsonb),
  ('Bilimdon', '10 ta darsni yakunlang', '🎓', '{"type": "complete_10_lessons"}'::jsonb),
  ('Test ustasi', 'Birinchi testdan o''ting', '✅', '{"type": "pass_first_test"}'::jsonb),
  ('Dasturchi', 'Birinchi topshiriqni bajaring', '💻', '{"type": "complete_first_assignment"}'::jsonb),
  ('Kurs yakunlovchi', 'Birinchi kursni yakunlang', '🏆', '{"type": "complete_first_course"}'::jsonb),
  ('Mukammal ball', 'Testdan 100% ball oling', '⭐', '{"type": "perfect_test_score"}'::jsonb),
  ('Faol talaba', '3 kun ketma-ket o''rganing', '🔥', '{"type": "streak_3_days"}'::jsonb)
ON CONFLICT (name) DO NOTHING;