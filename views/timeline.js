/* ============================================================
   VIEW: Timeline Agenda & Deadline
   Menyuntikkan markup ke placeholder #view-timeline.
   Script ini dijalankan saat parsing (sebelum Alpine.js defer),
   sehingga Alpine menginisialisasi seluruh directive secara normal.
   ============================================================ */
(function () {
    var host = document.getElementById('view-timeline');
    if (!host) return;

    host.innerHTML = `
        <!-- ================= TAB 1: TIMELINE ================= -->
        <div x-show="currentTab === 'timeline'" class="space-y-6 max-w-4xl mx-auto">
            <!-- Banner Info -->
            <div class="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-600/10 flex justify-between items-center">
                <div>
                    <h3 class="text-xl font-bold">Fokus Timeline Akademik</h3>
                    <p class="text-indigo-100 text-xs mt-1">Seluruh agenda diurutkan berdasarkan batas waktu terdekat.</p>
                </div>
                <div class="text-right hidden sm:block">
                    <span class="block text-2xl font-bold" x-text="tasks.filter(t => t.status !== 'Done').length"></span>
                    <span class="text-xs text-indigo-200">Tugas Aktif</span>
                </div>
            </div>

            <!-- Timeline List -->
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <template x-if="sortedTasks.length === 0">
                    <div class="text-center py-12 text-slate-400">
                        <i class="fa-regular fa-folder-open text-4xl mb-2"></i>
                        <p class="text-sm">Belum ada tugas. Silakan tambahkan tugas baru!</p>
                    </div>
                </template>

                <div class="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                    <template x-for="task in sortedTasks" :key="task.id">
                        <div class="relative group">
                            <!-- Bullet indikator warna prioritas -->
                            <span :class="{
                                'bg-rose-500': task.priority === 'Urgent',
                                'bg-amber-500': task.priority === 'High',
                                'bg-indigo-500': task.priority === 'Normal'
                            }" class="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-4 border-white shadow"></span>

                            <div class="bg-slate-50/70 hover:bg-slate-50 p-5 rounded-2xl border border-slate-100 transition-all">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <div class="flex items-center gap-2">
                                        <span class="px-2.5 py-0.5 text-xs font-semibold rounded-lg" :class="{
                                            'bg-indigo-50 text-indigo-600': task.category === 'Pribadi',
                                            'bg-purple-50 text-purple-600': task.category === 'Kelompok',
                                            'bg-emerald-50 text-emerald-600': task.category === 'Skripsi'
                                        }" x-text="task.category"></span>
                                        <span class="text-xs text-slate-400 font-medium" x-text="task.course"></span>
                                    </div>
                                    <span class="text-xs font-bold" :class="isUrgent(task.dueDate) ? 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md' : 'text-slate-500'" x-text="'Deadline: ' + formatDate(task.dueDate)"></span>
                                </div>

                                <h4 class="font-bold text-slate-800 text-base" x-text="task.title"></h4>
                                <p class="text-xs text-slate-500 mt-1" x-text="task.notes || 'Tidak ada catatan tambahan.'"></p>

                                <!-- Link eksternal jika ada -->
                                <template x-if="task.link">
                                    <div class="mt-3">
                                        <a :href="task.link" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold rounded-xl transition">
                                            <i class="fa-solid fa-link"></i> Buka Link Referensi / Tugas
                                        </a>
                                    </div>
                                </template>

                                <!-- Aksi Cepat Selesai/Edit/Hapus -->
                                <div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                                    <div class="flex items-center gap-2">
                                        <span class="text-slate-500">Status:</span>
                                        <select x-model="task.status" @change="saveTasks()" class="bg-white border border-slate-200 rounded-lg px-2 py-1 font-medium text-slate-700 focus:outline-none focus:border-indigo-500">
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <button @click="openEditModal(task)" class="text-indigo-500 hover:text-indigo-700 font-medium transition">
                                            <i class="fa-solid fa-pen-to-square"></i> Edit
                                        </button>
                                        <button @click="deleteTask(task.id)" class="text-rose-500 hover:text-rose-700 font-medium transition">
                                            <i class="fa-solid fa-trash-can"></i> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    `;
})();
