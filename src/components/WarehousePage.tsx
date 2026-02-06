import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const WarehousePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const warehouseItems = [
    { code: '51017', name: 'Майонез 65%', category: 'Соусы', stock: 11.99, unit: 'кг', minStock: 10, status: 'ok', expiry: '2026-03-15', location: 'A-12' },
    { code: '51024', name: 'Сахар порционный', category: 'Специи', stock: 13942, unit: 'шт', minStock: 10000, status: 'ok', expiry: '2026-12-01', location: 'B-03' },
    { code: '51054', name: 'Горчица', category: 'Соусы', stock: 37.1, unit: 'кг', minStock: 15, status: 'ok', expiry: '2026-04-10', location: 'A-14' },
    { code: '51058', name: 'Кетчуп dip', category: 'Соусы', stock: 523, unit: 'шт', minStock: 500, status: 'ok', expiry: '2026-03-20', location: 'A-15' },
    { code: '51065', name: 'Кетчуп Хайнц', category: 'Соусы', stock: 3.5, unit: 'кг', minStock: 20, status: 'low', expiry: '2026-03-25', location: 'A-16' },
    { code: '51081', name: 'Масло для фритюра', category: 'Масла', stock: 193.2, unit: 'кг', minStock: 150, status: 'ok', expiry: '2026-08-01', location: 'C-05' },
    { code: '51091', name: 'Сыр Чеддер', category: 'Молочные', stock: 2400, unit: 'шт', minStock: 2000, status: 'ok', expiry: '2026-02-15', location: 'D-01' },
    { code: '51093', name: 'Сыр плавленый Hochland', category: 'Молочные', stock: 270, unit: 'шт', minStock: 200, status: 'ok', expiry: '2026-02-20', location: 'D-02' },
    { code: '51100', name: 'Сухарики чесночные', category: 'Специи', stock: 97, unit: 'шт', minStock: 100, status: 'low', expiry: '2026-06-01', location: 'B-08' },
    { code: '51103', name: 'Соль', category: 'Специи', stock: 21, unit: 'кг', minStock: 15, status: 'ok', expiry: '2027-01-01', location: 'B-10' },
    { code: '51107', name: 'Приправа Ароматт', category: 'Специи', stock: 300, unit: 'шт', minStock: 250, status: 'ok', expiry: '2026-07-15', location: 'B-12' },
    { code: '60012', name: 'Салат Айсберг', category: 'Овощи', stock: 12, unit: 'кг', minStock: 20, status: 'low', expiry: '2026-02-08', location: 'E-01' },
    { code: '60023', name: 'Помидоры', category: 'Овощи', stock: 8, unit: 'кг', minStock: 15, status: 'critical', expiry: '2026-02-09', location: 'E-02' },
    { code: '70001', name: 'Булочки для бургеров', category: 'Выпечка', stock: 450, unit: 'шт', minStock: 500, status: 'low', expiry: '2026-02-07', location: 'F-01' },
    { code: '70002', name: 'Котлеты говяжьи', category: 'Мясо', stock: 180, unit: 'шт', minStock: 200, status: 'low', expiry: '2026-02-10', location: 'G-01' },
  ];

  const filteredItems = warehouseItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.code.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['Соусы', 'Специи', 'Молочные', 'Масла', 'Овощи', 'Выпечка', 'Мясо'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return <Badge className="bg-green-100 text-green-700 border-0">В норме</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-700 border-0">Низкий остаток</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-700 border-0">Критично</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const criticalCount = warehouseItems.filter(item => item.status === 'critical').length;
  const lowCount = warehouseItems.filter(item => item.status === 'low').length;
  const totalItems = warehouseItems.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Управление складом</h3>
        <p className="text-muted-foreground">Отслеживайте остатки и управляйте товарами на складе</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Package" className="text-blue-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">Всего позиций</p>
            </div>
            <p className="text-3xl font-bold">{totalItems}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="AlertTriangle" className="text-yellow-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">Низкий остаток</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{lowCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="AlertCircle" className="text-red-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">Критично</p>
            </div>
            <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Остатки на складе</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Button size="sm" className="bg-primary">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить товар
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию или коду..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="ok">В норме</SelectItem>
                <SelectItem value="low">Низкий остаток</SelectItem>
                <SelectItem value="critical">Критично</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="font-semibold">Код</TableHead>
                  <TableHead className="font-semibold">Наименование</TableHead>
                  <TableHead className="font-semibold">Категория</TableHead>
                  <TableHead className="font-semibold text-right">Остаток</TableHead>
                  <TableHead className="font-semibold text-right">Мин. остаток</TableHead>
                  <TableHead className="font-semibold">Статус</TableHead>
                  <TableHead className="font-semibold">Срок годности</TableHead>
                  <TableHead className="font-semibold">Место</TableHead>
                  <TableHead className="font-semibold"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.code} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-xs">{item.code}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.stock} {item.unit}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.minStock} {item.unit}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(item.expiry) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? (
                        <span className="text-orange-600 font-semibold">{item.expiry}</span>
                      ) : (
                        <span>{item.expiry}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.location}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Package" size={48} className="mx-auto mb-3 opacity-50" />
              <p>Товары не найдены</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehousePage;
