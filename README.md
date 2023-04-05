# Project Title

This project is a web application that includes an automatic tweet generator and automatic translator powered by OpenAI's GPT-3 and GPT-3.5.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Pages](#pages)
- [Layouts](#layouts)
- [Plugins](#plugins)
- [Stores](#stores)
- [API Endpoints](#api-endpoints)
- [Data Files](#data-files)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

In this project, we recommend using pnpm instead of npm or yarn as your package manager. pnpm provides faster and more efficient package installation, as it uses a shared package store across all your projects. To install pnpm, simply run `npm install -g pnpm`. Once installed, you can use `pnpm` instead of `npm` or `yarn` for all your package management needs.

To install and run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `pnpm i` or `yarn install`.
3. Start the development server by running `pnpm run dev` or `yarn dev`.
4. Open your browser and navigate to `http://localhost:3000`.

## Usage

This web application allows users to generate tweets based on their preferences and to translate text from one language to another using OpenAI's GPT-3 and GPT-3.5. To use the application, follow these steps:

To use the OpenAI GPT API in this project, you need to set your API key as an environment variable. We recommend using a `.env` file to store your API key. To get started, copy the `.env.example` file and rename it to `.env`. Then, open the `.env` file and replace the `NUXT_CHATGPT_API_KEY` value with your own API key.

1. Navigate to the home page (`/`).
2. Click on the "Tweet Generator" or "Translate" button to go to the respective pages.
3. Enter the necessary information and click the "Generate" or "Translate" button to get the results.

## Examples of using API endpoints

// Endpoint URL
const endpointUrl = 'autweet.vercel.app/api/openai-tweet-generator';

// Sample payload for tweet generator
const tweetGeneratorPayload = {
  tweetCount: 5,
  topicsList: 'اعتراضات ژینا, اعتراضات مردم ایران, مهسا امینی',
  focusAreas: ['رژیم_اشغالگر_جمهوری_اسلامی'],
  inputSamples: '',
  language: 'fa',
  sentiments: 'NEGATIVE',
  tones: ['emotional', 'confrontational', 'contemplative', 'persuasive', 'critical'],
  userPreferences: ['فارسی']
};

// Sample payload for translation
const translationPayload = {
  prompt: "'تو یک مترجم هستی و متنی که وارد می‌شود را ترجمه می‌کنیTranslate this into 1. fa-ir, Just reponse with json: Reading Clinics offer one-on-one weekly tutoring to second and third-graders '"
};

// Sample usage for tweet generator
fetch(endpointUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(tweetGeneratorPayload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

// Sample usage for translation
fetch('autweet.vercel.app/api/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(translationPayload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

Please note that you'll need to replace the `endpointUrl` and `translationPayload` variables with your own values as appropriate. 

## Components

The `components` directory contains the following components:

- `FullScreenLoading.vue`: A component that displays a full-screen loading spinner.
- `TheHeader.vue`: A component that displays the header of the web application.
- `TheMain.vue`: A component that displays the main content of the web application.

## Pages

The `pages` directory contains the following pages:

- `index.vue`: The home page of the web application.
- `translate.vue`: The page that allows users to translate text.
- `tweet-gen.vue`: The page that allows users to generate tweets.

## Layouts

The `layouts` directory contains the `default.vue` layout, which is used as the default layout for all pages.

## Plugins

The `plugins` directory contains the `json-viewer.client.ts` plugin, which is used to display JSON data in a readable format.

## Stores

The `stores` directory contains the `user-info.ts` store, which is used to store and manage user information.

## API Endpoints

The `server/api` directory contains the following API endpoints:

- `focus-areas.get.ts`: Returns a list of focus areas.
- `language.get.ts`: Returns a list of languages.
- `openai-image.post.ts`: Accepts a request to generate an image using OpenAI's GPT-3.
- `openai-translate.post.ts`: Accepts a request to translate text using OpenAI's GPT-3.
- `openai-tweet-generator.post.ts`: Accepts a request to generate tweets using OpenAI's GPT-3.
- `tones.get.ts`: Returns a list of tones.
- `topics.get.ts`: Returns a list of topics.
- `user-preferences.get.ts`: Returns a list of user preferences.

## Data Files

The `public` directory contains several JSON data files that are used by the web application, including lists of focus areas, languages, sentiments, tones, topics, and user preferences.

## Technologies Used

This web application uses the following technologies:

- Nuxt.js
- Tailwind CSS
- TypeScript
- OpenAI GPT-3 and GPT-3.5

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.