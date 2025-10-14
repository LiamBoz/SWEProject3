import psycopg2
import pandas as pd

connection = psycopg2.connect(database='recipes_db',
                        user='admin', 
                        password='password', 
                        host='localhost', 
                        port='5432'
                        )

connection.autocommit = True
cursor = connection.cursor()

# Read csv with pandas from the backend container in docker
df = pd.read_csv('recipes.csv', index_col=0)
for _, row in df.iterrows():
    cursor.execute('''
        INSERT INTO recipes (
            recipe_name, prep_time, cook_time, total_time, servings,
            ingredients, directions, rating, url, cuisine_path,
            nutrition, overview, img_src
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', (
        row['recipe_name'],
        row['prep_time'],
        row['cook_time'],
        row['total_time'],
        int(row['servings']) if pd.notnull(row['servings']) else None,
        row['ingredients'],
        row['directions'],
        float(row['rating']) if pd.notnull(row['rating']) else None,
        row['url'],
        row['cuisine_path'],
        row['nutrition'],
        row['timing'],
        row['img_src']
    ))

connection.commit()
connection.close()
