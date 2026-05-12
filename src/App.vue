<template>
  <div 
    :class="[
      'min-h-screen snap-y snap-mandatory overflow-y-scroll h-screen scroll-smooth transition-colors duration-500',
      isDark ? 'bg-[#1e1e2e] text-[#cdd6f4]' : 'bg-[#eff1f5] text-[#4c4f69]'
    ]"
  >
    <header 
      :class="[
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-500',
        isDark ? 'bg-[#1e1e2e]/90 border-[#313244]' : 'bg-[#eff1f5]/90 border-[#ccd0da]'
      ]"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-2xl">👨‍💻</span>
          <span :class="['text-xl font-bold', isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]']">
            {{ displayText }}
            <span :class="['animate-pulse', isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]']">|</span>
          </span>
        </div>
        <nav class="hidden md:flex items-center gap-6">
          <a 
            v-for="(item, index) in navItems" 
            :key="index"
            :href="item.href"
            :class="[
              'hover:transition-colors duration-300 font-medium',
              isDark ? 'text-[#bac2de] hover:text-[#cba6f7]' : 'text-[#5c5f77] hover:text-[#8839ef]'
            ]"
          >
            {{ item.label }}
          </a>
          <button 
            @click="toggleTheme"
            :class="[
              'p-2 rounded-lg transition-all duration-300 hover:scale-110',
              isDark ? 'hover:bg-[#313244]' : 'hover:bg-[#ccd0da]'
            ]"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <span class="text-xl">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
        </nav>
        <div class="flex items-center gap-2 md:hidden">
          <button 
            @click="toggleTheme"
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isDark ? 'hover:bg-[#313244]' : 'hover:bg-[#ccd0da]'
            ]"
          >
            <span class="text-xl">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
          <button 
            @click="toggleMobileMenu"
            :class="[
              'p-2 transition-colors',
              isDark ? 'text-[#cdd6f4] hover:text-[#cba6f7]' : 'text-[#4c4f69] hover:text-[#8839ef]'
            ]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <Transition
        name="slide"
        @before-enter="handleMobileMenuTransitionStart"
        @before-leave="handleMobileMenuTransitionStart"
        @after-enter="handleMobileMenuTransitionEnd"
        @after-leave="handleMobileMenuTransitionEnd"
        @enter-cancelled="handleMobileMenuTransitionEnd"
        @leave-cancelled="handleMobileMenuTransitionEnd"
      >
        <div 
          v-if="mobileMenuOpen" 
          :class="[
            'md:hidden border-t transition-colors duration-500',
            isDark ? 'bg-[#181825] border-[#313244]' : 'bg-[#e6e9ef] border-[#ccd0da]'
          ]"
        >
          <nav class="flex flex-col px-4 py-4 gap-4">
            <a 
              v-for="(item, index) in navItems" 
              :key="index"
              :href="item.href"
              @click="closeMobileMenu"
              :class="[
                'transition-colors duration-300 py-2',
                isDark ? 'text-[#bac2de] hover:text-[#cba6f7]' : 'text-[#5c5f77] hover:text-[#8839ef]'
              ]"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </Transition>
    </header>

    <!-- Home Section -->
    <section class="snap-start min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <span 
            class="text-7xl sm:text-8xl md:text-9xl inline-block cursor-pointer"
            :class="{ 'animate-bounce': isAnimating }"
            @click="triggerEmojiAnimation"
          >
            {{ currentEmoji }}
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Hi, I'm <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Stefano Bichicchi</span>
        </h1>
        <p :class="['text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">
          A passionate <span :class="isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]'">Full Stack Developer</span> & <span :class="isDark ? 'text-[#89dceb]' : 'text-[#04a5e5]'">UI/UX Enthusiast</span>
        </p>
        <p :class="['text-base sm:text-lg max-w-2xl mx-auto mb-10', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
          Crafting elegant digital experiences with modern technologies. 
          I love turning complex problems into simple, beautiful solutions.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#works" 
            :class="[
              'px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105',
              isDark 
                ? 'bg-[#cba6f7] text-[#1e1e2e] hover:bg-[#b4befe]' 
                : 'bg-[#8839ef] text-[#eff1f5] hover:bg-[#7287fd]'
            ]"
          >
            View My Work
          </a>
          <a 
            href="#skills" 
            :class="[
              'px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300',
              isDark 
                ? 'border-[#cba6f7] text-[#cba6f7] hover:bg-[#cba6f7]/10' 
                : 'border-[#8839ef] text-[#8839ef] hover:bg-[#8839ef]/10'
            ]"
          >
            My Skills
          </a>
        </div>
        <div class="mt-12 animate-bounce">
          <svg 
            :class="['w-8 h-8 mx-auto', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Works Section -->
    <section id="works" class="snap-start min-h-screen py-20 px-4 sm:px-6 overflow-y-auto">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Work</span> & <span :class="isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]'">Learning</span>
        </h2>
        <p :class="['text-center mb-12', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">My professional journey and education</p>
        
        <div class="relative">
          <div 
            :class="[
              'absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5',
              isDark ? 'bg-[#313244]' : 'bg-[#ccd0da]'
            ]"
          ></div>
          
          <div v-for="(item, index) in timeline" :key="index" class="relative mb-12">
            <div :class="['flex flex-col md:flex-row items-start', index % 2 === 0 ? 'md:flex-row-reverse' : '']">
              <div 
                class="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4"
                :class="[
                  item.type === 'work' 
                    ? (isDark ? 'bg-[#cba6f7] border-[#1e1e2e]' : 'bg-[#8839ef] border-[#eff1f5]')
                    : (isDark ? 'bg-[#a6e3a1] border-[#1e1e2e]' : 'bg-[#40a02b] border-[#eff1f5]')
                ]"
              ></div>
              
              <div :class="['ml-12 md:ml-0 md:w-1/2', index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right']">
                <div 
                  :class="[
                    'p-6 rounded-xl border transition-all duration-300 transform hover:scale-102',
                    isDark 
                      ? 'bg-[#181825] border-[#313244] hover:border-[#cba6f7]' 
                      : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#8839ef]'
                  ]"
                >
                  <span 
                    class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                    :class="[
                      item.type === 'work' 
                        ? (isDark ? 'bg-[#cba6f7]/20 text-[#cba6f7]' : 'bg-[#8839ef]/20 text-[#8839ef]')
                        : (isDark ? 'bg-[#a6e3a1]/20 text-[#a6e3a1]' : 'bg-[#40a02b]/20 text-[#40a02b]')
                    ]"
                  >
                    {{ item.type === 'work' ? '💼 Work' : '🎓 Education' }}
                  </span>
                  <h3 :class="['text-xl font-bold mb-1', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">{{ item.title }}</h3>
                  <p :class="['mb-2', isDark ? 'text-[#89dceb]' : 'text-[#04a5e5]']">{{ item.company }}</p>
                  <p :class="['text-sm mb-3', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">{{ item.period }}</p>
                  <p :class="['text-sm', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="snap-start min-h-screen py-20 px-4 sm:px-6 overflow-y-auto">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span :class="isDark ? 'text-[#89dceb]' : 'text-[#04a5e5]'">Languages</span> & <span :class="isDark ? 'text-[#fab387]' : 'text-[#fe640b]'">Tools</span>
        </h2>
        <p :class="['text-center mb-12', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">Technologies I work with</p>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          <div 
            v-for="(skill, index) in skills" 
            :key="index"
            :class="[
              'group p-4 sm:p-6 rounded-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex flex-col items-center gap-3',
              isDark 
                ? 'bg-[#181825] border-[#313244] hover:border-[#cba6f7] hover:shadow-[#cba6f7]/10' 
                : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#8839ef] hover:shadow-[#8839ef]/10'
            ]"
          >
            <span class="text-3xl sm:text-4xl">{{ skill.icon }}</span>
            <span :class="['font-medium text-sm sm:text-base text-center', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">{{ skill.name }}</span>
            <div 
              :class="[
                'w-full rounded-full h-1.5 mt-2',
                isDark ? 'bg-[#313244]' : 'bg-[#ccd0da]'
              ]"
            >
              <div 
                class="h-1.5 rounded-full transition-all duration-1000"
                :class="isDark ? skill.colorDark : skill.colorLight"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <h3 :class="['text-2xl font-bold text-center mt-16 mb-8', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">
          <span :class="isDark ? 'text-[#f38ba8]' : 'text-[#d20f39]'">Frameworks</span> & <span :class="isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]'">Libraries</span>
        </h3>
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
          <span 
            v-for="(framework, index) in frameworks" 
            :key="index"
            :class="[
              'px-4 py-2 sm:px-6 sm:py-3 border rounded-full cursor-default text-sm sm:text-base transition-all duration-300',
              isDark 
                ? 'bg-[#181825] border-[#313244] text-[#bac2de] hover:border-[#cba6f7] hover:text-[#cba6f7]' 
                : 'bg-[#e6e9ef] border-[#ccd0da] text-[#5c5f77] hover:border-[#8839ef] hover:text-[#8839ef]'
            ]"
          >
            {{ framework }}
          </span>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer 
      id="contact"
      :class="[
        'snap-start min-h-screen flex items-center px-4 sm:px-6 transition-colors duration-500',
        isDark ? 'bg-[#11111b]' : 'bg-[#dce0e8]'
      ]"
    >
      <div class="max-w-4xl mx-auto text-center w-full">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          Let's <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Connect</span>
        </h2>
        <p :class="['mb-12 max-w-xl mx-auto', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
          <a 
            v-for="(social, index) in socialLinks" 
            :key="index"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'group flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 border rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1',
              isDark 
                ? 'bg-[#1e1e2e] border-[#313244] hover:border-[#cba6f7]' 
                : 'bg-[#eff1f5] border-[#ccd0da] hover:border-[#8839ef]'
            ]"
          >
            <span class="text-2xl sm:text-3xl">{{ social.icon }}</span>
            <span 
              :class="[
                'transition-colors font-medium text-sm sm:text-base',
                isDark 
                  ? 'text-[#bac2de] group-hover:text-[#cba6f7]' 
                  : 'text-[#5c5f77] group-hover:text-[#8839ef]'
              ]"
            >
              {{ social.name }}
            </span>
            <svg 
              :class="[
                'w-4 h-4 transition-all duration-300',
                isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]',
                'opacity-0 group-hover:opacity-100 group-hover:animate-pulse'
              ]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        <div :class="['border-t pt-8', isDark ? 'border-[#313244]' : 'border-[#ccd0da]']">
          <p :class="['text-sm', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
            © {{ currentYear }} Stefano Bichicchi. Built with 💜 using Vue & Tailwind CSS
          </p>
          <p :class="['text-xs mt-2', isDark ? 'text-[#6c7086]' : 'text-[#9ca0b0]']">
            Theme: Catppuccin {{ isDark ? 'Mocha ☕' : 'Latte 🌸' }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface TimelineItem {
  type: 'work' | 'education';
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Skill {
  name: string;
  icon: string;
  level: number;
  colorDark: string;
  colorLight: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

const isDark = ref<boolean>(true);
const displayText = ref<string>('');
const fullText: string = 'Stefano Bichicchi';
const typingIndex = ref<number>(0);
const mobileMenuOpen = ref<boolean>(false);
const mobileMenuTransitioning = ref<boolean>(false);
const pendingMobileMenuState = ref<boolean | null>(null);
const currentYear = ref<number>(new Date().getFullYear());

const emojis: string[] = ['👨‍💻', '🚀', '💡', '🎯', '☕', '✨', '🔥', '💻'];
const currentEmoji = ref<string>(emojis[0]);
const isAnimating = ref<boolean>(false);
let emojiInterval: number | null = null;
let audioContext: AudioContext | null = null;

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const timeline: TimelineItem[] = [
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovators Inc.',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using Vue.js, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.'
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: '2020 - 2022',
    description: 'Built responsive user interfaces and improved user experience. Worked with Vue.js, TypeScript, and modern CSS frameworks.'
  },
  {
    type: 'education',
    title: "Master's in Computer Science",
    company: 'University of Technology',
    period: '2018 - 2020',
    description: 'Specialized in Web Technologies and Human-Computer Interaction. Graduated with honors.'
  },
  {
    type: 'work',
    title: 'Junior Developer',
    company: 'StartUp Hub',
    period: '2017 - 2018',
    description: 'Started my professional journey working on various web projects using JavaScript, PHP, and MySQL.'
  },
  {
    type: 'education',
    title: "Bachelor's in Software Engineering",
    company: 'Institute of Technology',
    period: '2013 - 2017',
    description: 'Foundation in programming, algorithms, and software development methodologies.'
  },
];

const skills: Skill[] = [
  { name: 'TypeScript', icon: '📘', level: 95, colorDark: 'bg-[#89dceb]', colorLight: 'bg-[#04a5e5]' },
  { name: 'JavaScript', icon: '🟨', level: 95, colorDark: 'bg-[#f9e2af]', colorLight: 'bg-[#df8e1d]' },
  { name: 'Vue.js', icon: '💚', level: 92, colorDark: 'bg-[#a6e3a1]', colorLight: 'bg-[#40a02b]' },
  { name: 'React', icon: '⚛️', level: 85, colorDark: 'bg-[#89dceb]', colorLight: 'bg-[#04a5e5]' },
  { name: 'Node.js', icon: '🟢', level: 88, colorDark: 'bg-[#a6e3a1]', colorLight: 'bg-[#40a02b]' },
  { name: 'Python', icon: '🐍', level: 82, colorDark: 'bg-[#cba6f7]', colorLight: 'bg-[#8839ef]' },
  { name: 'Go', icon: '🐹', level: 70, colorDark: 'bg-[#89dceb]', colorLight: 'bg-[#04a5e5]' },
  { name: 'Rust', icon: '🦀', level: 55, colorDark: 'bg-[#fab387]', colorLight: 'bg-[#fe640b]' },
  { name: 'HTML/CSS', icon: '🎨', level: 95, colorDark: 'bg-[#f38ba8]', colorLight: 'bg-[#d20f39]' },
  { name: 'Tailwind', icon: '🌊', level: 92, colorDark: 'bg-[#89dceb]', colorLight: 'bg-[#04a5e5]' },
  { name: 'PostgreSQL', icon: '🐘', level: 85, colorDark: 'bg-[#b4befe]', colorLight: 'bg-[#7287fd]' },
  { name: 'MongoDB', icon: '🍃', level: 80, colorDark: 'bg-[#a6e3a1]', colorLight: 'bg-[#40a02b]' },
  { name: 'Docker', icon: '🐳', level: 78, colorDark: 'bg-[#89dceb]', colorLight: 'bg-[#04a5e5]' },
  { name: 'Git', icon: '📚', level: 90, colorDark: 'bg-[#fab387]', colorLight: 'bg-[#fe640b]' },
  { name: 'AWS', icon: '☁️', level: 72, colorDark: 'bg-[#f9e2af]', colorLight: 'bg-[#df8e1d]' },
];

const frameworks: string[] = [
  'Nuxt.js', 'Next.js', 'Express.js', 'Fastify', 'Prisma', 'GraphQL',
  'REST API', 'WebSocket', 'Redis', 'Vite', 'Jest', 'Cypress',
  'Storybook', 'Figma', 'Linux', 'Nginx'
];

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
  { name: 'Email', icon: '📧', url: 'mailto:stefano@example.com' },
  { name: 'Dev.to', icon: '📝', url: 'https://dev.to' },
];

const toggleTheme = (): void => {
  isDark.value = !isDark.value;
};

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const playClickSound = (): void => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (e) {
    console.log('Audio not available');
  }
};

