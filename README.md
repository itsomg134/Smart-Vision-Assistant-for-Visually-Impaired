# Smart-Vision-Assistant-for-Visually-Impaired

An IoT-powered assistive technology application that helps visually impaired people navigate their environment through AI-powered object detection, voice commands, and real-time audio feedback.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![IoT](https://img.shields.io/badge/IoT-Ready-green.svg)
![Accessibility](https://img.shields.io/badge/Accessibility-AAA-purple.svg)

## 🌟 Features

### Core Functionality
- **🎥 Real-time Environment Scanning** - Captures and analyzes surroundings using camera/sensors
- **🤖 AI-Powered Object Detection** - Identifies objects with position (left/center/right) and distance (near/medium/far)
- **🔊 Text-to-Speech Integration** - Automatically speaks detected objects and scene descriptions
- **🎤 Voice Command System** - Hands-free operation with natural language commands
- **📍 Spatial Awareness** - Provides detailed information about object locations relative to user
- **⚠️ Safety Alerts** - Warns about nearby obstacles and potential hazards

### Accessibility Features
- **100% Voice Navigable** - Complete hands-free operation
- **Audio-First Design** - All information delivered via speech synthesis
- **Large Touch Targets** - Easy-to-tap buttons for users with limited vision
- **High Contrast UI** - Visible interface for partially sighted users
- **Real-time Feedback** - Immediate audio confirmation of all actions

## 🎯 Use Cases

- **Indoor Navigation** - Safely navigate rooms, hallways, and buildings
- **Object Identification** - Identify furniture, doors, people, and everyday items
- **Obstacle Detection** - Avoid collisions with nearby objects
- **Scene Understanding** - Get contextual descriptions of surroundings
- **Independent Living** - Enhanced autonomy for daily activities

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser (Chrome, Edge, Safari recommended for voice features)
- Microphone access (for voice commands)
- Camera access (for object detection)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-vision-assistant.git

# Navigate to project directory
cd smart-vision-assistant

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
npm run build
```

## 📱 How to Use

### Basic Operation

1. **Activate Camera**
   - Tap the "Start Camera" button (green)
   - Wait for audio confirmation

2. **Scan Environment**
   - Tap the "Scan Now" button (blue)
   - System will analyze surroundings
   - Listen to spoken object descriptions

3. **Voice Commands**
   - Tap the "Voice" button (purple)
   - Speak one of the supported commands
   - System responds with audio feedback

### Voice Commands

| Command | Action |
|---------|--------|
| `"scan"` or `"look"` | Scan environment and detect objects |
| `"describe"` or `"what do you see"` | Repeat last scene description |
| `"start camera"` | Activate camera system |
| `"objects"` | Report number of detected objects |
| `"help"` | List all available commands |

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.x
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Speech Recognition**: Web Speech API
- **Text-to-Speech**: Speech Synthesis API
- **AI Integration**: Claude API (Anthropic)
- **Object Detection**: Computer Vision / ML Models

## 🔧 IoT Hardware Integration

This application can be deployed on various IoT platforms:

### Raspberry Pi Setup
```bash
# Install dependencies
sudo apt-get update
sudo apt-get install nodejs npm

# Enable camera
sudo raspi-config
# Navigate to Interface Options > Camera > Enable

# Clone and run application
git clone https://github.com/yourusername/smart-vision-assistant.git
cd smart-vision-assistant
npm install
npm start
```

### Supported Hardware
- **Raspberry Pi** (3B+, 4, 5) with Camera Module
- **Arduino** with ESP32-CAM
- **Jetson Nano** for advanced AI processing
- **Smartphones** (iOS/Android) via web app
- **Smart Glasses** (future integration)

## 📊 Object Detection Capabilities

The system can detect and classify:
- Furniture (chairs, tables, sofas)
- Structural elements (doors, windows, walls)
- People and animals
- Common household items (cups, books, plants)
- Potential obstacles and hazards

Each detection includes:
- **Object name** - What the item is
- **Position** - Left, center, or right relative to user
- **Distance** - Near (0-2m), medium (2-5m), or far (5m+)

## 🔐 Privacy & Security

- **Local Processing** - Object detection can run on-device
- **No Data Storage** - No personal data stored on servers
- **Camera Control** - User has complete control over camera activation
- **Optional Cloud** - AI features can work offline with local models

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution
- Additional object detection models
- Support for more languages
- Improved voice recognition accuracy
- Enhanced spatial audio feedback
- Mobile app development
- Hardware integration guides

## 📝 Roadmap

- [ ] Multi-language support (10+ languages)
- [ ] Offline mode with local AI models
- [ ] GPS integration for outdoor navigation
- [ ] Depth sensor support for accurate distance
- [ ] Haptic feedback for wearable devices
- [ ] Cloud sync for personalized settings
- [ ] Integration with smart home devices
- [ ] Machine learning model fine-tuning
- [ ] Mobile app (iOS & Android)
- [ ] API for third-party integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with accessibility-first principles
- Inspired by real needs of visually impaired community
- Uses open-source AI and computer vision technologies
- Special thanks to accessibility advocates and testers

## 📧 Author Contact detail 

- GitHub: [@itsomg134](https://github.com/itsomg134)
- Twitter: [@omgedam](https://x.com/its_om_g_143?t=8I7F1GBJO6jLU1AaoQLgYQ&s=09)
- Email: omgedam123098@gmail.com
- Portfolio: [ogworks.lovable.app](https://ogworks.lovable.app)  
- LinkedIn: [Om Gedam](https://www.linkedin.com/in/om-gedam-39686432a)

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/smart-vision-assistant?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/smart-vision-assistant?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/smart-vision-assistant?style=social)

---

**Made with ❤️ for the visually impaired community**

*Empowering independence through technology*
