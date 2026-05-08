# Lexis AI — Dictionary Workstation

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Status: Production](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)](https://github.com/M-Affan01/AI-Dictionary)

> **Lexis AI** is an enterprise-grade linguistic workstation powered by artificial intelligence. It transcends traditional lexicography by offering deep etymological analysis, semantic mapping, and contextual usage insights through a high-fidelity, mission-critical dashboard.

---

## Project Overview

In an era of rapid information exchange, the depth of language often gets lost in superficial definitions. **Lexis AI** is designed to bridge the gap between simple word lookups and academic-level linguistic research. By leveraging high-speed **Groq LPU™ Inference Engine**, the workstation provides not just meanings, but the historical evolution (etymology), synonyms, antonyms, and complex sentence structures for any given term.

Whether you are a researcher, a developer, or a linguistics enthusiast, Lexis AI offers a "Command Center" experience for exploring the intricacies of human language.

---

## Core Features

### AI-Driven Intelligence
- **Deep Etymology**: Trace the roots of words across centuries and cultures.
- **Semantic Mapping**: Real-time generation of synonyms and antonyms with contextual relevance.
- **Ultra-Fast Synthesis**: Sub-second processing of linguistic data powered by Groq's Llama-3 models.

### Advanced Workstation Tools
- **Persistence Engine**: Integrated `localStorage` system for tracking Search History and Favorite terms.
- **Telemetry Dashboard**: A high-fidelity UI providing real-time feedback and state transitions.
- **Responsive Architecture**: Fully optimized for desktop, tablet, and mobile workflows.

---

## System Architecture

Lexis AI follows a strictly decoupled architecture to ensure scalability and maintainability.

```mermaid
graph TD
    A["User Interface (React)"] --> B["State Management"]
    B --> C["Local Persistence Engine"]
    B --> D["Service Layer (AI Connector)"]
    D --> E["Groq API"]
    C --> F[("Browser Storage")]
    A --> G["Theming Engine (CSS Variables)"]

    %% Styling for better visibility in both Light/Dark modes
    style A fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style B fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    style C fill:#ff9,stroke:#333,stroke-width:2px,color:#000
    style D fill:#bbf,stroke:#333,stroke-width:2px,color:#000
    style E fill:#f66,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#dfd,stroke:#333,stroke-width:2px,color:#000
    style G fill:#ffb3ba,stroke:#333,stroke-width:2px,color:#000
```

---

## Technical Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Frontend Framework** | React | 18.x |
| **Build Tool** | Vite | 5.x |
| **Language** | TypeScript | 5.x |
| **AI Integration** | Groq Cloud SDK | Latest |
| **Styling** | Vanilla CSS3 (Custom Variables) | - |
| **Icons** | Lucide React | Latest |

---

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A [Groq Cloud API Key](https://console.groq.com/keys)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/M-Affan01/AI-Dictionary.git
   cd AI-Dictionary
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_APP_URL=http://localhost:3000
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## Usage Guide

1. **Initialize Search**: Enter any word into the primary input field on the dashboard.
2. **Analyze Results**: Review the AI-synthesized definitions, etymology, and semantic relationships.
3. **Save to Favorites**: Click the "Heart" icon to persist important words for later review.
4. **Track History**: Access the "History" panel to see your recent linguistic explorations.

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

## Contact

**Affan Nexor**
- **Project Lead:** Muhammad Affan
- **GitHub**: [@M-Affan01](https://github.com/M-Affan01)