const typeText = (): void => {
  if (typingIndex.value <= fullText.length) {
    displayText.value = fullText.slice(0, typingIndex.value);
    if (typingIndex.value < fullText.length) {
      playClickSound();
    }
    typingIndex.value++;
  }
};

const triggerEmojiAnimation = (): void => {
  isAnimating.value = true;
  let emojiIndex = 0;
  const maxIterations = 15;
  let iteration = 0;
  
  if (emojiInterval) {
    clearInterval(emojiInterval);
  }
  
  emojiInterval = window.setInterval(() => {
    currentEmoji.value = emojis[emojiIndex % emojis.length];
    emojiIndex++;
    iteration++;
    
    if (iteration >= maxIterations) {
      if (emojiInterval) {
        clearInterval(emojiInterval);
      }
      currentEmoji.value = emojis[0];
      isAnimating.value = false;
    }
  }, 100);
};

const setMobileMenuState = (nextState: boolean): void => {
  if (mobileMenuTransitioning.value) {
    pendingMobileMenuState.value = nextState;
    return;
  }

  pendingMobileMenuState.value = null;
  mobileMenuOpen.value = nextState;
};

const toggleMobileMenu = (): void => {
  const currentTargetState = pendingMobileMenuState.value ?? mobileMenuOpen.value;
  setMobileMenuState(!currentTargetState);
};

