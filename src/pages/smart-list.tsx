import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calendar, ArrowLeft, CheckCircle } from "lucide-react";
import { useShopping } from "@/contexts/ShoppingContext";
import { ShoppingItem, SmartList } from "@/types";
import Link from "next/link";

export default function SmartListPage() {
  const { state, dispatch } = useShopping();
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [listName, setListName] = useState("My Smart List");
  const [showScheduler, setShowScheduler] = useState(false);

  const categories = ["Groceries", "Electronics", "Clothing", "Home & Garden", "Health", "Books"];

  const addItem = () => {
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory || "Groceries",
      price: Math.floor(Math.random() * 500) + 50,
      quantity: newItemQuantity,
      collected: false,
    };

    dispatch({ type: "ADD_TO_LIST", item: newItem });
    setNewItemName("");
    setNewItemCategory("");
    setNewItemQuantity(1);
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_LIST", itemId });
  };

  const createSmartList = () => {
    const smartList: SmartList = {
      id: Date.now().toString(),
      name: listName,
      items: state.currentList,
      createdAt: new Date(),
    };

    dispatch({ type: "CREATE_SMART_LIST", list: smartList });
    alert("Smart List created successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
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
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart List Creator</h1>
          <p className="text-gray-600">Create your intelligent shopping list with AI-powered suggestions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Items Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Items
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Item name (e.g., Organic Milk)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addItem()}
                />
                
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Quantity:</label>
                  <Input
                    type="number"
                    min="1"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                </div>

                <Button onClick={addItem} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to List
                </Button>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Bread", "Eggs", "Bananas", "Yogurt"].map((item) => (
                    <div key={item} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{item}</span>
                      <Button size="sm" variant="outline">Add</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current List Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your List ({state.currentList.length} items)</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowScheduler(!showScheduler)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="List name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="mb-4"
                />

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {state.currentList.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{item.category}</Badge>
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          <span className="text-sm font-medium text-green-600">₹{item.price}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {state.currentList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No items in your list yet</p>
                    <p className="text-sm">Add items to get started</p>
                  </div>
                )}

                {state.currentList.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Total Items:</span>
                      <span className="font-bold">{state.currentList.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Estimated Total:</span>
                      <span className="font-bold text-green-600">
                        ₹{state.currentList.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                      </span>
                    </div>
                    <Button onClick={createSmartList} className="w-full">
                      Create Smart List
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monthly Scheduler */}
            {showScheduler && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Delivery Scheduler</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Delivery Frequency</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Day of Month</label>
                      <Input type="number" min="1" max="31" placeholder="1-31" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Time</label>
                      <Input type="time" />
                    </div>
                    <Button className="w-full">Schedule Delivery</Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}