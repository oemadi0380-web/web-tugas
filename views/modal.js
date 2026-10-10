/* ============================================================
   VIEW: Modal Tambah / Edit Tugas
   Menyuntikkan markup ke placeholder #view-modal.
   ============================================================ */
(function () {
    var host = document.getElementById('view-modal');
    if (!host) return;

    host.innerHTML = `
        <!-- ================= MODAL TAMBAH / EDIT TUGAS ================= -->
        <div x-show="showModal" class="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" style="display: none;">
            <div @click.outside="showModal = false" class="bg-white w-full max-w-lg p-6 rounded-3xl shadow-2xl space-y-4">
                <div class="flex justify-between items-center pb-3 border-b border-slate-100">
                    <h3 class="font-bold text-slate-800 text-lg" x-text="editingId ? 'Edit Tugas' : 'Tambah Tugas Baru'"></h3>
                    <button @click="showModal = false" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
                </div>

                <form @submit.prevent="saveTask" class="space-y-4 text-xs">
                    <div>
                        <label class="block font-semibold text-slate-700 mb-1">Judul Tugas</label>
                        <input type="text" x-model="form.title" required placeholder="Contoh: Laporan Praktikum Web SPA" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block font-semibold text-slate-700 mb-1">Kategori</label>
                            <select x-model="form.category" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
                                <option value="Pribadi">Tugas Pribadi</option>
                                <option value="Kelompok">Tugas Kelompok</option>
                                <option value="Skripsi">Tugas Akhir / Skripsi</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-semibold text-slate-700 mb-1">Mata Kuliah / Topik</label>
                            <input type="text" x-model="form.course" required placeholder="Pemrograman Web" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block font-semibold text-slate-700 mb-1">Batas Waktu (Deadline)</label>
                            <input type="datetime-local" x-model="form.dueDate" required class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
                        </div>
                        <div>
                            <label class="block font-semibold text-slate-700 mb-1">Prioritas</label>
                            <select x-model="form.priority" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
                                <option value="Normal">Normal</option>
                                <option value="High">High (Penting)</option>
                                <option value="Urgent">Urgent (Mendesak)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block font-semibold text-slate-700 mb-1">Link Eksternal (Opsional: Zoom/Drive/LMS)</label>
                        <input type="url" x-model="form.link" placeholder="https://..." class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
                    </div>

                    <div>
                        <label class="block font-semibold text-slate-700 mb-1">Catatan Tambahan</label>
                        <textarea x-model="form.notes" rows="2" placeholder="Catatan kecil pengerjaan..." class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"></textarea>
                    </div>

                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" @click="showModal = false" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl">Batal</button>
                        <button type="submit" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20" x-text="editingId ? 'Perbarui Tugas' : 'Simpan Tugas'"></button>
                    </div>
                </form>
            </div>
        </div>
    `;
})();
