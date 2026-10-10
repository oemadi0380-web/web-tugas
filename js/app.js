/* ============================================================
   APP LOGIC — TaskSphere (Alpine.js component)
   Semua state & method aplikasi. Dipanggil dari index.html
   lewat directive x-data="taskApp()".
   ============================================================ */
function taskApp() {
    return {
        // ---- State ----
        currentTab: 'timeline',
        showModal: false,
        editingId: null,
        tasks: [],
        form: {
            title: '',
            category: 'Pribadi',
            course: '',
            dueDate: '',
            priority: 'Normal',
            link: '',
            notes: ''
        },

        // ---- Lifecycle ----
        init() {
            // Load data dari LocalStorage saat pertama kali buka
            const saved = localStorage.getItem('academic_tasks');
            if (saved) {
                this.tasks = JSON.parse(saved);
            } else {
                // Dummy data awal agar langsung terlihat cantik
                this.tasks = [
                    {
                        id: 1,
                        title: 'Implementasi Rest API ke Frontend SPA',
                        category: 'Pribadi',
                        course: 'Pemrograman Web',
                        dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
                        priority: 'Urgent',
                        status: 'In Progress',
                        link: 'https://github.com',
                        notes: 'Gunakan Fetch API murni.'
                    },
                    {
                        id: 2,
                        title: 'Diskusi Struktur Bab 3 Skripsi',
                        category: 'Skripsi',
                        course: 'Tugas Akhir / Skripsi',
                        dueDate: new Date(Date.now() + 259200000).toISOString().slice(0, 16),
                        priority: 'High',
                        status: 'To Do',
                        link: 'https://docs.google.com',
                        notes: 'Siapkan metodologi penelitian.'
                    }
                ];
                this.saveTasks();
            }
        },

        // ---- Modal: Tambah ----
        openModal() {
            this.editingId = null;
            this.form = { title: '', category: 'Pribadi', course: '', dueDate: '', priority: 'Normal', link: '', notes: '' };
            this.showModal = true;
        },

        // ---- Modal: Edit ----
        openEditModal(task) {
            // Isi form dengan data tugas yang dipilih & tandai mode edit
            this.editingId = task.id;
            this.form = {
                title: task.title,
                category: task.category,
                course: task.course,
                dueDate: task.dueDate,
                priority: task.priority,
                link: task.link || '',
                notes: task.notes || ''
            };
            this.showModal = true;
        },

        // ---- Simpan (tambah / perbarui) ----
        saveTask() {
            if (this.editingId) {
                // Mode edit: perbarui tugas yang ada tanpa mengubah id & status
                const task = this.tasks.find(t => t.id === this.editingId);
                if (task) {
                    Object.assign(task, this.form);
                }
            } else {
                // Mode tambah: buat tugas baru dengan status awal 'To Do'
                this.tasks.push({
                    id: Date.now(),
                    ...this.form,
                    status: 'To Do'
                });
            }
            this.saveTasks();
            this.showModal = false;
            this.editingId = null;
        },

        // ---- Hapus ----
        deleteTask(id) {
            if (confirm('Yakin ingin menghapus tugas ini?')) {
                this.tasks = this.tasks.filter(t => t.id !== id);
                this.saveTasks();
            }
        },

        // ---- Persistensi ----
        saveTasks() {
            localStorage.setItem('academic_tasks', JSON.stringify(this.tasks));
        },

        // ---- Computed ----
        get sortedTasks() {
            // Urutkan berdasarkan deadline terdekat
            return [...this.tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        },

        // ---- Helper ----
        formatDate(dateString) {
            if (!dateString) return '-';
            const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        },
        isUrgent(dateString) {
            const diff = new Date(dateString) - new Date();
            return diff > 0 && diff < 86400000; // Kurang dari 24 jam
        },
        exportData() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.tasks, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "academic_tasks_backup.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        }
    };
}
