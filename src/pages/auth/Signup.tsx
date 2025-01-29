import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, User } from 'lucide-react';

interface SignupForm {
  email: string;
  password: string;
  username: string;
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const onSubmit = async (data: SignupForm) => {
    try {
      await signUp(data.email, data.password, data.username);
      toast.success('تم إنشاء حسابك بنجاح!');
      navigate('/login');
    } catch (error) {
      toast.error('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
        إنشاء حساب جديد
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            اسم المستخدم
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              {...register('username', { 
                required: 'اسم المستخدم مطلوب',
                minLength: {
                  value: 3,
                  message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'
                }
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              dir="ltr"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'البريد الإلكتروني مطلوب',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'عنوان بريد إلكتروني غير صالح'
                }
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              dir="ltr"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            كلمة المرور
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'كلمة المرور مطلوبة',
                minLength: {
                  value: 8,
                  message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
                }
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              dir="ltr"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
