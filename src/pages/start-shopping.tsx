import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation as NavigationIcon, 
  QrCode, 
  ShoppingCart, 
  ArrowLeft, 
  Target,
  CheckCircle,
  Zap,
  MessageCircle
} from "lucide-react";
import { useShopping } from "@/contexts/ShoppingContext";
import Link from "next/link";

export default function StartShoppingPage() {
  const { state, dispatch } = useShopping();
  const [currentFloor, setCurrentFloor] = useState(1);
  const [collectedItems, setCollectedItems] = useState(0);
  const [showScanner, setShowScanner] = useState(false);

  const mockItems = [
    { id: "1", name: "Organic Milk", category: "Dairy", location: { x: 10, y: 15, floor: 1, section: "Dairy" }, collected: false },
    { id: "2", name: "Whole Wheat Bread", category: "Bakery", location: { x: 25, y: 8, floor: 1, section: "Bakery" }, collected: false },
    { id: "3", name: "Fresh Bananas", category: "Fruits", location: { x: 5, y: 20, floor: 1, section: "Produce" }, collected: true },
    { id: "4", name: "Greek Yogurt", category: "Dairy", location: { x: 12, y: 15, floor: 1, section: "Dairy" }, collected: false },
  ];

  const totalItems = mockItems.length;
  const completedItems = mockItems.filter(item => item.collected).length;
  const progress = (completedItems / totalItems) * 100;

  useEffect(() => {
    dispatch({ type: "SET_IN_STORE", inStore: true });
    dispatch({ type: "SET_LOCATION", location: { x: 0, y: 0, floor: 1 } });
  }, [dispatch]);

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    dispatch({ type: "TOGGLE_SCANNER" });
  };

  const toggleAIAssistant = () => {
    dispatch({ type: "TOGGLE_AI_ASSISTANT" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">In-Store Navigation</h1>
              <p className="text-gray-600">Your gamified shopping adventure starts here!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{completedItems}/{totalItems}</div>
              <div className="text-sm text-gray-500">Items Collected</div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Shopping Progress</h3>
                <Badge variant={progress === 100 ? "default" : "secondary"}>
                  {progress.toFixed(0)}% Complete
                </Badge>
              </div>
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">
                {progress === 100 ? "🎉 All items collected! Ready for checkout!" : `${totalItems - completedItems} items remaining`}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Store Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Store Map - Floor {currentFloor}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-6 h-96 overflow-hidden">
                  {/* Store Layout */}
                  <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-lg">
                    {/* Sections */}
                    <div className="absolute top-2 left-2 w-20 h-16 bg-green-200 rounded flex items-center justify-center text-xs font-medium">
                      Produce
                    </div>
                    <div className="absolute top-2 right-2 w-20 h-16 bg-blue-200 rounded flex items-center justify-center text-xs font-medium">
                      Dairy
                    </div>
                    <div className="absolute bottom-2 left-2 w-20 h-16 bg-yellow-200 rounded flex items-center justify-center text-xs font-medium">
                      Bakery
                    </div>
                    <div className="absolute bottom-2 right-2 w-20 h-16 bg-purple-200 rounded flex items-center justify-center text-xs font-medium">
                      Electronics
                    </div>

                    {/* User Location */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"
                    />

                    {/* Item Locations */}
                    {mockItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-md ${
                          item.collected ? "bg-green-500" : "bg-orange-500"
                        }`}
                        style={{
                          left: `${(item.location.x / 30) * 100}%`,
                          top: `${(item.location.y / 25) * 100}%`,
                        }}
                      />
                    ))}

                    {/* Glowing Path Effect */}
                    <motion.div
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-y-1/2 rotate-45"
                    />
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>You</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Target</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Collected</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <NavigationIcon className="w-4 h-4 mr-2" />
                    Recalculate Route
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="w-4 h-4 mr-2" />
                    Find Item
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shopping Tools */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={toggleScanner} 
                  className="w-full"
                  variant={showScanner ? "default" : "outline"}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  {showScanner ? "Close Scanner" : "Scan QR Code"}
                </Button>
                
                <Button onClick={toggleAIAssistant} variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                
                <Button variant="outline" className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Cart ({state.cart.length})
                </Button>
              </CardContent>
            </Card>

            {/* Current Items */}
            <Card>
              <CardHeader>
                <CardTitle>Shopping List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {mockItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        item.collected ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {item.collected ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Target className="w-4 h-4 text-orange-500" />
                          )}
                          <span className={`font-medium ${item.collected ? "line-through text-gray-500" : ""}`}>
                            {item.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.location.section} - Floor {item.location.floor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gamification Elements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm">Speed Shopper</span>
                    <Badge variant="secondary">+10 XP</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm">Route Master</span>
                    <Badge variant="secondary">+5 XP</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* QR Scanner Modal */}
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold mb-4">QR Code Scanner</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">Point camera at QR code</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={toggleScanner} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Scan Product</Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* AI Assistant */}
        {state.aiAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl p-4 max-w-sm w-full mx-4 border"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">AI Shopping Assistant</h4>
              <Button variant="ghost" size="sm" onClick={toggleAIAssistant}>
                ×
              </Button>
            </div>
            <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
              <div className="bg-blue-50 p-2 rounded text-sm">
                Hi! I can help you find items, compare prices, or suggest alternatives. What do you need?
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 p-2 border rounded text-sm"
              />
              <Button size="sm">Send</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}