<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
        <div class="container">
            <router-link class="navbar-brand fw-bold" to="/">🌌 Galaxy Blog</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item"><router-link class="nav-link" to="/">Trang chủ</router-link></li>

                    <li v-if="!user" class="nav-item"><router-link class="nav-link" to="/login">Đăng nhập</router-link>
                    </li>
                    <li v-if="!user" class="nav-item"><router-link class="nav-link" to="/register">Đăng ký</router-link>
                    </li>

                    <li v-if="user" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Xin chào, {{ user.name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end bg-dark">
                            <li><router-link class="dropdown-item text-light" to="/profile">Hồ sơ cá nhân</router-link>
                            </li>
                            <li v-if="user.role === 'admin'"><router-link class="dropdown-item text-light"
                                    to="/admin">Quản trị</router-link></li>
                            <li>
                                <hr class="dropdown-divider bg-secondary">
                            </li>
                            <li><a class="dropdown-item text-danger" href="#" @click="logout">Đăng xuất</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

// Kiểm tra trạng thái đăng nhập mỗi khi component load
onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('currentUser'));
});

// Hàm logout
const logout = () => {
    localStorage.removeItem('currentUser');
    user.value = null;
    router.push('/login').then(() => {
        window.location.reload(); // Reload để reset state sạch sẽ
    });
};
</script>