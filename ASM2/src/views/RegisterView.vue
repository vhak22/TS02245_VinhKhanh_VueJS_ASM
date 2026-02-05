<template>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="form-glass text-center" style="width: 400px;">
            <h3 class="mb-4">Đăng Ký</h3>
            <input v-model="form.name" class="form-control mb-3" placeholder="Họ tên">
            <input v-model="form.email" class="form-control mb-3" placeholder="Email">
            <input v-model="form.password" type="password" class="form-control mb-3" placeholder="Mật khẩu">
            <button class="btn btn-galaxy w-100" @click="register">Đăng ký</button>
            <p class="mt-3 text-white-50">
                Đã có tài khoản? <router-link to="/login" class="text-info">Đăng nhập</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const form = reactive({ name: '', email: '', password: '', role: 'user' });
const router = useRouter();

const register = () => {
    if (!form.email || !form.password) return alert('Nhập đủ thông tin đi bạn ơi!');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ ...form });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký xong! Giờ đăng nhập nhé.');
    router.push('/login');
};
</script>