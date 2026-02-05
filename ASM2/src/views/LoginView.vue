<template>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="form-glass text-center" style="width: 400px;">
            <h3 class="mb-4">Đăng Nhập</h3>
            <input v-model="email" class="form-control mb-3" placeholder="Email">
            <input v-model="password" type="password" class="form-control mb-3" placeholder="Mật khẩu">
            <button class="btn btn-galaxy w-100" @click="login">Đăng nhập</button>
            <p class="mt-3 text-white-50">
                Chưa có tài khoản? <router-link to="/register" class="text-info">Đăng ký</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Tìm user trong danh sách đã đăng ký
    const user = users.find(u => u.email === email.value && u.password === password.value);

    // Cheat code: Nếu chưa đăng ký ai thì cho login admin/123 luôn để test
    if ((email.value === 'admin@gmail.com' && password.value === '123') || user) {
        const currentUser = user || { name: 'Vinh Khanh but VIP', email: 'admin@gmail.com', role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Đăng nhập thành công!');
        window.location.href = '/'; // Reload để cập nhật Navbar
    } else {
        alert('Sai thông tin hoặc chưa đăng ký!');
    }
};
</script>