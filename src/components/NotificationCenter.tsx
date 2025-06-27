
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Check, 
  X, 
  Clock, 
  AlertTriangle,
  Info,
  CheckCircle,
  DollarSign,
  Users,
  Calendar,
  Mail,
  Phone,
  Settings
} from "lucide-react";

interface NotificationCenterProps {
  onBack: () => void;
}

export function NotificationCenter({ onBack }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 'N001',
      type: 'deal',
      priority: 'high',
      title: 'Deal Closure Reminder',
      message: 'MegaCorp Industries deal worth $450K is due for closure in 2 days',
      timestamp: '2 hours ago',
      read: false,
      icon: DollarSign,
      color: 'red'
    },
    {
      id: 'N002',
      type: 'interaction',
      priority: 'medium',
      title: 'Follow-up Required',
      message: 'Follow-up call with Sarah Chen from Global Electronics scheduled for today',
      timestamp: '4 hours ago',
      read: false,
      icon: Phone,
      color: 'blue'
    },
    {
      id: 'N003',
      type: 'company',
      priority: 'low',
      title: 'New Company Added',
      message: 'TechFlow Solutions has been added to your company database',
      timestamp: '1 day ago',
      read: true,
      icon: Users,
      color: 'green'
    },
    {
      id: 'N004',
      type: 'system',
      priority: 'medium',
      title: 'Monthly Report Ready',
      message: 'Your November 2024 sales summary report is ready for download',
      timestamp: '1 day ago',
      read: false,
      icon: CheckCircle,
      color: 'purple'
    },
    {
      id: 'N005',
      type: 'deal',
      priority: 'high',
      title: 'Deal Stage Updated',
      message: 'Pacific Traders deal moved to Negotiation stage (70% probability)',
      timestamp: '2 days ago',
      read: true,
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: 'N006',
      type: 'interaction',
      priority: 'low',
      title: 'Email Response Received',
      message: 'Klaus Weber responded to your precision parts quotation email',
      timestamp: '3 days ago',
      read: true,
      icon: Mail,
      color: 'blue'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deal': return DollarSign;
      case 'interaction': return Phone;
      case 'company': return Users;
      case 'system': return Info;
      default: return Bell;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationAction = (notification: any) => {
    switch (notification.type) {
      case 'deal':
        alert(`Opening deal management for: ${notification.title}`);
        break;
      case 'interaction':
        alert(`Opening interaction details for: ${notification.title}`);
        break;
      case 'company':
        alert(`Opening company profile for: ${notification.title}`);
        break;
      case 'system':
        alert(`Processing system notification: ${notification.title}`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-xl font-bold">{notifications.length}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-xl font-bold">
                  {notifications.filter(n => n.priority === 'high').length}
                </p>
                <p className="text-sm text-gray-500">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-xl font-bold">{unreadCount}</p>
                <p className="text-sm text-gray-500">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-xl font-bold">
                  {notifications.filter(n => n.read).length}
                </p>
                <p className="text-sm text-gray-500">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex items-center gap-2">
              {['all', 'unread', 'read', 'deal', 'interaction', 'company', 'system'].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          
          return (
            <Card 
              key={notification.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
              }`}
              onClick={() => handleNotificationAction(notification)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-${notification.color}-100`}>
                    <Icon className={`w-5 h-5 text-${notification.color}-600`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(notification.id);
                          }}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You're all caught up! No notifications to show."
                : `No ${filter} notifications found.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
