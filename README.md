# OpenAI AGI Role Play Game

This is a role-playing game that uses OpenAI's GPT-3.5-Turbo and DALL-E models to create a unique gaming experience. The game runs as a server, and the player can interact with the game by using postman or any other API client. Alternatively I'm developing a GUI for the game.

## Installation

To install the game, follow these steps:

1. Clone the git repository to your local machine. You can do this by opening a terminal and running the following command:

```bash
git clone https://github.com/nushankodikara/openAI-AGI-role-play-game
```

2. Rename the .env.example file to .env. You can do this by running the following command:

```bash
mv .env.example .env
```

3. Add your OpenAI API key to the .env file. Open the .env file in a text editor and replace YOUR_API_KEY_HERE with your actual API key.

```bash
OPENAI_API_KEY=YOUR_API_KEY_HERE
```

4. Install the necessary dependencies. Navigate to the root directory of the project in your terminal and run the following command:

```bash
npm install
```

This will install all of the dependencies listed in the package.json file.

After completing these steps, you should be ready to start the game by running the npm start command.

## To get an API key for OpenAI, follow these steps:

-   Go to the OpenAI [website](https://platform.openai.com/account/api-keys).
-   Click on the "Sign up" button in the top right corner.
-   Fill out the registration form and verify your email address.
-   Once you have verified your email, log in to your account.
-   Click on your username in the top right corner and select "Settings".
-   Under the "API Keys" section, click on "Generate New Key".
-   Copy the API key and paste it into the .env file in the cloned repository.

## Usage

To start the game, run the following command:

```bash
npm start
```

This will start the game server on port 3000. You can change the port by changing the PORT variable in the index.js file.

Goto [GUI Repository](https://github.com/nushankodikara/openAI-AGI-role-play-game-GUI) and follow the instructions to load the GUI.

## Contributing

If you would like to contribute to the project, feel free to submit a pull request with your changes. Before doing so, please read the CONTRIBUTING.md file for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
