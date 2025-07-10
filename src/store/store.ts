// src/store/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Task = {
 id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  category: string;
  completed: boolean;
};


type TaskStore = {
  tasks: Task[];
  categories: string[];
  search: string;
  filterStatus: 'all' | 'complete' | 'incomplete';
  filterPriority: 'all' | 'Low' | 'Medium' | 'High';
  filterCategory: string;

  setSearch: (val: string) => void;
  setFilterStatus: (val: TaskStore['filterStatus']) => void;
  setFilterPriority: (val: TaskStore['filterPriority']) => void;
  setFilterCategory: (val: string) => void;

  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
updateTask: (id: string, updatedData: Partial<Task>) => void;
deleteTask: (id: string) => void;
toggleComplete: (id: string) => void;
};

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      categories: [],
      search: '',
      filterStatus: 'all',
      filterPriority: 'all',
      filterCategory: 'all',

      setSearch: (val) => set({ search: val }),
      setFilterStatus: (val) => set({ filterStatus: val }),
      setFilterPriority: (val) =>
set({ filterPriority: val }),
      setFilterCategory: (val) => set({ filterCategory: val }),

      addTask: (task) =>
        set((state) => {
          const newTask: Task = {
            id: Date.now().toString(),
            completed: false,
            ...task,
          };

          const updatedCategories = state.categories.includes(task.category)
            ? state.categories
            : [...state.categories, task.category];

          return {
            tasks: [newTask, ...state.tasks],
            categories: updatedCategories,
          };
        }),

      updateTask: (id, updatedData) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updatedData } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      toggleComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);

export default useTaskStore;