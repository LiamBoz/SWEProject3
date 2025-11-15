CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    recipe_name TEXT,
    prep_time TEXT,
    cook_time TEXT,
    total_time TEXT,
    servings INT,
    ingredients TEXT,
    directions TEXT,
    rating FLOAT,
    url TEXT,
    cuisine_path TEXT,
    nutrition TEXT,
    overview TEXT,
    img_src TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_recipes_favorites (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INT REFERENCES recipes(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, recipe_id)
);
