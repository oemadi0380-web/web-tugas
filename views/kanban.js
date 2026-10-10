/* ============================================================
   VIEW: Kanban Board (Status Pengerjaan)
   Menyuntikkan markup ke placeholder #view-kanban.
   ============================================================ */
(function () {
    var host = document.getElementById('view-kanban');
    if (!host) return;

    host.innerHTML = `
        <!-- ================= TAB 2: KANBAN BOARD ================= -->
        <div x-show="currentTab === 'kanban'" class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <!-- Kolom To Do -->
            <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[70vh]">
                <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span> To Do</h3>
                    <span class="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-lg" x-text="tasks.filter(t => t.status === 'To Do').length"></span>
                </div>
                <div class="flex-1 overflow-y-auto space-y-3 pr-1">
                    <template x-for="task in tasks.filter(t => t.status === 'To Do')" :key="task.id">
                        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-2">
                            <div class="flex justify-between items-start">
                                <span class="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded" x-text="task.category"></span>
                                <div class="flex items-center gap-2">
                                    <button @click="openEditModal(task)" title="Edit tugas" class="text-slate-400 hover:text-indigo-600 text-xs"><i class="fa-solid fa-pen"></i></button>
                                    <button @click="task.status = 'In Progress'; saveTasks()" title="Pindah ke In Progress" class="text-slate-400 hover:text-indigo-600 text-xs"><i class="fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                            <h4 class="font-bold text-slate-800 text-sm" x-text="task.title"></h4>
                            <p class="text-xs text-slate-400" x-text="task.course"></p>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Kolom In Progress -->
            <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[70vh]">
                <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> In Progress</h3>
                    <span class="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg" x-text="tasks.filter(t => t.status === 'In Progress').length"></span>
                </div>
                <div class="flex-1 overflow-y-auto space-y-3 pr-1">
                    <template x-for="task in tasks.filter(t => t.status === 'In Progress')" :key="task.id">
                        <div class="p-4 bg-amber-50/40 rounded-2xl border border-amber-200/50 space-y-2">
                            <div class="flex justify-between items-start">
                                <span class="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded" x-text="task.category"></span>
                                <div class="flex items-center gap-2">
                                    <button @click="openEditModal(task)" title="Edit tugas" class="text-slate-400 hover:text-indigo-600 text-xs"><i class="fa-solid fa-pen"></i></button>
                                    <button @click="task.status = 'Done'; saveTasks()" title="Tandai selesai" class="text-amber-600 hover:text-emerald-600 text-xs"><i class="fa-solid fa-check"></i> Selesai</button>
                                </div>
                            </div>
                            <h4 class="font-bold text-slate-800 text-sm" x-text="task.title"></h4>
                            <p class="text-xs text-slate-400" x-text="task.course"></p>
                        </div>
                    </template>
                </div>
            </div>

            <!-- Kolom Done -->
            <div class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[70vh]">
                <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 class="font-bold text-slate-800 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Done</h3>
                    <span class="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg" x-text="tasks.filter(t => t.status === 'Done').length"></span>
                </div>
                <div class="flex-1 overflow-y-auto space-y-3 pr-1">
                    <template x-for="task in tasks.filter(t => t.status === 'Done')" :key="task.id">
                        <div class="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100 space-y-2">
                            <div class="flex justify-between items-start">
                                <span class="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded" x-text="task.category"></span>
                                <div class="flex items-center gap-2">
                                    <button @click="openEditModal(task)" title="Edit tugas" class="text-slate-400 hover:text-indigo-600 text-xs"><i class="fa-solid fa-pen"></i></button>
                                    <button @click="task.status = 'To Do'; saveTasks()" title="Kembalikan ke To Do" class="text-slate-400 hover:text-slate-600 text-xs"><i class="fa-solid fa-rotate-left"></i></button>
                                </div>
                            </div>
                            <h4 class="font-bold text-slate-700 line-through text-sm" x-text="task.title"></h4>
                            <p class="text-xs text-slate-400" x-text="task.course"></p>
                        </div>
                    </template>
                </div>
            </div>

        </div>
    `;
})();
