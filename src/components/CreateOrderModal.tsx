import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateOrderModal = ({ open, onClose }: CreateOrderModalProps) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('morning');
  const [orderType, setOrderType] = useState('planned');
  const [priority, setPriority] = useState('normal');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Создание заказа для ресторана</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Основное</TabsTrigger>
            <TabsTrigger value="delivery">Доставка</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
            <TabsTrigger value="additional">Дополнительно</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            <TabsContent value="basic" className="space-y-6 mt-0">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Ресторан *</Label>
                    <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
                      <SelectTrigger id="restaurant">
                        <SelectValue placeholder="Выберите ресторан" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="msk-kiевskogo">0001-МСК, пл Киевского вокзала 2, ТЦ Европейский 4 этаж</SelectItem>
                        <SelectItem value="msk-tverskaya">BK Тверская</SelectItem>
                        <SelectItem value="msk-arbat">BK Арбат</SelectItem>
                        <SelectItem value="msk-lubyanka">BK Лубянка</SelectItem>
                        <SelectItem value="msk-sokol">BK Сокол</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="order-type">Тип заказа *</Label>
                      <Select value={orderType} onValueChange={setOrderType}>
                        <SelectTrigger id="order-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Плановый заказ</SelectItem>
                          <SelectItem value="urgent">Срочный заказ</SelectItem>
                          <SelectItem value="additional">Дополнительный заказ</SelectItem>
                          <SelectItem value="transfer">Внутреннее перемещение</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Приоритет</Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger id="priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкий</SelectItem>
                          <SelectItem value="normal">Обычный</SelectItem>
                          <SelectItem value="high">Высокий</SelectItem>
                          <SelectItem value="critical">Критичный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Поставщик</Label>
                    <Select>
                      <SelectTrigger id="supplier">
                        <SelectValue placeholder="Выберите поставщика" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dax">DAX - Основной поставщик</SelectItem>
                        <SelectItem value="metro">Metro Cash & Carry</SelectItem>
                        <SelectItem value="local">Локальный поставщик</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Примечания к заказу</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Укажите особые требования или комментарии..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6 mt-0">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="delivery-date">Дата доставки *</Label>
                      <Input 
                        id="delivery-date" 
                        type="date" 
                        value={deliveryDate} 
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Время доставки *</Label>
                      <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="morning" id="morning" />
                          <Label htmlFor="morning" className="font-normal cursor-pointer">Утро (06:00 - 12:00)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afternoon" id="afternoon" />
                          <Label htmlFor="afternoon" className="font-normal cursor-pointer">День (12:00 - 18:00)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="evening" id="evening" />
                          <Label htmlFor="evening" className="font-normal cursor-pointer">Вечер (18:00 - 22:00)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-address">Адрес доставки</Label>
                    <Input 
                      id="delivery-address" 
                      placeholder="Автоматически заполняется по адресу ресторана"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-person">Контактное лицо</Label>
                    <Input 
                      id="contact-person" 
                      placeholder="ФИО ответственного сотрудника"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Контактный телефон</Label>
                    <Input 
                      id="contact-phone" 
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-semibold">Особые условия доставки</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="unloading" />
                        <Label htmlFor="unloading" className="font-normal cursor-pointer">
                          Требуется помощь с разгрузкой
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="packaging" />
                        <Label htmlFor="packaging" className="font-normal cursor-pointer">
                          Возврат тары/упаковки
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="call-before" />
                        <Label htmlFor="call-before" className="font-normal cursor-pointer">
                          Позвонить за 30 минут до доставки
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-0">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Источник данных для заказа</Label>
                    <RadioGroup defaultValue="inventory">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inventory" id="inventory" />
                        <Label htmlFor="inventory" className="font-normal cursor-pointer">
                          На основе инвентаризации
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="forecast" id="forecast" />
                        <Label htmlFor="forecast" className="font-normal cursor-pointer">
                          На основе прогноза продаж
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manual" id="manual" />
                        <Label htmlFor="manual" className="font-normal cursor-pointer">
                          Ручное формирование
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="template" id="template" />
                        <Label htmlFor="template" className="font-normal cursor-pointer">
                          По шаблону заказа
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-semibold">Параметры расчёта</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="days-forecast">Прогноз на дней</Label>
                        <Input 
                          id="days-forecast" 
                          type="number"
                          defaultValue="7"
                          min="1"
                          max="30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="safety-stock">Страховой запас (%)</Label>
                        <Input 
                          id="safety-stock" 
                          type="number"
                          defaultValue="15"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-semibold">Автоматические правила</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-round" defaultChecked />
                        <Label htmlFor="auto-round" className="font-normal cursor-pointer">
                          Автоматическое округление до упаковок
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="exclude-overstock" defaultChecked />
                        <Label htmlFor="exclude-overstock" className="font-normal cursor-pointer">
                          Исключить позиции с избытком
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="min-order" defaultChecked />
                        <Label htmlFor="min-order" className="font-normal cursor-pointer">
                          Соблюдать минимальные партии заказа
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="shelf-life" />
                        <Label htmlFor="shelf-life" className="font-normal cursor-pointer">
                          Учитывать сроки годности при расчёте
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="template-name">Сохранить как шаблон</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="template-name" 
                        placeholder="Название шаблона (необязательно)"
                      />
                      <Button variant="outline">
                        <Icon name="Save" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="space-y-6 mt-0">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Согласование заказа</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="manager-approval" />
                        <Label htmlFor="manager-approval" className="font-normal cursor-pointer">
                          Требуется утверждение менеджером
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="regional-approval" />
                        <Label htmlFor="regional-approval" className="font-normal cursor-pointer">
                          Требуется утверждение регионального директора
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="approver">Согласующий</Label>
                    <Select>
                      <SelectTrigger id="approver">
                        <SelectValue placeholder="Выберите согласующего" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager1">Иванов И.И. - Менеджер</SelectItem>
                        <SelectItem value="manager2">Петрова М.С. - Региональный директор</SelectItem>
                        <SelectItem value="manager3">Сидоров А.В. - Старший менеджер</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-semibold">Уведомления</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-created" defaultChecked />
                        <Label htmlFor="notify-created" className="font-normal cursor-pointer">
                          При создании заказа
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-approved" defaultChecked />
                        <Label htmlFor="notify-approved" className="font-normal cursor-pointer">
                          При утверждении заказа
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-shipped" defaultChecked />
                        <Label htmlFor="notify-shipped" className="font-normal cursor-pointer">
                          При отправке заказа
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-delivered" defaultChecked />
                        <Label htmlFor="notify-delivered" className="font-normal cursor-pointer">
                          При доставке заказа
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="budget">Бюджет заказа (необязательно)</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="budget" 
                        type="number"
                        placeholder="0"
                      />
                      <Select defaultValue="rub">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rub">₽ RUB</SelectItem>
                          <SelectItem value="usd">$ USD</SelectItem>
                          <SelectItem value="eur">€ EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost-center">Центр затрат</Label>
                    <Select>
                      <SelectTrigger id="cost-center">
                        <SelectValue placeholder="Выберите центр затрат" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc1">ЦЗ-001 - Основное производство</SelectItem>
                        <SelectItem value="cc2">ЦЗ-002 - Дополнительные закупки</SelectItem>
                        <SelectItem value="cc3">ЦЗ-003 - Срочные заказы</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attach">Прикрепить файлы</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                      <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Нажмите или перетащите файлы</p>
                      <p className="text-xs text-muted-foreground mt-1">Excel, PDF, изображения (макс. 10 МБ)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Icon name="Eye" size={16} className="mr-2" />
              Предпросмотр
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Check" size={16} className="mr-2" />
              Создать заказ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderModal;
