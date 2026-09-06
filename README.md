# 🚀 TradingView + MT5 Pro Trading Platform

**Ochiq kod forex trading ilovasi** - TradingView analiz + MT5 savdo quvvati + EA avtomatlashuvi bir joyda!

> **Nega bu ilovani ishlab chiqish kerak?**
> - TradingView'da analiz oson, lekin savdo noqulay
> - MT5'da savdo oson, lekin analiz judda noqulay
> - **Bu ilovada ikkalasi ham bir ekranda!** ✨

---

## 📱 Asosiy Xususiyatlar

✅ **Texnik Analiz**
- TradingView API integratsiyasi
- Candlestick chartlar
- 50+ indikatorlar (RSI, MACD, Bollinger, EMA va h.z.)
- Real-time narxlar

✅ **Savdo Bajarilishi**
- MT5 serveriga ulash
- Bozor + Limit buyurtmalari
- Stop Loss / Take Profit
- Risk management (xavf sozlamalari)

✅ **EA (Expert Advisors) - Avtomatlashuvi**
- Faol EA'larning statistikasi
- Performance tracking
- Avtomatik savdo qilish
- Kunlik/haftalik natijalar

✅ **Xavfsizlik**
- Demo/Live rejimi o'tkazish
- Global xavf sozlamalari
- Pozitsiyani avtomatik yopish
- Marja nazorati

✅ **Ochiq kod**
- Hammasi GitHub'da
- React + TypeScript + Python
- Docker support
- Chibli qoshish va o'zgartirish mumkin

---

## 🏗️ Loyiha Struktura

```
TradingView-MT5-Pro/
├── frontend/                 # React + TypeScript
│   ├── src/
│   │   ├── components/      # UI komponentlari (Sizning rasmlar bo'yicha)
│   │   ├── screens/         # Ekranlar (Home, Trade, Analysis, EA, Account)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API bilan ishlash
│   │   └── styles/          # Dark theme CSS
│   └── package.json
│
├── backend/                  # Python + FastAPI
│   ├── app/
│   │   ├── api/             # REST API endpoints
│   │   ├── mt5_broker/      # MT5 ulanishi
│   │   ├── tradingview/     # TradingView integratsiyasi
│   │   ├── models/          # Database modellari
│   │   └── services/        # Biznes logikasi
│   ├── requirements.txt
│   └── main.py
│
├── docker-compose.yml       # Docker setup
├── docs/                    # Dokumentatsiya
└── README.md
```

---

## 🚀 Tez Boshlash

### Frontend Yaratish
```bash
cd frontend
npm install
npm start
```

### Backend Yaratish
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Docker bilan
```bash
docker-compose up
```

---

## 📊 Ekranlar (Screenshots)

| Ekran | Nomi | Maqsadi |
|-------|------|--------|
| 1 | **Home/Dashboard** | Balans, P&L, Ochiq pozitsiyalar, Economic calendar |
| 2 | **Trade/Order** | Buyurtma berish, Lot hajmi, SL/TP, Xavf hisoblash |
| 3 | **Analysis/Charts** | TradingView chartkasi, Indikatorlar, BUY/SELL signallari |
| 4 | **EA Management** | Faol EA'lar, Statistika, Sozlamalar |
| 5 | **Account/Settings** | Profil, Demo/Live, Xavfsizlik |

---

## 🔧 Texnologiyalar

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **TradingView Charting Library** - Professional chartkalar
- **Tailwind CSS** - Dark theme styling
- **WebSocket** - Real-time ma'lumotlar

### Backend
- **Python 3.10+** - Server
- **FastAPI** - REST API
- **MT5-Python** - MetaQuotes ulanishi
- **PostgreSQL** - Database
- **Redis** - Caching

---

## 🤝 Hamkorlik (Contributing)

Bu **ochiq kod** proyekti! Siz:
- 🐛 Xatolarni topib belgi qo'shishingiz mumkin
- 💡 Yangi xususiyatlar taklif qilishingiz mumkin
- 🎨 UI/UX yaxshilanishlar qo'shishingiz mumkin
- 📚 Dokumentatsiyani yozishingiz mumkin

### Contributing Qadamlari:
1. Reponi fork qiling
2. Feature branch yaratish: `git checkout -b feature/yangi-xususiyat`
3. O'zgarishnomani commit qiling
4. Pull Request yuboring

---

## 📝 Litsenziya

MIT License - Bepul ishlatish, o'zgartirish va tarqatish mumkin

---

## 📞 Bog'lanish

- **Issues** - Xatolarni bildirishning eng yaxshi yo'li
- **Discussions** - Savollar va g'oyalar uchun
- **Pull Requests** - Kod yuboring!

---

## 🎯 Roadmap (Rejalar)

- [ ] Frontend - React UI komponentlari
- [ ] Backend - MT5 API integratsiyasi
- [ ] TradingView Charts integratsiyasi
- [ ] EA management sistema
- [ ] Risk management engine
- [ ] Mobile app (React Native)
- [ ] Multi-language support (uz, en, ru)
- [ ] WebSocket real-time updates
- [ ] Docker deployment

---

**Star ⭐ berish va follow qilish uchun rahmat!**

Happy Trading! 🚀📈
