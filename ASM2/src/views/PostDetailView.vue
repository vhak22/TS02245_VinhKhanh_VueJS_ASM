<template>
    <div class="container" style="padding-top: 120px;">
        <div v-if="post" class="form-glass">
            <h2 class="mb-3">{{ post.title }}</h2>
            <p class="text-white-50">Tác giả: {{ post.author }} | ❤️ {{ post.likes }}</p>
            <img :src="post.image" class="w-100 rounded mb-4" style="max-height: 400px; object-fit: cover;">
            <p class="lead">{{ post.content || post.desc }}</p>

            <hr class="my-5 border-secondary">

            <h4>Bình luận</h4>
            <div class="mb-3 d-flex">
                <input v-model="newComment" class="form-control me-2" placeholder="Viết bình luận...">
                <button class="btn btn-galaxy" @click="addComment">Gửi</button>
            </div>

            <div v-for="(cmt, idx) in post.comments" :key="idx"
                class="p-3 mb-2 rounded bg-dark border border-secondary">
                <strong>User:</strong> {{ cmt }}
            </div>
        </div>
        <div v-else class="text-center text-white">Loading...</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const newComment = ref('');

onMounted(() => {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    // Tìm bài viết theo ID trên URL (Lưu ý id trong URL là string nên cần ép kiểu)
    post.value = posts.find(p => p.id == route.params.id);
    if (post.value && !post.value.comments) post.value.comments = [];
});

const addComment = () => {
    if (!newComment.value) return;

    // Thêm comment vào RAM
    post.value.comments.push(newComment.value);

    // Lưu vào ổ cứng (LocalStorage)
    const posts = JSON.parse(localStorage.getItem('posts'));
    const index = posts.findIndex(p => p.id == post.value.id);
    posts[index] = post.value;
    localStorage.setItem('posts', JSON.stringify(posts));

    newComment.value = '';
};
</script>