<template>
    <div class="container" style="padding-top: 100px;">
        <div class="row">
            <div class="col-md-4 mb-4" v-for="blog in paginatedBlogs" :key="blog.id">
                <div class="card h-100 bg-transparent border border-secondary text-white blog-card">
                    <img :src="blog.image" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">
                            <router-link :to="'/post/' + blog.id" class="text-white text-decoration-none">
                                {{ blog.title }}
                            </router-link>
                        </h5>
                        <p class="card-text text-white-50 small">{{ blog.desc }}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="badge bg-secondary">{{ blog.author }}</span>
                            <button class="btn btn-sm btn-outline-light" @click="like(blog)">❤️ {{ blog.likes
                            }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nav v-if="totalPages > 1" class="d-flex justify-content-center mt-4 pb-5">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="goToPage(currentPage - 1)">
                        &laquo; Trước
                    </button>
                </li>

                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="goToPage(page)">
                        {{ page }}
                    </button>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="goToPage(currentPage + 1)">
                        Sau &raquo;
                    </button>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; // Nhớ thêm computed vào đây

const blogs = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6; // Số bài viết mỗi trang (6 bài cho đẹp đội hình)

const sampleData = [
    {
        id: 1,
        title: "Vẻ đẹp của Dải Ngân Hà",
        desc: "Những hình ảnh ngoạn mục về dải ngân hà trong vũ trụ bao la.",
        likes: 12,
        author: "Admin",
        image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
        content: "Dải Ngân Hà chứa hàng trăm tỷ ngôi sao..."
    },
    {
        id: 2,
        title: "Hố đen là gì?",
        desc: "Khám phá bí ẩn của hố đen – nơi ánh sáng cũng không thể thoát ra.",
        likes: 25,
        author: "NASA",
        image: "https://images.unsplash.com/photo-1450849608880-6f787542c88a",
        content: "Hố đen là một vùng trong không thời gian..."
    },
    {
        id: 3,
        title: "Sao Hỏa – Hành tinh đỏ",
        desc: "Khám phá hành tinh có khả năng con người sinh sống trong tương lai.",
        likes: 30,
        author: "SpaceX",
        image: "https://images.unsplash.com/photo-1580428180121-69f0cfa8e2f5",
        content: "Sao Hỏa là hành tinh thứ tư tính từ Mặt Trời..."
    },
    // --- 10 BÀI MỚI THÊM VÀO DƯỚI ĐÂY ---
    {
        id: 4,
        title: "Trạm Vũ trụ Quốc tế (ISS)",
        desc: "Cuộc sống của các phi hành gia trên trạm không gian như thế nào?",
        likes: 45,
        author: "ESA",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
        content: "ISS là một tổ hợp công trình nghiên cứu không gian..."
    },
    {
        id: 5,
        title: "Kính viễn vọng James Webb",
        desc: "Chiếc kính thiên văn mạnh nhất lịch sử nhân loại đã chụp được gì?",
        likes: 89,
        author: "NASA",
        image: "https://images.unsplash.com/photo-1614728853913-1e2221eb0e98",
        content: "James Webb giúp chúng ta nhìn về quá khứ của vũ trụ..."
    },
    {
        id: 6,
        title: "Bí ẩn Mặt Trăng",
        desc: "Những điều thú vị về vệ tinh tự nhiên duy nhất của Trái Đất.",
        likes: 20,
        author: "MoonLover",
        image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe",
        content: "Mặt Trăng ảnh hưởng đến thủy triều và sự sống..."
    },
    {
        id: 7,
        title: "Tinh vân Orion",
        desc: "Vườn ươm của các vì sao với màu sắc rực rỡ tuyệt đẹp.",
        likes: 67,
        author: "Hubble",
        image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413",
        content: "Tinh vân Orion nằm cách chúng ta 1.344 năm ánh sáng..."
    },
    {
        id: 8,
        title: "Du lịch vào không gian",
        desc: "Khi nào người bình thường có thể mua vé bay ra ngoài vũ trụ?",
        likes: 102,
        author: "Virgin Galactic",
        image: "https://images.unsplash.com/photo-1541873676-a18131494184",
        content: "Du lịch vũ trụ đang trở thành ngành công nghiệp tỷ đô..."
    },
    {
        id: 9,
        title: "Sự sống ngoài Trái Đất",
        desc: "Liệu chúng ta có cô đơn trong vũ trụ rộng lớn này không?",
        likes: 150,
        author: "Alien Hunter",
        image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae",
        content: "Các nhà khoa học vẫn đang tìm kiếm tín hiệu radio..."
    },
    {
        id: 10,
        title: "Nhật thực toàn phần",
        desc: "Khoảnh khắc kỳ diệu khi Mặt Trăng che khuất Mặt Trời.",
        likes: 55,
        author: "Science Daily",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        content: "Nhật thực là hiện tượng thiên văn thú vị..."
    },
    {
        id: 11,
        title: "Thiên hà Andromeda",
        desc: "Người hàng xóm khổng lồ đang lao về phía dải Ngân Hà.",
        likes: 41,
        author: "AstroPhysic",
        image: "https://images.unsplash.com/photo-1484589065579-248aad0d8b13",
        content: "Andromeda sẽ va chạm với Milky Way trong 4 tỷ năm nữa..."
    },
    {
        id: 12,
        title: "Cực quang",
        desc: "Vũ điệu ánh sáng tuyệt đẹp trên bầu trời Bắc cực.",
        likes: 78,
        author: "Traveler",
        image: "https://images.unsplash.com/photo-1483347752404-8fe709f4681c",
        content: "Cực quang sinh ra do tương tác của gió Mặt Trời..."
    },
    {
        id: 13,
        title: "Vệ tinh nhân tạo",
        desc: "Hàng nghìn vệ tinh đang bay quanh Trái Đất để phục vụ con người.",
        likes: 19,
        author: "TechSpace",
        image: "https://images.unsplash.com/photo-1516849841032-87cbac4d8831",
        content: "Starlink là dự án internet vệ tinh nổi tiếng..."
    }
];

onMounted(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
        blogs.value = JSON.parse(storedPosts);
    } else {
        blogs.value = sampleData;
        localStorage.setItem('posts', JSON.stringify(sampleData));
    }
});

const like = (blog) => {
    blog.likes++;
    localStorage.setItem('posts', JSON.stringify(blogs.value));
};

// --- LOGIC PHÂN TRANG (MỚI) ---

// 1. Tính tổng số trang
const totalPages = computed(() => Math.ceil(blogs.value.length / itemsPerPage));

// 2. Cắt danh sách bài viết theo trang hiện tại
const paginatedBlogs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return blogs.value.slice(start, end);
});

// 3. Hàm chuyển trang
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        // Cuộn lên đầu trang cho mượt
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
</script>

<style scoped>
.blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(127, 90, 240, 0.3);
    transition: 0.3s;
}

/* Custom Pagination Galaxy Style */
.pagination .page-link {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
}

.pagination .page-link:hover {
    background: rgba(127, 90, 240, 0.5);
    color: white;
}

.pagination .page-item.active .page-link {
    background: linear-gradient(135deg, #7f5af0, #00f5d4);
    border-color: transparent;
    color: white;
    box-shadow: 0 0 10px #7f5af0;
}

.pagination .page-item.disabled .page-link {
    background: rgba(255, 255, 255, 0.05);
    color: #666;
    pointer-events: none;
}
</style>