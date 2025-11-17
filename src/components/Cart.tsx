import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }: CartProps) {
  const getTotalPrice = () => {
    return items.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return sum + price * item.quantity;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif flex items-center gap-2">
            <Icon name="ShoppingBag" size={28} className="text-primary" />
            Корзина
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <Icon name="ShoppingBag" size={48} className="text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground mb-2">Корзина пуста</p>
            <p className="text-sm text-muted-foreground">Добавьте букеты из каталога</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-white">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-lg mb-1 truncate">{item.name}</h4>
                      <p className="text-primary font-semibold mb-2">{item.price}</p>
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemove(item.id)}
                    >
                      <Icon name="X" size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="flex-col gap-4 mt-4">
              <div className="flex justify-between items-center py-4 border-t">
                <span className="text-lg font-serif">Итого:</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button size="lg" className="w-full text-base rounded-xl" onClick={onCheckout}>
                  <Icon name="Check" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
                <Button size="lg" variant="outline" className="w-full rounded-xl" onClick={onClose}>
                  Продолжить покупки
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}