import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HERO_IMG = "https://cdn.poehali.dev/projects/59a77d35-74b4-458e-91d2-40d6aa4eb16a/files/15c7557c-98cd-4d5b-b8b6-1c5d1f19a03f.jpg";
const CATALOG_IMG = "https://cdn.poehali.dev/projects/59a77d35-74b4-458e-91d2-40d6aa4eb16a/files/65abdd64-224a-4e7b-ab73-a69ff04b8ca4.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "loyalty", label: "Лояльность" },
  { id: "about", label: "О нас" },
  { id: "delivery", label: "Доставка" },
  { id: "contacts", label: "Контакты" },
];

const PRODUCTS = [
  { id: 1, name: "Лосось атлантический", weight: "1 кг", price: 890, badge: "Хит", emoji: "🐟" },
  { id: 2, name: "Тигровые креветки", weight: "500 г", price: 650, badge: "Свежее", emoji: "🦐" },
  { id: 3, name: "Устрицы Fine de Claire", weight: "6 шт", price: 1200, badge: "Премиум", emoji: "🦪" },
  { id: 4, name: "Краб камчатский", weight: "1 кг", price: 2400, badge: "Деликатес", emoji: "🦀" },
  { id: 5, name: "Мидии в ракушках", weight: "1 кг", price: 380, badge: "", emoji: "🐚" },
  { id: 6, name: "Осьминог", weight: "1 кг", price: 760, badge: "Новинка", emoji: "🐙" },
];

const BONUS_TIERS = [
  { name: "Морская звезда", min: 0, max: 500, color: "#22c5e8", percent: 3, icon: "⭐" },
  { name: "Дельфин", min: 500, max: 2000, color: "#10a876", percent: 5, icon: "🐬" },
  { name: "Кит", min: 2000, max: 5000, color: "#0d7fa8", percent: 8, icon: "🐋" },
  { name: "Нептун", min: 5000, max: 99999, color: "#0a4a6e", percent: 12, icon: "🔱" },
];

const DELIVERY_ZONES = [
  { zone: "Центр города", time: "1–2 часа", price: "Бесплатно от 1 500 ₽" },
  { zone: "Пригород (до 20 км)", time: "2–3 часа", price: "Бесплатно от 3 000 ₽" },
  { zone: "Дальние районы", time: "3–4 часа", price: "от 300 ₽" },
  { zone: "Самовывоз", time: "Любое время", price: "Бесплатно" },
];

