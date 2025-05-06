const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'نام کاربری الزامی است'],
    minlength: [3, 'نام کاربری باید حداقل 3 کاراکتر باشد'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'لطفاً یک ایمیل معتبر وارد کنید']
  },
  password: { 
    type: String, 
    required: [true, 'رمز عبور الزامی است'],
    minlength: [6, 'رمز عبور باید حداقل 6 کاراکتر باشد']
  },
  phone: { 
    type: String,
    match: [/^09[0-9]{9}$/, 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد'],
    trim: true
  },
  address: { 
    type: String,
    trim: true
  },
  registration_date: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// اضافه کردن middleware برای لاگ کردن خطاها
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('این ایمیل قبلاً ثبت شده است'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);