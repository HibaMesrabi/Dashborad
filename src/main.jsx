//  هذا ملف ريأكت الجافا سكربت و هو نقطة البداية لتطبيق يلي تربط الكود بالصفحة
// React  و تحميل المكونات الأساسية وتطبيق الأنماط العامة
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' //  بيشغل كل الألوان
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)