const FAQ = [
  { q: "Как начисляются бонусы?", a: "1 бонус = 1 рубль. Начисляем с каждой покупки в соответствии с вашим уровнем лояльности. Бонусы можно тратить начиная с суммы заказа от 500 ₽." },
  { q: "Срок хранения бонусов?", a: "Бонусные баллы действительны 12 месяцев с момента начисления. После этого они сгорают, если не была совершена ни одна покупка." },
  { q: "Как перейти на следующий уровень?", a: "Уровень обновляется автоматически после того, как сумма ваших покупок превысит порог следующего уровня." },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bonusPoints] = useState(1240);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentTierIdx = BONUS_TIERS.findIndex(t => bonusPoints >= t.min && bonusPoints < t.max);
  const currentTier = BONUS_TIERS[currentTierIdx >= 0 ? currentTierIdx : 0];
  const nextTier = BONUS_TIERS[currentTierIdx + 1];
  const progress = nextTier
    ? ((bonusPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#e3f4f8]">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 ocean-gradient shadow-lg shadow-[#0a4a6e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
              <span className="text-2xl animate-float">🌊</span>
              <span className="font-['Oswald'] text-xl font-bold text-white tracking-wider">
                РЫБОВЫЕ <span className="text-[#12cf91]">ВОЛОГДА</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link text-white/90 hover:text-white text-sm font-medium transition-colors ${activeSection === item.id ? "active text-white" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={() => scrollTo("loyalty")}
                size="sm"
                className="bg-[#12cf91] hover:bg-[#10a876] text-white font-semibold border-0"
              >
                <Icon name="Star" size={14} />
                <span className="ml-1">{bonusPoints} бонусов</span>
              </Button>
              <Button size="sm" className="bg-white/15 hover:bg-white/25 text-white border-0">
                <Icon name="ShoppingCart" size={14} />
              </Button>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden border-t border-white/20 py-3 space-y-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center ocean-gradient wave-bottom overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#12cf91]/10 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 rounded-full bg-[#22c5e8]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-[#12cf91]/20 text-[#12cf91] border-[#12cf91]/30 mb-4 animate-fade-up">
              🌊 Прямо с океана
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up-d1">
              СВЕЖИЕ<br />
              <span className="text-gradient">МОРЕ&shy;ПРОДУКТЫ</span><br />
              С ДОСТАВКОЙ
            </h1>
            <p className="text-white/75 text-lg mb-8 leading-relaxed animate-fade-up-d2">
              Рыба, креветки, устрицы и деликатесы — доставляем за 1–2 часа. Каждый день свежая поставка прямо от поставщиков.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-d3">
              <Button
                onClick={() => scrollTo("catalog")}
                size="lg"
                className="bg-[#12cf91] hover:bg-[#10a876] text-white font-bold text-base px-8 border-0 shadow-lg shadow-[#12cf91]/30"
              >
                <Icon name="ShoppingBag" size={18} />
                <span className="ml-2">Смотреть каталог</span>
              </Button>
              <Button
                onClick={() => scrollTo("delivery")}
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/15 hover:text-white text-base"
              >
                <Icon name="Truck" size={18} />
                <span className="ml-2">Условия доставки</span>
              </Button>
            </div>
            <div className="flex gap-8 mt-12 animate-fade-up-d3">
              {[
                { val: "500+", label: "позиций" },
                { val: "2 ч", label: "доставка" },
                { val: "4.9★", label: "рейтинг" },
              ].map(s => (
                <div key={s.val}>
                  <div className="text-2xl font-bold text-[#12cf91] font-['Oswald']">{s.val}</div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden md:block animate-fade-up-d2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0a4a6e]/50 border border-white/20">
              <img src={HERO_IMG} alt="Свежие морепродукты" className="w-full h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a4a6e]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🦐</span>
                  <div>
                    <div className="text-white font-semibold">Тигровые креветки</div>
                    <div className="text-[#12cf91] text-sm">Свежая поставка сегодня</div>
                  </div>
                  <div className="ml-auto text-white font-bold font-['Oswald'] text-xl">650 ₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-[#e3f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-[#0d7fa8]/15 text-[#0d7fa8] border-[#0d7fa8]/30 mb-3">Ассортимент</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a4a6e] mb-4">КАТАЛОГ ТОВАРОВ</h2>
            <p className="text-[#0d7fa8]/80 max-w-xl mx-auto">Ежедневная поставка свежих морепродуктов от проверенных поставщиков</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Все", "Рыба", "Креветки", "Моллюски", "Деликатесы"].map(cat => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "Все"
                    ? "bg-[#0d7fa8] text-white shadow-md"
                    : "bg-white text-[#0d7fa8] border border-[#0d7fa8]/30 hover:border-[#0d7fa8] hover:bg-[#0d7fa8]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {PRODUCTS.map(p => (
              <div key={p.id} className="product-card bg-white rounded-2xl overflow-hidden shadow-md border border-[#22c5e8]/20">
                <div className="h-40 bg-gradient-to-br from-[#0d7fa8]/10 to-[#10a876]/10 flex items-center justify-center relative">
                  <span className="text-6xl">{p.emoji}</span>
                  {p.badge && (
                    <Badge className="absolute top-3 right-3 bg-[#12cf91] text-white border-0 text-xs">{p.badge}</Badge>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0a4a6e] text-lg mb-1">{p.name}</h3>
                  <p className="text-[#0d7fa8]/60 text-sm mb-4">{p.weight}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#0a4a6e] font-['Oswald']">{p.price} ₽</span>
                    <Button size="sm" className="bg-[#0d7fa8] hover:bg-[#0a4a6e] text-white border-0">
                      <Icon name="Plus" size={14} />
                      <span className="ml-1">В корзину</span>
                    </Button>
                  </div>
                  <p className="text-[#12cf91] text-xs mt-2 flex items-center gap-1">
                    <Icon name="Star" size={11} />
                    +{Math.round(p.price * 0.03)} бонуса за покупку
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="border-[#0d7fa8] text-[#0d7fa8] hover:bg-[#0d7fa8] hover:text-white">
              <Icon name="Grid3x3" size={16} />
              <span className="ml-2">Смотреть все 500+ позиций</span>
            </Button>
          </div>
        </div>
      </section>

      {/* LOYALTY */}
      <section id="loyalty" className="py-20 ocean-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#12cf91]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#22c5e8]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-white/15 text-white border-white/30 mb-3">Программа</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">КЛУБ ЛОЯЛЬНОСТИ</h2>
            <p className="text-white/70 max-w-xl mx-auto">Копите бонусы с каждой покупки и обменивайте на скидки — чем больше покупаете, тем выгоднее</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/60 text-sm mb-1">Ваш уровень</p>
                  <h3 className="text-2xl font-bold text-white">{currentTier.name}</h3>
                </div>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: currentTier.color + "40" }}
                >
                  {currentTier.icon}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">Ваши бонусы</span>
                  <span className="text-[#12cf91] font-bold">{bonusPoints} баллов</span>
                </div>
                <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${progress}%`, background: "linear-gradient(90deg, #22c5e8, #12cf91)" }}
                  />
                </div>
                {nextTier && (
                  <p className="text-white/50 text-xs mt-2">
                    До уровня «{nextTier.name}» ещё {nextTier.min - bonusPoints} баллов
                  </p>
                )}
              </div>

              <div className="bg-white/10 rounded-2xl p-4 mb-6">
                <p className="text-white/70 text-sm mb-1">Текущий кэшбэк</p>
                <p className="text-3xl font-bold text-[#12cf91] font-['Oswald']">{currentTier.percent}%</p>
                <p className="text-white/50 text-xs">с каждой покупки</p>
              </div>

              <Button className="w-full bg-[#12cf91] hover:bg-[#10a876] text-white font-bold border-0 py-5">
                <Icon name="Gift" size={16} />
                <span className="ml-2">Потратить бонусы</span>
              </Button>
            </div>

            <div className="space-y-4">
              {BONUS_TIERS.map(tier => (
                <div
                  key={tier.name}
                  className={`rounded-2xl p-5 flex items-center gap-4 transition-all ${
                    tier.name === currentTier.name
                      ? "bg-white/20 border-2 border-[#12cf91]/60"
                      : "glass-card"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shrink-0"
                    style={{ background: tier.color }}
                  >
                    {tier.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-bold">{tier.name}</h4>
                      {tier.name === currentTier.name && (
                        <Badge className="bg-[#12cf91] text-white border-0 text-xs">Ваш уровень</Badge>
                      )}
                    </div>
                    <p className="text-white/60 text-sm">
                      {tier.max === 99999 ? `от ${tier.min.toLocaleString()} ₽` : `${tier.min.toLocaleString()}–${tier.max.toLocaleString()} ₽`}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#12cf91] font-['Oswald']">{tier.percent}%</div>
                    <div className="text-white/50 text-xs">кэшбэк</div>
                  </div>
                </div>
              ))}

              <div className="mt-4 space-y-2">
                {FAQ.map((faq, i) => (
                  <div key={i} className="glass-card rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="text-white text-sm font-medium">{faq.q}</span>
                      <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/60 shrink-0 ml-2" />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-white/60 text-sm leading-relaxed">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-[#e3f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#0d7fa8]/15 text-[#0d7fa8] border-[#0d7fa8]/30 mb-4">О компании</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0a4a6e] mb-6">РЫБОВЫЕ МАГАЗИНЫ ВОЛОГДА</h2>
              <p className="text-[#0d7fa8]/80 text-lg leading-relaxed mb-6">
                Уже 10 лет мы доставляем свежайшую рыбу и морепродукты жителям Вологды — прямо с рыбных хозяйств. Никаких посредников, только качество.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "Waves", title: "Прямые поставки", desc: "Работаем напрямую с рыбаками и хозяйствами" },
                  { icon: "Thermometer", title: "Холодовая цепь", desc: "Температурный контроль от моря до вашей двери" },
                  { icon: "ShieldCheck", title: "Сертификация", desc: "Все продукты проходят ветеринарный контроль" },
                  { icon: "Leaf", title: "Экологично", desc: "Поддерживаем устойчивый промысел" },
                ].map(item => (
                  <div key={item.icon} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0d7fa8]/15 flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={18} className="text-[#0d7fa8]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0a4a6e]">{item.title}</h4>
                      <p className="text-[#0d7fa8]/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-[#22c5e8]/30">
                <img src={CATALOG_IMG} alt="Ассортимент морепродуктов" className="w-full h-[420px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-[#22c5e8]/20">
                <div className="text-3xl font-bold text-[#0a4a6e] font-['Oswald']">10 лет</div>
                <div className="text-[#0d7fa8]/70 text-sm">на рынке</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#12cf91] rounded-2xl shadow-xl p-5 text-white">
                <div className="text-3xl font-bold font-['Oswald']">15K+</div>
                <div className="text-white/80 text-sm">клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-[#0d7fa8]/15 text-[#0d7fa8] border-[#0d7fa8]/30 mb-3">Логистика</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a4a6e] mb-4">ДОСТАВКА</h2>
            <p className="text-[#0d7fa8]/80 max-w-xl mx-auto">Доставляем в специальных термоконтейнерах, сохраняющих свежесть продуктов</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {DELIVERY_ZONES.map((z, i) => (
              <div key={i} className="bg-[#e3f4f8] rounded-2xl p-6 border border-[#22c5e8]/20 hover:border-[#0d7fa8]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#0d7fa8]/15 flex items-center justify-center mb-4">
                  <Icon name={i === 3 ? "MapPin" : "Truck"} size={22} className="text-[#0d7fa8]" />
                </div>
                <h3 className="font-bold text-[#0a4a6e] mb-1">{z.zone}</h3>
                <p className="text-[#0d7fa8] text-sm font-medium mb-2">{z.time}</p>
                <p className="text-[#12cf91] text-sm font-semibold">{z.price}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "Clock", title: "Режим работы", desc: "Принимаем заказы ежедневно с 8:00 до 22:00. Доставка до 23:00." },
              { icon: "Package", title: "Упаковка", desc: "Термоконтейнеры с хладагентом — рыба остаётся свежей до 8 часов." },
              { icon: "RefreshCw", title: "Возврат", desc: "Если продукт не понравился — вернём деньги или заменим в течение 24 часов." },
            ].map(item => (
              <div key={item.icon} className="bg-gradient-to-br from-[#0a4a6e] to-[#0d7fa8] rounded-2xl p-6 text-white">
                <Icon name={item.icon} size={28} className="text-[#12cf91] mb-3" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-[#e3f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-[#0d7fa8]/15 text-[#0d7fa8] border-[#0d7fa8]/30 mb-3">Связаться</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a4a6e] mb-4">КОНТАКТЫ</h2>
            <p className="text-[#0d7fa8]/80">Ответим в течение 15 минут в рабочее время</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-[#22c5e8]/20">
              <h3 className="text-2xl font-bold text-[#0a4a6e] mb-6">Написать нам</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#0d7fa8]/80 mb-1 block">Имя</label>
                    <Input placeholder="Иван" className="border-[#22c5e8]/40 focus:border-[#0d7fa8]" />
                  </div>
                  <div>
                    <label className="text-sm text-[#0d7fa8]/80 mb-1 block">Телефон</label>
                    <Input placeholder="+7 (999) 000-00-00" className="border-[#22c5e8]/40 focus:border-[#0d7fa8]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#0d7fa8]/80 mb-1 block">Сообщение</label>
                  <Textarea
                    placeholder="Ваш вопрос или пожелание..."
                    rows={4}
                    className="border-[#22c5e8]/40 focus:border-[#0d7fa8] resize-none"
                  />
                </div>
                <Button className="w-full bg-[#0d7fa8] hover:bg-[#0a4a6e] text-white font-bold text-base py-5 border-0">
                  <Icon name="Send" size={16} />
                  <span className="ml-2">Отправить сообщение</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "Phone", title: "Телефон", value: "+7 (800) 555-35-35", sub: "Звонок бесплатный" },
                { icon: "Mail", title: "Email", value: "hello@akvamarket.ru", sub: "Ответим в течение часа" },
                { icon: "MessageCircle", title: "Мессенджеры", value: "WhatsApp, Telegram", sub: "Быстрее всего здесь" },
              ].map(c => (
                <div key={c.icon} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-[#22c5e8]/20">
                  <div className="w-12 h-12 rounded-xl ocean-gradient flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#0d7fa8]/60 text-xs">{c.title}</p>
                    <p className="text-[#0a4a6e] font-bold">{c.value}</p>
                    <p className="text-[#0d7fa8]/60 text-xs">{c.sub}</p>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#22c5e8]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl ocean-gradient flex items-center justify-center shrink-0">
                    <Icon name="MapPin" size={20} className="text-white" />
                  </div>
                  <p className="text-[#0d7fa8]/60 text-xs">Наши магазины</p>
                </div>
                <div className="space-y-3 pl-1">
                  {[
                    { num: "1", addr: "ул. Горького, д. 103" },
                    { num: "2", addr: "Пошехонское шоссе, 14А" },
                  ].map(s => (
                    <div key={s.num} className="flex items-start gap-2">
                      <span className="text-[#12cf91] font-bold text-sm mt-0.5">{s.num}</span>
                      <div>
                        <p className="text-[#0a4a6e] font-bold text-sm">{s.addr}</p>
                        <p className="text-[#0d7fa8]/60 text-xs">Пн–Пт 10:00–21:00</p>
                        <p className="text-[#0d7fa8]/60 text-xs">Сб 10:00–20:00 · Вс 10:00–19:00</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#0a4a6e] to-[#10a876] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🌊</span>
                  <h4 className="font-bold text-lg">Рыбовые магазины Вологда</h4>
                </div>
                <p className="text-white/70 text-sm">Следите за нами в соцсетях — публикуем акции, новые поставки и рецепты.</p>
                <div className="flex gap-3 mt-4">
                  {["ВКонтакте", "Telegram", "Instagram"].map(s => (
                    <button key={s} className="bg-white/15 hover:bg-white/25 text-white text-xs px-3 py-1.5 rounded-full transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ocean-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌊</span>
              <span className="font-['Oswald'] text-lg font-bold text-white tracking-wider">
                РЫБОВЫЕ <span className="text-[#12cf91]">ВОЛОГДА</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-white/40 text-sm">© 2024 Рыбовые магазины Вологда</p>
          </div>
        </div>
      </footer>
    </div>
  );
}