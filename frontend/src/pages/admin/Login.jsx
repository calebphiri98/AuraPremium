import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
  const { login, user } = useAuth(); // Access both login and the user state
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        // Retrieve the latest user info from the context or localStorage
        const storedUser = JSON.parse(localStorage.getItem('auth_user'));
        
        // Debugging: Check if user and role are being retrieved correctly
        console.log("Logged in user:", storedUser);
        
        // Conditional redirection based on role
        if (storedUser && storedUser.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          // Changed from '/pages/cart' to '/cart'
          // Ensure your route in App.js is set to path="/cart"
          navigate('/cart'); 
        }
      } else {
        setError('root', { message: 'Invalid authentication parameters provided.' });
      }
    } catch (err) {
      setError('root', { message: 'Connection timeout or critical network anomaly encountered.' });
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-lightBg flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-100 shadow-glass">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl mb-1.5 text-primary">Control Hub Identity Lock</h2>
          <p className="text-xs text-slate-400 font-sans">Provide valid enterprise verification parameters below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
          {errors.root && (
            <div className="p-3 bg-error/10 text-error rounded-xl text-xs font-semibold">{errors.root.message}</div>
          )}
          
          {/* Email Input */}
          <div>
            <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">Corporate Mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                defaultValue="email@gmail.com"
                {...register('email', { required: 'Corporate identifier signature required' })}
                className="w-full pl-10 pr-4 py-3 bg-lightBg border border-transparent rounded-xl text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all"
              />
            </div>
            {errors.email && <p className="text-[11px] text-error mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">Secret Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••••••"
                {...register('password', { required: 'Verification hash key string requested' })}
                className="w-full pl-10 pr-4 py-3 bg-lightBg border border-transparent rounded-xl text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all"
              />
            </div>
            {errors.password && <p className="text-[11px] text-error mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-white font-heading font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? 'Verifying Integrity...' : 'Authorize Credentials'}
          </button>

          <p className="text-center text-xs text-slate-400 mt-4">
            Need to establish administrative clearance?{' '}
            <Link to="/admin/SignUp" className="text-primary font-semibold hover:underline">
              Create Profile
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}