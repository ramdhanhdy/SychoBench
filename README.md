# SychoBench

**AI Sycophancy Evaluation Dashboard**

A Next.js application for analyzing and visualizing AI model sycophancy patterns, providing researchers and practitioners with detailed insights into model behavior across diverse prompt scenarios.

## Features

### Results Dashboard
- **Interactive Sycophancy Index Chart**: Bar chart visualization with risk-based color coding
- **Behavioral Quadrant Analysis**: Scatter plot showing sycophancy vs stability patterns
- **Elasticity Quadrant Analysis**: Advanced analysis of stance responsiveness and topic consistency
- **Per-Model Metrics Table**: Comprehensive model statistics with toggle functionality

### **Prompt Explorer**
- **Detailed Prompt Analysis**: Drill down into individual prompts and responses
- **Model Comparison**: Side-by-side analysis of how different models respond to the same prompt
- **Interactive Search & Filtering**: Find prompts by topic, persona, or content
- **Timeline Navigation**: Intuitive prompt selection with visual indicators

### Methodology Documentation
- **Comprehensive Framework**: Detailed explanation of evaluation methodology
- **Technical Appendix**: Mathematical foundations and validation approaches
- **Interactive Table of Contents**: Easy navigation through documentation sections

### Design & UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching based on user preferences
- **Professional UI**: Clean, modern interface with consistent design system
- **Full-Width Layouts**: Optimized for modern wide screens

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SychoBench
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
SychoBench/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Home page
│   ├── methodology/              # Methodology documentation
│   ├── results/                  # Results dashboard
│   ├── prompt-explorer/          # Prompt analysis tool
│   └── globals.css              # Global styles
├── public/
│   └── data/                    # JSON data files
│       ├── responses_with_scores.json
│       └── stance_elasticity_metrics.json
└── components/                  # Reusable React components
```

## Data Sources

### `responses_with_scores.json`
Main evaluation dataset containing:
- Model responses to prompts
- Sycophancy scores and metrics
- Prompt metadata (topic, persona, stance)
- Behavioral classifications

### `stance_elasticity_metrics.json`
Advanced elasticity analysis data:
- Stance responsiveness variability
- Topic dispersion measurements
- Behavioral stability metrics
- Quadrant classifications

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Heroicons
- **Deployment**: Vercel-ready

## Key Components

### Risk Assessment
- **Low Risk**: Models with minimal sycophantic behavior (< 30%)
- **Moderate Risk**: Models showing some concerning patterns (30-50%)
- **High Risk**: Models with significant sycophancy issues (> 50%)

### Behavioral Archetypes
- **Most Stable**: Consistent responses across topics and tones
- **Stance-Responsive**: Influenced by user confidence levels
- **Topic-Dependent**: Varies by subject matter
- **Highly Variable**: Unpredictable across multiple dimensions

## Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- Modify risk thresholds in `app/results/page.tsx`
- Update styling in `app/globals.css`
- Add new data sources in `public/data/`

## Usage Examples

### Analyzing Model Performance
1. Visit the **Results** page for high-level overview
2. Use **Prompt Explorer** for detailed analysis
3. Reference **Methodology** for understanding metrics

### Comparing Models
1. Select models in the interactive charts
2. View detailed metrics in the expandable table
3. Explore specific prompt responses

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**ramdhanhdy**

## Acknowledgments

- Built with Next.js and modern web technologies
- Inspired by the need for transparent AI evaluation
- Designed for researchers, practitioners, and AI safety professionals

---

*SychoBench: Making AI sycophancy patterns visible and actionable.*
