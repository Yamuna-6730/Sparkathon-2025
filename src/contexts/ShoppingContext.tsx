import { createContext, useContext, useReducer, ReactNode } from "react";
import { ShoppingItem, SmartList, Order, Product } from "@/types";

interface ShoppingState {
  currentList: ShoppingItem[];
  smartLists: SmartList[];
  cart: ShoppingItem[];
  orders: Order[];
  currentLocation: { x: number; y: number; floor: number } | null;
  isInStore: boolean;
  scannerActive: boolean;
  aiAssistantOpen: boolean;
}

type ShoppingAction =
  | { type: "ADD_TO_LIST"; item: ShoppingItem }
  | { type: "REMOVE_FROM_LIST"; itemId: string }
  | { type: "UPDATE_ITEM_QUANTITY"; itemId: string; quantity: number }
  | { type: "MARK_ITEM_COLLECTED"; itemId: string }
  | { type: "ADD_TO_CART"; item: ShoppingItem }
  | { type: "REMOVE_FROM_CART"; itemId: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOCATION"; location: { x: number; y: number; floor: number } }
  | { type: "SET_IN_STORE"; inStore: boolean }
  | { type: "TOGGLE_SCANNER" }
  | { type: "TOGGLE_AI_ASSISTANT" }
  | { type: "CREATE_SMART_LIST"; list: SmartList }
  | { type: "ADD_ORDER"; order: Order };

const initialState: ShoppingState = {
  currentList: [],
  smartLists: [],
  cart: [],
  orders: [],
  currentLocation: null,
  isInStore: false,
  scannerActive: false,
  aiAssistantOpen: false,
};

function shoppingReducer(state: ShoppingState, action: ShoppingAction): ShoppingState {
  switch (action.type) {
    case "ADD_TO_LIST":
      return {
        ...state,
        currentList: [...state.currentList, action.item],
      };
    case "REMOVE_FROM_LIST":
      return {
        ...state,
        currentList: state.currentList.filter(item => item.id !== action.itemId),
      };
    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        currentList: state.currentList.map(item =>
          item.id === action.itemId ? { ...item, quantity: action.quantity } : item
        ),
      };
    case "MARK_ITEM_COLLECTED":
      return {
        ...state,
        currentList: state.currentList.map(item =>
          item.id === action.itemId ? { ...item, collected: true } : item
        ),
      };
    case "ADD_TO_CART":
      const existingItem = state.cart.find(item => item.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + action.item.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.itemId),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "SET_LOCATION":
      return {
        ...state,
        currentLocation: action.location,
      };
    case "SET_IN_STORE":
      return {
        ...state,
        isInStore: action.inStore,
      };
    case "TOGGLE_SCANNER":
      return {
        ...state,
        scannerActive: !state.scannerActive,
      };
    case "TOGGLE_AI_ASSISTANT":
      return {
        ...state,
        aiAssistantOpen: !state.aiAssistantOpen,
      };
    case "CREATE_SMART_LIST":
      return {
        ...state,
        smartLists: [...state.smartLists, action.list],
      };
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    default:
      return state;
  }
}

const ShoppingContext = createContext<{
  state: ShoppingState;
  dispatch: React.Dispatch<ShoppingAction>;
} | null>(null);

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  return (
    <ShoppingContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShopping must be used within a ShoppingProvider");
  }
  return context;
}