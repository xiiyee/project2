<template>
  <section id="blog" class="snap-start min-h-screen py-20 px-4 sm:px-6 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">
        <span :class="isDark ? 'text-[#cba6f7]' : 'text-[#8839ef]'">Blog</span> & <span :class="isDark ? 'text-[#a6e3a1]' : 'text-[#40a02b]'">Articles</span>
      </h2>
      <p :class="['text-center mb-12', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">Thoughts, tutorials, and experiences</p>
      
      <div class="space-y-6">
        <article 
          v-for="(post, index) in posts" 
          :key="index"
          :class="[
            'p-6 rounded-xl border transition-all duration-300 transform hover:scale-102 hover:shadow-lg',
            isDark 
              ? 'bg-[#181825] border-[#313244] hover:border-[#cba6f7] hover:shadow-[#cba6f7]/10' 
              : 'bg-[#e6e9ef] border-[#ccd0da] hover:border-[#8839ef] hover:shadow-[#8839ef]/10'
          ]"
        >
          <h3 :class="['text-xl font-bold mb-2', isDark ? 'text-[#cdd6f4]' : 'text-[#4c4f69]']">
            {{ post.title }}
          </h3>
          
          <div class="flex flex-wrap items-center gap-4 mb-3">
            <span :class="['text-sm flex items-center gap-1', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ post.date }}
            </span>
            <span :class="['text-sm flex items-center gap-1', isDark ? 'text-[#a6adc8]' : 'text-[#6c6f85]']">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ post.readTime }}
            </span>
          </div>
          
          <p :class="['mb-4', isDark ? 'text-[#bac2de]' : 'text-[#5c5f77]']">
            {{ post.excerpt }}
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(tag, tagIndex) in post.tags" 
              :key="tagIndex"
              :class="[
                'px-3 py-1 rounded-full text-xs font-semibold',
                isDark 
                  ? 'bg-[#cba6f7]/20 text-[#cba6f7]' 
                  : 'bg-[#8839ef]/20 text-[#8839ef]'
              ]"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
}

const props = defineProps<{
  isDark: boolean;
}>();

const posts = ref<BlogPost[]>([
  {
    title: 'Building Modern Web Applications with Vue 3',
    date: 'May 15, 2024',
    readTime: '8 min read',
    excerpt: 'Exploring the latest features of Vue 3 including Composition API, Teleport, and Suspense. Learn how to build scalable applications with modern best practices.',
    tags: ['Vue.js', 'Frontend', 'Tutorial']
  },
  {
    title: 'Catppuccin: A Beautiful Color Palette for Your Projects',
    date: 'April 20, 2024',
    readTime: '5 min read',
    excerpt: 'Discover the Catppuccin color scheme and how to implement it in your applications. A soothing pastel theme that works perfectly for both dark and light modes.',
    tags: ['Design', 'UI/UX', 'Colors']
  },
  {
    title: 'TypeScript Best Practices for Large Scale Applications',
    date: 'March 10, 2024',
    readTime: '12 min read',
    excerpt: 'Learn essential TypeScript patterns and practices that will help you write maintainable, type-safe code for enterprise-level applications.',
    tags: ['TypeScript', 'Best Practices', 'Architecture']
  }
]);
</script>
