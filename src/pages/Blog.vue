<template>
  <div 
    :class="[
      'min-h-screen transition-colors duration-500',
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
            Stefano Bichicchi
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
            @click="$emit('toggle-theme')"
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
            @click="$emit('toggle-theme')"
            :class="[
              'p-2 rounded-lg transition-all duration-300',
              isDark ? 'hover:bg-[#313244]' : 'hover:bg-[#ccd0da]'
            ]"
          >
            <span class="text-xl">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
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

    <main class="pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
          <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">My</span> Blog
        </h1>
        <p :class="['text-lg', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
          Thoughts, learnings, and web development tutorials.
        </p>
      </div>

      <div class="space-y-8">
        <article 
          v-for="post in posts" 
          :key="post.id"
          :class="[
            'p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1',
            isDark 
              ? 'bg-[#181825] border-[#313244] hover:border-[#cba6f7]' 
              : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#8839ef]'
          ]"
        >
          <div class="flex flex-wrap items-center gap-4 text-sm mb-3" :class="isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]'">
            <time>{{ post.date }}</time>
            <span class="w-1 h-1 rounded-full bg-current"></span>
            <span>{{ post.readTime }} min read</span>
          </div>
          
          <h2 :class="['text-2xl font-bold mb-3', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">
            {{ post.title }}
          </h2>
          
          <p :class="['mb-6 line-clamp-3', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">
            {{ post.summary }}
          </p>
          
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  isDark 
                    ? 'bg-[#313244] text-[#89dceb]' 
                    : 'bg-[#ccd0da] text-[#04a5e5]'
                ]"
              >
                #{{ tag }}
              </span>
            </div>
            <a 
              href="#" 
              :class="[
                'font-semibold hover:underline flex items-center gap-1',
                isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'
              ]"
            >
              Read More
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  isDark: boolean;
}>();

defineEmits<{
  (e: 'toggle-theme'): void;
}>();

const mobileMenuOpen = ref(false);

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

interface BlogPost {
  id: number;
  title: string;
  date: string;
  summary: string;
  readTime: number;
  tags: string[];
}

const posts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'Building a Modern Portfolio with Vue 3 and Tailwind CSS',
    date: 'Oct 15, 2023',
    summary: 'Learn how to create a responsive and beautiful portfolio website using the latest features of Vue 3, Composition API, and Tailwind CSS. We will cover setting up the project, creating reusable components, and implementing a dark mode toggle using the Catppuccin color palette.',
    readTime: 5,
    tags: ['Vue.js', 'Tailwind CSS', 'Frontend']
  },
  {
    id: 2,
    title: 'Understanding TypeScript Generics',
    date: 'Sep 28, 2023',
    summary: 'Generics can be one of the most confusing features of TypeScript for beginners. In this article, we break down what generics are, why they are useful, and how to use them effectively in your everyday coding to write more reusable and type-safe code.',
    readTime: 8,
    tags: ['TypeScript', 'JavaScript', 'Web Dev']
  },
  {
    id: 3,
    title: '10 Tips for Better Code Review',
    date: 'Aug 10, 2023',
    summary: 'Code reviews are a crucial part of the software development lifecycle. They help catch bugs early, ensure code quality, and share knowledge among team members. Here are 10 actionable tips to make your code reviews more effective and less painful.',
    readTime: 6,
    tags: ['Career', 'Best Practices', 'Teamwork']
  }
]);
</script>