const closeMobileMenu = (): void => {
  setMobileMenuState(false);
};

const handleMobileMenuTransitionStart = (): void => {
  mobileMenuTransitioning.value = true;
};

const handleMobileMenuTransitionEnd = (): void => {
  mobileMenuTransitioning.value = false;

  if (pendingMobileMenuState.value === null) {
    return;
  }

  const nextState = pendingMobileMenuState.value;
  pendingMobileMenuState.value = null;

  if (nextState !== mobileMenuOpen.value) {
    mobileMenuOpen.value = nextState;
  }
};

let typingInterval: number | null = null;

onMounted(() => {
  document.documentElement.classList.add('dark');
  
  setTimeout(() => {
    typingInterval = window.setInterval(typeText, 120);
  }, 500);
  
  setTimeout(triggerEmojiAnimation, 1000);
});

onUnmounted(() => {
  if (typingInterval) clearInterval(typingInterval);
  if (emojiInterval) clearInterval(emojiInterval);
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
}

.dark ::-webkit-scrollbar-track {
  background: #181825;
}

.dark ::-webkit-scrollbar-thumb {
  background: #313244;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #45475a;
}

:not(.dark)::-webkit-scrollbar-track {
  background: #e6e9ef;
}

:not(.dark)::-webkit-scrollbar-thumb {
  background: #ccd0da;
  border-radius: 4px;
}

:not(.dark)::-webkit-scrollbar-thumb:hover {
  background: #acb0be;
}

@supports not (scroll-snap-type: y mandatory) {
  html {
    scroll-behavior: smooth;
  }
}
</style>
