import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const AnalyticsPage = () => {
  const deliveryStats = [
    { month: 'Январь', delivered: 145, pending: 12, cancelled: 3, total: 160 },
    { month: 'Февраль', delivered: 120, pending: 8, cancelled: 2, total: 130 },
    { month: 'Март', delivered: 0, pending: 0, cancelled: 0, total: 0 },
  ];

  const topRestaurants = [
    { name: 'BK Тверская', orders: 45, amount: '₽1,245,000', growth: '+12%' },
    { name: 'BK Арбат', orders: 38, amount: '₽980,000', growth: '+8%' },
    { name: 'BK Лубянка', orders: 42, amount: '₽1,120,000', growth: '+15%' },
    { name: 'BK Сокол', orders: 31, amount: '₽850,000', growth: '+5%' },
    { name: 'BK Киевская', orders: 29, amount: '₽790,000', growth: '+3%' },
  ];

  const categoryDistribution = [
    { category: 'Соусы', percentage: 28, color: 'bg-orange-500' },
    { category: 'Специи', percentage: 22, color: 'bg-blue-500' },
    { category: 'Молочные', percentage: 18, color: 'bg-green-500' },
    { category: 'Овощи', percentage: 15, color: 'bg-yellow-500' },
    { category: 'Мясо', percentage: 12, color: 'bg-red-500' },
    { category: 'Прочее', percentage: 5, color: 'bg-purple-500' },
  ];

  const deliveryTimeline = [
    { date: '06.02', count: 15, status: 'completed' },
    { date: '07.02', count: 18, status: 'scheduled' },
    { date: '08.02', count: 12, status: 'scheduled' },
    { date: '09.02', count: 14, status: 'scheduled' },
    { date: '10.02', count: 16, status: 'scheduled' },
    { date: '11.02', count: 13, status: 'scheduled' },
    { date: '12.02', count: 11, status: 'scheduled' },
  ];

  const maxCount = Math.max(...deliveryTimeline.map(d => d.count));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Аналитика и отчёты</h3>
          <p className="text-muted-foreground">Статистика доставок и эффективность заказов</p>
        </div>
        <Select defaultValue="week">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Последняя неделя</SelectItem>
            <SelectItem value="month">Последний месяц</SelectItem>
            <SelectItem value="quarter">Последний квартал</SelectItem>
            <SelectItem value="year">Последний год</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="TrendingUp" className="text-green-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">Доставлено</p>
            </div>
            <p className="text-3xl font-bold">265</p>
            <p className="text-sm text-green-600 mt-1">+18% от прошлого месяца</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Clock" className="text-orange-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">В обработке</p>
            </div>
            <p className="text-3xl font-bold">20</p>
            <p className="text-sm text-muted-foreground mt-1">Средний срок: 2.3 дня</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="XCircle" className="text-red-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">Отменено</p>
            </div>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-red-600 mt-1">-40% от прошлого месяца</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="DollarSign" className="text-blue-600" size={24} />
              <p className="text-sm font-medium text-muted-foreground">Оборот</p>
            </div>
            <p className="text-3xl font-bold">₽4.9M</p>
            <p className="text-sm text-blue-600 mt-1">+12% от прошлого месяца</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>График доставок по неделям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-3 h-64">
                {deliveryTimeline.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex-1 w-full flex flex-col justify-end">
                      <div 
                        className={`w-full rounded-t-lg transition-all hover:opacity-80 ${
                          day.status === 'completed' ? 'bg-primary' : 'bg-primary/40'
                        }`}
                        style={{ height: `${(day.count / maxCount) * 100}%` }}
                      >
                        <div className="text-center pt-2 text-sm font-semibold text-white">
                          {day.count}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{day.date}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary"></div>
                  <span>Завершено</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary/40"></div>
                  <span>Запланировано</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Топ ресторанов по заказам</CardTitle>
              <Badge className="bg-primary/10 text-primary border-0">Февраль 2026</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRestaurants.map((restaurant, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground">{restaurant.orders} заказов</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{restaurant.amount}</p>
                    <p className="text-sm text-green-600">{restaurant.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статистика по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryStats.map((stat, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{stat.month}</h4>
                    <Badge variant="outline">{stat.total} заказов</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{stat.delivered}</p>
                      <p className="text-xs text-muted-foreground mt-1">Доставлено</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{stat.pending}</p>
                      <p className="text-xs text-muted-foreground mt-1">В процессе</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{stat.cancelled}</p>
                      <p className="text-xs text-muted-foreground mt-1">Отменено</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
