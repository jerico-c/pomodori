# PomoDory - Deep Sea Focus Timer

PomoDory is an immersive Pomodoro timer designed to enhance focus and productivity by creating a serene, distraction-free environment. It leverages a calming deep-sea aesthetic with a looping video background and ambient music to help you concentrate on your tasks.

## Features

  * **Classic Pomodoro Timer**: Implements the standard Pomodoro Technique with 25-minute focus sessions, 5-minute short breaks, and a 15-minute long break after four sessions.
  * **Immersive Video Background**: Features a full-screen, looping underwater video to create a tranquil workspace.
  * **Ambient Background Music**: Includes optional, looping background music to block out distractions and aid concentration.
  * **Simple & Intuitive Controls**: Clean and easy-to-use controls for starting/pausing the timer, resetting the session, and toggling the background music.
  * **Session Tracking**: Keeps a count of your completed focus sessions to track your progress.

## Tech Stack

  * **Framework**: [React](https://reactjs.org/)
  * **Build Tool**: [Vite](https://vitejs.dev/)
  * **Language**: [TypeScript](https://www.typescriptlang.org/)
  * **Styling**: [Tailwind CSS](https://tailwindcss.com/)
  * **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (leveraging Radix UI & Vaul)
  * **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

  * Node.js (v18 or later recommended)
  * npm or yarn

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/jerico-c/pomodori/
    cd pomodori
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Run the development server:**

    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:8080`.

## How to Use

The interface is designed to be straightforward:

  * **Play/Pause Button**: Starts or pauses the current timer.
  * **Reset Button**: Resets the current timer and session count.
  * **Music Button**: Toggles the ambient background music on or off.

### Customization

You can easily customize the background video and music:

1.  Place your desired `.mp4` video and `.mp3` audio files into the `public/` directory.
2.  Update the file paths in `src/pages/Index.tsx`:
      * Change the `src` in the `<video>` element for the background.
      * Update the path in `new Audio('/path-to-your-music.mp3')` for the music.

## License

This project is licensed under the MIT License.
