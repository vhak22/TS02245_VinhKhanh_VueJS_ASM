<template>
    <div class="container d-flex justify-content-center align-items-center"
        style="min-height: 85vh; padding-top: 80px;">
        <div class="form-glass w-100" style="max-width: 600px;">
            <h3 class="text-center mb-4">👤 Hồ sơ cá nhân</h3>

            <div v-if="currentUser">
                <div class="mb-3">
                    <label class="form-label">Họ và tên</label>
                    <input v-model="currentUser.name" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input v-model="currentUser.email" class="form-control" disabled title="Không thể đổi email">
                </div>
                <div class="mb-3">
                    <label class="form-label">Mật khẩu mới</label>
                    <input v-model="currentUser.password" type="password" class="form-control">
                </div>

                <div class="d-grid gap-2">
                    <button class="btn btn-galaxy" @click="updateProfile">Cập nhật thông tin</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentUser = ref(null);

onMounted(() => {
    currentUser.value = JSON.parse(localStorage.getItem('currentUser'));
});

const updateProfile = () => {
    // 1. Cập nhật currentUser trong localStorage (phiên đăng nhập hiện tại)
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value));

    // 2. Cập nhật trong danh sách "users" (database giả)
    // Lưu ý: Logic này giả định user login từ danh sách users đã đăng ký. 
    // Nếu ông chỉ dùng currentUser đơn giản thì bước 1 là đủ. 
    // Nhưng để chuẩn "học bá", ta cập nhật cả db gốc.
    let allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const index = allUsers.findIndex(u => u.email === currentUser.value.email);
    if (index !== -1) {
        allUsers[index] = currentUser.value;
        localStorage.setItem('users', JSON.stringify(allUsers));
    }

    alert("Cập nhật hồ sơ thành công!");
};
</script>