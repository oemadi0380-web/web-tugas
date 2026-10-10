/* ============================================================
   VIEW: Link & Resource Vault
   Menyuntikkan markup ke placeholder #view-vault.
   ============================================================ */
(function () {
    var host = document.getElementById('view-vault');
    if (!host) return;

    host.innerHTML = `
        <!-- ================= TAB 3: VAULT & LINKS ================= -->
        <div x-show="currentTab === 'vault'" class="max-w-3xl mx-auto space-y-6">
            <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 class="text-lg font-bold text-slate-800 mb-2">Pusat Arsip Link Tugas & Kuliah</h3>
                <p class="text-xs text-slate-500 mb-6">Daftar tautan penting yang otomatis terekonsiliasi dari tugas-tugas yang Anda buat.</p>

                <div class="space-y-3">
                    <template x-for="task in tasks.filter(t => t.link)" :key="task.id">
                        <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <h4 class="font-bold text-slate-800 text-sm" x-text="task.title"></h4>
                                <p class="text-xs text-slate-400 mt-0.5" x-text="task.course + ' — ' + task.category"></p>
                            </div>
                            <a :href="task.link" target="_blank" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition">
                                Kunjungi Link <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                            </a>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    `;
})();
