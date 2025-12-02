# Welcome to Chopify!

## Instructions on how to run Chopify on your computer:

Chopify is containerized using Docker, so you will need to have docker installed to run our web app.

**Step 1: Clone this repository**

You need to have a copy of our source code on your machine. You can download our project zip or clone the repository locally.

**Step 2: Install Docker**

Install the Docker Engine for your OS:

> https://docs.docker.com/desktop/
  https://docs.docker.com/engine/install/

**Step 3: Env file**

Copy or rename the file `./backend/sample.env` to `./backend/.env`

**Step 4: Build and run the app**

Open your terminal, navigate to the project directory, and run the following command:

> `docker-compose up --build`

**Step 5: Use the app!**

Now you can use our app by opening a browser and searching:

> localhost:5173

Create your account and enjoy!
You can browse recipes on our 'All Recipes' tab. You can click on any recipe card to view a recipe. Once viewing a recipe you like, you can favorite it by clicking on the heart icon. View your favorites on the 'Favorites' tab. You can also upload your own recipes under the 'Add a Recipe' tab.


## When finished, make sure to run in your terminal:

> `docker compose down`
