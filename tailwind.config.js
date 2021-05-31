module.exports = {
  purge: ["./src/components/**/*.{js,jsx,ts,tsx}", "./src/pages/**/*.{js,jsx,ts,tsx}"],
  // Lo que verifica en purge, es que verifica en la carpeta de "components" y "pages" los archivos 
  // para ver sus clases de Tailwind CSS e incluirlas en el CSS
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
