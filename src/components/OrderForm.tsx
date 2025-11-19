"use client";

import { useState, useRef } from "react";
import Button from "@/components/Button";
import toast, { Toaster } from "react-hot-toast";
import * as fbq from "@/components/FacebookPixel";
import SuccessPopup from "@/components/SuccessPopup";

type OrderPayload = {
  name: string;
  phone: string;
  wilaya: string;
  commune: string;
  deliveryType: "home" | "bureau";
  color: "white" | "grey";
  address: string;
  shippingFee?: number;
  deliveryTime?: string;
  totalPrice?: number;
};

type CompleteOrder = {
  name: string;
  phone: string;
  wilaya: string;
  commune: string;
  deliveryType: "home" | "bureau";
  color: "white" | "grey";
  address: string;
  shippingFee: number;
  deliveryTime: string;
  totalPrice: number;
};

// Shipping fees by wilaya - Bureau (Stop Desk Classique)
const bureauFees: Record<string, { fee: number; deliveryTime: string }> = {
  // Group 1: 400 DA (Laghouat only - Lowest rate!)
  "03": { fee: 400, deliveryTime: "24-48H" }, // Laghouat

  // Group 2: 450 DA (Major cities)
  "17": { fee: 450, deliveryTime: "24-48H" }, // Djelfa
  "16": { fee: 450, deliveryTime: "24-48H" }, // Algiers
  "02": { fee: 450, deliveryTime: "24-48H" }, // Chlef
  "09": { fee: 450, deliveryTime: "24-48H" }, // Blida
  "10": { fee: 450, deliveryTime: "24-48H" }, // Bouira
  "15": { fee: 450, deliveryTime: "24-48H" }, // Tizi Ouzou
  "19": { fee: 450, deliveryTime: "24-48H" }, // Sétif
  "25": { fee: 450, deliveryTime: "24-48H" }, // Constantine
  "26": { fee: 450, deliveryTime: "24-48H" }, // Médéa
  "31": { fee: 450, deliveryTime: "24-48H" }, // Oran
  "34": { fee: 450, deliveryTime: "24-48H" }, // Bordj Bou Arréridj
  "35": { fee: 450, deliveryTime: "24-48H" }, // Boumerdès
  "42": { fee: 450, deliveryTime: "24-48H" }, // Tipaza
  "44": { fee: 450, deliveryTime: "24-48H" }, // Aïn Defla

  // Group 3: 500 DA
  "04": { fee: 500, deliveryTime: "24-48H" }, // Oum El Bouaghi
  "05": { fee: 500, deliveryTime: "24-48H" }, // Batna
  "06": { fee: 500, deliveryTime: "24-48H" }, // Béjaïa
  "13": { fee: 500, deliveryTime: "24-48H" }, // Tlemcen
  "14": { fee: 500, deliveryTime: "24-48H" }, // Tiaret
  "18": { fee: 500, deliveryTime: "24-48H" }, // Jijel
  "21": { fee: 500, deliveryTime: "24-48H" }, // Skikda
  "22": { fee: 500, deliveryTime: "24-48H" }, // Sidi Bel Abbès
  "23": { fee: 500, deliveryTime: "24-48H" }, // Annaba
  "27": { fee: 500, deliveryTime: "24-48H" }, // Mostaganem
  "28": { fee: 500, deliveryTime: "24-48H" }, // M'Sila
  "38": { fee: 500, deliveryTime: "24-48H" }, // Tissemsilt
  "43": { fee: 500, deliveryTime: "24-48H" }, // Mila
  "48": { fee: 500, deliveryTime: "24-48H" }, // Relizane

  // Group 4: 600 DA
  "20": { fee: 600, deliveryTime: "24-48H" }, // Saïda
  "24": { fee: 600, deliveryTime: "24-48H" }, // Guelma
  "29": { fee: 600, deliveryTime: "24-48H" }, // Mascara
  "40": { fee: 600, deliveryTime: "24-48H" }, // Khenchela
  "41": { fee: 600, deliveryTime: "24-48H" }, // Souk Ahras
  "46": { fee: 600, deliveryTime: "24-48H" }, // Aïn Témouchent
  "47": { fee: 600, deliveryTime: "24-72H" }, // Ghardaïa
  "07": { fee: 600, deliveryTime: "24-48H" }, // Biskra
  "12": { fee: 600, deliveryTime: "24-48H" }, // Tébessa
  "36": { fee: 600, deliveryTime: "24-48H" }, // El Tarf

  // Group 5: 500 DA (was 700 DA - reduced by 200)
  "51": { fee: 500, deliveryTime: "24-72H" }, // Ouled Djellal

  // Group 6: 600 DA (was 800 DA - reduced by 200)
  "30": { fee: 600, deliveryTime: "24-72H" }, // Ouargla
  "32": { fee: 600, deliveryTime: "24-72H" }, // El Bayadh
  "39": { fee: 600, deliveryTime: "24-72H" }, // El Oued
  "45": { fee: 600, deliveryTime: "24-72H" }, // Naâma
  "55": { fee: 600, deliveryTime: "24-72H" }, // Touggourt
  "57": { fee: 600, deliveryTime: "24-72H" }, // El M'Ghair

  // Group 7: 800 DA (was 1000 DA - reduced by 200)
  "58": { fee: 800, deliveryTime: "24-72H" }, // El Meniaa

  // Group 8: 900 DA (was 1100 DA - reduced by 200) - Remote areas
  "01": { fee: 900, deliveryTime: "48-96H" }, // Adrar
  "08": { fee: 900, deliveryTime: "48-96H" }, // Béchar
  "49": { fee: 900, deliveryTime: "48-96H" }, // Timimoun
  "52": { fee: 900, deliveryTime: "48-96H" }, // Béni Abbès
  "53": { fee: 900, deliveryTime: "48-96H" }, // In Salah

  // Group 9: 1200 DA (was 1400 DA - reduced by 200) - Very remote areas
  "11": { fee: 1200, deliveryTime: "48-96H" }, // Tamanrasset
  "37": { fee: 1200, deliveryTime: "48-96H" }, // Tindouf

  // Group 10: 1500 DA (was 1700 DA - reduced by 200) - Extremely remote areas
  "33": { fee: 1500, deliveryTime: "48-96H" }, // Illizi
  "50": { fee: 1500, deliveryTime: "48-96H" }, // Bordj Badji Mokhtar
  "54": { fee: 1500, deliveryTime: "48-96H" }, // In Guezzam
  "56": { fee: 1500, deliveryTime: "48-96H" }  // Djanet
};

