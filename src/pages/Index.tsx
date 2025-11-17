import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const bouquets = [
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
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-primary">Флора</h1>
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className="text-sm hover:text-primary transition-colors">
              Каталог
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm hover:text-primary transition-colors">
              О нас
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-sm hover:text-primary transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm hover:text-primary transition-colors">
              Контакты
            </button>
          </div>
          <Button size="sm" className="hidden md:flex">
            <Icon name="Phone" size={16} className="mr-2" />
            +7 (999) 123-45-67
          </Button>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-serif font-light mb-6">
            Свежие цветы<br />каждый день
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Создаём уникальные букеты для особенных моментов вашей жизни
          </p>
          <Button size="lg" onClick={() => scrollToSection('catalog')} className="shadow-lg">
            Посмотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif mb-4">Наши букеты</h3>
            <p className="text-muted-foreground">Каждый букет создан с любовью и вниманием к деталям</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bouquets.map((bouquet, index) => (
              <Card 
                key={bouquet.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-secondary/20">
                  <img 
                    src={bouquet.image} 
                    alt={bouquet.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-2xl font-serif mb-2">{bouquet.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{bouquet.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold text-primary">{bouquet.price}</span>
                    <Button variant="outline" size="sm">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif mb-4">О магазине</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Flower2" size={24} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Свежесть</h4>
                  <p className="text-muted-foreground">Ежедневные поставки свежих цветов напрямую от лучших поставщиков</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Palette" size={24} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Индивидуальный подход</h4>
                  <p className="text-muted-foreground">Создаём букеты по вашим пожеланиям и для любого повода</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Truck" size={24} className="text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Быстрая доставка</h4>
                  <p className="text-muted-foreground">Доставим ваш заказ в течение 2 часов по городу</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы работаем с 2015 года и за это время создали тысячи уникальных композиций. 
                Наша команда профессиональных флористов подберёт идеальный букет для любого события: 
                от романтического свидания до корпоративного праздника. Мы используем только свежие цветы 
                и создаём композиции, которые долго радуют своей красотой.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif mb-4">Отзывы наших клиентов</h3>
            <p className="text-muted-foreground">Нам доверяют уже более 5000 довольных клиентов</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-serif mb-6">Свяжитесь с нами</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Мы всегда рады ответить на ваши вопросы и помочь с выбором букета
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Phone" size={28} className="text-primary" />
              </div>
              <h4 className="font-serif text-xl mb-2">Телефон</h4>
              <p className="text-muted-foreground">+7 (999) 123-45-67</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Mail" size={28} className="text-primary" />
              </div>
              <h4 className="font-serif text-xl mb-2">Email</h4>
              <p className="text-muted-foreground">info@flora-shop.ru</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="MapPin" size={28} className="text-primary" />
              </div>
              <h4 className="font-serif text-xl mb-2">Адрес</h4>
              <p className="text-muted-foreground">ул. Цветочная, 15</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              <Icon name="Phone" size={20} className="mr-2" />
              Позвонить
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="Mail" size={20} className="mr-2" />
              Написать
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-serif mb-2">Флора</h2>
          <p className="text-sm opacity-80">© 2024 Цветочный магазин. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}