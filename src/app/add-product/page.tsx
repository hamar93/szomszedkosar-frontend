'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LocationPicker } from '@/components/LocationSystem'
import { triggerFreshAlert } from '@/lib/api/alerts'
import { AlertPayload } from '@/types/AlertPayload'
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Camera,
  Smile,
  Upload,
  X,
  MapPin,
  AlertCircle,
  Info,
  Tag,
  DollarSign,
  Scale,
  Truck,
  Bell
} from 'lucide-react'

type UserType = 'registered_producer' | 'casual_seller';

interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
}

const categories = [
  {
    id: 'perishable',
    name: 'Romlandó termékek',
    icon: '🥬',
    emojis: ['🍎', '🍊', '🍌', '🍇', '🍓', '🍒', '🥝', '🍑', '🍍', '🥭', '🍉', '🫐', '🥥', '🥕', '🥒', '🍅', '🥬', '🥦', '🌶️', '🫒', '🌽', '🥔', '🧄', '🧅', '🥑', '🍆', '🫑', '🥚', '🐣', '🥩', '🍖', '🐔', '🐄', '🐷', '🦆', '🐟', '🦐', '🦀', '🥛', '🧀', '🧈', '🍳', '🥯']
  },
  {
    id: 'preserved',
    name: 'Tartós termékek',
    icon: '🍯',
    emojis: ['🍯', '🫙', '🍓', '🍑', '🍇', '🍊', '🍋', '🥝', '🧃', '🍹', '🥤', '🍋', '🍓', '🍑', '🍯', '🐝', '🌻', '🌼', '🌿', '🍃', '🌱', '🌼', '🌸', '☕', '🫖', '🌿', '🍃', '🌱', '🧄', '🧅', '🌶️', '🥓', '🌭', '🍖', '🐟', '🧀']
  },
  {
    id: 'cosmetics',
    name: 'Házi kozmetikum',
    icon: '🧼',
    emojis: ['🧼', '🧴', '🌿', '💆‍♀️', '🛁', '🕯️', '🧽', '🌸', '🌹', '🥥']
  },
  {
    id: 'rural_marketplace',
    name: 'Piactér',
    icon: '🐄',
    emojis: ['🐄', '🐷', '🐔', '🐑', '🐐', '🦆', '🐰', '🐴', '🐈', '🐕', '🌾', '🌽', '🫘', '🥜', '🌰', '🛠️', '⚒️', '🪓', '🔨', '⛏️', '🪚', '🧰', '📦', '🚜', '🔧']
  },
  {
    id: 'bakery',
    name: 'Pékáruk',
    icon: '🍞',
    emojis: ['🍞', '🥖', '🥨', '🧇', '🍰', '🎂', '🥧', '🧁', '🍪', '🥐']
  }
]

const getSubcategories = (categoryId: string): string[] => {
  const subcategoryMap: Record<string, string[]> = {
    'perishable': ['Gyümölcs', 'Zöldség', 'Tojás', 'Hús', 'Tejtermék'],
    'preserved': ['Lekvár', 'Szörp', 'Méz', 'Tea', 'Gyógynövény', 'Füstöltáru'],
    'cosmetics': ['Szappan', 'Krém', 'Balzsam', 'Olaj', 'Gyertya'],
    'rural_marketplace': ['Élő állat', 'Gabona', 'Eszközök', 'Takarmány'],
    'bakery': ['Kenyér', 'Péksütemény', 'Torta', 'Sütemény']
  }

  return subcategoryMap[categoryId] || []
}

const currentUser: {
  name: string;
  type: UserType;
  monthlyAds: number;
  monthlyPushes: number;
  activeAds: number;
} = {
  name: 'Kiss Margit',
  type: 'registered_producer',
  monthlyAds: 2,
  monthlyPushes: 1,
  activeAds: 1
};

