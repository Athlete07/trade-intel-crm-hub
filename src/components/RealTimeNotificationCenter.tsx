
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Settings,
  Filter,
  Search,
  Archive,
  Star,
  FileText,
  Building,
  TrendingUp,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NotificationCenterProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'deal' | 'contact' | 'task' | 'document' | 'system' | 'interaction';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: any;
  color: string;
  actionable: boolean;
  relatedId?: string;
  metadata?: any;
}

export function RealTimeNotificationCenter({ onBack }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Real-time data fetching and monitoring
  useEffect(() => {
    fetchInitialNotifications();
    setupRealTimeSubscriptions();
    
    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  const fetchInitialNotifications = async () => {
    setIsLoading(true);
    try {
      // Fetch data from all tables to generate notifications
      const [dealsRes, contactsRes, tasksRes, documentsRes] = await Promise.all([
        supabase.from('deals').select('*').order('id', { ascending: false }).limit(50),
        supabase.from('contacts').select('*').order('id', { ascending: false }).limit(50),
        supabase.from('tasks').select('*').order('id', { ascending: false }).limit(50),
        supabase.from('documents').select('*').order('upload_date', { ascending: false }).limit(50)
      ]);

      const generatedNotifications = generateNotificationsFromData({
        deals: dealsRes.data || [],
        contacts: contactsRes.data || [],
        tasks: tasksRes.data || [],
        documents: documentsRes.data || []
      });

      setNotifications(generatedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealTimeSubscriptions = () => {
    // Subscribe to deals changes
    const dealsChannel = supabase
      .channel('deals-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'deals'
      }, (payload) => {
        handleRealTimeUpdate('deals', payload);
      })
      .subscribe();

    // Subscribe to contacts changes
    const contactsChannel = supabase
      .channel('contacts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'contacts'
      }, (payload) => {
        handleRealTimeUpdate('contacts', payload);
      })
      .subscribe();

    // Subscribe to tasks changes
    const tasksChannel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tasks'
      }, (payload) => {
        handleRealTimeUpdate('tasks', payload);
      })
      .subscribe();

    // Subscribe to documents changes
    const documentsChannel = supabase
      .channel('documents-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'documents'
      }, (payload) => {
        handleRealTimeUpdate('documents', payload);
      })
      .subscribe();
  };

  const handleRealTimeUpdate = (table: string, payload: any) => {
    const newNotification = createNotificationFromUpdate(table, payload);
    if (newNotification) {
      setNotifications(prev => [newNotification, ...prev.slice(0, 99)]); // Keep last 100 notifications
      
      // Show toast for high priority notifications
      if (newNotification.priority === 'high') {
        toast({
          title: newNotification.title,
          description: newNotification.message,
          duration: 5000
        });
      }
    }
  };

  const createNotificationFromUpdate = (table: string, payload: any): Notification | null => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    const timestamp = new Date().toISOString();
    
    switch (table) {
      case 'deals':
        if (eventType === 'INSERT') {
          return {
            id: `deal-${newRecord.id}-${Date.now()}`,
            type: 'deal',
            priority: 'high',
            title: 'New Deal Created',
            message: `Deal "${newRecord.product}" worth ${newRecord.currency} ${newRecord.value} has been created`,
            timestamp: new Date().toLocaleString(),
            read: false,
            icon: DollarSign,
            color: 'green',
            actionable: true,
            relatedId: newRecord.id,
            metadata: newRecord
          };
        }
        if (eventType === 'UPDATE' && oldRecord?.stage !== newRecord?.stage) {
          return {
            id: `deal-update-${newRecord.id}-${Date.now()}`,
            type: 'deal',
            priority: 'medium',
            title: 'Deal Stage Updated',
            message: `Deal "${newRecord.product}" moved from ${oldRecord.stage} to ${newRecord.stage}`,
            timestamp: new Date().toLocaleString(),
            read: false,
            icon: TrendingUp,
            color: 'blue',
            actionable: true,
            relatedId: newRecord.id,
            metadata: newRecord
          };
        }
        break;

      case 'contacts':
        if (eventType === 'INSERT') {
          return {
            id: `contact-${newRecord.id}-${Date.now()}`,
            type: 'contact',
            priority: 'medium',
            title: 'New Contact Added',
            message: `${newRecord.name} from ${newRecord.company} has been added to your contacts`,
            timestamp: new Date().toLocaleString(),
            read: false,
            icon: Users,
            color: 'purple',
            actionable: true,
            relatedId: newRecord.id,
            metadata: newRecord
          };
        }
        break;

      case 'tasks':
        if (eventType === 'INSERT') {
          return {
            id: `task-${newRecord.id}-${Date.now()}`,
            type: 'task',
            priority: newRecord.priority === 'high' ? 'high' : 'medium',
            title: 'New Task Assigned',
            message: `Task "${newRecord.title}" has been assigned with ${newRecord.priority} priority`,
            timestamp: new Date().toLocaleString(),
            read: false,
            icon: CheckCircle,
            color: 'orange',
            actionable: true,
            relatedId: newRecord.id,
            metadata: newRecord
          };
        }
        if (eventType === 'UPDATE' && oldRecord?.status !== newRecord?.status) {
          return {
            id: `task-update-${newRecord.id}-${Date.now()}`,
            type: 'task',
            priority: 'low',
            title: 'Task Status Updated',
            message: `Task "${newRecord.title}" status changed from ${oldRecord.status} to ${newRecord.status}`,
            timestamp: new Date().toLocaleString(),
            read: false,
            icon: Clock,
            color: 'blue',
            actionable: true,
            relatedId: newRecord.id,
            metadata: newRecord
          };
        }
        break;

      case 'documents':
        if (eventType === 'INSERT') {
          return {
            id: `document-${newRecord.id}-${Date.now()}`,
            type: 'document',
            priority: 'low',
            title: 'New Document Uploaded',
            message: `Document "${newRecord.name}" has been uploaded to ${newRecord.category}`,
            timestamp: new Date().toLocaleString(),
            read: false,
            icon: FileText,
            color: 'indigo',
            actionable: true,
            relatedId: newRecord.id,
            metadata: newRecord
          };
        }
        break;
    }

    return null;
  };

  const generateNotificationsFromData = (data: any): Notification[] => {
    const notifications: Notification[] = [];
    
    // Generate deal notifications
    data.deals.forEach((deal: any) => {
      if (deal.stage === 'Negotiation' && deal.probability > 70) {
        notifications.push({
          id: `deal-hot-${deal.id}`,
          type: 'deal',
          priority: 'high',
          title: 'Hot Deal Alert',
          message: `Deal "${deal.product}" (${deal.probability}% probability) needs immediate attention`,
          timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
          read: Math.random() > 0.7,
          icon: DollarSign,
          color: 'red',
          actionable: true,
          relatedId: deal.id,
          metadata: deal
        });
      }
    });

    // Generate task notifications
    data.tasks.forEach((task: any) => {
      if (task.status === 'pending' && task.priority === 'high') {
        notifications.push({
          id: `task-pending-${task.id}`,
          type: 'task',
          priority: 'high',
          title: 'Urgent Task Pending',
          message: `High priority task "${task.title}" requires immediate attention`,
          timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
          read: Math.random() > 0.6,
          icon: AlertTriangle,
          color: 'red',
          actionable: true,
          relatedId: task.id,
          metadata: task
        });
      }
    });

    // Generate contact notifications
    data.contacts.forEach((contact: any) => {
      if (contact.createdDate && new Date(contact.createdDate) > new Date(Date.now() - 7 * 86400000)) {
        notifications.push({
          id: `contact-new-${contact.id}`,
          type: 'contact',
          priority: 'medium',
          title: 'New Contact This Week',
          message: `${contact.name} from ${contact.company} was recently added`,
          timestamp: new Date(contact.createdDate).toLocaleString(),
          read: Math.random() > 0.5,
          icon: Users,
          color: 'green',
          actionable: true,
          relatedId: contact.id,
          metadata: contact
        });
      }
    });

    // Generate document notifications
    data.documents.forEach((document: any) => {
      if (document.upload_date && new Date(document.upload_date) > new Date(Date.now() - 3 * 86400000)) {
        notifications.push({
          id: `document-recent-${document.id}`,
          type: 'document',
          priority: 'low',
          title: 'Recent Document Upload',
          message: `"${document.name}" was uploaded to ${document.category}`,
          timestamp: new Date(document.upload_date).toLocaleString(),
          read: Math.random() > 0.4,
          icon: FileText,
          color: 'blue',
          actionable: true,
          relatedId: document.id,
          metadata: document
        });
      }
    });

    // Sort by timestamp (newest first)
    return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.read) ||
                         (filter === 'read' && notification.read) ||
                         notification.type === filter;
    
    const matchesSearch = searchTerm === '' || 
                         notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

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

  const handleNotificationAction = (notification: Notification) => {
    // Implementation for handling notification actions
    console.log('Notification action:', notification);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-8 h-8 text-blue-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Real-Time Notifications</h1>
            <p className="text-sm text-gray-600">Stay updated with live business activities</p>
          </div>
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-gray-500">Total Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{highPriorityCount}</p>
                <p className="text-sm text-gray-500">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-gray-500">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-2xl font-bold">Live</p>
                <p className="text-sm text-gray-500">Real-Time Updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex items-center gap-2">
                {['all', 'unread', 'read', 'deal', 'contact', 'task', 'document', 'system'].map((filterType) => (
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
            
            <div className="flex items-center gap-2 ml-auto">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
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
              className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
              }`}
              onClick={() => handleNotificationAction(notification)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${notification.color}-100 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${notification.color}-600`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {notification.title}
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                        {notification.priority === 'high' && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
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
                      {notification.actionable && (
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle specific action based on notification type
                          }}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Take Action
                        </Button>
                      )}
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
                ? "All caught up! No notifications to show."
                : `No ${filter} notifications found.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
