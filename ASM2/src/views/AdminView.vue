<template>
    <div class="container" style="padding-top: 120px;">
        <div class="form-glass">
            <h3 class="mb-4">🛠 Quản lý bài viết (Admin)</h3>

            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <input v-model="form.title" class="form-control" placeholder="Tiêu đề bài viết">
                </div>
                <div class="col-md-6">
                    <input v-model="form.image" class="form-control" placeholder="Link ảnh (URL)">
                </div>
                <div class="col-12">
                    <input v-model="form.desc" class="form-control" placeholder="Mô tả ngắn">
                </div>
                <div class="col-12">
                    <textarea v-model="form.content" class="form-control" rows="3"
                        placeholder="Nội dung chi tiết"></textarea>
                </div>
                <div class="col-12">
                    <button class="btn btn-galaxy me-2" @click="savePost">{{ isEdit ? 'Cập nhật' : 'Thêm mới'
                        }}</button>
                    <button v-if="isEdit" class="btn btn-secondary" @click="resetForm">Hủy</button>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Likes</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in posts" :key="p.id">
                            <td>{{ p.title }}</td>
                            <td>{{ p.author }}</td>
                            <td>{{ p.likes }}</td>
                            <td>
                                <button class="btn btn-sm btn-warning me-2" @click="editPost(p)">Sửa</button>
                                <button class="btn btn-sm btn-danger" @click="deletePost(p.id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const posts = ref([]);
const isEdit = ref(false);
const form = reactive({ id: null, title: '', desc: '', content: '', image: '', likes: 0, author: 'Admin' });

// Load dữ liệu
onMounted(() => {
    posts.value = JSON.parse(localStorage.getItem('posts') || '[]');
});

// Lưu vào LocalStorage
const saveData = () => localStorage.setItem('posts', JSON.stringify(posts.value));

const savePost = () => {
    if (!form.title) return alert("Chưa nhập tiêu đề!");

    if (isEdit.value) {
        // Cập nhật
        const index = posts.value.findIndex(p => p.id === form.id);
        posts.value[index] = { ...form };
        isEdit.value = false;
    } else {
        // Thêm mới
        posts.value.push({ ...form, id: Date.now(), likes: 0, author: 'Admin' });
    }
    saveData();
    resetForm();
};

const deletePost = (id) => {
    if (confirm('Xóa bài này?')) {
        posts.value = posts.value.filter(p => p.id !== id);
        saveData();
    }
};

const editPost = (p) => {
    Object.assign(form, p);
    isEdit.value = true;
};

const resetForm = () => {
    Object.assign(form, { id: null, title: '', desc: '', content: '', image: '', likes: 0, author: 'Admin' });
    isEdit.value = false;
};
</script>