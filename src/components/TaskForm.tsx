import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface TaskFormData {
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

const TaskForm: React.FC<TaskFormProps> = ({
  onSave,
  onCancel,
  initial,
  categories
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskFormData>({
    defaultValues: initial || {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      category: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSave)}>
      {/* عنوان المهمة */}
      <div>
        <label>{t('taskform.title')}*</label>
        <input
          {...register('title', {
            required: t('taskform.title_required'),
            maxLength: { value: 100, message: t('taskform.max_100') }
          })}
        />
        {errors.title && <small>{errors.title.message}</small>}
      </div>

      {/* وصف المهمة */}
      <div>
        <label>{t('taskform.description')}</label>
        <textarea
          rows={3}
          {...register('description', {
            maxLength: { value: 500, message: t('taskform.max_500') }
          })}
        />
        {errors.description && <small>{errors.description.message}</small>}
      </div>

      {/* تاريخ الانتهاء */}
      <div>
        <label>{t('taskform.due_date')}</label>
        <input
          type="date"
          {...register('dueDate', {
            validate: (val) => {
              if (!val) return true;
              const sel = new Date(val);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return (
                sel >= today || (t('taskform.date_past') as string)
              );
            }
          })}
        />
        {errors.dueDate && <small>{errors.dueDate.message}</small>}
      </div>

      {/* أولوية */}
      <div>
        <label>{t('taskform.priority')}*</label>
        <select {...register('priority', { required: true })}>
          <option value="Low">{t('taskform.low')}</option>
          <option value="Medium">{t('taskform.medium')}</option>
          <option value="High">{t('taskform.high')}</option>
        </select>
      </div>

      {/* فئة */}
      <div>
        <label>{t('taskform.category')}</label>
        <input
          list="categoryList"
          {...register('category', {
            maxLength: { value: 50, message: t('taskform.max_100') }
          })}
        />
        <datalist id="categoryList">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.category && <small>{errors.category.message}</small>}
      </div>

      {/* أزرار */}
      <div className="controls">
        <button type="submit">{t('taskform.save')}</button>
        <button
          type="button"
          className="secondary"
          onClick={onCancel}
        >
          {t('taskform.cancel')}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
