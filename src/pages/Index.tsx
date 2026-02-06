import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import CreateOrderModal from '@/components/CreateOrderModal';
import WarehousePage from '@/components/WarehousePage';
import AnalyticsPage from '@/components/AnalyticsPage';

const Index = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const menuItems = [
    { id: 'orders', label: 'Заказы', icon: 'ShoppingCart' },
    { id: 'receiving', label: 'Приёмка', icon: 'PackageCheck' },
    { id: 'warehouse', label: 'Склад', icon: 'Warehouse' },
    { id: 'writeoffs', label: 'Списания', icon: 'FileX' },
    { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
    { id: 'references', label: 'Справочники', icon: 'BookOpen' },
  ];

  const keyMetrics = [
    { label: 'Остатки на складе', value: '15 поз.', icon: 'AlertTriangle', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { label: 'Срок годности товаров', value: '3 дн.', subtext: 'Внимание', icon: 'Clock', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Ближайшая доставка', value: '0', subtext: 'Сегодня', icon: 'Clock', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Качество поставок', value: '92%', badge: 'Отлично', icon: 'CheckCircle', color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const statsCards = [
    { label: 'Активные заказы', value: '24', change: '+12% от предыдущей недели', icon: 'ShoppingCart', iconColor: 'text-purple-600' },
    { label: 'Ожидают утверждения', value: '8', change: '+3 от предыдущей недели', icon: 'Clock', iconColor: 'text-orange-600' },
    { label: 'Доставка сегодня', value: '15', change: '100% от предыдущей недели', icon: 'Truck', iconColor: 'text-blue-600' },
    { label: 'Просрочено', value: '2', change: '-50% от предыдущей недели', icon: 'AlertTriangle', iconColor: 'text-red-600' },
  ];

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold">OrderFlow</h1>
              <p className="text-xs text-sidebar-foreground/70">Система управления</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Icon name="ChevronLeft" size={20} className="mr-2" />
            Свернуть
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Icon name="Bell" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold">Иван Петров</p>
                <p className="text-xs text-muted-foreground">Администратор</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeSection === 'warehouse' && <WarehousePage />}
            
            {activeSection === 'orders' && (
              <>
                <div>
                  <h3 className="text-xl font-bold mb-2">Управление заказами</h3>
                  <p className="text-muted-foreground">Отслеживайте и управляйте всеми заказами</p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={() => setIsOrderModalOpen(true)}
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать заказ
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold">
                    <Icon name="ArrowLeftRight" size={20} className="mr-2" />
                    Внутреннее перемещение
                  </Button>
                  <Button size="lg" variant="outline" className="font-semibold">
                    <Icon name="FileText" size={20} className="mr-2" />
                    Сформировать отчёт
                  </Button>
                </div>

              <div className="flex gap-4 mb-6 border-b border-border">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-3 font-semibold transition-colors ${
                    activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="LayoutDashboard" size={18} className="inline mr-2" />
                  Дашборд
                </button>
                <button 
                  onClick={() => setActiveTab('list')}
                  className={`px-4 py-3 font-semibold transition-colors ${
                    activeTab === 'list' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={18} className="inline mr-2" />
                  Список заказов
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-3 font-semibold transition-colors ${
                    activeTab === 'analytics' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="BarChart3" size={18} className="inline mr-2" />
                  Аналитика
                </button>
              </div>

              {activeTab === 'dashboard' && (
              <div>
                <h4 className="text-lg font-bold mb-4">Ключевые показатели</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {keyMetrics.map((metric, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                            <Icon name={metric.icon} className={metric.color} size={24} />
                          </div>
                          {metric.badge && (
                            <Badge className="bg-primary text-primary-foreground">{metric.badge}</Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold">{metric.value}</p>
                            {metric.subtext && (
                              <span className="text-sm text-muted-foreground">{metric.subtext}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {statsCards.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`${stat.iconColor}`}>
                            <Icon name={stat.icon} size={24} />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        </div>
                        <p className="text-4xl font-bold mb-2">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <CardTitle className="text-lg">Последние заказы</CardTitle>
                      <Button variant="ghost" size="sm">
                        <span className="mr-2">Все заказы</span>
                        <Icon name="ArrowRight" size={16} />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { id: '#ORD-2401', restaurant: 'BK Тверская', items: 45, status: 'В обработке', statusColor: 'bg-blue-100 text-blue-700' },
                          { id: '#ORD-2402', restaurant: 'BK Арбат', items: 32, status: 'Утверждён', statusColor: 'bg-green-100 text-green-700' },
                          { id: '#ORD-2403', restaurant: 'BK Лубянка', items: 67, status: 'На доставке', statusColor: 'bg-purple-100 text-purple-700' },
                          { id: '#ORD-2404', restaurant: 'BK Сокол', items: 28, status: 'Ожидает', statusColor: 'bg-yellow-100 text-yellow-700' },
                        ].map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon name="ShoppingBag" size={20} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">{order.id}</p>
                                <p className="text-sm text-muted-foreground">{order.restaurant}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-sm font-medium">{order.items} позиций</p>
                              </div>
                              <Badge className={`${order.statusColor} border-0`}>{order.status}</Badge>
                              <Button variant="ghost" size="icon">
                                <Icon name="MoreVertical" size={18} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Bell" size={20} className="text-primary" />
                        <CardTitle className="text-lg">Уведомления</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'Низкие остатки', desc: 'Картофель фри — осталось 5 кг', time: '5 мин назад', icon: 'AlertCircle', color: 'text-red-600' },
                          { title: 'Новый заказ', desc: 'BK Тверская создал заказ #2405', time: '15 мин назад', icon: 'ShoppingCart', color: 'text-blue-600' },
                          { title: 'Доставка завершена', desc: 'Заказ #2398 доставлен в BK Арбат', time: '1 час назад', icon: 'CheckCircle', color: 'text-green-600' },
                          { title: 'Срок годности', desc: 'Салат истекает через 2 дня', time: '2 часа назад', icon: 'Clock', color: 'text-orange-600' },
                        ].map((notif, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <Icon name={notif.icon} className={notif.color} size={20} />
                            <div className="flex-1">
                              <p className="text-sm font-semibold mb-1">{notif.title}</p>
                              <p className="text-xs text-muted-foreground mb-2">{notif.desc}</p>
                              <p className="text-xs text-muted-foreground">{notif.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              )}

              {activeTab === 'analytics' && <AnalyticsPage />}

              {activeTab === 'list' && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Список всех заказов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Здесь будет полный список заказов с расширенными фильтрами</p>
                    </CardContent>
                  </Card>
                </div>
              )}
          )}

          {activeSection === 'receiving' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Приёмка</h2>
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="PackageCheck" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Раздел в разработке</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'writeoffs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Списания</h2>
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="FileX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Раздел в разработке</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'calendar' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Календарь</h2>
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Раздел в разработке</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'references' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Справочники</h2>
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Раздел в разработке</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <CreateOrderModal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
};

export default Index;