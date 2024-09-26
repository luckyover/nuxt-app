/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {

      colors: {
        // Configure your color palette here
        shadow:'#d9dee3',
        nav:'#697a8d',
        bg_layout:'rgba(255, 255, 255)',
        bgm:'#696cff',
        bgh:'#787bff',
        bod:'#f5f5f9',
        txw:'#fff',
        menu:'#384551',
        black:'#222',
        gray:{
          100:'#566a7f',
        },
        backdrop:'#22303e',

      },
      boxShadow:{
        ct:'0 1px 0 #d9dee3',
        'drop-down': '0 .25rem 1rem rgba(161, 172, 184, .45)',
        menu: '0 .125rem .375rem 0 rgba(34, 48, 62, .08)',
        'card': '0 .1875rem .5rem 0 rgba(34, 48, 62, .1)',
      },
      borderWidth:{
        '7':'7px',
      },
      screens: {
        md: '768px',
        lg: '1024px',
      },
      inset: {
        '3px': '15rem',
      },
      fontSize:{
        'ss':'12px',
        's3':'13px',
        's7':'17px',
        's5':'15px',
      },
      lineHeight: {
        'ss': '27px',
      },
      translate: {
        '-full-x': '-100%', // Custom translate value
        '3d': 'translate3d(0, 0, 0)',
      },
      fontFamily: {
        'public-sans': ['Public Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      gridTemplateColumns: {
        'product_card': '10% 1fr',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(#cad0ff, #e3e3e3)',
        'custom-gradient1': 'linear-gradient(135deg, hsla(233, 97%, 77%, 1) 0%, hsla(0, 0%, 89%, 1) 100%, hsla(278, 50%, 73%, 1) 100%)',
      },
    }
   
  },
  plugins: [],
}

