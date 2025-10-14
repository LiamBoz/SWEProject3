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