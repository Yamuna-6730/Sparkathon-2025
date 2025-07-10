import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ArrowLeft, 
  Download, 
  QrCode, 
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Star
} from "lucide-react";
import { useShopping } from "@/contexts/ShoppingContext";
import Link from "next/link";

export default function OrdersPage() {
  const { state } = useShopping();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const mockOrders = [
    {
      id: "ORD-001",
      items: [
        { name: "Organic Milk", quantity: 2, price: 85 },
        { name: "Whole Wheat Bread", quantity: 1, price: 45 },
        { name: "Greek Yogurt", quantity: 3, price: 120 },
      ],
      total: 250,
      status: "delivered" as const,
      deliveryAddress: "123 Main St, Apartment 4B, City, State 12345",
      orderDate: new Date("2024-01-15"),
      deliveryDate: new Date("2024-01-16"),
      receipt: {
        id: "RCP-001",
        qrCode: "QR123456789",
        verificationHash: "0x1a2b3c4d5e6f7890abcdef",
      },
    },
    {
      id: "ORD-002",
      items: [
        { name: "Fresh Bananas", quantity: 1, price: 30 },
        { name: "Almonds", quantity: 1, price: 180 },
        { name: "Green Tea", quantity: 2, price: 95 },
      ],
      total: 305,
      status: "pending" as const,
      deliveryAddress: "123 Main St, Apartment 4B, City, State 12345",
      orderDate: new Date("2024-01-18"),
      receipt: {
        id: "RCP-002",
        qrCode: "QR987654321",
        verificationHash: "0xabcdef1234567890",
      },
    },
  ];

  const mockScheduledDeliveries = [
    {
      id: "SCH-001",
      name: "Monthly Groceries",
      items: ["Milk", "Bread", "Eggs", "Rice"],
      nextDelivery: new Date("2024-02-01"),
      frequency: "monthly",
      status: "active",
    },
    {
      id: "SCH-002",
      name: "Weekly Fruits",
      items: ["Bananas", "Apples", "Oranges"],
      nextDelivery: new Date("2024-01-25"),
      frequency: "weekly",
      status: "active",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "cancelled": return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and manage scheduled deliveries</p>
        </motion.div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Deliveries</TabsTrigger>
            <TabsTrigger value="receipts">Digital Receipts</TabsTrigger>
          </TabsList>

          {/* Order History */}
          <TabsContent value="orders">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {order.orderDate.toLocaleDateString()}
                        </div>
                        {order.deliveryDate && (
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            {order.deliveryDate.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-medium">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-lg text-green-600">₹{order.total}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="truncate">{order.deliveryAddress}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Scheduled Deliveries */}
          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockScheduledDeliveries.map((delivery, index) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{delivery.name}</CardTitle>
                        <Badge variant="outline" className="capitalize">
                          {delivery.frequency}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Items</h4>
                          <div className="flex flex-wrap gap-2">
                            {delivery.items.map((item, idx) => (
                              <Badge key={idx} variant="secondary">{item}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Next delivery: {delivery.nextDelivery.toLocaleDateString()}
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit Schedule
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Pause
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Digital Receipts */}
          <TabsContent value="receipts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <QrCode className="w-5 h-5 mr-2" />
                        Receipt {order.receipt.id}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-600">QR Code: {order.receipt.qrCode}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Order ID:</span>
                            <span className="font-medium">{order.id}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Date:</span>
                            <span className="font-medium">{order.orderDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total:</span>
                            <span className="font-medium text-green-600">₹{order.total}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Verification Hash:</span>
                            <span className="font-mono text-xs">{order.receipt.verificationHash.slice(0, 10)}...</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Verify
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                AI Shopping Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹220</div>
                  <div className="text-sm text-gray-600">Saved last month</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Orders completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">4.8</div>
                  <div className="text-sm text-gray-600">Average rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}