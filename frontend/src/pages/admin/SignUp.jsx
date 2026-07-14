import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User } from 'lucide-react';

export default function AdminRegister() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Explicitly passing 'user' here
      const success = await signup(data.name, data.email, data.password, 'user');
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('root', { message: 'Registration rejected. Email might already be in use.' });
      }
    } catch (err) {
      setError('root', { message: 'Connection timeout. Ensure backend port 5000 is active.' });
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-lightBg flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-100 shadow-glass">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl mb-1.5 text-primary">User Registration</h2>
          <p className="text-xs text-slate-400 font-sans">Establish a new user profile</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
          {errors.root && <div className="p-3 bg-error/10 text-error rounded-xl text-xs font-semibold">{errors.root.message}</div>}

          <div>
            <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" {...register('name', { required: 'Name is required' })} className="w-full pl-10 pr-4 py-3 bg-lightBg border border-transparent rounded-xl text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">Corporate Mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="email" {...register('email', { required: 'Email is required' })} className="w-full pl-10 pr-4 py-3 bg-lightBg border border-transparent rounded-xl text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">Secret Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="password" {...register('password', { required: 'Password is required' })} className="w-full pl-10 pr-4 py-3 bg-lightBg border border-transparent rounded-xl text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all" />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-primary text-white font-heading font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-98 disabled:opacity-50">
            {isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}