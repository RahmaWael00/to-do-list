import React, { JSX } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Task as StoreTask } from '../store/store';



interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High'; 
  category: string;
}


interface TaskFormProps {
  onSave: SubmitHandler<TaskFormData>; 
  onCancel: () => void; 
  initial?: TaskFormData;
  categories: string[]; 
}

function TaskForm({ onSave, onCancel, initial, categories }: TaskFormProps): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: initial || {
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      category: ""
    }
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div>
        <label>Title*</label>
        <input
          {...register("title", {
            required: "Title is required",
            maxLength: { value: 100, message: "Max 100 characters" }
          })}
        />
        {errors.title && <small style={{ color: "red" }}>{errors.title.message}</small>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          rows={3}
{...register("description", {
            maxLength: { value: 500, message: "Max 500 characters" }
          })}
        />
        {errors.description && <small style={{ color: "red" }}>{errors.description.message}</small>}
      </div>

      <div>
  <label>Due Date</label>
  <input
    type="date"
    {...register("dueDate", {
      validate: (val) => {
        if (!val) return true;
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today || "Date cannot be in the past";
      }
    })}
  />
  {errors.dueDate && <small style={{ color: "red" }}>{errors.dueDate.message}</small>}
</div>


      <div>
        <label>Priority*</label>
        <select {...register("priority", { required: true })}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label>Category</label>
        <input
          list="categoryList"
          {...register("category", {
            maxLength: { value: 50, message: "Max 50 characters" }
          })}
        />
        <datalist id="categoryList">
          {categories.map(c => <option key={c} value={c} />)}
        </datalist>
        {errors.category && <small style={{ color: "red" }}>{errors.category.message}</small>}
      </div>

      <div className="controls">
        <button type="submit">Save</button>
        <button type="button" className="secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export type Task = Omit<StoreTask, 'id' | 'completed'>;
export default TaskForm;


