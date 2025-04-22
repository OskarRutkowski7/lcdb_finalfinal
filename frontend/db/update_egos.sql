-- First, clear existing egos
TRUNCATE TABLE egos CASCADE;

-- Insert the correct egos
INSERT INTO egos (id, name, image, sin, damage, sinner, category, description) VALUES
(1, 'Don''t Fear The Reaper', '/dontfearthereaper.png', 'Wrath', 'Slash', 'Yi Sang', 'ALEPH', 'A manifestation of Yi Sang''s determination to face death without fear.'),
(2, 'Pale Rider', '/palerider.png', 'Wrath', 'Slash', 'Yi Sang', 'WAW', 'A manifestation of Yi Sang''s inner turmoil. This E.G.O. grants immense power at the cost of sanity.'),
(3, 'The Crimson Scar', '/crimsonscar.png', 'Lust', 'Pierce', 'Faust', 'WAW', 'A manifestation of Faust''s surgical precision and bloodthirsty nature.'),
(4, 'Windmill', '/windmill.png', 'Pride', 'Slash', 'Don Quixote', 'WAW', 'Don Quixote''s delusions manifest as a powerful weapon against imaginary giants.'),
(5, 'La Sangre', '/lasangre.png', 'Pride', 'Blunt', 'Don Quixote', 'ALEPH', 'The ultimate manifestation of Don Quixote''s chivalrous spirit.'),
(6, 'Bamboo Cutter', '/bamboocutter.png', 'Sloth', 'Slash', 'Ryōshū', 'WAW', 'A weapon that channels the ancient tale of the bamboo cutter and the moon princess.'),
(7, 'Moonlight', '/moonlight.png', 'Sloth', 'Pierce', 'Ryōshū', 'ALEPH', 'The pure essence of moonlight, crystallized into a deadly weapon.'),
(8, 'Sunshower', '/sunshower.png', 'Gluttony', 'Blunt', 'Meursault', 'WAW', 'A manifestation of the absurd contrast between light and darkness in Meursault''s soul.'),
(9, 'Stranger', '/stranger.png', 'Gluttony', 'Blunt', 'Meursault', 'ALEPH', 'The ultimate expression of Meursault''s detachment from humanity.');

-- Reset the sequence if needed
SELECT setval('egos_id_seq', (SELECT MAX(id) FROM egos)); 