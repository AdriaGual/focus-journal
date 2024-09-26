# Focus Journal 📒

## Overview

This is a personal journal application that allows users to log daily productivity, mood, tasks, things they are grateful for, and lessons learned. It offers a clean and user-friendly interface to help users reflect on their daily activities.
![image](https://github.com/user-attachments/assets/46f2d713-d026-4e1e-acbb-79c9d5aa56a4)


## Features

- **Daily Log**: Users can record their productivity and mood on a scale from 0 to 10.
- **Agenda**: Users can create tasks for the day and mark them as completed.
- **Gratitude Section**: Users can note down what they are grateful for each day.
- **Learning Section**: Users can reflect on what they've learned.
- **Quotes**: Random quotes to inspire users daily.

## Technologies Used

- **React Native**: For building mobile user interfaces.
- **Expo**: For an easier development and deployment process.
- **Context API**: For state management across components.
- **TypeScript**: For type safety and better developer experience.

## Installation

To get started with the app, follow these steps:

1. **Clone the repository**:

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the app**:
    ```bash
    npx expo start
    ```

4. **Open the Expo app** on your mobile device and scan the QR code to see the app in action.

## Code Structure

- **`src/components`**: Contains reusable components such as `ThemedText` and `ThemedView`.
- **`src/constants`**: Holds constants such as quotes used in the app.
- **`src/providers`**: Contains the `AppProvider` for context API.
- **`src/styles`**: Defines global styles used throughout the app.

## Usage

- **Logging Productivity & Mood**: Enter a value between 0-10 for both productivity and mood.
- **Managing Tasks**: Users can add tasks for the day and toggle their completion status using a switch.
- **Gratitude and Learning**: Input your thoughts in the provided text areas.