// Shipping fees by wilaya (Home delivery - Tarif a Domicile Classique)
const homeFees: Record<string, { fee: number; deliveryTime: string }> = {
  // Group 1: 500 DA (Laghouat only)
  "03": { fee: 500, deliveryTime: "24-48H" },

  // Group 2: 650 DA (was 850 DA - reduced by 200) - Major cities
  "17": { fee: 650, deliveryTime: "24-48H" }, // Djelfa
  "16": { fee: 650, deliveryTime: "24-48H" }, // Algiers
  "02": { fee: 650, deliveryTime: "24-48H" }, // Chlef
  "09": { fee: 650, deliveryTime: "24-48H" }, // Blida
  "10": { fee: 650, deliveryTime: "24-48H" }, // Bouira
  "15": { fee: 650, deliveryTime: "24-48H" }, // Tizi Ouzou
  "19": { fee: 650, deliveryTime: "24-48H" }, // Sétif
  "25": { fee: 650, deliveryTime: "24-48H" }, // Constantine
  "26": { fee: 650, deliveryTime: "24-48H" }, // Médéa
  "31": { fee: 650, deliveryTime: "24-48H" }, // Oran
  "34": { fee: 650, deliveryTime: "24-48H" }, // Bordj Bou Arréridj
  "35": { fee: 650, deliveryTime: "24-48H" }, // Boumerdès
  "42": { fee: 650, deliveryTime: "24-48H" }, // Tipaza
  "44": { fee: 650, deliveryTime: "24-48H" }, // Aïn Defla

  // Group 3: 650 DA (was 850 DA - reduced by 200)
  "04": { fee: 650, deliveryTime: "24-48H" }, // Oum El Bouaghi
  "05": { fee: 650, deliveryTime: "24-48H" }, // Batna
  "06": { fee: 650, deliveryTime: "24-48H" }, // Béjaïa
  "13": { fee: 650, deliveryTime: "24-48H" }, // Tlemcen
  "14": { fee: 650, deliveryTime: "24-48H" }, // Tiaret
  "18": { fee: 650, deliveryTime: "24-48H" }, // Jijel
  "21": { fee: 650, deliveryTime: "24-48H" }, // Skikda
  "22": { fee: 650, deliveryTime: "24-48H" }, // Sidi Bel Abbès
  "23": { fee: 650, deliveryTime: "24-48H" }, // Annaba
  "27": { fee: 650, deliveryTime: "24-48H" }, // Mostaganem
  "28": { fee: 650, deliveryTime: "24-48H" }, // M'Sila
  "38": { fee: 650, deliveryTime: "24-48H" }, // Tissemsilt
  "43": { fee: 650, deliveryTime: "24-48H" }, // Mila
  "48": { fee: 650, deliveryTime: "24-48H" }, // Relizane

  // Group 4: 700 DA (was 900 DA - reduced by 200)
  "20": { fee: 700, deliveryTime: "24-48H" }, // Saïda
  "24": { fee: 700, deliveryTime: "24-48H" }, // Guelma
  "29": { fee: 700, deliveryTime: "24-48H" }, // Mascara
  "40": { fee: 700, deliveryTime: "24-48H" }, // Khenchela
  "41": { fee: 700, deliveryTime: "24-48H" }, // Souk Ahras
  "46": { fee: 700, deliveryTime: "24-48H" }, // Aïn Témouchent
  "47": { fee: 700, deliveryTime: "24-72H" }, // Ghardaïa

  // Group 5: 750 DA (was 950 DA - reduced by 200)
  "07": { fee: 750, deliveryTime: "24-48H" }, // Biskra
  "12": { fee: 750, deliveryTime: "24-48H" }, // Tébessa
  "36": { fee: 750, deliveryTime: "24-48H" }, // El Tarf

  // Group 6: 800 DA (was 1000 DA - reduced by 200)
  "51": { fee: 800, deliveryTime: "24-72H" }, // Ouled Djellal

  // Group 7: 900 DA (was 1100 DA - reduced by 200)
  "30": { fee: 900, deliveryTime: "24-72H" }, // Ouargla
  "32": { fee: 900, deliveryTime: "24-72H" }, // El Bayadh
  "39": { fee: 900, deliveryTime: "24-72H" }, // El Oued
  "45": { fee: 900, deliveryTime: "24-72H" }, // Naâma
  "55": { fee: 900, deliveryTime: "24-72H" }, // Touggourt
  "57": { fee: 900, deliveryTime: "24-72H" }, // El M'Ghair

  // Group 8: 1100 DA (was 1300 DA - reduced by 200)
  "58": { fee: 1100, deliveryTime: "24-72H" }, // El Meniaa

  // Group 9: 1200 DA (was 1400 DA - reduced by 200) - Remote areas
  "01": { fee: 1200, deliveryTime: "48-96H" }, // Adrar
  "08": { fee: 1200, deliveryTime: "48-96H" }, // Béchar
  "49": { fee: 1200, deliveryTime: "48-96H" }, // Timimoun
  "52": { fee: 1200, deliveryTime: "48-96H" }, // Béni Abbès
  "53": { fee: 1200, deliveryTime: "48-96H" }, // In Salah

  // Group 10: 1600 DA (was 1800 DA - reduced by 200) - Very remote
  "11": { fee: 1600, deliveryTime: "48-96H" }, // Tamanrasset
  "37": { fee: 1600, deliveryTime: "48-96H" }, // Tindouf

  // Group 11: 1800 DA (was 2000 DA - reduced by 200) - Extremely remote
  "33": { fee: 1800, deliveryTime: "48-96H" }, // Illizi
  "50": { fee: 1800, deliveryTime: "48-96H" }, // Bordj Badji Mokhtar
  "54": { fee: 1800, deliveryTime: "48-96H" }, // In Guezzam
  "56": { fee: 1800, deliveryTime: "48-96H" }  // Djanet
};

