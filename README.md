# Welcome to Chopify!

## Instructions on how to run Chopify on your computer:

Chopify is containerized using Docker, so you will need to have docker installed to run our web app.

**Step 1: Clone this repository**

You need to have a copy of our source code on your machine. You can download our project zip or clone the repository locally.

**Step 2: Install Docker**

Install the Docker Engine for your OS:

> https://docs.docker.com/desktop/
  https://docs.docker.com/engine/install/

**Step 3: Build and run the app**

Open your terminal, navigate to the project directory, and run the following commands:

> `docker compose build`
> `docker compose up`

**Step 4: Connect to database with pgAdmin**

Next, you have to add the initial recipe dataset to your local database. Follow these steps:

* Go to a browser and search
    >localhost:5050

* Login to pgAdmin with credentials
    - email: admin@email.com
    - password: password

* Under 'Quick Links', Click 'Add New Server'

* In the 'General' tab, enter into the 'Name' field:
    > Chopify

* Click the 'Connection' tab, and enter into the 'Host name/address' field:
    > postgres

* Ensure the 'Port' field says 5432

* Enter into the 'Password' field:
    > password

* Click 'Save' button

Now you should see 'Chopify' under 'Servers' toward the left of the screen. Double click on 'Chopify', then 'Databases', then 'recipes_db', then 'Schemas', then 'Tables'. You should be able to see the 3 tables: recipes, user_recipes_favorites, and users.

**Step 5: Add recipe data to database**

Now you have to run the provided Python script in the database directory, `generateDB.py`. To do this, follow these steps:

* Create a Python virtual environment by opening a terminal and navigating to the backend directory.

If on Mac: 

* Run:
    > `python3 -m venv .venv`
    > `source .venv/bin/activate`
    > `pip install -r requirements.txt`

* In the virtual environment, cd into the database directory
    > `cd ../database/`

* Run:
    > `python generateDB.py`

* Finally, run:
    > `deactivate`

If on Windows:

* Run:


Now your recipes database has the recipes data from the 'recipes.csv' file inside of the database directory.

**Step 6: Use the app!**

Now you can use our app by opening a browser and searching:

> localhost:5173

Create your account and enjoy!
You can browse recipes on our 'All Recipes' tab. You can click on any recipe card to view a recipe. Once viewing a recipe you like, you can favorite it by clicking on the heart icon. View your favorites on the 'Favorites' tab. You can also upload your own recipes under the 'Add a Recipe' tab.
