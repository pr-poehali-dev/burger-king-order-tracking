import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateOrderModal = ({ open, onClose }: CreateOrderModalProps) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [inventoryDate, setInventoryDate] = useState('2026-02-01');
  const [timeOption, setTimeOption] = useState('evening');

  const inventoryItems = [
    { category: 'Охлажденная', group: 'Соус Весовой', code: '51017', name: 'Майонез 65%', invNo: '11.99', stockDAX: '0.212', delta: '11.778', unit: 'кг', type: 'Управленческая' },
    { category: 'Сухой', group: 'Специи', code: '51024', name: 'Сахар порционный', invNo: '13942', stockDAX: '10944', delta: '2998', unit: 'шт', type: 'Управленческая' },
    { category: 'Охлажденная', group: 'Соус Весовой', code: '51054', name: 'Горчица', invNo: '37.105', stockDAX: '0.626', delta: '36.479', unit: 'кг', type: 'Управленческая' },
    { category: 'Охлажденная', group: 'Соус 25 мл', code: '51058', name: 'Кетчуп dip', invNo: '523', stockDAX: '-43', delta: '566', unit: 'шт', type: 'Управленческая' },
    { category: 'Охлажденная', group: 'Соус Весовой', code: '51065', name: 'Кетчуп Хайнц', invNo: '11.48', stockDAX: '-79.911', delta: '91.391', unit: 'кг', type: 'Управленческая' },
    { category: 'Сухой', group: 'Специи', code: '51081', name: 'Масло для фритюра', invNo: '193.2', stockDAX: '1000.5', delta: '-807.3', unit: 'кг', type: 'Управленческая' },
    { category: 'Охлажденная', group: 'Сыр', code: '51091', name: 'Сыр Чеддер', invNo: '2400', stockDAX: '131', delta: '2269', unit: 'шт', type: 'Управленческая' },
    { category: 'Охлажденная', group: 'Сыр', code: '51093', name: 'Сыр плавленый ломтевой Hochland Черный', invNo: '270', stockDAX: '270', delta: '0', unit: 'шт', type: 'Управленческая' },
    { category: 'Сухой', group: 'Специи', code: '51100', name: 'Сухарики чесночные(БК)', invNo: '97', stockDAX: '-90', delta: '187', unit: 'шт', type: 'Управленческая' },
    { category: 'Сухой', group: 'Специи', code: '51103', name: 'Соль', invNo: '21', stockDAX: '20', delta: '1', unit: 'кг', type: 'Управленческая' },
    { category: 'Сухой', group: 'Специи', code: '51107', name: 'Приправа Ароматт Панк-рока сашет', invNo: '300', stockDAX: '300', delta: '0', unit: 'шт', type: 'Управленческая' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Рек.система заказа ингредиентов</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          <div className="bg-muted/30 p-4 rounded-lg space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Порядок действий:</Label>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>1) Для сотрудника ресторана, ресторан определяется автоматически.</p>
                <p>При необходимости, обратитесь на почту <a href="mailto:vladislav.kremenets@bkich.ru" className="text-primary hover:underline">vladislav.kremenets@bkich.ru</a></p>
                <p>2) Загрузите заполненный файл логической инвентаризации или выберите другой источник остатков ингредиентов.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="restaurant">Ресторан</Label>
                <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
                  <SelectTrigger id="restaurant">
                    <SelectValue placeholder="Выберите ресторан" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="msk-kiевskogo">0001-МСК, пл Киевского вокзала 2, ТЦ Европейский 4 этаж</SelectItem>
                    <SelectItem value="msk-tverskaya">BK Тверская</SelectItem>
                    <SelectItem value="msk-arbat">BK Арбат</SelectItem>
                    <SelectItem value="msk-lubyanka">BK Лубянка</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inventory-date">Дата проведения инвентаризации</Label>
                <Input 
                  id="inventory-date" 
                  type="date" 
                  value={inventoryDate} 
                  onChange={(e) => setInventoryDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Download" size={18} className="mr-2" />
                Скачать шаблон ЛИ КРУ
              </Button>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Что использовать в качестве остатков?</Label>
                <RadioGroup value={timeOption} onValueChange={setTimeOption} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kru" id="kru" />
                    <Label htmlFor="kru" className="font-normal cursor-pointer">Файл ЛИ КРУ (xlsx)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tsd" id="tsd" />
                    <Label htmlFor="tsd" className="font-normal cursor-pointer">Файл ЛИ ТСД (xlsx)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aksante" id="aksante" />
                    <Label htmlFor="aksante" className="font-normal cursor-pointer">Последняя ЛИ в Аксанте</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aksante-kru" id="aksante-kru" />
                    <Label htmlFor="aksante-kru" className="font-normal cursor-pointer">Файл ЛИ ТСД (xlsx) + Файл ЛИ КРУ (xlsx)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aksante-tsd" id="aksante-tsd" />
                    <Label htmlFor="aksante-tsd" className="font-normal cursor-pointer">Файл ЛИ ТСД (xlsx) + Файл ЛИ КРУ (xlsx)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Во сколько?</Label>
                <RadioGroup value={timeOption} onValueChange={setTimeOption} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning" className="font-normal cursor-pointer">Утром (до смены)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="evening" id="evening" />
                    <Label htmlFor="evening" className="font-normal cursor-pointer">Вечером (после смены)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Список ингредиентов для заказа</h4>
              <div className="flex gap-2">
                <Input 
                  placeholder="Поиск по названию..." 
                  className="w-64"
                />
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-96">
                <Table>
                  <TableHeader className="bg-muted sticky top-0">
                    <TableRow>
                      <TableHead className="font-semibold">Кат.склада 2 БК</TableHead>
                      <TableHead className="font-semibold">Группа инв. БК</TableHead>
                      <TableHead className="font-semibold">Код ингр. БК</TableHead>
                      <TableHead className="font-semibold">Имя ингр. БК</TableHead>
                      <TableHead className="font-semibold">Инв-но</TableHead>
                      <TableHead className="font-semibold">Сток DAX</TableHead>
                      <TableHead className="font-semibold">Дельта</TableHead>
                      <TableHead className="font-semibold">ЕИ БК</TableHead>
                      <TableHead className="font-semibold">Тип инв.</TableHead>
                      <TableHead className="font-semibold">Дата инв.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.group}</TableCell>
                        <TableCell className="font-mono text-xs">{item.code}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right">{item.invNo}</TableCell>
                        <TableCell className="text-right">{item.stockDAX}</TableCell>
                        <TableCell className={`text-right font-semibold ${
                          parseFloat(item.delta) > 0 ? 'text-green-600' : parseFloat(item.delta) < 0 ? 'text-red-600' : ''
                        }`}>
                          {item.delta}
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">2026-02-01</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Icon name="ArrowRight" size={18} className="mr-2" />
            Следующий шаг
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderModal;
