/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // 設定圖片背景 使用bg-site
      backgroundImage: {
        banner: "url('./assets/images/banner-bg.png')",
      },
    },
  },
  plugins: [require("daisyui")],
}

