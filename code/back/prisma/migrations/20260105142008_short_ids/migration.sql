-- Fonction pour générer des IDs courts de 6 caractères
CREATE OR REPLACE FUNCTION generate_short_id() RETURNS TEXT AS $$
DECLARE
  chars TEXT := '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  result TEXT := '';
  i INTEGER := 0;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Migration des IDs par étapes (ordre important pour les FK)

-- 1. Users (pas de dépendances)
ALTER TABLE users ADD COLUMN new_id TEXT;
UPDATE users SET new_id = generate_short_id();
ALTER TABLE users DROP CONSTRAINT users_pkey;
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users RENAME COLUMN new_id TO id;
ALTER TABLE users ADD PRIMARY KEY (id);

-- 2. Rooms (pas de dépendances)
ALTER TABLE rooms ADD COLUMN new_id TEXT;
UPDATE rooms SET new_id = generate_short_id();

-- 3. Sensors (dépend de rooms)
ALTER TABLE sensors ADD COLUMN new_id TEXT;
ALTER TABLE sensors ADD COLUMN new_room_id TEXT;
UPDATE sensors SET new_id = generate_short_id();
UPDATE sensors s SET new_room_id = r.new_id FROM rooms r WHERE s."roomId" = r.id;

-- 4. SensorReadings (dépend de sensors)
ALTER TABLE sensor_readings ADD COLUMN new_id TEXT;
ALTER TABLE sensor_readings ADD COLUMN new_sensor_id TEXT;
UPDATE sensor_readings SET new_id = generate_short_id();
UPDATE sensor_readings sr SET new_sensor_id = s.new_id FROM sensors s WHERE sr."sensorId" = s.id;

-- 5. Appliquer les changements sur SensorReadings d'abord (dépendance la plus faible)
ALTER TABLE sensor_readings DROP CONSTRAINT IF EXISTS "sensor_readings_sensorId_fkey";
ALTER TABLE sensor_readings DROP CONSTRAINT IF EXISTS "sensor_readings_pkey";
ALTER TABLE sensor_readings DROP COLUMN IF EXISTS id;
ALTER TABLE sensor_readings DROP COLUMN IF EXISTS "sensorId";
ALTER TABLE sensor_readings RENAME COLUMN new_id TO id;
ALTER TABLE sensor_readings RENAME COLUMN new_sensor_id TO "sensorId";
ALTER TABLE sensor_readings ADD PRIMARY KEY (id);

-- 6. Appliquer les changements sur Sensors
ALTER TABLE sensors DROP CONSTRAINT IF EXISTS "sensors_pkey";
ALTER TABLE sensors DROP CONSTRAINT IF EXISTS "sensors_roomId_fkey";
ALTER TABLE sensors DROP COLUMN IF EXISTS id;
ALTER TABLE sensors DROP COLUMN IF EXISTS "roomId";
ALTER TABLE sensors RENAME COLUMN new_id TO id;
ALTER TABLE sensors RENAME COLUMN new_room_id TO "roomId";
ALTER TABLE sensors ADD PRIMARY KEY (id);

-- 7. Appliquer les changements sur Rooms (utiliser CASCADE pour éviter les dépendances)
ALTER TABLE rooms DROP CONSTRAINT IF EXISTS "rooms_pkey" CASCADE;
ALTER TABLE rooms DROP COLUMN IF EXISTS id;
ALTER TABLE rooms RENAME COLUMN new_id TO id;
ALTER TABLE rooms ADD PRIMARY KEY (id);

-- 8. Rétablir la contrainte sur sensors après rooms
ALTER TABLE sensors ADD CONSTRAINT sensors_roomId_fkey FOREIGN KEY ("roomId") REFERENCES rooms(id) ON DELETE CASCADE;

-- 8. Ajouter la contrainte étrangère sur sensor_readings après que sensors soit prêt
ALTER TABLE sensor_readings ADD CONSTRAINT sensor_readings_sensorId_fkey FOREIGN KEY ("sensorId") REFERENCES sensors(id) ON DELETE CASCADE;

-- Nettoyer la fonction
DROP FUNCTION generate_short_id();
