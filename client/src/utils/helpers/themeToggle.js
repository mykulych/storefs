function ThemeToggle() {
  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.remove('bg-gray-50');
      document.documentElement.classList.add('bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      document.documentElement.classList.remove('bg-gray-900');
      document.documentElement.classList.add('bg-gray-50');
    }
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      document.documentElement.classList.remove('bg-gray-900');
      document.documentElement.classList.add('bg-gray-50');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.remove('bg-gray-50');
      document.documentElement.classList.add('bg-gray-900');
    }
  }
}

export default ThemeToggle;
