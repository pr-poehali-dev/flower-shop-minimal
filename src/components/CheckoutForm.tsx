import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  itemsCount: number;
  onSuccess: () => void;
}

export default function CheckoutForm({ isOpen, onClose, totalPrice, itemsCount, onSuccess }: CheckoutFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    deliveryTime: 'asap',
    paymentMethod: 'card',
    comment: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Укажите имя';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Укажите телефон';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Неверный формат телефона';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Укажите адрес доставки';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: '✅ Заказ оформлен!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });

    setIsSubmitting(false);
    onSuccess();
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif flex items-center gap-2">
            <Icon name="ShoppingCart" size={32} className="text-primary" />
            Оформление заказа
          </DialogTitle>
          <DialogDescription className="text-base">
            Заполните форму, и мы доставим ваш заказ в удобное время
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="bg-secondary/20 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Товаров в заказе</p>
              <p className="text-2xl font-bold">{itemsCount}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Итого к оплате</p>
              <p className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xl font-serif flex items-center gap-2">
              <Icon name="User" size={20} className="text-primary" />
              Контактные данные
            </h3>

            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (необязательно)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xl font-serif flex items-center gap-2">
              <Icon name="MapPin" size={20} className="text-primary" />
              Адрес доставки
            </h3>

            <div className="space-y-2">
              <Label htmlFor="address">Улица и дом *</Label>
              <Input
                id="address"
                placeholder="ул. Пушкина, д. 10"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Квартира, подъезд, этаж</Label>
              <Input
                id="apartment"
                placeholder="кв. 45, подъезд 2, этаж 5"
                value={formData.apartment}
                onChange={(e) => handleChange('apartment', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif flex items-center gap-2">
              <Icon name="Clock" size={20} className="text-primary" />
              Время доставки
            </h3>
            <RadioGroup value={formData.deliveryTime} onValueChange={(value) => handleChange('deliveryTime', value)}>
              <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer">
                <RadioGroupItem value="asap" id="asap" />
                <Label htmlFor="asap" className="cursor-pointer flex-1">
                  <div className="font-semibold">Как можно скорее</div>
                  <div className="text-sm text-muted-foreground">Доставим в течение 2 часов</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer">
                <RadioGroupItem value="today" id="today" />
                <Label htmlFor="today" className="cursor-pointer flex-1">
                  <div className="font-semibold">Сегодня вечером</div>
                  <div className="text-sm text-muted-foreground">С 18:00 до 21:00</div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer">
                <RadioGroupItem value="tomorrow" id="tomorrow" />
                <Label htmlFor="tomorrow" className="cursor-pointer flex-1">
                  <div className="font-semibold">Завтра</div>
                  <div className="text-sm text-muted-foreground">Укажем время в комментарии</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-serif flex items-center gap-2">
              <Icon name="CreditCard" size={20} className="text-primary" />
              Способ оплаты
            </h3>
            <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleChange('paymentMethod', value)}>
              <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="cursor-pointer flex-1 flex items-center gap-2">
                  <Icon name="CreditCard" size={18} />
                  <span className="font-semibold">Картой онлайн</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-xl hover:bg-secondary/20 transition-colors cursor-pointer">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="cursor-pointer flex-1 flex items-center gap-2">
                  <Icon name="Wallet" size={18} />
                  <span className="font-semibold">Наличными курьеру</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea
              id="comment"
              placeholder="Особые пожелания, время доставки..."
              value={formData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 text-lg rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Оформление...
                </>
              ) : (
                <>
                  <Icon name="Check" size={20} className="mr-2" />
                  Оформить заказ
                </>
              )}
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
