
import { Product, Category } from "../types";

export const mockCategories: Category[] = [
  {
    id: "cat1",
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    imageUrl: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "cat2",
    name: "Clothing",
    description: "Modern fashion and apparel",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "cat3",
    name: "Home & Garden",
    description: "Furniture, decor and outdoor equipment",
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "cat4",
    name: "Books",
    description: "Bestselling books across all genres",
    imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "cat5",
    name: "Sports & Fitness",
    description: "Equipment and gear for all sports",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

export const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "Wireless Earbuds Pro",
    description: "High-quality wireless earbuds with noise cancellation and 30-hour battery life.",
    price: 129.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "AudioTech Inc.",
    sellerId: "seller1",
    featured: true,
    inventory: 25,
    createdAt: "2023-03-15T10:30:00Z"
  },
  {
    id: "prod2",
    name: "Slim Fit Cotton T-Shirt",
    description: "Comfortable and breathable 100% cotton t-shirt, perfect for everyday wear.",
    price: 19.99,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "Fashion Forward",
    sellerId: "seller2",
    inventory: 100,
    createdAt: "2023-04-02T14:15:00Z"
  },
  {
    id: "prod3",
    name: "Smart Home Hub",
    description: "Control all your smart home devices with this easy-to-use central hub.",
    price: 149.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "Smart Living",
    sellerId: "seller3",
    featured: true,
    inventory: 15,
    createdAt: "2023-02-28T09:45:00Z"
  },
  {
    id: "prod4",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable height.",
    price: 249.99,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "ErgoDesign",
    sellerId: "seller4",
    inventory: 8,
    createdAt: "2023-01-20T11:00:00Z"
  },
  {
    id: "prod5",
    name: "Bestselling Novel",
    description: "The latest bestseller from renowned author, a captivating story of mystery and adventure.",
    price: 14.99,
    category: "Books",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "Book Haven",
    sellerId: "seller5",
    inventory: 50,
    createdAt: "2023-05-10T13:20:00Z"
  },
  {
    id: "prod6",
    name: "Fitness Tracker Watch",
    description: "Track your steps, heart rate, and sleep patterns with this advanced fitness watch.",
    price: 89.99,
    category: "Sports & Fitness",
    imageUrl: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "FitTech",
    sellerId: "seller6",
    featured: true,
    inventory: 30,
    createdAt: "2023-04-15T16:40:00Z"
  },
  {
    id: "prod7",
    name: "Leather Messenger Bag",
    description: "Stylish and durable genuine leather messenger bag for professionals.",
    price: 159.99,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "Urban Carry",
    sellerId: "seller7",
    inventory: 12,
    createdAt: "2023-03-08T08:30:00Z"
  },
  {
    id: "prod8",
    name: "4K Smart TV",
    description: "55-inch 4K Ultra HD Smart TV with built-in streaming apps and voice control.",
    price: 699.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    seller: "ScreenMaster",
    sellerId: "seller8",
    featured: true,
    inventory: 5,
    createdAt: "2023-02-15T10:10:00Z"
  }
];
