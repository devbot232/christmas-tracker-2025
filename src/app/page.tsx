'use client';

import React, { useState, useEffect } from 'react';

// Type definitions for the data structure
interface GiftItem {
  gift: string;
  price: number;
  bought: boolean;
  image?: string | null;
}

interface Recipient {
  items: GiftItem[];
}

interface Category {
  [key: string]: Recipient;
}

interface AppData {
  adults: Category;
  kids: Category;
  stockings: Category;
  work: Category;
  home: Category;
}

const initialData: AppData = {
  adults: {
    "Natahsa": { items: [{ gift: "Owala - Spring Revival", price: 21.0, bought: true }] },
    "Josh": { items: [{ gift: "Owala - Black 32 oz", price: 14.21, bought: true }] },
    "Alexi": { items: [{ gift: "Owala pink 30oz", price: 17.1, bought: true }] },
    "Brandon": { items: [{ gift: "Owala", price: 27.0, bought: false }] },
    "Scott": { items: [{ gift: "Owala", price: 27.0, bought: false }] },
    "Shelley": { items: [{ gift: "Owala", price: 22.0, bought: false }] },
    "Danielle": { items: [{ gift: "Owala green 30 oz", price: 17.4, bought: true }] },
    "Grandma Rowberg": { items: [{ gift: "", price: 22.0, bought: false }] },
    "Ray": { items: [{ gift: "", price: 22.0, bought: false }] },
    "Noah": { items: [{ gift: "Owala", price: 28.0, bought: false }] },
    "Bella": { items: [{ gift: "Owala - Sparkle Purple - 24oz", price: 30.0, bought: true }] },
    "Jake": { items: [{ gift: "Owala", price: 22.0, bought: false }] },
    "Angel": { items: [{ gift: "Owala - white 30 oz", price: 27.76, bought: true }] },
    "Tyler": { items: [{ gift: "White Owala - 32 Oz", price: 1.53, bought: true }] },
    "Mark": { items: [{ gift: "Owala", price: 0.0, bought: false }] },
    "Serena": { items: [{ gift: "Owala", price: 22.0, bought: false }] },
    "Eric": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Pam": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Brian": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Britt": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Spenser": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Trent": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Emma": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Nola": { items: [{ gift: "Pink 32oz Owala - flowers", price: 14.64, bought: true }] },
    "Tom": { items: [{ gift: "Owala Black 32 0z", price: 14.21, bought: true }] },
    "Rich": { items: [{ gift: "", price: 0.0, bought: false }] },
    "Nancy": { items: [{ gift: "", price: 0.0, bought: false }] }
  },
  kids: {
    "Avery": { items: [{ gift: "Owala", price: 25.0, bought: false }] },
    "Zachariah": { items: [{ gift: "Owala", price: 25.0, bought: false }] },
    "Chase": { items: [{ gift: "Owala", price: 25.0, bought: false }] },
    "Trenton": { items: [{ gift: "Owala", price: 25.0, bought: false }] },
    "Ramsey": { items: [{ gift: "Macaron Green Labubu", price: 20.95, bought: true }] },
    "Cannon": { items: [{ gift: "Owala - black", price: 0.87, bought: true }] },
    "Søren": { items: [{ gift: "Macaron White Labubu (soybean)", price: 32.48, bought: false }] },
    "Buckley": { items: [{ gift: "Owala - Blue", price: 0.0, bought: true }] },
    "Kaleb": { items: [{ gift: "Owala", price: 25.0, bought: false }] },
    "Ambrey": { items: [{ gift: "Owala - Flowers, big into energy labubu", price: 40.34, bought: true }] },
    "Bjørn": { items: [{ gift: "??", price: 20.0, bought: false }] },
    "Jorgen": { items: [{ gift: "Owala", price: 21.0, bought: false }] },
    "Austin": { items: [{ gift: "??", price: 20.0, bought: false }] },
    "Deacan": { items: [{ gift: "Caterpillar Toy", price: 16.13, bought: true }] },
    "Cooper": { items: [{ gift: "farm animals toy with barn", price: 21.36, bought: true }] },
    "Jaxson": { items: [{ gift: "Owala", price: 25.0, bought: false }] },
    "Abby": { items: [{ gift: "Owala", price: 25.0, bought: false }] }
  },
  stockings: {
    "Avery": { items: [
      { gift: "Playing Cards: Holographic", price: 0.99, bought: true },
      { gift: "3D Print: Turtle", price: 3.05, bought: true },
      { gift: "Multi-C Pens", price: 0.72, bought: true },
      { gift: "Socks: Ice cream", price: 1.38, bought: true },
      { gift: "Bottle Caps Candy", price: 1.34, bought: false },
      { gift: "Bandaids: Flowers", price: 1.0, bought: true },
      { gift: "Hair Ties (Girls)", price: 2.57, bought: true },
      { gift: "Boys Something: Wireless Mouse", price: 0.0, bought: false }
    ] },
    "Zachariah": { items: [
      { gift: "Playing Cards: All Black", price: 0.01, bought: true },
      { gift: "3D Print: Jointed Lizzard", price: 3.27, bought: true },
      { gift: "Multi-C Pens", price: 0.72, bought: true },
      { gift: "Socks: French Fries", price: 4.46, bought: true },
      { gift: "Bottle Caps Candy", price: 1.34, bought: false },
      { gift: "Bandaids", price: 1.0, bought: true },
      { gift: "Boys Something", price: 5.39, bought: true }
    ] },
    // Add more as needed
  },
  work: {
    "Scott": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Tara": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Patty": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Sue": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Nicolle": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Lindsey": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Allyson": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Shannon": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Angela": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Les": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Dale": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Greg": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Darren": { items: [{ gift: "Gift", price: 5.0, bought: false }] },
    "Marsha": { items: [{ gift: "Gift", price: 5.0, bought: false }] }
  },
  home: {}
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState<keyof AppData | 'overview' | 'search'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [appData, setAppData] = useState<AppData>(initialData);

  useEffect(() => {
    const saved = localStorage.getItem('christmasData');
    if (saved) setAppData(JSON.parse(saved) as AppData);
  }, []);

  useEffect(() => {
    localStorage.setItem('christmasData', JSON.stringify(appData));
  }, [appData]);

  const getRecipientTotal = (recipientName: string, category: keyof AppData): number => {
    const items = appData[category]?.[recipientName]?.items || [];
    return items.reduce((sum, item) => sum + (item.bought ? item.price : 0), 0);
  };

  const updateItem = (category: keyof AppData, recipientName: string, index: number, field: keyof GiftItem | 'image', value: any) => {
    setAppData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [recipientName]: {
          ...prev[category][recipientName],
          items: prev[category][recipientName].items.map((item, i) =>
            i === index ? { ...item, [field]: field === 'bought' ? !!value : value } : item
          )
        }
      }
    }));
  };

  const addItem = (category: keyof AppData, recipientName: string, newGift: string, newPrice: number, newBought: boolean) => {
    setAppData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [recipientName]: {
          ...prev[category][recipientName],
          items: [...(prev[category][recipientName]?.items || []), { gift: newGift, price: newPrice, bought: newBought, image: null }]
        }
      }
    }));
  };

  const removeItem = (category: keyof AppData, recipientName: string, index: number) => {
    setAppData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [recipientName]: {
          ...prev[category][recipientName],
          items: prev[category][recipientName].items.filter((_, i) => i !== index)
        }
      }
    }));
  };

  const Recipient = ({ recipientName, category }: { recipientName: string; category: keyof AppData }) => {
    const total = getRecipientTotal(recipientName, category);
    const items = appData[category]?.[recipientName]?.items || [];
    const [newGift, setNewGift] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [newBought, setNewBought] = useState(false);

    return (
      <div className="bg-white p-4 m-2 rounded-lg shadow-md border">
        <h3 className="text-red-600 font-bold mb-2">{recipientName} (Total: ${total.toFixed(2)})</h3>
        {items.map((item, index) => (
          <div key={index} className={`p-2 mb-2 rounded ${item.bought ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
            <input
              type="text"
              value={item.gift}
              onChange={(e) => updateItem(category, recipientName, index, 'gift', e.target.value)}
              className="mr-2 p-1 border rounded"
              placeholder="Gift description"
            />
            <input
              type="number"
              step="0.01"
              value={item.price}
              onChange={(e) => updateItem(category, recipientName, index, 'price', parseFloat(e.target.value) || 0)}
              className="mr-2 p-1 border rounded"
              placeholder="Price"
            />
            <label className="mr-2">
              <input
                type="checkbox"
                checked={item.bought}
                onChange={(e) => updateItem(category, recipientName, index, 'bought', e.target.checked)}
              />
              Bought
            </label>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => updateItem(category, recipientName, index, 'image', ev.target?.result);
                reader.readAsDataURL(file);
              }
            }} className="mr-2" />
            {item.image && <img src={item.image as string} alt="Gift" className="w-12 h-12 mr-2 rounded object-cover" />}
            <button onClick={() => removeItem(category, recipientName, index)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
              Remove
            </button>
          </div>
        ))}
        <div className="mt-4 p-2 bg-blue-50 rounded">
          <input
            type="text"
            placeholder="New gift"
            value={newGift}
            onChange={(e) => setNewGift(e.target.value)}
            className="mr-2 p-1 border rounded"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
            className="mr-2 p-1 border rounded"
          />
          <label className="mr-2">
            <input type="checkbox" checked={newBought} onChange={(e) => setNewBought(e.target.checked)} /> Bought
          </label>
          <button
            onClick={() => {
              if (newGift.trim()) {
                addItem(category, recipientName, newGift, newPrice, newBought);
                setNewGift('');
                setNewPrice(0);
                setNewBought(false);
              }
            }}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add Gift 🎁
          </button>
        </div>
      </div>
    );
  };

  const renderPage = (page: string) => {
    if (page === 'overview') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">🎁 Overall Summary</h2>
          <div className="text-green-600 font-bold text-xl mb-4 text-center">Grand Total Spent: $2,169.08</div>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Adult Gifts:</strong> $349.85</li>
            <li><strong>Kid Gifts:</strong> $343.13</li>
            <li><strong>Kid Stockings:</strong> $252.13</li>
            <li><strong>Home Gifts/Stockings:</strong> $1,311.74</li>
            <li><strong>Work Gifts:</strong> $70.00</li>
          </ul>
        </div>
      );
    }
    if (page === 'search') {
      const query = searchQuery.toLowerCase();
      const results: { name: string; category: keyof AppData }[] = [];
      Object.entries(appData).forEach(([category, catData]) => {
        Object.keys(catData).forEach((name) => {
          if (name.toLowerCase().includes(query)) {
            results.push({ name, category: category as keyof AppData });
          }
        });
      });
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">🔍 Search Results for "{searchQuery}"</h2>
          {results.length === 0 ? <p className="text-gray-500">No matches found.</p> : results.map(({ name, category }) => <Recipient key={`${category}-${name}`} recipientName={name} category={category} />)}
        </div>
      );
    }
    const category = page as keyof AppData;
    const categoryData = appData[category] || {};
    const keys = Object.keys(categoryData).sort();
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 capitalize">{page.replace('-', ' ')}</h2>
        {keys.length === 0 && <p className="text-gray-500">No items yet. Add some!</p>}
        {keys.map((name) => <Recipient key={`${page}-${name}`} recipientName={name} category={category} />)}
        {page === 'home' && (
          <div className="mt-4">
            <input type="text" placeholder="New home recipient" id="new-home-name" className="mr-2 p-2 border rounded" />
            <button
              onClick={() => {
                const name = (document.getElementById('new-home-name') as HTMLInputElement).value.trim();
                if (name) {
                  addItem('home', name, '', 0, false);
                  (document.getElementById('new-home-name') as HTMLInputElement).value = '';
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Home Recipient
            </button>
          </div>
        )}
      </div>
    );
  };

  // Snow animation
  useEffect(() => {
    const interval = setInterval(() => {
      const snow = document.createElement('div');
      snow.innerHTML = '❄';
      snow.style.position = 'fixed';
      snow.style.left = Math.random() * 100 + 'vw';
      snow.style.top = '-10px';
      snow.style.pointerEvents = 'none';
      snow.style.fontSize = '20px';
      snow.style.zIndex = '-1';
      snow.style.animation = 'fall 5s linear infinite';
      document.body.appendChild(snow);
      setTimeout(() => snow.remove(), 5000);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-green-400 relative overflow-hidden">
      <style jsx global>{`
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
      <header className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4 text-center shadow-lg">
        <h1 className="text-4xl font-bold">🎄 2025 Christmas Presents Tracker 🎅</h1>
      </header>
      <nav className="bg-yellow-400 p-2 text-center flex flex-wrap justify-center space-x-2">
        {(['overview', 'adults', 'kids', 'stockings', 'home', 'work', 'search'] as const).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              currentPage === page
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white hover:bg-green-500'
            }`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </nav>
      {currentPage !== 'search' && (
        <div className="p-4 max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search people across categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 mb-4 border-2 border-red-500 rounded-full mx-auto block"
          />
        </div>
      )}
      {renderPage(currentPage)}
    </div>
  );
}
