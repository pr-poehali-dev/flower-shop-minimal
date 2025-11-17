import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Cart from '@/components/Cart';
import { useToast } from '@/hooks/use-toast';

interface Bouquet {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface CartItem extends Bouquet {
  quantity: number;
}

const bouquets: Bouquet[] = [
  {
    id: 1,
    name: 'Весенний Сад',
    price: '3 500 ₽',
    description: 'Нежная композиция из роз, пионов и эвкалипта',
    image: 'https://cdn.poehali.dev/projects/f7049b18-27af-4ead-aa20-e9872e615524/files/f277be47-af36-4de4-ad4b-0ec43600df35.jpg'
  },
  {
    id: 2,
    name: 'Романтика',
    price: '4 200 ₽',
    description: 'Классический букет из белых и розовых роз',
    image: 'https://cdn.poehali.dev/projects/f7049b18-27af-4ead-aa20-e9872e615524/files/5c47d999-c009-470c-8e5c-7f51e94c2aff.jpg'
  },
  {
    id: 3,
    name: 'Солнечный День',
    price: '2 800 ₽',
    description: 'Яркий микс из подсолнухов и хризантем',
    image: 'https://cdn.poehali.dev/projects/f7049b18-27af-4ead-aa20-e9872e615524/files/24db027f-e620-42fd-a5ce-43ff143b9302.jpg'
  },
  {
    id: 4,
    name: 'Лавандовый Сон',
    price: '3 900 ₽',
    description: 'Утонченная композиция с лавандой и розами',
    image: 'https://cdn.poehali.dev/projects/f7049b18-27af-4ead-aa20-e9872e615524/files/f277be47-af36-4de4-ad4b-0ec43600df35.jpg'
  },
  {
    id: 5,
    name: 'Тропики',
    price: '5 500 ₽',
    description: 'Экзотический букет с орхидеями и антуриумами',
    image: 'https://cdn.poehali.dev/projects/f7049b18-27af-4ead-aa20-e9872e615524/files/5c47d999-c009-470c-8e5c-7f51e94c2aff.jpg'
  },
  {
    id: 6,
    name: 'Нежность',
    price: '3 200 ₽',
    description: 'Пастельная композиция из эустомы и фрезии',
    image: 'https://cdn.poehali.dev/projects/f7049b18-27af-4ead-aa20-e9872e615524/files/f277be47-af36-4de4-ad4b-0ec43600df35.jpg'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    rating: 5,
    text: 'Невероятно красивые букеты! Заказывала на юбилей, все гости были в восторге. Цветы свежие, простояли почти две недели.',
    date: '15 октября 2024'
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    rating: 5,
    text: 'Лучший цветочный магазин в городе. Флористы настоящие профессионалы, всегда помогут с выбором и создадут что-то уникальное.',
    date: '8 октября 2024'
  },
  {
    id: 3,
    name: 'Елена Морозова',
    rating: 5,
    text: 'Заказываю здесь регулярно для офиса. Быстрая доставка, всегда свежие цветы и красивая упаковка. Рекомендую!',
    date: '2 октября 2024'
  }
];

export default function Index() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (bouquet: Bouquet) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === bouquet.id);
      if (existing) {
        return prev.map((item) =>
          item.id === bouquet.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...bouquet, quantity: 1 }];
    });
    
    toast({
      title: '✅ Добавлено в корзину',
      description: bouquet.name,
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/98 backdrop-blur-md shadow-sm z-50 border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-primary flex items-center gap-2">
            <Icon name="Flower2" size={32} className="text-primary" />
            Флора
          </h1>
          <div className="hidden md:flex gap-8 items-center">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">
              Каталог
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              О нас
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-primary transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="hidden lg:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
            <Button size="sm" onClick={() => setIsCartOpen(true)} className="relative">
              <Icon name="ShoppingBag" size={18} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-40 pb-28 px-4 bg-gradient-to-br from-secondary/40 via-background to-accent/20">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="inline-block mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              🌸 Доставка за 2 часа
            </Badge>
          </div>
          <h2 className="text-6xl md:text-8xl font-serif font-light mb-6 leading-tight">
            Свежие цветы<br />
            <span className="text-primary">каждый день</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Создаём уникальные букеты для особенных моментов вашей жизни
          </p>
          <Button size="lg" onClick={() => scrollToSection('catalog')} className="shadow-lg text-lg px-8 py-6 rounded-full">
            Посмотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-serif mb-4 text-foreground">Наши букеты</h3>
            <p className="text-lg text-muted-foreground">Каждый букет создан с любовью и вниманием к деталям</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bouquets.map((bouquet, index) => (
              <Card 
                key={bouquet.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-2 border-secondary/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20 relative">
                  <img 
                    src={bouquet.image} 
                    alt={bouquet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">{bouquet.name}</h4>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{bouquet.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-primary">{bouquet.price}</span>
                    <Button 
                      size="lg"
                      onClick={() => addToCart(bouquet)}
                      className="rounded-full"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-4 bg-gradient-to-br from-secondary/20 to-accent/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-serif mb-4">О магазине</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Flower2" size={32} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-2">Свежесть</h4>
                  <p className="text-muted-foreground leading-relaxed">Ежедневные поставки свежих цветов напрямую от лучших поставщиков</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Palette" size={32} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-2">Индивидуальный подход</h4>
                  <p className="text-muted-foreground leading-relaxed">Создаём букеты по вашим пожеланиям и для любого повода</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon name="Truck" size={32} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-2">Быстрая доставка</h4>
                  <p className="text-muted-foreground leading-relaxed">Доставим ваш заказ в течение 2 часов по городу</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-secondary/30">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Мы работаем с 2015 года и за это время создали тысячи уникальных композиций. 
                  Наша команда профессиональных флористов подберёт идеальный букет для любого события: 
                  от романтического свидания до корпоративного праздника. Мы используем только свежие цветы 
                  и создаём композиции, которые долго радуют своей красотой.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-serif mb-4">Отзывы наших клиентов</h3>
            <p className="text-lg text-muted-foreground">Нам доверяют уже более 5000 довольных клиентов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-secondary/30">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                  <div className="border-t pt-5">
                    <p className="font-semibold text-lg">{review.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 px-4 bg-gradient-to-br from-secondary/20 to-accent/10">
        <div className="container mx-auto max-w-5xl text-center">
          <h3 className="text-5xl font-serif mb-6">Свяжитесь с нами</h3>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Мы всегда рады ответить на ваши вопросы и помочь с выбором букета
          </p>
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Phone" size={36} className="text-primary" />
              </div>
              <h4 className="font-serif text-2xl mb-3">Телефон</h4>
              <p className="text-muted-foreground text-lg">+7 (999) 123-45-67</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon name="Mail" size={36} className="text-primary" />
              </div>
              <h4 className="font-serif text-2xl mb-3">Email</h4>
              <p className="text-muted-foreground text-lg">info@flora-shop.ru</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon name="MapPin" size={36} className="text-primary" />
              </div>
              <h4 className="font-serif text-2xl mb-3">Адрес</h4>
              <p className="text-muted-foreground text-lg">ул. Цветочная, 15</p>
            </div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg">
              <Icon name="Phone" size={20} className="mr-2" />
              Позвонить
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2">
              <Icon name="Mail" size={20} className="mr-2" />
              Написать
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-serif mb-3 flex items-center justify-center gap-2">
            <Icon name="Flower2" size={32} />
            Флора
          </h2>
          <p className="text-sm opacity-80">© 2024 Цветочный магазин. Все права защищены.</p>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
