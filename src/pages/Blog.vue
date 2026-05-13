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
      <Transition name="slide">
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
              @click="mobileMenuOpen = false"
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

    <section id="blog" class="snap-start min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Blog</span>
        </h2>
        <p :class="['text-center mb-12', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
          Thoughts, tutorials, and insights on web development
        </p>

        <div class="space-y-8">
          <article
            v-for="(article, index) in articles"
            :key="index"
            :class="[
              'p-6 sm:p-8 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1',
              isDark
                ? 'bg-[#181825] border-[#313244] hover:border-[#cba6f7]'
                : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#8839ef]'
            ]"
          >
            <div class="flex flex-col sm:flex-row sm:items-start gap-4">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <h3 :class="['text-xl sm:text-2xl font-bold', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">
                    {{ article.title }}
                  </h3>
                </div>
                <div :class="['flex flex-wrap items-center gap-4 text-sm mb-4', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ article.date }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ article.readTime }} min read
                  </span>
                </div>
                <p :class="['mb-4 leading-relaxed', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">
                  {{ article.summary }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tag, tagIndex) in article.tags"
                    :key="tagIndex"
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                      isDark
                        ? 'bg-[#313244] text-[#cba6f7]'
                        : 'bg-[#ccd0da] text-[#8839ef]'
                    ]"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div
                :class="[
                  'w-full sm:w-32 h-32 flex items-center justify-center rounded-lg shrink-0',
                  isDark ? 'bg-[#313244]' : 'bg-[#ccd0da]'
                ]"
              >
                <span class="text-5xl">{{ article.icon }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Article {
  title: string;
  date: string;
  summary: string;
  readTime: number;
  tags: string[];
  icon: string;
}

const isDark = ref<boolean>(true);
const displayText = ref<string>('');
const fullText: string = 'Stefano Bichicchi';
const typingIndex = ref<number>(0);
const mobileMenuOpen = ref<boolean>(false);

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Blog', href: '#blog' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const articles = ref<Article[]>([
  {
    title: 'Building Scalable Vue.js Applications with TypeScript',
    date: '2024-03-15',
    summary: 'A comprehensive guide on structuring large-scale Vue.js projects using TypeScript, composition API, and modern best practices for type safety and maintainability.',
    readTime: 8,
    tags: ['Vue.js', 'TypeScript', 'Architecture'],
    icon: '💻'
  },
  {
    title: 'The Art of CSS: Mastering Modern Layout Techniques',
    date: '2024-02-28',
    summary: 'Exploring the evolution of CSS layouts from floats to Grid and Flexbox. Learn how to create responsive, maintainable designs with modern CSS features.',
    readTime: 12,
    tags: ['CSS', 'Frontend', 'Design'],
    icon: '🎨'
  },
  {
    title: 'Understanding Node.js Event Loop Architecture',
    date: '2024-01-20',
    summary: 'Dive deep into Node.js event-driven architecture, the event loop phases, and how to write high-performance asynchronous code that scales.',
    readTime: 15,
    tags: ['Node.js', 'Performance', 'Backend'],
    icon: '🚀'
  },
  {
    title: 'State Management Patterns in Vue 3',
    date: '2024-01-05',
    summary: 'Compare Pinia vs Vuex for Vue 3 applications. Learn when to use each and how to structure your state management for optimal code organization.',
    readTime: 10,
    tags: ['Vue.js', 'State Management', 'Pinia'],
    icon: '📦'
  },
  {
    title: 'API Design Best Practices for RESTful Services',
    date: '2023-12-12',
    summary: 'Guidelines for designing intuitive, consistent, and scalable REST APIs. Covering versioning, error handling, authentication, and documentation strategies.',
    readTime: 11,
    tags: ['API', 'REST', 'Backend'],
    icon: '🔗'
  }
]);

const toggleTheme = (): void => {
  isDark.value = !isDark.value;
};

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const typeText = (): void => {
  if (typingIndex.value <= fullText.length) {
    displayText.value = fullText.slice(0, typingIndex.value);
    typingIndex.value++;
  }
};

onMounted(() => {
  document.documentElement.classList.add('dark');
  let typingInterval: number | null = null;
  setTimeout(() => {
    typingInterval = window.setInterval(typeText, 120);
  }, 500);
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