export default function AddProductPage() {
  const [step, setStep] = useState<number>(1)
  const [productName, setProductName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [subcategory, setSubcategory] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [location, setLocation] = useState<Location | null>(null)
  const [useImage, setUseImage] = useState<'emoji' | 'photo'>('emoji')
  const [selectedEmoji, setSelectedEmoji] = useState<string>('')
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [price, setPrice] = useState<string>('')
  const [unit, setUnit] = useState<string>('kg')
  const [quantity, setQuantity] = useState<string>('')
  const [isOrganic, setIsOrganic] = useState<boolean>(false)
  const [deliveryOptions, setDeliveryOptions] = useState({
    pickup: true,
    delivery: false,
    shipping: false
  })
  const [sendPushNotification, setSendPushNotification] = useState<boolean>(false)
  const [pushRadius, setPushRadius] = useState<number>(10)
  const [sendAlert, setSendAlert] = useState<boolean>(false)
  const [alertSubmissionSuccessful, setAlertSubmissionSuccessful] = useState<boolean>(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedImages((prev: File[]) => [...prev, ...files].slice(0, 5))
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation)
  }

  const handleSubmit = async () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }

    if (sendAlert && location) {
      const payload: AlertPayload = {
        productId: Math.floor(Math.random() * 1000), // Dummy product ID
        sellerLat: location.lat,
        sellerLon: location.lng,
        alertRadiusKm: 10,
        message: `Új termék a közelben: ${productName}`,
      };
      try {
        await triggerFreshAlert(payload);
        setAlertSubmissionSuccessful(true);
      } catch (error) {
        console.error("Alert submission failed", error);
      }
    } else {
      console.log("Regular product submission");
    }

    console.log('Termék feltöltése:', {
      productName, category, subcategory, description, location, useImage, selectedEmoji,
      uploadedImages, price, unit, quantity, isOrganic, deliveryOptions,
      sendPushNotification, pushRadius
    })
  }

  const selectedCategoryData = categories.find(cat => cat.id === category)

  return (
    <div className="min-h-screen bg-[#F5F5F0] font-sans text-[#1F2937]">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-xl font-bold text-[#1F2937]">
                Új termék feltöltése
              </h1>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Lépés {step} / 4
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${step >= stepNum ? 'bg-[#1B4332]' : 'bg-transparent'}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">

            {/* STEP 1: Alapadatok */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E8ECE9] flex items-center justify-center text-[#1B4332]">
                    <Tag size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-[#1F2937]">Termék alapadatok</h2>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Termék neve *</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="pl. Friss meggy, Házi lekvár, Bio sajt..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Helyszín *</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                  </div>
                  {location && (
                    <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2 text-sm text-green-700 font-medium">
                      <Check size={16} />
                      Kiválasztott helyszín: {location.address}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Kategória *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat.id)
                          setSubcategory('')
                        }}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 text-center ${category === cat.id
                            ? 'border-[#1B4332] bg-[#F0F4F1] text-[#1B4332]'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-bold">{cat.name}</span>
                      </button>
                    ))}
                  </div>

                  {category && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                        Pontosabb kategória (opcionális)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {getSubcategories(category).map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => setSubcategory(subcategory === sub ? '' : sub)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${subcategory === sub
                                ? 'bg-[#1B4332] text-white border-[#1B4332]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                              }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={sendAlert}
                        onChange={(e) => setSendAlert(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4332]"></div>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-[#1F2937]">
                        Friss Riasztás küldése (10 km)
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Értesítsd a környékbelieket az új, friss termékedről!
                      </p>
                    </div>
                  </label>
                </div>

                {alertSubmissionSuccessful && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3">
                    <Check size={20} />
                    <span className="font-medium">Friss riasztás elküldve a környékbelieknek!</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Leírás *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Írj részletesen a termékről: hogyan készült, milyen minőségű, mire használható..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Kép/Ikon választás */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E8ECE9] flex items-center justify-center text-[#1B4332]">
                    <Camera size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-[#1F2937]">Termék megjelenése</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setUseImage('photo')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left group ${useImage === 'photo'
                        ? 'border-[#1B4332] bg-[#F0F4F1]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${useImage === 'photo' ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                      <Camera size={24} />
                    </div>
                    <h3 className="font-bold text-[#1F2937] mb-1">Saját fotó feltöltése</h3>
                    <p className="text-xs text-gray-500">Mutasd meg a valódi terméket (max 5 kép)</p>
                  </button>

                  <button
                    onClick={() => setUseImage('emoji')}
                    className={`p-6 rounded-2xl border-2 transition-all text-left group ${useImage === 'emoji'
                        ? 'border-[#1B4332] bg-[#F0F4F1]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${useImage === 'emoji' ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                      <Smile size={24} />
                    </div>
                    <h3 className="font-bold text-[#1F2937] mb-1">Emoji ikon választása</h3>
                    <p className="text-xs text-gray-500">Gyors és egyszerű megoldás</p>
                  </button>
                </div>

                {useImage === 'photo' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 animate-in fade-in slide-in-from-top-2">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-[#1B4332]">
                        <Upload size={32} />
                      </div>
                      <span className="font-bold text-[#1F2937] mb-1">Kattints a feltöltéshez</span>
                      <span className="text-xs text-gray-500">JPG, PNG (max 5MB)</span>
                    </label>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200 group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {useImage === 'emoji' && selectedCategoryData && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">
                      Válassz ikont a(z) &quot;{selectedCategoryData.name}&quot; kategóriához:
                    </h4>
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                      {selectedCategoryData.emojis.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`aspect-square rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${selectedEmoji === emoji
                              ? 'border-[#1B4332] bg-[#F0F4F1] scale-110 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Árazás */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#E8ECE9] flex items-center justify-center text-[#1B4332]">
                    <DollarSign size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-[#1F2937]">Árazás és részletek</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Ár (Ft) *</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="pl. 1200"
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Ft</span>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mértékegység</label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all bg-white"
                    >
                      <option value="kg">kg</option>
                      <option value="db">db</option>
                      <option value="l">liter</option>
                      <option value="csomag">csomag</option>
                      <option value="üveg">üveg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Elérhető mennyiség</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="pl. 50"
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/20 outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">{unit}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={isOrganic}
                        onChange={(e) => setIsOrganic(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B4332]"></div>
                    </div>
                    <span className="font-bold text-[#1F2937]">Bio / Vegyszermentes termék</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Átvételi lehetőségek</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        checked={deliveryOptions.pickup}
                        onChange={(e) => setDeliveryOptions({ ...deliveryOptions, pickup: e.target.checked })}
                        className="w-5 h-5 accent-[#1B4332] rounded"
                      />
                      <span className="text-gray-700">Személyes átvétel (Helyszínen)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        checked={deliveryOptions.delivery}
                        onChange={(e) => setDeliveryOptions({ ...deliveryOptions, delivery: e.target.checked })}
                        className="w-5 h-5 accent-[#1B4332] rounded"
                      />
                      <span className="text-gray-700">Házhozszállítás (Én viszem ki)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        checked={deliveryOptions.shipping}
                        onChange={(e) => setDeliveryOptions({ ...deliveryOptions, shipping: e.target.checked })}
                        className="w-5 h-5 accent-[#1B4332] rounded"
                      />
                      <span className="text-gray-700">Postázás / Futárszolgálat</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Publikálás */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <Check size={40} strokeWidth={3} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Minden készen áll!</h2>
                  <p className="text-gray-600">
                    Ellenőrizd az adatokat, és tedd közzé a termékedet.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Termék neve</span>
                    <span className="font-bold text-[#1F2937]">{productName}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Ár</span>
                    <span className="font-bold text-[#1F2937]">{price} Ft / {unit}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Kategória</span>
                    <span className="font-bold text-[#1F2937]">
                      {categories.find(c => c.id === category)?.name}
                      {subcategory && ` (${subcategory})`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Helyszín</span>
                    <span className="font-bold text-[#1F2937] text-right">{location?.address}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                  <Info className="text-blue-600 flex-shrink-0" size={20} />
                  <p className="text-sm text-blue-800">
                    A termék közzététele után értesítést küldünk a környékbeli vásárlóknak, ha bejelölted a "Friss Riasztás" opciót.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Vissza
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-md flex items-center gap-2"
              >
                {step === 4 ? (
                  <>
                    Közzététel
                    <Check size={20} />
                  </>
                ) : (
                  <>
                    Tovább
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}