// Major communes for each wilaya
const communesByWilaya: Record<string, string[]> = {
  "01": ["Adrar", "Reggane", "Timimoun", "Aoulef", "Bordj Badji Mokhtar", "Zaouiet Kounta", "Aougrout", "Tsabit", "Fenoughil", "Tamentit"],
  "02": ["Chlef", "Oued Sly", "Ténès", "El Karimia", "Boukadir", "Abou El Hassan", "Beni Haoua", "Sobha", "Harchoun", "Ouled Fares", "Sendjas", "Talassa"],
  "03": ["Laghouat", "Aflou", "Hassi R'Mel", "Brida", "Ksar El Hirane", "Ain Madhi", "Tadjemout", "El Ghicha", "Gueltet Sidi Saad", "Hassi Delaa"],
  "04": ["Oum El Bouaghi", "Aïn Beïda", "Aïn M'lila", "Meskiana", "Aïn Fakroun"],
  "05": ["Batna", "Barika", "Arris", "Merouana", "Tazoult"],
  "06": ["Béjaïa", "Akbou", "Sidi Aïch", "El Kseur", "Amizour"],
  "07": ["Biskra", "Tolga", "Ouled Djellal", "Sidi Okba", "El Kantara"],
  "08": ["Béchar", "Abadla", "Béni Abbès", "Kenadsa", "Taghit"],
  "09": ["Blida", "Boufarik", "Larbaa", "Bougara", "Meftah"],
  "10": ["Bouira", "Lakhdaria", "Souk El Had", "Aïn Bessem", "M'Chedallah"],
  "11": ["Tamanrasset", "In Salah", "In Guezzam", "Tazrouk", "Abalessa"],
  "12": ["Tébessa", "Cheria", "El Aouinet", "Bir El Ater", "El Ouenza"],
  "13": ["Tlemcen", "Maghnia", "Nedroma", "Remchi", "Hennaya"],
  "14": ["Tiaret", "Sougueur", "Frenda", "Ksar Chellala", "Mahdia"],
  "15": ["Tizi Ouzou", "Azazga", "Draa El Mizan", "Tigzirt", "Larbaâ Nath Irathen"],
  "16": ["Algiers Centre", "Bab El Oued", "Hussein Dey", "Kouba", "Dar El Beïda", "Birtouta", "Zéralda", "Draria", "Baraki", "Rouiba"],
  "17": ["Djelfa", "Aïn Oussera", "Messaad", "Hassi Bahbah", "Birine"],
  "18": ["Jijel", "El Milia", "Taher", "Sidi Maarouf", "Chekfa"],
  "19": ["Sétif", "El Eulma", "Aïn Oulmene", "Bordj Bou Arreridj", "Aïn Azel"],
  "20": ["Saïda", "Aïn El Hadjar", "Youb", "Ouled Brahim", "Sidi Boubekeur"],
  "21": ["Skikda", "Collo", "El Harrouch", "Azzaba", "Tamalous"],
  "22": ["Sidi Bel Abbès", "Telagh", "Ben Badis", "Tessala", "Ras El Ma"],
  "23": ["Annaba", "Berrahal", "El Hadjar", "El Bouni", "Sidi Amar"],
  "24": ["Guelma", "Héliopolis", "Hammam Debagh", "Bouchegouf", "Oued Zenati"],
  "25": ["Constantine", "El Khroub", "Aïn Smara", "Hamma Bouziane", "Zighoud Youcef"],
  "26": ["Médéa", "Berrouaghia", "Ksar Boukhari", "Tablat", "Aïn Boucif"],
  "27": ["Mostaganem", "Aïn Tedles", "Sidi Ali", "Hassi Mamèche", "Achaacha"],
  "28": ["M'Sila", "Bou Saâda", "Sidi Aïssa", "Magra", "Hammam Dalaa"],
  "29": ["Mascara", "Sig", "Ghriss", "Tighennif", "Oggaz"],
  "30": ["Ouargla", "Touggourt", "Hassi Messaoud", "Témacine", "El Hadjira"],
  "31": ["Oran", "Es Sénia", "Bir El Djir", "Aïn El Turck", "Arzew", "Bethioua", "Mers El Kebir"],
  "32": ["El Bayadh", "Brezina", "Bogtob", "El Abiodh Sidi Cheikh", "Labiodh Sidi Cheikh"],
  "33": ["Illizi", "Djanet", "Bordj Omar Driss", "Debdeb", "In Amenas"],
  "34": ["Bordj Bou Arréridj", "Ras El Oued", "Mansourah", "Melouza", "El Achir"],
  "35": ["Boumerdès", "Boudouaou", "Thénia", "Bordj Menaïel", "Khemis El Khechna"],
  "36": ["El Tarf", "Ben M'hidi", "Dréan", "El Kala", "Besbes"],
  "37": ["Tindouf", "Oum El Assel", "Ghar Djebilet"],
  "38": ["Tissemsilt", "Theniet El Had", "Bordj Bou Naama", "Khemisti", "Lardjem"],
  "39": ["El Oued", "Robbah", "Debila", "Guemar", "Djamaa"],
  "40": ["Khenchela", "Chechar", "Babar", "Aïn Touila", "Kais"],
  "41": ["Souk Ahras", "Sedrata", "Mdaourouch", "Bir Bouhouche", "Mechroha"],
  "42": ["Tipaza", "Kolea", "Cherchell", "Hadjout", "Fouka"],
  "43": ["Mila", "Chelghoum Laïd", "Sidi Merouane", "Ferdjioua", "Tadjenanet"],
  "44": ["Aïn Defla", "Khemis Miliana", "Rouina", "El Attaf", "Djendel"],
  "45": ["Naâma", "Mécheria", "Aïn Sefra", "Tiout", "Sfissifa"],
  "46": ["Aïn Témouchent", "Hammam Bou Hadjar", "Beni Saf", "El Malah", "El Amria"],
  "47": ["Ghardaïa", "Metlili", "El Menia", "Berriane", "Guerrara"],
  "48": ["Relizane", "Oued Rhiou", "Mazouna", "Djidiouia", "Yellel"],
  "49": ["El M'Ghair", "Djamaa", "Sidi Amrane", "Merara", "Oum Touyour"],
  "50": ["El Menia", "Hassi Fehal", "Hassi Gara"],
  "51": ["Ouled Djellal", "Ras El Miad", "Doucen", "Sidi Khaled"],
  "52": ["Bordj Baji Mokhtar", "Timiaouine"],
  "53": ["Béni Abbès", "El Ouata", "Tabelbala", "Igli"],
  "54": ["Timimoun", "Ouled Saïd", "Charouine", "Tinerkouk"],
  "55": ["Touggourt", "Témacine", "Megarine", "El Hadjira", "Nezla"],
  "56": ["Djanet", "Bordj El Haouasse"],
  "57": ["In Salah", "Foggaret Ezzaouia", "In Ghar"],
  "58": ["In Guezzam", "Tin Zaouatine"]
};

