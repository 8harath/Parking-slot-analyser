# Contributing to Parking Slot Analyzer

Thank you for your interest in contributing to the Parking Slot Analyzer! This document provides guidelines and instructions for contributing to the project.

## 🎯 Project Vision

This project aims to provide an intelligent, user-friendly web application for parking lot management using computer vision. Contributions should align with:

- Clean, maintainable code
- Modern web development best practices
- Comprehensive documentation
- User-friendly interfaces
- Practical real-world applications

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** 18.0 or higher
- **pnpm** (preferred) or npm/yarn
- **Git** for version control
- Basic knowledge of React, Next.js, and TypeScript
- (Optional) Python 3.8+ for backend development

### Setting Up Your Development Environment

1. **Fork the repository**

   Visit [https://github.com/yourusername/Parking-slot-analyser](https://github.com/yourusername/Parking-slot-analyser) and click "Fork"

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Parking-slot-analyser.git
   cd Parking-slot-analyser
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000)

## 📝 Development Workflow

### 1. Code Style

We follow these conventions:

#### TypeScript/React
- Use TypeScript for all new files
- Follow ESLint rules (run `pnpm lint` before committing)
- Use functional components with hooks
- Prefer named exports over default exports (except for pages)
- Use descriptive variable and function names

#### Example:
```typescript
// Good
export function ParkingSlotCard({ slot, onSelect }: ParkingSlotCardProps) {
  const [isSelected, setIsSelected] = useState(false)
  // ...
}

// Avoid
export default function Card(props: any) {
  // ...
}
```

#### CSS/Styling
- Use Tailwind CSS utility classes
- Follow the existing retro aesthetic (amber/brown color scheme)
- Keep responsive design in mind (mobile-first approach)
- Use the existing spacing and sizing conventions

#### File Organization
```
app/
  ├── (pages)/           # Route pages
  ├── api/              # API routes
  └── globals.css       # Global styles

components/
  ├── ui/               # Reusable UI components
  └── [feature]/        # Feature-specific components

lib/
  └── utils.ts          # Utility functions

hooks/
  └── use-[name].tsx    # Custom React hooks
```

### 2. Commit Messages

Follow the conventional commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(analyzer): add real-time image upload
fix(ui): correct progress bar animation
docs(readme): update installation instructions
refactor(api): simplify analyze route logic
```

### 3. Pull Request Process

1. **Update your branch**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**

   ```bash
   pnpm build
   pnpm lint
   ```

3. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Build passes
- [ ] No lint errors

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

## 🐛 Reporting Bugs

### Before Submitting

1. Check existing [Issues](https://github.com/yourusername/Parking-slot-analyser/issues)
2. Verify you're using the latest version
3. Test with a clean installation

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10, macOS 13]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]

**Additional Context**
Any other relevant information
```

## 💡 Feature Requests

We welcome feature ideas! Please:

1. Check if the feature already exists or is planned
2. Open an issue with the label `enhancement`
3. Describe the feature and its benefits
4. Include examples or mockups if possible

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Proposed Solution**
How you envision the feature working

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Mockups, examples, or references
```

## 🏗️ Project Areas

Here are areas where contributions are especially welcome:

### High Priority
- [ ] Python backend integration (Flask/FastAPI)
- [ ] Real image upload functionality
- [ ] Unit and integration tests
- [ ] Accessibility improvements
- [ ] Performance optimizations

### Medium Priority
- [ ] Advanced analytics dashboard
- [ ] Custom parameter controls
- [ ] Export format options (PDF, JSON)
- [ ] Database integration
- [ ] User authentication

### Documentation
- [ ] Tutorial videos
- [ ] Code examples
- [ ] API documentation
- [ ] Architecture diagrams

## 🧪 Testing Guidelines

Currently, this project doesn't have a test suite, but we encourage:

1. **Manual testing**: Test all user flows
2. **Browser testing**: Test in Chrome, Firefox, Safari
3. **Responsive testing**: Test on mobile and tablet
4. **Build testing**: Ensure `pnpm build` succeeds

**Future**: We plan to add Jest and React Testing Library.

## 📚 Code Review Process

Pull requests are reviewed by project maintainers. We look for:

1. **Code quality**: Clean, readable, maintainable
2. **Functionality**: Works as described
3. **Documentation**: Code is well-commented
4. **Testing**: Changes are tested
5. **Style**: Follows project conventions

Reviews typically happen within 3-5 days. Be patient and responsive to feedback!

## 🎨 Design Guidelines

### Color Scheme (Retro Aesthetic)
- Primary: Amber (`amber-50` to `amber-900`)
- Accent: Green for success, Red for errors
- Background: `amber-50` (light beige)
- Text: `amber-900` (dark brown)
- Borders: `amber-800`

### Typography
- Font: Monospace (retro terminal style)
- Headings: Bold, uppercase
- Body: Regular weight

### Components
- Sharp corners and borders (not rounded)
- Box shadows with solid offsets (retro 3D effect)
- Consistent spacing using Tailwind scale

## 🤝 Community

- Be respectful and constructive
- Help others learn and grow
- Ask questions when unsure
- Share knowledge and resources

## 📜 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

## ❓ Questions?

If you have questions about contributing:

1. Check existing documentation
2. Open an issue with the `question` label
3. Reach out to maintainers

---

**Thank you for contributing to Parking Slot Analyzer! 🚗✨**

Your contributions help make parking management smarter and more efficient for everyone.