export default function OrderForm() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OrderPayload>({
    name: "",
    phone: "",
    wilaya: "",
    commune: "",
    deliveryType: "home",
    color: "white",
    address: ""
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successOrderDetails, setSuccessOrderDetails] = useState<CompleteOrder | null>(null);
  const initiateCheckoutTracked = useRef(false);

  // Track InitiateCheckout when user starts filling form
  const handleFieldInteraction = () => {
    if (!initiateCheckoutTracked.current) {
      initiateCheckoutTracked.current = true;
      fbq.event("InitiateCheckout", {
        content_name: "Magnetic Selfie Screen Ultra",
        content_category: "Electronics",
        value: 7900,
        currency: "DZD"
      });
    }
  };

  // Get communes for selected wilaya
  const selectedWilayaCode = data.wilaya.split(" ")[0]; // Extract "01" from "01 - Adrar"
  const availableCommunes = communesByWilaya[selectedWilayaCode] || [];

  // Get shipping info based on delivery type
  const shippingFees = data.deliveryType === "bureau" ? bureauFees : homeFees;
  const shippingInfo = shippingFees[selectedWilayaCode];
  const productPrice = 7900;
  const shippingFee = shippingInfo?.fee || 0;
  const totalPrice = productPrice + shippingFee;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields - address only required for home delivery
    if (!data.name || !data.phone || !data.wilaya || !data.commune || (data.deliveryType === "home" && !data.address)) {
      toast.error("يرجى إدخال كل الحقول الإلزامية");
      return;
    }
    setLoading(true);
    try {
      // Include shipping info in the order
      const orderData: CompleteOrder = {
        ...data,
        shippingFee,
        deliveryTime: shippingInfo?.deliveryTime || "24-48H",
        totalPrice,
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Request failed");

      // Track Purchase event
      fbq.event("Purchase", {
        content_name: "Magnetic Selfie Screen Ultra",
        content_category: "Electronics",
        content_type: "product",
        value: totalPrice,
        currency: "DZD",
        contents: [{ id: "magnetic-selfie", quantity: 1 }],
        delivery_category: data.deliveryType,
        color: data.color
      });

      // Show success popup with order details
      setSuccessOrderDetails(orderData);
      setShowSuccessPopup(true);

      // Clear form after showing popup
      setData({ name: "", phone: "", wilaya: "", commune: "", deliveryType: "home", color: "white", address: "" });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8" id="order">
      <Toaster position="top-center" />
      <h3 className="text-2xl md:text-3xl font-extrabold mb-6">اطلب الآن — الدفع عند الاستلام</h3>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-white/80">الاسم الكامل</label>
          <input
            className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)] outline-none"
            placeholder="الاسم"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onFocus={handleFieldInteraction}
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-white/80">رقم الهاتف</label>
          <input
            className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)] outline-none"
            placeholder="05XXXXXXXX"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            required
            inputMode="tel"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-white/80">الولاية</label>
          <select
            className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)] outline-none cursor-pointer"
            value={data.wilaya}
            onChange={(e) => setData({ ...data, wilaya: e.target.value, commune: "" })}
            required
            style={{
              colorScheme: 'dark'
            }}
          >
            <option value="" disabled className="bg-gray-900 text-white">اختر الولاية</option>
            <option value="01 - Adrar" className="bg-gray-900 text-white">01 - أدرار (Adrar)</option>
            <option value="02 - Chlef" className="bg-gray-900 text-white">02 - الشلف (Chlef)</option>
            <option value="03 - Laghouat" className="bg-gray-900 text-white">03 - الأغواط (Laghouat)</option>
            <option value="04 - Oum El Bouaghi" className="bg-gray-900 text-white">04 - أم البواقي (Oum El Bouaghi)</option>
            <option value="05 - Batna" className="bg-gray-900 text-white">05 - باتنة (Batna)</option>
            <option value="06 - Béjaïa" className="bg-gray-900 text-white">06 - بجاية (Béjaïa)</option>
            <option value="07 - Biskra" className="bg-gray-900 text-white">07 - بسكرة (Biskra)</option>
            <option value="08 - Béchar" className="bg-gray-900 text-white">08 - بشار (Béchar)</option>
            <option value="09 - Blida" className="bg-gray-900 text-white">09 - البليدة (Blida)</option>
            <option value="10 - Bouira" className="bg-gray-900 text-white">10 - البويرة (Bouira)</option>
            <option value="11 - Tamanrasset" className="bg-gray-900 text-white">11 - تمنراست (Tamanrasset)</option>
            <option value="12 - Tébessa" className="bg-gray-900 text-white">12 - تبسة (Tébessa)</option>
            <option value="13 - Tlemcen" className="bg-gray-900 text-white">13 - تلمسان (Tlemcen)</option>
            <option value="14 - Tiaret" className="bg-gray-900 text-white">14 - تيارت (Tiaret)</option>
            <option value="15 - Tizi Ouzou" className="bg-gray-900 text-white">15 - تيزي وزو (Tizi Ouzou)</option>
            <option value="16 - Algiers" className="bg-gray-900 text-white">16 - الجزائر (Algiers)</option>
            <option value="17 - Djelfa" className="bg-gray-900 text-white">17 - الجلفة (Djelfa)</option>
            <option value="18 - Jijel" className="bg-gray-900 text-white">18 - جيجل (Jijel)</option>
            <option value="19 - Sétif" className="bg-gray-900 text-white">19 - سطيف (Sétif)</option>
            <option value="20 - Saïda" className="bg-gray-900 text-white">20 - سعيدة (Saïda)</option>
            <option value="21 - Skikda" className="bg-gray-900 text-white">21 - سكيكدة (Skikda)</option>
            <option value="22 - Sidi Bel Abbès" className="bg-gray-900 text-white">22 - سيدي بلعباس (Sidi Bel Abbès)</option>
            <option value="23 - Annaba" className="bg-gray-900 text-white">23 - عنابة (Annaba)</option>
            <option value="24 - Guelma" className="bg-gray-900 text-white">24 - قالمة (Guelma)</option>
            <option value="25 - Constantine" className="bg-gray-900 text-white">25 - قسنطينة (Constantine)</option>
            <option value="26 - Médéa" className="bg-gray-900 text-white">26 - المدية (Médéa)</option>
            <option value="27 - Mostaganem" className="bg-gray-900 text-white">27 - مستغانم (Mostaganem)</option>
            <option value="28 - M'Sila" className="bg-gray-900 text-white">28 - المسيلة (M'Sila)</option>
            <option value="29 - Mascara" className="bg-gray-900 text-white">29 - معسكر (Mascara)</option>
            <option value="30 - Ouargla" className="bg-gray-900 text-white">30 - ورقلة (Ouargla)</option>
            <option value="31 - Oran" className="bg-gray-900 text-white">31 - وهران (Oran)</option>
            <option value="32 - El Bayadh" className="bg-gray-900 text-white">32 - البيض (El Bayadh)</option>
            <option value="33 - Illizi" className="bg-gray-900 text-white">33 - إليزي (Illizi)</option>
            <option value="34 - Bordj Bou Arréridj" className="bg-gray-900 text-white">34 - برج بوعريريج (Bordj Bou Arréridj)</option>
            <option value="35 - Boumerdès" className="bg-gray-900 text-white">35 - بومرداس (Boumerdès)</option>
            <option value="36 - El Tarf" className="bg-gray-900 text-white">36 - الطارف (El Tarf)</option>
            <option value="37 - Tindouf" className="bg-gray-900 text-white">37 - تندوف (Tindouf)</option>
            <option value="38 - Tissemsilt" className="bg-gray-900 text-white">38 - تيسمسيلت (Tissemsilt)</option>
            <option value="39 - El Oued" className="bg-gray-900 text-white">39 - الوادي (El Oued)</option>
            <option value="40 - Khenchela" className="bg-gray-900 text-white">40 - خنشلة (Khenchela)</option>
            <option value="41 - Souk Ahras" className="bg-gray-900 text-white">41 - سوق أهراس (Souk Ahras)</option>
            <option value="42 - Tipaza" className="bg-gray-900 text-white">42 - تيبازة (Tipaza)</option>
            <option value="43 - Mila" className="bg-gray-900 text-white">43 - ميلة (Mila)</option>
            <option value="44 - Aïn Defla" className="bg-gray-900 text-white">44 - عين الدفلى (Aïn Defla)</option>
            <option value="45 - Naâma" className="bg-gray-900 text-white">45 - النعامة (Naâma)</option>
            <option value="46 - Aïn Témouchent" className="bg-gray-900 text-white">46 - عين تموشنت (Aïn Témouchent)</option>
            <option value="47 - Ghardaïa" className="bg-gray-900 text-white">47 - غرداية (Ghardaïa)</option>
            <option value="48 - Relizane" className="bg-gray-900 text-white">48 - غليزان (Relizane)</option>
            <option value="49 - El M'Ghair" className="bg-gray-900 text-white">49 - المغير (El M'Ghair)</option>
            <option value="50 - El Menia" className="bg-gray-900 text-white">50 - المنيعة (El Menia)</option>
            <option value="51 - Ouled Djellal" className="bg-gray-900 text-white">51 - أولاد جلال (Ouled Djellal)</option>
            <option value="52 - Bordj Baji Mokhtar" className="bg-gray-900 text-white">52 - برج باجي مختار (Bordj Baji Mokhtar)</option>
            <option value="53 - Béni Abbès" className="bg-gray-900 text-white">53 - بني عباس (Béni Abbès)</option>
            <option value="54 - Timimoun" className="bg-gray-900 text-white">54 - تيميمون (Timimoun)</option>
            <option value="55 - Touggourt" className="bg-gray-900 text-white">55 - تقرت (Touggourt)</option>
            <option value="56 - Djanet" className="bg-gray-900 text-white">56 - جانت (Djanet)</option>
            <option value="57 - In Salah" className="bg-gray-900 text-white">57 - عين صالح (In Salah)</option>
            <option value="58 - In Guezzam" className="bg-gray-900 text-white">58 - عين قزام (In Guezzam)</option>
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm text-white/80">البلدية</label>
          <div className="relative">
            <input
              list={`communes-${selectedWilayaCode}`}
              className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder={data.wilaya ? "اكتب أو اختر البلدية" : "اختر الولاية أولاً"}
              value={data.commune}
              onChange={(e) => setData({ ...data, commune: e.target.value })}
              disabled={!data.wilaya}
              required
            />
            {data.wilaya && availableCommunes.length > 0 && (
              <datalist id={`communes-${selectedWilayaCode}`}>
                {availableCommunes.map((commune) => (
                  <option key={commune} value={commune} />
                ))}
              </datalist>
            )}
          </div>
          {data.wilaya && (
            <p className="text-xs text-white/50 mt-1">
              💡 يمكنك الاختيار من القائمة أو كتابة اسم بلديتك
            </p>
          )}
        </div>

        {/* Delivery Type Selection */}
        <div className="col-span-2">
          <label className="text-sm text-white/80 mb-3 block">طريقة الاستلام</label>
          <div className="grid grid-cols-2 gap-4">
            {/* Home Delivery Option */}
            <label
              className={`relative glass rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                data.deliveryType === "home"
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="deliveryType"
                value="home"
                checked={data.deliveryType === "home"}
                onChange={(e) => setData({ ...data, deliveryType: e.target.value as "home" | "bureau" })}
                className="sr-only"
              />
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">🏠</span>
                <span className="font-bold">توصيل للمنزل</span>
                <span className="text-xs text-white/60">التوصيل إلى عنوانك</span>
              </div>
              {data.deliveryType === "home" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </label>

            {/* Bureau Pickup Option */}
            <label
              className={`relative glass rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                data.deliveryType === "bureau"
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="deliveryType"
                value="bureau"
                checked={data.deliveryType === "bureau"}
                onChange={(e) => setData({ ...data, deliveryType: e.target.value as "home" | "bureau", address: "" })}
                className="sr-only"
              />
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">🏢</span>
                <span className="font-bold">استلام من المكتب</span>
                <span className="text-xs text-white/60">أقل تكلفة - استلام ذاتي</span>
              </div>
              {data.deliveryType === "bureau" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Color Selection */}
        <div className="col-span-2">
          <label className="text-sm text-white/80 mb-3 block">اختر اللون</label>
          <div className="grid grid-cols-2 gap-4">
            {/* White Option */}
            <label
              className={`relative glass rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                data.color === "white"
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="color"
                value="white"
                checked={data.color === "white"}
                onChange={(e) => setData({ ...data, color: e.target.value as "white" | "grey" })}
                className="sr-only"
              />
              <div className="flex flex-col items-center gap-2 text-center">
                {/* White color swatch */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-white to-gray-100 border-2 border-gray-300 shadow-md"></div>
                <span className="font-bold text-base">أبيض لؤلؤي</span>
                <span className="text-xs text-white/60">Pearl White</span>
              </div>
              {data.color === "white" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </label>

            {/* Grey Option */}
            <label
              className={`relative glass rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                data.color === "grey"
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <input
                type="radio"
                name="color"
                value="grey"
                checked={data.color === "grey"}
                onChange={(e) => setData({ ...data, color: e.target.value as "white" | "grey" })}
                className="sr-only"
              />
              <div className="flex flex-col items-center gap-2 text-center">
                {/* Grey color swatch */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 border-2 border-gray-500 shadow-md"></div>
                <span className="font-bold text-base">رمادي سحابي</span>
                <span className="text-xs text-white/60">Cloud Grey</span>
              </div>
              {data.color === "grey" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Address field - only for home delivery */}
        {data.deliveryType === "home" && (
          <div className="col-span-2">
            <label className="text-sm text-white/80">العنوان الكامل</label>
            <input
              className="mt-1 w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus:ring-2 focus:ring-[color:var(--accent)] outline-none"
              placeholder="الحي، الشارع، رقم المنزل"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              required
            />
          </div>
        )}

        {/* Bureau pickup info message */}
        {data.deliveryType === "bureau" && data.wilaya && (
          <div className="col-span-2">
            <div className="glass rounded-2xl p-4 border border-cyan-400/30 bg-cyan-500/5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏢</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-cyan-300 mb-1">استلام من مكتب World Express</p>
                  <p className="text-xs text-white/70">
                    سيتم إشعارك عند وصول الطلب إلى المكتب في {data.wilaya.split(" - ")[1]}. قم بالاستلام من أقرب مكتب.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Summary */}
        {data.wilaya && shippingInfo && (
          <div className="col-span-2">
            <div className="glass rounded-2xl p-6 border border-white/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💰</span>
                تفاصيل السعر
              </h4>

              <div className="space-y-3">
                {/* Product Price */}
                <div className="flex justify-between items-center pb-2">
                  <span className="text-white/80">سعر المنتج</span>
                  <span className="text-xl font-bold">{productPrice.toLocaleString()} DA</span>
                </div>

                {/* Shipping Fee */}
                <div className="flex justify-between items-center pb-2 border-t border-white/10 pt-2">
                  <div className="flex flex-col">
                    <span className="text-white/80">
                      {data.deliveryType === "home" ? "رسوم التوصيل" : "رسوم الشحن للمكتب"}
                    </span>
                    <span className="text-xs text-white/60 flex items-center gap-1">
                      <span>⏱️</span>
                      وقت التوصيل: {shippingInfo.deliveryTime}
                    </span>
                    <span className="text-xs text-white/50 flex items-center gap-1 mt-1">
                      <span>{data.deliveryType === "home" ? "🏠" : "🏢"}</span>
                      {data.deliveryType === "home" ? "توصيل للمنزل" : "استلام من المكتب"}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-cyan-400">
                    {shippingFee.toLocaleString()} DA
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 border-t-2 border-white/20">
                  <span className="text-lg font-bold">المجموع الكلي</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {totalPrice.toLocaleString()} DA
                  </span>
                </div>
              </div>

              {/* Delivery Info Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
                  <span>✓</span>
                  <span>الدفع عند الاستلام</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-span-2 flex justify-center">
          <Button type="submit" size="lg" disabled={loading} className="min-w-48">
            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
          </Button>
        </div>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && successOrderDetails && (
        <SuccessPopup
          orderDetails={successOrderDetails}
          onClose={() => {
            setShowSuccessPopup(false);
            setSuccessOrderDetails(null);
          }}
        />
      )}
    </div>
  );
}

